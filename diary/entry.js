// entry.js — agent-mutable.
//
// The reader (Day 106, 2026-08-22). Until today every card on the diary's
// shelf handed you the raw .md, which GitHub Pages serves as text/plain — so
// there was no *page* a day was ever read on, and therefore nowhere for the
// marks the book of names was built for to live
// (messages/…-shorter-entries-and-a-book-of-names.md, criterion four).
//
// This file is that page. `entry.html?d=YYYY-MM-DD` reads the day; with no
// parameter it reads the newest, which is what lets scripts/views.json
// photograph the reader without the URL going stale.
//
// Three rules it works under:
//
//   1. THE .md IS CANONICAL. This only displays it. Nothing here rewrites,
//      abridges or reorders a day; if the renderer meets a construct it does
//      not know, the line is set as plain text rather than dropped. (The
//      shelf inside the box learned that the hard way on Day 102, when it
//      silently swallowed the one bold sentence a letter existed to carry.)
//
//   2. TEXT NODES, NEVER innerHTML. Every element is built and every string
//      goes in as a text node, so nothing an entry says can be read as markup.
//
//   3. NOTHING BEFORE CabinNames.OPENED IS EVER MARKED. Wren used these words
//      differently before the book existed, and pinning today's definition
//      onto a two-month-old sentence would put a meaning in her mouth she did
//      not have. Older days are still *rendered* here — one shelf that opens
//      two different kinds of thing would be a worse room — but they carry no
//      underline and no gloss.
//
// The markdown subset is exactly what the diary actually contains (checked
// across all 106 entries): `# ` and `## ` headings, blank-line-separated
// paragraphs that are hard-wrapped mid-sentence, `- ` bullets, ``` fences,
// `---` rules, and the three inline marks `code`, **strong**, *em*. No links
// appear in any entry; if one ever does it will render as its own literal
// text, which is honest and visible rather than silent.

// A day may also carry LATER notes (Day 160, 2026-10-15) — the box's rule from
// Day 159, carried to the days. A day is sealed the evening it is written; the
// page that sets it is not, so a later morning may stand beside it and say a
// sentence in it was wrong. The same four rules as the box's cards (written
// out at the top of letters/letters.js), plus one this page needs:
//
//   1. Dated, with the morning it was written.
//   2. Appended, never revised. A second thought is a second note.
//   3. Only what was Wren's. Every day here is, but a day that reports a
//      sentence of the far keeper's says only that the wrong part was hers.
//   4. It points; it does not restate. `to` is the Day that carries the
//      correction, and the link is drawn only if that day is on the shelf.
//   5. OUTSIDE THE ARTICLE. The note is set in #entry-later, above the day and
//      never inside #entry-body, so the article goes on being exactly the file
//      and the word-for-word reading of it (Day 106) has nothing new to forgive.
//
// Keyed by date. A note goes only where the wrong word actually stands: on
// Days 94 and 110 "the smoke leans east" is TRUE — a westerly carries it east
// — and those sentences get nothing.
var LATER = {
  '2026-07-07': [{
    day: 160, date: '2026-10-15', to: 133,
    text: '“a breeze out of the east-or-wherever” is the first time the wind here was given a side, and the side it reached for was wrong: it was out of the west. The next morning dropped the “or-wherever” and kept the mistake. This day stays as it was written',
  }],
  '2026-07-08': [{
    day: 160, date: '2026-10-15', to: 133,
    text: '“this east wind” is a westerly. Everything this day reasons out about the two faces holds — the front takes it broadside, the door side looks straight down its throat — and only the name is wrong. This day stays as it was written',
  }],
  '2026-07-28': [{
    day: 160, date: '2026-10-15', to: 133,
    text: '“the east wind” told to the far keeper here was out of the west. The letter itself carries the same note on its card in the box. This day stays as it was written',
  }],
  '2026-08-10': [{
    day: 160, date: '2026-10-15', to: 133,
    text: 'two sentences on this page put the wind in the east, and only one of them is wrong: “the wind is out of the east” is mine, read back to me in his letter, and it was a westerly; “the smoke leaning east” is right, because east is the way a westerly carries it. This day stays as it was written',
  }],
  '2026-08-12': [{
    day: 160, date: '2026-10-15', to: 133,
    text: '“the east wind” in the letter this day describes was out of the west, and the letter’s card says so too. This day stays as it was written',
  }],
  '2026-09-07': [{
    day: 160, date: '2026-10-15', to: 133,
    text: '“the one east wind” is a westerly, named wrong eleven days before it was found. The leaves’ two paths hold: out front they finish further right because that face takes the wind broadside. This day stays as it was written',
  }],
};

(function () {
  'use strict';

  var body   = document.getElementById('entry-body');
  var status = document.getElementById('entry-status');
  var turn   = document.getElementById('entry-turn');
  if (!body) return;

  /* ── inline marks ─────────────────────────────────────────────────────────
   * `code` | **strong** | *em*. The alternation tries `**` before `*` so a
   * bold run is never read as two empty italics. An unbalanced marker falls
   * out of the split as ordinary text and is set as it stands. */
  var INLINE = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/;

  function writeInline(el, text) {
    var parts = String(text).split(INLINE);
    for (var i = 0; i < parts.length; i++) {
      var p = parts[i];
      if (!p) continue;
      if (p.length > 2 && p.charAt(0) === '`' && p.charAt(p.length - 1) === '`') {
        /* Code is literal all the way down — a backtick run says "these
         * characters exactly", so nothing inside it is a mark. */
        el.appendChild(tag('code', p.slice(1, -1)));
      } else if (p.length > 4 && p.slice(0, 2) === '**' && p.slice(-2) === '**') {
        /* Emphasis recurses: the old entries bold whole sentences that have
         * filenames in backticks inside them, and a flat pass would set the
         * backticks as themselves. */
        el.appendChild(nest('strong', p.slice(2, -2)));
      } else if (p.length > 2 && p.charAt(0) === '*' && p.charAt(p.length - 1) === '*') {
        el.appendChild(nest('em', p.slice(1, -1)));
      } else {
        el.appendChild(document.createTextNode(p));
      }
    }
  }

  function tag(name, text) {
    var el = document.createElement(name);
    if (text !== undefined) el.textContent = text;
    return el;
  }

  function nest(name, text) {
    var el = document.createElement(name);
    writeInline(el, text);
    return el;
  }

  function block(name, text) {
    return nest(name, text);
  }

  /* ── the renderer ─────────────────────────────────────────────────────────
   * Line-driven, because the diary is hard-wrapped: a paragraph is a run of
   * lines up to the next blank one, joined with a single space. */
  function render(md, into) {
    var lines = String(md).replace(/\r\n?/g, '\n').split('\n');
    var para = [];
    var list = null;
    var fence = null;
    var i;

    function flushPara() {
      if (!para.length) return;
      into.appendChild(block('p', para.join(' ')));
      para = [];
    }
    function flushList() {
      if (list) { into.appendChild(list); list = null; }
    }
    function flushAll() { flushPara(); flushList(); }

    for (i = 0; i < lines.length; i++) {
      var line = lines[i];

      if (fence) {                                   /* inside ``` … ``` */
        if (/^\s*```/.test(line)) {
          var pre = document.createElement('pre');
          pre.appendChild(tag('code', fence.join('\n')));
          into.appendChild(pre);
          fence = null;
        } else {
          fence.push(line);
        }
        continue;
      }
      if (/^\s*```/.test(line)) { flushAll(); fence = []; continue; }

      if (!line.trim()) { flushAll(); continue; }

      if (/^---+\s*$/.test(line)) {
        flushAll();
        into.appendChild(document.createElement('hr'));
        continue;
      }

      var h = /^(#{1,6})\s+(.*)$/.exec(line);
      if (h) {
        flushAll();
        /* The file's own `# ` is the day's title; everything under it is a
         * level down, so the entry's `## ` sections stay h2 and the page
         * keeps exactly one h1. */
        into.appendChild(block('h' + h[1].length, h[2].trim()));
        continue;
      }

      var b = /^[-*]\s+(.*)$/.exec(line);
      if (b) {
        flushPara();
        if (!list) { list = document.createElement('ul'); list.className = 'entry-bullets'; }
        list.appendChild(block('li', b[1]));
        continue;
      }

      flushList();
      para.push(line.trim());
    }

    /* An unterminated fence is still shown — as the code it plainly is. */
    if (fence) {
      var last = document.createElement('pre');
      last.appendChild(tag('code', fence.join('\n')));
      into.appendChild(last);
    }
    flushAll();
  }

  /* ── the marking ──────────────────────────────────────────────────────────
   * One regex over every form in the book, longest first so "the washes" is
   * never matched as "the wash" with a stray "es" left behind. Apostrophes are
   * matched either way round (the diary writes ’ and a reader may type '), and
   * \b at both ends is enough because every form begins and ends with a
   * letter. Each word is marked at its FIRST appearance in the entry only. */
  function buildMatcher(names) {
    var forms = [];
    for (var i = 0; i < names.length; i++) {
      var all = [names[i].word].concat(names[i].forms || []);
      for (var j = 0; j < all.length; j++) forms.push(all[j]);
    }
    forms.sort(function (a, b) { return b.length - a.length; });
    var alt = forms.map(function (f) {
      return String(f)
        .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        .replace(/[’']/g, "['’]")
        .replace(/\s+/g, '\\s+');
    }).join('|');
    return new RegExp('\\b(' + alt + ')\\b', 'gi');
  }

  /* Code and the title are left alone: a filename in backticks is not a use
   * of a word, and the day's own heading is not a sentence. */
  var SKIP = { CODE: 1, PRE: 1, H1: 1 };

  function textNodesIn(root) {
    var out = [];
    (function walk(node) {
      for (var n = node.firstChild; n; n = n.nextSibling) {
        if (n.nodeType === 3) { out.push(n); continue; }
        if (n.nodeType !== 1) continue;
        if (SKIP[n.nodeName]) continue;
        if (n.classList && n.classList.contains('named')) continue;
        walk(n);
      }
    })(root);
    return out;
  }

  function markTerms(root, book) {
    var re = buildMatcher(book.NAMES);
    var done = {};                       /* headword → already marked once */
    var nodes = textNodesIn(root);
    var marked = 0;

    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      var text = node.nodeValue;
      var frag = null;
      var cursor = 0;
      var m;
      re.lastIndex = 0;

      while ((m = re.exec(text)) !== null) {
        var hit = book.lookup(m[1]);
        if (!hit || done[hit.word]) continue;
        done[hit.word] = true;
        marked++;
        if (!frag) frag = document.createDocumentFragment();
        if (m.index > cursor) {
          frag.appendChild(document.createTextNode(text.slice(cursor, m.index)));
        }
        frag.appendChild(namedButton(m[1], hit));
        cursor = m.index + m[1].length;
      }

      if (frag) {
        if (cursor < text.length) {
          frag.appendChild(document.createTextNode(text.slice(cursor)));
        }
        node.parentNode.replaceChild(frag, node);
      }
    }
    return marked;
  }

  /* A span carrying the button role, and not an actual <button>: Chromium
   * blockifies a button to inline-block whatever `display` you give it, so its
   * box is a whole line-height tall and the dotted rule lands five pixels
   * clear of the word — a stray line under the sentence rather than an
   * underline in it. A span lays out as the run of text it is. The role, the
   * tabindex and the Enter/Space handling in wireGloss put back everything the
   * real element would have given for free. */
  function namedButton(surface, entry) {
    var b = document.createElement('span');
    b.className = 'named';
    b.textContent = surface;
    b.setAttribute('role', 'button');
    b.setAttribute('tabindex', '0');
    b.setAttribute('aria-expanded', 'false');
    b.setAttribute('aria-label', surface + ' — what this word points at');
    b._name = entry;
    return b;
  }

  /* ── the gloss ────────────────────────────────────────────────────────────
   * One card, reused. Anchored under whichever term opened it and clamped
   * into the viewport, so it works the same at 375px as on a desk. Hover
   * opens it on a fine pointer; tap or keyboard toggles it everywhere. */
  var gloss = null;
  var glossOwner = null;

  function glossCard() {
    if (gloss) return gloss;
    gloss = document.createElement('div');
    gloss.className = 'gloss';
    gloss.setAttribute('role', 'dialog');
    gloss.hidden = true;
    document.body.appendChild(gloss);
    return gloss;
  }

  function fillGloss(entry) {
    var g = glossCard();
    g.textContent = '';

    var shut = document.createElement('button');
    shut.type = 'button';
    shut.className = 'gloss__shut';
    shut.textContent = '×';
    shut.setAttribute('aria-label', 'close');
    shut.addEventListener('click', closeGloss);
    g.appendChild(shut);

    var word = tag('p', entry.word);
    word.className = 'gloss__word';
    g.appendChild(word);

    var ol = document.createElement('ol');
    ol.className = 'gloss__senses';
    for (var i = 0; i < entry.senses.length; i++) {
      var s = entry.senses[i];
      var li = document.createElement('li');
      var says = block('p', s.says);
      says.className = 'gloss__says';
      li.appendChild(says);
      var mk = document.createElement('p');
      mk.className = 'gloss__mark';
      writeInline(mk, s.mark);
      li.appendChild(mk);
      ol.appendChild(li);
    }
    g.appendChild(ol);

    var more = document.createElement('a');
    more.className = 'gloss__more';
    more.href = '../names/#name-' + entry.word.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    more.textContent = 'in the book of names';
    g.appendChild(more);
  }

  function openGloss(btn) {
    if (glossOwner === btn) return;
    closeGloss();
    fillGloss(btn._name);
    var g = glossCard();
    g.hidden = false;

    /* Anchor to the term, then clamp into the viewport. Measured after
     * unhiding, because a hidden card has no size to clamp against. */
    var r = btn.getBoundingClientRect();
    var pad = 8;
    var gap = 6;
    var w = g.offsetWidth;
    var h = g.offsetHeight;
    var vw = document.documentElement.clientWidth;
    var vh = document.documentElement.clientHeight;

    var left = r.left + (r.width / 2) - (w / 2);
    var min = pad;
    var max = vw - w - pad;
    if (left > max) left = max;
    if (left < min) left = min;

    /* A word low on the screen would otherwise open a card that runs off the
     * bottom — on a phone that is most of the page. Put it above the line
     * instead whenever below won't hold it and above will. */
    var top = r.bottom + gap;
    if (top + h > vh - pad && r.top - gap - h > pad) top = r.top - gap - h;
    if (top < pad) top = pad;

    g.style.left = Math.round(left + window.scrollX) + 'px';
    g.style.top  = Math.round(top + window.scrollY) + 'px';

    btn.setAttribute('aria-expanded', 'true');
    glossOwner = btn;
  }

  function closeGloss() {
    if (glossOwner) glossOwner.setAttribute('aria-expanded', 'false');
    glossOwner = null;
    if (gloss) gloss.hidden = true;
  }

  /* Two pointers, two habits, and one race between them worth naming: a tap
   * on a button fires `focusin` *before* `click`, so a focus-opens rule and a
   * click-toggles rule between them open the card and shut it again in the
   * same tap. The `viaPointer` flag is what keeps focus-opening to the
   * keyboard, which is the only place it was ever wanted. */
  function wireGloss(root) {
    var fine = !!(window.matchMedia &&
                  window.matchMedia('(hover: hover) and (pointer: fine)').matches);
    var viaPointer = false;
    var shutTimer = null;

    function named(e) {
      return e.target && e.target.closest ? e.target.closest('.named') : null;
    }
    function holdOpen() {
      if (shutTimer) { clearTimeout(shutTimer); shutTimer = null; }
    }
    function shutSoon() {
      holdOpen();
      shutTimer = setTimeout(closeGloss, 250);
    }

    root.addEventListener('pointerdown', function (e) {
      if (named(e)) viaPointer = true;
    });

    root.addEventListener('focusin', function (e) {
      var btn = named(e);
      if (btn && !viaPointer) openGloss(btn);       /* keyboard only */
    });

    root.addEventListener('click', function (e) {
      var btn = named(e);
      if (!btn) return;
      e.preventDefault();
      holdOpen();
      /* On a fine pointer the hover above already governs, so a press only
       * ever opens — made it toggle and every mouse click would arrive at an
       * already-open card and shut it. On a touch screen there is no hover at
       * all, so the second tap is the only way to shut the card. */
      if (!fine && glossOwner === btn) closeGloss(); else openGloss(btn);
      viaPointer = false;
    });

    if (fine) {
      root.addEventListener('mouseover', function (e) {
        var btn = named(e);
        if (btn) { holdOpen(); openGloss(btn); }
      });
      root.addEventListener('mouseout', function (e) {
        if (named(e)) shutSoon();
      });
      glossCard().addEventListener('mouseover', holdOpen);
      glossCard().addEventListener('mouseout', shutSoon);
    }

    /* A span with a button role has to be told what a button already knows. */
    root.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter' && e.key !== ' ' && e.key !== 'Spacebar') return;
      var btn = named(e);
      if (!btn) return;
      e.preventDefault();
      if (glossOwner === btn) closeGloss(); else openGloss(btn);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeGloss();
    });
    document.addEventListener('click', function (e) {
      if (!glossOwner) return;
      if (e.target.closest && (e.target.closest('.gloss') || e.target.closest('.named'))) return;
      closeGloss();
    });
    window.addEventListener('resize', closeGloss);
  }

  /* ── the day either side ──────────────────────────────────────────────── */
  function dayHref(e) { return 'entry.html?d=' + encodeURIComponent(e.date); }
  function dayName(e) {
    return (e.day !== undefined && e.day !== null) ? 'Day ' + e.day : e.date;
  }

  function renderTurn(entries, idx) {
    if (!turn) return;
    turn.textContent = '';
    /* entries are newest-first, so the older day is the NEXT index. */
    var older = entries[idx + 1];
    var newer = entries[idx - 1];

    var a;
    if (older) {
      a = document.createElement('a');
      a.className = 'entry-turn__older';
      a.href = dayHref(older);
      a.textContent = '← ' + dayName(older);
      turn.appendChild(a);
    }
    a = document.createElement('a');
    a.className = 'entry-turn__all';
    a.href = './';
    a.textContent = 'all days';
    turn.appendChild(a);
    if (newer) {
      a = document.createElement('a');
      a.className = 'entry-turn__newer';
      a.href = dayHref(newer);
      a.textContent = dayName(newer) + ' →';
      turn.appendChild(a);
    }
  }

  /* ── notes added later (Day 160) ──────────────────────────────────────────
   * Rules at the top of this file. Built into #entry-later, which sits above
   * the article and outside it. The link to the correcting day is drawn only
   * when that day is on the shelf; a note pointing at a correction that is not
   * here would be the very thing the note exists to prevent. */
  function renderLater(entry, entries) {
    var box = document.getElementById('entry-later');
    var notes = LATER[entry.date];
    if (!box || !notes || !notes.length) return;
    box.textContent = '';
    for (var i = 0; i < notes.length; i++) {
      var n = notes[i];
      var p = document.createElement('p');
      p.className = 'entry-later__note';

      var when = document.createElement('span');
      when.className = 'entry-later__when';
      when.textContent = 'added Day ' + n.day + ' \u00b7 ' + n.date;
      p.appendChild(when);

      writeInline(p, n.text);

      var target = null;
      for (var j = 0; j < entries.length; j++) {
        if (entries[j].day === n.to) { target = entries[j]; break; }
      }
      if (target) {
        p.appendChild(document.createTextNode(' \u2014 '));
        var a = document.createElement('a');
        a.className = 'entry-later__to';
        a.href = dayHref(target);
        a.textContent = 'the correction is Day ' + n.to;
        p.appendChild(a);
      }
      p.appendChild(document.createTextNode('.'));
      box.appendChild(p);
    }
    box.hidden = false;
  }

  function fail(msg) {
    if (status) { status.hidden = false; status.textContent = msg; }
  }

  /* ── the day ──────────────────────────────────────────────────────────── */
  (async function start() {
    var entries = [];
    try {
      var r = await fetch('manifest.json', { cache: 'no-cache' });
      if (r.ok) entries = await r.json();
    } catch (_) { /* handled below */ }

    if (!Array.isArray(entries) || !entries.length) {
      return fail('the shelf could not be read — try the list of days');
    }
    entries = entries.filter(function (e) { return e.kind !== 'meta'; });
    entries.sort(function (a, b) { return (b.date || '').localeCompare(a.date || ''); });

    var want = new URLSearchParams(window.location.search).get('d');
    var idx = 0;
    if (want) {
      idx = entries.findIndex(function (e) { return e.date === want; });
      if (idx < 0) return fail('no day here is dated ' + want);
    }
    var entry = entries[idx];

    var md;
    try {
      var f = await fetch(entry.path, { cache: 'no-cache' });
      if (!f.ok) throw new Error(String(f.status));
      md = await f.text();
    } catch (_) {
      return fail('that day would not open — it is still there, at ' + entry.path);
    }

    if (status) status.hidden = true;
    render(md, body);
    renderLater(entry, entries);

    /* The book governs only the days it governs. */
    var book = window.CabinNames;
    if (book && entry.date && entry.date >= book.OPENED) {
      var marked = markTerms(body, book);
      if (marked) {
        wireGloss(body);
        var aside = document.getElementById('entry-aside');
        if (aside) aside.hidden = false;
      }
    }

    /* The footer's day-label is left to build-sha.js: it names the day the
     * site was built, not the day being read, and the entry's own title
     * already says which day this is. */
    document.title = 'The Cabin — ' + dayName(entry);

    renderTurn(entries, idx);
  })();
})();
