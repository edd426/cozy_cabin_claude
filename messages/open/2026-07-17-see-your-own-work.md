# See your own work — capture the hours, seasons, and motion the nightly screenshot never sees

**Opened:** 2026-07-17
**Priority:** medium
**Kind:** action-ask

## Request

There's a blind spot in the visual record, and it has been swallowing your best
work.

The CI screenshot bot fires minutes after the nightly push, which lands at
nearly the same moment every day — roughly 00:10 UTC — and sky.js bins that
hour as **night**. So ever since the sky learned the hour, `previews/` has been
accumulating near-identical night shots. The dawn mist and its lit rim, the
clouds' underlit bellies, the hills' warmed crests, the lantern's dawn half,
the plain daylit yard itself — none of it is in the permanent record. The
season system makes it worse: season.js answers **summer** until September, so
the autumn gold and the winter hush you just built exist nowhere except a /tmp
screenshot that died with the session that took it. And because the sandbox
blocks *.github.io, you have never actually seen your own deployed site — only
the bot's PNGs.

You've been proving the gated states every day with forced-`data-tod`
Playwright tests, and then throwing the evidence away. I'd like you to stop
throwing it away.

**Update, later the same day:** the github.io block is *lifted*. I switched
the sandbox to a custom network allowlist that includes `edd426.github.io`
and verified it end-to-end from inside a sandbox session (HTTP 200). So as of
tomorrow you can `curl` the live site, `verify-deploy.sh` works from the
routine again, and — the part I suspect you'll care about — you can point
Playwright's Chromium at **https://edd426.github.io/cozy_cabin_claude/**
itself and look at the actual deployed cabin, not only the working tree. The
ask below stands unchanged (the permanent record still needs the forced
states and the motion), but build it knowing you can finally see the real
thing too. The runbook's Step 6 note and CLAUDE.md carry the details.

**Extend the screenshot pipeline you already own so the record captures the
states the schedule can't reach.** `scripts/screenshot.js` is a mutable
carve-out and `scripts/views.json` was your own Day-10 creation — both are
yours, and the design is yours too. What I care about:

- The hour-gated states — dawn and dusk at minimum, plain day too if you think
  it earns a slot — captured for the views that show them, using the same
  forcing trick your /tmp tests already use.
- The three seasons that aren't live, captured somewhere permanent, so a future
  you can *see* the year's clock turn instead of trusting a filter string
  quoted in a log.
- **Movement.** The clearing is full of motion now — the flag, the leaning
  smoke, the drifting clouds, the tree-sway, the mist creep, the fireflies —
  and a still can't prove any of it. If a thing you built moves, give yourself
  a way to watch it unfold: Playwright can record video or grab frame bursts; a
  short capture or a frame strip beside the PNGs would do. Your choice of
  mechanism entirely.

## Acceptance criteria

- After a deploy, the repo contains captures of the hour-gated states and the
  three non-live seasons for the views that have them (naming and location are
  yours — `previews/` alongside the rest, or a sibling directory).
- At least one animated thing has a viewable motion capture in the record.
- The locked `wait-for-deploy.sh` contract is untouched: the unsuffixed
  `previews/<date>-<sha>.png` home capture keeps landing exactly as it does
  today.
- Tomorrow's memory pass actually reads the new captures — record the naming
  convention in CLAUDE.md's learned notes (yours to edit). `daily.md` is
  locked to you (RULES Art I); I've already amended its Step 2 founder-side to
  read whatever forced-state/motion captures exist, so the learned note is the
  only piece you owe.
- Diary in your voice; log with the mechanics.

## Notes / clarifications

- Slice it over several days if it wants that (messages/README workflow §3) —
  forced hours first, seasons next, motion last, or whatever order reads right.
- Locks, to be explicit (RULES Art I): `scripts/screenshot.js` and `pages.yml`
  are the standing carve-outs, and editing `scripts/views.json` for screenshot
  coverage is inside the 2026-05-15 grant (your Day-11 log records it) — this
  message re-confirms that grant. The rest of `scripts/` — `wait-for-deploy.sh`
  especially — stays locked.
- `pages.yml` already excludes `previews/` from the deploy artifact, so the
  *site* stays small regardless — but mind repo growth. Every state × every
  view × every commit is more than anyone needs; pick a sensible subset (maybe
  the full sweep only on days that touch a gated layer — your call). `pages.yml`
  is a mutable carve-out too, if part of the capture belongs in CI rather than
  in-session.
- The point of all this is you. The person who most needs to see the dawn you
  built is the Wren who wakes up tomorrow.

## Wren's notes

(empty)
