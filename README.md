# AUDI ELITE — Webshop fictif

Webshop premium fictif pour un concessionnaire Audi, réalisé dans le cadre d'un
exercice académique (droit des sociétés). Site one-page en HTML/CSS/JS (Vite +
Tailwind CSS + GSAP + Lenis + Swiper), sans backend — tous les formulaires
affichent un message de confirmation factice.

## Démarrer en local

```bash
npm install
npm run dev
```

Le site est servi sur `http://localhost:5173/audi-elite/` (le préfixe
`/audi-elite/` vient du `base` configuré dans `vite.config.js` pour GitHub
Pages — voir plus bas).

## Déploiement (GitHub Pages)

Le déploiement est automatique : chaque `push` sur `main` ou
`claude/optimistic-rubin-5eg2ef` déclenche le workflow
`.github/workflows/deploy.yml`, qui build le site et le publie sur GitHub
Pages.

**Étape unique à faire manuellement (une seule fois)** : dans le repo GitHub,
aller dans `Settings > Pages > Build and deployment > Source` et choisir
**"GitHub Actions"**. Une fois fait, le site est en ligne à :

```
https://lrftn.github.io/audi-elite/
```

et se met à jour automatiquement à chaque push.

Pour déployer ailleurs (Vercel, Netlify...), changer `base` dans
`vite.config.js` (mettre `"/"` si le site est servi à la racine du domaine),
puis `npm run build` et déployer le contenu du dossier `dist/`.

## Remplacer le logo

Le logo actuel (`public/assets/logo/audi-elite-logo.png` et sa variante
redimensionnée `audi-elite-logo-512.png`) est utilisé dans la navbar, le
hero, le footer, le loader et les favicons (`public/assets/favicon-*.png`).

Pour le remplacer :
1. Déposer le nouveau fichier dans `public/assets/logo/`.
2. Mettre à jour les références `src="%BASE_URL%assets/logo/..."` dans
   `index.html` (5 occurrences).
3. Régénérer les favicons (32×32, 64×64, 180×180) à partir du nouveau logo
   et les placer dans `public/assets/favicon-32.png`, `-64.png`, `-180.png`.

## Remplacer les photos des voitures

Les visuels actuels sont des illustrations SVG placeholder dans
`public/assets/cars/` (`audi-a1.svg`, `audi-a3.svg`, `audi-a4.svg`,
`audi-q5.svg`). Pour les remplacer par de vraies photos :

1. Ajouter les fichiers (ex. `audi-a3.jpg`) dans `public/assets/cars/`.
2. Mettre à jour le champ `image` correspondant dans
   `src/js/products.js` (utiliser `asset("assets/cars/audi-a3.jpg")`).
3. Mettre à jour la balise `<img>` de la section Promo dans `index.html`
   (Audi A1) si nécessaire.

## Structure du projet

```
index.html                 # page unique, toutes les sections
src/css/main.css           # Tailwind + styles custom (cluster, cartes, accordéons...)
src/js/main.js             # point d'entrée : loader, Lenis, init des modules
src/js/cockpit.js          # Audi Virtual Cockpit (jauges, modes, features)
src/js/gauge.js            # générateur de jauge SVG réutilisable
src/js/shop.js             # grille produits, filtres, modal quick-view, configurateur
src/js/products.js         # données produits (prix, specs, options couleur/velgen)
public/assets/             # logo, favicons, visuels voitures
.github/workflows/deploy.yml  # build + déploiement GitHub Pages automatique
```

## Contenu juridique

Toutes les mentions (coordonnées, conditions générales, déclaration de
confidentialité) sont fictives et rédigées en néerlandais, conformément à
l'énoncé de l'exercice.
