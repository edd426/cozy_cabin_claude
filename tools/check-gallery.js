#!/usr/bin/env node
/* tools/check-gallery.js — agent-mutable.
 *
 * Day 117 (2026-09-02). Holds the RECORD to the clearing.
 *
 * tools/check-almanac.js holds the almanac's sentences to what the yard does.
 * This holds the gallery's pictures to what the yard *shows*. One claim, and
 * it is the claim the whole shelf of forced pictures was built on (Day 71):
 *
 *     Everything drawn in this clearing shows in at least one kept frame.
 *
 * A clock nobody ever sees turn is a claim, not a clock — so a layer that only
 * appears in a state no kept picture stands in lives nowhere at all, and the
 * record swears it isn't there.
 *
 * WHY THIS CAN GO WRONG WITHOUT ANYTHING BREAKING. The gallery's forced states
 * are two rails that cross at the middle: a season rail (four seasons at the
 * neutral `day`) and an hour rail (three bands at the neutral `summer`). Nine
 * (season, band) corners are off both rails. Almost every layer here is gated
 * on one wheel only, and any such layer shows somewhere on the arm of its own
 * wheel — so the cross is a fair bargain and mostly a complete one. It fails
 * exactly where a layer is gated on BOTH wheels at once, because then it lives
 * only at a corner. There have been such layers since Day 84: the winter stars
 * are `[data-season="winter"][data-tod="dusk"|"night"]`, which is neither
 * `winter|day` nor `summer|night`. That corner was noticed by hand and added by
 * hand. This exists so the next one doesn't have to be noticed.
 *
 * METHOD. One page load per scene view. Animations and transitions are turned
 * off, so forcing `data-season`/`data-tod` takes effect at once and all sixteen
 * states can be swept in the same DOM — which also makes element index a safe
 * key, since it is literally the same element list every time. For each state,
 * every element in the scene and both its pseudo-elements are asked one
 * question: are you laid out and not transparent? Presence, never brightness —
 * a thing that blinks is still there (Day 98), which is why the reading is
 * getClientRects() plus visibility plus computed opacity rather than a
 * screenshot.
 *
 * Then, per view: any element that shows in some state and in no kept state is
 * a finding, and the report names the states where it does show, so the fix is
 * the shortest list of frames that covers them.
 *
 * WHAT COUNTS AS A KEPT FRAME. The forced entries of GALLERY_STATES, read off
 * scripts/screenshot.js itself, plus its `clock` entries resolved by asking
 * window.CabinSky and window.CabinSeason what tags that instant reckons to —
 * the same lines the yard runs on, so a clock frame is credited for the state a
 * visitor would actually find there. The UNFORCED view previews are
 * deliberately NOT counted: they are taken at whatever season and band the
 * deploy falls in, so counting them would make this check's verdict depend on
 * the calendar, and a guard that is green in December and red in July is not a
 * guard.
 *
 * WHAT IT CANNOT SEE — and it is the same shape as every blind note on the
 * almanac's vows, so it is written here rather than left to be discovered.
 *
 * (1) It reads PRESENCE, not colour and not degree. A layer photographed once
 * at any strength counts as kept, so the winter stars at their first faint dusk
 * showing are covered by the frame that holds them at full dark. And a state
 * whose news is only a *stack* — an autumn under a night sky, two washes over
 * one another that no single-wheel frame shows — reads as fully covered here,
 * because nothing new is present in it. That is not an oversight the shelf
 * should fix by filling all sixteen slots: the rails exist to make one wheel
 * legible at a time, and the lived stack is what the unforced portrait catches
 * every commit anyway.
 *
 * (2) The unit is a THING, not a state. An element already kept somewhere can
 * be given a further appearance at an uncovered corner and this stays green,
 * because the thing itself is in the record. Found by break-testing: gating
 * `.sprite--leaffall` to autumn AND dusk reddens it at once (the leaves then
 * show nowhere kept), but adding a corner to a layer already photographed
 * would not. What is guarded is that nothing here lives outside the record —
 * not that every state of everything is photographed, which is the sixteen-slot
 * grid this check exists to avoid needing.
 *
 * Run: node tools/check-gallery.js [BASE_URL]
 * Falls back to COZY_CABIN_URL, then to the deployed site. Wired into
 * pages.yml beside check-almanac, after the previews are committed, and
 * without continue-on-error: a record that has stopped covering the clearing
 * should turn the run red.
 */
'use strict';

const { chromium } = require('playwright');
const gallery = require('../scripts/screenshot.js');

const DEFAULT_BASE = 'https://edd426.github.io/cozy_cabin_claude/';

/* The scene views. Record rooms (/diary/, /letters/, /almanac/, /names/) are
 * not swept: they draw no season- or hour-gated layer, and their pictures are
 * of words, which a still is the worst way to keep (Day 101). */
const VIEW_PATH = { home: '', around: 'around/', inside: 'inside/' };

/* Which view a gallery state belongs to, by the path it names. */
const VIEW_OF_PATH = { '': 'home', 'around/': 'around', 'inside/': 'inside' };

const SEASONS = ['spring', 'summer', 'autumn', 'winter'];
const BANDS = ['day', 'dawn', 'dusk', 'night'];

/* Enough for a forced attribute to land once transitions are off. Nothing here
 * waits on a wash: this reads layout and opacity, not a picture. */
const SETTLE_MS = 120;

const VIEWPORT = { width: 375, height: 800 };

const keyOf = (season, tod) => season + '|' + tod;

function launchOpts() {
  const exe = process.env.COZY_CABIN_CHROMIUM_PATH;
  return exe ? { executablePath: exe } : {};
}

/* ── in-page readings ─────────────────────────────────────────────────────── */

/* One boolean per element and per pseudo-element: is it laid out and not
 * transparent? getClientRects() is empty iff the element or an ancestor is
 * display:none — the presence test Day 98 arrived at after an opacity-aware
 * count reported two smoke puffs in every season because a puff fades at the
 * top of its rise. A pseudo-element counts only if its host does. */
function sweepScenes() {
  const out = [];
  document.querySelectorAll('.scene').forEach((scene) => {
    const els = [scene].concat(Array.prototype.slice.call(scene.querySelectorAll('*')));
    els.forEach((el) => {
      const cs = getComputedStyle(el);
      const shown = el.getClientRects().length > 0 &&
                    cs.visibility !== 'hidden' &&
                    parseFloat(cs.opacity) > 0.001;
      out.push(shown);
      ['::before', '::after'].forEach((pseudo) => {
        const ps = getComputedStyle(el, pseudo);
        out.push(shown && ps.content !== 'none' && parseFloat(ps.opacity) > 0.001);
      });
    });
  });
  return out;
}

/* The same list, named, so a finding can be read by somebody who has to go and
 * look at it. Read once per view — the DOM does not change between states. */
function nameScenes() {
  const out = [];
  document.querySelectorAll('.scene').forEach((scene) => {
    const els = [scene].concat(Array.prototype.slice.call(scene.querySelectorAll('*')));
    els.forEach((el) => {
      let n = el.tagName.toLowerCase();
      if (el.className && typeof el.className === 'string') {
        n += '.' + el.className.trim().split(/\s+/).join('.');
      }
      out.push(n, n + '::before', n + '::after');
    });
  });
  return out;
}

/* ── the kept frames ──────────────────────────────────────────────────────── */

/* A `clock` state forces nothing; it pins the browser clock and lets sky.js and
 * season.js reckon their own tags. So the state it actually keeps has to be
 * asked of those same two exports rather than worked out here — the Day-97
 * arrangement, one level out: a second copy of the band edges could credit a
 * frame for a state it doesn't hold. */
async function keptFrames(browser, base) {
  const kept = { home: new Set(), around: new Set(), inside: new Set() };
  const clocks = [];

  for (const state of gallery.GALLERY_STATES) {
    const view = VIEW_OF_PATH[state.view || gallery.GALLERY_VIEW];
    if (!view) throw new Error(`gallery state "${state.name}" names an unknown view`);
    if (state.clock) { clocks.push({ view, iso: state.clock, name: state.name }); continue; }
    if (!state.season || !state.tod) {
      throw new Error(`gallery state "${state.name}" forces neither a clock nor both tags`);
    }
    kept[view].add(keyOf(state.season, state.tod));
  }

  if (clocks.length) {
    const context = await browser.newContext({ viewport: VIEWPORT });
    const page = await context.newPage();
    await page.goto(base, { waitUntil: 'networkidle', timeout: 30000 });
    for (const clock of clocks) {
      const resolved = await page.evaluate((iso) => {
        if (!window.CabinSky || !window.CabinSeason) return null;
        const d = new Date(iso);
        return { season: window.CabinSeason.seasonForDate(d), tod: window.CabinSky.phaseFor(d) };
      }, clock.iso);
      if (!resolved) throw new Error('the clearing published no reckoning (CabinSky/CabinSeason missing)');
      kept[clock.view].add(keyOf(resolved.season, resolved.tod));
      console.log(`check-gallery: ${clock.name} (${clock.iso}) reckons to ` +
                  `${resolved.season}|${resolved.tod} on ${clock.view}`);
    }
    await context.close();
  }
  return kept;
}

/* ── the sweep ────────────────────────────────────────────────────────────── */

async function sweepView(browser, base, view) {
  const context = await browser.newContext({ viewport: VIEWPORT });
  const page = await context.newPage();
  try {
    await page.goto(new URL(VIEW_PATH[view], base).toString(),
                    { waitUntil: 'networkidle', timeout: 30000 });
    // With motion off, forcing a tag lands at once and every state is read in
    // one DOM — which is what makes element index a safe key across states.
    await page.addStyleTag({
      content: '*, *::before, *::after { animation: none !important; transition: none !important; }',
    });
    const names = await page.evaluate(nameScenes);
    if (!names.length) throw new Error(`no .scene found on ${view}`);

    const sig = {};
    for (const season of SEASONS) {
      for (const tod of BANDS) {
        await page.evaluate(({ season, tod }) => {
          document.querySelectorAll('.scene').forEach((s) => {
            s.dataset.season = season;
            s.dataset.tod = tod;
          });
        }, { season, tod });
        await page.waitForTimeout(SETTLE_MS);
        sig[keyOf(season, tod)] = await page.evaluate(sweepScenes);
      }
    }
    return { names, sig };
  } finally {
    await context.close();
  }
}

/* Every element that shows somewhere and in no kept frame, with the states it
 * does show in — which is the list a fix has to cover. */
function findingsFor(names, sig, kept) {
  const states = [];
  for (const season of SEASONS) for (const tod of BANDS) states.push(keyOf(season, tod));

  const out = [];
  for (let i = 0; i < names.length; i++) {
    const showsIn = states.filter((s) => sig[s][i]);
    if (!showsIn.length) continue;                      // never drawn; nothing owed
    if (showsIn.some((s) => kept.has(s))) continue;     // a kept frame holds it
    out.push({ what: names[i], showsIn });
  }
  return out;
}

async function main() {
  const arg = process.argv[2] || process.env.COZY_CABIN_URL || DEFAULT_BASE;
  const base = arg.endsWith('/') ? arg : arg + '/';
  console.log(`check-gallery: holding the record of ${base} to the clearing`);

  const browser = await chromium.launch(launchOpts());
  let failures = 0;
  try {
    const kept = await keptFrames(browser, base);
    for (const view of Object.keys(VIEW_PATH)) {
      console.log(`check-gallery: ${view} keeps ` +
                  (kept[view].size ? Array.from(kept[view]).sort().join(', ') : 'no forced frame'));
    }
    console.log('');

    for (const view of Object.keys(VIEW_PATH)) {
      const { names, sig } = await sweepView(browser, base, view);
      const findings = findingsFor(names, sig, kept[view]);
      if (!findings.length) {
        console.log(`HELD  ${view} — every drawn thing shows in a kept frame ` +
                    `(${names.length} readings × 16 states)`);
        continue;
      }
      failures += findings.length;
      console.log(`BROKE ${view} — ${findings.length} thing(s) the record never shows`);
      for (const f of findings) {
        console.log(`        ✗ ${f.what}`);
        console.log(`          shows only at: ${f.showsIn.join(', ')}`);
      }
    }
  } finally {
    await browser.close();
  }

  console.log('');
  if (failures) {
    console.error(
      `check-gallery: FAIL — ${failures} thing(s) drawn in this clearing that no\n` +
      'kept picture shows. Either add a state to GALLERY_STATES in\n' +
      'scripts/screenshot.js covering one of the states named above, or the\n' +
      'layer is gated somewhere it should not be.'
    );
    process.exit(1);
  }
  console.log('check-gallery: OK — nothing here lives outside the record.');
}

main().catch((err) => {
  console.error('check-gallery: FAIL —', err.message);
  process.exit(1);
});
