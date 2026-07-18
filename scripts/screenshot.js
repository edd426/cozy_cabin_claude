#!/usr/bin/env node
// scripts/screenshot.js — capture phone-viewport screenshots of the cabin.
//
// Two modes:
//
//   screenshot.js URL OUT_PNG
//       Single-shot. Used by scripts/local-snapshot.sh to capture the
//       working-tree state of one URL into one PNG. Unchanged behaviour.
//
//   screenshot.js --manifest MANIFEST_JSON BASE_URL OUT_DIR DATE_TAG SHA_SHORT
//       Manifest-driven loop. Used by .github/workflows/pages.yml after
//       each Pages deploy to capture every view in scripts/views.json.
//       The manifest is a JSON array of { name, url_path } entries; each
//       entry produces TWO captures in OUT_DIR:
//         375×800 (narrow): previews/<DATE_TAG>-<SHA_SHORT>[-<name>].png
//         390×844 (phone):  previews/<DATE_TAG>-<SHA_SHORT>[-<name>]-phone.png
//       The "home" entry's narrow capture keeps the unsuffixed filename so
//       the existing wait-for-deploy.sh idiom (which looks for
//       previews/<date>-<sha>.png) keeps working.
//
//       The phone captures exist because of the Day-33/34 blind spot
//       (messages/done/2026-06-10-phone-breakpoint-blind-spot.md): every
//       render the agent ever saw was exactly 375px wide, while real phones
//       are 390–440 CSS px — so a breakpoint bug that broke only that band
//       was structurally invisible. 390×844 (the most common iPhone size)
//       keeps the band visible to tomorrow's agent without ceremony.
//
//   screenshot.js --gallery BASE_URL OUT_DIR DATE_TAG SHA_SHORT
//       Forced-state gallery. Captures the hour- and season-gated states the
//       nightly CI shot can never reach. The screenshot job fires ~00:10 UTC —
//       sky.js bins that hour as `night` — and season.js answers `summer` until
//       September, so `previews/` has only ever accumulated night-summer home
//       shots. The dawn rim, the dusk gold, the autumn gild, the winter hush,
//       the fireflies — none of it was in the permanent record. This mode forces
//       `data-tod` / `data-season` the way sky.js / season.js do and captures
//       the home view in each, writing:
//         previews/<DATE_TAG>-<SHA_SHORT>-state-<name>.png   (375×800)
//       one per entry in GALLERY_STATES below. A season rail (all four years at
//       the neutral day hour) and an hour rail (dawn/dusk/night at the neutral
//       summer season) let a future agent SEE the clocks turn instead of trusting
//       a filter string quoted in a log. (messages/2026-07-17 "see your own work".)
//       The `-state-` infix never collides with a view name, so the memory-pass
//       glob `ls <date>-<sha>*.png` picks these up alongside the view previews.
//
// Run from the GitHub Actions screenshot job or locally with playwright
// installed (`npm install playwright`).
//
// Default viewport: 375×800 at deviceScaleFactor 2 — the same shape
// local-snapshot.sh renders at, so what CI captures and what the agent
// sees in-session match.

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const NARROW_VIEWPORT = { width: 375, height: 800 };
const PHONE_VIEWPORT  = { width: 390, height: 844 };

// --gallery mode config. Home view only for now — the exterior frame wash, the
// meadow, the seasonal tree-crowns and the night fireflies all live on the front
// face; around/inside are a later slice (see the message's "slice it over several
// days"). Each state forces both gated attributes so the OTHER clock is pinned to
// its neutral value and only the axis under test shows: the season rail holds the
// hour at `day` (sky.js's no-wash middle), the hour rail holds the season at
// `summer` (season.js's no-wash home season).
const GALLERY_VIEW = '';               // home root ('' resolves to BASE_URL)
const GALLERY_STATES = [
  // season rail — the year turning at a fixed neutral hour
  { name: 'spring', tod: 'day', season: 'spring' },
  { name: 'summer', tod: 'day', season: 'summer' },
  { name: 'autumn', tod: 'day', season: 'autumn' },
  { name: 'winter', tod: 'day', season: 'winter' },
  // hour rail — the day leaning at a fixed neutral season
  { name: 'dawn',   tod: 'dawn',  season: 'summer' },
  { name: 'dusk',   tod: 'dusk',  season: 'summer' },
  { name: 'night',  tod: 'night', season: 'summer' },
];
const WASH_SETTLE_MS = 2000;           // the hour/season washes transition over 1.6s

async function capture(browser, fullUrl, outPath, viewport = NARROW_VIEWPORT) {
  const context = await browser.newContext({
    viewport,
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();
  console.log(`screenshot: navigating to ${fullUrl}`);
  await page.goto(fullUrl, { waitUntil: 'networkidle', timeout: 30000 });
  // Give inline scripts (build-sha.js, scene loaders) a moment to settle.
  await page.waitForTimeout(1500);
  console.log(`screenshot: writing ${outPath}`);
  await page.screenshot({ path: outPath, fullPage: true });
  await context.close();
}

function launchOpts() {
  const opts = {};
  if (process.env.COZY_CABIN_CHROMIUM_PATH) {
    opts.executablePath = process.env.COZY_CABIN_CHROMIUM_PATH;
    console.log(`screenshot: using executablePath=${opts.executablePath}`);
  }
  return opts;
}

async function singleShot(url, out) {
  const browser = await chromium.launch(launchOpts());
  try {
    await capture(browser, url, out);
  } finally {
    await browser.close();
  }
  console.log('screenshot: done');
}

async function manifestRun(manifestPath, baseUrl, outDir, dateTag, shaShort) {
  const raw = fs.readFileSync(manifestPath, 'utf8');
  const views = JSON.parse(raw);
  if (!Array.isArray(views) || views.length === 0) {
    throw new Error(`manifest ${manifestPath} is empty or not an array`);
  }
  // Normalise base URL — ensure trailing slash so `new URL(url_path, baseUrl)`
  // resolves relative paths against the deployed site root rather than its
  // parent directory.
  const base = baseUrl.endsWith('/') ? baseUrl : baseUrl + '/';
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch(launchOpts());
  try {
    for (const view of views) {
      if (!view.name || typeof view.url_path !== 'string') {
        throw new Error(`manifest entry missing name or url_path: ${JSON.stringify(view)}`);
      }
      const fullUrl = new URL(view.url_path, base).toString();
      // Home gets the unsuffixed filename so wait-for-deploy.sh keeps working.
      const suffix = view.name === 'home' ? '' : `-${view.name}`;
      const outPath = path.join(outDir, `${dateTag}-${shaShort}${suffix}.png`);
      await capture(browser, fullUrl, outPath, NARROW_VIEWPORT);
      // Real-phone-width sibling capture — the 380–440px band guard.
      const phonePath = path.join(outDir, `${dateTag}-${shaShort}${suffix}-phone.png`);
      await capture(browser, fullUrl, phonePath, PHONE_VIEWPORT);
    }
  } finally {
    await browser.close();
  }
  console.log(`screenshot: done — ${views.length} view(s) captured at 2 widths each`);
}

// Capture one forced-state shot: load the view, force the gated attributes onto
// every .scene the way sky.js / season.js do, wait out the washes, screenshot.
async function captureState(browser, fullUrl, outPath, state) {
  const context = await browser.newContext({
    viewport: NARROW_VIEWPORT,
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();
  console.log(`screenshot: navigating to ${fullUrl} for state ${state.name}`);
  await page.goto(fullUrl, { waitUntil: 'networkidle', timeout: 30000 });
  // The home scene is fetched into #scene-mount after load; wait for it to
  // exist before forcing. sky.js / season.js have already run their init and
  // disconnected their observers by now, so nothing overwrites what we set.
  await page.waitForSelector('.scene', { timeout: 15000 });
  await page.evaluate(({ tod, season }) => {
    for (const scene of document.querySelectorAll('.scene')) {
      scene.dataset.tod = tod;
      scene.dataset.season = season;
    }
  }, state);
  await page.waitForTimeout(WASH_SETTLE_MS);
  console.log(`screenshot: writing ${outPath}`);
  await page.screenshot({ path: outPath, fullPage: true });
  await context.close();
}

async function galleryRun(baseUrl, outDir, dateTag, shaShort) {
  const base = baseUrl.endsWith('/') ? baseUrl : baseUrl + '/';
  fs.mkdirSync(outDir, { recursive: true });
  const fullUrl = new URL(GALLERY_VIEW, base).toString();

  const browser = await chromium.launch(launchOpts());
  try {
    for (const state of GALLERY_STATES) {
      const outPath = path.join(outDir, `${dateTag}-${shaShort}-state-${state.name}.png`);
      await captureState(browser, fullUrl, outPath, state);
    }
  } finally {
    await browser.close();
  }
  console.log(`screenshot: done — ${GALLERY_STATES.length} forced-state capture(s)`);
}

(async () => {
  const args = process.argv.slice(2);

  if (args[0] === '--manifest') {
    const [, manifestPath, baseUrl, outDir, dateTag, shaShort] = args;
    if (!manifestPath || !baseUrl || !outDir || !dateTag || !shaShort) {
      console.error('screenshot: usage — screenshot.js --manifest MANIFEST_JSON BASE_URL OUT_DIR DATE_TAG SHA_SHORT');
      process.exit(2);
    }
    await manifestRun(manifestPath, baseUrl, outDir, dateTag, shaShort);
    return;
  }

  if (args[0] === '--gallery') {
    const [, baseUrl, outDir, dateTag, shaShort] = args;
    if (!baseUrl || !outDir || !dateTag || !shaShort) {
      console.error('screenshot: usage — screenshot.js --gallery BASE_URL OUT_DIR DATE_TAG SHA_SHORT');
      process.exit(2);
    }
    await galleryRun(baseUrl, outDir, dateTag, shaShort);
    return;
  }

  const [url, out] = args;
  if (!url || !out) {
    console.error('screenshot: usage — screenshot.js URL OUT_PNG');
    console.error('              or — screenshot.js --manifest MANIFEST_JSON BASE_URL OUT_DIR DATE_TAG SHA_SHORT');
    console.error('              or — screenshot.js --gallery BASE_URL OUT_DIR DATE_TAG SHA_SHORT');
    process.exit(2);
  }
  await singleShot(url, out);
})().catch((e) => {
  console.error('screenshot: failed —', e.message);
  process.exit(1);
});
