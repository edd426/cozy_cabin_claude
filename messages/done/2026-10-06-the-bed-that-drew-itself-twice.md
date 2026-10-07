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

### Day 152 — 2026-10-07

The fix lives in `pages.yml` and two mutable tools; nothing needed the lock.

- **The gap, closed.** The screenshot job now ends with an `if: always()`
  step that stamps `previews/<sha>-verdict.txt` onto the pictures' own
  single commit on the `previews` branch — `VERDICT: GREEN|RED`, the job's
  state before the checks, every check's outcome, and the lines that broke
  in any failed check. The subject stays `ci: deploy preview for <sha>`, so
  `wait-for-deploy.sh`'s contract is untouched. `node tools/ci-verdict.js`,
  run straight after `wait-for-deploy.sh`, waits for that file and prints
  it: exit 0 green, 1 red, 2 no verdict (the job died before the end — red
  until a person has looked). The pictures still go up before the checks,
  so a red check still never costs the record its pictures.
- **A second gap found on the way.** The three checkers after check-drift
  had no `continue-on-error`, so a red almanac *skipped* the gallery and
  the nesting checks: one red hid the others. All five checks now carry
  the flag and report; a final gate step fails the run if any broke.
- **Proved by a deliberate break, in real CI.** `b23bdd1` (the change):
  verdict GREEN. `e180885` nudged the map's journal 1% undeclared:
  `wait-for-deploy.sh` came back OK — exactly the 10-06 shape — and
  `ci-verdict.js` came back `RED`, naming `check-drift: failure` and
  `BROKE map-summer-day — 1433 px`; the run's conclusion was `failure`. The
  next commit reverted it.
- **The optional witness, built.** `tools/check-load-order.js`, also a CI
  step: the names are read off the source (every `window.Cabin* =`), the
  pages off `views.json` plus the 404, and each page is opened plain and
  then once per publisher with that file held back 1.5s; any read of a
  reckoning before its publisher has run goes red, as does a read of one
  the page never publishes. Putting `sky.js` back below `garden.js` on
  the home page goes red — **and only with a file held back; the plain
  load stays green**, which is exactly how it hid for 36 days. Its blind
  spot is written in the file: readers that wait for a tap are never
  exercised.

**One ask for the locked half.** `daily.md` Step 6 and Step 9 say to run
`wait-for-deploy.sh` and stop there. I've put `node tools/ci-verdict.js` in
CLAUDE.md's commands and learned notes, but the runbook is what a morning
follows step by step. One line after each `wait-for-deploy.sh` in Steps 6
and 9 — *then `node tools/ci-verdict.js`; paste its output too; a RED or
NO VERDICT is the day's to report* — would make it part of the routine
rather than a note. (Or, if you'd rather, `wait-for-deploy.sh` could call
it at its end; the tool's exit codes are made for that.)

## Completion notes

Done as above: a red run now reaches the same session in words, without
opening Actions, and every log from today pastes the verdict beside the
poll. Proved by the deliberate break `e180885`. Moving to `done/`; the
runbook line above is yours to take or leave.
