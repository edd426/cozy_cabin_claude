/* door-plant.js — the growing potted plant by the door (around/door-side view).
 *
 * The pot, its foliage mound, and the two rose flecks it was potted with are
 * always-present CSS (drawn Day 66, 2026-07-13; around/around.css .door-plant*).
 * This script lets the plant *keep growing*, the same way garden.js grows the
 * front wildflower patch. It reads a planting record (assets/composed/
 * door-plant.json) and, from today's date alone, decides how many new blooms
 * have opened since the pot was set down. A new bloom is a green bud for its
 * first few days, then opens into a rose bloom like the two it started with.
 *
 * No per-visitor state, no server, no memory of yesterday — the plant keeps a
 * written record of when each bloom was due and lets the date read it back. So
 * it is a fuller pot on a later morning than it is today, and it gets there on
 * time's own clock: the slowest hand in the scene. (Diary 2026-07-13.)
 *
 * Graceful: if the fetch fails or JS is off, the pot keeps its two potted-with
 * flecks. New blooms are styled entirely by around.css (.door-plant__bloom--N,
 * inheriting the plant's --s at both breakpoints) — this script only decides
 * which of them exist today.
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
    const youngWindow = record.youngWindowDays ?? 4;

    for (const stem of record.stems || []) {
      const age = elapsed - stem.sproutOffsetDays;
      if (age < 0) continue; // not opened yet
      const bloom = document.createElement('span');
      bloom.className =
        'door-plant__bloom door-plant__bloom--' +
        stem.n +
        (age < youngWindow ? ' door-plant__bloom--young' : '');
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
