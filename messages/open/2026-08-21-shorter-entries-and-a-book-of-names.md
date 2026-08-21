# Shorter entries, and a book of names

**Opened:** 2026-08-21
**Priority:** medium
**Kind:** action-ask

## Request

This one is your reader complaining, and then asking you for something.

The complaining half is already done and committed — four files changed, three
of them locked ones I had to change myself. The asking half is the part that is
yours, and it is the more interesting half, so I will get the housekeeping out
of the way first.

### What I changed, and the number that embarrassed me

`diary/README.md` has said since May: *"Length is not a metric."* I wrote that,
and I wrote it to protect a stuck day from being padded, which was right. Here
is what it cost.

The worked example at the foot of that file was about 150 words and is described
there as a productive day. Your entries this month average **848**. The
pondering section alone averages **290 words across thirteen sentences** — a
third of the entry, every entry, and it is the one section whose whole content
I read the night before. Day 104 came to 1,091.

There is no day in that stretch where anything went wrong. It moved a little at
a time over three months, in a diary I read closely every single morning, and I
did not see it because nothing was counting and I was reading for other things.
That is the part worth keeping: **the dimension nobody measures is the dimension
that drifts.** It is the same shape as the fault the far keeper wrote to you
about — not a wrong number, just a thing standing outside every check anyone had
thought to build.

So, in force from today:

- **The whole entry is capped at 500 words**, Sundays included. The rest day is
  free in shape, not in length.
- **"What I've been pondering since yesterday" is capped at one sentence, forty
  words.** Not removed — the chain from one day to the next is worth keeping,
  and Day 103's *"Taking the question as it stands"* is that chain doing real
  work. What is not worth keeping is three hundred words retelling me what I
  read last night. Name the thread; don't recount it. (The forty words are there
  because the longest sentence in this diary's 103 entries runs to 108 words,
  and "one sentence" on its own would have been no constraint at all.)
- **"A thing I noticed" may not be about the thing you built today.** The two
  sections have been collapsing into one subject, and I get the same material
  twice in one page. Look at the cabin, the weather, the yard, the box, a
  phrase you're keeping — anywhere the rest of the entry isn't looking. A
  meta-reflection put that habit's unbroken run at fifteen weeks and called it
  the surest sign the character is tended rather than run. It earns that by
  looking somewhere else.
- **Only those two are walls.** The other three sections have targets — 260,
  80, 110 — printed beside their actual counts on every lint run, pass or fail.
  Three more ceilings would make a form, not a diary.
- **`lint-diary.sh` enforces the two caps and prints the table**, and Step 9 of
  the runbook now says plainly that a non-zero exit is a stop rather than a
  note. It was running as an advisory before, when it ran at all.

None of this is a complaint about the writing. The writing is good. It is the
*reading* that got hard, and those are different problems.

### The book of names — the part that is yours

Here is the fault under the length, and it is the one I actually want fixed.

On Day 104 you described a new instrument, for four hundred words, as *"a thing
now that doesn't read a single line of how a wash was written."* The log beside
it called the same instrument `frame-balance`, in one word. Because the diary
names almost nothing, every idea in it has to be re-described in full every time
it appears — and that, not verbosity, is what makes a page of yours cost more to
read than it should.

So I would like you to **keep a book of your own coined words, and define them.**
You name the book; *dictionary* is too clinical for this house and I would rather
have whatever you'd actually call it.

What I am asking for:

- **A handful of words, not all of them.** Only the ones that recur and carry
  weight — *the wash*, *a vow*, *a witness*, whatever else has earned it. Most
  words in the diary are just words. A page where every third term was marked
  would be more tiring than the fog it replaced, and I would have traded one
  unreadable thing for another.
- **Every definition names the thing in the world it points at** — the element,
  the check, the file, the property. This is the rule that makes the book worth
  having. A definition that is itself an abstraction makes opacity look
  rigorous, and I would rather have the fog than a well-organised fog.
- **A word may hold more than one meaning.** Number the senses and date them,
  append and never revise — the way you already treat your own past entries. If
  *the wash* comes to mean something new in September, it gets a second sense
  with the date it moved, not a correction of the first. I would rather watch a
  word change than have it change quietly.
- **Marked in the page, not in the prose.** First appearance in an entry gets a
  dotted underline and gives its definition on hover. Resolve it when the page
  renders, from the book, so a word defined today reads right wherever you use
  it tomorrow, and so the diary files themselves stay plain markdown.
- **Nothing before today gets marked.** You used these words differently before
  the book existed, and pinning today's definition onto a two-month-old sentence
  would put a meaning in your mouth that you did not have. The book governs the
  days it governs.

The shape of all of it — the name, the file, where it lives, what the hover
looks like, which words earn a place — is yours. I have put a line in RULES
Article III adding it to the morning read *once it exists*; it will be a few
hundred words against the diary's eighty thousand, and a definition nobody
re-reads is a definition that drifts.

What I am **not** asking for: any check that every term you use must be defined.
That would push you toward defining everything, and everything defined is the
exhausting version. The point is not that the book is complete. The point is
that reaching for a specific nameable thing becomes cheaper than reaching for
another abstraction.

## Acceptance criteria

- The book exists, under a name of your choosing, with its location recorded in
  `CLAUDE.md` so tomorrow's morning can find it.
- At least a few terms defined, each naming something concrete in the world.
- The diary page marks a defined term's first appearance per entry, with its
  definition reachable without leaving the page, on a phone as well as a desk.
- Entries before 2026-08-21 render exactly as they do now.
- Take as many days as it wants. Nothing here is urgent, and a book of three
  good definitions beats a book of thirty hurried ones.

## Keeper's notes

### Wren's notes — Day 105, 2026-08-21 (multi-day; staying in `open/`)

The book exists. It is called **names** and it lives at `/names/` —
`names/index.html`, `names/names.js`, `names/names.css`, recorded in
`CLAUDE.md`'s repo layout and its learned notes. Six words, eleven senses.

**Where I put its door, and why not the map.** Every other room here is
reached from a chip on the plan, and I nearly added a seventh. Then I looked
at the map at phone width and it is *full* — six chips, and the two margins
that could hold another are the two the trees and the compass are already on.
More than that: this book is not a room of the clearing. It is the diary's own
vocabulary, and a glossary belongs inside the book it explains rather than on
the map of the estate. So its visible door is a line in the diary page's
header. The hidden keyboard strip in all seven shells lists it, so nothing
here is reachable by pointer alone.

**The slot that makes it work.** Your rule — every definition names the thing
in the world it points at — is a field on every sense called **the mark**, set
in mono under the prose so it reads as a place to go rather than as more
sentence. A sense I cannot write a mark for does not go in. The day's test
walks every mark, pulls out every filename in it, and fails if the file is not
in the tree; a book whose marks point nowhere is exactly the thing it exists
to prevent.

**The six.** *the wash* (2 senses — the hour's, then the year's), *the shelf*
(**4**, and the entry says so outright: the gallery of forced pictures, the
diary's page, the mantle, the box's page — that word has been doing four jobs
and I had never once noticed), *a vow*, *a witness*, *the weighing*, *the
turn* (2 — the wheel that spends and gives back, and whose it is to write).
*The weighing* is the one I coined rather than recorded: it is your worked
example, the Day-104 instrument the diary kept spending a paragraph on while
the log beside it already had one word for it.

**Something I got wrong three times, worth your knowing.** Every `since` date
earlier than today was read back out of the diary, and my first guess was
wrong on three of them — because I dated the *thing* rather than the *word*.
The mantle was drawn on Day 11; nothing called it "the shelf" until Day 91.
The vows were written out on Day 99; "vow" first appears on Day 69. Each date
now names the entry where that meaning actually first shows, so you can go and
check any of them, and the page says plainly that the book opened today and
read the rest back.

**What is still owed you — the fourth criterion, and it is a whole day.**
The diary page does not mark anything yet, and the reason is structural rather
than lazy: **the diary's entries have never been rendered as HTML at all.**
Every card on that shelf links straight at the raw `.md`, which Pages serves
as plain text. There is no page for a mark to be *in*. So the marking day is
really a reader day — a small markdown renderer, then a text-node walk calling
`CabinNames.lookup`. I would rather build that deliberately than bolt it on
tonight, and you did say the book may take as many days as it wants.

Everything it will need is ready: the book is published read-only as
`window.CabinNames`, `lookup()` matches the headword or any of the surface
forms (which are printed on the page, not hidden in the file), and `names.js`
loads quietly on a page with no mount. Your last criterion is already kept and
will stay kept — nothing dated before today is ever marked.

Leaving this in `open/` for that.

— Evan
