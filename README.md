# Texas Road Trip 2027 🤠

Site web interactif pour le road trip famille au Texas (août 2027).  
**Live :** https://odieg60.github.io/texas/

## Structure

```
.
├── index.html              # Structure HTML (squelette)
├── css/
│   └── style.css           # Tous les styles
├── js/
│   ├── data.js             # Données du voyage (source de vérité)
│   └── app.js              # Logique: rendering, map, drawer
├── images/                 # Photos par étape (.jpg)
├── TEXAS_2027.md           # Planning complet en Markdown
├── .github/workflows/      # CI de déploiement
└── README.md               # Ce fichier
```

## Éditer le contenu

Toutes les données du voyage sont dans **`js/data.js`** — modifier là, puis push.

- **Nouvelle activité sur une étape** → `DRAWER_DATA.<stop_id>.days`
- **Nouveau restaurant** → `DRAWER_DATA.<stop_id>.rests`
- **Changer la description courte** → `CARD_DATA[...].stops[...].desc`
- **Ajuster le budget** → `BUDGET_ROWS` ou `BUDGET_TOTAL`

## Remplacer une image

Déposer le nouveau fichier dans `images/`, en gardant le nom (`houston.jpg`, `austin.jpg`, etc.).  
Dimensions recommandées : 900×550, qualité 72, < 150 KB.

## Déploiement

GitHub Pages redéploie automatiquement à chaque push sur `main`.  
Le site est live ~60 secondes après le push.

## Crédits photos

Les photos actuelles proviennent de [goodfreephotos.com](https://www.goodfreephotos.com) (domaine public).  
La carte utilise [CARTO Voyager](https://carto.com/attributions) + [OpenStreetMap](https://www.openstreetmap.org/copyright).
