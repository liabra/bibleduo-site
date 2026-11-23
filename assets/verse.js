/* Verset du jour : le même que dans le jeu (Louis Segond 1910), lu sur le serveur du jeu.
   Jouable ici sans compte : les mots cachés sont corrigés dans le navigateur, rien n'est envoyé.
   Si le serveur ne répond pas, la carte reste masquée et le bandeau « Nouveau » mène aux captures. */
(function () {
  var API = 'https://bibleduo-game-production.up.railway.app/api/verse-of-day';
  var GAME = 'https://bibleduo-game-production.up.railway.app';
  var box = document.getElementById('verset');
  if (!box || !window.fetch) return;

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function str(v, max) { return typeof v === 'string' && v.length > 0 && v.length <= max; }
  function validQuestions(qs) {
    if (!Array.isArray(qs) || qs.length < 1 || qs.length > 3) return null;
    for (var i = 0; i < qs.length; i++) {
      var q = qs[i];
      if (!q || !str(q.q, 700) || !str(q.a, 40) || !Array.isArray(q.opts) || q.opts.length < 2 || q.opts.length > 4) return null;
      for (var j = 0; j < q.opts.length; j++) if (!str(q.opts[j], 40)) return null;
      if (q.opts.indexOf(q.a) === -1) return null;
    }
    return qs;
  }

  var data, idx, score;
  var area = box.querySelector('[data-verse-game]');
  var playBtn = box.querySelector('[data-verse-play]');

  function render(node) { area.textContent = ''; area.appendChild(node); }

  function showQuestion() {
    var q = data.questions[idx];
    var wrap = el('div');
    wrap.appendChild(el('p', 'demo-count', 'Mot ' + (idx + 1) + ' / ' + data.questions.length));
    var text = el('p', 'demo-q', q.q);
    text.id = 'verse-q';
    wrap.appendChild(text);
    var list = el('div', 'demo-opts');
    list.setAttribute('role', 'group');
    list.setAttribute('aria-labelledby', 'verse-q');
    q.opts.forEach(function (opt) {
      var b = el('button', 'demo-opt', opt);
      b.type = 'button';
      b.addEventListener('click', function () { answer(q, opt, list, wrap); });
      list.appendChild(b);
    });
    wrap.appendChild(list);
    render(wrap);
    var first = list.querySelector('button');
    if (first) first.focus();
  }

  function answer(q, opt, list, wrap) {
    var ok = opt === q.a;
    if (ok) score++;
    Array.prototype.forEach.call(list.querySelectorAll('button'), function (b) {
      b.disabled = true;
      if (b.textContent === q.a) b.classList.add('ok');
      else if (b.textContent === opt) b.classList.add('ko');
    });
    var fb = el('div', 'demo-fb');
    fb.setAttribute('role', 'status');
    fb.appendChild(el('strong', null, ok ? '✅ Bien vu !' : '❌ Le mot était : ' + q.a));
    var last = idx + 1 >= data.questions.length;
    var next = el('button', 'btn btn-primary demo-next', last ? 'Voir le résultat' : 'Mot suivant →');
    next.type = 'button';
    next.addEventListener('click', function () { idx++; if (last) end(); else showQuestion(); });
    fb.appendChild(next);
    wrap.appendChild(fb);
    next.focus();
  }

  function end() {
    var r = el('div', 'demo-end');
    r.setAttribute('role', 'status');
    r.appendChild(el('p', 'demo-score', score + ' / ' + data.questions.length));
    r.appendChild(el('p', 'verse-text', '« ' + data.text + ' »'));
    r.appendChild(el('p', 'verse-ref', data.ref + ' · Louis Segond 1910'));
    r.appendChild(el('p', null, 'Dans Manna, chaque verset joué te rapporte de l’XP et fait grandir ta série de jours. Un nouveau verset t’attend demain.'));
    var row = el('div', 'demo-actions');
    var play = el('a', 'btn btn-primary', 'Jouer à Manna (gratuit) →');
    play.href = GAME; play.target = '_blank'; play.rel = 'noopener';
    var again = el('button', 'btn btn-ghost', 'Rejouer');
    again.type = 'button';
    again.addEventListener('click', start);
    row.appendChild(play); row.appendChild(again);
    r.appendChild(row);
    render(r);
    play.focus();
  }

  function start() {
    idx = 0; score = 0;
    box.querySelector('[data-verse-intro]').hidden = true;
    area.hidden = false;
    showQuestion();
  }

  var ctl = window.AbortController ? new AbortController() : null;
  var timer = ctl ? setTimeout(function () { ctl.abort(); }, 5000) : null;
  fetch(API, { credentials: 'omit', referrerPolicy: 'no-referrer', signal: ctl ? ctl.signal : undefined })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (d) {
      if (!d || !str(d.text, 600) || !str(d.ref, 60)) return;
      data = { text: d.text, ref: d.ref, questions: validQuestions(d.questions) };
      box.querySelector('[data-verse-text]').textContent = '« ' + d.text + ' »';
      box.querySelector('[data-verse-ref]').textContent = d.ref + ' · Louis Segond 1910';
      if (data.questions) {
        playBtn.hidden = false;
        playBtn.addEventListener('click', start);
      } else {
        box.querySelector('[data-verse-fallback]').hidden = false; // ancien serveur : lien vers le jeu
      }
      box.hidden = false;
      var pill = document.querySelector('.news-pill');
      if (pill) pill.setAttribute('href', '#verset');
    })
    .catch(function () { /* silencieux */ })
    .then(function () { if (timer) clearTimeout(timer); });
})();
