/* touch.js — agent-mutable.
 *
 * Day 139 (2026-09-24). The first thing in this clearing that answers a hand.
 *
 * For a hundred and thirty-eight mornings everything here has moved on its own
 * clock and nothing has ever moved because somebody touched it. Two things in
 * the scene take a tap — the mailbox and the map card — and both of them only
 * leave the frame. This is the founder's ask of 2026-09-23
 * (messages/open/2026-09-23-a-clearing-you-can-touch.md): let the clearing
 * itself respond.
 *
 * WHAT IT DOES. A `.crown-touch` pad lies over each drawn crown — two on the
 * front (south) face, one on the door (east) face. Activate one and the crown
 * it names is shaken: the class `is-shaken` puts `crown-shake` on the tree for
 * one round and then comes off again, so the wind's own `tree-sway` has the
 * element back the moment the ringing stops. In autumn — and only in autumn,
 * because the whole `.sprite--leaffall` layer is `display: none` in the other
 * three seasons — the same tap also lets one leaf go, by putting `is-falling`
 * on a leaf span that is otherwise `display: none` and taking it off again
 * when the fall ends.
 *
 * WHY A PAD AND NOT THE TREE. The front crowns are `<img>` elements, and a
 * replaced element renders no `::before`, so the mailbox's invisible-tap-pad
 * trick (Day 81) cannot be played on them directly; and the small right crown
 * is 30px wide on a phone, under the 44px minimum (Article VIII). A transparent
 * sibling carries the reach and the button semantics, and the drawing is not
 * touched by one pixel — which is also why no drift baseline moved today.
 *
 * WHY THE SHAKE MAY CROSS UPWIND, WHERE THE SWAY MAY NOT. The standing rule
 * (Days 60–63) is that a thing *held out* by a steady breeze never rocks back
 * past its rest, which is why `tree-sway` only ever leans downwind. That rule
 * is about a wind. A shaken crown is not held out by anything: it is displaced
 * and let go, and a thing let go rings back through its own rest and dies away
 * — the same distinction Day 116 drew for the falling leaf ("a thing held out
 * by a wind may not rock back against it; a thing in free fall is held by
 * nothing, and may"). And it is why the door-side crown may be shaken at all:
 * that face looks straight up the wind's throat, so the wind can move nothing
 * there sideways (Day 120) — but a hand is not a wind, and reaches a tree from
 * wherever the hand is.
 *
 * WHAT THE WITNESSES SEE. Nothing, and on purpose. `crown-shake` exists only
 * while the class is on, so `tools/check-almanac.js`'s drift probe — which
 * pauses every animation and walks each named layer round its own clock — finds
 * only `tree-sway` on a resting page and reports the same westerly it always
 * has. The shaken leaf is `display: none` at rest, so `visible-count` still
 * reads four falling leaves out front and three on the door side, and
 * `tools/check-gallery.js` skips an element that shows in no state at all. If a
 * later day wants this held, the honest witness would have to perform the tap,
 * which nothing on the almanac can do: every check there varies on a season or
 * an hour, and a hand is neither (the same slot the bee's round has never had,
 * Day 108).
 *
 * REDUCED MOTION. theme.css collapses every duration to 0.001ms under
 * `prefers-reduced-motion`, so a tap there fires and ends inside a frame and
 * the yard does not move. That is the right answer rather than a gap: what this
 * particular thing has to give is motion, and a visitor who has asked for none
 * is asking not to be given it. A tap that must speak to such a visitor will
 * have to speak in something other than movement.
 *
 * ── Day 140 (2026-09-25): THE FIRE ────────────────────────────────────────
 *
 * The second thing here that answers a hand, and the first that answers in
 * something other than movement — which is the sentence directly above, taken
 * up. A `.fire-touch` pad lies over the firebox in the room (inside.css). Press
 * it and `.hearth` carries `is-prodded` for the length of the flare: the ember
 * bed opens and brightens, the three flame tiers warm (a `filter` transition,
 * so their own running flicker is not disturbed), five `.ember-spark` cells go
 * up the flue and wink out before the lintel — and `sound.js` is asked for a
 * crack, which is the first noise this clearing has ever made.
 *
 * WHAT A PROD MAY NOT DO. It may not feed the fire. The armful beside the
 * hearth holds the count the season gave it (Day 125) and the flame stands the
 * tiers the hour gave it (Day 126); a hand is neither a season nor an hour, so
 * it changes neither. Half a second later the fire stands exactly where it
 * stood — spent nothing, gained nothing, the shape of every other turn here.
 *
 * WHY THE SOUND IS ASKED FOR HERE AND NOT SCHEDULED THERE. `sound.js` holds
 * one rule above all others: nothing plays on its own. The only way to keep
 * that true is for every sound to be scheduled inside the call stack of a real
 * gesture, which is this handler and nowhere else. And it is asked for
 * defensively — `window.CabinSound` may be absent, the browser may have no Web
 * Audio, the context may be refused — because a sound is the one part of this
 * answer that can fail silently and completely, and it may never be the reason
 * the visible half does not happen. So the flare is put up first and the crack
 * is asked for second.
 *
 * ── Day 141 (2026-09-26): THE LAMP, AND THE FIRST ANSWER THAT OUTLASTS THE
 * TOUCH ───────────────────────────────────────────────────────────────────
 *
 * The third thing here that answers a hand, and the first that is still
 * answering after the hand has gone. A `.lamp-touch` pad lies over the porch
 * lantern on the door face (around.css). Press it and the lamp lights; press it
 * again and it goes out; and the choice is written to `localStorage` under
 * `cabin.lamp` and read back on every later arrival, so the lamp is as the
 * visitor left it through the map, the front, the room, and tomorrow morning.
 * That is the founder's "a state that holds for the visitor"
 * (messages/open/2026-09-23-a-clearing-you-can-touch.md).
 *
 * THREE STATES, AND THE THIRD IS THE DEFAULT. `data-lamp` absent means nobody
 * has had an opinion: the hour decides, exactly as it has since Day 49 — dark
 * through the long middle of the day, kindled at dawn and dusk, burning at
 * night. `lit` and `out` are a hand overruling the hour in one direction or the
 * other. There is deliberately no way back to the hour from here; a control with
 * three positions where two are visibly identical is a control nobody can read,
 * and clearing the site's storage is the honest undo.
 *
 * WHY A HAND MAY OVERRULE A WHEEL AT ALL. Everything else in this clearing that
 * gives light is a thing the place simply does — the fireflies, the winter
 * stars, the rim on the far crests, the fire on its own hearth — and a hand has
 * no business at any of them. The lantern is the one exception, and it has been
 * described as the exception since the morning it was hung: "the most made thing
 * in the clearing — bracket screwed to the wall, glass in an iron cage, lit on
 * purpose for an arrival" (diary 2026-06-30). A lamp is an object that comes
 * with a switch already implied. Nothing else out here does.
 *
 * WHAT A HELD STATE COSTS THE RECORD, which is the day's actual finding. Every
 * witness and every kept picture opens a browser that has never been here: no
 * storage, so no `data-lamp`, so the lamp follows the hour and every reading
 * comes back exactly as it did yesterday. `tools/check-almanac.js`'s `lantern`
 * probe still reads dark at noon; `tools/check-drift.js` finds no pixel moved;
 * `tools/check-gallery.js` sees a layer whose states are the ones it always had.
 * That is not a gap to be closed — it is what the record is: a picture of a
 * first arrival. Yesterday's sound was unphotographable; this is the second
 * thing here no frame can hold, and for the opposite reason. A sound cannot get
 * into a picture at all. This could, easily — and never will, because the
 * camera arrives new every time, and a held state belongs to somebody who has
 * been here before.
 *
 * REDUCED MOTION. The lamp's whole answer is a change of colour on the glass and
 * a halo around it, which is a state and not a motion, so a visitor who has
 * asked for stillness gets the entire answer (the 1.6s cross-fade collapses and
 * the lamp simply is lit). Of the three things built so far this is the only one
 * whose answer needs neither movement nor sound to arrive.
 *
 * ── Day 144 (2026-09-29): THE STONE, AND THE FIRST THING NOTHING ANNOUNCES ──
 *
 * The fourth thing here that answers a hand, and the first that no part of the
 * page admits to. A `.stone-touch` pad lies over the nearest path stone on each
 * outdoor face — `.path-stone--5` out front, `.around-path__stone--front` at the
 * door — and pressing one turns the stone over: it pinches to edge-on about its
 * own base, lifts three pixels, and comes back down the other way up, showing
 * the damp dark underside that has been face-down in that grass since the first
 * week. Press it again and it goes back. That closes the last of the founder's
 * 2026-09-23 list: "Easter eggs. Things a visitor finds by poking… Not
 * signposted."
 *
 * WHAT UNSIGNPOSTED MEANS HERE, and what it does not. The crown, the firebox
 * and the lamp all carry `cursor: pointer`, and each of their notes says so and
 * calls it a mild affordance. This one carries none — no cursor, no hover
 * change, and the tap flash suppressed rather than tinted — so the only route to
 * it is wondering what a small brown rectangle in the grass would do. What it
 * keeps is the focus ring, the button role and the label, because unsignposted
 * is a fact about the *drawing*: nothing on the page says press me, and taking
 * the keyboard away would not hide the stone any better, only shut somebody out
 * of it. Tabbing to a thing is a kind of poking too.
 *
 * WHICH STONE, AND WHY THE SAME ONE ON BOTH FACES. One path runs through the
 * two frames (RULES Art XIII), so the rule choosing a stone has to be read off
 * the ground rather than off a frame: the nearest one, the stone you would be
 * standing on — which is a different element in each view and the same sentence
 * in both. It is also the largest of the eight at 32×5, and the answer here is
 * a colour over a face, so size is legibility.
 *
 * WHAT A TURN MAY NOT DO. It may not move the stone. The path is a record of
 * walking and its geometry answers to the plan (Day 136); a hand may show you
 * the other side of a stone and may not relay it. Nothing is spent and nothing
 * gained — the same stone, the other way up, and a second press puts it back,
 * which is the shape of the candle, the blooms and the rick, and the vow under
 * all three.
 *
 * WHY IT IS NOT REMEMBERED, where the lamp is. The lamp is the one made thing
 * out here and a lamp comes with a switch implied (Day 141); a stone comes with
 * nothing implied at all, and a yard that greeted a returning visitor with a
 * stone already turned would be claiming somebody had been here — the one thing
 * this clearing has refused to draw for a hundred and forty-four mornings. So
 * the turn lasts the visit and the next arrival finds the path as it was laid.
 *
 * ── Day 145 (2026-09-30): THE BENCH, AND THE ONLY THING HERE BUILT TO HOLD A
 * WEIGHT ──────────────────────────────────────────────────────────────────
 *
 * The fifth thing that answers a hand. A `.bench-touch` pad lies over the bench
 * in the front yard (scene.css). Lean on it and `.sprite--bench` carries
 * `is-pressed` for one round: the seat and the back go down a pixel together,
 * the contact shadow deepens under them, the board springs back up through its
 * own rest and settles — and `sound.js` is asked for a creak.
 *
 * WHY THIS OBJECT. The bench has been the odd one out in this yard since the
 * morning it was set down. Everything else out here runs on a clock — the smoke
 * climbs, the skein crosses, the bee works her patch, the blooms turn — and the
 * bench was drawn as the one thing that holds still, "the first thing in this
 * yard that doesn't tick… waiting is its whole job" (diary 2026-06-16). Day 106
 * noticed what that had cost it: "the only thing out there built to hold a body,
 * and the only one that has stayed exactly as new as the morning I set it down."
 * A weight is the one thing a bench is *for*, and it is the one thing this place
 * had no way to give it.
 *
 * AND WHY A WEIGHT MAY BE ANSWERED WHERE A BODY MAY NOT BE DRAWN. "Nobody is
 * ever in the picture" is a standing given of this clearing (Day 111), and
 * nothing here has ever bent that. Nothing bends it today either: what the
 * board answers is the visitor's own hand, leaning on it, which is a load and
 * not an occupant. The bench gives under it and comes straight back up, so the
 * yard is never once claiming that anyone sat down — the same arrangement the
 * boots by the door have kept since Day 50, where the evidence of a weight is
 * allowed and the weight itself is never drawn.
 *
 * WHAT A LEAN MAY NOT DO. It may not wear the bench. The grass under it stays
 * the grass it was, no flattening is kept, and a second visit finds the board
 * exactly as it was planed — because "nothing here is ever lost" cuts both ways,
 * and a thing that could be worn could be used up. And it is not remembered,
 * for the stone's reason (Day 144): a yard that greeted an arrival with a bench
 * already bowed would be telling them somebody had been here.
 *
 * REDUCED MOTION. The give collapses to nothing, as every duration here does,
 * and the creak arrives in full — which is the case Day 140 built the sound for.
 * Of the five things now standing, this is the one whose answer leans hardest on
 * the audible half, and that is a fact about benches rather than a gap: a board
 * taking a weight is mostly a noise.
 *
 * ── Day 146 (2026-10-01): THE BED, AND THE FIRST ANSWER THAT IS ALIVE ─────
 *
 * The sixth thing here that answers a hand. A `.bed-touch` pad lies over the
 * wildflower bed at the foot of the front wall (scene.css). Brush it and two
 * things happen: `.sprite--flowers` carries `is-stirred` while every stem in
 * the bed dips a pixel and comes back, and `.sprite--bee` carries `is-startled`
 * while she bolts seven pixels straight up off whatever she was doing and sinks
 * back to it — and `sound.js` is asked for a buzz.
 *
 * WHY THIS, AND WHY THE TWO HALVES ARE NOT THE SAME THING. Everything a hand
 * has reached in this clearing so far was made or laid by somebody: a crown, a
 * firebox, a lamp in its bracket, a path stone, a bench. The bee was never
 * this place's to put down — "the first thing in this world that *arrives*
 * rather than being placed… the world coming to it" (scene.css, Day 20). The
 * bed is what the pad covers and what the label names; she is not mentioned
 * anywhere, and that is deliberate. You reach for the flowers. What answers is
 * a thing that does not belong to the house.
 *
 * WHAT A BRUSH MAY NOT DO, and it is the vow this one turns on. It may not take
 * her off her round. `bee-forage` keeps running at index 0 of the animation
 * list for the whole of the bolt (scene.css has the mechanism), so her thirty
 * seconds go on underneath and she comes down exactly where they had got to —
 * further along, never behind, never held, never caught, and never made to
 * land. She cannot be kept away from a bloom and she cannot be fetched to one.
 * A hand may interrupt a living thing's work and may not direct it, which is
 * the same shape as a prod that may not feed the fire (Day 140) and a turn that
 * may not move a stone (Day 144).
 *
 * WHAT NO PICTURE AND NO GUARD CAN HOLD, which is new even among the five. The
 * other answers here are the same event every time: a crown rings, a lamp goes
 * from one state to the other, a board gives a pixel. This one depends on where
 * she happens to be in a thirty-second round that nobody controls — press at
 * one second and you shoo a hovering bee, press at twenty and you lift her off
 * a bloom she had her feet down on. Same gesture, same code, two different
 * events, and nothing here can say which a visitor got: every camera stands at
 * a named instant (Day 109) and every witness varies on a season, an hour or a
 * date, and a hand is none of those.
 *
 * ── Day 147 (2026-10-02): THE CLOAK, AND THE FIRST THING HERE THAT HANGS ──
 *
 * The seventh thing that answers a hand. A `.coat-touch` pad lies over the
 * cloak on its peg in the room (inside.css). Brush it and `.coat` carries
 * `is-swung` for one round: the cloth swings out from the peg and rings back
 * through its own hang, the hem lagging the shoulder — and `sound.js` is asked
 * for a rustle.
 *
 * WHY THIS OBJECT. It is the oldest unanswered thing indoors, hung on Day 15
 * and untouched for a hundred and thirty-two mornings, which makes it the room's
 * own version of what the bench was out in the yard (Day 145). And it is the one
 * thing in there that is not wood, brick, flame, or something the earth simply
 * handed over: "a plum somebody picked for the liking of it" (diary 2026-09-10).
 * It is also, with the boots by the door, one of the two things in this world
 * that are the trace of a body without being one — the boots say somebody
 * stepped out of these, the cloak says somebody hung this here.
 *
 * AND WHY IT IS A DIFFERENT GESTURE FROM ALL SIX. Everything that moves in this
 * clearing is rooted at its foot. The crowns bend from the trunk and hold their
 * trunks still; the stems dip on their stalks; the board gives at the seat; the
 * stone pivots on its own base; the flame stands up off its coals; even the
 * smoke leaves from a fixed cap. This is the first thing here pinned at the TOP,
 * so its answer is the crown's own skew with the origin moved from the bottom of
 * the element to the top — the gather holds and the hem goes. One line, and it
 * is the whole difference between a thing that stands and a thing that is hung.
 *
 * WHAT A BRUSH MAY NOT DO. It may not take the cloak off its peg. The peg is
 * deliberately outside the element that swings, so nothing a hand does here can
 * move it — and the reason is the oldest given in the place: a cloak taken down
 * is a cloak somebody is about to put on, and nobody is ever in this picture
 * (Day 111). What a hand gets is the cloth moving and the hanging unchanged,
 * which is the same shape as a prod that may not feed the fire (Day 140), a turn
 * that may not move a stone (Day 144), a lean that may not wear the bench (Day
 * 145) and a brush that may not direct the bee (Day 146). And it is not
 * remembered, for the stone's reason: a cloak found already swung, or hanging
 * differently, would be telling an arrival that somebody had been here.
 *
 * AND IT ANSWERS THE SAME WAY EVERY TIME, which is yesterday's question taken
 * up rather than dodged. The bed's answer varies because a living thing is in
 * the middle of its own work and a hand catches her wherever she happens to be.
 * Nothing varies here, and nothing should: a cloak has no round of its own to be
 * interrupted. The variation was never the gift — the life behind it was.
 *
 * REDUCED MOTION. The swing collapses to nothing, as every duration here does,
 * and the rustle arrives whole. This sits between the crown (whose whole answer
 * is motion, and who therefore has nothing at all for such a visitor) and the
 * bench (whose answer is mostly a noise): a cloth both moves and sounds, and
 * neither half is the smaller one.
 *
 * ── Day 148 (2026-10-03): THE SKEIN, AND THE FIRST ANSWER THAT IS NOT ONE
 * BODY MOVING ─────────────────────────────────────────────────────────────
 *
 * The eighth thing that answers a hand. A `.birds-touch` pad rides WITH the
 * flock — it is a child of `.sprite--birds`, so the crossing carries it — and
 * on a press `.sprite--birds` takes `is-startled` for one round: the five
 * geese splay out of their V, hold a beat scattered, and knit back up, while
 * every one of them goes on beating its wings and the skein goes on crossing.
 * And `sound.js` is asked for a honk.
 *
 * WHY THIS, AND WHY THE GESTURE IS NEW. Yesterday's note ends on a doubt about
 * whether this is "a world of feet because feet are what I know how to draw".
 * Seven answers stand: six rooted at the foot and one hung from the top, and
 * every one of them a pivot. The skein is held at neither end by anything at
 * all, so there is no point to pivot about — what a flock has instead of a
 * hinge is its FORMATION, and that is the only thing a hand can take from it.
 * scene.css carries the scatter, the arithmetic that keeps the flock's centre
 * of mass still, and why all five go at one instant where their wing-beat
 * deliberately ripples.
 *
 * WHAT A STARTLE MAY NOT DO. It may not move them. The five displacements sum
 * to nothing on each axis, so the flock's middle stands exactly where the
 * crossing had it; `bird-cross` is on the wrapper and untouched; no goose is
 * taken out of the sky, turned, held or hurried along. A hand may break a
 * living thing's order and may not steer it, which is the bee's vow (Day 146)
 * one body further out. And it is not remembered, for the stone's reason: a
 * skein found already scattered would be telling an arrival that somebody had
 * been here.
 *
 * WHERE A HAND CANNOT REACH THEM, which is the day's own small finding. A
 * positioned `z-index` opens a stacking context, so nothing inside the flock
 * can be lifted above anything outside it, and the map card is pinned over the
 * top-right corner at a higher plane. For the stretch of the crossing that
 * passes behind that card, the card takes the press and the geese cannot be
 * startled at all. Day 137 noticed they fly close enough to clip its edge; this
 * is what that costs once the sky can be touched.
 *
 * ── Day 150 (2026-10-05): THE GLASS, AND THE FIRST ANSWER THAT DOES NOT GO
 * ANYWHERE ────────────────────────────────────────────────────────────────
 *
 * The ninth thing that answers a hand. A `.glass-touch` pad lies over the small
 * tumbler on the window's sill (inside.css). Tap it and `.sill-glass` takes
 * `is-rung` for one 0.34s round — it quivers one native pixel either way, five
 * passes through its own rest, and ends exactly where it began — and `sound.js`
 * is asked for a ring.
 *
 * WHY THIS OBJECT. It is the one thing in this room that answers to the SKY
 * rather than to the fire. The mantle's stone and jar and candle are fire-side
 * and steady; the sill is the single ledge the day reaches, and the tumbler was
 * set there on Day 47 precisely because glass is the one material that can hold
 * a borrowed hour rather than merely catch it. The entry that drew it called it
 * "the one held drop of that blue you could almost pick up." Almost is the word
 * a hand has now come back for.
 *
 * WHY THE GESTURE IS NEW, which is the whole of the day. Eight answers stand
 * and every one of them goes somewhere: six bend from a foot, the cloak hangs
 * from a peg, the geese lose their arrangement. A struck glass travels nowhere
 * at all. It is the first thing here whose answer is a VIBRATION — a body held
 * where it is, returning to the same place five times inside a third of a
 * second — and that is not a smaller version of a swing, it is the one motion a
 * small hard hollow thing has and the only one nothing else in this clearing
 * does.
 *
 * WHAT A TAP MAY NOT DO. It may not take the tumbler off the sill, and it may
 * not shift it: a glass found an inch along would be a glass somebody had
 * moved, and a glass on the floor would be worse. So the round ends at exactly
 * its start, and nothing is kept — the stone's reason (Day 144), and the same
 * shape as a prod that may not feed the fire and a brush that may not take the
 * cloak down. The tumbler goes on holding the hour it held before the tap.
 *
 * THE SOUND OUTLIVES THE MOTION, and nothing here has done that before. The
 * ring runs 0.82s against the tremble's 0.34s, so for half a second the glass
 * is visibly still and audibly going. The reason is a limit rather than a
 * flourish: one native pixel is the smallest step this drawing owns, so a ring
 * can be drawn stopping and cannot be drawn dying away, and the dying away is
 * most of what a ring is. The ear carries what the pixel grid cannot.
 *
 * REDUCED MOTION. The tremble collapses to nothing, as every duration here
 * does, and the note arrives whole. Of the nine, this is the one such a visitor
 * loses least by — the crown has nothing at all for them and the cloak loses
 * half, where a ring was always mostly a sound.
 *
 * ── Day 151 (2026-10-06): THE ARMFUL, AND THE FIRST GROUP WHERE ONE BODY
 * ANSWERS ─────────────────────────────────────────────────────────────────
 *
 * The tenth thing that answers a hand. A `.logs-touch` pad lies over the armful
 * of firewood on the boards to the right of the hearth (inside.css). Press it
 * and `.woodpile` takes `is-settling` for one 0.26s round — the top log jumps
 * two native pixels out of its valley, drops back into it, jumps one more and
 * drops again — and `sound.js` is asked for a clack.
 *
 * WHY THIS OBJECT. Day 149 went round the things here that are several and get
 * read as one — the rick is nine logs read as a store, the path eight stones
 * read as a walk, the bed a count of stems read as a patch — and settled them
 * by what you can take away: lose a goose and there is no V, lose a log and
 * there is a smaller pile. The armful is the plainest of those, and it is the
 * one a hand can actually put the question to. It is also the oldest untouched
 * thing left in the room: Day 14, one morning after the chair and one before
 * the cloak that was answered on the second of October.
 *
 * WHY THE GESTURE IS NEW. Two plurals here already answer a hand and both move
 * all of themselves: every stem in the bed dips together (Day 146) and all five
 * geese scatter at once (Day 148), and in each case the argument was that a
 * hand is one event and not a clock. A pile does not contradict that — the
 * event still arrives everywhere at once; it is the PILE that is not a
 * formation. It is held up by its own bottom, so the only loose part of it is
 * the part nothing is standing on. Two logs do not move because they are
 * carrying the third. That is the first answer here where the right reading is
 * which bodies DON'T go.
 *
 * WHAT A KNOCK MAY NOT DO. It may not take a log off. The founder's list has
 * asked for "the woodpile and a log comes off it" since the twenty-third of
 * September, and after fifteen days it is the one item on that list this place
 * cannot give, because nothing here is ever spent: the armful holds the count
 * the season gave it (Day 125) and a hand is neither a season nor a fire. So
 * the log ends in the valley it started in, and nothing is written down — the
 * stone's reason (Day 144), a pile found restacked being a pile somebody had
 * restacked.
 *
 * WHERE THE DECAY GOES, which is the day's finding and the answer to the
 * question Day 150 left on the sill. Four answers here are written down as
 * "each swing smaller than the last," and only two of them are: the crown and
 * the cloak ring down by about three fifths a swing, and both are measured in
 * DEGREES, where a skew of 0.3° asks for a fraction of a pixel and the renderer
 * is free to give it. The bench's give and the glass's quiver are measured in
 * PIXELS, and a pixel has nothing under it but none — so the bench crosses its
 * rest exactly once at the height it was pressed to and the glass five times at
 * the height it was struck to, and neither is dying away however it was
 * described. This log is in the second class. What it can draw is two of the
 * three bounces — two native px, then one, then four tenths of one, which is
 * not a smaller bounce but no bounce — and what it cannot draw, `clack()`
 * carries: three knocks at the same three fifths, the last of them over a log
 * that is visibly already still.
 *
 * REDUCED MOTION. The bounce collapses as every duration here does, and the
 * three knocks arrive whole — so such a visitor loses the drawn half of the
 * series and keeps the half that was always going to be the longer one.
 *
 * Delegated from `document`, so it does not care that the home view fetches
 * scene.html in after load (no observer needed, unlike sky.js). Safe on a page
 * with no pads: the handlers simply never match.
 */
(function () {
  'use strict';

  /* One shake at a time per crown. A second tap while a crown is still ringing
   * is ignored rather than restarting it — a tree does not begin its swing
   * again from nothing because you touched it twice; and restarting would also
   * let a fast tapper hold a leaf permanently at the top of its fall. */
  function shake(pad) {
    var scene = pad.closest('.scene');
    if (!scene) return;

    var crown = pad.dataset.shake ? scene.querySelector(pad.dataset.shake) : null;
    if (crown && !crown.classList.contains('is-shaken')) {
      crown.classList.add('is-shaken');
      crown.addEventListener('animationend', function once(e) {
        if (e.animationName !== 'crown-shake') return;
        crown.classList.remove('is-shaken');
        crown.removeEventListener('animationend', once);
      });
    }

    /* The leaf is the season's half of the answer, and the question asked here
     * is not "what month is it" — season.js owns the year and one place should
     * own it — but "is there a leaf layer laid out on this face at all". Out of
     * autumn `.sprite--leaffall` is display:none, and an element inside a
     * display:none ancestor generates no boxes, which is the same reading every
     * count in this place uses (Day 98: count on layout, not on brightness).
     *
     * It has to be asked of the LAYER and not of the leaf: the leaf is itself
     * display:none until the class goes on, so asking it would always say no.
     * And it has to be asked at all — a class added to a leaf that cannot run
     * its animation never gets an `animationend` back, so `is-falling` would
     * stick there unremoved until some later autumn picked it up. */
    var leaf = pad.dataset.leaf ? scene.querySelector(pad.dataset.leaf) : null;
    var layer = leaf && leaf.parentElement;
    if (leaf && layer && layer.getClientRects().length > 0 &&
        !leaf.classList.contains('is-falling')) {
      leaf.classList.add('is-falling');
      leaf.addEventListener('animationend', function once() {
        leaf.classList.remove('is-falling');
        leaf.removeEventListener('animationend', once);
      });
    }
  }

  /* One prod at a time. A second press while the coals are still flaring is
   * ignored rather than restarting them — the same rule the crowns keep, and
   * for a sharper reason here: `is-prodded` is taken off by the `animationend`
   * of one named spark, so restarting mid-flare would let a fast presser hold
   * a run of sparks standing in the firebox indefinitely.
   *
   * The class is driven off `ember-rise-3`, which is the longest of the five
   * (0.90s against 0.66–0.84s) and carries no delay of its own to outlive. If
   * a later day retimes the sparks, this is the line that has to follow. */
  function prod(pad) {
    var scene = pad.closest('.scene');
    var hearth = scene && scene.querySelector('.hearth');

    if (hearth && !hearth.classList.contains('is-prodded')) {
      hearth.classList.add('is-prodded');
      hearth.addEventListener('animationend', function once(e) {
        if (e.animationName !== 'ember-rise-3') return;
        hearth.classList.remove('is-prodded');
        hearth.removeEventListener('animationend', once);
      });
    }

    /* Second, and never first (see the header). Anything at all wrong with the
     * sound — no Web Audio, a refused context, a file that did not load — and
     * the visible half above has already happened. */
    if (window.CabinSound && typeof window.CabinSound.crackle === 'function') {
      try { window.CabinSound.crackle(); } catch (err) {}
    }
  }

  /* ── the lamp (Day 141) ───────────────────────────────────────────────────
   *
   * The only piece of this file that remembers anything. Every read and every
   * write of storage is wrapped, because a browser in a private window, or one
   * with site data blocked, throws on the accessor rather than returning null —
   * and a lamp that cannot be remembered must still be a lamp that can be lit. */
  var LAMP_KEY = 'cabin.lamp';
  var LIT_BANDS = { dawn: 1, dusk: 1, night: 1 };

  function lampStored() {
    try {
      var v = window.localStorage.getItem(LAMP_KEY);
      return (v === 'lit' || v === 'out') ? v : null;
    } catch (e) { return null; }
  }

  function lampStore(v) {
    try { window.localStorage.setItem(LAMP_KEY, v); } catch (e) {}
  }

  /* What the hour alone would do with it. sky.js has already tagged the scene
   * by the time this file runs — both are deferred and it is first in document
   * order — and an untagged scene reads as unlit, which is the day's own
   * middle and the safest thing to be wrong about. */
  function lampLitByHour(scene) {
    return !!LIT_BANDS[scene.getAttribute('data-tod')];
  }

  function lampIsLit(scene) {
    var held = scene.getAttribute('data-lamp');
    return held ? held === 'lit' : lampLitByHour(scene);
  }

  /* `instant` is for the restore only. It puts `data-lamp-init` on the scene,
   * which turns the glass's 1.6s cross-fade off, and takes it off again on the
   * next frame — so a visitor arriving at a lamp they left burning finds it
   * already burning rather than watching it kindle at them.
   *
   * I very nearly deleted this as decoration. Removing it and re-running the
   * day's test came back green, and the reason was the hour the test happened to
   * stand at: a machine running near midnight reckons `night`, the hour lights
   * the lamp anyway, and a held `lit` changes nothing there is anything to fade
   * BETWEEN. Pin the clock to noon and the fade is plainly there — the lantern
   * reports `background-color` and `box-shadow` still running a tenth of a
   * second into a return visit. A guard tested only in the state where it has
   * nothing to do will always look like a guard that does nothing. */
  function lampPaint(scene, pad, state, instant) {
    if (instant) scene.setAttribute('data-lamp-init', '');
    if (state) scene.setAttribute('data-lamp', state);
    else scene.removeAttribute('data-lamp');

    var lit = lampIsLit(scene);
    pad.setAttribute('aria-pressed', lit ? 'true' : 'false');
    pad.setAttribute('aria-label', lit ? 'put out the lamp by the door'
                                       : 'light the lamp by the door');

    if (instant) {
      window.requestAnimationFrame(function () {
        scene.removeAttribute('data-lamp-init');
      });
    }
  }

  function lamp(pad) {
    var scene = pad.closest('.scene');
    if (!scene) return;

    var next = lampIsLit(scene) ? 'out' : 'lit';
    lampPaint(scene, pad, next, false);
    lampStore(next);

    /* Second, and never first — the same rule the fire keeps. The glass has
     * already changed by the time anything is asked of the audio. */
    if (window.CabinSound && typeof window.CabinSound.latch === 'function') {
      try { window.CabinSound.latch(); } catch (err) {}
    }
  }

  /* ── the stone (Day 144) ──────────────────────────────────────────────────
   *
   * One turn at a time, the rule every pad here keeps: a second press while the
   * stone is still edge-on is ignored rather than restarting it. That matters
   * more here than on the crowns, because the two faces cross at the middle of
   * the round and a restart would let a fast presser hold the stone at the
   * crossing — turning it, visually, into a stone that flickers.
   *
   * The face is flipped at `animationend` and not before. Until then the
   * stone still carries (or still lacks) `data-face="under"`, which is what
   * picks `stone-turn-up` over `stone-turn-down` in scene.css, so the keyframes
   * always run the direction the stone is actually going. `wasUnder` is read
   * once, before the class goes on, because the attribute it reads is about to
   * be the thing that changes.
   *
   * Under `prefers-reduced-motion` the duration collapses to 0.001ms and the
   * handler fires on the next frame, so the stone is simply turned. */
  function turn(pad) {
    var scene = pad.closest('.scene');
    var sel = pad.dataset.turn;
    var stone = (scene && sel) ? scene.querySelector(sel) : null;
    if (!stone || stone.classList.contains('is-turning')) return;

    var wasUnder = stone.getAttribute('data-face') === 'under';
    stone.classList.add('is-turning');
    stone.addEventListener('animationend', function once(e) {
      if (e.animationName !== 'stone-turn-down' &&
          e.animationName !== 'stone-turn-up') return;
      stone.classList.remove('is-turning');
      if (wasUnder) stone.removeAttribute('data-face');
      else stone.setAttribute('data-face', 'under');
      pad.setAttribute('aria-pressed', wasUnder ? 'false' : 'true');
      stone.removeEventListener('animationend', once);
    });

    /* Second, and never first — the rule the fire and the lamp keep. The tip
     * is already running by the time anything is asked of the audio. */
    if (window.CabinSound && typeof window.CabinSound.knock === 'function') {
      try { window.CabinSound.knock(); } catch (err) {}
    }
  }

  /* ── the bench (Day 145) ──────────────────────────────────────────────────
   *
   * One lean at a time, the rule every pad here keeps. It matters for the same
   * reason it does on the crowns: `is-pressed` comes off at the `animationend`
   * of `bench-give`, so restarting mid-round would let a fast presser hold the
   * board permanently down — a bench that sagged and stayed sagged, which is
   * the one thing a lean may not do to it.
   *
   * Two elements run `bench-give` (the seat and the back, which take the load
   * together) and a third animation runs on the `::after` shadow, so several
   * `animationend` events arrive for one round. The handler takes the first
   * that names `bench-give` and unsubscribes, which is why the name is checked:
   * the shadow's round is the same length, and either could arrive first.
   *
   * Under `prefers-reduced-motion` the duration collapses to 0.001ms and the
   * class comes off on the next frame, so the board is simply never seen to
   * move and the creak is the whole of the answer. */
  function lean(pad) {
    var scene = pad.closest('.scene');
    var bench = scene && scene.querySelector('.sprite--bench');
    if (!bench || bench.classList.contains('is-pressed')) return;

    bench.classList.add('is-pressed');
    bench.addEventListener('animationend', function once(e) {
      if (e.animationName !== 'bench-give') return;
      bench.classList.remove('is-pressed');
      bench.removeEventListener('animationend', once);
    });

    /* Second, and never first — the rule the fire, the lamp and the stone all
     * keep. The board is already on its way down by the time anything is asked
     * of the audio. */
    if (window.CabinSound && typeof window.CabinSound.creak === 'function') {
      try { window.CabinSound.creak(); } catch (err) {}
    }
  }

  /* ── the bed (Day 146) ────────────────────────────────────────────────────
   *
   * One brush at a time on each half, and the two are asked separately on
   * purpose: the bed is always there and the bee is one element that a later
   * day could gate or retire, so neither may be the reason the other does not
   * answer. Each is skipped if it is already mid-round rather than restarted —
   * the rule every pad here keeps, and sharpest on the bee, because restarting
   * would let a fast presser hold her at the top of her bolt indefinitely,
   * which is a hand catching her.
   *
   * The classes come off at `animationend`. Several `bloom-stir` events arrive
   * for one brush (one per stem in the bed, and the bed's count changes with
   * the date — garden.js, Day 115), so the handler takes the first that names
   * it and unsubscribes; the stems all run the same duration from the same
   * instant, so the first to end is the end. Under `prefers-reduced-motion`
   * both collapse to 0.001ms and come off on the next frame, and the buzz is
   * the whole of what arrives. */
  function brush(pad) {
    var scene = pad.closest('.scene');
    if (!scene) return;

    var bed = scene.querySelector('.sprite--flowers');
    if (bed && !bed.classList.contains('is-stirred')) {
      bed.classList.add('is-stirred');
      bed.addEventListener('animationend', function once(e) {
        if (e.animationName !== 'bloom-stir') return;
        bed.classList.remove('is-stirred');
        bed.removeEventListener('animationend', once);
      });
    }

    var bee = scene.querySelector('.sprite--bee');
    if (bee && !bee.classList.contains('is-startled')) {
      bee.classList.add('is-startled');
      bee.addEventListener('animationend', function once(e) {
        /* Named, and it matters more here than anywhere else in this file:
         * `bee-forage` is thirty seconds long and infinite, so it never ends —
         * but if a later day ever gives it an end, taking the first event that
         * arrived would strip the startle off a bee still in the air. */
        if (e.animationName !== 'bee-startle') return;
        bee.classList.remove('is-startled');
        bee.removeEventListener('animationend', once);
      });
    }

    /* Second, and never first — the rule the fire, the lamp, the stone and the
     * bench all keep. Both halves of the visible answer are already running by
     * the time anything is asked of the audio. */
    if (window.CabinSound && typeof window.CabinSound.buzz === 'function') {
      try { window.CabinSound.buzz(); } catch (err) {}
    }
  }

  /* ── the cloak (Day 147) ─────────────────────────────────────────────────
   *
   * One swing at a time, the rule every pad in this file keeps. It matters here
   * for the crown's reason rather than the bench's: `is-swung` comes off at the
   * `animationend` of `cloak-swing`, so restarting mid-round would let a fast
   * presser hold the cloth permanently out at an angle — a cloak that hung
   * crooked, which is the one thing a brush may not leave behind.
   *
   * Two animations run for one brush — `cloak-swing` on `.coat__hang` and
   * `cloak-hem` on `.coat__cloak` — and they share a duration, so either could
   * arrive first. The handler takes the one that names `cloak-swing` and
   * unsubscribes, the same check the bench and the bed make for the same
   * reason. The class is read and written on `.coat`, not on the wrapper,
   * because the wrapper is a detail of how the cloth is held and the thing a
   * visitor pressed is the cloak.
   *
   * Under `prefers-reduced-motion` the duration collapses to 0.001ms and the
   * class comes off on the next frame, so the cloth is never seen to move and
   * the rustle is what arrives. */
  function swing(pad) {
    var scene = pad.closest('.scene');
    var coat = scene && scene.querySelector('.coat');
    if (!coat || coat.classList.contains('is-swung')) return;

    coat.classList.add('is-swung');
    coat.addEventListener('animationend', function once(e) {
      if (e.animationName !== 'cloak-swing') return;
      coat.classList.remove('is-swung');
      coat.removeEventListener('animationend', once);
    });

    /* Second, and never first — the rule the fire, the lamp, the stone, the
     * bench and the bed all keep. The cloth is already on its way out by the
     * time anything is asked of the audio. */
    if (window.CabinSound && typeof window.CabinSound.rustle === 'function') {
      try { window.CabinSound.rustle(); } catch (err) {}
    }
  }

  /* ── the skein (Day 148) ─────────────────────────────────────────────────
   *
   * One startle at a time, the rule every pad in this file keeps, and here it
   * stops a fast tapper holding five geese permanently splayed — a skein that
   * never knits back up, which is the one thing a startle may not leave
   * behind, since the formation is the whole of what makes them birds.
   *
   * The class goes on the FLOCK and the animation runs on its five children,
   * so five `animationend` events arrive for one startle. They share a
   * duration and a start instant, so the first to end is the end; the handler
   * takes the first that names `bird-startle` and unsubscribes, the same check
   * the bench, the bed and the cloak make for the same reason. The name matters
   * more than usual here: `bird-cross` on the wrapper and `bird-flap` on each
   * child are both infinite and neither ever ends today, but a later day that
   * gave either an end would otherwise strip the startle off a flock still
   * coming apart.
   *
   * Under `prefers-reduced-motion` the duration collapses to 0.001ms, the class
   * comes off on the next frame, and the honk is what arrives. */
  function startle(pad) {
    var skein = pad.closest('.sprite--birds');
    if (!skein || skein.classList.contains('is-startled')) return;

    skein.classList.add('is-startled');
    skein.addEventListener('animationend', function once(e) {
      if (e.animationName !== 'bird-startle') return;
      skein.classList.remove('is-startled');
      skein.removeEventListener('animationend', once);
    });

    /* Second, and never first — the rule every answer in this file keeps. The
     * formation is already coming apart by the time anything is asked of the
     * audio. */
    if (window.CabinSound && typeof window.CabinSound.honk === 'function') {
      try { window.CabinSound.honk(); } catch (err) {}
    }
  }

  /* ── the glass (Day 150) ─────────────────────────────────────────────────
   *
   * One tap at a time, the rule every pad in this file keeps. Here it stops a
   * fast tapper holding the tumbler permanently off-centre — a glass standing
   * a pixel to the side of where it has stood since the day it was set down,
   * which is the one thing a tap may not leave behind.
   *
   * It is the only answer in this file where the guard and the sound part
   * company, and that is deliberate. `glass-ring` runs 0.34s and `ring()` runs
   * 0.82s, so a second press arriving while the first note is still sounding is
   * NOT skipped — the tremble has long since ended and the class is off. Two
   * rings overlapping is simply what tapping a glass twice sounds like, and
   * refusing the second would be the file pretending it owns the room's air. A
   * press inside the 0.34s does nothing at all, as everywhere else here.
   *
   * One animation runs for one tap, on `.sill-glass` itself, so there is no
   * ambiguity about which `animationend` is the end — but the name is checked
   * all the same, the check the bench, the bed, the cloak and the skein all
   * make, so that a later day giving the tumbler a second animation cannot
   * strip the ring off a glass still quivering.
   *
   * Under `prefers-reduced-motion` the duration collapses to 0.001ms and the
   * class comes off on the next frame, so the glass is never seen to move and
   * the note is the whole of what arrives — which costs that visitor less here
   * than anywhere else in this file, because a ring was always mostly a sound. */
  function strike(pad) {
    var scene = pad.closest('.scene');
    var glass = scene && scene.querySelector('.sill-glass');
    if (!glass || glass.classList.contains('is-rung')) return;

    glass.classList.add('is-rung');
    glass.addEventListener('animationend', function once(e) {
      if (e.animationName !== 'glass-ring') return;
      glass.classList.remove('is-rung');
      glass.removeEventListener('animationend', once);
    });

    /* Second, and never first — the rule every answer in this file keeps. The
     * glass is already quivering by the time anything is asked of the audio. */
    if (window.CabinSound && typeof window.CabinSound.ring === 'function') {
      try { window.CabinSound.ring(); } catch (err) {}
    }
  }

  /* One settle at a time. A second press while the top log is still in the air
   * is ignored rather than restarting it, the rule every ring-down in this file
   * keeps — and here it also keeps a fast tapper from holding a log permanently
   * two pixels off the pile, which would be the one thing a knock may not do
   * wearing a different coat.
   *
   * The class goes on `.woodpile` and the animation runs on its `--top` child,
   * so the `animationend` is caught on the pile by bubbling. Naming the
   * animation in the guard is deliberate: a renamed keyframe set fails loudly
   * here rather than leaving the class on forever. */
  function settle(pad) {
    var scene = pad.closest('.scene');
    var pile = scene && scene.querySelector('.woodpile');
    if (!pile || pile.classList.contains('is-settling')) return;

    pile.classList.add('is-settling');
    pile.addEventListener('animationend', function once(e) {
      if (e.animationName !== 'log-settle') return;
      pile.classList.remove('is-settling');
      pile.removeEventListener('animationend', once);
    });

    /* Second, and never first. The log is already out of its valley by the time
     * anything is asked of the audio. */
    if (window.CabinSound && typeof window.CabinSound.clack === 'function') {
      try { window.CabinSound.clack(); } catch (err) {}
    }
  }

  /* Read the held choice back at parse time, in the body of this deferred file,
   * so the lamp is right on arrival rather than correcting itself a moment
   * later — and with `instant`, so it does not fade there. Both halves matter:
   * the ordering puts the attribute on before the first paint, and the
   * suppression covers the case where something earlier in the page has already
   * flushed a style off this view. A page with no pad — every view but the door
   * side — falls straight through. */
  (function restoreLamp() {
    var pad = document.querySelector('.lamp-touch');
    var scene = pad && pad.closest('.scene');
    if (!scene) return;
    lampPaint(scene, pad, lampStored(), true);
  })();

  /* Every pad in this place, and what each one answers with. Pads never nest,
   * so at most one of these can match any one target and the order is only a
   * tiebreak that never happens — but it is the order they were built in, so
   * the list reads as the record does.
   *
   * It is a table rather than a chain of ifs because until Day 148 the two
   * listeners below said the same thing twice, once as early returns and once
   * as eight nested ternaries, and an eighth thing that answers a hand would
   * have made the second of those unreadable. One list, read by both. */
  var PADS = [
    ['.crown-touch',  shake],
    ['.fire-touch',   prod],
    ['.lamp-touch',   lamp],
    ['.stone-touch',  turn],
    ['.bench-touch',  lean],
    ['.bed-touch',    brush],
    ['.coat-touch',   swing],
    ['.birds-touch',  startle],
    ['.glass-touch',  strike],
    ['.logs-touch',   settle]
  ];

  function padFor(target) {
    if (!target || !target.closest) return null;
    for (var i = 0; i < PADS.length; i++) {
      var pad = target.closest(PADS[i][0]);
      if (pad) return { pad: pad, answer: PADS[i][1] };
    }
    return null;
  }

  document.addEventListener('click', function (e) {
    var hit = padFor(e.target);
    if (hit) hit.answer(hit.pad);
  });

  /* Everything a real <button> would have given for free, minus the layout it
   * would have cost (Day 106: Chromium blockifies a button whatever display it
   * is given). Space scrolls the page if it is not swallowed. */
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' && e.key !== ' ' && e.key !== 'Spacebar') return;
    var hit = padFor(e.target);
    if (!hit) return;
    e.preventDefault();
    hit.answer(hit.pad);
  });
})();
