# Log schema

Every daily session writes an operational log at `logs/YYYY-MM-DD.md` alongside the diary entry. The agent runs `./scripts/lint-log.sh logs/<today>.md` before committing to catch missing sections.

The log is the engineering counterpart to the diary. Where the diary is Wren's voice (in character, prose), the log is the agent's status report (operational, terse, bullet-friendly). Both get written every day; both get committed together in a single writeup commit, separate from the code-change commit.

The log exists for two reasons:

1. **Operational honesty.** Without a place to record commit SHAs, deploy verification, token counts, and environment failures, those facts ended up polluting Wren's diary and breaking her voice. The log gives the agent a clean place to be a coder reporting status.
2. **Project health.** Across many days, the log records whether the routine is running healthy — whether `git push` is still 403'ing, whether `wait-for-deploy.sh` is hitting its 5-minute deadline, whether token usage is creeping. A diary in Wren's voice cannot carry that data.

The log is accessible at `https://edd426.github.io/cozy_cabin_claude/logs/<date>.md` (raw markdown — a pretty archive page and easter-egg entry point may come later).

## Title

```markdown
# Log — Day N — YYYY-MM-DD
```

`Day N = (today − Day-1 anchor 2026-05-09) + 1`.

## Required sections

```markdown
## Build & deploy

- Code commit: <sha> "<commit message one-liner>"
- Build SHA stamped in build-sha.js: <sha>
- Deploy verified: ✓ via wait-for-deploy.sh / ✗ (timed out) / N/A (no deploy)
- Preview screenshot: previews/<date>-<sha>.png

## Session metadata

- Model: claude-opus-4-7
- Tokens used: in ~XX,XXX / out ~XX,XXX
- Approximate session duration: <minutes>

## Environment notes

<Anything that went wrong in the env and how it was worked around. Examples:
git push 403'd, fell back to mcp__github__push_files; wait-for-deploy.sh
exited non-zero on first run because build.sh ran before the MCP push;
Playwright launched cleanly with pre-staged Chromium. On a clean day this
section can be "Nothing notable.">

## Files touched

- <list of files modified or created, with one-line note per file if non-obvious>

## Verification output

```
<fenced raw output from wait-for-deploy.sh and/or local-snapshot.sh, verbatim>
```
```

## Stuck-day handling

On a stuck day (no code change shipped — see RULES.md Article IX), the log still gets written:

- **Build & deploy** records "No deploy this day."
- **Environment notes** records the operational reality: what failed, what was tried, why.
- **Verification output** can be the failing script's output, or "N/A — no deploy."

The diary also still gets written, in Wren's voice — she can write about the day she had even if she didn't build. The log captures the engineering truth; the diary captures Wren's truth. Both are honest views of the same day.

## Conventions

- **Bullets are fine here.** The log is operational.
- **Token counts are required** — they are how the project monitors cost per day over time (RULES.md Article XI).
- **Verification output is verbatim** — paste the script output, do not summarize.
- **No retrospective edits** to past logs once committed (same rule as the diary).
- **Filename**: ISO date.

## Example

```markdown
# Log — Day 4 — 2026-05-12

## Build & deploy

- Code commit: 7f3a2b1 "scene: windowbox with one terracotta planter on cabin face"
- Build SHA stamped: 7f3a2b1
- Deploy verified: ✓ via wait-for-deploy.sh
- Preview screenshot: previews/2026-05-12-7f3a2b1.png

## Session metadata

- Model: claude-opus-4-7
- Tokens used: in ~78,000 / out ~9,500
- Approximate session duration: 35 min

## Environment notes

git push 403'd as expected; fell back to mcp__github__push_files for the
code commit. build.sh was re-run after the MCP push so build-sha.txt
matched HEAD.

## Files touched

- scene.html (windowbox div)
- scene.css (windowbox positioning + planter colors)
- diary/2026-05-12.md (new)
- logs/2026-05-12.md (this file)

## Verification output

```
wait-for-deploy: waiting for previews/2026-05-12-7f3a2b1.png on origin/main
wait-for-deploy: deadline in 5 minutes; polling every 20s
wait-for-deploy: not yet; 300s remaining
wait-for-deploy: not yet; 279s remaining
wait-for-deploy: previews/2026-05-12-7f3a2b1.png found in origin/main
wait-for-deploy: OK
```
```
