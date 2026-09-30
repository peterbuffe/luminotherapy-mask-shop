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
