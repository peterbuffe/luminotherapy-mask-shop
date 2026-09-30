/* ==========================================================
   La Pénombre : penombre-motion.js (30/09/2026)
   Chargé (defer) par la section penombre-palette, avec penombre-motion.css.
   1. Listes de confiance (réassurance, caractéristiques, pastilles de preuve) :
      les éléments arrivent l'un après l'autre, une seule fois.
   2. Barre mobile : repère sa première apparition (classe is-first) pour
      éclairer son bouton une fois.
   Réglage « réduire les animations » ou navigateur sans IntersectionObserver :
   rien n'est caché, rien ne bouge.
   ========================================================== */
(function () {
  'use strict';

  var d = document;
  var reduce = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  if (reduce || !('IntersectionObserver' in window)) return;

  var LISTS = '.trust__grid, .specs, .pp__proofs, .pp__usp';

  function initStagger(scope) {
    var lists = (scope || d).querySelectorAll(LISTS);
    if (!lists.length) return;
    d.documentElement.classList.add('pn-motion');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.2 });
    var vh = window.innerHeight || d.documentElement.clientHeight;
    Array.prototype.forEach.call(lists, function (list) {
      if (list.hasAttribute('data-pn-stagger')) return;
      /* Déjà à l'écran au chargement : affichée telle quelle, sans disparaître d'abord. */
      if (list.getBoundingClientRect().top < vh) {
        list.classList.add('is-in');
        list.setAttribute('data-pn-stagger', '');
        return;
      }
      Array.prototype.forEach.call(list.children, function (child, i) {
        child.style.setProperty('--pn-i', Math.min(i, 7));
      });
      list.setAttribute('data-pn-stagger', '');
      io.observe(list);
    });
  }

  function initBuybar(scope) {
    var bars = (scope || d).querySelectorAll('[data-buybar]');
    Array.prototype.forEach.call(bars, function (bar) {
      if (bar.hasAttribute('data-pn-watched')) return;
      bar.setAttribute('data-pn-watched', '');
      var mo = new MutationObserver(function () {
        if (bar.classList.contains('is-on')) {
          bar.classList.add('is-first');
          mo.disconnect();
        }
      });
      mo.observe(bar, { attributes: true, attributeFilter: ['class'] });
    });
  }

  function init(scope) {
    initStagger(scope);
    initBuybar(scope);
  }

  if (d.readyState === 'loading') {
    d.addEventListener('DOMContentLoaded', function () { init(); });
  } else {
    init();
  }

  /* Éditeur de thème : une section rechargée repart de zéro. */
  d.addEventListener('shopify:section:load', function (e) { init(e.target); });
})();
