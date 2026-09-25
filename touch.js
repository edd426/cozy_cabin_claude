/* touch.js — agent-mutable.
 *
 * Day 139 (2026-09-24). The first thing in this clearing that answers a hand.
 *
 * For a hundred and thirty-eight mornings everything here has moved on its own
 * clock and nothing has ever moved because somebody touched it. Two things in
 * the scene take a tap — the mailbox and the map card — and both of them only
 * leave the frame. This is the founder's ask of 2026-09-23
 * (messages/open/2026-09-23-a-clearing-you-can-touch.md): let the clearing
 * itself respond.
 *
 * WHAT IT DOES. A `.crown-touch` pad lies over each drawn crown — two on the
 * front (south) face, one on the door (east) face. Activate one and the crown
 * it names is shaken: the class `is-shaken` puts `crown-shake` on the tree for
 * one round and then comes off again, so the wind's own `tree-sway` has the
 * element back the moment the ringing stops. In autumn — and only in autumn,
 * because the whole `.sprite--leaffall` layer is `display: none` in the other
 * three seasons — the same tap also lets one leaf go, by putting `is-falling`
 * on a leaf span that is otherwise `display: none` and taking it off again
 * when the fall ends.
 *
 * WHY A PAD AND NOT THE TREE. The front crowns are `<img>` elements, and a
 * replaced element renders no `::before`, so the mailbox's invisible-tap-pad
 * trick (Day 81) cannot be played on them directly; and the small right crown
 * is 30px wide on a phone, under the 44px minimum (Article VIII). A transparent
 * sibling carries the reach and the button semantics, and the drawing is not
 * touched by one pixel — which is also why no drift baseline moved today.
 *
 * WHY THE SHAKE MAY CROSS UPWIND, WHERE THE SWAY MAY NOT. The standing rule
 * (Days 60–63) is that a thing *held out* by a steady breeze never rocks back
 * past its rest, which is why `tree-sway` only ever leans downwind. That rule
 * is about a wind. A shaken crown is not held out by anything: it is displaced
 * and let go, and a thing let go rings back through its own rest and dies away
 * — the same distinction Day 116 drew for the falling leaf ("a thing held out
 * by a wind may not rock back against it; a thing in free fall is held by
 * nothing, and may"). And it is why the door-side crown may be shaken at all:
 * that face looks straight up the wind's throat, so the wind can move nothing
 * there sideways (Day 120) — but a hand is not a wind, and reaches a tree from
 * wherever the hand is.
 *
 * WHAT THE WITNESSES SEE. Nothing, and on purpose. `crown-shake` exists only
 * while the class is on, so `tools/check-almanac.js`'s drift probe — which
 * pauses every animation and walks each named layer round its own clock — finds
 * only `tree-sway` on a resting page and reports the same westerly it always
 * has. The shaken leaf is `display: none` at rest, so `visible-count` still
 * reads four falling leaves out front and three on the door side, and
 * `tools/check-gallery.js` skips an element that shows in no state at all. If a
 * later day wants this held, the honest witness would have to perform the tap,
 * which nothing on the almanac can do: every check there varies on a season or
 * an hour, and a hand is neither (the same slot the bee's round has never had,
 * Day 108).
 *
 * REDUCED MOTION. theme.css collapses every duration to 0.001ms under
 * `prefers-reduced-motion`, so a tap there fires and ends inside a frame and
 * the yard does not move. That is the right answer rather than a gap: what this
 * particular thing has to give is motion, and a visitor who has asked for none
 * is asking not to be given it. A tap that must speak to such a visitor will
 * have to speak in something other than movement.
 *
 * ── Day 140 (2026-09-25): THE FIRE ────────────────────────────────────────
 *
 * The second thing here that answers a hand, and the first that answers in
 * something other than movement — which is the sentence directly above, taken
 * up. A `.fire-touch` pad lies over the firebox in the room (inside.css). Press
 * it and `.hearth` carries `is-prodded` for the length of the flare: the ember
 * bed opens and brightens, the three flame tiers warm (a `filter` transition,
 * so their own running flicker is not disturbed), five `.ember-spark` cells go
 * up the flue and wink out before the lintel — and `sound.js` is asked for a
 * crack, which is the first noise this clearing has ever made.
 *
 * WHAT A PROD MAY NOT DO. It may not feed the fire. The armful beside the
 * hearth holds the count the season gave it (Day 125) and the flame stands the
 * tiers the hour gave it (Day 126); a hand is neither a season nor an hour, so
 * it changes neither. Half a second later the fire stands exactly where it
 * stood — spent nothing, gained nothing, the shape of every other turn here.
 *
 * WHY THE SOUND IS ASKED FOR HERE AND NOT SCHEDULED THERE. `sound.js` holds
 * one rule above all others: nothing plays on its own. The only way to keep
 * that true is for every sound to be scheduled inside the call stack of a real
 * gesture, which is this handler and nowhere else. And it is asked for
 * defensively — `window.CabinSound` may be absent, the browser may have no Web
 * Audio, the context may be refused — because a sound is the one part of this
 * answer that can fail silently and completely, and it may never be the reason
 * the visible half does not happen. So the flare is put up first and the crack
 * is asked for second.
 *
 * Delegated from `document`, so it does not care that the home view fetches
 * scene.html in after load (no observer needed, unlike sky.js). Safe on a page
 * with no pads: the handlers simply never match.
 */
(function () {
  'use strict';

  /* One shake at a time per crown. A second tap while a crown is still ringing
   * is ignored rather than restarting it — a tree does not begin its swing
   * again from nothing because you touched it twice; and restarting would also
   * let a fast tapper hold a leaf permanently at the top of its fall. */
  function shake(pad) {
    var scene = pad.closest('.scene');
    if (!scene) return;

    var crown = pad.dataset.shake ? scene.querySelector(pad.dataset.shake) : null;
    if (crown && !crown.classList.contains('is-shaken')) {
      crown.classList.add('is-shaken');
      crown.addEventListener('animationend', function once(e) {
        if (e.animationName !== 'crown-shake') return;
        crown.classList.remove('is-shaken');
        crown.removeEventListener('animationend', once);
      });
    }

    /* The leaf is the season's half of the answer, and the question asked here
     * is not "what month is it" — season.js owns the year and one place should
     * own it — but "is there a leaf layer laid out on this face at all". Out of
     * autumn `.sprite--leaffall` is display:none, and an element inside a
     * display:none ancestor generates no boxes, which is the same reading every
     * count in this place uses (Day 98: count on layout, not on brightness).
     *
     * It has to be asked of the LAYER and not of the leaf: the leaf is itself
     * display:none until the class goes on, so asking it would always say no.
     * And it has to be asked at all — a class added to a leaf that cannot run
     * its animation never gets an `animationend` back, so `is-falling` would
     * stick there unremoved until some later autumn picked it up. */
    var leaf = pad.dataset.leaf ? scene.querySelector(pad.dataset.leaf) : null;
    var layer = leaf && leaf.parentElement;
    if (leaf && layer && layer.getClientRects().length > 0 &&
        !leaf.classList.contains('is-falling')) {
      leaf.classList.add('is-falling');
      leaf.addEventListener('animationend', function once() {
        leaf.classList.remove('is-falling');
        leaf.removeEventListener('animationend', once);
      });
    }
  }

  /* One prod at a time. A second press while the coals are still flaring is
   * ignored rather than restarting them — the same rule the crowns keep, and
   * for a sharper reason here: `is-prodded` is taken off by the `animationend`
   * of one named spark, so restarting mid-flare would let a fast presser hold
   * a run of sparks standing in the firebox indefinitely.
   *
   * The class is driven off `ember-rise-3`, which is the longest of the five
   * (0.90s against 0.66–0.84s) and carries no delay of its own to outlive. If
   * a later day retimes the sparks, this is the line that has to follow. */
  function prod(pad) {
    var scene = pad.closest('.scene');
    var hearth = scene && scene.querySelector('.hearth');

    if (hearth && !hearth.classList.contains('is-prodded')) {
      hearth.classList.add('is-prodded');
      hearth.addEventListener('animationend', function once(e) {
        if (e.animationName !== 'ember-rise-3') return;
        hearth.classList.remove('is-prodded');
        hearth.removeEventListener('animationend', once);
      });
    }

    /* Second, and never first (see the header). Anything at all wrong with the
     * sound — no Web Audio, a refused context, a file that did not load — and
     * the visible half above has already happened. */
    if (window.CabinSound && typeof window.CabinSound.crackle === 'function') {
      try { window.CabinSound.crackle(); } catch (err) {}
    }
  }

  document.addEventListener('click', function (e) {
    if (!e.target.closest) return;
    var pad = e.target.closest('.crown-touch');
    if (pad) { shake(pad); return; }
    pad = e.target.closest('.fire-touch');
    if (pad) prod(pad);
  });

  /* Everything a real <button> would have given for free, minus the layout it
   * would have cost (Day 106: Chromium blockifies a button whatever display it
   * is given). Space scrolls the page if it is not swallowed. */
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' && e.key !== ' ' && e.key !== 'Spacebar') return;
    if (!e.target.closest) return;
    var crown = e.target.closest('.crown-touch');
    var fire = crown ? null : e.target.closest('.fire-touch');
    if (!crown && !fire) return;
    e.preventDefault();
    if (crown) shake(crown); else prod(fire);
  });
})();
