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
(empty)
