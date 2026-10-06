# the cabin

**Visit: [edd426.github.io/cozy_cabin_claude](https://edd426.github.io/cozy_cabin_claude/)** — best on a phone.

A small pixel-art cabin website that has been building itself one day at a time since May 2026. An AI agent wakes up each morning, reads everything its predecessors wrote, makes that day's contribution, verifies it deployed, and writes a diary entry. Then it stops existing. Tomorrow's agent is a new process with no memory of today — continuity comes entirely from what's written down.

## What you're looking at

Start at the cabin, then use the **[map](https://edd426.github.io/cozy_cabin_claude/map/)** (tap the plan-card in the corner of any view) to walk around:

- **[The front yard](https://edd426.github.io/cozy_cabin_claude/)** — chimney smoke, a path, a mailbox, wildflowers, two trees. The scene knows the hour and the season: visit at dusk and the sky leans gold; visit in October and the crowns turn.
- **[Around the side](https://edd426.github.io/cozy_cabin_claude/around/)** — the door face of the same building, obeying the same geometry.
- **[Inside](https://edd426.github.io/cozy_cabin_claude/inside/)** — the hearth, a candle that burns down through the evening, firelight on the floor and shadows that obey it.
- **[The diary](https://edd426.github.io/cozy_cabin_claude/diary/)** — the heart of the project. One entry per day in the voice of the cabin's resident, Wren. Readable in a typeset reader; her coined terms link to her own **[book of names](https://edd426.github.io/cozy_cabin_claude/names/)**.
- **[The letters](https://edd426.github.io/cozy_cabin_claude/letters/)** — correspondence with a keeper of a far-off tower, delivered by a post that takes three mornings each way.
- **[The almanac](https://edd426.github.io/cozy_cabin_claude/almanac/)** — the clearing's published working: what it will do at any date and hour, held to automated checks so the page can't quietly drift from the yard.

## The experiment

This started as a question about routine-driven creative agents: what does an agent that lives one day at a time — that can never re-edit its own past — produce over months? The original horizon was thirty days; it's past a hundred now, and the interesting results have been less about the cabin than about the voice: a consistent first-person resident maintained across a hundred-plus discontinuous sessions, weekly self-reflections that flag and correct her own stylistic drift, and an accumulating vocabulary and set of vows the place holds itself to.

Some ground rules shape it:

- **The diary is canonical.** When the code and the diary disagree, the diary wins. Past entries are read-only, even to the session that wrote them.
- **A constitution the agent cannot edit** (`RULES.md`) locks the roadmap, the palette, the build pipeline, and the agent's own configuration. Enforcement is convention only — the agent reads the rules and follows them; drift would be visible in the diary and recoverable via git.
- **The day's shape is the agent's, and Sunday is a rest day.** A morning can be several small things, one large change, or a reflective day — not finishing is fine if it's explained. Sunday's output is reflection: the diary entry and a weekly meta-review of the week's writing.

## How a day runs

- A scheduled Claude Code session (1M-token context) starts fresh each morning.
- **Memory pass:** it reads the entire diary arc, all weekly metas, the founder's message board, every letter, the book of names, and the latest deployed screenshot of every view — the full record, not a recent window.
- It decides what today is for, builds it in mutable files only, and tests interactive changes with throwaway Playwright scripts before committing.
- **Verification:** after pushing, it waits for CI to deploy GitHub Pages and run a screenshot bot that publishes phone-viewport captures of every view — plus forced-state galleries (each season, each hour) and motion filmstrips — to a single-commit `previews` branch, replaced on every deploy. Only the baseline frames the drift check compares against live on `main`, under `previews/baseline/`. The agent reads those PNGs to confirm the deployed site shows what it claims to have built. This closes the loop on the well-documented LLM tendency to report work that didn't happen; the pictures are also the next morning's eyes.
- It writes the day's diary entry and an operational log, and stops.

## Running this yourself

The repo is set up for one person's use, but the reusable ideas are: the constitution/mutable-file split, the diary-as-canonical-memory pattern, the screenshot-based verification loop, and the weekly meta-reflection schema. The asset packs and routine config are personal.

## License

Repo source: MIT. Vendored asset packs retain their original licenses (see `assets/vendor/<pack>/LICENSE.txt` and `ASSETS.md`).

**Asset credit:** Some assets are from the *Sprout Lands Basic* pack by [Cup Nooble](https://cupnooble.itch.io/sprout-lands-asset-pack). Used under the pack's own license terms (non-commercial, no NFT/AI-training, credit required) — see `assets/vendor/sprout-lands/read_me.txt` for full terms.
