/* ═══════════════════════════════════════════════════════════════
   Texas Road Trip 2027 — Data
   Single source of truth for all trip content
   ═══════════════════════════════════════════════════════════════ */

const STOPS = [
  { id: 'houston',       name: 'Houston',         lat: 29.7604, lng: -95.3698,  day: 'J1–3',   color: '#63B3ED', km: null, h: null },
  { id: 'galveston',     name: 'Galveston',       lat: 29.3013, lng: -94.7977,  day: 'J4',     color: '#68D391', km: 80,   h: '45 min' },
  { id: 'sanantonio',    name: 'San Antonio',     lat: 29.4241, lng: -98.4936,  day: 'J5–7',   color: '#B794F4', km: 310,  h: '3h' },
  { id: 'fredericksburg',name: 'Fredericksburg',  lat: 30.2752, lng: -98.8720,  day: 'J8–9',   color: '#68D391', km: 120,  h: '1h30' },
  { id: 'austin',        name: 'Austin',          lat: 30.2672, lng: -97.7431,  day: 'J10–12', color: '#63B3ED', km: 120,  h: '1h15' },
  { id: 'dallas',        name: 'Dallas/FW',       lat: 32.7767, lng: -96.7970,  day: 'J13–14', color: '#B794F4', km: 290,  h: '3h' },
  { id: 'paloduro',      name: 'Palo Duro',       lat: 34.9774, lng: -101.6623, day: 'J15',    color: '#68D391', km: 490,  h: '5h' },
  { id: 'marfa',         name: 'Marfa',           lat: 30.3088, lng: -104.0207, day: 'J16–17', color: '#B794F4', km: 470,  h: '4h30' },
  { id: 'bigbend',       name: 'Big Bend',        lat: 29.2498, lng: -103.2502, day: 'J18–19', color: '#68D391', km: 100,  h: '1h15' }
];

/* Map Leaflet-friendly category → BEM modifier */
const CATEGORY_CLASS = {
  city: 'card__type--city',
  nature: 'card__type--nature',
  culture: 'card__type--culture'
};

/* Trip card summaries (for the main list) */
const CARD_DATA = [
  {
    week: 's1',
    num: '01',
    title: 'Grandes villes & côte du Golfe',
    sub: 'Jours 1–7 · Houston → Galveston → San Antonio',
    stops: [
      { id: 'houston',    reversed: false, badge: 'Jours 1–3', category: 'city',    type: 'Ville', name: 'Houston',         sub: '2 nuits · Arrivée GVA–EWR–IAH',      desc: 'NASA Space Center, Museum District, Buffalo Bayou Park. Récupération jet-lag.',                 tags: ['NASA Space Center','Museum of Natural Science','Buffalo Bayou Park','BBQ texan'], warn: null,   meta: ['📍 Houston, TX','🏨 2 nuits','🌡 38–40°C'] },
      { id: 'galveston',  reversed: true,  badge: 'Jour 4',    category: 'nature',  type: 'Nature · Côte', name: 'Galveston',  sub: '1 nuit · 80 km de Houston · 45 min',  desc: 'Plage du Golfe, Moody Gardens, front de mer victorien.',                                        tags: ['Plage du Golfe','Moody Gardens','Front de mer victorien'], warn: null,   meta: ['📍 Galveston, TX','🏨 1 nuit','🚗 80 km'] },
      { id: 'sanantonio', reversed: false, badge: 'Jours 5–7', category: 'culture', type: 'Culture · Histoire', name: 'San Antonio', sub: '2 nuits · 310 km · 3h depuis Galveston', desc: 'The Alamo, River Walk, Natural Bridge Caverns (20°C constants). La ville la plus mexicaine du Texas.', tags: ['The Alamo','River Walk','Natural Bridge Caverns','Six Flags Fiesta'], warn: '⚑ Réserver Natural Bridge Caverns — 20°C permanents, refuge contre la chaleur', meta: ['📍 San Antonio, TX','🏨 2 nuits','🚗 310 km'] }
    ]
  },
  {
    week: 's2',
    num: '02',
    title: 'Hill Country & Dallas',
    sub: 'Jours 8–14 · Fredericksburg → Austin → Dallas / Fort Worth',
    stops: [
      { id: 'fredericksburg', reversed: true,  badge: 'Jours 8–9',   category: 'nature',  type: 'Nature · Hill Country', name: 'Fredericksburg + Enchanted Rock', sub: '2 nuits · 120 km · 1h30 depuis San Antonio', desc: 'Village texano-allemand, vignobles, Enchanted Rock (dôme granitique 130 m), Luckenbach.',       tags: ['Enchanted Rock','Texas Wine Trail','Luckenbach','Pedernales Falls SP'], warn: '⚑ Enchanted Rock : réservation en ligne obligatoire. Partir avant 8h.', meta: ['📍 Fredericksburg, TX','🏨 2 nuits','🚗 120 km'] },
      { id: 'austin',         reversed: false, badge: 'Jours 10–12', category: 'city',    type: 'Ville · Musique',       name: 'Austin',                          sub: '2 nuits · 120 km · 1h15 depuis Fredericksburg', desc: '"Keep Austin Weird." Barton Springs (20°C), 6th Street live, 1,5M chauves-souris, food trucks.', tags: ['Barton Springs Pool','6th Street live','Congress Bridge bats','Texas State Capitol'],   warn: null, meta: ['📍 Austin, TX','🏨 2 nuits','🚗 120 km'] },
      { id: 'dallas',         reversed: true,  badge: 'Jours 13–14', category: 'culture', type: 'Culture · Histoire',    name: 'Dallas / Fort Worth',             sub: '2 nuits · 290 km · 3h depuis Austin',          desc: 'Sixth Floor Museum (JFK), Fort Worth Stockyards (longhorns en ville), Perot Museum.',           tags: ['Sixth Floor Museum','FW Stockyards','Perot Museum','Dinosaur Valley SP'], warn: null, meta: ['📍 Dallas / FW, TX','🏨 2 nuits','🚗 290 km'] }
    ]
  },
  {
    week: 's3',
    num: '03',
    title: 'West Texas Sauvage',
    sub: 'Jours 15–21 · Palo Duro → Marfa → Big Bend → Retour Houston',
    stops: [
      { id: 'paloduro', reversed: false, badge: 'Jour 15',     category: 'nature',  type: 'Nature · Canyon',  name: 'Palo Duro Canyon', sub: '1 nuit · 490 km · 5h depuis Dallas',       desc: 'Le "Grand Canyon du Texas." Falaises bordeaux 240 m. Lighthouse Trail. Cadillac Ranch Amarillo.',       tags: ['Lighthouse Trail','Cadillac Ranch · Amarillo','Coucher de soleil','Lodge dans parc'], warn: '⚑ Partir tôt — chaleur dangereuse dès 10h en août', meta: ['📍 Canyon, TX','🏨 1 nuit','🚗 490 km'] },
      { id: 'marfa',    reversed: true,  badge: 'Jours 16–17', category: 'culture', type: 'Art · Désert',     name: 'Marfa',            sub: '1 nuit · 470 km · 4h30 depuis Palo Duro',  desc: '2 000 habitants, capitale mondiale de l\'art contemporain dans le désert de Chihuahua.',               tags: ['Chinati Foundation','Marfa Lights','Prada Marfa','Architecture adobe'], warn: null, meta: ['📍 Marfa, TX','🏨 1 nuit','🚗 470 km'] },
      { id: 'bigbend',  reversed: false, badge: 'Jours 18–19', category: 'nature',  type: 'National Park',    name: 'Big Bend',         sub: '2 nuits · 100 km · 1h15 depuis Marfa',     desc: 'Santa Elena Canyon, Fossil Discovery Exhibit, Voie Lactée garantie. Le parc le plus sauvage des USA.', tags: ['Santa Elena Canyon','Fossil Discovery Exhibit','Voie Lactée','Hot Springs'], warn: '⚑ +40°C le jour. Chisos Lodge fermé. Hébergt : Far Flung ou Big Bend Station.', meta: ['📍 Big Bend NP, TX','🏨 2 nuits','🚗 100 km'] }
    ]
  }
];

/* Detail content (shown in drawer on click) */
const DRAWER_DATA = {
  houston: {
    badge: 'Jours 1–3', name: 'Houston', sub: '2 nuits · Arrivée depuis Genève via Newark · 38–40°C',
    days: [
      { num: 'Jour 1 — Arrivée', items: [
        { icon: '✈️', text: '<strong>Atterrissage IAH</strong> après ~15h de voyage (GVA→EWR→IAH). Récupération bagages, prise du SUV.' },
        { icon: '🏨', text: '<strong>Hôtel :</strong> Marriott Houston Medical Center ou Hyatt Regency Downtown.' },
        { icon: '🍖', text: '<strong>Dîner :</strong> Killen\'s BBQ — le vrai BBQ texan dès J1.' }
      ]},
      { num: 'Jour 2 — NASA & Museum District', items: [
        { icon: '🚀', text: '<strong>Space Center Houston</strong> (9h–17h) — Saturn V, simulateur astronaute, Mission Control Apollo. Idéal 7–12 ans.' },
        { icon: '🦕', text: '<strong>Museum of Natural Science</strong> — dinosaures, minéraux, espace. ~$15/adulte.' },
        { icon: '🌿', text: '<strong>Buffalo Bayou Park</strong> le soir — promenade, food trucks, art de rue.' }
      ]},
      { num: 'Jour 3 — Heights & départ Galveston', items: [
        { icon: '☕', text: '<strong>Heights neighborhood</strong> — cafés branchés, maisons victoriennes, marché dominical.' },
        { icon: '🎨', text: '<strong>Menil Collection</strong> — musée d\'art contemporain gratuit, classe mondiale.' },
        { icon: '🚗', text: '<strong>Route vers Galveston</strong> (80 km, 45 min) en fin d\'après-midi.' }
      ]}
    ],
    rests: [
      { name: 'Killen\'s BBQ',           sub: 'Brisket de compétition · Pearland',          price: '$25–40/pers.' },
      { name: 'Gatlin\'s BBQ',           sub: 'Quartier Heights, brisket + ribs',           price: '$20–35/pers.' },
      { name: 'Ninfa\'s on Navigation',  sub: 'Tex-Mex historique depuis 1973',             price: '$15–25/pers.' },
      { name: 'Menil Collection Café',   sub: 'Déjeuner culture · cadre unique',            price: '$12–18/pers.' }
    ],
    tips: [
      { icon: '🌡', text: 'Réserver NASA tôt le matin. Climatisé toute la journée.' },
      { icon: '🚗', text: 'Houston n\'est pas piétonne. Voiture obligatoire pour tous les déplacements.' },
      { icon: '💧', text: 'Bouteilles d\'eau partout. 40°C à l\'ombre dès 10h.' },
      { icon: '💰', text: 'Houston Museum Pass — couvre plusieurs musées du district.' }
    ],
    budget: [{ label: 'Hôtel/nuit', value: '$120–200' }, { label: 'Repas/pers./j', value: '$40–70' }, { label: 'Activités', value: '$50–80/pers.' }],
    map: 'https://www.google.com/maps/search/Houston+Texas'
  },
  galveston: {
    badge: 'Jour 4', name: 'Galveston', sub: '1 nuit · 80 km de Houston · Plage du Golfe du Mexique',
    days: [
      { num: 'Jour 4 — Plage & île', items: [
        { icon: '🚗', text: '<strong>Route Houston → Galveston</strong> (80 km, 45 min) via I-45 South.' },
        { icon: '🏖', text: '<strong>Stewart Beach</strong> — eau chaude 30°C+, sable beige. Baignade toute la matinée.' },
        { icon: '🌴', text: '<strong>Moody Gardens</strong> — aquarium 250+ espèces, cinéma 4D, serre tropicale. ~$25/pers.' },
        { icon: '🏛', text: '<strong>Strand Historic District</strong> — architecture victorienne, boutiques, soirée agréable.' }
      ]}
    ],
    rests: [
      { name: 'Gaido\'s Seafood',          sub: 'Fruits de mer depuis 1911 · Classique absolu', price: '$25–40/pers.' },
      { name: 'Shrimp \'N Stuff',          sub: 'Crevettes locales, décontracté',               price: '$15–20/pers.' },
      { name: 'Landry\'s Seafood',         sub: 'Vue Seawall, belle ambiance',                  price: '$30–50/pers.' },
      { name: 'Original Mexican Cuisine',  sub: 'Tex-Mex sur le Strand',                        price: '$15–25/pers.' }
    ],
    tips: [
      { icon: '🏖', text: 'SPF 50 obligatoire — soleil très agressif sur le golfe en août.' },
      { icon: '🦀', text: 'Crevettes du Golfe = les meilleures. Ne pas manquer un repas de fruits de mer.' },
      { icon: '⛱', text: 'Location parasols possible sur Stewart Beach (~$20).' },
      { icon: '🌊', text: 'Vérifier conditions — méduses possibles en été.' }
    ],
    budget: [{ label: 'Hôtel/nuit', value: '$100–180' }, { label: 'Repas/pers./j', value: '$35–60' }, { label: 'Activités', value: '$40–60/pers.' }],
    map: 'https://www.google.com/maps/search/Galveston+Texas+beach'
  },
  sanantonio: {
    badge: 'Jours 5–7', name: 'San Antonio', sub: '2 nuits · 310 km · 3h de Galveston · Histoire & culture',
    days: [
      { num: 'Jour 5 — The Alamo & River Walk', items: [
        { icon: '🚗', text: '<strong>Route Galveston → San Antonio</strong> (310 km, 3h via I-10 West).' },
        { icon: '🏛', text: '<strong>The Alamo</strong> — église de la mission et musée (gratuit). Bataille de 1836. 1h30.' },
        { icon: '🌊', text: '<strong>River Walk</strong> — promenade le long du canal. Restaurants, lumières, soirée.' }
      ]},
      { num: 'Jour 6 — Grottes & Mission Trail', items: [
        { icon: '🦇', text: '<strong>Natural Bridge Caverns</strong> (9h) — 20°C constant, stalactites géants. Réserver en ligne !' },
        { icon: '⛪', text: '<strong>Mission San José</strong> — plus grande mission coloniale espagnole du Texas. Gratuit (NPS).' },
        { icon: '🎡', text: '<strong>Six Flags Fiesta Texas</strong> — rollercoasters, Wild West. ~$50/pers. en ligne.' }
      ]},
      { num: 'Jour 7 — San Pedro & départ', items: [
        { icon: '🌿', text: '<strong>San Pedro Springs Park</strong> — piscine naturelle gratuite, l\'un des plus vieux parcs USA.' },
        { icon: '🛒', text: '<strong>Market Square (El Mercado)</strong> — plus grand marché mexicain USA. Artisanat, shopping.' },
        { icon: '🚗', text: '<strong>Route → Fredericksburg</strong> (120 km, 1h30) via US-290 West.' }
      ]}
    ],
    rests: [
      { name: 'Biga on the Banks',  sub: 'Gastronomique · Vue River Walk',         price: '$40–60/pers.' },
      { name: 'Mi Tierra Café',     sub: 'Tex-Mex 24h/24 · Market Square',         price: '$15–25/pers.' },
      { name: 'The Guenther House', sub: 'Breakfast historique · Pearl District',  price: '$12–18/pers.' },
      { name: 'Barbacoa Cotija',    sub: 'Mexicain authentique · local',           price: '$10–15/pers.' }
    ],
    tips: [
      { icon: '🌡', text: 'Natural Bridge Caverns = refuge climatisé parfait. Réservation obligatoire en ligne.' },
      { icon: '🦇', text: 'River Walk en soirée uniquement — trop chaud le jour. Dîner sur l\'eau, c\'est magique.' },
      { icon: '🎢', text: 'Six Flags : billets en ligne 48h avant = 30–40% moins cher.' },
      { icon: '🅿', text: 'Parking payant downtown (~$15/j). Utiliser les parkings du River Walk.' }
    ],
    budget: [{ label: 'Hôtel/nuit', value: '$100–170' }, { label: 'Repas/pers./j', value: '$35–60' }, { label: 'Activités', value: '$60–100/pers.' }],
    map: 'https://www.google.com/maps/search/San+Antonio+River+Walk'
  },
  fredericksburg: {
    badge: 'Jours 8–9', name: 'Fredericksburg + Enchanted Rock', sub: '2 nuits · 120 km de San Antonio · Hill Country',
    days: [
      { num: 'Jour 8 — Arrivée & Hill Country', items: [
        { icon: '🚗', text: '<strong>Route San Antonio → Fredericksburg</strong> (120 km, 1h30) via US-290.' },
        { icon: '🛒', text: '<strong>Main Street</strong> — village allemand pittoresque, boutiques, brasseries, boucheries.' },
        { icon: '🍷', text: '<strong>Texas Wine Trail</strong> — Becker Vineyards ou Pedernales Cellars. Dégustation adultes.' },
        { icon: '🤠', text: '<strong>Luckenbach Texas</strong> (30 min) — bar légendaire, musique country live le soir.' }
      ]},
      { num: 'Jour 9 — Enchanted Rock', items: [
        { icon: '⏰', text: '<strong>Départ 7h</strong> — entrée horodatée réservée en ligne. Ouverture du parc 6h30.' },
        { icon: '🪨', text: '<strong>Summit Trail</strong> (3 km A/R) — ascension dôme granitique 130 m. Vue 360°.' },
        { icon: '🏞', text: '<strong>Echo Canyon Trail</strong> — formations rocheuses fascinantes, après le sommet.' },
        { icon: '🏠', text: '<strong>Retour vers 11h</strong> — repos hôtel pendant la chaleur du midi.' }
      ]}
    ],
    rests: [
      { name: 'Auslander Restaurant', sub: 'Cuisine allemande texane · Main St',      price: '$20–35/pers.' },
      { name: 'Otto\'s German Bistro', sub: 'Schnitzel, saucisses, bières artisanales', price: '$25–40/pers.' },
      { name: 'Hondo\'s on Main',     sub: 'Burgers, musique, terrasse',              price: '$15–25/pers.' },
      { name: 'Luckenbach dance hall', sub: 'Bières + saucisses · bar légendaire',    price: '$10–15/pers.' }
    ],
    tips: [
      { icon: '🎟', text: 'Enchanted Rock : réserver sur Texas State Parks. Complet des semaines avant en août.' },
      { icon: '💧', text: '2L d\'eau/personne pour la randonnée. Pas de fontaines sur le dôme granitique.' },
      { icon: '🌅', text: 'Départ au lever du soleil — températures douces + lumière photographique parfaite.' },
      { icon: '🦎', text: 'Lézards et crotales possibles sur les rochers — attention où on pose les mains.' }
    ],
    budget: [{ label: 'Hôtel/nuit', value: '$90–160' }, { label: 'Repas/pers./j', value: '$30–50' }, { label: 'Activités', value: '$20–30/pers.' }],
    map: 'https://www.google.com/maps/search/Enchanted+Rock+State+Natural+Area'
  },
  austin: {
    badge: 'Jours 10–12', name: 'Austin', sub: '2 nuits · 120 km de Fredericksburg · Capitale musique & créativité',
    days: [
      { num: 'Jour 10 — Arrivée & Barton Springs', items: [
        { icon: '🚗', text: '<strong>Route Fredericksburg → Austin</strong> (120 km, 1h15) via US-290 East.' },
        { icon: '💦', text: '<strong>Barton Springs Pool</strong> — piscine naturelle 400 m à 20°C permanents. Entrée $5. Obligatoire !' },
        { icon: '🌮', text: '<strong>South Congress Ave (SoCo)</strong> — food trucks, boutiques vintage, bars. Soirée chill.' }
      ]},
      { num: 'Jour 11 — Capitol & musique live', items: [
        { icon: '🏛', text: '<strong>Texas State Capitol</strong> — plus haut que Washington DC. Visite guidée gratuite (climatisé).' },
        { icon: '🍖', text: '<strong>Franklin Barbecue</strong> — arriver à 8h. Queue 2h. Le meilleur BBQ selon beaucoup.' },
        { icon: '🦇', text: '<strong>Congress Bridge</strong> vers 20h — 1,5 million chauves-souris mexicaines en vol. Gratuit.' },
        { icon: '🎸', text: '<strong>6th Street</strong> le soir — blues, country, rock live. Entrée souvent gratuite.' }
      ]},
      { num: 'Jour 12 — Campus & départ Dallas', items: [
        { icon: '🎓', text: '<strong>UT Campus</strong> — Blanton Museum of Art (gratuit le jeudi).' },
        { icon: '🎨', text: '<strong>Hope Outdoor Gallery</strong> — galerie street art légale en plein air.' },
        { icon: '🚗', text: '<strong>Route Austin → Dallas</strong> (290 km, 3h) via I-35 North.' }
      ]}
    ],
    rests: [
      { name: 'Franklin Barbecue',   sub: 'Brisket #1 mondial · Queue obligatoire', price: '$25–40/pers.' },
      { name: 'Tacodeli',            sub: 'Breakfast tacos · Ritual matinal Austin', price: '$8–12/pers.' },
      { name: 'Uchi',                sub: 'Japonais-texan gastronomique',            price: '$50–80/pers.' },
      { name: 'Juan In A Million',   sub: 'Breakfast mexicain, portions géantes',    price: '$10–15/pers.' }
    ],
    tips: [
      { icon: '⏰', text: 'Franklin BBQ : arriver à 8h. Épuisé à 14h. Vaut chaque minute.' },
      { icon: '🦇', text: 'Chauves-souris Congress Bridge : 20–20h30 en août. Prendre position 30 min avant.' },
      { icon: '💦', text: 'Barton Springs : aller en milieu de journée — 20°C quand il fait 42°C dehors.' },
      { icon: '🎵', text: '6th Street : gratuit d\'entrer dans les bars. Enfants OK jusqu\'à 21h.' }
    ],
    budget: [{ label: 'Hôtel/nuit', value: '$130–220' }, { label: 'Repas/pers./j', value: '$40–70' }, { label: 'Activités', value: '$20–40/pers.' }],
    map: 'https://www.google.com/maps/search/Austin+Texas+6th+Street'
  },
  dallas: {
    badge: 'Jours 13–14', name: 'Dallas / Fort Worth', sub: '2 nuits · 290 km d\'Austin · 3h · Histoire & western',
    days: [
      { num: 'Jour 13 — Dallas & JFK', items: [
        { icon: '🏛', text: '<strong>Sixth Floor Museum</strong> (Dealey Plaza) — assassinat JFK. Saisissant. Réserver en ligne.' },
        { icon: '🌿', text: '<strong>Klyde Warren Park</strong> — parc sur autoroute couverte, food trucks, kids area.' },
        { icon: '🦕', text: '<strong>Perot Museum</strong> — 11 salles dont dinosaures texans. Parfait pour les enfants.' }
      ]},
      { num: 'Jour 14 — Fort Worth Stockyards', items: [
        { icon: '🤠', text: '<strong>Fort Worth Stockyards</strong> — défilé longhorns à 11h30 et 16h dans Exchange Ave. Gratuit.' },
        { icon: '🐄', text: '<strong>Cowtown Coliseum</strong> — rodéo historique vendredi/samedi soir. $15–25/pers.' },
        { icon: '🦕', text: '<strong>Option :</strong> Dinosaur Valley SP (Glen Rose, 1h30) — empreintes fossiles + baignade.' }
      ]}
    ],
    rests: [
      { name: 'Pecan Lodge',            sub: 'BBQ de compétition · Deep Ellum Dallas', price: '$25–40/pers.' },
      { name: 'Cattlemen\'s Steakhouse', sub: 'FW Stockyards depuis 1947',              price: '$35–60/pers.' },
      { name: 'Joe T. Garcia\'s',       sub: 'Tex-Mex légendaire Fort Worth',          price: '$20–30/pers.' },
      { name: 'Lockhart Smokehouse',    sub: 'Central Texas BBQ · Bishop Arts',        price: '$20–35/pers.' }
    ],
    tips: [
      { icon: '🤠', text: 'Stockyards : arriver 15 min avant le défilé de longhorns (11h30 ou 16h).' },
      { icon: '🎟', text: 'Sixth Floor Museum : réserver en ligne. ~$22/adulte, enfants gratuit.' },
      { icon: '🚗', text: 'Dallas et Fort Worth sont à 45 min l\'un de l\'autre. 1 journée par ville.' },
      { icon: '🦕', text: 'Dinosaur Valley SP : empreintes dans rivière + baignade fraîche bienvenue en août.' }
    ],
    budget: [{ label: 'Hôtel/nuit', value: '$110–190' }, { label: 'Repas/pers./j', value: '$40–65' }, { label: 'Activités', value: '$30–60/pers.' }],
    map: 'https://www.google.com/maps/search/Fort+Worth+Stockyards'
  },
  paloduro: {
    badge: 'Jour 15', name: 'Palo Duro Canyon', sub: '1 nuit · 490 km de Dallas · Le Grand Canyon du Texas',
    days: [{ num: 'Jour 15 — Dallas → Palo Duro', items: [
      { icon: '🚗', text: '<strong>Route Dallas → Amarillo</strong> (490 km, 5h) via I-27 North. Partir à 7h.' },
      { icon: '🎨', text: '<strong>Cadillac Ranch · Amarillo</strong> — 10 Cadillacs enterrées depuis 1974. Amener peinture spray !' },
      { icon: '🏜', text: '<strong>Palo Duro Canyon</strong> — drive panoramique + photos.' },
      { icon: '🌅', text: '<strong>Lighthouse Trail</strong> (7 km A/R) — hoodoo emblématique au coucher du soleil. Partir après 17h.' }
    ]}],
    rests: [
      { name: 'The Big Texan Steak Ranch', sub: 'Amarillo · Kitsch texan, steaks géants', price: '$25–50/pers.' },
      { name: 'Hoffbrau Steaks',           sub: 'Steaks Texas style · Amarillo',          price: '$20–35/pers.' },
      { name: 'Cantina Royale',            sub: 'Tex-Mex · Amarillo downtown',            price: '$15–25/pers.' },
      { name: 'Restaurant du lodge',       sub: 'Dans le parc · options limitées',        price: '$15–25/pers.' }
    ],
    tips: [
      { icon: '⏰', text: 'Lighthouse Trail : avant 8h ou après 17h impérativement. 45°C à mi-journée.' },
      { icon: '💧', text: 'Minimum 3L d\'eau/personne. Aucune source dans le canyon.' },
      { icon: '🎨', text: 'Cadillac Ranch : amener peinture spray — c\'est la tradition depuis 1974.' },
      { icon: '🅿', text: 'Entrée parc : $8/adulte. America the Beautiful Pass accepté.' }
    ],
    budget: [{ label: 'Lodge/nuit', value: '$90–140' }, { label: 'Repas/pers./j', value: '$30–50' }, { label: 'Activités', value: '$20–30/pers.' }],
    map: 'https://www.google.com/maps/search/Palo+Duro+Canyon+State+Park'
  },
  marfa: {
    badge: 'Jours 16–17', name: 'Marfa', sub: '1 nuit · 470 km de Palo Duro · Art contemporain dans le désert',
    days: [
      { num: 'Jour 16 — Palo Duro → Marfa', items: [
        { icon: '🚗', text: '<strong>Long trajet : 470 km, ~4h30</strong> via US-87 South. Paysages désertiques splendides.' },
        { icon: '🎨', text: '<strong>Prada Marfa</strong> (60 km avant, sur US-90) — installation art dans le désert. Stop photo !' },
        { icon: '🏛', text: '<strong>Chinati Foundation</strong> — œuvre de Donald Judd. Réserver sur chinati.org. ~$25/adulte.' },
        { icon: '✨', text: '<strong>Marfa Lights</strong> — après 22h au Viewing Area (US-67). Phénomène inexpliqué depuis 1883.' }
      ]},
      { num: 'Jour 17 — Marfa & départ Big Bend', items: [
        { icon: '☕', text: '<strong>Matin Marfa</strong> — Frama Coffee, galeries, architecture adobe. Ville entière à pied en 2h.' },
        { icon: '📚', text: '<strong>Marfa Book Company</strong> — librairie/café légendaire, culture locale unique.' },
        { icon: '🚗', text: '<strong>Route Marfa → Big Bend</strong> (100 km, 1h15) via US-67 South.' }
      ]}
    ],
    rests: [
      { name: 'Cochineal',        sub: 'Gastronomique · Meilleur resto Marfa', price: '$40–60/pers.' },
      { name: 'Buns \'N Roses',   sub: 'Burgers décontractés · populaire',     price: '$12–18/pers.' },
      { name: 'La Ventana',       sub: 'Tex-Mex maison · authentique local',   price: '$12–20/pers.' },
      { name: 'Planet Marfa',     sub: 'Terrasse, bar, ambiance',              price: '$10–20/pers.' }
    ],
    tips: [
      { icon: '🌟', text: 'Marfa Lights : Viewing Area US-67, 15 km est de Marfa. Après 22h. Apporter une veste.' },
      { icon: '🏛', text: 'Chinati Foundation : réserver sur chinati.org. Fermée lundi-mardi.' },
      { icon: '📵', text: 'Réseau téléphonique très faible. Télécharger cartes hors-ligne avant d\'arriver.' },
      { icon: '🌡', text: 'Nuits fraîches (1400 m altitude) — couche légère même en août.' }
    ],
    budget: [{ label: 'Hôtel/nuit', value: '$100–200' }, { label: 'Repas/pers./j', value: '$30–50' }, { label: 'Activités', value: '$25–50/pers.' }],
    map: 'https://www.google.com/maps/search/Marfa+Texas'
  },
  bigbend: {
    badge: 'Jours 18–19', name: 'Big Bend National Park', sub: '2 nuits · 100 km de Marfa · Le parc le plus sauvage des USA',
    days: [
      { num: 'Jour 18 — Santa Elena & Fossil Exhibit', items: [
        { icon: '🚗', text: '<strong>Arrivée Big Bend</strong> (100 km). Enregistrement Far Flung Outdoor Center ou Big Bend Station.' },
        { icon: '🏛', text: '<strong>Fossil Discovery Exhibit</strong> (matin, climatisé) — Quetzalcoatlus 35 m. Gratuit. Parfait 12 ans.' },
        { icon: '🏔', text: '<strong>Santa Elena Canyon</strong> (après 17h) — 2,5 km. Parois 500 m, Rio Grande, vue sur Mexique.' },
        { icon: '⭐', text: '<strong>Observation astronomique</strong> (22h) — ciel le plus sombre des USA continentaux. Voie Lactée à l\'œil nu.' }
      ]},
      { num: 'Jour 19 — Hot Springs & retour Houston', items: [
        { icon: '♨️', text: '<strong>Hot Springs Historic District</strong> (7h–9h) — sources 42°C au bord du Rio Grande.' },
        { icon: '🦅', text: '<strong>Boquillas Canyon Trail</strong> (1,5 km facile) — falaises calcaires, fossiles dans la roche.' },
        { icon: '🚗', text: '<strong>Retour Houston</strong> (740 km, ~7h) via I-10 East. Nuit à Houston avant vol retour.' }
      ]}
    ],
    rests: [
      { name: 'Starlight Theatre',     sub: 'Terlingua ghost town · Bar et BBQ',      price: '$20–35/pers.' },
      { name: 'Big Bend Station Deli', sub: 'Sur place · sandwichs basiques',         price: '$10–15/pers.' },
      { name: 'Kiva Koffee',           sub: 'Study Butte · café, breakfast',          price: '$8–15/pers.' },
      { name: 'La Kiva Bar',           sub: 'Bar underground légendaire · Terlingua', price: '$10–20/pers.' }
    ],
    tips: [
      { icon: '⏰', text: 'Aucune activité extérieure entre 10h et 17h. +45°C sans ombre.' },
      { icon: '💧', text: '4L/personne/sortie minimum. Remplir au visitor center.' },
      { icon: '⭐', text: 'Observation nocturne : s\'éloigner de tout éclairage. 20 min d\'adaptation.' },
      { icon: '🐻', text: 'Ours noirs, javelinas et crotales présents. Nourriture en contenants hermétiques.' },
      { icon: '⛽', text: 'Faire le plein à Terlingua — 100+ km jusqu\'à la prochaine station. Pas de réseau.' }
    ],
    budget: [{ label: 'Lodge/nuit', value: '$120–200' }, { label: 'Repas/pers./j', value: '$25–40' }, { label: 'Entrée NPS', value: '$35/voiture' }],
    map: 'https://www.google.com/maps/search/Big+Bend+National+Park'
  }
};

/* Practical tips shown in the bottom grid */
const PRACTICAL_TIPS = [
  { icon: '🌡', title: 'Chaleur en août',       text: '40°C+ partout. Activités extérieures avant 9h et après 17h. Barton Springs (20°C) et Natural Bridge Caverns (20°C) sont vos refuges climatisés naturels.' },
  { icon: '🚗', title: 'Location voiture',       text: 'SUV ou minivan. Réserver 9–12 mois à l\'avance. Essence <1$/L mais distances immenses : 490 km Dallas–Palo Duro, 740 km Big Bend–Houston.' },
  { icon: '🏕', title: 'Hébergement Big Bend',   text: 'Chisos Lodge fermé jusqu\'en 2028. Far Flung Outdoor Center ou Big Bend Station. Réserver très tôt — offre très limitée.' },
  { icon: '🎟', title: 'Réservations clés',      text: 'Enchanted Rock : entrée horodatée obligatoire. America the Beautiful Pass ($80/an) couvre tous les parcs. Franklin BBQ Austin : 2h de queue.' },
  { icon: '🍖', title: 'Gastronomie texane',     text: 'BBQ = religion. Franklin (Austin), Pecan Lodge (Dallas), Snow\'s BBQ (Lexington). Breakfast tacos Austin obligatoires. Dr Pepper est né ici.' },
  { icon: '👨‍👩‍👧‍👦', title: 'Avec des enfants', text: 'Space Center Houston. Dinosaur Valley SP. Fossil Exhibit Big Bend. Longhorns Fort Worth. Cadillac Ranch. Chauves-souris Congress Bridge. Barton Springs.' }
];

const BUDGET_ROWS = [
  { label: 'Vols A/R × 4',      detail: 'GVA–EWR–IAH United économie',  value: '3 600 – 5 600' },
  { label: 'Location voiture',   detail: 'SUV 21 jours, tout risque',     value: '1 800 – 2 800' },
  { label: 'Hébergement',        detail: '19 nuits × hôtel famille',      value: '2 800 – 4 500' },
  { label: 'Carburant',          detail: '~3 500 km · ~$0.95/L',          value: '350 – 500' },
  { label: 'Restaurants',        detail: '3 repas/j × 21j × 4 pers.',     value: '2 500 – 4 000' },
  { label: 'Entrées / activités', detail: 'Parcs, musées, NASA…',         value: '900 – 1 500' }
];

const BUDGET_TOTAL = 'CHF 12 000 – 19 000';
