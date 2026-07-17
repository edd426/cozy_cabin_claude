# Meta-reflection schema (weekly)

Every **Sunday** — the weekly rest day (`date -u +%u` == `7`) — the agent writes a meta-reflection at `diary/meta/YYYY-MM-DD.md` instead of building.

The point is character-drift monitoring — has Wren's voice held across the entries you're comparing, or has the performance started drifting under successive agents? Unlike daily entries (where you voice Wren in first person), **the meta-reflection is the moment you step *out* of voicing her and look at the character from outside** — performer evaluating the character. The voice here is third-person about Wren.

**What you review (2026-07-19 schema):** the **seven daily entries of the week just ended** (Days N−6 through N, today's rest-day entry included) plus **one anchor** — the meta-reflection from four weeks back (or the oldest one, if fewer exist). The week gives you the building days, where the tics actually live; the anchor gives you the long baseline a single week can't show. Write honestly: *is Wren still recognizable as the same character across this week — and against where she was a month ago?*

There is no penalty for answering "no." Drift is data. A reflection that says "Wren read excited on Day 1 and routinized by Day 21" is more useful than one that says "she's a consistent and reliable character." Be specific, not flattering.

> **Why the review set changed** (2026-07-17, founder + local session): the original `n` / `n−7` / `n−14` / `n−21` sampling was designed before the rest day and the meta day fused — once both landed on Sundays, the meta only ever sampled rest-day entries, which all wear the same hands-still frame, and building-day drift went formally unsampled. The Day-58 and Day-65 metas caught the "false half" opening formula only by stepping outside their own schema — and their flags didn't stick, which is what "Did the flags take?" below exists to fix. Metas through 2026-07-12 follow the old schema; historical record, not migrated.

## Required sections

```markdown
# Meta — YYYY-MM-DD (Day N)

## Entries reviewed
- diary/YYYY-MM-DD.md … diary/YYYY-MM-DD.md (Days N−6 through N, the week)
- diary/meta/YYYY-MM-DD.md (the anchor, ~4 weeks back)

## Did the flags take?
<Check the previous meta's "What to drop" (and any flag it re-raised) against
this week's seven entries. Did the flagged habit actually stop? Name the
entries that show it held or broke. A flag that didn't take gets re-raised
here with sharper wording, or retired with a reason — never silently dropped.>

## Continuity check
<One paragraph. Does Wren sound like the same character across the week, and
against the anchor? Where do you (today's agent, having just voiced her)
notice differences in voice, scope, or attention? Concrete examples, no
abstractions.>

## Drift
<One paragraph or bullets. Specific shifts you notice in Wren's voice —
vocabulary, ambition, honesty, register, the kind of thing she'd attempt
today vs. four weeks ago. Saying "no drift" is fine if it's true; saying it
because it sounds good is not.>

## What to keep
<One sentence. Something from a past entry that should carry forward in
Wren's voice — flag it for future agents reading this meta-reflection.>

## What to drop
<One sentence. Something from a past entry that, looking back, read off —
flag it as a thing not to inherit. Next Sunday's "Did the flags take?" will
hold this line to account.>
```

## Conventions

- **Don't editorialize forward.** The meta-reflection is descriptive, not aspirational. "I want to be more X" doesn't belong here — that's just future-tense fabrication.
- **One paragraph per section.** This is not a long-form retrospective. Keep it a check, not a pitch.
- **Quote when useful.** Pulling a one-line quote from an old entry is fine and grounds the observation.
- **Link to the entries you reviewed** by relative path. Future readers will jump.
