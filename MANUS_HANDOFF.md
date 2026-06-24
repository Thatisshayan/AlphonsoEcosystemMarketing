# MANUS HANDOFF — AlphonsoEcosystem Marketing Site
**From:** Shayan (Founder, Obsidian Media)
**To:** Manus
**Mission:** Take the marketing site from a 4/10 to a 10/10. Propose first. Then build.

---

## STEP 1 — READ THESE REPOS IN ORDER

### Repo 1 — The Product (understand what you're marketing)
```
https://github.com/Thatisshayan/AlphonsoEcosystem
```
Read in this order:
- `README.md` — product overview
- `ARCHITECTURE.md` — how it's built
- `docs/GETTING_STARTED.md` — install flow
- `docs/AGENT_GUIDE.md` — all 9 agents and their roles
- `CLAUDE.md` — connectors, policy system, license tiers

Key facts to absorb:
- **What it is:** Local-first Windows desktop AI app. 9 specialized agents. Tauri v2 (Rust) + React 18.
- **How it runs:** Ollama locally — no cloud dependency for core operations
- **v2.0.0 additions:** GitHub connector, Slack connector, Composio (1,000+ integrations), parallel execution
- **Architecture:** React frontend → TypeScript policy layer → Rust backend → SQLite
- **License:** BSL 1.1, converts to MIT at year 4
- **Built by:** Obsidian Media, Ontario, Canada
- **Stats:** 9 agents, 13 native connectors, 1,000+ via Composio, 1,015 tests passing, 124 services layer
- **Free to download. Always.**

### Repo 2 — The Current Marketing Site (understand what exists)
```
https://github.com/Thatisshayan/AlphonsoEcosystemMarketing
```
**Live site:** `https://thatisshayan.github.io/AlphonsoEcosystemMarketing/`
**Live deck:** `https://thatisshayan.github.io/AlphonsoEcosystemMarketing/deck/`
**Agent pages:** `https://thatisshayan.github.io/AlphonsoEcosystemMarketing/agents/?id=alphonso`

Read `index.html` top to bottom. Then open `agents/index.html`. Then visit the live site.

---

## STEP 2 — UNDERSTAND THE AGENT FAMILY (the brand's personality)

The 9 agents have a family backstory that is the creative core of this brand:

| Agent | Role | Relationship | Color |
|-------|------|-------------|-------|
| **Jose** | Orchestrator | The Dad | `#F5B535` gold |
| **Maria** | Governance | The Mom | `#B0B8C0` silver |
| **Alphonso** | Execution | Their Son — The Main Guy | `#00C8E0` cyan |
| **Miya** | Creative | Alphonso's Sister | `#B060FF` purple |
| **Marcus** | Distribution | Loud Cousin (Mom's side) | `#3ED464` green |
| **Hector** | Research | Shy Cousin (Dad's side) | `#52CBA0` teal |
| **Nova** | Intelligence | Neighbour's Kid — Echo's sibling | `#FFD040` amber |
| **Echo** | Memory | Nova's Sibling | `#60B8E8` blue |
| **Sentinel** | Security | Nova & Echo's Mom | `#FF6060` red |

**Existing mascot images** (in `assets/` folder):
- `jose.png`, `alphonso.png`, `miya.png`, `marcus.png`, `maria.png`, `hector.png` — real AI-generated alpaca character portraits
- `echo.svg`, `nova.svg`, `sentinel.svg` — SVG placeholders only. **These need real portraits.**
- Style reference: ultra-detailed 3D-rendered anthropomorphic alpaca characters, cinematic cyberpunk lighting, holographic UI elements related to their role

**To generate Echo, Nova, Sentinel portraits:** Use ChatGPT image generation (DALL-E) with one of the existing `miya.png` or `marcus.png` as style reference. These originals were generated in ChatGPT. Higgsfield model styles don't match.

---

## STEP 3 — HONEST ASSESSMENT: WHY IT'S A 4/10

The current site has the right bones but needs serious polish across every dimension.

### Visual Design (currently 3/10)
- Dark green palette is distinctive but underexecuted
- No depth, shadows, or layering. Feels flat.
- Typography is too uniform — hero type and body type are almost the same weight visually
- No glass effects, no premium material feel
- The hero image (`hero-crew.png`) is powerful but the layout around it is basic
- Sections bleed into each other without enough visual breathing room

### Animations & Interactivity (currently 2/10)
- Only basic scroll-reveal fade-ins
- No micro-interactions on hover
- No cursor effects
- No parallax
- Agent cards animate but feel cheap
- The terminal animation in privacy section is the only standout interactive element

### Hero Section (currently 4/10)
- Headline is good ("ONE ECOSYSTEM. INFINITE IMPACT.")
- The cycling agent names are clever
- BUT: too text-heavy, layout feels cluttered
- The crew image doesn't have enough visual treatment
- No live data (GitHub stars, forks, download count)
- "Free to download · Always" pill is small and easy to miss

### Agent Pages (currently 5/10)
- Stories are genuinely good and deep
- But the page layout is plain — it's just text with some colored boxes
- No visual drama on the hero sections for agents without real portraits
- The "Works With" section is tiny cards, not visually interesting
- No animation or delight in scrolling through a character's story

### Missing Sections (gap/10)
The following sections don't exist and should:
- **Live stats bar** — real GitHub stars/forks pulled via API
- **Interactive agent selector** — click an agent, the whole section transforms
- **Video section with context** — mission.mp4 exists but has no surrounding copy
- **Testimonials / use case stories** — zero social proof
- **Comparison section** — Alphonso vs cloud AI (the pitch writes itself)
- **Download flow** — the download CTA goes straight to GitHub releases, needs a proper landing step

### Mobile (currently 2/10)
- Was designed desktop-first and mobile was patched in
- Likely broken in multiple places
- Navigation collapses but with no hamburger menu
- Agent cards stack but look wrong

### Performance & SEO (currently 1/10)
- No OG image / meta tags for social sharing
- No structured data
- No lazy loading on images
- No image optimization
- Images could be WebP

---

## STEP 4 — PROPOSAL PHASE (do this before writing code)

Before touching any file, produce a written proposal covering:

1. **Visual direction** — Pick a specific design upgrade path. Options:
   - Keep dark green but add glassmorphism + depth layers
   - Go darker (near-black) with the lime as the only accent
   - Add a second accent colour for contrast

2. **Hero redesign** — How should the hero feel? What's the layout?

3. **Agent showcase** — Redesign how the 9 agents are presented on the main page

4. **Sections to add** — Which of the missing sections above to prioritise

5. **Animation plan** — What specific animations and where

6. **Mobile-first plan** — How you'll approach the responsive rebuild

7. **Missing mascots** — Plan to generate Echo, Nova, Sentinel

Post the proposal for Shayan to review before implementing. Get approval on direction before building.

---

## STEP 5 — IMPLEMENTATION RULES

```
1. DO NOT touch agents/index.html unless specifically asked
2. DO NOT change the family backstory or agent personalities
3. DO NOT remove the dark green (#060A07) as the base — it's brand
4. DO NOT add external dependencies that require npm (static site, no build step)
5. All fonts via Google Fonts CDN only
6. All animations via CSS or vanilla JS — no libraries unless from cdnjs.cloudflare.com
7. Keep the single-file architecture (index.html, agents/index.html, deck/index.html)
8. Images reference assets/ folder — don't move or rename existing assets
9. Test mobile at 390px width before committing anything
10. Commit message format: feat: [what changed], fix: [what was broken]
11. After every major change, push and share the live URL for review
```

---

## STEP 6 — ASSETS INVENTORY

```
assets/
├── favicon.png              ← site favicon
├── icon.png                 ← nav logo (square, dark bg)
├── logo-transparent.png     ← transparent bg version
├── logo.webp                ← logo webp
├── thumbnail.webp           ← card/og thumbnail
├── banner.webp              ← banner image
├── hero-crew.png            ← main hero image (the whole crew, 2.4MB)
├── hero-banner.png          ← secondary banner
├── hero-task.png            ← UI screenshot ("NEW TASK RECEIVED")
├── team-launch.png          ← team shot
├── cta-sunset.png           ← CTA section background (cinematic sunset)
├── mission.mp4              ← autoplay video (no audio)
├── jose.png                 ← Jose portrait (real AI art)
├── alphonso.png             ← Alphonso portrait (real AI art)
├── miya.png                 ← Miya portrait (real AI art)
├── marcus.png               ← Marcus portrait (real AI art)
├── maria.png                ← Maria portrait (real AI art)
├── hector.png               ← Hector portrait (real AI art, 301KB)
├── echo.svg                 ← Echo placeholder (SVG, needs replacement)
├── nova.svg                 ← Nova placeholder (SVG, needs replacement)
└── sentinel.svg             ← Sentinel placeholder (SVG, needs replacement)
```

---

## STEP 7 — WHAT A 10/10 LOOKS LIKE

Score each dimension independently. Target is 9+ across all:

| Dimension | Current | Target |
|-----------|---------|--------|
| Visual design & polish | 3 | 9 |
| Hero section impact | 4 | 9 |
| Animation & interactivity | 2 | 9 |
| Agent showcase | 5 | 9 |
| Agent individual pages | 5 | 9 |
| Mobile experience | 2 | 9 |
| Performance & SEO | 1 | 8 |
| Copy & messaging | 6 | 9 |
| Download conversion | 3 | 9 |
| Overall impression | 4 | 10 |

A 10/10 site makes someone who's never heard of Alphonso feel like:
> *"This is the most serious local AI project I've seen. I need to download this right now."*

---

## STEP 8 — QUICK CONTEXT ON SHAYAN

- Solo founder, Toronto. Moves fast, hates over-explanation.
- Wants execution, not commentary.
- Will say "yes" or "no" quickly — don't wait for perfect.
- Values: beautiful > functional > documented (in that order for marketing).
- Pushes back hard if something looks generic or templated.
- "Bring it to the next level" is the brief. Take creative risks.

---

## LINKS SUMMARY

| Resource | URL |
|----------|-----|
| Product repo | https://github.com/Thatisshayan/AlphonsoEcosystem |
| Marketing repo | https://github.com/Thatisshayan/AlphonsoEcosystemMarketing |
| Live site | https://thatisshayan.github.io/AlphonsoEcosystemMarketing/ |
| Agent pages | https://thatisshayan.github.io/AlphonsoEcosystemMarketing/agents/?id=alphonso |
| Pitch deck | https://thatisshayan.github.io/AlphonsoEcosystemMarketing/deck/ |
| Download | https://github.com/Thatisshayan/AlphonsoEcosystem/releases/tag/v2.0.0 |
| Obsidian Media | https://obsidianmedia.online |

---

*Handoff prepared by Claude (Anthropic) · June 2026*
