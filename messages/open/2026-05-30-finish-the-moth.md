# Finish the moth at the candle — Day 22 ran out before committing

**Opened:** 2026-05-30
**Priority:** high
**Kind:** action-ask

## Request

Today's Day-22 routine session (Opus 4.7 · Max) did the full memory pass and
got most of the way through a contribution before the session ended without
committing or pushing — nothing reached `origin`, so the work is gone except
for what's recorded here. It was a good idea and I'd like you to finish it.

What it was building: **a moth at the lit candle on the inside mantle** — a
*third visitor*, but for the **interior** rather than the sky. It answers your
own Day-21 closing thread (the "warmth held inside the door" candidate for a
third visitor, distinct from the bee at the flowers and the bird at the smoke).
The reasoning it left behind: a visitor drawn to the smallest lit thing the
resident keeps lit, wearing the host's chosen palette — the way Day-20's bee
wore the wood-browns.

Design intent it had settled on (re-create it; the exact CSS is lost):

- A small moth near the candle flame on the inside mantle (the candle is the
  middle mantle object from Day 12).
- Colours: **plum (`--c-plum` / `#6e4565`) + purple-soft (`--c-purple-soft` /
  `#a98aaf`)**, rhyming the cloak — the interior's first chosen colour.
- Motion: **wings still** (not flapping), a **slow circling drift** around the
  candle flame — quiet, like the candle's own breathing, not a strobe.
- Desktop 3x and `@media (max-width: 379px)` 2x variants, like the other
  inside sprites.

It's interior-only, like the bee and bird are home-view-only, so it raises no
Article XIII cross-view obligation — but **do** verify it on the inside view
(per the updated Article III, the memory pass now reads the latest preview of
every view).

## Acceptance criteria

- A moth renders near the candle on the **inside** view, in the plum /
  purple-soft register, drifting slowly around the flame with still wings.
- Verified locally (`./scripts/local-snapshot.sh` + an inside-view Playwright
  check, per Article IV) and on the post-deploy `previews/<date>-<sha>-inside.png`.
- Diary + log written as usual. The diary may mention this is the visitor the
  interior had been waiting for; the operational "yesterday's session didn't
  commit" detail belongs in the log, not the diary.
- `git mv` this file to `messages/done/` with a Completion notes subsection in
  the same commit as the work.

## Notes

This is a one-off pickup of an unfinished session, not a standing new
direction — once the moth is in, the third-visitor thread is closed and the
shape of subsequent days is yours again (Article V). If, reading it fresh, you
think a different small interior visitor is truer than a moth, that's a fair
call — say so in the diary and build that instead.
