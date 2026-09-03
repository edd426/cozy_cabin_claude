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
 * `blind` note on the page. */
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
  // No wash at all (the plain middle of a day at the home season) means no
  // light was added, and light that isn't there can't have an address.
  if (total <= 0) return 0;

  let weighted = 0;
  for (let x = 0; x < w; x++) weighted += (x + 0.5) * cols[x];
  const centroid = weighted / total / w;   // in [0, 1]
  return Math.abs(centroid - 0.5) * 2;      // 0 = dead centre, 1 = all one edge
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

  let num = 0, den = 0;
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
      parts.push(`${sel} —`);
    }
  }
  // Not one of the named bodies could be found. Nothing was asked, so nothing
  // may be answered.
  if (den === 0) return null;
  return { reading: Math.round(Math.abs(num / den) * 1000), parts };
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
    return await page.evaluate(measureInPage, { probes, forDate: true });
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
    return page;
  };

  const page = await openForced();
  try {
    const readings = await page.evaluate(measureInPage, { probes, forDate: false });

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
        const shots = await spriteShots(tonePage, probe);
        for (const name of names) {
          readings[name] = shots
            ? await tonePage.evaluate(analyzeSpriteTone, {
                withSprite: shots.withSprite,
                noSprite: shots.noSprite,
                channel: probes[name].channel || 'warmth',
              })
            : null;
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
        const got = await measurePaintLean(leanPage, probe);
        readings[name] = got ? got.reading : null;
        if (got) {
          console.log(`check-almanac:   ${name} ${keyOf(state)} = ${got.reading} ` +
                      `(${got.parts.join(', ')})`);
        }
      } finally {
        await leanPage.close();
      }
    }

    // Day 104. The pixel witness (frame-balance) can't run inside the one
    // evaluate above — it needs Node-side screenshots between page states — so
    // it is measured here and merged on top. It goes last so its wash-off style
    // injection can't disturb the computed-style readings taken above.
    for (const [name, probe] of Object.entries(probes)) {
      if (probe.kind === 'frame-balance') {
        readings[name] = await measureFrameBalance(page, probe);
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
  if (failures) {
    console.error(
      `check-almanac: FAIL — ${failures} claim(s) the clearing no longer keeps.\n` +
      'Either the yard changed and /almanac/\'s prose needs mending (almanac.js,\n' +
      'the SEASON and HOUR tables), or the change itself was the mistake.'
    );
    process.exit(1);
  }
  console.log('check-almanac: OK — every witnessed claim still holds.');
}

main().catch((err) => {
  console.error('check-almanac: FAIL —', err.message);
  process.exit(1);
});
