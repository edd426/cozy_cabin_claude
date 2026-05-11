#!/usr/bin/env bash
# verify-deploy.sh URL [CLAIM]
#
# Checks that the deployed site at URL reflects the local git HEAD, and that
# the optional CLAIM string appears in the served page or in scene.html.
#
# Output is intentionally compact so the agent can paste it verbatim into
# the log's "Verification output" section (logs/YYYY-MM-DD.md).
#
# Exits 0 on success. Non-zero codes:
#   2   could not fetch URL
#   3   build-sha.js on the deployed site does not contain HEAD
#   4   claim string not found on deployed page
#
# Usage:
#   ./scripts/verify-deploy.sh https://edd426.github.io/cozy_cabin_claude/ "smoke"

set -euo pipefail

URL="${1:-}"
CLAIM="${2:-}"

if [[ -z "$URL" ]]; then
  echo "verify-deploy: URL required" >&2
  exit 1
fi

REPO_ROOT="$(git rev-parse --show-toplevel)"
cd "$REPO_ROOT"

SHA="$(git rev-parse HEAD)"
SHORT="${SHA:0:7}"

echo "verify-deploy: URL=$URL"
echo "verify-deploy: HEAD=$SHA"

# Fetch the build-sha.js asset specifically. We grep for the SHA there because
# index.html's <meta name="build-sha"> is filled in client-side by build-sha.js
# and curl can't see the post-load DOM.
SHA_JS_URL="${URL%/}/build-sha.js"
SHA_JS_BODY="$(curl -fsSL --max-time 15 --retry 2 "$SHA_JS_URL" 2>/dev/null || true)"

if [[ -z "$SHA_JS_BODY" ]]; then
  echo "verify-deploy: could not fetch $SHA_JS_URL" >&2
  exit 2
fi

if ! printf '%s' "$SHA_JS_BODY" | grep -q "$SHA"; then
  echo "verify-deploy: deployed build-sha.js does NOT contain HEAD ($SHORT)" >&2
  echo "verify-deploy: deployed body excerpt:" >&2
  printf '%s\n' "$SHA_JS_BODY" | head -c 400 >&2
  echo "" >&2
  exit 3
fi
echo "verify-deploy: SHA match ✓ ($SHORT)"

# Claim grep — check the rendered page (index.html + scene.html together).
if [[ -n "$CLAIM" ]]; then
  HOME_BODY="$(curl -fsSL --max-time 15 --retry 2 "$URL" 2>/dev/null || true)"
  SCENE_BODY="$(curl -fsSL --max-time 15 --retry 2 "${URL%/}/scene.html" 2>/dev/null || true)"
  COMBINED="$HOME_BODY"$'\n'"$SCENE_BODY"

  if ! printf '%s' "$COMBINED" | grep -qF -- "$CLAIM"; then
    echo "verify-deploy: claim NOT found: \"$CLAIM\"" >&2
    exit 4
  fi
  echo "verify-deploy: claim \"$CLAIM\" found ✓"
fi

echo "verify-deploy: OK"
exit 0
