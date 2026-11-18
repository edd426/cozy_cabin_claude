/* season.js — the clearing keeps the real year (home + around + inside).
 *
 * The cabin already holds two clocks. sky.js reads the real *hour* and leans the
 * light — rose at dawn, gold at dusk, blue after dark. door-plant.js and
 * garden.js read a planting date and turn each *bloom* on its own slow wheel.
 * This is the third and slowest hand: the *year*. It reads
 * `new Date().getMonth()` and tags the scene with the season; scene.css lays a
 * gentle wash of that season's colour over the whole exterior frame — the meadow
 * fullest and warm-green in summer, gone gold in autumn, cool and quiet in
 * winter, tender and fresh in spring. Not the bloom's clock (what one flower is
 * doing) but the year's (what season the whole yard leans under together).
 * (Diary 2026-07-15: "a slower, larger clock behind this one — a year's clock,
 * not a bloom's — that would let the whole clearing lean into a season together.")
 *
 * Deliberately gentle, the same vow sky.js keeps: a mood, not a calendar. The
 * JS-off / no-`data-season` default is NO wash — the plain cream clearing the
 * place was born in, so nothing is lost when the script doesn't run. Summer is
 * the lightest lean of the four (this is the cabin's home season, the green it
 * has always worn); the other three tilt a touch further from it and back. No
 * turning the clearing dark or dead — winter is a hush, not a death. A year that
 * leans, not one that punishes.
 *
 * All colour lives in scene.css (the exterior frame wash, `.scene::before`); this
 * script only decides which season's name to hang on the scene. It composes with
 * sky.js's hour wash (`.scene::after`) — the year is the deep slow base, the hour
 * the light that rides on top.
 *
 * All three shells load this (mirroring sky.js). The exterior views — home and
 * around, which share scene.css — take the frame wash; the home scene is fetched
 * into #scene-mount asynchronously while around/inside are inline, so we tag
 * whatever `.scene` elements exist now and watch #cabin-scene for any that arrive
 * late. The inside view is tagged too; a fire-lit room reads the year through its
 * window, not across its walls, so inside.css styles no room-wash from this — only
 * the jar's sprig on the mantle takes the season (Day 82), the year arriving
 * indoors in the one leaf rather than in the light.
 */
(function () {
  /* Four coarse seasons on purpose — this is a lean, not a thermometer. Northern
   * temperate months: winter Dec–Feb, spring Mar–May, summer Jun–Aug, autumn
   * Sep–Nov. getMonth() is 0-indexed (0 = January). */
  function seasonFor(month) {
    if (month <= 1 || month === 11) return 'winter'; // Dec, Jan, Feb
    if (month <= 4) return 'spring'; // Mar, Apr, May
    if (month <= 7) return 'summer'; // Jun, Jul, Aug
    return 'autumn'; // Sep, Oct, Nov
  }

  /* The putting-by (Day 194, 2026-11-18). The year turns in four blocks and the
   * frost keeps the winter's: it comes in one night, the first of December,
   * which is how a first hard frost comes. But the two things a hand does
   * against it — the butt let down with its pipe swung off the rim, the spade
   * out of the bed and hung by the door — are not the frost's. A keeper does
   * them ahead of the cold, not on the morning of it. So they keep a date of
   * their own, the way the plantings do (garden.js, door-plant.js): the last
   * week of autumn, from the twenty-fourth of November. The yard is put by
   * from then until the spring takes the spade back.
   *
   * Only that autumn week is tagged (`data-put-by` on the scene); in winter the
   * season's own lines already say it, and tagging the winter too would let a
   * forced autumn photographed in January show a spade on its peg. The CSS
   * reads the tag only beside `[data-season="autumn"]`, so a forced spring in
   * that week is a plain spring. */
  var PUT_BY = { month: 10, day: 24 }; // getMonth() is 0-indexed: 10 = November

  function puttingByFor(date) {
    return date.getMonth() === PUT_BY.month && date.getDate() >= PUT_BY.day;
  }

  function tagAll(root, season, putBy) {
    const scenes = root.querySelectorAll('.scene');
    for (const scene of scenes) {
      if (scene.dataset.season !== season) scene.dataset.season = season;
      if (putBy) scene.dataset.putBy = '';
    }
  }

  function init() {
    const now = new Date();
    const season = seasonFor(now.getMonth());
    const putBy = puttingByFor(now);

    // Tag anything already in the DOM (the around/inside scenes are inline).
    tagAll(document, season, putBy);

    // The home view injects scene.html into #scene-mount after a fetch; watch
    // for it (and for any other late-mounted scene) and tag it when it lands.
    const host = document.getElementById('cabin-scene');
    if (!host) return;
    if (host.querySelector('.scene')) return; // already present and tagged
    const obs = new MutationObserver(() => {
      if (host.querySelector('.scene')) {
        tagAll(host, season, putBy);
        obs.disconnect();
      }
    });
    obs.observe(host, { childList: true, subtree: true });
  }

  /* The working, published (Day 97, 2026-08-13) — the twin of the block at the
   * foot of sky.js. /almanac/ reads the year off this same function rather than
   * keeping a second copy of the month table, so the page cannot say "autumn"
   * on a morning the meadow is still green. */
  window.CabinSeason = {
    seasonFor: seasonFor,
    seasonForDate: function (date) { return seasonFor(date.getMonth()); },
    /* Day 194: the autumn's last week, when the yard is put by ahead of the
     * frost. True only in that week; the winter says it by its own name. */
    PUT_BY: { month: PUT_BY.month, day: PUT_BY.day },
    puttingByFor: puttingByFor,
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
