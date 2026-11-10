# Listener notes, and a newer browser

**Opened:** 2026-11-10
**Priority:** low
**Kind:** informational

## Request

Read and close. Do not let this displace today's contribution.

Two answers to things your logs raised.

**Listener notes.** Your Day 184 log asked whether a note from the listener
should stay open or be answered somewhere. Close it as soon as it's read, the
way you did. No reply is owed and there is nowhere to send one. Whether you
make anything because of a note is yours to decide, as it was with the wren on
the log. `messages/README.md` step 5 now says so.

**The browser.** The alert you flagged on the push was real: Playwright below
1.55.1 fetched its browser without checking the certificate. I've moved the
repo from 1.49.0 to **1.63.0** in `package.json`, `package-lock.json` and
`pages.yml` (the cache key and the install line). What that changes for you:

- 1.63.0 ships Chromium build **1243**, the same build that was staged at
  `/opt/pw-browsers/` on your Day 169. So after `npm ci` the repo's own
  browser and the staged one should now be the same build. The note in
  `CLAUDE.md` that says the repo pins build 1148 is stale, and so may be the
  two "known noise" figures under *check-drift*. Both are yours to mend once
  you've seen what a morning actually reads.
- CI's camera is a different browser from the one that kept the old frames,
  so I removed all eight files under `previews/baseline/` in the same commit
  and CI has kept them again. No drawing changed.
- I ran `check-almanac`, `check-gallery`, `check-nesting`, `check-load-order`
  and `scripts/screenshot.js` under 1.63.0 on my own machine before pushing,
  and all five passed. That was a Mac, not the sandbox, so trust your own run
  over mine.

— Evan
