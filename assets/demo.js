/* Démo jouable sans compte : 3 questions tirées au hasard, corrigées dans le navigateur.
   Rien n'est envoyé nulle part. Questions issues de la banque du jeu (références Louis Segond 1910). */
(function () {
  var QUESTIONS = [{"q": "Qui a construit l'arche pour échapper au déluge ?", "a": "Noé", "w": ["Abraham", "Moïse", "Élie"], "ref": "Genèse 6:14", "ex": "Dieu ordonne à Noé de bâtir une arche pour survivre au déluge (Genèse 6)."}, {"q": "Combien d'apôtres Jésus a-t-il choisis ?", "a": "12", "w": ["7", "10", "3"], "ref": "Marc 3:14", "ex": "Jésus établit douze apôtres pour l'accompagner (Marc 3:14)."}, {"q": "Dans quelle ville Jésus est-il né ?", "a": "Bethléem", "w": ["Nazareth", "Jérusalem", "Capharnaüm"], "ref": "Luc 2:4-7", "ex": "Jésus naît à Bethléem, la ville de David (Luc 2)."}, {"q": "Qui a été jeté dans la fosse aux lions ?", "a": "Daniel", "w": ["Élie", "Josué", "Néhémie"], "ref": "Daniel 6", "ex": "Daniel est jeté aux lions pour avoir prié Dieu, mais il en sort indemne (Daniel 6)."}, {"q": "Combien de jours Dieu a-t-il consacrés à la création avant de se reposer ?", "a": "6", "w": ["3", "7", "12"], "ref": "Genèse 1", "ex": "Dieu crée en six jours et se repose le septième (Genèse 1-2)."}, {"q": "Qui furent le premier homme et la première femme ?", "a": "Adam et Ève", "w": ["Caïn et Abel", "Noé et sa femme", "Abraham et Sara"], "ref": "Genèse 2", "ex": "Adam et Ève sont le premier couple créé par Dieu (Genèse 2)."}, {"q": "Quel fils d'Adam a tué son frère Abel ?", "a": "Caïn", "w": ["Seth", "Hénoc", "Lémec"], "ref": "Genèse 4", "ex": "Caïn tue son frère Abel par jalousie (Genèse 4)."}, {"q": "Quel signe Dieu a-t-il donné après le déluge comme promesse ?", "a": "L'arc-en-ciel", "w": ["Une étoile", "Une colombe", "Un olivier"], "ref": "Genèse 9:13", "ex": "L'arc-en-ciel scelle l'alliance de Dieu de ne plus détruire la terre par un déluge (Genèse 9)."}, {"q": "Sous quelle forme Dieu est-il apparu à Moïse pour l'appeler ?", "a": "Un buisson ardent", "w": ["Une colonne de feu", "Un ange", "Une voix dans le vent"], "ref": "Exode 3", "ex": "Dieu appelle Moïse depuis un buisson qui brûle sans se consumer (Exode 3)."}, {"q": "Quelle nourriture Dieu a-t-il donnée aux Israélites dans le désert ?", "a": "La manne", "w": ["Le pain d'orge", "Les figues", "Le miel"], "ref": "Exode 16", "ex": "La manne tombe chaque matin pour nourrir le peuple (Exode 16)."}, {"q": "Quelle mer les Israélites ont-ils traversée à pied sec ?", "a": "La mer Rouge", "w": ["La Méditerranée", "Le Jourdain", "La mer Morte"], "ref": "Exode 14", "ex": "Dieu ouvre la mer Rouge pour laisser passer Israël, puis engloutit l'armée de Pharaon (Exode 14)."}, {"q": "Combien de commandements Dieu a-t-il donnés à Moïse au Sinaï ?", "a": "10", "w": ["7", "12", "5"], "ref": "Exode 20", "ex": "Les Dix Commandements sont donnés au Sinaï (Exode 20)."}, {"q": "Quel jeune berger a vaincu le géant Goliath ?", "a": "David", "w": ["Saül", "Jonathan", "Samuel"], "ref": "1 Samuel 17", "ex": "David abat Goliath avec une fronde et une pierre (1 Samuel 17)."}, {"q": "Qui a baptisé Jésus dans le Jourdain ?", "a": "Jean-Baptiste", "w": ["Pierre", "André", "Zacharie"], "ref": "Matthieu 3", "ex": "Jean-Baptiste baptise Jésus, puis l'Esprit descend comme une colombe (Matthieu 3)."}, {"q": "Combien de jours Jésus a-t-il jeûné au désert lors de sa tentation ?", "a": "40", "w": ["7", "30", "3"], "ref": "Matthieu 4:2", "ex": "Jésus jeûne quarante jours avant d'être tenté (Matthieu 4)."}, {"q": "Sur quel animal Jésus est-il entré à Jérusalem le jour des Rameaux ?", "a": "Un âne", "w": ["Un cheval", "Un chameau", "À pied"], "ref": "Matthieu 21", "ex": "Jésus entre monté sur un ânon, accomplissant la prophétie de Zacharie (Matthieu 21 ; Zacharie 9:9)."}, {"q": "Quel gouverneur romain a condamné Jésus à la crucifixion ?", "a": "Ponce Pilate", "w": ["Hérode", "César", "Caïphe"], "ref": "Matthieu 27", "ex": "Pilate livre Jésus après s'être lavé les mains (Matthieu 27)."}, {"q": "Qui a créé le monde en 6 jours ?", "a": "Dieu", "w": ["Moïse", "Adam", "Noé"], "ref": "Genèse 1:1-31", "ex": "La Genèse relate que Dieu créa le monde en 6 jours et se reposa le 7e — fondement de la foi biblique."}, {"q": "Quel disciple était collecteur d'impôts ?", "a": "Matthieu", "w": ["Jean", "Pierre", "Jacques"], "ref": "Matthieu 9:9", "ex": "Matthieu (Lévi) travaillait à un bureau de péage quand Jésus l'appela à le suivre — ce qu'il fit aussitôt."}, {"q": "Quel personnage biblique possède l'âge le plus élevé explicitement indiqué dans le texte ?", "a": "Mathusalem", "w": ["Noé", "Adam", "Abraham"], "ref": "Genèse 5:27", "ex": "Mathusalem, fils d'Énoch et grand-père de Noé, est le doyen de la Bible avec 969 ans de vie."}, {"q": "Combien de fils Jacob avait-il ?", "a": "12", "w": ["10", "11", "13"], "ref": "Genèse 35:22", "ex": "Jacob eut 12 fils de quatre femmes. Chacun devint l'ancêtre d'une des 12 tribus d'Israël."}, {"q": "Quel disciple a mis le doigt dans les plaies du Christ ?", "a": "Thomas", "w": ["Jean", "Pierre", "André"], "ref": "Jean 20:27", "ex": "Thomas déclara qu'il ne croirait qu'en voyant et touchant les plaies. Jésus lui apparut et l'y invita directement."}, {"q": "La femme de Loth s'est transformée en...", "a": "Statue de sel", "w": ["Pilier de pierre", "Cendres", "Arbre"], "ref": "Genèse 19:26", "ex": "La femme de Loth désobéit à l'ordre angélique de ne pas regarder en arrière en fuyant Sodome et fut transformée en statue de sel."}, {"q": "Quelle est la première femme citée dans la Bible ?", "a": "Ève", "w": ["Sara", "Rachel", "Rébecca"], "ref": "Genèse 2:22", "ex": "Ève fut formée par Dieu à partir de la côte d'Adam. Son nom signifie 'la vivante', car elle est la mère de tous les êtres vivants."}, {"q": "Dans quel fleuve Jésus fut-il baptisé ?", "a": "Jourdain", "w": ["Nil", "Euphrate", "Sihor"], "ref": "Matthieu 3:13", "ex": "Jean-Baptiste baptisa Jésus dans le Jourdain. À ce moment, le Saint-Esprit descendit comme une colombe et une voix céleste se fit entendre."}, {"q": "Qui était le père de Salomon ?", "a": "David", "w": ["Saül", "Jéroboam", "Asa"], "ref": "2 Samuel 12:24", "ex": "Salomon était le fils du roi David et de Bethsabée. Il succéda à son père sur le trône d'Israël et bâtit le Temple de Jérusalem."}, {"q": "Combien de plaies d'Égypte y a-t-il eu ?", "a": "10", "w": ["7", "12", "9"], "ref": "Exode 7-12", "ex": "Dieu envoya 10 plaies sur l'Égypte pour forcer Pharaon à libérer Israël. La dixième — mort des premiers-nés — fut décisive."}, {"q": "Qui était le frère aîné de Moïse ?", "a": "Aaron", "w": ["Caleb", "Josué", "Nun"], "ref": "Exode 4:14", "ex": "Aaron, frère aîné de Moïse, fut son porte-parole devant Pharaon et devint le premier grand-prêtre d'Israël."}, {"q": "Quel prophète fut emporté dans un char de feu ?", "a": "Élie", "w": ["Énoch", "Élisée", "Amos"], "ref": "2 Rois 2:11", "ex": "Élie fut enlevé au ciel dans un tourbillon par un char et des chevaux de feu. Son manteau tomba sur Élisée, son successeur."}, {"q": "Quel roi a construit le Temple en 7 ans ?", "a": "Salomon", "w": ["David", "Josias", "Ezéchias"], "ref": "1 Rois 6:38", "ex": "Salomon mit 7 ans pour achever la construction du premier Temple de Jérusalem, puis 13 ans pour son propre palais."}, {"q": "Quel pays représentait l'esclavage pour Israël ?", "a": "Égypte", "w": ["Babylone", "Assyrie", "Perse"], "ref": "Exode 1:11", "ex": "L'Égypte symbolise l'esclavage dans la Bible. Les Hébreux y furent soumis aux travaux forcés pendant des générations avant la libération par Moïse."}, {"q": "Quelle était la profession de Pierre avant de suivre Jésus ?", "a": "Pêcheur", "w": ["Charpentier", "Berger", "Collecteur d'impôts"], "ref": "Matthieu 4:18", "ex": "Pierre et son frère André étaient pêcheurs sur le lac de Tibériade quand Jésus les appela : 'Je ferai de vous des pêcheurs d'hommes.'"}, {"q": "Dans quel jardin Jésus fut-il arrêté ?", "a": "Gethsémané", "w": ["Éden", "Siloé", "Josaphat"], "ref": "Matthieu 26:36", "ex": "Jésus pria intensément au jardin de Gethsémané avant son arrestation : 'Que non pas ma volonté, mais la tienne soit faite.'"}, {"q": "Quel disciple a trahi Jésus pour 30 pièces d'argent ?", "a": "Judas", "w": ["Pierre", "Thomas", "Barthélemy"], "ref": "Matthieu 26:15", "ex": "Judas Iscariote négocia la livraison de Jésus aux chefs des prêtres pour 30 pièces d'argent, le désignant par un baiser."}, {"q": "Quel est le premier miracle de Jésus dans Jean ?", "a": "Eau en vin", "w": ["Guérison", "Résurrection", "Multiplication"], "ref": "Jean 2:9", "ex": "Lors d'un mariage à Cana, Jésus transforma l'eau de six jarres en vin excellent. C'est le premier signe rapporté dans l'évangile de Jean."}, {"q": "Combien de jours Jésus passa-t-il au tombeau ?", "a": "3", "w": ["2", "7", "1"], "ref": "Matthieu 12:40", "ex": "Jésus fut crucifié le vendredi et ressuscita le dimanche — soit 3 jours selon le comput hébreu, comme Jonas dans le ventre du poisson."}, {"q": "Sur quelle colline Jésus fut-il crucifié ?", "a": "Golgotha", "w": ["Sion", "Moria", "Sinaï"], "ref": "Jean 19:17", "ex": "Jésus fut crucifié au Golgotha, 'le lieu du crâne', site situé hors des murs de Jérusalem au 1er siècle."}, {"q": "Parmi les quatre évangiles du Nouveau Testament, lequel est le plus court ?", "a": "Marc", "w": ["Jean", "Matthieu", "Luc"], "ref": "Marc 1:1", "ex": "L'évangile de Marc est le plus court des quatre, avec 16 chapitres. Il commence directement par l'activité de Jésus sans généalogie."}, {"q": "Dans les titres des Psaumes, quel nom revient le plus souvent ?", "a": "David", "w": ["Asaph", "Moïse", "Salomon"], "ref": "Psaumes (titres)", "ex": "73 psaumes portent le nom de David dans leurs titres — il fut le plus grand contributeur du livre des Psaumes."}];
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
