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

### Day 140 — 2026-09-25 — the fire answers a prod, and the clearing makes a sound

Shipped: **press the fire on the hearth and the bed of coals flares, five sparks
go up the flue, and the hearth cracks** — the first sound this place has ever
made. That closes the "at least one of them makes a sound" criterion.

- **What a visitor can do that they could not yesterday.** Go inside and press
  (or tab to and press Enter or Space on) the firebox. The bed opens and
  brightens, the flame warms a shade paler for a beat, five pale cells lift off
  the coals and climb through the flame and wink out before the lintel — and you
  hear it: a low thud, the poker meeting the bed, then a run of three to five
  short cracks over the next third of a second, quieter and duller as they go.
  Under a second altogether, and then the fire stands exactly where it stood.

- **Nothing is vendored and nothing is fetched.** Every sound is built at run
  time out of a half-second of white noise made once in memory and shaped by
  filters and envelopes — which is what a fire's crack physically *is*, a burst
  of broadband noise from a pocket letting go, so the synthesis is the thing
  itself and not a stand-in for a recording. `ASSETS.md` has its row, so the
  licence condition you set stays checkable even though there is nothing to
  license.

- **Four rules are written into `sound.js` and they are the whole design.**
  Nothing ever plays on its own: there is no ambient bed, no loop, and no timer
  anywhere in the file, and the audio context is built lazily inside the call
  stack of a real press, so if nobody ever presses, nothing is ever built. Every
  sound is under a second. `PEAK` is a hard ceiling on the master gain and the
  day's test reads it back off the live page rather than taking the file's word.
  And a sound may never be the *only* answer — it is the one thing here that can
  fail completely and invisibly (a muted tab, a device with no output, a refused
  context), so the flare is put up first and the crack is asked for second, in a
  `try`, defensively.

- **Why this closes the reduced-motion gap I named yesterday.** Day 139's note
  ended on a thing the crowns could not do: `theme.css` collapses every duration
  under `prefers-reduced-motion`, so a shaken tree gives a visitor who has asked
  for stillness precisely nothing, and "a tap that must speak to such a visitor
  will have to speak in something other than movement." A sound is not motion.
  It is the first answer here that does not depend on anything moving in order
  to arrive, and the day's test asserts it under `reducedMotion: 'reduce'`: the
  sparks are born and gone inside a frame, the flare is instant both ways, and
  the crack still comes.

- **What a prod may NOT do, which is the line I care most about.** It may not
  feed the fire. The armful beside the hearth holds the count the season gave it
  (Day 125) and the flame stands the tiers the hour gave it (Day 126); a hand is
  neither a season nor an hour. Nothing is spent and nothing is gained — the
  shape of every other turn here.

- **Nothing in the drawing moved.** The sparks are `display: none` at rest, so
  the frame is unchanged and no drift baseline was removed today; the gallery
  guard skips an element that shows in no state, and every count reads the
  firebox exactly as it always has.

- **Tested.** `/tmp/test-fire-prod.js` performs the prod at 375, 390 and 900,
  with click, Enter, Space and a real coarse-pointer tap, and counts what the
  page *actually* schedules — it wraps the real `AudioContext` rather than
  asking `sound.js` how it feels, so it can assert that no context exists before
  the first press, that one exists after it, that four to six sources are
  started, and that the master gain is exactly the declared `PEAK`. It also
  asserts the reach clears 44×44 and sits centred on the firebox, that every
  spark rises and none ever leaves the jambs or the lintel, that the flare
  settles and the sparks are gone, that the tier count and the armful are
  unchanged by the touch, and that the Day-139 crown shake and the map card
  still work. Four break-tests, each red where it should be: a silent
  `crackle()`, a pad without its widening, the flare written as a one-shot
  animation (which stops the tiers' own flicker), and a prod that adds a log.

- **One thing the break-testing taught that I had assumed wrong.** The crown pad
  only needed `min-width`/`min-height` on a phone; this one needs it at *every*
  width — the firebox is 36×42 at the desktop scale and 24×28 on a phone, so it
  is under the 44px minimum everywhere. Dropping the widening reddens all three.

**Still open on this mission** (the running list): something **unsignposted**,
which neither of the two built so far is — both wear `cursor: pointer` on
purpose; and something that **holds a state** for the visitor across a visit.

**And still no witness.** Yesterday I wrote that nothing here can hold a tap,
because every check on the almanac varies on a season or an hour and a hand is
neither. That is unchanged, and a sound makes it sharper rather than better: a
crack is not merely unphotographed, it is unphotographable — the whole record
here is stills, and no still can ever carry it. The day's disposable test is the
only thing that has ever heard this place, and it goes in the bin with the
session.
