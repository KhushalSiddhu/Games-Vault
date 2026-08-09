const $=s=>document.querySelector(s);
function esc(s){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));}
function card(g){return `<a class="game-card" href="game.html?id=${encodeURIComponent(g.id)}" style="--accent:${g.accent};--dark:${g.dark}">
<div class="game-art"><div class="art-glow"></div><span class="game-icon">${g.icon}</span><span class="year">${g.year}</span></div>
<div class="card-info"><small>${esc(g.genres[0])}</small><h3>${esc(g.title)}</h3><p>${esc(g.developer)}</p></div></a>`}
function initHome(){
 const grid=$("#gameGrid"), search=$("#search"), filters=$("#filters"), empty=$("#empty");
 if(!grid)return;
 const genres=["All",...new Set(GAMES.flatMap(g=>g.genres))]; let active="All";
 filters.innerHTML=genres.map(x=>`<button class="${x==="All"?"selected":""}" data-filter="${esc(x)}">${esc(x)}</button>`).join("");
 function render(){let q=(search.value||"").toLowerCase().trim();let list=GAMES.filter(g=>(active==="All"||g.genres.includes(active))&&(g.title+" "+g.developer+" "+g.genres.join(" ")).toLowerCase().includes(q));grid.innerHTML=list.map(card).join("");empty.classList.toggle("hidden",list.length>0);}
 search.addEventListener("input",render); filters.addEventListener("click",e=>{if(e.target.tagName!=="BUTTON")return;active=e.target.dataset.filter;filters.querySelectorAll("button").forEach(b=>b.classList.toggle("selected",b===e.target));render()});render();
}
function initGame(){
 const root=$("#gamePage");if(!root)return;
 const id=new URLSearchParams(location.search).get("id"); const g=GAMES.find(x=>x.id===id)||GAMES[0];
 document.title=g.title+" | Top Games";
 root.innerHTML=`<section class="game-hero" style="--accent:${g.accent};--dark:${g.dark}">
<div class="game-hero-inner"><a class="back" href="index.html#games">← Back to games</a><div class="big-icon">${g.icon}</div><p class="eyebrow">${g.year} • ${esc(g.genres.join(" • "))}</p><h1>${esc(g.title)}</h1><p class="lead">${esc(g.description)}</p></div></section>
<section class="details"><div class="info-card"><h2>🎮 Game Details</h2><div class="facts"><div><b>Release</b><span>${g.year}</span></div><div><b>Developer</b><span>${esc(g.developer)}</span></div><div><b>Publisher</b><span>${esc(g.publisher)}</span></div><div><b>Platforms</b><span>${esc(g.platforms.join(", "))}</span></div></div></div>
<div class="info-card"><h2>📖 Story / About</h2><p>${esc(g.story)}</p></div><div class="info-card"><h2>🏷️ Genres</h2><div class="tags">${g.genres.map(x=>`<span>${esc(x)}</span>`).join("")}</div></div></section>`;
}
initHome();initGame();if("serviceWorker"in navigator)navigator.serviceWorker.register("sw.js");