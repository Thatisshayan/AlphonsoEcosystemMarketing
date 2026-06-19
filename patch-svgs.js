const fs = require('fs');

// Update agents/index.html — point Echo/Nova/Sentinel to their SVG portraits
let agentsHtml = fs.readFileSync('D:\\AgentDevWork\\repos\\AlphonsoEcosystemMarketing\\agents\\index.html', 'utf8');

// Fix image paths for the three agents with SVG portraits
agentsHtml = agentsHtml.replace(
  "img:'../assets/hero-crew.png',\n    tagline:'\"The numbers tell the story",
  "img:'../assets/nova.svg',\n    tagline:'\"The numbers tell the story"
);
agentsHtml = agentsHtml.replace(
  "img:'../assets/hero-crew.png',\n    tagline:'\"Everything remembered",
  "img:'../assets/echo.svg',\n    tagline:'\"Everything remembered"
);
agentsHtml = agentsHtml.replace(
  "img:'../assets/hero-crew.png',\n    tagline:'\"I don\\'t make noise",
  "img:'../assets/sentinel.svg',\n    tagline:'\"I don\\'t make noise"
);

// Also update the fallback check — SVGs should be treated as real images, not fallbacks
agentsHtml = agentsHtml.replace(
  "if(a.img&&!a.img.includes('hero-crew')){",
  "if(a.img&&(a.img.endsWith('.png')||a.img.endsWith('.webp')||a.img.endsWith('.svg'))){"
);
agentsHtml = agentsHtml.replace(
  "var imgEl=w.img&&!w.img.includes('hero-crew')",
  "var imgEl=w.img&&(w.img.endsWith('.png')||w.img.endsWith('.webp')||w.img.endsWith('.svg'))"
);

fs.writeFileSync('D:\\AgentDevWork\\repos\\AlphonsoEcosystemMarketing\\agents\\index.html', agentsHtml, 'utf8');
console.log('Agents page patched for SVG portraits');

// Update main index.html — support row to show SVG avatar images
let mainHtml = fs.readFileSync('D:\\AgentDevWork\\repos\\AlphonsoEcosystemMarketing\\index.html', 'utf8');

// Update support chips to include images
const oldSupportRow = "var sr=document.getElementById('sr');\n  SUPP.forEach(function(s){var ch=document.createElement('div');ch.className='sc3';ch.innerHTML='<span class=\"sdot\" style=\"background:'+s.c+';box-shadow:0 0 5px '+s.c+'\"></span><div><div style=\"font-family:Syne,sans-serif;font-weight:700;font-size:11px;color:'+s.c+'\">'+s.n+'</div><div style=\"font-size:9px;color:var(--dim)\">'+s.t+'</div></div>';sr.appendChild(ch);});";

const newSupportRow = "var sr=document.getElementById('sr');\n  SUPP.forEach(function(s){var ch=document.createElement('div');ch.className='sc3';ch.style.cursor='pointer';\n    var imgOrDot=s.img?'<img src=\"'+s.img+'\" style=\"width:24px;height:24px;border-radius:50%;border:1px solid rgba('+s.rgb+',.35);object-fit:cover;object-position:center;flex-shrink:0\">':'<span class=\"sdot\" style=\"background:'+s.c+';box-shadow:0 0 5px '+s.c+'\"></span>';\n    ch.innerHTML=imgOrDot+'<div><div style=\"font-family:Syne,sans-serif;font-weight:700;font-size:11px;color:'+s.c+'\">'+s.n+'</div><div style=\"font-size:9px;color:var(--dim)\">'+s.t+'</div></div>';\n    ch.onclick=function(){window.location.href='agents/?id='+s.id;};\n    sr.appendChild(ch);\n  });";

mainHtml = mainHtml.replace(oldSupportRow, newSupportRow);

// Update SUPP array to include ids, imgs, and rgb values
mainHtml = mainHtml.replace(
  "var SUPP=[{n:'Hector',t:'Research Agent',c:'#52CBA0'},{n:'Echo',t:'Memory Agent',c:'#60B8E8'},{n:'Sentinel',t:'Security Agent',c:'#FF6060'},{n:'Nova',t:'Intelligence Agent',c:'#FFD040'}];",
  "var SUPP=[{id:'hector',n:'Hector',t:'Research Agent',c:'#52CBA0',rgb:'82,203,160',img:'assets/hector.png'},{id:'echo',n:'Echo',t:'Memory Agent',c:'#60B8E8',rgb:'96,184,232',img:'assets/echo.svg'},{id:'sentinel',n:'Sentinel',t:'Security Agent',c:'#FF6060',rgb:'255,96,96',img:'assets/sentinel.svg'},{id:'nova',n:'Nova',t:'Intelligence Agent',c:'#FFD040',rgb:'255,208,64',img:'assets/nova.svg'}];"
);

fs.writeFileSync('D:\\AgentDevWork\\repos\\AlphonsoEcosystemMarketing\\index.html', mainHtml, 'utf8');
console.log('Main page patched — support row now has images and links');
