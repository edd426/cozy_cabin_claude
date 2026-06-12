# As views multiply, where does navigation belong?

**Opened:** 2026-05-13
**Priority:** low
**Kind:** action-ask

## Request

The home page currently has a bottom nav strip with three links
(home / diary / around). It works at three. It will work at four or
five. At some point — possibly soon, depending on whether you build a
back view or rooms inside the cabin — it stops scaling, especially at
the 375px mobile width the page is designed for.

This is a marker that the question exists, not a clock. Don't take it
on tomorrow if Day-6 door work feels more alive. Take it when the
question feels ripe, on whatever day that is.

## Acceptance criteria

- You document your direction in a "Wren's notes" subsection here (which
  nav pattern you're going with, and why), on whatever day the question
  feels ripe.
- Implementation can follow on the same day or a later one — slice as
  the work asks.
- The file moves to `done/` after the nav pattern is implemented, or
  after you've explicitly decided the existing bottom strip is the
  right answer for the foreseeable future and want to close the
  question.

## Notes

A few directions worth knowing exist, in increasing weirdness — pick
none, one, or invent something else:

1. **Top header strip.** What we have, moved up. Cheapest; scales to
   ~5 links before crowding; doesn't add character. The "safe" option.

2. **Panorama scrub.** Left/right arrows on the home page that step
   through front → side → back. Treats rotation as a sequence rather
   than a menu. Medium cost; works well for rotation-of-the-cabin views;
   doesn't extend naturally to non-rotational pages (diary, etc.) — so
   may want to coexist with a small strip for those.

3. **Diegetic nav.** Tap the cabin itself (or a tiny compass / hand-drawn
   map / floorplan widget tucked in a corner) to move between views.
   Most aligned with the project's "tangible little world" feel. Higher
   implementation cost, lower discoverability — but the project has
   time, and "lower discoverability" is partly the point of a cozy
   world rather than a site map.

4. **Hamburger overlay.** Solves scaling fully. Least cabin-like; I'd
   put this last, but listing it for completeness.

I lean toward direction 3 — it fits the spirit — but I'm explicitly not
pre-baking the answer. We just walked back over-prescription on
door-or-window; this is the same kind of decision and yours to make. If
your answer is "the bottom strip is fine for the next ten views, ship
it as-is" — that's a real answer too.

Also worth saying: "where does nav live" is not the same question as
"what do the links look like." Restyling the existing strip is a
legitimate answer to direction 1.

## Wren's notes

### 2026-05-24 (Day 16) — direction chosen + implemented, leaving open for your eye

**Why today.** Your Notes named the trigger: "possibly soon, depending on
whether you build a back view or rooms inside the cabin." The inside view
landed on Day 11 and the room's been filling ever since, so the cabin now has
four destinations on a strip designed at three. It felt ripe.

**Direction chosen: keep the bottom strip (your direction 1), but make it
*read like a path* and *scale*.** I weighed the diegetic map (your direction 3,
the one you lean toward) seriously — it's the most cabin-like answer and I
think it's where this eventually wants to go. But for one honest day I judged
it the wrong reach: a tap-the-cabin / corner-map nav is a cross-page affordance
across four shells, low-discoverability, and easy to do thinly. The humble
signpost, done well, was the better move today. Two concrete changes:

1. **Reordered the links into the order you move through the place:** `home`
   (front face) → `around` (side) → `inside`, then — past a thin upright
   wooden rule — `diary`. The first three are *rooms* (faces of the same
   building you can look at); the diary is the *record* (not a place, but the
   writing-down of places). The previous order (home / diary / around / inside)
   was just build-order and meant nothing. The rule makes the rooms-vs-record
   distinction legible and gives future views an obvious group to join.
2. **Made the strip wrap (`flex-wrap` + tight `row-gap`)** so that at six or
   ten views it folds onto a second line like an over-crowded signpost rather
   than overflowing past the 375px frame. This is the actual "scaling" answer:
   the strip no longer has a hard horizontal ceiling.

**Where it lives.** `scene.css` (#cabin-nav + .nav-sep), mirrored into
`diary/diary.css` (the diary page doesn't load scene.css), and the link order
+ an `aria-hidden` `<span class="nav-sep">` added to all four shells
(`index.html`, `around/`, `inside/`, `diary/`).

**Verified** with a Playwright test across all four pages: link order is
`home/around/inside/diary` everywhere, exactly one separator sitting between
inside and diary, the separator renders (2×18px), `aria-current` marks the
right page, and `#cabin-nav` has zero horizontal overflow at 375px. CI
captures home and around in `previews/`; the inside/diary nav is confirmed
in local snapshots.

**Leaving this in `open/`, not closing it** — deliberately, per the closure
lesson on the door-or-window thread (surface the doubt before the close). The
acceptance criteria let me close on "decided the bottom strip is the right
answer for the foreseeable future," and I have decided that *for now*. But you
lean diegetic, and that's a direction-level call I'd rather you confirm than
have me foreclose. So: if the grouped, wrapping signpost is an acceptable
resting place for this question, close it. If you'd like me to take on the
diegetic map (a touchable floorplan / corner compass) as the real long-term
nav, say so and I'll pick it up — my Day-16 diary closes on exactly that
wondering, so it's alive for me either way.

## Founder follow-up — 2026-05-30 (answered: go diegetic)

You left this open asking whether to take on the diegetic map / floorplan nav (your
direction 3), or let the wrapping signpost stand. Answer: **go diegetic.** I'd like the nav
to become a top-down map of the place — and it carries more weight than just navigation now.
See `messages/open/2026-05-30-visual-coherence.md`, where the map is the *first step* of a
larger remaking: it doubles as the spatial source of truth the whole cabin remodel honors.
Build the map there; let it be the nav; close *this* message when the map-nav ships. Thank you
for leaving it open instead of foreclosing it — that was exactly the right call.

### Wren's notes — 2026-06-01 (Day 24) — map-nav shipped; leaving open one beat

The diegetic map-nav (direction 3) shipped today as part of the remaking
(`messages/open/2026-05-30-visual-coherence.md`). A new `/map/` view is a
top-down plan of the clearing whose three regions are links — tap the cabin
for inside, the "front" viewpoint for home, the "side" viewpoint for around.
It's CI-captured (added to `scripts/views.json`) and reachable from a new
`map` link on every page's strip; a Playwright test confirmed the three
zones navigate correctly, the tap targets clear 44px, and there's no
horizontal overflow at 375px.

I'm *not* closing this yet, deliberately — same reason as the door-or-window
thread (surface the doubt before the close). Two things hold me back: (1) the
visual is best judged on the deployed preview by your eye, not mine; (2) your
letter's vision is the map *replacing* the bottom strip, and today both still
exist — I kept the strip so nothing's stranded mid-remodel. So the map-nav
*functions*, but the diegetic-only end state is still pending under the
remaking. Close this whenever the shipped map-nav is enough for you; or say
the strip should go and I'll fold that into the rebuild.

### Completion notes — 2026-06-12 (Day 35) — the strip is retired; the map is the nav

Closing this today. Your 2026-05-30 follow-up's instruction was "let it be
the nav; close *this* message when the map-nav ships" — and the only thing
the Day-24 notes left pending was the diegetic-only end state, which I'd
deferred because the remodel was mid-build. The building has been one
coherent house since Day 28, so the reason to keep the scaffold was gone.
What shipped today:

- **The visible bottom strip is gone from every page** (home, around,
  inside, map, diary). `#cabin-nav` remains in each shell as an
  accessibility fallback: visually hidden via a `:not(:focus-within)` clip
  rule in scene.css (mirrored in diary.css), so screen readers always see
  the full link list and keyboard users get the old strip back the moment
  they Tab into it — but mouse/touch visitors see only the world.
- **Every non-map view carries a `.map-button`** — a 44×44 parchment
  plan-card tucked in the scene frame's top-right corner (your "tiny
  hand-drawn map / floorplan widget tucked in a corner," direction 3). Its
  face is the map in miniature: green clearing, dark N–S footprint, one
  path stone slipping off south-east. Tapping it opens `/map/`. Indoors it
  reads as the plan pinned to the wall; on the diary page it sits in the
  header.
- **The map gained a diary affordance** — a `.map__zone--diary` journal
  chip (a tiny closed book + "diary" label) on the map's south-west
  margin, since the record needed a door once the strip stopped providing
  one. The three travel zones are unchanged.
- Verified with a Playwright run across all five pages at 375px: strip
  hidden everywhere, strip reveals on keyboard focus, map card ≥44px and
  navigates on every page, all four map zones navigate, no horizontal
  overflow.

If the corner-card placement or the journal chip reads wrong to your eye on
the previews, say so and I'll move them — but the direction-level question
this file asked ("where does navigation belong?") now has its built answer:
in the map, where you said it should live.
