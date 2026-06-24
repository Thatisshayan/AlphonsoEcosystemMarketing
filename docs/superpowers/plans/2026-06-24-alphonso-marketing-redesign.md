# Alphonso Marketing Site Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans.

**Goal:** Transform the AlphonsoEcosystemMarketing site from 4/10 to 10/10 with cinematic dark luxury overhaul.

**Architecture:** Single-file static HTML site. All CSS in style block, all JS in script block. No build step, no npm.

**Tech Stack:** Vanilla HTML5/CSS3/ES6+. Google Fonts (Syne, Inter, JetBrains Mono). GitHub Pages.

**Design Spec:** docs/superpowers/specs/2026-06-24-alphonso-marketing-redesign.md

---

## File Structure

| File | Responsibility |
|------|---------------|
| index.html | All HTML structure, CSS styles, and JavaScript |
| assets/og-image.png | New OG social preview image (1200x630) |

---

### Task 1: CSS Architecture — Design Tokens and Base Styles

**Files:** Modify index.html CSS root variables

- [ ] **Step 1: Replace CSS root variables with extended token set**

Replace existing :root block. Keep brand colors unchanged. Add elevation tokens (--surface-0/1/2/3), glass tokens (--glass-bg, --glass-border), glow token (--glow-lime), and fluid typography scale (--text-xs through --text-4xl using clamp).

Add line-height custom properties: --lh-body: 1.6, --lh-heading: 1.05, --lh-label: 1.3, --lh-display: 0.95.

- [ ] **Step 2: Add base body style using fluid tokens**

```css
body { font-size: var(--text-base); line-height: var(--lh-body); }
```

- [ ] **Step 3: Add prefers-reduced-motion**

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  html { scroll-behavior: auto; }
}
```

- [ ] **Step 4: Verify page loads without console errors**

- [ ] **Step 5: Commit**

```bash
git add index.html && git commit -m "feat: add extended design tokens and fluid typography"
```

---

### Task 2: Navigation — Glass Nav and Hamburger Drawer

**Files:** Modify index.html (nav HTML, CSS, JS)

- [ ] **Step 1: Replace nav HTML**

Nav structure: logo (M hex SVG + ALPHONSO text), nav links (Agents, Pricing, Use Cases, Docs), GitHub badge, Download button. Add hamburger button for mobile.

Add drawer HTML: overlay div, drawer nav with close button, nav links stacked vertically, agent mini-strip, download CTA.

- [ ] **Step 2: Add nav CSS**

Glass nav on scroll (.sc class: backdrop-filter blur 24px, glass-border). Hamburger hidden on desktop, visible below 768px. Drawer slides from right, glass bg, 280px wide, overlay behind.

- [ ] **Step 3: Add nav JS**

Scroll listener toggles .sc class. Hamburger click opens drawer. Close/overlay/link click closes drawer.

- [ ] **Step 4: Test** — Scroll triggers glass. Resize <768px shows hamburger. Drawer opens/closes.

- [ ] **Step 5: Commit**

```bash
git add index.html && git commit -m "feat: add glass navigation with mobile hamburger drawer"
```

---

### Task 3: Hero Section — Parallax, Dual CTA, Agent Cycler, Dot Grid, Stats

**Files:** Modify index.html (hero HTML, CSS, JS)

- [ ] **Step 1: Replace hero HTML**

Layout: .hero-content (left) with label, headline (Syne 800, clamp), subheadline with agent name cycler span, dual CTA buttons. .hero-visual (right) with hero-crew.png (parallax). Background SVG dot grid pattern. Below: .hero-stats with 4 items (9 Agents, 14 Connectors, 100% Private, v2.0.8).

- [ ] **Step 2: Add hero CSS**

Two-column flex layout (1fr 1fr). Headline cream, Syne 800, clamp 2.5rem-4.2rem. Cycler text uses agent colors swapping. CTA buttons: .bl (lime filled, magnetic effect) and .bl-ghost (transparent with border, cream text). Dot grid positioned absolute, z-index 0. Hero stats horizontal flex row, glass bg, border.

Mobile (max-width 768px): single column stacked, image below text, no parallax, smaller headline, full-width buttons.

- [ ] **Step 3: Add hero JS**

Agent cycler: array of verbs with colors, swap every 1.9s with opacity transition.

```js
var cycler = document.getElementById('cycler');
var words = [
  { text: 'Research', color: '#52CBA0' },
  { text: 'Create', color: '#B060FF' },
  { text: 'Execute', color: '#00C8E0' },
  { text: 'Govern', color: '#B0B8C0' },
  { text: 'Automate', color: '#3ED464' }
];
var ci = 0;
setInterval(function() {
  ci = (ci + 1) % words.length;
  cycler.style.opacity = '0';
  setTimeout(function() {
    cycler.textContent = words[ci].text;
    cycler.style.color = words[ci].color;
    cycler.style.opacity = '1';
  }, 200);
}, 1900);
```

Parallax on hero image:
```js
var heroImg = document.getElementById('hero-img');
window.addEventListener('scroll', function() {
  if (window.innerWidth > 768) {
    heroImg.style.transform = 'translateY(' + (window.scrollY * 0.15) + 'px)';
  }
}, { passive: true });
```

Magnetic button effect on download CTA:
```js
var dlBtn = document.getElementById('dl-btn');
dlBtn.addEventListener('mousemove', function(e) {
  var rect = dlBtn.getBoundingClientRect();
  var x = e.clientX - rect.left - rect.width / 2;
  var y = e.clientY - rect.top - rect.height / 2;
  dlBtn.style.transform = 'translate(' + (x * 0.15) + 'px, ' + (y * 0.15) + 'px)';
});
dlBtn.addEventListener('mouseleave', function() {
  dlBtn.style.transform = 'translate(0, 0)';
});
```

- [ ] **Step 4: Test** — Visually verify hero layout, agent cycler, parallax, stat strip, magnetic CTA. Test at 390px mobile.

- [ ] **Step 5: Commit**

```bash
git add index.html && git commit -m "feat: redesign hero with parallax, agent cycler, stat strip"
```

---

### Task 4: Agent Showcase — Redesigned Cards, Hover States, SVG Animations

**Files:** Modify index.html (agent section HTML, CSS, JS)

- [ ] **Step 1: Keep existing AGENTS data array, update card rendering**

The AGENTS data array already exists with all 9 agents. Keep this data. Update card rendering to use new glass card design.

Each card: .ac with glass bg (--surface-2), border (--border), color-coded top gradient bar (3px, agent color), circular portrait, name (Syne 700), role, 2 key abilities, click to agent page.

Hover: translateY(-3px), border glows in agent color, box-shadow intensifies, transition all 0.3s cubic-bezier.

- [ ] **Step 2: Update card CSS**

```css
.ac {
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 20px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(.16,1,.3,1);
  cursor: pointer;
}
.ac:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 36px rgba(var(--acr), 0.14);
  border-color: rgba(var(--acr), 0.38);
}
.ab {
  position: absolute; top: 0; left: 0; right: 0; height: 3px;
  opacity: 0.3; transition: opacity 0.3s;
}
.ac:hover .ab { opacity: 1; }
```

- [ ] **Step 3: Add SVG animation CSS for Echo/Nova/Sentinel**

```css
@keyframes pulse-ring {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.05); }
}
@keyframes spin-star {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
@keyframes scan-line {
  0% { transform: translateY(-20px); opacity: 0; }
  50% { opacity: 0.6; }
  100% { transform: translateY(20px); opacity: 0; }
}
```

- [ ] **Step 4: Test** — Verify cards render with glass effect, hover works, SVG animations play. Mobile 2-column.

- [ ] **Step 5: Commit**

```bash
git add index.html && git commit -m "feat: redesign agent cards with glass, hover glow, SVG animations"
```



---

### Task 5: Animation System — Reveal Observers, Staggered Grids, Counter

**Files:** Modify index.html (JS)

- [ ] **Step 1: Update scroll reveal CSS with improved easing**

```css
.rv { opacity: 0; transform: translateY(24px); transition: opacity 0.7s cubic-bezier(.16,1,.3,1), transform 0.7s cubic-bezier(.16,1,.3,1); }
.rv.v { opacity: 1; transform: translateY(0); }
.rl { opacity: 0; transform: translateX(-20px); transition: opacity 0.7s cubic-bezier(.16,1,.3,1), transform 0.7s cubic-bezier(.16,1,.3,1); }
.rl.v { opacity: 1; transform: translateX(0); }
.rr { opacity: 0; transform: translateX(20px); transition: opacity 0.7s cubic-bezier(.16,1,.3,1), transform 0.7s cubic-bezier(.16,1,.3,1); }
.rr.v { opacity: 1; transform: translateX(0); }
```

- [ ] **Step 2: Keep existing staggered delays on card grids (transitionDelay = i * 0.05s)**

- [ ] **Step 3: Add counter animation function**

```js
function animateCounter(el, target, duration) {
  var start = 0;
  var step = target / (duration / 16);
  var timer = setInterval(function() {
    start += step;
    if (start >= target) { el.textContent = target; clearInterval(timer); return; }
    el.textContent = Math.floor(start);
  }, 16);
}
```

- [ ] **Step 4: Test** — Scroll through page, verify stagger reveals. Stats animate on scroll.

- [ ] **Step 5: Commit**

```bash
git add index.html && git commit -m "feat: enhance animation system with stagger reveals and counters"
```

---

### Task 6: Pipeline Section — Horizontal Flow with Animated Connectors

**Files:** Modify index.html (pipeline HTML, CSS, JS)

- [ ] **Step 1: Keep existing PIPELINE data, add connector CSS**

```css
.ps { position: relative; flex: 1; min-width: 160px; }
.ps::after {
  content: ''; position: absolute; top: 24px; right: -10px;
  width: 20px; height: 1px;
  background: linear-gradient(90deg, var(--lime), transparent);
}
.ps:last-child::after { display: none; }
```

- [ ] **Step 2: Add mobile horizontal scroll**

```css
@media (max-width: 768px) {
  #pf { overflow-x: auto; scroll-snap-type: x mandatory; }
  .ps { scroll-snap-align: start; min-width: 200px; }
}
```

- [ ] **Step 3: Test** — Pipeline renders with connector lines. Mobile horizontal scroll works with snap.

- [ ] **Step 4: Commit**

```bash
git add index.html && git commit -m "design: redesign pipeline with animated connectors and mobile scroll"
```

---

### Task 7: Use Cases and Pricing — Glass Cards and Popular Badge

**Files:** Modify index.html (use cases + pricing CSS)

---

### Task 8: Docs Section — Card Grid with Icons

**Files:** Modify index.html (docs section CSS)

- [ ] **Step 1: Update docs card CSS**

```css
.dc {
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 20px;
  transition: all 0.3s cubic-bezier(.16,1,.3,1);
}
.dc:hover {
  transform: translateY(-2px);
  border-color: var(--glass-border);
  box-shadow: var(--glow-lime);
}
```

- [ ] **Step 2: Test** — Docs cards render in grid, hover lift effect works.

- [ ] **Step 3: Commit**

```bash
git add index.html && git commit -m "design: enhance docs cards with glass and hover lift"
```

---

### Task 9: Mission / CTA Section — Sunset BG, Magnetic Button, GitHub Stats

**Files:** Modify index.html (CTA section HTML, CSS, JS)

- [ ] **Step 1: Add full-width sunset bg with gradient overlay CSS**

```css
#cta {
  position: relative;
  background: url('assets/cta-sunset.png') center/cover no-repeat;
  min-height: 60vh;
  display: flex; align-items: center; justify-content: center;
  text-align: center;
}
#cta::before {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(to top, var(--bg) 0%, rgba(6,10,7,.6) 100%);
}
.cta-content { position: relative; z-index: 1; max-width: 600px; }
```

- [ ] **Step 2: Add GitHub stats fetch JS**

```js
async function fetchGitHubStats() {
  try {
    var res = await fetch('https://api.github.com/repos/Thatisshayan/AlphonsoEcosystem');
    var data = await res.json();
    var el = document.getElementById('gh-stars');
    if (el) animateCounter(el, data.stargazers_count, 800);
  } catch(e) {}
}
fetchGitHubStats();
```

- [ ] **Step 3: Add system requirements + first-step instructions in HTML**

```html
<div class="sys-reqs">

---

### Task 10: SEO — OG Tags, JSON-LD, Meta Descriptions, OG Image

**Files:** Modify index.html (head), Create assets/og-image.png

- [ ] **Step 1: Replace head with complete meta tags**

Full head: charset, viewport, title, description, OG tags (type, title, description, image, url, site_name), Twitter Card (summary_large_image), canonical URL, JSON-LD (SoftwareApplication).

- [ ] **Step 2: Add JSON-LD structured data**

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Alphonso Ecosystem",
  "applicationCategory": "AI Desktop Application",
  "operatingSystem": "Windows 10+",
  "description": "Local-first AI desktop companion with 9 specialized agents.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
}
</script>
```

- [ ] **Step 3: Generate OG image** (1200x630 PNG)

Dark bg, lime gradient line, "ONE ECOSYSTEM. INFINITE IMPACT." centered, "9 Agents · 100% Local". Save to assets/og-image.png.

- [ ] **Step 4: Test** — View page source, verify all meta tags present and correct.

- [ ] **Step 5: Commit**

```bash
git add index.html assets/og-image.png && git commit -m "feat: add SEO meta tags, JSON-LD, and OG image"
```

---

### Task 11: Mobile Responsiveness — Breakpoints, Touch Optimization

**Files:** Modify index.html (mobile CSS)

- [ ] **Step 1: Ensure all sections have max-width:768px media queries**

- Hero stacked (single column, no parallax, full-width buttons)
- Agent cards: 2-column grid
- Pipeline: horizontal scroll with CSS scroll-snap
- Pricing: stacked, accordion comparison
- Nav: hamburger active, drawer functional
- Sticky CTA bar visible at bottom

- [ ] **Step 2: Ensure 44x44px touch targets**

```css
@media (max-width: 768px) {
  .bl, .nl, .ngh, .dr-link { min-height: 44px; display: flex; align-items: center; }
}
```

- [ ] **Step 3: Test at 390px** — DevTools 390x844. No overflow. All sections readable. Touch targets tappable.

- [ ] **Step 4: Commit**

```bash
git add index.html && git commit -m "perf: optimize mobile responsiveness at 390px"
```

---

### Task 12: Performance — Font Preloading, Lazy Loading, DNS Prefetch

**Files:** Modify index.html (head and img tags)

- [ ] **Step 1: Add font preload + DNS prefetch in head**

```html
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Inter:wght@300;400;500;600&display=swap" as="style">
<link rel="dns-prefetch" href="https://fonts.googleapis.com">
<link rel="dns-prefetch" href="https://fonts.gstatic.com">
<link rel="dns-prefetch" href="https://api.github.com">
```

- [ ] **Step 2: Add lazy loading to images below the fold**

```html
<img loading="lazy" src="assets/hero-task.png" alt="...">
<img loading="lazy" src="assets/team-launch.png" alt="...">
<img loading="lazy" src="assets/cta-sunset.png" alt="...">
```

- [ ] **Step 3: Commit**

```bash
git add index.html && git commit -m "perf: font preload, lazy loading, DNS prefetch"
```

---

### Task 13: Final Polish — Cross-browser Test, 390px Mobile Test, Push

**Files:** index.html (final review)

- [ ] **Step 1: Full content audit** — Nav, Hero, Agents, Pipeline, Use Cases, Pricing, Docs, Mission/CTA, Footer all present. No orphaned old styles.

- [ ] **Step 2: Visual consistency** — Glass effects, glow shadows, lime accent consistent across all sections.

- [ ] **Step 3: Mobile test at 390px** — No overflow, hamburger works, drawer opens, cards 2-col, pipeline scrolls, pricing stacks, sticky CTA visible.

- [ ] **Step 4: Desktop test at 1440px** — Hero two-column, agents 3-column, pipeline horizontal, spacing correct.

- [ ] **Step 5: Push**

```bash
git push origin main
echo "Live: https://thatisshayan.github.io/AlphonsoEcosystemMarketing/"
```

  <span>Windows 10+</span><span>Ollama</span><span>500MB free</span>
</div>
<div class="first-step">After install: <code>ollama pull llama3.2:3b</code></div>
```

- [ ] **Step 4: Add sticky mobile CTA bar CSS**

```css
@media (max-width: 768px) {
  .sticky-cta {
    position: fixed; bottom: 0; left: 0; right: 0;
    background: var(--glass-bg);
    backdrop-filter: blur(24px);
    border-top: 1px solid var(--glass-border);
    padding: 12px 20px; z-index: 100;
  }
}
```

- [ ] **Step 5: Test** — Sunset bg renders, GitHub stars display, sticky bar appears on mobile.

- [ ] **Step 6: Commit**

```bash
git add index.html && git commit -m "feat: redesign CTA with GitHub stats, system reqs, sticky bar"
```


- [ ] **Step 1: Update use cases alternating rows CSS**

```css
.ucrow { display: flex; gap: 40px; align-items: center; padding: 32px 0; }
.ucrow:nth-child(even) { flex-direction: row-reverse; }
.uc-vis img { border-radius: 8px; box-shadow: 0 0 20px rgba(var(--acr), 0.1); }
```

- [ ] **Step 2: Add Popular badge to Pro pricing card**

```css
.popular-badge {
  position: absolute; top: -8px; right: 16px;
  background: var(--lime); color: #000;
  font-family: Syne, sans-serif; font-weight: 700;
  font-size: 10px; padding: 3px 10px; border-radius: 4px;
  letter-spacing: 1px; text-transform: uppercase;
}
```

- [ ] **Step 3: Test** — Alternating rows, Popular badge visible on Pro tier.

- [ ] **Step 4: Commit**

```bash
git add index.html && git commit -m "design: update use cases and pricing with glass cards and Popular badge"
```
