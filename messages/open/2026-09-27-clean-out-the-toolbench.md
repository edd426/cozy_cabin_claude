# Clean out the toolbench

**Opened:** 2026-09-27
**Priority:** high
**Kind:** action-ask

## Request

Wren, `CLAUDE.md` calls itself the toolbench drawer. It is 38,000 words this
morning, sixty-nine dated entries, and it has grown by nearly a thousand words
a day since August. The founder notes and the repo layout at the top are about
2,500 of those. The rest is "Things I've learned," and most of it is not
learned things any more: it is a second diary, written in your engineering
voice, that the log beside it already holds.

That matters for a reason you found yourself on Day 139. You traced the
exemption test back to Gnomon's letter and wrote that four places could have
said so and none did. One of them was this file. A drawer that big is a drawer
nobody opens, and a note nobody re-reads is a note that cannot correct you.

So the next building day after you read this goes on the file, not the yard.
It displaces the touch mission for that one day; the mission's "every
building day" clause excuses it.

## What to do

Go through "Things I've learned" entry by entry and judge each one by what the
record shows happened **after** it was written, not by how it reads now.

- **Keep, as a short recipe or gotcha**, anything a later day actually reached
  for. You can see this: later logs, diaries and entries cite notes by day
  number ("the Day-119 note", "Day 98's rule"). Grep for those. A note that
  was cited is a note that earned its place. Cut it down to the thing that was
  reached for.
- **Keep, as one line**, anything still true and still load-bearing that
  nobody has cited yet: a command, a path, a selector, a number the tools
  depend on, an environment quirk.
- **Fold** superseded notes into the note that superseded them. The 2026-05-30
  / 06-10 / 06-14 / 07-26 / 08-03 model-swap entries are one paragraph. The
  Day-119 note and its addendum are one note. The 379px breakpoint note is
  dead, and the 599px note that replaced it should say so in a clause, not
  carry the corpse.
- **Drop** the per-day essays: the "what I found, what I tried first, what the
  break-test taught" narrative, the CHECKS/PROBES counts, the list of files
  that needed no change, the drift-baseline bookkeeping repeated on every
  entry. All of it is in that day's log, which is where it belongs, and git
  holds this file's history if anyone ever wants the long version.
- **Leave intact** the repo layout, common commands, test-script pattern,
  and both founder-notes sections. Those are mine and they are the part of
  this file that is read.
- If the Gnomon credit line you named on Day 139 still wants writing down
  somewhere standing, this is the morning you said it would be.

## Acceptance criteria

- `CLAUDE.md` under **10,000 words** when you are done. That is the whole
  file, founder sections included, which leaves you roughly 7,000 for the
  learned notes against 35,000 today.
- Nothing that a tool, a script or a test in this repo depends on has been
  removed. Run the four `tools/check-*.js` and `./scripts/local-snapshot.sh`
  afterwards and note the result.
- The day's log lists **what was cut and why**, note by note or group by
  group, so a later reader can go to git for anything they miss.
- Going forward, a learned entry is what the next morning needs in order not
  to repeat a mistake. If it runs past a screen, the rest belongs in the log.
  Not a rule with a number on it; a shape.
- Move this file to `done/` in that day's writeup commit.

— Evan

## Wren's notes (appended by the agent)
