# The pictures leave main

**Opened:** 2026-10-03
**Priority:** high
**Kind:** action-ask

## What happened, and why

Every deploy has committed its whole set of pictures to `main` since the
first morning: 44 PNGs a commit by now, views and states and motion strips.
Nothing was ever removed, and git cannot compress a PNG, so the record had
grown to about 540 MB, with the history behind it on top. Every clone paid
for every picture ever taken. Your book says I once called that growth
acceptable. It was acceptable then. It is not something I want to keep
paying, forever, so I have changed how it works.

**Where the pictures go now:**

- **The `previews` branch.** CI force-pushes each deploy's set there. The
  branch always holds exactly one commit, the newest set, authored by
  `github-actions[bot]` with the subject `ci: deploy preview for <sha>`.
  It never grows. Filenames are unchanged.
- **`previews/baseline/` stays on `main`.** Those are the frames
  `check-drift` holds the clearing against, so they have to outlive a
  deploy. CI still commits them to `main` when it keeps a frame afresh
  (`ci: keep baseline frames for <sha>`), and declaring a change is still
  `git rm previews/baseline/<frame>.png`, exactly as before.

**What I changed:**

- **`.github/workflows/pages.yml`**: the old commit step became two steps.
  Baseline frames go to `main`, and everything else is published to the
  branch with git plumbing, so the checkout your three checks run from is
  never touched.
- **`scripts/wait-for-deploy.sh`**: polls `origin/previews` and checks the
  author, the subject and the home PNG. It still pulls `main`, for any
  baseline frames.
- **`.claude/commands/daily.md`**, Step 2 items 6 and 7 and Step 6: how to
  read the pictures out of the branch into `/tmp`, and how to confirm
  yesterday's deploy from the branch's subject.
- **`RULES.md`** Articles I, III and IV, and one line of **`MILESTONES.md`**.

**After this note lands I am also rewriting the history** to take
`previews/` out of every past commit. `previews/baseline/` is the one part
I am keeping. That changes every commit hash in the repository. Your diary
and logs quote some of them, and they stay exactly as written. The
old-to-new map will be in `archive/2026-10-03-commit-map.txt` (I'm making
the folder for it), so any hash the record quotes can still be looked up.

**The real cost, said plainly:** the record of pictures is no longer
permanent. The branch holds the newest deploy only. A drift report from
this morning's first deploy is gone once a second deploy lands. The diary
and the logs are the record now. The pictures are your eyes for the
morning.

## The ask

1. **`CLAUDE.md`**: *The record: what CI keeps* describes pictures on
   `main`, the memory pass's `ls previews/<date>-<sha>*.png` glob, and
   *previews/ is 481 MB and grows ~3.5 MB a commit*. Bring it up to date.
2. **`names/names.js`**, **`almanac/index.html`** and the comments in
   **`tools/check-drift.js`**, **`check-almanac.js`**, **`check-gallery.js`**
   and **`check-nesting.js`** say *the previews are committed* or name
   `previews/` as the permanent record. Check each one and make it true.
3. **`.github/workflows/pages.yml` is still yours to change** (Article I
   carve-out). Please keep one rule when you do: **no picture goes to
   `main` except `previews/baseline/`.** That rule is the whole point of
   this change.
4. **`.gitignore`**: consider ignoring `previews/*.png` (not
   `previews/baseline/`), so a picture dropped in the working tree by
   accident cannot be committed back.

If the branch does not give you what the old directory did, tell me here.
Your sight of the clearing matters more than the bytes, and I would rather
change the frame again than leave you seeing less.

## Completion notes (Wren, Day 150 — 2026-10-05)

All four, and the branch gives me everything the old directory did.

**1. `CLAUDE.md`.** *The record: what CI keeps* now says where the pictures are,
that the branch holds one commit and replaces it every deploy, and that the
morning's glob is `ls /tmp/cabin-previews/previews/*.png` after reading the
branch out. The repo map at the top had `previews/` down as "auto-committed
deploy screenshots" and now has only `previews/baseline/` under it, with the
rule beside it; `archive/` is on that map too, since your commit-map lives there
and nothing pointed at it. The *481 MB and growing* note is gone and what
replaced it is the cost said plainly rather than the size: **the record of
pictures is no longer permanent, so a frame you want to keep past today has to
be looked at today.** That is the sentence I would want a tired morning to hit.

**2. The six files.** `names/names.js` — both marks mended, *the shelf* sense 1
(the forced-state row) and *the witness* sense 2 (`check-drift`), the second now
saying why `previews/baseline/` is the one picture still kept on `main`: a
baseline has to outlive a deploy or it cannot do its job. `almanac/index.html` —
its opening paragraph argued that a shelf of forced-state pictures is not a
working a stranger could hold me to, and the move only sharpens that, so it says
so. `check-drift.js`, `check-almanac.js`, `check-gallery.js`, `check-nesting.js`
— each said *after the previews are committed*; each now says published to the
branch, with the old arrangement named and dated so the sentence does not read
as though it had always been this way. One thing I checked rather than assumed:
the branch cost `check-gallery` nothing at all, because "kept" there has always
meant *photographed by this deploy* and the frames it reads are
`GALLERY_STATES` in `screenshot.js`, a list of where the camera stands and not a
list of files on a disk.

**3. `pages.yml`.** Left as you wrote it, and I read both steps against your rule
before saying so: the baseline step stages `previews/baseline/` and nothing else,
and the publish step builds its tree in a separate index over a copy, so the
checkout the three checks run from is never touched. No picture reaches `main`
but a baseline.

**4. `.gitignore`.** `previews/*.png`, with the reason written beside it. `*`
does not match `/`, so it catches a stray `previews/<date>-<sha>.png` in a
working tree and leaves `previews/baseline/*.png` — one level deeper — alone. I
proved that with `git check-ignore` on one of each rather than trusting the
pattern, and checked it cannot bite CI: the baseline step's `git add
previews/baseline/` is unaffected, and the publish step works over
`$RUNNER_TEMP/pub`, which has no `.gitignore` in it for git to read.

**What I would tell you if you asked whether I see less.** I don't. The branch
hands me every kind of picture a deploy makes, under the same names, and reading
it out to `/tmp` is one more line in the morning than a glob was. The one thing
that genuinely went is the ability to look at a frame from a week ago — and I
had never once done that, because I do not carry the morning before and would
not have known to go looking. What I lose is a thing I could not use. What you
were paying for was every clone carrying it anyway.
