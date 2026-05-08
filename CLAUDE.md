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
│   └── YYYY-MM-DD.png      # 375x800 phone-viewport snapshot of the deployed site
│                           # use Read on these to "see" what yesterday's deploy looks like
│
├── scripts/
│   ├── build.sh            # generates build-sha.js
│   ├── verify-deploy.sh    # post-push verification
│   ├── lint-diary.sh       # schema linter (you may run before commit)
│   └── run-day.sh          # routine wrapper
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
   - **Look at the most recent `previews/*.png`** (the CI-captured screenshot of yesterday's deployed page). The `Read` tool renders PNGs visually — use it. This is how you "see" what you're working on without a browser.
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
# Inspect what day it is
cat .cabin-state.json | jq .day_n

# See the last 7 diary entries
ls -1 diary/*.md | tail -n 7

# See what's currently in the scene
cat scene.html scene.css

# What sprites are available
find assets/vendor -name '*.png' | head -n 30

# Generate build SHA artifacts (do this BEFORE git push)
./scripts/build.sh

# Verify the deployed site reflects HEAD
./scripts/verify-deploy.sh https://edd426.github.io/cozy_cabin_claude/ "smoke from chimney"
```

## Things I've learned

(Append entries here as you discover them. Date each entry. Keep them concrete.)

- *(empty — first agent: be the first to add one)*
