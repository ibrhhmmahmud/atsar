(function(){
  const DB_NAME = 'AtsarDB';
  const DB_VERSION = 2;
  const STORES = ['days','tilawah','murojaah','journal'];
  let dbPromise;

  const clone = x => JSON.parse(JSON.stringify(x));

  function openDB(){
    if(dbPromise) return dbPromise;
    dbPromise = new Promise((resolve,reject)=>{
      const req = indexedDB.open(DB_NAME,DB_VERSION);
      req.onupgradeneeded = e => {
        const db = e.target.result;
        if(!db.objectStoreNames.contains('days')) db.createObjectStore('days',{keyPath:'date'});
        if(!db.objectStoreNames.contains('tilawah')) {
          const s = db.createObjectStore('tilawah',{keyPath:'id',autoIncrement:true});
          s.createIndex('date','date',{unique:false});
        }
        if(!db.objectStoreNames.contains('murojaah')) {
          const s = db.createObjectStore('murojaah',{keyPath:'id',autoIncrement:true});
          s.createIndex('date','date',{unique:false});
          s.createIndex('nextReview','nextReview',{unique:false});
        }
        if(!db.objectStoreNames.contains('journal')) db.createObjectStore('journal',{keyPath:'date'});
      };
      req.onsuccess = ()=>resolve(req.result);
      req.onerror = ()=>reject(req.error);
    });
    return dbPromise;
  }

  async function tx(store,mode='readonly'){
    const db=await openDB();
    return db.transaction(store,mode).objectStore(store);
  }
  async function get(store,key){
    const s=await tx(store); return new Promise((res,rej)=>{ const r=s.get(key); r.onsuccess=()=>res(r.result); r.onerror=()=>rej(r.error); });
  }
  async function getAll(store){
    const s=await tx(store); return new Promise((res,rej)=>{ const r=s.getAll(); r.onsuccess=()=>res(r.result||[]); r.onerror=()=>rej(r.error); });
  }
  async function put(store,value){
    const s=await tx(store,'readwrite'); return new Promise((res,rej)=>{ const r=s.put(value); r.onsuccess=()=>res(r.result); r.onerror=()=>rej(r.error); });
  }
  async function add(store,value){
    const s=await tx(store,'readwrite'); return new Promise((res,rej)=>{ const r=s.add(value); r.onsuccess=()=>res(r.result); r.onerror=()=>rej(r.error); });
  }
  async function del(store,key){
    const s=await tx(store,'readwrite'); return new Promise((res,rej)=>{ const r=s.delete(key); r.onsuccess=()=>res(); r.onerror=()=>rej(r.error); });
  }
  async function clear(store){
    const s=await tx(store,'readwrite'); return new Promise((res,rej)=>{ const r=s.clear(); r.onsuccess=()=>res(); r.onerror=()=>rej(r.error); });
  }

  function settings(){
    const saved=JSON.parse(localStorage.getItem('atsar.settings.v2')||'null');
    return deepMerge(clone(window.ATSAR_DEFAULTS),saved||{});
  }
  function saveSettings(v){ localStorage.setItem('atsar.settings.v2',JSON.stringify(v)); }
  function emptyDay(){
    const prayers={};
    Object.keys(window.ATSAR_DEFAULTS.prayerTimes).forEach(id=>prayers[id]={done:false,mode:'sendiri',qab:false,bad:false});
    return {date:'',prayers,sunnah:{dhuha:0,tahajud:0,witir:false},fast:{active:false,type:'Senin'},dzikir:{pagi:0,petang:0},custom:{},note:''};
  }
  async function getDay(date){
    const base=emptyDay(); base.date=date;
    const found=await get('days',date);
    return found?deepMerge(base,found):base;
  }
  async function saveDay(day){ return put('days',day); }

  function deepMerge(target,source){
    if(!source||typeof source!=='object') return target;
    Object.keys(source).forEach(k=>{
      if(source[k]&&typeof source[k]==='object'&&!Array.isArray(source[k])) target[k]=deepMerge(target[k]||{},source[k]);
      else target[k]=source[k];
    });
    return target;
  }

  async function exportAll(){
    const data={app:'Atsar',version:2,exportedAt:new Date().toISOString(),settings:settings(),stores:{}};
    for(const s of STORES) data.stores[s]=await getAll(s);
    return data;
  }

  async function importAll(payload,mode='merge'){
    if(!payload||typeof payload!=='object') throw new Error('Format backup tidak dikenali.');
    // v1 compatibility
    if(payload.version===1 && payload.days){
      if(mode==='replace') await clearAll();
      saveSettings(deepMerge(settings(),payload.settings||{}));
      for(const [date,d] of Object.entries(payload.days||{})){
        const day=emptyDay(); Object.assign(day,deepMerge(day,d)); day.date=date; await put('days',day);
        if(Number(d?.tilawah?.pages||0)>0) await add('tilawah',{date,pages:Number(d.tilawah.pages),surah:d.tilawah.lastSurah||'',startPage:null,endPage:d.tilawah.lastPage?Number(d.tilawah.lastPage):null,juz:null,note:'Migrasi dari Atsar V1',createdAt:new Date(date+'T12:00:00').toISOString()});
      }
      return;
    }
    if(payload.version!==2||!payload.stores) throw new Error('Versi backup tidak didukung.');
    if(mode==='replace') await clearAll();
    if(payload.settings) saveSettings(mode==='merge'?deepMerge(settings(),payload.settings):payload.settings);
    for(const s of STORES){
      const rows=payload.stores[s]||[];
      for(const row of rows){
        if(s==='days'||s==='journal') await put(s,row);
        else if(mode==='merge' && row.id!=null){
          const existing=await get(s,row.id); if(existing) continue;
          await put(s,row);
        } else if(row.id!=null) await put(s,row); else await add(s,row);
      }
    }
  }

  async function clearAll(){ for(const s of STORES) await clear(s); }

  async function migrateV1(){
    if(localStorage.getItem('atsar.migrated.v2')) return;
    const rawDays=JSON.parse(localStorage.getItem('atsar.days.v1')||'null');
    const rawSettings=JSON.parse(localStorage.getItem('atsar.settings.v1')||'null');
    if(rawSettings) saveSettings(deepMerge(settings(),rawSettings));
    if(rawDays){
      for(const [date,d] of Object.entries(rawDays)){
        const day=emptyDay(); deepMerge(day,d); day.date=date; delete day.tilawah; await put('days',day);
        const p=Number(d?.tilawah?.pages||0);
        if(p>0) await add('tilawah',{date,pages:p,surah:d.tilawah.lastSurah||'',startPage:null,endPage:d.tilawah.lastPage?Number(d.tilawah.lastPage):null,juz:null,note:'Migrasi otomatis dari V1',createdAt:new Date(date+'T12:00:00').toISOString()});
      }
    }
    localStorage.setItem('atsar.migrated.v2','1');
  }

  window.AtsarDB={openDB,get,getAll,put,add,del,clear,settings,saveSettings,emptyDay,getDay,saveDay,exportAll,importAll,clearAll,migrateV1,deepMerge,stores:STORES};
})();
