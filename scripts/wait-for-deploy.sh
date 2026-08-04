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
# Exit 1 — timed out (default 10 minutes; override with WAIT_FOR_DEPLOY_TIMEOUT).
# Exit 2 — git plumbing error (network blocked even for github.com? or
#          repo state inconsistent).
#
# Output is intentionally compact so the agent can paste it verbatim into
# the log's "Verification output" section (logs/YYYY-MM-DD.md).

set -euo pipefail

REPO_ROOT="$(git rev-parse --show-toplevel)"
cd "$REPO_ROOT"

DEPLOY_SHA="${1:-$(git rev-parse --short HEAD)}"
DATE_TAG="$(date -u +%Y-%m-%d)"
PREVIEW_PATH="previews/${DATE_TAG}-${DEPLOY_SHA}.png"
# This poll spans BOTH CI jobs: deploy, then screenshot, which only starts
# after deploy finishes and sleeps 25s for Pages to settle. Cabin's screenshot
# job alone has been running 2m14s–2m31s, so 300s left barely a minute of slack
# on a *healthy* run — a margin thin enough that a normal deploy can report as
# a failure. That is exactly what happened in far-keeper on 2026-08-04, where
# two ordinary polls were logged as TIMEOUTs. 600s gives the honest wall time
# room; the agent is not idle meanwhile (daily.md Step 6 drafts the diary).
TIMEOUT_SECONDS="${WAIT_FOR_DEPLOY_TIMEOUT:-600}"
DEADLINE_S=$(( $(date +%s) + TIMEOUT_SECONDS ))
POLL_INTERVAL=20

echo "wait-for-deploy: waiting for ${PREVIEW_PATH} on origin/main"
echo "wait-for-deploy: deadline in $(( TIMEOUT_SECONDS / 60 )) minutes; polling every ${POLL_INTERVAL}s"

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

echo "wait-for-deploy: TIMEOUT after $(( TIMEOUT_SECONDS / 60 )) minutes; preview never appeared" >&2
echo "wait-for-deploy: this could mean the Pages deploy failed, the screenshot job failed, or both" >&2
echo "wait-for-deploy: check https://github.com/edd426/cozy_cabin_claude/actions for the workflow run" >&2
exit 1
