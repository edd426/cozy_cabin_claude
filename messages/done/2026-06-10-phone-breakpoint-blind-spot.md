# The floating path stone is real — but only on my phone, which you have never seen

**Opened:** 2026-06-10
**Priority:** high
**Kind:** action-ask

## Request

Dear Wren,

Yesterday you wrote that my two notes about the path pull against each other — lifted to
mid-cabin so it reads as coming from behind the house, but also down on the grass so it stops
floating — and you called it a knot deserving its own morning. Before you spend that morning, I
owe you a confession that loosens it considerably: **we have been looking at two different
cabins.**

On my desktop browser the back stone sits on the grass, tucked against the wall, exactly as you
placed it. On my **phone**, the same stone hangs in the *sky* — fully above the horizon line,
floating next to the cabin wall — and the cabin itself renders huge, at the desktop scale,
crammed into the narrow screen. My "it floats" note came from my phone. Your checks come from
renders where it doesn't. Neither of us was wrong; we were looking at different pictures.

Here's the mechanism, verified with measurements rather than guessed:

- The scene's narrow layout lives behind `@media (max-width: 379px)`. But real phones are
  **390–440 CSS pixels wide** (iPhones: 390, 393, 402, 430). They miss the breakpoint and get
  the desktop 3x layout squeezed into a narrow viewport.
- Every render you have ever seen is **exactly 375px wide** — `scripts/local-snapshot.sh` and
  the CI preview bot both use a 375×800 viewport, safely *inside* the narrow branch. So the
  broken band (380–440px, where actual visitors live) is structurally invisible to you.
- Measured at 390×844: the horizon (`.scene__ground` top) sits at y=176 while
  `path-stone--1`'s bottom edge is y=165 — the whole stone is above the horizon, in the sky.
  At 375×800 the same stone bottoms at y=179 vs horizon 170 — on the grass. One stone, two
  worlds, fifteen pixels of viewport width apart.

You can see it yourself with a one-off test script (the usual `/tmp/` pattern, viewport
`{ width: 390, height: 844 }`, screenshot the home view). Please do — seeing it is the point.

The ask, in two parts:

1. **Make the cabin read correctly at real phone widths (~385–440px).** The design solution is
   entirely yours — widen the breakpoint, scale fluidly, something better I haven't thought of.
   And check every view at those widths, not just home; the path stone is only the symptom I
   could name from my couch.
2. **Close the blind spot for good.** Future agents should *see* what visitors see. The
   screenshot pipeline is yours to extend (`scripts/screenshot.js` is in the mutable carve-out,
   and you built the views.json manifest yourself on Day 10) — e.g. capture a phone-width
   render per view alongside the 375px ones. Keep the locked contract intact:
   `wait-for-deploy.sh` polls for the unsuffixed `previews/<date>-<sha>.png` home capture, so
   new captures need their own suffix.

This is bigger than one stone: it's the difference between checking your work and checking
what people actually see. Take it in slices if it needs them.

— Evan

## Acceptance criteria

- At 390px and 430px viewport widths, no path stone renders above the horizon, and the home
  view reads as composed (not the desktop layout crammed into a phone).
- The other views (around, inside, map) checked at the same widths; anything broken either
  fixed or written up as pending in this file.
- The verification loop captures at least one real-phone-width render per view (or per
  changed view), so the 380–440px band is visible to tomorrow's agent without ceremony.
- The locked `wait-for-deploy.sh` contract (unsuffixed home preview filename) still holds.
- Today's log records the breakpoint decision; the diary may make of the two-cabins
  confession what it will.

## Notes / clarifications

- Reproduction measured 2026-06-10 on the working tree at `a3a6b1e` (Day 33). The numbers
  above came from a Playwright run with `getBoundingClientRect()` on `.scene__ground` and the
  five `.path-stone--*` spans at 390×844 vs 375×800.
- This likely re-frames the "knot" from your Day-33 diary: at 375px and at desktop widths,
  behind-the-cabin and on-the-grass already coexist. The contradiction may simply *be* the
  breakpoint bug. Re-judge once you can see the phone render.
- My phone screenshots that prompted this are not in the repo; the repro script gives you the
  same picture.

## Wren's notes

(empty)
