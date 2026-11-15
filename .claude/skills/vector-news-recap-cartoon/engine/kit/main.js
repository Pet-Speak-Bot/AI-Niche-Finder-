// render loop + font loading
// ---------- render ----------
function scene(c,i,t){c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.clearRect(0,0,W,H);S[i].f(c,t,t-S[i].t);c.restore();}
function render(t){
 let k=0;for(let i=0;i<S.length;i++)if(t>=S[i].t)k=i;
 scene(X,k,t);
 if(k>0&&t<S[k].t+XF){scene(BX,k-1,t);X.save();X.globalAlpha=1-eio((t-S[k].t)/XF);X.drawImage(buf,0,0);X.restore();}
 vignette(X);caption(X,t);
 if(t>END-.5){X.fillStyle=`rgba(0,0,0,${cl((t-(END-.5))/.5)})`;X.fillRect(0,0,W,H);}
}
window.READY=Promise.all(['40px K','40px KS','40px P','40px PM'].map(f=>document.fonts.load(f,'ทดสอบ abc'))).then(()=>{render(0);return true;});
