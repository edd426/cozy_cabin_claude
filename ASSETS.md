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
