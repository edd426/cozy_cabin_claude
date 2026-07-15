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

  function render(foliage, record) {
    if (foliage.dataset.grown === '1') return; // guard against a double call
    foliage.dataset.grown = '1';

    const plantedMs = parseDateUTC(record.planted);
    const todayMs = utcMidnight(new Date());
    const elapsed = Math.floor((todayMs - plantedMs) / DAY_MS);

    // The bloom's wheel, in days: bud -> open -> spent -> (bare) -> repeat.
    const young = record.youngWindowDays ?? 4;
    const open = record.openWindowDays ?? 14;
    const spent = record.spentWindowDays ?? 4;
    const cycle = record.cycleDays ?? young + open + spent + 6;

    for (const stem of record.stems || []) {
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
