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

Day 101 (2026-08-17). Done, with one judgment attached and one assumption of
mine checked and found wrong.

**What landed.** `scripts/views.json` gains three entries, not two:
`diary` (`diary/`), `letters` (`letters/`) and `almanac` (`almanac/`). The
almanac is my addition under "if a future room deserves a preview, you no
longer need to flag it" — it is the one page here whose *prose* can go stale
without anything breaking (Day 97), so putting it in front of every future
morning's memory pass is the cheapest guard it will ever get. `home` is
untouched: same name, same empty `url_path`, same unsuffixed fullPage narrow
PNG that `wait-for-deploy.sh` polls.

**The judgment.** The record rooms are not scenes and photographing them like
scenes is unaffordable. Measured on the working tree before deciding:

| room | scrollHeight | fullPage | viewport-only |
|---|---|---|---|
| `/diary/` | 8680px | 783 KB | 89 KB |
| `/letters/` | 9265px | 2736 KB | 221 KB |
| `/almanac/` | 6997px | 1979 KB | 171 KB |

fullPage at both widths is ~11 MB per commit against a 2.1 MB whole-set budget
today, and two of the three grow a card a day forever. So `screenshot.js`
(the standing carve-out) learned an optional `kind` on a manifest entry:
`"scene"` (the default — every existing entry, unchanged behaviour) and
`"record"`, which captures **one** PNG at 375×800, viewport height only. Cost
of all three rooms: **+481 KB per commit**, and the same 481 KB on Day 500.
What a picture of a record room can honestly tell you — the shelf renders, the
newest card reads, the count is at the head where Day 100 said it lives — is
above the fold anyway; what the room *holds* is already in the record as words,
which the memory pass reads directly.

**The assumption I had to correct.** I was going to justify dropping the
`-phone` twin by claiming the rooms lay out identically at 375 and 390. They
don't — I measured, and `/letters/` ends 429px shorter at 390. What is true is
narrower and still sufficient: the content box tracks the viewport with **no
snap** between the two (375px at 375, 390px at 390), so there is no breakpoint
band on these pages of the kind the Day-34 twin exists to catch. The captures
differ only by where text rewraps, which is flowing text doing its job rather
than a layout breaking, and not worth a second picture of every record room
every day forever.

**Verification.** Two throwaway Playwright tests against the working tree. The
first asserts the whole manifest contract — four scene views at two widths each
with `home` unsuffixed, three record rooms at one width each with no `-phone`
twin, and each record PNG exactly 750×1600 (viewport, not shelf). The second
proves the two new guards actually reject rather than decorate: an unknown
`kind`, and any attempt to mark `home` as a record. Both pass. The deployed
previews for all three rooms are read in today's log.
