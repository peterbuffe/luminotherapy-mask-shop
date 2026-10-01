/* ==========================================================
   La Pénombre : penombre-motion.js (30/09/2026)
   Chargé (defer) par la section penombre-palette, avec penombre-motion.css.
   1. Listes de confiance (réassurance, caractéristiques, pastilles de preuve) :
      les éléments arrivent l'un après l'autre, une seule fois.
   2. Barre mobile : repère sa première apparition (classe is-first) pour
      éclairer son bouton une fois.
   3. Bouche à oreille (01/10) : après une inscription réussie à la liste d'attente,
      un petit bloc propose d'envoyer le lien à une amie (partage du téléphone,
      WhatsApp, ou copie du lien). Aucune récompense promise : juste le lien.
   Réglage « réduire les animations » ou navigateur sans IntersectionObserver :
   rien n'est caché, rien ne bouge (le partage, lui, fonctionne toujours).
   ========================================================== */
(function () {
  'use strict';

  var d = document;

  /* ---------- 3. Partage après inscription (indépendant des animations) ---------- */
  var SHARE_URL = 'https://lapenombre.fr';
  var SHARE_TXT = 'Je viens de découvrir La Pénombre : un masque LED pour dix minutes de calme, le soir. Pas encore en vente, on peut être prévenue ici :';
  function initShare(scope) {
    var oks = (scope || d).querySelectorAll('.pc-hok, .pc-ok, .pp__waitok');
    if (!oks.length) return;
    var ok = oks[0];
    if (ok.parentNode.querySelector('.pn-share')) return;
    var box = d.createElement('div');
    box.className = 'pn-share';
    var wa = 'https://wa.me/?text=' + encodeURIComponent(SHARE_TXT + ' ' + SHARE_URL);
    box.innerHTML =
      '<p class="pn-share__t">Une amie mérite aussi ses dix minutes ? Envoyez-lui le lien.</p>' +
      '<div class="pn-share__b">' +
        (navigator.share ? '<button type="button" data-pn-share>Partager</button>' : '') +
        '<a href="' + wa + '" target="_blank" rel="noopener">WhatsApp</a>' +
        '<button type="button" data-pn-copy>Copier le lien</button>' +
      '</div>' +
      '<p class="pn-share__ok" aria-live="polite"></p>';
    ok.insertAdjacentElement('afterend', box);
    var msg = box.querySelector('.pn-share__ok');
    var sh = box.querySelector('[data-pn-share]');
    if (sh) sh.addEventListener('click', function () {
      navigator.share({ title: 'La Pénombre', text: SHARE_TXT, url: SHARE_URL }).catch(function () {});
    });
    box.querySelector('[data-pn-copy]').addEventListener('click', function () {
      var done = function () { msg.textContent = 'Lien copié. Il ne reste qu’à le coller dans votre message.'; };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(SHARE_URL).then(done, function () { msg.textContent = 'Le lien : ' + SHARE_URL; });
      } else { msg.textContent = 'Le lien : ' + SHARE_URL; }
    });
  }
  if (d.readyState === 'loading') { d.addEventListener('DOMContentLoaded', function () { initShare(); }); } else { initShare(); }

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
