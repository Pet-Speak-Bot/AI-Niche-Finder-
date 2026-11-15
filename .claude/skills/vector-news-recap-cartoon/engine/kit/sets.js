// reusable sets/props: cache, cliff, fg leaves, ground bits, news studio, rain, info icons
const LAND={};function cache(k,fn){return LAND[k]||(LAND[k]=fn());}
function cliff(P,x0,x1,top,yb,mouth,seed){ // painted rock cliff with forest on top + cave mouth
 const r=rngF(seed);const pts=[];for(let i=0;i<=8;i++){const x=lerpF(x0,x1,i/8);pts.push([x,top+Math.sin(i*1.3+seed)*40+(r()-.5)*30+(Math.abs(i-4))*12]);}
 const dh=yb-top;pts[0][1]=yb-dh*.12;pts[1][1]=top+dh*.45;pts[8][1]=yb-dh*.12;pts[7][1]=top+dh*.45;
 silPath(pts,yb);K.fillStyle=vg(top-40,yb,[[0,P.rockL],[.4,P.rock],[1,P.rockD]]);K.fill();
 K.save();silPath(pts,yb);K.clip();
 for(let i=0;i<14;i++){K.strokeStyle='rgba(0,0,0,.13)';K.lineWidth=3;K.beginPath();const yy=top+40+i*((yb-top)/14);K.moveTo(x0,yy);for(let x=x0;x<=x1;x+=30)K.lineTo(x,yy+Math.sin(x*.02+i)*10);K.stroke();}
 for(let i=0;i<40;i++){K.fillStyle=r()<.5?'rgba(0,0,0,.12)':'rgba(255,255,255,.10)';K.beginPath();K.ellipse(lerpF(x0,x1,r()),lerpF(top,yb,r()),10+r()*30,5+r()*12,0,0,7);K.fill();}
 for(let i=0;i<22;i++){K.fillStyle=hexA(P.moss,.85);K.beginPath();K.ellipse(lerpF(x0,x1,r()),lerpF(top+30,yb-40,r()),18+r()*40,8+r()*14,(r()-.5)*.4,0,7);K.fill();}
 if(mouth){const [mx,my,mw,mh]=mouth;K.fillStyle=P.rockD;K.beginPath();K.ellipse(mx,my+6,mw+22,mh+18,0,Math.PI,0);K.fill();const g=K.createRadialGradient(mx,my,10,mx,my-mh*.3,mh*1.1);g.addColorStop(0,'#050403');g.addColorStop(1,'#1d1712');K.fillStyle=g;K.beginPath();K.ellipse(mx,my,mw,mh,0,Math.PI,0);K.fill();
  for(let i=0;i<9;i++){K.fillStyle=P.rockD;const sx=mx-mw*.8+i*mw*.2;K.beginPath();K.moveTo(sx-10,my-mh*Math.sqrt(1-Math.pow((sx-mx)/mw,2))+2);K.lineTo(sx,my-mh*Math.sqrt(Math.max(0,1-Math.pow((sx-mx)/mw,2)))+30+r()*30);K.lineTo(sx+10,my-mh*Math.sqrt(1-Math.pow((sx-mx)/mw,2))+2);K.fill();}}
 K.restore();
 // vines
 for(let i=0;i<10;i++){const vx=lerpF(x0+30,x1-30,r()),vy=yOn(pts,vx)+5,len=60+r()*160;K.strokeStyle=P.nearT;K.lineWidth=3;K.beginPath();K.moveTo(vx,vy);K.quadraticCurveTo(vx+10,vy+len*.5,vx-4,vy+len);K.stroke();for(let k=0;k<len;k+=18)bigLeaf(vx+Math.sin(k)*4,vy+k,14,(k%36?0.6:2.5),k%36?P.near:P.nearL,P.nearT);}
 // trees on top
 for(let x=x0-20;x<x1+20;x+=26+r()*20){const yy=yOn(pts,Math.max(x0,Math.min(x1,x)))+18,h=90+r()*90;if(r()<.4)conifer(x,yy,h,P.nearT,P.nearL,seed+x|0,.34);else broad(x,yy,h,P.near,P.nearL,P.trunk,seed+x*3|0);}
 for(let i=0;i<8;i++)fern(lerpF(x0,x1,r()),yOn(pts,lerpF(x0,x1,.5))+20+r()*40,60+r()*30,P.fern,P.fernL,seed+i*5);
 return pts;
}
function fgLeaves(P,corners,seed){return bakeL(1080,1920,()=>{const r=rngF(seed);K.filter='blur(7px)';for(const [cx,cy,ang] of corners){for(let i=0;i<9;i++)bigLeaf(cx+(r()-.5)*90,cy+(r()-.5)*90,150+r()*120,ang+(r()-.5)*1.1,mix(P.nearT,'#000000',.35),mix(P.near,'#000000',.2));}K.filter='none';});}
function groundBits(P,x0,x1,y0,y1,n,seed){const r=rngF(seed);for(let i=0;i<n;i++){const x=lerpF(x0,x1,r()),y=lerpF(y0,y1,r());if(r()<.6)tuft(x,y,18+r()*22,hexA(P.fern,.9),seed+i);else{K.fillStyle=hexA(P.rockD,.35);K.beginPath();K.ellipse(x,y,4+r()*8,3+r()*4,0,0,7);K.fill();}}}
function studioBG(c,t,mon){
 c.fillStyle=lin(c,0,0,0,1200,[[0,'#151a3a'],[1,'#263071']]);c.fillRect(0,0,W,1200);
 for(let r=0;r<4;r++)for(let q=0;q<4;q++){const x=40+q*252,y=380+r*190;rr(c,x,y,236,176,10);c.fillStyle=(r+q)%3?'#2c3672':'#323d80';c.fill();c.fillStyle='rgba(140,155,230,.22)';for(let l=0;l<4;l++){c.fillRect(x+20,y+28+l*34,90+rnd(r*7+q*3+l)*110,12);}}
 c.fillStyle='#8fa0ff';c.fillRect(30,1160,W-60,8);c.fillStyle=lin(c,0,1168,0,H,[[0,'#1d2040'],[1,'#0b0c18']]);c.fillRect(0,1168,W,H-1168);
 c.fillStyle='rgba(143,160,255,.25)';c.fillRect(0,1290,W,3);
 if(mon){const mx=200,my=460,mw=680,mh=440;rr(c,mx-14,my-14,mw+28,mh+28,22);c.fillStyle='#0b0d18';c.fill();c.save();rr(c,mx,my,mw,mh,10);c.clip();caveMini(c,mx,my,mw,mh,t);c.restore();}
}
function rain(c,t,x0,y0,w,h,n=90,col='rgba(210,220,255,.35)'){c.strokeStyle=col;c.lineWidth=2.4;for(let i=0;i<n;i++){const rx=x0+((rnd(i)*w+t*90)%w),ry=y0+((rnd(i+99)*h+t*900)%h);c.beginPath();c.moveTo(rx,ry);c.lineTo(rx-8,ry+34);c.stroke();}}
function icon(c,x,y,s,kind,ring,t){if(s<=0)return;c.save();c.translate(x,y);c.scale(s,s);
 ell(c,0,0,92,92,ring==='r'?'#5a1e28':'#1f2a58');c.lineWidth=6;c.strokeStyle=ring==='r'?'#ff6b6b':'#8d9cf0';c.beginPath();c.arc(0,0,92,0,Math.PI*2);c.stroke();
 c.lineCap='round';c.lineJoin='round';
 if(kind==='dark'){ell(c,0,0,42,42,'#F7E3A0');ell(c,18,-12,38,38,ring==='r'?'#5a1e28':'#1f2a58');for(let i=0;i<4;i++)ell(c,-40+i*25,40-(i%2)*70,3,3,'#fff');}
 if(kind==='narrow'){c.fillStyle='#b98b63';c.fillRect(-60,-50,22,100);c.fillRect(38,-50,22,100);c.strokeStyle='#fff';c.lineWidth=8;c.beginPath();c.moveTo(-28,0);c.lineTo(-8,0);c.moveTo(-18,-10);c.lineTo(-8,0);c.lineTo(-18,10);c.moveTo(28,0);c.lineTo(8,0);c.moveTo(18,-10);c.lineTo(8,0);c.lineTo(18,10);c.stroke();}
 if(kind==='water'){c.strokeStyle='#5fb4ff';c.lineWidth=9;for(let i=0;i<3;i++){c.beginPath();for(let x=-50;x<=50;x+=5)c.lineTo(x,-26+i*26+Math.sin(x*.12+t*4)*7);c.stroke();}}
 if(kind==='swim'){ell(c,-30,-22,12,12,'#F1C6A2');c.strokeStyle='#F1C6A2';c.lineWidth=12;c.beginPath();c.moveTo(-18,-12);c.lineTo(25,0);c.moveTo(-10,-14);c.lineTo(-40,-45);c.stroke();c.strokeStyle='#5fb4ff';c.lineWidth=7;c.beginPath();for(let x=-60;x<=60;x+=5)c.lineTo(x,22+Math.sin(x*.12+t*4)*6);c.stroke();c.strokeStyle='#ff4d4d';c.lineWidth=12;c.beginPath();c.moveTo(-55,-55);c.lineTo(55,55);c.stroke();}
 c.restore();}
// ---------- generic news-recap widgets (use inside any scene) ----------
// white card with label + rolling number (like the ref's "ยอดเงินเข้า 678 ล้านบาท")
function counterCard(c,t,t0,x,y,label,to,unit='',dur=1.4,col='#D8353B'){const s=pop(t,t0);if(s<=0)return;const v=Math.round(to*eoc((t-t0)/dur));c.save();c.translate(x,y);c.scale(s,s);rr(c,-260,-130,520,240,30);c.fillStyle='rgba(255,255,255,.96)';c.fill();c.font='34px KS';c.fillStyle='#4a4f63';c.textAlign='center';c.fillText(label,0,-62);c.font='104px K';c.fillStyle=col;c.fillText(v.toLocaleString('en-US'),0,46);if(unit){c.font='36px K';c.fillStyle='#262233';c.fillText(unit,0,96);}c.restore();}
// tilted stamp that slams in
function stamp(c,t,t0,x,y,txt,col='#E8892B',rot=-.12){if(t<t0)return;const k=1+.8*(1-eoc((t-t0)/.22));c.save();c.translate(x,y);c.rotate(rot);c.scale(k,k);c.globalAlpha=cl((t-t0)/.1);c.font='80px K';const w=c.measureText(txt).width+80;rr(c,-w/2,-66,w,132,18);c.fillStyle='rgba(255,255,255,.9)';c.fill();c.lineWidth=10;c.strokeStyle=col;c.stroke();c.fillStyle=col;c.textAlign='center';c.fillText(txt,0,28);c.restore();}
// phone with checklist rows: rows=[[text,time,ok(true/false)]]
function phoneChecklist(c,t,t0,title,rows){const s=pop(t,t0,.45);if(s<=0)return;c.save();scaleAt(c,540,820,s);rr(c,290,450,500,700,56);c.fillStyle='#14161f';c.fill();rr(c,312,472,456,656,40);c.fillStyle='#f4f5f8';c.fill();c.font='38px K';c.fillStyle='#262233';c.textAlign='center';c.fillText(title,540,560);
 rows.forEach((r,i)=>{const q=pop(t,r[1]);if(q<=0)return;const ok=r[2]!==false,y=600+i*130;c.save();scaleAt(c,540,y+40,q);rr(c,330,y,420,96,20);c.fillStyle=ok?'#e7f6ea':'#fdeaea';c.fill();c.lineWidth=4;c.strokeStyle=ok?'#44b25a':'#d8353b';c.stroke();c.font='32px KS';c.fillStyle='#262233';c.textAlign='left';c.fillText(r[0],355,y+60);ell(c,705,y+48,26,26,ok?'#44b25a':'#d8353b');c.strokeStyle='#fff';c.lineWidth=7;c.beginPath();if(ok){c.moveTo(692,y+48);c.lineTo(702,y+59);c.lineTo(720,y+37);}else{c.moveTo(694,y+37);c.lineTo(716,y+59);c.moveTo(716,y+37);c.lineTo(694,y+59);}c.stroke();c.restore();});c.restore();}
// node graph with dotted gold trail (money trail): nodes=[{x,y,label,t,red}] links=[[a,b,t]]
function nodeTrail(c,t,nodes,links){c.save();c.setLineDash([3,20]);c.lineCap='round';c.lineWidth=10;c.strokeStyle='#F7C744';for(const [a,b,t0] of links){const q=eoc((t-t0)/.6);if(q<=0)continue;const A=nodes[a],B=nodes[b];c.beginPath();c.moveTo(A.x,A.y);c.lineTo(A.x+(B.x-A.x)*q,A.y+(B.y-A.y)*q);c.stroke();}c.setLineDash([]);
 for(const n of nodes){const s=pop(t,n.t);if(s<=0)continue;c.save();c.translate(n.x,n.y);c.scale(s,s);ell(c,0,0,64,64,n.red?'#5a1e28':'#1f2a58');c.lineWidth=5;c.strokeStyle=n.red?'#ff6b6b':'#8d9cf0';c.beginPath();c.arc(0,0,64,0,Math.PI*2);c.stroke();if(n.draw)n.draw(c);c.font='30px K';c.fillStyle='#fff';c.textAlign='center';c.fillText(n.label||'',0,108);c.restore();}c.restore();}
// navy infographic background
function navyBG(c){c.fillStyle='#0f1428';c.fillRect(0,0,W,H);const g=c.createRadialGradient(W/2,820,50,W/2,820,900);g.addColorStop(0,'#2a3670');g.addColorStop(1,'rgba(15,20,40,0)');c.fillStyle=g;c.fillRect(0,0,W,H);}
// night room with rainy window + lamp + sofa (ref "lesson" scene)
function roomBG(c,t){c.fillStyle=lin(c,0,0,0,1200,[[0,'#2a2234'],[1,'#3b3042']]);c.fillRect(0,0,W,1300);rr(c,560,240,440,640,10);c.fillStyle='#1b2340';c.fill();c.save();rr(c,580,260,400,600,6);c.clip();c.fillStyle='#202a4c';c.fillRect(580,260,400,600);rain(c,t,580,260,400,600,50,'rgba(200,215,255,.4)');for(let i=0;i<25;i++)ell(c,600+rnd(i)*360,560+rnd(i+4)*280,3,3,'rgba(255,220,140,.7)');c.restore();c.fillStyle='#1b2340';c.fillRect(775,260,10,600);c.fillStyle='#f0d9a0';c.beginPath();c.moveTo(110,520);c.lineTo(230,520);c.lineTo(260,610);c.lineTo(80,610);c.fill();c.fillStyle='#4a3f45';c.fillRect(166,610,8,520);const lg=c.createRadialGradient(170,580,10,170,580,320);lg.addColorStop(0,'rgba(255,220,150,.3)');lg.addColorStop(1,'rgba(255,220,150,0)');c.fillStyle=lg;c.fillRect(0,300,500,600);rr(c,60,1000,960,260,60);c.fillStyle='#4f4458';c.fill();rr(c,30,1080,1020,320,50);c.fillStyle='#5c5066';c.fill();c.fillStyle='#1d1820';c.fillRect(0,1300,W,620);}
// comment CTA pill
function ctaPill(c,t,t0,txt='คอมเมนต์มาเลย',y=540){const s=pop(t,t0);if(s<=0)return;c.save();c.translate(540,y);c.scale(s,s);c.font='44px K';const w=c.measureText(txt).width+150;rr(c,-w/2,-46,w,92,46);c.fillStyle='#F7C744';c.fill();rr(c,-w/2+35,-22,52,38,10);c.fillStyle='#262233';c.fill();c.beginPath();c.moveTo(-w/2+48,14);c.lineTo(-w/2+42,30);c.lineTo(-w/2+62,14);c.fill();c.fillStyle='#262233';c.textAlign='left';c.fillText(txt,-w/2+100,15);c.restore();}
// generic landscape scene with forest layers + optional cliff/cave (palette: storm/day/sunny/dusk)
function forestScene(c,t,lt,key,pal,o={}){const P=PAL[pal];c.fillStyle=lin(c,0,0,0,900,[[0,o.sky0||'#8b99a8'],[1,o.sky1||'#d8dcd6']]);c.fillRect(0,0,W,1000);drawLand(c,cache(key+'L',()=>landscape(P,o.seed||7,{y0:470,a0:120,y1:600,a1:90,y2:760,a2:60,yb:1050})),lt,12);if(o.cliff)c.drawImage(cache(key+'C',()=>bakeL(1080,1920,()=>{cliff(P,...o.cliff);})),0,0);c.fillStyle=lin(c,0,920,0,1700,[[0,o.g0||'#8fbf6a'],[1,o.g1||'#5f9a4a']]);c.fillRect(0,960,W,900);c.drawImage(cache(key+'G',()=>bakeL(1080,1920,()=>{groundBits(P,0,1080,975,1350,160,o.seed||7);})),0,0);}
