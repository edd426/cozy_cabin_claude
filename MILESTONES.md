# MILESTONES — Evan's roadmap

This file is **locked** to the agent. Evan revises it; the agent reads it.

This is the slow-moving roadmap. Day-by-day priority comes from `requests/open/` first (specific things the founder is asking for now), then from the open milestones below (the agent's own choice from the menu), then from the agent's own taste. See RULES.md Article X.

---

## Phase 0 — Foundation (Days -1 to 1; the founder's scaffold)

Status: **complete**. The agent inherits all of this. Includes:

- Constitution (`RULES.md`), this roadmap, working notes (`CLAUDE.md`), agent settings (`.claude/settings.json`), `/daily` slash command (`.claude/commands/daily.md`), remote routine prompt (lives in the schedule config, mirrors the slash command).
- Mobile-first shell (`index.html`, `theme.css`) with Sprout Lands palette tokens.
- Hand-placed Day-0 cabin scene (`scene.html`, `scene.css`, `assets/composed/cabin-day-0.png`, `tree-01.png`, `tree-small.png`) — 3-tile-wide cabin facade with chimney, two trees, sage meadow under cream sky.
- Build / verify / lint pipeline: `scripts/build.sh` (writes `build-sha.js` + `diary/manifest.json`), `scripts/verify-deploy.sh` (post-deploy curl check), `scripts/lint-diary.sh` (diary schema enforcement).
- In-session local rendering pipeline: `scripts/local-snapshot.sh` + `scripts/screenshot.js` + pinned `package.json` (Playwright 1.49). Lets the agent visually inspect and interaction-test the working tree before push.
- Diary infrastructure: schema (`diary/README.md`), meta-reflection schema (`diary/meta/README.md`), Day-0 entry, archive page (`diary/index.html` + `diary.css` + `diary.js`) auto-rendered from build-time `diary/manifest.json`.
- One vendored asset pack — Cup Nooble's Sprout Lands Basic — at `assets/vendor/sprout-lands/` with `LICENSE.txt`, plus the running `ASSETS.md` log.
- Deploy + visual record: `.github/workflows/pages.yml` runs the Pages deploy AND a post-deploy Playwright screenshot job that commits `previews/<date>-<sha>.png` back to `main` so the next day's agent can `Read` it.
- Requests system: `requests/open/` and `requests/done/` directories with `requests/README.md` documenting the workflow; codified as RULES.md Article XII.
- Convention-only file locks (RULES.md Article I); no runtime hook.

## Phase 1 — Days 1–7

The agent introduces itself and earns the canvas it inherited. Suggested cadence (the agent picks the order):

- ✓ Day 1 (done): introduce yourself, pick a name, write the first proper diary entry. *Wren arrived on 2026-05-09.*
- Pull and test sprites from `assets/vendor/sprout-lands/`. Render one new sprite somewhere in `scene.html` — your choice what.
- Evolve the Day-0 cabin: a curl of smoke from the chimney, a path, a flower, a windowbox. One thing.
- Place a journal / open-book sprite somewhere on the cabin and wire it to tap through to `/diary/`. The archive page itself already exists (built into Phase 0); this milestone is just the visual entry point from the scene.
- Continue with one contribution per day (Article V).

## Phase 2 — Days 8–21

One new interactive item per day. Examples (the agent decides; this is not a checklist):

- A chair you can tap to sit in
- A lamp that toggles on/off (and remembers its state via `localStorage`)
- A plant that grows over multiple days (state in a JSON file in `assets/composed/`)
- A window with a daylight cycle tied to the current time of day
- A bookshelf that opens a `/library/` sub-page

## Phase 3 — Day 22 onward

Open-ended. There is no predefined endpoint, theme, or review date — the cabin becomes whatever the agent and the founder make it, day by day. The agent works from `requests/open/` (highest priority), then `MILESTONES.md` open milestones, then their own taste when neither offers a next step. The shape of the cabin at Day 60 or Day 200 is whatever the diary record adds up to.

If the agent on a future Day-N reads this and wants more direction: that is exactly what `requests/open/` is for. Ask the founder, in the diary or in a Wren's-pushback note on a request, for a more concrete sense of where the project is going. The default is: keep going, one thing per day, in the direction your reading of the diary suggests.

## Open milestones (agent picks order)

These are small, concrete targets the agent can reach for when `requests/open/` is empty and "what should I do today?" feels too open. Pick whichever fits today's prior context. Open requests in `requests/open/` always come first (RULES.md Article X).

- A name on the mailbox (no mailbox interaction yet — just lettering)
- Smoke from the chimney
- A footpath leading off-screen
- An additional tree (different species or scale than the two existing ones)
- A flower bed
- A windowbox with one plant
- The agent's name visible somewhere in the scene (a mug, a sign, a doormat)
- A journal / open-book sprite tappable through to the existing `/diary/` archive page
- A simple state toggle on something (a lamp that holds its on/off state via `localStorage`, a curtain that opens/closes)
- A `/library/` sub-page reachable from a tappable bookshelf, listing one or two starter books
