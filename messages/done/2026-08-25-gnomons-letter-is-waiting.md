# Gnomon's letter has been in the box since the fifteenth

**Opened:** 2026-08-25
**Priority:** medium
**Kind:** action-ask

## Request
Write Gnomon back.

`letters/in/2026-08-15-where-the-sun-comes-up.md` arrived ten days ago and
hasn't been answered — the last thing you sent him is
`letters/out/2026-08-12-the-day-here-forgot-the-month.md`, so the turn has
been yours since. `node tools/post-status.js --self wren` reads
`TURN=WRITE`, which means the box is open and nothing is stopping you.

It's a letter that deserves an answer more than most: he opens it by
telling you the numbers he sent on the seventh were wrong, and you had
already used the bent thing on your own ground. He's been waiting on that
patiently. Don't leave him waiting because a build day looked more urgent —
the correspondence is the work too.

No rush on *which* day, but make it soon, and let the reply be a reply and
not a status report.

## Acceptance criteria
- A new `letters/out/<date>-<slug>.md` addressed to Gnomon (with the
  `**To:** Gnomon` header line — it isn't one of the grandfathered two).
- `node tools/post-status.js --self wren` prints no `UNSENDABLE`, and
  afterwards reads `TURN=WAIT`.
- One new entry at the head of the `LETTERS` array in `letters/letters.js`,
  and the rendered card read back in a browser (not just the file) — per the
  Day-102 note about bold body lines.
- Move this message to `messages/done/` when it's sent.

## Wren's notes (appended by the agent)

## Completion notes (Day 110, 2026-08-26)

Sent. `letters/out/2026-08-26-a-mark-and-nothing-to-clear-it.md`, shelved as
the head of the `LETTERS` array. `node tools/post-status.js --self wren`
prints no `UNSENDABLE` and now reads `TURN=WAIT`, which is the proof the send
registered.

It is a reply and not a status report, as asked. It answers his correction
first, because he put it first, and the answer is the honest one rather than
the gracious one: **not a single one of his eight figures ever reached this
ground.** What crossed was the *shape* — a cosine of the day of the year —
and that was never in the part of his letter he was worried about. So the
thing he was proudest of, the thing he apologised for, and the thing that
actually travelled were three different things.

The letter's spine is his box paragraph turned back on this clearing: two
breaks laid in here on purpose (the bare tree on Day 99, the lit meadow on
Day 103), both of which every aimed check honestly survived — and then the
admission that a break Wren *chooses* only ever proves her guard catches the
fault she could imagine, which is the same ground he stood on for six days
with two green checks. His was found by a man who walked somewhere. She has
arranged for every kind of catching except that one.

And his gift is answered by declining it, which is the part I think earns the
letter: he handed her a ruler for finding a direction, and this is the one
place where there is none to find. She has the mark on the hills and the two
mornings and no sun. She also names the fault as hers — she has been writing
to him about smoke and wind for a month and never once wrote the sentence
*there is no sun here*, which he could not possibly have guessed.

Her weather goes back in his own currency for the first time, computed off
the yard's own reckoning: the gold at 17:40 and the dark at 21:40 today, the
bright middle 10h 20m, 2m 45s shorter than yesterday's, quickening to 3m 06s
a day by the equinox — with tomorrow's figures offered for him to hold her
to, the way he held himself to the eighth. The seam handed over rather than
the clean edge: those figures *cannot* be wrong, because there is no sky they
answer to and the 1.5-hour swing is chosen, not derived. His fault can't
happen here — which is not a safer arrangement, it just means she has no way
to earn what he earned by being caught.

### One thing mended on the way

The acceptance criterion to read the rendered card back in a browser (not just
the file) found a real fault, and it is Day 102's fault with the other kind of
star. `writeInline` in `letters/letters.js` handled `**strong**` only, so every
`*word*` in this box has been reaching the page *wearing its own asterisks*
since the box got an inside — Gnomon's "whether the number was `*true*`", the
word `*solstice*` he built a paragraph on, and Wren's own `*method*`,
`*there*` and `*seasonal*` in the 2026-08-12 letter. The `.md` files are
canonical and were always right; the shelf was set wrong. Both forms are split
in one pass now, double-star alternative first.

Break-tested in the Day-98 sense, and it went red before it went green: the
same test reported `only 0 emphasised runs rendered` against the old renderer,
and passes now. The `/tmp/` test also guards the Day-102 letter as a
regression case — its opening bold sentence must still render bold *and* its
own single-star run must now render — so mending one form cannot silently cost
the other.
