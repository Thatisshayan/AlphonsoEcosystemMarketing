# ULTIMATE FRONTEND & DESIGN SKILL
**The most comprehensive web design and frontend engineering reference ever assembled.**
Framer Motion is covered in Part IV. ui-ux-pro-max is a subset of Part II. This document supersedes both.

---

# PART I — DESIGN SCIENCE

## 1.1 Color Theory & Science

### The Three Color Models You Must Know
```
RGB   — screens, additive. rgb(255, 0, 0)
HSL   — human-readable. hsl(0, 100%, 50%)  h=hue 0-360, s=saturation, l=lightness
OKLCH — perceptually uniform. oklch(62.8% 0.258 29.23)
        L=lightness 0-100%, C=chroma 0-0.4+, H=hue 0-360
```

### Why OKLCH is the Future (use it now)
HSL is NOT perceptually uniform. Rotating hue at same L/S gives visually different brightness.
OKLCH guarantees: same L = same perceived lightness. Critical for accessible dark modes and palettes.
```css
:root {
  --brand: oklch(62% 0.25 145);         /* lime green */
  --brand-dark: oklch(45% 0.25 145);    /* same hue, darker */
  --brand-muted: oklch(62% 0.08 145);   /* same hue, desaturated */
}
```

### Color Harmony Systems
```
Complementary:    0° + 180°   — high contrast, energetic
Analogous:        0° ± 30°    — calm, cohesive
Triadic:          0° / 120° / 240° — vibrant, balanced
Split-comp:       0° + 150° + 210° — sophisticated
Tetradic:         0° / 90° / 180° / 270° — complex, use carefully
Monochromatic:    same hue, vary L and C — elegant, premium
```

### The 60-30-10 Rule
```
60% — Dominant (background / base)
30% — Secondary (surfaces, cards)
10% — Accent (CTAs, highlights, interactions)
```

### Building a Dark Mode Palette That Works
```css
/* WRONG: just invert */
/* RIGHT: elevation through opacity, not just lightness */

:root {
  --surface-0:  #060A07;          /* base */
  --surface-1:  rgba(255,255,255,.03);  /* +1 elevation */
  --surface-2:  rgba(255,255,255,.06);  /* +2 elevation */
  --surface-3:  rgba(255,255,255,.09);  /* +3 elevation */
  --border:     rgba(255,255,255,.07);
  --border-hi:  rgba(255,255,255,.15);
}
/* In dark mode: higher elevation = lighter. Achieved with opacity, not new colours. */
```

### Contrast Requirements (WCAG 2.1)
```
Normal text (< 18pt):   4.5:1 minimum,  7:1 AAA
Large text (≥ 18pt):    3:1 minimum,    4.5:1 AAA
UI components:          3:1 minimum
Decorative elements:    no requirement
```
Tool: `color-contrast()` CSS function (new) or use online checker.

### Glow Effects — The Physics
```css
/* Glow = multiple layered box-shadows */
.glow-lime {
  box-shadow:
    0 0 8px rgba(158,240,26,.3),       /* tight inner */
    0 0 24px rgba(158,240,26,.2),      /* medium spread */
    0 0 60px rgba(158,240,26,.1);      /* wide ambient */
}
/* Rule: decrease opacity as spread increases */
/* Never use a single large shadow — it looks flat */
```

---

## 1.2 Typography Science

### The Major Scale (musical interval, perfect for type)
```
Ratio: 1.333 (perfect fourth)

Base: 16px (1rem)
xs:   12px  (0.75rem)
sm:   14px  (0.875rem)
md:   16px  (1rem)      ← body
lg:   21px  (1.333rem)
xl:   28px  (1.777rem)
2xl:  37px  (2.369rem)
3xl:  50px  (3.157rem)
4xl:  67px  (4.209rem)  ← hero headline territory
```

Better: use `clamp()` for fluid type that scales with viewport:
```css
/* clamp(min, preferred, max) */
h1 { font-size: clamp(2.5rem, 5vw + 1rem, 5rem); }
h2 { font-size: clamp(1.5rem, 3vw + 0.5rem, 2.5rem); }
p  { font-size: clamp(1rem, 1.5vw + 0.25rem, 1.125rem); }
```

### Line Height Science
```
Body copy:         1.5 - 1.8   (longer lines = more leading)
Headings:          0.95 - 1.2  (tight = premium)
Small labels:      1.2 - 1.4
Display type:      0.85 - 1.0  (extra tight for large sizes)
```

### Letter Spacing Rules
```
Body:              0 - 0.01em  (never negative)
Subheadings:       0.02 - 0.08em
ALL-CAPS labels:   0.08 - 0.15em  (mandatory for legibility)
Display/hero:      -0.03 - -0.06em  (tighten at large sizes)
Logo/wordmark:     case by case
```

### Variable Fonts — Use Them
```css
@font-face {
  font-family: 'Syne';
  src: url('...') format('woff2 supports variations');
  font-weight: 100 900;
}

.headline {
  font-variation-settings: 'wght' 800;
  /* Animate weight on hover for micro-interaction */
  transition: font-variation-settings 0.2s ease;
}
.headline:hover {
  font-variation-settings: 'wght' 900;
}
```

### Font Pairing Logic
```
Rule 1: High contrast between display and body (serif+sans, heavy+light)
Rule 2: Shared proportions (x-height, cap height alignment)
Rule 3: Maximum 2-3 typefaces per project (1 display + 1 body + 1 mono)

Proven pairings:
- Syne (800) + Inter (400)           ← tech, modern
- Playfair Display + Source Sans 3   ← editorial, premium  
- Space Grotesk + Instrument Sans    ← startup, clean
- Clash Display + Satoshi            ← bold, youthful
- Canela + Neue Haas Unica           ← luxury
- Monument Extended + Graphik        ← agency
```

### Optical Sizing
At large sizes (>48px), reduce font-weight by one step — 900 becomes 800, 800 becomes 700.
Optical weight increases with size because stroke width appears heavier.

---

## 1.3 Layout & Grid Theory

### The 12-Column Grid (and when to break it)
```css
.grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1.5rem;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 clamp(1.5rem, 5vw, 5rem);
}

/* Span patterns */
.col-4  { grid-column: span 4;  }  /* 1/3 */
.col-6  { grid-column: span 6;  }  /* 1/2 */
.col-8  { grid-column: span 8;  }  /* 2/3 */
.col-12 { grid-column: span 12; }  /* full */
```

### Named Areas — Use Them for Complex Layouts
```css
.page {
  display: grid;
  grid-template-areas:
    "header header header"
    "hero   hero   sidebar"
    "stats  stats  stats"
    "footer footer footer";
  grid-template-columns: 1fr 1fr 320px;
}
.hero    { grid-area: hero; }
.sidebar { grid-area: sidebar; }
```

### Intrinsic Web Design (the modern approach)
```css
/* Auto-fit: fills available space, wraps naturally */
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

/* Auto-fill: creates empty columns at end */
.tiles {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}
```

### Container Queries — The Future of Responsive
```css
.card-wrapper {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 400px) {
  .card { display: grid; grid-template-columns: 1fr 1fr; }
}
/* Component responds to its OWN size, not viewport. */
```

### Bento Grid Pattern (trending, use correctly)
```css
.bento {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, auto);
  gap: 12px;
}
/* Each item spans different amounts — asymmetric is intentional */
.feature-large { grid-column: span 2; grid-row: span 2; }
.feature-wide  { grid-column: span 3; }
.feature-tall  { grid-row: span 2; }
```

### The Golden Ratio in Layout
φ = 1.618. Use for aspect ratios, section proportions, sidebar widths.
```
Sidebar: main = 1 : 1.618  →  sidebar: 38.2%, main: 61.8%
Card aspect ratio: 1.618 : 1  →  roughly 16:10
Hero split: 38% text, 62% visual
```

---

## 1.4 Animation Principles (Disney's 12, Applied to Web)

| Principle | CSS/JS Application |
|-----------|-------------------|
| Squash & Stretch | `transform: scaleX(1.1) scaleY(0.9)` on press |
| Anticipation | Slight scale-down before scale-up on click |
| Staging | One thing moves at a time, others pause |
| Straight Ahead vs Pose-to-Pose | Keyframe = pose-to-pose. Use for deliberate motion |
| Follow-Through | Spring physics after primary motion stops |
| Overlapping Action | Stagger delays so elements don't move simultaneously |
| Slow In, Slow Out | Ease functions (avoid linear at all costs) |
| Arc | Use `offset-path` or custom cubic-bezier for curved motion |
| Secondary Action | Hover on card: card lifts (primary) + shadow grows (secondary) |
| Timing | Fast = energetic. Slow = premium. 200-400ms is the UI sweet spot |
| Exaggeration | Scale 1.05 on hover, not 1.02. Make it felt |
| Solid Drawing | 3D transforms: maintain perspective consistency |

### UI Animation Duration Guide
```
Micro (button hover):        100 - 150ms
Small (modal open):          200 - 250ms
Medium (page transition):    300 - 400ms
Large (hero entrance):       500 - 800ms
Cinematic (scroll story):    800 - 1500ms
Never:                       > 2000ms for UI (use only for ambient)
```

---

## 1.5 Design Psychology

### Hick's Law
More choices = longer decision time. For CTAs: one primary action per screen.

### Fitts's Law
Target acquisition time = f(distance, size). Make CTAs large and close to where the eye lands.

### F-Pattern & Z-Pattern Reading
F-pattern: horizontal scan top → partial scan middle → vertical scan left.
Z-pattern: top-left → top-right → diagonal → bottom-left → bottom-right.
Place key content and CTAs at these natural scan points.

### Serial Position Effect
Users remember the first and last things in a list. Put your strongest feature first AND last.

### Loss Aversion (Kahneman)
"Stop losing data to the cloud" converts better than "Gain control of your data."
Frame benefits as preventing loss, not gaining benefit.

### Cognitive Load Reduction
```
- Maximum 7 navigation items (Miller's Law: 7±2)
- One primary CTA per section
- Progressive disclosure: hide advanced options until needed
- Visual grouping: Gestalt proximity and similarity
```

---

# PART II — VISUAL DESIGN SYSTEMS

## 2.1 The Complete Design Token System

```css
:root {
  /* ── COLOUR ── */
  --color-brand:        oklch(78% 0.22 134);
  --color-brand-dark:   oklch(55% 0.22 134);
  --color-brand-muted:  oklch(78% 0.06 134);

  /* ── SURFACE ── */
  --surface-base:     #060A07;
  --surface-raised:   rgba(255,255,255,.04);
  --surface-overlay:  rgba(255,255,255,.08);
  --surface-sunken:   rgba(0,0,0,.2);

  /* ── BORDER ── */
  --border-subtle:  rgba(255,255,255,.06);
  --border-default: rgba(255,255,255,.10);
  --border-strong:  rgba(255,255,255,.20);
  --border-accent:  rgba(158,240,26,.30);

  /* ── TEXT ── */
  --text-primary:   #EDEEE6;
  --text-secondary: #56625A;
  --text-tertiary:  #232E24;
  --text-accent:    #9EF01A;

  /* ── SHADOW ── */
  --shadow-sm:  0 2px 8px rgba(0,0,0,.3);
  --shadow-md:  0 8px 24px rgba(0,0,0,.5);
  --shadow-lg:  0 20px 60px rgba(0,0,0,.7);
  --shadow-glow: 0 0 30px rgba(158,240,26,.2);

  /* ── RADIUS ── */
  --radius-sm:  4px;
  --radius-md:  8px;
  --radius-lg:  12px;
  --radius-xl:  20px;
  --radius-full: 9999px;

  /* ── SPACING (8pt grid) ── */
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  20px;
  --space-6:  24px;
  --space-8:  32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;

  /* ── TRANSITION ── */
  --ease-out:     cubic-bezier(0.16, 1, 0.3, 1);    /* spring-like, snappy */
  --ease-in-out:  cubic-bezier(0.4, 0, 0.2, 1);     /* Material standard */
  --ease-bounce:  cubic-bezier(0.34, 1.56, 0.64, 1); /* overshoot */
  --ease-elastic: cubic-bezier(0.68, -0.55, 0.265, 1.55);

  --duration-fast:   150ms;
  --duration-base:   250ms;
  --duration-slow:   400ms;
  --duration-slower: 600ms;
}
```

## 2.2 The 50+ Style Playbook

### GLASSMORPHISM
```css
.glass {
  background: rgba(255,255,255,.08);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255,255,255,.15);
  border-radius: 16px;
  /* Tip: add inner glow for depth */
  box-shadow: inset 0 1px 0 rgba(255,255,255,.1);
}
/* Performance: backdrop-filter is expensive. Use on max 3 elements. */
```

### NEUMORPHISM
```css
.neuro {
  background: #e0e5ec;
  border-radius: 12px;
  box-shadow:
     6px  6px 12px rgba(0,0,0,.15),
    -6px -6px 12px rgba(255,255,255,.8);
}
.neuro.pressed {
  box-shadow:
     inset  4px  4px  8px rgba(0,0,0,.15),
     inset -4px -4px  8px rgba(255,255,255,.8);
}
/* Only works on light backgrounds. Accessibility concern: low contrast */
```

### BRUTALISM
```css
.brutal {
  border: 3px solid #000;
  box-shadow: 6px 6px 0 #000;
  border-radius: 0;
  background: #FFE600;
  transition: transform 0.1s, box-shadow 0.1s;
}
.brutal:hover {
  transform: translate(-3px, -3px);
  box-shadow: 9px 9px 0 #000;
}
.brutal:active {
  transform: translate(3px, 3px);
  box-shadow: 3px 3px 0 #000;
}
```

### CLAYMORPHISM
```css
.clay {
  border-radius: 28px;
  background: linear-gradient(145deg, #a8edea, #fed6e3);
  box-shadow:
    inset -4px -4px 8px rgba(255,255,255,.6),
    inset  4px  4px 8px rgba(0,0,0,.1),
    8px 8px 20px rgba(0,0,0,.12);
}
```

### CYBERPUNK / NEON DARK
```css
.cyber {
  background: #0a0014;
  border: 1px solid #9400ff;
  color: #00ff9f;
  box-shadow:
    0 0 10px #9400ff,
    inset 0 0 10px rgba(148,0,255,.1);
  font-family: 'Share Tech Mono', monospace;
}
.cyber::before {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0,0,0,.1) 2px,
    rgba(0,0,0,.1) 4px
  );
  pointer-events: none;
}
```

### AURORA / GRADIENT MESH
```css
.aurora {
  background:
    radial-gradient(ellipse at 20% 50%, rgba(120,40,200,.3) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 20%, rgba(40,200,120,.2) 0%, transparent 50%),
    radial-gradient(ellipse at 60% 80%, rgba(200,80,40,.2) 0%, transparent 50%),
    #0a0a0a;
  animation: aurora-shift 8s ease-in-out infinite alternate;
}
@keyframes aurora-shift {
  from { filter: hue-rotate(0deg); }
  to   { filter: hue-rotate(60deg); }
}
```

### NOISE TEXTURE (premium feel)
```css
.noise::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  opacity: 0.03;
  pointer-events: none;
  mix-blend-mode: overlay;
}
/* Add to any flat surface for organic, tactile feel */
```

### FROSTED GLASS (Apple-style)
```css
.frosted {
  background: rgba(255,255,255,.72);
  backdrop-filter: blur(40px) brightness(1.05);
  -webkit-backdrop-filter: blur(40px) brightness(1.05);
  border: 1px solid rgba(255,255,255,.35);
  border-bottom-color: rgba(255,255,255,.2);
  border-right-color: rgba(255,255,255,.2);
  box-shadow: 0 8px 32px rgba(0,0,0,.08);
}
```

### DARK EDITORIAL (Stripe-inspired)
```css
.editorial {
  background: #0a0a0a;
  color: #f5f5f5;
  --accent: #635bff;
}
.editorial .card {
  background: #111;
  border: 1px solid #1a1a1a;
  border-radius: 12px;
  padding: 2rem;
}
.editorial .card:hover {
  background: #161616;
  border-color: #222;
}
/* Minimal. Every element earns its place. */
```

### VAPORWAVE
```css
.vaporwave {
  background: linear-gradient(to bottom, #0600b5, #ff71ce);
  font-family: 'Press Start 2P', monospace;
  color: #00ffff;
  text-shadow: 0 0 10px #ff71ce, 2px 2px 0 #0600b5;
}
.vaporwave .grid-floor {
  background:
    linear-gradient(transparent 95%, #ff71ce 95%),
    linear-gradient(90deg, transparent 95%, #ff71ce 95%);
  background-size: 40px 40px;
  perspective: 300px;
  transform: rotateX(60deg);
}
```

### SWISS INTERNATIONAL (Helvetica style)
```css
.swiss {
  --grid: 8px;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: 14px;
  line-height: 1;
  color: #000;
  background: #fff;
}
.swiss .accent { color: #ff0000; }
.swiss h1 { font-size: 72px; font-weight: 300; letter-spacing: -3px; }
/* Typography IS the design. No decoration. */
```

---

## 2.3 Elevation System (Material Design 3 + Beyond)

```css
/* Elevation through shadow AND surface brightness */
.elevation-0 { background: #111; box-shadow: none; }
.elevation-1 { background: #151515; box-shadow: 0 1px 3px rgba(0,0,0,.5); }
.elevation-2 { background: #1a1a1a; box-shadow: 0 3px 8px rgba(0,0,0,.5); }
.elevation-3 { background: #1e1e1e; box-shadow: 0 6px 16px rgba(0,0,0,.5); }
.elevation-4 { background: #222222; box-shadow: 0 12px 32px rgba(0,0,0,.6); }
.elevation-5 { background: #262626; box-shadow: 0 20px 48px rgba(0,0,0,.7); }
/* Rule: each level = background lightens by ~3% + shadow doubles */
```

---

# PART III — CSS MASTERY

## 3.1 Architecture — CUBE CSS (best for large projects)

```
C — Composition  (layout, grid, spacing between components)
U — Utility      (single-purpose classes, Tailwind-style)
B — Block        (component-level styles, scoped)
E — Exception    (modifiers, states, variants with data-attributes)
```

```css
/* Composition */
.flow > * + * { margin-top: var(--flow-space, 1.5rem); }
.cluster { display: flex; flex-wrap: wrap; gap: var(--gap, 1rem); }
.sidebar { display: flex; flex-wrap: wrap; gap: 1rem; }
.sidebar > :first-child { flex-basis: 20rem; flex-grow: 1; }
.sidebar > :last-child  { flex-basis: 0; flex-grow: 999; min-width: 60%; }

/* Block */
.card { /* component styles */ }

/* Exception */
.card[data-variant="featured"] { /* variant override */ }
.card[aria-pressed="true"] { /* state override */ }
```

## 3.2 Modern CSS You Must Use

### @layer — Control Specificity
```css
@layer reset, base, components, utilities;

@layer base {
  *, *::before, *::after { box-sizing: border-box; }
  body { margin: 0; }
}
@layer components {
  .btn { /* component */ }
}
@layer utilities {
  .mt-4 { margin-top: 1rem !important; }
}
/* Layers at bottom of cascade always win over unlayered */
```

### @property — Animatable Custom Properties
```css
@property --gradient-angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}
@property --glow-radius {
  syntax: '<length>';
  initial-value: 0px;
  inherits: false;
}

.animated-gradient {
  background: conic-gradient(from var(--gradient-angle), #9ef01a, #00c8e0, #b060ff, #9ef01a);
  animation: rotate-gradient 4s linear infinite;
  transition: --glow-radius 0.3s;
}
@keyframes rotate-gradient {
  to { --gradient-angle: 360deg; }
}
/* Without @property: CSS can't transition custom properties. With it: it can. */
```

### CSS Nesting (native, no preprocessor needed)
```css
.card {
  background: var(--surface-raised);

  &:hover {
    background: var(--surface-overlay);
  }

  & .card__title {
    font-size: 1.25rem;
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
}
```

### Scroll-Driven Animations (CSS only, no JS)
```css
@keyframes fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

.reveal {
  animation: fade-in linear;
  animation-timeline: view();
  animation-range: entry 0% entry 30%;
}

/* Sticky progress bar */
.progress {
  position: fixed; top: 0; left: 0;
  width: 100%; height: 3px;
  background: var(--lime);
  transform-origin: left;
  animation: progress linear;
  animation-timeline: scroll(root block);
}
@keyframes progress {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}
```

### View Transitions API
```css
/* Smooth transitions between pages or state changes */
::view-transition-old(root) {
  animation: 300ms ease out slide-out;
}
::view-transition-new(root) {
  animation: 300ms ease in slide-in;
}

/* Specific element transition */
.hero-image { view-transition-name: hero; }
```
```javascript
document.startViewTransition(() => {
  updateDOM(); // Any DOM change is now animated
});
```

## 3.3 Advanced Selectors

```css
/* Has — select parent based on child */
.card:has(img) { display: grid; grid-template-columns: auto 1fr; }
.form:has(:invalid) .submit { opacity: 0.5; pointer-events: none; }

/* Is / Where */
:is(h1, h2, h3):hover { color: var(--accent); }

/* Not */
.nav a:not([aria-current="page"]) { color: var(--muted); }

/* Nth patterns */
li:nth-child(3n+1) { /* every 3rd, starting from 1 */ }
li:nth-last-child(-n+3) { /* last 3 items */ }

/* Focus styles (never remove, only restyle) */
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
  border-radius: 2px;
}
```

## 3.4 CSS Grid — Complete Reference

```css
/* Explicit placement */
.item { grid-column: 2 / 4; grid-row: 1 / 3; }

/* Span */
.item { grid-column: span 2; }

/* Named lines */
.container {
  grid-template-columns: [sidebar-start] 280px [sidebar-end content-start] 1fr [content-end];
}
.content { grid-column: content-start / content-end; }

/* Dense packing (fill gaps) */
.masonry { grid-auto-flow: dense; }

/* Subgrid — align nested grids to parent */
.child {
  display: grid;
  grid-column: span 6;
  grid-template-columns: subgrid; /* uses parent's columns */
}
```

---

# PART IV — ANIMATION & MOTION MASTERY

## 4.1 The Easing Bible

```css
/* CSS built-ins */
linear              /* constant speed. Almost never correct for UI */
ease                /* in-out, slightly ease-in biased. Okay */
ease-in             /* slow start. Use for exits only */
ease-out            /* slow end. Use for entrances — feels natural */
ease-in-out         /* slow both ends. Smooth, standard */

/* Custom cubic-bezier — the real toolkit */
--ease-snappy:    cubic-bezier(0.16, 1, 0.3, 1);     /* fast out, slight spring */
--ease-spring:    cubic-bezier(0.34, 1.56, 0.64, 1);  /* overshoot like spring */
--ease-elastic:   cubic-bezier(0.68, -0.55, 0.27, 1.55); /* full elastic */
--ease-material:  cubic-bezier(0.4, 0, 0.2, 1);      /* Google Material */
--ease-ios:       cubic-bezier(0.25, 0.46, 0.45, 0.94); /* Apple iOS */
--ease-expo-out:  cubic-bezier(0.16, 1, 0.3, 1);     /* exponential decel */
--ease-back-out:  cubic-bezier(0.34, 1.56, 0.64, 1); /* back then settle */
--ease-circ-out:  cubic-bezier(0, 0.55, 0.45, 1);    /* circular decel */

/* Step functions */
steps(5, end)       /* for sprite animation, typewriter effects */
steps(1, start)     /* binary: instant jump */
```

## 4.2 Framer Motion — Complete Reference

### Installation & Setup
```bash
npm install framer-motion
# Or via CDN for quick use:
# <script src="https://cdn.jsdelivr.net/npm/framer-motion"></script>
```

### Core: motion Component
```jsx
import { motion } from 'framer-motion';

// Basic animation
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
/>

// Exit animation (requires AnimatePresence wrapper)
<motion.div exit={{ opacity: 0, scale: 0.95 }} />
```

### Variants — The Correct Way to Orchestrate
```jsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,    // delay between children
      delayChildren: 0.2,       // initial delay
      when: 'beforeChildren',   // parent animates before children
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 }
  }
};

// Usage — variants propagate automatically to children
<motion.ul variants={containerVariants} initial="hidden" animate="visible">
  {items.map(item => (
    <motion.li key={item.id} variants={itemVariants}>
      {item.text}
    </motion.li>
  ))}
</motion.ul>
```

### Spring Physics — The Full API
```jsx
// Spring is almost always better than duration-based for UI
transition={{
  type: 'spring',
  stiffness: 300,   // higher = faster, more rigid. Range: 50-1000
  damping: 24,      // higher = less bounce. Range: 5-50
  mass: 1,          // higher = slower, heavier. Range: 0.1-5
  velocity: 0,      // initial velocity
  restDelta: 0.001, // when to consider animation done
  restSpeed: 0.001,
}}

// Presets (mental model):
// Snappy UI feedback:   stiffness: 400, damping: 30
// Bouncy card:          stiffness: 300, damping: 20
// Heavy door:           stiffness: 100, damping: 20, mass: 2
// Rubber band:          stiffness: 500, damping: 15
```

### useMotionValue & useTransform — Reactive Values
```jsx
import { useMotionValue, useTransform, motion } from 'framer-motion';

function MagneticCard() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Transform mouse position to rotation
  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
    />
  );
}
```

### useScroll — Scroll-Driven Animation
```jsx
import { useScroll, useTransform, motion } from 'framer-motion';

function ParallaxHero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);       // image moves slower
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);   // fades out
  const scale = useTransform(scrollY, [0, 300], [1, 1.2]);   // zooms in

  return (
    <div style={{ overflow: 'hidden', height: '100vh' }}>
      <motion.img style={{ y, scale, opacity }} src="hero.jpg" />
    </div>
  );
}

// Section-based scroll tracking
function SectionReveal() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],  // when section enters/leaves
  });
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return <motion.section ref={ref} style={{ opacity }} />;
}
```

### AnimatePresence — Enter/Exit
```jsx
import { AnimatePresence, motion } from 'framer-motion';

function Modal({ isOpen }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        />
      )}
    </AnimatePresence>
  );
}

// List reordering
<AnimatePresence mode="popLayout">
  {items.map(item => (
    <motion.li
      key={item.id}
      layout                              // animate position changes
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
    />
  ))}
</AnimatePresence>
```

### Layout Animation — Shared Element Transitions
```jsx
// Same layoutId = elements transition between states
function ProductGallery() {
  const [selected, setSelected] = useState(null);

  return (
    <>
      {images.map(img => (
        <motion.img
          key={img.id}
          layoutId={`image-${img.id}`}    // ← this is the magic
          onClick={() => setSelected(img)}
        />
      ))}

      <AnimatePresence>
        {selected && (
          <motion.div className="fullscreen">
            <motion.img layoutId={`image-${selected.id}`} />  {/* morphs! */}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
```

### Gesture Animation
```jsx
<motion.button
  whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}
  whileTap={{ scale: 0.97 }}
  whileFocus={{ outline: '2px solid var(--accent)' }}
  drag
  dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
  dragElastic={0.1}
/>
```

### useAnimate — Imperative, Sequence
```jsx
import { useAnimate } from 'framer-motion';

function Sequence() {
  const [scope, animate] = useAnimate();

  async function runSequence() {
    await animate('.title', { opacity: 1, y: 0 }, { duration: 0.5 });
    await animate('.subtitle', { opacity: 1 }, { duration: 0.3, delay: 0.1 });
    animate('.cta', { scale: [1, 1.05, 1] }, { duration: 0.6, ease: 'easeInOut' });
  }

  return (
    <div ref={scope}>
      <h1 className="title" style={{ opacity: 0, y: 20 }}>Hello</h1>
      <p className="subtitle" style={{ opacity: 0 }}>World</p>
      <button className="cta" onClick={runSequence}>Animate</button>
    </div>
  );
}
```

## 4.3 GSAP — When Framer Motion Isn't Enough

```javascript
// Core timeline
const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

tl.from('.hero-title', { y: 80, opacity: 0, duration: 1 })
  .from('.hero-sub', { y: 40, opacity: 0, duration: 0.8 }, '-=0.5')
  .from('.hero-cta', { scale: 0.8, opacity: 0, duration: 0.6 }, '-=0.4');
// '-=0.5' = start 0.5s before previous ends (overlap)

// ScrollTrigger (requires plugin)
gsap.registerPlugin(ScrollTrigger);

gsap.from('.card', {
  scrollTrigger: {
    trigger: '.card-grid',
    start: 'top 80%',      // when trigger's top hits 80% of viewport
    end: 'bottom 20%',
    toggleActions: 'play none none reverse',
    scrub: true,           // tie to scroll position
    pin: true,             // pin element during animation
  },
  y: 60, opacity: 0, stagger: 0.1
});

// Text split animation
import { SplitText } from 'gsap/SplitText';
gsap.registerPlugin(SplitText);

const split = new SplitText('.headline', { type: 'chars,words' });
gsap.from(split.chars, {
  duration: 0.8, opacity: 0, y: 40,
  stagger: 0.02, ease: 'back.out(1.7)'
});
```

## 4.4 Vanilla JS Animation Patterns

### Intersection Observer (the right way)
```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Unobserve after animation if one-time
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,           // 10% visible = trigger
  rootMargin: '0px 0px -60px 0px'  // shrink viewport bottom by 60px
});

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
```

### RequestAnimationFrame — Smooth Imperative Animation
```javascript
function animate(el, from, to, duration, easing = 'easeOut') {
  const easings = {
    easeOut: t => 1 - Math.pow(1 - t, 3),
    easeInOut: t => t < 0.5 ? 4*t*t*t : 1-Math.pow(-2*t+2,3)/2,
    spring: t => 1 - (Math.cos(t * Math.PI * 4) * Math.exp(-t * 8)),
  };

  let start = null;

  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = easings[easing](progress);

    Object.keys(from).forEach(prop => {
      el.style[prop] = from[prop] + (to[prop] - from[prop]) * eased + 'px';
    });

    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}
```

### Magnetic Element Effect
```javascript
document.querySelectorAll('[data-magnetic]').forEach(el => {
  const strength = parseFloat(el.dataset.magneticStrength || '0.3');

  el.addEventListener('mousemove', e => {
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    el.style.transform = `translate(${x}px, ${y}px)`;
  });

  el.addEventListener('mouseleave', () => {
    el.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    el.style.transform = 'translate(0, 0)';
    setTimeout(() => el.style.transition = '', 500);
  });
});
```

### Smooth Parallax System
```javascript
class Parallax {
  constructor() {
    this.els = [...document.querySelectorAll('[data-parallax]')];
    this.y = 0;
    this.init();
  }

  init() {
    window.addEventListener('scroll', () => {
      this.y = window.scrollY;
      this.update();
    }, { passive: true });
  }

  update() {
    this.els.forEach(el => {
      const speed = parseFloat(el.dataset.parallax || '0.2');
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      el.style.transform = `translateY(${center * speed}px)`;
    });
  }
}
// Usage: <img data-parallax="0.3"> moves at 30% scroll speed
```

### Number Counter Animation
```javascript
function animateCounter(el, end, duration = 2000) {
  const start = 0;
  const range = end - start;
  const startTime = performance.now();
  const format = el.dataset.format || '';

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(start + range * eased);
    el.textContent = current.toLocaleString() + format;
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}
// <span data-counter="1015" data-format="">0</span>
// Trigger when visible: observer + animateCounter(el, +el.dataset.counter)
```

---

# PART V — INTERACTION PATTERN LIBRARY

## 5.1 Hover Effects (30+ Patterns)

```css
/* 1. Lift + Shadow */
.lift { transition: transform 0.25s var(--ease-snappy), box-shadow 0.25s ease; }
.lift:hover { transform: translateY(-6px); box-shadow: 0 20px 40px rgba(0,0,0,0.3); }

/* 2. Border reveal (draw border on hover) */
.border-reveal::before {
  content: '';
  position: absolute; inset: 0;
  border: 2px solid var(--accent);
  transform: scale(0.94);
  opacity: 0;
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.border-reveal:hover::before { transform: scale(1); opacity: 1; }

/* 3. Shimmer / shine */
.shimmer {
  position: relative;
  overflow: hidden;
}
.shimmer::after {
  content: '';
  position: absolute;
  top: 0; left: -100%;
  width: 60%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
  transition: left 0.5s ease;
}
.shimmer:hover::after { left: 150%; }

/* 4. Glow pulse on hover */
.glow-hover {
  transition: box-shadow 0.3s ease;
}
.glow-hover:hover {
  box-shadow:
    0 0 15px var(--accent-glow),
    0 0 40px var(--accent-glow),
    0 0 80px var(--accent-glow);
}

/* 5. Text reveal underline (clip-path) */
.text-reveal {
  background: linear-gradient(var(--accent), var(--accent)) no-repeat;
  background-size: 0 2px;
  background-position: left bottom;
  transition: background-size 0.4s ease;
}
.text-reveal:hover { background-size: 100% 2px; }

/* 6. Scale background not border */
.scale-bg {
  background: var(--surface-raised);
  transition: background-size 0.3s;
}
/* Use CSS @property + background-size for this */

/* 7. Tilt card (via JS) */
/* See MagneticCard in Framer Motion section */

/* 8. Color morph */
.color-morph {
  background: var(--surface-raised);
  transition: background 0.4s ease;
}
.color-morph:hover { background: rgba(var(--accent-rgb), 0.1); }

/* 9. SVG stroke draw */
.draw-on-hover svg path {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  transition: stroke-dashoffset 0.8s ease;
}
.draw-on-hover:hover svg path { stroke-dashoffset: 0; }

/* 10. Skew */
.skew-hover { transition: transform 0.2s ease; }
.skew-hover:hover { transform: skewX(-2deg) scale(1.02); }
```

## 5.2 Custom Cursor

```javascript
class CustomCursor {
  constructor() {
    this.cursor = document.querySelector('.cursor');
    this.dot = document.querySelector('.cursor-dot');
    this.x = 0; this.y = 0;
    this.dotX = 0; this.dotY = 0;
    this.init();
  }

  init() {
    document.addEventListener('mousemove', e => {
      this.x = e.clientX;
      this.y = e.clientY;
    });

    // Hover states
    document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', () => this.cursor.classList.add('hovering'));
      el.addEventListener('mouseleave', () => this.cursor.classList.remove('hovering'));
    });

    this.animate();
  }

  animate() {
    // Dot follows cursor with lag (lerp)
    this.dotX += (this.x - this.dotX) * 0.12;
    this.dotY += (this.y - this.dotY) * 0.12;

    this.cursor.style.transform = `translate(${this.x}px, ${this.y}px)`;
    this.dot.style.transform = `translate(${this.dotX}px, ${this.dotY}px)`;

    requestAnimationFrame(() => this.animate());
  }
}
```
```css
.cursor {
  position: fixed; top: -15px; left: -15px;
  width: 30px; height: 30px;
  border: 2px solid var(--accent);
  border-radius: 50%;
  pointer-events: none;
  z-index: 99999;
  transition: width 0.3s, height 0.3s, border-color 0.3s;
  mix-blend-mode: difference;
}
.cursor.hovering { width: 60px; height: 60px; border-color: white; }
.cursor-dot {
  position: fixed; top: -3px; left: -3px;
  width: 6px; height: 6px;
  background: var(--accent);
  border-radius: 50%;
  pointer-events: none;
  z-index: 99999;
}
```

---

# PART VI — SVG MASTERY

## 6.1 Animated SVG Patterns

```css
/* Stroke draw animation */
.animated-path {
  stroke-dasharray: var(--path-length, 500);
  stroke-dashoffset: var(--path-length, 500);
  animation: draw 2s var(--ease-snappy) forwards;
}
@keyframes draw { to { stroke-dashoffset: 0; } }

/* Morphing between paths */
.morph { animation: morph 4s ease-in-out infinite alternate; }
@keyframes morph {
  from { d: path('M10,10 L90,10 L90,90 L10,90 Z'); }
  to   { d: path('M50,10 L90,50 L50,90 L10,50 Z'); }
}
```

## 6.2 SVG Filters (CSS-level effects)

```css
/* Glow using SVG filter */
.glow-svg {
  filter: drop-shadow(0 0 8px rgba(158,240,26,.8))
          drop-shadow(0 0 24px rgba(158,240,26,.4));
}

/* Noise texture filter */
.noise-svg {
  filter: url(#noise);
}
```
```html
<svg style="display:none">
  <filter id="noise">
    <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
    <feColorMatrix type="saturate" values="0"/>
    <feBlend in="SourceGraphic" result="noisy"/>
    <feComposite in="SourceGraphic" in2="noisy" operator="in"/>
  </filter>
  <filter id="glow">
    <feGaussianBlur stdDeviation="4" result="blur"/>
    <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
  <filter id="distort">
    <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="3" result="noise"/>
    <feDisplacementMap in="SourceGraphic" in2="noise" scale="15" xChannelSelector="R" yChannelSelector="G"/>
  </filter>
</svg>
```

---

# PART VII — THREE.JS FOR MARKETING SITES

## 7.1 Particle Field Hero Background

```javascript
import * as THREE from 'three';

class ParticleField {
  constructor(canvas) {
    this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    this.camera.position.z = 50;
    this.init();
  }

  init() {
    const count = 2000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 100;
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      size: 0.15,
      color: 0x9ef01a,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);

    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.animate();
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.particles.rotation.y += 0.0002;
    this.particles.rotation.x += 0.0001;
    this.renderer.render(this.scene, this.camera);
  }

  resize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  }
}
```

---

# PART VIII — PERFORMANCE ENGINEERING

## 8.1 Core Web Vitals Targets
```
LCP (Largest Contentful Paint):  < 2.5s   Good  | 2.5-4s Needs Work | > 4s Poor
FID (First Input Delay):         < 100ms  Good  | 100-300ms Needs Work
CLS (Cumulative Layout Shift):   < 0.1    Good  | 0.1-0.25 Needs Work
INP (Interaction to Next Paint): < 200ms  Good
```

## 8.2 Paint & Composite — Only Animate These
```
✓ COMPOSITE ONLY (no layout, no paint — GPU only):
  transform: translate, rotate, scale
  opacity
  filter (partial — blur, brightness)

✗ CAUSES LAYOUT (reflow = expensive):
  width, height, margin, padding, top, left

✗ CAUSES PAINT (but not layout):
  color, background-color, box-shadow, border-color

Rule: ONLY animate transform and opacity for 60fps.
Use will-change: transform on elements about to animate.
```

## 8.3 Font Performance
```css
/* 1. Use font-display: swap to prevent invisible text */
@font-face {
  font-family: 'Syne';
  font-display: swap;
  src: url('syne.woff2') format('woff2');
}

/* 2. Preload critical fonts */
/* <link rel="preload" href="syne-800.woff2" as="font" type="font/woff2" crossorigin> */

/* 3. Subset fonts to only needed characters */
/* font-subsetting: only include characters used */

/* 4. Use system fonts for body when possible */
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

## 8.4 Image Optimization
```html
<!-- Modern: always use loading="lazy" except above fold -->
<img src="hero.webp" loading="eager" fetchpriority="high" alt="...">
<img src="card.webp" loading="lazy" decoding="async" alt="...">

<!-- Responsive images -->
<picture>
  <source media="(max-width: 768px)" srcset="hero-mobile.webp" type="image/webp">
  <source media="(min-width: 769px)" srcset="hero-desktop.webp" type="image/webp">
  <img src="hero-desktop.jpg" alt="..." style="width:100%;height:auto">
</picture>

<!-- Intrinsic sizing — prevents CLS -->
<img src="..." width="1200" height="800" style="max-width:100%;height:auto">
```

## 8.5 Animation Performance Checklist
```
✓ Use will-change: transform on elements about to animate
✓ Remove will-change after animation completes
✓ Use transform: translateZ(0) to force GPU layer
✓ Avoid animating width/height — use transform: scale instead
✓ Batch DOM reads and writes (avoid interleaved read/write)
✓ Throttle scroll handlers or use passive: true
✓ Use IntersectionObserver over scroll events for reveal
✓ Target 60fps = 16.7ms per frame budget
✓ Reduce motion: prefers-reduced-motion media query
```
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

# PART IX — CONVERSION DESIGN SCIENCE

## 9.1 Landing Page Anatomy

```
1. NAV          — Logo + 3-5 links + CTA button. Sticky.
2. HERO         — Headline + subheadline + CTA + social proof + visual
3. SOCIAL PROOF — Logos, testimonials, stats, media mentions
4. VALUE PROP   — 3 core benefits (not features — benefits)
5. FEATURES     — How it works, what it does
6. PROOF        — Case study, demo, testimonial with name+photo
7. COMPARISON   — You vs alternatives (if applicable)
8. PRICING      — Clear tiers. Free tier prominently featured.
9. FAQ          — Remove last objections
10. FINAL CTA   — Repeat the primary action with urgency/scarcity
11. FOOTER      — Links, legal, social
```

## 9.2 Hero Section Formula

```
FORMULA: [Verb] + [Outcome] + [Without Pain Point]
Examples:
  "Run your whole business with 9 AI agents — without sending a byte to the cloud."
  "Research, create, distribute, and govern — on your machine, under your rules."

SUBHEADLINE: Clarify what it is + who it's for
  "Alphonso is a local-first AI platform for solo operators and agencies."

SOCIAL PROOF BELOW HEADLINE (small, inline):
  "★★★★★ — '9 agents in 3 clicks, zero cloud'"
  Or: "↓ 847 downloads this week"

CTA: One primary. One secondary.
  Primary: [Verb] [Object]  — "Download Alphonso" not "Get Started"
  Secondary: Explore/Learn  — "See how it works"

VISUAL: Hero image should show the OUTCOME, not the interface.
  Good: the crew executing tasks together
  Bad: a screenshot of the settings panel
```

## 9.3 CTA Engineering

```css
/* Primary CTA — visual weight rules */
.cta-primary {
  /* ── SIZE: minimum 44px height (Fitts's Law) ── */
  padding: 14px 28px;
  min-height: 48px;

  /* ── COLOUR: must pass 4.5:1 contrast on background ── */
  background: var(--lime);
  color: #000;

  /* ── SHAPE: slightly rounded reads as 'clickable' ── */
  border-radius: 8px;

  /* ── WEIGHT: bold label communicates action ── */
  font-family: 'Syne', sans-serif;
  font-weight: 800;
  font-size: 15px;

  /* ── GLOW: draws eye subconsciously ── */
  box-shadow: 0 0 20px rgba(158,240,26,.4);

  /* ── FEEDBACK: instant response = feels fast ── */
  transition: transform 120ms ease, box-shadow 120ms ease;
}
.cta-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 30px rgba(158,240,26,.5);
}
.cta-primary:active {
  transform: translateY(1px);
  box-shadow: 0 2px 10px rgba(158,240,26,.3);
}
```

## 9.4 Pricing Psychology

```
1. Anchoring: Show highest price first, then lower tiers feel cheap
2. Feature decoy: Middle tier should look like the best value
3. Price presentation: "$0 forever" > "Free" > "No cost"
4. Loss framing: "Don't pay $200/mo for cloud AI" > "Save money"
5. Social proof on tier: "Most popular" badge on recommended
6. Everything in Free: show the free tier as genuinely complete
7. Specificity: "1,015 tests passing" > "thoroughly tested"
8. Remove friction: "No credit card required" under the CTA
```

---

# PART X — RESPONSIVE & MOBILE MASTERY

## 10.1 The Breakpoint System

```css
/* Mobile-first: write for 390px, add breakpoints up */

/* Breakpoints */
--sm:  640px;   /* large phones landscape */
--md:  768px;   /* tablets */
--lg:  1024px;  /* small laptops */
--xl:  1280px;  /* desktops */
--2xl: 1536px;  /* large screens */

@media (min-width: 640px)  { /* sm */ }
@media (min-width: 768px)  { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
```

## 10.2 Fluid Everything

```css
/* Fluid spacing */
.section {
  padding: clamp(3rem, 10vw, 8rem) clamp(1.5rem, 5vw, 5rem);
}

/* Fluid grid columns */
.grid {
  grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr));
}

/* Fluid font sizes */
:root {
  font-size: clamp(15px, 1.1vw, 17px); /* base scales with viewport */
}
```

## 10.3 Touch Interaction Rules

```css
/* Minimum touch target: 44×44px */
button, a { min-height: 44px; min-width: 44px; }

/* Remove tap highlight */
* { -webkit-tap-highlight-color: transparent; }

/* Touch-friendly hover states */
@media (hover: none) {
  .hover-effect:hover { /* don't apply hover states on touch devices */ }
  .hover-effect:active { /* use :active instead */ }
}

/* Prevent text selection on interactive elements */
button { user-select: none; }

/* Momentum scroll */
.scrollable { overflow-y: scroll; -webkit-overflow-scrolling: touch; }
```

---

# PART XI — SEO & SOCIAL META (often ignored, always matters)

## 11.1 Complete Meta Template
```html
<head>
  <!-- Core -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Alphonso Ecosystem — One Ecosystem. Infinite Impact.</title>
  <meta name="description" content="9 AI agents. Local-first. 1,000+ integrations. Research, create, execute, govern and automate — while you stay in control.">

  <!-- Open Graph (Facebook, LinkedIn) -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="Alphonso Ecosystem — One Ecosystem. Infinite Impact.">
  <meta property="og:description" content="9 AI agents. Local-first. 1,000+ integrations.">
  <meta property="og:image" content="https://thatisshayan.github.io/AlphonsoEcosystemMarketing/assets/og-image.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:url" content="https://thatisshayan.github.io/AlphonsoEcosystemMarketing/">
  <meta property="og:site_name" content="Alphonso Ecosystem">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Alphonso Ecosystem — One Ecosystem. Infinite Impact.">
  <meta name="twitter:description" content="9 AI agents. Local-first. 1,000+ integrations.">
  <meta name="twitter:image" content="https://thatisshayan.github.io/AlphonsoEcosystemMarketing/assets/og-image.png">

  <!-- Canonical -->
  <link rel="canonical" href="https://thatisshayan.github.io/AlphonsoEcosystemMarketing/">

  <!-- Favicon set -->
  <link rel="icon" href="assets/favicon.png" type="image/png">
  <link rel="apple-touch-icon" href="assets/apple-touch-icon.png">
</head>
```

## 11.2 OG Image Spec
```
Size: 1200 × 630px (standard), 1200 × 600px (safe zone matters)
Format: PNG or JPEG (PNG for text/logos)
Text: max 3 lines, minimum 24px
Safe zone: keep content within 50px from all edges
Background: dark works well for social feeds
Include: logo, headline, one visual element
```

---

# PART XII — ACCESSIBILITY (non-negotiable)

## 12.1 The 10 Laws You Must Follow

```
1. Every image needs alt text (or alt="" if decorative)
2. Every form input needs a label (not just placeholder)
3. Every interactive element must be keyboard reachable
4. Never remove focus outline (restyle it, never hide it)
5. Color alone must not convey meaning (add text/icon)
6. Minimum 4.5:1 contrast for body text
7. Minimum 44×44px touch target
8. No content that flashes more than 3 times/second
9. Provide skip-to-content link for keyboard users
10. Respect prefers-reduced-motion
```

## 12.2 ARIA Patterns
```html
<!-- Modal -->
<div role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <h2 id="modal-title">Title</h2>
</div>

<!-- Live region (for dynamic content) -->
<div aria-live="polite" aria-atomic="true">Status updated</div>

<!-- Icon button -->
<button aria-label="Close menu">✕</button>

<!-- Navigation -->
<nav aria-label="Main navigation">...</nav>

<!-- Current page -->
<a href="/" aria-current="page">Home</a>

<!-- Expanded state -->
<button aria-expanded="false" aria-controls="dropdown">Menu</button>
```

---

# HOW TO USE THIS SKILL

1. **Design decisions** → Consult Parts I and II first
2. **CSS implementation** → Part III
3. **Animations** → Part IV (Framer Motion) + Part V (Vanilla patterns)
4. **Interactive effects** → Part V (Interaction Library)
5. **3D / advanced visuals** → Part VII
6. **Performance concerns** → Part VIII
7. **Conversion optimization** → Part IX
8. **Mobile/responsive** → Part X
9. **SEO/meta** → Part XI
10. **Accessibility review** → Part XII

**The hierarchy:** Design Science → Visual System → Engineering → Polish

Always design before you code. Always test on mobile before shipping. Always check performance after.

---

*DESIGN_SKILL.md — The most comprehensive web design and frontend engineering reference assembled in one document.*
*Covers: color theory, typography, layout, animation principles, Framer Motion (complete), GSAP, vanilla JS, CSS mastery (@property, @layer, scroll-driven, container queries, nesting), Three.js particles, SVG animation, 50+ visual styles, interaction patterns, conversion science, performance engineering, accessibility, SEO.*
