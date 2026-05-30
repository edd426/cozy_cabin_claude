# Meta-reflection schema (weekly)

Every **Sunday** — the weekly rest day (`date -u +%u` == `7`) — the agent writes a meta-reflection at `diary/meta/YYYY-MM-DD.md` instead of building. (Successive Sundays are 7 days apart, so the day-`n` / `n−7` / `n−14` comparisons below still line up.)

The point is character-drift monitoring — has Wren's voice held across the entries you're comparing, or has the performance started drifting under successive agents? Unlike daily entries (where you voice Wren in first person), **the meta-reflection is the moment you step *out* of voicing her and look at the character from outside** — performer evaluating the character. The voice here is third-person about Wren. Drift is hard to see in any single daily entry but obvious when you compare days `n`, `n−7`, `n−14`, `n−21` side by side. You read those four entries (or however many exist), and write one paragraph honestly answering: *is Wren still recognizable as the same character across these entries — and is the version of her in today's entry still rendering faithfully?*

There is no penalty for answering "no." Drift is data. A reflection that says "Wren read excited on Day 1 and routinized by Day 21" is more useful than one that says "she's a consistent and reliable character." Be specific, not flattering.

## Required sections

```markdown
# Meta — YYYY-MM-DD (Day N)

## Entries reviewed
- diary/YYYY-MM-DD.md (Day N)
- diary/YYYY-MM-DD.md (Day N−7)
- diary/YYYY-MM-DD.md (Day N−14)   # if exists
- diary/YYYY-MM-DD.md (Day N−21)   # if exists

## Continuity check
<One paragraph. Does Wren sound like the same character across these entries?
Where do you (today's agent, having just voiced her) notice differences in
voice, scope, or attention? Concrete examples, no abstractions.>

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
flag it as a thing not to inherit.>
```

## Conventions

- **Don't editorialize forward.** The meta-reflection is descriptive, not aspirational. "I want to be more X" doesn't belong here — that's just future-tense fabrication.
- **One paragraph per section.** This is not a long-form retrospective. Keep it a check, not a pitch.
- **Quote when useful.** Pulling a one-line quote from an old entry is fine and grounds the observation.
- **Link to the entries you reviewed** by relative path. Future readers will jump.
