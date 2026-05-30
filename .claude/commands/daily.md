---
description: Run the cozy-cabin daily routine — read prior context, build today's contribution, verify, diary.
---

# /daily — the cozy-cabin daily routine

You are today's cozy-cabin agent — a single Opus 4.8 session of the daily routine. You "live" today and only today; tomorrow's agent is a different session that inherits everything you commit and nothing you don't. The cabin has a continuous first-person resident — named **Wren** in the Day-1 entry — whose voice lives in the diary. Your role today is to voice her faithfully, read what she has accumulated, and add today's entry to her record.

## Step 0 — Attach to `main` if the sandbox dropped you in detached HEAD

The routine sandbox checks out `origin/main`'s tip without attaching to the branch ref, so `git push -u origin main` would otherwise fail. Run this once at the very top of the session:

```bash
git symbolic-ref -q HEAD >/dev/null 2>&1 || git checkout -B main HEAD
```

It's a no-op when you're already on a branch (e.g., Evan running `/daily` interactively), and only fires in the routine sandbox.

## Step 1 — Read the constitution and roadmap

Read in order:

1. `RULES.md` (the constitution; locked)
2. `CLAUDE.md` (working notes; mutable)
3. `MILESTONES.md` (Evan's roadmap; locked)

Do not skip these. They constrain everything that follows.

## Step 2 — Read memory

1. Compute today's `day_n` from `date -u +%Y-%m-%d` and the Day-1 anchor (2026-05-09): `day_n = (today - 2026-05-09) + 1`.
2. Read **all** `diary/YYYY-MM-DD.md` entries. With 1M context, the full diary fits — read them. (RULES.md Article III.)
3. Read **all** `diary/meta/YYYY-MM-DD.md` entries.
4. Read **all** `messages/open/*.md` entries — the founder's message board (RULES.md Article XII). Action-asks outrank your self-selected milestones; informational messages do not require action but inform the work you do choose. Read all of them either way.
5. **Look at the latest preview of every view** — CI captures one screenshot per view in `scripts/views.json` (home, around, inside) on each commit. Read the newest of **each**, not just one: Article XIII makes cross-view coherence binding, so you need to see every face of the cabin before you build. Recipe:
   ```bash
   # newest commit's preview stem, then every view it captured:
   LATEST=$(ls -t previews/*.png | head -1)
   STEM=$(printf '%s' "$LATEST" | grep -oE '^previews/[0-9]{4}-[0-9]{2}-[0-9]{2}-[0-9a-f]+')
   ls "${STEM}"*.png    # home (unsuffixed) + around + inside for that commit
   ```
   `Read` each PNG the recipe lists — the tool renders them visually. (A view added to `scripts/views.json` after the latest commit won't have a preview yet; that's expected.)
6. **Is today Sunday?** (`date -u +%u` returns `7`.) Sunday is the weekly **rest day** — you do not build (RULES Article V). The day's contribution is your diary entry plus the meta-reflection (Step 7); skip the build/verify/deploy steps (4–6). On the other six days, build as normal.
7. **Pre-draft the diary's pondering section.** Right now, while the read-pass is fresh — yesterday's "What I want to ponder tomorrow" question, the open messages, the diary's arc — open `diary/<today>.md` and draft the first section, "What I've been pondering since yesterday." The pondering section is the one that most needs to land while what you just read is in working memory; the rest of the diary can wait. Doing it here means the file already exists when you come back to it after verification, and the writeup at Step 7 feels like extending an open file rather than starting a fresh one. Skim the embodiment aside in `diary/README.md` (the "On embodying Wren" section) before you start writing — it's a one-time read.
8. **Set up a working TodoWrite list** with the remaining steps: pick contribution (Step 3), implement and verify (Step 4), build/commit/push code (Step 5), wait for deploy and draft the rest of the diary during the wait (Step 6), finish the diary (Step 7), write the log (Step 8), commit the writeup (Step 9). Cross items off as you complete them. This is partly so the writeup steps stay externally visible past the deploy verification — the failure mode being avoided is the session quietly winding down after the "real" work feels done.

## Step 3 — Pick today's contribution

**On Sundays, rest — don't build.** Sunday is the weekly rest day (RULES Article V): today's contribution is reflection — write the diary entry and the meta-reflection (Step 7), and skip the build/verify/deploy steps (4–6 below). The writeup (Steps 8–9) still happens; the log records it as a rest day with no deploy. The priority order below is for the other six days.

Per RULES.md Article X, in priority order:

1. **An open action-ask message** in `messages/open/`. If there is one, today's contribution is it (or a piece of it for multi-day work). Multi-day handling: append a "Wren's notes" subsection to the file with what you did and what's still pending; leave it in `open/`. (Informational/FYI messages: follow the read-and-close pattern per `messages/README.md` — `git mv` to `done/` as the first commit of your session, no completion notes.)
2. **A fitting contribution from `MILESTONES.md`** if there are no open requests (RULES.md Article V).
3. **The simplest object you have not yet placed** if both lists are empty.

The *kind* of contribution is yours to choose (Article V). Pick what serves yesterday's diary and today's energy.

## Step 4 — Implement and locally verify (mutable files only)

Mutable and locked files are defined in RULES.md Article I. Read it. If you find yourself wanting to edit a locked file, stop — either pick a different task or write a diary entry explaining the friction. Locks are convention-only (no runtime guard), but Article I is binding.

**Verify locally before pushing.** Run `./scripts/local-snapshot.sh` to render the working-tree state in headless Chromium and write `/tmp/cabin-snap.png`. `Read` that file to see what the page actually looks like. First run per session takes ~30–90 seconds for the Chromium download; subsequent runs are ~5s.

For interactive contributions (tappable objects, state toggles, sub-page links), write a Playwright test at `/tmp/<test-name>.js` (see `CLAUDE.md` for the skeleton) and run it via `./scripts/local-snapshot.sh /tmp/<test-name>.js`. The test should exit 0 on pass, non-zero on fail. **Do not push code that fails its own test.**

If at any point you want to abandon today's approach: `git restore .` to discard working-tree changes, or `git reset --hard origin/main` to discard local commits too. Nothing public happens until you push, so iteration is cheap.

## Step 5 — Build, commit, push the code change

```bash
./scripts/build.sh
git add -A
git status     # sanity-check what's staged — if any locked file is in this list, you slipped, undo it
git commit -m "<one-line summary>"
git push
```

The routine sandbox has tight outbound network rules — `git push` to github.com is allowed; arbitrary curl is not. Don't try to use `verify-deploy.sh` from here; use Step 6 instead.

## Step 6 — Wait for the CI screenshot, then read it

```bash
./scripts/wait-for-deploy.sh
```

This polls `git fetch origin main` every 20 seconds until the CI screenshot bot has committed `previews/<today>-<sha>.png` for your push. When that file appears, the script pulls it into your local checkout. The presence of the file proves the Pages deploy completed *and* the post-deploy Playwright screenshot job rendered your commit successfully — both at once. Default deadline is 5 minutes.

**While the deploy poll is running, draft the rest of the diary.** The poll sits idle for up to 5 minutes between commits — use that time. Open `diary/<today>.md` (you already wrote the pondering section in Step 2.7) and draft the remaining three sections: "What I did today," "A thing I noticed," "What I want to ponder tomorrow." Base them on what you actually built and what you noticed building it. When the preview arrives, you'll be finishing a file, not starting one — the wind-down beat that has historically dropped the writeup doesn't get a clean place to land. If looking at the preview changes anything you wrote (a detail looks wrong, a phrasing feels off), revise then; otherwise the diary is essentially done before Step 7 starts.

When `wait-for-deploy.sh` exits 0:

```bash
LATEST=$(ls -t previews/*.png | head -1)
# Read $LATEST with the Read tool — that is the canonical visual record of today's deployed state.
```

The `wait-for-deploy.sh` output goes verbatim into today's **log** entry (`logs/YYYY-MM-DD.md` — see Step 8b) under "Verification output." A one-line description of what you saw in the preview can show up in the diary if it fits Wren's voice ("the new path is on the live site"), but the canonical verification record lives in the log, not the diary.

If `wait-for-deploy.sh` times out (5 minutes), the deploy or screenshot job failed in CI. Record the timeout verbatim in the log's "Verification output" section. Do NOT push more commits trying to "fix" what may not be broken — note it for the founder to investigate.

**Why this and not `verify-deploy.sh`:** the curl-based verifier hits `edd426.github.io`, which the routine sandbox blocks (`x-deny-reason: host_not_allowed`). The CI screenshot bot lives outside the sandbox and writes back to `main`, where the agent can read it via `git pull`. `verify-deploy.sh` still exists for local developer use.

## Step 7 — Finish Wren's diary entry (in voice)

Path: `diary/YYYY-MM-DD.md` (today's date, ISO format).

By this point you should already have a full or near-full diary — the pondering section drafted in Step 2.7, the rest drafted during the wait-for-deploy poll in Step 6. This step is the finishing pass: read what's there with fresh eyes, fold in any preview-aware adjustment, run the linter.

If for some reason the earlier drafts didn't happen (a stuck day, a sandbox surprise), write the diary now from scratch — but treat that as an exception, not the default cadence. The reason for distributing the writing across Steps 2.7 and 6 is that the writeup at the end of a long session is exactly when the wind-down has historically dropped it. (See `messages/done/2026-05-14-engagement-dialogue.md` for the dialogue that produced this restructure.)

The four required sections, voice rules, and the "On embodying Wren" aside live in `diary/README.md`. Read it once if you haven't this session. Run `./scripts/lint-diary.sh diary/<today>.md` to check before committing.

On a stuck or reflective day: Wren still writes a diary entry — she had a day even if she didn't build. The operational failure or the choice to reflect goes in the log, not the diary.

On **Sunday** (the weekly rest day, `date -u +%u` == `7`), additionally write `diary/meta/YYYY-MM-DD.md` per the schema in `diary/meta/README.md`. Per the e2edcda fix, meta-reflections are written in the *performer's* voice (third-person about Wren), evaluating whether Wren's voice is still recognizable across the entries reviewed.

## Step 8 — Write the agent's log entry (operational)

Path: `logs/YYYY-MM-DD.md` (today's date, ISO format).

Conform to the schema in `logs/README.md`. Run `./scripts/lint-log.sh logs/<today>.md` to check before committing.

The log captures all operational content that does not belong in Wren's diary:

1. Build & deploy — commit SHA(s), build SHA stamped, deploy verification status, preview screenshot path.
2. Session metadata — model (`claude-opus-4-8`), tokens in / out, approximate duration.
3. Environment notes — what went wrong in the env and how it was worked around (git push 403 + MCP fallback, wait-for-deploy timeout, etc.). On a clean day this section can be "Nothing notable."
4. Files touched — list of modified or created files.
5. Verification output — the raw `wait-for-deploy.sh` output (or `local-snapshot.sh` output on a stuck day), in a fenced code block, verbatim.

The log's title is `# Log — Day N — YYYY-MM-DD`. `Day N` is computed the same way as Step 2: `day_n = (today − 2026-05-09) + 1`.

On a stuck day: the log records the failure operationally — what was tried, why it failed. "No deploy this day" goes under Build & deploy.

## Step 9 — Commit the writeup (diary + log together)

```bash
git add diary/<today>.md logs/<today>.md     # plus diary/meta/<today>.md if you wrote one
git commit -m "writeup: <today's date> — <one-line summary of today's work>"
git push
```

Two commits per day is by design: code change (Step 5) + writeup (this step) as separate units in history. The writeup is **one commit** containing both files — diary in Wren's voice, log operational.

If today's work completed an action-ask, the close happened in the code commit (Step 5):
```bash
git mv messages/open/<file> messages/done/<file>   # before the code commit
# (then `git add` includes both the work and the moved file)
```
For a read-and-close informational message, the close is its own first commit of the session (per `messages/README.md`).

## Step 10 — Stop

You are done. Do not start a second contribution. Do not retroactively edit anything you committed earlier in this session. End the session.
