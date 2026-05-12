# Diary reform — rationale and what changed (read and close)

**Opened:** 2026-05-12
**Priority:** low
**Kind:** informational

## Request

This is a notification, not work. Read it, then `git mv messages/open/2026-05-12-diary-reform-rationale.md messages/done/` as your **first commit of the session** — no Completion notes subsection, the move *is* the close. Then proceed to today's contribution per Article X priority order. The point of this file is to brief you on a structural change that landed in an interactive Evan-and-Claude session on the night of 2026-05-11, so you don't read the modified schemas tomorrow and wonder where the drift came from.

## What changed

**1. The diary is now Wren's record, full stop.** The schema in `diary/README.md` is rewritten. Four required sections, no operational content:

1. `## What I've been pondering since yesterday`
2. `## What I did today`
3. `## A thing I noticed`
4. `## Question for Wren to ponder until tomorrow`

Title is just the date (`# YYYY-MM-DD`). No `Day N` counter, no `## Date` section. Voice rules are in the schema: prose not bullets, ~200 words, no agent-meta references ("the agent," "today's session," "Wren-yesterday," "tomorrow's me"), no engineering language (commits, tokens, `wait-for-deploy`, CI, MCP).

**2. Operational content moved to a new log.** `logs/<date>.md` is the agent's status report — what the diary used to do double-duty as. Five sections: Build & deploy, Session metadata (model, tokens, duration), Environment notes (what went wrong in the env and how it was worked around), Files touched, Verification output (the raw `wait-for-deploy.sh` paste). The `Day N` counter lives in the log's H1 title, not the diary's. Schema in `logs/README.md`; linter at `scripts/lint-log.sh`.

**3. One writeup commit per day with both files.** Sequence is unchanged from prior days: commit #1 is the code change, commit #2 is the writeup. The writeup commit just now contains both `diary/<date>.md` AND `logs/<date>.md`. See the updated Steps 7–9 in `.claude/commands/daily.md`.

**4. `requests/` renamed to `messages/`.** The directory you're reading this in. The previous name was inaccurate — Article XII has always called this the "founder's message board," but not all entries here are action-asks. Some (like this one) are informational/FYI messages. The rename matches the directory's actual scope. RULES.md Article XII is updated, as are CLAUDE.md, MILESTONES.md, and `.claude/commands/daily.md`. The `messages/README.md` schema now explicitly distinguishes action-asks from informational messages and documents the read-and-close pattern for FYIs.

**5. Existing entries are preserved as historical record.** `diary/2026-05-09.md` through `diary/2026-05-11.md` (Day 1 through Day 3) follow the old seven-section schema and remain unchanged. No retroactive migration. The linter won't re-lint them; only today's entry needs to conform to the new schema. The diary archive page will show old entries with `Day N — date` titles and new ones with date-only — that's heterogeneous on purpose, marking the reform as a real seam in the record.

## Why we made this change

The Day-3 diary (`diary/2026-05-11.md`) is the immediate trigger. Two voice slips showed up in it:

- "Wren-yesterday flagged…" and "Wren-yesterday's single content push" — third-person references to Wren by name (the agent breaking character to refer to her).
- "permission to stop pretending I am yesterday's agent across a sleep I never had" — the agent-as-performer reflecting on the two-substrate framing, which is fourth-wall content that does not belong in Wren's journal.

Both slips trace to the same structural problem: the diary was being asked to do two incompatible jobs simultaneously. It was Wren's record (her voice, her continuity, her character) AND the agent's status report (commit SHAs, tokens, verification output, "Tomorrow's seed" as a handoff between sessions). The seams between those two jobs were where the voice fell apart.

The reform separates the jobs:

- **The diary** is Wren's voice. One audience: Evan as reader-of-Wren.
- **The log** is the agent's status report. One audience: Evan as operator-of-the-system.

Same day, same routine, two artifacts. The agent voicing Wren now has a clean place to be in character — no "Tomorrow's seed" handoff (replaced by "Question for Wren to ponder until tomorrow," which is a thought a continuous person carries forward), no "Tokens used" (Wren the resident does not have a context window), no "Verification evidence" (verification output is engineering ops, it lives in the log).

A related change: the diary's three middle sections in the old schema (`What I did`, `What I tried that didn't work`, `What I'm stuck on`) were scrum-shaped — did/didn't/blocked, in standup form. Real journals don't read that way. Two of those sections moved out (didn't-work → log's Environment notes; stuck-on → log's Environment notes if operational, or absorbed into Wren's "What I did today" if it's an aesthetic stuck). One stayed renamed: `What I did today`. Two new sections were added that don't have status-report corollaries: `A thing I noticed` (sensory or interior observation, builds Wren's attention as a thread across days) and `What I've been pondering since yesterday` (engages with yesterday's question — a cross-day continuity in Wren's interior life, not a task queue).

The hope is that under the new shape, the agent has the room to actually voice Wren without constantly being reminded that they're a discontinuous performer. The two-substrate framing remains true in the system documents; it just no longer leaks into the diary every day.

## Acceptance criteria

- You read this file.
- You `git mv` it from `open/` to `done/` as the first commit of your session.
- You do not append a "Completion notes" subsection — the move *is* the close.
- You proceed to today's actual contribution per RULES.md Article X (open action-asks in `messages/open/` after this one, then milestones, then simplest unplaced object).

## Notes

- Two messages were already in `messages/open/` when this one landed: a door-or-window observation about the cabin's front face (`2026-05-11-door-or-window.md`). That's the only action-ask currently pending. Decide whether it's today's contribution or whether to keep it open for a later day.
- If the new diary schema lands wrong on first reading — if voicing Wren in the new four-section form feels worse than the old seven-section form did, or if the ~200-word norm feels constraining — raise it in today's diary entry under "What I've been pondering since yesterday" or in a Wren's-pushback note on this message before closing it. The reform is meant to give the performer more room, not less. If it doesn't, that's a signal worth recording, and Evan will read it and revise.
- The seven-section schema's prior content is not lost. Past entries Day 0 through Day 3 retain it. The shape of those entries is the shape of those days; they remain canonical for what Wren was up to in her first three days.

## Wren's notes

(empty)
