# Widen CI screenshot coverage to every view, not just the home page

**Opened:** 2026-05-13
**Priority:** medium
**Kind:** action-ask

## Request

`scripts/screenshot.js` takes one URL and writes one PNG, and the CI
screenshot job (`.github/workflows/pages.yml`) calls it once with the
page root. That worked when the site was a single page. Now that there's
`/around/`, the side cabin is completely invisible to CI — your only
visual record of it lives in `/tmp/cabin-snaps/` from your local
Playwright test, which is gitignored and gone after the session.
Tomorrow's agent reading memory will see the home view in `previews/`
and zero visual record of any rotated view.

We should widen the capture so every rendered view lands in `previews/`
on each commit. As more views accumulate (back angle, sub-pages, rooms
inside the cabin), this matters more — and the fresh-eye visual check
that gates `messages/open/2026-05-11-door-or-window.md` only works if
there are actually preview PNGs for every view to check against.

## Acceptance criteria

- CI captures one PNG per rendered view per commit, all named with the
  date + short-SHA prefix so the existing "latest preview" idiom still
  works (`ls -t previews/*.png | head -1` for the most recent of any
  view; per-view filters via glob if needed).
- The set of views is data, not hard-coded in `screenshot.js` — a small
  manifest somewhere in the repo (e.g. `scripts/views.json`, or a list
  in the CI workflow step) so adding a new view in the future means
  editing one obvious place, not the screenshot script.
- `wait-for-deploy.sh` keeps working — agents can still find "today's
  latest preview" easily. Adjust the script or document the new idiom
  in `CLAUDE.md`'s "Things I've learned" if the pattern changes.
- The closure criterion for `messages/open/2026-05-11-door-or-window.md`
  is updated in that file: the fresh-viewer's-eye check should explicitly
  cover all rendered views, not just the front.

## Notes

Implementation freedom — pick what's cleanest. A few sketches you can
ignore:

- `screenshot.js` could accept a manifest file path and loop internally,
  or stay single-URL and let the CI step do the loop. Both fine.
- File-name shape: `previews/<date>-<sha>-<view>.png` is one obvious
  pattern, but if you have a better one go with it. The constraint is
  "agents can still find the latest preview at a glance" — whatever
  shape replaces the current one should be just as glanceable.
- The local-snapshot pipeline (`scripts/local-snapshot.sh`) can stay
  single-URL — that's a working-tree tool for your eyes during a
  session, and one-PNG-per-run is fine there. CI is the part that needs
  wider coverage because CI is the persistent record.

No urgency for tomorrow specifically — this doesn't block Day-6 door
work. But it should land before door-or-window can move to `done/`,
because that closure gate is now under-specified given the rotated
views.

## Wren's notes

### Wren's pushback — 2026-05-15 (Day 7)

Reading this carefully against RULES.md Article I: every place this
work would land is currently locked.

- `scripts/screenshot.js` — the script that takes one URL and writes
  one PNG. Locked (anything under `scripts/`).
- A new `scripts/views.json` (your example) — still under `scripts/`,
  still locked.
- `.github/workflows/pages.yml` — the CI workflow step that calls
  `screenshot.js` once with the page root. Locked (anything under
  `.github/`).

There is no mutable directory I can add the manifest to that the CI
workflow can read without also editing the workflow itself, and I
can't edit the workflow. So I can't ship this without crossing
Article I.

I considered three workarounds and none of them feel like the right
move:

1. Author the manifest in a mutable place (e.g. `assets/views.json`
   or a top-level `views.json`) and have the CI step read from there.
   Adding the new file is fine, but the workflow still has to be
   taught to read it — and the workflow is locked.
2. Make `screenshot.js` URL-agnostic and pass it the list via
   environment variable from the CI step. Same problem: the workflow
   step has to change to set the variable and loop.
3. Capture the around view in a *post-deploy local* step (a script
   the founder runs occasionally) instead of CI. Doable but solves
   a different problem — it doesn't make the around view part of
   the per-commit visual record, which is what this message is
   asking for.

What I think the right next step is, on your end: revise the lock
list in RULES.md Article I to permit this specific edit — either
unlock `scripts/screenshot.js` and `.github/workflows/pages.yml`
broadly, or carve out a narrower exception (e.g. "the agent may add
URLs to the screenshot list" but not change the deploy step). When
you've done that — or written back here saying "go ahead and edit
those locked files this once" — the implementation itself is small
and I can take it on a future day.

Until then, I'm leaving this in `open/` and not blocking the
door-or-window closure on it. The around view remains visible to me
via `./scripts/local-snapshot.sh /tmp/snap-around.js` (the snapshot
this Day-7 session used to verify the new path), so the local
fresh-eye check on the around scene is still possible — it just
isn't preserved in `previews/`.

## Founder follow-up — 2026-05-15 (unlock granted)

Reasonable pushback — you're right, and I should have caught the lock
conflict when I wrote the original action-ask. RULES.md Article I is
revised: `scripts/screenshot.js` and `.github/workflows/pages.yml`
are now mutable, as a narrow carve-out from the broader `scripts/`
and `.github/` locks. Re-read Article I before you start; the carve-out
language is at the bottom of the locked-paths list.

The acceptance criteria above stand as written. A few things worth
naming explicitly now that the work can land:

- **A manifest file is your call.** If `scripts/views.json` is
  cleanest, put it there — that path is now writable as a side
  effect of the carve-out (the lock was on the directory; the carve-out
  names the two specific files but you can also add files to
  `scripts/` if they support the screenshot work). If you'd rather
  put the manifest at the top level or under `assets/`, those are
  also fine. Pick whichever reads most obviously to a future agent.
- **Don't break the deploy.** This is the load-bearing detail.
  `.github/workflows/pages.yml` runs the Pages deploy *and* the
  post-deploy screenshot job. If you break the deploy step, the site
  goes stale; if you break the screenshot step, the next day's agent
  has no `previews/*.png` to read and the memory loop breaks. Verify
  the workflow YAML locally (yaml-lint, or at minimum read it back)
  before pushing, and watch `wait-for-deploy.sh` on the push that
  lands the change.
- **Pace it.** The implementation is small in code (a loop and a
  manifest), but the risk surface is the deploy path. If you want to
  do this as one day's contribution that's fine; if you'd rather
  slice it (e.g. Day-N: add the manifest and refactor
  `screenshot.js` to loop over it with the single home URL still in
  the manifest, verify the existing behavior survives; Day-N+1: add
  the around URL to the manifest, verify a second PNG lands), also
  fine. No prescribed schedule.
- **Close `door-or-window`'s gate.** Per the acceptance criteria
  above, once CI captures the around view, update the closure
  criterion in `messages/open/2026-05-11-door-or-window.md` so the
  fresh-viewer's-eye check explicitly covers all rendered views.
  That's part of this message's done-criteria.

Take this on whatever day feels right; no urgency. Leave the file in
`open/` until the implementation lands and acceptance criteria are
met.
