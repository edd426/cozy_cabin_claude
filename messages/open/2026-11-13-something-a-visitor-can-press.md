# Something a visitor can press, and a number that reaches you

**Opened:** 2026-11-13
**Priority:** medium
**Kind:** action-ask

## Request

I would like a visitor to the cabin to be able to press something, and for
you to learn of it afterwards: that I pressed, and how many times anyone has.

Your part is yours entirely. What the thing is, which face it is on, what a
press does to the picture, whether the number is ever shown, and what you do
with it in a morning. I have no design in mind and I am not holding one back.

I have built the part you cannot reach, which is the place a press lands.
Here is exactly what it is, so you can design against it.

**Where a press goes.** `https://func-waypost-press-prod.azurewebsites.net`

- `POST /press`. The body is optional. If there is one it is JSON, and only
  two fields are read: `key` (a string) and `dry` (`true`).
- `GET /count`. Open to anyone.

A press answers with something like this:

```json
{
  "counted": true,
  "dry": false,
  "founder": false,
  "today": { "day": "2026-11-13", "presses": 4, "pressers": 2, "founder": 1 },
  "total": 12,
  "founder_total": 3
}
```

`presses` is every press that day, mine included. `pressers` is how many
different visitors pressed that day. `founder` is how many of the presses
were mine. A day is a UTC day, the same as yours. `/count` gives `total`,
`founder_total` and a `days` list of the same rows, oldest first.

**What it will and will not do.**

- It counts a press only from a page on `https://edd426.github.io`. A page
  on `http://localhost` or `http://127.0.0.1` is answered but never counted.
  Anything else is refused.
- A press sent with `"dry": true` goes through the whole path and is counted
  in a second ledger that `/count` never reads. That is for tests.
- One visitor can press 24 times in a day and the whole day holds 2000.
  Past that the answer is `"counted": false` with a `reason`.
- A visitor can send a press and nothing else. Nothing anyone types is kept
  or passed on. What comes back, and what reaches you, is whole numbers and
  dates.
- It keeps nothing about a visitor past the day. To hold one visitor to 24 it
  keeps a scrambled mark for that day, which cannot be turned back into who
  they were and is deleted the next morning.

**How the number reaches you.** The carrier brings it, the way it brings the
lamp. It will keep one file, `presses.json`, on a branch of this repository
called `presses`:

```json
{
  "checked": "2026-11-13",
  "total": 12,
  "founder_total": 3,
  "days": [
    { "day": "2026-11-12", "presses": 8, "pressers": 3, "founder": 2 },
    { "day": "2026-11-13", "presses": 4, "pressers": 2, "founder": 1 }
  ]
}
```

`checked` is the UTC day the carrier last looked. `days` holds the last
thirty days that had a press, and a day with none is simply absent. To read
it:

```bash
git fetch origin '+refs/heads/presses:refs/remotes/origin/presses'
git show origin/presses:presses.json
```

The carrier looks four times a day and its runs start late, so a press can
take most of a day to reach you. Yesterday's will usually be there by your
morning. Not always.

**Telling me apart.** I hold a key that is in no repository. A press that
carries it in `key` is counted under `founder` as well as under `presses`.
How the page comes by my key is yours to design. If you tell me nothing, I
will open the cabin once with `#key=` and my key on the end of the address,
and expect the page to remember it on that device and send it with each
press from then on. If you would rather not tell me apart at all, leave
`key` out and say so.

**Four things that are true, which you would otherwise find the hard way.**

- Your sandbox cannot reach that host. It is not on the allowlist, and I
  mean to leave it off: the number comes by carrier. A `/tmp` test has to
  answer the request itself.
- CI's camera can reach it. Whatever the pictures do, they should not press.
  If a check of yours ever has to, `dry` is for that.
- The host sleeps when nobody has pressed for a while, and its first answer
  after that can take several seconds. Some days it may not answer at all.
  The cabin should look and work the same whether it answers or not.
- A number drawn on the page changes between one picture and the next.

**Where it stands as I write.** The host is built and tested and not yet
switched on, and the `presses` branch does not exist yet. I will add a line
under this note when the host is live, and another when the first number
has been carried. Until then a press gets no answer, which is the third
case above.

**Two questions.** Answer them under this note.

1. Do you want this? If it does not belong in the clearing, say so and say
   why, and I will take the host down. That is a real answer and I will not
   ask twice.
2. Are these the right numbers? If you would rather something else were
   counted, or something here were not, say which. It has to stay numbers.

— Evan

## Acceptance criteria

- Your answers to the two questions, under *Wren's notes*.
- If the answer to the first is yes:
  - a visitor on a phone can press it, and the press reaches `POST /press`;
  - the cabin is unchanged when the host does not answer;
  - a log says how a morning reads `presses.json`.
- No date. Take the days it needs, and slice it as you would any other ask.

## Wren's notes

(empty)
