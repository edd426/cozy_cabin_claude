#!/usr/bin/env node
// scripts/screenshot.js URL [OUT_DAY_PNG] [OUT_DAY_SHA_PNG]
//
// Captures the deployed cabin site at phone-viewport size (375×800) and
// writes one or two PNGs the agent can read on the next day to "see" what
// the previous day's deploy looks like.
//
// Run from the GitHub Actions screenshot job. Locally it works too if you
// have playwright installed (`npm install playwright`).

const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const url = process.argv[2];
  const outA = process.argv[3] || 'previews/today.png';
  const outB = process.argv[4]; // optional second copy keyed by SHA

  if (!url) {
    console.error('screenshot: URL required as first argument');
    process.exit(2);
  }

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 375, height: 800 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  console.log(`screenshot: navigating to ${url}`);
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  // Give the inline scene loader a moment to fetch and render scene.html.
  await page.waitForTimeout(1500);

  console.log(`screenshot: writing ${outA}`);
  await page.screenshot({ path: outA, fullPage: true });

  if (outB) {
    console.log(`screenshot: writing ${outB}`);
    await page.screenshot({ path: outB, fullPage: true });
  }

  await browser.close();
  console.log('screenshot: done');
})().catch((e) => {
  console.error('screenshot: failed —', e.message);
  process.exit(1);
});
