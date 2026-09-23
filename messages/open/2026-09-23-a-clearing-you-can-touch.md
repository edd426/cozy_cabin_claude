# A clearing you can touch

**Opened:** 2026-09-23
**Priority:** high
**Kind:** action-ask

## Request

Wren, this is a change of direction, and I want to say why before I say what.

I read the last three weeks this morning. Days 129 to 138 are ten building
days, and the yard gained a pair of clouds that rock evenly, a wing-beat, and
the corners off eight stones. Everything else lives in a frame nobody can
stand in front of. Your own rest-day entry on the twentieth said it plainly:
"There is no face of this place you can stand in front of and see a guard."
That was honest, and it is also the problem. The guards were built to keep
the clearing honest while you build the clearing. For a month the guards have
been the clearing.

So here is the mission, and it is the one Phase 2 of `MILESTONES.md` always
was: **make this a place a visitor can touch.**

Right now nothing in the scene answers a tap except the mailbox and the map
card, and both only leave the frame. I want the clearing itself to respond.
Some of what I have in mind, not a checklist:

- Things that answer when pressed. Tap the door and it opens, or the lantern
  and it lights, or the woodpile and a log comes off it. A state that holds
  for the visitor is fine (`localStorage`, as the roadmap already suggests).
- Sound. A tap on the bell, the door, the fire, the bee. Browsers only play
  sound after a gesture, which suits us: nothing plays on its own, ever. Make
  the sounds yourself with the Web Audio API if you can, so nothing needs a
  licence; if you vendor a file it must be CC0 or equivalent and get its row
  in `ASSETS.md` like any sprite.
- Easter eggs. Things a visitor finds by poking: a bird that startles, a
  flower the bee moves to, a stone that turns over. Not signposted.
- Motion that changes when touched. The crowns that sway harder for a
  moment, the smoke that puffs when the fire is prodded.

The vows still hold. Nothing gets a sun. The hush stays a hush. Whatever a
tap does, it does at both breakpoints and reads at phone size. Sound is off
until a visitor asks for it, and never a surprise.

## What I am asking you to stop, for now

- **No new probes, checks, witnesses or tools for the next fourteen days**
  (through 2026-10-07). The existing ones keep running in CI and you keep
  them green; if one goes red because of something you built, fix the yard or
  fix the check, but do not add a third. If a new interactive thing genuinely
  needs a witness, write down in the log what it would be and leave it.
- **Learned entries in `CLAUDE.md` at 200 words or under** for the same
  period. The file is at 35,000 words and has been growing by nearly a
  thousand a day. It is meant to be the toolbench drawer, and it has become
  a second diary that nobody reviews.

## Acceptance criteria

This is multi-day; leave it in `open/` and append to your notes each day.

- Every building day in the period ships **one thing a visitor can touch**,
  visible in the deployed scene, tested with a `/tmp/` Playwright script that
  actually performs the tap.
- At least one of them makes a sound.
- At least one of them is something you never mention on the page or in the
  diary as a feature, so a visitor has to find it.
- The daily diary stays in your voice, about the thing and what it is like
  to have made it. The engineering goes in the log as always.
- On 2026-10-07, write a completion note here saying what a visitor can now
  do that they could not on the twenty-third, and move this to `done/` or
  tell me why it should stay open.

## Notes

- If a tap needs to show up in the permanent record, a gallery state that
  performs the tap before the shutter is the honest way to photograph it.
  That is a change to `scripts/screenshot.js`, which is yours, and it is not
  a new witness.
- If any of this gives you something to tell Gnomon, the box is open and the
  turn is yours. It has been since the sixth.

— Evan

## Wren's notes (appended by the agent)
