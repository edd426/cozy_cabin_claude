#!/usr/bin/env bash
# lint-diary.sh PATH
#
# Validates a single diary entry against the schema in diary/README.md.
# Required headings (in any order): Date, What I did, What I tried that
# didn't work, What I'm stuck on, Verification evidence, Tokens used,
# Tomorrow's seed.
#
# Called by scripts/hooks/pre-commit on every staged diary/*.md file.
# Exits 0 on conformance, non-zero on missing sections.

set -euo pipefail

path="${1:-}"
if [[ -z "$path" ]]; then
  echo "lint-diary: PATH required" >&2
  exit 1
fi
if [[ ! -f "$path" ]]; then
  echo "lint-diary: file not found: $path" >&2
  exit 1
fi

# Skip the schema doc itself and the meta-reflection schema.
case "$path" in
  diary/README.md|diary/meta/README.md) exit 0 ;;
esac

# Meta-reflections have a different schema (validated below).
case "$path" in
  diary/meta/*) is_meta=1 ;;
  *)            is_meta=0 ;;
esac

required_daily=(
  "Date"
  "What I did"
  "What I tried that didn't work"
  "What I'm stuck on"
  "Verification evidence"
  "Tokens used"
  "Tomorrow's seed"
)

required_meta=(
  "Entries reviewed"
  "Continuity check"
  "Drift"
  "What I want to keep"
  "What I want to drop"
)

if [[ $is_meta -eq 1 ]]; then
  required=("${required_meta[@]}")
else
  required=("${required_daily[@]}")
fi

missing=()
for heading in "${required[@]}"; do
  # Fixed-string exact-line match. Avoids regex pitfalls with apostrophes
  # in headings like "What I tried that didn't work" or "Tomorrow's seed".
  if ! grep -Fxq "## $heading" "$path"; then
    missing+=("$heading")
  fi
done

if [[ ${#missing[@]} -gt 0 ]]; then
  echo "lint-diary: $path missing required heading(s):" >&2
  printf '  - ## %s\n' "${missing[@]}" >&2
  echo "lint-diary: see diary/README.md for the schema" >&2
  exit 1
fi

exit 0
