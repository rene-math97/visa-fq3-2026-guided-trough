/* ═══════════════════════════════════════════════
   VISA FQ3 2026 PREVIEW — APP JS

   MODEL PHILOSOPHY
   ----------------
   Visa converts roughly half of net revenue to free
   cash flow and has beaten consensus EPS in eight
   consecutive quarters. A five-year DCF on a business
   this stable produces a number driven almost entirely
   by the terminal multiple you pick — which is a
   multiple assumption wearing a DCF costume.

   So the multiple is the assumption, stated openly:

       Implied price = FY2027 adjusted EPS  ×  Forward P/E

   Both variables are sliders. The anchor worth knowing
   is Visa's own 5-year MEDIAN forward P/E of 25.82×.
════════════════════════════════════════════════ */

'use strict';

// ── THEME TOGGLE ────────────────────────────────
(function () {
  const toggle = document.querySelector('[data-theme-toggle]');
  const root   = document.documentElement;
  let theme = root.getAttribute('data-theme') || 'dark';

  function applyTheme(t) {
    theme = t;
    root.setAttribute('data-theme', t);
    if (toggle) {
      toggle.setAttribute('aria-label', `Switch to ${t === 'dark' ? 'light' : 'dark'} mode`);
      toggle.innerHTML = t === 'dark'
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
    }
  }

  applyTheme(theme);
  toggle && toggle.addEventListener('click', () => applyTheme(theme === 'dark' ? 'light' : 'dark'));
})();

// ── NAV SCROLL SHADOW ───────────────────────────
(function () {
  const nav = document.getElementById('nav');
  if (!nav) return;
  const obs = new IntersectionObserver(
    ([e]) => nav.classList.toggle('nav--scrolled', !e.isIntersecting),
    { threshold: 0, rootMargin: '-64px 0px 0px 0px' }
  );
  const sentinel = document.getElementById('hero');
  if (sentinel) obs.observe(sentinel);
})();

/* ── ANCHOR FACTS ───────────────────────────────
   Sourced figures; each is cited in the page body.
──────────────────────────────────────────────── */
const CUR_PRICE    = 362.53;  // Close 2026-07-27 (StockAnalysis)
const FY26_ST_EPS  = 13.15;   // Street FY2026 adj. EPS consensus (StockAnalysis, 2026-07-27)
const FY27_ST_EPS  = 14.87;   // Street FY2027 adj. EPS consensus (StockAnalysis, 2026-07-27)
const MEDIAN_5Y_PE = 25.82;   // Visa 5-year MEDIAN forward P/E (Zacks, 2026-07-23)
const CONSENSUS_PT = 403.26;  // StockAnalysis avg PT (2026-07-27). Others: $397.62 / $399.41 / $401
const FY_HIGH      = 365.14;  // 52-week high

const CUR_FWD_PE = CUR_PRICE / FY27_ST_EPS;   // = 24.4x on FY2027

const SCENARIOS = {
  raise: {
    label: 'Beat & Raise Again',
    desc: 'Adjusted EPS above roughly $3.30, net revenue above $11.5B, and cross-border volume ex intra-Europe finally breaking above the +11% constant-dollar plateau it has printed for four straight quarters. Management already raised the FY2026 framework once at FQ2; doing it again from the quarter they pre-labelled the weakest would be a genuine surprise and would carry the multiple back toward its historical median.',
    fy27eps: 15.30,
    pe: 27.0,
    panelClass: 'scenario-bull',
  },
  inline: {
    label: 'Beat, Guide Held',
    desc: 'The base case, and the one the guidance framework points to. Visa beats — it has done so eight quarters running — but the beat is small because management set FQ3 up as the low point of the year on tougher incentive comps and lapping lower volatility. FY2026 guidance is narrowed rather than raised. The stock enters this print within 1% of its 52-week high, which is the same setup that produced a negative reaction to a 7.1% beat in April.',
    fy27eps: 14.87,
    pe: 25.0,
    panelClass: 'scenario-base',
  },
  crack: {
    label: 'Cross-Border Cracks',
    desc: 'Cross-border volume ex intra-Europe prints at or below +10% constant-dollar, breaking a four-quarter floor, or client incentives accelerate well past mid-teens growth and compress net revenue. Either would call into question the low-teens FY2026 EPS framework. This is the scenario where a 0.75-beta compounder trading at 31.6× trailing earnings gets repriced toward the payments-industry average rather than its own premium.',
    fy27eps: 14.20,
    pe: 22.0,
    panelClass: 'scenario-bear',
  },
};

// ── FORMAT HELPERS ──────────────────────────────
const fmt = {
  price:  (v) => `$${v.toFixed(2)}`,
  eps:    (v) => `$${v.toFixed(2)}`,
  mult:   (v) => `${v.toFixed(1)}×`,
  updown: (v) => `${v >= 0 ? '+' : ''}${v.toFixed(1)}%`,
};

// ── ANIMATED NUMBER ─────────────────────────────
function animateValue(el, from, to, formatter, duration = 350) {
  if (!el) return;
  const start = performance.now();
  function step(ts) {
    const progress = Math.min((ts - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = formatter(from + (to - from) * ease);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = formatter(to);
  }
  requestAnimationFrame(step);
}

// ── STATE ───────────────────────────────────────
let state = { fy27eps: SCENARIOS.inline.fy27eps, pe: SCENARIOS.inline.pe };
let prevPrice = SCENARIOS.inline.fy27eps * SCENARIOS.inline.pe;

function render() {
  const { fy27eps, pe } = state;
  const implied = fy27eps * pe;
  const upside  = (implied / CUR_PRICE - 1) * 100;

  const setTxt = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  setTxt('sc-eps-readout', fmt.eps(fy27eps));
  setTxt('sc-pe-readout',  fmt.mult(pe));
  setTxt('formula-eps',    fmt.eps(fy27eps));
  setTxt('formula-pe',     fmt.mult(pe));

  animateValue(document.getElementById('sc-implied'), prevPrice, implied, fmt.price);
  setTxt('sc-upside', `${fmt.updown(upside)} vs. $${CUR_PRICE.toFixed(2)}`);

  const upEl = document.getElementById('sc-upside');
  if (upEl) {
    upEl.classList.toggle('positive', upside >= 0);
    upEl.classList.toggle('negative', upside < 0);
  }

  // Distance from the 5-year median multiple — the honest sanity check
  setTxt('sc-vs-median', `${fmt.updown((pe / MEDIAN_5Y_PE - 1) * 100)} vs. 25.8× median`);
  setTxt('sc-vs-consensus', `${fmt.updown((implied / CONSENSUS_PT - 1) * 100)} vs. street PT $${CONSENSUS_PT.toFixed(0)}`);

  // Price bar — scale $280 to $460
  const MIN = 280, MAX = 460;
  const pct = (v) => `${Math.max(0, Math.min(100, ((v - MIN) / (MAX - MIN)) * 100)).toFixed(1)}%`;

  const barFill = document.getElementById('price-bar-fill');
  const barCur  = document.getElementById('price-bar-current');
  const barImp  = document.getElementById('price-bar-target');
  const barCons = document.getElementById('price-bar-intrinsic');

  if (barFill) barFill.style.width = pct(implied);
  if (barCur)  barCur.style.left   = pct(CUR_PRICE);
  if (barImp) {
    barImp.style.left = pct(implied);
    const span = barImp.querySelector('.price-bar-tag');
    if (span) span.innerHTML = `${fmt.price(implied)}<br/>Scenario`;
  }
  if (barCons) {
    barCons.style.left = pct(CONSENSUS_PT);
    const span = barCons.querySelector('.price-bar-tag');
    if (span) span.innerHTML = `$${CONSENSUS_PT.toFixed(0)}<br/>Street PT`;
  }

  prevPrice = implied;
}

function applyScenario(key) {
  const sc = SCENARIOS[key];
  if (!sc) return;

  state = { fy27eps: sc.fy27eps, pe: sc.pe };

  const panel = document.getElementById('scenario-panel');
  if (panel) panel.className = `scenario-panel ${sc.panelClass}`;

  const nameEl = document.getElementById('sc-name');
  const descEl = document.getElementById('sc-desc');
  if (nameEl) nameEl.textContent = sc.label;
  if (descEl) descEl.textContent = sc.desc;

  const epsSlider = document.getElementById('slider-eps');
  const peSlider  = document.getElementById('slider-pe');
  if (epsSlider) epsSlider.value = String(Math.round(sc.fy27eps * 100));
  if (peSlider)  peSlider.value  = String(Math.round(sc.pe * 10));

  render();
}

// ── WIRING ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const btns = document.querySelectorAll('.scenario-btn');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      applyScenario(btn.dataset.scenario);
    });
  });

  const epsSlider = document.getElementById('slider-eps');
  const peSlider  = document.getElementById('slider-pe');

  function markCustom() {
    const nameEl = document.getElementById('sc-name');
    const descEl = document.getElementById('sc-desc');
    if (nameEl) nameEl.textContent = 'Your Assumptions';
    if (descEl) descEl.textContent = 'You have moved the model off the preset. The output is your FY2027 adjusted EPS estimate multiplied by your chosen forward P/E. Visa’s own 5-year median forward multiple is 25.8×, shown as a reference line in the readout beside the price.';
    const panel = document.getElementById('scenario-panel');
    if (panel) panel.className = 'scenario-panel';
    document.querySelectorAll('.scenario-btn').forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
  }

  if (epsSlider) {
    epsSlider.addEventListener('input', () => {
      state.fy27eps = Number(epsSlider.value) / 100;
      markCustom();
      render();
    });
  }
  if (peSlider) {
    peSlider.addEventListener('input', () => {
      state.pe = Number(peSlider.value) / 10;
      markCustom();
      render();
    });
  }

  applyScenario('inline');

  // ── CROSS-BORDER PLATEAU BARS ─────────────────
  // The four-quarter +11% floor, drawn from data-value attributes.
  document.querySelectorAll('.xb-bar').forEach(bar => {
    const v = parseFloat(bar.dataset.value);
    if (Number.isNaN(v)) return;
    const MAXV = 18;
    bar.style.width = `${Math.min(v / MAXV, 1) * 100}%`;
  });

  // ── ENTRANCE ANIMATIONS ───────────────────────
  const animateItems = document.querySelectorAll(
    '.kpi-card, .exec-bullet, .risk-card, .timeline-item, .versus-card, .event-item, .fed-card'
  );

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'fadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) both';
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    animateItems.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.animationDelay = `${(i % 6) * 60}ms`;
      io.observe(el);
    });
  }

  // ── ACTIVE NAV LINK ───────────────────────────
  const sections = ['hero','setup','trough','crossborder','disruption','fed','scenarios','comps','watch','risks','sources'];
  const navLinks = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(a => {
          const href = a.getAttribute('href');
          a.style.color = href === `#${id}` ? 'var(--color-text)' : '';
        });
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) sectionObserver.observe(el);
  });
});
