// node tools/meta.js <ep>  -> episodes/<ep>/build/meta.json (END + SFX list)
const fs=require('fs'),path=require('path');const ep=process.argv[2];
(async()=>{const {b,p}=await require('./page')(ep);const m=await p.evaluate(()=>({END,SFX,DUCK:typeof DUCK!=='undefined'?DUCK:[]}));const d=path.resolve(__dirname,'../episodes',ep,'build');fs.mkdirSync(d,{recursive:true});fs.writeFileSync(d+'/meta.json',JSON.stringify(m));console.log('END',m.END,'SFX',m.SFX.length);await b.close();})();
