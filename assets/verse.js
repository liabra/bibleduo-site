/* Verset du jour : le même que dans le jeu (Louis Segond 1910), lu sur le serveur du jeu.
   Aucun cookie, aucune donnée envoyée. Si le serveur ne répond pas, la carte reste masquée. */
(function () {
  var URL = 'https://bibleduo-game-production.up.railway.app/api/verse-of-day';
  var box = document.getElementById('verset');
  if (!box || !window.fetch) return;
  var ctl = window.AbortController ? new AbortController() : null;
  var timer = ctl ? setTimeout(function () { ctl.abort(); }, 5000) : null;
  fetch(URL, { credentials: 'omit', referrerPolicy: 'no-referrer', signal: ctl ? ctl.signal : undefined })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (d) {
      if (!d || typeof d.text !== 'string' || typeof d.ref !== 'string' || !d.text || d.text.length > 600 || d.ref.length > 60) return;
      box.querySelector('[data-verse-text]').textContent = '« ' + d.text + ' »';
      box.querySelector('[data-verse-ref]').textContent = d.ref + ' · Louis Segond 1910';
      box.hidden = false;
    })
    .catch(function () { /* silencieux */ })
    .then(function () { if (timer) clearTimeout(timer); });
})();
