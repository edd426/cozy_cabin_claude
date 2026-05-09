#!/usr/bin/env bash
# scripts/local-snapshot.sh [test-script.js]
#
# Renders the working-tree state of the cabin in a real headless browser
# (Playwright + Chromium) at phone-viewport size (375x800) and saves a
# screenshot. Optionally, runs an arbitrary test script the agent provides
# in /tmp/ for interaction testing (clicks, navigations, localStorage,
# etc.) instead of the default snapshot.
#
# Why this exists: the pure curl-grep verification cannot confirm visual
# correctness or interactivity. This script gives the agent a way to "see"
# the working-tree state of the page before pushing.
#
# Usage:
#   ./scripts/local-snapshot.sh
#       writes a static screenshot to /tmp/cabin-snap.png
#   ./scripts/local-snapshot.sh /tmp/my-test.js
#       runs the given Playwright script with the local server already up
#
# The test script gets these environment variables:
#   COZY_CABIN_URL              -- http://localhost:<port>/  (use as your base URL)
#   COZY_CABIN_OUTDIR           -- /tmp/cabin-snaps/  (a fresh dir for artifacts)
#   COZY_CABIN_CHROMIUM_PATH    -- absolute path to the Chromium binary to use,
#                                  set when a pre-staged Chromium is detected
#                                  in the routine sandbox (/opt/pw-browsers/);
#                                  empty when Playwright's bundled browser is
#                                  available via the normal cache
#
# Sandbox notes (see diary 2026-05-09 dry-run summary):
#   The CCR routine sandbox blocks outbound HTTPS to playwright.azureedge.net
#   (the Chromium download CDN) and to *.github.io. It does, however, ship a
#   pre-staged Chromium under /opt/pw-browsers/. This script detects that
#   pre-stage and bypasses the network download. On a developer laptop with
#   normal internet, the npx playwright install step still works as a
#   fallback.

set -euo pipefail

REPO_ROOT="$(git rev-parse --show-toplevel)"
cd "$REPO_ROOT"

TEST_SCRIPT="${1:-}"
DEFAULT_OUT="/tmp/cabin-snap.png"

# ----------------------------------------------------------------------
# 1. Detect pre-staged Chromium (CCR sandbox) before we touch the network.
# ----------------------------------------------------------------------
CHROMIUM_BIN=""
PW_BROWSERS_DIR=""
for candidate in \
    /opt/pw-browsers \
    "${HOME}/.cache/ms-playwright" \
    "${HOME}/Library/Caches/ms-playwright"; do
  if [[ -d "$candidate" ]]; then
    PW_BROWSERS_DIR="$candidate"
    # Prefer headless_shell (smaller, what Playwright uses for headless mode).
    CHROMIUM_BIN="$(find "$candidate" -name 'headless_shell' -type f 2>/dev/null | head -1)"
    if [[ -z "$CHROMIUM_BIN" ]]; then
      # Fallback: regular Chromium (macOS-style path inside Chromium.app on
      # darwin, or a plain `chrome` binary on linux).
      CHROMIUM_BIN="$(find "$candidate" -path '*Chromium.app/Contents/MacOS/Chromium' -type f 2>/dev/null | head -1)"
    fi
    if [[ -z "$CHROMIUM_BIN" ]]; then
      CHROMIUM_BIN="$(find "$candidate" -name 'chrome' -type f 2>/dev/null | head -1)"
    fi
    [[ -n "$CHROMIUM_BIN" ]] && break
  fi
done

if [[ -n "$CHROMIUM_BIN" ]]; then
  echo "snapshot: using pre-staged Chromium at ${CHROMIUM_BIN}"
  export PLAYWRIGHT_BROWSERS_PATH="$PW_BROWSERS_DIR"
  export COZY_CABIN_CHROMIUM_PATH="$CHROMIUM_BIN"
else
  echo "snapshot: no pre-staged Chromium found; will try npx playwright install"
fi

# ----------------------------------------------------------------------
# 2. Install the playwright npm package (no Chromium download).
#    --ignore-scripts skips the postinstall that would try to fetch
#    Chromium from playwright.azureedge.net (blocked in the sandbox).
# ----------------------------------------------------------------------
if [[ ! -d node_modules/playwright ]]; then
  echo "snapshot: installing playwright npm package (no browser fetch)..."
  if ! npm ci --silent --ignore-scripts 2>&1 | tail -3; then
    npm install --silent --ignore-scripts
  fi
fi

if ! npx playwright --version >/dev/null 2>&1; then
  echo "snapshot: Playwright CLI missing after install" >&2
  exit 1
fi

# ----------------------------------------------------------------------
# 3. If no pre-staged Chromium was found, try the network download once.
# ----------------------------------------------------------------------
if [[ -z "$CHROMIUM_BIN" ]]; then
  echo "snapshot: attempting Chromium download (will fail in the routine sandbox)..."
  if npx playwright install chromium 2>&1 | tail -3; then
    # Re-detect after download — Playwright's cache location varies by OS.
    for candidate in \
        "${HOME}/.cache/ms-playwright" \
        "${HOME}/Library/Caches/ms-playwright"; do
      if [[ -d "$candidate" ]]; then
        CHROMIUM_BIN="$(find "$candidate" -name 'headless_shell' -type f 2>/dev/null | head -1)"
        [[ -z "$CHROMIUM_BIN" ]] && CHROMIUM_BIN="$(find "$candidate" -path '*Chromium.app/Contents/MacOS/Chromium' -type f 2>/dev/null | head -1)"
        [[ -z "$CHROMIUM_BIN" ]] && CHROMIUM_BIN="$(find "$candidate" -name 'chrome' -type f 2>/dev/null | head -1)"
        if [[ -n "$CHROMIUM_BIN" ]]; then
          export PLAYWRIGHT_BROWSERS_PATH="$candidate"
          export COZY_CABIN_CHROMIUM_PATH="$CHROMIUM_BIN"
          echo "snapshot: downloaded Chromium at ${CHROMIUM_BIN}"
          break
        fi
      fi
    done
    if [[ -z "$CHROMIUM_BIN" ]]; then
      echo "snapshot: download succeeded but cannot locate the binary; aborting." >&2
      exit 5
    fi
  else
    echo "snapshot: Chromium download failed (likely network-blocked sandbox)." >&2
    echo "snapshot: cannot render without a Chromium binary; aborting." >&2
    exit 5
  fi
fi

# ----------------------------------------------------------------------
# 4. Generate build-sha so the page renders day labels correctly.
# ----------------------------------------------------------------------
./scripts/build.sh >/dev/null

# ----------------------------------------------------------------------
# 5. Pick a free port and start a local HTTP server.
# ----------------------------------------------------------------------
PORT=""
for candidate in 8765 8766 8767 8768 8769 8770; do
  if ! (echo > "/dev/tcp/127.0.0.1/${candidate}") 2>/dev/null; then
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
trap "kill ${SERVER_PID} 2>/dev/null || true" EXIT

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
# 6. Run the snapshot or the user-provided test script.
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
