// node tools/frames.js <ep> <fromFrame> <toFrame> <out.mp4>   (30 fps worker)
const {spawn}=require('child_process');const [ep,a,b,out]=[process.argv[2],+process.argv[3],+process.argv[4],process.argv[5]];
(async()=>{const {b:br,p}=await require('./page')(ep);
const ff=spawn('ffmpeg',['-v','error','-y','-f','image2pipe','-framerate','30','-c:v','mjpeg','-i','-','-c:v','libx264','-preset','medium','-crf','18','-pix_fmt','yuv420p','-r','30',out]);
for(let f=a;f<b;f++){const d=await p.evaluate(t=>{render(t);return cv.toDataURL('image/jpeg',.93)},f/30);const buf=Buffer.from(d.split(',')[1],'base64');if(!ff.stdin.write(buf))await new Promise(r=>ff.stdin.once('drain',r));}
ff.stdin.end();await new Promise(r=>ff.on('close',r));await br.close();})();
