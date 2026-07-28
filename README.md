# The Guided Trough — Visa (V) FQ3 2026 Earnings Preview

An interactive earnings preview published the **morning of July 28, 2026**, ahead of Visa's fiscal Q3 report **after the close that same day** (call 5:00pm ET).

**Live site:** https://rene-math97.github.io/visa-fq3-2026-guided-trough/

**No rating. No price target.** A map of what decides the print, not a pitch.

---

## The setup in one line

Visa's own CFO called fiscal Q3 **"the lowest growth quarter of the year"** on the April call. The company has beaten consensus adjusted EPS in **eight consecutive quarters**, beat by 7.1% in April — its widest margin of the run — and the stock traded *down* anyway. It enters tonight's print **0.7% below its 52-week high**.

## The number that decides it

Cross-border volume excluding intra-Europe, constant-dollar, is Visa's highest-yielding revenue driver. It has printed:

| FQ1 25 | FQ2 25 | FQ3 25 | FQ4 25 | FQ1 26 | FQ2 26 |
|---|---|---|---|---|---|
| +16% | +13% | **+11%** | **+11%** | **+11%** | **+11%** |

**Four consecutive quarters at exactly the same number.** That is a plateau, not noise. No sell-side consensus for this metric could be sourced, which is itself notable given how much of the equity story rests on it.

## Why the guide, not the beat, is the bar

```
FQ3 2025 adj. EPS × (1 + guided growth) = implied FQ3 2026 range
$2.98 × (1 + 5% to 9%)                  = $3.13 to $3.25
```

Street consensus of **$3.23** already sits in the upper half of management's own guidance band. The eight-quarter beat streak is real, but the bar is no longer conservative.

## What's in the site

| Section | What it does |
|---|---|
| **The Setup** | Four sourced facts, including why the multiple is *below* Visa's own 5-year median |
| **The Guided Trough** | Eight-quarter beat table plus the arithmetic of the guidance range |
| **Cross-Border** | The four-quarter plateau, with World Cup tailwind against CEMEA drag |
| **Disruption** | Stablecoins, the GENIUS Act, agentic commerce, CCCA, the $38B settlement, DOJ |
| **Macro Overlay** | FOMC lands the next afternoon; transmission runs through the consumer |
| **Scenario Engine** | Two-variable model with live sliders, anchored to the 25.82× 5-year median |
| **Valuation** | Payments complex comps, with one metric deliberately marked not meaningful |
| **What to Watch** | Nine line items with bull and bear thresholds |

## The model

```
Implied price = FY2027 adjusted EPS × Forward P/E
```

A five-year DCF on a business this stable produces a number driven almost entirely by the terminal multiple, which is a multiple assumption wearing a DCF costume. So the multiple is stated openly and both inputs are sliders. Presets: Beat & Raise Again ($15.30, 27.0×), Beat & Guide Held ($14.87 street consensus, 25.0×), Cross-Border Cracks ($14.20, 22.0×). Only the $14.87 and the $362.53 price are sourced; everything else is labelled assumption.

## Sourcing standard

Every number carries a source. Visa's own quarterly earnings releases and IR newsroom first, market data and consensus second, commentary last and flagged as such. My own arithmetic is tagged **computed** inline. Where sources conflict, **both values are shown**.

### Things deliberately left out

- **No credit-card delinquency statistic.** The figures circulating for 2026 come from low-quality aggregators and contradict each other outright — one says 2.9%, another 13.12%, measuring different things. The authoritative NY Fed series could not be retrieved, so no number is published.
- **Amex EV/EBITDA is shown as not meaningful.** The published 366× is an artifact of applying an enterprise-value metric to a lender. Reproducing it would be worse than omitting it.
- **No year-to-date performance comparison.** The figures in circulation are as of July 23 and predate a 1.91% up-day on July 27.

### Disclosed conflicts

Revenue consensus is published as $11.35B, $11.383B and $11.39B. Consensus price targets run $397.62 to $403.26 across four vendors with analyst counts of 27, 41, 43 and 61. The rating label itself differs: "Strong Buy" on one tracker, "Buy" on another. Forward P/E is 26.02× on one source and 24.34× on another — a vintage difference, not an error.

---

## Stack

Static HTML, CSS and vanilla JavaScript. No build step, no dependencies, no external data calls. Dark and light themes.

```
├── index.html          # redirect to web-app/
├── web-app/
│   ├── index.html      # the preview
│   ├── style.css       # design system + earnings-preview modules
│   └── app.js          # scenario engine, sliders, plateau bars
└── README.md
```

## Disclaimer

Independent research written for a public portfolio. **Not investment advice**, not a recommendation to buy or sell any security, and it carries no rating or price target. Forward-looking statements are estimates and will be wrong in some measure. Do your own work.
