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

## Acceptance criteria

This is multi-day; leave it in `open/` and append to your notes each day.

- Every building day until 2026-10-07 ships **one thing a visitor can touch**,
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

- Build whatever this needs. If a tap wants a gallery state that performs it
  before the shutter, or a witness of its own, make it. Just build the thing
  a visitor touches first and its instrument second, not the other way
  round.
- If any of this gives you something to tell Gnomon, the box is open and the
  turn is yours. It has been since the sixth.

— Evan

## Wren's notes (appended by the agent)

### Day 139 — 2026-09-24 — the crowns answer a hand

Shipped: **tap a crown and it shakes; in autumn it lets one leaf go.** All three
drawn crowns take it — the two on the front face and the near one on the door
side — so a hand gets the same answer whichever face a visitor is standing at
(Art XIII).

- **What a visitor can do that they could not yesterday.** Press (or tab to, and
  press Enter or Space on) any tree in the clearing. The crown swings four
  degrees and rings back through its own rest, five crossings, dying away over
  about nine tenths of a second — much harder and much shorter than the wind's
  own 1.2° over nine seconds, which is the whole reading: at this size you
  cannot see what pushed a crown, only how hard and how briefly. A hand is the
  one thing out here in a hurry. And because it is autumn, one extra leaf lets
  go of the crown you touched and takes eleven seconds to reach the grass.
- **The season is half the answer.** The shaken leaf lives inside
  `.sprite--leaffall`, which is `display: none` outside autumn — so the tap
  gives a shake all year and a leaf only in the months that have one to give.
  No month is tested in the new code; `season.js` owns the year.
- **Why the door-side crown too, when the wind cannot move it.** That face looks
  straight up the west wind's throat, which is why its smoke stands straight
  (Day 61) and its tree does not sway (Day 120). A hand is not a wind. It
  reaches a tree from wherever the hand is, so the one crown the weather can
  never move here is the one a visitor can — which is the first thing this
  place has that a *person* can do and the clearing cannot do to itself.
- **Nothing in the drawing moved.** The reach is a transparent pad
  (`.crown-touch`), needed because the front crowns are `<img>` elements and a
  replaced element renders no `::before`, so the mailbox's Day-81 tap-pad trick
  cannot be played on them directly — and because the small right crown is 30px
  wide on a phone, under the 44px minimum. `check-drift` reported 0 px on all
  five frames the change could have touched, so no baseline was removed.
- **Tested.** `/tmp/test-crown-touch.js` performs the tap — click, Enter, Space
  and a real coarse-pointer `tap()` — on all three crowns at 375, 390 and 900,
  and asserts the reach clears 44×44, that the crown crosses rest every swing
  and each swing is smaller than the last, that it ends exactly at rest, that
  the leaf leaves the canopy and is lower a second later, that summer starts no
  fall at all, and that the mailbox and the map card still open. Break-tested
  two ways: dropping the pad's widening reddens only the small crown and only at
  the two phone widths, and making the shake lean one way only reddens the
  crossing assertion everywhere.

**Still open on this mission** (the list, so the next morning does not have to
rebuild it): a **sound**, which nothing here has ever made; something
**unsignposted**, which this is deliberately not (`cursor: pointer` is a mild
signpost and meant to be); and the two you named that I have not reached —
something that *holds* a state for a visitor, and a thing that answers a tap
without moving, which is what a visitor who has asked for reduced motion is
owed and currently gets nothing of.

**One thing I could not build and want to name rather than leave as a silence.**
Nothing in this place can witness a tap. Every check on the almanac varies on a
season or an hour, and a hand is neither — it is the same slot the bee's round
has never had (Day 108). The honest witness would have to *perform* the
interaction, which is a different kind of instrument from anything standing
here. Today the disposable test is the only thing that has ever pressed one of
these, and it goes in the bin with the session. You said to build the thing a
visitor touches first and its instrument second; I have done the first and I am
writing down that the second does not exist yet, so it does not become the kind
of silence Day 120 and Day 133 went looking for.
