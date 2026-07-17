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

# "Did the flags take?" added by the 2026-07-17 reform (effective the
# 2026-07-19 meta): each meta must check the previous meta's "What to drop"
# against the week's entries. Metas through 2026-07-12 predate it and will
# fail this linter by design (it runs only against today's new entry).
required_meta=(
  "Entries reviewed"
  "Did the flags take?"
  "Continuity check"
  "Drift"
  "What to keep"
  "What to drop"
)

if [[ $is_meta -eq 1 ]]; then
  required=("${required_meta[@]}")
else
  required=("${required_daily[@]}")
fi

# Sundays are free-form (2026-07-17 reform, effective 2026-07-19): the four
# weekday sections are waived on the weekly rest day; a Sunday entry needs
# only at least one "## " section of any name. Weekday is derived from the
# filename date (python3 — same dependency build.sh already has). Sunday
# entries before 2026-07-19 used the weekday schema; the linter runs only
# against today's entry, so they're unaffected.
fname="$(basename "$path")"
if [[ $is_meta -eq 0 && "$fname" =~ ^([0-9]{4}-[0-9]{2}-[0-9]{2})\.md$ ]]; then
  dow="$(python3 -c "import datetime,sys; print(datetime.date.fromisoformat(sys.argv[1]).isoweekday())" "${BASH_REMATCH[1]}" 2>/dev/null || echo 0)"
  if [[ "$dow" == "7" ]]; then
    if grep -Eq '^## ' "$path"; then
      exit 0
    fi
    echo "lint-diary: $path is a Sunday (free-form) entry but has no '## ' section at all" >&2
    exit 1
  fi
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
