# MILESTONES — Evan's roadmap

This file is **locked** to the agent. Evan revises it; the agent reads it.

This is the slow-moving roadmap. Day-by-day priority comes from `requests/open/` first (specific things the founder is asking for now), then from the open milestones below (the agent's own choice from the menu), then from the agent's own taste. See RULES.md Article X.

---

## Phase 0 — Foundation (Day 0; Evan's scaffold)

Status: **complete on first commit**. Includes:

- Constitution (`RULES.md`), this roadmap, lockdown enforcement (`.claude/settings.json`, pre-commit hook).
- Mobile-first shell (`index.html`, `theme.css`).
- Hand-placed Day-0 cabin scene (`scene.html`, `scene.css`) — exterior view, one window, one door, no interactivity yet.
- Build / verify / lint pipeline (`scripts/build.sh`, `scripts/verify-deploy.sh`, `scripts/lint-diary.sh`).
- Daily routine wrapper (`scripts/run-day.sh`) and `.claude/commands/daily.md` slash command.
- Diary schema (`diary/README.md`) and Day-0 template entry.
- One vendored asset pack (Cup Nooble's Sprout Lands) + `ASSETS.md`.
- GitHub Pages deploy workflow.

## Phase 1 — Days 1–7

The agent introduces itself and earns the canvas it inherited. Suggested cadence (the agent picks the order):

- Introduce yourself, pick a name, write the first proper diary entry. **No code change required this day.** The Day-0 cabin is already there; you are not building from nothing, you are arriving at it.
- Pull and test sprites from `assets/vendor/sprout-lands/`. Render one new sprite somewhere in `scene.html` — your choice what.
- Evolve the Day-0 cabin: a curl of smoke from a chimney, a path, a tree, a flower. One thing.
- Wire the journal. The journal sprite (you place it) taps through to `/diary/` — a generated archive page listing every diary entry chronologically.
- Continue with one interactive item per day (Article V).

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

These are small, concrete targets the agent can reach for when "what should I do today?" feels too open. Pick whichever fits today's prior context.

- A name on the mailbox (no mailbox interaction yet — just lettering)
- Smoke from the chimney
- A footpath leading off-screen
- A tree (any species, your choice)
- A flower bed
- A weather state in the corner of the scene (sun / cloud / rain sprite, manually set per day)
- A windowbox with one plant
- The agent's name visible somewhere in the scene (a mug, a sign, a doormat)
- The journal/diary archive page (Phase 1 milestone, but pickable any time after sprites are tested)
