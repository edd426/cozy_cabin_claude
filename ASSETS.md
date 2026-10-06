# ASSETS

A running record of every sprite source on the deployed site. Append-only — never delete a row even if the asset is removed from the cabin, since the deploy history may have used it. RULES.md Article VII binds this file.

Two kinds of rows:

1. **Vendored packs** — full asset packs Evan pulls in. One row per pack at the top of "Vendored packs" below.
2. **Composed sprites** — agent-authored recolors / crops / compositions. One row per file in `assets/composed/`. Append at the bottom of "Composed sprites" — never reorder.

---

## Vendored packs

| Pack | Source | License | Date pulled | Subset included | Notes |
|------|--------|---------|-------------|-----------------|-------|
| Cup Nooble — Sprout Lands (Basic) | https://cupnooble.itch.io/sprout-lands-asset-pack | Custom (non-commercial; no NFT or AI training; credit required) — see `assets/vendor/sprout-lands/LICENSE.txt` and the pack's bundled `read_me.txt` | 2026-05-08 | Full Basic pack (free): Characters, Objects, Tilesets, Sprout Lands color palette | Closest pack to Stardew aesthetic. The `_underscored` and ` spaced` filename pairs in the zip are duplicates the agent should not commit both of — pick one and stick with it. |

## Composed sprites

| File (in `assets/composed/`) | Source pack(s) | Source file(s) | What I did | Date | Day |
|------------------------------|----------------|----------------|------------|------|-----|
| *(empty — first agent: be the first to add one)* | | | | | |

## Sound

The founder's 2026-09-23 mission asks for at least one thing a visitor can
touch that makes a sound, and puts a licence condition on it: make the sounds
yourself with the Web Audio API if you can, "so nothing needs a licence"; if
you vendor a file it must be CC0 or equivalent and get its row here like any
sprite. Nothing has been vendored, and this row exists so that stays checkable.

| What | Source | License | Date | Day |
|------|--------|---------|------|-----|
| The hearth's crack, heard when the fire is prodded at `/inside/` | Drawn from scratch — synthesised at run time by `sound.js` out of a half-second of white noise made in memory, shaped by biquad filters and gain envelopes. No recording, no file, no network fetch, nothing vendored. | n/a — nothing to license. Authored here; see `diary/2026-09-25.md`. | 2026-09-25 | 140 |
| The porch lantern's latch, heard when the lamp by the door is lit or put out at `/around/` | Drawn from scratch — synthesised at run time by `sound.js` from the same in-memory white noise the hearth's crack is cut from, shaped by two biquad bandpass ticks under gain envelopes. No recording, no file, no network fetch, nothing vendored. | n/a — nothing to license. Authored here; see `diary/2026-09-26.md`. | 2026-09-26 | 141 |
| The knock of a path stone turned over and set back down, heard at `/` and `/around/` | Drawn from scratch — synthesised at run time by `sound.js` from the same in-memory white noise the other two are cut from: one lowpass thud for the stone and one quiet bandpass whisper for the grit falling back after it. No recording, no file, no network fetch, nothing vendored. | n/a — nothing to license. Authored here; see `diary/2026-09-29.md`. | 2026-09-29 | 144 |
| The creak of the bench taking a weight, heard at `/` | Drawn from scratch — synthesised at run time by `sound.js` from the same in-memory white noise the other three are cut from: one soft lowpass body for the board bending, under a run of eleven to fourteen tiny high-Q bandpass slips whose rate and pitch climb together, which is what stick-slip friction physically is. No recording, no file, no network fetch, nothing vendored. | n/a — nothing to license. Authored here; see `diary/2026-09-30.md`. | 2026-09-30 | 145 |
| The bee's buzz, heard at `/` when the wildflower bed is brushed and she bolts off it | Drawn from scratch — synthesised at run time by `sound.js`, and the one sound here NOT cut from the in-memory white noise the other four share: two sawtooth oscillators seven hertz apart, their pitch ramped up and back under a lowpass and a gain envelope, because a wingbeat is a pitch where a crack, a latch, a knock and a creak are all broadband releases. No recording, no file, no network fetch, nothing vendored. | n/a — nothing to license. Authored here; see `diary/2026-10-01.md`. | 2026-10-01 | 146 |
| The rustle of the cloak brushed on its peg, heard at `/inside/` | Drawn from scratch — synthesised at run time by `sound.js` from the same in-memory white noise four of the five before it are cut from, but through a shaper of its own: five overlapping swells with no attack at either end, built on the file's first highpass, in two breaths a third of a second apart for the cloth going out and coming back. The others are events and this is friction, which has no moment in it to point at, so the envelope is the whole difference. No recording, no file, no network fetch, nothing vendored. | n/a — nothing to license. Authored here; see `diary/2026-10-02.md`. | 2026-10-02 | 147 |
| The skein's honk, heard at `/` when the geese crossing the sky are startled out of their formation | Drawn from scratch — synthesised at run time by `sound.js` through a shaper of its own, the file's first with a source AND a resonator: three sawtooth calls at three pitches, each driven through a *peaking* formant whose centre moves while the call sounds (a throat opening and shutting, which is what separates an animal from an organ stop) and then through a lowpass for the distance, with one short slice of the shared in-memory white noise as the breath under the nearest bird. The first sound here that is both noise and tone at once, because a voice is turbulent air driving something that vibrates. No recording, no file, no network fetch, nothing vendored. | n/a — nothing to license. Authored here; see `diary/2026-10-03.md`. | 2026-10-03 | 148 |
| The ring of the glass tumbler on the windowsill, heard at `/inside/` when it is tapped | Drawn from scratch — synthesised at run time by `sound.js` through a shaper of its own, the file's first with no attack in its envelope: three pure sine modes of one small hard hollow thing (the body near 1180Hz and two thinner ones at about 2.71 and 5.18 times it, inharmonic because a shell does not divide its length into halves and thirds the way a string does, which is what tells the ear *glass* rather than *flute*), each decaying from the instant of the strike at its own rate, with one twelve-millisecond slice of the shared in-memory white noise as the strike itself. A struck body is given all its energy at once and spends the rest of its life giving it back, so a decay is the only number in it. The first sound here that is a note, and the first that goes on sounding after the thing that made it has gone still. No recording, no file, no network fetch, nothing vendored. | n/a — nothing to license. Authored here; see `diary/2026-10-05.md`. | 2026-10-05 | 150 |
| The clack of the armful's top log knocked out of its valley, heard at `/inside/` | Drawn from scratch — synthesised at run time by `sound.js` from the same in-memory white noise most of the others are cut from, and the first in five days that needed no new shaper, because wood letting go of wood is a release and `burst()` was cut for releases on Day 140: one soft lowpass body for the palm meeting the bark, then three landings, each a short bright bandpass contact over a broader bandpass body near 400Hz that is damped out in a few hundredths of a second. Wood is the middle term between the path stone, which has no ring in it at all, and the tumbler, which is almost nothing else; and the three landings fall away at three fifths each, which is the decay the drawing of the log runs out of pixels to hold after its second bounce. No recording, no file, no network fetch, nothing vendored. | n/a — nothing to license. Authored here; see `diary/2026-10-06.md`. | 2026-10-06 | 151 |
