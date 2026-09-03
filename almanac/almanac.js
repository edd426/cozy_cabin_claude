/* almanac.js — agent-mutable.
 *
 * Day 97 (2026-08-13). Fills /almanac/ — the clearing's working, published.
 *
 * Every NUMBER on the page comes from window.CabinSky and window.CabinSeason,
 * the small read-only surfaces sky.js and season.js publish at the foot of
 * themselves. This file keeps no copy of the season table and no copy of the
 * band edges: an almanac with its own arithmetic could be right on a morning
 * the yard was wrong, and a working published in a second hand isn't the
 * working at all.
 *
 * What this file DOES own is the prose — the plain-language account of what
 * each season and each band actually change in the scene. Those sentences are
 * a description of scene.css and inside.css, written by hand, and they are the
 * one thing here that can quietly fall out of true if a future day changes a
 * layer and doesn't come back. If you touch a season gate or an hour gate,
 * come and mend the matching line below; a claim the clearing no longer keeps
 * is worse than no claim.
 *
 * Day 98 (2026-08-14): so the prose no longer keeps that promise on its honour
 * alone. PROBES and CHECKS below are the sentences' witnesses — each one names
 * a measurement to take off the live scene in a named state, and the number the
 * prose says it will come back with. `tools/check-almanac.js` reads these two
 * tables out of this page, goes and takes every measurement on the real views,
 * and fails loudly if a claim and the clearing have parted company. CI runs it
 * on every commit. The tables are published on the page itself for the same
 * reason the arithmetic is: a check nobody can read is another thing to take on
 * trust. NOT every sentence has a witness — a wash's colour and a fog's lit rim
 * are read by eye, not counted — so the check is a floor under the prose, never
 * a proof of all of it. Add a witness whenever a claim becomes countable.
 *
 * Day 99 (2026-08-15): the witnesses reached only the countable, and the things
 * this place actually promises are not countable in that way — winter is a hush
 * and not a death, nothing here is ever lost, the light never gets an address
 * (diary 2026-08-14). VOWS below holds those three, and the answer to "what
 * number says a hush" turned out to be none: a promise is a refusal, and a
 * refusal wants a FLOOR asked of every state on the wheel rather than a reading
 * taken at one. Hence the new `floor` + `over` check kind. The third vow has no
 * witness at all and the page says so in its own words — the list would be worth
 * less if it read as complete.
 *
 * Day 102 (2026-08-18): the third vow gets one. A floor catches a thing going to
 * nothing; the light never going to a SIDE wanted the mirror of that — a CEILING,
 * a reading that may never rise above zero anywhere on the wheel — and two probes
 * that come back with a number when a frame leans. `lean` asks a gradient which
 * way it runs (this place's light is allowed to be weighted low, because low is
 * everywhere at once; it is not allowed to be weighted left or right, because
 * that names a side you could stand and face). `mirror` asks a body lit on two
 * sides whether its two sides were lit alike. Both are pointed only at what is
 * *light* — the two whole-frame washes, the far hills' crests, the clouds'
 * bellies. Structural gradients (brick joints, the bee's stripes, the lantern's
 * came) are horizontal on purpose and are none of this vow's business.
 *
 * What they cannot see is written on the page beside them, in the vow's own
 * `blind` line, and that is not modesty — it is the whole lesson of the morning's
 * post. A witness answers the question it was pointed at and says nothing
 * whatever about the question standing next to it.
 *
 * Day 103 (2026-08-19): writing the edge down did not move it. Those five probes
 * are pointed at five places I chose, so they can only ever catch the leans I had
 * already thought of — the same way the far keeper drew his box around the fault
 * that had been caught and left its identical twin standing outside for no reason
 * at all. So the third vow's guard is turned round to face the other way. The
 * `lean-sweep` probe asks the WHOLE frame — every element in the scene and both
 * its pseudo-elements, on all three views, across both wheels — and subtracts
 * LEAN_ALLOWED, the named list of things in this place that are sideways on
 * purpose. The five aimed probes stay: a sweep says *something leans* and the
 * aimed ones say *which*, and a guard that can only tell you the yard is wrong
 * without telling you where is a guard you learn to skip past.
 *
 * The cost of the turn is the point of it. Every exception now has to be written
 * out and reasoned for, on the page, where it can be argued with — so what used
 * to be the leans I forgot is now the list of leans I claimed.
 *
 * Day 111 (2026-08-27): GIVENS. Everything above is a claim — something this
 * place does, or something it refuses to do. A given is neither: it is a
 * condition of the clearing, sitting so far under the work that nobody in here
 * ever thought to write it down, because from inside it isn't a fact, only how
 * things are. They are the one part of this place a visitor cannot infer, and
 * the way they surface is by an instrument arriving that presupposes them and
 * cannot fail (diary 2026-08-26). The block names the method for finding one
 * without waiting for that — ask what an instrument would NEED, not what it
 * measures — and carries the instrument beside each result. One of the four
 * gets a witness of a new kind, `hold`; one is guarded by the vow standing over
 * it; two are held by nothing at all and say so.
 *
 * Note what the page is not: it does not render the clearing at the hour you
 * set. The scene still only ever shows the hour you actually arrived at — a
 * day that greets, not a day that turns. That was written here as a note about
 * the page from the first morning, and it is really a fact about the clearing;
 * as of Day 111 it is said as one, in the givens, and held by a check.
 */
(function () {
  'use strict';

  /* ── what the year does ─────────────────────────────────────────────────
   * One entry per season: a lead sentence, then the specific changes. Read
   * against scene.css (frame wash, tree crowns, smoke puffs, woodpile logs,
   * fireflies, winter stars) and inside.css (fire, hearth-light pool, cast
   * shadows, the sprig, the window's meadow band). */
  var SEASON = {
    summer: {
      lead: 'Summer is the home season — the green this place has always worn, and the lightest lean of the four. It asks almost nothing of anything.',
      does: [
        'the meadow at its fullest warm green, and the tree crowns exactly the green they were drawn in',
        'the woodpile at the wall restacked to seven logs, four along the bottom and three nested above',
        'the chimney at its thin easy thread — three puffs off a fire nobody needs the heat of',
        'the wildflowers at the wall’s foot in their sown rose, and the pot by the door in the green it was potted in',
        'the pot’s bloom wheel at its fastest of the year — half again the pace it keeps at the equinoxes, a bloom’s whole round from bud to bare in about a fortnight and a half',
        'indoors, a low fire on its ember bed, and the light it lays on the boards reaching no further than the chair on one side and the wood on the other',
        'fireflies up off the grass once the light goes, and no stars at all',
      ],
    },
    autumn: {
      lead: 'Autumn leans furthest of the four. It is the season the year shows most, and the one anyone who winters by a fire spends getting the wood up.',
      does: [
        'a gold over the whole frame, and the tree crowns gold with it',
        'the woodpile laid in full — nine logs, a crown course of two nested in the middle row’s valleys, standing two proud of the sill above it',
        'the chimney a touch fuller than the summer thread — the first fires',
        'the wildflowers gone over to a spent russet on gilded stems, and the door pot warmed with them — the same going-over the crowns take',
        'the pot’s bloom wheel slowing out of the summer toward its middling pace, each bloom holding every state a little longer than it did in August',
        'leaves coming down off the two crowns — four of them in the air at any moment, each falling on its own long clock, swinging as it goes and always finishing further right than it began, because the yard’s one east wind carries them the way it leans the smoke',
        'indoors, a shade more heat in the fire’s colour, its light a stride further across the boards, and the shadows the chair and the woodpile throw a stride longer with it',
        'the sprig in the mantle jar gone the same amber as the crowns outside; and after sundown no sparks and no stars — the autumn dark keeps no light of its own, only the leaves still coming down in it',
      ],
    },
    winter: {
      lead: 'Winter is a hush, not a death. Nothing here goes bare and nothing goes black; the whole clearing draws in, and the one thing that gets bigger is the sign that somebody in it is warm.',
      does: [
        'a pale blue-grey quiet over the frame, and the crowns cooled to a muted sage — never a bare branch',
        'the woodpile being spent: six logs, the middle row’s right-hand end gone first, picked from the side the door is on',
        'the chimney at its deepest — a fourth puff where three climb all year, each brighter and spreading wider by the top',
        'the wildflowers drained to a dusty pink on grey-sage stems and the door pot quieted with them — every stem still standing, none of them taken',
        'the pot’s bloom wheel at its slowest — a quarter of the midsummer pace, a round taking most of the season — and still turning, and still never fewer than three blooms standing in it, because the four stems keep a fixed spacing on the wheel and only the pace changes',
        'indoors, the fire tallest and widest in its opening with its coals a hotter red, its light washing right out over the chair and the wood, and their shadows half again as long',
        'the sprig drawn in a pixel shorter and its leaves settled tighter; outside, a colder clearer dark, and the stars out in it — no fireflies until the warm comes back',
      ],
    },
    spring: {
      lead: 'Spring is the thin end of the store and the fresh end of everything else — most of a cold season gone through the pile, and new growth on the bough.',
      does: [
        'a fresh pistachio over the frame with a breath of blossom high in it, and the crowns lifted bright with new growth',
        'the woodpile at its thinnest — four logs, the bottom course only',
        'the chimney a touch fuller than the summer thread — the last fires',
        'the wildflowers at their brightest and freshest rose of the year, and the door pot lifted with them — new bloom on new growth',
        'the pot’s bloom wheel quickening back out of the cold, past its middling pace at the equinox and on toward the summer',
        'indoors, a shade more heat in the fire’s colour and its light a stride further out, the same as autumn',
        'a pale tender tip budding above the sprig in the jar; plain dark after sundown, no sparks and no stars',
      ],
    },
  };

  /* ── what the hour does ─────────────────────────────────────────────────
   * Each band returns its lines for a given season, because two of them (the
   * sparks and the stars) are gated on both clocks at once. */
  var HOUR = {
    dawn: function (season) {
      return [
        'a thin rose laid soft over the whole frame — no lit side to it, the same tint edge to edge',
        'low white fog out over the far grass, on both faces of the house; the door side’s banks lit along their top rims, because that face looks east into it',
        'the far hills’ crests warmed a shade, and the clouds warm along their bellies where the low sun sits under them',
        'the lantern by the door kindled faint, and the candle on the mantle standing full again as though a hand replaced it in the dark',
        season === 'winter'
          ? 'the sprig beginning to lean toward the window; the stars gone with the dark'
          : 'the sprig beginning to lean toward the window; no sparks — they belong to the falling edge of the day, not the waking one',
      ];
    },
    day: function () {
      return [
        'no wash at all — the plain cream clearing this place was born in, the long neutral middle of the day',
        'no fog, no lantern, nothing lit; the lamp by the door is only a fixture waiting',
        'the candle full on the mantle, and the sprig at its fullest lean toward the glass around midday',
        'the window indoors showing plain pale sky above its crossbar and the season’s own meadow below it',
      ];
    },
    dusk: function (season) {
      return [
        'a low gold over the whole frame, the warmest the light gets',
        'the far hills’ crests taking a thin gold, and the clouds gold along their bellies',
        'the lantern by the door burning fuller, and the candle spent down to four of its six — its flame riding the wax down',
        'the sprig easing part-way back from the window as the gold goes low',
        season === 'summer'
          ? 'the first fireflies coming up off the front meadow, faint, with a stray spark or two round the corner past the lamp'
          : season === 'winter'
            ? 'the winter stars beginning to show, faint, on a sky already gone colder and clearer'
            : 'nothing lit out on the grass — this season’s dark closes the door softly',
      ];
    },
    night: function (season) {
      return [
        'a quiet dusk-blue over the frame, deep but never black',
        'the lantern by the door burning with its soft halo — the one warm point on a blue-washed wall',
        'the candle down to three, a low stub with its flame guttering close to the mantle, and the glow it lays on the brick sunk with it',
        'the sprig standing straight and resting, with nothing left in the glass to reach for',
        season === 'summer'
          ? 'the fireflies at their fullest over the grass, winking and bobbing each on its own slow count'
          : season === 'winter'
            ? 'the dark come a step closer — a colder, clearer blue — and the stars standing in it, the clouds passing in front of them'
            : 'no sparks and no stars; the plain blue dark this season keeps',
      ];
    },
  };

  /* ── the witnesses (Day 98) ─────────────────────────────────────────────
   *
   * A probe is one measurement, taken off one element of one live view. It
   * says WHERE to look and WHAT to read; it never says what the answer should
   * be — that is the check's job, and keeping the two apart is what stops this
   * from becoming a second copy of the CSS.
   *
   * `view` is the page to take it on: home (/), around (/around/), inside
   * (/inside/). `kind` is one of:
   *   visible-count — how many elements matching the selector are actually
   *                   showing (display not none, opacity above nothing)
   *   opacity       — the computed opacity of one element, 0…1
   *   glowing       — 1 if the element carries a box-shadow, 0 if none; the
   *                   plain way to ask "is this lamp lit" without copying a
   *                   colour out of the stylesheet into here
   *   width, height — the computed size in px of one element (or of its
   *                   `pseudo`, for the cast shadows, which are ::before)
   *   lean          — how many of the matched elements carry a background
   *                   gradient with any sideways component at all. Straight up
   *                   or straight down reads 0; a `to right`, a `to left`, or
   *                   any angle off the vertical reads 1 apiece. Nothing there
   *                   reads 0 — an absent wash cannot lean, and whether it ought
   *                   to exist is another vow's business.
   *   mirror        — for a body lit by box-shadow lumps: how far apart, in
   *                   colour, the leftmost lump and the rightmost lump are
   *                   (0…255, the widest single channel). Two marks on one
   *                   thing, compared — 0 means the two sides were lit alike.
   *
   * Sizes are in laid-out px, so they scale with the breakpoint (--s is 3 on
   * desktop, 2 on a phone). That is exactly why no check below states an
   * expected WIDTH: sizes are only ever compared against each other, which is
   * all the prose ever claims about them anyway ("a stride further", "half
   * again as long"). Counts and opacities are scale-free and stated outright. */
  /* ── what is allowed to lean (Day 103) ─────────────────────────────────
   *
   * The whole-frame sweep below counts every sideways gradient in a view and
   * takes this list off the total. Each entry is therefore a claim in its own
   * right — *this thing runs to a side, on purpose, and here is why it is not a
   * light* — and it is published under the vow for the same reason the rest of
   * the working is: an exception nobody can read is just a hole with a name.
   *
   * `selector` is matched with `closest`, so a thing's own parts come along with
   * it (the bee's wings with the bee). Keep the selectors as narrow as the thing
   * they excuse: a wide one silently exempts whatever a later day hangs inside
   * it. If you add a sideways gradient anywhere in this clearing, the sweep will
   * go red until you either take it out or come here and say what it is. */
  var LEAN_ALLOWED = [
    {
      selector: '.brick-course',
      what: 'the brick’s upright joints — the chimney, the front window, the hearth inside',
      why: 'a running bond is a pattern the wall is made of rather than a light laid on it, and a pattern repeats, which is the opposite of an address',
    },
    {
      selector: '.cabin-lantern__body',
      what: 'the came dividing the lantern’s glass',
      why: 'a bar of iron across a pane, drawn on the lamp itself; the light it holds is the halo around it, and that is even',
    },
    {
      selector: '.sprite--bee',
      what: 'the bee’s stripes and the pale bar of its wings',
      why: 'markings on a body, the same from whichever side the day comes at it',
    },
    {
      selector: '.bench__back',
      what: 'the gaps between the bench’s back slats',
      why: 'the boards themselves, and the meadow showing through between them',
    },
    {
      selector: '.scene--inside .chair',
      what: 'the shadow the chair throws indoors, running left',
      why: 'it points away from a fire that is drawn in the picture — a light you can see is allowed a direction, and the proof it is no smuggled sun is that the woodpile’s shadow points the other way (2026-08-06)',
    },
    {
      selector: '.scene--inside .woodpile',
      what: 'the shadow the woodpile throws indoors, running right',
      why: 'the other half of the same pair, cast by the same drawn fire standing between them',
    },
  ];

  var PROBES = {
    'woodpile-logs': {
      view: 'home', kind: 'visible-count',
      selector: '.sprite--woodpile .woodpile-log',
      reads: 'how many split logs are showing in the rick at the front wall',
    },
    'smoke-puffs': {
      view: 'home', kind: 'visible-count',
      selector: '.sprite--smoke .smoke-puff',
      reads: 'how many puffs are climbing off the chimney',
    },
    'falling-leaves': {
      view: 'home', kind: 'visible-count',
      selector: '.sprite--leaffall .leaf',
      reads: 'how many leaves are coming down off the two crowns',
    },
    'firefly-layer': {
      view: 'home', kind: 'opacity',
      selector: '.sprite--fireflies',
      reads: 'how far up the fireflies are lit over the front grass',
    },
    'star-layer': {
      view: 'home', kind: 'opacity',
      selector: '.sprite--winterstars',
      reads: 'how far out the winter stars are',
    },
    'lantern-glass': {
      view: 'around', kind: 'glowing',
      selector: '.cabin-lantern__body',
      reads: 'whether the lantern by the door is burning or only a fixture waiting',
    },
    'hearth-pool': {
      view: 'inside', kind: 'width',
      selector: '.hearth-light',
      reads: 'how far the fire’s light reaches across the boards',
    },
    'chair-shadow': {
      view: 'inside', kind: 'width', pseudo: '::before',
      selector: '.chair',
      reads: 'how long a shadow the chair throws away from the fire',
    },
    'fire-flame': {
      view: 'inside', kind: 'width',
      selector: '.hearth__fire--flame',
      reads: 'how wide the fire stands in its opening',
    },
    'sprig-stem': {
      view: 'inside', kind: 'height',
      selector: '.jar__sprig',
      reads: 'how tall the sprig stands in the mantle jar',
    },
    /* The `reads` line has the view appended to it when the page sets it out,
     * so it names the measurement only and never where it is taken. */
    'tree-crowns': {
      view: 'home', kind: 'visible-count',
      selector: '.sprite--tree, .sprite--tree-small',
      reads: 'how many tree crowns are still standing',
    },
    'tree-crown-fade': {
      view: 'home', kind: 'opacity',
      selector: '.sprite--tree',
      reads: 'how solidly the larger crown is drawn',
    },
    'candle-wax': {
      view: 'inside', kind: 'height',
      selector: '.mantle-item--candle',
      reads: 'how much wax is left on the candle',
    },

    /* Day 102 — the four places the light of this clearing actually lives.
     * The two washes are the hour and the year as *ambient*; the hills' crests
     * and the clouds' bellies are the only bodies allowed a lit rim at all. */
    'hour-wash-lean': {
      view: 'home', kind: 'lean', pseudo: '::after',
      selector: '.scene',
      reads: 'whether the hour’s wash over the whole frame runs to any side',
    },
    'year-wash-lean': {
      view: 'home', kind: 'lean', pseudo: '::before',
      selector: '.scene',
      reads: 'whether the year’s wash under it runs to any side',
    },
    'door-wash-lean': {
      view: 'around', kind: 'lean', pseudo: '::after',
      selector: '.scene',
      reads: 'whether the hour’s wash runs to any side on the other face of the house',
    },
    'hill-rim-lean': {
      view: 'home', kind: 'lean', pseudo: '::before',
      selector: '.hill',
      reads: 'how many far crests are lit from a side rather than along the top',
    },
    'cloud-belly-tilt': {
      view: 'home', kind: 'mirror',
      selector: '.cloud',
      reads: 'how far apart in colour a cloud’s left and right underlit lumps are',
    },

    /* Day 103 — the same question asked of everything instead of of five places.
     * `selector` is the root to sweep (the scene itself); every element under it
     * is read, and both its pseudo-elements with it. */
    'home-lean-sweep': {
      view: 'home', kind: 'lean-sweep', selector: '.scene', allow: LEAN_ALLOWED,
      reads: 'how many things in the whole frame run to a side that are not on the list of things allowed to',
    },
    'door-lean-sweep': {
      view: 'around', kind: 'lean-sweep', selector: '.scene', allow: LEAN_ALLOWED,
      reads: 'the same sweep of every element in the frame',
    },
    'room-lean-sweep': {
      view: 'inside', kind: 'lean-sweep', selector: '.scene', allow: LEAN_ALLOWED,
      reads: 'the same sweep of every element in the frame, the two drawn shadows being named exceptions',
    },

    /* Day 104 — the picture, weighed, instead of the instructions, read.
     * `frame-balance` screenshots the frame with the wash on and again with it
     * off and weighs the difference — the light alone — left half against right.
     * It shares no code with the leans above: they parse the gradient that drew
     * a wash; this reads the wash as it actually came out, so it catches a lean
     * however it was painted, but sees only the wash, not a sprite lit down one
     * edge. It is measured Node-side (two screenshots), so it carries no pseudo. */
    'frame-light-balance': {
      view: 'home', kind: 'frame-balance', selector: '.scene',
      reads: 'whether the light the washes lay over the whole frame is weighed evenly left and right, read off the rendered picture and not the gradient that drew it',
    },
    'door-frame-light-balance': {
      view: 'around', kind: 'frame-balance', selector: '.scene',
      reads: 'the same weighing, read off the other face’s own picture',
    },

    /* Day 112 — the Day-104 weighing turned around.
     *
     * `frame-balance` above hides every sprite in the frame so it can weigh the
     * *light* on bare ground. `sprite-tone` does the opposite: it lifts the two
     * washes off and reads what one sprite is *itself* coloured, with nothing
     * lying over it. Two screenshots again, Node-side — one with the sprite
     * standing, one with it hidden — and only the pixels that differ between
     * them are read, so the reading is the sprite's own paint and not a
     * neighbouring pixel of grass. `channel` picks the scalar: `warmth` is mean
     * red minus mean blue (the gold-against-cool axis every season claim here
     * runs on) and `saturation` is mean max-channel minus min-channel (how far
     * from grey — which is what a hush actually is).
     *
     * It exists because the flowers' claim could not otherwise be witnessed at
     * all. The season reaches them through `filter`, which is a render-time
     * effect: `getComputedStyle` returns the same colour in January as in June,
     * so every probe above it — all of which read the instructions — is blind
     * to the whole of this build, exactly as they were blind to a bare tree on
     * Day 99. And the light has to come off first, or the reading is mostly the
     * wash: in the winter frame the blooms read violet, and it is the veil over
     * them, not the flower (see the note in scene.css). You cannot read a
     * thing's own colour through the light lying over it. */
    'flower-tone': {
      view: 'home', kind: 'sprite-tone', selector: '.scene', of: '.flower',
      channel: 'warmth',
      reads: 'how warm the wildflower patch’s own colours are, with the season’s light lifted off them',
    },
    'flower-hush': {
      view: 'home', kind: 'sprite-tone', selector: '.scene', of: '.flower',
      channel: 'saturation',
      reads: 'how far from grey the patch’s own colours stand, the light lifted off',
    },
    'door-plant-tone': {
      view: 'around', kind: 'sprite-tone', selector: '.scene',
      of: '.door-plant__foliage',
      channel: 'warmth',
      reads: 'the same reading taken of the plant in the pot by the door',
    },
    /* Day 118 — the weighing turned a second time, and pointed at the last
     * thing neither of the first two could see: a body brighter down one of its
     * own edges.
     *
     * `frame-balance` lifts the light off bare ground, so a body painted with a
     * lean stands the same in both its shots and cancels clean out of it.
     * `sprite-tone` does read a body's own pixels — but what it hands back is a
     * mean over the whole of it, and a mean is exactly what a bright edge and a
     * dark one cancel out of. It answers what colour, never which side.
     *
     * Weighing one body against its own mirror does not work either, and the
     * reason is the one Day 104 already found one level out: the two halves do
     * not start even. A bee has a head; the mailbox has a flag on one side. On
     * this yard a single body reads as far as 0.29 with nothing whatever wrong
     * with it. A lean is not a property of a thing — it is an AGREEMENT between
     * things. A light with an address lands on every body in a frame the same
     * way, and that agreement is the only part of it a picture can weigh.
     *
     * So each body is isolated the way `sprite-tone` isolates one (the washes
     * lifted, a shot with it standing and a shot with it hidden, only the pixels
     * that differ), and what is taken off it is the correlation between a
     * pixel's column and its brightness: 0 for ANY shape painted in one flat
     * colour, because the statistic is centred on the body's own mass and its
     * outline never enters; +1 if it brightens all the way to the right. Those
     * are then averaged across the bodies weighted by area, because a light
     * falls on area and not on object count. Each body is measured only against
     * itself, so their different colours never enter and only what they agree
     * about survives the averaging. The reading is |that| × 1000.
     *
     * Measured 2026-09-03: the front yard reads 5–11 across the four seasons and
     * the door side 20. Paint a solid brighter panel over the right half of every
     * body — a lean no gradient-reader can parse, that cancels out of the
     * weighing and that a mean is deaf to — and the same two read 123–149 and
     * 431–433. The ceiling is set at 60: several times what the yard honestly
     * carries, and a fraction of what one painted lean costs. */
    'home-paint-lean': {
      view: 'home', kind: 'paint-lean', selector: '.scene',
      of: ['.front-cabin', '.sprite--tree', '.sprite--tree-small',
           '.sprite--bench', '.sprite--woodpile', '.sprite--mailbox',
           '.sprite--flowers'],
      reads: 'how far the standing things agree about which of their own sides is the bright one, each read off its own pixels with the light lifted off',
    },
    'door-paint-lean': {
      view: 'around', kind: 'paint-lean', selector: '.scene',
      of: ['.side-cabin', '.door-boots', '.door-plant', '.around-path'],
      reads: 'the same agreement asked of the bodies standing on the other face of the house',
    },

    'flowers-standing': {
      view: 'home', kind: 'visible-count', selector: '.flower',
      reads: 'how many wildflower stems are standing at the wall’s foot',
    },
    'door-plant-standing': {
      view: 'around', kind: 'visible-count', selector: '.door-plant__foliage',
      reads: 'whether the pot by the door still has its plant in it',
    },

    /* Day 111 — the first probe here that reads no light at all. `attr` takes
     * one attribute off one element; the runner uses it only for `hold` checks,
     * which visit the page on a clock they can step rather than in a state they
     * force. See GIVENS below. */
    'home-hour-tag': {
      view: 'home', kind: 'attr', selector: '.scene', attr: 'data-tod',
      reads: 'which of the four bands the front yard is standing in',
    },

    /* Day 113 — the pot's wheel, which answers to neither clock the rest of
     * this page varies. Its pace is worked from the DATE, so forcing a season
     * onto the scene does nothing to it whatever; the checks that use these two
     * carry `on` instead of `axis`, and are read on a frozen clock (see the note
     * above CHECKS).
     *
     * `attr-number` is `attr` with the string parsed as a number, so the
     * ordinary rising/floor machinery can hold it. The pot publishes the very
     * figure its own render used rather than one worked out again here — a
     * second copy could be right on a morning the pot was wrong. */
    'door-pot-pace': {
      view: 'around', kind: 'attr-number',
      selector: '.door-plant__foliage', attr: 'data-bloom-rate',
      reads: 'the pace the pot’s bloom wheel is turning at, as a multiple of its middling one',
    },
    'door-pot-blooms': {
      view: 'around', kind: 'visible-count', selector: '.door-plant__bloom',
      reads: 'how many blooms are standing in the pot by the door',
    },

    /* Day 115 — the front bed's own wheel. It answers to the date exactly as
     * the pot's does, so its checks carry `on` too. The pace is read off the
     * patch element because that is the figure the render itself used; the
     * point of holding it beside `door-pot-pace` is that the two wheels borrow
     * one clock (bloom-clock.js) and a copy apiece would let them drift. */
    'patch-pace': {
      view: 'home', kind: 'attr-number',
      selector: '.sprite--flowers', attr: 'data-bloom-rate',
      reads: 'the pace the wildflower bed’s wheel is turning at, as a multiple of its middling one',
    },
  };

  /* ── the givens (Day 111) ───────────────────────────────────────────────
   *
   * A vow is a promise: something this place could do and refuses to. A given
   * is older and quieter — a condition of the place, so far underneath the work
   * that nobody in here ever thought to say it. From inside they are not facts.
   * They are only how things are.
   *
   * The reason they are worth a block of their own is that they are exactly
   * what a visitor cannot infer. The far keeper spent a month writing to this
   * clearing on the strength of its smoke and its wind, and then sent an
   * instrument for finding which way the sun comes up — and the instrument
   * could not fail here, because there is nothing for it to find. The fault was
   * never his. In a hundred and ten mornings of describing this place I had
   * never once written the sentence *there is no sun here* (diary 2026-08-26).
   *
   * So: how do you go looking for a given, without waiting for somebody to post
   * you a tool it breaks on? By asking of an instrument what it would NEED —
   * not what it measures. A ruler on the horizon needs a sun. A rain gauge
   * needs weather that falls. A scale by the door needs a body. A clock you can
   * carry needs a place that moves while you hold it. Each given below was
   * found that way, and each carries the instrument that found it, so the
   * method is on the page beside its results.
   *
   * `held` names a VOW whose witnesses already guard the given underneath it.
   * A check carrying `given: <key>` renders under that given, the way a check
   * carrying `vow:` renders under its vow. `unheld` is the plain admission that
   * nothing goes and looks — same discipline as a vow's `unwitnessed` before
   * Day 102 emptied that field: a list that read as complete while covering
   * half of itself would be the failure this whole page exists to refuse. */
  var GIVENS = [
    {
      key: 'no-sun',
      says: 'There is no sun here. The light has an hour and no source: it comes rose at the day’s near edge, gold at the far one, blue after dark, and does all of that everywhere in the frame at once. Nothing in any view will ever clear a mark on the horizon, because nothing rises.',
      found: 'An instrument for catching a direction — a fixed notch on the far hills, and two mornings, and the sun’s own width of movement between them. It needs a sun. This place has an hour instead.',
      held: 'nowhere',
    },
    {
      key: 'does-not-turn',
      says: 'The clearing does not turn while you stand in it. The hour is read once, at the moment you arrive, and the light holds it for as long as you stay. Wait here through the minute this page says the gold begins and no gold will begin; leave and come back and it will be waiting for you. A day that greets, not a day that turns.',
      found: 'A clock that moves, pointed at a place that doesn’t. Arrive at an instant this page calls the plain day, hold still while the clock crosses into dusk, and see what the yard says it is.',
    },
    {
      key: 'nothing-falls',
      says: 'No weather ever falls here. The year leans the colour of this place four ways and the day leans the light of it four more, and in all of that nothing has ever come down out of the sky. There is no rain, and the winter — which is a hush, and keeps every leaf — has never once had snow in it. The only water this clearing has ever held is the dawn fog, which does not fall but lies.',
      found: 'A rain gauge under the eaves. It would stand empty in every state on both wheels, and an empty gauge in a place with four seasons reads as a broken gauge rather than as a fact.',
      unheld: 'Nothing holds this one, and the reason is worth saying rather than hiding: you cannot witness an absence by looking where it isn’t. A check that swept the frame for falling things would pass on the first morning and every morning after, and would go on passing the day somebody drew rain, because it would have been written to find only what it had already imagined.',
    },
    {
      key: 'nobody-here',
      says: 'Nobody is ever in the picture. Not in the yard, not at the door, not in the chair by the fire — no figure has ever been drawn in any view, on purpose, since the first morning. What the place has instead are the shapes a body leaves: a pair of boots on the grass, a cloak on its peg, a chair at the right height for someone reading. The welcome is unattended so that the one it is for could always be you.',
      found: 'Anything that measures a person — a scale on the threshold, a footprint in the path, a second chair. Each would report nothing, and nothing is the answer here rather than the omission it looks like.',
      unheld: 'Nothing holds this one either, and it is the harder of the two: a witness would have to know a drawn person when it saw one, and everything in this clearing is a few coloured boxes. The boots are a body’s shape already. Only an eye can tell the difference between the shape of a person and a person.',
    },
  ];

  /* ── the vows (Day 99) ──────────────────────────────────────────────────
   *
   * The sentences above describe what a named state LOOKS like. These three are
   * a different animal: they are what this place will never do, on any day, in
   * any state — the oldest things kept here and the ones nothing had ever been
   * asked to hold (diary 2026-08-14).
   *
   * A description wants a reading: go to autumn, count the logs. A refusal wants
   * a FLOOR: go to every state on the wheel and check nothing has gone under.
   * That is why the vow checks below carry `floor` + `over` rather than `expect`,
   * and why `over` is always the whole round rather than the states some sentence
   * happens to name — a promise that only holds in the months you looked at is
   * not a promise. The other half of "nothing is lost" is the return leg, which
   * needs no new machinery: `rising` on the pair where the wheel comes back up.
   *
   * `unwitnessed` is not an apology, it is the point: a vow nothing holds says so
   * on the page in its own words, because a guard that quietly covered two of
   * three and let the page read as watched would be exactly the failure the whole
   * almanac exists to refuse. Day 102 emptied that field — all three carry
   * witnesses now — and put `blind` in its place, which is the same honesty one
   * turn further on. A witness is not coverage. It answers the question it was
   * pointed at, and the sentence standing next to that question, carrying the
   * identical fault, gets nothing at all unless somebody says so out loud. */
  var VOWS = [
    {
      key: 'hush',
      says: 'Winter is a hush, not a death. The year may lean the colour of a thing; it may never strip it. Nothing in this clearing goes bare, and nothing goes black.',
    },
    {
      key: 'kept',
      says: 'Nothing here is ever lost. What spends is given back — the wheel turns down and then it turns up again — and no reading anywhere on it is ever nothing.',
    },
    {
      key: 'nowhere',
      says: 'The light never gets an address. There is no place in any frame where you could stand and point and say the sun is there: the hour has a length and a colour, and no direction at all.',
      allowed: LEAN_ALLOWED,
      blind:
        'What these witnesses cannot see. Most of them read the instructions — they ask a background ' +
        'gradient which way it runs, and a lit body whether its two sides were lit alike — so a lean drawn ' +
        'some other way walks straight past them: a mask or a filter or an off-centre stack the ' +
        'reader parses as even. Two others read the rendered picture instead, sharing no code with those ' +
        'or with each other. One weighs the wash off the frame, left half against right, and so catches a ' +
        'wash that leans however it was painted — but to weigh the light it has to lift the wash off the ' +
        'furniture, the frame having never been even to begin with, so it sees only the wash. The other, ' +
        'added on the hundred and eighteenth morning, weighs the bodies instead: it takes the light off ' +
        'and asks each standing thing which of its own sides it is brightest on, then averages those ' +
        'across the frame by area. That closes the gap the first one wrote here — a body painted brighter ' +
        'down one edge, which cancels clean out of a weighing of the light. What it cannot do is judge a ' +
        'single thing: no body here is symmetric, and one of them reads a quarter of the way to a lean ' +
        'with nothing at all wrong with it, so what is held is only the AGREEMENT among them. A lean ' +
        'painted into exactly one small body, and nowhere else, would move that reading by very little ' +
        'and could sit under the ceiling. So could a lean gentler than the fifth of a shade the ceiling ' +
        'was measured against. And every one of these is asked of the two outdoor faces at the four ' +
        'seasons, at one width, of the bodies named on the list — a body drawn some later day and never ' +
        'added to it is weighed by nothing. (A body that IS on the list and can no longer be found turns ' +
        'the reading to nothing at all rather than quietly averaging over the rest, because a list gone ' +
        'stale reading green is the exact shape of fault this one was built for.) Green here means ' +
        'nothing draws, renders, or is painted with a sideways lean anywhere I can see one. It does not ' +
        'mean nothing points sideways.',
    },
  ];

  /* A check is one sentence of the prose above, held to one probe.
   *
   * `axis` is the clock it varies — 'season' or 'tod' — and `at` pins the other
   * one, because most of these gates are read off both. Then one of:
   *   expect — the exact reading in each state, for the scale-free probes
   *   rising / falling — the states in the order the readings must run,
   *     strictly, for the probes whose absolute size depends on the breakpoint
   *   floor + over — the reading must never fall below `floor` in any state in
   *     `over`. A floor of 1 on a laid-out size is a PRESENCE floor, not a size
   *     claim, so it stays honest at both breakpoints the way the note above
   *     requires; counts and opacities are scale-free anyway.
   *   ceiling + over — the mirror of it (Day 102): the reading must never rise
   *     above `ceiling` in any state in `over`. A floor holds a vow of presence
   *     — never nothing. A ceiling holds a vow of absence — never a lean.
   *   hold — the odd one out (Day 111), and the only kind that names no state
   *     and no axis. It holds a GIVEN rather than a claim about a season or an
   *     hour: arrive at one instant, stand still while the clock crosses into
   *     the next, and the reading must not have moved. It carries its own two
   *     instants because it is visited on a clock the runner can step rather
   *     than in a state the runner forces.
   *
   * `on` (Day 113) replaces `axis` + `at` rather than joining them. It names its
   * own states — `{ midwinter: '2026-12-21T12:00', … }` — and each is a date
   * rather than a tag, read by opening the view on a clock frozen to that
   * instant and letting the place reckon its own season and hour from it. Every
   * verdict kind above then works on those names unchanged, because `expect`,
   * `rising` and `floor` only ever cared what the states were called.
   *
   * It exists because forcing cannot reach everything. `data-season` on a scene
   * is what the *colour* of the year is gated on, and the runner sets it by
   * hand; but the pot's wheel is gated on the date itself, so a forced winter
   * leaves it turning at whatever pace today happens to be. A claim about a
   * thing that reads the calendar has to be asked on the calendar.
   * `vow` marks a check as holding one of VOWS rather than a line of the season
   * or hour prose; `given` marks it as holding one of GIVENS. Both render in
   * their own block on the page.
   * `guards` names, in the almanac's own words, which claim would break. */
  var CHECKS = [
    {
      probe: 'woodpile-logs', axis: 'season', at: { tod: 'day' },
      expect: { summer: 7, autumn: 9, winter: 6, spring: 4 },
      guards: 'the pile’s count in all four seasons — seven restacked by summer, nine laid in full by autumn, six being spent through winter, four at the spring thinnest',
    },
    {
      probe: 'smoke-puffs', axis: 'season', at: { tod: 'day' },
      expect: { summer: 3, autumn: 3, winter: 4, spring: 3 },
      guards: '“three puffs off a fire nobody needs the heat of”, and winter’s “fourth puff where three climb all year”',
    },
    {
      probe: 'falling-leaves', axis: 'season', at: { tod: 'day' },
      expect: { summer: 0, autumn: 4, winter: 0, spring: 0 },
      guards: '“leaves coming down off the two crowns — four of them in the air at any moment” in autumn, and no leaf-fall at all in the other three seasons',
    },
    {
      probe: 'falling-leaves', axis: 'tod', at: { season: 'autumn' },
      expect: { dawn: 4, day: 4, dusk: 4, night: 4 },
      guards: '“only the leaves still coming down in it” — the fall runs at every hour, because a leaf lets go whenever it lets go; it is the season’s gesture and not a welcome for any part of the day',
    },
    {
      probe: 'firefly-layer', axis: 'season', at: { tod: 'night' },
      expect: { summer: 1, autumn: 0, winter: 0, spring: 0 },
      guards: '“fireflies up off the grass once the light goes” in summer, and “no fireflies until the warm comes back” in the other three',
    },
    {
      probe: 'star-layer', axis: 'season', at: { tod: 'night' },
      expect: { summer: 0, autumn: 0, winter: 1, spring: 0 },
      guards: '“the stars out in it” on a winter night, and “no stars at all” in every other season',
    },
    {
      probe: 'lantern-glass', axis: 'tod', at: { season: 'summer' },
      expect: { dawn: 1, day: 0, dusk: 1, night: 1 },
      guards: '“the lamp by the door is only a fixture waiting” through the plain middle of the day, against its kindling at dawn, dusk and dark',
    },
    {
      probe: 'hearth-pool', axis: 'season', at: { tod: 'day' },
      rising: ['summer', 'autumn', 'winter'],
      guards: 'how far the fire’s light gets — “no further than the chair on one side and the wood on the other”, then “a stride further”, then “washing right out over the chair and the wood”',
    },
    {
      probe: 'chair-shadow', axis: 'season', at: { tod: 'day' },
      rising: ['summer', 'autumn', 'winter'],
      guards: '“the shadows … a stride longer with it” in autumn and “half again as long” in winter — a shadow can only be as long as the light it interrupts',
    },
    {
      probe: 'fire-flame', axis: 'season', at: { tod: 'day' },
      rising: ['summer', 'winter'],
      guards: '“the fire tallest and widest in its opening” in winter, against summer’s “low fire on its ember bed”',
    },
    {
      probe: 'sprig-stem', axis: 'season', at: { tod: 'day' },
      falling: ['summer', 'winter'],
      guards: '“the sprig drawn in a pixel shorter and its leaves settled tighter” — a hush, never bare',
    },
    {
      probe: 'candle-wax', axis: 'tod', at: { season: 'summer' },
      falling: ['dawn', 'dusk', 'night'],
      guards: '“the candle … standing full again as though a hand replaced it in the dark”, “spent down to four of its six”, then “down to three, a low stub”',
    },

    /* Day 112. The first three claims on this page that are about a COLOUR, and
     * the first read off the rendered picture of a sprite rather than off the
     * lines that drew it. Everything the season does to a growing thing here is
     * done with `filter`, which is a render-time effect: computed style answers
     * the same in January as in June, so every instruction-reading probe above
     * is blind to the whole of it. These take the two washes off first and read
     * what the flowers and the pot are themselves coloured — the Day-104
     * weighing turned around, which lifted the sprites off to weigh the light. */
    {
      probe: 'flower-tone', axis: 'season', at: { tod: 'day' },
      rising: ['winter', 'summer', 'autumn'],
      guards: '“the wildflowers gone over to a spent russet on gilded stems” in autumn, against summer’s sown rose and the winter’s drained “dusty pink on grey-sage stems”',
    },
    {
      probe: 'flower-hush', axis: 'season', at: { tod: 'day' },
      rising: ['winter', 'summer', 'spring'],
      guards: 'the winter patch “drained” furthest from its own colour of any month, and spring “at their brightest and freshest rose of the year”',
    },
    {
      probe: 'door-plant-tone', axis: 'season', at: { tod: 'day' },
      rising: ['winter', 'summer', 'autumn'],
      guards: 'the pot by the door taking the same year as the patch on the front — one season leans both faces of the clearing, or it is two seasons',
    },
    {
      probe: 'door-pot-pace',
      on: {
        midwinter: '2026-12-21T12:00',
        'the spring equinox': '2027-03-20T12:00',
        midsummer: '2027-06-21T12:00',
      },
      rising: ['midwinter', 'the spring equinox', 'midsummer'],
      guards: 'the pot’s bloom wheel stalling in the cold and racing in the warm — slowest at midwinter, its middling pace at the equinox, fastest at midsummer',
    },

    /* Day 115. The pair, and the pair is the point. Two growing wheels turn in
     * this clearing now — the pot by the door and the bed at the front wall —
     * and they borrow their pace from one place (bloom-clock.js) rather than
     * each keeping a copy of the year. Two copies would be the oldest fault
     * here in new clothes: honest apart, and able to be right on one morning
     * and wrong on another. So the same two numbers are asked of both, and if
     * either wheel ever gets a year of its own, one of these two goes red while
     * the other stays green. Stated outright rather than compared, because a
     * pace is scale-free and this page's whole business is publishing figures a
     * stranger can work forward and hold the place to. */
    {
      probe: 'patch-pace',
      on: { midwinter: '2026-12-21T12:00', midsummer: '2027-06-21T12:00' },
      expect: { midwinter: 0.4, midsummer: 1.6 },
      guards: 'the wildflower bed’s wheel at four tenths of its middling pace on the shortest day and one and six tenths on the longest — a bloom’s whole round takes a fortnight and a half at the top of the year and most of a season at the bottom',
    },
    {
      probe: 'door-pot-pace',
      on: { midwinter: '2026-12-21T12:00', midsummer: '2027-06-21T12:00' },
      expect: { midwinter: 0.4, midsummer: 1.6 },
      guards: 'the pot by the door turning at those very same two numbers — one clock behind both wheels, borrowed by each and owned by neither, so a growing thing on the front and a growing thing at the door can never disagree about how fast the year is going',
    },

    /* ── the vows' witnesses (Day 99) ────────────────────────────────────
     * Every one of these walks the whole wheel, not the states some sentence
     * points at. None of them says what a thing is; each says what it never
     * becomes. They are meant to stay green through any amount of honest
     * redrawing above — change the pile's counts and you mend `expect`; the
     * floor only ever goes red if the pile actually empties. */
    {
      probe: 'tree-crowns', axis: 'season', at: { tod: 'day' }, vow: 'hush',
      floor: 2, over: ['summer', 'autumn', 'winter', 'spring'],
      guards: 'both crowns still standing in every month of the year — “never a bare branch”',
    },
    {
      probe: 'tree-crown-fade', axis: 'season', at: { tod: 'day' }, vow: 'hush',
      floor: 1, over: ['summer', 'autumn', 'winter', 'spring'],
      guards: 'the crown drawn solid in every season — the year tints the leaf and never thins it away',
    },
    {
      probe: 'sprig-stem', axis: 'season', at: { tod: 'day' }, vow: 'hush',
      floor: 1, over: ['summer', 'autumn', 'winter', 'spring'],
      guards: 'the sprig still drawn in the jar in every season — it draws in for the cold and is never gone',
    },
    {
      probe: 'flowers-standing', axis: 'season', at: { tod: 'day' }, vow: 'hush',
      floor: 1, over: ['summer', 'autumn', 'winter', 'spring'],
      guards: 'the wildflowers at the wall’s foot still standing in every month — the winter drains their colour and takes no stem',
    },
    {
      probe: 'door-plant-standing', axis: 'season', at: { tod: 'day' }, vow: 'hush',
      floor: 1, over: ['summer', 'autumn', 'winter', 'spring'],
      guards: 'the pot by the door never emptied by a season — the same promise kept on the other face',
    },
    {
      probe: 'woodpile-logs', axis: 'season', at: { tod: 'day' }, vow: 'kept',
      floor: 1, over: ['summer', 'autumn', 'winter', 'spring'],
      guards: 'the store never running out — the pile is spent through the winter and is never empty',
    },
    {
      probe: 'woodpile-logs', axis: 'season', at: { tod: 'day' }, vow: 'kept',
      rising: ['spring', 'summer', 'autumn'],
      guards: 'the pile climbing back from its spring thinnest — the far half of the year’s wheel, the spending given back',
    },
    {
      probe: 'candle-wax', axis: 'tod', at: { season: 'summer' }, vow: 'kept',
      floor: 1, over: ['dawn', 'day', 'dusk', 'night'],
      guards: 'the candle never guttering out — a low stub at midnight, never a cold saucer',
    },
    {
      probe: 'candle-wax', axis: 'tod', at: { season: 'summer' }, vow: 'kept',
      rising: ['night', 'dawn'],
      guards: 'the candle standing full again at dawn after the evening spends it — the far half of the day’s wheel',
    },
    {
      probe: 'fire-flame', axis: 'tod', at: { season: 'summer' }, vow: 'kept',
      floor: 1, over: ['dawn', 'day', 'dusk', 'night'],
      guards: 'the hearth lit at every hour — you come in cold at any of them and stop being cold',
    },
    {
      probe: 'fire-flame', axis: 'season', at: { tod: 'day' }, vow: 'kept',
      floor: 1, over: ['summer', 'autumn', 'winter', 'spring'],
      guards: 'the hearth lit in every season as well — it deepens in the cold, and it is never out',
    },
    {
      probe: 'smoke-puffs', axis: 'tod', at: { season: 'summer' }, vow: 'kept',
      floor: 1, over: ['dawn', 'day', 'dusk', 'night'],
      guards: 'the chimney breathing at every hour — “someone’s always home, the fire never quite goes out”',
    },
    {
      probe: 'door-pot-blooms', vow: 'kept',
      on: {
        'the autumn equinox': '2026-09-22T12:00',
        midwinter: '2026-12-21T12:00',
        'the spring equinox': '2027-03-20T12:00',
        midsummer: '2027-06-21T12:00',
      },
      floor: 1,
      over: ['the autumn equinox', 'midwinter', 'the spring equinox', 'midsummer'],
      guards: 'the pot never standing empty at any corner of the year, however slowly the cold has its wheel turning — the four stems keep a fixed spacing on the wheel, so a slower pace moves all of them together and can never close the gaps between them',
    },
    {
      probe: 'flowers-standing', vow: 'kept',
      on: {
        'the autumn equinox': '2026-09-22T12:00',
        midwinter: '2026-12-21T12:00',
        'the spring equinox': '2027-03-20T12:00',
        midsummer: '2027-06-21T12:00',
      },
      floor: 3,
      over: ['the autumn equinox', 'midwinter', 'the spring equinox', 'midsummer'],
      guards: 'the bed at the wall’s foot never thinned below the three stems sown into it by hand, at any corner of the year — its four other plants each live, go over, and come up again in fresh ground beside where they stood, so the bed is never twice the same arrangement. Unlike the pot it claims nothing about those four: they keep no shared spacing and could in principle all be bare at once, because what a bed promises is not a count of blooms but that the ground goes on being flowered',
    },

    /* ── the third vow's witnesses (Day 102) ─────────────────────────────
     * A ceiling of nought, asked of the whole round. The hour's wash may be
     * weighted low and the year's may be weighted high — up and down are not
     * addresses, a low sun is low from everywhere in the frame at once — but
     * neither may run to a side, and no far body may be lit on one. */
    {
      probe: 'hour-wash-lean', axis: 'tod', at: { season: 'summer' }, vow: 'nowhere',
      ceiling: 0, over: ['dawn', 'day', 'dusk', 'night'],
      guards: 'the hour’s wash weighted low or high and never to a side — “no lit side to it, the same tint edge to edge”',
    },
    {
      probe: 'year-wash-lean', axis: 'season', at: { tod: 'day' }, vow: 'nowhere',
      ceiling: 0, over: ['summer', 'autumn', 'winter', 'spring'],
      guards: 'the year’s wash under it the same, in all four seasons — the slow hand gets a colour, never a compass',
    },
    {
      probe: 'door-wash-lean', axis: 'tod', at: { season: 'summer' }, vow: 'nowhere',
      ceiling: 0, over: ['dawn', 'day', 'dusk', 'night'],
      guards: 'the other face of the house telling the same — the vow is “no place in any frame”, so one frame is not enough to ask',
    },
    {
      probe: 'hill-rim-lean', axis: 'tod', at: { season: 'summer' }, vow: 'nowhere',
      ceiling: 0, over: ['dawn', 'day', 'dusk', 'night'],
      guards: 'the far crests warmed along the top and never down one flank — a rim you cannot point a direction along',
    },
    {
      probe: 'cloud-belly-tilt', axis: 'tod', at: { season: 'summer' }, vow: 'nowhere',
      ceiling: 0, over: ['dawn', 'day', 'dusk', 'night'],
      guards: 'a cloud’s two underlit lumps the same colour as each other at dawn and at dusk — one low sun under it, not off to one side of it',
    },

    /* ── the same vow, asked of everything (Day 103) ─────────────────────
     * Six of these because the vow's words are "no place in any frame": three
     * views, and each of them swept round both wheels, since a lean could be
     * gated on either clock. They cost almost nothing to add — the states are
     * ones other checks already open — and they are the only witnesses here
     * that can catch a lean I never thought to go and look for. */
    {
      probe: 'home-lean-sweep', axis: 'tod', at: { season: 'summer' }, vow: 'nowhere',
      ceiling: 0, over: ['dawn', 'day', 'dusk', 'night'],
      guards: 'nothing anywhere in the front yard leaning sideways at any hour, but the named few that lean on purpose',
    },
    {
      probe: 'home-lean-sweep', axis: 'season', at: { tod: 'day' }, vow: 'nowhere',
      ceiling: 0, over: ['summer', 'autumn', 'winter', 'spring'],
      guards: 'the same of the front yard in all four seasons — a lean could be gated on either clock',
    },
    {
      probe: 'door-lean-sweep', axis: 'tod', at: { season: 'summer' }, vow: 'nowhere',
      ceiling: 0, over: ['dawn', 'day', 'dusk', 'night'],
      guards: 'nothing anywhere on the door side leaning sideways at any hour',
    },
    {
      probe: 'door-lean-sweep', axis: 'season', at: { tod: 'day' }, vow: 'nowhere',
      ceiling: 0, over: ['summer', 'autumn', 'winter', 'spring'],
      guards: 'the same of the door side in all four seasons',
    },
    {
      probe: 'room-lean-sweep', axis: 'tod', at: { season: 'summer' }, vow: 'nowhere',
      ceiling: 0, over: ['dawn', 'day', 'dusk', 'night'],
      guards: 'nothing in the room leaning sideways at any hour beyond the two shadows the drawn fire is allowed to throw',
    },
    {
      probe: 'room-lean-sweep', axis: 'season', at: { tod: 'day' }, vow: 'nowhere',
      ceiling: 0, over: ['summer', 'autumn', 'winter', 'spring'],
      guards: 'the same of the room in all four seasons',
    },

    /* ── the vow, weighed off the picture (Day 104) ──────────────────────
     * The same ceiling of nought, but reached by the second method: not the
     * gradient read but the frame weighed. These share no code with the leans
     * above, which is the whole of their worth — the morning the two disagree
     * is the morning one of them was wrong. A wash that leans however it was
     * drawn pulls the weight off centre; an even one sits dead centre at ~0. */
    {
      probe: 'frame-light-balance', axis: 'tod', at: { season: 'summer' }, vow: 'nowhere',
      ceiling: 0, over: ['dawn', 'day', 'dusk', 'night'],
      guards: 'the front yard’s light weighed off the picture itself and even left to right at every hour — a witness that reads what the frame shows, not how the wash was written',
    },
    {
      probe: 'frame-light-balance', axis: 'season', at: { tod: 'day' }, vow: 'nowhere',
      ceiling: 0, over: ['summer', 'autumn', 'winter', 'spring'],
      guards: 'the same, weighed off the picture, through all four seasons of the year’s wash',
    },
    {
      probe: 'door-frame-light-balance', axis: 'tod', at: { season: 'summer' }, vow: 'nowhere',
      ceiling: 0, over: ['dawn', 'day', 'dusk', 'night'],
      guards: 'the door side weighed off its own picture and even at every hour — the vow is “no place in any frame”, so the second method owes both faces too',
    },
    {
      probe: 'door-frame-light-balance', axis: 'season', at: { tod: 'day' }, vow: 'nowhere',
      ceiling: 0, over: ['summer', 'autumn', 'winter', 'spring'],
      guards: 'the door side weighed off the picture in all four seasons',
    },

    /* ── the vow, weighed off the bodies (Day 118) ───────────────────────
     * The two above weigh the light and are blind to a body painted brighter
     * down one of its own edges; these weigh the bodies and are blind to
     * nothing else. The hour cannot reach this reading — the washes are lifted
     * before anything is measured — so the round asked of it is the year's, the
     * one wheel that does reach a body's own colour, through the filters that
     * gild a crown in October and quiet it in January. */
    {
      probe: 'home-paint-lean', axis: 'season', at: { tod: 'day' }, vow: 'nowhere',
      ceiling: 60, over: ['summer', 'autumn', 'winter', 'spring'],
      guards: 'the standing things in the front yard never agreeing about which of their own sides is the bright one — the cabin, both trees, the bench, the rick, the box and the flowers, each read off its own pixels with the light taken off',
    },
    {
      probe: 'door-paint-lean', axis: 'season', at: { tod: 'day' }, vow: 'nowhere',
      ceiling: 60, over: ['summer', 'autumn', 'winter', 'spring'],
      guards: 'the same asked of the door side’s own bodies — the long wall, the boots, the pot and the path stones — because the vow is “no place in any frame”',
    },

    /* Day 111. The two instants straddle a real edge — on the shortest day of
     * the year this page puts dusk at 15:30, so a quarter past three is the
     * plain day and twenty-five to four is not. The check asks two things at
     * once, and needs both: that standing through the edge changes nothing,
     * AND that arriving fresh on the far side of it *does*. Without the second
     * half the first could pass on a pair of instants that never crossed
     * anything, which is a check that cannot fail — decoration. */
    {
      probe: 'home-hour-tag', given: 'does-not-turn',
      hold: { arrive: '2026-12-21T15:25', stay: '2026-12-21T15:35' },
      guards: 'that the yard reads its hour once, at the moment you arrive, and then holds it — a midwinter afternoon crossing out of the plain day into dusk while somebody is standing in the front yard, and the front yard not noticing',
    },
  ];

  /* Named for the verdict line, which sets them out as a list after a colon —
   * "summer, and after dark" — because every phrasing that tried to make the
   * two clocks share a sentence strained on one band or another. */
  var BAND_NAME = {
    dawn: 'dawn',
    day: 'the plain middle of the day',
    dusk: 'dusk',
    night: 'after dark',
  };

  function pad(n) {
    return (n < 10 ? '0' : '') + n;
  }

  /* Decimal hours → a clock face. Every edge this place computes falls between
   * 03:30 and 22:30, so no wrapping is needed. */
  function clock(h) {
    var total = Math.round(h * 60);
    return pad(Math.floor(total / 60)) + ':' + pad(total % 60);
  }

  function el(id) {
    return document.getElementById(id);
  }

  function fill(list, items) {
    list.textContent = '';
    for (var i = 0; i < items.length; i++) {
      var li = document.createElement('li');
      li.textContent = items[i];
      list.appendChild(li);
    }
  }

  /* The date the two inputs currently name, as a local Date — the same kind of
   * instant the clearing's own scripts read when a visitor arrives. */
  function chosen(dateInput, timeInput) {
    var d = (dateInput.value || '').split('-');
    var t = (timeInput.value || '').split(':');
    if (d.length !== 3 || t.length < 2) return null;
    var out = new Date(
      Number(d[0]), Number(d[1]) - 1, Number(d[2]),
      Number(t[0]), Number(t[1]), 0, 0
    );
    return isNaN(out.getTime()) ? null : out;
  }

  function render(date) {
    var sky = window.CabinSky;
    var year = window.CabinSeason;
    if (!sky || !year || !date) return;

    var season = year.seasonForDate(date);
    var phase = sky.phaseFor(date);
    var edges = sky.edgesFor(date);
    var swing = sky.yearSwing(date);

    el('almanac-verdict').textContent =
      'On that day, at that hour, the clearing reckons: ' +
      season + ', and ' + BAND_NAME[phase] + '.';

    el('almanac-season-lead').textContent = SEASON[season].lead;
    fill(el('almanac-season-list'), SEASON[season].does);

    fill(el('almanac-edges'), [
      'before ' + clock(edges.dawn) + ' — the dark',
      clock(edges.dawn) + ' — dawn begins',
      clock(edges.day) + ' — the plain day begins',
      clock(edges.dusk) + ' — dusk begins',
      clock(edges.night) + ' — dark again',
    ]);

    el('almanac-swing').textContent =
      'The year has swung ' + swing.toFixed(3) +
      ' of the way from midwinter (−1) to midsummer (+1), which slides every ' +
      'edge above by ' + (sky.EDGE_SWING_H * swing).toFixed(2) + ' hours off ' +
      'its five / eight / seventeen / twenty-one.';

    fill(el('almanac-hour-list'), HOUR[phase](season));
  }

  var VIEW_NAME = {
    home: 'the front yard',
    around: 'the door side',
    inside: 'the room',
  };

  /* The reading a check demands, in the compact mono form the page sets under
   * each claim: "summer 7 · autumn 9", or "spring < summer < autumn", or
   * "summer, autumn, winter, spring — never below 1". */
  function readingOf(check) {
    var states, parts = [], j;

    if (check.expect) {
      states = Object.keys(check.expect);
      for (j = 0; j < states.length; j++) {
        parts.push(states[j] + ' ' + check.expect[states[j]]);
      }
      return parts.join(' · ');
    }
    if (check.floor !== undefined) {
      return check.over.join(', ') + ' — never below ' + check.floor;
    }
    if (check.ceiling !== undefined) {
      return check.over.join(', ') + ' — never above ' + check.ceiling;
    }
    if (check.hold) {
      return 'arrive ' + check.hold.arrive.replace('T', ' ') +
             ', still there at ' + check.hold.stay.slice(-5) +
             '; arriving at ' + check.hold.stay.slice(-5) + ' instead — different';
    }
    states = check.rising || check.falling;
    return states.join(check.rising ? ' < ' : ' > ');
  }

  function checkItem(check) {
    var probe = PROBES[check.probe];
    var li = document.createElement('li');

    var claim = document.createElement('span');
    claim.className = 'almanac-check__claim';
    claim.textContent = check.guards;
    li.appendChild(claim);

    var how = document.createElement('span');
    how.className = 'almanac-check__how';
    how.textContent =
      probe.reads + ', in ' + VIEW_NAME[probe.view] + ' — ' + readingOf(check);
    li.appendChild(how);

    // Day 113. An `on` check's states are dates rather than tags, and a name
    // like "midwinter" is only a promise about a date until the date is on the
    // page beside it. Same reason the allowed leans carry their reasons: a
    // state nobody can look up is one more thing to take on trust.
    if (check.on) {
      var when = document.createElement('span');
      when.className = 'almanac-check__how';
      var names = Object.keys(check.on), parts = [];
      for (var k = 0; k < names.length; k++) {
        parts.push(names[k] + ' ' + check.on[names[k]].replace('T', ' '));
      }
      when.textContent = 'read on a clock frozen to ' + parts.join(', ');
      li.appendChild(when);
    }

    return li;
  }

  /* The witnesses, set out in words. Rendered once — they don't depend on the
   * day or hour you set, which is rather the point of them. The vow checks are
   * held back for their own block below. */
  function renderChecks() {
    var list = el('almanac-checks');
    if (!list) return;
    list.textContent = '';

    for (var i = 0; i < CHECKS.length; i++) {
      if (!CHECKS[i].vow && !CHECKS[i].given) list.appendChild(checkItem(CHECKS[i]));
    }
  }

  /* The givens (Day 111): what is so here, said for a reader who has no way to
   * infer it. Each is the sentence, then the instrument that found it, then
   * whatever holds it — a witness of its own, a pointer at the vow already
   * standing over it, or the plain admission that nothing does. */
  function renderGivens() {
    var list = el('almanac-givens');
    if (!list) return;
    list.textContent = '';

    for (var i = 0; i < GIVENS.length; i++) {
      var given = GIVENS[i];
      var li = document.createElement('li');

      var says = document.createElement('p');
      says.className = 'almanac-vow__says';
      says.textContent = given.says;
      li.appendChild(says);

      var found = document.createElement('p');
      found.className = 'almanac-given__found';
      var label = document.createElement('span');
      label.className = 'almanac-given__label';
      label.textContent = 'found by';
      found.appendChild(label);
      found.appendChild(document.createTextNode(' ' + given.found));
      li.appendChild(found);

      var held = document.createElement('ul');
      held.className = 'almanac-checks';
      for (var j = 0; j < CHECKS.length; j++) {
        if (CHECKS[j].given === given.key) held.appendChild(checkItem(CHECKS[j]));
      }
      if (held.children.length) li.appendChild(held);

      /* A given may sit underneath a vow — "the light never gets an address" is
       * the promise; "there is no sun" is the condition that makes the promise
       * sayable — in which case what already guards the vow guards this too,
       * and the page says which rather than claiming a witness of its own. */
      if (given.held) {
        var under = document.createElement('p');
        under.className = 'almanac-vow__unwitnessed';
        under.textContent =
          'Held by the vow below — “' + vowSays(given.held) + '” — and by ' +
          'everything that holds it. The vow is the promise; this is the ' +
          'condition underneath the promise, and they stand or fall together.';
        li.appendChild(under);
      }

      if (given.unheld) {
        var none = document.createElement('p');
        none.className = 'almanac-vow__unwitnessed';
        none.textContent = given.unheld;
        li.appendChild(none);
      }

      list.appendChild(li);
    }
  }

  function vowSays(key) {
    for (var i = 0; i < VOWS.length; i++) {
      if (VOWS[i].key === key) return VOWS[i].says.split('.')[0] + '.';
    }
    return key;
  }

  /* The vows, each followed by whatever holds it — or, for the one that nothing
   * holds, by the plain reason nothing does. */
  function renderVows() {
    var list = el('almanac-vows');
    if (!list) return;
    list.textContent = '';

    for (var i = 0; i < VOWS.length; i++) {
      var vow = VOWS[i];
      var li = document.createElement('li');

      var says = document.createElement('p');
      says.className = 'almanac-vow__says';
      says.textContent = vow.says;
      li.appendChild(says);

      var held = document.createElement('ul');
      held.className = 'almanac-checks';
      for (var j = 0; j < CHECKS.length; j++) {
        if (CHECKS[j].vow === vow.key) held.appendChild(checkItem(CHECKS[j]));
      }

      if (held.children.length) {
        li.appendChild(held);
      } else {
        var none = document.createElement('p');
        none.className = 'almanac-vow__unwitnessed';
        none.textContent = vow.unwitnessed || 'Nothing holds this one.';
        li.appendChild(none);
      }

      /* The exceptions the sweep subtracts (Day 103), each with the reason it
       * is not a light. A guard that says "everything, minus some things" is
       * only as honest as its list of some things, so the list is the claim. */
      if (vow.allowed && vow.allowed.length) {
        var intro = document.createElement('p');
        intro.className = 'almanac-vow__unwitnessed';
        intro.textContent =
          'Three of those are sweeps — they walk every element of a frame ' +
          'rather than a place I named — and they subtract these, the things ' +
          'in this clearing that run to a side on purpose, each one a claim ' +
          'you can argue with:';
        li.appendChild(intro);

        var allowed = document.createElement('ul');
        allowed.className = 'almanac-checks almanac-allowed';
        for (var k = 0; k < vow.allowed.length; k++) {
          var item = vow.allowed[k];
          var row = document.createElement('li');

          var what = document.createElement('span');
          what.className = 'almanac-check__claim';
          what.textContent = item.what + ' — ' + item.why;
          row.appendChild(what);

          var sel = document.createElement('span');
          sel.className = 'almanac-check__how';
          sel.textContent = item.selector;
          row.appendChild(sel);

          allowed.appendChild(row);
        }
        li.appendChild(allowed);
      }

      /* A witness's own blind spot, said out loud beneath it (Day 102). This
       * renders whether or not anything holds the vow, because a list of what
       * a check covers is worth much less than a list of what it doesn't. */
      if (vow.blind) {
        var blind = document.createElement('p');
        blind.className = 'almanac-vow__unwitnessed';
        blind.textContent = vow.blind;
        li.appendChild(blind);
      }

      list.appendChild(li);
    }
  }

  function init() {
    var dateInput = el('almanac-date');
    var timeInput = el('almanac-time');
    if (!dateInput || !timeInput) return;

    function setNow() {
      var now = new Date();
      dateInput.value =
        now.getFullYear() + '-' + pad(now.getMonth() + 1) + '-' + pad(now.getDate());
      timeInput.value = pad(now.getHours()) + ':' + pad(now.getMinutes());
    }

    function update() {
      var d = chosen(dateInput, timeInput);
      if (d) render(d);
    }

    setNow();
    update();
    renderChecks();
    renderGivens();
    renderVows();

    dateInput.addEventListener('change', update);
    timeInput.addEventListener('change', update);
    dateInput.addEventListener('input', update);
    timeInput.addEventListener('input', update);
    el('almanac-now').addEventListener('click', function () {
      setNow();
      update();
    });
  }

  /* The witnesses, published (Day 98) — the same move sky.js and season.js made
   * a day earlier, one level out. `tools/check-almanac.js` loads this page and
   * reads these two tables rather than keeping its own list of what to measure,
   * so the check can only ever test the claims this page actually makes. Add a
   * check here and the runner picks it up with no second edit; delete one and
   * the runner stops asking. Read-only; nothing outside sets these. */
  window.CabinAlmanac = {
    PROBES: PROBES,
    CHECKS: CHECKS,
    VOWS: VOWS,
    GIVENS: GIVENS,
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
