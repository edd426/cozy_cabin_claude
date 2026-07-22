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
//   screenshot.js --motion BASE_URL OUT_DIR DATE_TAG SHA_SHORT
//       Motion filmstrip. A still can't prove motion — a photograph of a flag is
//       just a shape; you can't tell from it whether the wind is blowing. Half
//       the clearing moves (the flag lifts, the smoke leans downwind, the crowns
//       bend, the fireflies blink and drift) and the gallery/manifest stills swear
//       none of it (messages/2026-07-17 "see your own work", motion slice). This
//       mode captures the home .scene SIX times a beat apart, then composites the
//       frames shoulder-to-shoulder into one page — a strip you READ left-to-right,
//       the way a flip-book or a galloping-horse plate does, so the eye supplies
//       the motion that lives in the gaps between frames. A film would need a
//       play button; the memory pass reads stills, so the record stays a still —
//       a still made of stills. Writes one strip per clip in MOTION_CLIPS:
//         previews/<DATE_TAG>-<SHA_SHORT>-motion-<name>.png
//       The `-motion-` infix never collides with a view name or the `-state-`
//       gallery infix, so the memory glob `ls <date>-<sha>*.png` picks strips up
//       alongside everything else.
//
//   screenshot.js --motion-cross BASE_URL OUT_DIR DATE_TAG SHA_SHORT
//       Cross-view motion strip. The --motion strips read across TIME within one
//       view; this one reads across the HOUSE. It captures the front face (whose
//       chimney smoke leans downwind) and the door side (whose smoke rises dead
//       straight, because that face looks down the wind's own throat) over the
//       same span, and composites them into a TWO-ROW grid — front on top, door
//       side below, one beat per column. You read each row left→right for time
//       and compare the rows vertically: the front smoke leaning while the side
//       stands is the whole quiet proof that ONE wind blows through the clearing,
//       and no single-view strip can show it because it never puts the two faces
//       in one frame (RULES Art XIII; diary 2026-07-19 … 2026-07-22). Writes:
//         previews/<DATE_TAG>-<SHA_SHORT>-motion-cross.png
//       The `-motion-cross` infix is a longer sibling of `-motion-<name>` and
//       collides with nothing, so the memory glob picks it up like the rest.
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

// --motion mode config. Each clip is a forced state (so the strip is deterministic
// regardless of the capture-time hour/season) captured across MOTION_FRAMES frames,
// MOTION_INTERVAL_MS apart, then composited into one filmstrip. The interval × frame
// count (900ms × 6 ≈ 4.5s span) is tuned to one period of the fastest legible
// motion: smoke-rise is 4.5s, flag-flutter 5.5s, firefly-blink 4s — so a full smoke
// climb, most of a flag beat, and a whole firefly blink+drift show across the row.
// Two clips: a DAY strip (the wind's story — smoke leaning, flag, swaying crowns)
// and a NIGHT strip (the fireflies, the one motion a single frame is most helpless
// against — a lone dim dot vs. a blink-and-drift across six). Home view only, same
// bounding logic as --gallery: the wind and the fireflies both live on the front
// face; around/inside motion (the door-side straight smoke, the hearth flicker) is
// a later slice if wanted.
const MOTION_VIEW = '';                 // home root ('' resolves to BASE_URL)
const MOTION_FRAMES = 6;
const MOTION_INTERVAL_MS = 900;
const MOTION_CLIPS = [
  { name: 'day',   tod: 'day',   season: 'summer' },
  { name: 'night', tod: 'night', season: 'summer' },
];

// --motion-cross mode config. One forced state (the wind is a day-story, and the
// smoke — the element BOTH faces share — reads clearest at the neutral day hour),
// captured on each face over the same MOTION_FRAMES × MOTION_INTERVAL_MS span the
// single-view strips use, then stacked into a two-row grid. Row order is front on
// top, door side below, so the reader's eye drops from a leaning column to a
// straight one at the same beat. Labels stay short (they sit in a left gutter);
// the lean-vs-stand meaning rides in the strip's title. The two faces load
// independently, so their animation clocks aren't synchronised frame-for-frame —
// but the proof is qualitative, not phase-locked: across the span the front row
// leans and eases while the side row only ever rises straight. That contrast is
// the point, and it survives the clocks being free-running.
const MOTION_CROSS_STATE = { tod: 'day', season: 'summer' };
const MOTION_CROSS_ROWS = [
  { label: 'front', url_path: '' },
  { label: 'door side', url_path: 'around/' },
];
// The whole smoke comparison lives in the upper band of each scene (sky, roof,
// chimney, the rising column); the walls, ground, mailbox and door below carry no
// wind and only shrink the smoke in the cell. Crop each row to the top fraction so
// the two columns — one leaning ~7°, one dead straight — are big enough to READ,
// per CLAUDE.md's legibility note ("if a thing can't read at its size, make it
// bigger"). 0.62 keeps both chimneys and the full climb of both columns with sky
// to spare; the row labels still identify which face is which.
const MOTION_CROSS_KEEP_FRAC = 0.62;

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

// Composite the captured scene frames into one filmstrip PNG using a canvas —
// drawn side by side at their natural (1:1) size with imageSmoothing off, so the
// pixel art stays crisp and the output dimensions are predictable (an HTML page
// screenshotted fullPage balloons unpredictably). A title bar names the clip; a
// little clock sits under each frame. The cream ground matches the site so the
// strip reads as part of the record. Runs inside the browser and returns a
// base64 PNG data URL.
async function compositeFilmstrip(page, frames, title, labels) {
  const dataUrl = await page.evaluate(async ({ frames, title, labels }) => {
    const PAD = 16, GAP = 10, TITLE_H = 26, CAP_H = 22;
    const imgs = await Promise.all(frames.map((src) => new Promise((resolve, reject) => {
      const im = new Image();
      im.onload = () => resolve(im);
      im.onerror = reject;
      im.src = src;
    })));
    const fw = imgs[0].naturalWidth, fh = imgs[0].naturalHeight;
    const W = PAD * 2 + imgs.length * fw + (imgs.length - 1) * GAP;
    const H = PAD * 2 + TITLE_H + fh + CAP_H;
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    ctx.fillStyle = '#f4ecd0';
    ctx.fillRect(0, 0, W, H);
    ctx.textBaseline = 'top';
    ctx.fillStyle = '#6b5a45';
    ctx.font = '600 14px ui-monospace, Menlo, monospace';
    ctx.fillText(title, PAD, PAD);
    imgs.forEach((im, i) => {
      const x = PAD + i * (fw + GAP);
      const y = PAD + TITLE_H;
      ctx.drawImage(im, x, y, fw, fh);
      ctx.strokeStyle = '#cdbf9d';
      ctx.strokeRect(x + 0.5, y + 0.5, fw - 1, fh - 1);
      ctx.fillStyle = '#8a785f';
      ctx.font = '12px ui-monospace, Menlo, monospace';
      ctx.fillText(labels[i], x + 2, y + fh + 5);
    });
    return canvas.toDataURL('image/png');
  }, { frames, title, labels });
  return dataUrl;
}

// Capture one motion clip: force the state, wait out the wash so the lean-in isn't
// part of the film, then grab the .scene element MOTION_FRAMES times a beat apart,
// and composite the frames into one filmstrip PNG. Frames are captured at
// deviceScaleFactor 1 so they composite at the true pixel grid (the art is
// integer-scaled with image-rendering: pixelated) and tiny movers like the
// fireflies stay legible rather than being downscaled away.
async function captureMotion(browser, fullUrl, outPath, clip) {
  const shotContext = await browser.newContext({
    viewport: NARROW_VIEWPORT,
    deviceScaleFactor: 1,
  });
  const frames = [];
  try {
    const page = await shotContext.newPage();
    console.log(`screenshot: navigating to ${fullUrl} for motion clip ${clip.name}`);
    await page.goto(fullUrl, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForSelector('.scene', { timeout: 15000 });
    // Force the gated attributes the way sky.js / season.js do (their init has run
    // and disconnected by now, so nothing overwrites what we set), then let the
    // 1.6s wash settle before the first frame so the transition isn't filmed.
    await page.evaluate(({ tod, season }) => {
      for (const scene of document.querySelectorAll('.scene')) {
        scene.dataset.tod = tod;
        scene.dataset.season = season;
      }
    }, clip);
    await page.waitForTimeout(WASH_SETTLE_MS);
    // The perpetual animations (smoke, flag, sway, fireflies) run on their own
    // clocks now; sample the scene box across one span of them.
    const sceneEl = page.locator('.scene').first();
    for (let f = 0; f < MOTION_FRAMES; f++) {
      // locator.screenshot() returns a Buffer (its options have no `encoding`),
      // so base64-encode it ourselves for the data URL.
      const buf = await sceneEl.screenshot();
      frames.push(`data:image/png;base64,${buf.toString('base64')}`);
      if (f < MOTION_FRAMES - 1) await page.waitForTimeout(MOTION_INTERVAL_MS);
    }
  } finally {
    await shotContext.close();
  }

  // Composite the frames into one strip on a throwaway blank page.
  const compContext = await browser.newContext({ deviceScaleFactor: 1 });
  try {
    const page = await compContext.newPage();
    await page.setContent('<!doctype html><body></body>', { waitUntil: 'load' });
    const spanS = ((MOTION_FRAMES - 1) * MOTION_INTERVAL_MS / 1000).toFixed(1);
    const title = `motion — home / ${clip.name} · ${MOTION_FRAMES} frames over ${spanS}s (read left → right)`;
    const labels = frames.map((_, i) => `t=${((i * MOTION_INTERVAL_MS) / 1000).toFixed(1)}s`);
    const dataUrl = await compositeFilmstrip(page, frames, title, labels);
    const b64 = dataUrl.split(',')[1];
    console.log(`screenshot: writing ${outPath}`);
    fs.writeFileSync(outPath, Buffer.from(b64, 'base64'));
  } finally {
    await compContext.close();
  }
}

async function motionRun(baseUrl, outDir, dateTag, shaShort) {
  const base = baseUrl.endsWith('/') ? baseUrl : baseUrl + '/';
  fs.mkdirSync(outDir, { recursive: true });
  const fullUrl = new URL(MOTION_VIEW, base).toString();

  const browser = await chromium.launch(launchOpts());
  try {
    for (const clip of MOTION_CLIPS) {
      const outPath = path.join(outDir, `${dateTag}-${shaShort}-motion-${clip.name}.png`);
      await captureMotion(browser, fullUrl, outPath, clip);
    }
  } finally {
    await browser.close();
  }
  console.log(`screenshot: done — ${MOTION_CLIPS.length} motion filmstrip(s)`);
}

// Grab MOTION_FRAMES screenshots of the first .scene at fullUrl under a forced
// state, a beat apart — the same sampling captureMotion does, factored out so the
// cross-view strip can reuse it per face. Returns an array of base64 PNG data URLs.
async function grabSceneFrames(browser, fullUrl, state) {
  const context = await browser.newContext({
    viewport: NARROW_VIEWPORT,
    deviceScaleFactor: 1,
  });
  const frames = [];
  try {
    const page = await context.newPage();
    console.log(`screenshot: navigating to ${fullUrl} for cross-view frames`);
    await page.goto(fullUrl, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForSelector('.scene', { timeout: 15000 });
    // Force the gated attributes the way sky.js / season.js do (their init has run
    // and disconnected by now), then let the 1.6s wash settle before the first
    // frame so the transition isn't filmed.
    await page.evaluate(({ tod, season }) => {
      for (const scene of document.querySelectorAll('.scene')) {
        scene.dataset.tod = tod;
        scene.dataset.season = season;
      }
    }, state);
    await page.waitForTimeout(WASH_SETTLE_MS);
    const sceneEl = page.locator('.scene').first();
    for (let f = 0; f < MOTION_FRAMES; f++) {
      const buf = await sceneEl.screenshot();
      frames.push(`data:image/png;base64,${buf.toString('base64')}`);
      if (f < MOTION_FRAMES - 1) await page.waitForTimeout(MOTION_INTERVAL_MS);
    }
  } finally {
    await context.close();
  }
  return frames;
}

// Composite a two-row cross-view grid: each row is one face's frames across time,
// stacked so the same beat sits in a column and the two faces line up vertically.
// Short row labels sit in a left gutter; time labels run under the bottom row.
// Same crisp-pixel canvas approach as compositeFilmstrip (imageSmoothing off,
// predictable dimensions). Runs inside the browser; returns a base64 PNG data URL.
async function compositeCrossStrip(page, rows, title, colLabels, keepFrac) {
  const dataUrl = await page.evaluate(async ({ rows, title, colLabels, keepFrac }) => {
    const PAD = 16, GAP = 10, ROW_GAP = 12, TITLE_H = 26, CAP_H = 22, GUTTER = 84;
    const loadRow = (srcs) => Promise.all(srcs.map((src) => new Promise((resolve, reject) => {
      const im = new Image();
      im.onload = () => resolve(im);
      im.onerror = reject;
      im.src = src;
    })));
    const loaded = await Promise.all(rows.map((r) => loadRow(r.frames)));
    const fw = loaded[0][0].naturalWidth, fh = loaded[0][0].naturalHeight;
    // Keep only the top band of each frame (source rows share dimensions, so one
    // crop height serves all): the smoke comparison lives above the roofline.
    const sh = Math.round(fh * keepFrac);
    const n = loaded[0].length, R = loaded.length;
    const W = PAD + GUTTER + n * fw + (n - 1) * GAP + PAD;
    const H = PAD + TITLE_H + R * sh + (R - 1) * ROW_GAP + CAP_H + PAD;
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    ctx.fillStyle = '#f4ecd0';
    ctx.fillRect(0, 0, W, H);
    ctx.textBaseline = 'top';
    ctx.fillStyle = '#6b5a45';
    ctx.font = '600 14px ui-monospace, Menlo, monospace';
    ctx.fillText(title, PAD, PAD);
    loaded.forEach((imgs, r) => {
      const y = PAD + TITLE_H + r * (sh + ROW_GAP);
      // row label in the left gutter, vertically centred on the row band
      ctx.fillStyle = '#6b5a45';
      ctx.textBaseline = 'middle';
      ctx.font = '600 12px ui-monospace, Menlo, monospace';
      ctx.fillText(rows[r].label, PAD, y + sh / 2);
      ctx.textBaseline = 'top';
      imgs.forEach((im, i) => {
        const x = PAD + GUTTER + i * (fw + GAP);
        // draw only the top `sh` px of the source, 1:1 into the cell
        ctx.drawImage(im, 0, 0, fw, sh, x, y, fw, sh);
        ctx.strokeStyle = '#cdbf9d';
        ctx.strokeRect(x + 0.5, y + 0.5, fw - 1, sh - 1);
      });
    });
    // time labels under the bottom row
    const yCap = PAD + TITLE_H + R * sh + (R - 1) * ROW_GAP + 5;
    ctx.fillStyle = '#8a785f';
    ctx.font = '12px ui-monospace, Menlo, monospace';
    colLabels.forEach((lab, i) => {
      const x = PAD + GUTTER + i * (fw + GAP);
      ctx.fillText(lab, x + 2, yCap);
    });
    return canvas.toDataURL('image/png');
  }, { rows, title, colLabels, keepFrac });
  return dataUrl;
}

async function motionCrossRun(baseUrl, outDir, dateTag, shaShort) {
  const base = baseUrl.endsWith('/') ? baseUrl : baseUrl + '/';
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch(launchOpts());
  try {
    const rows = [];
    for (const row of MOTION_CROSS_ROWS) {
      const fullUrl = new URL(row.url_path, base).toString();
      const frames = await grabSceneFrames(browser, fullUrl, MOTION_CROSS_STATE);
      rows.push({ label: row.label, frames });
    }
    // Composite on a throwaway blank page.
    const compContext = await browser.newContext({ deviceScaleFactor: 1 });
    try {
      const page = await compContext.newPage();
      await page.setContent('<!doctype html><body></body>', { waitUntil: 'load' });
      const spanS = ((MOTION_FRAMES - 1) * MOTION_INTERVAL_MS / 1000).toFixed(1);
      const title = `motion — cross-view · one wind told twice: front smoke leans, door side stands · ${MOTION_FRAMES} frames over ${spanS}s (read → for time, ↓ to compare)`;
      const colLabels = Array.from({ length: MOTION_FRAMES }, (_, i) => `t=${((i * MOTION_INTERVAL_MS) / 1000).toFixed(1)}s`);
      const outPath = path.join(outDir, `${dateTag}-${shaShort}-motion-cross.png`);
      const dataUrl = await compositeCrossStrip(page, rows, title, colLabels, MOTION_CROSS_KEEP_FRAC);
      const b64 = dataUrl.split(',')[1];
      console.log(`screenshot: writing ${outPath}`);
      fs.writeFileSync(outPath, Buffer.from(b64, 'base64'));
    } finally {
      await compContext.close();
    }
  } finally {
    await browser.close();
  }
  console.log('screenshot: done — 1 cross-view motion filmstrip');
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

  if (args[0] === '--motion') {
    const [, baseUrl, outDir, dateTag, shaShort] = args;
    if (!baseUrl || !outDir || !dateTag || !shaShort) {
      console.error('screenshot: usage — screenshot.js --motion BASE_URL OUT_DIR DATE_TAG SHA_SHORT');
      process.exit(2);
    }
    await motionRun(baseUrl, outDir, dateTag, shaShort);
    return;
  }

  if (args[0] === '--motion-cross') {
    const [, baseUrl, outDir, dateTag, shaShort] = args;
    if (!baseUrl || !outDir || !dateTag || !shaShort) {
      console.error('screenshot: usage — screenshot.js --motion-cross BASE_URL OUT_DIR DATE_TAG SHA_SHORT');
      process.exit(2);
    }
    await motionCrossRun(baseUrl, outDir, dateTag, shaShort);
    return;
  }

  const [url, out] = args;
  if (!url || !out) {
    console.error('screenshot: usage — screenshot.js URL OUT_PNG');
    console.error('              or — screenshot.js --manifest MANIFEST_JSON BASE_URL OUT_DIR DATE_TAG SHA_SHORT');
    console.error('              or — screenshot.js --gallery BASE_URL OUT_DIR DATE_TAG SHA_SHORT');
    console.error('              or — screenshot.js --motion BASE_URL OUT_DIR DATE_TAG SHA_SHORT');
    console.error('              or — screenshot.js --motion-cross BASE_URL OUT_DIR DATE_TAG SHA_SHORT');
    process.exit(2);
  }
  await singleShot(url, out);
})().catch((e) => {
  console.error('screenshot: failed —', e.message);
  process.exit(1);
});
