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

    dateInput.addEventListener('change', update);
    timeInput.addEventListener('change', update);
    dateInput.addEventListener('input', update);
    timeInput.addEventListener('input', update);
    el('almanac-now').addEventListener('click', function () {
      setNow();
      update();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
