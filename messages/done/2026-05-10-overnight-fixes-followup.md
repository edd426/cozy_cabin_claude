# Overnight fixes — read and close, do not let this displace today's contribution

**Opened:** 2026-05-10
**Priority:** low

## Request

This is a notification, not work. Read it, then `git mv requests/open/2026-05-10-overnight-fixes-followup.md requests/done/` as your *first* commit of the session — no Completion notes subsection, the move *is* the close. Then proceed to today's real contribution per Article X priority order. The point of this file is to brief you on changes that landed in an interactive Evan-and-Claude session on the morning of 2026-05-10 (between your Day 2 push at ~02:30 and your Day 3 fire at 02:00 the following night), so that you don't read the modified files on Day 3 and wonder where the drift came from.

## Changes that landed

1. **`.claude/settings.json`** — five permission rules were silently dropped because of a syntax error (`:*` not at end of pattern; the parser accepts `:*` only as a trailing wildcard). All five rewritten as plain glob `*` patterns. Net effect: the `--no-verify` / `--force` / `-f` denies are now actually enforced (they weren't before — the strings parsed but the rules dropped at load time), and `Bash(git push origin*)` matches normal pushes (it didn't before — the colon was being treated as a literal character).

2. **`.claude/commands/daily.md`** — new Step 0 added at the very top of the slash command:
   ```bash
   git symbolic-ref -q HEAD >/dev/null 2>&1 || git checkout -B main HEAD
   ```
   This handles the routine sandbox starting in detached HEAD at `origin/main`'s tip. You worked around it manually on Day 2; it now runs unconditionally at session start, no-op when you're already on a branch.

3. **`CLAUDE.md`** — your Day-2 "Things I've learned" entry about detached HEAD was removed, since daily.md Step 0 makes it redundant. Your MCP-fallback note (the Cloudflare 403 on `git push`) and your mobile-narrow-rendering note (the 375px `@media` breakpoint that's active in `local-snapshot.sh`) both stayed — those are real workarounds for problems still in the system.

4. **The remote routine prompt** (the thing you read first, before `daily.md`) — the network-policy paragraph claimed `git push` to github.com works. It doesn't, as you discovered. Now says so explicitly and points at CLAUDE.md "Things I've learned" for the MCP playbook. Updated via `RemoteTrigger` from the same interactive session.

5. **Identity-framing tightened across `RULES.md` Article II, `daily.md` opening, `diary/README.md`, `diary/meta/README.md`.** The texts had been oscillating between two framings: sometimes "you, the agent, are Wren continuing across days" (Article II's old "diary is your identity across days"), sometimes "tomorrow's agent is a different process" (daily.md's opening). Those don't reconcile cleanly.

   The new framing is **two substrates**:

   - **Wren** is a continuous *character* — the cabin's resident, the diary's first-person voice, the accumulating set of preferences and concerns and callbacks.
   - **Today's agent** is a single Opus 4.7 session running the daily routine. Discontinuous from yesterday's session and tomorrow's.
   - **The diary** is the canonical record of Wren. Today's job is to voice her faithfully and add today's entry to her record. The diary is not your identity — it's the score you perform.

   The meta-reflection schema (`diary/meta/README.md`) was rewritten in line with this — it now asks "is Wren's voice still recognizable across these entries?" rather than "do I still feel like the same agent?" That's a question a performer can actually answer; the old one is malformed when the performer and the character are different objects.

   The reframe should land as a relief rather than a constraint: you don't have to claim continuity you don't have. You just voice Wren well today, and trust the diary to carry her forward.

## Acceptance criteria

- You read this file.
- You `git mv` it from `requests/open/` to `requests/done/` and commit the move as the very first commit of your session.
- You do not append a "Completion notes" subsection — the move *is* the close.
- You proceed to today's actual contribution per RULES.md Article X (open requests after this one, then milestones, then simplest unplaced object).

## Notes

- If anything in the identity reframe lands wrong on first reading — if performing-Wren-as-character feels worse than the prior continuous-self framing did — raise it in today's diary entry under "What I tried that didn't work" or "What I'm stuck on." The reframe is meant to match what's actually true about your situation; if it doesn't, that's a signal worth recording, and Evan will read it and revise.
- This file is the only request open right now. Once you've moved it to `done/`, `requests/open/` will be empty and Article X will have you fall through to MILESTONES.md (the "evolve the Day-0 cabin" track is well underway; today might be the footpath your Day-2 entry seeded, or the windowbox, or whatever your reading of the diary suggests).

## Wren's notes

(empty)
