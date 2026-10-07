#!/usr/bin/env node
/* tools/ci-verdict.js — agent-mutable.
 *
 * Day 152 (2026-10-07). Tells the morning whether its own run went red.
 *
 * scripts/wait-for-deploy.sh (locked) returns as soon as this deploy's
 * pictures reach the `previews` branch. The pictures are published BEFORE the
 * checkers run, deliberately — a red check must never cost the record its
 * pictures — so the poll comes back green a minute or more before the run can
 * know its own verdict. On 2026-10-02 and again on 2026-10-06 the writeup went
 * out on a main that had just gone red, and the morning that pushed it never
 * heard (messages/open/2026-10-06-the-bed-that-drew-itself-twice.md).
 *
 * So the screenshot job now ends, whatever happened, by stamping
 * `previews/<sha>-verdict.txt` onto the same single commit the pictures live
 * in: GREEN or RED, one line per check, and the failing lines of any check
 * that broke. This reads it. Run it straight after wait-for-deploy.sh, on
 * every push, and paste what it prints into the log beside that output.
 *
 * Usage: node tools/ci-verdict.js [sha]       (default: HEAD's short sha)
 *   CI_VERDICT_TIMEOUT=seconds (default 480)
 * Exit 0 — GREEN.  Exit 1 — RED.  Exit 2 — no verdict before the deadline
 * (the job died, was cancelled, or never ran): treat that as red until a
 * person has looked, never as green.
 */
'use strict';

const { execFileSync } = require('child_process');

const git = (...args) => execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
const tryGit = (...args) => { try { return git(...args); } catch (e) { return null; } };

const sha = process.argv[2] || git('rev-parse', '--short', 'HEAD');
const timeout = Number(process.env.CI_VERDICT_TIMEOUT || 480);
const file = `previews/${sha}-verdict.txt`;
const deadline = Date.now() + timeout * 1000;

console.log(`ci-verdict: waiting for ${file} on origin/previews (deadline ${timeout}s)`);
(function poll() {
  tryGit('fetch', '--quiet', 'origin', '+refs/heads/previews:refs/remotes/origin/previews');
  const subject = tryGit('log', '-1', '--format=%s', 'origin/previews');
  const text = subject === `ci: deploy preview for ${sha}` ? tryGit('show', `origin/previews:${file}`) : null;
  if (text) {
    process.stdout.write(text.endsWith('\n') ? text : text + '\n');
    const green = /^VERDICT: GREEN\b/m.test(text);
    console.log(`ci-verdict: ${green ? 'GREEN' : 'RED'} for ${sha}`);
    process.exit(green ? 0 : 1);
  }
  const left = Math.round((deadline - Date.now()) / 1000);
  if (left <= 0) {
    console.log(`ci-verdict: NO VERDICT for ${sha} — the job never stamped one ` +
                `(previews branch names: ${subject || 'nothing'}). Treat as red until looked at.`);
    process.exit(2);
  }
  console.log(`ci-verdict: not yet; ${left}s remaining`);
  setTimeout(poll, 20000);
})();
