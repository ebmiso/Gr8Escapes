const homes=[
  {id:'emerald',name:'Emerald Escape',tag:'VIEWS & TRANQUILITY',bedrooms:6,guests:'16',capacity:16,vibe:'A peaceful mountain chalet with room for your favorite people.',amenities:['Hot tub','Game room','Firepit','Coffee bar'],image:'emerald',link:'https://www.houfy.com/115823',category:['relax','group'],description:'Six bedrooms and space for up to 16 guests. Settle into mountain views, unwind in the hot tub, and bring everyone together for game nights.'},
  {id:'moonstone',name:'Moonstone Escape',tag:'REST & PLAY',bedrooms:6,guests:'16',capacity:16,vibe:'A celestial-inspired retreat, thoughtfully designed for rest and play.',amenities:['Hot tub','Game room / theater','Firepit','Custom art'],image:'moonstone',link:'https://www.houfy.com/166715',category:['relax','play','group'],description:'A six-bedroom retreat for up to 16 guests, with custom art and design, a game room / theater, and a private hot tub for unhurried evenings.'},
  {id:'mountain',name:'Mountain Escape',tag:'SPA-INSPIRED SLOW DAYS',bedrooms:4,guests:'10–12',capacity:12,vibe:'Your spa-inspired sanctuary for an easy mountain reset.',amenities:['Infrared sauna','Hot tub','Game room','Firepit'],image:'mountain',link:'https://www.houfy.com/76724',category:['relax'],description:'Four bedrooms, with sleeping arrangements for 10–12 guests. Recharge in the infrared sauna and hot tub, or enjoy the game room and four-season room.'},
  {id:'season',name:'Season 4 Escape',tag:'ALL-SEASON FAMILY FUN',bedrooms:6,guests:'16',capacity:16,vibe:'Movie nights, arcade challenges, and memories in every season.',amenities:['Movie theater','Arcade','Infrared sauna','Hot tub'],image:'season',link:'https://www.houfy.com/96339',category:['play','group'],description:'Six bedrooms for up to 16 guests, with a movie theater, arcade, game room, infrared sauna, hot tub, and firepit. A home built around all-season family fun.'}
];
let filter='all',group='all';
const grid=document.querySelector('#properties'),status=document.querySelector('#results'),dialog=document.querySelector('#property-dialog');
function render(){
  const filtered=homes.filter(h=>(filter==='all'||h.category.includes(filter))&&(group==='all'||h.capacity>=Number(group)));
  grid.innerHTML=filtered.map(h=>`<article class="property-card"><div class="card-image"><button class="image-button" data-home="${h.id}" aria-label="View ${h.name} details"><img src="./assets/${h.image}.webp" width="800" height="485" loading="lazy" alt="${h.name==='Season 4 Escape'?'Season 4 Escape arcade and game room':h.name+' chalet exterior at dusk'}"></button><span class="card-tag">${h.tag}</span></div><div class="card-body"><div class="card-title-row"><h3>${h.name}</h3><span class="card-meta">${h.bedrooms} bedrooms · Sleeps ${h.guests}</span></div><p>${h.vibe}</p><div class="amenities">${h.amenities.slice(0,3).join(' &nbsp;·&nbsp; ')}</div><div class="card-links"><button class="details-link" data-home="${h.id}">Explore the home</button><a class="text-link" href="${h.link}" target="_blank" rel="noopener noreferrer">Check availability ↗</a></div></div></article>`).join('');
  document.querySelector('#group-result').hidden=filtered.length>0;
  status.textContent=filtered.length?`Showing ${filtered.length}${filter==='all'&&group==='all'?' homes in the collection':' matching home'+(filtered.length===1?'':'s')}.`:'For groups of 17–32 guests, choose our two-home stay.';
  document.querySelectorAll('[data-home]').forEach(b=>b.addEventListener('click',()=>openHome(b.dataset.home)));
  attachImageFallbacks();
}
function openHome(id){
 const h=homes.find(h=>h.id===id);
 document.querySelector('#dialog-content').innerHTML=`<img class="dialog-image" src="./assets/${h.image}.webp" width="800" height="485" alt="${h.name}"><div class="dialog-copy"><p class="eyebrow">${h.tag}</p><h2 id="dialog-title">${h.name}</h2><p>${h.bedrooms} bedrooms · Sleeps ${h.guests} · Massanutten, Virginia</p><p>${h.description}</p><ul>${h.amenities.map(a=>`<li>${a}</li>`).join('')}</ul><a class="button primary" href="${h.link}" target="_blank" rel="noopener noreferrer">Check availability on Houfy ↗</a><p class="micro" style="margin-top:var(--space-4)">Opens the booking listing in a new tab. Availability and pricing are confirmed there.</p></div>`;
 dialog.setAttribute('aria-labelledby','dialog-title');dialog.showModal();
}
document.querySelectorAll('.filter').forEach(b=>b.addEventListener('click',()=>{
 filter=b.dataset.filter;group='all';document.querySelector('#party').value='all';
 document.querySelectorAll('.filter').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b))});render();
}));
document.querySelector('#finder').addEventListener('submit',e=>{
 e.preventDefault();group=document.querySelector('#party').value;filter='all';
 document.querySelectorAll('.filter').forEach(b=>{b.classList.toggle('active',b.dataset.filter==='all');b.setAttribute('aria-pressed',String(b.dataset.filter==='all'))});
 render();document.querySelector('#stays').scrollIntoView({behavior:'smooth'});
});
document.querySelector('#close-dialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
const menu=document.querySelector('#menu'),nav=document.querySelector('#navigation');
menu.addEventListener('click',()=>{const expanded=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!expanded));menu.setAttribute('aria-label',expanded?'Open navigation':'Close navigation');nav.classList.toggle('open',!expanded)});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation')}));
let theme=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';
function setTheme(){document.documentElement.dataset.theme=theme;document.querySelector('#theme').setAttribute('aria-label','Switch to '+(theme==='dark'?'light':'dark')+' mode');document.querySelector('#mobile-theme').textContent='Switch to '+(theme==='dark'?'light':'dark')+' mode'}
document.querySelectorAll('#theme,#mobile-theme').forEach(b=>b.addEventListener('click',()=>{theme=theme==='dark'?'light':'dark';setTheme()}));
function attachImageFallbacks(){document.querySelectorAll('img').forEach(img=>img.addEventListener('error',()=>{const fallback=document.createElement('div');fallback.className='img-fallback';fallback.role='img';fallback.setAttribute('aria-label',img.alt);fallback.textContent='Photo unavailable. Explore the full listing for more images.';img.replaceWith(fallback)},{once:true}))}
setTheme();render();
// Preserve old property-page destinations after moving from Canva hosting.
const initialHome = new URLSearchParams(window.location.search).get('home');
if (homes.some(home => home.id === initialHome)) openHome(initialHome);
