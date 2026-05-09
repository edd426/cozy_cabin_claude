#!/usr/bin/env bash
# scripts/wait-for-deploy.sh [DEPLOY_SHA]
#
# Replaces the curl-based scripts/verify-deploy.sh from inside the routine
# sandbox, which can't reach edd426.github.io due to the outbound allowlist.
#
# Strategy: after the agent pushes, the GitHub Actions workflow runs the
# Pages deploy AND a Playwright screenshot job that commits the rendered
# preview PNG back to main with `[skip ci]`. The presence of that bot
# commit (and the corresponding previews/<date>-<sha>.png file in
# origin/main) is proof that the deploy completed and rendered correctly.
#
# This script polls `git fetch` until that file appears, then pulls the
# bot's commit so the agent can `Read` the screenshot.
#
# Usage:
#   ./scripts/wait-for-deploy.sh                # uses current HEAD's short sha
#   ./scripts/wait-for-deploy.sh 0d621f7         # explicit sha
#
# Exit 0 — preview file appeared in origin/main; pulled into local main.
# Exit 1 — timed out (default 5 minutes).
# Exit 2 — git plumbing error (network blocked even for github.com? or
#          repo state inconsistent).
#
# Output is intentionally compact so the agent can paste it verbatim into
# the diary's "Verification evidence" section.

set -euo pipefail

REPO_ROOT="$(git rev-parse --show-toplevel)"
cd "$REPO_ROOT"

DEPLOY_SHA="${1:-$(git rev-parse --short HEAD)}"
DATE_TAG="$(date -u +%Y-%m-%d)"
PREVIEW_PATH="previews/${DATE_TAG}-${DEPLOY_SHA}.png"
DEADLINE_S=$(( $(date +%s) + 300 ))   # 5 minutes
POLL_INTERVAL=20

echo "wait-for-deploy: waiting for ${PREVIEW_PATH} on origin/main"
echo "wait-for-deploy: deadline in 5 minutes; polling every ${POLL_INTERVAL}s"

while [[ $(date +%s) -lt $DEADLINE_S ]]; do
  if ! git fetch origin main --quiet 2>/dev/null; then
    echo "wait-for-deploy: git fetch failed (network or auth issue)" >&2
    exit 2
  fi

  if git ls-tree origin/main "$PREVIEW_PATH" 2>/dev/null | grep -q .; then
    echo "wait-for-deploy: ${PREVIEW_PATH} found in origin/main"
    git pull --rebase origin main >/dev/null 2>&1 || {
      echo "wait-for-deploy: pull failed; you may have local changes that conflict" >&2
      exit 2
    }
    echo "wait-for-deploy: OK"
    exit 0
  fi

  remaining=$(( DEADLINE_S - $(date +%s) ))
  echo "wait-for-deploy: not yet; ${remaining}s remaining"
  sleep "$POLL_INTERVAL"
done

echo "wait-for-deploy: TIMEOUT after 5 minutes; preview never appeared" >&2
echo "wait-for-deploy: this could mean the Pages deploy failed, the screenshot job failed, or both" >&2
echo "wait-for-deploy: check https://github.com/edd426/cozy_cabin_claude/actions for the workflow run" >&2
exit 1
