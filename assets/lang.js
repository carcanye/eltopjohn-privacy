/* Las dos versiones de cada página van en el mismo fichero, una al lado de la
   otra, y aquí solo se elige cuál se ve. Es lo mismo que hace el juego con las
   cartas: teniendo el original y la traducción a la vista se nota si una se
   queda atrás, y una sola URL vale para las dos tiendas. */
(function () {
  var KEY = 'eltopjohn.web.lang';

  function apply(lang, remember) {
    var root = document.documentElement;
    root.setAttribute('data-lang', lang);
    root.setAttribute('lang', lang);

    var title = document.querySelector('title');
    if (title && title.dataset[lang]) document.title = title.dataset[lang];

    Array.prototype.forEach.call(document.querySelectorAll('.langs button'), function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-set-lang') === lang));
    });

    if (remember) {
      try { localStorage.setItem(KEY, lang); } catch (e) { /* modo privado */ }
    }
  }

  // El idioma ya lo dejó puesto el script de la cabecera; aquí solo se
  // sincroniza el botón y el título, que necesitan el DOM cargado.
  apply(document.documentElement.getAttribute('data-lang') === 'en' ? 'en' : 'es', false);

  document.addEventListener('click', function (ev) {
    var btn = ev.target.closest ? ev.target.closest('.langs button') : null;
    if (!btn) return;
    apply(btn.getAttribute('data-set-lang'), true);
  });
})();
