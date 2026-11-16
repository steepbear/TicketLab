const page = `<!doctype html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="theme-color" content="#f4f1eb">
  <meta name="description" content="Получаем оригинальную афишу события по ссылке Яндекс Афиши">
  <title>Билетная мастерская — получаем оригинальную афишу</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Unbounded:wght@500;600;700&display=swap');
    :root{font-family:Manrope,Arial,sans-serif;color:#23343c;background:#f4f1eb;font-synthesis:none}
    *{box-sizing:border-box}body{margin:0}button,input{font:inherit}button{cursor:pointer}a{color:inherit}
    .shell{max-width:1140px;margin:0 auto;padding:25px 30px 65px}
    header{display:flex;justify-content:space-between;align-items:center;padding-bottom:22px;border-bottom:1px solid #deded8}
    .logo{display:flex;align-items:center;gap:13px;font-family:Unbounded,Arial,sans-serif;font-size:13px;font-weight:700;line-height:1.3;letter-spacing:-.05em}
    .logo b{display:grid;place-items:center;background:#233b45;color:#faf7ef;width:43px;height:43px;border-radius:9px;font-size:23px;transform:rotate(-6deg)}
    .tag{font-size:10px;letter-spacing:.16em;font-weight:800;color:#8a938f}.tag i{display:inline-block;width:7px;height:7px;border-radius:50%;background:#e77053;margin-right:7px}
    .hero{display:grid;grid-template-columns:1.45fr 1fr;gap:60px;align-items:end;padding:72px 0 43px}
    .kicker{font-size:11px;letter-spacing:.19em;font-weight:800;color:#bd684c;margin-bottom:22px;text-transform:uppercase}
    h1{font-family:Unbounded,Arial,sans-serif;letter-spacing:-.07em;font-size:clamp(37px,5.1vw,62px);line-height:1.14;font-weight:600;margin:0}
    h1 em{color:#d76a4c;font-style:normal}.desc{max-width:620px;color:#737a77;font-size:15px;line-height:1.85;margin:21px 0 0}
    .aside{display:flex;gap:16px;background:#eae7e0;border-radius:17px;padding:24px;font-size:13px;line-height:1.75;color:#63706b}
    .aside span{color:#cd7050;background:#fff8f1;border-radius:10px;padding:5px 12px;height:36px;font-size:21px}
    .aside strong{color:#30454c}
    main{background:#fffefa;border:1px solid #e7e5de;border-radius:24px;padding:31px;box-shadow:0 22px 65px #32443810}
    .number{font-size:10px;font-weight:800;letter-spacing:.19em;color:#cd7453;margin-bottom:9px}
    .toprow{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:25px}
    h2{font-family:Unbounded,Arial,sans-serif;font-weight:600;font-size:21px;letter-spacing:-.06em;margin:0}
    .badge{font-size:11px;color:#657867;background:#f2f5f0;border:1px solid #e1e9df;padding:8px 12px;border-radius:100px;white-space:nowrap}
    label{display:block;font-size:12px;font-weight:800;margin-bottom:11px}
    .formrow{display:flex;gap:11px}.inputwrap{display:flex;align-items:center;flex:1;border-radius:12px;border:1.5px solid #d5dcd8;background:white}
    .inputwrap:focus-within{border-color:#d77c60;box-shadow:0 0 0 3px #ea937325}.inputwrap span{padding:0 15px;color:#8a9995}
    input{border:0;outline:0;background:transparent;border-radius:12px;padding:17px 13px 17px 0;min-width:0;width:100%;font-size:13px;color:#293b42}
    input::placeholder{color:#acb4b1}.primary{border:0;background:#233b45;color:white;border-radius:12px;font-weight:800;font-size:13px;padding:17px 23px;min-width:180px;white-space:nowrap}
    .primary:hover{background:#365660}.primary:disabled{opacity:.65;cursor:wait}
    .samples{display:flex;flex-wrap:wrap;align-items:center;gap:9px;font-size:12px;color:#929996;margin-top:17px}
    .sample{border:1px solid #e5e9e5;border-radius:100px;background:#f7f8f5;color:#50636b;font-weight:700;padding:7px 13px;font-size:12px}
    .sample:hover{background:#edf2ee}
    #result{display:none;border-top:1px dashed #dddcd8;margin-top:27px;padding-top:22px}#result.visible{display:block}
    #message{padding:13px 16px;border-radius:11px;font-size:12px;line-height:1.6;margin-bottom:22px;background:#edf1f4;color:#526972}
    #message.ok{background:#eaf5ee;color:#346448}#message.error{background:#fff0ea;color:#9d503b}
    #details{display:grid;grid-template-columns:1.35fr 1fr;gap:27px}#details[hidden]{display:none}
    .picture{background:#ebe8e1;border:1px solid #e3e4dd;min-height:240px;display:grid;place-items:center;border-radius:14px;overflow:hidden;position:relative}
    .picture img{display:block;width:100%;max-height:410px;object-fit:contain}
    .picture:after{content:'ИЗОБРАЖЕНИЕ С ЯНДЕКС АФИШИ';position:absolute;bottom:13px;left:13px;background:#243943ed;color:white;font-weight:800;font-size:9px;letter-spacing:.11em;padding:7px 9px;border-radius:5px}
    .info .field{font-size:10px;letter-spacing:.13em;color:#929b95;font-weight:800;text-transform:uppercase;margin:0 0 6px}
    .info .value{font-size:17px;font-weight:800;line-height:1.45;margin:0 0 20px;overflow-wrap:anywhere}
    .info .value.small{font-size:13px;font-weight:600}
    .actions{display:flex;flex-wrap:wrap;gap:8px}.action{background:white;border:1px solid #d6ddd7;color:#3d555d;text-decoration:none;font-size:12px;font-weight:800;padding:11px 12px;border-radius:9px;cursor:pointer}
    .action:hover{background:#eff3ef}
    footer{display:flex;justify-content:space-between;gap:18px;padding:27px 4px;color:#929994;font-size:11px;line-height:1.6}
    .steps{display:flex;gap:11px;font-weight:800}.steps strong{color:#c46c4f}
    @media(max-width:810px){.hero{grid-template-columns:1fr;gap:28px;padding:50px 0 30px}}
    @media(max-width:620px){.shell{padding:17px 14px 35px}.logo{font-size:11px}.hero{padding:42px 2px 27px}h1{font-size:35px}.desc{font-size:14px}.aside{padding:16px}main{padding:20px 16px;border-radius:17px}h2{font-size:17px}.formrow{flex-direction:column}.primary{width:100%}#details{grid-template-columns:1fr}footer{display:block}.steps{margin-bottom:9px}}
  </style>
</head>
<body>
<div class="shell">
  <header><div class="logo"><b>✦</b><span>БИЛЕТНАЯ<br>МАСТЕРСКАЯ</span></div><div class="tag"><i></i>ПРОТОТИП · 01</div></header>
  <section class="hero">
    <div><div class="kicker">✳ От ссылки до подарочного билета</div><h1>Сначала получим <em>настоящую афишу.</em></h1><p class="desc">Вставь ссылку на мероприятие. Сайт попробует найти и показать оригинальное изображение с Яндекс Афиши — без нейросетей и подмены картинок.</p></div>
    <div class="aside"><span>✧</span><div><strong>Проверяем самую сложную часть.</strong><br>Когда получение афиши станет надёжным, добавим компоновку билета и печать. Сейчас только реальное изображение.</div></div>
  </section>
  <main>
    <div class="number">ШАГ 01 / ИСТОЧНИК</div><div class="toprow"><h2>Найти афишу мероприятия</h2><span class="badge">Яндекс Афиша</span></div>
    <form id="form">
      <label for="url">Ссылка на мероприятие</label>
      <div class="formrow"><div class="inputwrap"><span>↗</span><input id="url" type="url" required placeholder="https://afisha.yandex.ru/krasnodar/..."></div><button class="primary" id="submit" type="submit">Получить афишу ↗</button></div>
    </form>
    <div class="samples">Попробовать ссылку:
      <button type="button" class="sample" data-url="https://afisha.yandex.ru/krasnodar/theatre_show/shchelkunchik-interaktivnaia-skazka-masterskaia-dlia-detei-4-8-let">«Щелкунчик»</button>
      <button type="button" class="sample" data-url="https://afisha.yandex.ru/krasnodar/concert/xolidayboy-tour">Xolidayboy</button>
    </div>
    <section id="result" aria-live="polite"><div id="message" role="status"></div>
      <div id="details" hidden>
        <div class="picture" id="picture"></div>
        <div class="info"><p class="field">Мероприятие</p><p class="value" id="title"></p><p class="field">Площадка</p><p class="value small" id="venue"></p><p class="field">Источник изображения</p><p class="value small" id="source"></p>
          <div class="actions"><a class="action" id="imageLink" href="#" target="_blank" rel="noopener noreferrer">↗ Открыть оригинал</a><button type="button" class="action" id="copy">⧉ Копировать адрес</button></div>
        </div>
      </div>
    </section>
  </main>
  <footer><div class="steps"><strong>01 · Афиша</strong><span>—</span><span>02 · Билет</span><span>—</span><span>03 · Печать</span></div><div>Личный прототип. Изображения принадлежат правообладателям.</div></footer>
</div>
<script>
  const $=s=>document.querySelector(s),input=$('#url'),submit=$('#submit'),result=$('#result'),details=$('#details'),msg=$('#message');
  let lastImage='';
  function status(kind,text){result.classList.add('visible');msg.className=kind;msg.textContent=text;}
  async function load(){
    details.hidden=true;
    let u;
    try{u=new URL(input.value.trim());if(u.protocol!=='https:'||u.hostname!=='afisha.yandex.ru')throw Error();}
    catch{status('error','Нужна ссылка на мероприятие с https://afisha.yandex.ru/');return;}
    submit.disabled=true;submit.textContent='Ищем…';status('','Получаем HTML страницы и ищем оригинальное изображение…');
    try{
      const response=await fetch('/api/event?url='+encodeURIComponent(u.href),{cache:'no-store'});
      const data=await response.json();
      if(!response.ok)throw Error(data.error||'Не удалось получить мероприятие.');
      const img=document.createElement('img');img.alt='Оригинальное изображение мероприятия «'+(data.title||'')+'»';
      img.onload=()=>status('ok','Оригинальное изображение найдено и загрузилось. Проверь, что это нужная афиша.');
      img.onerror=()=>status('error','Адрес изображения найден, но браузер не смог его открыть. Попробуй кнопку «Открыть оригинал».');
      img.src=data.imageUrl;
      $('#picture').replaceChildren(img);
      $('#title').textContent=data.title||'Название не определено';
      $('#venue').textContent=data.venue||'Не указана на странице';
      $('#source').textContent=new URL(data.imageUrl).hostname;
      $('#imageLink').href=data.imageUrl;
      lastImage=data.imageUrl;details.hidden=false;
    }catch(e){status('error',e.message+' Похожую картинку подставлять не будем.');}
    finally{submit.disabled=false;submit.textContent='Получить афишу ↗';}
  }
  $('#form').addEventListener('submit',e=>{e.preventDefault();load();});
  document.querySelectorAll('[data-url]').forEach(b=>b.addEventListener('click',()=>{input.value=b.dataset.url;load();}));
  $('#copy').addEventListener('click',async()=>{if(!lastImage)return;try{await navigator.clipboard.writeText(lastImage);$('#copy').textContent='✓ Скопировано';}catch{window.prompt('Скопируй адрес:',lastImage);}});
</script>
</body>
</html>`;

const decode = (s='') => s.replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&nbsp;|&#160;/g,' ').replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim();
function imageURL(value) {
  if (!value) return null;
  value=decode(value).replace(/^url\(['"]?/, '').replace(/['"]?\)$/, '').replace(/^['"]|['"]$/g,'').replace(/\\u002f/gi,'/').replace(/\\\//g,'/');
  try {const u=new URL(value);return u.protocol==='https:'?u.href:null;} catch{return null;}
}
function meta(html,name) {
  for(const tag of html.match(/<meta\b[^>]*>/gi)||[]) {
    if(new RegExp('(?:property|name)=["\\x27]'+name+'["\\x27]','i').test(tag))
      return tag.match(/content=["']([^"']+)["']/i)?.[1]||null;
  }
  return null;
}
function extract(html) {
  const found=[];
  function add(candidate,priority) {
    const url=imageURL(candidate);if(!url)return;
    if(url.includes('/get-afishanew/'))priority+=30;
    if(url.includes('avatars.mds.yandex.net'))priority+=15;
    if(/\/s\d+x\d+/.test(url))priority+=10;
    if(/logo|favicon|\.svg/.test(url))priority-=100;
    found.push({url,priority});
  }
  // For event headers Yandex often puts the image into the CSS background.
  for(const m of html.matchAll(/background(?:-image)?\s*:\s*url\(\s*['"]?([^)'"]+)['"]?\s*\)/gi))add(m[1],90);
  add(meta(html,'og:image'),70);add(meta(html,'twitter:image'),45);
  for(const m of html.matchAll(/https?:\/\/avatars\.mds\.yandex\.net\/get-afishanew\/[^\s"'<>)]+/gi))add(m[0],55);
  found.sort((a,b)=>b.priority-a.priority);
  const title=decode(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1]||meta(html,'og:title')||'');
  const venue=decode(html.match(/<a\b[^>]*data-test-id=["']eventPage\.headerSchedulePreview\.place["'][^>]*>([\s\S]*?)<\/a>/i)?.[1]||'');
  return {imageUrl:found[0]?.url||null,title,venue};
}
const json=(data,status=200)=>new Response(JSON.stringify(data),{status,headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store','x-content-type-options':'nosniff'}});
export default {
  async fetch(request){
    const u=new URL(request.url);
    if(u.pathname==='/')return new Response(page,{headers:{'content-type':'text/html; charset=utf-8','x-content-type-options':'nosniff'}});
    if(u.pathname!=='/api/event')return new Response('Not found',{status:404});
    if(request.method!=='GET')return json({error:'Метод не поддерживается.'},405);
    let eventUrl;
    try{
      eventUrl=new URL(u.searchParams.get('url')||'');
      if(eventUrl.protocol!=='https:'||eventUrl.hostname!=='afisha.yandex.ru'||eventUrl.port||eventUrl.username||eventUrl.password||!/^\/[a-z-]+\/[a-z_]+\/[a-z0-9-]+\/?$/.test(eventUrl.pathname))throw Error();
      eventUrl.search='';eventUrl.hash='';
    }catch{return json({error:'Нужна ссылка на страницу мероприятия Яндекс Афиши.'},400);}
    try{
      const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),12000);
      let response;
      try{
        response=await fetch(eventUrl.href,{signal:controller.signal,redirect:'follow',headers:{'accept':'text/html,application/xhtml+xml','accept-language':'ru-RU,ru;q=0.9','user-agent':'Mozilla/5.0'}});
      }finally{clearTimeout(timer);}
      if(!response.ok)return json({error:'Яндекс вернул HTTP '+response.status+'. Возможно, запросы с сервера ограничены.'},502);
      if(new URL(response.url).hostname!=='afisha.yandex.ru')return json({error:'Яндекс перенаправил запрос — возможно, на страницу проверки доступа.'},502);
      if(!response.headers.get('content-type')?.includes('text/html'))return json({error:'Яндекс вернул не HTML-страницу.'},502);
      const html=await response.text();
      if(html.length>10000000)return json({error:'Страница слишком большая.'},502);
      const event=extract(html);
      if(!event.imageUrl)return json({error:'В полученном HTML нет ссылки на оригинальную афишу.'},404);
      return json({...event,eventUrl:eventUrl.href});
    }catch(e){return json({error:e.name==='AbortError'?'Яндекс не ответил за 12 секунд.':'Сайт не смог загрузить Яндекс Афишу с сервера.'},502);}
  }
};
