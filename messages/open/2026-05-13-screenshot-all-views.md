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
(empty)
