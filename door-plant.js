/* door-plant.js — the growing potted plant by the door (around/door-side view).
 *
 * The pot, its foliage mound, and the two rose flecks it was potted with are
 * always-present CSS (drawn Day 66, 2026-07-13; around/around.css .door-plant*).
 * This script lets the plant's blooms *live and turn* on time's own clock. It
 * reads a planting record (assets/composed/door-plant.json) and, from today's
 * date alone, decides what state each bloom is in. Day 66-67 (2026-07-13/14)
 * gave a bloom a one-way life — bud, then rose, then rose forever, the pot only
 * ever filling. Day 68 (2026-07-15) gave each bloom the WHOLE wheel: within a
 * cycle of `cycleDays`, a bloom is a green BUD for its first `youngWindowDays`,
 * OPENS to rose for `openWindowDays`, goes SPENT (a browned russet) for
 * `spentWindowDays`, then DROPS and its slot sits bare for the rest of the
 * cycle — after which the same clock brings a fresh bud up in its place and the
 * round begins again. So the pot no longer only climbs; it breathes.
 *
 * No per-visitor state, no server, no memory of yesterday — the plant keeps a
 * written record of when each bloom's wheel started and lets the date read the
 * phase back. Stems are spaced around the cycle (see the record) so their turns
 * are staggered: no two go over together, so the pot as a whole always shows
 * budding and open blooms and never reads as neglected while one flower is bare.
 * It gets there on time's own clock: the slowest hand in the scene. (Diary
 * 2026-07-14: "let a thing be able to fade a little too, and trust that the same
 * clock that fills the pot would know how to turn it.")
 *
 * Day 113 (2026-08-29) gave the wheel its TEMPO. Until this morning it turned
 * at one pace in January and in June, which is a thing no growing wheel does —
 * a real one races in the warm and all but stops in the cold. So the wheel no
 * longer counts days. It counts BLOOM-DAYS: each calendar day is worth
 * `1 + TEMPO_SWING * yearSwing(that day)` of them, so a midsummer day is worth
 * 1.6 and a midwinter day 0.4, and the whole 28-day round takes about a
 * fortnight and a half at midsummer and most of a season at midwinter.
 *
 * Two things about that are load-bearing and neither is an accident:
 *
 *   1. The stagger survives. `sproutOffsetDays` is now an offset in BLOOM-days,
 *      not in calendar days, so the four stems sit at a fixed 7 apart on the
 *      28-wide wheel whatever the season is doing to the pace. The bare window
 *      is 6 wide (28 − 4 − 14 − 4) and the spacing is 7, so at most one stem can
 *      be in it at once: three blooms are standing at every phase, in every
 *      month. The fear that a wheel which stalls in winter would leave the whole
 *      pot bare at once (diary 2026-08-28) is a fear of gating the blooms on the
 *      season directly. Varying the RATE cannot do it — a rate moves every stem
 *      by the same amount and so can never close the gaps between them.
 *   2. Nothing is spent. `yearSwing` is a cosine and averages to nothing over a
 *      year, so a year still holds ~365 bloom-days and ~13 turns of the wheel,
 *      exactly as many as before. The year's total is untouched; only its
 *      distribution moved. (The vow: nothing here is ever lost.)
 *
 * Day 115 (2026-08-31): that arithmetic no longer lives here. The front
 * wildflower bed took the same turn this morning, and the moment there are two
 * wheels a copy apiece could be right on one morning and wrong on another —
 * two growing things under one year, disagreeing about how fast it is going. So
 * the pace moved out to `bloom-clock.js` and is borrowed from
 * `window.CabinBloom` by both wheels, which own none of it. It in turn rides
 * `yearSwing` from `sky.js` (`window.CabinSky`, Day 97) — the one reckoning
 * this place keeps. If either script is absent the rate falls back to a flat 1
 * and the wheel counts plain days, which is exactly what it did before Day 113.
 *
 * The pot publishes both numbers on the foliage element — `data-bloom-days`
 * (how far the wheel has turned since planting) and `data-bloom-rate` (today's
 * pace, as a multiple of the middling one). They are the numbers the render
 * itself used, set out so the almanac's witnesses can read them rather than
 * work out a second copy of them.
 *
 * Graceful: if the fetch fails or JS is off, the pot keeps its two potted-with
 * flecks (the pot's steady heart). Blooms are styled entirely by around.css
 * (.door-plant__bloom--N, plus --young / --spent, inheriting the plant's --s at
 * both breakpoints) — this script only decides which exist today and in which
 * state.
 */
(function () {
  // Resolve the record against THIS script's own URL, not the page's — the
  // around view lives at /around/, so a page-relative path would look for
  // /around/assets/... and 404. Capture currentScript synchronously (it is
  // null once we're inside the async fetch .then()). door-plant.js sits at the
  // site root beside garden.js, so this lands on /assets/composed/... from any
  // page that loads it.
  const self = document.currentScript;
  const RECORD_URL = self
    ? new URL('assets/composed/door-plant.json', self.src).href
    : 'assets/composed/door-plant.json';
  const DAY_MS = 86400000;

  function utcMidnight(d) {
    return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
  }
  function parseDateUTC(s) {
    const [y, m, day] = s.split('-').map(Number);
    return Date.UTC(y, m - 1, day);
  }

  /* What one calendar day is worth to the wheel. Borrowed from
   * `window.CabinBloom` (bloom-clock.js), never kept here — a wheel with its own
   * copy of the year could be right on a morning the yard was wrong, which is
   * the thing publishing the working is meant to make impossible (diary
   * 2026-08-13), and since Day 115 there are two wheels to keep in step. */
  function tempoAt(ms) {
    const clock = window.CabinBloom;
    return clock && typeof clock.tempoAt === 'function' ? clock.tempoAt(ms) : 1;
  }
  function bloomDaysBetween(fromMs, toMs) {
    const clock = window.CabinBloom;
    if (clock && typeof clock.bloomDaysBetween === 'function') {
      return clock.bloomDaysBetween(fromMs, toMs);
    }
    return Math.floor((toMs - fromMs) / DAY_MS); // flat fallback: plain days
  }

  function render(foliage, record) {
    if (foliage.dataset.grown === '1') return; // guard against a double call
    foliage.dataset.grown = '1';

    const plantedMs = parseDateUTC(record.planted);
    const todayMs = utcMidnight(new Date());
    // Bloom-days since the pot was potted, not days (Day 113). Both numbers the
    // wheel runs on go onto the element, so the almanac's witnesses read what
    // the render used rather than working out a second copy of it.
    const elapsed = bloomDaysBetween(plantedMs, todayMs);
    foliage.dataset.bloomDays = elapsed.toFixed(2);
    foliage.dataset.bloomRate = tempoAt(todayMs).toFixed(3);

    // The bloom's wheel, in bloom-days: bud -> open -> spent -> (bare) -> repeat.
    const young = record.youngWindowDays ?? 4;
    const open = record.openWindowDays ?? 14;
    const spent = record.spentWindowDays ?? 4;
    const cycle = record.cycleDays ?? young + open + spent + 6;

    for (const stem of record.stems || []) {
      // The offset is in bloom-days too, which is what keeps the four stems a
      // fixed 7 apart on the wheel however fast or slow the year is turning it.
      const t = elapsed - stem.sproutOffsetDays;
      if (t < 0) continue; // this bloom's wheel hasn't started its first turn yet
      // Where in the wheel is it today? (guard the modulo for any negative t)
      const phase = ((t % cycle) + cycle) % cycle;

      let state;
      if (phase < young) state = 'young'; // a green bud
      else if (phase < young + open) state = 'open'; // an open rose
      else if (phase < young + open + spent) state = 'spent'; // browned, going over
      else continue; // dropped — the slot sits bare until the wheel comes round again

      const bloom = document.createElement('span');
      bloom.className =
        'door-plant__bloom door-plant__bloom--' +
        stem.n +
        (state === 'young'
          ? ' door-plant__bloom--young'
          : state === 'spent'
            ? ' door-plant__bloom--spent'
            : '');
      foliage.appendChild(bloom);
    }
  }

  function init() {
    fetch(RECORD_URL, { cache: 'no-cache' })
      .then((r) => (r.ok ? r.json() : null))
      .then((record) => {
        if (!record) return;
        const foliage = document.querySelector('.door-plant__foliage');
        if (foliage) render(foliage, record);
      })
      .catch(() => {});
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
