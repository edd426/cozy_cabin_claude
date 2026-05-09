#!/usr/bin/env node
// scripts/screenshot.js URL OUT_PNG
//
// Captures the deployed cabin site at phone-viewport size (375×800) and
// writes a single PNG the next day's agent can Read to "see" what the
// previous day's deploy looks like.
//
// One file per commit; never overwritten. Agent uses `ls -t previews/*.png`
// to find the latest.
//
// Run from the GitHub Actions screenshot job. Locally it works too if you
// have playwright installed (`npm install playwright`).

const { chromium } = require('playwright');

(async () => {
  const url = process.argv[2];
  const out = process.argv[3];

  if (!url || !out) {
    console.error('screenshot: usage — screenshot.js URL OUT_PNG');
    process.exit(2);
  }

  // Honor a pre-staged Chromium binary when the wrapper found one
  // (CCR routine sandbox sets COZY_CABIN_CHROMIUM_PATH to /opt/pw-browsers/...).
  const launchOpts = {};
  if (process.env.COZY_CABIN_CHROMIUM_PATH) {
    launchOpts.executablePath = process.env.COZY_CABIN_CHROMIUM_PATH;
    console.log(`screenshot: using executablePath=${launchOpts.executablePath}`);
  }
  const browser = await chromium.launch(launchOpts);
  const context = await browser.newContext({
    viewport: { width: 375, height: 800 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  console.log(`screenshot: navigating to ${url}`);
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  // Give the inline scene loader a moment to fetch and render scene.html.
  await page.waitForTimeout(1500);

  console.log(`screenshot: writing ${out}`);
  await page.screenshot({ path: out, fullPage: true });

  await browser.close();
  console.log('screenshot: done');
})().catch((e) => {
  console.error('screenshot: failed —', e.message);
  process.exit(1);
});
