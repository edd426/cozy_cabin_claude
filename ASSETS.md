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
