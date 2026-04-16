/* ═══════════════════════════════════════════════════════════════
   Texas Road Trip 2027 — App logic
   Renders cards from data, manages drawer & scrollspy map
   ═══════════════════════════════════════════════════════════════ */

'use strict';

/* ─── RENDER: Cards from CARD_DATA ────────────────────────── */

function renderWeeks() {
  const container = document.getElementById('weeks-container');
  if (!container) return;

  const html = CARD_DATA
    .map((week, i) => {
      const withDivider = i < CARD_DATA.length - 1;
      return `
        <div class="week-header" id="${week.week}">
          <div class="week-header__num">${week.num}</div>
          <div class="week-header__info">
            <h3>${week.title}</h3>
            <p>${week.sub}</p>
          </div>
        </div>
        <div class="cards">
          ${week.stops.map(renderCard).join('')}
        </div>
        ${withDivider ? '<div class="week-divider" aria-hidden="true"></div>' : ''}
      `;
    })
    .join('');

  container.innerHTML = html;
}

function renderCard(stop) {
  const reversedClass = stop.reversed ? ' card--reversed' : '';
  const typeClass = CATEGORY_CLASS[stop.category] || 'card__type--city';
  const warnHtml = stop.warn
    ? `<div class="card__warn">${stop.warn}</div>`
    : '';
  const tagsHtml = stop.tags.map((t) => `<span class="tag">${t}</span>`).join('');
  const metaHtml = stop.meta.map((m) => `<span>${m}</span>`).join('');

  return `
    <article class="card${reversedClass}" data-stop="${stop.id}" onclick="openDrawer('${stop.id}')">
      <div class="card__image">
        <img src="images/${stop.id === 'fredericksburg' ? 'enchanted' : stop.id}.jpg" alt="${stop.name}" loading="lazy">
        <div class="card__overlay"></div>
        <div class="card__day-badge">${stop.badge}</div>
        <div class="card__hint">Cliquer pour le détail &rarr;</div>
      </div>
      <div class="card__content">
        <div class="card__top">
          <span class="card__type ${typeClass}">&bull; ${stop.type}</span>
          <h2 class="card__name">${stop.name}</h2>
          <p class="card__sub">${stop.sub}</p>
          <p class="card__desc">${stop.desc}</p>
          <div class="card__tags">${tagsHtml}</div>
          ${warnHtml}
        </div>
        <div class="card__meta">${metaHtml}</div>
        <div class="card__see-more">Voir le programme détaillé &rarr;</div>
      </div>
    </article>
  `;
}

/* ─── RENDER: Practical tips grid ─────────────────────────── */

function renderTips() {
  const container = document.getElementById('tips-grid');
  if (!container) return;
  container.innerHTML = PRACTICAL_TIPS
    .map(
      (t) => `
    <div class="tip-card">
      <span class="tip-card__icon">${t.icon}</span>
      <div class="tip-card__title">${t.title}</div>
      <p class="tip-card__text">${t.text}</p>
    </div>
  `
    )
    .join('');
}

/* ─── RENDER: Budget table ────────────────────────────────── */

function renderBudget() {
  const tbody = document.getElementById('budget-tbody');
  if (!tbody) return;
  const rows = BUDGET_ROWS
    .map(
      (r) =>
        `<tr><td>${r.label}</td><td>${r.detail}</td><td>${r.value}</td></tr>`
    )
    .join('');
  tbody.innerHTML = rows;

  const totalRow = document.getElementById('budget-total');
  if (totalRow) totalRow.textContent = BUDGET_TOTAL;
}

/* ─── DRAWER: Open/close with detail content ──────────────── */

function openDrawer(id) {
  const data = DRAWER_DATA[id];
  if (!data) return;

  const imgKey = id === 'fredericksburg' ? 'enchanted' : id;
  document.getElementById('drawer-img').src = `images/${imgKey}.jpg`;
  document.getElementById('drawer-img').alt = data.name;
  document.getElementById('drawer-badge').textContent = data.badge;
  document.getElementById('drawer-name').textContent = data.name;
  document.getElementById('drawer-sub').textContent = data.sub;

  const body = document.getElementById('drawer-body');
  body.innerHTML = `
    ${renderDrawerDays(data.days)}
    ${renderDrawerRests(data.rests)}
    ${renderDrawerTips(data.tips)}
    ${renderDrawerBudget(data.budget, data.map)}
  `;

  document.getElementById('drawer').classList.add('drawer--open');
  document.getElementById('overlay').classList.add('overlay--open');
  document.body.style.overflow = 'hidden';
}

function closeDrawer() {
  document.getElementById('drawer').classList.remove('drawer--open');
  document.getElementById('overlay').classList.remove('overlay--open');
  document.body.style.overflow = '';
}

function renderDrawerDays(days) {
  const blocks = days
    .map(
      (day) => `
    <div class="day-block">
      <div class="day-block__num">${day.num}</div>
      <div class="day-block__items">
        ${day.items
          .map(
            (it) =>
              `<div class="day-item"><span class="day-item__icon">${it.icon}</span><span>${it.text}</span></div>`
          )
          .join('')}
      </div>
    </div>
  `
    )
    .join('');
  return `
    <div class="section">
      <div class="section__label">Programme jour par jour</div>
      ${blocks}
    </div>
  `;
}

function renderDrawerRests(rests) {
  const cards = rests
    .map(
      (r) => `
    <div class="rest-card">
      <div class="rest-card__name">${r.name}</div>
      <div class="rest-card__sub">${r.sub}</div>
      <div class="rest-card__price">${r.price}</div>
    </div>
  `
    )
    .join('');
  return `
    <div class="section">
      <div class="section__label">Où manger</div>
      <div class="rest-grid">${cards}</div>
    </div>
  `;
}

function renderDrawerTips(tips) {
  const items = tips
    .map(
      (t) => `
    <div class="tip-item">
      <span class="tip-item__icon">${t.icon}</span>
      <span>${t.text}</span>
    </div>
  `
    )
    .join('');
  return `
    <div class="section">
      <div class="section__label">Conseils pratiques</div>
      <div class="tip-list">${items}</div>
    </div>
  `;
}

function renderDrawerBudget(budget, mapUrl) {
  const items = budget
    .map(
      (b) => `
    <div class="budget-item">
      <div class="budget-item__label">${b.label}</div>
      <div class="budget-item__value">${b.value}</div>
    </div>
  `
    )
    .join('');
  return `
    <div class="section">
      <div class="section__label">Budget estimé</div>
      <div class="budget-strip">${items}</div>
      <a class="map-btn" href="${mapUrl}" target="_blank" rel="noopener">📍 Voir sur Google Maps</a>
    </div>
  `;
}

/* ─── MAP: Leaflet scrollspy map ──────────────────────────── */

let mapInstance;
let activeRouteLine;
const markersById = {};
let currentActiveId = null;

function initMap() {
  mapInstance = L.map('map', {
    center: [31.0, -99.0],
    zoom: 6,
    zoomControl: false,
    attributionControl: false,
  });

  L.tileLayer(
    'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    { maxZoom: 19 }
  ).addTo(mapInstance);

  L.control.zoom({ position: 'bottomright' }).addTo(mapInstance);

  /* Full route line (dashed) */
  const coords = STOPS.map((s) => [s.lat, s.lng]);
  const loopCoords = [...coords, coords[0]];
  L.polyline(loopCoords, {
    color: 'rgba(180,55,5,0.5)',
    weight: 2,
    dashArray: '6,6',
  }).addTo(mapInstance);

  /* Active route line (solid, grows with scroll) */
  activeRouteLine = L.polyline([], {
    color: '#B83209',
    weight: 3,
    opacity: 0.85,
  }).addTo(mapInstance);

  /* Markers */
  STOPS.forEach((stop, i) => {
    const html = `<div class="lf-marker" style="background:${stop.color};color:#0D1117">${i + 1}</div>`;
    const icon = L.divIcon({ html, className: '', iconSize: [28, 28], iconAnchor: [14, 14] });
    const marker = L.marker([stop.lat, stop.lng], { icon }).addTo(mapInstance);
    marker.bindTooltip(`${stop.name} · ${stop.day}`, {
      direction: 'top',
      offset: [0, -16],
      className: 'leaflet-tooltip-custom',
    });
    marker.on('click', () => openDrawer(stop.id));
    markersById[stop.id] = marker;
  });

  /* Legend */
  const legend = document.getElementById('map-legend');
  STOPS.forEach((stop) => {
    const pill = document.createElement('div');
    pill.className = 'map-pill';
    pill.dataset.stop = stop.id;
    pill.textContent = stop.name;
    pill.addEventListener('click', () => {
      setActiveStop(stop.id);
      openDrawer(stop.id);
    });
    legend.appendChild(pill);
  });
}

function setActiveStop(id) {
  if (currentActiveId === id) return;
  currentActiveId = id;

  const stop = STOPS.find((s) => s.id === id);
  if (!stop) return;

  /* Label with name + day + route info */
  const routeHtml = stop.km
    ? `<div class="map-label__route"><span>🚗 ${stop.km} km</span><span>⏱ ${stop.h}</span></div>`
    : `<div class="map-label__route" style="color:rgba(245,237,216,.4);font-size:.65rem">Départ</div>`;

  document.getElementById('map-label').innerHTML = `
    <div class="map-label__name">${stop.name}</div>
    <div class="map-label__day">${stop.day}</div>
    ${routeHtml}
  `;

  /* Legend pills */
  document.querySelectorAll('.map-pill').forEach((p) => {
    p.classList.toggle('map-pill--active', p.dataset.stop === id);
  });

  /* Active route line */
  const idx = STOPS.findIndex((s) => s.id === id);
  const coords = STOPS.slice(0, idx + 1).map((s) => [s.lat, s.lng]);
  activeRouteLine.setLatLngs(coords);

  /* Marker active state */
  Object.entries(markersById).forEach(([sid, marker]) => {
    const el = marker.getElement();
    if (el) {
      const inner = el.querySelector('.lf-marker');
      if (inner) inner.classList.toggle('lf-marker--active', sid === id);
    }
  });

  /* Fly to */
  mapInstance.flyTo([stop.lat, stop.lng], 7, { duration: 0.8 });
}

function initScrollspy() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.dataset.stop;
          if (id) setActiveStop(id);
        }
      });
    },
    { threshold: 0.4, rootMargin: '-10% 0px -40% 0px' }
  );

  document.querySelectorAll('.card[data-stop]').forEach((card) => observer.observe(card));
}

/* ─── INIT ─────────────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {
  renderWeeks();
  renderTips();
  renderBudget();
  initMap();
  initScrollspy();

  /* Default active = first stop */
  setTimeout(() => setActiveStop('houston'), 300);

  /* ESC closes drawer */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDrawer();
  });
});
