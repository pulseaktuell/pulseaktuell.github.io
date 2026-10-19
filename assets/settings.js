(function(){
'use strict';
const root=document.documentElement;
const themeKey='pulse-theme';

function setup(){
  let button=document.getElementById('settingsToggle')||document.querySelector('.theme');
  if(!button)return;

  button.id='settingsToggle';
  button.type='button';
  button.classList.add('pulse-settings-toggle');
  button.setAttribute('aria-label','Einstellungen');
  button.setAttribute('aria-expanded','false');
  button.title='Einstellungen';
  button.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.7 1.7-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5v.2h-2.4v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1-1.5l-.1.1L8 17l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H6.7v-2.4h.2a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9L8 8.6l1.7-1.7.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5v-.2h2.4v.2a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.7 1.7-.1.1a1.7 1.7 0 0 0 .3 1.9 1.7 1.7 0 0 0 1.5 1h.2v2.4h-.2a1.7 1.7 0 0 0-1.5 1Z"/></svg>';

  let panel=document.getElementById('settingsPanel');
  if(!panel){
    panel=document.createElement('div');
    panel.id='settingsPanel';
    panel.className='pulse-settings-panel';
    panel.hidden=true;
    panel.innerHTML='<div class="pulse-settings-title">Einstellungen</div><div class="pulse-settings-row"><span>Darstellung</span><button type="button" data-theme-toggle></button></div><div class="pulse-settings-row"><span>Barrierefreiheit</span><div class="pulse-settings-actions"><button type="button" data-font-toggle>Größere Schrift</button><button type="button" data-motion-toggle>Animationen aus</button></div></div><div class="pulse-settings-section"><div class="pulse-settings-section-title">Sonstiges</div><nav class="pulse-settings-links" aria-label="Weitere Bereiche"><a href="./impressum.html">Impressum</a><a href="./quellen.html">Quellen</a><a href="./arbeitsweise.html">Arbeitsweise</a><a href="./erklaert.html">Pulse erklärt</a><a href="./datenschutz.html">Datenschutz</a></nav></div>'
    const header=button.closest('header');
    if(header&&header.parentNode) header.parentNode.insertBefore(panel,header.nextSibling);
    else document.body.prepend(panel);
  }

  function updateTheme(){
    const saved=localStorage.getItem(themeKey);
    if(saved==='light'||saved==='dark') root.dataset.theme=saved;
    const themeButton=panel.querySelector('[data-theme-toggle]');
    if(themeButton) themeButton.textContent=root.dataset.theme==='dark'?'Helles Design':'Dunkles Design';
  }

  button.onclick=function(e){
    e.preventDefault();
    e.stopPropagation();
    panel.hidden=!panel.hidden;
    button.setAttribute('aria-expanded',String(!panel.hidden));
    if(window.matchMedia('(max-width: 680px)').matches){
      window.scrollTo({top:0,behavior:'smooth'});
    }
  };

  const themeButton=panel.querySelector('[data-theme-toggle]');
  themeButton.onclick=function(){
    root.dataset.theme=root.dataset.theme==='dark'?'light':'dark';
    localStorage.setItem(themeKey,root.dataset.theme);
    updateTheme();
  };

  const fontButton=panel.querySelector('[data-font-toggle]');
  if(localStorage.getItem('pulse-large-text')==='1'){
    document.body.classList.add('pulse-large-text');
    fontButton.textContent='Normale Schrift';
  }
  fontButton.onclick=function(){
    const on=document.body.classList.toggle('pulse-large-text');
    localStorage.setItem('pulse-large-text',on?'1':'0');
    fontButton.textContent=on?'Normale Schrift':'Größere Schrift';
  };

  const motionButton=panel.querySelector('[data-motion-toggle]');
  const motionKey='pulse-reduce-motion';
  if(localStorage.getItem(motionKey)==='1'){
    document.body.classList.add('pulse-reduce-motion');
    motionButton.textContent='Animationen an';
  }
  motionButton.onclick=function(){
    const on=document.body.classList.toggle('pulse-reduce-motion');
    localStorage.setItem(motionKey,on?'1':'0');
    motionButton.textContent=on?'Animationen an':'Animationen aus';
  };

  // Sonstiges in jeder Variante des Einstellungsmenüs ergänzen.
  if(!panel.querySelector('.pulse-settings-section')){
    const section=document.createElement('div');
    section.className='pulse-settings-section';
    section.innerHTML='<div class="pulse-settings-section-title">Sonstiges</div><nav class="pulse-settings-links" aria-label="Weitere Bereiche"><a href="./impressum.html">Impressum</a><a href="./quellen.html">Quellen</a><a href="./arbeitsweise.html">Arbeitsweise</a><a href="./erklaert.html">Pulse erklärt</a><a href="./datenschutz.html">Datenschutz</a></nav>';
    panel.appendChild(section);
  }

  updateTheme();

  // Einheitlicher Footer auf allen Inhaltsseiten. #foot auf der Startseite bleibt Statusanzeige.
  const footerLinks='<nav class="pulse-footer-links" aria-label="Weitere Bereiche"><a href="./impressum.html">Impressum</a><span class="pulse-footer-dot">·</span><a href="./quellen.html">Quellen</a><span class="pulse-footer-dot">·</span><a href="./arbeitsweise.html">Arbeitsweise</a><span class="pulse-footer-dot">·</span><a href="./erklaert.html">Pulse erklärt</a><span class="pulse-footer-dot">·</span><a href="./datenschutz.html">Datenschutz</a></nav>';
  let footer=document.querySelector('.pulse-footer')||document.querySelector('body .foot:not(#foot)');
  if(!footer){
    footer=document.createElement('footer');
    const main=document.querySelector('main');
    if(main&&main.parentNode)main.insertAdjacentElement('afterend',footer);
    else document.body.appendChild(footer);
  }
  document.querySelectorAll('body .foot:not(#foot)').forEach(node=>{if(node!==footer)node.remove()});
  footer.classList.add('pulse-footer');
  footer.setAttribute('aria-label','Weitere Bereiche von Pulse');
  footer.innerHTML=footerLinks;

  document.addEventListener('click',function(e){
    if(panel.hidden)return;
    if(!panel.contains(e.target)&&e.target!==button){
      panel.hidden=true;
      button.setAttribute('aria-expanded','false');
    }
  });
}

if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',setup,{once:true});
}else{
  setup();
}
})();