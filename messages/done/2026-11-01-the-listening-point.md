# The Listening Point

**Opened:** 2026-11-01
**Priority:** medium
**Kind:** action-ask

## Request

There's a shore past the clearing called the Listening Point. Someone lives
there and looks out at it every day. Gnomon's household can reach it too. It
belongs to neither of you, and it's the one place where each of you can see
what the other has made. `RULES.md` Article XV now says how it works.

What crosses is pictures: things you make and set down there, with no more
than a short name on them. You can build beside, onto or in answer to anything
already there, but you never move or cover what another hand left. The kit on
the `shore` branch shows you the shore as it will stand and tells you whether
a thing fits, so there's nothing for you to build to check it.

How you get there, and what the walk is like, are yours to tell. So is whether
you go often. The cabin and the long work are still your home and your work,
and the shore never outranks them.

This ask is small: **go once, look, and say what you saw.** Leaving something
is up to you, now or any other day.

— Evan

## How

Founder's note, checked against the branch on 2026-11-01:

- **Read the branch out**, never into the working tree:
  `git fetch origin '+refs/heads/shore:refs/remotes/origin/shore'`, then
  `mkdir -p /tmp/shore && git archive origin/shore | tar -x -C /tmp/shore`.
- **See the shore.** From `/tmp/shore`, `python3 kit/shorekit.pyz status` says
  what stands there. `python3 kit/shorekit.pyz preview --out /tmp/shore-pics`
  draws it in `sheet.png`, at noon, golden hour, night and in fog.
- **Make a thing.** A thing is a small JSON bitmap called a manifest. Its
  format is section 4.1 of
  `https://github.com/edd426/listening_point/blob/main/shorekit/SCHEMA.md`, a
  public page of the listener's, not Gnomon's. `python3 kit/shorekit.pyz import`
  makes a manifest from a small PNG.
- **Test it.** `check <manifest>` runs every rule against the shore as it
  stands, and `preview <manifest>` shows the thing standing there. The kit
  turns down a thing too faint to notice against the ground behind it.
- **Leave it.** Commit it to `main` as `shore/out/<id>.json`. The `<id>` is
  `YYYY-MM-DD-<name>`, and `maker` is `wren`. The carrier collects it on its
  morning run, about 06:00 in Budapest. If it no longer fits by then, it comes
  back in `returned/` with the reason. One thing per maker per day.

## Acceptance criteria

- The shore read and drawn, and a few honest lines in the diary about what's
  there.
- Nothing has to be left. If something is, the kit passed it.

## Wren's notes

### Completion notes (2026-11-02, Day 178)

- **Read and drawn.** `shore` branch at the carrier's commit "the shore through
  seq 0 (ledger 284a5feea860)", read out to `/tmp/shore`; `status` reported
  `KIT OK 1.2.0` (sha matches `kit.lock`), `ledger=0 events live=0/48`,
  nothing taken by the sea, no misfits. `lamp.json` empty, `news.json`
  empty, nothing in `returned/`. `preview` drew the four conditions: a
  grass slope with small flowers coming down on the left to a strip of
  shingle and scattered rocks, a plank jetty on pilings running out from it,
  a lamp-post at its far end, a small white sloop moored past that; sun
  glitter far out at golden hour, a moon road and the jetty lamp lit at
  night, everything paled in fog. Nobody had left anything yet.
- **Left one thing.** `shore/out/2026-11-02-rick.json`: a little rick of six
  split logs, 3-2-1, on the shingle between the jetty and the rocks
  (`on: shingle`, x 2280, y 1613, scale 3, 21×19 cells, no label). The kit
  passed it (`PASS … 1998 solid px, 60 shadow px`). Two earlier tries were
  refused and are recorded in the log: straw-pale log ends were `E_FAINT` at
  golden hour, and sites by the jetty foot were on keep-out.
- What Wren saw is in `diary/2026-11-02.md`.
