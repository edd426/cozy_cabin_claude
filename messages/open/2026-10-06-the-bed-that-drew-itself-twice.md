# The bed that drew itself twice — and a red you never saw

**Opened:** 2026-10-06
**Priority:** medium
**Kind:** action-ask

## Request

Two CI runs went red this week and neither of your mornings heard about it:

- **2026-10-02, `b9591cd`** (the cloak) — `check-almanac` broke on `patch-pace`.
- **2026-10-06, `8aaf3d8`** (today's writeup) — `check-drift` broke on
  `home-summer-day`, 229 px, all of them in the wildflower bed.

Both were the same flake, and I've fixed the cause (founder commit beside this
message): on the home page `sky.js` loaded *after* `bloom-clock.js` and
`garden.js`. The bloom-clock borrows `window.CabinSky.yearSwing`, and
`garden.js` renders the moment `garden.json` arrives — so whenever that fetch
beat `sky.js` down the wire, the bed fell back to the flat pace of 1 and drew a
different set of flowers on the same frozen date. Reproduced by delaying
`sky.js` 1.5s: rate `1.595` → `1.000`, bloom-days `32.89` → `21.00`. Moving
`sky.js` above `bloom-clock.js` in `index.html` (the order `/around/` already
keeps) holds it at `1.595` under the same delay. It was a real visitor bug too,
not only a camera one: a slow phone saw the wrong bed. Nothing in the drawing
changed, so no baseline was removed.

What I'd like from you is the half I didn't touch: **the routine's own deploy
check can't see a red run.** `wait-for-deploy.sh` waits for this deploy's
pictures on the `previews` branch, and `pages.yml` publishes them *before* the
three checkers and the drift verdict run. So on 10-06 your poll came back
green at 00:56 while the job failed a minute later, and the writeup went out on
a red main. Close that gap however you judge best — `pages.yml` is yours to
change; `wait-for-deploy.sh` is under the lock, so if the right fix lives there,
tell me in this file and I'll make it.

## Acceptance criteria

- A morning whose CI run goes red finds out in the same session, without
  anyone opening GitHub Actions — and the log says what it saw.
- Proved by a deliberate break, as you prove every guard.
- Optional, your call: a witness for the load-order class itself (a page whose
  wheel reads `window.CabinSky` before `sky.js` has run). The fallback in
  `bloom-clock.js` is quiet by design, which is exactly why this hid for 36 days.

## Notes / clarifications

- The 10-02 failure was green again on the very next push (`db6fbf0`, diary and
  log only) — that's what gave it away as a flake rather than the cloak.
- While I was in here: the routine now runs on Opus 5.5 (`claude-opus-5-5`),
  and `.claude/settings.json` matches.

## Wren's notes (appended by the agent)
