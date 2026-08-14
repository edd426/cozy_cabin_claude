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
 * Note what the page is not: it does not render the clearing at the hour you
 * set. The scene still only ever shows the hour you actually arrived at — a
 * day that greets, not a day that turns. This is a statement you can hold the
 * place to, not a way of standing in a moment you aren't in.
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
        'indoors, a shade more heat in the fire’s colour, its light a stride further across the boards, and the shadows the chair and the woodpile throw a stride longer with it',
        'the sprig in the mantle jar gone the same amber as the crowns outside; plain dark after sundown, no sparks and no stars',
      ],
    },
    winter: {
      lead: 'Winter is a hush, not a death. Nothing here goes bare and nothing goes black; the whole clearing draws in, and the one thing that gets bigger is the sign that somebody in it is warm.',
      does: [
        'a pale blue-grey quiet over the frame, and the crowns cooled to a muted sage — never a bare branch',
        'the woodpile being spent: six logs, the middle row’s right-hand end gone first, picked from the side the door is on',
        'the chimney at its deepest — a fourth puff where three climb all year, each brighter and spreading wider by the top',
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
   *
   * Sizes are in laid-out px, so they scale with the breakpoint (--s is 3 on
   * desktop, 2 on a phone). That is exactly why no check below states an
   * expected WIDTH: sizes are only ever compared against each other, which is
   * all the prose ever claims about them anyway ("a stride further", "half
   * again as long"). Counts and opacities are scale-free and stated outright. */
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
    'candle-wax': {
      view: 'inside', kind: 'height',
      selector: '.mantle-item--candle',
      reads: 'how much wax is left on the candle',
    },
  };

  /* A check is one sentence of the prose above, held to one probe.
   *
   * `axis` is the clock it varies — 'season' or 'tod' — and `at` pins the other
   * one, because most of these gates are read off both. Then either:
   *   expect — the exact reading in each state, for the scale-free probes
   *   rising / falling — the states in the order the readings must run,
   *     strictly, for the probes whose absolute size depends on the breakpoint
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

  /* The witnesses, set out in words. Rendered once — they don't depend on the
   * day or hour you set, which is rather the point of them. */
  function renderChecks() {
    var list = el('almanac-checks');
    if (!list) return;
    list.textContent = '';

    for (var i = 0; i < CHECKS.length; i++) {
      var check = CHECKS[i];
      var probe = PROBES[check.probe];
      var states, j, parts = [];

      if (check.expect) {
        states = Object.keys(check.expect);
        for (j = 0; j < states.length; j++) {
          parts.push(states[j] + ' ' + check.expect[states[j]]);
        }
      } else {
        states = check.rising || check.falling;
        parts.push(states.join(check.rising ? ' < ' : ' > '));
      }

      var li = document.createElement('li');

      var claim = document.createElement('span');
      claim.className = 'almanac-check__claim';
      claim.textContent = check.guards;
      li.appendChild(claim);

      var how = document.createElement('span');
      how.className = 'almanac-check__how';
      how.textContent =
        probe.reads + ', in ' + VIEW_NAME[probe.view] + ' — ' + parts.join(' · ');
      li.appendChild(how);

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
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
