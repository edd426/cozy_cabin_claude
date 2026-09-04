#!/usr/bin/env node
/* tools/check-drift.js — agent-mutable.
 *
 * Day 119 (2026-09-04). The witness that holds no opinion.
 *
 * Every other guard in this clearing is made of things Wren believes. The
 * almanac's witnesses (Day 98) go to a named state and hold a reading to a
 * number she wrote. The vows' floors and ceilings (Days 99, 102) hold a bound
 * she chose. The lean sweep (Day 103) walks the whole frame but reads one way
 * of drawing a lean, minus a list she compiled. The two weighings (Days 104,
 * 118) ask a question she thought to ask. And the way each of them was proved
 * to work was the same: break the yard on purpose, in a way she had imagined,
 * and go and see whether it noticed.
 *
 * So what they catch is bounded by her imagination, and the record already
 * holds the case against that. The far keeper published six days of a wrong
 * number with both of his own checks honestly green, and what caught him was
 * not a check at all — it was somebody who walked to an observatory and
 * carried an answer back from outside.
 *
 * THIS ONE KNOWS NOTHING ABOUT THE YARD. It holds one claim, and the claim
 * contains no fact about this place whatever:
 *
 *     The clearing is a function of its own lines, so at a fixed instant it
 *     may differ from the picture it made yesterday only where those lines
 *     were changed.
 *
 * Pin the clock (Day 95's trick) and every date-driven layer — the season, the
 * band edges, the bed's seats, the pot's bloom-days, the woodpile's courses —
 * reckons the same answer it reckoned last week. Stop the animations at one
 * absolute instant (Day 109's trick) and the moving layers stand still in the
 * same place. What is left is a picture that can only move if the drawing
 * moved. Hold this morning's against the one kept in previews/baseline/ and
 * every difference is either a thing today meant, or a thing today did not
 * mean and nobody imagined asking about.
 *
 * That second kind is the whole point. It is the only witness here that can
 * report a finding its author never thought of, because it was never told what
 * to look for — only what the frame looked like before.
 *
 * WHAT IT COSTS. A day that changes the yard turns this red, and the fix is to
 * look at what moved, agree that all of it was meant, and refresh the baseline
 * in the same commit (`--accept`). That is not friction to be engineered away;
 * it is the guard. The red is a demand that the change be *declared*, and the
 * finding — when there is one — is the pixels in the report that you cannot
 * account for.
 *
 * WHAT IT CANNOT SEE. Three things, and they are the honest limits (Day 103:
 * when a guard changes shape its blind note goes stale, so this list is the
 * blind note and belongs beside the guard).
 *
 *   (1) It cannot see a thing that has ALWAYS been wrong. It compares this
 *       morning to yesterday, never to the truth. A sprite that has been lit
 *       down one edge since June is in the baseline, and this will defend that
 *       lean forever. It catches change, not error. Every other guard here is
 *       the other way round, which is why this one is worth having beside them
 *       and not instead of them.
 *
 *   (2) It only sees the frames in FRAMES, at the instants they name. Six
 *       pictures cannot hold four seasons times four bands times four views. A
 *       layer gated on a state no frame stands in is invisible here —
 *       tools/check-gallery.js is the guard that holds the *record's* coverage,
 *       and this inherits whatever coverage FRAMES has and no more.
 *
 *   (3) It only sees what falls inside the scene's own frame, inset past the
 *       border (see INSET), and it cannot tell a picture from the browser that
 *       drew it. A different Chromium build could in principle rasterise a
 *       gradient a shade differently and read as drift; DRIFT_CHANNEL_TOL and
 *       DRIFT_FAIL_PIXELS are the two knobs for that, and both can be set from
 *       the environment so the workflow can move them without touching this
 *       file. If this ever reports a handful of scattered pixels that nothing
 *       in the day's work explains, that is the thing to suspect first.
 *
 *   (4) It only sees a layout it stands in front of. This was not reasoned out
 *       — it was found on the day the tool was written, by a break-test that
 *       failed to break: nudging `.sprite--bench` in the base rule moved
 *       nothing, because at 375px the `max-width: 599px` block overrides that
 *       property and the base rule is dead there. Every frame below was narrow.
 *       That is the Day-33/34 phone blind spot in new clothes, so `viewport`
 *       exists on a frame and the last entry of FRAMES stands at the 3x
 *       layout's own width. Two widths still are not all widths.
 *
 * Run:  node tools/check-drift.js [BASE_URL] [--accept] [--out DIR] [--prefix P]
 *
 *   (no flags)   render every frame, diff against previews/baseline/, report,
 *                and exit non-zero if anything moved.
 *   --accept     render every frame and WRITE previews/baseline/ from it. The
 *                declaration that today's change was meant. Commit the result
 *                alongside the change it records.
 *   --out DIR    where the diff pictures go (default: the system temp dir).
 *   --prefix P   prepended to each diff picture's filename, so CI can date and
 *                sha them into the permanent record.
 *
 * BASE_URL falls back to COZY_CABIN_URL, then to the deployed site.
 */
'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');
const { chromium } = require('playwright');

const DEFAULT_BASE = 'https://edd426.github.io/cozy_cabin_claude/';

/* Where the kept frames live. previews/ is excluded from the deployed site by
 * pages.yml's rsync, so these cost the visitor nothing; and a subdirectory is
 * not matched by the memory pass's `previews/*.png` glob, so they don't crowd
 * the morning read either. */
const BASELINE_DIR = path.join(__dirname, '..', 'previews', 'baseline');

/* The phone width every other camera here stands at. A frame may name its own
 * `viewport` instead; the last of FRAMES does, because the yard is laid out
 * twice and a narrow-only guard defends only half of it (see blind note 4). */
const VIEWPORT = { width: 375, height: 800 };
const WIDE_VIEWPORT = { width: 900, height: 900 };

/* The washes transition over 1.6s; the same 2s screenshot.js waits. */
const WASH_SETTLE_MS = 2000;
/* Two frames' grace after the animations are pinned, before the shutter. */
const PIN_SETTLE_MS = 120;

/* Pixels inside the .scene box we ignore: the 4px border and the 2px inner
 * radius its `overflow: hidden` clips content to. Those corners are the only
 * antialiased geometry in the frame that belongs to the frame rather than to
 * the drawing, so they are cut out rather than defended. */
const INSET = 6;

/* A pixel counts as changed when any channel differs by at least this much.
 * Solid fills and pixel art make this a wide gate: a moved sprite differs by
 * tens, a rasteriser's rounding by one or two. */
const CHANNEL_TOL = Number(process.env.DRIFT_CHANNEL_TOL || 8);

/* And a frame counts as drifted at this many changed pixels. Deliberately
 * small — a single fallen leaf is nine pixels — but not one, so a stray
 * rounding difference cannot cry wolf. */
const FAIL_PIXELS = Number(process.env.DRIFT_FAIL_PIXELS || 8);

/* ── the frames ───────────────────────────────────────────────────────────────
 * Each is one view at one pinned instant. The instants are chosen to light as
 * many gated layers as six pictures can — not to name a state the prose cares
 * about, which is what every other guard here does. Nothing about a frame says
 * what it should contain; the whole content of a frame is the picture beside
 * it in previews/baseline/.
 *
 * A `clock` is parsed as local time and both the runner and the sandbox are
 * UTC, so the instant is the same wherever this runs. */
const FRAMES = [
  /* midsummer noon: the home season, everything at its plainest. */
  { name: 'home-summer-day', view: '', clock: '2026-06-15T12:00' },
  /* mid-autumn first light: the gild, the falling leaves, the dawn fog and its
   * rose, the pile laid up to its third course. */
  { name: 'home-autumn-dawn', view: '', clock: '2026-10-15T07:00' },
  /* the solstice after dark: the winter hush, the cleared sky and its stars,
   * the deepened chimney breath, the pile burnt low. */
  { name: 'home-winter-night', view: '', clock: '2026-12-21T20:00' },
  /* the door side at midsummer dusk: the lantern kindled, the gold wash, the
   * hills on their own side of that frame, the stray sparks, the pot. */
  { name: 'around-summer-dusk', view: 'around/', clock: '2026-06-15T20:00' },
  /* the room in deep winter: the taller fire, the floor pool at its longest,
   * the two cast shadows, the lit breast and the mantle's shade, the sprig
   * drawn in, the window's band hushed. */
  { name: 'inside-winter-day', view: 'inside/', clock: '2026-12-21T12:00' },
  /* the plan from overhead, which answers to no hour at all — so if this one
   * ever moves, the change is in the drawing and nowhere else. */
  { name: 'map-summer-day', view: 'map/', clock: '2026-06-15T12:00' },
  /* and the same front yard at the 3x layout's own width, where a different
   * set of rules is in force. Below 600px theme.css caps the column and the
   * `max-width: 599px` block takes over, so a change made only in a base rule
   * lands here and nowhere in the five frames above. */
  {
    name: 'home-summer-day-wide',
    view: '',
    clock: '2026-06-15T12:00',
    viewport: WIDE_VIEWPORT,
  },
];

function launchOpts() {
  const exe = process.env.COZY_CABIN_CHROMIUM_PATH;
  return exe ? { executablePath: exe } : {};
}

/* ── in-page helpers ───────────────────────────────────────────────────────── */

/* Pin the page's clock before any of its own scripts run, so sky.js,
 * season.js, garden.js, door-plant.js and bloom-clock.js each reckon their own
 * state from the named instant exactly as they would for a visitor standing
 * there. Keep Fake.prototype = Real.prototype and re-export now/parse/UTC —
 * garden.js and door-plant.js call Date.UTC directly (Day 95). */
async function freezeClock(page, iso) {
  await page.addInitScript((fixedIso) => {
    const fixed = new Date(fixedIso).getTime();
    const Real = Date;
    function Fake(...args) {
      if (!(this instanceof Fake)) return new Real(fixed).toString();
      return args.length === 0 ? new Real(fixed) : new Real(...args);
    }
    Fake.prototype = Real.prototype;
    Fake.now = () => fixed;
    Fake.parse = Real.parse;
    Fake.UTC = Real.UTC;
    window.Date = Fake;
  }, iso);
}

/* Stop every animation and stand the perpetual ones at absolute zero. Absolute
 * rather than each-to-its-own-fraction, for the Day-109 reason: a negative
 * animation-delay is a real phase offset between layers, and dragging each to
 * the same fraction of its own period would be a lie about their rates. Zero
 * is not a meaningful moment of any round — it is simply the same moment every
 * time, which is all a comparison needs. */
function pinAnimations() {
  const anims = document.getAnimations();
  for (const a of anims) {
    try {
      a.pause();
      const timing = a.effect && a.effect.getComputedTiming();
      if (timing && timing.iterations === Infinity) a.currentTime = 0;
    } catch (e) {
      /* a finished transition may refuse to be driven; it is already where it
       * belongs, and pausing the rest is what matters. */
    }
  }
  return anims.length;
}

/* The window to photograph: the scene's own box, inset past its border and the
 * inner radius. Measured, never written down — the scene is laid out from a
 * percentage width inside a capped column, so a hardcoded rect would be right
 * at one viewport and wrong at the next. */
function measureSceneClip(inset) {
  const scene = document.querySelector('.scene');
  if (!scene) return null;
  const r = scene.getBoundingClientRect();
  return {
    x: Math.round(r.left + inset),
    y: Math.round(r.top + inset),
    width: Math.round(r.width - inset * 2),
    height: Math.round(r.height - inset * 2),
  };
}

/* ── capture ───────────────────────────────────────────────────────────────── */

async function captureFrame(browser, base, frame) {
  const context = await browser.newContext({
    viewport: frame.viewport || VIEWPORT,
    /* deviceScaleFactor 1 so the comparison runs on the true pixel grid the
     * art is drawn on, and a diff is countable in the units the yard is made
     * of rather than in half-pixels. */
    deviceScaleFactor: 1,
    timezoneId: 'UTC',
  });
  const page = await context.newPage();
  try {
    await freezeClock(page, frame.clock);
    const url = new URL(frame.view, base).toString();
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    /* The home scene is fetched into #scene-mount after load. */
    await page.waitForSelector('.scene', { timeout: 15000 });
    await page.waitForTimeout(WASH_SETTLE_MS);
    const anims = await page.evaluate(pinAnimations);
    await page.waitForTimeout(PIN_SETTLE_MS);
    const clip = await page.evaluate(measureSceneClip, INSET);
    if (!clip || clip.width < 1 || clip.height < 1) {
      throw new Error(`no measurable .scene on ${url}`);
    }
    const buf = await page.screenshot({ clip });
    return { buf, clip, anims };
  } finally {
    await context.close();
  }
}

/* ── comparison ───────────────────────────────────────────────────────────────
 * Done on a canvas in the browser, the way the filmstrips are composited (Day
 * 73) — it keeps this tool free of any image dependency, and the same page can
 * then draw the report picture from the pixels it has already read. */
async function compareFrames(page, baselinePng, currentPng, tol, name) {
  return page.evaluate(async ({ aSrc, bSrc, tol, name }) => {
    function load(src) {
      return new Promise((resolve, reject) => {
        const im = new Image();
        im.onload = () => resolve(im);
        im.onerror = () => reject(new Error('could not decode a frame'));
        im.src = src;
      });
    }
    function dataOf(im) {
      const c = document.createElement('canvas');
      c.width = im.naturalWidth;
      c.height = im.naturalHeight;
      const cx = c.getContext('2d');
      cx.imageSmoothingEnabled = false;
      cx.drawImage(im, 0, 0);
      return cx.getImageData(0, 0, c.width, c.height);
    }

    const [a, b] = await Promise.all([load(aSrc), load(bSrc)]);
    if (a.naturalWidth !== b.naturalWidth || a.naturalHeight !== b.naturalHeight) {
      return {
        resized: true,
        was: { w: a.naturalWidth, h: a.naturalHeight },
        now: { w: b.naturalWidth, h: b.naturalHeight },
      };
    }

    const W = a.naturalWidth, H = a.naturalHeight;
    const ad = dataOf(a).data, bd = dataOf(b).data;
    const mask = new Uint8Array(W * H);
    let changed = 0, minX = W, minY = H, maxX = -1, maxY = -1;
    for (let i = 0, p = 0; p < W * H; p++, i += 4) {
      const d = Math.max(
        Math.abs(ad[i] - bd[i]),
        Math.abs(ad[i + 1] - bd[i + 1]),
        Math.abs(ad[i + 2] - bd[i + 2]),
        Math.abs(ad[i + 3] - bd[i + 3])
      );
      if (d < tol) continue;
      mask[p] = 1;
      changed++;
      const x = p % W, y = (p - x) / W;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
    const box = changed
      ? { x: minX, y: minY, w: maxX - minX + 1, h: maxY - minY + 1 }
      : null;
    if (!changed) return { resized: false, changed: 0, total: W * H, box: null };

    /* The report picture: kept | now | what moved. Three panels at 1:1 with
     * smoothing off, on the site's own cream, so it reads as part of the
     * record rather than as tooling output. The third panel is this morning's
     * frame washed pale with every changed pixel struck in rose — the record's
     * own flag colour — and the bounding box drawn round the lot, because the
     * first question on reading one of these is always "where". */
     const PAD = 16, GAP = 10, TITLE_H = 26, CAP_H = 22;
    const cw = PAD * 2 + W * 3 + GAP * 2;
    const ch = PAD * 2 + TITLE_H + H + CAP_H;
    const canvas = document.createElement('canvas');
    canvas.width = cw;
    canvas.height = ch;
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    ctx.fillStyle = '#f4ecd0';
    ctx.fillRect(0, 0, cw, ch);
    ctx.textBaseline = 'top';
    ctx.fillStyle = '#6b5a45';
    ctx.font = '600 14px ui-monospace, Menlo, monospace';
    ctx.fillText(`${name} — ${changed} px moved`, PAD, PAD);

    const labels = ['kept', 'this morning', 'what moved'];
    for (let i = 0; i < 3; i++) {
      const x = PAD + i * (W + GAP);
      const y = PAD + TITLE_H;
      ctx.drawImage(i === 0 ? a : b, x, y);
      if (i === 2) {
        ctx.fillStyle = 'rgba(244, 236, 208, 0.72)';
        ctx.fillRect(x, y, W, H);
        const strike = ctx.getImageData(x, y, W, H);
        for (let p = 0; p < W * H; p++) {
          if (!mask[p]) continue;
          const q = p * 4;
          strike.data[q] = 199;
          strike.data[q + 1] = 67;
          strike.data[q + 2] = 107;
          strike.data[q + 3] = 255;
        }
        ctx.putImageData(strike, x, y);
        ctx.strokeStyle = '#c1436b';
        ctx.strokeRect(x + box.x - 1.5, y + box.y - 1.5, box.w + 3, box.h + 3);
      }
      ctx.strokeStyle = '#cdbf9d';
      ctx.strokeRect(x + 0.5, y + 0.5, W - 1, H - 1);
      ctx.fillStyle = '#8a785f';
      ctx.font = '12px ui-monospace, Menlo, monospace';
      ctx.fillText(labels[i], x + 2, y + H + 5);
    }
    return {
      resized: false,
      changed,
      total: W * H,
      box,
      picture: canvas.toDataURL('image/png'),
    };
  }, {
    aSrc: 'data:image/png;base64,' + baselinePng.toString('base64'),
    bSrc: 'data:image/png;base64,' + currentPng.toString('base64'),
    tol,
    name,
  });
}

/* ── main ─────────────────────────────────────────────────────────────────── */

function parseArgs(argv) {
  const out = { accept: false, outDir: os.tmpdir(), prefix: '', base: null };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--accept') out.accept = true;
    else if (a === '--out') out.outDir = argv[++i];
    else if (a === '--prefix') out.prefix = argv[++i];
    else if (a.startsWith('--')) throw new Error(`unknown flag ${a}`);
    else if (!out.base) out.base = a;
    else throw new Error(`unexpected argument ${a}`);
  }
  return out;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const arg = args.base || process.env.COZY_CABIN_URL || DEFAULT_BASE;
  const base = arg.endsWith('/') ? arg : arg + '/';

  console.log(`check-drift: ${args.accept ? 'keeping' : 'holding'} ${FRAMES.length} ` +
              `frame(s) of ${base}`);
  console.log(`check-drift: a pixel counts as moved at channel delta >= ${CHANNEL_TOL}; ` +
              `a frame drifts at >= ${FAIL_PIXELS} such pixels`);
  console.log('');

  fs.mkdirSync(BASELINE_DIR, { recursive: true });
  const browser = await chromium.launch(launchOpts());
  let drifted = 0, missing = 0, pictures = 0;

  try {
    /* One page for every comparison; it only ever holds canvases. */
    const diffContext = await browser.newContext({ deviceScaleFactor: 1 });
    const diffPage = await diffContext.newPage();
    await diffPage.setContent('<!doctype html><title>drift</title>');

    for (const frame of FRAMES) {
      const keptPath = path.join(BASELINE_DIR, `${frame.name}.png`);
      const { buf, clip, anims } = await captureFrame(browser, base, frame);
      const vp = frame.viewport || VIEWPORT;
      const where = `${frame.view || '(home)'} @ ${frame.clock}, ${vp.width}px`;
      const shape = `${clip.width}×${clip.height}`;

      if (args.accept) {
        fs.writeFileSync(keptPath, buf);
        console.log(`KEPT  ${frame.name} — ${shape}, ${anims} animation(s) pinned  [${where}]`);
        continue;
      }

      if (!fs.existsSync(keptPath)) {
        missing++;
        console.log(`NONE  ${frame.name} — no kept frame to hold this against  [${where}]`);
        continue;
      }

      const kept = fs.readFileSync(keptPath);
      const r = await compareFrames(diffPage, kept, buf, CHANNEL_TOL, frame.name);

      if (r.resized) {
        drifted++;
        console.log(`BROKE ${frame.name} — the frame itself changed size, ` +
                    `${r.was.w}×${r.was.h} → ${r.now.w}×${r.now.h}  [${where}]`);
        continue;
      }
      if (r.changed < FAIL_PIXELS) {
        console.log(`HELD  ${frame.name} — ${r.changed} px of ${r.total} moved  [${where}]`);
        continue;
      }

      drifted++;
      const pct = ((r.changed / r.total) * 100).toFixed(3);
      console.log(`BROKE ${frame.name} — ${r.changed} px of ${r.total} moved (${pct}%)  [${where}]`);
      console.log(`        in a box ${r.box.w}×${r.box.h} at (${r.box.x}, ${r.box.y}) ` +
                  `of the ${shape} frame`);
      if (r.picture) {
        fs.mkdirSync(args.outDir, { recursive: true });
        const out = path.join(args.outDir, `${args.prefix}drift-${frame.name}.png`);
        fs.writeFileSync(out, Buffer.from(r.picture.split(',')[1], 'base64'));
        pictures++;
        console.log(`        kept | this morning | what moved → ${out}`);
      }
    }

    await diffContext.close();
  } finally {
    await browser.close();
  }

  console.log('');
  if (args.accept) {
    console.log(`check-drift: kept ${FRAMES.length} frame(s) in ${BASELINE_DIR}.`);
    console.log('check-drift: commit them with the change they record — the baseline ' +
                'IS the declaration that today\'s drift was meant.');
    return;
  }
  if (missing) {
    console.error(`check-drift: FAIL — ${missing} frame(s) have no kept picture. ` +
                  'Run with --accept to keep them.');
    process.exit(1);
  }
  if (drifted) {
    console.error(
      `check-drift: FAIL — ${drifted} frame(s) differ from the picture kept of them` +
      (pictures ? `; ${pictures} report picture(s) written` : '') + '.\n' +
      'Read each one. If every moved pixel is a thing today meant, run again with\n' +
      '--accept and commit the refreshed baseline alongside the change. If any of\n' +
      'it is not, that is the finding — and it is a finding nothing here was told\n' +
      'to look for.'
    );
    process.exit(1);
  }
  console.log('check-drift: OK — the clearing stands exactly as it was kept.');
}

main().catch((err) => {
  console.error('check-drift: FAIL —', err.message);
  process.exit(1);
});
