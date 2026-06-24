# Alphonso Marketing Site Redesign — Design Spec

> **Approach:** Cinematic Dark Luxury (Approach A)
> **Mission:** Take the marketing site from 4/10 to 10/10
> **Status:** Approved design spec

---

## 1. Overview

Complete redesign of the AlphonsoEcosystemMarketing static site. Single-file architecture preserved. No build step, no npm.

### Guardrails
- Do NOT touch agents/index.html unless asked
- Do NOT change agent family backstory or personalities
- Do NOT remove dark green (#060A07) as base background
- Do NOT add npm dependencies
- All fonts via Google Fonts CDN only
- All animations via CSS or vanilla JS
- Images reference assets/ folder — do not move/rename
- Keep the hex M logo SVG in the nav
- Mobile test at 390px before every commit
- Commit format: feat:, fix:, design:, perf:
- Push after every major section change

---

## 2. Color and Typography System

### Brand Colors (Preserved and Extended)
--bg: #060A07, --bg2: #0C110D, --bg3: #0F160F
--lime: #9EF01A (PRIMARY ACCENT), --lhi: #B5FF35 (hover)
--cream: #EDEEE6 (text), --mut: #56625A (muted), --dim: #232E24 (borders)

ADDED elevation tokens: --surface-0/1/2/3 (opacity-based layering)
ADDED glass tokens: --glass-bg, --glass-border
ADDED glow token: --glow-lime (multi-layer box-shadow)

### Typography Scale (Fluid via clamp)
--text-xs: clamp(0.625rem, 0.5vw + 0.5rem, 0.75rem)
--text-sm: clamp(0.75rem, 0.6vw + 0.5rem, 0.875rem)
--text-base: clamp(0.875rem, 0.8vw + 0.5rem, 1rem)
--text-lg: clamp(1rem, 1.2vw + 0.5rem, 1.333rem)
--text-xl: clamp(1.25rem, 2vw + 0.5rem, 1.777rem)
--text-2xl: clamp(1.5rem, 3vw + 0.5rem, 2.369rem)
--text-3xl: clamp(2rem, 4vw + 0.5rem, 3.157rem)
--text-4xl: clamp(2.5rem, 5vw + 1rem, 4.209rem)

### Line Heights: Body 1.6, Headings 1.05, Labels 1.3, Display 0.95

---

## 3. Layout Grid

Desktop (>1024px): Outer padding 48px, max content 1200px, section gap 88px
Tablet (768-1024px): Outer padding 32px, 2-column agent cards, stacked hero
Mobile (390px): Outer padding 20px, 2-column cards, single column, sticky bottom CTA


---

## 4. Component Design

### 4.1 Navigation
Desktop: Fixed top, glass bg (blur 24px), logo left, nav links center, GitHub badge + Download right. On scroll >50px: stronger glass + border.

Mobile: Hamburger right. Slide-out drawer: glass bg, nav links, agent strip, download CTA. Close on link click.

### 4.2 Hero Section
Two-column layout. Left: label, headline, subheadline, agent cycler, dual CTA. Right: crew image parallax. BG: animated dot grid. Stat strip below.

Mobile: Stacked, no parallax, smaller headline, full-width buttons.

### 4.3 Agent Showcase
3-col card grid (2-col mobile). Glass bg, color top bar, portrait, name, role, abilities. Hover: lift + glow. Also in the team: horizontal scroll strip with animated SVGs.

### 4.4 Pipeline Section
6-step horizontal flow with animated connectors. Staggered reveal. Mobile: CSS scroll-snap.

### 4.5 Use Cases
Alternating rows. Icon, who, what, agent color tags, image with glow.

### 4.6 Pricing
3 glass cards (Free/Pro/Enterprise). Feature comparison table. Popular badge on Pro.

### 4.7 Docs
Card grid (3/2/1 cols). Icon, title, description, Read right-arrow.

### 4.8 Mission / CTA
Full-width sunset bg with overlay. Magnetic download button. GitHub stars. System requirements. Mobile: sticky bottom bar.

---

## 5. Animation System

1. Scroll-reveal: fade-up/fade-left/fade-right classes with IntersectionObserver
2. Staggered grids: transitionDelay = i * 0.06s on cards
3. Parallax: hero image translateY(y * 0.15) on scroll
4. Agent cycler: verb text swaps every 1.9s with fade
5. Counters: requestAnimationFrame lerp for stats
6. Magnetic button: mouse offset x*0.15, y*0.15 on download CTA
7. Glass nav: backdrop-filter blur(24px) on scroll
8. Dot grid: CSS pulse on SVG circles
9. Reduced motion: prefers-reduced-motion turns off all animations

---

## 6. Mobile Design (390px)


---

## 7. SEO and Meta

Complete head: OG tags, Twitter Card, canonical URL, JSON-LD structured data (SoftwareApplication). Generate OG image (1200x630) for assets/og-image.png.

---

## 8. GitHub Live Stats

Fetch from GitHub API: stars, forks, latest release. Display in hero stat strip and CTA section. Silent fail on error.

---

## 9. Assets to Create

- assets/og-image.png - OG social preview (1200x630)

SVG animation upgrades (CSS only, no file changes):
- Echo: concentric pulse rings (memory ripple)
- Nova: rotating star polygon (intelligence spark)
- Sentinel: scanning shield glow (security scan)

---

## 10. Implementation Order

1. CSS Architecture - Design tokens, variables, fluid typography
2. Navigation - Glass nav, hamburger, slide-out drawer
3. Hero Section - Parallax, dual CTA, agent cycler, dot grid, stat strip
4. Animation System - Reveal observers, staggers, counter, magnetic button
5. Agent Showcase - Redesigned cards, hover states, SVG animations
6. Pipeline Section - Horizontal 6-step flow with animated connectors
7. Use Cases Section - Alternating rows with agent color treatment
8. Pricing Section - Glass cards, feature comparison, Popular badge
9. Docs Section - Card grid with icons
10. Mission / CTA Section - Sunset bg, magnetic button, GitHub stats, system reqs
11. Mobile - Responsive breakpoints, hamburger, sticky bar, touch optimization
12. SEO - OG tags, JSON-LD, canonical, meta descriptions
13. Performance - Lazy loading, font preloading, reduced motion
14. Final Polish - Cross-browser test, mobile test at 390px, commit and push

---

## 11. Scoring Targets

| Dimension | Current | Target |
|-----------|---------|--------|
| Visual design and polish | 3 | 9 |
| Hero section impact | 4 | 9 |
| Animation and interactivity | 2 | 9 |
| Agent showcase | 5 | 9 |
| Mobile experience | 2 | 9 |
| Performance and SEO | 1 | 8 |
| Copy and messaging | 6 | 9 |
| Download conversion | 3 | 9 |
| Overall impression | 4 | 10 |

---

Design spec v1.0 - June 24, 2026
Built for AlphonsoEcosystem by Obsidian Media


