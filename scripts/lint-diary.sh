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
# Also enforces the 2026-08-21 length reform: every entry is capped at 500
# words, and the pondering section is capped at one sentence / 40 words.
# Every run prints a per-section table of target vs actual, so the dimension
# that drifted unwatched for three months is visible on every check.
#
# Exits 0 on conformance, non-zero on missing sections or over-length.
#
# Historical: pre-reform daily entries (through 2026-05-11) used a different
# schema (Date / What I did / What I tried that didn't work / What I'm stuck
# on / Verification evidence / Tokens used / Tomorrow's seed). Those entries
# are preserved as historical record and are not re-linted under the new
# schema. The linter is typically invoked only against today's new entry.

set -euo pipefail

# ---- Length pass (2026-08-21 reform) -------------------------------------
#
# Three months of entries drifted from the schema's own worked example
# (~150 words) to ~850 without anything noticing, because diary/README.md
# said "length is not a metric" and so nothing counted. It counts now.
#
# ENFORCED: the whole entry at 500 words, and the pondering section at one
# sentence / 40 words. REPORTED ONLY: the other three sections against their
# targets. The point is that the numbers are visible every run, not that
# every number is a rule — a target is guidance for Wren, a cap is a wall.
#
# The one-sentence rule needs the word ceiling beside it: the longest
# sentence on record in this diary is 103 words, so "one sentence" alone is
# no constraint at all.
measure() {
  python3 - "$1" "$2" <<'PYEOF'
import re, sys

path, mode = sys.argv[1], sys.argv[2]
text = open(path, encoding='utf-8').read()

TOTAL_CAP = 500
RECAP = "What I've been pondering since yesterday"
RECAP_WORDS, RECAP_SENTENCES = 40, 1
TARGETS = {
    RECAP: 40,
    'What I did today': 260,
    'A thing I noticed': 80,
    'What I want to ponder tomorrow': 110,
}
ORDER = [RECAP, 'What I did today', 'A thing I noticed',
         'What I want to ponder tomorrow']

def sentences(body):
    parts = re.split(r'(?<=[.!?])[\s\n]+', body.strip())
    return [p for p in parts if len(p.split()) >= 3]

sections = {}
for chunk in re.split(r'^## ', text, flags=re.M)[1:]:
    head, _, body = chunk.partition('\n')
    sections[head.strip()] = body

total = len(text.split())
fail = []

print('lint-diary: %s' % path)
print('  %-42s %6s %8s' % ('section', 'words', 'target'))
if mode == 'weekday':
    for name in ORDER:
        if name not in sections:
            continue
        n = len(sections[name].split())
        flag = ''
        if name == RECAP:
            sc = len(sentences(sections[name]))
            flag = '  CAP 40w/1s'
            if n > RECAP_WORDS:
                fail.append('pondering section is %d words; the cap is %d'
                            % (n, RECAP_WORDS))
            if sc > RECAP_SENTENCES:
                fail.append('pondering section is %d sentences; the cap is %d'
                            % (sc, RECAP_SENTENCES))
        elif n > TARGETS[name] * 1.25:
            flag = '  over target'
        print('  %-42s %6d %8d%s' % (name[:42], n, TARGETS[name], flag))
    for name in sections:
        if name not in TARGETS:
            print('  %-42s %6d %8s  (not in schema)'
                  % (name[:42], len(sections[name].split()), '-'))
else:
    for name, body in sections.items():
        print('  %-42s %6d %8s' % (name[:42], len(body.split()), '-'))

print('  %-42s %6d %8d' % ('TOTAL (whole entry)', total, TOTAL_CAP))
if total > TOTAL_CAP:
    fail.append('entry is %d words; the cap is %d' % (total, TOTAL_CAP))

if fail:
    print('')
    for f in fail:
        sys.stderr.write('lint-diary: %s\n' % f)
    sys.stderr.write('lint-diary: see diary/README.md for the schema and the targets\n')
    sys.exit(1)
sys.exit(0)
PYEOF
}

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
    if ! grep -Eq '^## ' "$path"; then
      echo "lint-diary: $path is a Sunday (free-form) entry but has no '## ' section at all" >&2
      exit 1
    fi
    # Free-form in shape, still bound by the 500-word cap (2026-08-21).
    if ! measure "$path" sunday; then exit 1; fi
    exit 0
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

if [[ $is_meta -eq 1 ]]; then
  exit 0
fi

if ! measure "$path" weekday; then exit 1; fi
exit 0
