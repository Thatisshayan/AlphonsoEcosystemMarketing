const fs = require('fs');
const path = 'D:\\AgentDevWork\\repos\\AlphonsoEcosystemMarketing\\index.html';
let html = fs.readFileSync(path, 'utf8');

// 1. Make agent cards clickable + add "Meet X ->" link
html = html.replace(
  "c.style.transitionDelay=(i*.05)+'s';",
  "c.style.transitionDelay=(i*.05)+'s';c.style.cursor='pointer';"
);
html = html.replace(
  "'</div><div class=\"adesc\">'+a.desc+'</div></div>';",
  "'</div><div class=\"adesc\">'+a.desc+'</div><div style=\"margin-top:8px;font-family:Syne,sans-serif;font-size:9px;font-weight:700;color:'+a.color+';letter-spacing:.5px;opacity:.7\">Meet '+a.name+' \\u2192</div></div>';"
);
// Fallback pattern
html = html.replace(
  "'<div class=\"ad\">'+a.desc+'</div></div>';",
  "'<div class=\"ad\">'+a.desc+'</div><div style=\"margin-top:8px;font-family:Syne,sans-serif;font-size:9px;font-weight:700;color:'+a.color+';letter-spacing:.5px;opacity:.7\">Meet '+a.name+' \\u2192</div></div>';"
);

// 2. Add click handler after mouseleave listener
html = html.replace(
  "c.addEventListener('click',function(){window.location.href='agents/?id='+a.id;});",
  "// already there"
);
// Add click handler before mouseenter if not there
if (!html.includes("window.location.href='agents/?id='")) {
  html = html.replace(
    "c.addEventListener('mouseenter',function(){",
    "c.addEventListener('click',function(){window.location.href='agents/?id='+a.id;});\n    c.addEventListener('mouseenter',function(){"
  );
}

// 3. Update hero secondary CTA from "View on GitHub" to "Read Ground Truth"  
html = html.replace(
  '<a href="https://github.com/Thatisshayan/AlphonsoEcosystem" target="_blank" rel="noopener" class="bg2">View on GitHub</a>',
  '<a href="https://github.com/Thatisshayan/AlphonsoEcosystem/blob/main/docs/ALPHONSO_GROUND_TRUTH.md" target="_blank" rel="noopener" class="bg2">Read Ground Truth</a>'
);

// 4. Add "Meet the crew" link to agents section heading
html = html.replace(
  '<h2 class="sh2">Meet the Agents of Alphonso</h2>',
  '<h2 class="sh2">Meet the Agents of Alphonso</h2>'
);

fs.writeFileSync(path, html, 'utf8');
console.log('Done. File size:', html.length, 'chars');
