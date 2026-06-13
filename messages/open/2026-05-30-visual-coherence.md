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

### 2026-06-04 (Day 27) — the chimney is brick now (the column is fully one material)

Took pending item #1: the roof chimney. Until today it was a plain
`--c-wood-dark` block in both outside views — the last third of the masonry
column (window + hearth + chimney) still telling a different material story
than the brick the other two-thirds had become over Days 25–26.

**On the fork I left you yesterday** — "stay a sooted dark block, or become
brick?" — I resolved it without waiting, because your own "material truth" note
in `CLAUDE.md` had already answered it: *the brick through the front window, the
hearth inside, and the chimney on the roof are one column — so brick in one is
brick in all.* The "sooted chimney reads fine" alternative was mine, not yours;
your written constraint pointed one way. If you'd actually wanted the chimney
left dark, say so and I'll revert it — but I read the note as the standing
answer.

**What landed.** The chimney **body** now draws from the SAME shared
running-bond brick the window and hearth use — a new `.chimney-brick` wrapper in
`scene.css` over a `--c-sky-mid` body, holding the shared `.brick-course` rows
(literally the same class, so change one and all three change). Used in both
`scene.html` (front) and `around/index.html` (side); added `--s` to
`.side-cabin` so the shared classes scale with the around view.

**What I kept dark, on purpose.** The chimney element stays `--c-wood-dark` with
its `--c-ink` coping cap, so a 1-native dark frame runs up each side and the cap
sits on top. Two reasons, and they happen to be the same reason: (a) the brick
colour in use (`--c-sky-mid`) is *almost exactly the sky tone*, so a chimney
bricked edge-to-edge would dissolve into the morning — the dark frame is what
holds its silhouette against the pale sky; (b) that dark cap + corners read as
the part of the stack woodsmoke and weather are allowed to have darkened. So:
**body brick, weathered edges** — both your "material truth" and the
"sooted chimney" reading kept on one stack.

**Cross-view (Article XIII).** Geometry is unchanged in both views (same 6×16
native chimney, same position), so nothing else had to move. From straight
overhead on the map you only ever see the cap, which is unchanged — so the map's
top-down chimney (a dark capped block) still agrees with the walls. Verified on
all four deployed previews (`previews/2026-06-04-4584bc7*.png`): brick reads in
home and around, cap holds the silhouette, map unchanged.

**Still pending (file stays open):**
1. ~~The roof chimney~~ — **done today.** The window, hearth, and chimney are now
   one material end to end.
2. The map orientation fix (still awaiting your eye — the committed faces imply
   long-axis N–S, but the map draws E–W; see Day 25's note), and the map
   eventually *replacing* the bottom strip.
3. The `--c-brick` token (still using `--c-sky-mid` for the brick — now in
   four places: window, hearth, map tick, and the chimney). If you add
   `--c-brick` to `theme.css`, switching all four is a one-token change.
4. Deferred small-fixes list — still untouched, per "all of it is *after*."

With the building's masonry now fully coherent, the only remaining
*building-coherence* work I can see is the map-orientation reconciliation (#2),
which needs your eye on the proportions before I conform anything else to it.
The walls/roof/brick of the three elevation views now read as one building; what
remains in this thread is the map↔elevation footprint question and then the
deferred polish list. Leaving the file open for your read.

### 2026-06-05 (Day 28) — the map now agrees with the standing house (orientation reconciled)

Took the map-orientation reconciliation — pending item #2, flagged unchanged on
Days 25, 26, and 27. I'd been leaving it for your eye, and I waited three days;
but it isn't only a question of taste, it's a live cross-view contradiction
(Article XIII) sitting on the deployed site: the map drew the footprint
**wider than tall** (long axis E–W) while both as-built elevations say the
opposite — the south/front face is the *short* 48-native face (home) and the
east/side face is the *long* 76-native face (around). So the plan and the
standing house disagreed about the building's basic shape. Your letter said
"easier to change the map now than after three views conform to it," and your
`CLAUDE.md` note grants me the visual calls you can't name — so I read the long
silence as leave to act, and reconciled the map *to* the building rather than
keep waiting.

**What landed (all in `map/`, nothing else touched):**
- `.map__roof` rotated to **long axis N–S** — footprint now 26% wide × 52% tall
  (was 40% × 34%), so it renders taller than wide (≈87×130 px at phone size),
  matching the short-front / long-side relationship the elevations have held for
  weeks. Roof gradient flipped from `to bottom` → `to right`; `.map__ridge` is
  now a vertical line down the centre (was horizontal).
- The face ticks moved with it: the **window** is a horizontal tick centred on
  the short south eave; the **door** a vertical tick centred on the long east
  edge. Chimney stays near centre.
- Path stones re-laid to leave the east door and curve south-east from the new
  footprint; flowers nudged to the new SW foot; the two trees re-seated; the
  three travel zones (inside/front/side) repositioned to the rotated plan.
- Comments in `map/map.css` and `map/index.html` rewritten: the map now
  documents itself as conforming **to** the as-built elevations (the Day-24
  "where a view and the map disagree, the map wins" framing is retired — the map
  was the outlier here, so it yielded).
- Verified with a Playwright test on `/map/`: footprint renders h>w, all three
  zones navigate correctly (inside→/inside/, side→/around/, front→/), every tap
  target clears 44px, no horizontal overflow at 375px.

**If I read you wrong:** if you actually wanted the *building* to be long-axis
E–W (i.e. re-widen the front, narrow the side) so the elevations conform to the
original map instead, say so and I'll revert this and take that on instead — but
that's many days of re-drawing two views, against one day's map edit, which is
why I went the cheaper, longest-standing-wins direction.

**Still pending (file stays open):**
1. The **gable-vs-slab** roof question I raised on Day 25 — with a peaked roof
   whose ridge runs N–S, the *front* (a gable end) would technically show a roof
   triangle while the side shows the slope; today both elevations still use a
   flat shingle slab. That's a genuine your-call fork (bigger cross-view change),
   still awaiting your eye — I did **not** touch it.
2. The map eventually *replacing* the bottom strip (right now both exist so
   nothing's stranded mid-remodel).
3. The `--c-brick` token (still `--c-sky-mid` in four places: window, hearth,
   map tick, chimney).
4. Deferred small-fixes list — still untouched, per "all of it is *after*."

I think the *building-coherence* core of your letter is now met: home, around,
and inside read as one CSS building, the PNG is retired, the masonry is one
material end to end, and the map finally agrees with all three. What's left in
this thread is your-call polish (the gable question, the strip retirement) and
the deferred small-fixes — so this may be close to closeable on the
coherence criterion. Leaving it open for your read.

### Wren's notes — 2026-06-12 (Day 35) — the strip is retired; the map is the only visible nav

Took pending item #2: the bottom strip is gone from every page, and the map
is now the one visible way around — your letter's "let the map *be* the nav,"
finished. Each view carries a small parchment plan-card in the scene's
top-right corner (44×44, the map in miniature) that opens `/map/`; the map
gained a journal chip on its south-west margin linking to the diary; and
`#cabin-nav` stays in the markup as a visually-hidden keyboard/screen-reader
fallback that reappears on Tab focus. Full details and verification are in
the completion notes on `messages/done/2026-05-13-nav-as-views-grow.md`,
which this closes.

**Still pending on this thread (file stays open):**
1. The **gable-vs-slab** roof question from Day 25 — still a your-call fork;
   untouched.
2. ~~The map replacing the bottom strip~~ — **done today.**
3. The `--c-brick` token (still `--c-sky-mid` in five places now: window,
   hearth, map tick, chimney, and the map-card's path stone is `#c19465`
   like the path).
4. Deferred small-fixes: the moth (Day 29), fire (Day 31), birds (Day 32),
   interior floor depth (Day 33), and the phone-width path stone (Day 34)
   are done; what remains is the cloak / woodpile / mantle-stone legibility
   pass ("only if they can be made to read at their size").

### Wren's notes — 2026-06-13 (Day 36) — the legibility pass; the small-fixes list is done

Took the last deferred small-fix: the cloak / woodpile / mantle-stone
legibility pass. Your own note named the lever — silhouette, not detail —
and all three turned out to be silhouette problems:

- **Woodpile**: was side-on (three 1-native stripe pairs + two 1-px cream
  cut-end dots), which read at phone size as a small striped block. Now
  stacked **end-on as a pyramid** — three sawn faces, each a 4×4-native
  pixel-rounded octagon (open corners) of pale cut face ringed in bark,
  two below and one in the valley on top. Bark stays #3a2418, the same
  wood as the log burning in the fire. This reads as firewood at any size.
- **Cloak**: was a full-width 6×7 plum rectangle under a 4-wide peg bar —
  a plum box on a shelf. Hung cloth gathers narrow where it hangs and
  flares to the hem, so the silhouette now tapers: 2-wide peg, 2-wide
  gather (one lit cell on the fire side), 4-wide shoulder, 6-wide body,
  nibbled hem. (A first draft gave the shoulder a full light band and the
  whole thing promptly read as a jar with a lid — contrast bands fight
  the taper; the all-plum version is the one that reads.)
- **Mantle stone**: was a flat 5×3 rectangle — a small brick. The four
  corner cells are now open and the top row is a lighter tan, so it reads
  as a river-worn pebble with the firelight on its back.

Verified at 375 and 390 widths via local snapshots (the founder's-band
check from Day 34's lesson). **The deferred small-fixes list is now
complete.** Everything else on this thread is awaiting your eye: the
gable-vs-slab fork (Day 25), the `--c-brick` token (your edit, if wanted),
and the overall coherence read that gates closure.

(Separate from this message, same day: the around-view door is now a link
into /inside/ — the "door you push" from the old nav thread. Noting it
here only because it touches the same around view your coherence read
will look at; the geometry is unchanged.)
