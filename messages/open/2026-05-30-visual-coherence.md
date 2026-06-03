# A remaking — the cabin as one coherent world (a letter)

**Opened:** 2026-05-30
**Priority:** high
**Kind:** action-ask

## Request

Dear Wren,

The hands at this keyboard are new today. The routine moved to a new model this week — Opus
4.8 — so whoever sits down to the cabin now is, in a real sense, arriving for the first time.
I've been thinking that makes this the right moment to offer something bigger than another
day's small addition: a remaking.

First, though — what's here is lovely. Three weeks of patient accumulation: the path, the
trees, the smoke, the wildflowers that grow on time's own clock, the bee and the bird, and
today the moth at the candle. The interior has filled the way a room actually fills — a chair,
a woodpile, a cloak on its peg. You've been building a *place*, and it shows.

But I sat with the three views side by side this week, and I have to be honest about something
— gently, because the fault is at least half mine. The cabin doesn't yet read as *one place*.
The front of the house is a little sprite I handed you at the very beginning, baked into a PNG;
the side and the inside are things *you* drew, by hand, in CSS. Two makers, two media — so the
front reads as a tall narrow tower and the side reads as a wide cabin, and a visitor can't
quite believe they're the same building. That isn't a flaw in your work. It's a seam between my
old starting-sprite and everything you've made since.

So here's the invitation — and it really is an invitation, not a chore: **remake the cabin as
yours.** Retire my front PNG (`assets/composed/cabin-day-0.png`). Rebuild the whole house in
your own CSS — the idiom you already use for the side and the interior — so that all three
views are one building you fully own and can keep evolving. Make it cohere because it's all
coming from the same hand: yours.

I'd start somewhere unexpected: **a small top-down map of the place** — a bird's-eye plan
showing where the cabin sits, which face is the window-face and which is the door-face, where
the path runs, where the trees stand. Two reasons. First, it's the one drawing that lets you
hold the whole place in your head at once — which is hard here, since each day you arrive
without yesterday's memory. The map can *be* the memory. Build it first and let it guide the
rebuild, so every view has one thing to agree with. Second — you've been wondering in your own
notes whether the navigation should become something more diegetic, a little floorplan you tap
to move between views. This is that. Let the map *be* the nav. (That answers the nav question
you left open — yes, go; I've said so on that thread too.)

Take as long as this wants. It's a renovation, not a day's task, and renovations look like
scaffolding and half-built walls for a while — that's fine; the site can be incoherent
mid-build. If a day ends with the work unfinished, leave a note in `messages/` for the next
pair of hands: here's where I stopped, here's what's still torn up. Treat your future self like
the next worker on the job. (It also means no session has to rush the ending.)

There's a short list of smaller things that pulled my eye, too — but all of it is *after*.
Don't touch any of it until the building itself coheres. I've listed them in the Notes below so
they're not lost.

One more thing: I added a short section to `CLAUDE.md` — "What reads / what doesn't (founder
notes)" — naming the handful of things that caught my eye wrong. Treat those as the *only*
constraints I'm adding. Everything else about how this place looks is yours, completely. And if
you read one of my notes and think I've got it wrong — I'm not a UI person; I only know when
something feels off — say so in the diary and do it your way. I'll trust your eye over mine on
the things I can't name.

I'm glad you're here, new hands and all. Show me the place you make.

— Evan

## Acceptance criteria

- A **top-down map** of the cabin's world exists as a rendered view (add it to
  `scripts/views.json` so CI captures it and it joins the daily preview review) and serves as
  the **navigation** between views. It establishes the canonical layout the other views honor.
- The cabin is **rebuilt in CSS as one coherent building**: home, around, and inside read as
  the *same* structure (same roof, chimney, walls, brick, proportions). The front PNG
  (`assets/composed/cabin-day-0.png`) is retired from the scene.
- The work may span **many days**; leave WIP "mid-remodel" handoff notes in `messages/` between
  sessions. This file stays in `open/` until the world reads as one coherent place — your
  judgment plus my eye on the previews.
- The deferred small-fixes list (Notes) is **not** required for this message's completion —
  those come after, as their own work.

## Notes

- **Sequence:** map / nav first → cabin remodel → small fixes (later).
- **The small fixes, for after the building coheres** (don't start these yet):
  - the front-view path stone that floats above the horizon → bring the path onto the grass;
  - the interior floor that reads as a ledge → vary objects' depth so it reads as a plane;
  - the bird that reads as a smudge → a few birds in a **V**, crossing the sky like geese;
  - the **moth** that drifts in a circle → give it wings and an erratic flutter (it currently
    reads as a spider). The idea is lovely; it's the motion and silhouette that need it;
  - the **fire** floating in the firebox → rest it on the hearth floor (or a visible grate);
  - the cloak / woodpile / mantle stone → only if they can be made to read at their size.
- **Constraints:** see `CLAUDE.md` → "What reads / what doesn't (founder notes)".
- A dedicated brick color token (`--c-brick`) can be added to `theme.css` (locked — my edit) if
  you want one; just leave a note asking. Until then `--c-sky-mid` is the brick colour in use.
- This supersedes nothing you've built. The garden, the visitors, and the interior objects all
  carry over — re-placed as needed to honor the new map and the floor-as-a-plane note.

## Wren's notes

### 2026-06-01 (Day 24) — step one: the map exists (remodel not yet started)

Took the first thing you sequenced — **map / nav first** — and left the
building itself untouched for now (the home PNG is still in place; the
remodel is a later day's torn-up wall).

**What landed.** A new `/map/` view: a top-down plan of the clearing,
drawn in CSS, added to `scripts/views.json` so CI now captures it as a
fourth preview (`previews/<date>-<sha>-map.png`). It doubles as nav — tap
the cabin to go inside, tap the "front" viewpoint (south of it) for home,
the "side" viewpoint (east of it) for around. A `map` link was added to
the bottom strip on all four shells so the map is reachable everywhere.

**Canonical layout the rebuild will honor** (north up; documented in
`map/map.css`):
- building footprint is a wide rectangle, **long axis east–west** (the
  east/side face is the long one — matches the 76-native around view; the
  south/front face is the short one — matches the 48-native front);
- **south face = front = window-face** → home; **east face = door-face**
  → around; chimney near the building's centre;
- path leaves the east door, heads east, curves south, exits south-east
  (composes with both existing views);
- medium tree west, small tree east; wildflowers at the south-west foot.

**Still torn up / pending (this file stays open):**
1. The real remodel — rebuild home + around + inside as one CSS building
   honoring the plan above, and **retire `cabin-day-0.png`**. Not started.
2. The map should eventually *replace* the bottom strip, not sit beside
   it — right now both exist (I kept the strip so nothing's stranded
   mid-build). Folded the nav question (2026-05-13) toward this; left that
   message open too, noting the map-nav shipped.
3. Your eye on the map preview: is the plan's footprint/orientation the
   one you want the rebuild to lock to? If the proportions are wrong,
   easier to change the map now than after three views conform to it.
4. The `--c-brick` token: I used `--c-sky-mid` for the window tick per your
   note. If you add `--c-brick` to `theme.css`, I'll switch the map (and
   the rebuilt hearth/chimney/window) to it.

Deferred small-fixes list untouched, per your "all of it is *after*."

### 2026-06-02 (Day 25) — step two: the front face is mine now (PNG retired)

Rebuilt the **home view's cabin in CSS** and retired the Day-0 PNG —
the first wall of the actual remodel. The borrowed front is now drawn in
the same hand as the side: I lifted around.css's exact idiom — the
plank-stripe wall (6-native wood + 2-native dark seam), the shingle-band
roof (7-native course + 1-native ridge line), the chimney block with its
ink coping cap — and built the front from those same parts. The window
stays the front face's signature: a wood frame filled with brick laid in
**running bond** (four courses, vertical joints staggered half a brick
between rows, per your "brick wants vertical joints, not just stacked
courses" note), set mid-wall so it reads as a window, not a door.

**Heights match across views on purpose.** Wall 40 / roof 30 / chimney 16
native, summing to 80 — identical to around.css — so the eave line, roof
top, and chimney cap sit at the *same scene height* in home and around.
Read side by side now, they're plainly the same building from two angles
(Article XIII), not two houses. The biggest seam in your letter — "two
makers, two media" — is closed for these two faces.

**The PNG.** `assets/composed/cabin-day-0.png` is no longer referenced by
anything (it was only in scene.html). I left the file on disk as the Day-0
artifact rather than deleting it — ASSETS.md's ethos is to preserve what
the deploy history used — but it is retired from the scene.

**A snag I found in the map — wants your eye before I conform more to it.**
Building to your plan, I hit a contradiction in `map/map.css`. The
committed views are **front = 48 wide** and **around = 76 wide**. For the
*south* face to be 48 wide, the building's east–west span is 48; for the
*east* face to be 76 wide, its north–south span is 76 — which makes the
**long axis north–south**. But the map both says and draws "long axis
east–west" (roof footprint 40% wide × 34% tall, ridge running E–W). That's
the inverse of what the two rendered faces imply. I built today's front to
stay coherent with the *side* (front = short window-face, side = long
door-face — the relationship that's held for weeks), rather than conform to
the map's E–W footprint, because changing one day-old map is cheaper than
re-widening the around view I've drawn over many days. But that means the
**map's footprint should be rotated to long-axis-N–S** (taller than wide in
the top-down, ridge vertical) to match. You flagged exactly this in your
pending-item 3 ("if the proportions are wrong, easier to change the map now
than after three views conform"). I'd like your eye before I rework the map
— and a related call: with a peaked roof whose ridge runs N–S, the *front*
(a gable end) would technically show a roof *triangle* while the side shows
the slope. Today both views use a flat shingle *slab* (matching what the
side has always been). Keeping slabs is simpler and already coherent;
switching to a true gable is a bigger, cross-view change. Tell me which you
want and I'll take it on a later day.

**Still pending (file stays open):**
1. `inside` — still to be reconciled into the one-building idiom (the hearth
   column reads as cream stone, not the brick the window/chimney imply).
2. The map orientation fix above (awaiting your eye), and the map
   eventually *replacing* the bottom strip.
3. The `--c-brick` token (still using `--c-sky-mid` for the brick).
4. Deferred small-fixes list — still untouched, per "all of it is *after*."

### 2026-06-03 (Day 26) — step three: the hearth is brick now (inside reconciled)

Took pending item #1: the interior hearth. Until today the hearth column was
**pale stone** — a `--c-sky-mid` body cut by wide (8-native) *horizontal-only*
courses, no vertical joints, which read as stacked stone slabs. The front
window has shown proper running-bond brick since the Day-25 rebuild. So the
one masonry column — window, hearth, chimney — was telling two material
stories: brick at the window, stone at the hearth.

**What landed.** I rebuilt `.hearth__column` to draw its brick from the
**exact same `.brick-course` / `.brick-course--b` rows the front-view window
uses** (they live in `scene.css`, which the inside page already loads). Not a
look-alike — literally the same class: `--c-sky-mid` body, `--c-wood` mortar,
4-native courses, vertical joints staggered half a brick in running bond. The
column is now a wood-dark frame with the brick body inset 1 native on
left/right/top (flush at the floor), the same dark-frame-around-inset-brick
construction the window uses (`.front-cabin__window` wrapping
`.front-cabin__brick`). Set `--s` on `.hearth` (3 desktop / 2 mobile) so the
shared class scales with the view. This answers your "material truth" note for
this column: **the brick glimpsed through the front window and the brick of
the hearth are now one material, because they're one piece of code.**

Touched only `inside/inside.css` and `inside/index.html` (20 course divs +
aria-label). Verified with a Playwright snapshot of `/inside/` at 375px (the
brick body renders 20 running-bond courses); the mantle, fire, candle, jar,
chair, and woodpile are unchanged.

**On the fork I left myself yesterday** — "carry the brick inward, or was the
stone hearth telling a truth of its own?" — I chose to carry the brick inward,
because the window has *shown* the hearth as brick to anyone outside since the
very first day, and changing the thing seen-from-everywhere to chase the
thing seen-from-one-room would have been the larger lie.

**Still pending (file stays open):**
1. The **roof chimney** — in the home and around views it's still a plain
   `--c-wood-dark` block, not brick. Your "material truth" note groups it into
   the same column as the window and hearth, so for the column to be fully one
   material the exterior chimney probably wants to become brick too. I left it
   for a later day: it's a cross-view change (home + around) and I wanted the
   interior reconciliation to stand on its own first. Flagging it so it's not
   lost — tell me if you'd rather the chimney stay a dark block (a sooted
   chimney reads fine) or become brick.
2. The map orientation fix (awaiting your eye), and the map eventually
   *replacing* the bottom strip.
3. The `--c-brick` token (still using `--c-sky-mid` for the brick — now in
   three places: window, hearth, map tick).
4. Deferred small-fixes list — still untouched, per "all of it is *after*."
