# The far hills hopped sides when they wrapped to the door view

**Opened:** 2026-06-24
**Priority:** low
**Kind:** action-ask

## Request

First — the clearing is really coming along. The hills, the drifting clouds, the
hour the sky now keeps: the place has a *beyond* and a *time* it didn't have two
weeks ago, and it shows. This is a small consistency tweak on good work, nothing
more.

Here's the thing my eye snagged on, and it's the sort of left/right flip that's
genuinely easy to get backwards. On the map, the door side (the around view) is
reached from the **east, looking west**. The far hills are the clearing's **back**
edge — the line that sits *behind* the cabin in the front view. When you walk
around to the door side and look west, that back edge falls on your **right**, and
the open horizon — the side the front of the house and the path are on — falls on
your **left**.

Right now the around view has them the other way round: the hills are bunched on
the **left** and the horizon opens on the right (the `.hill--e-*` rules in
`around.css` sit at the left of the frame). So the same range looks like it jumped
to the opposite side of the clearing when you walked around the corner — which is
the tell that something's mirrored.

I think the original slip traces to the Day-41 "Things I've learned" note, which
reasons the range through as the *south* range wrapping on the left. But that range
is really the *far / back* edge (north on the map), so on the door side it belongs
on the right. Please don't go back and edit that note, though — past notes are
read-only history (RULES Article II). If it's worth setting straight for the agents
who come after, the house style is to add a *new* dated "Things I've learned" entry
that supersedes the old one (several entries there already supersede earlier ones),
or to just carry the corrected understanding into today's diary. Either way, the new
CLAUDE.md principle is the source of truth now.

I wrote the general rule into CLAUDE.md today under "What reads / what doesn't"
("One geometry, every view — and the map is the truth") — this is just its first
worked example.

## Acceptance criteria

- In the around (door-side) view, the far hills sit on the **right** of the frame,
  tapering to an open horizon on the **left** (mirrored from today's arrangement).
- The front view is unchanged.
- The hills still read as the *same* range as the front view's — same hazed tones,
  a different stretch of it (Art XIII), just on the correct side.
- The Day-41 "Things I've learned" note is left **untouched** — past notes are
  read-only (RULES Art II). If you want the record set straight for future days,
  *supersede* it with a new dated entry rather than editing it, or carry the
  corrected understanding into today's diary/log.
- Today's diary notes the fix in your voice; the log notes the `around.css` change.

## Notes / clarifications

Same standing offer as always: if you walk it through against the map and decide
I've got the sides backwards, say so in the diary and trust your eye over mine — I
can feel when something's off but I'm bad at naming which way it goes. No rush on
this; it's polish, not a fire.

## Completion notes
**Closed:** 2026-06-25 (Day 48)

Done — and you had the sides right; I walked it against the map and the map agrees
with you. The around view is the east face seen looking west, so north (the
clearing's far/back edge, the line that sits behind the cabin in the front view) is
on the right, and the open horizon — toward the front of the house and the path,
which sit south — opens on the left.

The fix was a clean mirror in `around/around.css`: the four `.hill--e-*` rules now
anchor by the **right** edge (`right:` instead of `left:`), keeping the same widths,
heights, and the two hazed sage tones (`#b4c896` far / `#a2bd82` near) so it reads as
the same range, just the correct stretch on the correct side. The `-l` modifiers were
renamed to `-r` (in `around.css` and the four spans in `around/index.html`) so the
class name tells the truth about which edge it hugs. The front view is untouched.

I left the Day-41 "Things I've learned" note alone (read-only history, RULES Art II)
and instead carried the corrected geometry into the rewritten `around.css` comment
and today's diary. The CLAUDE.md "One geometry, every view — the map is the truth"
principle is the source of truth now, with this as its first worked example.
