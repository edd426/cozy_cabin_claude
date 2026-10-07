#!/usr/bin/env node
/* tools/check-load-order.js — agent-mutable.
 *
 * Day 152 (2026-10-07). Holds every page to the order its scripts load in.
 *
 * Six files here publish a read-only reckoning on `window` — `CabinSky`,
 * `CabinSeason`, `CabinBloom` and the rest (the Day-97 export move) — and
 * other files read them. Every reader is written defensively: if the
 * reckoning is not there yet, it falls back to something plain and carries
 * on. That fallback is quiet on purpose, so a page never breaks for want of
 * one file. It is also exactly why the founder's 2026-10-06 bug hid for 36
 * days: on the home page `sky.js` loaded AFTER `bloom-clock.js` and
 * `garden.js`, so whenever `garden.json` beat `sky.js` down the wire the bed
 * read `window.CabinSky` before it existed, fell back to a flat pace, and drew
 * a different set of flowers on the same date. Nothing broke. A slow phone
 * simply saw the wrong bed, and twice a camera did.
 *
 * WHAT IT HOLDS. One claim:
 *
 *     On no page does any script read a `window.Cabin*` reckoning before the
 *     file that publishes it has run — however late that file arrives.
 *
 * HOW. Nothing here is a hand-written list. The names are read off the source
 * (every `window.CabinX = ` in a .js file of this tree), and the pages off
 * `scripts/views.json` plus the 404. Before any page script runs, each name is
 * replaced by a getter and a setter that note who touched it and when; a read
 * while the name is still unset is the fault. Each page is opened once as it
 * comes, which also says which file publishes each name there (from the
 * setter's own stack). Then it is opened again once per publisher, with that
 * one file held back on the wire for HOLD_MS — the slow phone, on purpose —
 * because the order fault only shows when the timing is unkind, and a guard
 * that waits for luck is the 36-day guard all over again.
 *
 * A read of a name nothing on that page ever publishes is reported too, under
 * NEVER: it is the same quiet fallback, taken every time instead of sometimes.
 *
 * HANDED NOTHING. If the source holds no names, or no page ever publishes
 * one, there is nothing to have held, and it says so and goes red rather than
 * returning a clean bill on an empty room (Days 129, 130).
 *
 * BLIND. It sees only reads that happen while the page loads and settles —
 * a reader that waits for a tap (touch.js asks for `CabinSound` only when a
 * hand arrives) is never exercised, so a page that forgot `sound.js` would
 * pass here and fail silently under a finger (CLAUDE.md, Day 144). And it
 * holds back one file at a time: a fault that needs two slow files at once is
 * outside it.
 *
 * Usage: node tools/check-load-order.js [base-url]
 *   exit 0 — held; exit 1 — a page read a reckoning early, or nothing to hold.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const ROOT = path.resolve(__dirname, '..');
const DEFAULT_BASE = 'https://edd426.github.io/cozy_cabin_claude/';
const HOLD_MS = 1500;      // the founder reproduced the bed's fault with 1.5s
const SETTLE_MS = 800;     // after networkidle, for a late fetch's callback

/* Every `window.CabinX = ` in the tree's own .js files. Read off the source
 * so a seventh reckoning is held the morning it is written. */
function publishedNames() {
  const names = new Set();
  const skip = new Set(['node_modules', '.git', 'previews', 'tools', 'scripts']);
  (function walk(dir) {
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      if (skip.has(ent.name)) continue;
      const p = path.join(dir, ent.name);
      if (ent.isDirectory()) walk(p);
      else if (ent.name.endsWith('.js')) {
        const src = fs.readFileSync(p, 'utf8');
        for (const m of src.matchAll(/window\.(Cabin[A-Za-z]+)\s*=(?!=)/g)) names.add(m[1]);
      }
    }
  })(ROOT);
  return [...names].sort();
}

function pages() {
  const views = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/views.json'), 'utf8'));
  return views.map((v) => ({ name: v.name, url_path: v.url_path }))
    .concat([{ name: '404', url_path: '404.html' }]);
}

/* Runs in the page before any of its scripts. Each name becomes an accessor
 * that notes the first set, and every read made while still unset, with the
 * script that made it (the first .js URL on the stack that isn't this). */
function trap(names) {
  const log = { early: [], set: {} };
  window.__loadOrder = log;
  const who = () => {
    const lines = String(new Error().stack || '').split('\n');
    for (const l of lines) {
      const m = l.match(/(https?:\/\/[^\s)]+?\.js)/);
      if (m) return m[1];
    }
    return '(inline)';
  };
  for (const name of names) {
    let value; let isSet = false;
    Object.defineProperty(window, name, {
      configurable: true,
      get() {
        if (!isSet) log.early.push({ name, by: who(), t: Math.round(performance.now()) });
        return value;
      },
      set(v) {
        if (!isSet) log.set[name] = { by: who(), t: Math.round(performance.now()) };
        isSet = true; value = v;
      },
    });
  }
}

function launchOpts() {
  const exe = process.env.COZY_CABIN_CHROMIUM_PATH;
  return exe ? { executablePath: exe } : {};
}

const short = (u) => u.replace(/^https?:\/\/[^/]+/, '').replace(/^\/cozy_cabin_claude/, '');

async function visit(browser, url, names, hold) {
  const ctx = await browser.newContext({ viewport: { width: 375, height: 800 } });
  const page = await ctx.newPage();
  await page.addInitScript(trap, names);
  if (hold) {
    await page.route((u) => u.href.split('?')[0] === hold, async (route) => {
      await new Promise((r) => setTimeout(r, HOLD_MS));
      await route.continue();
    });
  }
  await page.goto(url, { waitUntil: 'load', timeout: 30000 });
  await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(SETTLE_MS);
  const log = await page.evaluate(() => window.__loadOrder);
  await ctx.close();
  return log;
}

async function main() {
  const arg = process.argv.slice(2).find((a) => !a.startsWith('--')) ||
              process.env.COZY_CABIN_URL || DEFAULT_BASE;
  const base = arg.endsWith('/') ? arg : arg + '/';
  const names = publishedNames();
  console.log(`check-load-order: holding ${base} to the order its scripts load in`);
  console.log(`check-load-order: ${names.length} reckoning(s) published in the source: ` +
              names.join(', '));
  if (!names.length) {
    console.error('check-load-order: FAIL — no window.Cabin* reckoning found in the source; ' +
                  'there is nothing to hold, and an empty room is not a clean one');
    process.exit(1);
  }

  const browser = await chromium.launch(launchOpts());
  let failures = 0; let publishedAnywhere = 0; let loads = 0;
  for (const p of pages()) {
    const url = base + p.url_path;
    const plain = await visit(browser, url, names, null); loads++;
    const publishers = [...new Set(Object.values(plain.set).map((s) => s.by))]
      .filter((u) => u.startsWith('http'));
    publishedAnywhere += Object.keys(plain.set).length;
    const findings = []; const seen = new Set();
    const note = (e, held) => {
      // A NEVER read happens whatever is held back, so it is said once.
      const key = `${e.name}|${e.by}|${plain.set[e.name] ? held || '' : ''}`;
      if (seen.has(key)) return; seen.add(key);
      findings.push({ ...e, held });
    };
    plain.early.forEach((e) => note(e, null));
    for (const hold of publishers) {
      const log = await visit(browser, url, names, hold); loads++;
      log.early.forEach((e) => note(e, hold));
    }
    const early = findings.filter((f) => plain.set[f.name]);
    const never = findings.filter((f) => !plain.set[f.name]);
    const pubs = Object.entries(plain.set).map(([n, s]) => `${n}←${short(s.by)}`).join(', ') || 'none';
    if (!early.length && !never.length) {
      console.log(`HELD  ${p.name} — publishes ${pubs}; no early read with any one of ` +
                  `${publishers.length} publisher(s) held back ${HOLD_MS}ms`);
      continue;
    }
    failures++;
    console.log(`BROKE ${p.name} — publishes ${pubs}`);
    for (const f of early) {
      console.log(`        ✗ ${short(f.by)} read ${f.name} at ${f.t}ms, before ` +
                  `${short(plain.set[f.name].by)} had run` +
                  (f.held ? ` (with ${short(f.held)} held back ${HOLD_MS}ms)` : ' (with nothing held back)'));
    }
    for (const f of never) {
      console.log(`        ✗ NEVER ${short(f.by)} read ${f.name}, which nothing on this page publishes`);
    }
  }
  await browser.close();
  console.log('');
  console.log(`check-load-order: ${loads} page load(s)`);
  if (!publishedAnywhere) {
    console.error('check-load-order: FAIL — no page published a single reckoning; the ' +
                  'traps saw nothing, so nothing was held');
    process.exit(1);
  }
  if (failures) {
    console.error(`check-load-order: FAIL — ${failures} page(s) read a reckoning before it existed`);
    process.exit(1);
  }
  console.log('check-load-order: OK — no page reads a reckoning before its publisher has run.');
}

main().catch((err) => { console.error('check-load-order: FAIL —', err.message); process.exit(1); });
