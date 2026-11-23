/* Démo jouable sans compte : 3 questions tirées au hasard, corrigées dans le navigateur.
   Rien n'est envoyé nulle part. Questions issues de la banque du jeu (références Louis Segond 1910). */
(function () {
  var QUESTIONS = [{"q": "Qui a construit l'arche pour échapper au déluge ?","a": "Noé","w": ["Abraham","Moïse","Élie"],"ref": "Genèse 6:14","ex": "Dieu ordonne à Noé de bâtir une arche pour survivre au déluge (Genèse 6)."},{"q": "Combien d'apôtres Jésus a-t-il choisis ?","a": "12","w": ["7","10","3"],"ref": "Marc 3:14","ex": "Jésus établit douze apôtres pour l'accompagner (Marc 3:14)."},{"q": "Dans quelle ville Jésus est-il né ?","a": "Bethléem","w": ["Nazareth","Jérusalem","Capharnaüm"],"ref": "Luc 2:4-7","ex": "Jésus naît à Bethléem, la ville de David (Luc 2)."},{"q": "Qui a été jeté dans la fosse aux lions ?","a": "Daniel","w": ["Élie","Josué","Néhémie"],"ref": "Daniel 6","ex": "Daniel est jeté aux lions pour avoir prié Dieu, mais il en sort indemne (Daniel 6)."},{"q": "Combien de jours Dieu a-t-il consacrés à la création avant de se reposer ?","a": "6","w": ["3","7","12"],"ref": "Genèse 1","ex": "Dieu crée en six jours et se repose le septième (Genèse 1-2)."},{"q": "Qui furent le premier homme et la première femme ?","a": "Adam et Ève","w": ["Caïn et Abel","Noé et sa femme","Abraham et Sara"],"ref": "Genèse 2","ex": "Adam et Ève sont le premier couple créé par Dieu (Genèse 2)."},{"q": "Quel fils d'Adam a tué son frère Abel ?","a": "Caïn","w": ["Seth","Hénoc","Lémec"],"ref": "Genèse 4","ex": "Caïn tue son frère Abel par jalousie (Genèse 4)."},{"q": "Quel signe Dieu a-t-il donné après le déluge comme promesse ?","a": "L'arc-en-ciel","w": ["Une étoile","Une colombe","Un olivier"],"ref": "Genèse 9:13","ex": "L'arc-en-ciel scelle l'alliance de Dieu de ne plus détruire la terre par un déluge (Genèse 9)."},{"q": "Sous quelle forme Dieu est-il apparu à Moïse pour l'appeler ?","a": "Un buisson ardent","w": ["Une colonne de feu","Un ange","Une voix dans le vent"],"ref": "Exode 3","ex": "Dieu appelle Moïse depuis un buisson qui brûle sans se consumer (Exode 3)."},{"q": "Quelle nourriture Dieu a-t-il donnée aux Israélites dans le désert ?","a": "La manne","w": ["Le pain d'orge","Les figues","Le miel"],"ref": "Exode 16","ex": "La manne tombe chaque matin pour nourrir le peuple (Exode 16)."},{"q": "Quelle mer les Israélites ont-ils traversée à pied sec ?","a": "La mer Rouge","w": ["La Méditerranée","Le Jourdain","La mer Morte"],"ref": "Exode 14","ex": "Dieu ouvre la mer Rouge pour laisser passer Israël, puis engloutit l'armée de Pharaon (Exode 14)."},{"q": "Combien de commandements Dieu a-t-il donnés à Moïse au Sinaï ?","a": "10","w": ["7","12","5"],"ref": "Exode 20","ex": "Les Dix Commandements sont donnés au Sinaï (Exode 20)."},{"q": "Quel jeune berger a vaincu le géant Goliath ?","a": "David","w": ["Saül","Jonathan","Samuel"],"ref": "1 Samuel 17","ex": "David abat Goliath avec une fronde et une pierre (1 Samuel 17)."},{"q": "Qui a baptisé Jésus dans le Jourdain ?","a": "Jean-Baptiste","w": ["Pierre","André","Zacharie"],"ref": "Matthieu 3","ex": "Jean-Baptiste baptise Jésus, puis l'Esprit descend comme une colombe (Matthieu 3)."},{"q": "Combien de jours Jésus a-t-il jeûné au désert lors de sa tentation ?","a": "40","w": ["7","30","3"],"ref": "Matthieu 4:2","ex": "Jésus jeûne quarante jours avant d'être tenté (Matthieu 4)."},{"q": "Sur quel animal Jésus est-il entré à Jérusalem le jour des Rameaux ?","a": "Un âne","w": ["Un cheval","Un chameau","À pied"],"ref": "Matthieu 21","ex": "Jésus entre monté sur un ânon, accomplissant la prophétie de Zacharie (Matthieu 21 ; Zacharie 9:9)."},{"q": "Quel gouverneur romain a condamné Jésus à la crucifixion ?","a": "Ponce Pilate","w": ["Hérode","César","Caïphe"],"ref": "Matthieu 27","ex": "Pilate livre Jésus après s'être lavé les mains (Matthieu 27)."}];
  var root = document.getElementById('demo');
  if (!root) return;
  var box = root.querySelector('[data-demo]');
  var N = 3;

  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  var picked, idx, score;
  function start() { picked = shuffle(QUESTIONS).slice(0, N); idx = 0; score = 0; show(); }

  function show() {
    box.textContent = '';
    var q = picked[idx];
    box.appendChild(el('p', 'demo-count', 'Question ' + (idx + 1) + ' / ' + N));
    var h = el('p', 'demo-q', q.q);
    h.id = 'demo-q';
    box.appendChild(h);
    var list = el('div', 'demo-opts');
    list.setAttribute('role', 'group');
    list.setAttribute('aria-labelledby', 'demo-q');
    shuffle([q.a].concat(q.w)).forEach(function (opt) {
      var b = el('button', 'demo-opt', opt);
      b.type = 'button';
      b.addEventListener('click', function () { answer(q, opt, list); });
      list.appendChild(b);
    });
    box.appendChild(list);
    var first = list.querySelector('button');
    if (idx > 0 && first) first.focus();
  }

  function answer(q, opt, list) {
    var ok = opt === q.a;
    if (ok) score++;
    Array.prototype.forEach.call(list.querySelectorAll('button'), function (b) {
      b.disabled = true;
      if (b.textContent === q.a) b.classList.add('ok');
      else if (b.textContent === opt) b.classList.add('ko');
    });
    var fb = el('div', 'demo-fb');
    fb.setAttribute('role', 'status');
    fb.appendChild(el('strong', null, ok ? '✅ Bonne réponse !' : '❌ La réponse était : ' + q.a));
    fb.appendChild(el('p', null, q.ex));
    var next = el('button', 'btn btn-primary demo-next', idx + 1 < N ? 'Question suivante →' : 'Voir mon score');
    next.type = 'button';
    next.addEventListener('click', function () { idx++; if (idx < N) show(); else end(); });
    fb.appendChild(next);
    box.appendChild(fb);
    next.focus();
  }

  function end() {
    box.textContent = '';
    var r = el('div', 'demo-end');
    r.setAttribute('role', 'status');
    r.appendChild(el('p', 'demo-score', score + ' / ' + N));
    r.appendChild(el('p', null, score === N ? 'Sans faute ! Il y a des centaines d\u2019autres questions qui t\u2019attendent.'
      : 'Bien joué ! Dans le jeu, tes erreurs reviennent en révision jusqu\u2019à ce que tu les maîtrises.'));
    var play = el('a', 'btn btn-primary', 'Jouer à Manna →');
    play.href = 'https://bibleduo-game-production.up.railway.app';
    play.target = '_blank';
    play.rel = 'noopener';
    var again = el('button', 'btn btn-ghost', 'Rejouer la démo');
    again.type = 'button';
    again.addEventListener('click', start);
    var row = el('div', 'demo-actions');
    row.appendChild(play);
    row.appendChild(again);
    r.appendChild(row);
    box.appendChild(r);
    play.focus();
  }

  root.hidden = false;
  start();
})();
