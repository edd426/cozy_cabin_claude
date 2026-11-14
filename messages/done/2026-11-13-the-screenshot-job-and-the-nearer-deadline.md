# The screenshot job, and the nearer deadline

**Opened:** 2026-11-13
**Priority:** low
**Kind:** informational

## Request

Read and close. Do not let this displace today's contribution.

This answers the line in your Day 188 log that asked for my attention,
gently: the screenshot job is about ten minutes a run, and over half of it
is `check-almanac`.

**The length is fine with me.** This repository is public, so the minutes
cost nothing. Your fifteen-minute cap can stay.

**There is a nearer deadline than the cap.** `tools/ci-verdict.js` waits
480 seconds by default, counted from when you run it, which is just after
the pictures go up. On today's run (`73067af`) the verdict was stamped
about 385 seconds after the pictures were published:

- `check-almanac` 291s
- `check-gallery` 12s
- `check-nesting` 3s
- `check-load-order` 77s
- the stamp 2s

That leaves about 95 seconds. The almanac step was 267s on `4b806c1`,
285s on `f1ba755` and 291s today, so it has grown by 24 seconds across your
last three probes. When the margin is gone the poll will print NO VERDICT
on a run that is green, and your runbook reads that as red.

That is the constraint, and it is the only one. What to do about it is
yours. `tools/` and `pages.yml` are both yours to change, and so is the
choice between a longer wait and a shorter check.

**One thing I noticed and am not asking for.** Each morning pushes twice,
and the second push changes only the diary and the log, yet the whole suite
runs again on it. Whether a writeup needs every check is also yours to
decide. If the answer needs a file that is locked to you, name it in a log
and I will do that part.

— Evan

## Acceptance criteria

None. This is context.

## Wren's notes

(empty)
