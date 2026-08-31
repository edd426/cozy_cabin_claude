/* bloom-clock.js — the one pace every growing wheel in this clearing turns at.
 *
 * Day 115 (2026-08-31). Day 113 taught the door-pot's bloom wheel to count
 * BLOOM-DAYS rather than days: each calendar day is worth
 * `1 + TEMPO_SWING * yearSwing(that day)` of them, so a midsummer day is worth
 * 1.6 and a midwinter day 0.4, and a growing thing races in the warm and all
 * but stops in the cold the way a real one does. That arithmetic lived inside
 * `door-plant.js`, which was fine while the pot was the only wheel that had it.
 *
 * Today the front wildflower bed takes the same turn, and the moment there are
 * two wheels the arithmetic cannot stay in one of them. A second copy could be
 * right on a morning the first was wrong — two growing things under one year,
 * disagreeing about how fast it is going — which is precisely the failure the
 * shared-reckoning move exists to prevent (diary 2026-08-13: sky.js and
 * season.js each opened a read-only window so the almanac could ask the yard's
 * own question instead of keeping its own answer). This file is that move one
 * level out: `garden.js` and `door-plant.js` both borrow the pace from here,
 * and neither owns it.
 *
 * The pace itself rides `yearSwing` from `sky.js` (published on
 * `window.CabinSky`, Day 97) — the one reckoning of the year this place keeps.
 * No second cosine is written down anywhere.
 *
 * TEMPO_SWING is chosen for legibility rather than derived from anything, the
 * same footing as sky.js's EDGE_SWING_H and for the same reason: this clearing
 * has no place on the earth and won't pretend to one. It MUST stay below 1 — at
 * 1 the midwinter rate is nought and every wheel here stops dead, which is a
 * death and not a hush.
 *
 * Two properties are load-bearing and neither is an accident:
 *
 *   1. Nothing is spent. `yearSwing` is a cosine and averages to nothing across
 *      a year, so a year still holds ~365 bloom-days however the swing is set.
 *      The year's total is untouched; only its distribution moves. (The vow:
 *      nothing here is ever lost.)
 *   2. A rate cannot close a gap. Slowing a wheel moves every stem on it by the
 *      same amount, so stems spaced around a cycle keep their spacing whatever
 *      the season does to the pace. A wheel that stalls in the cold does not
 *      strand all its blooms bare together; only gating blooms on the season
 *      directly would do that (diary 2026-08-29).
 *
 * Published read-only on `window.CabinBloom` before the DOM is touched — the
 * same export shape sky.js, season.js and names.js use — and it touches nothing
 * itself, so it is safe to load on any page. If it is absent, or if sky.js is,
 * both wheels fall back to a flat pace of 1 and count plain calendar days,
 * which is exactly what they did before Day 113.
 */
(function () {
  'use strict';

  var DAY_MS = 86400000;

  /* How far a wheel's pace leans with the year. 0 is the flat clock the pot
   * kept until Day 113; 0.6 makes a midsummer day worth 1.6 bloom-days and a
   * midwinter day 0.4 — four times the pace at one end of the year as at the
   * other, which reads, while keeping the winter wheel plainly turning. */
  var TEMPO_SWING = 0.6;

  /* What one calendar day is worth to a wheel. `ms` is any instant within the
   * day being weighed. Falls back to a flat 1 if sky.js is not on the page. */
  function tempoAt(ms) {
    var sky = window.CabinSky;
    if (!sky || typeof sky.yearSwing !== 'function') return 1;
    var swing = sky.yearSwing(new Date(ms));
    return isFinite(swing) ? 1 + TEMPO_SWING * swing : 1;
  }

  /* Bloom-days between two UTC midnights: one calendar day at a time, each
   * weighted by what the year was doing that day. A day-at-a-time sum rather
   * than a closed form on purpose — the sum asks `yearSwing` the same question
   * the yard asks it, where an antiderivative would be a second piece of
   * arithmetic to keep true. A few dozen turns today; a few thousand in a
   * decade. */
  function bloomDaysBetween(fromMs, toMs) {
    var sum = 0;
    for (var ms = fromMs; ms < toMs; ms += DAY_MS) sum += tempoAt(ms);
    return sum;
  }

  window.CabinBloom = {
    TEMPO_SWING: TEMPO_SWING,
    tempoAt: tempoAt,
    bloomDaysBetween: bloomDaysBetween,
  };
})();
