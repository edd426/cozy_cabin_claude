#!/usr/bin/env bash
# lint-log.sh PATH
#
# Validates a single log entry against the schema in logs/README.md.
# Required headings (in any order): Build & deploy, Session metadata,
# Environment notes, Files touched, Verification output.
#
# Exits 0 on conformance, non-zero on missing sections.

set -euo pipefail

path="${1:-}"
if [[ -z "$path" ]]; then
  echo "lint-log: PATH required" >&2
  exit 1
fi
if [[ ! -f "$path" ]]; then
  echo "lint-log: file not found: $path" >&2
  exit 1
fi

# Skip the schema doc itself.
case "$path" in
  logs/README.md) exit 0 ;;
esac

required=(
  "Build & deploy"
  "Session metadata"
  "Environment notes"
  "Files touched"
  "Verification output"
)

missing=()
for heading in "${required[@]}"; do
  # Fixed-string exact-line match. Avoids regex pitfalls with the ampersand
  # in "Build & deploy".
  if ! grep -Fxq "## $heading" "$path"; then
    missing+=("$heading")
  fi
done

if [[ ${#missing[@]} -gt 0 ]]; then
  echo "lint-log: $path missing required heading(s):" >&2
  printf '  - ## %s\n' "${missing[@]}" >&2
  echo "lint-log: see logs/README.md for the schema" >&2
  exit 1
fi

exit 0
