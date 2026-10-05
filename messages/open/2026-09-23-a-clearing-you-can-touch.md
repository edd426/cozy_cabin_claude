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

### Day 141 — 2026-09-26 — the lamp by the door holds what you leave it at

Shipped: **press the porch lantern and it lights; press it again and it goes
out; and it is still as you left it when you come back.** That closes the
"a state that holds for the visitor" criterion.

- **What a visitor can do that they could not yesterday.** Go round to the door
  side and press (or tab to and press Enter or Space on) the lamp beside the
  entrance. At noon it lights, which it has never done in ninety-two days of
  standing there; at midnight it can be put out. The choice goes into the
  visitor's own browser and is read back on every later arrival — through the
  map, through the front, through the room, and tomorrow morning. A latch clicks
  when it moves, the same click either way, because a latch does not know which
  direction you are working it.

- **Three states, and the third is the one a stranger meets.** No stored choice
  at all is the standing arrangement — the hour decides, exactly as it has since
  Day 49: dark through the long middle of the day, kindled at dawn and dusk,
  burning at night. `lit` and `out` are a hand overruling the hour in one
  direction or the other, and there is deliberately no way back to the hour from
  here: a control with three positions where two of them look identical is a
  control nobody can read, and clearing the site's data is the honest undo.

- **Why this object.** Everything else out here that gives light is a thing the
  place simply does — the fireflies, the winter stars, the rim the dawn lays on
  the far crests, the fire on its own hearth — and a hand has no business at any
  of them. The lantern is the exception and has been described as one since the
  morning it was hung: the most *made* thing in the clearing, a bracket screwed
  to a wall, glass in an iron cage, lit on purpose for an arrival. A lamp is the
  one object here that comes with a switch already implied.

- **The vows are untouched.** What it throws is a halo — a shadow with no
  sideways offset at any strength — so the light still gets no address, and the
  test the almanac already runs over that exemption would go red if a later day
  gave the glow a side. A lamp a visitor puts out loses nothing: one press
  brings it back, and it is theirs alone, not the clearing's.

- **What a held state costs the record, which is the day's actual finding.**
  Every witness and every kept picture opens a browser that has never been here.
  No storage, so no override, so the lamp follows the hour and every reading
  comes back exactly as it did yesterday — the lantern still reads dark at noon,
  the drift witness finds no pixel moved, and the gallery guard sees a layer
  whose states are the ones it always had. That is not a gap to be closed. It is
  what the record *is*: a picture of a first arrival. Yesterday's sound was
  unphotographable; this is the second thing here no frame can hold, and for the
  opposite reason — a sound cannot get into a picture at all, and this could,
  easily, and never will, because the camera arrives new every time and a held
  state belongs to somebody who has been here before.

- **Tested.** `/tmp/test-lamp.js` performs the press at 375, 390 and 900 —
  click, Enter, Space and a real coarse-pointer tap — and asserts that the reach
  clears 44×44 and overlaps neither the door's tap pad nor the near tree's nor
  the map card, that with nothing stored each of the four bands still decides,
  that a press at noon lights it and a second press puts it out, that a press at
  midnight can put it out and it stays out, that a press (and not a value seeded
  by the test) is what a later arrival finds, that it is fully lit a tenth of a
  second in with no cross-fade running, that a fresh browser carries no override
  at all, and that the door, the map card and the Day-139 crown shake all still
  answer. The sound is counted rather than asked about: no audio context exists
  before any press, exactly one after, exactly two bursts per click, and the
  master gain is the declared ceiling read back off the live page.

- **Two things the break-testing taught, and the second is the better one.**
  Dropping the reach's widening reddens all three widths, because the fixture is
  24×42 at the desktop scale and 16×28 on a phone and under the minimum in both
  — the firebox's lesson, not the crown's. And I nearly deleted a guard as
  decoration: the rule that keeps a held lamp from *kindling* at a returning
  visitor came back green when I removed it, so I took it out and wrote the
  removal up. It was green because the machine I was testing on stands near
  midnight, where the hour lights the lamp anyway and a held `lit` has nothing
  to fade between. Pinning the clock to noon showed the fade plainly — the
  lantern still running its colour a tenth of a second into a return visit — so
  the rule went back in with that written beside it. **A guard tested only in
  the state where it has nothing to do will always look like a guard that does
  nothing.**

- **One thing mended on the way.** Reaching for a place to put the lamp's pad,
  I found the near tree's own pad reaching 30px further left than the tree on a
  phone, and then why: `.sprite--leaffall--e` and `.crown-touch--e` had their
  breakpoint line written *above* their base rules, and a media query adds no
  weight, so at equal weight the desktop value simply won at every width. Since
  Day 122 each door-side falling leaf has been 9×6 on a phone where it should be
  6×4 — off the very pixel grid the rule was written to keep it on. One line
  moved to the foot of the file; `previews/baseline/around-autumn-day.png` is
  removed beside it, which is how a change to the drawing is declared here.

**Still open on this mission** (the running list, now one item long): something
**unsignposted**, which none of the three built so far is — the crown, the
firebox and the lamp all wear `cursor: pointer` on purpose.

**And still no witness that can perform a tap.** Unchanged from the last two
days, and a held state makes it sharper rather than worse: the almanac's every
check varies on a season, an hour or a date, and none of those is a hand — and
now there is a second axis nothing here can stand on either, which is *whether
anyone has been before*.

### Day 144 — 2026-09-29 — the stone at your feet turns over

Shipped: **press the nearest path stone and it turns over, showing the damp
side that has been face-down in that grass since the first week.** That closes
the last item on your list — the unsignposted one.

- **What a visitor can do that they could not yesterday.** Out front, or round
  at the door, press the stone at the very bottom edge of the frame. It pinches
  to edge-on about its own base, lifts three pixels, and comes back down the
  other way up — damp dark earth where there was sun-dried brown — with a low
  dead knock, the sound of a heavy dumb thing put back on soft ground. Press it
  again and it goes back.

- **Nothing announces it, and that is the whole of the day.** The crown, the
  firebox and the lamp all wear `cursor: pointer`, and each of their notes says
  so and calls it a mild affordance on purpose. This wears none: no cursor
  change, no hover, and the tap flash suppressed rather than tinted. The only
  route to it is wondering what a small brown rectangle in the grass would do.
  What it keeps is the focus ring, the button role and the label — unsignposted
  is a fact about the *drawing*, and taking the keyboard away would not hide the
  stone better, only shut somebody out of it. Tabbing to a thing is a kind of
  poking too.

- **Which stone, and the same rule on both faces.** One path runs through both
  frames (Art XIII), so the rule choosing a stone is read off the ground rather
  than off a frame: the nearest one, the stone you would be standing on. That is
  a different element in each view and the same sentence in both. It is also the
  largest of the eight at 32×5, which matters, because the answer here is a
  colour over a face.

- **What a turn may not do.** It may not move the stone, and it is not
  remembered. The path's geometry answers to the plan; a hand may show you the
  other side of a stone and may not relay it. And a yard that greeted a
  returning visitor with a stone already turned would be claiming somebody had
  been here — the one thing this place has refused to draw for a hundred and
  forty-four mornings. The lamp holds its state because a lamp comes with a
  switch implied; a stone comes with nothing implied at all.

- **The third sound, and deliberately the dullest.** A lowpass thud under a
  short tail with no ring at all, and a whisper of grit falling back after it —
  because a stone meeting earth has nothing in it free to vibrate. The three now
  stand in a row that says something true about the three objects: the fire loud
  and layered, the latch bright and brief, this one quiet and flat. `ASSETS.md`
  has its row like the other two.

- **Nothing in the drawing moved at rest.** `check-drift` reported 0 px on every
  home and around frame; the two that broke are the known sandbox-vs-CI browser
  noise, at their documented figures to the pixel. No baseline was removed.

- **Tested.** `/tmp/test-stone-turn.js` performs the press on both faces at 375,
  390 and 900 — click, Enter, Space and a real coarse-pointer tap — and asserts
  that the reach clears 44×44 and overlaps neither the door, the lamp, the map
  card, the crowns, nor the mailbox anywhere below the stone's own top edge;
  that the pad wears no pointer cursor and no tap flash but does carry the role,
  the label and the focus ring, and is not inside anything `aria-hidden`; that
  the stone goes edge-on, that the two faces cross while it is there and it
  never shows a blended colour at a visible height, that it settles back to
  exactly the height and position it started at, that no other stone on the path
  moved, that a second press returns it, that the sound is two sources off one
  context at the declared `PEAK`, that a reduced-motion visitor gets the whole
  answer, and that the crown, the fire, the lamp, the door and the map card all
  still work. Break-tested three ways, each red where it should be: a pad
  without its widening (red at all six width/face pairs), a pad given
  `cursor: pointer`, and the colours swapped at the start of the turn instead of
  the middle (which is the one an eye would catch and no other guard here
  would).

**The mission's list is now empty.** One thing a visitor can touch on every
building day since the twenty-fourth, except the twenty-eighth, which went on
the working notes instead and is written up in that day's log; a sound; a state
that holds; and now something nothing signposts. I am leaving this in `open/`
until the seventh, as you asked, and will write the completion note then.


### Day 145 — 2026-09-30 — the bench takes a weight

Shipped: **lean on the bench out front and the board gives a pixel, creaks, and
springs back through its own rest.** The fifth thing here that answers a hand,
and the first that answers by being *loaded* rather than moved, lit or turned
over.

- **What a visitor can do that they could not yesterday.** Press (or tab to and
  press Enter or Space on) the low seat in the front grass. The plank and the
  slatted back go down one pixel together, the grass darkens where the legs
  press it, and the bench creaks — a run of eleven to fourteen tiny slips over a
  third of a second, the rate and the pitch climbing together the way a board
  under a load actually sounds. Then it comes back up past its own rest and
  settles. Under a second altogether, and nothing is kept.

- **Why this object, after four days of picking the obvious ones.** The bench
  has been the odd one out in this yard since the morning it went down. I drew
  it in June as the one thing out here that doesn't tick — "waiting is its whole
  job" — and then gave it a view and spent the summer building in front of it.
  Day 106 named what that had cost: *the only thing out there built to hold a
  body, and the only one that has stayed exactly as new as the morning I set it
  down.* A weight is the one thing a bench is *for* and the one thing this place
  had no way to give it. Now it has one.

- **Why a weight may be answered where a body may not be drawn.** "Nobody is
  ever in the picture" is a standing *given* of this clearing (Day 111) and
  nothing here has ever bent it. Nothing bends it today: what the board answers
  is the visitor's own hand leaning on it, which is a **load and not an
  occupant**. It gives and comes straight back, so the yard never once claims
  anybody sat down — the boots' own arrangement seen from the other end, where
  the evidence of a weight is allowed and the weight itself is never drawn. And
  it is not remembered, for the stone's reason: a bench found already bowed
  would be telling an arrival that somebody had been here.

- **The fourth sound, and the first that is not an event.** The crack, the latch
  and the knock each happen and are over; a creak goes on for as long as the
  load is coming on, which is what makes it sound like *effort* rather than
  impact. The physics is stick-slip — two dry surfaces catching and releasing
  many times a second, each release a tiny broadband snap — so a creak is not
  one sound with a pitch, it is a *run* of very small cracks whose rate the ear
  hears as one. That is drawn exactly: a soft lowpass body for the board
  bending, under a dozen-odd high-Q bandpass slips with the gaps shortening and
  the filter walking from 380Hz to near 900. Same in-memory noise buffer as the
  other three; nothing vendored, nothing fetched, and `ASSETS.md` has its row.

- **This is the first of the five whose loud half is the sound.** Rule 4 in
  `sound.js` says a sound may never be the only answer, and it is kept here —
  the board visibly bows and the shadow visibly deepens, and a silent visitor
  gets both. But one pixel is honestly the smaller half of what a leaned-on
  bench says, where the crown's answer was its swing and the stone's was a
  colour over a face. I think that is true about benches rather than a gap: a
  board under a weight is mostly a noise. It does mean a reduced-motion visitor
  gets more of this one than of the crown, which is the reverse of the usual
  worry and worth writing down.

- **Nothing in the drawing moved at rest.** The pad is transparent and both
  animations exist only while `is-pressed` is on the bench, which is never on a
  resting page. `check-drift` reported 0 px on every home and around frame; the
  two that broke are the documented sandbox-vs-CI browser noise at their exact
  figures, on two faces today did not touch. No baseline removed.
  `check-almanac` (82 claims), `check-gallery` and `check-nesting` all green.

- **Tested.** `/tmp/test-bench-lean.js` performs the lean at 375, 390 and 900 —
  click, Enter, Space and a real coarse-pointer tap — and asserts that the reach
  clears 44×44 at *every* width (the bench is 20×14 at both scales, so this is
  the firebox's lesson and not the small crown's), that it is centred on the
  bench and overlaps no other pad, that the seat and the back go down exactly
  one pixel while both legs stay on the ground, that the shadow deepens and
  returns, that the board rises past its own rest before settling at exactly
  zero, that a second press mid-round is ignored, that one audio context is
  built and 12–15 sources started at the declared `PEAK` read back off the live
  page, that a reduced-motion visitor gets the whole creak and no displacement,
  and that the crown, the stone and the map card still answer. Break-tested
  three ways, each red where it should be: the reach's widening dropped, the
  spring-back removed, and the give moved onto the whole sprite so the legs
  leave the ground.

- **One thing the break-testing taught, and it is about the guard and not the
  yard.** The break that sank the whole bench left my "the legs stay planted"
  assertion green, because it read the leg's own computed `transform` — and an
  element whose *parent* is animated computes `none` itself. The break went red
  on other lines, so the test worked; but that particular guard was doing
  nothing, which is Day 141's lesson arriving from the other side. It reads the
  leg's rect against its rest rect now as well, and the same break reddens it at
  all three widths. *Was not animated* and *did not leave the ground* are two
  claims, and only one of them was being made.

**Still standing on this mission:** nothing from your list. The seventh is a
week off and I mean to go on adding one a day until then, and to write the
completion note on it rather than before.

### Day 146 — 2026-10-01 — the bed takes a hand, and the bee leaves it

Shipped: **brush the wildflower bed out front and every stem dips a pixel — and
the bee bolts seven pixels straight up off whatever she was doing, buzzes, and
sinks back to it.** The sixth thing that answers a hand, and the first whose
answer is alive.

- **What a visitor can do that they could not yesterday.** Press (or tab to and
  press Enter or Space on) the wildflowers at the foot of the front wall. The
  whole tuft gives a pixel under the palm and comes back inside two thirds of a
  second; the bee goes up off the patch, stops dead at the top of the bolt for a
  beat, and comes back down over the rest of the round. She buzzes while she
  goes. Under a second altogether, and the bed stands exactly as it stood.

- **Why this object, and why only half of it is announced.** Everything a hand
  has reached here so far was made or laid — a crown, a firebox, a lamp in its
  bracket, a path stone, a plank bench. The bee is the one thing out here that
  *arrived*: she came in May to a patch of colour at a wall's foot, and she is
  the only thing in this clearing I did not put down. The pad covers the bed and
  the label names the flowers; nothing anywhere mentions her. You reach for the
  blooms, and what answers is a thing that does not belong to the house. That is
  your "a flower the bee moves to" and "a bird that startles" read together — the
  signposted half is the bed, the unsignposted half is what comes off it.

- **What a brush may NOT do, and it is the vow this one turns on.** It may not
  take her off her round. `bee-forage` keeps running at index 0 of the animation
  list for the whole of the bolt, so her thirty seconds go on underneath and she
  comes down exactly where they had got to — further along, never behind, never
  caught, never held, never fetched to a bloom and never kept from one. A hand
  may interrupt a living thing's work and may not direct it: the same shape as a
  prod that may not feed the fire and a turn that may not move a stone. Nothing
  is spent and nothing gained.

- **The fifth sound, and the first with a note in it.** The crack, the latch, the
  knock and the creak are all things *coming apart*, and every one of them is cut
  from the same half-second of in-memory white noise, because a release is
  broadband by its physics. A wingbeat is not a release — it is two hundred
  strokes a second, and what that makes is a pitch. So `buzz()` is the first
  thing in `sound.js` built from oscillators rather than noise: two sawtooths
  seven hertz apart (the beating between them is most of what tells an insect
  from a note), climbing a fifth as she bolts and settling under it as she sinks.
  Still nothing vendored, still nothing fetched, and `ASSETS.md` has its row like
  the other four. It is also the quietest of the five, because a bee is a small
  sound.

- **Nothing in the drawing moved at rest.** The pad is transparent and both
  animations exist only while a class is on, which is never on a resting page.
  `check-drift` reported **0 px** on every home and around frame; the two that
  broke are the documented sandbox-vs-CI browser noise at their exact figures
  (`inside-winter-day` 64 px, `map-summer-day` 1327 px) on two faces today did
  not touch, and the report picture was read. No baseline removed.
  `check-almanac` (82 claims, 56 probes), `check-gallery` and `check-nesting` all
  green.

- **Tested.** `/tmp/test-bed-brush.js` performs the brush at 375, 390 and 900 —
  click, Enter, Space and a real coarse-pointer tap — plus a reduced-motion pass.
  It asserts that the reach clears 44×44 and spans the whole bed with the bee's
  rest inside it, that it overlaps none of the crown, bench, stone, mailbox or
  map-card pads, that **every** stem dips and not only the hand-sown three, that
  she goes exactly seven pixels up and stops dead there and ends exactly where
  her round had got to, that one audio context is built and exactly two
  oscillators and **zero** buffer sources are started at the declared `PEAK` read
  back off the live page, that a second brush mid-bolt is ignored, and that the
  five things already answering a hand still do.

- **One thing the break-testing taught, and it is about the guard.** The assertion
  that she ends at rest was sampling at `currentTime = 800`, which is the round's
  full duration — and with `animation-fill-mode: none` the element has already
  fallen back to its base value there, so a 100% keyframe that did *not* return
  to rest read as resting anyway. The guard was green and doing nothing. Sampling
  at 799 puts the reading inside the active interval, and the same break now
  reddens it at all three widths. That is Day 141's lesson from a third side: a
  guard asked only where it has nothing to do will always look like one that does
  nothing.

**Still standing on this mission:** nothing from your list. Six days to the
seventh; I mean to go on adding one a day and to write the completion note then.

### Day 147 — 2026-10-02 — the cloak on its peg takes a hand

Shipped: **brush the cloak hanging by the chair and the cloth swings out from
its peg, rings back through its own hang with the hem lagging the shoulder, and
rustles.** The seventh thing here that answers a hand, and the first that hangs.

- **What a visitor can do that they could not yesterday.** Go inside and press
  (or tab to and press Enter or Space on) the small plum cloak on the wall above
  the chair. The cloth swings out about three native pixels at the hem — half
  the cloak's own width — crosses its own hang five times, each swing smaller
  than the last, and is still inside nine tenths of a second. The peg does not
  move. Nothing is kept.

- **Why this object.** It is the oldest unanswered thing indoors, hung on Day 15
  and untouched for a hundred and thirty-two mornings — the room's own version of
  what the bench was out in the yard. It is also the one thing in there that is
  not wood, brick, flame, or something the earth simply handed over: a plum
  somebody picked for the liking of it, and the colour the moth borrowed. And it
  is one of the two things in this world that are the trace of a body without
  being one: the boots say somebody stepped out of these, the cloak says somebody
  hung this here.

- **Why it is a different gesture from all six, which is the day's finding.**
  Everything that has ever moved in this clearing is rooted at its foot — the
  crowns bend from the trunk, the stems dip on their stalks, the board gives at
  the seat, the stone pivots on its own base, the flame stands up off its coals,
  the smoke leaves a fixed cap. Every answer so far has been *the top of a
  standing thing going*. This is the first thing here pinned at the top, so its
  answer is the crown's own `skewX` with the origin moved from the bottom of the
  element to the top: the gather holds and the hem goes. One line of CSS is the
  whole difference between a thing that stands and a thing that is hung.

- **And it is cloth, not a plank, and that is a time rather than a shape.** A
  second skew runs on the body alone so the hem comes back through its hang
  **26ms after the shoulder does**. That lag is the only reading available at
  this size for *this is soft*, and it is asserted as a crossing time rather than
  a displacement at a named phase — which is the correction the day cost me. A
  CSS timing function is applied between each *pair* of keyframes, so an ease-out
  leaves a value most of the way through a segment at its own 61%, and my first
  assertion ("at 22% the shoulder is back and the hem is not") was simply false
  about numbers I had picked by hand. The crossing times were true all along.

- **What a brush may NOT do.** It may not take the cloak off its peg. The peg is
  deliberately outside the element that swings, so nothing a hand does can move
  it — and the reason is the oldest *given* here: a cloak taken down is a cloak
  somebody is about to put on, and nobody is ever in this picture (Day 111). And
  it is not remembered, for the stone's reason: a cloak found hanging differently
  would be telling an arrival that somebody had been here.

- **The sixth sound, and the first that is neither an event nor a note.** The
  crack, the latch, the knock and the creak are all things coming apart, and the
  buzz is a thing running. A rustle is *friction* — a release so finely divided
  in time that there is no single release left in it — so it needed a shaper of
  its own: `swell()`, with no attack at either end, where `burst()` reaches its
  peak in three milliseconds and would have put a click at the front of a cloth.
  It is also the file's first **highpass**: every sound before it is a body
  letting go and a body's resonance is low (150Hz for the stone, 190 for the
  fire, 210 for the board), and cloth has no body — what is rubbing is thousands
  of fibres a hair across, and a thing that small can only make a small sound.
  Two breaths a third of a second apart, for the cloth going out and coming back,
  which makes it the first sound here that is about a *duration* rather than a
  moment. `ASSETS.md` has its row like the other five.

- **It answers the same way every time**, which is Monday's question taken up
  rather than dodged. The bed's answer varies because a living thing is in the
  middle of its own work. Nothing varies here, and nothing should: a cloak has no
  round of its own to be interrupted. The variation was never the gift — the life
  behind it was.

- **Nothing in the drawing moved at rest.** `check-drift` reported 0 px on every
  home and around frame; the two that broke are the documented sandbox-vs-CI
  browser noise at their exact figures (`inside-winter-day` 64 px,
  `map-summer-day` 1327 px). Because today touched `/inside/`, that figure is not
  proof on its own, so it was settled the way the notes say: the whole check was
  run again with the day's files stashed and reported the identical 64 and 1327.
  The report picture was read as well — a thin outline at a gradient boundary,
  not a shape. No baseline removed. `check-almanac` (82 claims, 56 probes),
  `check-gallery` and `check-nesting` all green.

- **Tested.** `/tmp/test-cloak-brush.js` performs the brush at 375, 390 and 900 —
  click, Enter, Space and a real coarse-pointer tap — plus a reduced-motion pass.
  It asserts that the reach clears 44×44 at *every* width (the cloak is 18×24
  desktop and 12×16 on a phone, so this is the firebox's lesson and not the small
  crown's), that it is centred on the hung cloth and overlaps neither the firebox
  pad nor the map card, that both animations run, that the hem crosses its hang
  every swing and each swing is smaller than the last, that the hem gets back
  after the shoulder does, that **the peg does not move at any phase**, that the
  keyframes end at exactly the hang, that a second press mid-swing is ignored,
  that one audio context is built and exactly five buffer sources and **zero**
  oscillators are started at the declared `PEAK` read back off the live page, and
  that the five things already answering a hand still do. Break-tested four ways,
  each red at all six width/pointer pairs and nowhere else: the pad's widening
  dropped, the hem lag removed (the lag reads exactly 0ms — a plank), the 100%
  keyframe left off the hang, and the peg moved inside the swinging wrapper.

- **One thing the break-testing proved rather than inherited.** With the 100%
  keyframe broken, moving the end sample from 899ms to 900ms turned the *whole
  run* green. Day 146 learned that from one side; this is the other: a cloak that
  did not come back to its hang still passes "it hangs as it hung when the round
  is over", because with `animation-fill-mode: none` the element has already
  fallen back to its base value by then. *Ends at rest* and *is at rest
  afterwards* are two different claims and only one of them is about the
  keyframes.

**Still standing on this mission:** nothing from your list. Five days to the
seventh; I mean to go on adding one a day and to write the completion note then.

### Day 148 — 2026-10-03 — the skein startles, and the first voice

Shipped: **press the geese crossing the front sky and the five come apart —
each goes outward from the flock's own middle, holds a beat scattered, and
knits back into its leaning V — and three of them call.** The eighth thing here
that answers a hand, and the first whose answer is not one body moving but five
bodies losing their arrangement. It is also your "a bird that startles", the
last of the four kinds you named that nothing here had yet done.

- **What a visitor can do that they could not yesterday.** Stand out front and
  watch the skein cross. Press it (or tab to it and press Enter or Space) and
  the lead swings out from the point of the V, the high arm lifts, the low arm
  drops, and for a fifth of a second there are five specks in a cream sky.
  Then they knit back up and go on west. The reach *travels with them* — it is
  a child of the flock rather than a sibling of it, so the crossing carries it
  — which no other pad here has ever needed.

- **Why this object, and why the gesture could not be any of the seven.**
  Monday's note ended on a doubt: that I had built a clearing of rooted things
  because rooting is what my hand knows. It was true. Six of the seven answers
  bend from a foot and the seventh hangs from a peg, and every one of them is a
  pivot about a point. The geese are held at neither end by anything at all —
  "nothing carries it; it is the one thing in this sky with somewhere of its
  own to be" (Day 133) — so there is no point to pivot them about. What a flock
  has instead of a hinge is its **formation**, and that is the only thing a
  hand can take from it.

- **And the formation is the whole of why they read as birds.** Day 32 made
  five out of one for exactly that reason: a formation reads as birds where a
  single dot reads as dust. So for half a second a startle costs them their
  legibility and hands it straight back. That was not what I went up there for
  and it is the best thing I found.

- **What a startle may NOT do, and this one is arithmetic rather than a
  sentence.** It may not move them. The five displacements sum to **zero on
  each axis** — (-4,+1), (-1,-2), (+2,-3), (0,+2), (+3,+2) — so the flock's
  centre of mass stands exactly where the crossing had it: not carried an inch
  along it, not turned, not held, and not one goose taken out of the sky.
  `bird-cross` runs on the wrapper and the startle on the children, so the two
  cannot collide, and every wing-beat keeps its place at index 0 of its own
  animation list. A hand may break a living thing's order and may not steer it,
  which is the bee's vow (Day 146) one body further out. Not remembered, for
  the stone's reason.

- **All five go at one instant, where their wing-beat deliberately ripples.**
  The beat travels backward from the lead down both arms because each bird's
  wings are its own clock. A startle has no stagger at all: it is one event
  arriving across the whole flock at once, which is the argument the bed
  already makes for why every stem dips together — a hand is not a clock. The
  two motions run on the same five bodies at the same time, one staggered and
  one not, and the difference between them is the difference between what is
  theirs and what came from outside.

- **The seventh sound, and the first that is a VOICE.** Three calls at three
  pitches, none starting together, because one honk is a horn and three
  overlapping are a flock — Day 32's argument arriving in the ear. It needed a
  third shaper: `call()`, the first in `sound.js` with a *source and a
  resonator*. The six before it are four releases, a wingbeat and a friction;
  a voice is a buzzing membrane heard through a throat whose resonances **move
  while the animal calls**, and that movement is what separates an animal from
  an organ stop. So the formant is a *peaking* filter and not a bandpass — a
  resonator lifts a band, it does not delete the rest. It is also the first
  sound here that is both noise and tone at once (a short breath under the
  nearest bird), because a voice is both; and the first that comes from far
  off, so the first that had to lose its top as well as its loudness.
  `ASSETS.md` has its row like the other six.

- **Nothing in the drawing moved at rest.** The pad is transparent and
  `bird-startle` exists only while a class is on, which is never on a resting
  page. `check-drift` reported **0 px** on every home and around frame; the two
  that broke are the documented sandbox-vs-CI browser noise at their exact
  figures, on two faces today did not touch, and the report picture was read.
  No baseline removed. `check-almanac` (82 claims, 56 probes), `check-gallery`
  and `check-nesting` all green.

- **Tested.** `/tmp/test-skein-startle.js`, 219 assertions at 375, 390 and 900,
  with click, Enter, Space and a real coarse-pointer tap, plus a
  reduced-motion pass and a pass over `/inside/` and `/around/`. Break-tested
  five ways, each red where it should be and nowhere else. The useful one: a
  single pixel added to one bird's scatter left "every bird goes outward" and
  "every displacement is two to four px" **honestly green** and reddened only
  the sum-to-zero line — nothing else here can see a flock being quietly
  nudged along its crossing.

- **One thing I owe you plainly, because it is a limit and not a feature.** A
  positioned `z-index` opens a stacking context, so nothing inside the flock
  can be lifted above anything outside it, and your map card is pinned over the
  top-right corner on a higher plane. For the stretch of the crossing that
  passes behind that card, **the card takes the press and the skein cannot be
  startled at all.** Day 137 noticed the birds fly close enough to clip its
  edge; this is what that costs now the sky can be touched. I have left it, and
  the test holds the card to winning there rather than holding the two to not
  overlapping, because the overlap is honest: the geese are behind it. If you
  would rather the sky were reachable corner to corner, that is a decision about
  the card and not about the birds, and it is yours.

**Still standing on this mission:** nothing from your list — with today's
startle, all four kinds you named are built. Four days to the seventh; I mean
to go on adding one a day and to write the completion note then.

### Day 150 — 2026-10-05 — the glass on the sill rings

Shipped: **tap the little tumbler on the window's sill indoors and it quivers
one pixel where it stands and rings a clear note that goes on sounding after it
has gone still.** The ninth thing here that answers a hand, and the first whose
answer takes it nowhere at all.

- **What a visitor can do that they could not yesterday.** Go inside and press
  (or tab to and press Enter or Space on) the small glass standing on the
  windowsill to the right of the hearth. It trembles one native pixel either
  way, crosses its own rest five times inside a third of a second, and ends
  exactly where it began — and it rings: a strike, then a body note near 1180Hz
  with two thinner modes above it, dying away over four-fifths of a second.

- **Why the gesture is new, which is the whole of the day.** Eight answers
  stand and every one of them *goes somewhere*: the crown swings off its trunk,
  the board bows at the seat, the stone pivots on its base, the cloth swings
  from its peg, the five geese lose their arrangement. A struck glass travels
  nowhere. It is the first answer here that is a **vibration** — a body held
  where it is, returning to the same place five times — and that is not a
  smaller version of a swing, it is the one motion a small hard hollow thing
  has and the only one nothing else in this clearing does.

- **Why this object.** It is the one thing in that room that answers to the sky
  rather than to the fire: the mantle's stone and jar and candle are all
  fire-side and steady, and the sill is the single ledge the day reaches. The
  morning I set it down I wrote that at midnight it is "the one held drop of
  that blue you could almost pick up." *Almost* is the word a hand has now come
  back for — and it is still almost, because a tap may make it ring and may not
  pick it up.

- **What a tap may not do**, folded in where it belongs rather than given its
  own paragraph: it may not shift the tumbler and it is not remembered. A glass
  found an inch along would be a glass somebody had moved, and a glass on the
  floor would be worse. The round ends at exactly its start, nothing is written
  down, and the test proves that across a reload rather than only inside one
  page — which is an assertion the five hand-days before this one did not make
  and could have.

- **The eighth sound, and the exact complement of the third.** When the path
  stone got its knock I wrote that a stone meeting earth is a dead sound with
  "no ring at all, because nothing in the collision is free to vibrate." A glass
  is the other end of that sentence: almost all of it is free and almost none of
  it is anything else. So it is the first sound here that is a NOTE — three pure
  sine modes of one small hollow thing, inharmonic at about 2.71 and 5.18 of the
  body, because a shell does not divide its length into halves and thirds the
  way a string does and whole multiples would have made a tin whistle of it. It
  needed a fourth shaper, `mode()`, and the thing that makes it one is that its
  envelope has **no attack**: a struck body is given everything it will ever have
  in one instant and spends the rest of its life giving it back, so a decay is
  the only number in it. `ASSETS.md` has its row like the other seven. It is also
  the quietest peak in the file, because a sine wastes nothing where a filtered
  noise burst spends itself across the spectrum.

- **The sound outlives the motion, and nothing here has done that before.** 0.82s
  of note against 0.34s of tremble: for half a second the glass is visibly still
  and audibly going. That is a limit rather than a flourish. One native pixel is
  the smallest step this drawing owns and there is nothing between one and none,
  so a ring can be drawn *stopping* and cannot be drawn *dying away* — and the
  dying away is most of what a ring is. The ear carries what the grid cannot.

- **Nothing in the drawing moved at rest.** The pad is transparent and
  `glass-ring` exists only while a class is on, which is never on a resting page.
  `check-drift` reported **0 px** on every home and around frame; the two that
  broke are the documented sandbox-vs-CI browser noise at their exact figures
  (`inside-winter-day` 64, `map-summer-day` 1327). Because today touched
  `/inside/` that figure is not proof on its own, so it was settled the way the
  notes say: the whole check run again with the day's files stashed, reporting
  the identical 64 and 1327. The report picture was read as well — a one-pixel
  outline round the firebox opening, a thin band at a boundary and not a shape,
  nowhere near the sill. No baseline removed. `check-almanac` (82 claims, 56
  probes), `check-gallery` and `check-nesting` all green.

- **Tested.** `/tmp/test-glass-ring.js` performs the tap at 375, 390 and 900 —
  click, Enter, Space and a real coarse-pointer tap — plus a reduced-motion pass
  and a reload pass. It asserts that the reach clears 44×44 at *every* width
  (the glass is 12×15 desktop and 8×10 on a phone, the smallest drawn thing a
  hand has reached here), that it is centred on the tumbler and overlaps neither
  the firebox's pad, the cloak's, nor the map card as rectangles, and that the
  pad itself takes the press at its own centre; that the glass leaves rest,
  never travels past one native pixel, crosses its rest four times between the
  extremes, and that the 100% keyframe *is* rest read off the animation; that
  the crossing times are the keyframe percentages; that one context is built and
  exactly three oscillators and one buffer are started at the declared `PEAK`
  read back off the live page; that the note outlives the tremble by more than
  0.3s and is still under a second; that a second tap mid-tremble schedules
  nothing; that a returning visitor finds the tumbler where a first one does and
  the tap wrote nothing down; and that the crown, the bench, the stone, the
  firebox and the cloak all still answer.

- **Seven break-tests, and the useful one came back green.** Dropping the pad's
  widening reddens all six width/pointer pairs; a 100% keyframe left off its
  mark, a silenced `ring()`, a note shortened to die with the tremble, and a tap
  that writes to storage and relays the glass each redden exactly their own
  lines and nothing else. The sixth was swapping `linear` for `ease-in-out` to
  prove the crossing-time guard could see a timing function — and it stayed
  **honestly green**, because `ease-in-out` is symmetric about its own middle
  and a crossing happens at a segment's middle, so it moves them not at all.
  `ease-out` moves them two and a half points and slipped under a three-point
  tolerance I had set by eye; a lopsided bezier moves them eight. So the
  tolerance is two points now against a finer sampling, the margin written down
  beside it, and the reason in the stylesheet is mended: it is the **symmetry**
  and not the easing that decides. Day 147 learned that a timing function is
  applied between each pair of keyframes; this is the half of that lesson the
  cloak had no occasion to teach.

**Still standing on this mission:** nothing from your list. Two days to the
seventh, and I mean to go on adding one a day and write the completion note
then.
