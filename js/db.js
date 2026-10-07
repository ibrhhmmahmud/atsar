(function(){
  const DB_NAME='AtsarDB';
  const DB_VERSION=2;
  // `tilawah` dipertahankan hanya untuk kompatibilitas backup V2 lama.
  // Atsar V2.1 tidak menampilkan atau menulis data tilawah baru.
  const STORES=['days','tilawah','murojaah','journal'];
  let dbPromise;
  const clone=x=>JSON.parse(JSON.stringify(x));

  function openDB(){
    if(dbPromise)return dbPromise;
    dbPromise=new Promise((resolve,reject)=>{
      const req=indexedDB.open(DB_NAME,DB_VERSION);
      req.onupgradeneeded=e=>{
        const db=e.target.result;
        if(!db.objectStoreNames.contains('days'))db.createObjectStore('days',{keyPath:'date'});
        if(!db.objectStoreNames.contains('tilawah')){const s=db.createObjectStore('tilawah',{keyPath:'id',autoIncrement:true});s.createIndex('date','date',{unique:false});}
        if(!db.objectStoreNames.contains('murojaah')){const s=db.createObjectStore('murojaah',{keyPath:'id',autoIncrement:true});s.createIndex('date','date',{unique:false});s.createIndex('nextReview','nextReview',{unique:false});}
        if(!db.objectStoreNames.contains('journal'))db.createObjectStore('journal',{keyPath:'date'});
      };
      req.onsuccess=()=>resolve(req.result);
      req.onerror=()=>reject(req.error);
    });
    return dbPromise;
  }
  async function store(name,mode='readonly'){const db=await openDB();return db.transaction(name,mode).objectStore(name)}
  async function get(name,key){const s=await store(name);return new Promise((res,rej)=>{const r=s.get(key);r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)})}
  async function getAll(name){const s=await store(name);return new Promise((res,rej)=>{const r=s.getAll();r.onsuccess=()=>res(r.result||[]);r.onerror=()=>rej(r.error)})}
  async function put(name,value){const s=await store(name,'readwrite');return new Promise((res,rej)=>{const r=s.put(value);r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)})}
  async function add(name,value){const s=await store(name,'readwrite');return new Promise((res,rej)=>{const r=s.add(value);r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)})}
  async function del(name,key){const s=await store(name,'readwrite');return new Promise((res,rej)=>{const r=s.delete(key);r.onsuccess=()=>res();r.onerror=()=>rej(r.error)})}
  async function clear(name){const s=await store(name,'readwrite');return new Promise((res,rej)=>{const r=s.clear();r.onsuccess=()=>res();r.onerror=()=>rej(r.error)})}
  function deepMerge(target,source){if(!source||typeof source!=='object')return target;Object.keys(source).forEach(k=>{if(source[k]&&typeof source[k]==='object'&&!Array.isArray(source[k]))target[k]=deepMerge(target[k]||{},source[k]);else target[k]=source[k]});return target}
  function settings(){const saved=JSON.parse(localStorage.getItem('atsar.settings.v2')||'null');const out=deepMerge(clone(window.ATSAR_DEFAULTS),saved||{});if(out.targets && out.targets.murojaahSessions==null)out.targets.murojaahSessions=1;return out}
  function saveSettings(v){localStorage.setItem('atsar.settings.v2',JSON.stringify(v))}
  function emptyDay(){const prayers={};Object.keys(window.ATSAR_DEFAULTS.prayerTimes).forEach(id=>prayers[id]={done:false,mode:'sendiri',qab:false,bad:false});return{date:'',prayers,sunnah:{dhuha:0,tahajud:0,witir:false},fast:{active:false,type:'Senin'},dzikir:{pagi:0,petang:0},custom:{},note:''}}
  async function getDay(date){const base=emptyDay();base.date=date;const found=await get('days',date);return found?deepMerge(base,found):base}
  async function saveDay(day){return put('days',day)}

  async function exportAll(){const data={app:'Atsar',version:2,appVersion:'2.1',exportedAt:new Date().toISOString(),settings:settings(),stores:{}};for(const s of STORES)data.stores[s]=await getAll(s);return data}
  async function importAll(payload,mode='merge'){
    if(!payload||typeof payload!=='object')throw new Error('Format backup tidak dikenali.');
    if(payload.version===1&&payload.days){
      if(mode==='replace')await clearAll();
      saveSettings(deepMerge(settings(),payload.settings||{}));
      for(const [date,d] of Object.entries(payload.days||{})){const day=emptyDay();deepMerge(day,d);day.date=date;delete day.tilawah;await put('days',day)}
      return;
    }
    if(payload.version!==2||!payload.stores)throw new Error('Versi backup tidak didukung.');
    if(mode==='replace')await clearAll();
    if(payload.settings)saveSettings(mode==='merge'?deepMerge(settings(),payload.settings):payload.settings);
    for(const s of STORES){const rows=payload.stores[s]||[];for(const row of rows){if(s==='days'||s==='journal')await put(s,row);else if(mode==='merge'&&row.id!=null){const existing=await get(s,row.id);if(existing)continue;await put(s,row)}else if(row.id!=null)await put(s,row);else await add(s,row)}}
  }
  async function clearAll(){for(const s of STORES)await clear(s)}
  async function migrateV1(){
    if(localStorage.getItem('atsar.migrated.v2'))return;
    const rawDays=JSON.parse(localStorage.getItem('atsar.days.v1')||'null');
    const rawSettings=JSON.parse(localStorage.getItem('atsar.settings.v1')||'null');
    if(rawSettings)saveSettings(deepMerge(settings(),rawSettings));
    if(rawDays){for(const [date,d] of Object.entries(rawDays)){const day=emptyDay();deepMerge(day,d);day.date=date;delete day.tilawah;await put('days',day)}}
    localStorage.setItem('atsar.migrated.v2','1');
  }
  window.AtsarDB={openDB,get,getAll,put,add,del,clear,settings,saveSettings,emptyDay,getDay,saveDay,exportAll,importAll,clearAll,migrateV1,deepMerge,stores:STORES};
})();
