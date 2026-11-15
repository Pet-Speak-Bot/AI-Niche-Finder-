// node tools/snap.js <ep> 2 8.5 13 ...  -> episodes/<ep>/build/snap/s_<t>.jpg + sheet.jpg (contact sheet)
const fs=require('fs'),path=require('path');const ep=process.argv[2];const ts=process.argv.slice(3).map(Number);
(async()=>{const {b,p}=await require('./page')(ep);const d=path.resolve(__dirname,'../episodes',ep,'build/snap');fs.mkdirSync(d,{recursive:true});
for(const t of ts){const u=await p.evaluate(t=>{render(t);return cv.toDataURL('image/jpeg',.85)},t);fs.writeFileSync(`${d}/s_${t.toFixed(2)}.jpg`,Buffer.from(u.split(',')[1],'base64'));}
const sheet=await p.evaluate(async ts=>{const s=document.createElement('canvas');const n=ts.length,cols=Math.min(n,6),rows=Math.ceil(n/6);s.width=cols*270;s.height=rows*480;const g=s.getContext('2d');ts.forEach((t,i)=>{render(t);g.drawImage(cv,(i%6)*270,Math.floor(i/6)*480,270,480);g.fillStyle='#ff0';g.font='24px sans-serif';g.fillText(t.toFixed(2),(i%6)*270+8,Math.floor(i/6)*480+28);});return s.toDataURL('image/jpeg',.85)},ts);
fs.writeFileSync(d+'/sheet.jpg',Buffer.from(sheet.split(',')[1],'base64'));console.log('wrote',d);await b.close();})();
