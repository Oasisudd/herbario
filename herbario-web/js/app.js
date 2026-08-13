// Herbario Digital OASIS — Web version
// Ported from the Expo/React Native app (Canva-Reader-Tool/artifacts/herbario).

const DATA = window.HERBARIO_DATA;
const $app = document.getElementById("app");

const PAISAJE_ICONS = { water: "💧", sprout: "🌱", grass: "🌾" };
const paisajeIcon = (id) => PAISAJE_ICONS[DATA.paisajes.find((p) => p.id === id)?.icon] || "🌿";

function getPaisaje(id) {
  return DATA.paisajes.find((p) => p.id === id);
}
function getSpecies(id) {
  return DATA.species.find((s) => s.id === id);
}
function principalImage(species) {
  return species.photos?.find((c) => c.key === "principal")?.images[0];
}
function esc(str) {
  const d = document.createElement("div");
  d.textContent = str ?? "";
  return d.innerHTML;
}

// ---------------- Router ----------------
const routes = [];
function route(pattern, render) {
  const paramNames = [];
  const regex = new RegExp(
    "^" +
      pattern.replace(/:[^/]+/g, (m) => {
        paramNames.push(m.slice(1));
        return "([^/]+)";
      }) +
      "$"
  );
  routes.push({ regex, paramNames, render });
}

function parseHash() {
  const hash = location.hash.slice(1) || "/";
  const [path, query] = hash.split("?");
  const params = new URLSearchParams(query || "");
  return { path, params };
}

function navigate(path) {
  location.hash = path;
}

function goBack() {
  history.back();
}

let scrollPositions = {};
function renderRoute() {
  const { path, params } = parseHash();
  for (const r of routes) {
    const m = path.match(r.regex);
    if (m) {
      const args = {};
      r.paramNames.forEach((name, i) => (args[name] = decodeURIComponent(m[i + 1])));
      $app.innerHTML = "";
      window.scrollTo(0, 0);
      r.render(args, params);
      return;
    }
  }
  $app.innerHTML = `<div class="empty-state"><h3>Página no encontrada</h3></div>`;
}

window.addEventListener("hashchange", renderRoute);
window.addEventListener("DOMContentLoaded", renderRoute);

// ---------------- Icons (inline SVG, minimal set) ----------------
const ICONS = {
  back: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>`,
  chevronRight: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`,
  chevronDown: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`,
  leaf: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>`,
  earth: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  search: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  close: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
  trendUp: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`,
  map: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>`,
  images: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>`,
  imageOutline: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>`,
  openOutline: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`,
};

// ---------------- App shell ----------------
function screen(html) {
  $app.innerHTML = html;
}

function bottomNavHtml(active) {
  const items = [
    { key: "inicio", href: "#/", icon: "🏠", label: "Inicio" },
    { key: "especies", href: "#/catalogo", icon: "🌿", label: "Especies" },
    { key: "paisajes", href: "#/paisajes", icon: "🌎", label: "Paisajes" },
  ];
  return `<nav class="bottom-nav">
    ${items
      .map(
        (it) => `<a class="bottom-nav-item ${it.key === active ? "active" : ""}" href="${it.href}">
          <span class="nav-icon">${it.icon}</span><span>${it.label}</span>
        </a>`
      )
      .join("")}
  </nav>`;
}

// ================= INTRO =================
route("/", () => {
  const hero = DATA.paisajeGlobalImages[0];
  screen(`
    <div class="intro-header">
      <a class="logo-link" href="https://oasisudd.github.io/observatorio/index3.html" target="_blank" rel="noopener" aria-label="Ir al Observatorio OASIS">
        <img class="oasis-logo" src="assets/oasis-logo.png" alt="OASIS">
      </a>
      <h1>Herbario Digital</h1>
      <p>Bofedales Altoandinos</p>
    </div>
    <div class="pano-wrap"><img src="${hero}" loading="lazy" alt="Paisaje altoandino"></div>
    <div class="intro-body">
      <h2>El ecosistema</h2>
      <p>Los humedales altoandinos son un mosaico de ambientes hídricos azonales donde la disponibilidad de agua, más que el clima regional, determina la vegetación y la estructura ecológica. A lo largo de un gradiente hídrico-salino conviven bofedales, vegas y pajonales, cada uno con su propia dinámica de agua y su flora característica.</p>
      <p>Este herbario reúne las especies documentadas en las campañas del Parque Nacional Nevado Tres Cruces y el sitio RAMSAR Complejo Lacustre Laguna del Negro Francisco y Laguna Santa Rosa, en la alta cordillera de la Región de Atacama.</p>

      <a class="nav-button" href="#/catalogo">
        <span class="icon">${ICONS.leaf}</span>
        <span class="nav-button-text">
          <span class="nav-title">Especies</span>
          <span class="nav-subtitle">Catálogo de flora altoandina</span>
        </span>
        <span class="chevron">${ICONS.chevronRight}</span>
      </a>
      <a class="nav-button secondary" href="#/paisajes">
        <span class="icon">${ICONS.earth}</span>
        <span class="nav-button-text">
          <span class="nav-title">Paisajes</span>
          <span class="nav-subtitle">Bofedales, vegas y pajonales</span>
        </span>
        <span class="chevron">${ICONS.chevronRight}</span>
      </a>
    </div>

    <div class="footer">
      <p class="footer-text">Proyecto Anillo Temático Li y Salares – ANID || ATE2400015 (2024–2027)</p>
      <div class="footer-panel">
        <div class="footer-logos-left">
          <div class="footer-logo-row">
            <a href="https://www.udd.cl/" target="_blank" rel="noopener"><img src="assets/logos/udd.png" alt="UDD"></a>
            <a href="https://www.uda.cl/" target="_blank" rel="noopener"><img src="assets/logos/uda.png" alt="UDA"></a>
            <a href="https://www.unab.cl/" target="_blank" rel="noopener"><img src="assets/logos/unab.png" alt="UNAB"></a>
          </div>
          <div class="footer-logo-row">
            <a href="https://www.udec.cl/pexterno/" target="_blank" rel="noopener"><img src="assets/logos/udec.png" alt="UDEC"></a>
            <a href="https://www.ufro.cl/" target="_blank" rel="noopener"><img src="assets/logos/ufro.png" alt="UFRO"></a>
            <a href="https://smiicechile.cl/" target="_blank" rel="noopener"><img src="assets/logos/smi.png" alt="SMI ICE Chile"></a>
          </div>
        </div>
        <a class="footer-anid" href="https://anid.cl/" target="_blank" rel="noopener"><img src="assets/logos/anid.png" alt="ANID"></a>
      </div>
    </div>
    ${bottomNavHtml("inicio")}
  `);
});

// ================= CATALOGO =================
route("/catalogo", () => {
  renderCatalogo("");
});

function renderCatalogo(search) {
  const q = search.toLowerCase();
  const filtered = DATA.species.filter(
    (s) =>
      s.scientificName.toLowerCase().includes(q) ||
      s.commonName.toLowerCase().includes(q) ||
      s.family.toLowerCase().includes(q) ||
      s.genus.toLowerCase().includes(q)
  );

  screen(`
    <div class="catalog-header">
      <a class="logo-link" href="https://oasisudd.github.io/observatorio/index3.html" target="_blank" rel="noopener" aria-label="Ir al Observatorio OASIS">
        <img class="oasis-logo" src="assets/oasis-logo.png" alt="OASIS">
      </a>
      <div class="catalog-header-row">
        <div>
          <h1>Herbario</h1>
          <p>Bofedales Altoandinos • ${DATA.species.length} especies</p>
        </div>
        <div class="icon-box" style="width:40px;height:40px;border-radius:12px;background:var(--secondary);display:flex;align-items:center;justify-content:center;color:var(--primary)">${ICONS.leaf}</div>
      </div>
    </div>
    <div class="search-wrap">
      <div class="search-bar">
        ${ICONS.search}
        <input id="search-input" type="text" placeholder="Buscar especie..." value="${esc(search)}">
        ${search ? `<button class="clear-btn" id="clear-search">${ICONS.close}</button>` : ""}
      </div>
    </div>
    <div class="species-list" id="species-list"></div>
    ${bottomNavHtml("especies")}
  `);

  const $list = document.getElementById("species-list");
  if (filtered.length === 0) {
    $list.innerHTML = `<div class="empty-state">
      <div class="empty-icon">🌿</div>
      <h3>Sin resultados</h3>
      <p>Intenta con otro nombre o familia</p>
    </div>`;
  } else {
    $list.innerHTML = filtered.map(speciesCardHtml).join("");
  }

  const $input = document.getElementById("search-input");
  $input.addEventListener("input", (e) => {
    const cursor = e.target.selectionStart;
    renderCatalogo(e.target.value);
    const el = document.getElementById("search-input");
    el.focus();
    el.setSelectionRange(cursor, cursor);
  });
  const $clear = document.getElementById("clear-search");
  if ($clear) $clear.addEventListener("click", () => renderCatalogo(""));
}

function speciesCardHtml(s) {
  const img = principalImage(s);
  const distChips = s.distribution
    .slice(0, 5)
    .map((r) => `<span class="region-chip">${esc(r)}</span>`)
    .join("");
  const more = s.distribution.length > 5 ? `<span class="more-text">+${s.distribution.length - 5}</span>` : "";
  return `
    <a class="species-card" href="#/species/${s.id}">
      ${img ? `<img class="card-image" src="${img}" loading="lazy" alt="${esc(s.scientificName)}">` : ""}
      <div class="card-header">
        <span class="badge family">${esc(s.taxonomy.familia || "Sin clasificar")}</span>
        ${s.commonName ? `<span class="badge common">${esc(s.commonName)}</span>` : ""}
      </div>
      <p class="sci-name">${esc(s.scientificName)}</p>
      ${s.authority ? `<p class="authority">${esc(s.authority)}</p>` : ""}
      <div class="card-footer">
        ${s.altitude ? `<div class="info-row">${ICONS.trendUp}<span>${esc(s.altitude)}</span></div>` : ""}
        ${s.distribution.length ? `<div class="distribution-row">${distChips}${more}</div>` : ""}
      </div>
      <div class="chevron-container">${ICONS.chevronRight}</div>
    </a>
  `;
}

// ================= SPECIES DETAIL =================
route("/species/:id", ({ id }) => {
  const species = getSpecies(id);
  if (!species) {
    screen(`<div class="empty-state"><h3>Especie no encontrada</h3></div>`);
    return;
  }
  renderSpeciesDetail(species, "Taxonomía");
});

function renderSpeciesDetail(species, activeTab) {
  const photoCategories = species.photos ?? [];
  const principalPhotos = photoCategories.find((c) => c.key === "principal");
  const secondaryPhotos = photoCategories.filter((c) => c.key !== "principal");
  const speciesPaisajes = (species.landscapes ?? []).map(getPaisaje).filter(Boolean);

  const photosHtml =
    secondaryPhotos.length > 0
      ? secondaryPhotos
          .map(
            (cat) => `
        <a class="photo-card" href="#/species/${species.id}/photos/${cat.key}">
          <img src="${cat.images[0]}" loading="lazy" alt="${esc(cat.label)}">
          <div class="photo-card-footer">
            <span class="photo-card-label">${esc(cat.label)}</span>
            ${cat.images.length > 1 ? `<span class="photo-card-count">${ICONS.images}${cat.images.length}</span>` : ""}
          </div>
        </a>`
          )
          .join("")
      : (species.photoLabels || [])
          .map(
            (label) => `
        <div class="photo-card" style="width:140px;height:120px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;color:var(--muted-foreground);background:var(--secondary)">
          ${ICONS.imageOutline}<span style="font-size:12px;text-align:center;padding:0 8px">${esc(label)}</span>
        </div>`
          )
          .join("");

  const TABS = ["Taxonomía", "Morfología", "Fenología", "Ecología"];

  screen(`
    <div class="topbar">
      <a class="back-btn" href="#/catalogo">${ICONS.back}</a>
      <div class="topbar-center"><p class="topbar-sub">${esc(species.taxonomy.familia || species.genus)}</p></div>
      <div class="icon-box">${ICONS.leaf}</div>
    </div>

    <div class="hero-section">
      ${species.commonName ? `<span class="common-tag">${esc(species.commonName)}</span>` : ""}
      <h1 class="hero-name">${esc(species.scientificName)}</h1>
      ${species.authority ? `<p class="hero-authority">${esc(species.authority)}</p>` : ""}

      ${
        principalPhotos && principalPhotos.images.length
          ? `<a class="hero-photo-wrap" href="#/species/${species.id}/photos/principal">
              <img src="${principalPhotos.images[0]}" alt="${esc(species.scientificName)}">
              ${principalPhotos.images.length > 1 ? `<div class="photo-count-badge">${ICONS.images}${principalPhotos.images.length}</div>` : ""}
            </a>`
          : ""
      }

      ${
        species.altitude
          ? `<div class="hero-badges"><div class="hero-badge">${ICONS.trendUp}<span>${esc(species.altitude)}</span></div></div>`
          : ""
      }

      ${
        species.distribution.length
          ? `<a class="distribution-block" href="#/species/${species.id}/map" style="display:block">
              <div class="distribution-label-row">
                <span class="distribution-label">Distribución regional</span>
                <span class="distribution-link">${ICONS.map}Ver mapa</span>
              </div>
              <div class="distribution-chips">${species.distribution.map((r) => `<span class="dist-chip">${esc(r)}</span>`).join("")}</div>
            </a>`
          : ""
      }

      ${
        speciesPaisajes.length
          ? `<div class="paisajes-block">
              <p class="paisajes-label">${speciesPaisajes.length > 1 ? "Paisajes" : "Paisaje"}</p>
              <div class="paisajes-row">
                ${speciesPaisajes
                  .map(
                    (p) => `<a class="paisaje-chip" href="#/paisajes/${p.id}" style="background:${p.color}1A;border-color:${p.color}40;color:${p.color}">
                      ${paisajeIcon(p.id)}<span>${esc(p.shortName)}</span>${ICONS.chevronRight}
                    </a>`
                  )
                  .join("")}
              </div>
            </div>`
          : ""
      }
    </div>

    <div class="photos-section"><div class="photos-row">${photosHtml}</div></div>

    <div class="tab-bar">
      ${TABS.map((t) => `<button class="tab-item ${t === activeTab ? "active" : ""}" data-tab="${t}">${t}</button>`).join("")}
    </div>

    <div class="tab-content" id="tab-content"></div>

    ${
      species.sourceUrl
        ? `<a class="ficha-link" href="${species.sourceUrl}" target="_blank" rel="noopener">
            ${ICONS.openOutline}<span>Ver ficha en Herbario Digital</span><span class="chevron">${ICONS.chevronRight}</span>
          </a>`
        : ""
    }
    <div style="height:24px"></div>
  `);

  renderSpeciesTab(species, activeTab);

  document.querySelectorAll(".tab-item").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab-item").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderSpeciesTab(species, btn.dataset.tab);
    });
  });
}

function renderSpeciesTab(species, tab) {
  const $c = document.getElementById("tab-content");
  if (tab === "Taxonomía") {
    const rows = [
      ["División", species.taxonomy.division],
      ["Clase", species.taxonomy.clase],
      ["Orden", species.taxonomy.orden],
      ["Familia", species.taxonomy.familia],
      ["Género", species.taxonomy.genero],
    ];
    if (species.commonName) rows.push(["Nombre común", species.commonName]);
    $c.innerHTML = `<div class="section-card">${rows
      .filter(([, v]) => v)
      .map(([l, v]) => `<div class="taxonomy-row"><span class="taxonomy-label">${esc(l)}</span><span class="taxonomy-value">${esc(v)}</span></div>`)
      .join("")}</div>`;
  } else if (tab === "Morfología") {
    $c.innerHTML = `<div class="section-card">
      <p class="section-title">Descripción morfológica</p>
      ${species.morphology.map((t) => `<div class="bullet-row"><span class="bullet-dot"></span><span class="bullet-text">${esc(t)}</span></div>`).join("")}
    </div>`;
  } else if (tab === "Fenología") {
    $c.innerHTML = `<div class="section-card">
      <p class="section-title">Descripción fenológica / forma de vida</p>
      ${species.phenomenology.map((t) => `<div class="bullet-row"><span class="bullet-dot"></span><span class="bullet-text">${esc(t)}</span></div>`).join("")}
    </div>`;
  } else if (tab === "Ecología") {
    const refs = species.references?.length
      ? `<div class="references-block">
          <p class="references-title">Referencias</p>
          ${species.references.map((r) => `<div class="reference-row"><span>•</span><span>${esc(r)}</span></div>`).join("")}
        </div>`
      : "";
    const mapBtn = species.distribution.length
      ? `<a class="map-button" href="#/species/${species.id}/map">
          <div class="map-button-header">
            <span class="map-button-title-row">${ICONS.map}Ver mapa de distribución</span>
            ${ICONS.chevronRight}
          </div>
          <div class="eco-chips">${species.distribution.map((r) => `<span class="eco-chip">${esc(r)}</span>`).join("")}</div>
        </a>`
      : "";
    $c.innerHTML = `<div class="section-card">
      <p class="section-title">Descripción ecológica / distribución</p>
      <p class="ecology-text">${esc(species.ecology)}</p>
      ${mapBtn}
      ${refs}
    </div>`;
  }
}

// ================= PHOTO CAROUSEL (lightbox) =================
route("/species/:id/photos/:category", ({ id, category }) => {
  const species = getSpecies(id);
  const cat = species?.photos?.find((c) => c.key === category) ?? species?.photos?.[0];
  if (!species || !cat || !cat.images.length) {
    screen(`<div class="empty-state"><h3>Fotos no encontradas</h3></div>`);
    return;
  }
  renderCarousel(species, cat, 0);
});

function renderCarousel(species, cat, index) {
  const total = cat.images.length;
  const safeIndex = Math.min(Math.max(index, 0), total - 1);
  screen(`
    <div class="lightbox">
      <div class="lightbox-topbar">
        <a class="btn" href="#/species/${species.id}">${ICONS.chevronDown}</a>
        <div class="lightbox-topbar-center">
          <div class="t">${esc(cat.label)}</div>
          <div class="s">${esc(species.scientificName)}</div>
        </div>
        <div class="btn"></div>
      </div>
      <div class="lightbox-image-wrap"><img src="${cat.images[safeIndex]}" alt="${esc(cat.label)}"></div>
      ${
        total > 1
          ? `<div class="lightbox-controls">
              <button id="lb-prev" ${safeIndex === 0 ? "disabled" : ""}>‹</button>
              <span class="lightbox-counter">${safeIndex + 1} / ${total}</span>
              <button id="lb-next" ${safeIndex === total - 1 ? "disabled" : ""}>›</button>
            </div>`
          : ""
      }
    </div>
  `);
  const prev = document.getElementById("lb-prev");
  const next = document.getElementById("lb-next");
  if (prev) prev.addEventListener("click", () => renderCarousel(species, cat, safeIndex - 1));
  if (next) next.addEventListener("click", () => renderCarousel(species, cat, safeIndex + 1));

  const keyHandler = (e) => {
    if (e.key === "ArrowLeft" && safeIndex > 0) renderCarousel(species, cat, safeIndex - 1);
    if (e.key === "ArrowRight" && safeIndex < total - 1) renderCarousel(species, cat, safeIndex + 1);
    if (e.key === "Escape") navigate(`/species/${species.id}`);
  };
  document.addEventListener("keydown", keyHandler, { once: true });
}

// ================= DISTRIBUTION MAP =================
route("/species/:id/map", ({ id }) => {
  const species = getSpecies(id);
  if (!species) {
    screen(`<div class="empty-state"><h3>Especie no encontrada</h3></div>`);
    return;
  }
  renderDistributionMap(species, null);
});

function resolveActiveCods(distribution) {
  const aliasMap = {};
  DATA.chileRegions.forEach((r) => r.aliases.forEach((a) => (aliasMap[a.toUpperCase()] = r.cod)));
  const set = new Set();
  distribution.forEach((c) => {
    const cod = aliasMap[c.trim().toUpperCase()];
    if (cod != null) set.add(cod);
  });
  return set;
}

function renderDistributionMap(species, selectedCod) {
  const activeCods = resolveActiveCods(species.distribution);
  const vb = DATA.chileViewbox;
  const selectedRegion = DATA.chileRegions.find((r) => r.cod === selectedCod) || null;
  const selectedIsActive = selectedRegion && activeCods.has(selectedRegion.cod);

  const paths = DATA.chileRegions
    .map((r) => {
      const isActive = activeCods.has(r.cod);
      const isSelected = r.cod === selectedCod;
      const fill = isSelected ? "#00a99d" : isActive ? "#00a99d99" : "#e8e8e8";
      return `<path class="chile-region-path" data-cod="${r.cod}" d="${r.path}" fill="${fill}" stroke="#ffffff" stroke-width="0.7" stroke-linejoin="round"></path>`;
    })
    .join("");

  screen(`
    <div class="map-screen">
      <div class="lightbox-topbar">
        <a class="btn" href="#/species/${species.id}">${ICONS.chevronDown}</a>
        <div class="lightbox-topbar-center">
          <div class="t">Distribución en Chile</div>
          <div class="s">${esc(species.scientificName)}</div>
        </div>
        <div class="btn"></div>
      </div>
      <div class="map-banner">
        ${
          selectedRegion
            ? `<span class="dot" style="background:${selectedIsActive ? "#00a99d" : "#6b7589"}"></span><span>${esc(selectedRegion.name)}${selectedIsActive ? " · presente" : " · sin registro"}</span>`
            : `<span>Toca una región para ver su nombre</span>`
        }
      </div>
      <div class="map-svg-wrap">
        <svg viewBox="0 0 ${vb.width} ${vb.height}" style="height:min(65vh, 560px); width:auto;">${paths}</svg>
      </div>
      <div class="map-legend">
        <div class="map-legend-item"><span class="swatch" style="background:#00a99d99"></span>Con registro</div>
        <div class="map-legend-item"><span class="swatch" style="background:#e8e8e8"></span>Sin registro</div>
      </div>
    </div>
  `);

  document.querySelectorAll(".chile-region-path").forEach((el) => {
    el.addEventListener("click", () => {
      const cod = parseInt(el.dataset.cod, 10);
      renderDistributionMap(species, cod === selectedCod ? null : cod);
    });
  });
}

// ================= PAISAJES LIST =================
route("/paisajes", () => {
  const cards = DATA.paisajes
    .map((p) => {
      const count = DATA.species.filter((s) => s.landscapes?.includes(p.id)).length;
      return `
      <a class="paisaje-card" href="#/paisajes/${p.id}">
        <img class="cover" src="${p.images[0]}" loading="lazy" alt="${esc(p.name)}">
        <div class="paisaje-card-body">
          <div class="paisaje-card-icon" style="background:${p.color}1A;color:${p.color}">${paisajeIcon(p.id)}</div>
          <div class="paisaje-card-text">
            <h3>${esc(p.name)}</h3>
            <p>${esc(p.tagline)}</p>
            ${count ? `<div class="paisaje-card-meta">🌿 ${count} ${count === 1 ? "especie asociada" : "especies asociadas"}</div>` : ""}
          </div>
          ${ICONS.chevronRight}
        </div>
      </a>`;
    })
    .join("");

  screen(`
    <div class="topbar">
      <a class="back-btn" href="#/">${ICONS.back}</a>
      <div class="topbar-center">
        <p class="topbar-title" style="color:var(--primary);font-size:22px">Paisajes</p>
        <p class="topbar-sub">Humedales altoandinos</p>
      </div>
      <div class="icon-box">${ICONS.earth}</div>
    </div>
    <div class="paisajes-intro" style="margin-top:14px">
      <img src="${DATA.paisajeGlobalImages[0]}" loading="lazy" alt="Paisaje altoandino">
      <p>Los humedales altoandinos se ordenan a lo largo de un gradiente hídrico-salino. Explora los tres tipos de paisaje y las especies que los habitan.</p>
    </div>
    <div class="paisajes-list">${cards}</div>
    ${bottomNavHtml("paisajes")}
  `);
});

// ================= PAISAJE DETAIL =================
route("/paisajes/:id", ({ id }) => {
  const paisaje = getPaisaje(id);
  if (!paisaje) {
    screen(`<div class="empty-state"><h3>Paisaje no encontrado</h3></div>`);
    return;
  }
  const associatedSpecies = DATA.species.filter((s) => s.landscapes?.includes(paisaje.id));

  const subtypesHtml = paisaje.subtypes?.length
    ? `<div style="margin-top:8px">
        <p class="section-title" style="color:${paisaje.color}">Tipos de bofedal</p>
        ${paisaje.subtypes.map((s) => `<div class="subtype-card"><h4>${esc(s.name)}</h4><p>${esc(s.description)}</p></div>`).join("")}
      </div>`
    : "";

  const galleryHtml =
    paisaje.images.length > 1
      ? `<div class="gallery-section">
          <p class="section-title" style="color:${paisaje.color};padding:0 20px">Galería</p>
          <div class="gallery-row">${paisaje.images.map((img) => `<img src="${img}" loading="lazy" alt="${esc(paisaje.name)}">`).join("")}</div>
        </div>`
      : "";

  const speciesHtml = associatedSpecies.length
    ? `<div style="margin-top:24px">
        <p class="section-title" style="color:${paisaje.color}">Especies asociadas</p>
        ${associatedSpecies
          .map((s) => {
            const img = principalImage(s);
            return `<a class="paisaje-species-row" href="#/species/${s.id}">
              ${img ? `<img src="${img}" loading="lazy" alt="${esc(s.scientificName)}">` : `<div style="width:52px;height:52px;border-radius:10px;background:var(--muted);flex-shrink:0"></div>`}
              <div class="paisaje-species-info">
                <div class="name">${esc(s.scientificName)}</div>
                <div class="common">${esc(s.commonName || s.family)}</div>
              </div>
              ${ICONS.chevronRight}
            </a>`;
          })
          .join("")}
      </div>`
    : "";

  screen(`
    <div class="topbar">
      <a class="back-btn" href="#/paisajes">${ICONS.back}</a>
      <div class="topbar-center"><p class="topbar-sub">${esc(paisaje.shortName)}</p></div>
      <div class="icon-box" style="background:${paisaje.color}1A;color:${paisaje.color}">${paisajeIcon(paisaje.id)}</div>
    </div>
    <img class="paisaje-hero" src="${paisaje.images[0]}" alt="${esc(paisaje.name)}">
    <div class="paisaje-body">
      <span class="title-tag" style="background:${paisaje.color}1A;color:${paisaje.color}">${paisajeIcon(paisaje.id)}${esc(paisaje.shortName)}</span>
      <h1>${esc(paisaje.name)}</h1>
      <p class="paisaje-tagline">${esc(paisaje.tagline)}</p>
      ${paisaje.description.map((p) => `<p class="para">${esc(p)}</p>`).join("")}
      ${subtypesHtml}
      ${galleryHtml}
      ${speciesHtml}
    </div>
  `);
});
