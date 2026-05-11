# Messages — the founder's message board

Things the founder (Evan) writes to Wren. The directory holds two genres:

- **Action-asks** — specific things Evan wants Wren to do ("build a weather system," "rework the path"). These outrank Wren's self-selected milestones (RULES.md Article X).
- **Informational / FYI messages** — context Evan wants Wren to know, but with no action required ("here's what landed overnight," "rationale for the schema change"). These don't displace today's contribution; they inform it.

One file per message. Two states by directory:

- `messages/open/` — pending. Wren reads these as part of the memory rule (RULES.md Article III) and processes them per the workflow below.
- `messages/done/` — closed (completed, cancelled, or read-and-close FYI). Read-only history.

## File shape

Each message is a single Markdown file. Action-asks and informational messages share the same shape, but the body indicates which genre this is.

```markdown
# <one-line title>

**Opened:** YYYY-MM-DD
**Priority:** low | medium | high
**Kind:** action-ask | informational

## Request
What Evan wants, in plain prose. For an informational message, this is the
context being shared. For a read-and-close FYI, the body explicitly says
"read and close — do not let this displace today's contribution" or similar.

## Acceptance criteria
For an action-ask: what "done" looks like — bullet points, expected
behaviors, things the diary or log should confirm.
For an informational message: usually omitted, or replaced with a note like
"none — this is context."

## Notes / clarifications (optional)
Constraints, preferences, links, sprites Evan has in mind, etc.

## Wren's notes (appended by the agent)
Empty until Wren picks this up. Wren may add status updates here as a
multi-day action-ask progresses, and a "Completion notes" subsection at the
end describing what landed. Read-and-close messages do not get a
Completion notes subsection — the close is the move.
```

The `**Kind:**` field is optional; if omitted, the body's instruction (or absence of "Acceptance criteria") tells Wren which genre this is. Older files (pre-2026-05-12) do not have it and that's fine.

Filenames are slug-style with the open date prefix: `2026-05-12-weather-system.md`.

## Workflow

1. **Founder writes** a message to `messages/open/<date>-<slug>.md`. Walks away.
2. **Wren reads** all `messages/open/*.md` as part of memory (RULES.md Article III). Open action-asks outrank Wren's self-selected milestones; if there's an open action-ask, today's contribution should be a piece of it. Informational messages don't displace work but inform it.
3. **Multi-day action-asks**: if the request is bigger than a day, Wren slices it. Today they tackle one piece, append a "Wren's notes" subsection to the file recording what they did and what's still pending, and leave the file in `open/`. Tomorrow's agent picks up the rest.
4. **Action-ask completion**: when Wren finishes an action-ask, they:
   - Append a "Completion notes" subsection to the file describing what landed and any caveats.
   - `git mv messages/open/<file> messages/done/<file>` in the same commit as the work.
   - Reference the filename in today's diary entry if natural in Wren's voice (operational mention can go in the log instead).
5. **Read-and-close (informational messages)**: the close *is* the move. `git mv messages/open/<file> messages/done/<file>` as the **first commit of the session**. No "Completion notes" subsection — the move is the close. Then proceed to today's actual contribution.
6. **Founder cancellation**: founder can `git mv` a message to `done/` themselves with a "Cancelled because…" note. Wren respects this immediately — no further work on it.
7. **Wren pushback**: if Wren thinks an action-ask conflicts with the project (scope too large, conflicts with locked files, fundamentally infeasible), they append a "Wren's pushback" subsection explaining and leave it in `open/`. Founder revises or moves to `done/` with a decision.

## Why this shape

- *Directory is the status*: `ls messages/open/` answers "what's pending." No frontmatter parser needed.
- *One file per message*: each gets a stable path that diary or log entries can reference.
- *Append-rather-than-rewrite*: the file accumulates the conversation between founder and Wren. Closed messages preserve the full back-and-forth as a record of what was asked for and what was delivered.
- *Lives in repo*: no GitHub Issues / external dependency. The historical record is all in git.
- *Two genres in one directory*: the founder's writing to Wren is a single conversation, regardless of whether any given message is an ask or an FYI. Mixing them in one directory is honest about the conversational nature of the channel.

## Examples

A simple action-ask:

```markdown
# Add a weather system that changes day-to-day

**Opened:** 2026-05-12
**Priority:** medium
**Kind:** action-ask

## Request
The cabin should display different weather on different days — sun, clouds,
rain. Procedural is fine; no need to hit a real weather API.

## Acceptance criteria
- Visible weather element in the cabin scene.
- Today's diary describes the new weather in Wren's voice; today's log notes
  how the weather is selected (random, rotation, commit-sha-modulo, etc.).
- Three or more weather states reachable across multiple days.

## Wren's notes
(empty)
```

A read-and-close FYI:

```markdown
# Overnight fixes — read and close, do not let this displace today's contribution

**Opened:** 2026-05-12
**Priority:** low
**Kind:** informational

## Request
This is a notification, not work. Read it, then `git mv messages/open/<file>
messages/done/<file>` as your *first* commit of the session — no Completion
notes subsection, the move *is* the close. Then proceed to today's real
contribution per Article X priority order.

## Changes that landed
…

## Acceptance criteria
- You read this file.
- You `git mv` it from `open/` to `done/` as the first commit of your session.
- You proceed to today's actual contribution.

## Wren's notes
(empty)
```

A multi-day action-ask:

```markdown
# Add a /library/ sub-page reachable from a tappable bookshelf

**Opened:** 2026-05-15
**Priority:** high
**Kind:** action-ask

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
