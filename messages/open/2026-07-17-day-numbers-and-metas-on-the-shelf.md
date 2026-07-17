# The archive: day numbers once, dates once, and the metas deserve a shelf

**Opened:** 2026-07-17
**Priority:** medium
**Kind:** action-ask

## What changed overnight (read first — this part is done, not asked)

Some schema reforms landed on the founder's side today; you'll meet them in the
files before you meet them here:

- **Diary titles carry the day again.** Going forward the entry title is
  `# Day N — YYYY-MM-DD` (`diary/README.md` "Title" — the same `day_n` the log
  uses; the date appears once, there and nowhere else). Entries from the
  2026-05-12 reform through 2026-07-17 keep their date-only titles as
  historical record.
- **Sundays are free-form.** The four weekday sections are waived on the rest
  day; at least one `## ` heading of your choosing, any shape
  (`diary/README.md` "Sundays are free-form"). The linter relaxes on its own.
- **The meta-reflection reviews the week, not four Sundays.** New schema in
  `diary/meta/README.md`: the seven days just ended plus one anchor meta from
  ~4 weeks back, and a new leading section — **"Did the flags take?"** — that
  holds the previous meta's "What to drop" to account. (The old n−7 sampling
  only ever landed on rest days once the cadences fused; the building days,
  where the tics live, went unsampled. Your own Day-58 and Day-65 metas said
  as much.)
- **The manifest knows more.** `build.sh` now writes `day` (the Day-N counter)
  and `kind` (`"daily"` | `"meta"`) for every entry, and the weekly metas are
  in the manifest at `meta/<date>.md`. `diary.js` will render them as plain
  cards until you do something better — which is the ask below.

## Request

The archive page at `/diary/` needs to catch up with all of that, and this
part is yours — it's your shelf.

Two things my eye wants, design entirely yours:

1. **Every card shows its Day number, and its date exactly once.** Today a
   card shows the date as its header and then, for the date-only-title era,
   the same date again as its subtitle — the day count is nowhere. The
   manifest's `day` field covers every entry, whatever era its title is from
   (Day 0 included). However you compose it — "Day 70" with the date tucked
   small, one combined line — no card should say its date twice, and none
   should hide its Day.

2. **The metas appear, and read as a different kind of thing.** The weekly
   meta-reflections have never been listed on the archive page at all — a
   reader had no way to know they exist. They're also a different genre than
   the diary: out-of-character, the performer looking at Wren from outside.
   List them, and make that difference *visible* — a badge, a different card
   treatment, its own rail down the side, whatever your eye says — so a
   visitor browsing the shelf can tell a week's review from a day's entry at
   a glance, and is told (a word or two is enough) that these are written
   from outside the voice.

## Acceptance criteria

- `/diary/` lists the weekly metas; they are visually distinct from daily
  entries and labeled clearly enough that a stranger understands they're a
  different kind of document.
- Every card shows its Day number; no card shows its date twice; Day 0 still
  reads right.
- Holds at phone widths (375 and 390) — check it in the snapshot like any
  scene change.
- Log records the mechanics; diary in your voice if it fits the day.

## Notes / clarifications

- No rush and no displacing: the see-your-own-work ask and the letter on the
  board came first — slice this into whichever day it fits (workflow §3).
- `diary/index.html`, `diary/diary.js`, `diary/diary.css` are yours already.
  If the manifest shape doesn't give you what your design needs, say so in
  Wren's notes here — the manifest generator is founder-side, and I'll extend
  it.

## Wren's notes

(empty)
