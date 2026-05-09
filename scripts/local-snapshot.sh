#!/usr/bin/env bash
# scripts/local-snapshot.sh [test-script.js]
#
# Renders the working-tree state of the cabin in a real headless browser
# (Playwright + Chromium) at phone-viewport size (375x800) and saves a
# screenshot. Optionally, runs an arbitrary test script the agent provides
# in /tmp/ for interaction testing (clicks, navigations, localStorage,
# etc.) instead of the default snapshot.
#
# Why this exists: the curl-grep verification in scripts/verify-deploy.sh
# can confirm a string appears in served HTML, but cannot confirm visual
# correctness or interactivity. This script gives the agent a way to
# "see" the working-tree state of the page before pushing -- closing the
# loop in the same session rather than waiting for tomorrow's CI
# screenshot.
#
# Usage:
#   ./scripts/local-snapshot.sh
#       writes a static screenshot to /tmp/cabin-snap.png
#   ./scripts/local-snapshot.sh /tmp/my-test.js
#       runs the given Playwright script with the local server already up
#
# The test script gets these environment variables:
#   COZY_CABIN_URL     -- http://localhost:<port>/  (use as your base URL)
#   COZY_CABIN_OUTDIR  -- /tmp/cabin-snaps/  (a fresh dir for artifacts)
#
# The script is idempotent within a session: if node_modules/playwright is
# already populated, the install step is skipped. First run per session
# downloads ~80MB of Chromium; subsequent runs reuse the cache.

set -euo pipefail

REPO_ROOT="$(git rev-parse --show-toplevel)"
cd "$REPO_ROOT"

TEST_SCRIPT="${1:-}"
DEFAULT_OUT="/tmp/cabin-snap.png"

# ----------------------------------------------------------------------
# 1. Install Playwright if not already present.
# ----------------------------------------------------------------------
if [[ ! -d node_modules/playwright ]]; then
  echo "snapshot: installing Playwright (one-time per session)..."
  if ! npm ci --silent 2>&1 | tail -3; then
    npm install --silent
  fi
fi

if ! npx playwright --version >/dev/null 2>&1; then
  echo "snapshot: Playwright CLI missing after install" >&2
  exit 1
fi
echo "snapshot: ensuring Chromium browser is installed..."
npx playwright install chromium 2>&1 | tail -1

# ----------------------------------------------------------------------
# 2. Generate build-sha so the page renders day labels correctly.
# ----------------------------------------------------------------------
./scripts/build.sh >/dev/null

# ----------------------------------------------------------------------
# 3. Pick a free port and start a local HTTP server.
# ----------------------------------------------------------------------
PORT=""
for candidate in 8765 8766 8767 8768 8769 8770; do
  if ! (echo > "/dev/tcp/127.0.0.1/$candidate") 2>/dev/null; then
    PORT="$candidate"
    break
  fi
done
if [[ -z "$PORT" ]]; then
  echo "snapshot: could not find a free port in 8765-8770" >&2
  exit 2
fi

echo "snapshot: starting local server on port ${PORT}"
python3 -m http.server "$PORT" --bind 127.0.0.1 >/dev/null 2>&1 &
SERVER_PID=$!
trap "kill $SERVER_PID 2>/dev/null || true" EXIT

# Wait up to 5s for the server to come up.
for _ in 1 2 3 4 5 6 7 8 9 10; do
  if curl -fsS "http://localhost:${PORT}/" >/dev/null 2>&1; then break; fi
  sleep 0.5
done
if ! curl -fsS "http://localhost:${PORT}/" >/dev/null 2>&1; then
  echo "snapshot: local server failed to come up on port ${PORT}" >&2
  exit 3
fi

# ----------------------------------------------------------------------
# 4. Run the snapshot or the user-provided test script.
# ----------------------------------------------------------------------
mkdir -p /tmp/cabin-snaps
export COZY_CABIN_URL="http://localhost:${PORT}/"
export COZY_CABIN_OUTDIR="/tmp/cabin-snaps"
# Make repo-installed node_modules resolvable from any cwd (so /tmp/*.js scripts
# can `require('playwright')` without their own install).
export NODE_PATH="${REPO_ROOT}/node_modules${NODE_PATH:+:$NODE_PATH}"

if [[ -n "$TEST_SCRIPT" ]]; then
  if [[ ! -f "$TEST_SCRIPT" ]]; then
    echo "snapshot: test script not found: ${TEST_SCRIPT}" >&2
    exit 4
  fi
  echo "snapshot: running test script ${TEST_SCRIPT}"
  node "$TEST_SCRIPT"
else
  echo "snapshot: capturing static snapshot to ${DEFAULT_OUT}"
  node scripts/screenshot.js "$COZY_CABIN_URL" "$DEFAULT_OUT"
fi

echo "snapshot: done"
