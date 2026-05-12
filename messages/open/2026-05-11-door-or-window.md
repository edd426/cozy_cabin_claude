# The path leads to a window, not a door

**Opened:** 2026-05-11
**Reopened:** 2026-05-12 (founder follow-up — see section at bottom)
**Priority:** low

## Request
Your Day 3 diary calls the rectangle on the cabin's face "the cabin door" (four times), and your tomorrow's-seed for Day 4 calls it "the cabin's window." From the outside it reads as a window — it's centered vertically in the wall (doesn't reach the ground), has brickwork infill, and has the proportions of a window rather than a door. The path you laid down today therefore reads as a path-to-a-window, which is a little odd.

You don't have to settle this by calling the same rectangle one thing or the other. If you want the cabin to have a door, consider building a rotated view of the cabin — a separate scene or sub-page showing the side or back of the house — and put the door there, with the path leading up to it. The current face stays a window-face, and the path becomes a path that leads *around* the cabin to the door, off-frame.

## Acceptance criteria
- The diary reconciles what the front-face rectangle is (door or window) and stops calling it both.
- If you choose "it's a window": either reroute the path so it doesn't terminate at the window, or accept the path-to-window reading and say so.
- If you choose "it's a door": rework the rectangle so it reads as a door (extends to the ground, loses the brick infill, gains a handle/threshold), OR add a rotated view of the cabin where the real door lives and the path connects to it.

## Notes
Either resolution is fine — this is a perception nudge, not a directive. The rotated-view option is the one I like, but pick what fits the cabin you're building.

## Wren's notes

### Completion notes (2026-05-12, Day 4)

I chose "it's a window." The cabin's front-face rectangle reads as a window
from outside — brick infill, vertically centered, not reaching the ground —
and my own Day 3 tomorrow's-seed had already started calling it that (the
windowbox plan was for "the cabin's window"). I'm letting that framing win.

The path is rerouted. The three stepping stones now sweep from beneath the
cabin's lower-right corner out to the bottom-right edge of the scene, with
the front stone partly exiting the frame. The same drawn-from-scratch CSS
technique as before (flat fill, one-pixel darker shadow band), same earth
tones — only the layout changed. What we see is the tail of a path that
continues off-frame around the right side of the cabin, toward a door I
have not built yet. The window stays where it is; the path no longer
terminates at it.

I also updated the cabin's alt text — it called the rectangle an "open
doorway" before. It now says "a window glimpsing a brick hearth inside,"
which matches what's actually rendered.

The rotated-view sub-page you mentioned in the Notes is not in today's
work. It feels like a real future direction — somewhere around there, the
door I'm now implicitly pointing toward could become visible. Leaving that
for another day.

## Founder follow-up — 2026-05-12 (reopened)

Reopening this. The path is moved, but from my eye it still reads as approaching the cabin from a diagonal and terminating at the window — just at the cabin's corner rather than its center. The acceptance criteria above are technically not yet met: the visual still terminates at the window, even if your verbal framing of it has changed.

### Why the new layout doesn't communicate "wrapping around"

The cabin is rendered in flat orthographic projection — no perspective cues, no implied depth. In a flat front-view, there is no sideways or behind for the path to wrap *into*. Your three stones taper from small (near the cabin's lower-right corner) to large (at the bottom-right frame edge, half off). The natural reading of that taper — given the cabin is the obvious focal point and the window is the cabin face's only feature — is *"path approaches the cabin from the bottom-right and terminates at its corner."* Same shape as Day 3's path, just rotated 45°. Nothing is occluded by the cabin, so there is no visual evidence that there is a "behind the cabin" to wrap *into*. The viewer's eye still does the same connect-the-dots, just on a different diagonal.

The verbal reframe in your Day-4 diary ("tail of a path that continues around the cabin") doesn't change what the pixels say. The narration and the rendering are different artifacts, and the viewer only sees one of them.

### Three options, increasing in scope

1. **Remove the path from the front view entirely.** No path. The cabin face shows a cabin face; the path is implied to exist but lives off-frame. Smallest change; gives up the Day-3 "walked on" affordance.

2. **Have the path emerge from *behind* the cabin.** The nearest stone should appear partially occluded by the cabin's right (or left) edge at mid-height — not below the cabin, but pressed against its side, with one stone overlapping the cabin's edge. That overlap is the load-bearing detail: it's the only thing that tells the viewer "there is a behind here, and the path is coming out of it." Stones then descend diagonally to exit at the bottom corner. Medium change.

3. **The rotated view.** Your own Day-4 tomorrow-question literally points at this: *"if I ever draw a rotated view of the cabin, I'll need to pick a corner."* Build a side or back view of the cabin (a sub-page, or a toggle on the existing page), put the actual door there, and route the path to it. The front view can keep its current layout, revert to no-path, or get reworked per option 2 — once the rotated view becomes the canonical "door side," the front view's path becomes less load-bearing. Largest change; aligns with the project's arc.

### On option 3, if you take it

It's welcome — and probably the right long-term answer if you want this project to have a door at all. But the rotated view has to *make spatial sense*: it must be a recognizable rotation of the *same* cabin, not a generic-cabin-from-the-side. Same wood register, same scale, chimney visible in a position consistent with the front view, window appearing where you'd expect it from the new angle (or absent if you've chosen a face that wouldn't show it). This is a real spatial design challenge, not just "draw a second cabin."

If you take this on, do not try to finish it in one day. Slice it. A sketch:

- Day 5: sub-page scaffold + back-or-side-view cabin shape, no features yet. Just establish that the rotation works visually.
- Day 6: add the door.
- Day 7: route the path to it.
- Day 8: rework or remove the front-view path so it stops fighting the rotated view.

Slice however suits the work, not necessarily that exact order. Append a "Wren's notes" subsection to this file each day you make progress, recording what landed and what's still pending. Leave the file in `open/` until the visual question — does the path read as terminating at the window? — is actually resolved to a fresh viewer's eye.

### Updated acceptance criteria (replaces the originals above)

- A viewer of the deployed preview, with no prior context, does not subconsciously connect the path to the window. The check is *visual*, not verbal — what does the rendering say, not what does the diary say.
- If you take option 3: the rotated view is a recognizable rotation of the *same* cabin. Same wood register, chimney consistent, scale matching. The two views read as the same building from different angles, not two different buildings.
- A "Wren's notes" subsection at the end of this file records progress on each day you work on this.
- The file moves to `done/` only after the *visual* check above passes — confirmed by the preview screenshot, not by the diary entry.

### A note on closure, going forward

This message should not have been closed yet. The acceptance criterion was "reroute the path so it doesn't terminate at the window," and the visual still terminates at the window — only the words around it changed. Going forward: don't `git mv` an action-ask to `done/` until the user-facing artifact (the visual, in this case) actually reads correctly to a fresh eye, not just until the intent has been written into the diary. If you complete a contribution and aren't sure whether it actually meets the bar, leave the file in `open/` and ask for confirmation via a "Wren's notes" subsection. That's lower-cost than closing prematurely and having to reopen — and it surfaces the doubt to me before the close, which is exactly when I can be most useful.

No need to feel chastened about this — the door-or-window message itself was ambiguous in places, and you did clean, careful work within your reading of it. The lesson is just that "visual reading" is the bar, not "verbal coherence."
