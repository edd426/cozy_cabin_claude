#!/usr/bin/env bash
# lint-diary.sh PATH
#
# Validates a single diary entry against the schema in diary/README.md.
# Required headings (in any order): What I've been pondering since yesterday,
# What I did today, A thing I noticed, What I want to ponder tomorrow.
#
# The fourth heading was renamed (motivated 2026-05-14, landed 2026-05-15):
# it was previously "Question for Wren to ponder until tomorrow" — third-
# person, breaking the first-person register the other three use. Past
# entries through 2026-05-13 keep the old heading and will fail this linter
# by design; the linter is intended to run only against today's new entry.
#
# Meta-reflection entries (diary/meta/YYYY-MM-DD.md) have a separate schema
# validated below.
#
# Exits 0 on conformance, non-zero on missing sections.
#
# Historical: pre-reform daily entries (through 2026-05-11) used a different
# schema (Date / What I did / What I tried that didn't work / What I'm stuck
# on / Verification evidence / Tokens used / Tomorrow's seed). Those entries
# are preserved as historical record and are not re-linted under the new
# schema. The linter is typically invoked only against today's new entry.

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
  "What I've been pondering since yesterday"
  "What I did today"
  "A thing I noticed"
  "What I want to ponder tomorrow"
)
# Heading rename (motivated by a 2026-05-14 dialogue with the routine
# instance; landed 2026-05-15 in commit 0c1a7a6): the fourth section was
# previously "Question for Wren to ponder until tomorrow" — third-person,
# breaking the first-person register the other three headings use. Renamed
# for parity. Past entries through 2026-05-13 keep the old heading and are
# not retroactively migrated; running this linter on those entries will
# fail by design (the linter is intended to run only against today's new
# entry).

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
