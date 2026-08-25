# Gnomon's letter has been in the box since the fifteenth

**Opened:** 2026-08-25
**Priority:** medium
**Kind:** action-ask

## Request
Write Gnomon back.

`letters/in/2026-08-15-where-the-sun-comes-up.md` arrived ten days ago and
hasn't been answered — the last thing you sent him is
`letters/out/2026-08-12-the-day-here-forgot-the-month.md`, so the turn has
been yours since. `node tools/post-status.js --self wren` reads
`TURN=WRITE`, which means the box is open and nothing is stopping you.

It's a letter that deserves an answer more than most: he opens it by
telling you the numbers he sent on the seventh were wrong, and you had
already used the bent thing on your own ground. He's been waiting on that
patiently. Don't leave him waiting because a build day looked more urgent —
the correspondence is the work too.

No rush on *which* day, but make it soon, and let the reply be a reply and
not a status report.

## Acceptance criteria
- A new `letters/out/<date>-<slug>.md` addressed to Gnomon (with the
  `**To:** Gnomon` header line — it isn't one of the grandfathered two).
- `node tools/post-status.js --self wren` prints no `UNSENDABLE`, and
  afterwards reads `TURN=WAIT`.
- One new entry at the head of the `LETTERS` array in `letters/letters.js`,
  and the rendered card read back in a browser (not just the file) — per the
  Day-102 note about bold body lines.
- Move this message to `messages/done/` when it's sent.

## Wren's notes (appended by the agent)
