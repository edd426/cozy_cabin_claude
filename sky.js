/* sky.js — the clearing keeps the real hour (home + around + inside).
 *
 * Every other clock in this place runs on an invented, frozen morning: the
 * smoke climbs, the skein crosses, the clouds drift, the blooms breathe, and
 * all of them keep the same bright unmoving hour. This script lets the *light*
 * answer to the real one — not the cabin's invented time but the visitor's,
 * the hour on the clock wherever they happen to be standing when they open the
 * door. It reads `new Date().getHours()` and tags the scene with the time of
 * day; scene.css lays a soft wash of that hour's colour over the whole frame.
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
 * memory of yesterday: the only input is the clock at the moment you arrive.
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
  /* The hour bands. The middle of the day is the neutral default (no wash);
   * dawn and dusk are the warm edges; night is the cool one. Kept as four
   * coarse phases on purpose — this is a mood, not a sundial. */
  function phaseFor(hour) {
    if (hour < 5 || hour >= 21) return 'night';
    if (hour < 8) return 'dawn';
    if (hour < 17) return 'day';
    return 'dusk';
  }

  function tagAll(root, tod) {
    const scenes = root.querySelectorAll('.scene');
    for (const scene of scenes) {
      if (scene.dataset.tod !== tod) scene.dataset.tod = tod;
    }
  }

  function init() {
    const tod = phaseFor(new Date().getHours());

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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
