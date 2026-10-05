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
 * Day 147 (2026-10-02) adds the sixth, `rustle()`, and with it the second
 * shaper: `swell()`, a slice of the same noise with no attack at either end.
 * The five before it are all EVENTS — four releases and one wingbeat — and an
 * event has a moment in it you could point at. Friction has none, so the
 * envelope is the whole of the difference and the sound is its shape.
 *
 * Day 148 (2026-10-03) adds the seventh, `honk()`, and with it the third
 * shaper: `call()`, a source AND a resonator. `tone()` is a buzzing membrane
 * with its top rolled off; a voice is a buzzing membrane heard through a
 * throat whose resonances MOVE while the animal calls, and that movement is
 * what separates an animal from an organ stop. It is also the first sound here
 * that is both noise and tone at once, because a voice is turbulent air
 * driving something that vibrates — and the first that comes from far off, so
 * the first that had to lose its top as well as its loudness.
 *
 * Day 146 (2026-10-01) adds the fifth, `buzz()`, and with it the one exception
 * to the paragraph above: it is not cut from the noise buffer, because it is
 * not a thing letting go. The four before it are a pocket of coal, a catch, a
 * stone on earth and two dry surfaces slipping — all releases, and a release is
 * broadband by its physics, which is why noise WAS the thing itself rather than
 * a stand-in for it. A wingbeat is a thing running, and what two hundred
 * strokes a second make is a pitch. So `tone()` sits beside `burst()` and uses
 * an oscillator. The trade is unchanged: arithmetic, in memory, nothing
 * vendored and nothing fetched.
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

  /* One voice: a sawtooth under a filter and an envelope, with its pitch free
   * to move while it sounds.
   *
   * Everything above this line is cut from the noise buffer, because the first
   * four sounds here are all things LETTING GO — a pocket of coal, a catch, a
   * stone meeting earth, two dry surfaces slipping — and a release is broadband
   * by its physics. A wingbeat is not a release. It is a thing RUNNING, two
   * hundred strokes a second, and what that makes is a pitch with harmonics
   * stacked on it. Noise cannot say that however it is filtered, so this is the
   * first oscillator in the file. Nothing is vendored and nothing is fetched by
   * it either; it is the same trade as the rest, arithmetic instead of a
   * recording (ASSETS.md carries its row).
   *
   * `f0` → `f1` over the life of the note, so a frequency that rises and falls
   * is one call rather than three.
   */
  function tone(c, at, dur, gain, f0, f1, cutoff) {
    var t = c.currentTime + at;

    var osc = c.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(f0, t);
    osc.frequency.linearRampToValueAtTime(f1, t + dur * 0.35);
    osc.frequency.linearRampToValueAtTime(f0 * 0.92, t + dur);

    /* A wing is a soft thing and the top of a sawtooth is not: without this the
     * buzz reads as a synthesiser rather than an insect. */
    var flt = c.createBiquadFilter();
    flt.type = 'lowpass';
    flt.frequency.value = cutoff;
    flt.Q.value = 0.9;

    var env = c.createGain();
    env.gain.setValueAtTime(0.0001, t);
    env.gain.exponentialRampToValueAtTime(Math.max(0.0002, gain), t + 0.02);
    env.gain.setValueAtTime(Math.max(0.0002, gain), t + dur * 0.45);
    env.gain.exponentialRampToValueAtTime(0.0001, t + dur);

    osc.connect(flt);
    flt.connect(env);
    env.connect(master);

    osc.start(t);
    osc.stop(t + dur + 0.02);
  }

  /* One swell: a slice of noise through a filter, under an envelope with no
   * attack at either end — it comes on over better than a third of its life and
   * goes off over the rest.
   *
   * `burst()` above reaches its peak in three milliseconds, which is what makes
   * a crack a crack; run a cloth sound through it and the first thing you hear
   * is a click, which is the one thing a cloth cannot do. Every sound in this
   * file before today is an EVENT — a thing letting go, or (the buzz) a thing
   * running — and an event has a moment you could point at. Friction has none.
   * Two surfaces sliding past each other is a release so finely divided in time
   * that there is no single release left in it, so the envelope is the whole
   * difference between this and a burst, and the shape of it is the sound.
   *
   * `at` / `dur` / `gain` / `type` / `freq` / `q` as in `burst()`.
   */
  function swell(c, at, dur, gain, type, freq, q) {
    var t = c.currentTime + at;

    var src = c.createBufferSource();
    src.buffer = noise;
    var maxOffset = Math.max(0, noise.duration - dur - 0.02);

    var flt = c.createBiquadFilter();
    flt.type = type;
    flt.frequency.value = freq;
    flt.Q.value = q;

    var g = Math.max(0.0002, gain);
    var env = c.createGain();
    env.gain.setValueAtTime(0.0001, t);
    env.gain.exponentialRampToValueAtTime(g, t + dur * 0.38);
    env.gain.exponentialRampToValueAtTime(0.0001, t + dur);

    src.connect(flt);
    flt.connect(env);
    env.connect(master);

    src.start(t, Math.random() * maxOffset, dur + 0.02);
    src.stop(t + dur + 0.02);
  }

  /* One call: an oscillator through a MOVING FORMANT, and then through the
   * distance.
   *
   * `tone()` above is a source with the top taken off it. This is the first
   * thing in the file with a source AND a resonator, which is what a voice
   * physically is: a membrane buzzing in a throat (broadband, harmonically
   * rich, and on its own just a rude noise), shaped on its way out by a tube
   * whose resonances move while the animal calls. That movement is the whole of
   * why a call reads as an animal rather than as a note — a fixed filter on a
   * sawtooth is an organ stop; a filter that opens and shuts is a throat.
   *
   * So the formant is a PEAKING filter and not a bandpass. A resonator does not
   * delete the bands it is not resonating at, it lifts the one it is, and a
   * bandpass here would take the fundamental out from under the call and leave
   * it thin. `fm0` → `fm1` → back is the throat opening on the stressed
   * syllable and closing again.
   *
   * `far` is the second filter and belongs to the sky rather than to the bird.
   * These are the first things here that make a sound from a long way off —
   * everything before was within arm's reach, because an arm is what reached it
   * — and distance is a lowpass: air absorbs the top of a sound before it
   * absorbs the bottom, which is why far-off things sound dull as well as
   * quiet. A goose is loud; this one is simply not nearby.
   */
  function call(c, at, dur, gain, f0, f1, fm0, fm1, far) {
    var t = c.currentTime + at;
    var g = Math.max(0.0002, gain);

    var osc = c.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(f0, t);
    osc.frequency.linearRampToValueAtTime(f1, t + dur * 0.30);
    osc.frequency.linearRampToValueAtTime(f1 * 0.88, t + dur);

    var formant = c.createBiquadFilter();
    formant.type = 'peaking';
    formant.Q.value = 1.6;
    formant.gain.value = 14;
    formant.frequency.setValueAtTime(fm0, t);
    formant.frequency.linearRampToValueAtTime(fm1, t + dur * 0.35);
    formant.frequency.linearRampToValueAtTime(fm0, t + dur);

    var air = c.createBiquadFilter();
    air.type = 'lowpass';
    air.frequency.value = far;
    air.Q.value = 0.7;

    /* A call has a bark on the front of it and a fall off the back: up in
     * eighteen milliseconds, held past the middle, then gone. */
    var env = c.createGain();
    env.gain.setValueAtTime(0.0001, t);
    env.gain.exponentialRampToValueAtTime(g, t + 0.018);
    env.gain.setValueAtTime(g, t + dur * 0.55);
    env.gain.exponentialRampToValueAtTime(0.0001, t + dur);

    osc.connect(formant);
    formant.connect(air);
    air.connect(env);
    env.connect(master);

    osc.start(t);
    osc.stop(t + dur + 0.02);
  }

  /* One mode: a sine that is given all its energy at once and spends the rest
   * of its life giving it back.
   *
   * This is the fourth shaper and the first whose envelope has NO ATTACK worth
   * the name. Every other sound in this file is something happening over time
   * and so has a rise in it — `burst()` reaches its peak in three milliseconds
   * (that rise is what makes a crack a crack), `swell()` takes better than a
   * third of its life (that absence of a moment is what makes a rustle a
   * rustle), `tone()` and `call()` each come on over a hundredth of a second
   * and hold. A STRUCK body does none of that. It receives everything it will
   * ever have in the instant of the strike and is decaying from that instant
   * on, which is why the only number here is a decay. Two milliseconds is not
   * an attack, it is the shortest a loudspeaker can honestly be asked to do; a
   * hard step to full value is a click, and a click is a different sound.
   *
   * A sine and not a sawtooth, which is the other half of it. A sawtooth is a
   * thing being driven — a wing, a throat — and carries a stack of harmonics
   * because something is still putting energy in. Nothing is putting energy
   * into a struck glass; what is left after the strike is the few shapes that
   * particular piece of glass is able to hold, each a pure tone of its own
   * frequency dying at its own rate. So a ring is not one sound with overtones.
   * It is a handful of separate notes, and `ring()` below schedules them as
   * such, which is why the upper ones are given shorter lives: a thin high mode
   * loses its energy faster than the body of the glass does. */
  function mode(c, at, dur, gain, freq) {
    var t = c.currentTime + at;
    var g = Math.max(0.0002, gain);

    var osc = c.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = freq;

    var env = c.createGain();
    env.gain.setValueAtTime(0.0001, t);
    env.gain.exponentialRampToValueAtTime(g, t + 0.002);
    env.gain.exponentialRampToValueAtTime(0.0001, t + dur);

    osc.connect(env);
    env.connect(master);

    osc.start(t);
    osc.stop(t + dur + 0.02);
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

  /* ── the stone's knock (Day 144, 2026-09-29) ──────────────────────────────
   *
   * A path stone turned over and set back down in the grass. The third sound
   * here, and deliberately the dullest of the three: a stone meeting earth is
   * a dead sound — almost all of it is low, it decays in a breath, and it has
   * no ring at all, because nothing in the collision is free to vibrate. So
   * this is a lowpass thud with a corner below the fire's, under a tail
   * shorter than the latch's, and a whisper of grit over it — the dirt that
   * came up with the stone falling back.
   *
   * The three sounds now stand in a row that says something true about the
   * three objects: the fire is loud, long and layered because a fire is a
   * large thing letting go; the latch is bright and brief because it is a
   * small machined catch; and this is quiet and flat because it is a heavy
   * dumb thing put down on soft ground. Nothing here is louder than what it
   * is (rule 3), and none of the three could be mistaken for another.
   *
   * Rule 4 is kept by the object: the stone's whole answer is its two faces
   * swapping, which a silent visitor gets in full.
   *
   * Returns the number of bursts scheduled — always 2, or 0 with no context. */
  function knock() {
    var c = context();
    if (!c) return 0;
    /* The stone. */
    burst(c, 0, 0.085, 0.42, 'lowpass', 150 + Math.random() * 30, 0.7);
    /* The grit that came up with it, landing a moment later. */
    burst(c, 0.02, 0.05, 0.09, 'bandpass', 850 + Math.random() * 450, 2.5);
    return 2;
  }

  /* ── the bench's creak (Day 145, 2026-09-30) ─────────────────────────────
   *
   * A plank on two legs taking a weight. The fourth sound here and the only one
   * of the four that is not an *event* — the fire's crack, the latch's click and
   * the stone's knock each happen and are over, where a creak is a thing that
   * goes on for as long as the load is coming on, which is what makes it sound
   * like effort rather than impact.
   *
   * The physics is stick-slip: two dry surfaces under load catch, release,
   * catch, release, a great many times a second, and each release is a tiny
   * broadband snap. So a creak is not one sound with a pitch — it is a RUN of
   * very small cracks close enough together that the ear hears their rate as a
   * pitch, and the pitch climbs because the rate climbs as the load does. That
   * is drawn here exactly: a dozen-odd bursts over a third of a second, the
   * filter walking up from 380Hz to somewhere near 900, each one a fraction of
   * the loudness of a single crack from the fire. Nothing tonal is synthesised
   * and no oscillator is used; it is the same half-second of noise as everything
   * else in this file, cut a dozen more times.
   *
   * Under the run, one soft low body at the start — the board itself bending.
   * It is well under the stone's thud (0.20 against 0.42), because a plank
   * giving a pixel is not a heavy thing landing, and the four sounds have to go
   * on saying something true about the four objects (Day 144).
   *
   * Rule 4 is kept by the object, but the balance is the reverse of the other
   * three: the bench's visible answer is one pixel of give, so the creak is the
   * loud half here and the give is the quiet one. A visitor with no audio still
   * sees the board bow and the grass darken under it, which is the whole of what
   * a bench can do; a visitor with audio hears why.
   *
   * Returns the number of bursts scheduled — 1 + the run, or 0 with no context. */
  function creak() {
    var c = context();
    if (!c) return 0;
    var n = 0;

    /* The board bending. Soft, low, no ring — it is a bow and not a blow. */
    burst(c, 0, 0.13, 0.20, 'lowpass', 210 + Math.random() * 40, 0.8);
    n++;

    /* The run. Eleven to fourteen slips, the gaps between them shortening and
     * the filter walking up, so the rate and the pitch rise together the way
     * they do as a load comes on. The last few fade out: the board has taken
     * the weight and stopped moving, which is when a real creak stops. */
    var count = 11 + Math.floor(Math.random() * 4);
    var at = 0.015;
    for (var i = 0; i < count; i++) {
      var p = i / (count - 1);                       /* 0 → 1 through the run */
      at += 0.034 - 0.016 * p + Math.random() * 0.012;
      burst(
        c,
        at,
        0.018 + Math.random() * 0.016,
        0.12 * (0.45 + 0.55 * Math.sin(Math.PI * p)), /* swells and dies */
        'bandpass',
        380 + 500 * p + Math.random() * 120,
        14 + Math.random() * 8
      );
      n++;
    }
    return n;
  }

  /* ── the bee's buzz (Day 146, 2026-10-01) ────────────────────────────────
   *
   * A bee startled off a bloom. The fifth sound here and the first that is a
   * PITCH rather than an event: the crack, the latch, the knock and the creak
   * are all things coming apart, and a wingbeat is a thing at work. So it is
   * the first sound in this file that is not cut from the noise buffer — see
   * `tone()` above for why noise cannot say it.
   *
   * Two sawtooths seven hertz apart. One alone is a tone and a tone is not a
   * bee; two close together beat against each other several times a second,
   * and that roughness is most of what the ear uses to tell an insect from a
   * note. Both start near two hundred — about where a honeybee's wing runs —
   * climb a fifth of that as she bolts, and settle back under it as she sinks.
   *
   * Loud enough to be heard and no louder: 0.085 against the stone's 0.42,
   * because a sawtooth carries far more energy than a filtered noise burst at
   * the same number, and because a bee two feet from your hand is a small
   * sound. The four before it stand in a row that says something true about
   * four objects (Day 144); this one has to stand in that row and be the
   * quietest thing in it.
   *
   * Half a second, over inside rule 2, and gone before the bee is back down.
   * Rule 4 is kept by the bed and the bee between them: the stems dip and she
   * bolts, which a silent visitor gets in full.
   *
   * Returns the number of sources started — always 2, or 0 with no context. */
  function buzz() {
    var c = context();
    if (!c) return 0;
    var f = 196 + Math.random() * 14;
    tone(c, 0,     0.52, 0.085, f,     f * 1.22,     1250);
    tone(c, 0.005, 0.50, 0.060, f + 7, (f + 7) * 1.22, 1050);
    return 2;
  }

  /* ── the cloak's rustle (Day 147, 2026-10-02) ────────────────────────────
   *
   * A hung cloth brushed on its peg. The sixth sound here and the first that is
   * neither an event nor a note — see `swell()` above for why it needed a shaper
   * of its own and could not be cut with `burst()`.
   *
   * It is also the first thing in this file built on a HIGHPASS. Every filter
   * before it is a lowpass or a bandpass, because every sound before it is a
   * body letting go and a body's resonance is low: the stone's thud sits at
   * 150Hz, the fire's prod at 190, the board's bow at 210. Cloth has no body to
   * resonate. What is actually rubbing is thousands of fibres a hair across, and
   * a thing that small can only make a small sound, so the energy is all ABOVE
   * the band everything else here lives in — which is why a rustle can sit at a
   * gain number near the stone's and still be the softest thing in the room.
   *
   * TWO BREATHS, which is the part I care about. Every other sound here says one
   * thing once: the latch clicks, the stone lands, the bee goes. A swung cloth
   * rubs on the way out and again on the way back, so there are two swells, the
   * second quieter and duller and starting at 0.30s — which is a third of the
   * 0.9s swing, where the cloth is coming back through its own hang. The ear
   * gets the shape of the motion rather than the moment of the touch, and that
   * is as near as this place has come to a sound that is about a DURATION.
   *
   * Under each swell, a soft low note of the cloth's own weight. It is barely
   * there (0.05 against the stone's 0.42) and it is what stops the whole thing
   * reading as a hiss with nothing hanging on it.
   *
   * Everything is over inside 0.56s, well under rule 2 and well inside the
   * swing it belongs to. Rule 4 is kept by the object: the cloak visibly swings
   * out and back, which a silent visitor gets in full.
   *
   * Returns the number of sources started — always 5, or 0 with no context. */
  function rustle() {
    var c = context();
    if (!c) return 0;

    /* The push. Fibres first, then the cloth's own low weight under them. */
    swell(c, 0,     0.30, 0.17,  'highpass', 2100 + Math.random() * 400, 0.6);
    swell(c, 0.015, 0.26, 0.11,  'bandpass', 1150 + Math.random() * 250, 0.9);
    swell(c, 0.01,  0.22, 0.05,  'lowpass',   320 + Math.random() * 60,  0.7);

    /* The return, a third of the swing later: quieter, and duller because the
     * cloth is moving more slowly by then. */
    swell(c, 0.30,  0.26, 0.085, 'highpass', 1800 + Math.random() * 350, 0.6);
    swell(c, 0.315, 0.22, 0.05,  'bandpass',  950 + Math.random() * 200, 0.9);

    return 5;
  }

  /* ── the skein's honk (Day 148, 2026-10-03) ──────────────────────────────
   *
   * Five geese startled out of their formation. The seventh sound here and the
   * first that is a VOICE — see `call()` above for the source-and-resonator it
   * needed and why no shaper already in this file could have made one.
   *
   * It is also the first that is BOTH noise and tone, in one breath, and that
   * is not a flourish: a voice is turbulent air driven through something that
   * vibrates, so there is a hiss of breath at the front of every call and a
   * pitch behind it. Everything here before now is one or the other — four
   * releases and a rustle cut from noise, a wingbeat built from oscillators.
   * The single short `burst` below is that breath, under the nearest bird only.
   *
   * THREE BIRDS AND NOT ONE, which is Day 32's whole argument arriving in the
   * ear. One mark in that sky read as dust and five read as geese; one honk is
   * a horn and three overlapping honks, at three pitches, out of step, are a
   * flock. The second is lower (a bigger bird) and the third higher and
   * quieter (further back down the V), and none of them starts when another
   * does — a startled skein does not call in chorus.
   *
   * Over inside half a second, well under rule 2, and gone before the five
   * have knitted back up. Rule 4 is kept by the formation itself: it visibly
   * splays and re-forms, which a silent visitor gets in full.
   *
   * Returns the number of sources started — always 4 (three oscillators and
   * one slice of noise), or 0 with no context. */
  function honk() {
    var c = context();
    if (!c) return 0;

    /* The breath, under the first call only. */
    burst(c, 0, 0.07, 0.05, 'bandpass', 900, 0.8);

    var f = 292 + Math.random() * 26;
    call(c, 0,    0.21, 0.135, f,        f * 1.18, 620, 1320, 2400);
    call(c, 0.12, 0.23, 0.105, f * 0.84, f * 1.02, 540, 1150, 2200);
    call(c, 0.30, 0.19, 0.075, f * 1.11, f * 1.26, 700, 1430, 2000);

    return 4;
  }

  /* ── the glass's ring (Day 150, 2026-10-05) ──────────────────────────────
   *
   * The small tumbler on the window's sill, tapped. The eighth sound here and
   * the exact complement of the third: Day 144 wrote of the path stone that it
   * is "a dead sound… it has no ring at all, because nothing in the collision
   * is free to vibrate." A glass is the other end of that sentence. Almost all
   * of it is free to vibrate and almost none of it is anything else, which is
   * the whole reason a tumbler is the one object in this room that answers in a
   * NOTE rather than in a noise.
   *
   * So it is the first thing in this file with a definite pitch you could sing
   * back. The bee has a pitch but she is a thing running, smeared by two
   * sawtooths beating against each other on purpose; the geese have pitch but
   * it is a voice, a source dragged through a moving throat. This is three
   * clean modes of one small hard hollow thing — see `mode()` above for why a
   * struck body needs a shaper with no attack in it.
   *
   * The partials are inharmonic and deliberately so. A string or a pipe divides
   * its length into halves and thirds, so its overtones land on whole multiples
   * and the ear fuses them into one note with a timbre. A shell does not divide
   * like that, so a glass's modes land at awkward ratios — near 2.7 and 5.2 of
   * the body here — and never quite fuse, which is exactly what tells the ear
   * *glass* rather than *flute*. Whole multiples would have made this a tin
   * whistle on a windowsill.
   *
   * THE QUIETEST PEAK IN THE FILE, at 0.048 against the stone's 0.42, and that
   * is not timidity either. A filtered noise burst spends its energy across the
   * spectrum and the ear gets a fraction of it at any one place; a sine puts
   * every bit of what it has in one band and wastes nothing, so the same number
   * would be several times louder. The row these eight sounds stand in has to
   * go on saying something true about eight objects (Day 144), and a tumbler is
   * a small thing.
   *
   * IT OUTLIVES ITS OWN MOTION, which is new here and is the day's finding.
   * 0.82 seconds against the 0.34s of `glass-ring` in inside.css: every other
   * sound in this file is over inside the gesture it belongs to, and this one
   * goes on for half a second after the glass has visibly stopped. That is not
   * a liberty — it is what a drawing one pixel wide at its smallest step cannot
   * say and a sound can. Still inside rule 2.
   *
   * Rule 4 is kept by the object: the tumbler visibly quivers where it stands,
   * which a silent visitor gets in full.
   *
   * Returns the number of sources started — always 4 (three oscillators and the
   * one slice of noise that is the strike), or 0 with no context. */
  function ring() {
    var c = context();
    if (!c) return 0;

    /* The strike itself — knuckle or nail meeting glass. Twelve milliseconds
     * of very high noise and gone: it is not part of the ring, it is the event
     * that starts it, and a ring with no strike on the front reads as a tone
     * someone faded up. */
    burst(c, 0, 0.012, 0.10, 'highpass', 4200, 0.7);

    /* The body, and two thinner modes above it that die sooner. */
    var f = 1180 + Math.random() * 90;
    mode(c, 0,      0.80, 0.048, f);
    mode(c, 0.001,  0.26, 0.028, f * 2.71);
    mode(c, 0.0015, 0.14, 0.015, f * 5.18);

    return 4;
  }

  /* Read-only, before anything else can want it. `available` is a fact about
   * the browser and not about whether a sound has ever been made; `started` is
   * true only once a context genuinely exists, which is never until a press. */
  window.CabinSound = {
    PEAK: PEAK,
    crackle: crackle,
    latch: latch,
    knock: knock,
    creak: creak,
    buzz: buzz,
    rustle: rustle,
    honk: honk,
    ring: ring,
    available: function () { return !!AC && !broken; },
    started: function () { return !!ctx; }
  };
})();
