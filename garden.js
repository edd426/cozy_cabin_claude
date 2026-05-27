/* garden.js — the growing wildflower patch (home view only).
 *
 * The three wildflowers at the foot of the cabin's left wall (flower--1..3)
 * are always-present CSS: sown Day 17, taught to breathe Day 18. This script
 * lets the patch *grow*. It reads a planting record (assets/composed/
 * garden.json) and, from today's date alone, decides how many more stems have
 * come up since planting. A new stem is a green bud for its first few days,
 * then opens into a rose bloom like its elders.
 *
 * No per-visitor state, no server, no memory of what yesterday did — the patch
 * keeps a written record of when each stem was sown and lets the date read it
 * back. So it is a different shape on the fortieth morning than it is today,
 * and it gets there on time's own clock: the slowest in the scene.
 *
 * Graceful: if the fetch fails or JS is off, the three CSS flowers remain.
 * The new stems are styled entirely by scene.css (flower--4..7, both
 * breakpoints) — this script only decides which of them exist today.
 */
(function () {
  const RECORD_URL = 'assets/composed/garden.json';
  const DAY_MS = 86400000;

  function utcMidnight(d) {
    return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
  }
  function parseDateUTC(s) {
    const [y, m, day] = s.split('-').map(Number);
    return Date.UTC(y, m - 1, day);
  }

  function render(patch, record) {
    if (patch.dataset.grown === '1') return; // guard against a double observer fire
    patch.dataset.grown = '1';

    const plantedMs = parseDateUTC(record.planted);
    const todayMs = utcMidnight(new Date());
    const elapsed = Math.floor((todayMs - plantedMs) / DAY_MS);
    const youngWindow = record.youngWindowDays ?? 4;

    for (const stem of record.stems || []) {
      const age = elapsed - stem.sproutOffsetDays;
      if (age < 0) continue; // not sown yet
      const el = document.createElement('span');
      el.className =
        'flower flower--' + stem.n + (age < youngWindow ? ' flower--young' : '');
      const head = document.createElement('span');
      head.className = 'flower__head';
      el.appendChild(head);
      patch.appendChild(el);
    }
  }

  function start(record) {
    const mount = document.getElementById('scene-mount');
    if (!mount) return;
    const existing = mount.querySelector('.sprite--flowers');
    if (existing) {
      render(existing, record);
      return;
    }
    // scene.html is injected asynchronously; wait for the patch to appear.
    const obs = new MutationObserver(() => {
      const patch = mount.querySelector('.sprite--flowers');
      if (patch) {
        obs.disconnect();
        render(patch, record);
      }
    });
    obs.observe(mount, { childList: true, subtree: true });
  }

  function init() {
    fetch(RECORD_URL, { cache: 'no-cache' })
      .then((r) => (r.ok ? r.json() : null))
      .then((record) => {
        if (record) start(record);
      })
      .catch(() => {});
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
