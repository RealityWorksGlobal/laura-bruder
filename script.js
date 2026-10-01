/* ==========================================================================
   Architecture LAB — Laura Bruder
   One page, four states. Nothing reloads, so the mark and the cursor can
   travel between them.
   ========================================================================== */

/* ── configuration ─────────────────────────────────────────────────────── */

const CDN = 'https://cdn.juliettemartin.org/website_lab_portfolio/';

const SHEET = {
  projects:      'https://docs.google.com/spreadsheets/d/e/2PACX-1vS8hsXZG0w_Jm_l7dkOy3EFipF6gIUyJTu0nGx_jAyby2s0hUmiE6qavdY8KHCDGZ6NgLkzQEKsl6hJ/pub?gid=0&single=true&output=csv',
  about:         'https://docs.google.com/spreadsheets/d/e/2PACX-1vS8hsXZG0w_Jm_l7dkOy3EFipF6gIUyJTu0nGx_jAyby2s0hUmiE6qavdY8KHCDGZ6NgLkzQEKsl6hJ/pub?gid=1054162112&single=true&output=csv',
  collaborators: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS8hsXZG0w_Jm_l7dkOy3EFipF6gIUyJTu0nGx_jAyby2s0hUmiE6qavdY8KHCDGZ6NgLkzQEKsl6hJ/pub?gid=1232583974&single=true&output=csv',
  contact:       'https://docs.google.com/spreadsheets/d/e/2PACX-1vS8hsXZG0w_Jm_l7dkOy3EFipF6gIUyJTu0nGx_jAyby2s0hUmiE6qavdY8KHCDGZ6NgLkzQEKsl6hJ/pub?gid=839870317&single=true&output=csv',
  inspiration:   'https://docs.google.com/spreadsheets/d/e/2PACX-1vS8hsXZG0w_Jm_l7dkOy3EFipF6gIUyJTu0nGx_jAyby2s0hUmiE6qavdY8KHCDGZ6NgLkzQEKsl6hJ/pub?gid=1861703156&single=true&output=csv',
  // add the settings tab and paste its published URL here:
  settings:      ''
};

/* Shown until the `inspiration` tab has rows. Local files, not the CDN. */
const PLACEHOLDER = [
  { background: "data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20viewBox%3D%270%200%201600%20900%27%3E%3Crect%20width%3D%271600%27%20height%3D%27900%27%20fill%3D%27%231b1b1c%27%2F%3E%3Crect%20x%3D%270%27%20y%3D%27740%27%20width%3D%271600%27%20height%3D%27160%27%20fill%3D%27%232a2a2b%27%2F%3E%3Crect%20x%3D%27470%27%20y%3D%2790%27%20width%3D%27660%27%20height%3D%27740%27%20fill%3D%27%23373738%27%2F%3E%3Crect%20x%3D%27508%27%20y%3D%27128%27%20width%3D%27584%27%20height%3D%27664%27%20fill%3D%27%234d4d4e%27%2F%3E%3Crect%20x%3D%27546%27%20y%3D%27166%27%20width%3D%27508%27%20height%3D%27588%27%20fill%3D%27%23b0b0b1%27%2F%3E%3C%2Fsvg%3E",
    inner:      "data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20viewBox%3D%270%200%20900%201180%27%3E%3Crect%20width%3D%27900%27%20height%3D%271180%27%20fill%3D%27%23e7e5de%27%2F%3E%3Crect%20x%3D%2796%27%20y%3D%27104%27%20width%3D%27708%27%20height%3D%27840%27%20fill%3D%27%23cbc8c0%27%2F%3E%3Crect%20x%3D%27118%27%20y%3D%27126%27%20width%3D%27664%27%20height%3D%27796%27%20fill%3D%27%234a6a3c%27%2F%3E%3Crect%20x%3D%27118%27%20y%3D%27126%27%20width%3D%27664%27%20height%3D%2722%27%20fill%3D%27%2330342f%27%2F%3E%3Crect%20x%3D%27118%27%20y%3D%27900%27%20width%3D%27664%27%20height%3D%2722%27%20fill%3D%27%2330342f%27%2F%3E%3Crect%20x%3D%27436%27%20y%3D%27126%27%20width%3D%2728%27%20height%3D%27796%27%20fill%3D%27%2330342f%27%2F%3E%3Crect%20x%3D%270%27%20y%3D%27944%27%20width%3D%27900%27%20height%3D%27236%27%20fill%3D%27%23c6baa8%27%2F%3E%3C%2Fsvg%3E",
    type:       'image' }
];

/* Every word below is only a fallback. Anything Laura types into the
   `settings` tab (key / en / de) wins, so the interface vocabulary lives
   in the sheet, not in this file. */
const DEFAULTS = {
  site_title:        { en: 'Architecture LAB',   de: 'Architecture LAB' },
  nav_projects:      { en: 'PROJECTS',           de: 'PROJEKTE' },
  nav_inspirations:  { en: 'INSPIRATIONS',       de: 'INSPIRATIONEN' },
  nav_brand:         { en: 'BRAND',              de: 'MARKE' },
  nav_info:          { en: 'INFO',               de: 'INFO' },
  lang_switch:       { en: 'DE',                 de: 'EN' },
  meta_status:       { en: 'status',             de: 'Status' },
  meta_collaboration:{ en: 'collaboration with', de: 'in Zusammenarbeit mit' },
  meta_place:        { en: 'place',              de: 'Ort' },
  meta_client:       { en: 'client',             de: 'Auftraggeber' },
  acc_bio:           { en: 'LAURA BRUDER',       de: 'LAURA BRUDER' },
  acc_scope:         { en: 'SCOPE',              de: 'LEISTUNGEN' },
  acc_collaborators: { en: 'COLLABORATORS',      de: 'KOLLABORATIONEN' },
  acc_contact:       { en: 'CONTACT',            de: 'KONTAKT' },
  filter_selected:   { en: 'Selected',           de: 'Auswahl' }
};

/** A label: sheet first, built-in fallback second, the key itself last. */
function ui(k) {
  const row = state.data.settings[k];
  if (row) {
    const v = state.lang === 'de' ? (row.de || row.en) : row.en;
    if (v) return v;
  }
  const d = DEFAULTS[k];
  return d ? (state.lang === 'de' ? d.de : d.en) : k;
}

/** Categories come from the `tag` column, in the order they appear in the
    sheet. Adding "research" to a project's tags creates the filter — no code
    change. `Selected` is always last because it is a curation flag. */
function categories() {
  const seen = [];
  state.data.projects.forEach(p =>
    p.tags.forEach(tag => { if (tag && !seen.includes(tag)) seen.push(tag); }));
  const out = seen.map(tag => ({
    key: tag,
    label: ui('filter_' + tag) === 'filter_' + tag ? titleCase(tag) : ui('filter_' + tag)
  }));
  if (state.data.projects.some(p => p.isSelected))
    out.push({ key: 'selected', label: ui('filter_selected') });
  return out;
}

const titleCase = s => s.replace(/(^|[\s-])(\w)/g, (m, a, b) => a + b.toUpperCase());

const CACHE_KEY = 'lab-data-v7';

/* the cross grammar: lines grow / retract (LINE), angles travel (MOVE).
   Must match --line and --move in style.css. */
const T_LINE = 220, T_MOVE = 440;
const wait = ms => new Promise(r => setTimeout(r, ms));

/** Restart a CSS animation class on an element. */
function replay(el, cls) { el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); }

/* ── state ─────────────────────────────────────────────────────────────── */

const state = {
  lang: 'en',
  view: 'splash',
  filter: null,
  project: null,
  openId: null,
  scrollBefore: 0,
  data: { projects: [], about: {}, collaborators: [], contact: {}, inspiration: [], settings: {} },
  splashIndex: 0
};

const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* ── helpers ───────────────────────────────────────────────────────────── */

const key = s => String(s || '').trim().toLowerCase().replace(/[\s-]+/g, '_');

const asset = p => {
  p = String(p || '').trim();
  if (!p) return '';
  // absolute URLs and local paths (./media/…, /media/…) are used as given;
  // everything else is a filename inside the NAS folder
  if (/^(https?:|data:)/.test(p) || p.startsWith('./') || p.startsWith('/')) return p;
  return CDN + p;
};

const isVideo = p => /\.(mp4|webm|mov)$/i.test(p);

/** An <img> or a muted looping <video>, depending on the file. */
function mediaEl(path, cls) {
  const src = asset(path);
  const el = document.createElement(isVideo(src) ? 'video' : 'img');
  if (isVideo(src)) Object.assign(el, { autoplay: true, muted: true, loop: true, playsInline: true });
  else el.loading = 'lazy';
  el.src = src;
  if (cls) el.className = cls;
  return el;
}

const list = s => String(s || '').split(',').map(x => x.trim()).filter(Boolean);

const yes = v => /^(yes|y|true|1|ja|x)$/i.test(String(v || '').trim());

/** Collapse a one-object tab into a single record: for each column take the
    first non-empty cell found, whichever row it sits in. */
function mergeRows(rows) {
  const out = {};
  (rows || []).forEach(r => Object.entries(r).forEach(([k, v]) => {
    if (!out[k] && v && String(v).trim()) out[k] = String(v).trim();
  }));
  return out;
}

/** Resolve a field across the three column shapes Laura uses:
    `brand_en` / `brand_de`, and unsuffixed columns like `scope`.
    Current language first, then the bare column, then the other language. */
function t(row, field) {
  if (!row) return '';
  const order = state.lang === 'de'
    ? [field + '_de', field, field + '_en']
    : [field + '_en', field, field + '_de'];
  for (const k of order) {
    const v = row[k];
    if (v && String(v).trim()) return String(v).trim();
  }
  return '';
}

function fetchCSV(url) {
  return new Promise((resolve, reject) => {
    if (!url) return resolve([]);
    Papa.parse(url, {
      download: true,
      header: true,
      skipEmptyLines: true,
      transformHeader: key,
      complete: r => resolve(r.data || []),
      error: () => resolve([])        // unpublished or empty tab: keep going
    });
  });
}

/* ── data ──────────────────────────────────────────────────────────────── */

async function loadData() {
  const cached = sessionStorage.getItem(CACHE_KEY);
  if (cached) {
    try {
      state.data = JSON.parse(cached);
      if (!state.data.inspiration || !state.data.inspiration.length)
        state.data.inspiration = PLACEHOLDER;
      return;
    } catch (e) { /* refetch */ }
  }

  const [projects, about, collaborators, contact, inspiration, settings] = await Promise.all([
    fetchCSV(SHEET.projects),
    fetchCSV(SHEET.about),
    fetchCSV(SHEET.collaborators),
    fetchCSV(SHEET.contact),
    fetchCSV(SHEET.inspiration),
    fetchCSV(SHEET.settings)
  ]);

  state.data = {
    projects: projects
      .filter(r => r.id && yes(r.show))
      .map(normaliseProject),
    about: mergeRows(about),
    infoRows: about,
    collaborators: collaborators.filter(r => r.collaborator),
    contact: mergeRows(contact),
    inspiration: inspiration
      .filter(r => (r.background || r.image) && (r.show === undefined || yes(r.show)))
      .map(r => ({
        background: r.background || r.image,
        inner:      r.inner || r.background || r.image,
        type:       r.type || 'image'
      })),
    settings: Object.fromEntries(
      settings.filter(r => r.key).map(r => [key(r.key), { en: r.en, de: r.de }]))
  };

  try { sessionStorage.setItem(CACHE_KEY, JSON.stringify(state.data)); } catch (e) {}

  if (!state.data.inspiration.length) state.data.inspiration = PLACEHOLDER;
}

/** True when a cell is a list of media filenames rather than prose. */
const looksLikeMedia = v =>
  !!v && list(v).length > 0 &&
  list(v).every(x => /\.(jpe?g|png|webp|gif|mp4|webm|mov)$/i.test(x));

function normaliseProject(r) {
  const m = String(r.id).match(/^(\d{3,4})\s*([A-Za-z]+)/) || [];

  // `images` is the right column, but the lists currently live in content_de
  let images = list(r.images);
  ['content_de', 'content_en', 'content'].forEach(k => {
    if (looksLikeMedia(r[k])) { images = images.concat(list(r[k])); r[k] = ''; }
  });
  images = [...new Set(images)];
  return {
    ...r,
    id: String(r.id).trim(),
    date: m[1] || '',
    ref: (m[2] || '').toUpperCase(),
    tags: list(r.tag_en || r.tag || r.tag_de).map(x => x.toLowerCase()),
    isSelected: yes(r.selected),
    images,
    hover: r.hover_image || r.cover_image || images[0] || '',
    // a page exists if there is anything to show on it
    hasPage: !!(images.length || r.content || r.content_en || r.content_de)
  };
}

/* ── cursor ────────────────────────────────────────────────────────────── */

const cursor = (() => {
  const el = $('#cursor');
  let x = innerWidth / 2, y = innerHeight / 2;
  let mode = '';

  const draw = () => { el.style.transform = `translate(${x}px,${y}px)`; };

  const OPENS = 'a[data-clickable],button[data-clickable],[role="button"][data-clickable]';

  /* plus = open or add · apart = about to become a frame · × = close */
  function modeAt(target) {
    if (state.openId) {
      const frame = $('#frame');
      const inside = frame && !frame.hidden && frame.contains(target);
      return inside ? '' : 'is-close';          // outside an open project closes it
    }
    if (state.view === 'splash') return '';     // the splash keeps a plain plus
    return target.closest(OPENS) ? 'is-apart' : '';
  }

  addEventListener('pointermove', e => {
    if (e.pointerType !== 'mouse') return;
    document.body.classList.add('has-fine-pointer');
    x = e.clientX; y = e.clientY;
    draw();

    const next = modeAt(e.target);
    if (next !== mode) {
      el.classList.remove('is-apart', 'is-close');
      if (next) el.classList.add(next);
      mode = next;
    }
  }, { passive: true });

  return { at() { return { x, y }; } };
})();

/* ── the travelling LAB mark ───────────────────────────────────────────── */

const lab = $('#lab');

function placeLab(mode) {
  const anchor = mode === 'corner' ? null : $(`.lab-anchor[data-anchor="${mode}"]`);
  let tx = 0, ty = 0;

  if (anchor && anchor.offsetParent !== null) {
    // a rect, because the brand block is centred with a transform that
    // offsetLeft/offsetTop cannot see. Measured again on animationend below,
    // so a reading taken mid-animation is corrected rather than kept.
    const r = anchor.getBoundingClientRect();
    tx = r.left;
    ty = r.top;
  } else {
    tx = 0;                       // the corner itself: no margin
    ty = 0;
  }
  lab.style.transform = `translate(${tx}px,${ty}px)`;
}

function labModeForView() {
  if (state.view === 'splash') return 'splash';
  if (state.view === 'info' && scrollY < 60) return 'info';
  return 'corner';
}

const refreshLab = () => placeLab(labModeForView());
addEventListener('resize', refreshLab);
addEventListener('scroll', refreshLab, { passive: true });
// any entry animation that moves an anchor invalidates the measurement
document.addEventListener('animationend', refreshLab);

/* ── splash / inspirations ─────────────────────────────────────────────── */

function paintMedia(el, path) {
  el.innerHTML = '';
  el.style.backgroundImage = '';
  if (!path) return;
  const src = asset(path);
  if (isVideo(src)) {
    const v = document.createElement('video');
    Object.assign(v, { src, autoplay: true, muted: true, loop: true, playsInline: true });
    el.appendChild(v);
  } else {
    el.style.backgroundImage = `url("${src}")`;
  }
}

function showSplash(i) {
  const pool = state.data.inspiration;
  if (!pool.length) return;
  state.splashIndex = ((i % pool.length) + pool.length) % pool.length;
  const pair = pool[state.splashIndex];
  const inner = $('#splash-inner');

  paintMedia($('#splash-bg'), pair.background);

  inner.classList.add('is-swapping');
  setTimeout(() => {
    paintMedia(inner, pair.inner || pair.background);
    fitInner(inner, pair.inner || pair.background);
    inner.classList.remove('is-swapping');
  }, 220);
}

/** Inner frame keeps its centre, takes the format of whatever it holds. */
function fitInner(el, path) {
  const src = asset(path);
  const apply = (w, h) => {
    const maxW = innerWidth * 0.44;
    const maxH = innerHeight * 0.70;
    const s = Math.min(maxW / w, maxH / h);
    el.style.setProperty('--inner-w', Math.round(w * s) + 'px');
    el.style.setProperty('--inner-h', Math.round(h * s) + 'px');
    el.style.width = 'var(--inner-w)';
    el.style.height = 'var(--inner-h)';
  };
  if (isVideo(src)) return apply(16, 9);
  const probe = new Image();
  probe.onload = () => apply(probe.naturalWidth, probe.naturalHeight);
  probe.src = src;
}

/* One way through: images + cross → brand → project list.
   The cross is the two corner angles stacked at the centre; opening the brand
   sends each to its own corner. */
const brand = $('#brand');
let brandOpen = false;

function setBrand(open) {
  brandOpen = open;
  $('#view-splash').classList.toggle('is-open', open);
  brand.classList.toggle('is-closed', !open);
  if (open) brand.classList.remove('is-shrunk');
  document.body.classList.toggle('brand-open', open);

  // LAB is only ever faded on the splash, never flown
  lab.style.transition = 'none';
  refreshLab();
  void lab.offsetWidth;
  lab.style.transition = '';
}

/* First arrival: images → brand → projects. Afterwards the brand has its own
   nav item, and a click on either the images or the brand goes to projects. */
/* Reset on every page load: land on inspiration, click → brand, click →
   projects. For the rest of that visit both go straight to projects. */
let seenBrand = false;

/** Arriving on the splash: the cross grows out of its centre, and if the
    brand is wanted, it then splits into the frame's angles. */
async function arriveSplash(openBrand) {
  setBrand(false);
  brand.classList.add('is-closed', 'is-shrunk');
  void brand.offsetWidth;
  brand.classList.remove('is-shrunk');
  if (!openBrand) return;
  await wait(T_LINE);
  if (state.view === 'splash') setBrand(true);
}

const splashStep = () => {
  if (!brandOpen && !seenBrand) {
    seenBrand = true;
    setBrand(true);
    return;
  }
  if (brandOpen) {
    handoff();
    return;
  }
  go('#/projects');
};
$('#view-splash').addEventListener('click', splashStep);

/* ── project list ──────────────────────────────────────────────────────── */

/* The same two angles as the brand and the frame, stacked into a cross.
   Drawn at the cursor's scale so the three read as one object. */
const PLUS_SVG =
  '<span class="plus is-growing"><svg viewBox="-16 -16 32 32" aria-hidden="true">' +
  '<line x1="0" y1="0" x2="0"   y2="-14" pathLength="1"/>' +
  '<line x1="0" y1="0" x2="-14" y2="0"   pathLength="1"/>' +
  '<line x1="0" y1="0" x2="0"   y2="14"  pathLength="1"/>' +
  '<line x1="0" y1="0" x2="14"  y2="0"   pathLength="1"/>' +
  '</svg></span>';

function renderList() {
  const ol = $('#project-list');
  ol.innerHTML = '';

  ordered().forEach(p => {
    const li = document.createElement('li');
    li.dataset.id = p.id;

    const a = document.createElement(p.hasPage ? 'a' : 'span');
    a.className = 'entry' + (p.hasPage ? '' : ' no-plus');
    if (p.hasPage) {
      a.href = `#/projects/${encodeURIComponent(p.id)}`;
      a.dataset.clickable = '';
    }
    a.innerHTML = PLUS_SVG +
      `<span class="code">${p.date} ${p.ref}</span>, ` +
      `${escapeHTML(t(p, 'description'))}`;

    a.addEventListener('pointerenter', () => popOn(p.hover));
    a.addEventListener('pointerleave', popOff);

    li.appendChild(a);
    ol.appendChild(li);
  });
}

/** Filtering never hides anything — the matching projects simply rise. */
function ordered() {
  const all = state.data.projects;
  if (!state.filter) return all;
  const hit = p => state.filter === 'selected'
    ? p.isSelected
    : p.tags.includes(state.filter);
  return [...all.filter(hit), ...all.filter(p => !hit(p))];
}

/** FLIP, so the reshuffle is legible as movement rather than a redraw. */
function reshuffle(filter) {
  state.filter = state.filter === filter ? null : filter;

  const ol = $('#project-list');
  const first = new Map();
  $$('li', ol).forEach(li => first.set(li.dataset.id, li.getBoundingClientRect().top));

  renderList();
  syncFilters();

  $$('li', ol).forEach(li => {
    const was = first.get(li.dataset.id);
    if (was == null) return;
    const now = li.getBoundingClientRect().top;
    li.style.transition = 'none';
    li.style.transform = `translateY(${was - now}px)`;
    requestAnimationFrame(() => {
      li.style.transition = '';
      li.style.transform = '';
    });
  });
}

/** Brand → projects: the angles converge into the cross, the cross retracts
    into its centre, then the list arrives with its own crosses growing in. */
async function handoff() {
  if (state.busy) return;
  state.busy = true;
  $('#view-splash').classList.add('is-exiting');
  brand.classList.add('is-closed');          // angles → one cross at the centre
  await wait(T_MOVE);
  brand.classList.add('is-shrunk');          // cross → a point
  await wait(T_LINE);
  state.busy = false;
  go('#/projects');
}

function escapeHTML(s) {
  return String(s).replace(/[&<>"]/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}

/* ── hover pop-up ──────────────────────────────────────────────────────── */

const pop = $('#pop');

function popOn(path) {
  if (!path) return;
  if (pop.dataset.src === path) { pop.classList.add('is-on'); return; }
  pop.dataset.src = path;
  pop.innerHTML = '';
  pop.appendChild(mediaEl(path));
  pop.classList.add('is-on');
}

addEventListener('pointerdown', () => popOff(), true);
document.addEventListener('animationend', e => {
  const p = e.target.closest && e.target.closest('.plus.is-growing');
  if (p && e.target === p.querySelector('line:last-child')) p.classList.remove('is-growing');
});

function popOff() {
  pop.classList.remove('is-on');
  const v = pop.querySelector('video');
  if (v) v.pause();                 // nothing plays behind a hidden pop-up
}

/* ── project detail ────────────────────────────────────────────────────── */

/** Open a project. The clicked cross retracts into its centre; the frame's
    cross grows at the frame centre, then splits into angles for the corners. */
async function openProject(id) {
  const p = state.data.projects.find(x => x.id === id);
  if (!p) { state.openId = null; return; }
  popOff();

  const plus = $(`#project-list li[data-id="${CSS.escape(id)}"] .plus`);
  state.scrollBefore = scrollY;
  state.openId = id;
  renderFrame(p);

  if (plus) { plus.classList.remove('is-growing'); plus.classList.add('is-shrunk'); await wait(T_LINE); }
  if (state.openId !== id) return;           // navigated away meanwhile

  const frame = $('#frame');
  $('#view-projects').classList.add('is-open');
  document.documentElement.classList.add('project-open');
  document.body.classList.add('project-open');
  scrollTo(0, 0);
  frame.classList.add('is-closed', 'is-shrunk', 'is-opening');
  frame.hidden = false;
  $('#detail-title').hidden = false;
  void frame.offsetWidth;

  frame.classList.remove('is-shrunk');       // cross grows at the centre
  await wait(T_LINE);
  if (state.openId !== id) return;
  frame.classList.remove('is-closed', 'is-opening');   // → angles, to the corners
}

/** Close by clicking outside: angles converge, the cross retracts, the list
    returns with its crosses growing in. */
async function closeProjectAnimated() {
  if (!state.openId || state.busy) return;
  state.busy = true;
  const frame = $('#frame');
  frame.classList.add('is-opening', 'is-closed');     // content out, angles → cross
  await wait(T_MOVE);
  frame.classList.add('is-shrunk');                   // cross → a point
  await wait(T_LINE);
  closeProject();
  $$('#project-list .plus').forEach(el => { el.classList.remove('is-shrunk'); replay(el, 'is-growing'); });
  history.replaceState(null, '', '#/projects');
  state.busy = false;
}

/** Where the plus for this project currently sits on screen. */
function originOfPlus(id) {
  const li = $(`#project-list li[data-id="${CSS.escape(id)}"] .plus`);
  if (!li) return null;
  const r = li.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
}

function closeProject() {
  if (!state.openId) return;
  state.openId = null;
  $('#view-projects').classList.remove('is-open');
  $('#frame').classList.add('is-closed', 'is-shrunk');
  document.documentElement.classList.remove('project-open');
  document.body.classList.remove('project-open');
  $('#frame').hidden = true;
  $('#detail-title').hidden = true;
  $('#drops').innerHTML = '';
  scrollTo(0, state.scrollBefore || 0);   // back to the same place in the list
}

function renderFrame(p) {
  state.project = p;

  $('#detail-title').textContent = `${p.date} ${p.ref}, ${t(p, 'description')}`;
  $('#detail-content').textContent = t(p, 'content');

  const collab = p.collaboration
    ? (p.collab_link
        ? `<a href="${p.collab_link}" target="_blank" rel="noopener" data-clickable>${escapeHTML(p.collaboration)}</a>`
        : escapeHTML(p.collaboration))
    : '';

  $('#detail-meta').innerHTML = [
    [ui('meta_status'), escapeHTML(t(p, 'status'))],
    [ui('meta_collaboration'), collab],
    [ui('meta_place'), escapeHTML(t(p, 'place'))],
    [ui('meta_client'), escapeHTML(t(p, 'client'))]
  ].filter(([, v]) => v)
   .map(([k, v]) => `<div><dt>${k}:</dt><dd>${v}</dd></div>`).join('');

  const stack = $('#stack');
  stack.innerHTML = '';
  if (p.images[0]) stack.appendChild(mediaEl(p.images[0], 'main'));
  $('#drops').innerHTML = '';
  $('#drops').dataset.next = '1';
}

/** Inside the frame, a click drops the next image where you clicked — free to
    spill over the page. Outside it, the frame closes. */
document.addEventListener('click', e => {
  if (!state.openId || state.busy) return;
  if (e.target.closest('#chrome')) return;

  const frame = $('#frame');
  const inside = frame.contains(e.target);

  if (!inside) { closeProjectAnimated(); return; }

  const p = state.project;
  if (!p || p.images.length < 2) return;

  const drops = $('#drops');
  let n = Number(drops.dataset.next || 1);
  if (n >= p.images.length) n = 1;

  const img = mediaEl(p.images[n]);
  img.style.left = e.clientX + 'px';
  img.style.top = e.clientY + 'px';
  img.style.transform = 'translate(-50%,-38%)';
  drops.appendChild(img);
  drops.dataset.next = n + 1;
});

/* ── info ──────────────────────────────────────────────────────────────── */

/** One column pair of the info tab, read top to bottom: the first non-empty
    cell is the section title, the next one its body. `dup` reads the second
    copy of a repeated header (the parser renames it `contact_en_1`). */
function infoPair(base, dup = '') {
  const order = state.lang === 'de' ? ['de', 'en'] : ['en', 'de'];
  const vals = (state.data.infoRows || []).map(r => {
    for (const l of order) {
      const v = r[`${base}_${l}${dup}`];
      if (v && String(v).trim()) return String(v).trim();
    }
    return '';
  }).filter(Boolean);
  return { title: vals[0] || '', body: vals[1] || '' };
}

/** Plain text in, with emails and URLs made clickable. */
function linkify(text) {
  return escapeHTML(text)
    .replace(/([\w.+-]+@[\w-]+\.[\w.-]+)/g,
      '<a href="mailto:$1" data-clickable>$1</a>')
    .replace(/(https?:\/\/[^\s<]+)/g,
      '<a href="$1" target="_blank" rel="noopener" data-clickable>$1</a>');
}

function renderInfo() {
  const a = state.data.about;
  $('#about').textContent = t(a, 'about');
  $('#brand-text').textContent = t(a, 'brand');

  // the network paragraph ends "These include:" — the collaborators tab follows
  const collabs = state.data.collaborators.map(c => c.collaborator_link
    ? `<li><a href="${c.collaborator_link}" target="_blank" rel="noopener" data-clickable>${escapeHTML(c.collaborator)}</a></li>`
    : `<li>${escapeHTML(c.collaborator)}</li>`).join('');

  const write = infoPair('write').title ? infoPair('write') : infoPair('contact', '_1');

  const sections = [
    { k: 'bio',     ...infoPair('bio'), portrait: a.portrait },
    { k: 'works',   ...infoPair('works') },
    { k: 'network', ...infoPair('network'), extra: collabs ? `<ul>${collabs}</ul>` : '' },
    { k: 'contact', ...infoPair('contact') },
    { k: 'write',   ...write }
  ].filter(s => s.title);

  $('#accordion').innerHTML = sections.map(s => `
    <div class="acc-item" data-acc="${s.k}">
      <div class="acc-head" role="button" tabindex="0" data-clickable
           ${s.portrait ? `data-portrait="${s.portrait}"` : ''}>
        ${PLUS_SVG}<span>${escapeHTML(s.title)}</span>
      </div>
      <div class="acc-body"><div class="acc-body-inner">${linkify(s.body)}${s.extra || ''}</div></div>
    </div>`).join('');
}

$('#accordion').addEventListener('click', e => {
  const head = e.target.closest('.acc-head');
  if (head) head.parentElement.classList.toggle('is-open');
});
$('#accordion').addEventListener('keydown', e => {
  if ((e.key === 'Enter' || e.key === ' ') && e.target.closest('.acc-head')) {
    e.preventDefault();
    e.target.closest('.acc-item').classList.toggle('is-open');
  }
});
// her portrait follows the same rule as the project images: hover only
$('#accordion').addEventListener('pointerover', e => {
  const head = e.target.closest('.acc-head[data-portrait]');
  if (head) popOn(head.dataset.portrait);
});
$('#accordion').addEventListener('pointerout', e => {
  if (e.target.closest('.acc-head[data-portrait]')) popOff();
});

/* ── chrome ────────────────────────────────────────────────────────────── */

function syncFilters() {
  const nav = $('#filters');
  if (!nav) return;
  const on = state.view === 'projects';
  nav.hidden = !on;
  if (!on) return;

  nav.innerHTML = categories().map(c =>
    `<button type="button" class="filter" data-filter="${c.key}" data-clickable
       aria-pressed="${state.filter === c.key}">${escapeHTML(c.label)}</button>`)
    .join('<span class="rule">|</span>');
}

$('#filters')?.addEventListener('click', e => {
  const b = e.target.closest('.filter');
  if (!b) return;
  if (state.view !== 'projects') go('#/projects');
  reshuffle(b.dataset.filter);
});

function syncChrome() {
  $('[data-nav="projects"]').textContent = ui('nav_projects');
  $('[data-nav="splash"]').textContent = ui('nav_inspirations');
  $('[data-nav="brand"]').textContent = ui('nav_brand');
  $('#nav-info').textContent = ui('nav_info');
  $('#lang').textContent = ui('lang_switch');
  document.title = ui('site_title');
  const here = location.hash.replace(/^#\/?/, '').split('/')[0] || 'splash';
  $$('#chrome [data-nav]').forEach(a => a.setAttribute('aria-current',
    a.dataset.nav === (here === 'projects' ? 'projects' : here)));
  syncFilters();
}

$('#lang').addEventListener('click', () => {
  state.lang = state.lang === 'en' ? 'de' : 'en';
  document.body.dataset.lang = state.lang;
  document.documentElement.lang = state.lang;
  render();
});

/* ── router ────────────────────────────────────────────────────────────── */

const go = hash => { location.hash = hash; };

function parseHash() {
  const h = location.hash.replace(/^#\/?/, '');
  if (!h) return { view: 'splash' };
  const [first, second] = h.split('/');
  if (first === 'projects') return { view: 'projects',
    open: second ? decodeURIComponent(second) : null };
  if (first === 'brand') return { view: 'splash', brand: true };
  if (first === 'info') return { view: 'info' };
  return { view: 'splash' };
}

function render() {
  popOff();                         // a hover never survives a navigation
  const route = parseHash();
  if (!(route.view === 'projects' && route.open)) closeProject();
  const previous = state.view;
  state.view = route.view;
  document.body.dataset.view = route.view;

  const changed = previous !== route.view || !state.rendered;
  state.rendered = true;

  renderInfo();
  if (route.view === 'projects') {
    // rebuilding mid-view would restart every cross, so only when needed
    if (changed || state.listLang !== state.lang) { renderList(); state.listLang = state.lang; }
    if (route.open && route.open !== state.openId) openProject(route.open);
  }
  if (route.view === 'splash') {
    $('#view-splash').classList.remove('is-exiting');
    showSplash(state.splashIndex);
    if (route.brand) seenBrand = true;
    if (changed) arriveSplash(!!route.brand);
    else setBrand(!!route.brand);
  }

  const target = $('#view-' + route.view);

  $$('.view').forEach(v => {
    if (v === target) return;
    const wasOn = v.classList.contains('is-active');
    v.classList.remove('is-active', 'is-entering', 'is-leaving');
    if (wasOn && changed) {                 // the outgoing text rolls up
      v.classList.add('is-leaving');
      setTimeout(() => v.classList.remove('is-leaving'), 360);
    }
  });

  target.classList.add('is-active');
  if (changed) {
    target.classList.remove('is-entering');
    void target.offsetWidth;
    target.classList.add('is-entering');
    scrollTo(0, 0);
  }

  syncChrome();
  lab.style.transition = 'none';          // it fades with the view, never flies
  refreshLab();
  void lab.offsetWidth;
  lab.style.transition = '';
  setTimeout(refreshLab, 680);   // again once the entry animation has settled
}

addEventListener('hashchange', render);

/* ── boot ──────────────────────────────────────────────────────────────── */

(async function init() {
  try {
    await loadData();
  } catch (err) {
    console.error('Sheet unreachable:', err);
    $('#loader').innerHTML =
      '<p style="font:11px/1.4 var(--grotesk)">Content is not loading. Check the published sheet URLs.</p>';
    return;
  }
  render();
  document.body.classList.add('is-ready');
})();
