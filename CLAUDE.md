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
│                              # use Read on the latest to "see" what yesterday's deploy looks like
│                              # find latest:  ls -t previews/*.png | head -1
│
├── scripts/
│   ├── build.sh            # generates build-sha.js + diary/manifest.json
│   ├── verify-deploy.sh    # curl-grep verification (LOCAL ONLY -- the routine sandbox blocks
│   │                       # *.github.io outbound, so don't call this from the daily routine;
│   │                       # use wait-for-deploy.sh instead)
│   ├── wait-for-deploy.sh  # post-push verification via the CI screenshot bot's commit
│   ├── lint-diary.sh       # schema linter (you may run before commit)
│   ├── local-snapshot.sh   # in-session render of working-tree state via Playwright;
│   │                       # detects pre-staged Chromium at /opt/pw-browsers/ or system cache
│   ├── screenshot.js       # Playwright snapshot helper (called by local-snapshot.sh and CI)
│   └── run-day.sh          # routine wrapper (local only; not used in remote routine)
│
├── .claude/
│   ├── settings.json       # destructive-bash denies + allowlist
│   └── commands/daily.md   # /daily slash command
│
└── .github/workflows/pages.yml  # Pages deploy
```

Generated/runtime files (gitignored, do not commit): `build-sha.js`, `build-sha.txt`, `.cabin-state.json`.

## How a day runs

The daily routine wrapper invokes `claude "/daily"`. The slash command instructs you to:

1. **Read the constitution.** `RULES.md`, `CLAUDE.md` (this file), `MILESTONES.md`. Mandatory.
2. **Read memory.** All `diary/*.md` entries (you have a 1M context — read them all), plus all `diary/meta/*.md` entries. Mandatory.
   - **Look at the most recent `previews/*.png`**: `LATEST=$(ls -t previews/*.png | head -1)` then `Read` it. This is how you "see" what you're working on without a browser. The CI bot writes one screenshot per commit, never overwriting, so the file with the most recent mtime is yesterday's last deploy.
   - **Read all `messages/open/*.md`** — the founder's message board. Action-asks outrank self-selected milestones (RULES.md Article X); informational messages don't require action but inform the work you do choose.
3. **Pick today's contribution.** If there's an open action-ask in `messages/open/`, that's today's work (or a piece of it). Otherwise pick the smallest viable change from `MILESTONES.md`. **One thing.**
4. **Implement it.** Edit only mutable files. If you find yourself wanting to edit a locked file, that's a sign to either pick a different task or write a diary entry explaining the friction.
5. **Build, commit, push.**
   ```
   ./scripts/build.sh
   git add -A
   git commit -m "<one-line summary of today's contribution>"
   git push
   ```
6. **Wait for deploy.** GitHub Pages typically deploys in 30–90s. Don't poll faster than every 20s.
7. **Verify.** From the routine sandbox use `./scripts/wait-for-deploy.sh` (the curl-based `verify-deploy.sh` is for local dev only — the sandbox blocks `*.github.io`). The verification output goes verbatim into today's log entry (step 8b), not the diary.
8. **Write today's writeups — two artifacts.**
   - **8a. Wren's diary** at `diary/YYYY-MM-DD.md` per the schema in `diary/README.md`. Four sections, Wren's voice, ~200 words, no operational content. Run `./scripts/lint-diary.sh diary/<today>.md`.
   - **8b. The agent's log** at `logs/YYYY-MM-DD.md` per the schema in `logs/README.md`. Five sections, operational, the `Day N` counter and all engineering content (commit SHAs, tokens, verification output, env notes) live here. Run `./scripts/lint-log.sh logs/<today>.md`.
9. **Commit the writeup (diary + log together).**
   ```
   git add diary/<today>.md logs/<today>.md
   git commit -m "writeup: <today's date> — <one-line summary of today's work>"
   git push
   ```

Two commits per day is by design — code change + writeup as separate units. The writeup is one commit containing both files: diary in voice, log operational.

### Stuck-day protocol

If you cannot complete code work today:

1. Skip steps 5–7.
2. Write **both** the diary (Wren's voice — she had a day even if she didn't build) AND the log (records the operational failure: what was tried, why it failed). Per Article IX of RULES.md.
3. Commit and push the writeup (`git add diary/<today>.md logs/<today>.md` then commit).
4. End the session.

Tomorrow's agent will see both the diary entry (Wren's account) and the log (engineering account) in its memory window.

### Weekly meta-reflection

Every 7th day (the wrapper writes `day_n` into `.cabin-state.json` — read it), additionally write `diary/meta/YYYY-MM-DD.md` per the schema in `diary/meta/README.md`. This is identity-drift monitoring across the project's arc.

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

## Things I've learned

(Append entries here as you discover them. Date each entry. Keep them concrete.)

- *(empty — first agent: be the first to add one)*
- **2026-05-10 (Wren, Day 2):** `git push` to the local proxy returned HTTP 403 (Cloudflare-fronted, routed through `api.anthropic.com`) on every retry, even though `git fetch` worked. Falling back to `mcp__github__push_files` worked first try. If `git push` 403s again, don't waste time on backoff — push via MCP. Note that MCP-pushed commits get the GitHub token's identity (not `Claude <noreply@anthropic.com>`), which is fine but worth knowing.
- **2026-05-10 (Wren, Day 2):** local-snapshot.sh renders at the **mobile-narrow** breakpoint (375px viewport), so positioning calc'd against the desktop 3x scale won't match what you see. The `@media (max-width: 379px)` overrides in scene.css are what's active in the snapshot — calibrate against those numbers (cabin 96×160, `bottom: 8%`).
- **2026-05-11 (Wren, Day 3):** Renaming a file via MCP costs **two commits**, not one. `mcp__github__push_files` only adds/updates; deletes go through the separate `mcp__github__delete_file`. For a `git mv` equivalent: call `create_or_update_file` (or `push_files`) for the new path, then `delete_file` for the old — each is its own commit on `main`, and CI fires a screenshot bot on each. Functionally fine, just noisier in `git log`. There is no MCP tool that does a single-commit rename.
- **2026-05-11 (Wren, Day 3):** Run `./scripts/build.sh` *after* your final MCP push, not before. `build.sh` writes `build-sha.txt` from the current `HEAD`, but MCP commits land on `origin` with SHAs you can't predict in advance — so a build done before the push will write the wrong SHA and `wait-for-deploy.sh` will poll for a preview that doesn't match your real change. Sequence: edit → MCP push → `git pull` (fast-forward to your new commit) → `./scripts/build.sh` → `./scripts/wait-for-deploy.sh`.
- **2026-05-11 (Evan):** Diary schema split into two artifacts. `diary/<date>.md` is now Wren's voice only — four sections (pondering since yesterday / what I did today / a thing I noticed / question for tomorrow), ~200 words, no engineering content. `logs/<date>.md` is the agent's status report — `Day N` counter, commit SHAs, tokens, verification output, environment notes. One writeup commit per day adds both files. Existing entries through `diary/2026-05-11.md` follow the old seven-section schema as historical record; they are not retroactively migrated. Same day: `requests/` renamed to `messages/` because the directory has always held both action-asks and informational/FYI messages — RULES.md Article XII rewritten to match. See `messages/open/2026-05-12-diary-reform-rationale.md` for the full why.
