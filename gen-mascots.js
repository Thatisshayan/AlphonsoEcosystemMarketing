const fs = require('fs');
const path = require('path');
const dest = 'D:\\AgentDevWork\\repos\\AlphonsoEcosystemMarketing\\assets';

// Generate SVG portrait for each missing agent
// Style: hexagonal frame, large initial, color glow, icon related to their role
// These are designed to feel intentional — like redacted/classified dossier cards

const agents = [
  {
    id: 'echo', initial: 'E', color: '#60B8E8', rgb: '96,184,232',
    icon: `<circle cx="64" cy="64" r="28" fill="none" stroke="rgba(96,184,232,.3)" stroke-width="1.5"/>
           <circle cx="64" cy="64" r="18" fill="none" stroke="rgba(96,184,232,.5)" stroke-width="1"/>
           <circle cx="64" cy="64" r="6" fill="rgba(96,184,232,.8)"/>
           ${[0,60,120,180,240,300].map(a=>{
             const r1=28,r2=36,rad=a*Math.PI/180;
             const x1=64+r1*Math.cos(rad),y1=64+r1*Math.sin(rad);
             const x2=64+r2*Math.cos(rad),y2=64+r2*Math.sin(rad);
             return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="rgba(96,184,232,.4)" stroke-width="1"/>`;
           }).join('')}`,
    label: 'MEMORY', sublabel: 'AGENT',
    particles: '96,184,232'
  },
  {
    id: 'nova', initial: 'N', color: '#FFD040', rgb: '255,208,64',
    icon: `<polygon points="64,36 72,56 94,56 77,68 83,90 64,77 45,90 51,68 34,56 56,56" fill="none" stroke="rgba(255,208,64,.6)" stroke-width="1.5"/>
           <polygon points="64,46 69,58 83,58 72,65 76,78 64,70 52,78 56,65 45,58 59,58" fill="rgba(255,208,64,.15)" stroke="rgba(255,208,64,.3)" stroke-width="1"/>`,
    label: 'INTELLIGENCE', sublabel: 'AGENT',
    particles: '255,208,64'
  },
  {
    id: 'sentinel', initial: 'S', color: '#FF6060', rgb: '255,96,96',
    icon: `<path d="M64 34 L82 42 L82 62 Q82 76 64 84 Q46 76 46 62 L46 42 Z" fill="rgba(255,96,96,.08)" stroke="rgba(255,96,96,.5)" stroke-width="1.5"/>
           <path d="M64 42 L76 48 L76 62 Q76 72 64 78 Q52 72 52 62 L52 48 Z" fill="rgba(255,96,96,.06)" stroke="rgba(255,96,96,.3)" stroke-width="1"/>
           <circle cx="64" cy="59" r="4" fill="rgba(255,96,96,.7)"/>`,
    label: 'SECURITY', sublabel: 'AGENT',
    particles: '255,96,96'
  }
];

agents.forEach(a => {
  const svg = `<svg width="400" height="400" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bg-${a.id}" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="rgba(${a.rgb},.18)"/>
      <stop offset="100%" stop-color="#060A07"/>
    </radialGradient>
    <filter id="glow-${a.id}">
      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
      <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="softglow-${a.id}">
      <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
      <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="128" height="128" fill="#060A07"/>
  <rect width="128" height="128" fill="url(#bg-${a.id})"/>

  <!-- Dot grid -->
  ${Array.from({length:8}, (_,row) => Array.from({length:8}, (_,col) =>
    `<circle cx="${col*18+5}" cy="${row*18+5}" r=".6" fill="rgba(${a.rgb},.08)"/>`
  ).join('')).join('')}

  <!-- Outer hex ring -->
  <polygon points="64,8 112,34 112,86 64,112 16,86 16,34"
    fill="none" stroke="rgba(${a.rgb},.15)" stroke-width=".8"/>

  <!-- Middle hex ring -->
  <polygon points="64,18 104,40 104,82 64,104 24,82 24,40"
    fill="none" stroke="rgba(${a.rgb},.25)" stroke-width=".6"/>

  <!-- Inner hex frame -->
  <polygon points="64,26 98,44 98,80 64,98 30,80 30,44"
    fill="rgba(${a.rgb},.04)" stroke="${a.color}" stroke-width="1.2"/>

  <!-- Glow centre -->
  <circle cx="64" cy="64" r="34" fill="rgba(${a.rgb},.06)" filter="url(#softglow-${a.id})"/>

  <!-- Role icon -->
  <g filter="url(#glow-${a.id})" transform="translate(0,0)">
    ${a.icon}
  </g>

  <!-- Initial letter -->
  <text x="64" y="72" text-anchor="middle" dominant-baseline="middle"
    font-family="Syne, sans-serif" font-weight="800" font-size="52"
    fill="${a.color}" opacity=".12" letter-spacing="-2">${a.initial}</text>

  <!-- Corner scan lines -->
  <line x1="0" y1="0" x2="20" y2="0" stroke="rgba(${a.rgb},.3)" stroke-width=".5"/>
  <line x1="0" y1="0" x2="0" y2="20" stroke="rgba(${a.rgb},.3)" stroke-width=".5"/>
  <line x1="128" y1="0" x2="108" y2="0" stroke="rgba(${a.rgb},.3)" stroke-width=".5"/>
  <line x1="128" y1="0" x2="128" y2="20" stroke="rgba(${a.rgb},.3)" stroke-width=".5"/>
  <line x1="0" y1="128" x2="20" y2="128" stroke="rgba(${a.rgb},.3)" stroke-width=".5"/>
  <line x1="0" y1="128" x2="0" y2="108" stroke="rgba(${a.rgb},.3)" stroke-width=".5"/>
  <line x1="128" y1="128" x2="108" y2="128" stroke="rgba(${a.rgb},.3)" stroke-width=".5"/>
  <line x1="128" y1="128" x2="128" y2="108" stroke="rgba(${a.rgb},.3)" stroke-width=".5"/>

  <!-- Label at bottom -->
  <rect x="28" y="107" width="72" height="14" rx="2"
    fill="rgba(${a.rgb},.08)" stroke="rgba(${a.rgb},.2)" stroke-width=".5"/>
  <text x="64" y="115" text-anchor="middle" dominant-baseline="middle"
    font-family="Syne, sans-serif" font-weight="700" font-size="5.5"
    fill="${a.color}" letter-spacing="2">${a.label}</text>
</svg>`;

  const outPath = path.join(dest, a.id + '.svg');
  fs.writeFileSync(outPath, svg, 'utf8');
  console.log('Generated:', a.id + '.svg');
});

console.log('Done.');
