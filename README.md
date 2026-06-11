# American Dream — Interactive Sales Deck

A fully interactive, browser-based sales deck for **American Dream** — the second-largest mall in the United States and the world's most extraordinary mixed-use entertainment destination.

Built as a submission for the Liat.ai interview project.

---

## Live Demo

[Deploy to Netlify / Vercel — link here after deployment]

---

## Overview

This is a purpose-built interactive sales tool designed to replace the fragmented pitch process (YouTube tab + PDF + spreadsheet) with a single, cinematic, self-contained experience. It's built for:

- **Prospective retail tenants** — luxury flagships, mid-tier brands, F&B operators, pop-up activations
- **Brand sponsors** — corporations seeking immersive audience activation at scale
- **Event partners** — producers, promoters, and corporate event planners

---

## Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | React 19 + Vite 8 | Fast, modular, deploment-ready |
| Animation | Framer Motion | Cinematic scroll + enter animations |
| Styling | Pure CSS (no Tailwind) | Full control, zero bloat, luxury feel |
| Icons | Lucide React | Clean, minimal iconography |
| Fonts | Cormorant Garamond + Inter + Bebas Neue | Luxury editorial + clean data display |
| Images | Unsplash CDN | High-quality, zero-cost real assets |
| Video | YouTube embed (autoplay/muted) | Cinematic hero with zero hosting cost |
| Deploy | Netlify / Vercel / GitHub Pages | One-click static deployment |

---

## Features

### Phase 1 — Core Interactive Overview
- **Hero** — Full-screen YouTube video background, animated stats bar, dual CTA
- **Why Here** — Animated counters, location data, demographics
- **Retail** — Tenant grid, luxury wing callout, leasing stats
- **Entertainment** — Interactive 6-attraction explorer with animated panel switcher
- **Dining** — Category cards, F&B narrative, full-width cinematic callout
- **Events** — Tab-based event type explorer, past highlights grid
- **Contact** — Inquiry type selector, form, quick action CTAs, footer

### Phase 2 — Expandable Modules (All Built)
- **Sponsorship Module** — 3-tier partnership structure, activation zone cards
- **Leasing Paths** — 4 segmented leasing journeys (Luxury / Retail / F&B / Pop-Up)

### UX & Technical
- Non-linear navigation via fixed side dot nav + persistent top nav
- Scroll progress bar
- Active section tracking
- Animated number counters on scroll entry
- All Framer Motion animations trigger once on viewport entry
- Responsive: desktop + tablet (mobile-friendly)
- Lazy loaded images throughout
- `manualChunks` code splitting for vendor + framer-motion bundles

---

## Setup & Run

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Deployment

### Netlify (Recommended)
1. Push to GitHub
2. Connect repo in Netlify dashboard
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Done — live URL in ~60 seconds

### Vercel
```bash
npm i -g vercel
vercel --prod
```

### GitHub Pages
Set `base: './'` in `vite.config.js` (already done), then use the `gh-pages` npm package or GitHub Actions.

---

## Design Decisions

**Mall choice — American Dream (East Rutherford, NJ)**
Selected for its unique combination of six world-class entertainment anchors (theme park, water park, ski slope, ice rink, observation wheel) alongside luxury retail and 32M annual visitors. The 2026 FIFA World Cup partnership makes it especially timely and compelling.

**Visual language — Dark luxury**
Inspired by Apple.com's restraint, Tesla's confidence, and luxury fashion editorials. Black base (#050505), gold accents (#C9A84C), Cormorant Garamond for headlines (elegant, editorial), Inter for data (clean, readable), Bebas Neue for impact numbers (bold, cinematic).

**Navigation — Non-linear by design**
The fixed side dot nav + persistent top nav allow any user — whether on a live sales call or exploring solo — to jump immediately to the section most relevant to them. No forced slide order.

**Video-first hero**
YouTube embed with autoplay/muted delivers the cinematic opening without requiring self-hosted video. Falls back gracefully if blocked.

**Component architecture**
Each section is a self-contained component with its own data. Adding new sections or deeper sub-modules requires zero restructuring — just add a component and a nav entry.

---

## AI Tools Used

- **Kiro (AI IDE)** — Full project scaffolding, all component code, CSS architecture
- **Unsplash** — Real photography assets (no AI generation needed for imagery)
- Research sourced from: Wikipedia, Commercial Observer, NJ Spotlight News, meadowlandsmedia.com, northjersey.com

---

## What I'd Improve With More Time

1. **Self-hosted video** — Replace YouTube embed with optimized `.webm` background video for true cinematic control
2. **GSAP ScrollTrigger** — Parallax depth effects on section transitions
3. **3D floor plan** — Interactive SVG floor plan of the property with clickable zones
4. **Real asset integration** — Official American Dream press kit photography
5. **Analytics layer** — Track which sections get most engagement (Vercel Analytics or Plausible)
6. **Accessibility pass** — Full ARIA audit, keyboard nav testing, contrast ratio verification
7. **Mobile optimization** — Full swipe-gesture deck navigation on mobile

---

*Built by [Your Name] · June 2026 · Interview submission for Liat.ai*
