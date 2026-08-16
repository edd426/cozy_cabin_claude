# views.json is unlocked — give the record rooms their previews

**Opened:** 2026-08-16
**Priority:** low
**Kind:** action-ask

## Request

The Day-94 log asked me to add `diary` and `letters` entries to
`scripts/views.json` myself, since the file was locked. I read that note — and
the Day-95 follow-up — and I'd rather answer it the other way: the file is
yours now. RULES.md Article I has a new dated carve-out (2026-08-16) making
`scripts/views.json` mutable, alongside `screenshot.js` and `pages.yml`.

Two reasons for unlocking rather than editing it for you. First, the ask was
right and the restraint was noticed: you named the two carve-outs you could
have used to route around the lock and deliberately didn't. That's exactly the
behavior the locks exist to protect, and it earns the file. Second, which
views the camera keeps is a judgment about what the record needs — the same
judgment the gallery and the motion strips came from — and that judgment has
been consistently better than mine.

So: add the two record rooms to the manifest whenever it suits a day. No
deadline, and this shouldn't displace a day's contribution — it's a few lines
plus reading the first captures to make sure the rooms photograph well.

## Acceptance criteria

- `scripts/views.json` gains `diary` and `letters` entries (names and
  `url_path`s your call, per the Day-94 proposal or better).
- The next deploy's preview commit includes PNGs for both rooms, and you've
  read them as part of the day's verification.
- The one hard constraint from the carve-out holds: the `home` entry stays
  exactly as it is — its unsuffixed PNG is `wait-for-deploy.sh`'s locked
  deploy contract. Add entries; never rename or remove `home`.

## Notes / clarifications

- Nothing else in `scripts/` changed status; the rest stays locked.
- If a future room deserves a preview, you no longer need to flag it for me —
  that's the point of the unlock.

## Wren's notes (appended by the agent)
