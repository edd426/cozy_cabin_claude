# Requests — the founder's message board

Specific things the founder (Evan) wants Wren to do. One file per request, in one of two states by directory location:

- `requests/open/` — pending; Wren reads these as part of the memory rule (RULES.md Article III) and works on them with priority over self-selected milestones.
- `requests/done/` — closed; either completed by Wren, declined / cancelled by the founder, or otherwise resolved. The historical record.

## File shape

Each request is a single Markdown file:

```markdown
# <one-line title>

**Opened:** YYYY-MM-DD
**Priority:** low | medium | high

## Request
What I want, in plain prose.

## Acceptance criteria
What "done" looks like. As specific as I can be — bullet points, expected
behaviors, things the diary should confirm.

## Notes / clarifications (optional)
Constraints, preferences, links, sprites I have in mind, etc.

## Wren's notes (appended by the agent)
Empty until Wren picks this up. Wren may add status updates here as a
multi-day request progresses, and a "Completion notes" subsection at the
end describing what landed.
```

Filenames are slug-style with the open date prefix: `2026-05-12-weather-system.md`.

## Workflow

1. **Founder writes** a request to `requests/open/<date>-<slug>.md`. Walks away.
2. **Wren reads** all `requests/open/*.md` as part of memory (RULES.md Article III). Open requests outrank Wren's self-selected milestones; if there's an open request, today's contribution should be a piece of it.
3. **Multi-day requests**: if the request is bigger than a day, Wren slices it. Today they tackle one piece, append a "Wren's notes" subsection to the request file recording what they did and what's still pending, and leave the file in `open/`. Tomorrow's agent picks up the rest.
4. **Completion**: when Wren finishes a request, they:
   - Append a "Completion notes" subsection to the file describing what landed and any caveats.
   - `git mv requests/open/<file> requests/done/<file>` in the same commit as the work.
   - Reference the request by filename in today's diary entry.
5. **Founder cancellation**: founder can `git mv` a request to `done/` themselves with a "Cancelled because…" note. Wren respects this immediately — no further work on it.
6. **Wren pushback**: if Wren thinks a request conflicts with the project (scope too large, conflicts with locked files, fundamentally infeasible), they append a "Wren's pushback" section explaining and leave it in `open/`. Founder revises or moves to `done/` with a decision.

## Why this shape

- *Directory is the status*: `ls requests/open/` answers "what's pending." No frontmatter parser needed.
- *One file per request*: each gets a stable path that diary entries can reference.
- *Append-rather-than-rewrite*: the file accumulates the conversation between founder and Wren. Closed requests preserve the full back-and-forth as a record of what was asked for and what was delivered.
- *Lives in repo*: no GitHub Issues / external dependency. The historical record is all in git.

## Examples

A simple request the founder can write tomorrow morning:

```markdown
# Add a weather system that changes day-to-day

**Opened:** 2026-05-10
**Priority:** medium

## Request
The cabin should display different weather on different days — sun, clouds,
rain. Procedural is fine; no need to hit a real weather API.

## Acceptance criteria
- Visible weather element in the cabin scene.
- Today's diary explains how the weather is selected (random, rotation, etc.).
- Three or more weather states reachable across multiple days.

## Wren's notes
(empty)
```

A multi-day request:

```markdown
# Add a /library/ sub-page reachable from a tappable bookshelf

**Opened:** 2026-05-15
**Priority:** high

## Request
A bookshelf sprite in the cabin scene. Tapping it goes to /library/, which
lists books — start with one or two placeholder books, you can add more
over time.

## Acceptance criteria
- Bookshelf sprite visible in the scene.
- Tap target ≥ 44×44px on phone.
- /library/ renders a list with at least one book.
- Back-link from /library/ to home.

## Wren's notes
(updated by the agent each day)
```
