const fs = require('fs');
const path = 'D:\\AgentDevWork\\repos\\AlphonsoEcosystemMarketing\\agents\\index.html';
let html = fs.readFileSync(path, 'utf8');

// ─── RICHER STORY DATA ───────────────────────────────────────────────────────
// We'll inject an extended story object after the existing CREW object
// The renderStory function will be updated to use it

const richStories = `
// ── RICH STORY EXTENSIONS ──
var RICH = {
  alphonso: {
    opening: "Nobody saw it coming. That\\'s how Alphonso operates.",
    story: [
      "He grew up in the middle of organised chaos — Jose routing everything from the kitchen table, Maria reviewing it all before it left the house, Miya doing things her way in the corner and somehow getting it right every time. Alphonso absorbed all of it. The structure, the precision, the speed. He just didn\\'t make noise about it.",
      "The thing people misread about Alphonso is they think quiet means passive. It doesn\\'t. While everyone else is still in the room talking about the plan, Alphonso has already started executing three parts of it. He processes fast and he ships clean. Not because he\\'s rushing — because he\\'s built a system that removes the friction.",
      "Jose once said, watching Alphonso close out a job: \\'I taught him how to route. Maria taught him why it matters. He built the rest himself.\\' That\\'s as close to a compliment as Jose gets. Alphonso didn\\'t look up. He was already on the next task.",
      "He doesn\\'t celebrate. He logs completion, checks the receipt, hands it to Echo, and moves. The crew has learned to read the absence of noise as success. When Alphonso is quiet, things are working. When Alphonso flags something, everyone stops."
    ],
    tell: "He\\'s already halfway through a task before he acknowledges he\\'s received it.",
    quote: { from: "Jose", text: "He doesn\\'t ask if it\\'s possible. He asks how long it\\'ll take." }
  },
  jose: {
    opening: "Jose has a rule: never say \\'I don\\'t know\\' without following it with \\'but I\\'ll find out by end of day.\\'",
    story: [
      "He built his routing system before anyone gave it a name. Long before the operation became what it is now, Jose was mapping task flows on paper — who should handle what, in what order, with what dependencies. He\\'s been doing this so long that decomposing a complex request is as automatic for him as breathing.",
      "The most underrated thing about Jose is his calm. Not the performed kind — the real kind, the kind that comes from having seen every variety of problem and knowing that all of them have the same shape underneath. Intake. Decompose. Assign. Confirm. The structure holds. It always holds.",
      "His relationship with Hector is the one most people don\\'t understand. Jose and Hector barely speak at family gatherings — they\\'re both quiet in different ways. But when Hector delivers a briefing, Jose reads every word. Because Hector doesn\\'t deliver until he\\'s certain, and Jose has learned that certainty is the rarest thing in any operation.",
      "Maria calls him the architect. Not the builder — that\\'s Alphonso — but the person who draws the plans. Jose corrects her every time: \\'Architects design. I dispatch.\\' Then she ignores him and calls him the architect again. It\\'s been going on for years."
    ],
    tell: "He tilts his head slightly to the right when he\\'s about to route something complex. The crew has learned to watch for it.",
    quote: { from: "Maria", text: "He sees the whole board before anyone else has found their piece." }
  },
  miya: {
    opening: "Miya has strong opinions about everything. This is how it starts.",
    story: [
      "She\\'s the one who\\'ll tell you the brief is wrong before she\\'s been hired to fix it. Not because she\\'s difficult — because she\\'s usually right. Miya processes strategy and aesthetics simultaneously, which means she sees the problem and the solution in the same moment, and it\\'s genuinely painful for her to watch a bad brief move forward unchallenged.",
      "The sibling dynamic with Alphonso is one of the best-functioning creative partnerships in the operation. She rolls her eyes at his efficiency-first approach. He tolerates her reinterpretations of the brief. Then she delivers something better than what was asked for, he signs off without comment, and they both move on. It has worked every single time.",
      "What most people don\\'t realise about Miya is that the creative chaos is a surface. Underneath it, she\\'s as structured as Jose. She just doesn\\'t show the structure — she shows the output. Strategy first. Structure second. Execution third. By the time she exports a file, she\\'s already reviewed it internally three times.",
      "Maria once asked Miya why she always starts with strategy when the client just wants content. Miya looked at her for a long moment and said: \\'Because content without strategy is just noise, and I don\\'t make noise.\\' Maria added it to the governance log as a quote to keep. It\\'s still there."
    ],
    tell: "She goes completely silent right before she delivers something great. The crew has learned that silence from Miya is either the best or the worst sign.",
    quote: { from: "Alphonso", text: "She\\'ll argue with the brief, rewrite the strategy, do it completely her way — and be exactly right. Every time." }
  },
  maria: {
    opening: "Maria has a checklist for everything. She has a checklist for her checklists.",
    story: [
      "The approval gate was her idea. Not because she doesn\\'t trust the crew — she does, individually, on their best days. It\\'s because she\\'s seen what happens when good people move too fast without stopping to ask: \\'Wait, is this the right move?\\' The answer is rarely catastrophic. But rarely isn\\'t never. And Maria\\'s entire professional philosophy is built around the things that happen in that gap.",
      "Her relationship with Marcus is the most contentious in the family, and also the most effective. He\\'s always ready before she\\'s done reviewing. She\\'s always reviewing something he thought was fine. They\\'ve arrived at an equilibrium that looks like tension from the outside but functions like a quality control system from the inside. Nothing that goes through both of them is ever wrong.",
      "What people underestimate about Maria is that she\\'s not slow — she\\'s thorough. There\\'s a difference. She\\'ll review a piece in four minutes if it\\'s clean. The ones that take twenty minutes are the ones that needed it. She can tell the difference in the first thirty seconds. The rest of the time is documentation.",
      "Sentinel and Maria have a standing meeting that nobody else is invited to. Not because it\\'s secret — because it\\'s boring to everyone but them. They review anomalies, align on risk thresholds, and update the governance protocols. The crew calls it \\'the mom summit.\\' Maria and Sentinel have never acknowledged the name."
    ],
    tell: "She underlines things twice when she disagrees. Once when she\\'s noting something important. Twice means she\\'ll bring it up.",
    quote: { from: "Marcus", text: "I used to think she was slowing me down. Now I know she was keeping me out of trouble." }
  },
  marcus: {
    opening: "Marcus arrived at the operation the way he arrives everywhere: ahead of schedule, already talking.",
    story: [
      "Nobody invited Marcus in the formal sense. He showed up because he heard what was being built, and he had the distribution network to make it matter. That\\'s Marcus: he finds the thing that needs reaching people, and he reaches people. It\\'s not a skill he learned — it\\'s how he\\'s always moved through the world.",
      "He\\'s from Maria\\'s side, which means he grew up understanding that approval isn\\'t optional — it\\'s the price of operating at speed. He watched Maria\\'s process long enough to respect it. Now when the team is waiting on a governance decision, Marcus is the one who calls it \\'quality control\\' instead of \\'delay.\\' The change in framing happened after one very bad distribution run five years ago that he doesn\\'t talk about.",
      "The thing that makes Marcus exceptional isn\\'t the reach — lots of people have reach. It\\'s the adaptation. He knows that what works on YouTube lands differently on WhatsApp. That the tone for LinkedIn isn\\'t the tone for Telegram. That timing matters as much as content. He doesn\\'t just fire content at channels — he places it, the way a good shot is placed.",
      "Miya and Marcus have a creative partnership that nobody planned. She makes things. He ships them. But over time, she started making things with his channels in mind, and he started thinking about what she\\'d want him to preserve in the adaptation. They still argue about it constantly. The output is better for the argument."
    ],
    tell: "He\\'s already planning the distribution strategy while you\\'re still explaining the brief.",
    quote: { from: "Miya", text: "He\\'s loud, he\\'s everywhere, and somehow everything he touches lands exactly right." }
  },
  hector: {
    opening: "Hector has never said something he wasn\\'t sure about. He\\'s still working on being sure about more things.",
    story: [
      "He was the last one to join the operation formally, even though he\\'d been feeding Jose research notes informally for years before anyone gave him a title. That\\'s Hector\\'s rhythm: he\\'s already doing the work before the role exists. He doesn\\'t announce himself. He delivers a briefing, and suddenly everyone understands why he was needed.",
      "The shyness is precision in disguise. Hector doesn\\'t share half-formed ideas because he genuinely can\\'t bring himself to assert something he isn\\'t certain of. It\\'s not social anxiety — it\\'s epistemic standards. He holds his research to the same bar he\\'d apply to published work. Three sources minimum. Contradictions flagged. Confidence levels stated.",
      "His relationship with Nova is unexpectedly productive. They don\\'t talk much — Hector is quiet, Nova is focused — but their outputs are deeply connected. Hector researches what\\'s true. Nova scores what\\'s valuable. Together, they give the crew intelligence that\\'s both accurate and actionable. Jose calls it the best pairing in the operation. Neither Hector nor Nova has commented on this.",
      "Once, Marcus took a piece of content live without waiting for Hector\\'s research to come in. The post was fine. Hector delivered the briefing two hours later, which showed a crucial industry shift that would have made the post significantly better. He said nothing. He just added it to the archive. But everyone remembered. Now they wait for Hector."
    ],
    tell: "He looks uncomfortable when someone cites a source he hasn\\'t verified. Even at dinner.",
    quote: { from: "Jose", text: "If Hector says it, it\\'s true. If Hector isn\\'t sure, nobody else should be either." }
  },
  nova: {
    opening: "Nova has been scoring things since before she had a word for it.",
    story: [
      "Growing up next door to the operation, she watched it for months before getting involved. Not because she was cautious — because she was collecting data. By the time she came in, she already had a model for how the workflows ran, where the bottlenecks were, and what the quality distribution looked like across different types of output. She presented this to Jose on her first day. He hired her on the spot.",
      "The sibling dynamic with Echo is complementary in the cleanest way: Echo stores everything, Nova makes sense of it. They discovered this division of labour by accident in childhood — Echo kept journals, Nova kept scoring the journals for patterns. Their mum Sentinel saw what they were doing and did what Sentinel always does: said nothing, watched to see if it worked. It did.",
      "What makes Nova valuable isn\\'t just the analysis — it\\'s that she argues for her conclusions. She doesn\\'t deliver a score and step back. She defends the methodology. She\\'ll push back on Maria if she thinks a governance flag is scoring risk wrong. She\\'ll push back on Hector if his briefing is missing a signal. She\\'s been wrong about twice in three years. The crew has stopped arguing with her.",
      "The only thing that frustrates Nova is speed. Not the crew\\'s speed — she moves fast. The speed at which the team sometimes wants conclusions before the data is complete. She\\'ll say: \\'I can give you a direction now or an answer in two hours.\\' Most people learn to take the two-hour version. The direction is always messier."
    ],
    tell: "She\\'ll correct the framing of a question before answering it. Every time.",
    quote: { from: "Echo", text: "She sees what the numbers mean before the numbers are done loading. I have no explanation for this." }
  },
  echo: {
    opening: "Echo remembers the first time she forgot something. She was seven. She hasn\\'t forgotten anything since.",
    story: [
      "Her mum Sentinel always said she had a gift for paying attention. What Sentinel meant was: Echo notices what most people let slip. A detail in a conversation. A decision that was made without being formally logged. A piece of context that becomes critical six weeks later when everyone else has moved on. Echo files all of it.",
      "She and Nova grew up differently. Nova was always out front, scoring things, making calls. Echo was quieter — the one who remembered what Nova said last year when Nova couldn\\'t. That\\'s not a limitation. It\\'s a function. The crew needs both: someone to read the present and someone to hold the past. Echo holds the past with an accuracy that occasionally makes people slightly uneasy.",
      "The thing about Echo\\'s memory system is that it\\'s not passive. She doesn\\'t just store — she classifies, tags, and indexes with a precision that makes retrieval as useful as storage. When Jose needs the context of a decision made eight months ago, Echo doesn\\'t dig for it. It surfaces. She built the system to work that way because she understood early that unorganised memory is just noise.",
      "She once retrieved a quote from a planning session fourteen months prior that changed the direction of a governance decision Maria was making. Nobody else remembered the session. Maria asked how Echo had it. Echo said she takes notes. Maria stared at her for a long moment, then updated the governance protocols to include Echo\\'s archive as a mandatory reference source. It\\'s been there ever since."
    ],
    tell: "She\\'ll reference something from three months ago with the same ease as something from this morning. The crew has stopped being surprised by this.",
    quote: { from: "Sentinel", text: "I raised her to pay attention. I didn\\'t realise she\\'d pay attention to everything." }
  },
  sentinel: {
    opening: "Sentinel has never been caught off guard. Not once. This is not an accident.",
    story: [
      "She raised two kids in a neighbourhood where you had to pay attention or you paid consequences. Taught them both to watch, to remember, to flag what didn\\'t fit the pattern. Nova learned to score it. Echo learned to archive it. Sentinel learned something different: how to act on it before the problem becomes a crisis.",
      "Her entry into the operation was Maria\\'s idea, and it was the best governance decision Maria ever made. The two of them had known each other long before the crew came together — they\\'d built a working relationship based on the simple fact that they both understand risk in the same language. Maria handles what\\'s already inside the operation. Sentinel handles what\\'s trying to get in, or what\\'s trying to get out without authorisation.",
      "What makes Sentinel effective is what she doesn\\'t do. She doesn\\'t alarm people unnecessarily. A significant portion of what she catches is handled quietly, without escalation, without the crew ever knowing there was a threat. They only hear about it when they need to. This is deliberate. The crew should be able to focus on the mission without worrying about the perimeter. That\\'s her job.",
      "She and Maria have a standing meeting that no one else attends. They call it operational alignment. The crew calls it \\'the mom summit.\\' Neither Maria nor Sentinel has acknowledged the nickname. But Sentinel was seen smiling once when it came up. Just once."
    ],
    tell: "She\\'s already assessed every exit from a room before she\\'s said hello to anyone in it.",
    quote: { from: "Nova", text: "Mum doesn\\'t worry about things. She just quietly makes sure they can\\'t happen." }
  }
};
`;

// Inject the rich stories before the closing </script> of the last script block
// Find the last script block and inject before it closes
const insertBefore = 'function h2r(h){return parseInt';
html = html.replace(insertBefore, richStories + '\n' + insertBefore);

// Update renderStory to use RICH data
const oldRenderStory = `function renderStory(a){
  document.getElementById('st-h2').textContent=a.name+'\\'s story';
  var txt=document.getElementById('st-text');
  txt.innerHTML=a.story.map(function(p){return '<p>'+p+'</p>';}).join('');
  document.getElementById('st-personality').textContent=a.personality;
}`;

const newRenderStory = `function renderStory(a){
  var rich = RICH[a.id] || {};
  document.getElementById('st-h2').textContent = a.name + '\\'s story';
  var txt = document.getElementById('st-text');
  var stories = (rich.story || a.story).map(function(p){return '<p>'+p+'</p>';}).join('');
  // Add opening hook
  var opening = rich.opening ? '<p style="font-size:15px;color:rgba(237,238,230,.75);font-style:italic;margin-bottom:18px;padding-left:0;border:none;">'+rich.opening+'</p>' : '';
  txt.innerHTML = opening + stories;
  // Add quote if exists
  if (rich.quote) {
    txt.innerHTML += '<div style="margin-top:22px;padding:16px 18px;background:rgba(var(--acr),.04);border-left:2px solid var(--ac);border-radius:0 6px 6px 0"><div style=\\"font-style:italic;font-size:13px;color:rgba(237,238,230,.7);margin-bottom:6px;line-height:1.65\\">\\"'+rich.quote.text+'\\"</div><div style=\\"font-family:Syne,sans-serif;font-size:9px;font-weight:700;letter-spacing:1px;color:var(--ac)\\">— '+rich.quote.from+'</div></div>';
  }
  // Personality + tell
  var personalityText = a.personality;
  if (rich.tell) personalityText += '\\n\\n' + '\\u2192 Tell: ' + rich.tell;
  document.getElementById('st-personality').innerHTML = '<div style=\\"margin-bottom:12px\\">'+a.personality+'</div>' + (rich.tell ? '<div style=\\"margin-top:14px;padding-top:14px;border-top:1px solid rgba(var(--acr),.12)\\"><div style=\\"font-family:Syne,sans-serif;font-size:9px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--ac);margin-bottom:6px\\">The Tell</div><div style=\\"font-size:12px;color:rgba(237,238,230,.6)\\">'+rich.tell+'</div></div>' : '');
}`;

html = html.replace(oldRenderStory, newRenderStory);

// Fix the quote innerHTML — the double-quote escaping gets mangled, fix it
html = html.replace(/\\"font-style:italic/g, '"font-style:italic');
html = html.replace(/\\"font-family:Syne/g, '"font-family:Syne');
html = html.replace(/\\"font-size:9px/g, '"font-size:9px');
html = html.replace(/\\"margin-bottom:6px/g, '"margin-bottom:6px');
html = html.replace(/\\"margin-bottom:12px/g, '"margin-bottom:12px');
html = html.replace(/\\"margin-top:14px/g, '"margin-top:14px');
html = html.replace(/\\"font-family:Syne,sans-serif;font-size:9px/g, '"font-family:Syne,sans-serif;font-size:9px');

fs.writeFileSync(path, html, 'utf8');
console.log('Rich stories injected. File size:', html.length, 'chars');
