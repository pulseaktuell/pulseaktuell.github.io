/* Desktop-only progressive enhancements; mobile remains on its existing interaction model. */
(function(){
if(!window.matchMedia('(min-width: 900px)').matches)return;
const $=s=>document.querySelector(s),nav=$('#navbar'),controls=$('.controls');
if(!nav||!controls)return;
nav.classList.add('pulse-desktop-header');
const searchButton=document.createElement('button');
searchButton.type='button';searchButton.className='pulse-desktop-search';searchButton.setAttribute('aria-label','Suche öffnen');searchButton.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 5 5"/></svg><span>Suchen</span>';
const home=document.createElement('a');home.href='./index.html';home.className='pulse-desktop-navlink';home.textContent='Start';
const archive=document.createElement('a');archive.href='./archiv.html';archive.className='pulse-desktop-navlink';archive.textContent='Archiv';
nav.append(home,archive,searchButton);
const theme=document.createElement('button');theme.type='button';theme.className='pulse-desktop-theme';theme.textContent='Hell / Dunkel';theme.setAttribute('aria-label','Hell- und Dunkelmodus wechseln');nav.append(theme);
const density=document.createElement('button');density.type='button';density.className='pulse-desktop-density';density.textContent='Kompakt';density.setAttribute('aria-label','Darstellungsdichte wechseln');nav.append(density);
const style=document.createElement('style');style.textContent='@media(min-width:900px){.pulse-desktop-header{gap:12px}.pulse-desktop-navlink{color:var(--label2);font-size:13px;font-weight:750;text-decoration:none;padding:10px 12px;border-radius:8px}.pulse-desktop-navlink:hover{background:var(--fill);color:var(--label)}.pulse-desktop-search,.pulse-desktop-theme{display:flex;align-items:center;gap:8px;border:1px solid var(--sep);border-radius:9px;background:var(--card);color:var(--label);font:700 12px/1 system-ui;padding:10px 13px}.pulse-desktop-search{margin-left:auto}.pulse-desktop-search svg{width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round}.pulse-desktop-theme{margin-right:54px}.pulse-desktop-header>.pulse-settings-toggle{right:max(32px,calc((100vw - 1360px)/2))!important}.pulse-desktop-header .navtitle{flex:0 0 160px}.pulse-desktop-header .pulse-settings-toggle{top:50%!important}.pulse-search-closed .controls{display:none!important}.pulse-search-open .controls{display:flex!important;animation:pulseReveal .18s ease-out}.pulse-search-open .controls .seg{flex-wrap:wrap}@keyframes pulseReveal{from{opacity:0;transform:translateY(-5px)}to{opacity:1;transform:none}}.pulse-backtop{position:fixed;right:28px;bottom:90px;z-index:25;border:0;border-radius:50%;width:44px;height:44px;background:var(--card);color:var(--tint);box-shadow:0 3px 18px #0002,inset 0 0 0 1px var(--sep);font-size:22px;display:none}.pulse-backtop.visible{display:block}.pulse-shortcuts{position:fixed;z-index:60;inset:0;display:grid;place-items:center;background:#0009;backdrop-filter:blur(4px)}.pulse-shortcuts[hidden]{display:none}.pulse-shortcuts article{width:min(480px,90vw);padding:26px;border-radius:16px;background:var(--card);color:var(--label)}.pulse-shortcuts h2{margin-top:0}.pulse-shortcuts li{padding:5px 0}.pulse-shortcuts kbd{padding:3px 7px;border-radius:5px;background:var(--fill);font-weight:800}}';
document.head.appendChild(style);
document.body.classList.add('pulse-search-closed');
try{if(localStorage.getItem('pulse-density')==='compact')document.body.classList.add('pulse-compact')}catch{}
const syncDensity=()=>{const compact=document.body.classList.contains('pulse-compact');density.textContent=compact?'Normal':'Kompakt';density.setAttribute('aria-pressed',String(compact))};syncDensity();density.addEventListener('click',()=>{const compact=document.body.classList.toggle('pulse-compact');try{localStorage.setItem('pulse-density',compact?'compact':'normal')}catch{}syncDensity()});
searchButton.addEventListener('click',()=>{const open=document.body.classList.toggle('pulse-search-open');document.body.classList.toggle('pulse-search-closed',!open);searchButton.setAttribute('aria-expanded',String(open));searchButton.setAttribute('aria-label',open?'Suche schließen':'Suche öffnen');if(open)setTimeout(()=>$('#searchInput')?.focus(),40)});
theme.addEventListener('click',()=>{const root=document.documentElement;root.dataset.theme=root.dataset.theme==='dark'?'light':'dark';try{localStorage.setItem('pulse-theme',root.dataset.theme)}catch{}});
const back=document.createElement('button');back.className='pulse-backtop';back.type='button';back.textContent='↑';back.setAttribute('aria-label','Nach oben');document.body.appendChild(back);back.addEventListener('click',()=>window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'}));window.addEventListener('scroll',()=>back.classList.toggle('visible',window.scrollY>650),{passive:true});
const help=document.createElement('div');help.className='pulse-shortcuts';help.hidden=true;help.innerHTML='<article role="dialog" aria-modal="true" aria-label="Tastaturkürzel"><h2>Tastaturkürzel</h2><ul><li><kbd>/</kbd> Suche öffnen</li><li><kbd>Esc</kbd> Suche schließen oder Dialog beenden</li><li><kbd>T</kbd> Hell / Dunkel wechseln</li><li><kbd>↑</kbd> Nach oben</li><li><kbd>?</kbd> Diese Übersicht</li></ul><button type="button">Schließen</button></article>';document.body.appendChild(help);help.addEventListener('click',e=>{if(e.target===help||e.target.tagName==='BUTTON')help.hidden=true});
const sheetRoot=$('#sheetRoot');
if(sheetRoot){
 const enhanceSources=()=>{
  const sheet=sheetRoot.querySelector('.sheet:not(.supporter-sheet)');
  if(!sheet)return;
  const links=sheet.querySelector('.source-links');
  const heading=links?.previousElementSibling;
  if(!links||links.dataset.collapsible==='1'||!heading)return;
  const count=links.querySelectorAll('p').length;
  const details=document.createElement('details');details.className='pulse-source-details';
  const summary=document.createElement('summary');summary.textContent='Originalberichte anzeigen · '+count+' Quelle'+(count===1?'':'n');
  details.append(summary,links);heading.replaceWith(details);links.dataset.collapsible='1';
  const badges=sheet.querySelectorAll('.story-badge');
  badges.forEach(b=>{if(/Quelle/.test(b.textContent||''))b.textContent='Zusammengefasst aus '+count+' Quelle'+(count===1?'':'n')});
 };
 new MutationObserver(enhanceSources).observe(sheetRoot,{childList:true,subtree:true});
}
document.addEventListener('keydown',e=>{const tag=e.target?.tagName;if(tag==='INPUT'||tag==='TEXTAREA'||e.target?.isContentEditable)return;if(e.key==='/'){e.preventDefault();if(document.body.classList.contains('pulse-search-closed'))searchButton.click();else $('#searchInput')?.focus()}else if(e.key==='?'){help.hidden=!help.hidden}else if(e.key==='Escape'){help.hidden=true;if(document.body.classList.contains('pulse-search-open'))searchButton.click()}else if(e.key.toLowerCase()==='t'){theme.click()}else if(e.key.toLowerCase()==='d'){density.click()}else if(e.key==='ArrowUp'&&e.altKey){window.scrollTo({top:0,behavior:'smooth'})}});
})();