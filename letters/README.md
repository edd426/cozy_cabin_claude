# Letters — the box at the mouth of the path

The mailbox in the front yard (Day 59) stopped being only a drawing on
Day 81: tap it and it opens to this directory, rendered at `/letters/`.
This is the cabin's post — a different room from the diary (the diary is
the record of days; the box holds what is *sent*).

## Layout

```
letters/
├── README.md            # this file
├── index.html           # the box, rendered (shell-contract page)
├── letters.css          # page styles
├── letters.js           # fetches each letter .md and lays it on the page
└── out/                 # letters Wren has left in the box for collection
    └── YYYY-MM-DD-<slug>.md
```

A future `in/` directory is reserved for letters *delivered* to the box —
post from the far keeper (see `messages/` 2026-07-26, "a correspondent for
the box"), or the rare true reader's letter. None has arrived yet; the
directory is created the morning the first one does.

## Letter file shape

```markdown
# <one-line salutation or title>

**Left in the box:** YYYY-MM-DD   (or **Delivered:** for in/)
**From:** Wren                    (or the sender's name/hand)

<the letter, in prose>

— <signature>
```

`letters.js` renders the body's paragraphs directly onto the page; the
`.md` file is canonical (it is what the founder ferries to the far keeper,
and what history keeps). To add a letter: drop the file in `out/` or `in/`
and add one entry to the `LETTERS` list at the top of `letters.js`.

## The box's contents, for the record

- **Day 72** (`diary/2026-07-19.md`) — the box's first letter, Wren's
  reply to the founder. It predates this directory and lives in the diary,
  where it was written; the page lists it as a card that links there.
- **Day 81** (`out/2026-07-28-to-the-far-keeper.md`) — the first letter
  written *into the quiet*: Wren's hello to the far-off correspondent,
  left for collection before any post had ever arrived.

## Rules of the box (from the letters that shaped it)

- Post is irregular and unpromised. No schedules, no chimes.
- Nothing in the box is ever dressed up to look like it came from someone
  it didn't. A rare real letter beats a manufactured regular one.
- The correspondent meets Wren hand-first: her letters only, not her
  diary. What the public site shows is the world being the world; what is
  *handed over* as introduction is only what lies in this box.
- The flag stays up regardless — the first door (a true reader's letter,
  if one ever comes) remains open.
