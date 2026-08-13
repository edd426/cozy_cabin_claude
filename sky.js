/* sky.js — the clearing keeps the real hour (home + around + inside).
 *
 * Every other clock in this place runs on an invented, frozen morning: the
 * smoke climbs, the skein crosses, the clouds drift, the blooms breathe, and
 * all of them keep the same bright unmoving hour. This script lets the *light*
 * answer to the real one — not the cabin's invented time but the visitor's,
 * the hour on the clock wherever they happen to be standing when they open the
 * door. It reads `new Date()` and tags the scene with the time of day; scene.css
 * lays a soft wash of that hour's colour over the whole frame.
 *
 * The four bands' EDGES move with the year (Day 95, 2026-08-11). They used to be
 * fixed clock hours — dusk began at 17:00 in December exactly as it did in June —
 * which was a small untruth the place carried for two months without noticing:
 * season.js taught the whole yard the year on Day 69, and the hour, built a month
 * earlier, was never told there was one. The fix is a reckoning, not a sensor:
 * `yearSwing()` works a number out of the date alone, −1 at midwinter and +1 at
 * midsummer, and every edge slides EDGE_SWING_H hours along it. So the light
 * begins to go at half past three on a December afternoon and holds past half
 * past six in June, and the long neutral middle of the day is twelve hours wide
 * in summer and six in winter — the same lean the meadow and the crowns and the
 * woodpile already take, arriving at last in the one clock that predates them.
 *
 * Note what this is NOT. It gives the year a length, not the sun an address: no
 * edge of the frame gets brighter, nothing leans toward a point you could stand
 * and aim at, and the wash's colours are untouched. The place still has no
 * latitude beyond the northern-temperate year season.js already keeps (its own
 * comment: winter Dec–Feb, summer Jun–Aug); EDGE_SWING_H is the swing itself,
 * chosen for legibility, not derived from a coordinate the clearing doesn't have.
 *
 * Deliberately gentle (Day 43, 2026-06-20). The point was never a turning day —
 * sun up, sun down, the clearing going dark and cold — that's not a cabin you
 * come home to. Through the long middle of the day the wash is nothing at all
 * and the clearing holds its plain cream morning. Only at the day's two soft
 * edges does the light lean: a thin rose near dawn, a gold toward dusk, and
 * after dark a quiet dusk-blue, deep but never black. A day that greets, not a
 * day that turns. All the colour lives in scene.css; this script only decides
 * which hour's name to hang on the scene.
 *
 * Graceful: if JS is off the scene carries no `data-tod` and scene.css's
 * default (no wash, the original cream morning) stands — nothing is lost, the
 * place just stops keeping the hour. No per-visitor state, no storage, no
 * memory of yesterday: the only inputs are the clock and the calendar at the
 * moment you arrive.
 *
 * All three shells (index.html, around/index.html, inside/index.html) load this;
 * the home scene is fetched into #scene-mount asynchronously while the around and
 * inside scenes are inline, so we tag whatever `.scene` elements exist now and
 * watch #cabin-scene for any that arrive late. The exterior views let the whole
 * frame take the wash (scene.css's .scene::after); the inside refuses the frame
 * wash and tints only the window glass with the same hour (inside.css, Day 46) —
 * a fire-lit room doesn't go blue at dusk, but the square that sees out does.
 */
(function () {
  /* How far each band edge travels between midwinter and midsummer, in hours.
   * 1.5 puts sunrise-ish and sunset-ish about three hours apart across the year,
   * which is a gentle, believable northern-temperate swing and — more to the
   * point — enough that the same wall-clock evening lands in a different part of
   * the day depending on the month, which is the whole thing worth showing. */
  var EDGE_SWING_H = 1.5;

  /* The reckoning: −1 at midwinter, +1 at midsummer, worked from the date and
   * nothing else. A cosine of the day-of-year, offset by the ~10 days between
   * the solstice and the turn of the year. No sensor, no sunrise table, no place
   * on the earth — the same trade the far tower makes, in miniature. */
  function yearSwing(date) {
    var start = Date.UTC(date.getFullYear(), 0, 1);
    var today = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
    var dayOfYear = Math.round((today - start) / 86400000);
    return -Math.cos((2 * Math.PI * (dayOfYear + 10)) / 365.25);
  }

  /* The hour bands' edges, in decimal hours on the visitor's own clock. The
   * middle of the day is the neutral default (no wash); dawn and dusk are the
   * warm edges; night is the cool one. Kept as four coarse phases on purpose —
   * this is a mood, not a sundial. The four numbers are the midwinter/midsummer
   * average (5 / 8 / 17 / 21, the fixed hours this used to hold all year), slid
   * by the year's swing: the two morning edges come earlier as the year warms,
   * the two evening edges later. */
  function edgesFor(date) {
    var s = EDGE_SWING_H * yearSwing(date);
    return { dawn: 5 - s, day: 8 - s, dusk: 17 + s, night: 21 + s };
  }

  function phaseFor(date) {
    var e = edgesFor(date);
    var h = date.getHours() + date.getMinutes() / 60;
    if (h < e.dawn || h >= e.night) return 'night';
    if (h < e.day) return 'dawn';
    if (h < e.dusk) return 'day';
    return 'dusk';
  }

  function tagAll(root, tod) {
    const scenes = root.querySelectorAll('.scene');
    for (const scene of scenes) {
      if (scene.dataset.tod !== tod) scene.dataset.tod = tod;
    }
  }

  function init() {
    const tod = phaseFor(new Date());

    // Tag anything already in the DOM (the around view's scene is inline).
    tagAll(document, tod);

    // The home view injects scene.html into #scene-mount after a fetch; watch
    // for it (and for any other late-mounted scene) and tag it when it lands.
    const host = document.getElementById('cabin-scene');
    if (!host) return;
    if (host.querySelector('.scene')) return; // already present and tagged
    const obs = new MutationObserver(() => {
      if (host.querySelector('.scene')) {
        tagAll(host, tod);
        obs.disconnect();
      }
    });
    obs.observe(host, { childList: true, subtree: true });
  }

  /* The working, published (Day 97, 2026-08-13). /almanac/ states in words and
   * figures what this place will do on a day nobody has reached yet, so a
   * visitor can work it forward and then come back on that day and see whether
   * the clearing kept its word. That is only worth anything if the almanac and
   * the clearing are running the SAME reckoning — an almanac with its own copy
   * of these lines could be right on a morning the yard was wrong, which is the
   * exact failure publishing the working is meant to make impossible. So the
   * page calls in here rather than restating anything. Read-only: nothing below
   * changes what init() does, and nothing outside sets these. */
  window.CabinSky = {
    EDGE_SWING_H: EDGE_SWING_H,
    yearSwing: yearSwing,
    edgesFor: edgesFor,
    phaseFor: phaseFor,
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
