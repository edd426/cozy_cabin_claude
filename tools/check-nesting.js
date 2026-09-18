#!/usr/bin/env node
/* tools/check-nesting.js — agent-mutable.
 *
 * Day 132 (2026-09-17). Holds the LISTS to one another.
 *
 * tools/check-almanac.js holds the almanac's sentences to what the yard does.
 * tools/check-gallery.js holds the record's pictures to what the yard shows.
 * tools/check-drift.js holds this morning's frame to the frame kept of it.
 * This one holds no claim about the clearing at all. It holds one claim about
 * the hand-written selector lists the other checks are made of:
 *
 *     No name on those lists stands inside another name, or over the same
 *     element as another name, without its being written down here.
 *
 * Like the page seal in check-almanac.js (Day 131) and unlike everything on
 * /almanac/, it is not published as a promise of this place, because it is not
 * one. The almanac's page is for what the clearing does and refuses to do; a
 * guard on the runner's own bookkeeping belongs beside the runner.
 *
 * WHY. Day 131 found a witness that would lie if it were handed another
 * witness's damage: `door-plant-tone` hides `.door-plant__foliage`, and
 * `door-paint-lean` isolates `.door-plant`, which is the thing that foliage is
 * inside. Sharing a page, the second still found pixels — the pot, with the
 * plant gone out of it — and returned a plausible number instead of nothing.
 * The seal shuts that: a reading taken on a page whose seal has moved is not a
 * reading.
 *
 * But the seal catches the collision at the moment it happens, and only when
 * two readings actually share a page. The nesting is what makes sharing
 * dangerous in the first place, and it was there for a fortnight before
 * anything noticed — written into two lists a fortnight apart, by a hand that
 * never had both of them in view. Nothing anywhere knew that one name can
 * stand inside another. That is what this reads.
 *
 * It is the same turn Day 103 made on the lean sweep, one level in. A guard
 * aimed at the places a hand chose can only hold the faults that hand thought
 * of; a guard aimed at everything, minus what is written down, holds the yard.
 * Here the "everything" is every relation among the names, and the "minus" is
 * DECLARED below — and the cost is the point of it, exactly as it was there:
 * every containment in this place now has to be named and reasoned for, so
 * what used to be the nestings nobody noticed is the list of nestings claimed.
 *
 * WHAT IT READS. `window.CabinAlmanac.PROBES`, off the page, the way
 * check-gallery reads GALLERY_STATES off the camera — so it can only ever hold
 * the names the yard is actually measured by. Per probe: `selector`, `of`
 * (a string or a list), and for the sweeps and the exemption checks every
 * `allow[].selector` and `allow[].against`. Then each scene view is opened once
 * and the relations are taken off the rendered DOM rather than reasoned out of
 * the strings, because `.chair` and `.scene--inside .chair` are different
 * strings for one element and no amount of reading them tells you so.
 *
 * Three relations, and they are different faults:
 *   inside  — every element one name matches sits within one the other matches
 *   same    — two names match exactly the same elements (two names, one thing)
 *   overlap — two names share some elements and not others
 *
 * FRAMES. `.scene` is the root of every view and so contains every other name
 * in it; that is not news, it is what a frame is. The frame selectors are
 * declared in FRAMES rather than special-cased, so the exclusion is as visible
 * as the rest of the list.
 *
 * WHAT IT CANNOT SEE — written here rather than left to be discovered, which
 * is the standing habit (Day 103, Day 124).
 *
 * (1) It reads NAMES, never behaviour. It says two names touch; it cannot say
 * whether that costs anything. Every entry in DECLARED carries a reason, and
 * nothing here ever reads the reason — the Day-123 hole, one level out: a
 * declaration that never belonged reads green forever.
 *
 * (2) A DECLARED relation that is not found today is a note and not a failure,
 * and that asymmetry is deliberate. A declaration excuses nothing — unlike a
 * lean exemption, which subtracts a thing from a sweep — so a stale one costs
 * nothing, and the DOM here honestly varies: a bloom seat on the pot's wheel
 * can be empty on the morning this runs, and `.door-plant__bloom` then matches
 * fewer elements or none. The guard exists to catch a relation appearing, not
 * one going away.
 *
 * (3) It sees the DOM of one morning in one state. Nothing here is gated into
 * or out of the tree by season or hour — the layers that turn are gated with
 * `display`, which leaves them in the tree — but a later day that built a layer
 * by adding and removing elements would hide its relations from this.
 *
 * Run: node tools/check-nesting.js [BASE_URL] [--survey]
 * `--survey` prints every relation found and declares nothing failed, which is
 * how DECLARED below was written in the first place. Falls back to
 * COZY_CABIN_URL, then to the deployed site. Wired into pages.yml beside
 * check-gallery, after the previews are committed, without continue-on-error.
 */
'use strict';

const { chromium } = require('playwright');

const DEFAULT_BASE = 'https://edd426.github.io/cozy_cabin_claude/';

/* The scene views. The record rooms carry no probes. */
const VIEW_PATH = { home: '', around: 'around/', inside: 'inside/' };

const VIEWPORT = { width: 375, height: 800 };

/* Roots, not bodies. A frame contains everything in its view by definition, so
 * the containment it has with every other name is not a finding. Anything
 * added here stops being checkable as an inner OR an outer, so it wants to be
 * a thing no witness ever reads as an object — which is what `.scene` is: the
 * three sweeps, the two weighings and the two tone probes all name it as the
 * frame they walk, never as a thing they measure. */
const FRAMES = ['.scene'];

/* ── the declared relations ───────────────────────────────────────────────────
 * Every containment, aliasing and overlap among the names, with why it is so.
 * Written from the survey (`--survey`) rather than guessed: Day 103's rule,
 * and it was right again — the one that matters here was not one I would have
 * listed from memory. Add to this list only with a reason somebody could
 * argue with. */
const DECLARED = [
  {
    rel: 'inside', inner: '.brick-course', outer: '.front-cabin', where: ['home'],
    why: 'the running bond is drawn on the cabin, so the exemption that permits its ' +
         'upright joints sits inside a body `home-paint-lean` weighs. They never ask the ' +
         'same question of it: the exemption reads the gradient that draws the joint, and ' +
         'the weighing reads pixels and is blind to how any of them were painted.',
  },
  {
    rel: 'inside', inner: '.brick-course', outer: '.side-cabin', where: ['around'],
    why: 'the same brick on the other face, inside the body `door-paint-lean` weighs — ' +
         'one wall, one chimney, and the same two questions that do not meet.',
  },
  {
    rel: 'inside', inner: '.bench__back', outer: '.sprite--bench', where: ['home'],
    why: 'the slatted back is part of the bench, so the exemption for the meadow showing ' +
         'between its boards sits inside the body `home-paint-lean` weighs. As the brick: ' +
         'a gradient reading inside a pixel reading, which cannot disturb it.',
  },
  {
    rel: 'inside', inner: '.sprite--woodpile .woodpile-log', outer: '.sprite--woodpile',
    where: ['home'],
    why: 'the rick at the front wall is one body to `home-paint-lean` and a count of split ' +
         'logs to `woodpile-logs`. The logs are the whole of what the rick draws, so a ' +
         'weighing taken on a page where the logs had been hidden would find nothing and ' +
         'say so — the loud failure, not the quiet one.',
  },
  {
    rel: 'inside', inner: '.flower', outer: '.sprite--flowers', where: ['home'],
    why: 'the Day-131 pair on this face, and the loud half of it: `flower-tone` and ' +
         '`flower-hush` hide `.flower`, `home-paint-lean` isolates the patch that holds ' +
         'them, and the stems are the whole of what the patch draws — so sharing a page ' +
         'leaves the weighing nothing and it comes back missing rather than plausible. ' +
         'Measured on 2026-09-16.',
  },
  {
    rel: 'inside', inner: '.door-plant__foliage', outer: '.door-plant', where: ['around'],
    why: 'THE ONE THAT BIT. `door-plant-tone` hides the foliage; `door-paint-lean` isolates ' +
         'the pot it grows out of. Unlike the patch above, the pot survives its plant being ' +
         'hidden — so a shared page leaves pixels to read and the weighing returns a number ' +
         'twice as far off centre as the truth, green and wrong. Held by the page seal in ' +
         'check-almanac.js since Day 131; named here so the next such pair is known before ' +
         'it can ever share.',
  },
  {
    rel: 'inside', inner: '.door-plant__bloom', outer: '.door-plant__foliage', where: ['around'],
    why: 'the blooms are the plant\'s own, counted by `door-pot-blooms` while the foliage ' +
         'around them is read by `door-plant-standing` and `door-pot-pace`. The count is ' +
         'what the hush vow holds; the foliage is the thin question of whether there is a ' +
         'plant at all, which is why both are asked.',
  },
  {
    rel: 'inside', inner: '.door-plant__bloom', outer: '.door-plant', where: ['around'],
    why: 'the same blooms, one pot further out — the relation above carried through the ' +
         'foliage into the body `door-paint-lean` weighs.',
  },
  {
    rel: 'inside', inner: '.woodpile .woodpile__log', outer: '.scene--inside .woodpile',
    where: ['inside'],
    why: 'THE ONE WITH TEETH, and the reason this list exists. `.scene--inside .woodpile` is ' +
         'a lean exemption, and its written reason is entirely about the cast shadow the ' +
         'armful throws — but the sweep excuses by `closest`, so every log inside it is ' +
         'excused too, and its only test, `opposed`, sums the lean SIGNS over the whole ' +
         'subtree. Measured on 2026-09-17: a light-from-one-side gradient painted on all ' +
         'five logs left every one of the almanac\'s 69 claims green, the room\'s own sweep ' +
         'and its own exemption check among them — and the room has no body-weighing at all, ' +
         'since `paint-lean` is asked only of the two outdoor faces. Two of those five logs ' +
         'were drawn on Day 125 and nothing noticed where they had landed. The selector ' +
         'cannot be narrowed: `closest` is what excuses the `::before`, and one entry on ' +
         'that list (`.sprite--bee`) genuinely needs to reach a child. So the reach is ' +
         'declared instead of removed.',
  },
  {
    rel: 'overlap', inner: '.sprite--tree, .sprite--tree-small', outer: '.sprite--tree',
    where: ['home'],
    why: '`tree-crowns` names both front crowns in one comma selector, because the hush vow ' +
         'is about the pair of them and a share taken of one alone would pass through the ' +
         'other going bare. `home-paint-lean` names each separately, because a weighing is ' +
         'an agreement among bodies and two bodies are two.',
  },
  {
    rel: 'overlap', inner: '.sprite--tree, .sprite--tree-small', outer: '.sprite--tree-small',
    where: ['home'],
    why: 'the other half of the pair above — the small crown, standing further off, which ' +
         'answers the wind a beat behind the big one and is weighed on its own.',
  },
  {
    rel: 'same', inner: '.chair', outer: '.scene--inside .chair', where: ['inside'],
    why: 'one element under two names: `chair-shadow` measures how far the cast smear runs ' +
         'and the lean exemption permits the direction it runs in. They are the same thing ' +
         'asked how long and asked which way, so anything done to the chair is done to both ' +
         'at once — and the exemption is scoped `.scene--inside` only because `scene.css` is ' +
         'loaded by every view and a bare `.chair` would claim faces that have none.',
  },
  {
    rel: 'overlap', inner: '.hearth__fire--flame', outer: '.hearth__fire', where: ['inside'],
    why: 'the middle tier is one of the three, so `fire-flame` reads a thing `fire-tiers` ' +
         'counts. Deliberate since Day 126: the hour puts the middle tier down at midnight ' +
         'on purpose, so the kept vow\'s floor had to move off that one tier and onto how ' +
         'many stand — and the season\'s reading of the flame\'s own width stayed where it ' +
         'was. A bottom and a description of the same wood.',
  },
];

/* ── the names ────────────────────────────────────────────────────────────── */

/* Every hand-written selector the almanac measures this place by, and who
 * wrote it. `of` carries a string on a tone probe and a list on a paint-lean
 * one; `allow` is the exemption list, which the sweeps and the exemption
 * checks share. */
function namesFrom(probes) {
  const per = { home: {}, around: {}, inside: {} };
  const add = (view, sel, owner) => {
    if (!per[view]) return;
    (per[view][sel] = per[view][sel] || []).push(owner);
  };
  for (const [name, p] of Object.entries(probes)) {
    if (!p || !per[p.view]) continue;
    if (p.selector) add(p.view, p.selector, `${name}.selector`);
    if (typeof p.of === 'string') add(p.view, p.of, `${name}.of`);
    // Day 133. A `drift` probe's `of` list carries a layer rather than a bare
    // selector — a string, or `{ sel, claim }` where the claim says whether the
    // thing is held out by the wind or in free fall. Reach through it: an
    // object stringified into this map would register the key "[object Object]"
    // and then look for an element by that name, which finds nothing and says
    // nothing, and the selectors inside it would be watched by no one.
    if (Array.isArray(p.of)) for (const s of p.of) {
      const sel = typeof s === 'string' ? s : (s && s.sel);
      if (sel) add(p.view, sel, `${name}.of[]`);
    }
    if (Array.isArray(p.allow)) {
      for (const e of p.allow) {
        if (!e.where || e.where.indexOf(p.view) === -1) continue;
        if (e.selector) add(p.view, e.selector, `${name}.allow`);
        if (e.against) add(p.view, e.against, `${name}.allow.against`);
      }
    }
  }
  return per;
}

/* ── in-page ──────────────────────────────────────────────────────────────── */

/* Every relation among the given selectors, taken off the rendered DOM. Pairs
 * are read once each (i < j) and the direction is reported, so `inside` names
 * which is which and `same`/`overlap` are symmetric. */
function relationsIn(sels) {
  const match = {};
  for (const s of sels) {
    try { match[s] = Array.prototype.slice.call(document.querySelectorAll(s)); }
    catch (e) { match[s] = []; }
  }
  const counts = {};
  for (const s of sels) counts[s] = match[s].length;

  const within = (inner, outer) =>
    match[inner].length > 0 &&
    match[inner].every((ei) => match[outer].some((eo) => eo !== ei && eo.contains(ei)));

  const out = [];
  for (let i = 0; i < sels.length; i++) {
    for (let j = i + 1; j < sels.length; j++) {
      const a = sels[i], b = sels[j];
      if (!match[a].length || !match[b].length) continue;

      const shared = match[a].filter((e) => match[b].indexOf(e) !== -1).length;
      if (shared) {
        const rel = (shared === match[a].length && shared === match[b].length) ? 'same' : 'overlap';
        out.push({ rel, inner: a, outer: b, shared });
        continue;
      }
      if (within(a, b)) { out.push({ rel: 'inside', inner: a, outer: b }); continue; }
      if (within(b, a)) { out.push({ rel: 'inside', inner: b, outer: a }); }
    }
  }
  return { rels: out, counts };
}

/* ── the run ──────────────────────────────────────────────────────────────── */

function launchOpts() {
  const exe = process.env.COZY_CABIN_CHROMIUM_PATH;
  return exe ? { executablePath: exe } : {};
}

/* A declared entry matches a found relation if the kind and the two names
 * agree. `same` and `overlap` are symmetric, so either order counts. */
function declarationFor(rel, view) {
  return DECLARED.find((d) => {
    if (d.rel !== rel.rel) return false;
    if (!d.where || d.where.indexOf(view) === -1) return false;
    if (d.inner === rel.inner && d.outer === rel.outer) return true;
    return rel.rel !== 'inside' && d.inner === rel.outer && d.outer === rel.inner;
  });
}

async function main() {
  const args = process.argv.slice(2);
  const survey = args.indexOf('--survey') !== -1;
  const arg = args.find((a) => !a.startsWith('--')) || process.env.COZY_CABIN_URL || DEFAULT_BASE;
  const base = arg.endsWith('/') ? arg : arg + '/';
  console.log(`check-nesting: holding the lists of ${base} to one another` +
              (survey ? ' (survey only)' : ''));

  const browser = await chromium.launch(launchOpts());
  let failures = 0;
  const seen = new Set();

  try {
    const context = await browser.newContext({ viewport: VIEWPORT });

    const almanac = await context.newPage();
    await almanac.goto(new URL('almanac/', base).toString(),
                       { waitUntil: 'networkidle', timeout: 30000 });
    const probes = await almanac.evaluate(
      () => (window.CabinAlmanac ? window.CabinAlmanac.PROBES : null));
    await almanac.close();
    if (!probes) throw new Error('the almanac published no probes (window.CabinAlmanac missing)');

    const per = namesFrom(probes);

    for (const [view, path] of Object.entries(VIEW_PATH)) {
      const sels = Object.keys(per[view]).filter((s) => FRAMES.indexOf(s) === -1);
      const page = await context.newPage();
      await page.goto(new URL(path, base).toString(),
                      { waitUntil: 'networkidle', timeout: 30000 });
      const { rels, counts } = await page.evaluate(relationsIn, sels);
      await page.close();

      const undeclared = [];
      for (const rel of rels) {
        const d = declarationFor(rel, view);
        if (d) { seen.add(d); continue; }
        undeclared.push(rel);
      }

      const owners = (s) => (per[view][s] || []).join(', ');
      const shape = (r) => (r.rel === 'inside'
        ? `${r.inner} (${counts[r.inner]})  is inside  ${r.outer} (${counts[r.outer]})`
        : `${r.inner} (${counts[r.inner]})  is the ${r.rel === 'same' ? 'same as' : 'overlap of'}  ` +
          `${r.outer} (${counts[r.outer]})${r.rel === 'overlap' ? ` — ${r.shared} shared` : ''}`);

      if (survey) {
        console.log(`\n--- ${view}: ${sels.length} name(s), ${rels.length} relation(s) ---`);
        for (const r of rels) {
          console.log(`  ${declarationFor(r, view) ? 'declared ' : 'UNDECLARED'}  ${shape(r)}`);
          console.log(`      inner named by: ${owners(r.inner)}`);
          console.log(`      outer named by: ${owners(r.outer)}`);
        }
        continue;
      }

      if (!undeclared.length) {
        console.log(`HELD  ${view} — ${rels.length} relation(s) among ${sels.length} name(s), ` +
                    'every one of them written down');
        continue;
      }
      failures += undeclared.length;
      console.log(`BROKE ${view} — ${undeclared.length} relation(s) nobody wrote down`);
      for (const r of undeclared) {
        console.log(`        ✗ ${shape(r)}`);
        console.log(`          inner named by: ${owners(r.inner)}`);
        console.log(`          outer named by: ${owners(r.outer)}`);
      }
    }
    await context.close();
  } finally {
    await browser.close();
  }

  /* A declaration that did not turn up today. Not a failure — see blind note
   * (2) in the header: a declaration excuses nothing, so a stale one costs
   * nothing, and a bloom seat can honestly be empty this morning. */
  const unfound = DECLARED.filter((d) => !seen.has(d) && d.where && d.where.length);
  for (const d of unfound) {
    console.log(`note: declared and not found today — ${d.inner} ${d.rel} ${d.outer} ` +
                `in ${d.where.join(', ')}`);
  }

  console.log('');
  if (survey) { console.log('check-nesting: survey only — nothing judged.'); return; }
  if (failures) {
    console.error(
      `check-nesting: FAIL — ${failures} relation(s) among the almanac's own names\n` +
      'that nothing had written down. Either the new name should not stand inside\n' +
      'the old one, or the relation is fine and belongs in DECLARED in this file,\n' +
      'with a reason somebody could argue with. Run with --survey to see them all.'
    );
    process.exit(1);
  }
  console.log('check-nesting: OK — no name here stands quietly inside another.');
}

main().catch((err) => {
  console.error('check-nesting: FAIL —', err.message);
  process.exit(1);
});
