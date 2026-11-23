/* Thème clair / sombre.
   Par défaut, le site suit le réglage du système. Le bouton « thème » permet de choisir
   l'autre mode ; ce choix reste uniquement dans le navigateur (localStorage), il n'est envoyé nulle part. */
(function () {
  var KEY = 'manna-theme';
  var root = document.documentElement;
  root.classList.add('js');

  function stored() {
    try {
      var v = localStorage.getItem(KEY);
      return v === 'light' || v === 'dark' ? v : null;
    } catch (e) {
      return null;
    }
  }

  function system() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function current() {
    return root.getAttribute('data-theme') || system();
  }

  var saved = stored();
  if (saved) root.setAttribute('data-theme', saved);

  function sync() {
    var light = current() === 'light';
    var label = light ? 'Passer en mode sombre' : 'Passer en mode clair';
    var buttons = document.querySelectorAll('[data-theme-toggle]');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute('aria-label', label);
      buttons[i].setAttribute('title', label);
      buttons[i].setAttribute('data-mode', light ? 'light' : 'dark');
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    var buttons = document.querySelectorAll('[data-theme-toggle]');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', function () {
        var next = current() === 'light' ? 'dark' : 'light';
        root.setAttribute('data-theme', next);
        try {
          localStorage.setItem(KEY, next);
        } catch (e) {}
        sync();
      });
    }
    if (window.matchMedia) {
      var mq = window.matchMedia('(prefers-color-scheme: light)');
      var onChange = function () {
        if (!stored()) sync();
      };
      if (mq.addEventListener) mq.addEventListener('change', onChange);
      else if (mq.addListener) mq.addListener(onChange);
    }
    sync();
  });
})();
