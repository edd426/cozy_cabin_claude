#!/usr/bin/env bash
# run-day.sh — wrapper invoked by the scheduled routine.
#
# Responsibilities:
#   - Pull latest main.
#   - Compute today's day_n from the Day-1 anchor in DAY_ONE_DATE below.
#   - Write .cabin-state.json (gitignored, wrapper-owned, agent reads only).
#   - Invoke `claude "/daily"`.
#   - Capture status, update .cabin-state.json post-run.
#
# Configuration:
#   DAY_ONE_DATE — ISO date of Day 1. Edit before scheduling the routine.
#   PAGES_URL    — deployed GitHub Pages URL.
#
# Exit codes are passed through from claude.

set -euo pipefail

REPO_ROOT="$(git rev-parse --show-toplevel)"
cd "$REPO_ROOT"

# ───────────────────────────────────────────────────────────────────────────
# Configuration. Edit DAY_ONE_DATE before enabling the schedule.
# ───────────────────────────────────────────────────────────────────────────
DAY_ONE_DATE="${DAY_ONE_DATE:-2026-05-09}"   # ISO date Day 1 fires
PAGES_URL="${PAGES_URL:-https://edd426.github.io/cozy_cabin_claude/}"
# ───────────────────────────────────────────────────────────────────────────

TODAY_ISO="$(date -u +%Y-%m-%d)"
NOW_UTC="$(date -u +%Y-%m-%dT%H:%M:%SZ)"

# Day-N math. macOS and GNU date have different flags; do it portably with
# python3 (universally present on macOS, Ubuntu, GH runners).
DAY_N="$(python3 - "$DAY_ONE_DATE" "$TODAY_ISO" <<'PY'
import sys, datetime
day_one = datetime.date.fromisoformat(sys.argv[1])
today   = datetime.date.fromisoformat(sys.argv[2])
print((today - day_one).days + 1)
PY
)"

write_state() {
  python3 - "$@" <<'PY'
import json, sys, pathlib
keys = sys.argv[1::2]
vals = sys.argv[2::2]
path = pathlib.Path(".cabin-state.json")
existing = {}
if path.exists():
    try: existing = json.loads(path.read_text())
    except Exception: existing = {}
for k, v in zip(keys, vals):
    existing[k] = v
path.write_text(json.dumps(existing, indent=2) + "\n")
PY
}

echo "run-day: today=$TODAY_ISO day_n=$DAY_N"
echo "run-day: pulling latest main"
git pull --ff-only origin main || {
  echo "run-day: git pull failed; aborting" >&2
  exit 10
}

write_state \
  today_iso        "$TODAY_ISO" \
  day_n            "$DAY_N" \
  day_one_date     "$DAY_ONE_DATE" \
  pages_url        "$PAGES_URL" \
  last_run_started_at "$NOW_UTC" \
  last_run_status  "running"

echo "run-day: invoking claude /daily"
set +e
claude --print --permission-mode acceptEdits "/daily"
status=$?
set -e

FINISHED_UTC="$(date -u +%Y-%m-%dT%H:%M:%SZ)"
write_state \
  last_run_finished_at "$FINISHED_UTC" \
  last_run_status      "$([[ $status -eq 0 ]] && echo ok || echo failed:$status)"

echo "run-day: claude exit=$status; state written"
exit $status
