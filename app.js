import {profile,experience,projects,categories} from './data.js';
import {startPanorama} from './panorama.js';

const app=document.querySelector('#app');
const icons={
  github:'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.65.5.5 5.66.5 12.02c0 5.09 3.29 9.4 7.86 10.93.58.11.79-.25.79-.56 0-.27-.01-1-.02-1.96-3.2.7-3.88-1.54-3.88-1.54-.52-1.34-1.28-1.69-1.28-1.69-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.06.78 2.13 0 1.54-.01 2.78-.01 3.16 0 .31.21.68.8.56C20.21 21.42 23.5 17.1 23.5 12.02 23.5 5.66 18.35.5 12 .5Z"/></svg>',
  linkedin:'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.13 1 2.5 1s2.48 1.12 2.48 2.5ZM.2 8h4.6v14H.2V8Zm7.4 0h4.4v1.92h.06c.61-1.16 2.1-2.38 4.33-2.38 4.63 0 5.49 3.05 5.49 7.02V22h-4.6v-6.18c0-1.47-.03-3.37-2.05-3.37-2.06 0-2.37 1.61-2.37 3.27V22h-4.6V8Z"/></svg>',
  settings:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m9 3-1 3-3 1-2 4 2 2v3l3 2 1 3h6l1-3 3-2v-3l2-2-2-4-3-1-1-3z"/><circle cx="12" cy="12" r="3"/></svg>',
  muted:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4zM16 9l6 6m0-6-6 6"/></svg>',
  sound:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4zM15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/></svg>',
};
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const tags=items=>`<div class="tags">${items.map(t=>`<span class="tag">${esc(t)}</span>`).join('')}</div>`;
const external=(href,text,cls='mc-button')=>`<a class="${cls}" href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;
const back='<a class="mc-button back" href="/" data-route>Back</a>';
const projectIcon=p=>`<span class="project-icon" style="color:${p.color}" aria-hidden="true">${p.icon}</span>`;
function page(title,content,footer=back,cls=''){return `<main class="page ${cls}"><h1>${title}</h1>${content}<div class="page-footer ${cls==='projects-page'?'project-actions':''}">${footer}</div></main>`;}
function home(){return `<main class="home"><h1 class="sr-only">Adrian Wenzen — Portfolio</h1><div class="logo-wrap"><img class="logo" src="/logo.png" alt="Adrian Wenzen — Portfolio" width="960" height="210"><div class="splash">CS @ Illinois Tech!</div></div><nav class="home-menu" aria-label="Portfolio"><a class="mc-button" href="/experience" data-route>Experience</a><a class="mc-button" href="/projects" data-route>Projects</a><a class="mc-button" href="/about" data-route>About Me</a><div class="secondary-menu">${external(profile.github,icons.github,'mc-button icon')}<a class="mc-button" href="/blog" data-route>Blog</a><a class="mc-button" href="/skills" data-route>Skills</a>${external(profile.linkedin,icons.linkedin,'mc-button icon')}</div></nav><div class="version">Portfolio V1.0</div><footer class="copyright">© 2026 Adrian Wenzen. Not an official Minecraft product.<br>Not approved by or associated with Mojang or Microsoft.</footer></main>`;}
function experiencePage(){return page('Experience',`<section class="frame" aria-label="Work experience timeline"><div class="scroll experience-list" tabindex="0">${experience.map(e=>`<article class="experience-entry"><div><div class="date">${e.date}</div>${e.location?`<div class="location">${e.location}</div>`:''}</div><div><h2>${e.role} <span class="muted">— ${e.company}</span></h2><ul class="bullets">${e.bullets.map(b=>`<li>${b}</li>`).join('')}</ul>${tags(e.tags)}</div></article>`).join('')}</div></section>`);}
let selected=null,query='';
function projectRows(){const list=projects.filter(p=>(p.name+' '+p.description+' '+p.tags.join(' ')).toLowerCase().includes(query.toLowerCase()));return list.length?list.map(p=>`<button class="project-row ${selected===p.id?'selected':''}" data-project="${p.id}" aria-pressed="${selected===p.id}">${projectIcon(p)}<span><span class="project-name">${p.name}</span><span class="project-year">${p.year}</span><span class="project-description">${p.description}</span>${tags(p.tags)}</span><span class="status"><span class="bars"><i></i><i></i><i></i></span>${p.status}</span></button>`).join(''):'<div class="empty"><h2>No projects found</h2><p>Try a language, tool, or project name.</p></div>';}
function projectPage(){return page('Select Project',`<section class="frame" aria-label="Projects"><div class="search-wrap"><input class="search" aria-label="Search projects" placeholder="Search projects…" value="${esc(query)}"></div><div class="scroll project-list" role="region" aria-label="Project list">${projectRows()}</div><div class="list-count" aria-live="polite">${projects.length} projects · select a project for actions</div></section>`,`<button class="mc-button" id="open-project" disabled>Open</button><button class="mc-button" id="project-github" disabled>GitHub</button><button class="mc-button" id="cancel-project" disabled>Cancel</button>${back}`,'projects-page');}
function updateProjectActions(){const p=projects.find(p=>p.id===selected);document.querySelector('#open-project').disabled=!p;document.querySelector('#project-github').disabled=!p?.github;document.querySelector('#cancel-project').disabled=!p;document.querySelector('.list-count').textContent=p?p.name+' · selected':`${projects.filter(p=>(p.name+' '+p.description+' '+p.tags.join(' ')).toLowerCase().includes(query.toLowerCase())).length} projects · select a project for actions`;}
function projectDetail(p){return page('Project Details',`<section class="frame"><article class="scroll detail"><div class="detail-heading">${projectIcon(p)}<div><h2>${p.name}</h2><div class="date">${p.context}</div></div></div><p>${p.description}</p>${tags(p.tags)}<h3>What I built</h3><ul class="bullets">${p.details.map(d=>`<li>${d}</li>`).join('')}</ul>${external(p.github||p.url,p.github?'View on GitHub':'Visit Website')}</article></section>`,`<a class="mc-button back" href="/projects" data-route>Back</a>`);}
const facts=[['Studying','Computer Science'],['Based in','Chicago, IL'],['Currently','Student @ Illinois Tech']];
function aboutPage(){
  const rows=[
    {icon:'◆',label:'BUILDING',title:'Loka',detail:'Community safety for Jakarta–Depok, built with SwiftUI, Mapbox, and Firebase.'},
    {icon:'●',label:'ON THE COURT',title:'Tennis',detail:'Hot take: Ben Shelton wins a Grand Slam before the end of 2027.'},
    {icon:'▦',label:'AFTER HOURS',title:'Minecraft & FIFA',detail:'Minecraft explains this site. I also used to rank in the top 100 for FIFA FUT Champions in SEA.'}
  ];
  return page('About Me',`<section class="frame" aria-label="About Adrian"><div class="scroll about-layout"><aside class="profile-card"><div class="avatar-frame"><img class="avatar" src="/adrian-wenzen.jpg" alt="Adrian Wenzen by the Chicago River at night" width="320" height="320"></div><div class="stone-label">Adrian Wenzen</div><div class="hawk-divider"><span></span><img src="/illinois-tech-hawk-cutout.png" alt="Illinois Tech hawk emblem"><span></span></div><div class="profile-facts">${facts.map(([k,v])=>`<div class="fact"><span>${k}</span><span>${v}</span></div>`).join('')}</div>${tags(['Full-stack engineer','Data & AI','Product'])}<div class="profile-actions"><a class="mc-button" href="/resume.pdf" target="_blank" rel="noopener">Resume</a><button class="mc-button" data-contact>Contact</button></div></aside><div class="about-copy"><div class="about-intro-panel"><p>Hi, I’m Adrian! I study Computer Science at Illinois Tech and like turning ideas into products people can actually use. I’m the co-founder and CTO of Loka, and I build across full-stack software, iOS, and data.</p><p>Outside of building, I’m usually on a tennis court or playing games. Minecraft is the reason this portfolio looks the way it does.</p></div><div class="about-section-title"><h2>Right now</h2><span>A few things about me</span></div><div class="about-rows">${rows.map(row=>`<div class="about-row"><span class="about-row-icon" aria-hidden="true">${row.icon}</span><div class="about-row-copy"><small>${row.label}</small><strong>${row.title}</strong><p>${row.detail}</p></div></div>`).join('')}</div><div class="about-section-title"><h2>Education</h2></div><div class="cert">Illinois Institute of Technology<small>B.S. in Computer Science · Expected Summer 2027 · GPA 3.46 / 4.0</small></div><div class="about-section-title"><h2>Certifications</h2></div><div class="cert">IBM Data Science Professional Certificate<small>IBM · June 2026</small></div><div class="cert">Fundamentals of Quantitative Modeling<small>The Wharton School, University of Pennsylvania · November 2025</small></div></div></div></section>`,back,'about-page');
}
let activeCategory=0;
function skillContent(){const c=categories[activeCategory];return `<h3>${c.name}<small>${c.skills.length} applied</small></h3><div class="skill-grid">${c.skills.map(s=>`<div class="skill-item"><img src="/icons/enchanted-book.gif" alt="">${s}</div>`).join('')}</div>`;}
function skillsPage(){return page('Skills',`<section class="frame scroll enchantment-frame" aria-label="Skills content"><div class="skills-layout"><div><div class="enchant-scene"><h2>Enchant</h2><div class="glyphs" aria-hidden="true">ᚨ ᛚ ⌁ ⊣ ϟ ⌁ ᛉ</div><img class="book" src="/icons/enchant-book.png" alt="Open enchantment book"><p>Pick a tool to read its enchantments.</p></div><div class="skill-tabs" role="tablist" aria-label="Skill categories">${categories.map((c,i)=>`<button class="skill-tab" id="category-${i}" role="tab" aria-controls="skill-panel" aria-selected="${i===activeCategory}" tabindex="${i===activeCategory?0:-1}" data-category="${i}"><span class="tool-slot"><img src="/icons/${c.icon}" alt=""></span><span><span class="runes" aria-hidden="true">ᚨ⌁ᛉ⊣⌁ᛚᚨ</span><span class="category-name">${c.name}</span><span class="category-count">${c.skills.length} enchantments</span></span><span class="xp"><img src="/icons/experience-orb.png" alt="">${i+1}</span></button>`).join('')}</div></div><div class="skill-panel" id="skill-panel" role="tabpanel" aria-labelledby="category-${activeCategory}">${skillContent()}</div></div></section>`);}
function blogPage(){return page('Blog',`<section class="frame"><div class="scroll notes"><p class="notes-intro">Notes from the workbench. A closer look at what I’ve been building.</p>${[
['options-pricer','C++ · Python','Pricing three million options per second','My options pricer calculates Black–Scholes prices and Greeks in a single pass, avoiding redundant computation. A pybind11 bridge exposes the engine to Python, while pytest checks the calculations against known values.'],
['loka','SwiftUI · Firebase','Building neighborhood awareness with Loka','Loka brings community reports, live incident maps, official BMKG alerts, and camera feeds together for Jakarta–Depok. I built the iOS experience with SwiftUI, Mapbox, and Firebase and delivered the first version to internal TestFlight testers.'],
['risk-engine','Python · Quantitative research','From seasonal prices to credit risk','This J.P. Morgan job simulation paired a seasonal natural gas pricing model with a logistic regression credit risk model. The project explores derivative pricing, borrower risk scoring, and expected loss across a simulated portfolio.']
].map(([id,topic,title,text])=>`<article class="note"><small>${topic}</small><h2>${title}</h2><p>${text}</p><a href="/projects/${id}" data-route>Explore the project →</a></article>`).join('')}</div></section>`);}
function navigate(path){history.pushState({},'',path);render();}
function render(){const path=location.pathname.replace(/\/$/,'')||'/';document.body.classList.toggle('inner-page',path!=='/');let view,title;
  if(path==='/'){view=home();title='Software Engineer';}
  else if(path==='/experience'){view=experiencePage();title='Experience';}
  else if(path==='/projects'){view=projectPage();title='Projects';}
  else if(path.startsWith('/projects/')&&projects.some(p=>p.id===path.split('/')[2])){const p=projects.find(p=>p.id===path.split('/')[2]);view=projectDetail(p);title=p.name;}
  else if(path==='/about'){view=aboutPage();title='About Me';}
  else if(path==='/skills'){view=skillsPage();title='Skills';}
  else if(path==='/blog'){view=blogPage();title='Blog';}
  else{view=page('World not found',`<section class="frame"><div class="empty"><h2>This page hasn’t been built.</h2><p>Head back to the main menu to keep exploring.</p></div></section>`);title='Page not found';}
  app.innerHTML=view;document.title=`${title} | Adrian Wenzen`;
  document.querySelectorAll('.secondary-menu .icon').forEach((a,i)=>a.setAttribute('aria-label',i?'LinkedIn':'GitHub'));
  if(path==='/projects')updateProjectActions();
}

// Sound starts on by default; a manual mute is saved on this device.
const read=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key))??fallback;}catch{return fallback;}};
const save=(key,value)=>{try{localStorage.setItem(key,JSON.stringify(value));}catch{}};
let volume=read('aw-volume',.3),motion=read('aw-motion',matchMedia('(prefers-reduced-motion: reduce)').matches?'reduced':'full'),muted=read('aw-muted',false);
const music=new Audio('/menu-music.mp3');music.loop=true;music.volume=volume;music.hidden=true;music.preload='metadata';music.dataset.soundtrack='reference-menu';document.body.append(music);
let playAttempt=0,playPending=false;
const audioFocus=typeof BroadcastChannel==='function'?new BroadcastChannel('adrian-portfolio-music'):null;
if(audioFocus)audioFocus.onmessage=e=>{if(e.data==='playing'){++playAttempt;music.pause();}};
function playMusic(){if(muted||document.hidden||!music.paused||playPending)return;const attempt=++playAttempt;playPending=true;music.play().then(()=>{playPending=false;if(attempt!==playAttempt||muted){music.pause();return;}audioFocus?.postMessage('playing');}).catch(()=>{playPending=false;});}
window.addEventListener('pagehide',()=>{++playAttempt;music.pause();});
window.addEventListener('pageshow',()=>{if(!muted)playMusic();});
window.addEventListener('focus',playMusic);
document.addEventListener('visibilitychange',()=>{if(!document.hidden)playMusic();});
document.addEventListener('pointerdown',playMusic,{capture:true});
document.addEventListener('keydown',playMusic,{capture:true});
const clickSound=new Audio('/button-click.mp3');clickSound.volume=.35;
const soundButton=document.querySelector('#sound');
function applyMotion(){document.documentElement.classList.toggle('reduced',motion==='reduced');}
function applySound(){soundButton.innerHTML=muted?icons.muted:icons.sound;soundButton.setAttribute('aria-label',muted?'Unmute all sounds':'Mute all sounds');soundButton.setAttribute('aria-pressed',String(!muted));soundButton.title=muted?'Unmute all sounds':'Mute all sounds';if(muted){++playAttempt;music.pause();}else playMusic();}
document.querySelector('#options').innerHTML=icons.settings;
soundButton.addEventListener('click',()=>{muted=!muted;save('aw-muted',muted);applySound();});
const settings=document.querySelector('#settings');
function openSettings(){settings.innerHTML=`<h2 id="settings-title">Options</h2><label for="volume" id="volume-label">Music Volume: ${Math.round(volume*100)}%</label><input type="range" id="volume" aria-label="Music volume" min="0" max="1" step=".01" value="${volume}"><div class="setting-row"><span>Music</span><button class="mc-button" id="restart-music">Restart Song</button></div><div class="setting-row"><span>Motion</span><button class="mc-button" data-motion="full" aria-pressed="${motion==='full'}">Full</button><button class="mc-button" data-motion="reduced" aria-pressed="${motion==='reduced'}">Reduced</button></div><p>Reduced stops panorama drift and splash bounce.</p><button class="mc-button done" data-close>Done</button>`;settings.showModal();document.querySelector('#options').setAttribute('aria-expanded','true');}
document.querySelector('#options').addEventListener('click',openSettings);
settings.addEventListener('close',()=>document.querySelector('#options').setAttribute('aria-expanded','false'));
function openContact(){const d=document.querySelector('#contact');d.innerHTML=`<h2 id="contact-title">Let’s connect</h2><div class="contact-email">${profile.email}</div><div class="contact-links"><a class="mc-button" href="mailto:${profile.email}">Send an email</a>${external(profile.linkedin,'LinkedIn')}${external(profile.github,'GitHub')}</div><button class="mc-button done" data-close>Done</button>`;d.showModal();}
document.addEventListener('input',e=>{
  if(e.target.matches('.search')){query=e.target.value;selected=null;document.querySelector('.project-list').innerHTML=projectRows();updateProjectActions();}
  if(e.target.id==='volume'){volume=Number(e.target.value);music.volume=volume;save('aw-volume',volume);document.querySelector('#volume-label').textContent=`Music Volume: ${Math.round(volume*100)}%`;}
});
function chooseCategory(i){activeCategory=i;document.querySelectorAll('[data-category]').forEach(b=>{const active=Number(b.dataset.category)===i;b.setAttribute('aria-selected',String(active));b.tabIndex=active?0:-1;});const panel=document.querySelector('#skill-panel');panel.innerHTML=skillContent();panel.setAttribute('aria-labelledby',`category-${i}`);}
document.addEventListener('keydown',e=>{if(e.target.matches('[data-category]')&&['ArrowDown','ArrowUp','ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();const i=e.key==='Home'?0:e.key==='End'?categories.length-1:(activeCategory+(['ArrowDown','ArrowRight'].includes(e.key)?1:-1)+categories.length)%categories.length;chooseCategory(i);document.querySelector(`#category-${i}`).focus();}});
document.addEventListener('click',e=>{
  const control=e.target.closest('a,button');if(!control||control.disabled)return;
  if(!muted){clickSound.currentTime=0;clickSound.play().catch(()=>{});}
  if(control.matches('[data-route]')&&!e.ctrlKey&&!e.metaKey&&!e.shiftKey){e.preventDefault();navigate(control.getAttribute('href'));}
  if(control.dataset.project){selected=control.dataset.project;document.querySelectorAll('[data-project]').forEach(b=>{b.classList.toggle('selected',b.dataset.project===selected);b.setAttribute('aria-pressed',String(b.dataset.project===selected));});updateProjectActions();}
  if(control.id==='open-project'&&selected)navigate('/projects/'+selected);
  if(control.id==='project-github'&&selected){const p=projects.find(p=>p.id===selected);if(p.github)window.open(p.github,'_blank','noopener,noreferrer');}
  if(control.id==='cancel-project'){selected=null;document.querySelectorAll('[data-project]').forEach(b=>{b.classList.remove('selected');b.setAttribute('aria-pressed','false');});updateProjectActions();}
  if(control.matches('[data-category]'))chooseCategory(Number(control.dataset.category));
  if(control.matches('.slot')){const expanded=control.getAttribute('aria-expanded')==='true';control.setAttribute('aria-expanded',String(!expanded));control.querySelector('.plus').textContent=expanded?'+':'−';}
  if(control.matches('[data-contact]'))openContact();
  if(control.matches('[data-close]'))control.closest('dialog').close();
  if(control.dataset.motion){motion=control.dataset.motion;save('aw-motion',motion);applyMotion();document.querySelectorAll('[data-motion]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.motion===motion)));}
  if(control.id==='restart-music'){music.currentTime=0;playMusic();}
});
window.addEventListener('popstate',render);applyMotion();applySound();render();startPanorama(document.querySelector('#panorama'),()=>motion==='reduced');
