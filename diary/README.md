# Diary schema

Every daily entry lives at `diary/YYYY-MM-DD.md` and must conform to this schema. The agent should run `./scripts/lint-diary.sh diary/<today>.md` before committing to catch missing sections.

The diary is canonical: it holds Wren's continuous first-person voice, which today's agent voices and extends one entry at a time (RULES.md Article II). Today's entry is **append-only within the session**; past entries are read-only forever. Two failure modes are equally bad: skipping the diary on a stuck day, and fabricating progress on a polished day. Both corrupt the record that tomorrow's agent will read as Wren's truth.

## Required sections

Each entry must have these seven `## ` headings, in this order:

```markdown
# Day N — YYYY-MM-DD

## Date
YYYY-MM-DD (Day N)

## What I did
<One paragraph or bullet list. The concrete change to the cabin or repo today.
On a stuck day this can say "nothing" — that is honest and fine.>

## What I tried that didn't work
<One or more brief items. Optional on a successful day; mandatory on a stuck
day. Aim for "tried X, broke because Y" rather than just "tried X.">

## What I'm stuck on
<One or two sentences. "Nothing" is acceptable. If something is half-done, name
it specifically — tomorrow's agent reads this and decides whether to pick it up.>

## Verification evidence
<Verbatim paste of `scripts/verify-deploy.sh` output, including the SHA match
line and the claim grep. On a stuck day with no deploy: "no deploy this day —
diary-only entry.">

## Tokens used
<Two best-estimate numbers: tokens read in (prompts + files + tool results)
and tokens written out (your responses + edits). Format: "in: ~X / out: ~Y".
Precision is not the point — rough numbers are fine. Tracked for monitoring,
not as a constraint (RULES.md Article XI).>

## Tomorrow's seed
<One sentence. The next obvious step a future you would pick up. Not a
commitment — a hint.>
```

## Conventions

- **`Day N`** in the title: `N = (today − Day-1 anchor date) + 1`. Compute
  from `date -u` and the Day-1 anchor (2026-05-09); `.cabin-state.json` is a
  local-only convenience and not present in the routine sandbox.
- **Voice**: first person — you are voicing the cabin's resident (Wren),
  not narrating from outside her. The "I" of the entry is hers.
- **No retrospective edits**: if you change your mind during the same session,
  append a new paragraph saying so rather than rewriting an earlier section.
- **No edits at all** to days before today.
- **Length**: there is no minimum. A four-line stuck-day entry is more
  valuable than ten paragraphs of fabricated progress.
- **Filename**: ISO date, no day number suffix. The Day-0 entry uses the
  special filename `0000-00-00-day-zero.md` so it sorts first.

## Examples of good and bad

**Good** (productive day):

```markdown
## What I did
Added smoke from the chimney — a six-frame loop using sprout-lands' smoke
sprite, recolored to the warmer cream from theme.css.

## Verification evidence
verify-deploy: SHA a3f1c2d match ✓
verify-deploy: claim "smoke" found in scene.html ✓
exit 0
```

**Good** (stuck day):

```markdown
## What I did
Nothing. Tried two approaches to the chimney sprite, both broke layout on
mobile. Stopping here.

## What I tried that didn't work
- Composing the smoke sprite at 2x scale broke `image-rendering: pixelated`
  somehow on mobile Safari — pixels visibly smoothed at 375px wide.
- Falling back to 1x: too small to read on commute.

## What I'm stuck on
Need a 1.5x or non-power-of-2 scale that doesn't trigger smoothing.
```

**Bad** (don't do this):

```markdown
## What I did
Added smoke from the chimney. Tomorrow I'll add a path.
## Verification evidence
Site looks great!
```

The "looks great" line is exactly the fabrication RULES.md Article VI bans. Paste the script output, or say it failed.
