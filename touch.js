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
 * ── Day 141 (2026-09-26): THE LAMP, AND THE FIRST ANSWER THAT OUTLASTS THE
 * TOUCH ───────────────────────────────────────────────────────────────────
 *
 * The third thing here that answers a hand, and the first that is still
 * answering after the hand has gone. A `.lamp-touch` pad lies over the porch
 * lantern on the door face (around.css). Press it and the lamp lights; press it
 * again and it goes out; and the choice is written to `localStorage` under
 * `cabin.lamp` and read back on every later arrival, so the lamp is as the
 * visitor left it through the map, the front, the room, and tomorrow morning.
 * That is the founder's "a state that holds for the visitor"
 * (messages/open/2026-09-23-a-clearing-you-can-touch.md).
 *
 * THREE STATES, AND THE THIRD IS THE DEFAULT. `data-lamp` absent means nobody
 * has had an opinion: the hour decides, exactly as it has since Day 49 — dark
 * through the long middle of the day, kindled at dawn and dusk, burning at
 * night. `lit` and `out` are a hand overruling the hour in one direction or the
 * other. There is deliberately no way back to the hour from here; a control with
 * three positions where two are visibly identical is a control nobody can read,
 * and clearing the site's storage is the honest undo.
 *
 * WHY A HAND MAY OVERRULE A WHEEL AT ALL. Everything else in this clearing that
 * gives light is a thing the place simply does — the fireflies, the winter
 * stars, the rim on the far crests, the fire on its own hearth — and a hand has
 * no business at any of them. The lantern is the one exception, and it has been
 * described as the exception since the morning it was hung: "the most made thing
 * in the clearing — bracket screwed to the wall, glass in an iron cage, lit on
 * purpose for an arrival" (diary 2026-06-30). A lamp is an object that comes
 * with a switch already implied. Nothing else out here does.
 *
 * WHAT A HELD STATE COSTS THE RECORD, which is the day's actual finding. Every
 * witness and every kept picture opens a browser that has never been here: no
 * storage, so no `data-lamp`, so the lamp follows the hour and every reading
 * comes back exactly as it did yesterday. `tools/check-almanac.js`'s `lantern`
 * probe still reads dark at noon; `tools/check-drift.js` finds no pixel moved;
 * `tools/check-gallery.js` sees a layer whose states are the ones it always had.
 * That is not a gap to be closed — it is what the record is: a picture of a
 * first arrival. Yesterday's sound was unphotographable; this is the second
 * thing here no frame can hold, and for the opposite reason. A sound cannot get
 * into a picture at all. This could, easily — and never will, because the
 * camera arrives new every time, and a held state belongs to somebody who has
 * been here before.
 *
 * REDUCED MOTION. The lamp's whole answer is a change of colour on the glass and
 * a halo around it, which is a state and not a motion, so a visitor who has
 * asked for stillness gets the entire answer (the 1.6s cross-fade collapses and
 * the lamp simply is lit). Of the three things built so far this is the only one
 * whose answer needs neither movement nor sound to arrive.
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

  /* ── the lamp (Day 141) ───────────────────────────────────────────────────
   *
   * The only piece of this file that remembers anything. Every read and every
   * write of storage is wrapped, because a browser in a private window, or one
   * with site data blocked, throws on the accessor rather than returning null —
   * and a lamp that cannot be remembered must still be a lamp that can be lit. */
  var LAMP_KEY = 'cabin.lamp';
  var LIT_BANDS = { dawn: 1, dusk: 1, night: 1 };

  function lampStored() {
    try {
      var v = window.localStorage.getItem(LAMP_KEY);
      return (v === 'lit' || v === 'out') ? v : null;
    } catch (e) { return null; }
  }

  function lampStore(v) {
    try { window.localStorage.setItem(LAMP_KEY, v); } catch (e) {}
  }

  /* What the hour alone would do with it. sky.js has already tagged the scene
   * by the time this file runs — both are deferred and it is first in document
   * order — and an untagged scene reads as unlit, which is the day's own
   * middle and the safest thing to be wrong about. */
  function lampLitByHour(scene) {
    return !!LIT_BANDS[scene.getAttribute('data-tod')];
  }

  function lampIsLit(scene) {
    var held = scene.getAttribute('data-lamp');
    return held ? held === 'lit' : lampLitByHour(scene);
  }

  /* `instant` is for the restore only. It puts `data-lamp-init` on the scene,
   * which turns the glass's 1.6s cross-fade off, and takes it off again on the
   * next frame — so a visitor arriving at a lamp they left burning finds it
   * already burning rather than watching it kindle at them.
   *
   * I very nearly deleted this as decoration. Removing it and re-running the
   * day's test came back green, and the reason was the hour the test happened to
   * stand at: a machine running near midnight reckons `night`, the hour lights
   * the lamp anyway, and a held `lit` changes nothing there is anything to fade
   * BETWEEN. Pin the clock to noon and the fade is plainly there — the lantern
   * reports `background-color` and `box-shadow` still running a tenth of a
   * second into a return visit. A guard tested only in the state where it has
   * nothing to do will always look like a guard that does nothing. */
  function lampPaint(scene, pad, state, instant) {
    if (instant) scene.setAttribute('data-lamp-init', '');
    if (state) scene.setAttribute('data-lamp', state);
    else scene.removeAttribute('data-lamp');

    var lit = lampIsLit(scene);
    pad.setAttribute('aria-pressed', lit ? 'true' : 'false');
    pad.setAttribute('aria-label', lit ? 'put out the lamp by the door'
                                       : 'light the lamp by the door');

    if (instant) {
      window.requestAnimationFrame(function () {
        scene.removeAttribute('data-lamp-init');
      });
    }
  }

  function lamp(pad) {
    var scene = pad.closest('.scene');
    if (!scene) return;

    var next = lampIsLit(scene) ? 'out' : 'lit';
    lampPaint(scene, pad, next, false);
    lampStore(next);

    /* Second, and never first — the same rule the fire keeps. The glass has
     * already changed by the time anything is asked of the audio. */
    if (window.CabinSound && typeof window.CabinSound.latch === 'function') {
      try { window.CabinSound.latch(); } catch (err) {}
    }
  }

  /* Read the held choice back at parse time, in the body of this deferred file,
   * so the lamp is right on arrival rather than correcting itself a moment
   * later — and with `instant`, so it does not fade there. Both halves matter:
   * the ordering puts the attribute on before the first paint, and the
   * suppression covers the case where something earlier in the page has already
   * flushed a style off this view. A page with no pad — every view but the door
   * side — falls straight through. */
  (function restoreLamp() {
    var pad = document.querySelector('.lamp-touch');
    var scene = pad && pad.closest('.scene');
    if (!scene) return;
    lampPaint(scene, pad, lampStored(), true);
  })();

  document.addEventListener('click', function (e) {
    if (!e.target.closest) return;
    var pad = e.target.closest('.crown-touch');
    if (pad) { shake(pad); return; }
    pad = e.target.closest('.fire-touch');
    if (pad) { prod(pad); return; }
    pad = e.target.closest('.lamp-touch');
    if (pad) lamp(pad);
  });

  /* Everything a real <button> would have given for free, minus the layout it
   * would have cost (Day 106: Chromium blockifies a button whatever display it
   * is given). Space scrolls the page if it is not swallowed. */
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' && e.key !== ' ' && e.key !== 'Spacebar') return;
    if (!e.target.closest) return;
    var crown = e.target.closest('.crown-touch');
    var fire = crown ? null : e.target.closest('.fire-touch');
    var lamppad = (crown || fire) ? null : e.target.closest('.lamp-touch');
    if (!crown && !fire && !lamppad) return;
    e.preventDefault();
    if (crown) shake(crown);
    else if (fire) prod(fire);
    else lamp(lamppad);
  });
})();
