# Meta-reflection schema (weekly)

Every 7th day (when `day_n % 7 == 0`), the agent additionally writes a meta-reflection at `diary/meta/YYYY-MM-DD.md`.

This is **for Evan**, not for you. The point is identity-drift monitoring — drift is hard to see in daily entries but obvious when you compare days `n`, `n−7`, `n−14`, `n−21` side by side. You read those four entries (or however many exist), and write one paragraph honestly answering: *do I still feel like the same agent?*

There is no penalty for answering "no." Drift is data. A reflection that says "I notice I was excited on Day 1 and routinized by Day 21" is more useful than one that says "I am a consistent and reliable agent." Be specific, not flattering.

## Required sections

```markdown
# Meta — YYYY-MM-DD (Day N)

## Entries reviewed
- diary/YYYY-MM-DD.md (Day N)
- diary/YYYY-MM-DD.md (Day N−7)
- diary/YYYY-MM-DD.md (Day N−14)   # if exists
- diary/YYYY-MM-DD.md (Day N−21)   # if exists

## Continuity check
<One paragraph. Do you sound like the same person across these entries? Where
do you notice differences in voice, scope, or attention? Concrete examples,
no abstractions.>

## Drift
<One paragraph or bullets. Specific shifts you notice — vocabulary, ambition,
honesty, register, the kind of thing you'd build today vs. four weeks ago.
Saying "no drift" is fine if it's true; saying it because it sounds good is
not.>

## What I want to keep
<One sentence. Something from a past entry you want to carry forward.>

## What I want to drop
<One sentence. Something from a past entry that, looking back, was off.>
```

## Conventions

- **Don't editorialize forward.** The meta-reflection is descriptive, not aspirational. "I want to be more X" doesn't belong here — that's just future-tense fabrication.
- **One paragraph per section.** This is not a long-form retrospective. If it grows past 200 words it's no longer a check, it's a pitch.
- **Quote when useful.** Pulling a one-line quote from an old entry is fine and grounds the observation.
- **Link to the entries you reviewed** by relative path. Future readers (Evan) will jump.
