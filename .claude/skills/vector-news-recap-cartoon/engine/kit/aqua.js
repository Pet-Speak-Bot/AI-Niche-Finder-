// aquarium kit (ปลาสวยงาม / ไม้น้ำ / กุ้งแคระ): underwater aquascape, tank-in-room, fish, shrimp, props
// World coords = full frame 1080x1920, substrate top ~ y 1150. aqWorld() draws it full-frame; aqView() draws it inside a rect.
const AQP={
 nature:{top:'#4fb0a6',mid:'#1f6b72',deep:'#0b3340',far:'#2f7f6a',plant:'#3f9a3c',plantL:'#86d455',plantD:'#22612c',red:'#c2483a',redL:'#ef8452',
  rock:'#8a8f8c',rockL:'#c2c6bd',rockD:'#4a504e',wood:'#6b4a33',woodL:'#9a6e4c',woodD:'#3a2619',sub:'#4a3a2c',subL:'#7d6852',subD:'#1e160e',moss:'#4f8f2f',mossL:'#7fbf45',ray:'220,255,240'},
 amber:{top:'#c09a48',mid:'#7a5826',deep:'#2a1c0c',far:'#5d5a2a',plant:'#5b7a2c',plantL:'#9cba50',plantD:'#2f3e15',red:'#a2482a',redL:'#c8703c',
  rock:'#6f6352',rockL:'#a0927a',rockD:'#3e352a',wood:'#4a3020',woodL:'#74503a',woodD:'#24170e',sub:'#3a2c1c',subL:'#64503a',subD:'#1a120a',moss:'#556b22',mossL:'#86a038',ray:'255,230,170'}
};
const AQ_SY=1150; // substrate top
// ---------- static pieces (drawn on K inside bakeL) ----------
function aqRock(x,y,w,h,P,seed){const r=rngF(seed),n=8,pts=[];for(let i=0;i<=n;i++){const a=Math.PI+i/n*Math.PI,k=i===0||i===n?1:.72+r()*.35;pts.push([x+Math.cos(a)*w/2*k,y+Math.sin(a)*h*k]);}
 K.beginPath();K.moveTo(pts[0][0],y+8);pts.forEach(p=>K.lineTo(p[0],p[1]));K.lineTo(pts[n][0],y+8);K.closePath();K.fillStyle=vg(y-h,y,[[0,P.rockL],[.45,P.rock],[1,P.rockD]]);K.fill();
 K.save();K.clip();const top=pts[Math.floor(n/2)];K.fillStyle='rgba(255,255,255,.14)';K.beginPath();K.moveTo(top[0],top[1]);for(let i=Math.floor(n/2);i>=0;i--)K.lineTo(pts[i][0],pts[i][1]);K.lineTo(x-w*.1,y);K.closePath();K.fill();
 K.strokeStyle='rgba(0,0,0,.18)';K.lineWidth=3;for(let i=0;i<5;i++){const yy=y-h*(.2+i*.15);K.beginPath();K.moveTo(x-w/2,yy+(r()-.5)*20);K.quadraticCurveTo(x,yy+(r()-.5)*30,x+w/2,yy+(r()-.5)*20);K.stroke();}K.restore();return pts;}
function aqWood(x,y,len,ang,wid,P,seed,depth=0,tips=[]){const r=rngF(seed);let px=x,py=y,a=ang;const n=12,st=len/n;
 for(let i=0;i<n;i++){a+=(r()-.5)*.28;const nx=px+Math.cos(a)*st,ny=py+Math.sin(a)*st,w=wid*(1-i/n*.75);K.lineCap='round';
  K.strokeStyle=P.woodD;K.lineWidth=w+4;K.beginPath();K.moveTo(px,py);K.lineTo(nx,ny);K.stroke();K.strokeStyle=P.wood;K.lineWidth=w;K.beginPath();K.moveTo(px,py);K.lineTo(nx,ny);K.stroke();
  K.strokeStyle=P.woodL;K.lineWidth=w*.28;K.beginPath();K.moveTo(px-w*.18,py-w*.18);K.lineTo(nx-w*.18,ny-w*.18);K.stroke();
  if(depth<2&&i>3&&i<10&&r()<.22)aqWood(px,py,len*.5,a+(r()<.5?-1:1)*(.5+r()*.5),w*.6,P,seed+i*13,depth+1,tips);px=nx;py=ny;}
 tips.push([px,py]);return tips;}
function aqMoss(x,y,rad,P,seed){const r=rngF(seed);for(let i=0;i<34;i++){const a=r()*7,d=r()*rad;ell(K,x+Math.cos(a)*d,y+Math.sin(a)*d*.6,rad*(.18+r()*.2),rad*(.14+r()*.15),r()<.4?P.mossL:P.moss);}}
function aqAnubias(x,y,s,P,seed){const r=rngF(seed);for(let i=0;i<7;i++){const a=-Math.PI/2+(i/6-.5)*2.2+(r()-.5)*.2,l=s*(.6+r()*.4),ex=x+Math.cos(a)*l,ey=y+Math.sin(a)*l*.8;
 K.strokeStyle=P.plantD;K.lineWidth=s*.05;K.beginPath();K.moveTo(x,y);K.lineTo(ex,ey);K.stroke();K.save();K.translate(ex,ey);K.rotate(a);K.fillStyle=i%2?P.plantD:mix(P.plantD,P.plant,.5);K.beginPath();K.ellipse(s*.25,0,s*.32,s*.15,0,0,7);K.fill();
 K.strokeStyle='rgba(255,255,255,.18)';K.lineWidth=s*.02;K.beginPath();K.moveTo(-s*.05,0);K.lineTo(s*.55,0);K.stroke();K.restore();}}
function aqBack(P){K.fillStyle=vg(0,H,[[0,P.top],[.5,P.mid],[1,P.deep]]);K.fillRect(0,0,W,H);
 K.fillStyle=`rgba(${P.ray},.25)`;K.beginPath();K.moveTo(0,0);for(let x=0;x<=W;x+=20)K.lineTo(x,70+Math.sin(x*.02)*8);K.lineTo(W,0);K.fill();
 K.filter='blur(8px)';const r=rngF(3);for(let i=0;i<46;i++){const x=r()*W,h=300+r()*520,w=24+r()*30,lean=(r()-.5)*.25;K.fillStyle=hexA(P.far,.55);K.beginPath();K.moveTo(x-w/2,AQ_SY);K.quadraticCurveTo(x+lean*h,AQ_SY-h*.6,x+lean*h*1.4,AQ_SY-h);K.quadraticCurveTo(x+lean*h+w*.3,AQ_SY-h*.5,x+w/2,AQ_SY);K.fill();}K.filter='none';}
function aqFront(P){
 // driftwood + moss
 const tips=[];aqWood(430,AQ_SY+10,520,-2.2,46,P,11,0,tips);aqWood(460,AQ_SY+10,430,-1.15,40,P,12,0,tips);aqWood(380,AQ_SY+12,260,-2.8,30,P,13,0,tips);
 tips.forEach((p,i)=>aqMoss(p[0],p[1],38,P,40+i));aqMoss(430,AQ_SY-30,60,P,7);
 // rocks
 aqRock(770,AQ_SY+14,330,280,P,5);aqRock(960,AQ_SY+16,200,160,P,6);aqRock(610,AQ_SY+16,150,110,P,8);
 aqAnubias(660,AQ_SY+6,120,P,3);aqAnubias(250,AQ_SY+8,100,P,4);
 // substrate
 const r=rngF(9);K.beginPath();K.moveTo(0,H);K.lineTo(0,AQ_SY-30);for(let x=0;x<=W;x+=40)K.lineTo(x,AQ_SY+Math.sin(x*.008)*18-(x<120||x>960?20:0));K.lineTo(W,H);K.closePath();
 K.fillStyle=vg(AQ_SY-30,H,[[0,P.subL],[.12,P.sub],[1,P.subD]]);K.fill();
 for(let i=0;i<260;i++){const x=r()*W,y=AQ_SY+10+r()*r()*500;ell(K,x,y,3+r()*7,2+r()*4,r()<.5?hexA(P.subL,.6):hexA(P.subD,.6));}
 // carpet blades
 K.lineCap='round';for(let i=0;i<520;i++){const x=r()*W,y=AQ_SY+Math.sin(x*.008)*18+4+r()*16,l=10+r()*22,a=-Math.PI/2+(r()-.5)*.9;K.strokeStyle=r()<.5?P.plantL:P.plant;K.lineWidth=3;K.beginPath();K.moveTo(x,y);K.lineTo(x+Math.cos(a)*l,y+Math.sin(a)*l);K.stroke();}
}
// ---------- animated pieces ----------
const AQPL=(()=>{const r=rngF(21),L=[];
 for(let i=0;i<11;i++)L.push({k:'stem',x:20+i*24+r()*12,h:620+r()*300,c:'plant',cl:'plantL',s:r()*9});
 for(let i=0;i<6;i++)L.push({k:'stem',x:300+i*22+r()*10,h:360+r()*180,c:'red',cl:'redL',s:r()*9});
 for(let i=0;i<14;i++)L.push({k:'rib',x:790+i*20+r()*10,h:680+r()*300,w:12+r()*6,c:i%2?'plant':'plantD',s:r()*9});
 for(let i=0;i<8;i++)L.push({k:'stem',x:520+i*32+r()*12,h:240+r()*160,c:'plantD',cl:'plant',s:r()*9});
 return L;})();
function aqStem(c,x,y,h,col,colL,seed,t){let px=x,py=y,a=-Math.PI/2;const n=Math.floor(h/26);c.lineCap='round';
 for(let i=0;i<n;i++){const u=i/n;a=-Math.PI/2+Math.sin(t*1.1+seed+i*.18)*.05*u*3;const nx=px+Math.cos(a)*26,ny=py+Math.sin(a)*26;
  c.strokeStyle=col;c.lineWidth=3;c.beginPath();c.moveTo(px,py);c.lineTo(nx,ny);c.stroke();const lc=u>.7?colL:col,ls=12*(1-u*.35);
  for(const s of[-1,1]){c.save();c.translate(nx,ny);c.rotate(a+s*1.05+Math.sin(t*1.6+seed+i)*.08);c.fillStyle=lc;c.beginPath();c.ellipse(ls,0,ls,ls*.38,0,0,7);c.fill();c.restore();}px=nx;py=ny;}}
function aqRibbon(c,x,y,h,w,col,seed,t){const n=16,L=[],R=[];for(let i=0;i<=n;i++){const u=i/n,ox=Math.sin(t*1.0+seed+u*3)*u*u*70+u*u*40*Math.sin(seed),px=x+ox,py=y-h*u,ww=w*(1-u*.6);L.push([px-ww/2,py]);R.push([px+ww/2,py]);}
 c.beginPath();c.moveTo(L[0][0],L[0][1]);L.forEach(p=>c.lineTo(p[0],p[1]));R.reverse().forEach(p=>c.lineTo(p[0],p[1]));c.closePath();c.fillStyle=col;c.fill();}
function aqBubbles(c,t,x,yTop,yBot,n,seed){for(let i=0;i<n;i++){const v=140+rnd(seed+i)*120,range=yBot-yTop,y=yBot-((t*v+rnd(seed+i*7)*range)%range),bx=x+Math.sin(t*3+i)*8+(rnd(i+seed*3)-.5)*30,r=5+rnd(i*3+seed)*9;
 c.beginPath();c.arc(bx,y,r,0,7);c.strokeStyle='rgba(255,255,255,.7)';c.lineWidth=2.5;c.stroke();ell(c,bx-r*.35,y-r*.35,r*.25,r*.25,'rgba(255,255,255,.8)');}}
function aqSpecks(c,t){c.fillStyle='rgba(255,255,255,.35)';for(let i=0;i<40;i++){const x=(rnd(i)*W+t*8*(rnd(i+5)-.5))%W,y=(rnd(i+11)*1100+Math.sin(t*.6+i)*20+60);c.beginPath();c.arc(x,y,1.5+rnd(i+2)*2,0,7);c.fill();}}
function aqRays(c,t,P){c.save();c.globalCompositeOperation='lighter';for(let i=0;i<6;i++){const x=80+i*190+Math.sin(t*.3+i)*40,a=.05+.035*Math.sin(t*.8+i*1.7);
 const g=c.createLinearGradient(0,0,0,1300);g.addColorStop(0,`rgba(${P.ray},${a})`);g.addColorStop(1,`rgba(${P.ray},0)`);c.fillStyle=g;c.beginPath();c.moveTo(x-30,0);c.lineTo(x+30,0);c.lineTo(x+160,1300);c.lineTo(x-40,1300);c.closePath();c.fill();}c.restore();}
// o: {pal:'nature'|'amber', fill:(c,t)=>{fish/shrimp in world coords}, algae:0..1, cloudy:0..1, bubbles:true}
function aqWorld(c,t,o={}){const k=o.pal||'nature',P=AQP[k];
 c.drawImage(cache('aqB_'+k,()=>bakeL(W,H,()=>aqBack(P))),0,0);
 for(const p of AQPL){if(p.k==='rib')aqRibbon(c,p.x,AQ_SY,p.h,p.w,P[p.c],p.s,t);else aqStem(c,p.x,AQ_SY,p.h,P[p.c],P[p.cl],p.s,t);}
 c.drawImage(cache('aqF_'+k,()=>bakeL(W,H,()=>aqFront(P))),0,0);
 if(o.algae){const a=o.algae;c.fillStyle=`rgba(90,150,40,${.38*a})`;c.fillRect(0,0,W,H);c.strokeStyle=`rgba(120,190,60,${.9*a})`;c.lineWidth=3;c.lineCap='round';
  for(let i=0;i<90;i++){const x=560+rnd(i)*500,y=AQ_SY-rnd(i+3)*rnd(i+3)*260,l=20+rnd(i+9)*50*a;c.beginPath();c.moveTo(x,y);c.quadraticCurveTo(x+Math.sin(t+i)*10,y-l*.5,x+Math.sin(t*1.3+i)*16,y-l);c.stroke();}
  for(let i=0;i<60;i++)ell(c,rnd(i+50)*W,rnd(i+80)*1100,6+rnd(i)*14,5+rnd(i)*10,`rgba(70,130,30,${.35*a})`);}
 if(o.fill)o.fill(c,t);
 if(o.bubbles!==false)aqBubbles(c,t,110,90,AQ_SY-40,16,1);
 aqSpecks(c,t);aqRays(c,t,P);
 if(o.cloudy){c.fillStyle=`rgba(226,234,214,${.55*o.cloudy})`;c.fillRect(0,0,W,H);}
}
// draw the world inside a rect (x,y,w,h); cy = world y at the rect's vertical centre
function aqView(c,t,x,y,w,h,cy,o={},rad=0){c.save();rr(c,x,y,w,h,rad);c.clip();const k=w/W;c.translate(x,y);c.scale(k,k);c.translate(0,-(cy-h/k/2));aqWorld(c,t,o);c.restore();}
// living room with a lit tank on a cabinet; o passed to aqWorld (fill etc.)
function aqRoom(c,t,o={}){
 c.fillStyle=lin(c,0,0,0,1400,[[0,'#1f2b36'],[1,'#2e3f4c']]);c.fillRect(0,0,W,1420);
 const g=c.createRadialGradient(540,740,80,540,740,760);g.addColorStop(0,'rgba(90,200,190,.35)');g.addColorStop(1,'rgba(90,200,190,0)');c.fillStyle=g;c.fillRect(0,0,W,1420);
 rr(c,760,150,220,170,8);c.fillStyle='#3c4b57';c.fill();rr(c,776,166,188,138,4);c.fillStyle='#5c8a7a';c.fill();ell(c,870,250,60,26,'#79a98f');
 c.fillStyle=lin(c,0,1420,0,H,[[0,'#5a4030'],[1,'#2a1d14']]);c.fillRect(0,1420,W,H-1420);c.strokeStyle='rgba(0,0,0,.25)';c.lineWidth=3;for(let i=0;i<6;i++){c.beginPath();c.moveTo(0,1440+i*90);c.lineTo(W,1440+i*90);c.stroke();}
 rr(c,90,1030,900,400,14);c.fillStyle='#3b2a20';c.fill();rr(c,110,1060,420,350,10);c.fillStyle='#4a3527';c.fill();rr(c,550,1060,420,350,10);c.fill();ell(c,500,1235,8,8,'#c9a66b');ell(c,580,1235,8,8,'#c9a66b');
 rr(c,100,450,880,580,10);c.fillStyle='#111317';c.fill();
 aqView(c,t,120,480,840,530,780,o);
 c.save();rr(c,120,480,840,530,0);c.clip();c.fillStyle='rgba(255,255,255,.07)';c.beginPath();c.moveTo(120,480);c.lineTo(420,480);c.lineTo(160,1010);c.lineTo(120,1010);c.fill();c.restore();
 rr(c,90,420,900,42,10);c.fillStyle='#17191e';c.fill();c.fillStyle='rgba(220,255,245,.9)';c.fillRect(130,458,820,5);
}
// ---------- fish ----------
function aqEye(c,x,y,r){ell(c,x,y,r,r,'#fff');ell(c,x+r*.2,y,r*.6,r*.62,'#15171c');ell(c,x+r*.38,y-r*.3,r*.22,r*.22,'#fff');}
function aqFishBody(c,L,h){c.beginPath();c.moveTo(L*.5,0);c.bezierCurveTo(L*.46,-h*1.1,-L*.12,-h*1.15,-L*.38,-h*.28);c.lineTo(-L*.38,h*.28);c.bezierCurveTo(-L*.12,h*1.15,L*.46,h*1.1,L*.5,0);c.closePath();}
function aqTail(c,x,ang,len,spr,fill,notch=.75){c.save();c.translate(x,0);c.rotate(ang);c.beginPath();c.moveTo(4,-3);c.quadraticCurveTo(-len*.5,-spr*.6,-len,-spr);c.lineTo(-len*notch,0);c.lineTo(-len,spr);c.quadraticCurveTo(-len*.5,spr*.6,4,3);c.closePath();c.fillStyle=fill;c.fill();c.restore();}
// kind: neon | guppy | betta | goldfish | oto ; o: {sx: -1..1 facing/turn, seed, col}
function fish(c,x,y,s,kind,t,o={}){const seed=o.seed||0;let sx=o.sx===undefined?1:o.sx;if(Math.abs(sx)<.1)sx=sx<0?-.1:.1;
 const wag=Math.sin(t*(kind==='betta'?5:10)+seed*5)*(kind==='betta'?.18:.3);c.save();c.translate(x,y+Math.sin(t*2+seed)*3);c.scale(s*sx,s);c.lineJoin='round';
 if(kind==='neon'){const L=100,h=14;aqTail(c,-36,wag,30,16,'rgba(225,235,245,.5)');c.fillStyle='rgba(225,235,245,.45)';c.beginPath();c.moveTo(0,-h);c.lineTo(-14,-h-12);c.lineTo(-18,-h+2);c.fill();
  aqFishBody(c,L,h);c.fillStyle=lin(c,0,-h,0,h,[[0,'#7f93a6'],[1,'#eef2f5']]);c.fill();c.save();aqFishBody(c,L,h);c.clip();c.fillStyle='#e2343f';c.beginPath();c.moveTo(14,1);c.lineTo(-46,1);c.lineTo(-46,h*1.3);c.lineTo(-4,h*1.3);c.closePath();c.fill();
  c.shadowColor='#3be0ff';c.shadowBlur=14;rr(c,-36,-5,72,7,3.5);c.fillStyle='#4fe6ff';c.fill();c.restore();aqEye(c,33,-2,5.5);}
 else if(kind==='guppy'){const L=66,h=11,tc=o.col||'#ff7a2b';c.save();c.translate(-22,0);c.rotate(wag);c.beginPath();c.moveTo(2,-4);c.bezierCurveTo(-30,-44,-74,-40,-70,0);c.bezierCurveTo(-74,40,-30,44,2,4);c.closePath();c.fillStyle=lin(c,-70,0,0,0,[[0,'#3a7bd5'],[.45,tc],[1,'#ffd36a']]);c.fill();c.fillStyle='rgba(20,30,60,.35)';for(let i=0;i<7;i++)ell(c,-20-rnd(i)*42,(rnd(i+3)-.5)*44,3.5,3.5,'rgba(20,30,60,.35)');c.restore();
  c.fillStyle=hexA('#3a7bd5',.85);c.beginPath();c.moveTo(4,-h);c.quadraticCurveTo(-10,-h-20,-22,-h-14);c.lineTo(-18,-h+2);c.fill();
  aqFishBody(c,L,h);c.fillStyle=lin(c,0,-h,0,h,[[0,'#8d8a76'],[1,'#e4ddc6']]);c.fill();ell(c,-6,0,6,4,hexA(tc,.8));aqEye(c,22,-2,4.5);}
 else if(kind==='betta'){const L=86,h=17,bc=o.col||'#2b4fd8',fc=mix(bc,'#c8243a',.35);const fw=Math.sin(t*3+seed);
  c.fillStyle=hexA(fc,.88);c.beginPath();c.moveTo(-28,-6);c.bezierCurveTo(-70,-70+fw*8,-130,-40+fw*10,-120,6);c.bezierCurveTo(-130,50-fw*10,-70,72-fw*8,-28,6);c.closePath();c.fill();
  c.strokeStyle=hexA('#ffffff',.25);c.lineWidth=2;for(let i=-3;i<=3;i++){c.beginPath();c.moveTo(-32,0);c.quadraticCurveTo(-80,i*14+fw*4,-118,i*16);c.stroke();}
  c.fillStyle=hexA(fc,.9);c.beginPath();c.moveTo(6,-h+2);c.quadraticCurveTo(-30,-h-46+fw*6,-60,-h-24);c.lineTo(-30,-h+4);c.fill();c.beginPath();c.moveTo(14,h-2);c.quadraticCurveTo(-20,h+60-fw*6,-70,h+40);c.lineTo(-32,h-2);c.fill();
  aqFishBody(c,L,h);c.fillStyle=lin(c,0,-h,0,h,[[0,mix(bc,'#000000',.25)],[1,mix(bc,'#ffffff',.25)]]);c.fill();aqEye(c,30,-3,5.5);}
 else if(kind==='goldfish'){const L=80,h=30;aqTail(c,-28,wag-.25,44,26,'rgba(255,140,50,.85)');aqTail(c,-28,wag+.25,44,26,'rgba(255,170,80,.75)');
  c.fillStyle='rgba(255,140,50,.85)';c.beginPath();c.moveTo(10,-h+2);c.quadraticCurveTo(-8,-h-24,-24,-h+6);c.fill();
  aqFishBody(c,L,h);c.fillStyle=lin(c,0,-h,0,h,[[0,'#f26a1e'],[1,'#ffc04a']]);c.fill();c.strokeStyle='rgba(255,255,255,.25)';c.lineWidth=2;for(let i=0;i<4;i++)for(let j=-1;j<=1;j++){c.beginPath();c.arc(-i*12+6,j*12,7,-1.2,1.2);c.stroke();}aqEye(c,26,-6,6.5);}
 else{const L=58,h=9;aqTail(c,-21,wag,16,10,'rgba(200,180,140,.7)');aqFishBody(c,L,h);c.fillStyle=lin(c,0,-h,0,h,[[0,'#8a7650'],[1,'#e8dcc0']]);c.fill();rr(c,-24,-2,50,4,2);c.fillStyle='#3b2f22';c.fill();aqEye(c,19,-3,3.6);}
 c.restore();}
// school that cruises left-right and turns together: {kind,n,cx,cy,w,h,A,s,speed,seed}
function aqSchool(c,t,o){const r=rngF(o.seed||1);for(let i=0;i<o.n;i++){const ox=(r()-.5)*o.w,oy=(r()-.5)*o.h,ph=r()*6,a=t*(o.speed||.35)+ph*.12+(o.seed||0),A=o.A===undefined?240:o.A;
 fish(c,o.cx+ox+Math.sin(a)*A,o.cy+oy+Math.sin(a*1.7+ph)*16,(o.s||1)*(.85+r()*.3),o.kind,t,{sx:cl(Math.cos(a)*3,-1,1),seed:i+ph,col:o.col});}}
// ---------- shrimp ----------
const SHR={cherry:['#d8262f','#ff7468','#8e1219'],blue:['#2f6fe0','#7fb0ff','#183b88'],yellow:['#f2c230','#ffe88a','#a37c10'],
 crystal:['#fbfbfb','#ffffff','#c9c9c9'],amano:['rgba(190,205,210,.8)','rgba(235,240,240,.85)','#5b6f8a'],black:['#2a2a33','#55556a','#111116']};
// o: {sx dir, walk 0..1, cute (mascot face), expr:'h'|'w'|'n', molt, eggs}
function shrimp(c,x,y,s,col,t,o={}){const seed=o.seed||0,[b,hl,dk]=SHR[col]||SHR.cherry,walk=o.walk||0;let sx=o.sx===undefined?1:o.sx;if(Math.abs(sx)<.1)sx=sx<0?-.1:.1;
 c.save();c.translate(x,y+Math.sin(t*2.2+seed)*1.5);c.scale(s*sx,s);c.lineCap='round';
 const aw=Math.sin(t*2.5+seed)*6;c.strokeStyle=dk;c.lineWidth=1.6;
 c.beginPath();c.moveTo(38,-6);c.quadraticCurveTo(70,-40+aw,110,-30+aw*1.5);c.stroke();c.beginPath();c.moveTo(38,-6);c.quadraticCurveTo(64,-60-aw,96,-70-aw);c.stroke();
 c.lineWidth=1.3;c.beginPath();c.moveTo(40,-4);c.lineTo(58,-16+aw*.4);c.moveTo(40,-4);c.lineTo(60,-8-aw*.4);c.stroke();
 c.strokeStyle=dk;c.lineWidth=2.3;for(let i=0;i<5;i++){const bx=26-i*7,ph=t*12*walk+i*1.3,fx=bx+4+Math.sin(ph)*4*walk,fy=27-Math.max(0,Math.cos(ph))*3*walk;c.beginPath();c.moveTo(bx,9);c.lineTo(bx+3,18);c.lineTo(fx,fy);c.stroke();}
 const SG=[[-6,-1,13,12],[-19,1,12,11],[-30,5,11,10],[-39,11,9,9],[-45,18,8,7.5],[-48,25,6.5,6.5]];
 c.lineWidth=1.6;for(let i=0;i<5;i++){const g=SG[i],f=Math.sin(t*9+i)*2;c.beginPath();c.moveTo(g[0],g[1]+g[3]-1);c.lineTo(g[0]-3+f,g[1]+g[3]+7);c.stroke();}
 if(o.eggs){for(let i=0;i<11;i++)ell(c,-14-(i%4)*6-(i>7?3:0),14+Math.floor(i/4)*4,3.2,3.2,i%2?'#f2c84a':'#e6b030');}
 for(const a of[-.5,0,.5]){c.save();c.translate(-49,31);c.rotate(.9+a+Math.sin(t*3+seed)*.06);c.fillStyle=a?hl:b;c.beginPath();c.ellipse(8,0,9,4.5,0,0,7);c.fill();c.restore();}
 for(let i=SG.length-1;i>=0;i--){const g=SG[i];ell(c,g[0],g[1],g[2],g[3],col==='crystal'?(i%2?'#d22b36':'#fbfbfb'):b);ell(c,g[0]+1,g[1]-g[3]*.45,g[2]*.6,g[3]*.3,hexA(col==='crystal'?'#ffffff':(hl[0]==='#'?hl:'#ffffff'),.55));}
 if(col==='amano'){c.fillStyle='#5b6f8a';for(let i=0;i<8;i++)ell(c,-44+i*9,6-i*.6+Math.sin(i)*2,2.4,1.4,'#5b6f8a');}
 c.save();c.translate(14,-1);c.rotate(-.06);ell(c,0,0,25,14.5,col==='crystal'?'#d22b36':b);ell(c,2,-6,17,5,hexA(col==='crystal'?'#ffffff':(hl[0]==='#'?hl:'#ffffff'),.5));if(col==='crystal'){ell(c,14,0,9,12,'#fbfbfb');}c.restore();
 if(o.molt){rr(c,-6,-14,7,28,3);c.fillStyle='#ffffff';c.fill();}
 c.fillStyle=col==='crystal'?'#d22b36':b;c.beginPath();c.moveTo(33,-9);c.lineTo(52,-13);c.lineTo(35,-2);c.closePath();c.fill();
 if(o.cute){const e=o.expr||'h';aqEye(c,30,-9,8.5);if(e==='w'){c.strokeStyle='#15171c';c.lineWidth=2;c.beginPath();c.moveTo(22,-21);c.lineTo(36,-18);c.stroke();}
  ell(c,24,4,4.5,2.8,'rgba(255,150,150,.6)');c.strokeStyle='#4a1010';c.lineWidth=2;c.beginPath();if(e==='h')c.arc(36,3,4.5,.2,Math.PI-.2);else if(e==='w')c.arc(36,8,4,Math.PI+.3,-.3);else{c.moveTo(32,5);c.lineTo(40,5);}c.stroke();}
 else{ell(c,33,-7,4,4,'#111');ell(c,34,-8.5,1.2,1.2,'#fff');}
 c.restore();}
// shrimp pacing slowly along the substrate: {col,x0,x1,y,s,seed,speed}
function aqShrimpWalk(c,t,o){const a=t*(o.speed||.22)+(o.seed||0),k=.5+.5*Math.sin(a),v=Math.cos(a);shrimp(c,o.x0+(o.x1-o.x0)*k,o.y,o.s||1,o.col,t,{sx:cl(v*4,-1,1),walk:Math.min(1,Math.abs(v)*1.5),seed:o.seed,eggs:o.eggs,molt:o.molt});}
// ---------- props ----------
function aqBottle(c,x,y,s,label,col='#2f9e6a'){if(s<=0)return;c.save();c.translate(x,y);c.scale(s,s);rr(c,-22,-150,44,30,8);c.fillStyle='#262233';c.fill();rr(c,-60,-125,120,180,26);c.fillStyle=col;c.fill();
 rr(c,-50,-70,100,80,10);c.fillStyle='#fff';c.fill();c.font='22px K';c.fillStyle='#262233';c.textAlign='center';c.fillText(label,0,-22);ell(c,-36,-100,8,16,'rgba(255,255,255,.35)');c.restore();}
function aqHeater(c,x,y,s,t){if(s<=0)return;c.save();c.translate(x,y);c.scale(s,s);rr(c,-30,-175,60,32,10);c.fillStyle='#262233';c.fill();rr(c,-22,-150,44,260,22);c.fillStyle='rgba(220,240,255,.45)';c.fill();c.lineWidth=3;c.strokeStyle='rgba(255,255,255,.7)';c.stroke();
 const gl=.6+.4*Math.sin(t*4);c.strokeStyle=`rgba(255,90,60,${gl})`;c.lineWidth=5;c.beginPath();for(let yy=-120;yy<80;yy+=6)c.lineTo(Math.sin(yy*.5)*10,yy);c.stroke();ell(c,-34,-60,9,9,'#9fc6d8');ell(c,-34,40,9,9,'#9fc6d8');c.restore();}
function aqTestTube(c,x,y,s,col='#5bbf6a',t=0){if(s<=0)return;c.save();c.translate(x,y);c.scale(s,s);rr(c,-26,-170,52,230,26);c.fillStyle='rgba(230,245,255,.35)';c.fill();c.lineWidth=4;c.strokeStyle='rgba(255,255,255,.8)';c.stroke();
 c.save();rr(c,-26,-170,52,230,26);c.clip();c.fillStyle=col;c.fillRect(-30,-70+Math.sin(t*3)*3,60,140);c.restore();rr(c,-32,-184,64,22,8);c.fillStyle='#262233';c.fill();c.restore();}
// food flakes dropped at t0, falling then settling on the substrate
function aqFlakes(c,t,t0,x,y,n=30,yEnd=AQ_SY){if(t<t0)return;for(let i=0;i<n;i++){const d=(t-t0)*(60+rnd(i)*80),fy=Math.min(yEnd+rnd(i+4)*20,y+d),fx=x+(rnd(i+9)-.5)*260+Math.sin(t*2+i)*10*(fy<yEnd?1:0);
 c.save();c.translate(fx,fy);c.rotate(rnd(i)*6+t*(fy<yEnd?1:0));c.fillStyle=['#e8843a','#d8462f','#f2c230'][i%3];c.fillRect(-7,-4,14,8);c.restore();}}
// blurred aquarium backdrop for close-up / lineup scenes, baked ONCE (live canvas blur costs ~40 s/frame in software rendering)
function aqBlurBG(c,o={}){const pal=o.pal||'nature',z=o.zoom||1,cx=o.cx||540,cy=o.cy||900,b=o.blur||7,k=`aqBlur_${pal}_${z}_${cx}_${cy}_${b}`;
 const img=cache(k,()=>{const sharp=mkC(W,H),g=sharp.getContext('2d');g.save();scaleAt(g,cx,cy,z);aqWorld(g,0,{pal,bubbles:false});g.restore();
  return bakeL(W,H,()=>{K.filter=`blur(${b}px)`;K.drawImage(sharp,0,0);K.filter='none';});});c.drawImage(img,0,0);}
// ---------- mascot: คุณเบต (Betta & Co.) ----------
// betta mascot facing right, ~560 px wide x 300 tall at s=1, origin = body centre
// o: {sx dir, expr:'h'|'w'|'smug'|'sad'|'n', pose:'idle'|'point'|'flare'|'wave', talk:true, look:-1..1, body, fin}
function betta(c,x,y,s,t,o={}){const seed=o.seed||0,pose=o.pose||'idle',e=o.expr||'h';let sx=o.sx===undefined?1:o.sx;if(Math.abs(sx)<.1)sx=sx<0?-.1:.1;
 const B=o.body||['#14277a','#3f74f0'],F=o.fin||['#2b4fd8','#d8253a'],w=Math.sin(t*3+seed)*10,fl=pose==='flare';
 c.save();c.translate(x,y+Math.sin(t*1.8+seed)*6);c.scale(s*sx,s);c.rotate(Math.sin(t*1.3+seed)*.03);c.lineJoin='round';c.lineCap='round';
 const fg=lin(c,-80,0,-290,0,[[0,F[0]],[.55,mix(F[0],F[1],.5)],[1,F[1]]]),fg2=lin(c,0,-40,0,-160,[[0,F[0]],[1,F[1]]]),fg3=lin(c,0,40,0,170,[[0,F[0]],[1,F[1]]]);
 c.save();scaleAt(c,-70,0,fl?1.08:.84);
 // tail
 c.beginPath();c.moveTo(-88,-28);c.bezierCurveTo(-170,-150+w,-300,-125+w,-285,0);c.bezierCurveTo(-300,125-w,-170,150-w,-88,28);c.closePath();c.fillStyle=fg;c.fill();
 c.strokeStyle='rgba(255,255,255,.22)';c.lineWidth=3;for(let i=-4;i<=4;i++){c.beginPath();c.moveTo(-95,0);c.quadraticCurveTo(-190,i*28+w*.5,-275,i*30*(1+Math.abs(i)*.02)+(i?w*.3:0));c.stroke();}
 // dorsal + anal
 c.beginPath();c.moveTo(25,-58);c.quadraticCurveTo(-20,-160+w*.6,-120,-125+w);c.quadraticCurveTo(-95,-75,-72,-40);c.closePath();c.fillStyle=fg2;c.fill();
 c.beginPath();c.moveTo(35,50);c.quadraticCurveTo(-10,175-w,-130,145-w);c.quadraticCurveTo(-95,85,-62,40);c.closePath();c.fillStyle=fg3;c.fill();
 c.restore();
 c.save();c.scale(1.15,1.15);
 if(fl){for(let i=0;i<9;i++)ell(c,52-i*5,46+Math.sin(i*1.7)*6+i*3,18,12,i%2?'#8e1424':'#b51f33');}
 // body
 c.beginPath();c.moveTo(112,8);c.bezierCurveTo(114,-62,20,-72,-40,-42);c.bezierCurveTo(-75,-28,-95,-12,-100,0);c.bezierCurveTo(-95,14,-75,30,-40,44);c.bezierCurveTo(20,70,112,62,112,8);c.closePath();
 c.fillStyle=lin(c,0,-70,0,62,[[0,B[0]],[.6,B[1]],[1,mix(B[1],'#ffffff',.25)]]);c.fill();
 c.save();c.clip();c.strokeStyle='rgba(160,200,255,.28)';c.lineWidth=3;for(let i=0;i<5;i++)for(let j=-1;j<=1;j++){c.beginPath();c.arc(-60+i*24,j*24,13,-1.2,1.2);c.stroke();}
 ell(c,40,-46,48,12,'rgba(255,255,255,.18)');c.restore();
 c.strokeStyle=fl?'#8e1424':'rgba(10,20,60,.45)';c.lineWidth=fl?7:4;c.beginPath();c.arc(-10,4,48,-.9,.9);c.stroke();
 // bow tie
 c.save();c.translate(72,54);c.rotate(-.12);c.fillStyle='#f2c230';c.beginPath();c.moveTo(0,0);c.lineTo(-30,-16);c.lineTo(-30,16);c.closePath();c.fill();c.beginPath();c.moveTo(0,0);c.lineTo(30,-16);c.lineTo(30,16);c.closePath();c.fill();
 c.fillStyle='#c99716';c.beginPath();c.moveTo(-30,-16);c.lineTo(-22,0);c.lineTo(-30,16);c.fill();c.beginPath();c.moveTo(30,-16);c.lineTo(22,0);c.lineTo(30,16);c.fill();ell(c,0,0,9,10,'#e0a91c');c.restore();
 // pectoral fin (hand)
 let pa=2.3+Math.sin(t*6+seed)*.25,pl=1,px=8,py=30;if(pose==='point'){pa=-.22+Math.sin(t*3)*.04;pl=1.55;px=40;py=40;}if(pose==='wave'){pa=-.75+Math.sin(t*10)*.4;pl=1.45;px=40;py=40;}c.save();c.translate(px,py);
 c.rotate(pa);c.beginPath();c.moveTo(0,-8);c.quadraticCurveTo(40*pl,-26,62*pl,-4);c.quadraticCurveTo(44*pl,18,0,8);c.closePath();c.fillStyle=mix(F[0],'#ffffff',.3);c.fill();c.lineWidth=3;c.strokeStyle=hexA(F[1],.8);c.stroke();c.restore();
 // eye + brow
 const ex=62,ey=-16,er=31,lk=(o.look||0)*5;ell(c,ex,ey,er+3,er+3,'rgba(10,20,60,.5)');ell(c,ex,ey,er,er,'#fff');
 const pr=e==='w'?10:16;ell(c,ex+5+lk,ey+2,pr,pr*1.05,'#15171c');ell(c,ex+10+lk,ey-6,pr*.36,pr*.36,'#fff');ell(c,ex+lk,ey+8,pr*.16,pr*.16,'#fff');
 if(e==='smug'||((t+seed*1.7)%3.6)<.12){c.save();c.beginPath();c.arc(ex,ey,er+2,0,7);c.clip();c.fillStyle=B[0];c.fillRect(ex-er-4,ey-er-4,er*2+8,e==='smug'?er+2:er*2+8);c.restore();c.strokeStyle='#0d1640';c.lineWidth=4;c.beginPath();c.moveTo(ex-er,ey+(e==='smug'?-2:er*.1));c.lineTo(ex+er,ey+(e==='smug'?-2:er*.1));c.stroke();}
 c.strokeStyle='#0d1640';c.lineWidth=6;c.beginPath();const by=ey-er-12;
 if(e==='w'){c.moveTo(ex-20,by-12);c.quadraticCurveTo(ex,by-24,ex+20,by-12);}else if(e==='sad'){c.moveTo(ex-20,by-2);c.lineTo(ex+18,by+8);}else if(e==='smug'){c.moveTo(ex-20,by+6);c.lineTo(ex+18,by-4);}else{c.moveTo(ex-20,by);c.quadraticCurveTo(ex,by-10,ex+20,by);}c.stroke();
 ell(c,92,20,13,8,'rgba(255,120,150,.55)');
 // mouth
 const mx=104,my=24,open=o.talk&&Math.sin(t*15)>-.1;c.strokeStyle='#3a0a14';c.lineWidth=4.5;c.fillStyle='#5a0f1e';c.beginPath();
 if(e==='w'){c.ellipse(mx-2,my+4,8,11,0,0,7);c.fill();}
 else if(open){c.ellipse(mx-3,my+2,10,8+Math.abs(Math.sin(t*15))*4,0,0,7);c.fill();ell(c,mx-3,my+7,6,3,'#e2667a');}
 else if(e==='sad'){c.arc(mx-4,my+12,9,Math.PI+.4,-.4);c.stroke();}
 else if(e==='smug'){c.moveTo(mx-14,my+2);c.quadraticCurveTo(mx-4,my+8,mx+4,my-4);c.stroke();}
 else if(e==='n'){c.moveTo(mx-12,my+3);c.lineTo(mx+2,my+3);c.stroke();}
 else{c.arc(mx-4,my,10,.15,Math.PI-.15);c.stroke();}
 c.restore();c.restore();}
// shop badge "Betta & Co."
function bettaLogo(c,t,t0,x,y,s=1,tag='ปลากัด · ไม้น้ำ · กุ้งแคระ'){const k=pop(t,t0,.5)*s;if(k<=0)return;c.save();c.translate(x,y);c.scale(k,k);
 rr(c,-330,-120,660,240,60);c.fillStyle='#13205e';c.fill();c.lineWidth=8;c.strokeStyle='#f2c230';c.stroke();rr(c,-312,-102,624,204,48);c.lineWidth=2;c.strokeStyle='rgba(242,194,48,.5)';c.stroke();
 c.font='104px K';c.textAlign='left';const w1=c.measureText('Betta ').width,w2=c.measureText('& Co.').width,x0=-(w1+w2)/2;
 c.fillStyle='rgba(0,0,0,.35)';c.fillText('Betta ',x0+3,22);c.fillStyle='#fff';c.fillText('Betta ',x0,18);c.fillStyle='#f2c230';c.fillText('& Co.',x0+w1,18);
 c.font='34px KS';c.textAlign='center';c.fillStyle='#cfe0ff';c.fillText(tag,0,76);
 for(let i=0;i<3;i++){c.beginPath();c.arc(260+i*22,-70-i*26,8+i*3,0,7);c.strokeStyle='rgba(255,255,255,.6)';c.lineWidth=3;c.stroke();}c.restore();}
// speech bubble; txt may use '|' for 2 lines and {y:..}; tail points at (tx,ty)
function talkBubble(c,t,t0,x,y,txt,tx,ty,t1=1e9){const k=pop(t,t0,.35)*(1-fade(t,t1,.2));if(k<=0)return;const L=txt.split('|');c.save();c.translate(x,y);c.scale(k,k);c.font='46px K';
 const w=Math.max(...L.map(l=>c.measureText(l.replace(/\{.:|\}/g,'')).width))+70,h=L.length*62+40;c.fillStyle='#fff';c.beginPath();c.moveTo(-26,h/2-4);c.lineTo(tx-x,ty-y);c.lineTo(26,h/2-4);c.fill();
 rr(c,-w/2,-h/2,w,h,34);c.fill();L.forEach((l,i)=>{const q=seg(l);let tw=0;q.forEach(p=>tw+=c.measureText(p[1]).width);let xx=-tw/2;q.forEach(p=>{c.fillStyle=p[0]==='w'?'#1c2240':p[0]==='y'?'#d8862f':'#D8353B';c.textAlign='left';c.fillText(p[1],xx,-h/2+66+i*62);xx+=c.measureText(p[1]).width;});});c.restore();}
