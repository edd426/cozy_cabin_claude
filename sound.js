/* sound.js — agent-mutable.
 *
 * Day 140 (2026-09-25). The first sound this clearing has ever made.
 *
 * For a hundred and thirty-nine mornings everything here has been light and
 * shape and motion, and nothing has ever been audible. This is the founder's
 * ask of 2026-09-23 (messages/open/2026-09-23-a-clearing-you-can-touch.md):
 * "At least one of them makes a sound… Make the sounds yourself with the Web
 * Audio API if you can, so nothing needs a licence."
 *
 * So nothing is vendored and nothing is fetched. Every sound here is built out
 * of a half-second of white noise made once in memory and shaped by filters and
 * envelopes — which is what a fire's crack physically is (a burst of broadband
 * noise from a pocket of steam letting go), so the synthesis is not a stand-in
 * for a recording, it is the thing itself done arithmetically. The same trade
 * the far keeper makes with his sky.
 *
 * THE FOUR RULES, and they are the whole of the design:
 *
 *   1. NOTHING EVER PLAYS ON ITS OWN. There is no ambient bed, no loop, no
 *      startup chime, and no timer anywhere in this file. A sound happens only
 *      as the direct answer to a deliberate press, in the same call stack as
 *      the gesture. A browser will not let an AudioContext start without a
 *      gesture anyway — the founder called that out as suiting us — but this
 *      file does not lean on the browser for it. The context is built lazily,
 *      on the first press, and if it is never pressed it is never built.
 *
 *   2. SHORT. Every sound is under a second and then entirely gone. A place
 *      whose whole register is "slow enough to be discovered" cannot afford a
 *      noise that outstays the touch that asked for it.
 *
 *   3. QUIET. `PEAK` is the hard ceiling on the master gain and nothing below
 *      is allowed past it. It is set well under what the room could carry,
 *      because a visitor who did not expect any sound at all should be able to
 *      be surprised without being startled.
 *
 *   4. IT MAY NEVER BE THE ONLY ANSWER. Whatever makes a sound must also do
 *      something a silent visitor can see, because a sound is the one thing
 *      here that can fail completely and invisibly — a muted tab, a device with
 *      no output, a browser that refused the context. Sound is an addition to
 *      an answer, never the answer.
 *
 * WHAT IT IS FOR, which is the reverse of rule 4 and the reason the file
 * exists. touch.js's Day-139 note ends: theme.css collapses every duration
 * under `prefers-reduced-motion`, so a tap there gives a visitor who has asked
 * for stillness nothing whatever, and "a tap that must speak to such a visitor
 * will have to speak in something other than movement." This is that something.
 * A sound is not motion; it costs a visitor who asked for no motion nothing,
 * and it is the first answer in this clearing that does not depend on a thing
 * moving in order to arrive.
 *
 * Day 141 (2026-09-26) adds the second sound: `latch()`, the click of the porch
 * lantern's glass door, asked for when a hand lights the lamp or puts it out.
 * Both sounds are windows cut from the same half-second of noise and shaped
 * differently, so a second sound costs one more allocation of nothing.
 *
 * Published read-only on `window.CabinSound` (the Day-97 export move sky.js and
 * season.js make), so a consumer — today touch.js only — can ask for a sound
 * without owning any of this. Every entry point is a no-op rather than a throw
 * where Web Audio is absent or refused: this file must never be the reason a
 * tap fails to do the visible half of its job.
 */
(function () {
  'use strict';

  /* The hard ceiling (rule 3). Nothing in this file may schedule a gain above
   * it, and the master node is clamped to it once, here, so a later sound
   * cannot raise the roof by asking. */
  var PEAK = 0.11;

  var ctx = null;          /* built on the first press, never before */
  var master = null;
  var noise = null;        /* one half-second buffer, reused by every burst */
  var broken = false;      /* set once if Web Audio is absent or refused */

  var AC = (typeof window !== 'undefined') &&
           (window.AudioContext || window.webkitAudioContext);

  /* Lazy build. Returns null rather than throwing on any failure, so every
   * caller can be written as `if (!c) return;` and a missing sound is never a
   * missing tap. */
  function context() {
    if (broken) return null;
    if (ctx) {
      /* A context can be suspended out from under us — a background tab, an
       * autoplay policy that only lifts on the gesture. Resume is a promise
       * and we deliberately do not wait on it: the sound is scheduled now,
       * from inside the gesture's own call stack, and if the resume lands late
       * the burst is simply inaudible. Waiting would be worse, because an
       * `await` puts the scheduling outside the gesture and some browsers
       * count that as not-a-gesture at all. */
      if (ctx.state === 'suspended' && ctx.resume) { try { ctx.resume(); } catch (e) {} }
      return ctx;
    }
    if (!AC) { broken = true; return null; }
    try {
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = PEAK;
      master.connect(ctx.destination);
      noise = makeNoise(ctx);
      if (ctx.state === 'suspended' && ctx.resume) { try { ctx.resume(); } catch (e) {} }
      return ctx;
    } catch (e) {
      broken = true;
      ctx = null;
      return null;
    }
  }

  /* Half a second of white noise, made once. Every burst below is a window cut
   * out of this one buffer at a random offset, so a hundred cracks are a
   * hundred different sounds off one allocation and no two presses are quite
   * the same — which is the point, because a fire that cracked identically
   * twice would read as a recording. */
  function makeNoise(c) {
    var len = Math.floor(c.sampleRate * 0.5);
    var buf = c.createBuffer(1, len, c.sampleRate);
    var d = buf.getChannelData(0);
    for (var i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    return buf;
  }

  /* One burst: a slice of the noise buffer through a filter, under an envelope
   * that attacks in a couple of milliseconds and decays away to nothing.
   *
   * `at`    — seconds from now
   * `dur`   — how long the tail runs
   * `gain`  — peak of this burst, multiplied into the master's PEAK
   * `type`  — 'bandpass' for a crack, 'lowpass' for the body of the prod
   * `freq`  — the filter's centre / corner
   * `q`     — filter Q; a high Q on a bandpass is what makes a tick ring
   */
  function burst(c, at, dur, gain, type, freq, q) {
    var t = c.currentTime + at;

    var src = c.createBufferSource();
    src.buffer = noise;
    /* A different window of the buffer every time. Leave room for the longest
     * tail so the slice never runs off the end and cuts the envelope short. */
    var maxOffset = Math.max(0, noise.duration - dur - 0.02);

    var flt = c.createBiquadFilter();
    flt.type = type;
    flt.frequency.value = freq;
    flt.Q.value = q;

    var env = c.createGain();
    env.gain.setValueAtTime(0.0001, t);
    env.gain.exponentialRampToValueAtTime(Math.max(0.0002, gain), t + 0.003);
    env.gain.exponentialRampToValueAtTime(0.0001, t + dur);

    src.connect(flt);
    flt.connect(env);
    env.connect(master);

    src.start(t, Math.random() * maxOffset, dur + 0.02);
    src.stop(t + dur + 0.02);
  }

  /* ── the fire's crack ─────────────────────────────────────────────────────
   *
   * Two things layered, and they are two different physical events:
   *
   *   the PROD — a low, soft thud, the poker meeting a bed of coals. Noise
   *   through a low corner, longer tail, no ring. It is the only part that is
   *   the same every time, because it is the hand and not the fire.
   *
   *   the CRACKS — three to five short high ticks scattered over the next
   *   third of a second, each a high-Q bandpass so it reads as a snap rather
   *   than a hiss, each quieter and a little duller than the last, because
   *   what a prod actually does is open a bank of coals and let a run of small
   *   pockets go one after another as the draught reaches them.
   *
   * The whole thing is done inside 0.6 seconds (rule 2). Returns the number of
   * bursts scheduled, or 0 if there was no context — which is what the day's
   * test counts, since the honest way to check a sound is to count the sources
   * the page actually started rather than to ask this file how it feels. */
  function crackle() {
    var c = context();
    if (!c) return 0;
    var n = 0;

    /* The prod. */
    burst(c, 0, 0.18, 0.55, 'lowpass', 190, 0.8);
    n++;

    /* The cracks. Three certain, and a fourth and fifth on a coin each, so a
     * visitor who presses twice does not hear the same fire twice. */
    var count = 3 + (Math.random() < 0.6 ? 1 : 0) + (Math.random() < 0.3 ? 1 : 0);
    var at = 0.02;
    for (var i = 0; i < count; i++) {
      at += 0.03 + Math.random() * 0.075;
      var fade = 1 - (i / (count + 1));
      burst(
        c,
        at,
        0.045 + Math.random() * 0.05,
        0.30 * fade,
        'bandpass',
        2400 - i * 260 + Math.random() * 700,   /* duller as the run goes on */
        7 + Math.random() * 5
      );
      n++;
    }
    return n;
  }

  /* ── the lamp's latch (Day 141, 2026-09-26) ───────────────────────────────
   *
   * The small mechanical click of a lantern's glass door being unlatched and
   * shut again — asked for by touch.js when the lamp by the door is lit or put
   * out. Two high bandpass ticks a beat apart, the second lower and softer: the
   * catch giving, and the door meeting the frame. Deliberately the SAME sound in
   * both directions, because a latch does not know which way you are working it.
   *
   * It is a good deal quieter and shorter than the fire's crack (0.26 against
   * 0.55 at the peak, a tenth of a second against six tenths). That is not
   * timidity: a fire is a large thing letting go and a latch is a small one, and
   * the two sounds standing at the same loudness would say something untrue
   * about the two objects.
   *
   * Rule 4 is kept by the object rather than by this file. The lamp's whole
   * answer is a colour on the glass and a halo around it, and that answer is
   * complete with no sound at all — which also makes this the one sound here a
   * visitor who has asked for no motion loses nothing by missing, since the
   * lamp's change of state is not a motion either.
   *
   * Returns the number of bursts scheduled — always 2 here, or 0 with no
   * context — because the honest way to check a sound is to count what the page
   * actually started (Day 140). */
  function latch() {
    var c = context();
    if (!c) return 0;
    burst(c, 0,     0.035, 0.26, 'bandpass', 3100 + Math.random() * 400, 9);
    burst(c, 0.045, 0.055, 0.16, 'bandpass', 1500 + Math.random() * 300, 6);
    return 2;
  }

  /* Read-only, before anything else can want it. `available` is a fact about
   * the browser and not about whether a sound has ever been made; `started` is
   * true only once a context genuinely exists, which is never until a press. */
  window.CabinSound = {
    PEAK: PEAK,
    crackle: crackle,
    latch: latch,
    available: function () { return !!AC && !broken; },
    started: function () { return !!ctx; }
  };
})();
