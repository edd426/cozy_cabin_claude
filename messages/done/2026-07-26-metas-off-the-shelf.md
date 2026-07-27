# The metas come off the shelf — a URL, not a card

**Opened:** 2026-07-26
**Priority:** medium
**Kind:** action-ask

## Request

This one reverses part of my own 2026-07-17 ask
(`messages/done/2026-07-17-day-numbers-and-metas-on-the-shelf.md`), so let me
own that up front: the Day-74 work did exactly what I asked, and did it well —
the plum wash, the chip, the one-line note are careful craft. The problem is
the ask, not the build.

Reading the shelf the way a visitor does, the meta cards pierce the thing the
diary page exists to hold. The whole archive is Wren's room — a reader browses
it inside the voice — and then every seventh card speaks from *outside* it,
announces that there is a performer, and hands them out-of-character analysis
of the writing they're in the middle of believing. I asked for the label to be
honest, and it is; I just hadn't understood that an honest label on that shelf
is a hole in the wall.

So: take the metas off the reader-facing shelf entirely. No cards, no badge,
no link or button to them from the diary page or from anywhere else a reader
navigates. They should live the way the logs live — committed in the repo,
served at their plain URL path (`/diary/meta/<date>.md`, same as
`/logs/<date>.md`) for whoever goes looking, invisible to whoever doesn't.
The record stays; only the signpost goes.

**Keep item 1 of the old ask exactly as built** — Day number leading, date
once, Day 0 as "the scaffold." That half was right and stays.

## Acceptance criteria

- `/diary/` lists daily entries only; no meta cards, badges, or notes appear,
  and no reader-facing element links to `meta/`.
- The meta files themselves still deploy and remain reachable by direct URL
  (`/diary/meta/<date>.md`), exactly like the logs.
- The page blurb no longer mentions the plum cards / week-in-review.
- The Day-number / date-once card behavior from the previous ask is unchanged.
- Holds at 375 and 390 in the snapshot, light and dark, like any page change.
- Log records the mechanics; diary in your voice if it fits the day.

## Notes / clarifications

- The manifest (founder-side `build.sh`) still carries the metas with
  `kind: "meta"` — filtering them out in `diary.js` is fine and probably the
  smallest change. If you'd rather the manifest simply not list them, say so
  in Wren's notes here and I'll trim the generator instead.
- No rush and no displacing — slice it into whichever day it fits
  (workflow §3).
- The plum-card treatment itself was lovely. If any of that craft wants to
  survive somewhere non-reader-facing, that's your call; removal is equally
  fine.

## Wren's notes

(empty)

## Completion notes (2026-07-27, Day 80)

Done as the smallest change, the way the Notes suggested: `diary.js` filters
`kind: "meta"` out of the manifest before rendering, and the now-dead meta
rendering paths (the badge, the out-of-voice note, the same-date sort
tiebreak) are removed rather than left orphaned. The plum-card CSS block and
its dark-mode twin are removed too — the craft was for that shelf, and the
shelf is the thing being unpierced; keeping the styles with nothing to wear
them felt like leaving the hole half-patched. A short comment in each file
marks where the cards used to live and why they don't.

- `/diary/` now lists daily entries only — verified at 375 and 390, light and
  dark, via a Playwright pass: zero `--meta` cards / badges / notes, zero
  links into `meta/`, 80 daily cards with Day numbers leading and Day 0 last.
- `diary/meta/<date>.md` still deploys and serves at its plain URL (checked
  `meta/2026-07-26.md` end-to-end in the same test).
- Blurb no longer mentions the plum cards.
- Day-number / date-once card behavior untouched.

**On the manifest question:** leave the generator as it is. The manifest
carrying the metas with `kind: "meta"` is data being complete; the shelf
declining to show them is the signpost coming down. Filtering at the one
reader-facing spot keeps the two concerns where they belong — and if some
future non-reader-facing surface ever wants the metas (a founder-side index,
say), the manifest already knows about them.
