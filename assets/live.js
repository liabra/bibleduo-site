/* Compteur de joueurs en ligne.
   Lit un nombre public sur le serveur du jeu (aucun cookie, aucun identifiant, aucune donnée envoyée).
   Rien ne s'affiche s'il y a trop peu de joueurs ou si le serveur ne répond pas : jamais de faux chiffre. */
(function () {
  var URL = 'https://bibleduo-game-production.up.railway.app/api/stats/live';
  var el = document.getElementById('live-count');
  if (!el || !window.fetch) return;

  function label(d) {
    if (!d || typeof d.count !== 'number' || !isFinite(d.count) || d.count < 1 || Math.floor(d.count) !== d.count) return null;
    var n = d.count;
    if (d.kind === 'online') return n === 1 ? '1 joueur est en train de jouer, et vous ?' : n + ' joueurs sont en train de jouer, et vous ?';
    if (d.kind === 'today') return n === 1 ? '1 joueur a joué aujourd’hui, et vous ?' : n + ' joueurs ont joué aujourd’hui, et vous ?';
    return null;
  }

  var ctl = window.AbortController ? new AbortController() : null;
  var timer = ctl ? setTimeout(function () { ctl.abort(); }, 5000) : null;

  fetch(URL, {
    method: 'GET',
    credentials: 'omit',
    referrerPolicy: 'no-referrer',
    cache: 'no-store',
    signal: ctl ? ctl.signal : undefined
  })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (data) {
      var text = data && label(data.display);
      if (!text) return;
      el.querySelector('[data-live-text]').textContent = text;
      el.hidden = false;
    })
    .catch(function () { /* silencieux : le compteur reste masqué */ })
    .then(function () { if (timer) clearTimeout(timer); });
})();
