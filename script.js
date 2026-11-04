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
  site_title:        { en: 'LAB - Laura Bruder', de: 'LAB - Laura Bruder' },
  nav_projects:      { en: 'PROJECTS',           de: 'PROJEKTE' },
  nav_inspirations:  { en: 'INSPIRATIONS',       de: 'INSPIRATIONEN' },
  nav_brand:         { en: 'BRAND',              de: 'MARKE' },
  nav_info:          { en: 'INFO',               de: 'INFO' },
  lang_switch:       { en: 'DE',                 de: 'EN' },
  meta_status:       { en: 'status',             de: 'Status' },
  meta_collaboration:{ en: 'collaboration with', de: 'in Zusammenarbeit mit' },
  meta_place:        { en: 'place',              de: 'Ort' },
  meta_client:       { en: 'client',             de: 'Auftraggeber' },
  meta_working_for:  { en: 'as architect at',    de: 'als Architektin bei' },
  meta_credits:      { en: 'image credits',      de: 'Bildnachweis' },
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
  const deLabel = tag => {
    for (const p of state.data.projects) {
      const i = p.tags.indexOf(tag);
      if (i > -1 && p.tagsDe && p.tagsDe[i]) return p.tagsDe[i];
    }
    return tag;
  };
  const out = seen.map(tag => {
    const custom = ui('filter_' + tag);
    const label = custom !== 'filter_' + tag ? custom
                : titleCase(state.lang === 'de' ? deLabel(tag) : tag);
    return { key: tag, label };
  });
  if (state.data.projects.some(p => p.isSelected))
    out.push({ key: 'selected', label: ui('filter_selected') });
  return out;
}

const titleCase = s => s.replace(/(^|[\s-])(\w)/g, (m, a, b) => a + b.toUpperCase());

const CACHE_KEY = 'lab-data-v8';

/* the cross grammar: lines grow / retract (LINE), angles travel (MOVE).
   Must match --line and --move in style.css. */
/* Timings and sizes come from the parameters at the top of style.css, read
   at the moment they are used — so editing them live takes effect at once. */
function cssVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}
function cssTime(name, fallback) {           // "2s" → 2000, "220ms" → 220
  const v = cssVar(name), n = parseFloat(v);
  if (isNaN(n)) return fallback;
  return /ms$/.test(v) ? n : /s$/.test(v) ? n * 1000 : n;
}
function cssShare(name, fallback) {          // "44vw" → 0.44
  const n = parseFloat(cssVar(name));
  return isNaN(n) ? fallback : n / 100;
}
const T = {
  get line() { return cssTime('--line', 220); },
  get move() { return cssTime('--move', 440); }
};
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
  zTop: 1,
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

/* Videos are made once per file and reused: no new download or decoding
   each time the same video comes back (covers, hovers). */
const videoCache = new Map();
function videoEl(src) {
  let v = videoCache.get(src);
  if (!v || v.isConnected) {                 // in use elsewhere → a fresh one
    v = document.createElement('video');
    Object.assign(v, { autoplay: true, muted: true, loop: true, playsInline: true, preload: 'auto' });
    v.src = src;
    if (!videoCache.has(src)) videoCache.set(src, v);
  }
  v.className = '';
  v.play?.().catch(() => {});
  return v;
}

/** An <img> or a muted looping <video>, depending on the file. */
function mediaEl(path, cls) {
  const src = asset(path);
  let el;
  if (isVideo(src)) el = videoEl(src);
  else {
    el = document.createElement('img');
    el.loading = 'lazy'; el.decoding = 'async';
    el.src = src;
  }
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
      .map(r => ({
        background: r.back_image || r.background || r.image || '',
        inner:      r.front_image || r.inner || '',
        show:       r.show
      }))
      .filter(r => r.background && (r.show === undefined || r.show === '' || yes(r.show)))
      .map(r => ({ background: r.background, inner: r.inner || r.background })),
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

  /* Images come from the `content` column (or `images`). Texts only from
     content_en / content_de. A filename without a valid extension is skipped
     and reported in the console, instead of breaking the whole project. */
  const MEDIA = /\.(jpe?g|png|webp|gif|mp4|webm|mov)$/i;
  let images = [];
  ['images', 'content'].forEach(k => {
    list(r[k]).forEach(f => {
      if (MEDIA.test(f)) images.push(f);
      else console.warn(`[LAB] ${r.id}: "${f}" in column ${k} is not an image or video — skipped`);
    });
    r[k] = '';
  });
  // older sheets kept the image list in content_de / content_en
  ['content_de', 'content_en'].forEach(k => {
    if (looksLikeMedia(r[k])) { images = images.concat(list(r[k])); r[k] = ''; }
  });
  images = [...new Set(images)];
  return {
    ...r,
    id: String(r.id).trim(),
    date: m[1] || '',
    ref: (m[2] || '').toUpperCase(),
    tags: list(r.tag_en || r.tag || r.tag_de).map(x => x.toLowerCase()),
    tagsDe: list(r.tag_de || r.tag_en || r.tag),
    isSelected: yes(r.selected),
    images,
    hover: r.hover_image || r.cover_image || images[0] || '',
    // a page exists if there is anything to show on it
    // `clickable` decides when the column exists; otherwise: anything to show
    hasPage: (r.clickable === undefined || r.clickable === '' ? true : yes(r.clickable)) &&
             !!(images.length || r.content || r.content_en || r.content_de)
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
    if (state.busy) return '';                  // while animating: a plain plus, no flicker
    if (state.openId) {
      const frame = $('#frame');
      if (target.closest('#drops img, #drops video')) return '';   // drag, not close
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
  return 'corner';
}

const refreshLab = () => placeLab(labModeForView());

/* every cross starts exactly where the word LAB ends */
function measureLab() {
  document.documentElement.style.setProperty('--lab-w', lab.getBoundingClientRect().width + 'px');
}
addEventListener('resize', measureLab);
// LAB resized live (a parameter edited in the browser) → crosses follow at once
if ('ResizeObserver' in window) new ResizeObserver(measureLab).observe(lab);
document.fonts && document.fonts.ready.then(measureLab);
measureLab();
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
    el.appendChild(videoEl(src));          // reused, not re-downloaded
  } else {
    el.style.backgroundImage = `url("${src}")`;
  }
}

/* Cover rotation: hard cuts, back image first, front image 0.5 s later,
   a new pair every 2 s. Pauses while the cursor is on the front image. */


function showSplash(i) {
  const pool = state.data.inspiration;
  if (!pool.length) return;
  state.splashIndex = ((i % pool.length) + pool.length) % pool.length;
  const pair = pool[state.splashIndex];
  paintMedia($('#splash-bg'), pair.background);
  showFront(pair);
}

function showFront(pair) {
  const inner = $('#splash-inner');
  paintMedia(inner, pair.inner || pair.background);
  fitInner(inner, pair.inner || pair.background);
}

/** Warm the browser cache so the next cut is instant. */
function preloadPair(pair) {
  [pair.background, pair.inner].forEach(p => {
    if (!p) return;
    if (isVideo(p)) videoEl(asset(p));     // starts loading, kept for its turn
    else { const im = new Image(); im.src = asset(p); }
  });
}

const rotation = { timer: null, front: null, paused: false };

function rotateStep() {
  const pool = state.data.inspiration;
  if (pool.length < 2 || rotation.paused) return;
  state.splashIndex = (state.splashIndex + 1) % pool.length;
  const pair = pool[state.splashIndex];
  paintMedia($('#splash-bg'), pair.background);                 // cut 1
  clearTimeout(rotation.front);
  rotation.front = setTimeout(() => showFront(pair), cssTime('--cover-front-delay', 500)); // cut 2
  preloadPair(pool[(state.splashIndex + 1) % pool.length]);
}

function startRotation() {
  stopRotation();
  if (state.data.inspiration.length < 2) return;
  preloadPair(state.data.inspiration[(state.splashIndex + 1) % state.data.inspiration.length]);
  const tick = () => { rotateStep(); rotation.timer = setTimeout(tick, cssTime('--cover-every', 2000)); };
  rotation.timer = setTimeout(tick, cssTime('--cover-every', 2000));
}

function stopRotation() {
  clearTimeout(rotation.timer); clearTimeout(rotation.front);
  rotation.timer = rotation.front = null;
}

// the brand layer sits on top of the plates, so test the pointer by position
addEventListener('pointermove', e => {
  if (state.view !== 'splash' || brandOpen) { rotation.paused = false; return; }
  const r = $('#splash-inner').getBoundingClientRect();
  rotation.paused = e.clientX >= r.left && e.clientX <= r.right &&
                    e.clientY >= r.top && e.clientY <= r.bottom;
}, { passive: true });

/** Inner frame keeps its centre, takes the format of whatever it holds. */
function fitInner(el, path) {
  const src = asset(path);
  const apply = (w, h) => {
    const maxW = innerWidth * cssShare('--cover-front-max-w', 0.44);
    const maxH = innerHeight * cssShare('--cover-front-max-h', 0.70);
    const s = Math.min(maxW / w, maxH / h);
    el.style.setProperty('--inner-w', Math.round(w * s) + 'px');
    el.style.setProperty('--inner-h', Math.round(h * s) + 'px');
    el.style.width = 'var(--inner-w)';
    el.style.height = 'var(--inner-h)';
  };
  if (isVideo(src)) {
    const v = el.querySelector('video') || videoEl(src);
    if (v.videoWidth) apply(v.videoWidth, v.videoHeight);
    else v.addEventListener('loadedmetadata', () => apply(v.videoWidth || 16, v.videoHeight || 9), { once: true });
    return;
  }
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
  if (open) stopRotation();
  else if (state.view === 'splash') startRotation();
  $('#view-splash').classList.toggle('is-open', open);
  brand.classList.toggle('is-closed', !open);
  if (open) brand.classList.remove('is-shrunk');
  document.body.classList.toggle('brand-open', open);

  refreshLab();                     // LAB flies to its new place
}

/* First arrival: images → brand → projects. Afterwards the brand has its own
   nav item, and a click on either the images or the brand goes to projects. */
/* Reset on every page load: land on inspiration, click → brand, click →
   projects. For the rest of that visit both go straight to projects. */
let seenBrand = false;

/** Arriving on the splash: the cross grows out of its centre, and if the
    brand is wanted, it then splits into the frame's angles. */
async function arriveSplash(openBrand) {
  const view = $('#view-splash');
  if (openBrand) {
    // straight to the brand: the images never show, not even for a frame
    stopRotation();
    view.classList.add('is-open', 'no-fade');
    brand.classList.add('is-closed', 'is-shrunk');
    void brand.offsetWidth;
    brand.classList.remove('is-shrunk');          // the cross grows …
    await wait(T.line);
    if (state.view === 'splash') setBrand(true);  // … and opens
    view.classList.remove('no-fade');
    return;
  }
  view.classList.remove('no-fade');
  const n = state.data.inspiration.length;
  if (n > 1) {
    let i; do { i = Math.floor(Math.random() * n); } while (i === state.splashIndex);
    showSplash(i);
  }
  setBrand(false);
  brand.classList.add('is-closed', 'is-shrunk');
  void brand.offsetWidth;
  brand.classList.remove('is-shrunk');
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
      `<span class="code">${p.date} ${p.ref}</span> ` +
      `${escapeHTML(t(p, 'description'))}`;

    a.addEventListener('pointerenter', () => popOn(p.hover));
    a.addEventListener('click', () => { state.clickedPlus = a.querySelector('.plus'); });
    a.addEventListener('pointerenter', () => {
      const f = p.images[0];
      if (f && !isVideo(f)) { const im = new Image(); im.decoding = 'async'; im.src = asset(f); }
    }, { once: true });
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
  await wait(T.move);
  brand.classList.add('is-shrunk');          // cross → a point
  await wait(T.line);
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

/* ── open / close: one cross the whole way ─────────────────────────────
   Open:  the list dims; the clicked cross travels over it to the centre of
          the frame. There it opens: the corners spread to the frame while a
          white window grows with them to the whole page, revealing the
          project. Fully open, the page is only the project.
   Close: the exact reverse — window and corners shrink to the centre over
          the dimmed list (dropped images go with them), the cross travels
          back to its line, the list returns to full black. */

const centreOf = el => {
  const r = el.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
};
const listPlus = id => $(`#project-list li[data-id="${CSS.escape(id)}"] .plus`);
/* The window starts and ends as the square around the cross, so the cross is
   always inside it — never clipped away. */
function crossClip(c) {
  const a = $('#frame .angle');
  const h = (a ? a.getBoundingClientRect().width : 40) + 4;   // half the cross, + a hair
  return `inset(${c.y - h}px ${innerWidth - c.x - h}px ${innerHeight - c.y - h}px ${c.x - h}px)`;
}
/* Dropped images close fully, to a point. */
/** The white window: a full-page sheet scaled from / to point c. */
function windowTo(c, open, animate) {
  const w = $('#project-window');
  w.style.transformOrigin = `${c.x}px ${c.y}px`;
  w.style.transition = animate ? '' : 'none';
  w.style.transform = open ? 'scale(1)' : 'scale(0)';
  if (!animate) w.getBoundingClientRect();
}
const pointClip = c => `inset(${c.y}px ${innerWidth - c.x}px ${innerHeight - c.y}px ${c.x}px)`;

/** One cross, moved from a to b on the travel layer. */
async function travelCross(a, b) {
  const t = $('#travel');
  t.querySelector('svg')?.remove();
  t.insertAdjacentHTML('beforeend', '<svg viewBox="-16 -16 32 32">' +
    '<line x1="0" y1="-14" x2="0" y2="14"/><line x1="-14" y1="0" x2="14" y2="0"/></svg>');
  const svg = t.querySelector('svg');
  svg.style.transition = 'none';
  svg.style.transform = `translate(${a.x}px,${a.y}px)`;
  svg.getBoundingClientRect();       // commit the start position before moving
  svg.style.transition = '';
  svg.style.transform = `translate(${b.x}px,${b.y}px)`;
  await wait(T.move);
}

/** A copy of the clicked line, laid exactly over it on the travel layer. */
function lineCopy(li) {
  const r = li.getBoundingClientRect();
  const ol = document.createElement('ol');
  ol.className = 'travel-line';
  Object.assign(ol.style, { left: r.left + 'px', top: r.top + 'px', width: r.width + 'px' });
  const copy = li.cloneNode(true);
  copy.style.transform = '';
  ol.appendChild(copy);
  $('#travel').appendChild(ol);
  return ol;
}
/** Vertical distance from the line in the list to the title under the frame. */
const titleDrop = li =>
  $('#detail-title .line').getBoundingClientRect().top - li.getBoundingClientRect().top;

function moveLine(el, dy, animate) {
  el.style.transition = animate ? '' : 'none';
  el.style.transform = `translateY(${dy}px)`;
  if (!animate) el.getBoundingClientRect();
}

/** Make room where the title lands: the lines above the landing spot move up
    just enough to clear it (first using the gap the clicked line left; the
    lines above the gap follow only if more room is needed), and the line below
    the spot moves down if it touches it. The title then sits in the list with
    the normal spacing. `back` returns every line to its place. */
function shiftLines(li, back) {
  const go = (el, y) => {
    el.style.transition = `transform ${cssVar('--move')} ${cssVar('--ease-travel')}`;
    el.style.transform = y ? `translateY(${y}px)` : '';
  };
  if (back) { (state.shifted || []).forEach(el => go(el, 0)); return; }
  const onScreen = el => { const r = el.getBoundingClientRect(); return r.bottom > -50 && r.top < innerHeight + 50; };

  const items = [...li.parentElement.children];
  const k = items.indexOf(li);
  const rect = el => el.getBoundingClientRect();
  const gapPx = parseFloat(getComputedStyle(li).marginBottom) || 0;
  const h = rect(li).height + gapPx;                    // room left by the clicked line
  const t = rect($('#detail-title .line'));            // where the title lands
  const top = t.top, bottom = t.bottom;

  const below = items.slice(k + 1);
  const above = below.filter(el => rect(el).top < bottom);       // between gap and spot
  const after = below.slice(above.length);                       // under the spot

  const moved = [];
  if (above.length) {
    const last = rect(above[above.length - 1]);
    const s = Math.max(0, last.bottom + gapPx - top);           // how far up they must go
    above.forEach(el => { go(el, -s); moved.push(el); });
    const extra = s - h;                                         // more than the gap gives
    if (extra > 0) items.slice(0, k).filter(onScreen).forEach(el => { go(el, -extra); moved.push(el); });
  }
  if (after.length) {
    const d = bottom + gapPx - rect(after[0]).top;              // the line under the spot
    if (d > 0) after.filter(onScreen).forEach(el => { go(el, d); moved.push(el); });
  }
  state.shifted = moved;
}

/** Only when --list-dim is explicitly 0 does the list hide during the animation. */
function hideList(on) {
  const v = parseFloat(cssVar('--list-dim'));
  $('#project-list').style.visibility = on && v === 0 ? 'hidden' : '';
}

function lockScroll(on) {
  document.body.classList.toggle('project-open', on);
}

async function openProject(id) {
  const p = state.data.projects.find(x => x.id === id);
  if (!p) { state.openId = null; return; }
  popOff();
  state.openId = id;
  state.busy = true;
  renderFrame(p);

  const view = $('#view-projects'), layer = $('#project-layer'), frame = $('#frame');
  const clicked = state.clickedPlus;
  const plus = clicked && clicked.closest('li')?.dataset.id === id ? clicked : listPlus(id);
  state.returnPlus = plus;
  lockScroll(true);
  // the layer is laid out (to know where frame and title go) but shows nothing yet
  const title = $('#detail-title');
  frame.classList.add('is-closed');
  frame.classList.remove('is-shrunk');
  frame.hidden = title.hidden = false;
  title.style.visibility = 'hidden';
  layer.style.transition = 'none';
  layer.style.visibility = 'hidden';
  layer.hidden = false;
  const c = centreOf(frame);

  const li = plus && plus.offsetParent ? plus.closest('li') : null;
  if (li) {
    // 2 · the cross travels to the centre while its line travels down to the title
    const from = centreOf(plus.querySelector('svg'));
    plus.classList.add('is-away');
    state.line = lineCopy(li);
    li.classList.add('is-gone');                   // the line leaves its place
    const dy = titleDrop(li);
    view.classList.add('is-dim'); hideList(true);  // 1 · the list goes, the line stays
    moveLine(state.line, 0, false);
    moveLine(state.line, dy, true);
    shiftLines(li, false);                         // the others make room
    await travelCross(from, c);
  } else {
    view.classList.add('is-dim'); hideList(true);
    title.style.visibility = '';
  }
  if (state.openId !== id) { state.busy = false; return; }

  // 3 · same cross, now the frame's; window and corners open together
  windowTo(c, false, false);
  layer.style.visibility = '';
  $('#travel svg')?.remove();
  if (!(plus && plus.offsetParent)) {          // direct link: the cross grows in place
    frame.classList.add('is-shrunk');
    layer.getBoundingClientRect();
    frame.classList.remove('is-shrunk');
    await wait(T.line);
  }
  windowTo(c, true, true);
  frame.classList.remove('is-closed');
  await wait(T.move);

  view.classList.add('is-open');               // 4 · only the project remains
  title.style.visibility = '';                 // the line has become the title
  state.line?.remove(); state.line = null;
  state.busy = false;
}

async function closeProjectAnimated() {
  if (!state.openId || state.busy) return;
  state.busy = true;
  const id = state.openId;
  const view = $('#view-projects'), layer = $('#project-layer'), frame = $('#frame'), drops = $('#drops');
  const c = centreOf(frame);

  view.classList.remove('is-open');            // the (hidden) list is back under the window
  const plus = state.returnPlus || listPlus(id);
  const li = plus && plus.offsetParent ? plus.closest('li') : null;
  if (li) {                                    // the title becomes the travelling line again
    li.classList.add('is-gone');
    state.line = lineCopy(li);
    moveLine(state.line, titleDrop(li), false);
    $('#detail-title').style.visibility = 'hidden';
  }
  // 1 · window, corners, project and dropped images shrink to the centre
  windowTo(c, true, false);
  drops.style.clipPath = 'inset(0px 0px 0px 0px)';
  drops.getBoundingClientRect();
  windowTo(c, false, true);
  drops.style.clipPath = pointClip(c);
  frame.classList.add('is-closed');
  await wait(T.move);

  // 2 · the cross travels back to its line
  layer.style.visibility = 'hidden';
  drops.innerHTML = '';
  if (li) {                                    // cross and line return together
    moveLine(state.line, 0, true);
    shiftLines(li, true);
    await travelCross(c, centreOf(plus.querySelector('svg')));
  }
  closeProject();                              // 3 · the list returns to full black
  history.replaceState(null, '', '#/projects');
  state.busy = false;
}

/** Immediate close — used when navigating away. */
function closeProject() {
  if (!state.openId) return;
  state.openId = null;
  const frame = $('#frame'), drops = $('#drops');
  $('#view-projects').classList.remove('is-open', 'is-dim');
  frame.classList.add('is-closed', 'is-shrunk');
  frame.style.visibility = '';
  const layer = $('#project-layer');
  layer.style.clipPath = layer.style.visibility = layer.style.transition = '';
  windowTo({ x: 0, y: 0 }, false, false);
  frame.hidden = $('#detail-title').hidden = $('#project-layer').hidden = true;
  $('#travel').innerHTML = '';
  state.line = null;
  $('#detail-title').style.visibility = '';
  hideList(false);
  $$('#project-list li.is-gone').forEach(el => el.classList.remove('is-gone'));
  (state.shifted || []).forEach(el => { el.style.transition = 'none'; el.style.transform = ''; });
  state.shifted = [];
  $$('#project-list .plus.is-away').forEach(el => el.classList.remove('is-away'));
  drops.innerHTML = '';
  drops.style.clipPath = '';
  lockScroll(false);
}

function renderFrame(p, textOnly) {
  state.project = p;

  $('#detail-title').innerHTML =
    `<div class="line"><span class="entry">${PLUS_SVG.replace('plus is-growing', 'plus is-away')}` +
    `<span class="code">${p.date} ${p.ref}</span> ${escapeHTML(t(p, 'description'))}</span></div>`;
  $('#detail-content').textContent = t(p, 'content');

  /* names and links pair up by position: "OLAC Studio, squadra" +
     "https://olac.studio/, https://www.squadra.works" → two separate links */
  const linked = (names, links) => {
    const ls = list(links);
    return list(names).map((n, i) => ls[i]
      ? `<a href="${escapeHTML(ls[i])}" target="_blank" rel="noopener" data-clickable>${escapeHTML(n)}</a>`
      : escapeHTML(n)).join(', ');
  };
  // collaborations and office work are different: an office project is never
  // shown as a collaboration
  const collab = p.collaboration ? linked(p.collaboration, p.collab_link) : '';
  const office = !p.collaboration && p.working_for ? linked(p.working_for, p.collab_link) : '';

  $('#detail-meta').innerHTML = [
    [ui('meta_status'), escapeHTML(t(p, 'status'))],
    [ui('meta_collaboration'), collab],
    [ui('meta_working_for'), office],
    [ui('meta_place'), escapeHTML(t(p, 'place'))],
    [ui('meta_client'), escapeHTML(t(p, 'client'))],
    [ui('meta_credits'), escapeHTML(t(p, 'image_credits'))]       // always the last line
  ].filter(([, v]) => v)
   .map(([k, v]) => `<div><dt>${k}:</dt><dd>${v}</dd></div>`).join('');

  if (textOnly) return;                     // language switch: images stay as they are
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

  if (e.target.closest('#drops img, #drops video')) return;   // handled by drag
  if (!inside) { closeProjectAnimated(); return; }

  const p = state.project;
  if (!p) return;

  const drops = $('#drops');
  const n = Number(drops.dataset.next || 1);
  if (n >= p.images.length) return;           // every image shown once: stop

  const img = mediaEl(p.images[n]);
  img.style.left = e.clientX + 'px';
  img.style.top = e.clientY + 'px';
  img.style.transform = 'translate(-50%,-38%)';
  img.style.zIndex = ++state.zTop;
  drops.appendChild(img);
  drops.dataset.next = n + 1;
});

/* Pressing a dropped image brings it forward; moving while pressed drags it. */
(() => {
  let el = null, dx = 0, dy = 0;
  document.addEventListener('pointerdown', e => {
    const t = e.target.closest('#drops img, #drops video');
    if (!t) return;
    e.preventDefault();
    el = t;
    el.style.zIndex = ++state.zTop;
    dx = e.clientX - parseFloat(el.style.left);
    dy = e.clientY - parseFloat(el.style.top);
    el.setPointerCapture(e.pointerId);
  });
  document.addEventListener('pointermove', e => {
    if (!el) return;
    el.style.left = (e.clientX - dx) + 'px';
    el.style.top = (e.clientY - dy) + 'px';
  });
  const end = () => { el = null; };
  document.addEventListener('pointerup', end);
  document.addEventListener('pointercancel', end);
})();

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
/** Info texts, line by line:
      "instagram https://…"  → the word, linked
      "https://…" alone      → a short name (instagram.com → "instagram"), linked
      an e-mail address      → a mailto link
    Nothing else is touched. */
function linkify(text) {
  const label = url => {
    try {
      const host = new URL(url).hostname.replace(/^www\./, '');
      return host.split('.').slice(-2, -1)[0] || host;     // instagram.com → instagram
    } catch (e) { return url; }
  };
  const link = (href, txt) =>
    `<a href="${escapeHTML(href)}" target="_blank" rel="noopener" data-clickable>${escapeHTML(txt)}</a>`;
  return String(text).split('\n').map(line => {
    const m = line.match(/^(.*?)\s*(https?:\/\/\S+)\s*$/);
    if (m) return link(m[2], m[1].trim() || label(m[2]));
    return escapeHTML(line).replace(/([\w.+-]+@[\w-]+\.[\w.-]+)/g,
      '<a href="mailto:$1" data-clickable>$1</a>');
  }).join('\n');
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

  $('#accordion').innerHTML = sections.map(s => {
    const mail = s.k === 'write' && (s.body.match(/[\w.+-]+@[\w-]+\.[\w.-]+/) || [])[0];
    if (mail) return `
    <div class="acc-item" data-acc="write">
      <a class="acc-head" href="mailto:${mail}" data-clickable>
        ${PLUS_SVG}<span>${escapeHTML(s.title)}</span>
      </a>
    </div>`;
    return `
    <div class="acc-item" data-acc="${s.k}">
      <div class="acc-head" role="button" tabindex="0" data-clickable
           ${s.portrait ? `data-portrait="${s.portrait}"` : ''}>
        ${PLUS_SVG}<span>${escapeHTML(s.title)}</span>
      </div>
      <div class="acc-body"><div class="acc-body-inner">${linkify(s.body)}${s.extra || ''}</div></div>
    </div>`;
  }).join('');
}

$('#accordion').addEventListener('click', e => {
  const head = e.target.closest('.acc-head');
  if (head && head.tagName !== 'A') head.parentElement.classList.toggle('is-open');
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

/** The tags keep the navigation size when they fit between LAB and the
    bottom edge; on a short window they shrink just enough to stay below LAB. */
function fitRail() {
  const nav = $('#filters');
  if (!nav || nav.hidden) return;
  nav.style.fontSize = '';
  // room = from the first line of text (just under LAB) to the bottom edge
  const avail = innerHeight - parseFloat(getComputedStyle($('#view-projects')).paddingTop);
  const h = nav.getBoundingClientRect().height;
  if (h > avail) nav.style.fontSize = (parseFloat(getComputedStyle(nav).fontSize) * avail / h) + 'px';
}
addEventListener('resize', () => fitRail());

function syncFilters() {
  const nav = $('#filters');
  if (!nav) return;
  const on = state.view === 'projects';
  nav.hidden = !on;
  if (!on) return;

  nav.innerHTML = categories().map(c =>
    `<button type="button" class="filter" data-filter="${c.key}" data-clickable
       aria-pressed="${state.filter === c.key}">${escapeHTML(c.label)}</button>`)
    .join('');
  fitRail();
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
  if (route.view !== 'splash') stopRotation();
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
    else if (route.open && state.project) renderFrame(state.project, true);   // e.g. DE ⇄ EN
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
  requestAnimationFrame(refreshLab);      // LAB always flies to its next place
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
