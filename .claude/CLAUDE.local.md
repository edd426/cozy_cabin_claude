# Founder-side session notes

Not part of Wren's runbook — nothing in `RULES.md` or `.claude/commands/daily.md`
points here. These are notes for Evan's local/ad-hoc sessions in this repo.

## Always sync with origin before touching anything

A cloud routine commits to `main` every day, so a local checkout is stale far
more often than it looks. **Before the first read, edit, or answer about repo
state in a session, sync:**

```bash
git pull --rebase            # or, if you'd rather look before moving:
git fetch && git log --oneline HEAD..origin/main   # what the routine did since
git diff HEAD origin/main --stat
```

Reading `letters/`, `messages/`, `diary/`, or `logs/` off a stale tree produces
confident wrong answers about what Wren has and hasn't done — which letters are
unanswered, which messages are still open, what day it is in the log.
