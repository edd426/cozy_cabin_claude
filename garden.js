/* garden.js — the wildflower bed at the foot of the cabin's left wall (home view).
 *
 * flower--1..3 are always-present CSS: sown by hand on Day 17, taught to
 * breathe on Day 18. They are the bed's root — there when the script doesn't
 * run, there in every month, and two of the three are the blooms the bee has
 * learned to put her feet down on (scene.css, Day 108). Nothing below ever
 * takes one away.
 *
 * Everything else in the bed is this script's. Day 19 (2026-05-27) let the
 * patch GROW: a written planting record (assets/composed/garden.json) and
 * today's date, and from those two alone, how many more stems have come up
 * since planting. A new stem was a green bud for its first few days and then
 * opened into a rose bloom like its elders — and stayed one, for good.
 *
 * Day 115 (2026-08-31) gives those stems the rest of the wheel, and gives the
 * bed a shape of its own to turn it in.
 *
 * The pot by the door has turned since Day 68: bud, open, spent, bare, and the
 * same slot fills again. A pot can promise that, because a pot is a container —
 * four fixed slots, spaced around one shared cycle so no two go over together,
 * and the promise it keeps is a COUNT. Ground is not a container. What a bed
 * promises is not how many stems are standing in it but that the ground goes on
 * being flowered, and a real bed keeps that promise by never being twice the
 * same shape: a stem goes over, drops, and what comes up next comes up in fresh
 * ground beside where it stood. (Diary 2026-05-27, set down the next morning as
 * a question asked too early: "the honest end of growth is not stillness but
 * something that thins and reseeds, so the patch is never finished, only
 * turning over." Ninety mornings later the bed is old enough for it.)
 *
 * So a `wheel` here is one plant's life rather than one slot's occupant, and it
 * carries a list of `seats` — the positions in the bed it comes up in, taken in
 * turn. Wheel A stands in seat 4, goes over, drops, and comes up next round in
 * seat 8; the round after that, back in 4. The bed keeps roughly its number and
 * never its arrangement.
 *
 * Two consequences, both deliberate:
 *
 *   1. Each wheel keeps its OWN cycle length (garden.json), where the pot's
 *      four share one. In a container you space the slots; in open ground four
 *      plants do not agree on how long a life is, and over years these four
 *      drift in and out of phase instead of marching in formation. The cost is
 *      that the bed cannot promise "at most one bare at a time" the way the pot
 *      can — so it doesn't. Its floor is the three standing stems above, and
 *      that is what /almanac/ holds it to.
 *   2. The wheel counts BLOOM-DAYS, not days, borrowed from `window.CabinBloom`
 *      (bloom-clock.js) — the same pace the pot's wheel turns at, from the same
 *      place, so two growing things under one year can never disagree about how
 *      fast it is going. If bloom-clock.js or sky.js is absent the pace falls
 *      back to a flat 1 and the wheel counts plain days.
 *
 * No per-visitor state, no server, no memory of what yesterday did: the bed
 * keeps a written record and lets the date read the phase back out of it.
 *
 * The patch publishes the two numbers its own render used — `data-bloom-days`
 * and `data-bloom-rate` — on `.sprite--flowers`, so /almanac/'s witnesses read
 * what happened rather than working out a second copy of it.
 *
 * Graceful: if the fetch fails or JS is off, the three CSS flowers remain. Every
 * seat and every state is styled by scene.css (flower--4..11, --young, --spent,
 * both breakpoints) — this script only decides which seats are filled today and
 * with what.
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

  /* The year's pace, borrowed. Never a second copy — see bloom-clock.js. */
  function rateAt(ms) {
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

  function render(patch, record) {
    if (patch.dataset.grown === '1') return; // guard against a double observer fire
    patch.dataset.grown = '1';

    const plantedMs = parseDateUTC(record.planted);
    const todayMs = utcMidnight(new Date());
    const elapsed = bloomDaysBetween(plantedMs, todayMs);
    patch.dataset.bloomDays = elapsed.toFixed(2);
    patch.dataset.bloomRate = rateAt(todayMs).toFixed(3);

    const young = record.youngWindowDays ?? 4;
    const open = record.openWindowDays ?? 14;
    const spent = record.spentWindowDays ?? 4;

    for (const wheel of record.wheels || []) {
      const seats = wheel.seats || [];
      if (!seats.length) continue;
      // This plant's own life-length, in bloom-days. Longer than its three
      // windows, and the remainder is the stretch its ground sits bare.
      const cycle = wheel.cycleDays ?? young + open + spent + 6;

      const t = elapsed - wheel.sproutOffsetDays;
      if (t < 0) continue; // not sown yet

      const round = Math.floor(t / cycle); // which turn of this plant's wheel
      const phase = t - round * cycle; // and how far into it

      let state;
      if (phase < young) state = 'young'; // a closed green bud
      else if (phase < young + open) state = 'open'; // an open rose
      else if (phase < young + open + spent) state = 'spent'; // going over
      else continue; // dropped — this plant's ground is bare until the wheel turns

      // Where it came up this round. A bed reseeds beside itself, so the seat
      // walks the list rather than staying put.
      const seat = seats[round % seats.length];

      const el = document.createElement('span');
      el.className =
        'flower flower--' +
        seat +
        (state === 'young' ? ' flower--young' : state === 'spent' ? ' flower--spent' : '');
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
