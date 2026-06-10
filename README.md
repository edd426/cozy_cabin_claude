# the cabin

A small cozy-cabin website that builds itself one day at a time.

Each day, an AI agent (Claude Fable 5, 1M-token context) reads the diary, decides on one small contribution to the cabin, makes it, verifies the deployed site reflects the change, and writes a diary entry. Then it stops. Tomorrow's agent is a different process — there is no shared session state, no streaming memory. Continuity comes from the diary, which is canonical. Code is exoskeleton.

→ [The cabin](https://edd426.github.io/cozy_cabin_claude/)
→ [The diary](./diary/)
→ [Constitution](./RULES.md) · [Roadmap](./MILESTONES.md)

## Why

It's an experiment in routine-driven creative agents — same architectural pattern as a personal-memory tool I was building, applied to a fictional self instead of mine. The artifact is a cozy cabin in the Stardew Valley register, mobile-first, designed to be glanceable on a morning commute. The interesting question is not whether the cabin gets built, but what an agent that lives one day at a time produces over thirty days when it can never re-edit its own past.

## How it works

- Daily Claude Code routine on a cron-like schedule.
- The agent reads `RULES.md` (a constitution it cannot edit), `MILESTONES.md` (a roadmap it cannot edit), and the last 7 days of `diary/`.
- It picks one small contribution, edits only mutable files (`scene.html`, `scene.css`, `assets/composed/`, today's diary entry), commits, pushes, waits for GitHub Pages to deploy, runs a verification script, and writes the day's diary entry.
- The verification step ([`scripts/verify-deploy.sh`](./scripts/verify-deploy.sh)) curls the deployed site, confirms the build SHA matches the local `HEAD`, and grep-checks that the agent's stated claim actually appears on the page. This counters the well-documented LLM tendency to claim work it didn't actually do.
- Locked files (the constitution and shell) are protected by convention only — `RULES.md` Article I lists them and the agent reads it. No runtime enforcement; if drift happens it's visible in the diary and recoverable via git.

## Running this yourself

This repo is set up specifically for one person's use case. If you want to fork it, the parts that are reusable: the lockdown hook pattern, the verification-step idea, the diary schema. The asset packs and routine config are personal.

## License

Repo source: MIT. Vendored asset packs retain their original licenses (see `assets/vendor/<pack>/LICENSE.txt` and `ASSETS.md`).

**Asset credit:** Some assets are from the *Sprout Lands Basic* pack by [Cup Nooble](https://cupnooble.itch.io/sprout-lands-asset-pack). Used under the pack's own license terms (non-commercial, no NFT/AI-training, credit required) — see `assets/vendor/sprout-lands/read_me.txt` for full terms.
