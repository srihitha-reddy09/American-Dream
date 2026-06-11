# American Dream — Interactive Sales Deck

A purpose-built, browser-based interactive sales tool for **American Dream** — the $5 billion, 3.5 million sq ft entertainment and retail destination in East Rutherford, NJ (#2 largest mall in the United States).

Built as an interview submission for [Liat.ai](https://liat.ai) — replacing fragmented pitch decks (YouTube tab + PDF + spreadsheet) with a single cinematic, self-contained experience.

---

## Live Demo

> Deploy to Netlify by dragging the `dist/` folder to [app.netlify.com/drop](https://app.netlify.com/drop)

---

## The Brief

The assignment: build a fully interactive, browser-based sales deck for one of the world's largest malls — designed to replace the fragmented pitch process with a single cinematic, interactive experience.

**Primary audience:** Prospective retail tenants, brand sponsors, and event partners — decision-makers at brands, agencies, and production companies evaluating whether to invest in a presence at this property.

**Business goals every section serves:**
- Drive retail leasing deals (luxury, mid-tier, flagship, pop-up)
- Drive sponsorship and brand partnership deals
- Drive event bookings (concerts, activations, corporate events, product launches)
- Promote dedicated venue modules (The Rink, Dream Live PAC, Expo Halls)

---

## Tech Stack

| Layer | Choice | Rationale |
|---|---|---|
| Framework | React 19 + Vite 8 | Fast dev, optimised production bundles |
| Animation | Framer Motion 12 | Scroll-triggered reveals, parallax, gesture handling |
| Styling | Pure CSS (no framework) | Full design control, zero bloat |
| Fonts | Cormorant Garamond + Inter + Bebas Neue | Luxury editorial + clean data + cinematic impact |
| Images | Wikimedia Commons (CC-BY-SA 4.0) + Unsplash | Real property photos where available |
| Video | Official YouTube embed (ID: `nqL41g0k2Kw`) + Wikimedia photo fallback | Real property footage |
| Deploy | Netlify / Vercel / GitHub Pages (static `dist/`) | Zero config |

---

## Features

### Sections
| Section | Key Feature |
|---|---|
| **Hero** | Official American Dream YouTube video background (muted autoplay) · real Wikimedia interior photo fallback · vertical stat rail |
| **The Property** | Animated count-up stats · dual-column location + demographics · verified data citations |
| **Entertainment** | Auto-scrolling 5-attraction explorer · 4.5s interval · progress bar per tab · pause on hover · Ken Burns image transitions |
| **Retail** | Staggered card reveals · hover zoom + gold arrow · parallax luxury strip · scrolling brand marquee |
| **Dining** | Parallax hero image · floating stat badges · expand-on-hover concept cards · cinematic quote strip |
| **Events** | Auto-scrolling 5-event-type explorer · same autoscroll system as Entertainment · per-type video links |
| **Sponsorship** | 3-tier partnership cards (Platinum/Gold/Silver) · hover lift + glow · CTA strip |
| **Leasing** | 4-path explorer (Luxury/Retail/F&B/Pop-Up) · animated tab switch · 5-step process diagram |
| **Contact** | Inline form validation (no browser popups) · real functional action tiles · property details |

### UX
- Scroll-triggered `fade-up` animations via IntersectionObserver (no scroll listener)
- Sticky nav that becomes opaque + blurred at scroll position > 60px
- Side dot navigation for section jumping
- Scroll progress bar
- `noValidate` form with inline red/green feedback
- Video modal with `← Back` button, ESC key, and backdrop click to close

---

## Data Sources

All metrics are sourced from publicly available reporting (2024–2026):

| Metric | Source |
|---|---|
| $5B development cost | [Commercial Observer, Nov 2024](https://commercialobserver.com/2024/11/american-dream-mall-retail-recovery-debt) |
| 3.5M sq ft | [northjersey.com, Jun 2026](https://www.northjersey.com/story/news/business/2026/06/04) |
| 32M+ annual visitors | [zipdo.co American Dream Statistics, 2026](https://zipdo.co/american-dream-statistics) |
| 450+ stores & dining | [Meadowlands Media, 2026](https://meadowlandsmedia.com/american-dream-earns-nomination-for-usa-todays-10best-best-mall-award) |
| 70% entertainment split | [Statista, May 2022 reported](https://www.statista.com/statistics/260259/largest-shopping-malls-united-states-gross-leasable-area) |
| 22K parking spaces | [worldmetrics.org, 2025](https://worldmetrics.org/american-dream-statistics) |
| FIFA 2026 designation | [northjersey.com, Jun 2026](https://www.northjersey.com/story/news/business/2026/06/08/american-dream-mall-soccer-themed-events-2026-world-cup) |
| $92K median HHI catchment | [malls.com catchment profile](https://www.malls.com/malls/american_dream) |

---

## Image Attribution

| Image | Source | License |
|---|---|---|
| American Dream interior (Grand Concourse) | [Wikimedia Commons — Rhododendrites](https://commons.wikimedia.org/wiki/File:American_Dream_Meadowlands_shopping_mall_from_first_floor.jpeg) | CC-BY-SA 4.0 |
| Supplementary stock (luxury, dining, events) | [Unsplash](https://unsplash.com) | Unsplash License (free commercial use) |

> **Note on visuals:** The official American Dream press kit is not publicly downloadable. The Wikimedia Commons photo is used for the hero, Saks card, and luxury strip. All other images are contextually relevant Unsplash photos (luxury retail, indoor water park, ice rink, etc.) used as representative stand-ins. A production version would use licensed press kit assets from americandream.com/press.

---

## Setup & Run

```bash
# Install
npm install

# Dev server
npm run dev
# → http://localhost:5173

# Production build
npm run build

# Preview production
npm run preview
```

---

## Deploy

### Netlify (fastest — 30 seconds)
1. Run `npm run build`
2. Drag `dist/` folder to [app.netlify.com/drop](https://app.netlify.com/drop)
3. Live URL instantly

### Vercel
```bash
npm i -g vercel
vercel --prod
```

### GitHub Pages
`vite.config.js` already has `base: './'` for relative paths. Use `gh-pages` package or GitHub Actions.

---

## What I Would Improve With More Time

1. **Licensed press kit assets** — americandream.com/press has high-res photography. With permission/licensing those would replace all stock images
2. **Self-hosted video** — Compress and host a `.webm` clip for true background video control (no YouTube iframe constraints)
3. **GSAP ScrollTrigger** — Parallax depth and pin-scroll effects for section transitions
4. **Interactive floor plan** — SVG map of the property with clickable zones
5. **Analytics** — Track section engagement with Vercel Analytics or Plausible
6. **Accessibility audit** — Full ARIA pass, keyboard navigation testing, WCAG 2.1 AA contrast verification
7. **Mobile-first swipe deck** — Full gesture-based navigation on mobile

---

## AI Tools Used

- **Kiro (AI IDE)** — Full project build, all component code, architecture decisions
- **Research** — Commercial Observer, northjersey.com, Meadowlands Media, zipdo.co, Wikimedia Commons

---

*Built June 2026 · Interview submission for Liat.ai*
*Mall subject: American Dream, East Rutherford NJ — Triple Five Group*
