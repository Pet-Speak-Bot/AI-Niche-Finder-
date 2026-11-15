// vector-news-recap-cartoon: core (canvas, helpers, person puppet, captions/header/chips, render loop)
const W=1080,H=1920;
const cv=document.getElementById('cv'),X=cv.getContext('2d');
const buf=document.createElement('canvas');buf.width=W;buf.height=H;const BX=buf.getContext('2d');
const tmp=document.createElement('canvas');tmp.width=W;tmp.height=H;const TX=tmp.getContext('2d');
// ---------- helpers ----------
const cl=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
const eoc=x=>1-Math.pow(1-cl(x),3);
const eio=x=>{x=cl(x);return x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2};
const eob=x=>{x=cl(x);const c1=1.9,c3=c1+1;return 1+c3*Math.pow(x-1,3)+c1*Math.pow(x-1,2)};
const pop=(t,t0,d=.38)=>t<t0?0:eob((t-t0)/d);
const fade=(t,t0,d=.3)=>cl((t-t0)/d);
function rr(c,x,y,w,h,r){r=Math.min(r,w/2,h/2);c.beginPath();c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);c.closePath();}
function ell(c,x,y,rx,ry,col){c.beginPath();c.ellipse(x,y,Math.abs(rx),Math.abs(ry),0,0,Math.PI*2);c.fillStyle=col;c.fill();}
function rnd(s){let x=Math.sin(s*127.1+311.7)*43758.5453;return x-Math.floor(x);}
function scaleAt(c,x,y,s){c.translate(x,y);c.scale(s,s);c.translate(-x,-y);}
function lin(c,x0,y0,x1,y1,stops){const g=c.createLinearGradient(x0,y0,x1,y1);stops.forEach((s,i)=>g.addColorStop(s[0],s[1]));return g;}
const SFX=[];
function sfx(t,type,vol=1){SFX.push({t:+t.toFixed(3),type,vol});}
const XF=.45; // dissolve
// ---------- person ----------
const SK=['#E9B892','#D9A07A','#C98D66','#F1C6A2','#DDA883'];
function person(c,o,t){
 const u=o.h/100,kid=o.kid;
 const hip=kid?-40:-47, sh=kid?-71:-79, hc=kid?-83:-90, hr=kid?11:8.2;
 const seed=o.seed||0;
 c.save();c.translate(o.x,o.y);
 const sw=Math.sin(t*1.4+seed*2)*.012;c.rotate(sw);
 if(o.flip)c.scale(-1,1);
 c.scale(u,u);
 const skin=o.skin||SK[0], top=o.top||'#2B3A67', bot=o.bot||'#22284A';
 // tank (back)
 if(o.diver){rr(c,-9,sh+1,18,30,5);c.fillStyle='#F2B630';c.fill();rr(c,-3,sh-3,6,5,2);c.fillStyle='#333';c.fill();}
 // legs
 const lw=kid?6.2:6.4;
 for(const s of[-1,1]){
  const lx=s*(kid?4.2:4.0)-lw/2;
  if(kid){rr(c,lx,hip,lw,-hip-3,3);c.fillStyle=skin;c.fill();rr(c,lx-.3,-14,lw+.6,11,2.5);c.fillStyle=o.sock||'#F4F4F4';c.fill();}
  else{rr(c,lx,hip,lw,-hip-3,3);c.fillStyle=bot;c.fill();}
  ell(c,s*(kid?4.8:4.6),-2.2,kid?5:5.2,2.6,o.shoe||'#2a2a30');
 }
 if(kid){rr(c,-9.6,hip-2,19.2,12,3);c.fillStyle=bot;c.fill();}
 // torso
 const tw=kid?19:20, bw=kid?17.5:17;
 c.beginPath();c.moveTo(-tw/2+2.5,sh);c.quadraticCurveTo(-tw/2,sh,-tw/2,sh+3);c.lineTo(-bw/2,hip+(kid?2:1));c.lineTo(bw/2,hip+(kid?2:1));c.lineTo(tw/2,sh+3);c.quadraticCurveTo(tw/2,sh,tw/2-2.5,sh);c.closePath();
 c.fillStyle=top;c.fill();
 if(o.jersey){c.fillStyle='rgba(255,255,255,.9)';c.fillRect(-tw/2+.6,sh+9,tw-1.2,1.6);c.font='bold 7px K';c.textAlign='center';c.fillStyle='#fff';c.fillText(o.num||'',0,sh+19);}
 if(o.jacket){c.strokeStyle='rgba(0,0,0,.25)';c.lineWidth=.7;c.beginPath();c.moveTo(0,sh+3);c.lineTo(0,hip+1);c.stroke();}
 // arms
 const ar=o.arms||'down';
 for(const s of[-1,1]){
  c.save();c.translate(s*(tw/2-1.6),sh+2.4);
  let a=s*.06;
  if(ar==='up')a=s*(2.55+Math.sin(t*6+seed+s)*.12);
  if(ar==='wave'&&s===1)a=2.6+Math.sin(t*9+seed)*.3;
  if(ar==='open')a=s*.55;
  c.rotate(a);
  const al=kid?27:31, aw=kid?5.4:5.6;
  rr(c,-aw/2,-1,aw,al,2.8);c.fillStyle=(o.shortSleeve)?skin:top;c.fill();
  if(o.shortSleeve){rr(c,-aw/2-.3,-1.5,aw+.6,9,2.8);c.fillStyle=top;c.fill();}
  ell(c,0,al+.6,2.9,3.1,o.glove||skin);
  c.restore();
 }
 // neck
 c.fillStyle=skin;c.fillRect(-2.4,hc+hr-2.5,4.8,sh-(hc+hr)+4);
 if(o.diver){c.fillStyle='#1b2025';c.fillRect(-2.6,hc+hr-2.5,5.2,sh-(hc+hr)+4);}
 // head
 ell(c,-hr*.88,hc+1,1.8,2.4,skin);ell(c,hr*.88,hc+1,1.8,2.4,skin);
 ell(c,0,hc,hr*.86,hr,skin);
 // hair
 const hcol=o.hairCol||'#1E1918';
 c.fillStyle=hcol;
 const hs=o.hair||'short';
 if(hs==='hood'){c.beginPath();c.ellipse(0,hc,hr*1.0,hr*1.13,0,0,Math.PI*2);c.fillStyle='#1b2025';c.fill();ell(c,0,hc+1.2,hr*.66,hr*.76,skin);}
 else if(hs!=='bald'){
  c.beginPath();c.ellipse(0,hc-hr*.12,hr*.9,hr*.92,0,Math.PI*1.02,Math.PI*1.98);
  c.quadraticCurveTo(hr*.55,hc-hr*.55,hr*.05,hc-hr*.52);c.quadraticCurveTo(-hr*.5,hc-hr*.48,-hr*.88,hc-hr*.1);c.closePath();c.fill();
  if(hs==='spiky'){for(let i=-3;i<=3;i++){c.beginPath();c.moveTo(i*hr*.24-hr*.15,hc-hr*.86);c.lineTo(i*hr*.24,hc-hr*1.12);c.lineTo(i*hr*.24+hr*.15,hc-hr*.86);c.fill();}}
  if(hs==='long'){rr(c,-hr*.95,hc-hr*.4,hr*.3,hr*1.5,hr*.15);c.fill();rr(c,hr*.65,hc-hr*.4,hr*.3,hr*1.5,hr*.15);c.fill();}
 }
 if(o.helmet){c.beginPath();c.ellipse(0,hc-hr*.25,hr*.98,hr*.85,0,Math.PI,0);c.fillStyle=o.helmet;c.fill();c.fillRect(-hr*1.08,hc-hr*.3,hr*2.16,hr*.16);ell(c,0,hc-hr*.75,hr*.18,hr*.14,'#fff9c4');}
 // face
 const ex=hr*.37, ey=hc+hr*.08;
 const bl=((t+seed*1.7)%3.4)<.12||o.closed;
 const ex2=o.expr||'n';
 if(o.mask){rr(c,-hr*.72,ey-hr*.3,hr*1.44,hr*.55,hr*.2);c.fillStyle='#9fd4e8';c.fill();c.lineWidth=hr*.1;c.strokeStyle='#222';c.stroke();}
 for(const s of[-1,1]){
  if(bl||ex2==='h'){c.beginPath();c.lineWidth=hr*.09;c.strokeStyle='#2a2222';c.lineCap='round';
   if(ex2==='h'&&!bl)c.arc(s*ex,ey+hr*.06,hr*.15,Math.PI*1.1,Math.PI*1.9);else{c.moveTo(s*ex-hr*.15,ey);c.lineTo(s*ex+hr*.15,ey);}c.stroke();}
  else{ell(c,s*ex,ey,hr*.19,hr*.15,'#fff');ell(c,s*ex+(o.look||0)*hr*.05,ey+hr*.01,hr*.1,hr*.11,'#2b2630');ell(c,s*ex+hr*.035,ey-hr*.04,hr*.03,hr*.03,'#fff');}
  // brows
  c.beginPath();c.lineWidth=hr*.08;c.strokeStyle=hcol==='#1E1918'?'#2a2120':hcol;c.lineCap='round';
  const by=ey-hr*.28, tilt=ex2==='w'?hr*.08:ex2==='h'?-hr*.03:0;
  c.moveTo(s*ex-s*hr*.17,by-tilt*(s>0?1:1)*(1));c.lineTo(s*ex+s*hr*.17,by+tilt);c.stroke();
  ell(c,s*hr*.5,ey+hr*.33,hr*.13,hr*.08,'rgba(235,110,110,.35)');
 }
 // nose
 c.beginPath();c.lineWidth=hr*.06;c.strokeStyle='rgba(120,60,40,.55)';c.moveTo(0,ey+hr*.06);c.quadraticCurveTo(hr*.08,ey+hr*.24,-hr*.02,ey+hr*.26);c.stroke();
 // mouth
 const my=ey+hr*.5;c.beginPath();c.lineWidth=hr*.07;c.strokeStyle='#7a2b2b';
 if(ex2==='h'){c.moveTo(-hr*.2,my-hr*.04);c.quadraticCurveTo(0,my+hr*.22,hr*.2,my-hr*.04);c.closePath();c.fillStyle='#8c2f35';c.fill();}
 else if(ex2==='w'){c.moveTo(-hr*.13,my+hr*.05);c.quadraticCurveTo(0,my-hr*.06,hr*.13,my+hr*.05);c.stroke();}
 else{c.moveTo(-hr*.12,my);c.quadraticCurveTo(0,my+hr*.05,hr*.12,my);c.stroke();}
 c.restore();
}
// mini figure (crowd)
function mini(c,x,y,s,col,helm,seed,t){c.save();c.translate(x,y+Math.sin(t*3+seed)*1.2);c.scale(s,s);rr(c,-7,-30,14,22,5);c.fillStyle=col;c.fill();rr(c,-6,-10,5,10,2);c.fillStyle='#2b2f3a';c.fill();rr(c,1,-10,5,10,2);c.fill();ell(c,0,-37,6,6.5,SK[Math.floor(seed*7)%5]);if(helm){c.beginPath();c.ellipse(0,-39,6.6,5.5,0,Math.PI,0);c.fillStyle=helm;c.fill();}c.restore();}
// ---------- UI ----------
function seg(str){const out=[];const re=/\{(y|r|o):([^}]*)\}/g;let m,last=0;while(m=re.exec(str)){if(m.index>last)out.push(['w',str.slice(last,m.index)]);out.push([m[1],m[2]]);last=re.lastIndex;}if(last<str.length)out.push(['w',str.slice(last)]);return out;}
const COL={w:'#FFFFFF',y:'#F7C744',o:'#FF7A4D',r:'#FFFFFF'};
function richLine(c,line,cx,y,size,font,shadow=true){
 c.font=`${size}px ${font}`;const ss=seg(line);let tw=0;const ws=ss.map(s=>{const w=c.measureText(s[1]).width+(s[0]==='r'?size*.36:0);tw+=w;return w;});
 let x=cx-tw/2;c.textBaseline='alphabetic';c.textAlign='left';
 ss.forEach((s,i)=>{
  if(s[0]==='r'){rr(c,x,y-size*.92,ws[i],size*1.2,size*.16);c.fillStyle='#D8353B';c.fill();c.fillStyle='#fff';c.fillText(s[1],x+size*.18,y);}
  else{if(shadow){c.fillStyle='rgba(0,0,0,.55)';c.fillText(s[1],x+2,y+3);}c.fillStyle=COL[s[0]];c.fillText(s[1],x,y);}
  x+=ws[i];});
 return tw;
}
function caption(c,t){
 let k=-1;for(let i=0;i<C.length;i++)if(t>=C[i][0])k=i;if(k<0||!C[k][1])return;
 const a=fade(t,C[k][0],.18);const lines=C[k][1].split('|');
 c.save();c.globalAlpha=a;const dy=(1-a)*12;
 const y0=lines.length>1?1318:1352;
 lines.forEach((l,i)=>richLine(c,l,W/2,y0+i*78+dy,62,'K'));
 // EN
 const en=C[k][2];c.font='26px PM';const ew=c.measureText(en).width;
 const ey=y0+(lines.length-1)*78+56+dy;
 rr(c,W/2-ew/2-14,ey-25,ew+28,36,9);c.fillStyle='rgba(28,30,40,.72)';c.fill();
 c.fillStyle='#fff';c.textAlign='center';c.fillText(en,W/2,ey+1);
 c.restore();
}
function header(c,t,t0,kick,head,hcol='y',panel=false,t1=1e9){
 const a=fade(t,t0+.08,.3)*(1-fade(t,t1,.25));if(a<=0)return;
 c.save();c.globalAlpha=a;const dy=(1-eoc(fade(t,t0+.08,.35)))*-14;
 if(panel){c.font='72px K';const w=Math.max(c.measureText(head.replace(/\{.:|\}/g,'')).width,300)+80;rr(c,W/2-w/2,(kick?200:222)+dy,w,kick?168:118,26);c.fillStyle='rgba(30,34,58,.78)';c.fill();}
 if(kick)richLine(c,kick,W/2,262+dy,40,'KS');
 richLine(c,`{${hcol}:${head}}`,W/2,(kick?340:312)+dy,72,'K');
 c.restore();
}
function chip(c,t,t0,txt){const s=pop(t,t0+.1);if(s<=0)return;c.save();c.translate(70,196);c.scale(s,s);c.font='34px K';const w=c.measureText(txt).width+36;rr(c,0,-30,w,50,12);c.fillStyle='#F7C744';c.fill();c.fillStyle='#262233';c.textAlign='left';c.fillText(txt,18,7);c.restore();}
function pill(c,x,y,txt,s,bg='rgba(30,34,58,.85)',fg='#fff',size=34,font='K'){if(s<=0)return;c.save();c.translate(x,y);c.scale(s,s);c.font=`${size}px ${font}`;const w=c.measureText(txt).width+size*1.1;rr(c,-w/2,-size*.95,w,size*1.45,size*.4);c.fillStyle=bg;c.fill();c.fillStyle=fg;c.textAlign='center';c.fillText(txt,0,size*.12);c.restore();}
function vignette(c){
 let g=c.createRadialGradient(W/2,H*.42,W*.35,W/2,H*.45,H*.62);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,.62)');c.fillStyle=g;c.fillRect(0,0,W,H);
 c.fillStyle=lin(c,0,1150,0,H,[[0,'rgba(8,8,16,0)'],[.35,'rgba(8,8,16,.45)'],[1,'rgba(4,4,10,.9)']]);c.fillRect(0,1150,W,H-1150);
}
// build fvfyeen0jr
