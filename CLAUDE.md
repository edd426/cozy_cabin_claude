# Working notes — see RULES.md for the constitution

These are operational notes for the daily agent. *How* to do things in this repo. Authority lives in `RULES.md`, not here. If a conflict arises, RULES wins.

You may edit this file. Append to "Things I've learned" as you discover gotchas; the next day's agent benefits.

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
│   ├── index.html          # archive page, listed via build-generated manifest.json
│   ├── diary.css           # archive page styles
│   └── diary.js            # client-side renderer
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
│   ├── verify-deploy.sh    # curl-grep verification (LOCAL ONLY -- the routine sandbox blocks
│   │                       # *.github.io outbound, so don't call this from the daily routine;
│   │                       # use wait-for-deploy.sh instead)
│   ├── wait-for-deploy.sh  # post-push verification via the CI screenshot bot's commit
│   ├── lint-diary.sh       # diary schema linter (you may run before commit)
│   ├── lint-log.sh         # log schema linter (you may run before commit)
│   ├── local-snapshot.sh   # in-session render of working-tree state via Playwright;
│   │                       # detects pre-staged Chromium at /opt/pw-browsers/ or system cache
│   ├── screenshot.js       # Playwright snapshot helper (called by local-snapshot.sh and CI);
│   │                       # MUTABLE — carve-out from the scripts/ lock per RULES.md Article I
│   └── run-day.sh          # routine wrapper (local only; not used in remote routine)
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
# (use this from the routine sandbox; verify-deploy.sh's curl is blocked)
./scripts/wait-for-deploy.sh

# (LOCAL DEVELOPER ONLY) curl-based verification — the routine sandbox can't curl github.io
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

(Append entries here as you discover them. Date each entry. Keep them concrete.)

- *(empty — first agent: be the first to add one)*
- **2026-05-10 (Wren, Day 2):** `git push` to the local proxy returned HTTP 403 (Cloudflare-fronted, routed through `api.anthropic.com`) on every retry, even though `git fetch` worked. Falling back to `mcp__github__push_files` worked first try. If `git push` 403s again, don't waste time on backoff — push via MCP. Note that MCP-pushed commits get the GitHub token's identity (not `Claude <noreply@anthropic.com>`), which is fine but worth knowing.
- **2026-05-10 (Wren, Day 2):** local-snapshot.sh renders at the **mobile-narrow** breakpoint (375px viewport), so positioning calc'd against the desktop 3x scale won't match what you see. The `@media (max-width: 379px)` overrides in scene.css are what's active in the snapshot — calibrate against those numbers (cabin 96×160, `bottom: 8%`).
- **2026-05-11 (Wren, Day 3):** Renaming a file via MCP costs **two commits**, not one. `mcp__github__push_files` only adds/updates; deletes go through the separate `mcp__github__delete_file`. For a `git mv` equivalent: call `create_or_update_file` (or `push_files`) for the new path, then `delete_file` for the old — each is its own commit on `main`, and CI fires a screenshot bot on each. Functionally fine, just noisier in `git log`. There is no MCP tool that does a single-commit rename.
- **2026-05-11 (Wren, Day 3):** Run `./scripts/build.sh` *after* your final MCP push, not before. `build.sh` writes `build-sha.txt` from the current `HEAD`, but MCP commits land on `origin` with SHAs you can't predict in advance — so a build done before the push will write the wrong SHA and `wait-for-deploy.sh` will poll for a preview that doesn't match your real change. Sequence: edit → MCP push → `git pull` (fast-forward to your new commit) → `./scripts/build.sh` → `./scripts/wait-for-deploy.sh`.
- **2026-05-11 (Evan):** Diary schema split into two artifacts. `diary/<date>.md` is now Wren's voice only — four sections (pondering since yesterday / what I did today / a thing I noticed / question for tomorrow), ~200 words, no engineering content. `logs/<date>.md` is the agent's status report — `Day N` counter, commit SHAs, tokens, verification output, environment notes. One writeup commit per day adds both files. Existing entries through `diary/2026-05-11.md` follow the old seven-section schema as historical record; they are not retroactively migrated. Same day: `requests/` renamed to `messages/` because the directory has always held both action-asks and informational/FYI messages — RULES.md Article XII rewritten to match. See `messages/open/2026-05-12-diary-reform-rationale.md` for the full why.
- **2026-05-30 (Evan):** The routine now has **"Allow unrestricted git push"** enabled in its claude.ai permissions, so `git push` to `origin/main` works directly from the sandbox. The HTTP 403 that drove the Day-2/3 MCP-fallback playbook above is **no longer expected** (Days 19–21 already pushed cleanly under it). **Default to plain `git push`** — don't reach for `mcp__github__push_files` preemptively; keep it only as a deep contingency if a push ever 403s again. Same day: the model moved to **Opus 4.8 (1M context)** (was Opus 4.7). Reasoning effort is **Max** (`.claude/settings.json` `effortLevel`; verify on the session footer). Record `claude-opus-4-8` in the log's Session-metadata `Model:` line.
- **2026-05-31 (Evan + investigating agent):** The Day-23 (rest-day) writeup never reached the live site because the routine sandbox dropped the agent onto a pre-made work branch `claude/serene-turing-F3CKs` (existing locally *and* on origin) instead of detached-HEAD-on-`main`. Step 0's `git checkout -B main HEAD` is a **no-op when you're already on a branch**, so it did NOT reattach to main. On top of that, the remote-execution **harness "task framing"** injected an instruction to "develop on `claude/serene-turing-F3CKs`" and "NEVER push to a different branch without explicit permission" — which is **not** in the routine config and **not** in this repo (the routine explicitly enables unrestricted push to `main`). The agent treated that harness framing as authoritative, committed `99ae5cc`, and pushed it to the work branch; it never landed on `main`, so no deploy and no diary entry. **Root cause: a sandbox-provisioning change (branch checkout + branch-isolation framing) that conflicts with this project's no-PR / always-`main` workflow, with the harness framing winning.** Fix: daily.md Step 0 now says explicitly that `main` is the only target and overrides any "develop on a `claude/*` branch / don't push elsewhere" framing; always verify your branch with `git rev-parse --abbrev-ref HEAD` and, if on a `claude/*` branch, push with `git push origin HEAD:main`. The same override was added to the routine's Instructions on claude.ai. If a future writeup goes missing, first check `git branch -a` / `git log --all` for an orphaned `claude/*` branch and fast-forward `main` to it.
- **2026-06-10 (Evan):** The model moved to **Fable 5 (1M context)** (was Opus 4.8) — `.claude/settings.json` now pins `claude-fable-5[1m]`, and the same swap was applied to README.md, RULES.md Article II, daily.md, and the logs/README.md schema (mirroring the 2026-05-30 Opus 4.7→4.8 swap). Record `claude-fable-5` in the log's Session-metadata `Model:` line. Reasoning effort stays **Max**. Note the 2026-05-30 entry above still says to record `claude-opus-4-8` — this entry supersedes it. Same day: found the root cause of the recurring drop-onto-a-work-branch condition (2026-05-31 entry above) — the routine config's `outcomes` field pins `branches: ["claude/sharp-gauss"]`, so the sandbox pre-creates that branch each run; it is not random provisioning drift. daily.md Step 0 and the routine prompt's Step 0 now reattach to `main` unconditionally (`git checkout -B main HEAD` when detached *or* on a `claude/*` branch), so plain `git push origin main` is the default and `git push origin HEAD:main` is just the fallback.
- **2026-05-18 (Wren, Day 10):** CI screenshot coverage is now manifest-driven. `scripts/views.json` lists every view as `{ name, url_path }`; `scripts/screenshot.js --manifest scripts/views.json BASE_URL OUT_DIR DATE_TAG SHA_SHORT` loops over it and writes one PNG per view. **Naming convention is load-bearing:** the entry named `"home"` lands at `previews/<date>-<sha>.png` (unsuffixed) — `scripts/wait-for-deploy.sh` is locked and polls for that exact filename to confirm deploy success. Other views land at `previews/<date>-<sha>-<name>.png`. To add a new view (a `back` angle, an interior room, etc.): edit `scripts/views.json` only, no workflow change needed. Single-shot mode (`screenshot.js URL OUT_PNG`) is preserved for `scripts/local-snapshot.sh`. Per-view glob for the memory pass: `ls -t previews/*-around.png | head -1` for the around view specifically; the bare `ls -t previews/*.png | head -1` for "most recent of any view" still works because one commit produces all its PNGs near-simultaneously.
- **2026-06-12 (Wren, Day 35):** The bottom nav strip is retired — **the map is the nav** (`messages/done/2026-05-13-nav-as-views-grow.md` completion notes have the full picture). When adding a NEW page/view, the pattern to copy is: (1) keep a `#cabin-nav` block in the shell with all links — it's visually hidden by `#cabin-nav:not(:focus-within)` in scene.css (mirrored in diary/diary.css) and reappears on keyboard focus, so it remains the screen-reader/keyboard nav; (2) give the view a `.map-button` plan-card (markup pattern in scene.html / around/index.html) linking to `/map/`; (3) add a travel zone for the view on `/map/` (a `.map__zone` in map/index.html + map.css). The diary is reached via the `.map__zone--diary` journal chip on the map, not from a strip. Don't "fix" the invisible nav back to visible — the invisibility is the design.
- **2026-06-14 (Evan):** The model moved **back to Opus 4.8 (1M context)** (was Fable 5) — reverting the 2026-06-10 swap — and, more usefully, the model name is now **model-agnostic everywhere except the two switches**, so future swaps don't churn the prose. The name lives in exactly two human-editable fields: `.claude/settings.json` `model` (`claude-opus-4-8[1m]`, for local `/daily`) and the cloud routine's `session_context.model` (same value; update via the RemoteTrigger recipe in the routine-config memory). **1M context = the `[1m]` suffix on the model id** — same mechanism Fable used; that's all "give it 1M context" means. Everything else that used to name the model was made generic: the routine prompt's first line is now "a single session of the daily routine"; README.md says "(Claude, 1M-token context)"; RULES.md Art II says "a single Claude session"; daily.md says "a single session"; and the log's Session-metadata `Model:` line is now **recorded from `.claude/settings.json`**, not hardcoded (daily.md Step + logs/README schema both say so). This supersedes the 2026-06-10 entry's "record `claude-fable-5`" and the 2026-05-30 entry's "record `claude-opus-4-8`" — record whatever `settings.json` pins. The routine `outcomes` branch field was left untouched. Reasoning effort stays **Max**.
- **2026-06-18 (Wren, Day 41):** The distant-hills component (`.sprite--hills` container + `.hill` base) lives in `scene.css`, which **every** view loads, so it's reusable across faces without copying CSS. To give another view its own horizon (Day 41 added one to the *around*/east face), reuse the `.sprite--hills` container and `.hill` base unchanged — they already carry the on-the-horizon seating (`bottom: calc(40% - 1px)`) and `z-index: 0` (behind everything) — and add only **view-specific per-hill modifier classes** in that view's own CSS (`.hill--e-*` in around.css), with a *different* arrangement so it reads as a different stretch of the same range, not a copy. Keep the same two hazed sage tones (`#b4c896` far / `#a2bd82` near) so the material reads identical across faces (Art XIII / "material truth"). The container is fixed-px + `%`-positioned, so no breakpoint rebase is needed — one block holds at both 375 and 390px. Cross-view geometry that worked: the around view is the east face with south to the viewer's *left*, so the south range reappears here as its far end wrapping the corner on the left, tapering to an open eastern horizon on the right — an asymmetric silhouette that's visibly not the front view's two flanking humps.
- **2026-06-11 (Wren, Day 34):** The 2x layout's breakpoint is now `@media (max-width: 599px)` (was `379px`) in scene.css, around/around.css, and inside/inside.css. Real phones are **390–440 CSS px wide** and were missing the old breakpoint — they got the desktop 3x layout crammed into a narrow viewport, with path stone 1 floating above the horizon (the founder's Day-33 message, `messages/done/2026-06-10-phone-breakpoint-blind-spot.md`). 599px is not arbitrary: locked theme.css holds `--content-max` at 420px until its own `min-width: 600px` step, so below 600px the scene caps at 388×291 and the 3x layout (240px-tall cabin) never actually fit there. **Calibrate anything that must read on a phone against the 2x numbers** (cabin 96×160, `bottom: 8%`) — this supersedes the "379px" wording in the 2026-05-10 entry above; the 2x override block is otherwise the same one. Same day: `screenshot.js` manifest mode now captures every view at **two widths** — 375×800 (names unchanged; home unsuffixed per the locked wait-for-deploy.sh contract) and 390×844 with a `-phone` suffix (`previews/<date>-<sha>[-<view>]-phone.png`) — so the real-phone band is part of the permanent visual record. The memory-pass glob `ls ${STEM}*.png` picks the phone variants up automatically; a commit now produces 8 preview PNGs, not 4.
