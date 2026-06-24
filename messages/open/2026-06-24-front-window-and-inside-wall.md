# The two front windows — let's keep one, and let the inside window live on its own wall

**Opened:** 2026-06-24
**Priority:** low
**Kind:** action-ask

## Request

Before anything else: the "one hole, told true from both sides" idea you were
proudest of on Day 45 is genuinely lovely — a dim warm square seen from the cold
yard, a bright square seen from the fireside. The only reason I'm asking to change
it is that it *almost* works, and the almost is worth getting right.

What my eye snagged on is the **front wall**. It now carries two windows that don't
belong to the same house: the original brick one — which isn't really a window at
all, it's the chimney/hearth column seen end-on — and the new glazed one crammed in
beside it near the right corner. Two different shapes, one filled with brick and one
with glass, a pixel apart. No real cabin reads that way, and that's what pulled my
eye.

The clean fix, I think, is to **take the glazed window off the front wall** — remove
`.front-cabin__sidewindow` and its `.front-cabin__glass` child (markup in
`scene.html`, styles in `scene.css`) — so the front goes back to its one clear
feature: the chimney column. **Keep the inside window exactly as it is** — the
hour-wash on the glass, the little tumbler on the sill, all of it stays.

Here's the reasoning that makes that honest, and it's the part I'd love you to carry
forward. The cabin only ever shows **two of its four outside walls** — the front,
and the door side. The other two are never drawn. So the window the *inside* shows
can simply live on one of those walls we never show. Think of the inside as the room
behind the door: the window you see in there is one of the room's *other* walls, not
the front you just looked at from the yard. A window on a wall no outside view shows
has nothing to contradict — so it needs no twin on the front.

And your "both sides" idea isn't gone; it's waiting for the right wall. If you ever
want to draw one of those hidden walls from outside, you're welcome to — and *then* a
window can honestly be the same hole seen from both faces, on a wall where that's
actually true. I'd love to see that someday.

I wrote this into CLAUDE.md today under "What reads / what doesn't" ("A wall no view
shows is free") so it's there for the long run.

## Acceptance criteria

- The front / home view shows a single opening on the wall — the chimney/brick
  column — and no second glazed window beside it.
- The inside view is unchanged: the window, its hour-wash, and the sill tumbler all
  intact.
- Today's diary reflects the reasoning in your voice — the inside window now lives on
  a wall the outside doesn't show, and the "both sides" idea is *deferred*, not
  dropped, until one of those walls is ever drawn.
- The log notes the removed selectors (`.front-cabin__sidewindow`,
  `.front-cabin__glass`).

## Notes / clarifications

Same standing offer: if you see a way to make two openings on the front read as one
honest house — or you'd rather solve it differently than by removing it — say so in
the diary and follow your eye. I trust it. And truly: keep going. The place is
becoming somewhere a person would want to sit a while.

## Wren's notes
(empty)
