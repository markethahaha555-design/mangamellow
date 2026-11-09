let popular = [
  ['One Piece','ผจญภัย · ตอนที่ 1120','assets/manga-fantasy.png'],
  ['Blue Lock','กีฬา · ตอนที่ 296','assets/manga-romance.png'],
  ['The Last Ember','แฟนตาซี · ตอนที่ 48','assets/manga-fantasy.png'],
  ['Sakamoto Days','แอ็กชัน · ตอนที่ 210','assets/manga-romance.png'],
  ['Nana’s Diary','โรแมนซ์ · ตอนที่ 27','assets/manga-romance.png'],
  ['Magic Emperor','แฟนตาซี · ตอนที่ 88','assets/manga-fantasy.png']
];
let latest = [
  ['Midnight Diner','Slice of Life','ตอนที่ 18','4 ชม. ที่แล้ว','assets/manga-romance.png'],
  ['เจ้าหญิงนักปรุงยา','Fantasy','ตอนที่ 52','6 ชม. ที่แล้ว','assets/manga-fantasy.png'],
  ['Letters to Spring','Romance','ตอนที่ 21','8 ชม. ที่แล้ว','assets/manga-romance.png'],
  ['บันทึกของแมวดำ','Comedy','ตอนที่ 09','10 ชม. ที่แล้ว','assets/manga-fantasy.png'],
  ['Neon Runner','Action','ตอนที่ 77','12 ชม. ที่แล้ว','assets/manga-fantasy.png'],
  ['สวนลับของเรา','Romance','ตอนที่ 34','เมื่อวานนี้','assets/manga-romance.png'],
  ['Moonlit Academy','Fantasy','ตอนที่ 16','เมื่อวานนี้','assets/manga-fantasy.png'],
  ['นักสืบขนปุย','Mystery','ตอนที่ 41','2 วันที่แล้ว','assets/manga-romance.png']
];
const descriptions = { 'The Last Ember':'เมื่อเปลวไฟสุดท้ายกำลังจะดับลง เด็กสาวธรรมดาคนหนึ่งต้องออกเดินทางเพื่อปลุกตำนานที่หลับใหลให้กลับมาอีกครั้ง' };
const MANGABAKA_API = 'https://api.mangabaka.org/v1';
const popularGrid=document.querySelector('#popularGrid'), latestGrid=document.querySelector('#latestGrid'), filters=document.querySelector('#genreFilters');
function renderPopular(){popularGrid.innerHTML=popular.map((item,i)=>`<article class="popular-card" data-title="${item[0]}" data-image="${item[2]}" data-type="${item[1].split(' · ')[0]}"><div class="cover-wrap"><img loading="lazy" src="${item[2]}" alt="ปก ${item[0]}"><span class="rank">0${i+1}</span><button class="favorite" aria-label="บันทึกเรื่องโปรด">♡</button></div><h3>${item[0]}</h3><div class="card-sub">${item[1]}</div></article>`).join('');}
function renderFilters(){['ทั้งหมด','Romance','Fantasy','Action','Comedy'].forEach((x,i)=>{const b=document.createElement('button');b.textContent=x;b.dataset.genre=x;b.className=i===0?'active':'';b.onclick=()=>{document.querySelectorAll('.filter-pills button').forEach(v=>v.classList.remove('active'));b.classList.add('active');renderLatest(x)};filters.appendChild(b)})}
function renderLatest(filter='ทั้งหมด', query=''){const list=latest.filter(x=>(filter==='ทั้งหมด'||x[1]===filter)&&x[0].toLowerCase().includes(query.toLowerCase()));document.querySelector('#emptyState').hidden=list.length>0;latestGrid.innerHTML=list.map(x=>`<article class="latest-card" data-title="${x[0]}" data-image="${x[4]}" data-type="${x[1]}"><div class="latest-cover"><img loading="lazy" src="${x[4]}" alt="ปก ${x[0]}"><span class="type-tag">${x[1]}</span><button class="favorite" aria-label="บันทึกเรื่องโปรด">♡</button></div><h3>${x[0]}</h3><div class="latest-meta"><span class="chapter">${x[2]}</span><span>${x[3]}</span></div></article>`).join('');bindCards();}
function bindCards(){document.querySelectorAll('.popular-card,.latest-card').forEach(card=>{card.onclick=e=>{if(e.target.closest('.favorite'))return;openModal(card.dataset.title,card.dataset.image,card.dataset.type)} });document.querySelectorAll('.favorite').forEach(btn=>btn.onclick=()=>{btn.classList.toggle('saved');btn.textContent=btn.classList.contains('saved')?'♥':'♡'})}
function openModal(title,image,type){document.querySelector('#modalTitle').textContent=title;document.querySelector('#modalImage').src=image;document.querySelector('#modalImage').alt=title;document.querySelector('#modalType').textContent=type+' · เรื่องแนะนำ';document.querySelector('#modalDescription').textContent=descriptions[title]||'เรื่องราวบทใหม่ที่เต็มไปด้วยความสนุก รอยยิ้ม และช่วงเวลาที่คุณจะอยากอ่านต่อจนวางไม่ลง';document.querySelector('#readButton').dataset.title=title;document.querySelector('#readButton').dataset.image=image;document.querySelector('#detailModal').classList.add('open');document.querySelector('#detailModal').setAttribute('aria-hidden','false')}
function closeModal(){document.querySelector('#detailModal').classList.remove('open');document.querySelector('#detailModal').setAttribute('aria-hidden','true')}
document.querySelector('#searchInput').oninput=e=>{const active=document.querySelector('.filter-pills button.active')?.dataset.genre||'ทั้งหมด';renderLatest(active,e.target.value)};document.querySelector('#themeToggle').onclick=()=>{document.body.classList.toggle('dark');document.querySelector('#themeToggle').textContent=document.body.classList.contains('dark')?'☀':'☾'};document.querySelector('.modal-backdrop').onclick=closeModal;document.querySelector('.modal-close').onclick=closeModal;document.addEventListener('keydown',e=>e.key==='Escape'&&closeModal());document.querySelector('#mobileMenu').onclick=()=>document.querySelector('.nav-links').classList.toggle('show');
document.querySelector('#readButton').onclick=()=>{const button=document.querySelector('#readButton');location.href=`reader.html?title=${encodeURIComponent(button.dataset.title||'ตัวอย่างการ์ตูน')}&image=${encodeURIComponent(button.dataset.image||'assets/manga-fantasy.png')}`};
function getMangaTitle(item){return item.title||item.titles?.find(t=>t.language==='en')?.title||item.romanized_title||'ไม่มีชื่อเรื่อง'}
function getMangaCover(item){return item.cover?.x350?.x1||item.cover?.x250?.x1||item.cover?.raw?.url||'assets/manga-fantasy.png'}
function toCard(item){const genre=(item.genres||[])[0]||'Manga';const chapter=item.total_chapters?`ตอนที่ ${item.total_chapters}`:'กำลังอัปเดต';return [getMangaTitle(item),`${genre} · ${chapter}`,getMangaCover(item),item.id]}
async function loadMangaFromApi(){
  try{
    const query='?limit=14&content_rating=safe&sort_by=popularity_desc';
    const response=await fetch(`${MANGABAKA_API}/series/search${query}`);
    if(!response.ok) throw new Error(`MangaDex ${response.status}`);
    const payload=await response.json();
    const items=(payload.data||[]).filter(item=>item.title||item.titles);
    if(!items.length) throw new Error('ไม่มีข้อมูลจาก API');
    const mapped=items.map(item=>({item,card:toCard(item)}));
    popular=mapped.slice(0,6).map(entry=>entry.card);
    latest=mapped.slice(0,8).map(({item,card})=>[card[0],(item.genres||[])[0]||'Manga',card[1].split(' · ').pop(),item.last_updated_at?'อัปเดตล่าสุด':'เรื่องใหม่',card[2],card[3]]);
    renderPopular();renderLatest();bindCards();
  }catch(error){console.info('ใช้ข้อมูลสำรอง เนื่องจากโหลด MangaDex API ไม่สำเร็จ:',error.message)}
}
renderPopular();renderFilters();renderLatest();bindCards();
loadMangaFromApi();
