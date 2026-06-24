# SKILL.md — AlphonsoEcosystem Marketing Site
**For:** Manus
**Task:** Take the marketing site from 4/10 to 10/10
**Repo:** `https://github.com/Thatisshayan/AlphonsoEcosystemMarketing`
**Local path:** `D:\AgentDevWork\repos\AlphonsoEcosystemMarketing\`

---

## SKILLS TO LOAD — IN ORDER

Load and apply these skills before writing any code. Each one changes how you approach the work.

### 1. `ui-ux-pro-max` ← PRIMARY
The main design intelligence skill. 50+ design styles, 161 color palettes, 57 font pairings, 99 UX guidelines. Use this to:
- Choose the right visual treatment for each section
- Define spacing, shadow, and depth systems
- Pick animation patterns that match the brand
- Review every component for UX quality before committing

Apply on: every section redesign, every component build, every layout decision.

### 2. `frontend-design`
Visual design patterns for web. Guides aesthetic direction, typography hierarchy, and avoiding templated defaults. Use this to:
- Ensure the dark green palette has real depth and not just flat blocks
- Build a typographic scale that feels premium
- Apply shadow/glow/glass systems consistently

Apply on: CSS architecture, design tokens, visual hierarchy decisions.

### 3. `animated-website`
Turn the site into a luxury scroll-animated experience. Use this to:
- Design parallax effects for the hero and crew image
- Build scroll-triggered section reveals that feel cinematic
- Add staggered animations to agent cards and workflow grid
- Create smooth page transitions

Apply on: hero section, agent showcase, workflow section, CTA section.

### 4. `visual-page-builder`
Build beautiful self-contained HTML sections that explain concepts visually. Use this to:
- Redesign the connectors section as a visual map rather than a list
- Build the comparison section (Alphonso vs cloud AI)
- Create the live stats section

Apply on: any section that currently shows data as text/list.

### 5. `canvas-design`
Create original visual design in PNG/SVG. Use this to:
- Generate the OG social preview image (1200×630)
- Create placeholder art for Echo, Nova, Sentinel if portraits aren't available
- Build decorative background elements that are brand-consistent

Apply on: SEO/OG image generation, decorative asset creation.

### 6. `theme-factory`
Apply and enforce design token consistency. Use this to:
- Lock the colour system into CSS custom properties
- Ensure every section uses the same shadow, border, and radius tokens
- Build a typography scale that doesn't drift across sections

Apply on: CSS architecture setup, design token audit.

### 7. `web-artifacts-builder`
Build complex multi-component interactive UI. Use this to:
- Create the interactive agent explorer (click an agent → page transforms)
- Build the live GitHub stats component
- Create the mobile navigation system

Apply on: interactive components, state-managed UI elements.

---

## BRAND DESIGN SYSTEM

### Colours — DO NOT CHANGE THESE
```css
--bg:    #060A07   /* page background — near-black green */
--bg2:   #0C110D   /* section alternate — slightly lighter */
--bg3:   #0F160F   /* card/panel background */
--lime:  #9EF01A   /* PRIMARY ACCENT — lime green */
--lhi:   #B5FF35   /* lime hover state */
--cream: #EDEEE6   /* primary text */
--mut:   #56625A   /* muted text */
--dim:   #232E24   /* very dim text / borders */
```

### Typography — Current Stack (keep or upgrade)
```
Syne       — headings, labels, nav, buttons (Google Fonts)
Inter      — body copy (Google Fonts)
JetBrains Mono — code, terminal, stats (Google Fonts)
```

If upgrading typography, stay within Google Fonts. Syne is core to the brand identity — don't remove it.

### Spacing System
```
Outer padding (desktop):  52px sides
Section gap:              88px bottom
Card gap:                 8-14px
Border radius:            7-14px (cards), 100px (pills)
```

### Visual Effects Palette
```css
/* Glow — for accent elements */
box-shadow: 0 0 22px rgba(158,240,26,.3);

/* Card hover lift */
transform: translateY(-5px);
box-shadow: 0 10px 36px rgba(R,G,B,.14);

/* Glass panel */
background: rgba(255,255,255,.04);
border: 1px solid rgba(255,255,255,.07);
backdrop-filter: blur(20px);

/* Dot grid background */
background-image: radial-gradient(rgba(158,240,26,.05) 1px, transparent 1px);
background-size: 28px 28px;

/* Scan line animation */
animation: scan 14s linear infinite;
```

---

## AGENT COLOUR SYSTEM — EXACT VALUES

Each agent has a primary colour and an RGB triplet for rgba() usage. These are brand-locked.

| Agent | Hex | RGB | Family Role |
|-------|-----|-----|-------------|
| Jose | `#F5B535` | `245,181,53` | The Dad — Orchestrator |
| Alphonso | `#00C8E0` | `0,200,224` | The Son — Execution |
| Miya | `#B060FF` | `176,96,255` | The Sister — Creative |
| Marcus | `#3ED464` | `62,212,100` | Loud Cousin (Mom's) — Distribution |
| Maria | `#B0B8C0` | `176,184,192` | The Mom — Governance |
| Hector | `#52CBA0` | `82,203,160` | Shy Cousin (Dad's) — Research |
| Nova | `#FFD040` | `255,208,64` | Neighbour's Kid — Intelligence |
| Echo | `#60B8E8` | `96,184,232` | Nova's Sibling — Memory |
| Sentinel | `#FF6060` | `255,96,96` | Nova & Echo's Mom — Security |

Use `rgba(R,G,B,.1)` for card backgrounds, `.2` for borders, `.4` for active states.

---

## ASSETS INVENTORY

```
assets/
├── favicon.png             ← site favicon
├── icon.png                ← nav logo (square icon)
├── logo-transparent.png    ← transparent background logo
├── hero-crew.png           ← MAIN hero image (full crew, 2.4MB) — use wisely
├── hero-task.png           ← UI screenshot with holographic task display
├── hero-banner.png         ← wide banner image
├── team-launch.png         ← team group shot
├── cta-sunset.png          ← cinematic sunset (CTA section background)
├── mission.mp4             ← autoplay video (no audio)
├── jose.png                ← AI portrait — gold, Dad energy
├── alphonso.png            ← AI portrait — cyan, main character
├── miya.png                ← AI portrait — purple, creative energy
├── marcus.png              ← AI portrait — green, loud energy
├── maria.png               ← AI portrait — silver, governance
├── hector.png              ← AI portrait — teal, quiet/research
├── echo.svg                ← PLACEHOLDER ONLY — needs real portrait
├── nova.svg                ← PLACEHOLDER ONLY — needs real portrait
└── sentinel.svg            ← PLACEHOLDER ONLY — needs real portrait
```

### Generating Missing Portraits (Echo, Nova, Sentinel)
The existing portraits (jose.png, miya.png etc.) were generated with **ChatGPT image generation (DALL-E)**. Style: ultra-detailed 3D render, anthropomorphic alpaca character, cinematic lighting, cyberpunk background with neon glow in their accent colour, holographic UI elements related to their role. Upload an existing portrait as style reference when generating. Higgsfield or Midjourney styles will NOT match.

---

## SECTION-BY-SECTION UPGRADE GUIDE

### HERO — Current: 4/10 → Target: 9/10
- Add parallax depth to the crew image on scroll
- Show live GitHub stars via `https://api.github.com/repos/Thatisshayan/AlphonsoEcosystem`
- Make "Free to download · Always" more prominent — this is the conversion hook
- The cycling agent name animation is good — keep it, make it smoother
- Add a subtle particle or dot-flow background behind the text side
- The hex M logo SVG should have a pulsing glow animation

### AGENT SHOWCASE — Current: 5/10 → Target: 9/10
Main page cards need:
- Taller portrait area (240-260px)
- On hover: card expands slightly AND shows a quick-stat bar
- The "Meet [Name] →" link should animate on hover
- Add a glowing coloured border that pulses on hover (not just border-color change)

Agent individual pages need:
- Full-bleed hero with the portrait, agent colour as gradient behind
- A floating character quote in a large stylised pull-quote
- The "Works With" section should be a mini interactive network, not just cards
- The workflow steps should animate in as you scroll, not just fade in

### WHAT YOU CAN DO SECTION — Current: 4/10 → Target: 9/10
Replace the alternating text/image rows with a bento grid or tabbed interface. Four use cases (Creators, Founders, Agencies, Developers) should have their own visual treatment, not a generic layout.

### WORKFLOWS — Current: 3/10 → Target: 8/10
The 10 workflow cards are too small and plain. Each should:
- Have a subtle icon
- On hover: expand to show a one-line description of what it does
- The grid should animate in with a staggered wave, not all at once

### CONNECTORS — MISSING — Target: 9/10
Build a proper connectors showcase:
- Visual logo grid for the 13 native connectors (use emoji or SVG icons)
- Composio integration shown as a separate callout with its own visual treatment
- Animated "connection line" effect between Alphonso and the connectors

### COMPARISON SECTION — MISSING — Target: 9/10
Cloud AI vs Alphonso. Two columns. Simple, devastating copy. Example:
```
Cloud AI              Alphonso
─────────────────     ─────────────────
Your data on their    Your data on YOUR
servers               machine
Monthly subscription  Free to download
Forgets everything    Remembers everything
Generic assistant     9 specialized agents
They read your data   Nobody reads your data
```

### LIVE STATS — MISSING — Target: 8/10
Pull from GitHub API on page load:
- Stars count
- Forks count
- Latest release tag
- Open issues (optional)
Display in a slim bar or floating badge near the download CTA.

### DOWNLOAD CTA — Current: 3/10 → Target: 9/10
The download button sends people directly to GitHub releases. Add an intermediate step:
- "What you're getting" checklist before the download link
- System requirements (Windows, Ollama)
- First-step instructions ("After install: pull a model with `ollama pull llama3.2:3b`")

### MOBILE — Current: 2/10 → Target: 9/10
Complete rebuild mobile-first at 390px:
- Hamburger nav with slide-out drawer
- Agent cards in 2-column grid (not 5-column collapsed to 1)
- Pipeline as horizontal scrollable steps
- Hero stacked with image above text (not hidden)
- Touch-optimised hover states (use :active not :hover for interactions)

---

## ANIMATION PATTERNS TO IMPLEMENT

```javascript
// 1. Staggered card grid reveal
cards.forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.06}s`;
});

// 2. Parallax on hero image
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  heroImg.style.transform = `translateY(${y * 0.2}px)`;
});

// 3. Counter animation for stats
function animateCounter(el, target, duration) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) { el.textContent = target; clearInterval(timer); return; }
    el.textContent = Math.floor(start);
  }, 16);
}

// 4. Magnetic button effect (for download CTA)
btn.addEventListener('mousemove', (e) => {
  const rect = btn.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
});
```

---

## DO / DON'T

```
✓ DO keep dark green (#060A07) as base background — it's brand identity
✓ DO keep the Syne font for all headings — it's distinctive
✓ DO keep the hex M logo SVG in the nav
✓ DO keep the family backstory on agent pages exactly as written
✓ DO mobile-test at 390px before every commit
✓ DO use vanilla JS + CSS only (no build step, no npm)
✓ DO propose before building — get approval on direction first
✓ DO push after every major section change and share the live URL

✗ DON'T rename or move any files in assets/
✗ DON'T change agent personalities, quotes, or backstory
✗ DON'T add npm dependencies or require a build process
✗ DON'T make it look like a generic SaaS template
✗ DON'T remove any existing section — only improve or add
✗ DON'T use light backgrounds — this is a dark site, always
✗ DON'T use any colours not in the brand palette for UI elements
✗ DON'T ship anything that looks worse than what's already there
```

---

## COMMIT FORMAT
```
feat: [what was added]
fix: [what was broken]
design: [visual/layout change]
perf: [performance improvement]
```

---

## SCORING RUBRIC — HOW TO KNOW YOU'RE DONE

| Section | 10/10 Criteria |
|---------|---------------|
| Hero | Stops the scroll. Makes someone want to download immediately. |
| Agents | Feels like meeting real characters, not reading a feature list. |
| Connectors | Visually impressive. Makes 1,000+ feel real and credible. |
| Pipeline | Tells a story. You understand how it works just from the visual. |
| Mobile | Indistinguishable quality from desktop. No layout breaks. |
| Download CTA | Removes all friction. Next step is completely obvious. |
| Overall | A stranger thinks: "This is serious. I need to download this." |

---

*SKILL.md — AlphonsoEcosystem Marketing · Obsidian Media · 2026*
