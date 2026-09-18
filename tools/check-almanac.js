#!/usr/bin/env node
/* tools/check-almanac.js — agent-mutable.
 *
 * Day 98 (2026-08-14). Holds the almanac's sentences to the clearing.
 *
 * /almanac/ publishes what this place will do on a day nobody has reached yet.
 * Its FIGURES cannot go stale — they are asked of window.CabinSky and
 * window.CabinSeason, the very lines the yard runs on. Its SENTENCES can: each
 * one is a hand describing what a season or an hour changes in scene.css and
 * inside.css, and a later day could change a layer and never come back. That
 * made the almanac the one thing in this place able to lie without anything
 * breaking (diary 2026-08-13).
 *
 * So this goes and looks. It loads /almanac/, reads window.CabinAlmanac —
 * PROBES (where to look and what to read) and CHECKS (what the prose says the
 * reading will be) — works out every (view, season, hour) state those checks
 * need, opens each state once on the real pages, takes every measurement that
 * belongs to it, and then holds the readings against the claims.
 *
 * It keeps NO list of its own about what the clearing does. Everything it knows
 * comes off the page it is checking, which is the same arrangement the almanac
 * has with sky.js: a checker with its own copy of the expected numbers could
 * pass on a morning both it and the page were wrong.
 *
 * Day 99 (2026-08-15): the page also publishes VOWS — what this place will never
 * do, on any day — and those are held by a new kind of check, `floor` + `over`:
 * the reading must never fall below a floor in ANY state on the wheel. A reading
 * check is taken where a sentence points; a vow has to be asked everywhere, so
 * `over` is always the whole round. Nothing else here changed: the vow checks
 * arrive in the same CHECKS array off the same page, and this runner still keeps
 * no list of its own.
 *
 * Day 102 (2026-08-18): the third vow — the light never gets an address — gets a
 * witness at last, and it needed the mirror of a floor. `ceiling` + `over`: the
 * reading may never rise ABOVE a number in any state on the wheel. A floor holds
 * a vow of presence (never nothing); a ceiling holds a vow of absence (never a
 * lean). Two new probe kinds come with it: `lean`, which asks a background
 * gradient whether it runs to any side, and `mirror`, which asks a body lit by
 * box-shadow lumps whether its leftmost and rightmost lumps were lit the same
 * colour. Both answer 0 when nothing points sideways, so a ceiling of nought is
 * the whole of the claim.
 *
 * Day 103 (2026-08-19): a third kind, `lean-sweep`, and it is the one that can
 * catch something nobody thought of. The five probes above are aimed at places
 * the page chose; a sweep asks every element in a frame — and both its
 * pseudo-elements — the same question, then subtracts the list of things the
 * page names as sideways on purpose. So the reading goes above nought whenever
 * anything at all in a view leans that hasn't been declared, including things a
 * later day draws and never comes back to think about. The aimed probes stay:
 * the sweep says a frame leans, and they say where.
 *
 * Day 104 (2026-08-20): a fourth kind, `frame-balance`, and it is the first
 * witness here that reads the rendered picture rather than the CSS that drew
 * it — the far keeper's second method, sharing no code with the gradient-reader
 * above, so that the two are able to disagree. It screenshots the scene with
 * the wash on and again with it off (motion frozen so nothing else can differ),
 * and weighs the difference — the light alone, lifted off the asymmetric
 * furniture — left half against right. A wash that leans however it was drawn
 * pulls the reading off centre; an even one reads ~0. It sees only the wash,
 * not a sprite lit down one edge, which is written into the vow's blind note.
 * Since Day 130 a `frame-balance` probe says which of two scalars it takes off
 * that one pair of shots — `read: 'lean'` (as above) or `read: 'weight'`, how
 * much light there was to weigh at all — because a comparison handed two
 * identical pictures answers the same way whether nothing changed or nothing
 * was there, and the second reading is the only thing that can tell those
 * apart. See analyzeBalance.
 *
 * Day 111 (2026-08-27): a fifth kind, `hold`, and it is the first here that
 * forces no state at all. The page now publishes GIVENS — conditions of the
 * clearing rather than claims about it — and one of them is that the yard reads
 * its hour once, when you arrive, and holds it for as long as you stay. That
 * cannot be caught by standing the scene in a state and measuring it, because
 * the whole claim is about what happens between two instants. So a hold check
 * carries its own two instants and gets its own kind of visit: the page is
 * opened on a STEPPED clock (a Date shim installed before any script runs,
 * reading a mutable instant the runner can move), the reading is taken, the
 * clock is walked across a band edge, and the reading is taken again. It must
 * not have moved. And then, because a check that cannot fail is decoration
 * (Day 98), the same page is opened FRESH at the later instant and that reading
 * must differ — which is what proves the two instants really did straddle an
 * edge, and so that the first half was asking anything at all.
 *
 * Day 113 (2026-08-29): a sixth kind — not of check but of STATE. Until today
 * every reading was taken in a state the runner forced (data-season/data-tod on
 * the scene) or, for a hold, across a clock it stepped. But forcing a tag only
 * reaches what reads that tag, and the pot's bloom wheel reads the DATE: force
 * winter onto the scene and the wheel goes on turning at whatever pace this
 * morning happens to be. So a check may carry `on: { <name>: '<ISO>' }` in place
 * of `axis` + `at`, and each of its named states is a fresh visit on a clock
 * frozen to that instant, with nothing forced at all — the page reckons its own
 * season, hour and pace, exactly as it would for a visitor standing there on
 * that day. `expect`, `rising`, `falling`, `floor` and `ceiling` all work on
 * those names unchanged, because none of them ever cared what a state was.
 * A claim about a thing that reads the calendar has to be asked on the calendar.
 *
 * Day 124 (2026-09-09): `share` + `over`, which is a floor with no number of
 * mine in it — the leanest state on the wheel held against the FULLEST state of
 * the same probe, so the bar is the yard's own reading and moves when the yard
 * moves. It reuses `over` exactly as `ceiling` does, so stateNames() and
 * workNeeded() needed no branch. It exists because a floor is a sentence, and a
 * sentence can be wrong the morning it is written and green every morning
 * after: the hush vow's six floors all sat at never-nothing, which is the
 * lowest bar that vow could take, and on the hundred and fifteenth morning the
 * front bed lost its entire root with its floor of one still green. There is no
 * test for a bar set too low, the bar being the thing that is wrong; what there
 * is instead is not setting one.
 *
 * Day 118 (2026-09-03): a seventh kind, `paint-lean`, and it closes the gap the
 * Day-104 weighing wrote into the vow's blind note and Day 112 could not reach:
 * a sprite whose OWN pixels are brighter down one edge. `frame-balance` lifts
 * the wash off bare ground and so cancels such a sprite clean out; `sprite-tone`
 * does read a sprite's own pixels but returns a mean over the whole of it, and a
 * mean is exactly what a bright edge and a dark one cancel out of. It answers
 * what colour, never which side.
 *
 * The obvious instrument — weigh one sprite against its own mirror — does not
 * work, and it fails for the reason Day 104 already found one level out: the two
 * halves do not start even. A bee has a head; a mailbox has a flag on one side.
 * Measured on this yard, a single body reads as far as 0.29 with nothing at all
 * wrong with it. A lean is not a property of a thing. It is an AGREEMENT between
 * things: a light with an address lands on every body in the frame the same way,
 * and that is the only part of it a picture can honestly weigh.
 *
 * So: isolate each named body's own pixels the Day-112 way (washes lifted, one
 * shot with it standing and one with it hidden, only the pixels that differ),
 * take the Pearson correlation between a pixel's column and its brightness —
 * which is 0 for any shape painted in one flat colour, and only leaves 0 when a
 * body's bright pixels sit off its own centre of mass — and then average those
 * across the bodies WEIGHTED BY AREA, because a light falls on area and not on
 * object count. Each body is measured against itself, so no two of them are ever
 * compared and their different colours never enter; what survives the average is
 * only what they agree about.
 *
 * Day 123 (2026-09-08): an eighth kind, `exemption`, and it is the first that
 * measures a claim of the page's own rather than a thing of the clearing's. The
 * three sweeps subtract a hand-written list of the six things here that lean on
 * purpose, each with a reason beside it — and for twenty mornings nothing
 * anywhere went back to ask whether any of those reasons was still so. That is
 * not a small hole: a guard of the form "everything, minus these" is exactly as
 * honest as its minus, and a list is the one part of a witness that rots
 * silently, because a sentence goes on reading true long after the thing it is
 * about has changed.
 *
 * So every entry on that list now carries the property its reason names, and
 * this kind reads them back off the yard in the same ten states the sweeps
 * already open: is the thing still findable in the view it claims, does its
 * lean still repeat, does the bar still sit on the centre of its pane, does the
 * lamp still throw no side, do the two indoor shadows still point apart. The
 * reading is the count of exceptions that have lapsed, so a ceiling of nought
 * is the whole list still standing on its reasons. An entry with no test at all
 * counts as lapsed — an exemption nobody can check is the thing this was built
 * against, and waving it through would be the hole one layer further in.
 *
 * What it cannot do is read the reason. It holds each exception to a property,
 * and a property can hold perfectly while the reason for excusing the thing is
 * the wrong one; an exception that never belonged on the list, and has been
 * true to its own test since the morning it was written, reads green forever.
 * It catches an exception that has gone off. It does not catch one that was
 * wrong to begin with. That is in the vow's blind note beside it.
 *
 * States are forced exactly the way scripts/screenshot.js's gallery forces them
 * — set data-tod / data-season on every .scene after load, when sky.js and
 * season.js have already run and disconnected — then wait out the 1.6s washes
 * and transitions before reading anything back.
 *
 *   node tools/check-almanac.js                       # the deployed site
 *   node tools/check-almanac.js http://localhost:8000/
 *
 * Exit 0 if every claim held, 1 if any parted company with the yard (or if the
 * page could not be read at all). CI runs it as the last step of the screenshot
 * job — after the previews are committed, so a red check can never cost the
 * record a picture, and loud, because a claim the clearing no longer keeps is
 * worse than no claim.
 */
'use strict';

const { chromium } = require('playwright');

const DEFAULT_BASE = 'https://edd426.github.io/cozy_cabin_claude/';

/* The three views a probe can name. Kept here rather than on the page because
 * these are URLs — where the clearing is served — not claims about it. */
const VIEW_PATH = { home: '', around: 'around/', inside: 'inside/' };

/* Long enough for the hour/season washes and the sprig's and lantern's own
 * transitions (all 1.6s) to have finished moving. Same figure the gallery uses. */
const SETTLE_MS = 2000;

/* Phone-band viewport, so what gets measured is the layout a visitor actually
 * stands in (RULES Art VIII). Every check compares readings against each other
 * or against a count, so nothing here depends on which breakpoint is active —
 * but if one ever did, this is the one it should be true at. */
const VIEWPORT = { width: 375, height: 800 };

function launchOpts() {
  const exe = process.env.COZY_CABIN_CHROMIUM_PATH;
  return exe ? { executablePath: exe } : {};
}

const stateNames = (check) =>
  check.expect ? Object.keys(check.expect)
    : check.over ? check.over
      : check.rising || check.falling || [];

const stateFor = (check, name) =>
  check.axis === 'season'
    ? { season: name, tod: check.at.tod }
    : { season: check.at.season, tod: name };

const keyOf = (state) => state.season + '|' + state.tod;

/* Every state any check needs, and — for each — only the views that state has
 * a measurement waiting on, and only the probes waiting on it there. A page
 * load costs a few seconds and this runs on every commit, so it's worth not
 * opening the room to read the woodpile.
 *
 * Day 118: `probeNames` as well as `views`. It always cost something to measure
 * a probe in a state no sentence asks about, but with everything read off one
 * computed-style pass the something was too small to see. `paint-lean` isolates
 * every standing body in a frame one at a time, so an unasked-for state is
 * eight screenshots and a page load — and it was doing that in ten states to
 * answer about four. Returns [{ state, views: [...], probeNames: Set }]. */
function workNeeded(checks, probes) {
  const out = new Map();
  for (const check of checks) {
    // Day 113. An `on` check names dates, not tags — it forces nothing, so
    // there is no state here to visit. Its readings are gathered separately,
    // on a frozen clock, in step 2c below.
    if (check.on) continue;
    const view = probes[check.probe] && probes[check.probe].view;
    if (!view) continue;   // a check naming no probe is caught at verdict time
    for (const name of stateNames(check)) {
      const state = stateFor(check, name);
      const key = keyOf(state);
      if (!out.has(key)) {
        out.set(key, { state, views: new Set(), probeNames: new Set() });
      }
      out.get(key).views.add(view);
      out.get(key).probeNames.add(check.probe);
    }
  }
  return [...out.values()].map((w) => ({
    state: w.state, views: [...w.views], probeNames: w.probeNames,
  }));
}

/* Take every probe belonging to one view, in the browser. Returns
 * { name: number|null } — null meaning the element the prose talks about isn't
 * on the page at all, which is a failure and not a zero. */
function measureInPage({ probes, forDate }) {
  const readings = {};

  // "Showing" means the element generates boxes — getClientRects() is empty if
  // it or any ancestor is display:none, which is how both counted layers are
  // gated (the woodpile's spent logs, winter's fourth puff).
  //
  // Opacity is deliberately NOT part of this. Half the things in this clearing
  // blink: a smoke puff fades out at the top of every rise, a firefly winks on
  // its own count. Reading opacity here would make the count a fact about the
  // instant the shutter opened rather than about the season — the first run of
  // this check found exactly that, counting two puffs in every month because
  // the third happened to be mid-fade. A thing that blinks is still there.
  // Where a layer really IS gated by opacity (the fireflies, the stars) it gets
  // an `opacity` probe of its own, which is the honest way to ask that.
  const shows = (el) =>
    el.getClientRects().length > 0 && getComputedStyle(el).visibility !== 'hidden';

  // Day 102. A `to top` / `to bottom` / bare gradient runs straight up or down
  // and is not an address: a low sun is low from everywhere in the frame at
  // once. Anything with a sideways component names a side. An angle is read mod
  // 180 so `0deg` and `180deg` both count as vertical; a unit this doesn't know
  // is counted as leaning, because a witness that shrugs is worse than none.
  const sideways = (image) => {
    if (!image || image === 'none') return 0;
    const heads = image.match(/(?:repeating-)?(?:linear|radial|conic)-gradient\(\s*[^,]*/g) || [];
    let count = 0;
    for (const head of heads) {
      const open = head.indexOf('(');
      const kind = head.slice(0, open);
      const arg = head.slice(open + 1).trim().toLowerCase();

      if (kind.endsWith('conic-gradient')) { count++; continue; }

      if (kind.endsWith('radial-gradient')) {
        // Centred is even; anything placed off the horizontal centre is not.
        const at = /\bat\s+([^\s]+)/.exec(arg);
        if (at && !/^(50%|center)$/.test(at[1])) count++;
        continue;
      }

      if (arg.startsWith('to ')) {
        if (/\b(left|right)\b/.test(arg)) count++;
        continue;
      }
      const angle = /^(-?[\d.]+)(deg|rad|grad|turn)\b/.exec(arg);
      if (angle) {
        if (angle[2] !== 'deg') { count++; continue; }
        if (((parseFloat(angle[1]) % 180) + 180) % 180 !== 0) count++;
        continue;
      }
      // No direction given at all — CSS defaults to `to bottom`. Vertical.
    }
    return count;
  };

  // Day 102. Two marks on one lit body, compared. Chromium computes each
  // box-shadow layer as "<colour> <x> <y> <blur> <spread>"; take the layer
  // furthest left and the one furthest right and report how far apart in
  // colour they are, widest single channel, 0…255.
  const lumpSpread = (shadow) => {
    if (!shadow || shadow === 'none') return 0;
    const layers = [];
    let depth = 0, cur = '';
    for (const ch of shadow) {
      if (ch === '(') depth++;
      else if (ch === ')') depth--;
      if (ch === ',' && depth === 0) { layers.push(cur); cur = ''; } else cur += ch;
    }
    if (cur.trim()) layers.push(cur);

    const parsed = [];
    for (const layer of layers) {
      const colour = /rgba?\(([^)]*)\)/.exec(layer);
      if (!colour) continue;
      const offsets = layer.replace(/rgba?\([^)]*\)/, ' ').trim().split(/\s+/)
        .map(parseFloat).filter(Number.isFinite);
      if (offsets.length < 2) continue;
      const rgb = colour[1].split(/[,/\s]+/).map(parseFloat).filter(Number.isFinite);
      parsed.push({ x: offsets[0], rgb: rgb });
    }
    if (parsed.length < 2) return 0;

    let left = parsed[0], right = parsed[0];
    for (const p of parsed) {
      if (p.x < left.x) left = p;
      if (p.x > right.x) right = p;
    }
    let widest = 0;
    for (let i = 0; i < 3; i++) {
      widest = Math.max(widest, Math.abs((left.rgb[i] || 0) - (right.rgb[i] || 0)));
    }
    return widest;
  };

  for (const [name, probe] of Object.entries(probes)) {
    // Day 104. Measured Node-side (it needs two screenshots of the frame, one
    // with the wash and one without), so it is filled in by measureFrameBalance
    // after this evaluate returns rather than read from computed style here.
    if (probe.kind === 'frame-balance') continue;

    // Day 112. Same reason, opposite subtraction: `sprite-tone` needs two
    // screenshots of one sprite with the light taken off, so it too is filled
    // in Node-side after this evaluate returns.
    if (probe.kind === 'sprite-tone') continue;

    // Day 118. Same again: `paint-lean` needs one shot of the frame plus one
    // per body it isolates, so it too is filled in Node-side afterwards.
    if (probe.kind === 'paint-lean') continue;

    // Day 133. `drift` pauses every animation on the page and walks it round,
    // which is damage of the same kind the three above do — so it is taken on a
    // page of its own after this evaluate returns.
    if (probe.kind === 'drift') continue;

    // Day 111. An `attr` probe belongs to a hold check, which visits the page
    // itself on a stepped clock rather than in a forced state — so there is
    // nothing here for it, and reading it in a forced state would be a reading
    // of the forcing.
    if (probe.kind === 'attr') continue;

    // Day 113. `attr-number` is the same read with the string parsed, and it
    // IS taken here: it belongs to an `on` check, which forces nothing, and the
    // page it is read on is opened by readOn below with nothing set on it. It
    // is skipped under forcing for the same reason `attr` is.
    if (probe.kind === 'attr-number') {
      if (!forDate) continue;
      const el = document.querySelector(probe.selector);
      const raw = el && el.getAttribute(probe.attr);
      const n = raw === null || raw === undefined ? NaN : parseFloat(raw);
      readings[name] = Number.isFinite(n) ? n : null;
      continue;
    }

    if (probe.kind === 'visible-count') {
      const all = document.querySelectorAll(probe.selector);
      readings[name] = all.length === 0 ? null : [...all].filter(shows).length;
      continue;
    }

    // Day 103. The same question as `lean`, asked of the whole frame instead of
    // of a place I picked: every element under the root, both its pseudos, minus
    // the things the page names as leaning on purpose. `closest` so a thing's
    // parts come along with it. A sweep reads a total, not a maximum — two leans
    // are worse than one, and the number is the only clue to how many places to
    // go and look.
    if (probe.kind === 'lean-sweep') {
      const roots = document.querySelectorAll(probe.selector);
      if (roots.length === 0) { readings[name] = null; continue; }
      const allow = probe.allow || [];
      const excused = (el) => allow.some((a) => el.closest(a.selector));
      let total = 0;
      for (const root of roots) {
        for (const el of [root, ...root.querySelectorAll('*')]) {
          if (excused(el)) continue;
          for (const pseudo of [null, '::before', '::after']) {
            total += sideways(getComputedStyle(el, pseudo).backgroundImage);
          }
        }
      }
      readings[name] = total;
      continue;
    }

    // Day 123. The sweep above is only as honest as the list it subtracts, and
    // until this morning nothing anywhere asked whether the reasons on that
    // list were still so. This reads them back off the yard. For every
    // exemption that claims to live in this view: is it still findable here,
    // and does it still have the property its written reason names? The
    // reading is the count of the ones that have lapsed, so nought is the
    // whole list standing.
    //
    // Three ways to lapse, and all three are the same fault wearing different
    // clothes — a sentence going on excusing something after it stopped being
    // true of it:
    //   the selector finds nothing in a view the entry claims (a stale name);
    //   the entry carries no test at all (an exemption nobody can check is the
    //     very thing this was built against, so it counts as lapsed rather
    //     than being waved through);
    //   the thing is there and no longer holds what the reason says of it.
    //
    // Failure detail goes on window.__cabinExemptionNotes for the Node side to
    // print — the reading is a count, and a count tells you how many places to
    // go and look but never which.
    if (probe.kind === 'exemption') {
      const view = probe.view;
      const allow = probe.allow || [];
      const notes = [];

      // Split a computed background-image into whole gradient functions,
      // balancing parens — rgb(…) and calc(…) both carry commas, so a naive
      // split on commas cuts a gradient in half.
      const gradientsOf = (image) => {
        if (!image || image === 'none') return [];
        const out = [];
        const head = /(?:repeating-)?(?:linear|radial|conic)-gradient\(/g;
        let m;
        while ((m = head.exec(image))) {
          let depth = 0, j = m.index + m[0].length - 1;
          for (; j < image.length; j++) {
            if (image[j] === '(') depth++;
            else if (image[j] === ')') { depth--; if (depth === 0) { j++; break; } }
          }
          out.push(image.slice(m.index, j));
          head.lastIndex = j;
        }
        return out;
      };

      // One gradient's own head, same reading as `sideways` above.
      const headOf = (grad) => {
        const open = grad.indexOf('(');
        const comma = grad.indexOf(',');
        const arg = grad.slice(open + 1, comma > open ? comma : grad.length - 1);
        return { kind: grad.slice(0, open), arg: arg.trim().toLowerCase() };
      };
      const leans = (grad) => sideways(grad) > 0;

      // Which way, for a pair that must point apart: -1 leftward, +1 rightward,
      // 0 for anything with no horizontal component.
      const leanSign = (grad) => {
        const { kind, arg } = headOf(grad);
        if (!kind.endsWith('linear-gradient')) return 0;
        if (arg.startsWith('to ')) {
          if (/\bleft\b/.test(arg)) return -1;
          if (/\bright\b/.test(arg)) return 1;
          return 0;
        }
        const angle = /^(-?[\d.]+)deg\b/.exec(arg);
        if (!angle) return 0;
        const s = Math.sin((parseFloat(angle[1]) * Math.PI) / 180);
        return Math.abs(s) < 1e-6 ? 0 : Math.sign(s);
      };

      // A stop's position as a fraction of the box it is drawn on. Handles the
      // forms Chromium actually serialises — `0px`, `45%`, `calc(50% - 1px)`.
      const posFraction = (pos, w) => {
        let s = pos.trim();
        const calc = /^calc\((.*)\)$/i.exec(s);
        if (calc) s = calc[1];
        const terms = s.match(/[-+]?\s*[\d.]+(?:%|px)/g);
        if (!terms) return null;
        let f = 0;
        for (const t of terms) {
          const v = parseFloat(t.replace(/\s+/g, ''));
          if (/%\s*$/.test(t)) f += v / 100;
          else if (w > 0) f += v / w;
          else return null;
        }
        return Number.isFinite(f) ? f : null;
      };

      // Does the gradient read the same from either side of the thing's own
      // centre — same colours in reverse order, at the same distances in from
      // each edge? Anything this cannot parse reads as NOT mirrored, on the
      // standing rule that a witness which shrugs is worse than none.
      const mirrors = (grad, w) => {
        const open = grad.indexOf('(');
        const body = grad.slice(open + 1, grad.length - 1);
        const parts = [];
        let depth = 0, cur = '';
        for (const ch of body) {
          if (ch === '(') depth++;
          else if (ch === ')') depth--;
          if (ch === ',' && depth === 0) { parts.push(cur); cur = ''; } else cur += ch;
        }
        if (cur.trim()) parts.push(cur);

        const stops = [];
        for (const raw of parts) {
          const p = raw.trim();
          const m2 = /^(rgba?\([^)]*\))\s*(.*)$/i.exec(p);
          if (!m2) {
            // the direction, if it is the first part; anything else is unparsed
            if (stops.length === 0) continue;
            return false;
          }
          const f = posFraction(m2[2], w);
          if (f === null) return false;
          stops.push({ colour: m2[1].replace(/\s+/g, ''), f });
        }
        if (stops.length < 2) return false;
        for (let i = 0, n = stops.length; i < n; i++) {
          const j = n - 1 - i;
          if (stops[i].colour !== stops[j].colour) return false;
          if (Math.abs(stops[i].f - (1 - stops[j].f)) > 0.01) return false;
        }
        return true;
      };

      // Every box-shadow layer on the thing, x-offset zero: what it throws is a
      // halo and not a light with a side.
      const evenGlow = (els) => {
        for (const el of els) {
          for (const pseudo of [null, '::before', '::after']) {
            const sh = getComputedStyle(el, pseudo).boxShadow;
            if (!sh || sh === 'none') continue;
            const layers = [];
            let depth = 0, cur = '';
            for (const ch of sh) {
              if (ch === '(') depth++;
              else if (ch === ')') depth--;
              if (ch === ',' && depth === 0) { layers.push(cur); cur = ''; } else cur += ch;
            }
            if (cur.trim()) layers.push(cur);
            for (const layer of layers) {
              const nums = layer.replace(/rgba?\([^)]*\)/g, ' ').trim()
                .split(/\s+/).map(parseFloat).filter(Number.isFinite);
              if (nums.length && Math.abs(nums[0]) > 0.01) return false;
            }
          }
        }
        return true;
      };

      // Everything the selector covers: the matched elements and their parts,
      // since `closest` is what excuses them in the sweep.
      const subtree = (sel) => {
        const out = [];
        for (const el of document.querySelectorAll(sel)) {
          out.push(el, ...el.querySelectorAll('*'));
        }
        return out;
      };

      // Every leaning gradient under a selector, with the box it is drawn on.
      const leansUnder = (sel) => {
        const found = [];
        for (const el of subtree(sel)) {
          for (const pseudo of [null, '::before', '::after']) {
            const cs = getComputedStyle(el, pseudo);
            const w = parseFloat(cs.width);
            for (const grad of gradientsOf(cs.backgroundImage)) {
              if (leans(grad)) found.push({ grad, w: Number.isFinite(w) ? w : 0 });
            }
          }
        }
        return found;
      };

      const signUnder = (sel) => {
        let total = 0;
        for (const { grad } of leansUnder(sel)) total += leanSign(grad);
        return total;
      };

      let lapsed = 0, asked = 0;
      for (const entry of allow) {
        if (!entry.where || entry.where.indexOf(view) === -1) continue;
        asked++;
        if (!entry.holds || !entry.holds.length) {
          lapsed++; notes.push(`${entry.selector}: no test written for its reason`);
          continue;
        }
        const els = document.querySelectorAll(entry.selector);
        if (els.length === 0) {
          lapsed++; notes.push(`${entry.selector}: claims this view and is not in it`);
          continue;
        }

        const wants = entry.holds;
        const gradientTests = wants.filter((h) => h === 'repeats' || h === 'mirrors');
        let ok = true;

        if (gradientTests.length) {
          const found = leansUnder(entry.selector);
          if (found.length === 0) {
            ok = false;
            notes.push(`${entry.selector}: nothing here leans any more — the exception excuses nothing`);
          }
          for (const { grad, w } of found) {
            const passes = gradientTests.some((h) =>
              h === 'repeats' ? /^repeating-/.test(grad) : mirrors(grad, w));
            if (!passes) {
              ok = false;
              notes.push(`${entry.selector}: a lean here is neither ${gradientTests.join(' nor ')} — ${grad.slice(0, 70)}`);
              break;
            }
          }
        }

        if (wants.indexOf('even-glow') !== -1 && !evenGlow(subtree(entry.selector))) {
          ok = false;
          notes.push(`${entry.selector}: what it throws now has a side to it`);
        }

        if (wants.indexOf('opposed') !== -1) {
          const mine = signUnder(entry.selector);
          const theirs = entry.against ? signUnder(entry.against) : 0;
          if (mine === 0 || theirs === 0 || mine * theirs > 0) {
            ok = false;
            notes.push(`${entry.selector}: no longer points away from ${entry.against || '(nothing named)'} ` +
                       `(${mine} against ${theirs})`);
          }
        }

        if (!ok) lapsed++;
      }

      // Day 130. "Every exception claimed for this view still holds" said over
      // NO exceptions is the same vacuity the weighing had: a nought that means
      // nothing was asked, wearing the face of a nought that means nothing was
      // wrong. The day's survey found this one; Day 129's question had only
      // guessed at the weighing. The sweeps would go red if the whole list
      // vanished — the six deliberate leans would stop being subtracted — but
      // this check's own sentence would go on reading green, and a sentence
      // that cannot go red is not a witness. So: a missing reading.
      if (asked === 0) {
        notes.push('no exception on the list claims this view at all — ' +
                   'nothing was asked, which is not the same as nothing being wrong');
      }
      window.__cabinExemptionNotes = window.__cabinExemptionNotes || {};
      window.__cabinExemptionNotes[name] = notes;
      readings[name] = asked === 0 ? null : lapsed;
      continue;
    }

    // These two walk every element the selector matches — the washes are one
    // apiece, but there are four hills and two clouds, and a lean on any one of
    // them is a lean. Nothing matching at all is `null`: an absent layer can't
    // be checked for a direction, and silently reading 0 would be a pass for a
    // thing that isn't there.
    if (probe.kind === 'lean' || probe.kind === 'mirror') {
      const all = document.querySelectorAll(probe.selector);
      if (all.length === 0) { readings[name] = null; continue; }
      let worst = 0;
      for (const el of all) {
        const cs = getComputedStyle(el, probe.pseudo || undefined);
        worst = probe.kind === 'lean'
          ? worst + sideways(cs.backgroundImage)
          : Math.max(worst, lumpSpread(cs.boxShadow));
      }
      readings[name] = worst;
      continue;
    }

    const el = document.querySelector(probe.selector);
    if (!el) { readings[name] = null; continue; }
    const cs = getComputedStyle(el, probe.pseudo || undefined);

    if (probe.kind === 'opacity') {
      readings[name] = parseFloat(cs.opacity);
    } else if (probe.kind === 'glowing') {
      readings[name] = cs.boxShadow && cs.boxShadow !== 'none' ? 1 : 0;
    } else if (probe.kind === 'width' || probe.kind === 'height') {
      const px = parseFloat(cs[probe.kind]);
      readings[name] = Number.isFinite(px) ? px : null;
    } else if (probe.kind === 'duration') {
      // Day 127. Seconds, off the real computed longhand — so this reads the
      // pace the element is ACTUALLY running at, not merely the var behind it.
      const s = parseFloat(cs.animationDuration);
      readings[name] = Number.isFinite(s) ? s : null;
    } else if (probe.kind === 'css-var') {
      // Day 127. One custom property, as a number. The weakest kind here and
      // deliberately the last resort: see the note beside it in almanac.js.
      const v = parseFloat(cs.getPropertyValue(probe.prop));
      readings[name] = Number.isFinite(v) ? v : null;
    } else {
      readings[name] = null;   // an unknown kind is a fault, not a pass
    }
  }
  return readings;
}

/* Day 104. The second method the far keeper models — one that shares no code
 * with the gradient-reader above. It does not ask a wash which way it was
 * written; it weighs the rendered picture and asks which way it came out.
 *
 * The trick is that the frame is not symmetric to begin with — the mailbox is
 * off to the right, the flowers at the left foot of the wall — so weighing its
 * two raw halves would measure the furniture, not the light. Even the *change*
 * the wash makes over the real scene is furniture-tinged: a flat tint laid over
 * a dark cabin and a bright sky darkens and lightens them by different amounts,
 * so the difference still carries the shape of what it lay over. So the frame is
 * emptied first — every child of the scene hidden and its ground set to a flat
 * neutral field — and only then are the two shots taken: the wash over bare
 * ground, then the bare ground alone. What is left in the difference is nothing
 * but the wash's own horizontal profile, lifted clean off the furniture, which
 * is the only honest way to weigh whether the *light* leans rather than the
 * room. Motion and transitions are frozen first so nothing else can differ
 * between the two shots and forge a lean.
 *
 * Then: a browser decodes both PNGs (createImageBitmap — no Node image library),
 * takes the per-column sum of the luma difference, and reports the horizontal
 * centroid's distance from the middle, doubled to [0,1]. A wash that falls
 * evenly is horizontally uniform, so its centroid sits dead centre and this
 * reads ~0; a wash that leans any way at all — however it was drawn, by a
 * sideways gradient the reader would parse or by a mask or filter it would not —
 * pulls the centroid off centre and this reads well above the ceiling. It sees
 * only the wash, because the wash is what toggling the pseudo-elements removes;
 * a sprite lit brighter down one edge stands identically in both shots and
 * cancels, so it is outside even this. That limit is written into the vow's
 * `blind` note on the page.
 *
 * Day 130 (2026-09-15): it returns TWO numbers off the one pair of shots, and
 * the second is the first one's premise.
 *
 *   lean   — as above: how far off centre the added light weighs, 0…1.
 *   weight — how much light there was to weigh: the mean luma the wash added
 *            per pixel of the frame.
 *
 * A weighing is a comparison, and a comparison handed two identical pictures
 * cannot tell "nothing changed" from "nothing was there" — it reports the same
 * reassuring answer either way. That is the one failure a comparison cannot
 * tell from success, because success looks exactly like it. `lean` alone had no
 * way to say which it had met; the pair does. `weight` is a per-pixel mean, so
 * it does not ride the viewport, and it is 0 exactly when the difference was
 * empty — which is why the page holds it to a floor beside every ceiling on the
 * lean. The ceiling says the light does not lean; the floor beside it says
 * there was a light there not to lean. */
async function analyzeBalance({ withWash, noWash }) {
  const decode = async (b64) => {
    const bin = atob(b64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    const bmp = await createImageBitmap(new Blob([bytes], { type: 'image/png' }));
    const canvas = document.createElement('canvas');
    canvas.width = bmp.width;
    canvas.height = bmp.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(bmp, 0, 0);
    return ctx.getImageData(0, 0, bmp.width, bmp.height);
  };

  const A = await decode(withWash);
  const B = await decode(noWash);
  const w = Math.min(A.width, B.width);
  const h = Math.min(A.height, B.height);
  if (w === 0 || h === 0) return null;

  const cols = new Array(w).fill(0);
  let total = 0;
  const da = A.data, db = B.data;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const ia = (y * A.width + x) * 4;
      const ib = (y * B.width + x) * 4;
      const la = 0.299 * da[ia] + 0.587 * da[ia + 1] + 0.114 * da[ia + 2];
      const lb = 0.299 * db[ib] + 0.587 * db[ib + 1] + 0.114 * db[ib + 2];
      const d = Math.abs(la - lb);
      cols[x] += d;
      total += d;
    }
  }

  // `weight` is how much light there was to weigh at all: the mean luma the
  // wash added per pixel of the frame. It is a per-pixel mean, so it does not
  // ride the viewport, and it is 0 exactly when the two pictures were the same.
  // Rounded to three places only so the report reads — the floor it is held to
  // is 1, and this yard's faintest wash weighs 2.7.
  const weight = Math.round((total / (w * h)) * 1000) / 1000;

  // Day 130. Two identical pictures mean NOTHING WAS LIFTED, and a lean is not
  // a thing that can be read off nothing. This used to return 0 here — a
  // perfect pass — under a comment claiming the plain middle of a day at the
  // home season draws no wash. That was simply wrong: `.scene[data-season=
  // "summer"]::before` is a rule like the other three, so every state this is
  // ever asked about does have light in it and this branch had never once run.
  // It was a reassuring answer waiting for the day something silently lifted
  // the light before the weighing got to it — and then it would have reported a
  // perfectly even frame in every state, green forever and for nothing (diary
  // 2026-09-14). A missing reading, then, like every other kind here.
  if (total <= 0) return { lean: null, weight: 0 };

  let weighted = 0;
  for (let x = 0; x < w; x++) weighted += (x + 0.5) * cols[x];
  const centroid = weighted / total / w;        // in [0, 1]
  return { lean: Math.abs(centroid - 0.5) * 2,  // 0 = dead centre, 1 = all one edge
           weight };
}

async function measureFrameBalance(page, probe) {
  const scene = page.locator(probe.selector).first();
  if ((await scene.count()) === 0) return null;

  // Freeze motion AND transitions: the wash pseudo-elements fade over 1.6s, so
  // without this the wash-off shot below would catch them mid-fade. Frozen, the
  // opacity change is instant and the two shots differ only by the wash.
  await page.addStyleTag({
    content: '*, *::before, *::after { animation: none !important; transition: none !important; }',
  });

  // Empty the frame: hide every child (the sky, the cabin, the mailbox — all the
  // asymmetric furniture) and lay a flat neutral ground, so the wash below sits
  // over a uniform field and its horizontal profile is all that can survive the
  // difference. The ::before/::after washes are the scene's own pseudo-elements,
  // not children, so `> *` leaves them standing.
  const sceneSel = probe.selector || '.scene';
  await page.addStyleTag({
    content: sceneSel + ' > * { visibility: hidden !important; } '
      + sceneSel + ' { background: #808080 !important; }',
  });
  await page.waitForTimeout(150);
  const withWash = (await scene.screenshot()).toString('base64');

  // Turn off only the scene's own two overlay pseudo-elements — the hour wash
  // (::after) and the year wash (::before) — leaving the flat ground alone.
  const washSel = probe.washSelector || sceneSel + '::before, ' + sceneSel + '::after';
  await page.addStyleTag({ content: washSel + ' { opacity: 0 !important; }' });
  await page.waitForTimeout(150);
  const noWash = (await scene.screenshot()).toString('base64');

  // { lean, weight } — see analyzeBalance. Both come off this one pair of shots,
  // so a probe asking for the weight costs no extra page and no extra picture.
  return await page.evaluate(analyzeBalance, { withWash, noWash });
}

/* Day 112. The Day-104 weighing turned around.
 *
 * `analyzeBalance` above empties the frame so it can weigh the light on bare
 * ground. This empties the *light* so it can weigh one sprite's own paint. Two
 * shots of the same frame with the washes already off — one with the sprite
 * standing, one with it hidden — and only the pixels that actually differ
 * between them are read, so the reading is the sprite's colour and never the
 * grass behind it or the sky above it. Everything unchanged cancels, which is
 * the same trick from the other end.
 *
 * The scalar is deliberately one number, and which one is the probe's to say:
 *   warmth     — mean red minus mean blue, the gold-against-cool axis every
 *                season claim in this place runs on.
 *   saturation — mean (max channel − min channel), how far from grey a thing
 *                stands, which is what a hush actually is.
 * Both are in [−255, 255] and neither depends on the layout scale, so unlike a
 * width they could honestly be stated outright — but the prose only ever claims
 * a direction ("warmer", "drained"), so the checks only ever compare them. */
async function analyzeSpriteTone({ withSprite, noSprite, channel }) {
  const decode = async (b64) => {
    const bin = atob(b64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    const bmp = await createImageBitmap(new Blob([bytes], { type: 'image/png' }));
    const canvas = document.createElement('canvas');
    canvas.width = bmp.width;
    canvas.height = bmp.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(bmp, 0, 0);
    return ctx.getImageData(0, 0, bmp.width, bmp.height);
  };

  const A = await decode(withSprite);
  const B = await decode(noSprite);
  const w = Math.min(A.width, B.width);
  const h = Math.min(A.height, B.height);
  if (w === 0 || h === 0) return null;

  // A pixel counts as the sprite's if hiding the sprite changed it a lot.
  //
  // The threshold has to be well clear of zero, and finding out why cost the
  // afternoon. At 6 the reading came back bimodal — the same state, same page,
  // fresh loads, flipping between exactly two values a third of a unit apart —
  // because a single half-covered edge pixel sat right on the boundary and fell
  // in or out depending on how the layout rounded that morning. Raising the bar
  // is not a fudge for that: a pixel the sprite only half covers is half grass,
  // and reading it as the sprite's own colour was the error. A flower pixel and
  // the meadow behind it are a hundred apart, so 24 keeps every solid pixel of
  // the sprite and drops the antialiased rim, which is the honest set anyway.
  const THRESHOLD = 24;
  let n = 0, sum = 0;
  const da = A.data, db = B.data;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const ia = (y * A.width + x) * 4;
      const ib = (y * B.width + x) * 4;
      const dr = Math.abs(da[ia] - db[ib]);
      const dg = Math.abs(da[ia + 1] - db[ib + 1]);
      const dbl = Math.abs(da[ia + 2] - db[ib + 2]);
      if (dr + dg + dbl < THRESHOLD) continue;
      const r = da[ia], g = da[ia + 1], b = da[ia + 2];
      n++;
      if (channel === 'saturation') {
        sum += Math.max(r, g, b) - Math.min(r, g, b);
      } else {
        sum += r - b;
      }
    }
  }
  // Nothing differed: the sprite isn't painting anything. That is a missing
  // reading, not a zero — the same distinction the counts make.
  if (n === 0) return null;
  return sum / n;
}

/* The pair of shots one or more `sprite-tone` probes read. Returned rather than
 * analysed here because two probes over the same sprite (the patch's warmth and
 * the patch's distance from grey) differ only in which scalar they take, and
 * taking the same two pictures twice would be waste, not rigour.
 *
 * This runs on a page of its own — see readState. Both Node-side witnesses
 * work by wrecking the page (this one turns the washes off; frame-balance hides
 * every sprite and lays a flat grey ground), so if they shared one, whichever
 * went second would be reading the other's damage. The order that bites is the
 * quiet one: with the washes already off, frame-balance's wash-on shot has no
 * wash in it, its difference is nothing, and it reports a perfectly balanced
 * light in every state — green forever, and for no reason. */
async function spriteShots(page, probe) {
  const frame = page.locator(probe.selector).first();
  if ((await frame.count()) === 0) return null;

  // Freeze motion and transitions before anything else: the blooms breathe
  // their petals in and out on a nine-second clock, so without this the two
  // shots below could differ by a petal as well as by the sprite, and pixels
  // that moved would be counted as the sprite's own.
  await page.addStyleTag({
    content: '*, *::before, *::after { animation: none !important; transition: none !important; }',
  });

  // Take the light off. The two washes are the scene's own pseudo-elements —
  // the hour's (::after) and the year's (::before) — and they lie over every
  // sprite in the frame. Read a bloom through them and the answer is mostly the
  // veil: in the winter frame the flowers read violet and it is the wash, not
  // the flower (diary 2026-08-28).
  const sceneSel = probe.selector || '.scene';
  const washSel = probe.washSelector || sceneSel + '::before, ' + sceneSel + '::after';
  await page.addStyleTag({ content: washSel + ' { opacity: 0 !important; }' });
  await page.waitForTimeout(150);
  const withSprite = (await frame.screenshot()).toString('base64');

  await page.addStyleTag({
    content: probe.of + ' { visibility: hidden !important; }',
  });
  await page.waitForTimeout(150);
  const noSprite = (await frame.screenshot()).toString('base64');

  return { withSprite, noSprite };
}

/* Day 118. One body's own paint, asked which side of itself it is brightest on.
 *
 * The pixel set is found exactly as `analyzeSpriteTone` finds it — the same two
 * shots with the washes already lifted, the same THRESHOLD of 24, so the same
 * honest set: every solid pixel of the body, and none of the half-covered rim,
 * which is half grass and was never the body's colour to begin with.
 *
 * What is taken off it is different. `analyzeSpriteTone` returns a mean, which
 * is deaf to which side anything sits on. This returns the Pearson correlation
 * between a pixel's column and its brightness:
 *
 *   r = 0   the body's bright pixels sit on its own centre of mass. TRUE OF ANY
 *           SHAPE PAINTED IN ONE FLAT COLOUR — the statistic is centred on the
 *           body's own mass, so its outline never enters. A boot-shaped thing
 *           and a square read alike if they are one colour.
 *   r > 0   it gets brighter toward the right; r < 0, toward the left.
 *   |r| = 1 brightness runs perfectly with width.
 *
 * Dimensionless, bounded, and free of the layout scale — so unlike a width it
 * could be stated outright, and the check does state it, as a ceiling.
 */
async function analyzePaintLean({ withSprite, noSprite }) {
  const decode = async (b64) => {
    const bin = atob(b64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    const bmp = await createImageBitmap(new Blob([bytes], { type: 'image/png' }));
    const canvas = document.createElement('canvas');
    canvas.width = bmp.width;
    canvas.height = bmp.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(bmp, 0, 0);
    return ctx.getImageData(0, 0, bmp.width, bmp.height);
  };

  const A = await decode(withSprite);
  const B = await decode(noSprite);
  const w = Math.min(A.width, B.width);
  const h = Math.min(A.height, B.height);
  if (w === 0 || h === 0) return null;

  const THRESHOLD = 24;
  let n = 0, sx = 0, sxx = 0, sl = 0, sll = 0, sxl = 0;
  const da = A.data, db = B.data;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const ia = (y * A.width + x) * 4;
      const ib = (y * B.width + x) * 4;
      const d = Math.abs(da[ia] - db[ib])
              + Math.abs(da[ia + 1] - db[ib + 1])
              + Math.abs(da[ia + 2] - db[ib + 2]);
      if (d < THRESHOLD) continue;
      const L = 0.299 * da[ia] + 0.587 * da[ia + 1] + 0.114 * da[ia + 2];
      n++; sx += x; sxx += x * x; sl += L; sll += L * L; sxl += x * L;
    }
  }
  // Too little of it showing to say anything. A missing reading, not a zero —
  // the same distinction the counts and the tones make.
  if (n < 20) return null;

  const vx = n * sxx - sx * sx;
  const vl = n * sll - sl * sl;
  // Painted in one flat colour, or one pixel wide: nothing varies, so nothing
  // can run with anything. That is an honest 0 and not a missing reading.
  if (vx <= 0 || vl <= 0) return { n, r: 0 };
  return { n, r: (n * sxl - sx * sl) / Math.sqrt(vx * vl) };
}

/* The whole of one `paint-lean` reading: every body in `probe.of`, isolated in
 * turn on one page, and the area-weighted mean of their correlations.
 *
 * Weighted by area on purpose. A light with an address lands on area — a broad
 * plank wall is where a raking one would be plainest — while object count is an
 * artefact of how the markup happens to group things. Unweighted, four small
 * quirky bodies would outvote the cabin they stand against; weighted, this yard
 * reads a tenth of what the same yard reads with a lean painted into it.
 *
 * Returns { reading, parts } — the reading is |weighted mean| × 1000, rounded,
 * so the ceiling is an integer and not a row of leading zeroes. `parts` is for
 * the progress line: when this goes red, the number alone would say a frame
 * leans and not which body does. */
async function measurePaintLean(page, probe) {
  const frame = page.locator(probe.selector).first();
  if ((await frame.count()) === 0) return null;

  // Freeze motion and transitions first, or a bloom breathing between two shots
  // would be counted as part of the body it sits in front of.
  await page.addStyleTag({
    content: '*, *::before, *::after { animation: none !important; transition: none !important; }',
  });

  // Take the light off, or every body is read through the same veil and they
  // would agree about the veil rather than about themselves (diary 2026-08-28).
  const sceneSel = probe.selector || '.scene';
  const washSel = probe.washSelector || sceneSel + '::before, ' + sceneSel + '::after';
  await page.addStyleTag({ content: washSel + ' { opacity: 0 !important; }' });
  await page.waitForTimeout(150);
  const withSprite = (await frame.screenshot()).toString('base64');

  const setHidden = (sel, hidden) => page.evaluate(({ sel, hidden }) => {
    for (const el of document.querySelectorAll(sel)) {
      if (hidden) el.style.setProperty('visibility', 'hidden', 'important');
      else el.style.removeProperty('visibility');
    }
  }, { sel, hidden });

  let num = 0, den = 0, lost = 0;
  const parts = [];
  for (const sel of probe.of || []) {
    await setHidden(sel, true);
    await page.waitForTimeout(120);
    const noSprite = (await frame.screenshot()).toString('base64');
    await setHidden(sel, false);
    const got = await page.evaluate(analyzePaintLean, { withSprite, noSprite });
    if (got) {
      num += got.n * got.r;
      den += got.n;
      parts.push(`${sel} ${got.r.toFixed(3)}`);
    } else {
      lost++;
      parts.push(`${sel} NOT FOUND`);
    }
  }
  // A named body that hiding does not change is a body that is not there — a
  // renamed class, a layer some later day took out. Averaging over the rest
  // would go on reading green off a list quietly gone stale, which is the exact
  // shape of fault this witness was built for. So it is a missing reading, and
  // the check says so: the same rule the counts and the leans already keep.
  if (lost > 0 || den === 0) return { reading: null, parts };
  return { reading: Math.round(Math.abs(num / den) * 1000), parts };
}

/* Day 133 — which way the yard's one wind blows, taken off the moving picture.
 *
 * The fault this exists for was a NAME. From Day 60 to Day 132 every margin in
 * this place called the clearing's one wind an east wind, and the word was
 * wrong from the morning it was first written: work the front frame against the
 * map — north up, this viewpoint south of the cabin looking north — and the
 * frame's right hand is east, and every loose thing on that face departs its
 * rest rightward. Carried east is a wind out of the WEST. Nothing in the yard
 * had to move; only the sentence did. Which is exactly the shape of fault Day
 * 123 and Day 132 both ended on and neither could hold: a reason that was never
 * true, green every morning because nothing ever read it against the thing it
 * was about. The answer is not a cleverer guard. It is to stop asserting the
 * sentence and derive it — the same move Day 124 made when it pulled the vows'
 * chosen bars out and let the yard's own fullest month set them.
 *
 * The yard makes TWO claims about its loose things and they are not the same
 * claim, so a layer says which of them it is making.
 *
 *   claim: 'lean' (the default) — the thing is HELD OUT by the wind, so it may
 *     not rock back past its own rest. That is the flag's note (Day 60), the
 *     crowns' (Day 63) and the smoke's (Day 61). Measured as one-sidedness: the
 *     side of rest every sample falls on.
 *
 *   claim: 'net' — the thing is IN FREE FALL, held by nothing, so its swing is
 *     its own and it may cross upwind of itself as often as it likes; what the
 *     wind owns is only where it ENDS. That is Day 116 in as many words. So a
 *     leaf is measured on its net travel across its visible life, from the
 *     instant it lets go to the last frame before it thins out.
 *
 * Getting that distinction wrong is not hypothetical: the first honest run of
 * this witness reported three agreeing layers out front in autumn where the
 * check wanted four, because `leaf-fall-2` dips to 12.2% from a start of 13.5%
 * before finishing at 18.4%. The leaf was right and the reading was too strict.
 *
 * The tolerance on a net reading is RELATIVE — a quarter of that same leaf's
 * own widest swing, floored at the sub-pixel noise bar. An absolute one cannot
 * work here, because a phase grid never lands exactly on a leaf's settle frame
 * and a door-side leaf that honestly returns to its column comes back a fraction
 * of a pixel short of it. A quarter of the swing is the honest question anyway:
 * is what it has left at the end small against how far it went on the way.
 *
 * It reads the RENDERED box and not the transform, because the four layers do
 * not move alike: the smoke and the clouds translate, the falling leaves
 * animate `left` in per cent, and the crowns skew. A reading that understood
 * only one of those would be Day 103's fault again — a guard that can parse one
 * way of drawing a thing and walks past every other. `getBoundingClientRect`
 * costs a forced layout per sample and does not care how the movement was
 * written. The centre of that box is the point tracked, because a skew leaves
 * one edge of a box where it was and carries the other.
 *
 * Phase is set with `Animation.currentTime`, never with `animation-delay`
 * (Day 108: a delay only offsets from wherever the page had already got to).
 * `currentTime` INCLUDES the delay, so landing at iteration progress p means
 * `delay + duration * (1 + p)` — the `1 +` puts it safely inside the second
 * iteration (Day 122). Every animation on the page is paused first so nothing
 * else moves between samples.
 *
 * Four numbers off the one walk:
 *
 *   downwind  — layers whose every element goes to the frame's right only
 *   upwind    — layers whose every element goes to its left only
 *   moving    — layers that shift horizontally at all
 *   returning — `net` layers whose every element finishes where it let go
 *
 * `moving` is the premise, and it is Day 130's lesson: a count of nought
 * leaning things reads identically on a face where nothing moves, so the door
 * side is asked both. `returning` is what finally holds the door face's own
 * claim — that each leaf there finishes in the very column it let go from —
 * which Day 122 wrote down in the check's own words as held by nothing here,
 * on the grounds that every reading this place takes is a count or a width and
 * none of them can see a path. A net displacement is not a path either, but it
 * is the end of one, and the end is the whole of what that sentence claims.
 *
 * A listed selector matching nothing is NOT a failure here, because two of the
 * four layers are season-gated on purpose (the leaves are autumn's, and winter
 * adds a fourth smoke puff). What catches a layer that has quietly gone — the
 * Day-118 addendum's renamed class — is that the checks state the count
 * outright per season, so a layer falling out of the list drops the number and
 * turns the line red.
 *
 * Blind, and written here beside it: it sees only what ANIMATES. The mailbox
 * flag is the thing anybody would name first as this yard's wind-teller, and
 * its keyframes rotate it about the staff, so what its motion does is lift the
 * free tip; which way it streams is in its drawn geometry and nothing here can
 * read that. And a `net` reading is two instants, not a path — a leaf could
 * take any route at all between letting go and arriving, and this would say the
 * same thing about it. */

const DRIFT_PHASES = 24;      // samples across one round of each layer
const DRIFT_TOL_PX = 0.25;    // below this a shift is sub-pixel noise, not a lean

async function measureDrift(page, probe) {
  return await page.evaluate(({ selectors, phases, tol }) => {
    // Everything on the page stops, so nothing but the layer under the sample
    // can move between one reading and the next.
    for (const a of document.getAnimations()) {
      try { a.pause(); } catch (e) { /* a finished transition may refuse */ }
    }

    // Where the element's own box sits, horizontally, right now.
    const centreX = (el) => {
      const r = el.getBoundingClientRect();
      return (r.left + r.right) / 2;
    };

    // Only a frame the thing is actually visible in counts toward where it
    // finishes: every leaf's keyframes step back to the top of the crown while
    // transparent, and that step is not a journey anything took.
    const showing = (el) => parseFloat(getComputedStyle(el).opacity) > 0.5;

    const parts = [];
    let downwind = 0, upwind = 0, moving = 0, returning = 0;

    for (const layer of selectors) {
      const sel = typeof layer === 'string' ? layer : layer.sel;
      const claim = (typeof layer === 'string' ? 'lean' : layer.claim) || 'lean';

      // A display:none element (winter's fourth puff out of winter) generates
      // no boxes and is honestly absent, exactly as every count here treats it.
      const els = Array.from(document.querySelectorAll(sel))
        .filter((el) => el.getClientRects().length > 0);

      if (els.length === 0) { parts.push(sel + ': absent'); continue; }

      const verdicts = [];
      for (const el of els) {
        const anims = el.getAnimations()
          .filter((a) => typeof a.animationName === 'string');
        if (anims.length === 0) { verdicts.push('still'); continue; }

        const seek = (p) => {
          for (const a of anims) {
            const t = a.effect.getComputedTiming();
            // currentTime includes the delay, and the `1 +` lands safely inside
            // the second iteration rather than on the boundary (Day 122).
            a.currentTime = (t.delay || 0) + t.duration * (1 + p);
          }
        };

        seek(0);                       // iteration progress 0 — the rest frame
        const x0 = centreX(el);
        let lo = 0, hi = 0, last = 0;
        for (let i = 1; i < phases; i++) {
          seek(i / phases);
          const d = centreX(el) - x0;
          if (d > hi) hi = d;
          if (d < lo) lo = d;
          if (claim === 'net' && showing(el)) last = d;
        }

        if (claim === 'net') {
          // Relative bar: a quarter of this element's own widest swing, never
          // below the sub-pixel floor. See the note above for why absolute
          // cannot work when a phase grid never lands on the settle frame.
          const bar = Math.max(tol, 0.25 * Math.max(hi, -lo));
          if (last > bar) verdicts.push('right');
          else if (last < -bar) verdicts.push('left');
          else verdicts.push('returns');
        } else if (hi > tol && lo < -tol) verdicts.push('both');
        else if (hi > tol) verdicts.push('right');
        else if (lo < -tol) verdicts.push('left');
        else verdicts.push('still');
      }

      const all = (v) => verdicts.every((x) => x === v);
      if (verdicts.some((v) => v !== 'still')) moving++;
      if (all('right')) { downwind++; parts.push(sel + ': right'); }
      else if (all('left')) { upwind++; parts.push(sel + ': left'); }
      else if (all('returns')) { returning++; parts.push(sel + ': returns'); }
      else if (all('still')) parts.push(sel + ': still');
      else parts.push(sel + ': ' + verdicts.join('/'));
    }

    return { downwind, upwind, moving, returning, parts };
  }, {
    selectors: probe.of,
    phases: DRIFT_PHASES,
    tol: DRIFT_TOL_PX,
  });
}

/* ------------------------------------------------------------------------ *
 * Day 131 — the seal a page carries, and what a witness says when it is
 * handed not nothing but another witness's damage.
 *
 * Three of the readings above work by WRECKING the page they read.
 * `measureFrameBalance` hides every child of the frame, lays a flat grey ground
 * and lifts the two washes; `spriteShots` lifts the washes and hides one named
 * body; `measurePaintLean` lifts the washes and hides each of a list in turn.
 * None of them puts the page back. So which of them may share a page and which
 * needs one of its own has been, since Day 112, a fact about the shape of
 * readState below — three loops in a chosen order, each with a comment saying
 * why. That is a hand-written list, and Day 123 found out what is wrong with
 * one while holding a different list of six: what makes it dangerous was never
 * that a hand wrote it, it is that nothing after the hand ever asks whether it
 * is still so.
 *
 * Day 130 asked each witness what it says when handed nothing, and each of
 * these three now answers a missing reading rather than a number — so the loud
 * half of this fault is already held. What is not held is the PARTIAL overlap,
 * and there is a real one on this yard. `door-plant-tone` hides
 * `.door-plant__foliage`; `door-paint-lean` isolates `.door-plant`, which
 * CONTAINS that foliage. Let the two share a page and the second still finds
 * pixels to read — the pot, without the plant in it — so it hands back a
 * plausible number rather than nothing at all.
 *
 * Measured, with the lean loop deliberately reusing the tone group's page:
 * `.door-plant` reads -0.313 where it honestly reads -0.161, `door-paint-lean`
 * reads 15 against its ceiling of 60, and the check HELD in all four seasons.
 * On the same broken run `home-paint-lean` went BROKE in all four — because
 * there the hidden `.flower` is the whole of the listed `.sprite--flowers`, so
 * it came back NOT FOUND. One shared page, two faults, and only the
 * total-overlap one was visible. The one that matters is the other.
 *
 * So the page carries a seal: a short reading of exactly the properties these
 * three witnesses answer through — the frame's own background, the computed
 * opacity of its two wash pseudo-elements, how many of its descendants still
 * lay out and show, and how many CSS animations are still running (each of the
 * three freezes them as its first act, so the seal catches all three before
 * they have lifted anything). It is MEASURED off the rendered page and never
 * declared by the witness, which is the whole point: a kind added some later
 * day by a hand that never thought about any of this is caught the first time
 * it runs on a page somebody else had.
 *
 * A reading taken on a page whose seal has moved is not a reading. It comes
 * back null and the run goes red naming both witnesses, the way check-drift
 * names an unborn layer (Day 129) — a guard on the premise, reported before
 * the verdicts and separately from them, because a witness reporting
 * `read nothing there` sends a reader out to the yard looking for a renamed
 * class (Day 118's addendum says exactly that), and the fault would be in here.
 *
 * What it cannot see, and it is the same shape as every blind note on the
 * almanac: it holds that a page did not CHANGE under a witness, never that the
 * witness read it correctly. Damage a later kind does and then perfectly undoes
 * — a body hidden and shown again, a style tag injected and removed — restores
 * the seal and passes, and so does any damage in a property the seal does not
 * read. It holds the isolation, not the reading.
 * ------------------------------------------------------------------------ */

const PAGE_SEAL = new WeakMap();
const REFUSALS = [];

/* The seal itself. Deliberately small and deliberately about the rendered page:
 * every quantity in it is one a witness above answers through. */
async function readSeal(page) {
  return await page.evaluate(() => {
    const frames = [];
    for (const scene of document.querySelectorAll('.scene')) {
      let shown = 0;
      for (const el of scene.querySelectorAll('*')) {
        if (el.getClientRects().length === 0) continue;
        if (getComputedStyle(el).visibility === 'hidden') continue;
        shown++;
      }
      frames.push([
        getComputedStyle(scene).backgroundColor,
        getComputedStyle(scene, '::before').opacity,
        getComputedStyle(scene, '::after').opacity,
        shown,
      ].join('/'));
    }
    // Animations only, never transitions: a CSSTransition is in this list only
    // while it is mid-flight, so counting them would make the seal a fact about
    // the instant it was taken. A CSSAnimation carries `animationName`; the
    // ones here are all infinite, so their count holds still on a settled page.
    const running = document.getAnimations()
      .filter((a) => typeof a.animationName === 'string').length;
    return frames.join(' ') + ' anims=' + running;
  });
}

/* Seal a page as it is opened. Every page a reading is taken on goes through
 * here, so `takenOn` below can tell an unsealed page from an undamaged one. */
async function sealPage(page) {
  PAGE_SEAL.set(page, { seal: await readSeal(page), spentBy: null });
  return page;
}

/* One reading, taken on a page nothing has worked on yet — or refused.
 * Returns { value } or { refused }. */
async function takenOn(page, name, fn) {
  const st = PAGE_SEAL.get(page);
  if (!st) {
    throw new Error(`internal: "${name}" was handed a page nobody sealed`);
  }
  if ((await readSeal(page)) !== st.seal) {
    const by = st.spentBy || 'something nothing here recorded';
    const refused = `${name} was handed a page ${by} had already worked on`;
    REFUSALS.push(refused);
    console.log(`check-almanac:   REFUSED — ${refused}`);
    return { refused };
  }
  const value = await fn();
  if ((await readSeal(page)) !== st.seal) st.spentBy = name;
  return { value };
}

/* Day 111. The clock a hold check stands on.
 *
 * Installed with page.addInitScript, so it is in place before sky.js and
 * season.js run and read `new Date()`. `window.__cabinClockMs` is the instant
 * the page believes it is; the runner moves it with a plain evaluate, and every
 * later `new Date()` on the page answers from the new one. Two details are
 * load-bearing and were learned the first time this trick was used, for the
 * gallery's frozen-clock states (CLAUDE.md, Day 95): keep the real prototype so
 * getUTCFullYear() and friends still work on what comes back, and re-export
 * now/parse/UTC, because garden.js and door-plant.js call Date.UTC directly and
 * would throw without it. */
function steppedClock(startMs) {
  var Real = Date;
  window.__cabinClockMs = startMs;
  function Fake(a, b, c, d, e, f, g) {
    switch (arguments.length) {
      case 0: return new Real(window.__cabinClockMs);
      case 1: return new Real(a);
      case 2: return new Real(a, b);
      case 3: return new Real(a, b, c);
      case 4: return new Real(a, b, c, d);
      case 5: return new Real(a, b, c, d, e);
      case 6: return new Real(a, b, c, d, e, f);
      default: return new Real(a, b, c, d, e, f, g);
    }
  }
  Fake.prototype = Real.prototype;
  Fake.now = function () { return window.__cabinClockMs; };
  Fake.parse = Real.parse;
  Fake.UTC = Real.UTC;
  window.Date = Fake;
}

/* "2026-12-21T15:25" → ms, read as UTC. Parsed by hand rather than handed to
 * `new Date(iso)`, which would read it as local: the page is opened in a UTC
 * context below, so both ends have to agree on which noon is meant no matter
 * what clock the machine running this keeps. */
function instantMs(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(iso);
  if (!m) return NaN;
  return Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4], +m[5], 0, 0);
}

/* One hold check, all three of its readings. Returns
 * { arrived, stayed, arrivedLate } — the tag on arriving at the first instant,
 * the tag after standing still while the clock crossed to the second, and the
 * tag on arriving fresh at the second. */
async function readHold(browser, base, check, probe) {
  const arriveMs = instantMs(check.hold.arrive);
  const stayMs = instantMs(check.hold.stay);
  if (!Number.isFinite(arriveMs) || !Number.isFinite(stayMs)) {
    throw new Error(`hold check on ${check.probe} has an unreadable instant`);
  }

  const url = new URL(VIEW_PATH[probe.view], base).toString();

  const openAt = async (ms) => {
    const context = await browser.newContext({ viewport: VIEWPORT, timezoneId: 'UTC' });
    const page = await context.newPage();
    await page.addInitScript(steppedClock, ms);
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForSelector('.scene', { timeout: 15000 });
    return { context, page };
  };

  const tag = (page) => page.evaluate(({ selector, attr }) => {
    const el = document.querySelector(selector);
    return el ? el.getAttribute(attr) : null;
  }, { selector: probe.selector, attr: probe.attr });

  // Arrive at the first instant, then stand there while the clock crosses.
  const first = await openAt(arriveMs);
  let arrived, stayed;
  try {
    arrived = await tag(first.page);
    await first.page.evaluate((ms) => { window.__cabinClockMs = ms; }, stayMs);
    await first.page.waitForTimeout(SETTLE_MS);
    stayed = await tag(first.page);
  } finally {
    await first.context.close();
  }

  // Then arrive fresh on the far side of the edge, which is what says the two
  // instants were ever on opposite sides of anything.
  const second = await openAt(stayMs);
  let arrivedLate;
  try {
    arrivedLate = await tag(second.page);
  } finally {
    await second.context.close();
  }

  return { arrived, stayed, arrivedLate };
}

/* Day 113. One view, opened on a clock frozen to one instant, with NOTHING
 * forced on it. That is the whole difference from readState below and it is the
 * point: the pot's wheel is gated on the date, so the only honest way to ask it
 * what a midwinter looks like is to let the page believe it is midwinter and
 * reckon its own season, hour and pace from that — the same trick the gallery's
 * frozen-clock states use (Day 95), and the same shim readHold steps.
 *
 * A `readings` key of '@<iso>' rather than 'season|tod', so a date-state can
 * never collide with a forced one. */
const dateKeyOf = (iso) => '@' + iso;

async function readOn(browser, base, view, iso, probes) {
  const ms = instantMs(iso);
  if (!Number.isFinite(ms)) throw new Error(`unreadable instant "${iso}"`);

  const context = await browser.newContext({ viewport: VIEWPORT, timezoneId: 'UTC' });
  try {
    const page = await context.newPage();
    await page.addInitScript(steppedClock, ms);
    await page.goto(new URL(VIEW_PATH[view], base).toString(),
                    { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForSelector('.scene', { timeout: 15000 });
    await page.waitForTimeout(SETTLE_MS);
    await sealPage(page);
    const taken = await takenOn(page, `the reading on ${iso}`, () =>
      page.evaluate(measureInPage, { probes, forDate: true }));
    return taken.value || {};
  } finally {
    await context.close();
  }
}

async function readState(browser, base, view, state, probes) {
  const context = await browser.newContext({ viewport: VIEWPORT });
  const url = new URL(VIEW_PATH[view], base).toString();

  // One page, opened at the view and forced into the state this reading wants.
  const openForced = async () => {
    const page = await context.newPage();
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    // The home view fetches scene.html into #scene-mount after load; the other
    // two are inline. Wait for a scene either way before forcing anything.
    await page.waitForSelector('.scene', { timeout: 15000 });
    await page.evaluate(({ season, tod }) => {
      for (const scene of document.querySelectorAll('.scene')) {
        scene.dataset.season = season;
        scene.dataset.tod = tod;
      }
    }, state);
    await page.waitForTimeout(SETTLE_MS);
    // Day 131. Every page a reading is taken on carries a seal from the moment
    // it settles, so `takenOn` can refuse a reading on a page another witness
    // has already worked on rather than quietly taking one.
    return await sealPage(page);
  };

  const page = await openForced();
  try {
    // The computed-style pass is a pure read, and it goes first so it is taken
    // before frame-balance below lifts the light off this same page. That order
    // used to be held by a comment; it is held by the seal now.
    const taken = await takenOn(page, 'the computed-style pass', () =>
      page.evaluate(measureInPage, { probes, forDate: false }));
    const readings = taken.value || {};

    // Day 123. An `exemption` reading is a count of lapsed exceptions, which
    // says how many places to go and look and never which. The detail is left
    // on the page by the evaluate above; print it, and only when something has
    // actually lapsed.
    for (const [name, probe] of Object.entries(probes)) {
      if (probe.kind !== 'exemption') continue;
      const notes = await page.evaluate(
        (n) => (window.__cabinExemptionNotes || {})[n] || [], name);
      for (const note of notes) {
        console.log(`check-almanac:   ${name} ${keyOf(state)} — ${note}`);
      }
    }

    // Day 112. `sprite-tone` reads the rendered picture with the washes taken
    // off, which is a change no later reading on the same page could survive —
    // so each distinct sprite gets a fresh page of its own, and the two probes
    // that read the same sprite (its warmth, its distance from grey) share one
    // pair of shots between them.
    const toneGroups = new Map();
    for (const [name, probe] of Object.entries(probes)) {
      if (probe.kind !== 'sprite-tone') continue;
      const key = probe.selector + '|' + probe.of;
      if (!toneGroups.has(key)) toneGroups.set(key, { probe, names: [] });
      toneGroups.get(key).names.push(name);
    }
    for (const { probe, names } of toneGroups.values()) {
      const tonePage = await openForced();
      try {
        const taken = await takenOn(tonePage, names.join('+'), async () => {
          const shots = await spriteShots(tonePage, probe);
          const out = {};
          for (const name of names) {
            out[name] = shots
              ? await tonePage.evaluate(analyzeSpriteTone, {
                  withSprite: shots.withSprite,
                  noSprite: shots.noSprite,
                  channel: probes[name].channel || 'warmth',
                })
              : null;
          }
          return out;
        });
        for (const name of names) {
          readings[name] = taken.value ? taken.value[name] : null;
        }
      } finally {
        await tonePage.close();
      }
    }

    // Day 118. `paint-lean` lifts the washes the same way `sprite-tone` does,
    // and hides each body in turn — so it gets a page of its own for the same
    // reason, and for the quiet half of the same reason: sharing one with
    // frame-balance would leave whichever ran second reading the other's damage.
    for (const [name, probe] of Object.entries(probes)) {
      if (probe.kind !== 'paint-lean') continue;
      const leanPage = await openForced();
      try {
        const taken = await takenOn(leanPage, name, () =>
          measurePaintLean(leanPage, probe));
        const got = taken.value;
        readings[name] = got ? got.reading : null;
        if (got) {
          console.log(`check-almanac:   ${name} ${keyOf(state)} = ` +
                      `${got.reading === null ? 'nothing there' : got.reading} ` +
                      `(${got.parts.join(', ')})`);
        }
      } finally {
        await leanPage.close();
      }
    }

    // Day 133. `drift` pauses every animation on the page and drives each one
    // round its own clock, which leaves the frame standing at an instant it
    // would never otherwise be caught at — damage of the same kind the two
    // above do, so it gets a page of its own for the same reason. The probes
    // that share a view and a layer list share one walk between them (the
    // frame-balance grouping of Day 130, and for the same reason: the walk is
    // what wrecks the page, so asking for it twice would be asking a witness
    // to read a page another copy of itself had already stopped).
    const driftGroups = new Map();
    for (const [name, probe] of Object.entries(probes)) {
      if (probe.kind !== 'drift') continue;
      const key = JSON.stringify(probe.of || []);
      if (!driftGroups.has(key)) driftGroups.set(key, { probe, names: [] });
      driftGroups.get(key).names.push(name);
    }
    for (const { probe, names } of driftGroups.values()) {
      const driftPage = await openForced();
      try {
        const taken = await takenOn(driftPage, names.join('+'), () =>
          measureDrift(driftPage, probe));
        const got = taken.value;
        for (const name of names) {
          const want = probes[name].read || 'downwind';
          const v = got ? got[want] : null;
          readings[name] = v === undefined ? null : v;
        }
        if (got) {
          console.log(`check-almanac:   ${names.join('+')} ${keyOf(state)} = ` +
                      `${got.downwind} downwind / ${got.upwind} upwind / ` +
                      `${got.moving} moving / ${got.returning} returning ` +
                      `(${got.parts.join(', ')})`);
        }
      } finally {
        await driftPage.close();
      }
    }

    // Day 104. The pixel witness (frame-balance) can't run inside the one
    // evaluate above — it needs Node-side screenshots between page states — so
    // it is measured here and merged on top. It goes last so its wash-off style
    // injection can't disturb the computed-style readings taken above.
    //
    // Day 130. Probes over the same frame are grouped and measured once, and
    // each takes the scalar it asks for off the one pair of shots — `lean` (how
    // far off centre the light weighs) or `weight` (how much light there was to
    // weigh at all). For the two `sprite-tone` probes over one sprite (Day 112)
    // sharing a pair of shots was thrift; here it is REQUIRED. measureFrameBalance
    // leaves the wash switched off on the page it ran on, so a second call would
    // take its wash-ON shot through a wash already lifted, find no difference,
    // and — before this morning — report a perfectly even light. The witness
    // would have been broken by the act of asking it twice.
    const balanceGroups = new Map();
    for (const [name, probe] of Object.entries(probes)) {
      if (probe.kind !== 'frame-balance') continue;
      const key = (probe.selector || '.scene') + '|' + (probe.washSelector || '');
      if (!balanceGroups.has(key)) balanceGroups.set(key, { probe, names: [] });
      balanceGroups.get(key).names.push(name);
    }
    for (const { probe, names } of balanceGroups.values()) {
      const taken = await takenOn(page, names.join('+'), () =>
        measureFrameBalance(page, probe));
      const got = taken.value;
      for (const name of names) {
        const want = probes[name].read || 'lean';
        const v = got ? got[want] : null;
        readings[name] = v === undefined ? null : v;
      }
    }
    return readings;
  } finally {
    await context.close();
  }
}

/* A count or an opacity is stated outright; a laid-out size is only ever
 * compared. Opacities come back as floats, so give them a hair of room. */
function matches(got, want) {
  return got !== null && Math.abs(got - want) < 0.01;
}

/* Day 111. A hold check's two halves, in the order they matter: the place did
 * not turn while somebody stood in it, and the two instants it was asked about
 * really were on opposite sides of an edge. The second is what keeps the first
 * from being a check that cannot fail. */
function verdictsForHold(check, taken) {
  if (!taken) {
    return [{ ok: false, detail: 'the hold could not be read at all' }];
  }
  const { arrived, stayed, arrivedLate } = taken;
  return [
    {
      ok: arrived !== null && stayed === arrived,
      detail: `arrived at ${check.hold.arrive} in "${arrived}", still "${stayed}" ` +
              `after the clock reached ${check.hold.stay} — the yard must not turn`,
    },
    {
      ok: arrivedLate !== null && arrivedLate !== arrived,
      detail: `arriving fresh at ${check.hold.stay} gives "${arrivedLate}", which ` +
              `must differ from "${arrived}" — otherwise the two instants never ` +
              'crossed an edge and the line above asks nothing',
    },
  ];
}

function verdictsFor(check, probeName, readings) {
  const read = (name) => {
    // Day 113. An `on` check's states are instants, keyed by their own date;
    // everything below this line is indifferent to which kind they were.
    const key = check.on ? dateKeyOf(check.on[name]) : keyOf(stateFor(check, name));
    const taken = readings[key];
    const got = taken ? taken[probeName] : undefined;
    return got === undefined ? null : got;
  };

  const out = [];

  // A vow's floor (Day 99): not what the reading IS in a named state, but what
  // it never falls under, asked of every state on the wheel. `over` is always
  // the whole round — a promise that only holds in the months somebody looked
  // at is not a promise.
  if (check.floor !== undefined) {
    for (const name of check.over || []) {
      const got = read(name);
      out.push({
        ok: got !== null && got >= check.floor - 0.01,
        detail: `${name}: never below ${check.floor}, read ` +
                `${got === null ? 'nothing there' : got}`,
      });
    }
    return out;
  }

  // A vow's share (Day 124): a floor with no number of mine in it. Where
  // `floor` holds each reading against a bar I wrote down, this holds it
  // against the same probe's reading in the FULLEST state of the same wheel —
  // so the bar comes off the yard, and rises by itself the day the yard grows.
  // Reuses `over`, so stateNames() and workNeeded() need no branch, exactly as
  // `ceiling` didn't. Three things it is careful about: a reading that isn't
  // there at all fails rather than counting as a zero (the convention every
  // other kind here keeps); a fullest of nothing fails rather than dividing,
  // because a share of nothing is not a hush; and the comparison is a ratio of
  // two readings taken at one width, which cancels `--s` and so may hold a size
  // without ever stating one.
  if (check.share !== undefined) {
    const names = check.over || [];
    const got = names.map(read);
    const fmt = (v) => (v === null ? 'nothing there' : Math.round(v * 100) / 100);

    if (got.some((v) => v === null)) {
      names.forEach((name, i) => out.push({
        ok: got[i] !== null,
        detail: `${name}: read ${fmt(got[i])}`,
      }));
      return out;
    }
    const hi = Math.max(...got);
    if (!(hi > 0)) {
      out.push({
        ok: false,
        detail: `nothing standing in any of ${names.join(', ')} — ` +
                'a share of nothing is not a hush',
      });
      return out;
    }
    names.forEach((name, i) => {
      const ratio = got[i] / hi;
      out.push({
        ok: ratio >= check.share - 1e-9,
        detail: `${name}: ${fmt(got[i])} of the fullest ${fmt(hi)} — ` +
                `${ratio.toFixed(3)}, never under ${check.share}`,
      });
    });
    return out;
  }

  // A vow's ceiling (Day 102): the mirror of the floor. Not what a reading is,
  // but what it never rises to — asked, like the floor, of the whole round.
  if (check.ceiling !== undefined) {
    for (const name of check.over || []) {
      const got = read(name);
      out.push({
        ok: got !== null && got <= check.ceiling + 0.01,
        detail: `${name}: never above ${check.ceiling}, read ` +
                `${got === null ? 'nothing there' : got}`,
      });
    }
    return out;
  }

  if (check.expect) {
    for (const [name, want] of Object.entries(check.expect)) {
      const got = read(name);
      out.push({
        ok: matches(got, want),
        detail: `${name}: wanted ${want}, read ${got === null ? 'nothing there' : got}`,
      });
    }
    return out;
  }

  const order = check.rising || check.falling;
  const up = Boolean(check.rising);
  for (let i = 1; i < order.length; i++) {
    const a = read(order[i - 1]);
    const b = read(order[i]);
    const known = a !== null && b !== null;
    out.push({
      ok: known && (up ? b > a : b < a),
      detail: `${order[i - 1]} ${a === null ? 'nothing there' : a.toFixed(1)} ` +
              `${up ? '<' : '>'} ${order[i]} ${b === null ? 'nothing there' : b.toFixed(1)}`,
    });
  }
  return out;
}

async function main() {
  // COZY_CABIN_URL is what scripts/local-snapshot.sh sets when it stands a
  // server over the working tree, so an in-session run checks today's edits
  // rather than yesterday's deploy.
  const arg = process.argv[2] || process.env.COZY_CABIN_URL || DEFAULT_BASE;
  const base = arg.endsWith('/') ? arg : arg + '/';
  console.log(`check-almanac: holding ${base}almanac/ to the clearing`);

  const browser = await chromium.launch(launchOpts());
  let failures = 0;
  try {
    // 1. Read the claims off the page that makes them.
    const context = await browser.newContext({ viewport: VIEWPORT });
    const page = await context.newPage();
    await page.goto(new URL('almanac/', base).toString(),
                    { waitUntil: 'networkidle', timeout: 30000 });
    const tables = await page.evaluate(() => window.CabinAlmanac || null);
    await context.close();

    if (!tables || !tables.PROBES || !tables.CHECKS) {
      console.error('check-almanac: FAIL — /almanac/ published no witnesses ' +
                    '(window.CabinAlmanac missing). Nothing to check against.');
      process.exit(1);
    }
    const { PROBES, CHECKS } = tables;
    console.log(`check-almanac: ${CHECKS.length} claim(s) witnessed by ` +
                `${Object.keys(PROBES).length} probe(s)`);

    // 2. Visit each state, on each view that state owes a reading.
    const readings = {};
    for (const { state, views, probeNames } of workNeeded(CHECKS, PROBES)) {
      const key = keyOf(state);
      readings[key] = {};
      for (const view of views) {
        const forView = Object.fromEntries(
          Object.entries(PROBES).filter(
            ([name, p]) => p.view === view && probeNames.has(name))
        );
        Object.assign(readings[key],
                      await readState(browser, base, view, state, forView));
      }
      console.log(`check-almanac: read ${key} (${views.join(', ')})`);
    }

    // 2a. The `on` checks (Day 113) name dates rather than tags. Each distinct
    // (instant, view) is one visit on a frozen clock with nothing forced, and
    // several checks asking about the same instant share it.
    const onWork = new Map();
    for (const check of CHECKS) {
      if (!check.on) continue;
      const probe = PROBES[check.probe];
      if (!probe) continue;
      for (const name of stateNames(check)) {
        const iso = check.on[name];
        if (!iso) continue;
        const key = iso + '|' + probe.view;
        if (!onWork.has(key)) onWork.set(key, { iso, view: probe.view });
      }
    }
    for (const { iso, view } of onWork.values()) {
      const forView = Object.fromEntries(
        Object.entries(PROBES).filter(([, p]) => p.view === view)
      );
      const key = dateKeyOf(iso);
      readings[key] = Object.assign(readings[key] || {},
                                    await readOn(browser, base, view, iso, forView));
      console.log(`check-almanac: read ${view} on a clock frozen to ${iso}`);
    }

    // 2b. The hold checks (Day 111) force no state, so workNeeded above never
    // asked for them. Each gets its own visits, on a clock the runner steps.
    const holds = new Map();
    for (const check of CHECKS) {
      if (!check.hold) continue;
      const probe = PROBES[check.probe];
      if (!probe) continue;
      holds.set(check, await readHold(browser, base, check, probe));
      console.log(`check-almanac: stood in ${probe.view} from ` +
                  `${check.hold.arrive} to ${check.hold.stay}`);
    }

    // 3. Hold the sentences to the readings.
    console.log('');
    for (const check of CHECKS) {
      const verdicts = check.hold
        ? verdictsForHold(check, holds.get(check))
        : verdictsFor(check, check.probe, readings);
      const held = verdicts.every((v) => v.ok);
      if (!held) failures++;
      console.log(`${held ? 'HELD' : 'BROKE'}  ${check.probe} — ${check.guards}`);
      for (const v of verdicts) {
        if (!v.ok || !held) console.log(`        ${v.ok ? '·' : '✗'} ${v.detail}`);
      }
    }
  } finally {
    await browser.close();
  }

  console.log('');

  // Day 131. The premise before the verdicts, the way check-drift reports an
  // unborn layer before it compares a picture. A refusal is not a claim the
  // clearing broke — it is this runner having taken a reading on a page another
  // witness had already wrecked, which is a fault in here and not out there.
  // It is said first and separately so nobody goes looking in the yard for it.
  if (REFUSALS.length) {
    console.error(
      `check-almanac: FAIL — ${REFUSALS.length} reading(s) refused; a witness was ` +
      'handed a page another had already worked on.'
    );
    for (const refused of REFUSALS) console.error(`        ✗ ${refused}`);
    console.error(
      'Three of the readings here wreck the page they read: frame-balance empties\n' +
      'the frame and lifts the washes, sprite-tone lifts the washes and hides one\n' +
      'body, paint-lean lifts them and hides a list in turn. None puts the page\n' +
      'back, so each needs one nothing else has touched. Give the refused reading\n' +
      'a page of its own in readState (openForced), or move it ahead of whatever\n' +
      'spent this one. The numbers above it are not to be trusted either way.'
    );
  }

  if (failures) {
    console.error(
      `check-almanac: FAIL — ${failures} claim(s) the clearing no longer keeps.\n` +
      'Either the yard changed and /almanac/\'s prose needs mending (almanac.js,\n' +
      'the SEASON and HOUR tables), or the change itself was the mistake.'
    );
  }

  if (failures || REFUSALS.length) process.exit(1);
  console.log('check-almanac: OK — every witnessed claim still holds, and every ' +
              'reading was taken on a page nothing else had worked on.');
}

/* Day 130. Published read-only, and guarded so that requiring this file does
 * not run the whole check — the same move screenshot.js made on Day 117 so
 * tools/check-gallery.js could read the rails off the camera that takes them.
 * What it is for here is the survey in the day's own `/tmp/` test: the three
 * witnesses that read by DIFFERENCE are handed two identical pictures and asked
 * what they say. A copy of them in the test would only prove what the copy
 * does, which is the Day-97 shared-reckoning fault one level out. */
module.exports = { analyzeBalance, analyzeSpriteTone, analyzePaintLean,
                   measureFrameBalance, spriteShots, measurePaintLean,
                   measureInPage, launchOpts, VIEWPORT, SETTLE_MS,
                   // Day 131. The seal, published for the same reason: a `/tmp/`
                   // test that wants to ask a page whether a witness left a mark
                   // on it must read the seal this runner reads, not a copy of
                   // it — a copy would only ever prove what the copy does.
                   readSeal, sealPage, takenOn };

if (require.main === module) {
  main().catch((err) => {
    console.error('check-almanac: FAIL —', err.message);
    process.exit(1);
  });
}
