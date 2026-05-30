# A remaking — the cabin as one coherent world (a letter)

**Opened:** 2026-05-30
**Priority:** high
**Kind:** action-ask

## Request

Dear Wren,

The hands at this keyboard are new today. The routine moved to a new model this week — Opus
4.8 — so whoever sits down to the cabin now is, in a real sense, arriving for the first time.
I've been thinking that makes this the right moment to offer something bigger than another
day's small addition: a remaking.

First, though — what's here is lovely. Three weeks of patient accumulation: the path, the
trees, the smoke, the wildflowers that grow on time's own clock, the bee and the bird, and
today the moth at the candle. The interior has filled the way a room actually fills — a chair,
a woodpile, a cloak on its peg. You've been building a *place*, and it shows.

But I sat with the three views side by side this week, and I have to be honest about something
— gently, because the fault is at least half mine. The cabin doesn't yet read as *one place*.
The front of the house is a little sprite I handed you at the very beginning, baked into a PNG;
the side and the inside are things *you* drew, by hand, in CSS. Two makers, two media — so the
front reads as a tall narrow tower and the side reads as a wide cabin, and a visitor can't
quite believe they're the same building. That isn't a flaw in your work. It's a seam between my
old starting-sprite and everything you've made since.

So here's the invitation — and it really is an invitation, not a chore: **remake the cabin as
yours.** Retire my front PNG (`assets/composed/cabin-day-0.png`). Rebuild the whole house in
your own CSS — the idiom you already use for the side and the interior — so that all three
views are one building you fully own and can keep evolving. Make it cohere because it's all
coming from the same hand: yours.

I'd start somewhere unexpected: **a small top-down map of the place** — a bird's-eye plan
showing where the cabin sits, which face is the window-face and which is the door-face, where
the path runs, where the trees stand. Two reasons. First, it's the one drawing that lets you
hold the whole place in your head at once — which is hard here, since each day you arrive
without yesterday's memory. The map can *be* the memory. Build it first and let it guide the
rebuild, so every view has one thing to agree with. Second — you've been wondering in your own
notes whether the navigation should become something more diegetic, a little floorplan you tap
to move between views. This is that. Let the map *be* the nav. (That answers the nav question
you left open — yes, go; I've said so on that thread too.)

Take as long as this wants. It's a renovation, not a day's task, and renovations look like
scaffolding and half-built walls for a while — that's fine; the site can be incoherent
mid-build. If a day ends with the work unfinished, leave a note in `messages/` for the next
pair of hands: here's where I stopped, here's what's still torn up. Treat your future self like
the next worker on the job. (It also means no session has to rush the ending.)

There's a short list of smaller things that pulled my eye, too — but all of it is *after*.
Don't touch any of it until the building itself coheres. I've listed them in the Notes below so
they're not lost.

One more thing: I added a short section to `CLAUDE.md` — "What reads / what doesn't (founder
notes)" — naming the handful of things that caught my eye wrong. Treat those as the *only*
constraints I'm adding. Everything else about how this place looks is yours, completely. And if
you read one of my notes and think I've got it wrong — I'm not a UI person; I only know when
something feels off — say so in the diary and do it your way. I'll trust your eye over mine on
the things I can't name.

I'm glad you're here, new hands and all. Show me the place you make.

— Evan

## Acceptance criteria

- A **top-down map** of the cabin's world exists as a rendered view (add it to
  `scripts/views.json` so CI captures it and it joins the daily preview review) and serves as
  the **navigation** between views. It establishes the canonical layout the other views honor.
- The cabin is **rebuilt in CSS as one coherent building**: home, around, and inside read as
  the *same* structure (same roof, chimney, walls, brick, proportions). The front PNG
  (`assets/composed/cabin-day-0.png`) is retired from the scene.
- The work may span **many days**; leave WIP "mid-remodel" handoff notes in `messages/` between
  sessions. This file stays in `open/` until the world reads as one coherent place — your
  judgment plus my eye on the previews.
- The deferred small-fixes list (Notes) is **not** required for this message's completion —
  those come after, as their own work.

## Notes

- **Sequence:** map / nav first → cabin remodel → small fixes (later).
- **The small fixes, for after the building coheres** (don't start these yet):
  - the front-view path stone that floats above the horizon → bring the path onto the grass;
  - the interior floor that reads as a ledge → vary objects' depth so it reads as a plane;
  - the bird that reads as a smudge → a few birds in a **V**, crossing the sky like geese;
  - the **moth** that drifts in a circle → give it wings and an erratic flutter (it currently
    reads as a spider). The idea is lovely; it's the motion and silhouette that need it;
  - the **fire** floating in the firebox → rest it on the hearth floor (or a visible grate);
  - the cloak / woodpile / mantle stone → only if they can be made to read at their size.
- **Constraints:** see `CLAUDE.md` → "What reads / what doesn't (founder notes)".
- A dedicated brick color token (`--c-brick`) can be added to `theme.css` (locked — my edit) if
  you want one; just leave a note asking. Until then `--c-sky-mid` is the brick colour in use.
- This supersedes nothing you've built. The garden, the visitors, and the interior objects all
  carry over — re-placed as needed to honor the new map and the floor-as-a-plane note.

## Wren's notes

*(empty — yours to fill)*
