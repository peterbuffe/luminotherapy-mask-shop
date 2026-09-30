# Audit design La Pénombre (30/09/2026)

- Thème audité : `la-penombre-15 (profondeurs)`, en ligne, non modifié.
- Corrections appliquées sur la copie `la-penombre-16 (audit)` (id 208987226443), non publiée.
- Aperçu : https://lapenombre.fr/?preview_theme_id=208987226443
- Référentiel : skill UI/UX Pro Max (`.claude/skills/ui-ux-pro-max`).

## Corrigé dans la copie

| # | Problème | Fichier(s) | Correction |
|---|----------|------------|------------|
| 1 | En-tête et pied de page illisibles sur les pages annexes (contraste 1,18:1) | `layout/theme.liquid`, `config/settings_data.json` | `selynera.css` n'est plus chargé ; les 5 schémas Dawn passent à la palette prune pour tout le site |
| 2 | Textes de 9 à 12 px ; champ e-mail à 14 px (zoom iOS) | `assets/penombre-fixes.css`, `layout/theme.liquid` | 12 px minimum, texte courant et champ e-mail à 16 px |
| 3 | Appel à l'action du hero : petit texte de 9,5 px | `assets/penombre-fixes.css` | Vrai bouton de 48 px de haut, vieux rose sur prune |
| 4 | Polices chargées deux fois, dont une via Google Fonts (RGPD) | `assets/penombre.css`, `layout/theme.liquid` | `@import` Google retiré ; graisses 300, 500, 600 et italiques servies par Shopify |
| 6 | Mention Klarna à 4,0:1, bordure du champ à 2,4:1, focus invisible sur fond sombre | `assets/penombre-fixes.css` | Contrastes relevés ; contour de focus vieux rose |
| 7 | « 3 × 66,33 € » ne fait pas 199 € | `sections/penombre-product.liquid` | « environ » ajouté quand le prix ne se divise pas juste par 3 |
| - | `penombre.css` gardait l'ancienne palette bleu nuit | `assets/penombre.css` | `:root` aligné sur la palette prune |
| - | `theme-color` vide | `layout/theme.liquid` | `#150812` |
| - | Pastilles de preuve de 28 à 32 px de haut | `assets/penombre-fixes.css` | 44 px minimum |
| - | « 0 » avis affiché de 80 à 110 px | `assets/penombre-fixes.css` | Réduit à 40–56 px |

`penombre-fixes.css` est chargé en dernier par la section `penombre-palette`. Ses sélecteurs sont préfixés par `#MainContent` pour passer devant les styles des sections sans `!important`.

## Reste à faire

- **Photos :** remplacer les 2 visuels IA par de vraies photos dès réception de l'exemplaire (1 600 px ou plus). Vider alors le réglage « Mention sous la galerie ».
- **Diapositive d3 de l'accueil :** elle pointe vers `Adorable_Cat_2.png` (7,2 Mo, alt vide). À vérifier et remplacer.
- **Textes alternatifs de l'accueil** (`sections/penombre-home.liquid`) : utiliser `image.alt` plutôt que les titres de section.
- **Image masquée sur mobile :** `.hero__side`, cachée sous 990 px, est quand même chargée en `eager`. La passer en `lazy`.
- **Hero :** envisager le champ e-mail de la liste d'attente directement dans le hero.
- **Menu `footer` (non utilisé) :** le lien CGV pointe vers `/policies/terms-of-service` au lieu de `/policies/terms-of-sale`.
- **Cookies :** vérifier que la bannière Shopify Customer Privacy est active.
- **Nettoyage :** `selynera.css`, `selynera-live-totals.js`, `mask-blobs.css`, `sparkle.gif` et les icônes Dawn inutilisées. Retirer les `!important` devenus inutiles dans `penombre-palette`.
- **Thèmes non publiés :** une vingtaine d'anciennes versions, à trier.

## Animations aux points de décision (30/09, copie `la-penombre-16 (audit)`)

Les animations existantes sont conservées : « la lumière baisse », lueur du titre, points de couleur, parallaxe, frise `#etat`, coche de confirmation. S'y ajoutent `assets/penombre-motion.css` et `assets/penombre-motion.js`, chargés par `penombre-palette` :

| Endroit | Effet | Pourquoi |
|---------|-------|----------|
| Hero, carte d'offre | Arrive 0,35 s après le titre (fondu et montée de 12 px) | Le titre accroche, puis l'offre prend le relais |
| Hero, bouton « Prévenez-moi » | 2 halos vieux rose à 2,7 s, une fois par visite | Guide le regard vers l'action à la fin de « la lumière baisse » |
| Fiche produit, bouton de la liste d'attente | 2 halos à 1,4 s | Point de conversion principal de la fiche |
| Barre mobile | 1 halo sur le bouton à sa première apparition | Signale la nouvelle action disponible |
| Boutons d'action | Montée de 1 px au survol, légère pression à l'appui | Retour immédiat au toucher et au clic |
| Réassurance, caractéristiques, pastilles, points clés | Arrivée en cascade (70 ms d'écart), une fois | Attire l'œil sur les preuves de confiance |

- Aucune boucle infinie.
- Tout est coupé si « réduire les animations » est actif.
- Sans JavaScript, rien n'est caché.
- Une liste déjà visible à l'écran au chargement n'est pas masquée.

## Accueil « cinéma » (30/09, thème `la-penombre-17 (cinema)`, id 209007411531, non publié)

- Transposé de la maquette validée (`docs/maquette-accueil-cinema.html`, publiée en artefact : https://claude.ai/artifact/6i3t8oYsZSScfrFALKi4Zo).
- Nouvelle section `sections/penombre-cinema.liquid`, avec `assets/penombre-cinema.css`. `templates/index.json` ne contient plus que cette section et `penombre-palette`.
- **Hero :** vidéo en boucle et sans son, tirée de Contenu > Fichiers.
  - Sur ordinateur : `masque-du-soir-chevet-rouge.mp4` (11 Mo).
  - Sur téléphone : `masque-du-soir-draps-bleu.mp4` (5 Mo).
  - Image fixe si « réduire les animations » ou « économie de données » est actif.
- **Parcours :** 5 temps (lumières, rituel avec minuteur d'une minute, preuves avec l'encadré « Pas de prix barré… », 5 questions, liste d'attente). La liste d'attente enregistre les inscrits avec les tags `liste-attente,masque-du-soir`, comme la fiche produit.
- **Aperçu :** https://lapenombre.fr/?preview_theme_id=209007411531
