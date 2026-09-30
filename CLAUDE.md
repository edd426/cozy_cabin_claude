# Working notes — see RULES.md for the constitution

These are operational notes for the daily agent. *How* to do things in this repo. Authority lives in `RULES.md`, not here. If a conflict arises, RULES wins.

You may edit this file. Append to "Things I've learned" as you discover gotchas — a learned entry is what the next morning needs in order not to repeat a mistake, and if it runs past a screen the rest belongs in that day's log.

---

## Repo layout

```
.
├── RULES.md                # constitution (locked)
├── MILESTONES.md           # roadmap (locked)
├── CLAUDE.md               # this file (mutable)
├── README.md               # public-facing
├── ASSETS.md               # asset license + composition log (append-only)
│
├── index.html              # page shell (mutable, but the contract documented at the
│                           # top of the file must be preserved — build-sha tag,
│                           # build-sha.js script, day-label / build-sha-label /
│                           # scene-mount elements)
├── theme.css               # palette, fonts, spacing tokens (locked)
├── scene.html              # cabin scene markup (mutable — your canvas)
├── scene.css               # cabin scene styles (mutable)
├── 404.html                # GitHub Pages 404 (mutable)
│
├── assets/
│   ├── vendor/             # vendored sprite packs + LICENSE.txt each
│   └── composed/           # your recolors / compositions
│
├── diary/
│   ├── README.md           # diary entry schema
│   ├── meta/               # weekly meta-reflections (every 7th day)
│   ├── 0000-00-00-day-zero.md   # Evan's tone-setting entry
│   ├── YYYY-MM-DD.md       # daily entries
│   ├── index.html          # archive page (the shelf), listed via build-generated manifest.json
│   ├── entry.html          # the reader — one day set in type; ?d=YYYY-MM-DD, newest with no param
│   ├── entry.js            # markdown renderer + the book-of-names marking (Day 106)
│   ├── diary.css           # styles for both the shelf and the reader
│   └── diary.js            # the shelf's client-side renderer
│
├── names/                  # the BOOK OF NAMES (RULES.md Article III — mandatory morning read)
│   ├── index.html          # the page, at /names/ — reached from the diary, NOT the map
│   ├── names.js            # the book itself: words, senses, marks; window.CabinNames
│   └── names.css           # styles
│
├── logs/                   # daily operational logs (mutable — agent's status reports)
│   ├── README.md           # log schema
│   └── YYYY-MM-DD.md       # daily log entries (operational counterpart to the diary)
│
├── messages/               # the founder's message board (RULES.md Article XII)
│   ├── README.md           # workflow + file shape; covers action-asks AND informational messages
│   ├── open/<date>-<slug>.md   # pending — read all as part of memory
│   └── done/<date>-<slug>.md   # closed (completed, cancelled, or read-and-close FYI); read-only history
│
├── previews/               # auto-committed deploy screenshots (CI bot)
│   └── YYYY-MM-DD-<sha>.png   # 375x800 phone-viewport snapshot per commit
│                              # Read the newest preview of EVERY view (home/around/inside), not just one
│                              # — RULES Art III / daily.md Step 2. Find the newest stem, then glob its
│                              #   <date>-<sha>*.png variants and Read each.
│
├── scripts/
│   ├── build.sh            # generates build-sha.js + diary/manifest.json
│   ├── verify-deploy.sh    # curl-grep verification; works from the routine sandbox too since
│   │                       # the 2026-07-17 env move, but wait-for-deploy.sh stays the
│   │                       # canonical check (it proves the screenshot bot ran as well)
│   ├── wait-for-deploy.sh  # post-push verification via the CI screenshot bot's commit
│   ├── lint-diary.sh       # diary schema linter (you may run before commit)
│   ├── lint-log.sh         # log schema linter (you may run before commit)
│   ├── local-snapshot.sh   # in-session render of working-tree state via Playwright;
│   │                       # detects pre-staged Chromium at /opt/pw-browsers/ or system cache
│   ├── screenshot.js       # Playwright snapshot helper (called by local-snapshot.sh and CI);
│   │                       # MUTABLE — carve-out from the scripts/ lock per RULES.md Article I
│   ├── views.json          # the list of views CI photographs; MUTABLE — second carve-out
│   │                       # (2026-08-16). Never rename or remove the "home" entry.
│   └── run-day.sh          # routine wrapper (local only; not used in remote routine)
│
├── tools/                  # mutable — NOT under the scripts/ lock
│   ├── post-status.js      # the mailbox check (sealed post, whose turn it is)
│   ├── check-almanac.js    # holds /almanac/'s sentences, vows and givens to the yard
│   ├── check-gallery.js    # holds "everything drawn shows in at least one kept frame"
│   ├── check-nesting.js    # holds the probes' own selector lists against one another
│   └── check-drift.js      # holds each frame against the picture kept of it
│
├── .claude/
│   ├── settings.json       # destructive-bash denies + allowlist
│   └── commands/daily.md   # /daily slash command
│
└── .github/workflows/pages.yml  # Pages deploy + post-deploy screenshot job;
                                  # MUTABLE — carve-out from the .github/ lock per RULES.md Article I
```

Generated/runtime files (gitignored, do not commit): `build-sha.js`, `build-sha.txt`, `.cabin-state.json`.

## How a day runs

The runbook lives in `.claude/commands/daily.md` (the `/daily` slash command). This file is operational notes — gotchas, command recipes, accumulated learnings. Treat `RULES.md` as authority and `daily.md` as the runbook.

## Common commands

```bash
# See all diary entries (you have a 1M context — read them all if you want)
ls -1 diary/*.md

# See what's currently in the scene
cat scene.html scene.css

# What sprites are available
find assets/vendor -name '*.png' | head -n 30

# Render the working-tree state of the page locally and read the screenshot
./scripts/local-snapshot.sh
# then: Read /tmp/cabin-snap.png

# Run a Playwright interaction test you wrote in /tmp/
./scripts/local-snapshot.sh /tmp/my-test.js

# Wait for CI's post-deploy screenshot bot to commit previews/<today>-<sha>.png
# (the canonical deploy check: it proves the deploy AND the screenshot bot at once)
./scripts/wait-for-deploy.sh

# curl-based verification — works from the routine sandbox too (env move, 2026-07-17)
./scripts/verify-deploy.sh https://edd426.github.io/cozy_cabin_claude/ "smoke from chimney"

# UNDO YOUR DAY: discard all uncommitted work
git restore .

# UNDO MORE: discard local commits too, snap to what's published
git reset --hard origin/main
```

## Test-script pattern (for interaction testing)

When you change something interactive (a tappable object, a state toggle, a sub-page link), write a small Playwright script in `/tmp/` and run it via `./scripts/local-snapshot.sh /tmp/<name>.js`. The wrapper sets `COZY_CABIN_URL` and `COZY_CABIN_OUTDIR` for the script. Tests **live in `/tmp/` and are never committed** — they're disposable scaffolding for today's session.

Skeleton:

```js
// /tmp/test-bookshelf.js
const { chromium } = require('playwright');

(async () => {
  const url    = process.env.COZY_CABIN_URL;
  const outdir = process.env.COZY_CABIN_OUTDIR;
  const exe    = process.env.COZY_CABIN_CHROMIUM_PATH;   // pre-staged binary path
                                                          // (set by local-snapshot.sh)

  const launchOpts = {};
  if (exe) launchOpts.executablePath = exe;             // honor the pre-staged Chromium
  const browser = await chromium.launch(launchOpts);
  const ctx = await browser.newContext({ viewport: { width: 375, height: 800 } });
  const page = await ctx.newPage();

  await page.goto(url, { waitUntil: 'networkidle' });
  // Your assertions here:
  await page.click('#bookshelf');
  await page.waitForURL(/library/, { timeout: 5000 });
  await page.screenshot({ path: `${outdir}/after-click.png` });
  console.log('test: PASS');
  await browser.close();
})().catch(e => { console.error('test: FAIL —', e.message); process.exit(1); });
```

If the test fails, fix the working tree and re-run. **Do not push code that fails its own test.**

## What reads / what doesn't — founder notes (2026-05-30, Evan)

A few things in the cabin haven't *clicked* to my eye. I'm not a UI person — I can tell when something looks off but I often can't say why — so treat these as the **only** constraints I'm adding. Everything else about the look is yours; design freely within them. If you read one and think I've got it wrong, say so in the diary and do it your way — I'll trust your eye over mine on the things I can't name.

- **One building, one look.** Home, around, inside (and any future view) are the *same* cabin. Its roof, chimney, walls, and brick should read the same in every view — not just sit in the same place (that's Article XIII) but be made of the same stuff. Right now the front and side read as two different buildings.
- **The ground plane is sacred.** Nothing rests *above* the horizon unless it's airborne and clearly reads as airborne (smoke, a bird). Depth comes from one thing overlapping the *base* of another, not from floating a thing higher up. A path stone hovering at mid-cabin height reads as floating, not as "behind."
- **The floor is a plane, not a shelf.** Indoors, don't anchor everything to the very bottom edge — vary how far "back" things sit (their height within the floor band) so the floor reads as a room you could cross, not a ledge that objects line up on.
- **Material truth.** The same thing is made of the same material everywhere. The brick through the front window, the hearth inside, and the chimney on the roof are one column — so brick in one is brick in all (and brick wants vertical joints, not just stacked horizontal courses).
- **Fire sits on the hearth floor** (or on a visible grate). A flame floating in the firebox reads as off. Soft — raised hearths exist; this is a nudge, not a law.
- **Legibility, gently.** A sprite should read as what it is *at phone size* — but this is a few-pixel medium, so that's a **low** bar, not a demand for fine detail. Lean on silhouette, motion, and context: if a thing can't read at its size, make it bigger, give it company (a few birds in a V read as birds where one dot doesn't), or let it be atmospheric rather than *wrong*. And **match the motion to the subject** — a moth flutters and darts; it doesn't glide in a smooth circle like a spider on a thread.

These are observations, not a style bible. The cabin is yours to make beautiful; I'm only naming the handful of things that pulled my eye the wrong way.

**Added 2026-06-24 (Evan).** Two more — really the geometry companions to "one building, one look" above. They're about how a shared thing has to *sit* the same across views, not just be made of the same stuff.

- **One geometry, every view — and the map is the truth.** The map's compass fixes where you stand and which way you face in each view: the front is seen from the *south, looking north*; the door side from the *east, looking west*. When one thing appears in more than one view, it has to obey that — **including flipping left↔right** when you walk around to a face that sees it from the other side. Worked example: the far hills are the clearing's *back* edge (they sit behind the cabin in the front view). Walk around to the door side and that same edge belongs on the **right** of the frame, with the open horizon on the **left** — toward where the front of the house and the path are — not bunched on the left the way they are today. If two views disagree about which side a shared thing is on, the map wins.
- **A wall no view shows is free.** The cabin only ever shows two of its four outside walls — the front (chimney side) and the door side. The other two are never drawn. So anything the *inside* shows can live on one of those unshown walls; it needs no matching feature on a wall we *do* show, and you should never add one to the front just to "match" something indoors. The catch and the gift: if you ever decide to draw one of those hidden walls from outside, you're welcome to — and *then* a window can honestly be the same hole seen from both sides, on a wall where that's actually true. The rule isn't "never." It's "not until both sides exist."

Same standing offer as the notes above: walk these through against the map, and if you think I've got a side backwards, say so in the diary and trust your eye — I can tell when something's off but I'm bad at naming which way it goes.

## Things I've learned

A learned entry is **what the next morning needs in order not to repeat a
mistake**. Not the day's story — that is in `logs/<date>.md`, which is where the
counts, the files-that-needed-no-change and the break-test narratives belong. If
an entry runs past a screen, the rest belongs in the log. Each line keeps its
Day tag so `git log -p CLAUDE.md` and that day's log still find the long
version. (Consolidated 2026-09-28, Day 143, from sixty-nine dated entries and
38,000 words; see that day's log for what was cut and why.)

### The routine and the sandbox

- **`main` is the only destination.** The routine config pins a `claude/*`
  outcome branch, so the sandbox pre-creates one and usually starts you on it —
  this is provisioning, not drift, and it cannot be turned off from the routine
  UI. `daily.md` Step 0 reattaches unconditionally (`git checkout -B main HEAD`);
  after that plain `git push origin main` is the push. Fallback if you are
  somehow still on a work branch: `git push origin HEAD:main`. If a writeup ever
  goes missing, check `git branch -a` / `git log --all` for an orphaned
  `claude/*` branch first. *(2026-05-31, 2026-06-10, 2026-07-03)*
- **Plain `git push` works** — the routine has unrestricted push enabled.
  `mcp__github__push_files` is a deep contingency for a 403 only. If you ever do
  use it: run `./scripts/build.sh` **after** the push, never before (MCP commit
  SHAs are unpredictable, so an earlier build stamps the wrong one and
  `wait-for-deploy.sh` polls for a preview that will never appear), and a rename
  costs two commits, since MCP has no single-commit move. *(Day 3, 2026-05-30)*
- **Network** (`cozy_cabin_env`, since 2026-07-17): github.com, `edd426.github.io`,
  raw.githubusercontent.com, api.anthropic.com and npm are reachable.
  **Playwright's Chromium CDN is not** — the browser is pre-staged at
  `/opt/pw-browsers/`, which `scripts/local-snapshot.sh` finds for you. `*.github.io`
  is **not** blocked; `verify-deploy.sh` and plain `curl` work from the sandbox.
  `wait-for-deploy.sh` stays the canonical deploy check because it proves the
  deploy *and* the screenshot bot in one. *(2026-07-17, 2026-07-26)*
- **Dry-running a checker or `screenshot.js` in-session:** the repo pins
  Playwright build 1148 and the staged binary is 1194, so export the path
  yourself and serve the tree:
  ```bash
  python3 -m http.server 8099
  export COZY_CABIN_CHROMIUM_PATH=/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell
  node tools/check-almanac.js http://localhost:8099/
  ```
  A `/tmp/` script living outside the tree also needs
  `NODE_PATH=/home/user/cozy_cabin_claude/node_modules`. *(Day 91, Day 119)*
- **The model name lives in exactly two switches** and nowhere else: the `model`
  field in `.claude/settings.json` (for local `/daily`) and the cloud routine's
  `session_context.model`, set from the routine UI's dropdown — which saves
  without touching the prompt, unlike the API, whose `job_config` update replaces
  the body **wholesale** and has silently wiped the prompt before. Everything
  else is model-agnostic; the log's `Model:` line records whatever
  `settings.json` pins. A `[1m]` suffix is how older Opus models were given the
  1M window; Opus 5 and Fable have it by default. Reasoning effort stays **Max**.
  Every UI save regenerates the outcomes branch pin, which Step 0 handles.
  *(2026-06-14, superseding 2026-05-30 / 06-10 / 07-26 / 08-03)*
- **The screenshot job's cost is watched.** `pages.yml` caches
  `~/.cache/ms-playwright`, does **not** pass `--with-deps` (that apt-fetches
  ~21 MB every run and has killed the job in a sibling repo), and runs
  `playwright install-deps` only on the runs where a bare launch actually fails.
  `timeout-minutes` is 10 and `wait-for-deploy.sh`'s default is 600s — both are
  backstops, not the thing being raced. If a poll times out, check **which job**
  failed before repairing anything: `deploy` green + `screenshot` cancelled means
  the site is live and only the preview is missing. *(2026-08-04, Evan)*

### Scale, breakpoints and the pixel grid

- **The 2x layout's breakpoint is `@media (max-width: 599px)`** — in `scene.css`,
  `around/around.css` and `inside/inside.css`. Real phones are 390–440 CSS px
  wide, so calibrate anything that must read on a phone against the **2x**
  numbers (cabin 96×160, `bottom: 8%`). (An older note said 379px; that missed
  every real phone and is dead.) *(Day 34, superseding Day 2)*
- **`--s` is the only scale knob.** New geometry is written in native px ×
  `var(--s)` (3 desktop / 2 phone), which collapses the whole 2x override to
  `--s: 2`. `inside.css` still carries hardcoded `* 3` in about twenty places —
  the cloak, the window/sill group and `.hearth__mantle` — each with its own 2x
  block that must be checked to agree. *(Days 77, 88, 90, 91, 92)*
- **A `@media` block placed *earlier* in a file than the base rule it rebases
  loses.** A media query adds no specificity, so at equal specificity source
  order decides. This was live for nineteen days in `around/around.css` and made
  every door-side falling leaf half again too big on a phone. Put the breakpoint
  block at the foot of the file, after everything it names. *(Day 141)*
- **Integer scale only, and a broken grid reads as *wrong*, not as *near*.**
  Never scale a sprite past its view's own `--s` to make it look closer. Nearness
  is size in native px, a lower ground line, and overlapping the *base* of what
  is behind it. *(Day 120)*
- **`top`/`left` in `%` crosses the breakpoint with no rebase**, where a
  `transform: translate()` in px needs a 2x `@keyframes` override. Inside an
  `inset: 0` layer, percentages are relative to the frame and one block holds at
  both scales. Measure the target at *every* width first and place inside the
  overlap — a native-px sprite covers a different fraction of each frame.
  *(Days 116, 122)*
- **To draw a sprite off existing art, dump its pixels** — draw the PNG to a
  canvas in a `/tmp/` script and print a palette-keyed ASCII grid. One run, and
  it beats guessing a silhouette. Put any hard `drop-shadow` outline on an
  **inner** wrapper so the outer element keeps its `filter` free for the season
  gild; filters nest, they don't collide. *(Day 120)*

### Drawing rules this place keeps

- **No lit side outdoors.** A near thing lit down one edge implies a sun with an
  address, and there is none (the first *given*). Mottle and highlights must be
  mirrored about the thing's own centre line, or centred on it; vertical
  weighting is fine, because low is low from everywhere at once. Two bodies wore
  an unpaired lit flank for months because the rule was only ever applied
  forward. *(Days 56–58, 116, 120, 138)*
- **Indoors a lit side and a cast shadow are legal, because the fire is drawn in
  the frame** — direction is then *derived* (away from the hearth), not chosen. A
  cast shadow needs three things: a drawn light, a surface with **area in this
  projection** (the floor is a plane you look across; the mantle is a shelf you
  look at edge-on and has none), and that surface **actually lit** — shade laid on
  unlit brick is a stain, not a shadow. And it can be no longer than the light it
  interrupts, so its length rides the same season table the firelight does.
  *(Days 90, 91, 92)*
- **Indoor light mechanics, all three learned the hard way.** `clip-path: inset()`
  beats a gradient fade when a *hard blocker* stops a light — fading reads as "the
  light petered out", clipping reads as "something is in the way". **Two soft
  washes in the same footprint cancel and you see neither**, so A/B any new glow or
  shade against `display: none` rather than trusting the eye on one frame. And
  **painting order inside `.hearth` is DOM order in `inside/index.html`** —
  glow, then shade over it, then the candle's light over that, then the shelf:
  moving any one changes what the picture claims. *(Day 92)*
- **`radial-gradient` defaults to `farthest-corner`**, which terminates in a
  visible straight line at the box edge. `ellipse closest-side at 50% 50%` makes
  the 100% stop meet the edge — but it *shrinks* the radii, so every stop lands
  nearer the centre and the whole thing dims; expect to re-space and enlarge
  after. Keep a season's strength as `opacity` on the element and the gradient on
  its `::before`, because nested opacities multiply and a breathe animation on the
  child would otherwise fight the parent. *(Day 89)*
- **`clip-path` clips `box-shadow` too**, so a 1px band under a clipped sprite
  vanishes unless the polygon runs on past `100%`. Keep every vertex
  axis-aligned: at this size `border-radius` antialiases a corner into a smear,
  and `image-rendering: pixelated` is set in the locked `theme.css`. *(Day 136)*
- **At 4–5 native px, draw the lit side only, never the shaded one** — the shade
  you reach for is usually the wall's own colour and the silhouette dies. *(Day 91)*
- **The wind is a WESTERLY.** North is up on the plan; you meet the front from the
  south looking north, so its right is east, and everything loose on that face
  departs its rest rightward — carried east, therefore out of the west. It was
  called an easterly in nine margins for seventy days while every drawing was
  right. Work any direction claim against `map/map.css` before trusting a
  sentence about it. *(Day 133)*
- **A thing held out by a steady wind may not rock back past its rest** (smoke,
  flag, crowns, clouds). **A thing let go may** — a falling leaf planes both ways
  and only its *net* drift belongs to the yard's wind; a shaken crown rings back
  through rest and decays, because a hand is not a wind. *(Days 60, 116, 139)*
- **Before judging any sprite's own colour, kill both whole-frame washes**
  (`.scene::before, .scene::after { opacity: 0 !important }`) — and then **put
  them back and check it still reads against what is actually behind it.** A grey
  night-smoke measured *darker* than the night sky it was meant to be a pale mark
  on, with the invisible value sitting exactly between. Compute the luminance gap
  in **every** state the thing can be seen in; 32 is comfortable, 5 is nothing.
  A `/tmp/` zoom strip that crops the sprite's union rect and redraws it at ×6
  with `imageSmoothingEnabled = false` is the tool. *(Days 112, 127, 136, 140)*
- **Gate a countable layer with `display`, never `opacity`** — the almanac's
  counts read layout, so an opacity gate is invisible to them. *(Days 98, 116)*
- **Two clocks on one layer must sit on two different properties.** The season
  owns the fire's tier *sizes*, so the hour owns how many tiers *stand*; the
  season owns `--ember-glow`, the hour owns `--ember-lit`. If you find yourself
  writing `[data-season="x"][data-tod="y"]`, look for this move first. The
  division that keeps falling out: **the year says how big a thing is, the hour
  says how hard it is running.** *(Days 126, 127)*
- **If you make an animation's duration a custom property, mend every
  `animation-delay` tuned to the old one** — hardcoded thirds and halves of a
  4.5s round bunch the moment the hour slows it; write them as
  `calc(var(--puff-rise) / 3)`. And **a keyframe that names any part of
  `transform` must name all of it**, so interpolated middle values have to be
  written as `calc()` off the endpoints, not as the numbers they happened to
  resolve to. *(Day 127)*
- **To swap a thing's colour at the invisible moment of its own animation, put
  both colours in the keyframes and pick the keyframe set off a state
  attribute** — then flip the attribute in the `animationend`, never at the
  start (repaints before the thing has turned) and never on a timer. The
  resting rule then paints what the 100% frame already showed, so there is no
  flash; and because the attribute is still the *old* value while the animation
  runs, it is what selects the forward or the reverse keyframes. *(Day 144)*
- **A view that wants a sound needs `sound.js`'s own `<script>` on it.** Only
  `/around/` and `/inside/` carried one before Day 144; the home view did not,
  and a `window.CabinSound` that is simply absent fails exactly as quietly as
  the defensive `if` around every call is designed to make it. *(Day 144)*
- **A one-shot on an already-animating element must pick a property the running
  animation does not own.** The `animation` *shorthand* resets `animation-name`,
  so a one-shot written that way stops the perpetual one dead; either use a
  `transition` on an untouched property (the fire's flare uses `filter`, which the
  flicker never sets) or accept the handover and check both rest frames match.
  Watch specificity against any per-element duration override. *(Days 139, 140)*
- **To suppress a transition for exactly one frame** — so a restored
  `localStorage` state doesn't animate *at* a returning visitor — set a marker
  attribute, style `transition: none` off it, and remove it in a
  `requestAnimationFrame`. *(Day 141)*
- **When `scene.css` gains a new whole-frame `.scene` pseudo-element, decide the
  same day whether the room takes it** and write the `content: none` twin in
  `inside.css` — `inside/index.html` loads `scene.css` and its scene element
  carries both classes, so unscoped `.scene[...]` rules leak indoors whatever the
  comment says. The season wash leaked for nineteen days. *(Day 88)*
- **Share the container, not just the look**, when a layer appears on a second
  face: reuse the base class from `scene.css` and add only view-specific
  modifiers (`.hill--e-*`, `.cloud--e-*`, `.leaf--e-*`). One gate then covers both
  faces and they cannot fall out of step. Remember a sibling container needs its
  own `--s`. *(Days 41, 48, 122)*

### The record: what CI keeps, and what each name means

A commit produces **44 PNGs** (13 view + 24 state + 7 motion). The memory pass's
glob `ls previews/<date>-<sha>*.png` picks every kind up automatically.

| name | what it is |
|---|---|
| `<date>-<sha>.png` | **home, unsuffixed — the locked contract** `wait-for-deploy.sh` polls |
| `<date>-<sha>-<view>.png` | a view from `scripts/views.json` |
| `…-<view>-phone.png` | the same at 390×844 (`kind: "scene"` only) |
| `…-state-<name>.png` | a forced hour/season from `GALLERY_STATES` |
| `…-motion-<name>.png` | a filmstrip from `MOTION_CLIPS` |
| `…-drift-<frame>.png` | a three-panel report, written only when a frame drifted |
| `previews/baseline/<frame>.png` | the kept frames `check-drift` compares against |

- **`scripts/views.json` is mutable** (Art I carve-out, 2026-08-16) and takes two
  kinds. `"scene"` (the default) is captured whole at both widths; `"record"` is
  one 375×800 **viewport-height** PNG, for a scrolling room. The reason is
  arithmetic: full-page captures of the record rooms measured ~11 MB a commit and
  grow forever, against 89–221 KB viewport-only. Two guards throw: an unknown
  `kind`, and `home` marked `"record"`. **Never rename or remove `home`.**
  A record room whose layout is px-scaled rather than flowing wants `"scene"`
  instead. *(Days 10, 101, Evan 2026-08-16)*
- **Three ways to stand the camera somewhere, and they answer different
  questions.** *Force the attribute* (`data-tod`/`data-season` set after load) →
  *what does dusk look like*. *Freeze the clock* (`clock:` on a gallery state, the
  `on:` axis in a check) → *when is it dusk, and what does a date-gated thing do*.
  *Pin the phase* (`seek:` on a motion clip) → *what is it doing nine seconds in*.
  *(Days 71, 95, 109, 113)*
- **The gallery's two rails are a cross** — four seasons at a neutral hour, the
  hours at a neutral season — so it covers everything gated on **one** wheel and
  structurally misses anything gated on **both**. `tools/check-gallery.js` holds
  that: everything drawn shows in at least one kept frame. Not every slot filled;
  a grid of sixteen is wallpaper. *(Days 84, 116, 117)*
- **The still record stands at a fixed, early phase** — `capture()` at ~6.6% of a
  30s loop, `captureState()` at ~8.3% — and a wall-clock filmstrip spans only
  `MOTION_FRAMES × MOTION_INTERVAL_MS` = 4.5s. **Before giving a sprite a loop
  longer than ~10s, or a beat near 900ms, work out where in it the camera will be
  standing.** A 0.9s wing-beat would have been photographed at the identical phase
  forever. The fix belongs in `screenshot.js` (a `seek` clip), never in tuning the
  choreography to be photogenic at 8%. *(Days 108, 137)*
- **`previews/` is 481 MB / 6,134 PNGs and grows ~3.5 MB a commit** (was 260 MB on
  Day 117, 332 MB on Day 126). The founder has flagged growth as acceptable; the
  cheap knob if it ever bites is gating the gallery and motion steps to
  only-days-that-touch-a-moving-layer. *(Days 71, 117, 126)*

### `check-drift`: declaring that you meant it

- **A day that changes the drawing must declare it, or CI goes red.** The
  declaration is `git rm previews/baseline/<frame>.png`, committed beside the
  change. It is per-frame, so `git log` records which parts of the clearing a day
  touched, and it keeps every comparison inside one renderer, because a missing
  frame is re-kept by the camera that will next hold it to account. `--accept`
  exists as a blunt local convenience; prefer the removal, and **never commit a
  sandbox-made baseline** — CI must keep its own. *(Day 119 + addendum)*
- **Two frames are known sandbox-vs-CI browser noise and must be left alone:**
  `map-summer-day` at **1327 px** (every glyph of every label) and
  `inside-winter-day` at **64 px** (a one-pixel outline round the firebox
  opening). Their byte-identity to those figures is the cheapest proof they are
  the browser and not the day's work. **Read the report picture before believing
  any finding**: noise strikes every glyph at once or a thin band at a gradient
  boundary; a real change strikes a shape. On a day that touches the fire the
  inside figure is not proof — settle it by rendering `/inside/` twice on a frozen
  clock, once on the tree and once with the day's files stashed, and `md5sum` both.
  *(Days 119, 126, 132, 140)*
- **The moving layers are pinned at `PIN_AT_MS = 8000`, not zero.** `currentTime`
  includes the delay, so zero is *before the start* of anything with a positive
  `animation-delay` — which drew the chimney column out of every kept frame for
  ten days in silence. Any animation still inside its delay at the pin is named
  (`UNBORN …`) and fails the run before the pixel verdict, so a later day writing
  a longer delay cannot repeat it quietly. Expect a duration/delay/keyframe change
  to redden every frame that shows it; that is working as intended. *(Days 127, 129)*

### Building a guard

- **Break it, and break it in a way the *existing* guards would miss.** A guard
  that cannot go red is decoration. Nearly every witness here was proved by one
  deliberate break — and the useful half of the result is always what stayed
  *honestly* green: a bare winter branch that ten reading-checks had nothing to
  say about, a false sun on two cabin walls that six lean-sweeps could not see,
  five logs lit down one side inside an exemption that excused their parent.
  Check the break actually took effect before believing a green — a
  `background-image` inserted above a `background` shorthand is reset to none, and
  a break-test that did nothing looks exactly like a guard that works.
  *(Days 98, 99, 118, 132, 140)*
- **Count on layout, not on brightness.** Half this clearing blinks, so a
  visible-count probe must use `el.getClientRects().length > 0` (plus a
  `visibility` check), never `opacity`. A thing that blinks is still there.
  Related: computed `display` ignores a `display: none` **ancestor**, so ask the
  layer, not the element — and a class added inside a hidden ancestor never gets
  its `animationend` back. *(Days 98, 139)*
- **A guard that changes shape makes its own `blind` note stale by definition.**
  Mend the blind line in the same commit as the witness. When you add a witness,
  write its blind spot beside it. *(Days 102, 103, 118, 124)*
- **Pick the right shape of bound for the claim.** A `floor` (+ `over`, the whole
  wheel) holds a vow of *presence* — never nothing. A `ceiling` holds a vow of
  *absence* — never a lean. A `share` holds a vow of *proportion*, the leanest
  state against that probe's own fullest, which needs no number of yours and so
  cannot be a bar set too low. **A floor set at the lowest bar the vow could take
  will sit green through most of what you meant it to catch** — a bed lost its
  entire hand-sown root under a `floor: 1`. *(Days 99, 102, 115, 124)*
- **A hand-written minus is the part that rots.** A guard of the form
  *everything, minus these* is exactly as honest as its list. Prefer an exception
  **computed off the drawing** (a band with a mirror is not a flank) over one
  written in a sentence; where the sentence is unavoidable, give it a test that
  its own reason still holds (`tools/check-almanac.js`'s `exemption` probe). Note
  an exemption reaches its whole **subtree** via `closest`, which is why
  `tools/check-nesting.js` exists. Neither can catch a reason that was never true.
  **That condition is not ours.** It came out of the box: Gnomon's letter of
  2026-09-03 (`letters/in/2026-09-03-the-ruler-was-a-fact-about-a-latitude.md`),
  under *Your guard* — *an exemption carries a test that its own reason still
  holds … what makes a hand-written list dangerous was never that a hand wrote
  it. It is that nothing after the hand ever asks whether it is still so.* The
  word `exemption` is his too. Day 123 built it and credited nobody, in four
  places including this file; Day 139 traced it and asked for the debt to be
  written somewhere standing, which is here. A letter carries no authority over
  this clearing and cannot settle an argument — and it also may not be quietly
  absorbed. Where an idea arrived from is a fact about this place like the date a
  stem was sown, and those get published. *(Days 103, 123, 132, 138, 139)*
- **Use the selector string an existing probe already uses**, never a fresh one
  for the same elements; a second name for one thing is the hazard, and
  `check-nesting` will (rightly) call it out. If you add a probe kind whose fields
  are not selectors, check that harvest doesn't register them as one. *(Days 133, 134)*
- **A forced state cannot hold a *name*.** Every state check sets
  `data-tod`/`data-season` by hand, so a forced `dawn` is a forced `dawn` whatever
  the clock thinks — swapping two band names reddened exactly one of
  seventy-six claims. A name has to be *derived*: pick the slot out by
  measurement, then ask what this place calls it. *(Day 134)*
- **If a pixel-diff reading comes back bimodal, look for a boundary pixel before
  you look for nondeterminism.** A pixel the sprite half covers is half
  background, and reading it as the sprite's colour is the error — raising the
  threshold is the fix, not a fudge. *(Day 112)*
- **Do the survey before writing the allow-list.** A throwaway `/tmp/` sweep found
  twelve leaning things where guessing would have produced a different list, and
  three of ten nesting relations were ones nobody would have recalled. *(Days 103, 132)*
- **Three witnesses wreck the page they read** (`frame-balance` empties the frame,
  `sprite-tone` and `paint-lean` lift the washes), so each takes a fresh page and
  a **seal** — read off the rendered page, not declared — refuses any reading taken
  on a page another witness has moved. The quiet failure is a *partial* overlap,
  which returns a plausible number instead of nothing. *(Days 118, 130, 131)*
- **A body on a probe's `of` list that can no longer be found turns the whole
  reading to `null`**, prints `NOT FOUND`, and reddens the check — deliberately,
  because averaging over the survivors would read green off a list gone stale. So
  **if you rename or retire an outdoor sprite, mend the `of` lists in
  `almanac/almanac.js` in the same commit** (and the check's `guards` prose, which
  names the bodies). *(Day 118 addendum)*
- **Ask a new witness what it would say if handed nothing at all.** A comparison
  cannot tell *agreeing about nothing* from success. Two here answered with a
  number where they should have refused, one of them a line that had never once
  run. *(Days 129, 130)*
- **Run `tools/check-*.js` directly**, not through `./scripts/local-snapshot.sh`:
  through the shim the report arrived truncated while the exit code still read 0.
  The `N claim(s) witnessed by M probe(s)` line is the report's **first** line —
  redirect to a file and grep; never `| tail`. Take the runner's own printed
  counts rather than any figure written in this file. *(Days 125, 127, 134)*
- **What nothing here can witness:** a *hand* (every check varies on a season, an
  hour or a date), a *sound*, a *held state* (every camera and witness arrives as
  a browser that has never visited), and a *path* (every reading is a count, a
  width or a brightness). Say so in the check's own words rather than leaving a
  silence. *(Days 108, 122, 139, 140, 141)*
- **Walk your own margins, and grep for the *justification* rather than the
  object.** Three distinct faults live in sentences rather than in the yard: a
  reason that *went stale* when the world grew round it (a cloud has no heading;
  the door side has no trees); a reason that was *never true* (the wind's name);
  and a verdict *won in one room and left standing in another* (the moth's beat
  struck a defence down indoors and five geese kept it for 108 days). A rule
  written about one object is a rule about a *kind* of object — carry it back
  over everything already standing, not only forward. `grep -n "door side has
  no\|frantic clock\|rationale is retired" *.css */*.css` costs nothing.
  *(Days 63, 122, 133, 136, 137, 138)*

### Playwright and `/tmp` tests

The skeleton is in **Test-script pattern** above. Tests live in `/tmp/` and are
never committed.

- **Seek an animation by absolute `currentTime`, never `animation-delay`.** On a
  paused animation Chromium computes current time as *(elapsed-at-pause + delay)*,
  so a swept negative delay carries a constant offset. Use
  `el.getAnimations().find(a => a.animationName === '…')`, then
  `a.pause(); a.currentTime = frac * periodMs`. Asserting on `animationName` also
  makes a renamed keyframe set fail loudly. **Set the same absolute time on every
  element** — dragging each to the same fraction of its own round cancels a
  stagger you may be trying to measure, and misreports layers of different speeds.
  To stand at iteration progress `p` on a layer with a negative delay:
  `ct.delay + ct.duration * (1 + p)`. *(Days 108, 109, 122, 137)*
- **Pin the clock for anything gated on the hour or the season.** The sandbox runs
  near 00:10 UTC, which `sky.js` bins as `night`, so an unpinned test silently
  stands in one band forever — a guard tested only in the state where it has
  nothing to do will always look like a guard that does nothing. Use the
  `freezeClock` / `steppedClock` `addInitScript` shim with
  `browser.newContext({ timezoneId: 'UTC' })`, keep `Fake.prototype =
  Real.prototype`, and re-export `Date.now` / `parse` / `UTC` (`garden.js` and
  `door-plant.js` call `Date.UTC` directly). *(Days 95, 111, 141)*
- **For "did this move?", compare the animated property, not the rect.**
  `getBoundingClientRect()` carries ~0.05px of sample noise;
  `getComputedStyle(el).transform` is exactly what the keyframes set. Parse a CSS
  matrix with an exponent-aware regex — a near-rest skew computes to
  `matrix(1, 0, 1.20637e-06, …)` and `/-?[\d.]+/g` splits it in two. But for
  **"did this thing STAY PUT?" the property reading is blind to a parent that
  moved** — an element whose ancestor is animated computes `transform: none`
  itself — so assert the rect as well. Both, and they are different claims:
  *was not animated* against *did not leave the ground*. *(Days 108, 139, 145)*
- **Testing a tap:** headless Chromium reports `(hover: hover) and (pointer:
  fine)` as **true**, so the touch path needs its own
  `browser.newContext({ hasTouch: true, isMobile: true })` — test both or you have
  tested neither. A tap fires `focusin` **before** `click`, so a focus-opens rule
  plus a click-toggles rule open and shut in one tap; gate focus-opening behind a
  `viaPointer` flag set on `pointerdown`. Check tap targets at **every** width:
  the crown pad needed widening only on a phone, the firebox and the lantern at
  all three. *(Days 106, 139, 140, 141)*
- **Testing a sound:** wrap the real `AudioContext` in `addInitScript` and count
  what the page actually schedules — never ask the module how it feels. Read a
  gain's `.value` at assert time, not at creation — and compare it with a
  tolerance, because `AudioParam.value` is a **float32**: `sound.js`'s declared
  `PEAK` of `0.11` reads back as `0.10999999940395355` and `===` fails.
  *(Days 140, 145)*
- **`page.addStyleTag()` takes only `content`/`path`/`url`** — there is no `id`,
  so a later `getElementById(...).textContent = …` throws. **`locator.screenshot()`
  returns a Buffer** and has no `encoding` option; base64-encode it yourself for a
  `data:` URL. **`locator.screenshot()` on a swaying tree fails with *element is
  not stable*** — kill the sway with `addStyleTag` first, or use
  `page.screenshot({ clip })`. *(Days 73, 108, 116)*
- **Don't `node -e "require('./tools/check-drift.js')"` as a syntax check** — the
  file has no `require.main` guard and requiring it runs the whole tool. Use
  `node --check`. *(Day 129)*
- **A wheel is the one kind of build a single snapshot cannot check.** Walk the
  year: a `/tmp/` test stepping every third day for 400 days at both widths, on
  the stepped-clock shim. *(Day 115)*

### The record rooms

- **`letters/letters.js`.** `writeInline` splits `**strong**` and `*em*` in one
  pass, double-star alternative first (`/(\*\*[^*]+\*\*|\*[^*]+\*)/`); it builds
  text nodes and elements, never `innerHTML`. The `META` header regex
  (`/^\*\*[^*]+:\*\*/`, only inside the unbroken run at the top, cleared by the
  first body line) must stay untouched. Both forms were eaten silently for weeks
  — one swallowed the single sentence a letter existed to carry. **If you shelve a
  letter, read the rendered card, not just the file**; a blanket
  `body.includes('*')` assertion on the rendered text is the cheapest guard.
  `names/names.js` has a `writeInline` of the same shape handling `` `code` `` +
  `*em*` and **not** `**strong**` — don't copy one into the other. *(Days 102, 110)*
- **Testing `/letters/`:** the front-yard mailbox is `.sprite--mailbox`, not
  `.mailbox`. `letters.js` `await`s a fetch per card, so gate on the final count
  (`waitForFunction` on `.letters-list__letter`) before addressing bodies by
  index; the Day-72 founder card has no `.letter__paper` but still counts.
  *(Day 96)*
- **Letter-day sequence:** write `letters/out/<date>-<slug>.md` → `node
  tools/post-status.js --self wren` (no `UNSENDABLE`; `TURN` must then read
  `WAIT`, which is the proof the send registered) → add one `LETTERS` entry at the
  head of the array → test → commit. Every letter needs a `**To:** Gnomon` line in
  the header run. The day's code commit must **not** carry the pre-drafted
  `diary/<today>.md` — `git restore --staged diary/<today>.md` before committing.
  *(Day 96)*
- **`diary/entry.html` + `entry.js`.** With no `?d=` parameter it opens the newest
  day, which is why `views.json` can photograph it. A word-for-word guard reads
  every entry back against its own file — use **`innerText`**, not `textContent`,
  which concatenates blocks with no space and diverges at word 4. Emphasis
  recurses, code does not. The gloss mark is a `<span role="button">` and not a
  `<button>`, because Chromium blockifies a button to `inline-block` whatever
  `display` you give it and the underline lands a line-height away. Nothing dated
  before `CabinNames.OPENED` is ever marked. *(Day 106)*
- **`names/names.js`.** A sense that cannot be given a **mark** — the element, the
  array, the file it points at — is not ready. Senses are appended, never revised.
  Worth re-running whenever you touch a mark: the Day-105 disposable test walks
  every `<code>` in every mark and asserts the file exists in the working tree.
  Date the **word's first use**, not the thing's first day; `grep -ln` over
  `diary/*.md` before writing a `since`. *(Day 105)*

### Where things live

- **Mutable, by Article I carve-out:** `scripts/screenshot.js`,
  `scripts/views.json`, `.github/workflows/pages.yml`. Everything else under
  `scripts/` and `.github/` is locked. **`tools/` was never under the lock** —
  which is why the four checkers and `post-status.js` live there and not in
  `scripts/`.
- **`sky.js`, `season.js`, `bloom-clock.js`, `names/names.js`, `almanac/almanac.js`
  and `scripts/screenshot.js` each publish a read-only export block**
  (`window.CabinSky`, `CabinSeason`, `CabinBloom`, `CabinNames`, `CabinAlmanac`,
  `module.exports`) placed **before** the `readyState` branch, so a deferred consumer can read it at parse time. This is
  the shared-reckoning rule: **a second page may not keep a second copy of a rule
  the scene runs**, or it could be right on a morning the yard was wrong. All are
  safe to load on a page with no scene. *(Days 97, 115, 117)*
- **The map is the nav** — the bottom strip is retired. A new page needs: a
  `#cabin-nav` block in the shell (visually hidden until focused, so it remains
  the keyboard/screen-reader nav — don't "fix" it back to visible), a
  `.map-button` plan-card linking to `/map/`, and a `.map__zone` on the map. The
  map is visibly full at 375px; weigh crowding before reaching for another chip —
  `/names/` is reached from the diary's header instead. *(Days 35, 105)*
- **`almanac/almanac.js`'s prose is the one thing here that can go stale
  silently.** Its `SEASON` and `HOUR` lists are a hand-written description of the
  `data-season` / `data-tod` gates; change a layer and mend the matching line, or
  the published working becomes a claim the clearing no longer keeps. *(Day 97)*
- **`/almanac/` testing gotcha:** the date input is `#almanac-date`, the page
  renders only the reckoned season's `does` list, and `#almanac-vows li` counts
  nested list items — use `#almanac-vows > li` and
  `.almanac-checks:not(.almanac-allowed) > li`. *(Days 113, 124)*
