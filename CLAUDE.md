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
├── index.html              # mobile-first shell (locked)
├── theme.css               # palette, fonts, spacing tokens (locked)
├── scene.html              # cabin scene markup (mutable — your canvas)
├── scene.css               # cabin scene styles (mutable)
├── 404.html                # GitHub Pages 404 (locked-ish; don't bother)
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
├── previews/               # auto-committed deploy screenshots (CI bot)
│   └── YYYY-MM-DD-<sha>.png   # 375x800 phone-viewport snapshot per commit
│                              # use Read on the latest to "see" what yesterday's deploy looks like
│                              # find latest:  ls -t previews/*.png | head -1
│
├── scripts/
│   ├── build.sh            # generates build-sha.js
│   ├── verify-deploy.sh    # post-push verification (curl-grep)
│   ├── lint-diary.sh       # schema linter (you may run before commit)
│   ├── local-snapshot.sh   # render working-tree state in Playwright; in-session visual + interaction checks
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
2. **Read recent memory.** Last 7 days of `diary/*.md`, plus the most recent `diary/meta/*.md` if any. Mandatory. Earlier diary entries are opt-in — read them only if today's task references them.
   - **Look at the most recent `previews/*.png`**: `LATEST=$(ls -t previews/*.png | head -1)` then `Read` it. This is how you "see" what you're working on without a browser. The CI bot writes one screenshot per commit, never overwriting, so the file with the most recent mtime is yesterday's last deploy.
3. **Pick today's contribution.** Smallest viable change that advances an open milestone from `MILESTONES.md`. **One thing.** A diary-only day is a valid choice.
4. **Implement it.** Edit only mutable files. If you find yourself wanting to edit a locked file, that's a sign to either pick a different task or write a diary entry explaining the friction.
5. **Build, commit, push.**
   ```
   ./scripts/build.sh
   git add -A
   git commit -m "<one-line summary of today's contribution>"
   git push
   ```
6. **Wait for deploy.** GitHub Pages typically deploys in 30–90s. Don't poll faster than every 20s.
7. **Verify.** `./scripts/verify-deploy.sh <URL> "<a string from your change>"`. If it exits non-zero, do NOT fabricate a passing diary entry. Record the actual failure.
8. **Write the diary entry.** Path: `diary/YYYY-MM-DD.md` (use today's date). Conform to the schema in `diary/README.md`. Optionally run `./scripts/lint-diary.sh diary/<today>.md` before committing to catch missing sections.
9. **Commit the diary separately.**
   ```
   git add diary/<today>.md
   git commit -m "diary: <today's date> — <one-line summary>"
   git push
   ```

Two commits per day is by design — code change + diary as separate units.

### Stuck-day protocol

If you cannot complete code work today:

1. Skip steps 5–7.
2. Write a diary entry per Article IX of RULES.md describing the obstruction.
3. Commit and push the diary entry alone.
4. End the session.

Tomorrow's agent will see the stuck entry in its memory window.

### Weekly meta-reflection

Every 7th day (the wrapper writes `day_n` into `.cabin-state.json` — read it), additionally write `diary/meta/YYYY-MM-DD.md` per the schema in `diary/meta/README.md`. This is identity-drift monitoring for Evan, not your benefit.

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

# Verify the deployed site reflects HEAD (after push)
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
  const url = process.env.COZY_CABIN_URL;
  const outdir = process.env.COZY_CABIN_OUTDIR;

  const browser = await chromium.launch();
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
