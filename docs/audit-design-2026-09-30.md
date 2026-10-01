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
- **Hero, version couleurs (30/09) :** vidéos de 10 s où la lumière du masque passe du bleu au rouge puis au rouge profond, et revient à l'image de départ pour boucler sans saut.
  - Ordinateur : `masque-du-soir-couleurs-ordinateur.mp4` (16:9, 7,1 Mo).
  - Téléphone : `masque-du-soir-couleurs-telephone.mp4` (9:16, 7,8 Mo).

## Parcours d'achat « cinéma » (30/09, thème `la-penombre-17 (cinema)`)

- **Accueil :**
  - **En-tête transparent** au-dessus de la vidéo du hero, qui repasse en prune dès 40 px de défilement. La règle est limitée aux pages qui contiennent la section cinéma (`body:has(#pc-…)`).
  - **Inscription directe dans le hero :** formulaire `customer`, identifiant `wl-hero`, mêmes tags `liste-attente,masque-du-soir`. Le bouton « Découvrir le masque » réapparaît dès que le produit est en vente.
- **Fiche produit :** `templates/product.json` enchaîne `main` → `film` → `lumieres` → `palette`.
  - `sections/penombre-film.liquid` : bande vidéo plein cadre, avec les vidéos de couleurs et une légende 430, 630 et 850 nm. La vidéo n'est chargée qu'à l'approche de la bande.
  - `sections/penombre-lumieres.liquid` : la coupe des 3 lumières. La lumière « descend » à l'arrivée, une seule fois.
  - `assets/penombre-cinema-product.css` : habillage du bloc d'achat (serif fine, angles nets). La mise en page ne change pas, et la liste d'attente, la barre mobile et la visionneuse restent intactes.
- **Schéma des 3 lumières retiré de la fiche produit (30/09, demande de Peter : « je ne vois pas l'utilité ») :**
  - La figure `.pv__lum` est retirée de `snippets/penombre-preuves.liquid`.
  - La section `penombre-lumieres` est retirée de `templates/product.json` ; elle faisait doublon avec la figure.
  - Les longueurs d'onde restent dites dans les points clés et dans la FAQ.
  - La section `lumieres` de l'accueil cinéma est en attente de décision.
- **« Les trois lumières » retiré aussi de l'accueil cinéma (01/10, accord de Peter) :** l'accueil enchaîne hero → rituel → preuves → questions → liste d'attente. Les réglages `lum_*` restent dans le schéma, sans être utilisés.

## Revue UI/UX Pro Max (01/10, thème `la-penombre-17 (cinema)`)

| Règle du skill | Problème | Correction |
|----------------|----------|------------|
| Vidéo en lecture automatique / contenu animé (WCAG 2.2.2, priorité haute) | Les vidéos en boucle n'avaient pas de bouton pause | Bouton pause/lecture de 44 px sur le hero et sur la bande vidéo. Arrêt hors de l'écran, reprise au retour sauf pause volontaire |
| Emplacement de l'erreur (priorité haute) | Le formulaire du hero n'affichait aucun message d'erreur | Message sous le champ, relié par `aria-describedby`, annoncé avec `role="alert"` |
| Contraste du texte | Logo et menu transparents sur le haut d'une vidéo claire | Dégradé sombre ajouté en haut du voile du hero ; mention IA passée de 60 % à 78 % d'opacité |
| Défilement vers une ancre | `#attente` arrivait sous l'en-tête collant, sans transition | `scroll-margin-top` égal à la hauteur de l'en-tête, défilement doux sauf si « réduire les animations » est actif |

## Pages secondaires (01/10, thème `la-penombre-17 (cinema)`)

- **Bug trouvé (présent aussi sur le thème en ligne) :** les pages « Nos preuves » (`page.preuves`), « Qui vous répond » (`page.qui`) et « Suivi de commande » (`page.suivi`) demandent des modèles absents du thème. Shopify retombe sur `page.json`. « Nos preuves » et « Qui vous répond », sans texte dans l'admin, s'affichent donc vides.
- **Nouvelle section `sections/penombre-page.liquid` :**
  - bandeau prune avec surtitre, titre de la page en serif fine et phrase d'introduction ;
  - texte de la page dans une colonne de 68 caractères ;
  - au choix, le bloc commun des preuves ou de « Qui vous répond », et la frise « Où nous en sommes ».
- **Modèles :**

| Modèle | Page | Contenu |
|--------|------|---------|
| `page.json` | Mentions légales et autres pages | Texte de la page |
| `page.suivi.json` | Suivi de commande | Texte de la page |
| `page.preuves.json` | Nos preuves | Bloc des preuves complet |
| `page.qui.json` | Qui vous répond | Bloc « Qui vous répond » et frise |
| `page.contact.json` | Contact | Texte de la page et formulaire de contact Dawn (schéma prune) |

## SEO, textes et confiance (01/10)

**Appliqué en direct (contenu Shopify, partagé par tous les thèmes) :**
- **Fiche produit :**
  - titre Google « Masque LED visage bleu, rouge, infrarouge | La Pénombre » ;
  - description Google de 150 caractères ;
  - description réécrite à la première personne (« je » = Peter), sans changer aucun fait.
- **Page Suivi de commande :**
  - **correction d'une contradiction** : elle annonçait 2 à 5 jours ouvrés après l'expédition, alors que la fiche et la FAQ disent 3 à 4 semaines ;
  - texte réécrit, formulaire aux couleurs prune, mention « le suivi peut rester immobile au début ».
- **Page Contact :** texte ajouté (« C'est moi, Peter, qui lis chaque message… »).
- **Pages Contact, Suivi, Nos preuves et Qui vous répond :** titres et descriptions Google revus.
- Contenu source : `content/`.

**Préparé pour le thème (en attente d'une copie : le thème cinéma est publié, et la boutique est à 20 thèmes) :**
- **Accueil :**
  - nouveau titre H1 « Votre masque LED du soir. Dix minutes, les yeux fermés. » ;
  - bande de réassurance sous le hero (livraison offerte, 30 jours, aucun UV, Peter vous répond) ;
  - textes à la première personne ;
  - données structurées Organization et FAQPage.
- **Partage après inscription** (`penombre-motion.js/.css`) : partage du téléphone, WhatsApp ou copie du lien, sans récompense.
- **Fiche produit** (`templates/product.json`) : textes de la liste d'attente et de la FAQ à la première personne.

### Mise en ligne sur la copie « la-penombre-18 (confiance) » (01/10)
- Thème 209014030667 : envoyés penombre-motion.js/css (partage après inscription), sections/penombre-cinema.liquid (bande de réassurance, Organization + FAQPage JSON-LD), templates/index.json et product.json (textes à la première personne).
- Deux textes par défaut passés à la première personne (mention IA, mention sous le formulaire).
- Intitulé de réglage raccourci : Shopify limite les titres de rubrique à 50 caractères.
- Aperçu : https://lapenombre.fr/?preview_theme_id=209014030667 ; à publier par Peter.
