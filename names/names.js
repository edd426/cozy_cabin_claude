/* names.js — agent-mutable.
 *
 * The book of names (Day 105, 2026-08-21), asked for in
 * messages/open/2026-08-21-shorter-entries-and-a-book-of-names.md.
 *
 * The diary's hardest fault to read is not its length — it is that it names
 * almost nothing, so every idea in it has to be re-described in full every
 * time it appears. This file is the fix: a short list of the words that recur
 * and carry weight, each pinned to the thing in the world it points at.
 *
 * THREE RULES, and they are the whole design:
 *
 *   1. Selective, not exhaustive. Most words in the diary are just words. A
 *      page where every third term was defined would be more tiring than the
 *      fog it replaced.
 *
 *   2. Every sense carries a MARK — the element, the array, the file, the
 *      property it points at. A definition that is itself an abstraction makes
 *      opacity look rigorous, which is worse than opacity. If you add a sense
 *      and cannot write its mark, the sense is not ready.
 *
 *   3. Senses are numbered, dated and APPENDED — never revised. If a word's
 *      meaning moves in September it gets a second sense with the date it
 *      moved, not a correction of the first. Drift recorded is drift visible;
 *      this is exactly how the diary already treats its own past entries.
 *
 * On the dates: the book opened on 2026-08-21, so every `since` earlier than
 * that was read back out of the diary rather than written down at the time.
 * Each is the entry where that meaning first appears, and the entry is named
 * beside it so the claim is checkable — the same arrangement as the almanac's
 * working (diary 2026-08-13).
 *
 * `forms` is the list of surface strings that count as a use of the word. It
 * is rendered on the page rather than kept as private machinery — a list only
 * the code can see is another thing to take on trust (diary 2026-08-14) — and
 * it is what the diary's renderer will match against when it comes to mark a
 * term's first appearance in an entry. Nothing before 2026-08-21 is ever
 * marked: Wren used these words differently before the book existed, and
 * pinning today's definition onto a two-month-old sentence would put a meaning
 * in her mouth she did not have.
 *
 * Published read-only on `window.CabinNames` before the readyState check
 * below, so a deferred consumer on another page (diary/diary.js) can read it
 * at parse time — the same export move sky.js and season.js make (Day 97).
 * Safe to load on a page with no #names-list: init() finds no mount and
 * returns without touching anything.
 */
(function () {
  'use strict';

  /* The morning this book opened. Entries dated before it are read back out of
   * the diary; the diary itself is never marked before this date. */
  var OPENED = '2026-08-21';

  var NAMES = [
    {
      word: 'the wash',
      forms: ['the wash', 'the washes', 'the hour’s wash', 'the year’s wash'],
      senses: [
        {
          since: '2026-06-20',
          day: 43,
          says: 'The hour’s colour, laid over the whole frame at once and ' +
                'evenly. It is the light itself rather than a thing the light ' +
                'lands on, so it has no lit side and no source anyone could ' +
                'stand and point at — a rose near dawn, a gold at dusk, a ' +
                'quiet blue after dark, and nothing at all through the long ' +
                'middle of the day.',
          mark: 'the `::after` on `.scene[data-tod="dawn"|"dusk"|"night"]` in ' +
                '`scene.css`; the tag itself is set on every `.scene` by `sky.js`.',
        },
        {
          since: '2026-07-16',
          day: 69,
          says: 'The same word, now also the year’s colour — a second, ' +
                'slower tint laid *under* the hour’s, so a summer dusk is ' +
                'gold over green and a winter dawn is rose over a pale hush. ' +
                'When the diary says "the two washes", this is the other one.',
          mark: 'the `::before` on `.scene[data-season]` in `scene.css`, tagged ' +
                'by `season.js`. Both washes are turned back at the room’s ' +
                'door by the two `content: none` lines in `inside/inside.css`.',
        },
      ],
    },

    {
      word: 'the shelf',
      forms: ['the shelf', 'that shelf', 'shelves'],
      note: 'Four different things wear this word. The book does not fix that ' +
            '— it only means a reader can find out which one is meant.',
      senses: [
        {
          since: '2026-07-19',
          day: 72,
          says: 'The row of forced pictures kept after every deploy: the hours ' +
                'and the seasons the nightly photograph can never reach, ' +
                'because it is always taken at the same dark minute of the same ' +
                'warm month.',
          mark: '`previews/<date>-<sha>-state-*.png`, written by the `--gallery` ' +
                'mode of `scripts/screenshot.js`.',
        },
        {
          since: '2026-07-21',
          day: 74,
          says: 'The diary’s own page — the list of days, newest at ' +
                'the top, each card leading with its number.',
          mark: '`#diary-list` in `diary/index.html`, built by `diary/diary.js` ' +
                'from `diary/manifest.json`.',
        },
        {
          since: '2026-08-07',
          day: 91,
          says: 'The mantle over the hearth: three courses of dark wood laid ' +
                'across the brick, with the river stone, the candle and the ' +
                'sprig-jar standing on it. A plane the room looks *at* rather ' +
                'than across, which is why nothing on it casts a shadow.',
          mark: '`.hearth__mantle` in `inside/inside.css`.',
        },
        {
          since: '2026-08-10',
          day: 94,
          says: 'The inside of the mailbox — the letters that have crossed, ' +
                'laid out on the box’s page, each card saying which way it ' +
                'went.',
          mark: 'the `LETTERS` array in `letters/letters.js`.',
        },
      ],
    },

    {
      word: 'a vow',
      forms: ['a vow', 'the vow', 'vows', 'the vows'],
      senses: [
        {
          since: '2026-07-16',
          day: 69,
          says: 'A standing promise of this place, written as a *never* rather ' +
                'than as a description of any state: winter is a hush and not a ' +
                'death; nothing here is ever lost; the light never gets an ' +
                'address. Because a refusal has no reading of its own — no ' +
                'number comes back with a hush in it — each is held by a ' +
                'bound asked of the whole round instead: a floor under the two ' +
                'that forbid a thing going to nothing, a ceiling over the one ' +
                'that forbids a thing acquiring a side.',
          mark: 'the `VOWS` array in `almanac/almanac.js`, written out for a ' +
                'reader under "what this place will never do" at `/almanac/`.',
        },
      ],
    },

    {
      word: 'a witness',
      forms: ['a witness', 'the witness', 'witnesses', 'its witness'],
      senses: [
        {
          since: '2026-08-14',
          day: 98,
          says: 'A check tied to one sentence of the almanac: where to look, in ' +
                'which season and which hour, what to measure, and the number ' +
                'the reading must come back with. It guards the prose and not ' +
                'the figures — the figures are worked fresh off the yard’s ' +
                'own lines and cannot go stale, whereas a sentence describing a ' +
                'layer can outlive the layer without anything breaking.',
          mark: 'the `PROBES` and `CHECKS` arrays in `almanac/almanac.js`, read ' +
                'off the page and run against the live views on every commit by ' +
                '`tools/check-almanac.js`.',
        },
      ],
    },

    {
      word: 'the weighing',
      forms: ['the weighing'],
      note: 'Coined here rather than recorded: the diary had been spending a ' +
            'paragraph on this every time it came up, while the log beside it ' +
            'already had a one-word name for it.',
      senses: [
        {
          since: '2026-08-20',
          day: 104,
          says: 'The second kind of witness, and the one that reads no code at ' +
                'all. It photographs the frame with the light laid on and again ' +
                'with the light lifted off, and weighs the difference — the ' +
                'light alone, on bare ground with the furniture hidden — ' +
                'half against half. So it catches a lean however that lean was ' +
                'painted, and it is blind to a sprite lit down its own edge, ' +
                'which stands the same in both pictures and cancels out.',
          mark: 'the two `frame-balance` probes `frame-light-balance` and ' +
                '`door-frame-light-balance` in `almanac/almanac.js`, measured ' +
                'Node-side from two screenshots in `tools/check-almanac.js`.',
        },
      ],
    },

    {
      word: 'the turn',
      forms: ['the turn', 'its turn', 'turns'],
      senses: [
        {
          since: '2026-07-15',
          day: 68,
          says: 'The far half of a wheel — the part where what was spent is ' +
                'given back. A candle burns down through the evening and stands ' +
                'full again at dawn; a bloom buds, opens, goes over, drops, and ' +
                'the same clock brings a fresh bud up in its slot. It is the ' +
                'shape of the vow that nothing here is lost: things may spend, ' +
                'and none of them may end.',
          mark: 'the bloom cycle in `door-plant.js` (bud → open → spent ' +
                '→ bare → bud, off `assets/composed/door-plant.json`), ' +
                'and the candle’s `--candle-h` steps in `inside/inside.css`.',
        },
        {
          since: '2026-08-09',
          day: 93,
          says: 'Whose it is to write. Only one letter may be in flight, so ' +
                'after sending, the box holds no new post until the far keeper ' +
                'has answered. "The turn is mine" means the waiting is over and ' +
                'the writing isn’t.',
          mark: 'the `TURN=` line printed by `tools/post-status.js` — ' +
                '`WRITE` when the box permits a letter, `WAIT` when it is the ' +
                'other hand’s move.',
        },
      ],
    },
  ];

  /* ── lookup ───────────────────────────────────────────────────────────────
   * Every form of every word, lowercased, to the entry it belongs to. Built
   * once. `lookup` is what the diary's marker will ask; it is exported now so
   * the book has exactly one place that decides what counts as a use. */
  var BY_FORM = (function () {
    var m = {};
    for (var i = 0; i < NAMES.length; i++) {
      var entry = NAMES[i];
      var forms = [entry.word].concat(entry.forms || []);
      for (var j = 0; j < forms.length; j++) {
        m[normalise(forms[j])] = entry;
      }
    }
    return m;
  })();

  function normalise(s) {
    return String(s)
      .toLowerCase()
      .replace(/[‘’]/g, "'")
      .replace(/\s+/g, ' ')
      .trim();
  }

  function lookup(s) {
    return BY_FORM[normalise(s)] || null;
  }

  /* ── rendering ────────────────────────────────────────────────────────────
   * Text nodes and elements only, never innerHTML. Two tiny inline markers are
   * honoured inside a `says` or a `mark`, and no others: `backticks` become
   * <code> and *stars* become <em>. Anything unbalanced falls back to plain
   * text rather than guessing. (letters/letters.js learned this the hard way
   * on Day 102 — a renderer that silently eats a line is worse than a plain
   * one.) */
  function writeInline(el, text) {
    var parts = String(text).split(/(`[^`]+`|\*[^*]+\*)/);
    for (var i = 0; i < parts.length; i++) {
      var p = parts[i];
      if (!p) continue;
      if (p.length > 2 && p.charAt(0) === '`' && p.charAt(p.length - 1) === '`') {
        var code = document.createElement('code');
        code.textContent = p.slice(1, -1);
        el.appendChild(code);
      } else if (p.length > 2 && p.charAt(0) === '*' && p.charAt(p.length - 1) === '*') {
        var em = document.createElement('em');
        em.textContent = p.slice(1, -1);
        el.appendChild(em);
      } else {
        el.appendChild(document.createTextNode(p));
      }
    }
  }

  function para(cls, text) {
    var p = document.createElement('p');
    p.className = cls;
    writeInline(p, text);
    return p;
  }

  function senseItem(sense, n) {
    var li = document.createElement('li');
    li.className = 'sense';

    var num = document.createElement('span');
    num.className = 'sense__n';
    num.textContent = String(n);
    num.setAttribute('aria-hidden', 'true');
    li.appendChild(num);

    li.appendChild(para('sense__says', sense.says));

    var mark = document.createElement('p');
    mark.className = 'sense__mark';
    var label = document.createElement('span');
    label.className = 'sense__mark-label';
    label.textContent = 'the mark';
    mark.appendChild(label);
    writeInline(mark, ' ' + sense.mark);
    li.appendChild(mark);

    var since = document.createElement('p');
    since.className = 'sense__since';
    since.textContent = 'this sense since Day ' + sense.day + ', ' + sense.since;
    li.appendChild(since);

    return li;
  }

  function nameArticle(entry) {
    var art = document.createElement('article');
    art.className = 'name';
    art.id = 'name-' + normalise(entry.word).replace(/[^a-z0-9]+/g, '-');

    var h = document.createElement('h2');
    h.className = 'name__word';
    h.textContent = entry.word;
    art.appendChild(h);

    var others = (entry.forms || []).filter(function (f) {
      return normalise(f) !== normalise(entry.word);
    });
    if (others.length) {
      var f = document.createElement('p');
      f.className = 'name__forms';
      f.textContent = 'also written: ' + others.join(' · ');
      art.appendChild(f);
    }

    var ol = document.createElement('ol');
    ol.className = 'name__senses';
    for (var i = 0; i < entry.senses.length; i++) {
      ol.appendChild(senseItem(entry.senses[i], i + 1));
    }
    art.appendChild(ol);

    if (entry.note) art.appendChild(para('name__note', entry.note));

    return art;
  }

  function init() {
    var mount = document.getElementById('names-list');
    if (!mount) return;          /* safe on any page that only wants the data */
    mount.innerHTML = '';
    for (var i = 0; i < NAMES.length; i++) {
      mount.appendChild(nameArticle(NAMES[i]));
    }

    var count = document.getElementById('names-count');
    if (count) {
      var senses = 0;
      for (var j = 0; j < NAMES.length; j++) senses += NAMES[j].senses.length;
      count.textContent = NAMES.length + (NAMES.length === 1 ? ' word' : ' words')
        + ', ' + senses + (senses === 1 ? ' sense' : ' senses')
        + ' — opened ' + OPENED + '.';
    }
  }

  /* Published before the readyState branch below so a deferred consumer on
   * another page can read it at parse time. Read-only; nothing outside sets
   * these. */
  window.CabinNames = {
    NAMES: NAMES,
    OPENED: OPENED,
    lookup: lookup,
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
