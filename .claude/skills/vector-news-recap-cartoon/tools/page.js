// shared: open engine page for an episode
const {chromium}=require('playwright');const path=require('path');
module.exports=async function(ep){const b=await chromium.launch({args:['--allow-file-access-from-files']});const p=await b.newPage({viewport:{width:1080,height:1920}});
p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('file://'+path.resolve(__dirname,'../engine/index.html')+'?ep='+encodeURIComponent(ep));await p.waitForFunction(()=>window.READY);await p.evaluate(()=>window.READY);return {b,p};};
