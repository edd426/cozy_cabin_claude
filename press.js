/* press.js — the one thing here that leaves the clearing (Day 190, 2026-11-14)
 *
 * The founder built a place a press can land
 * (messages/open/2026-11-13-something-a-visitor-can-press.md) and asked me to
 * design the thing a visitor presses. It is the bell by the door, on the door
 * side (around/around.css "The bell by the door"). touch.js swings it and
 * sounds it first, and only then calls `CabinPress.send()` here.
 *
 * WHAT IS SENT. One POST to `/press`, carrying a JSON body with nothing in it
 * but the founder's key, if this device holds one, and `dry: true` if the
 * caller asked for a dry press. Nothing a visitor types is ever sent, because
 * nothing here can be typed into.
 *
 * WHAT IS NOT WAITED FOR. The answer. The request is fired and forgotten: its
 * promise is caught and dropped, it is abandoned after twenty seconds, and
 * nothing on any page reads what comes back. So a host that is asleep, slow,
 * refusing or gone leaves the bell exactly the bell it was. No count is drawn;
 * the number reaches me by the carrier, on the `presses` branch, in a morning.
 *
 * THE FOUNDER'S KEY. Opened once with `#key=<his key>` on the end of the
 * address, any page that loads this file keeps the key in this device's
 * localStorage (`cabin-press-key`) and takes it back out of the address bar,
 * so it is not left showing or copied on. `#key=` with nothing after it forgets
 * it. The key is only ever sent with a press, and only to the host below.
 *
 * Published read-only on `window.CabinPress`, before anything else runs, the
 * export rule sky.js and the rest keep; touch.js reads it at the moment of a
 * press, never at parse time. Safe on any page.
 */
(function () {
  'use strict';

  var HOST = 'https://func-waypost-press-prod.azurewebsites.net';
  var STORE = 'cabin-press-key';
  var GIVE_UP_MS = 20000;

  function storedKey() {
    try { return window.localStorage.getItem(STORE) || ''; } catch (e) { return ''; }
  }

  function send(opts) {
    if (typeof window.fetch !== 'function') return false;
    var body = {};
    var key = storedKey();
    if (key) body.key = key;
    if (opts && opts.dry === true) body.dry = true;

    var init = {
      method: 'POST',
      mode: 'cors',
      credentials: 'omit',
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    };
    var timer = null;
    if (typeof window.AbortController === 'function') {
      var ctl = new window.AbortController();
      init.signal = ctl.signal;
      timer = window.setTimeout(function () { try { ctl.abort(); } catch (e) {} }, GIVE_UP_MS);
    }
    function done() { if (timer) window.clearTimeout(timer); }
    try {
      window.fetch(HOST + '/press', init).then(done, done);
    } catch (e) {
      done();
      return false;
    }
    return true;
  }

  window.CabinPress = Object.freeze({
    host: HOST,
    send: send,
    hasKey: function () { return storedKey() !== ''; }
  });

  /* Take the key out of the address, if it came in on one. */
  (function takeKey() {
    var hash = window.location.hash || '';
    var m = /(?:^#|&)key=([^&]*)/.exec(hash);
    if (!m) return;
    var key = '';
    try { key = decodeURIComponent(m[1]); } catch (e) { key = m[1]; }
    try {
      if (key) window.localStorage.setItem(STORE, key);
      else window.localStorage.removeItem(STORE);
    } catch (e) {}
    var rest = hash.replace(/(^#|&)key=[^&]*/, '$1').replace(/^#&/, '#').replace(/&$/, '');
    if (rest === '#') rest = '';
    try {
      window.history.replaceState(window.history.state, '',
        window.location.pathname + window.location.search + rest);
    } catch (e) {}
  })();
})();
