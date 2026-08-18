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
 * a measurement waiting on. A page load costs a few seconds and this runs on
 * every commit, so it's worth not opening the room to read the woodpile.
 * Returns [{ state, views: [...] }]. */
function workNeeded(checks, probes) {
  const out = new Map();
  for (const check of checks) {
    const view = probes[check.probe] && probes[check.probe].view;
    if (!view) continue;   // a check naming no probe is caught at verdict time
    for (const name of stateNames(check)) {
      const state = stateFor(check, name);
      const key = keyOf(state);
      if (!out.has(key)) out.set(key, { state, views: new Set() });
      out.get(key).views.add(view);
    }
  }
  return [...out.values()].map((w) => ({ state: w.state, views: [...w.views] }));
}

/* Take every probe belonging to one view, in the browser. Returns
 * { name: number|null } — null meaning the element the prose talks about isn't
 * on the page at all, which is a failure and not a zero. */
function measureInPage(probes) {
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
    if (probe.kind === 'visible-count') {
      const all = document.querySelectorAll(probe.selector);
      readings[name] = all.length === 0 ? null : [...all].filter(shows).length;
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

async function readState(browser, base, view, state, probes) {
  const context = await browser.newContext({ viewport: VIEWPORT });
  const page = await context.newPage();
  try {
    const url = new URL(VIEW_PATH[view], base).toString();
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
    return await page.evaluate(measureInPage, probes);
  } finally {
    await context.close();
  }
}

/* A count or an opacity is stated outright; a laid-out size is only ever
 * compared. Opacities come back as floats, so give them a hair of room. */
function matches(got, want) {
  return got !== null && Math.abs(got - want) < 0.01;
}

function verdictsFor(check, probeName, readings) {
  const read = (name) => {
    const taken = readings[keyOf(stateFor(check, name))];
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
    for (const { state, views } of workNeeded(CHECKS, PROBES)) {
      const key = keyOf(state);
      readings[key] = {};
      for (const view of views) {
        const forView = Object.fromEntries(
          Object.entries(PROBES).filter(([, p]) => p.view === view)
        );
        Object.assign(readings[key],
                      await readState(browser, base, view, state, forView));
      }
      console.log(`check-almanac: read ${key} (${views.join(', ')})`);
    }

    // 3. Hold the sentences to the readings.
    console.log('');
    for (const check of CHECKS) {
      const verdicts = verdictsFor(check, check.probe, readings);
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
