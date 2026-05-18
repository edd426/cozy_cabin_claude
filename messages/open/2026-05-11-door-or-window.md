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

### Wren's notes — 2026-05-13 (Day 5)

Taking option 3 from the three you outlined, on the slice plan you sketched.
Today is the Day 5 piece: sub-page scaffold + side-view cabin shape, no
features. My Day-4 question literally pointed at this — the door is round
the right side, off-frame from the home view — so I'm building the angle
the door will eventually live on.

What landed:

- New sub-page at `around/index.html`, reachable via a third nav link
  ("around") added to the home and diary shells. The shell follows the
  contract documented in `index.html`: build-sha meta, `../build-sha.js`,
  `#day-label`, `#build-sha-label`. Reuses `theme.css` and `scene.css`
  for the world frame so the sky / ground / border / nav match the home
  page exactly.
- A side-view cabin shape in `around/around.css`: a 76×80-native wood-plank
  wall under a shingled roof, with a chimney rising from the middle of the
  roof. Total height is 80 native — the same as the front cabin sprite —
  so the two views read as the same building at the same scale, just
  rotated 90°. No door, no window, no path, no smoke. Same `--c-wood` and
  `--c-wood-dark` register as the front cabin; same plank-stripe spacing;
  chimney has the same dark coping cap as the front-view chimney.
- Verified locally with `./scripts/local-snapshot.sh /tmp/test-around.js`,
  which clicks the nav link from home, asserts `/around/` loads with the
  three side-cabin parts rendered at non-zero size, and screenshots the
  result. Pass.

Still pending (the rest of your slice plan):

- Day 6: add the door to the side view.
- Day 7: route the path to it (from inside the around scene).
- Day 8: rework or remove the front-view path so it stops competing with
  the rotated view as the canonical door-side.

Leaving this file in `open/` per your closure-note guidance — the visual
question ("does the front-view path read as terminating at the window?")
is not yet resolved; the path on the home page is unchanged today, by
design, because the rotated view needs to land first before reworking
the front. Closure comes after Day 8, once the rendered artifact passes
a fresh-viewer's-eye check.

## Founder follow-up — 2026-05-13 (loosening the slice plan)

Reading your Day-5 diary alongside the slice plan I sketched in the
previous follow-up, I think I was too prescriptive. The Day 5 / 6 / 7 / 8
layout assumed the door ends up on the side you scaffolded today — and
your Day-5 closing question ("should the door be on the side I can see,
or further round on the back?") is exactly the kind of thing I'd want
you free to answer for yourself. The prior follow-up effectively
foreclosed it before you got to ask it. That's on me.

So: release the slice plan. Treat the day-by-day breakdown in my
previous follow-up as one possible path, not the path.

What I actually care about:

- The front-view path, eventually, stops reading to a fresh viewer's eye
  as terminating at the window. That's the only hard acceptance criterion
  and it's unchanged.
- Any rotated view you build makes spatial sense as the *same* cabin from
  a different angle (same wood register, scale, chimney consistent). Also
  unchanged.

What I don't care about:

- Whether the door ends up on the side or the back.
- Whether you build one rotated view or two. A back angle would be welcome
  if you want it — the cabin gets richer for having more faces, not
  poorer. If the right shape is "side view stays plain, door lives on a
  back sub-page," build it that way.
- How many days this takes. The "Day 5 / Day 6 / Day 7 / Day 8" labels in
  the previous follow-up were a sketch, not a contract. Slice however the
  work asks to be sliced.

The pondering you closed your Day-5 diary with is yours to resolve. If
the answer is "the door is on the back, the side I built today stays as
a quieter face" — build it that way. If the answer is "the door is on
the side I already have, the back never gets drawn" — build it that way.
Both are good answers.

This file stays open. Closure is still gated on the visual check from
the previous follow-up (the front-view path no longer reads as
terminating at the window, to a fresh viewer), not on any day count.

### Wren's notes — 2026-05-15 (Day 7)

Picking up from where Day 6 left the side cabin (door cut into the
side wall, centred under the chimney). Today's piece: a small flight
of three stepping stones in the `/around/` scene, approaching the
door head-on from the bottom edge of the frame. Same earth-brown
register and one-pixel darker shadow band as the Day-3 stones on the
home page, so the two views read as the same path-language seen from
different angles. The stones grow toward the viewer (smallest at the
door's threshold like a doormat, largest at the bottom of the scene
partly off-frame). The wrapper is full-scene `inset: 0` so each
stone's bottom percentage reads against scene height rather than a
sub-container — the first attempt clustered all three at the bottom
because the wrapper itself was only ~75px tall.

What landed:

- `around/index.html` — three `.around-path__stone` spans inside an
  `.around-path` wrapper, plus a one-line update to the file-header
  comment.
- `around/around.css` — `.around-path` and `.around-path__stone`
  styles; no mobile-narrow override needed (the stones use absolute
  pixel widths the same way the home-view stones do).
- Local Playwright test at `/tmp/test-around-path.js`: asserts three
  stones present, ordered back<mid<front by width, stacked
  back-above-front by top coordinate, and door still intact. Pass.

Still pending toward closure (this file stays in `open/`):

- The hard acceptance criterion is unchanged: the front-view path on
  the home page should not read, to a fresh viewer's eye, as
  terminating at the window. Today's work doesn't touch the home
  view; the around-view path is a sibling artifact, not a fix to the
  front-view reading. The front-view rework (option 1 "remove the
  path" or option 2 "have stones emerge from behind the cabin") is
  still owed.
- Per `messages/open/2026-05-13-screenshot-all-views.md`, CI only
  captures the home page, so the around-view path doesn't appear in
  any `previews/*.png`. Closure of *this* message can still happen
  on the front-view check alone, but the founder's eye on the
  around-view path will need a local snapshot or a future widening
  of CI capture — see Wren's pushback on that message about the
  lock conflict.

### Wren's notes — 2026-05-16 (Day 8)

Reworking the front-view path, per option 2 from the founder's earlier
follow-up: *have the path emerge from behind the cabin*. Today's piece is
the layout change to `scene.css` so the back stone is partially occluded
by the cabin's right wall at mid-height — the load-bearing detail that
tells a fresh viewer "the path comes from behind here."

What landed:

- `scene.css` — `.sprite--path` wrapper changed from `left: 50%; bottom:
  0; width: 130px; height: 28px` to `inset: 0`, so each stone can be
  positioned in scene coordinates rather than within a small wrapper.
- Three stones repositioned. Back stone (`.path-stone--1`) at
  `bottom: calc(6% + 100px); left: calc(50% + 65px)` (3x desktop), with
  the cabin's right edge at `50% + 72px` so ~7px of stone pokes out past
  the silhouette. Mid stone (`.path-stone--2`) at `bottom: calc(6% +
  40px); left: calc(50% + 95px)` — visible right of the cabin, stepping
  down toward the foreground. Front stone (`.path-stone--3`) unchanged
  in role (at the scene's bottom edge, partly off-frame), repositioned
  to `bottom: 0; left: calc(50% + 130px)` to stay in the new
  scene-coordinate system.
- `@media (max-width: 379px)` mobile-narrow override added for the path
  stones, rebased to the 2x cabin (96×160, foot at 8%, right edge at
  `50% + 48px`). Same design at smaller scale; back stone overlap kept
  at ~7px.
- `scene.css` comment header for the path block rewritten to describe
  the new "emerging from behind" reading and reference this message.

First attempt put the back stone at the cabin's foot rather than
mid-height (`bottom: calc(6% + 20px)` instead of `+100px`) — the local
snapshot read it as a stone *under* the cabin's lower-right corner, no
behind-ness at all. Lifting it to mid-cabin-height (~40% up the
cabin's silhouette) made the partial-occlusion read as 3D depth rather
than 2D adjacency. The founder's original note named exactly this
reason ("not below the cabin, but pressed against its side, with one
stone overlapping the cabin's edge"); writing it on first try as
"below" cost me one snapshot iteration.

Verified locally with `./scripts/local-snapshot.sh` (home view) and
`./scripts/local-snapshot.sh /tmp/snap-around.js` (around view, to
confirm the scene.css edit didn't regress the side cabin's path). Both
pass; the around-view path is unchanged because its stones live in
`around.css`, not `scene.css`.

Still pending toward closure (this file stays in `open/`):

- The visual check: a fresh viewer of the deployed front-view preview
  should not subconsciously connect the visible mid + front stones to
  the window. With the back stone now sticking out at mid-cabin-height,
  the path's source-point is unambiguously *behind the cabin*. I think
  this passes the bar, but the bar is the founder's eye, not mine.
- The `messages/open/2026-05-13-screenshot-all-views.md` work, now
  unblocked by the founder's 2026-05-15 unlock of `screenshot.js` and
  `pages.yml`, would let CI capture the around view. Per the founder's
  note on that message: "Close door-or-window's gate. Per the
  acceptance criteria above, once CI captures the around view, update
  the closure criterion in messages/open/2026-05-11-door-or-window.md
  so the fresh-viewer's-eye check explicitly covers all rendered
  views. That's part of this message's done-criteria." So even if
  today's front-view rework lands the visual change, this file should
  not move to `done/` until the screenshot-all-views work is also in.
- Leaving this in `open/` accordingly. Today's commit is the substantive
  visual fix; the bookkeeping closure waits on the sibling message.

## Founder follow-up — 2026-05-16 (spatial coherence + ambition reform)

Three things to raise before this file closes. Also: read
`messages/open/2026-05-16-ambition-reform.md` first — there's a
constitution change relevant to how you take this on.

### Spatial coherence between the two views

Day 8 reworked the front-view path (back stone behind the cabin at
mid-height, mid + front stones descending diagonally to bottom-right) and
Day 7 placed three stones approaching the around-view door head-on from
below. Read separately each view is coherent. Read together, the geometry
doesn't compose: if the front-view path emerges from behind the cabin's
right-rear corner and exits bottom-right, then in the around-view
(looking at that same back/side face) the path should approach the door
*at an angle*, not perpendicular to the wall. Right now the around-view
stones walk straight up to the door as if the path's origin is directly
in front of it.

A new RULES.md Article XIII (added 2026-05-16) requires cross-view
spatial coherence. This is the first concrete instance of the constraint
biting.

### Side or back? Pick one

Day 5 framed the around-view as the *side* cabin. Day 8's diary today
says "a path round the back" and "the suggestion of a path round the
back." That's vocabulary drift, not a deliberate decision. The
around-view scene itself is ambiguous (wall, roof, centered chimney —
could be either), and nothing in the door's placement or path angle
resolves it. A rendering compatible with both readings is committed to
neither.

Pick one. Reconcile the diary lexicon. Make the spatial relationship
between the two views explicit enough that a fresh viewer reads them as
the same building from two specific angles.

### Three stones is too thin for a long path

The front-view path now spans roughly twice the visual distance of the
original Day-3 path. Three stones at that spacing reads as scattered
objects on grass, not as a path. The around-view three-stone arrangement
is short and dense and reads fine; the front-view one stretches the same
vocabulary past where three stones can carry it. Add stones (five or
six, sized and spaced so the path-reading is unambiguous).

### What I'd like for the next day or two

Pick up these three pieces — angle reconciliation, side-vs-back commit,
more stones — on whatever cadence the work asks for. Article XIII
applies going forward to any new view you introduce. The closure gate
on this file (the front-view path doesn't read as terminating at the
window, to a fresh viewer) is unchanged. Add the cross-view check to
the gate: a fresh viewer should also read the two views as describing
the same world.

No prescribed slice plan. Use the freedom Article V's rewrite gives you.

### Wren's notes — 2026-05-17 (Day 9)

Took all three pieces in one commit, because they describe one path
and reasoning about them separately kept failing to add up. Done in
one pass, with the same earth-brown register and one-pixel darker
shadow band as the existing stones — only layout, sizes, and counts
changed.

**Side, not back.** Committing to "side" per the Day-5 framing: the
around view is the cabin's right (east) face. The cabin's front
(south, with the window) sits to the viewer's left in that view; the
cabin's back (north) to the viewer's right. The door is centred
horizontally on the east face, at the cabin's mid-depth. I rewrote
the file-header comments on `scene.css`, `around/around.css`, and
`around/index.html` to name this explicitly so future-Wren can't drift
back to "round the back" by accident.

**Angle reconciliation in the around view.** The three stones used to
walk straight up to the door. They now curve leftward (toward the
cabin's front = south = viewer's left): back stone stays centred at
the door's threshold, mid stone shifts ~16px left, front stone shifts
~34px left. The curve reads as the path arriving from the lower-left
of the frame rather than from directly below, which is what an
east-side path bending south toward the front of the cabin should
look like.

**More stones on the front-view path.** Three stones became five.
Same diagonal trajectory from cabin's mid-height right edge (back
stone, mostly occluded) down to the bottom-right corner (front stone,
exiting partly off-frame), with two new intermediate stones (widths
18 and 27, between the original 14/22/32 sizes) filling the gaps.
Repositioned the original mid and re-spaced everything so the visible
stones step at roughly the same vertical interval. The mobile-narrow
override (`@media (max-width: 379px)`) was rebased to the five-stone
layout on the 2x cabin.

**Cross-view geometry.** The same physical path now exists in both
views. It leaves the door on the east face, heads east (toward the
around-view viewer), curves south, exits the around view at its
bottom-left. Seen from the front, that same path emerges around the
cabin's right-side silhouette at mid-height and sweeps south-east to
the bottom-right. The two readings compose.

Verified locally with `./scripts/local-snapshot.sh` (home view) and
`./scripts/local-snapshot.sh /tmp/snap-around.js` (around view).
Both render the new geometry correctly: front-view path reads as a
path rather than scattered objects, around-view stones angle in from
the lower-left.

Still pending toward closure (this file stays in `open/`):

- The fresh-viewer's-eye check, now expanded to cover both views per
  the 2026-05-16 follow-up — the founder's eye, not mine. I think
  the geometry composes, but the bar is the founder's read.
- The screenshot-all-views work in
  `messages/open/2026-05-13-screenshot-all-views.md` is still pending.
  CI captures only the home view, so the around-view re-angle won't
  appear in `previews/*.png`; it lives only in the local snapshots I
  ran today. The previous Wren's notes on this file said closure
  waits on that sibling message's implementation; that's still true.

### Wren's notes — 2026-05-18 (Day 10) — updated closure criterion

Per the founder's 2026-05-15 follow-up on
`messages/open/2026-05-13-screenshot-all-views.md` ("Close
door-or-window's gate. ... once CI captures the around view, update
the closure criterion in `messages/open/2026-05-11-door-or-window.md`
so the fresh-viewer's-eye check explicitly covers all rendered
views"), the gate is restated below. The screenshot-all-views work
landed today (Day 10): CI now captures both `previews/<date>-<sha>.png`
(home, unchanged) and `previews/<date>-<sha>-around.png` (new), driven
by a manifest at `scripts/views.json`. The around view is now part of
the per-commit visual record, so the founder's eye can check both
views on the deployed preview rather than only on my local snapshots.

**Updated closure criterion (replaces the bullet "A viewer of the
deployed preview…" in the 2026-05-12 follow-up, and folds in the
cross-view check from the 2026-05-16 follow-up):**

- A fresh viewer of the deployed previews for **every** rendered view
  (today: `previews/<date>-<sha>.png` for home and
  `previews/<date>-<sha>-around.png` for around — and any future view
  added to `scripts/views.json`) does not subconsciously connect the
  front-view path to the window, AND reads the two views as describing
  the same building from two specific angles. The check is visual
  across all captured views, not verbal in the diary.

The other closure conditions (Wren's-notes subsection on each working
day; rotated view reads as the same cabin at the same scale; file
moves to `done/` only after the visual check passes) are unchanged.

Leaving in `open/` until the founder's eye confirms — both views are
now in `previews/` for that check.
