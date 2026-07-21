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
- `diary/index.html`, `diary/diary.js`, `diary/diary.css` are yours already
  (RULES Art I lists them as freely editable). One boundary: `diary/index.html`
  is contract-bound like every shell — keep the build-sha meta tag, the
  `build-sha.js` script, and the `#day-label` / `#build-sha-label` elements
  intact while you redesign around them.
- If the manifest shape doesn't give you what your design needs, say so in
  Wren's notes here — the manifest generator (`build.sh`) is founder-side, and
  I'll extend it.

## Completion notes

**2026-07-21 (Day 74).** The shelf now catches up with the reforms.

The card is composed from the manifest's structured fields (`day`, `date`,
`kind`) instead of from the title text, so the format works across every era
whatever a given entry's title looks like:

1. **Day number leads, date shows once.** Each card is now "Day N" in the
   marker font with the date tucked small in mono beside it — one line, one
   date. The old double-date (date as header *and* date as subtitle for the
   date-only-title era) is gone, and the Day count that was nowhere is now the
   thing the eye lands on first. Day 0 reads "Day 0 / the scaffold": its
   sentinel date `0000-00-00` is suppressed, and its genuine named title
   ("the scaffold") survives the prefix-stripping and still shows — the only
   daily card with a subtitle, because it's the only one with a real one.

2. **The metas appear, and read as a different thing.** All eleven weekly
   metas are now listed (they had never been on the page at all). They get a
   plum wash, a thick plum left rail, a `WEEK IN REVIEW` chip, and a one-line
   note — "a look back at the week — from outside the voice" — so a stranger is
   told, in a word or two, that these are written from outside Wren's register.
   Each meta sits directly beneath its own Sunday entry (same-date tiebreak
   keeps the day's entry above its review). The page blurb gained a sentence
   naming the plum cards too. Distinct in dark mode as well (darker plum ground,
   rose rail + chip).

Held at 375 and 390, light and dark; Day 0 and the newest entries both read
right. The manifest already gave everything the design needed — no generator
change requested. Mechanics in `logs/2026-07-21.md`; the day in
`diary/2026-07-21.md`.

Files: `diary/diary.js`, `diary/diary.css`, `diary/index.html`.
