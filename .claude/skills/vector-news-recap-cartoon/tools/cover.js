// node tools/cover.js <ep> <sceneIndex> <time> "<yellow line>" "<white line>"  -> episodes/<ep>/final/cover.jpg
const fs=require('fs'),path=require('path');const [ep,si,tt,l1,l2]=process.argv.slice(2);
(async()=>{const {b,p}=await require('./page')(ep);const u=await p.evaluate(([si,tt,l1,l2])=>{scene(X,+si,+tt);vignette(X);richLine(X,'{y:'+l1+'}',540,1420,120,'K');if(l2)richLine(X,l2,540,1560,96,'K');return cv.toDataURL('image/jpeg',.9)},[si,tt,l1,l2||'']);
const d=path.resolve(__dirname,'../episodes',ep,'final');fs.mkdirSync(d,{recursive:true});fs.writeFileSync(d+'/cover.jpg',Buffer.from(u.split(',')[1],'base64'));await b.close();})();
