// EPISODE: Tham Luang cave rescue (example). Edit C (captions), S (scenes), scene functions, SFX.
const END=74.1;
const DUCK=[[44.6,50.6]]; // quieter music during the memorial scene
// ---------- timing ----------
const C=[ // caption cards
 [0.0,'สรุปเหตุการณ์{y:ถ้ำหลวง}|ใน 60 วินาที เกิดอะไรขึ้น','The Tham Luang cave rescue in 60 seconds: what happened?'],
 [4.86,'วันที่ 23 มิถุนายน 2561','On June 23, 2018'],
 [7.91,'นักฟุตบอลทีม{y:หมูป่าอะคาเดมี} 12 คน|อายุ 11 ถึง 16 ปี','12 young players of the Wild Boars team, aged 11 to 16'],
 [12.3,'กับโค้ชเอก เข้าไปในถ้ำหลวง|อำเภอ{y:แม่สาย} จังหวัดเชียงราย','went into Tham Luang cave with Coach Ek, in Mae Sai, Chiang Rai'],
 [16.83,'แต่ฝนตกหนัก {y:น้ำทะลักเข้าถ้ำ}|จนปิดทางออก','But heavy rain flooded the cave and sealed the way out'],
 [20.46,'ทั้ง 13 คน {r:ติดอยู่ข้างใน}','All 13 were trapped inside'],
 [22.83,'เจ้าหน้าที่ อาสาสมัคร|และนักดำน้ำจากหลายประเทศ','Officials, volunteers and divers from many countries'],
 [25.82,'กว่า{y:หมื่นคน} หลั่งไหลมาช่วย','more than ten thousand people came to help'],
 [28.29,'ผ่านไป{y:เก้าวัน}','Nine days later'],
 [29.55,'2 กรกฎาคม นักดำน้ำชาวอังกฤษ|พบทั้ง 13 คน{y:ปลอดภัย}','on July 2, British divers found all 13 alive'],
 [34.14,'บนเนินดินในถ้ำ|ลึกจากปากถ้ำราว {y:4 กิโลเมตร}','on a muddy ledge about 4 km from the entrance'],
 [38.01,'แต่{y:เรื่องยังไม่จบ}','But it was not over yet'],
 [39.07,'ทางออกทั้งมืด แคบ|และเต็มไปด้วยน้ำ','The way out was dark, narrow and flooded'],
 [42.37,'ส่วนเด็กหลายคน {r:ว่ายน้ำไม่เป็น}','and many of the boys could not swim'],
 [44.78,'6 กรกฎาคม {y:จ่าแซม} อดีตหน่วยซีล','On July 6, former Navy SEAL Saman Gunan'],
 [47.73,'เสียชีวิตระหว่างภารกิจ|ลำเลียงถังอากาศ','died while delivering air tanks'],
 [50.67,'8 ถึง 10 กรกฎาคม|{y:ภารกิจกู้ภัย}เริ่มขึ้น','From July 8 to 10, the rescue began'],
 [53.87,'นักดำน้ำพาเด็กออกมา{y:ทีละคน}','Divers brought the boys out one by one'],
 [56.41,'และวันที่ 10 กรกฎาคม|คนสุดท้ายก็ออกจากถ้ำ','and on July 10, the last one came out'],
 [59.92,'{y:ครบทั้ง 13 คน}|หลังติดอยู่ 18 วัน','All 13 safe, after 18 days'],
 [63.33,'บทเรียนจากถ้ำหลวงชัดเจน','The lesson from Tham Luang is clear'],
 [65.37,'ก่อนเข้าถ้ำหรือป่า|เช็ก{y:ฤดูฝน}และ{y:ป้ายเตือน}ทุกครั้ง','Before entering caves or forests, always check the rainy season and warning signs'],
 [69.57,'',''],
];
const S=[ // scenes
 {t:0,f:sStudio},{t:4.86,f:sField},{t:13.9,f:sMap},{t:16.83,f:sFlood},{t:22.83,f:sCamp},
 {t:28.29,f:sDark},{t:34.14,f:sDist},{t:38.01,f:sInfo},{t:44.78,f:sMemorial},{t:50.67,f:sRescue},
 {t:56.41,f:sExit},{t:63.33,f:sLesson},{t:69.57,f:sCTA}];
const KIDS=[...Array(12)].map((_,i)=>({kid:1,skin:SK[i%5],hair:['short','spiky','short','short'][i%4],top:'#C7343F',bot:'#1f2a44',jersey:1,num:String(i+1),shortSleeve:1,seed:i*1.37+.3}));
const COACH={skin:'#D49A72',hair:'short',top:'#2F6B4F',bot:'#2b2f3a',shortSleeve:1,seed:7.7};
const prof=x=>x<60?880:(x<560?860-((x)/560)*250+Math.sin(x*.02)*12:610+(x-560)*.18+Math.sin(x*.02)*12);
function caveMini(c,x,y,w,h,t){
 const m=cache('mini',()=>bakeL(1080,700,()=>{const P=PAL.storm;K.fillStyle=vg(0,700,[[0,'#56627c'],[1,'#a3a7aa']]);K.fillRect(0,0,1080,700);K.save();K.translate(0,-220);forestRidge(P,'far',560,90,3,{kind:'pine',step:30,th:40,yb:1000});fogBand(640,80,P.fog,.5,1);forestRidge(P,'mid',700,70,8,{step:24,th:70,fill:30,yb:1000});fogBand(800,70,P.fog,.4,2);K.restore();
  cliff(P,330,1080,300,760,[640,700,120,150],21);K.fillStyle=P.nearT;K.fillRect(0,690,1080,20);groundBits(P,0,1080,690,700,40,4);}));
 c.drawImage(m,x,y,w,w*700/1080);rain(c,t,x,y,w,h,40);
}
// ---------- scenes ----------
function sStudio(c,t,lt){
 c.save();scaleAt(c,W/2,900,1+lt*.006);studioBG(c,t,1);
 person(c,{...COACH,x:540,y:1560,h:640,expr:'w'},t);
 person(c,{...KIDS[1],x:330,y:1590,h:520,expr:'w',look:.5},t);
 person(c,{...KIDS[4],x:760,y:1600,h:500,expr:'w',look:-.5},t);
 c.restore();
 header(c,t,0,'สรุปเหตุการณ์','ถ้ำหลวง','y');
}
function sField(c,t,lt){
 const t0=4.86;c.save();scaleAt(c,W/2,1000,1+lt*.004);
 c.fillStyle=lin(c,0,0,0,900,[[0,'#3b3f78'],[.55,'#b77a8c'],[1,'#f2b27a']]);c.fillRect(0,0,W,900);
 ell(c,820,760,120,120,'rgba(255,214,150,.55)');
 drawLand(c,cache('fieldL',()=>landscape(PAL.dusk,61,{y0:740,a0:90,y1:820,a1:50,noNear:1,yb:960})),lt,10);
 for(let i=0;i<10;i++){c.fillStyle=i%2?'#4f9a4a':'#57a352';c.fillRect(0,880+i*110,W,110);}
 c.strokeStyle='rgba(255,255,255,.85)';c.lineWidth=6;c.strokeRect(70,700,190,200);c.strokeStyle='rgba(255,255,255,.25)';c.lineWidth=2;for(let i=0;i<8;i++){c.beginPath();c.moveTo(70+i*27,700);c.lineTo(70+i*27,900);c.stroke();}
 const pos=[[150,1080],[260,1062],[370,1085],[480,1065],[590,1085],[700,1062],[200,1260],[320,1272],[440,1255],[560,1275],[680,1258],[800,1272]];
 const ord=[0,1,2,3,4,5,6,7,8,9,10,11];
 const back=[],front=[];
 ord.forEach((k,i)=>{const s=pop(t,7.91+i*.27,.4);if(i===0&&t>=7.91&&t<7.95)0;(pos[k][1]<1150?back:front).push([k,s]);});
 for(const [k,s] of back.concat(front)){if(s<=0)continue;c.save();scaleAt(c,pos[k][0],pos[k][1],s);person(c,{...KIDS[k],x:pos[k][0],y:pos[k][1],h:k<6?300:330,expr:'h'},t);c.restore();}
 const cs=pop(t,12.4,.4);if(cs>0){c.save();scaleAt(c,950,1290,cs);person(c,{...COACH,x:950,y:1290,h:470,expr:'h',arms:'wave'},t);c.restore();}
 c.restore();
 pill(c,540,640,'12 คน · อายุ 11–16 ปี',pop(t,10.5),'#F7C744','#262233',40);
 chip(c,t,t0,'23 มิ.ย. 2561');
 header(c,t,t0,'ทีมฟุตบอลเยาวชน','หมูป่าอะคาเดมี','y',true);
}
function proj(lon,lat,cx,cy,k){return[W/2+(lon-cx)*k*Math.cos(cy*Math.PI/180),860-(lat-cy)*k];}
function sMap(c,t,lt){
 const t0=13.9,p=eio((t-t0)/2.6);const cx=101+(99.9-101)*p,cy=13.2+(18.6-13.2)*p,k=70*Math.pow(150/70,p);
 c.fillStyle=lin(c,0,0,0,H,[[0,'#1b4566'],[1,'#10304a']]);c.fillRect(0,0,W,H);
 for(const a in MAP){for(const ring of MAP[a]){c.beginPath();ring.forEach((q,i)=>{const [x,y]=proj(q[0],q[1],cx,cy,k);i?c.lineTo(x,y):c.moveTo(x,y);});c.closePath();
  if(a==='THA'){c.fillStyle='#5f8b4d';c.fill();c.save();c.clip();for(let i=0;i<70;i++){const lo=97.5+rnd(i)*8,la=6+rnd(i+7)*14.5;const [x,y]=proj(lo,la,cx,cy,k);ell(c,x,y,k*(.2+rnd(i+3)*.5),k*(.12+rnd(i+5)*.3),la>16?'rgba(38,70,40,.45)':'rgba(140,160,90,.28)');}c.restore();c.strokeStyle='rgba(255,255,255,.75)';c.lineWidth=2.5;c.stroke();}
  else{c.fillStyle='#3e5a3d';c.fill();c.strokeStyle='rgba(255,255,255,.25)';c.lineWidth=1.5;c.stroke();}}}
 const [bx,by]=proj(100.5,13.75,cx,cy,k);ell(c,bx,by,9,9,'#fff');c.font='30px KS';c.fillStyle='#fff';c.textAlign='left';c.fillText('กรุงเทพฯ',bx+16,by+10);
 const [mx,my]=proj(99.88,20.37,cx,cy,k);const ps=t<t0+.9?0:1;const drop=(1-eob((t-t0-.9)/.45))*-120;
 if(ps){c.save();c.translate(mx,my+drop);c.fillStyle='#E23B3B';c.beginPath();c.arc(0,-62,30,Math.PI*.82,Math.PI*2.18);c.lineTo(0,0);c.closePath();c.fill();ell(c,0,-62,12,12,'#fff');c.restore();
  pill(c,mx,my+60,'ถ้ำหลวง · แม่สาย เชียงราย',pop(t,t0+1.2),'rgba(255,255,255,.95)','#1d2233',34);}
 header(c,t,t0,'ถ้ำหลวง–ขุนน้ำนางนอน','อ.แม่สาย จ.เชียงราย','y');
}
// cave cross-section
const TUN=[[95,905],[200,950],[300,1035],[400,1080],[500,1010],[590,1070],[690,1000],[790,945],[880,905],[960,880]];
let TL=null;function tunLen(){if(TL)return TL;TL=[0];for(let i=1;i<TUN.length;i++)TL.push(TL[i-1]+Math.hypot(TUN[i][0]-TUN[i-1][0],TUN[i][1]-TUN[i-1][1]));return TL;}
function tunAt(f){const L=tunLen(),d=f*L[L.length-1];for(let i=1;i<L.length;i++)if(d<=L[i]){const q=(d-L[i-1])/(L[i]-L[i-1]);return[TUN[i-1][0]+(TUN[i][0]-TUN[i-1][0])*q,TUN[i-1][1]+(TUN[i][1]-TUN[i-1][1])*q];}return TUN[TUN.length-1];}
function tunPath(c){c.beginPath();TUN.forEach((q,i)=>i?c.lineTo(q[0],q[1]):c.moveTo(q[0],q[1]));}
function section(c,t,o){
 const P=o.sunny?PAL.day:PAL.storm;const key=o.sunny?'day':'storm';
 c.fillStyle=lin(c,0,0,0,800,[[0,o.sunny?'#7fa6c9':'#4d5870'],[1,o.sunny?'#c7d6dd':'#8b93a0']]);c.fillRect(0,0,W,900);
 const L=cache('secL'+key,()=>landscape(P,11,{y0:440,a0:110,y1:540,a1:80,noNear:1,yb:1000}));drawLand(c,L,t-(o.t0||0),10);
 if(o.rain)rain(c,t,0,0,W,800,110);
 const E=cache('secE'+key,()=>bakeL(1080,1920,()=>{
  K.beginPath();K.moveTo(0,880);for(let x=0;x<=1080;x+=20)K.lineTo(x,prof(x));K.lineTo(1080,1250);K.lineTo(0,1250);K.closePath();K.fillStyle='#7b5b43';K.fill();
  K.save();K.clip();for(let i=0;i<9;i++){K.fillStyle=i%2?'rgba(60,40,28,.25)':'rgba(150,110,80,.15)';K.beginPath();K.moveTo(0,700+i*70);for(let x=0;x<=1080;x+=40)K.lineTo(x,700+i*70+Math.sin(x*.01+i)*18);K.lineTo(1080,1920);K.lineTo(0,1920);K.fill();}
  for(let i=0;i<26;i++){K.fillStyle='rgba(50,34,24,.3)';K.beginPath();K.ellipse(rnd(i)*1080,760+rnd(i+3)*480,14+rnd(i+1)*26,8+rnd(i+2)*12,0,0,7);K.fill();}
  for(let i=0;i<30;i++){const x=rnd(i+40)*1080;K.strokeStyle='rgba(60,40,25,.35)';K.lineWidth=3;K.beginPath();K.moveTo(x,prof(x)+20);K.quadraticCurveTo(x+(rnd(i)-.5)*40,prof(x)+60,x+(rnd(i+2)-.5)*60,prof(x)+90+rnd(i+5)*60);K.stroke();}
  K.restore();
  K.lineWidth=16;K.strokeStyle=P.near;K.beginPath();K.moveTo(0,880);for(let x=0;x<=1080;x+=20)K.lineTo(x,prof(x));K.stroke();
  const r=rngF(77);
  for(let x=170;x<1100;x+=16+r()*16){const y=prof(x)+10,h=70+r()*80;if(r()<.35)conifer(x,y,h*1.1,mix(P.nearT,P.mid,.3),P.nearL,x|0,.34);else broad(x,y,h,mix(P.near,P.mid,.25),P.nearL,P.trunk,x*3|0);}
  for(let x=160;x<1100;x+=22+r()*22){const y=prof(x)+16,h=50+r()*60;if(r()<.4)conifer(x,y,h,P.nearT,P.nearL,x*5|0,.34);else broad(x,y,h,P.near,P.nearL,P.trunk,x*7|0);}
  rockF(60,915,170,120,P,5,4);rockF(250,900,120,70,P,9,3);
  for(let i=0;i<14;i++){const x=150+r()*900;fern(x,prof(x)+18,40+r()*30,P.fern,P.fernL,i*9);}
  for(let i=0;i<60;i++){const x=r()*1080;tuft(x,prof(x)+8,16+r()*14,P.fern,i*3);}
 }));
 c.drawImage(E,0,0);
 // tunnel
 c.lineJoin='round';c.lineCap='round';tunPath(c);c.lineWidth=58;c.strokeStyle='#2a1d16';c.stroke();ell(c,950,880,70,46,'#2a1d16');
 const lv=o.level;if(lv<1100){c.save();c.beginPath();c.rect(0,lv,W,600);c.clip();tunPath(c);c.lineWidth=48;c.strokeStyle='#3b8ed6';c.stroke();c.strokeStyle='rgba(255,255,255,.25)';c.lineWidth=4;c.setLineDash([16,22]);c.lineDashOffset=-t*40;tunPath(c);c.stroke();c.setLineDash([]);c.restore();}
}
function chamberPeople(c,t,happy){for(let i=0;i<13;i++){const x=905+(i%7)*15,y=885-Math.floor(i/7)*16;ell(c,x,y,7,7,i===12?'#2F6B4F':'#C7343F');ell(c,x,y-10,5.5,5.5,SK[i%5]);}}
function sFlood(c,t,lt){
 const t0=16.83;c.save();scaleAt(c,700,950,1.05+lt*.01);
 const lv=1100-140*eio((t-t0-.4)/2.6);section(c,t,{rain:1,level:lv,t0:16.83});chamberPeople(c,t);
 const rs=t>20.46?((t-20.46)%1.2)/1.2:0;if(t>20.46){c.strokeStyle=`rgba(255,80,80,${1-rs})`;c.lineWidth=5;c.beginPath();c.arc(950,880,60+rs*70,0,Math.PI*2);c.stroke();}
 pill(c,130,1150,'ปากถ้ำ',pop(t,t0+.5),'rgba(255,255,255,.92)','#1d2233',30);
 pill(c,940,800,'จุดที่ติด',pop(t,20.6),'#D8353B','#fff',30);
 c.restore();
 header(c,t,t0,'ฝนตกหนัก','น้ำทะลักปิดทางออก','o');
}
function sCamp(c,t,lt){
 const t0=22.83;const P=PAL.day;c.save();scaleAt(c,W/2,1000,1+lt*.008);
 c.fillStyle=lin(c,0,0,0,900,[[0,'#8b99a8'],[1,'#d8dcd6']]);c.fillRect(0,0,W,1000);
 drawLand(c,cache('campL',()=>landscape(P,23,{y0:470,a0:120,y1:600,a1:90,y2:760,a2:60,yb:1050})),lt,12);
 c.drawImage(cache('campC',()=>bakeL(1080,1920,()=>{cliff(P,560,1180,600,1010,[845,960,120,160],31);})),0,0);
 c.fillStyle=lin(c,0,920,0,1700,[[0,'#9c8a62'],[1,'#7a6a48']]);c.fillRect(0,950,W,900);
 c.drawImage(cache('campG',()=>bakeL(1080,1920,()=>{groundBits(P,0,1080,950,1350,160,8);for(let i=0;i<6;i++)rockF(60+i*190+rnd(i)*60,980+rnd(i+3)*30,60+rnd(i)*50,30+rnd(i+1)*20,P,i+40,2);})),0,0);
 const tents=[[150,1010,'#f2f2f2'],[330,990,'#3a6fb5'],[520,1015,'#e88c3a'],[90,1130,'#3a6fb5'],[640,1110,'#f2f2f2']];
 tents.forEach(([x,y,col],i)=>{const s=pop(t,t0+.2+i*.15);if(s<=0)return;c.save();scaleAt(c,x,y,s);c.fillStyle=col;c.beginPath();c.moveTo(x-90,y);c.lineTo(x,y-110);c.lineTo(x+90,y);c.fill();c.fillStyle='rgba(0,0,0,.2)';c.beginPath();c.moveTo(x,y-110);c.lineTo(x+90,y);c.lineTo(x+20,y);c.fill();c.restore();});
 const cols=['#E7A234','#3a6fb5','#d84a3a','#2F6B4F','#e0e0e0','#1b2025','#f2c94c'];
 const n=Math.floor(60*eoc((t-t0-.2)/4.5));
 for(let i=0;i<n;i++){const x=40+rnd(i*3+1)*1000,y=1060+rnd(i*3+2)*260;mini(c,x,y,.9+(y-1060)/400,cols[i%7],i%3==0?'#F2B630':(i%5==0?'#E23B3B':null),i,t);}
 c.drawImage(cache('campF',()=>bakeL(1080,1920,()=>{for(let i=0;i<5;i++)fern(20+i*25,1150,120+i*15,PAL.day.fern,PAL.day.fernL,70+i,7,1.8);for(let i=0;i<5;i++)fern(1060-i*25,1160,120+i*15,PAL.day.fern,PAL.day.fernL,90+i,7,1.8);})),0,0);
 c.drawImage(cache('campLeaf',()=>fgLeaves(PAL.day,[[1060,40,2.4],[20,60,.6]],5)),Math.sin(t*.8)*6,Math.cos(t*.7)*4);
 c.restore();
 const v=Math.round(10000*eoc((t-25.82)/1.4)/100)*100;
 if(t>25.82){pill(c,540,620,'',0);c.save();const s=pop(t,25.82);c.translate(540,640);c.scale(s,s);rr(c,-250,-110,500,190,30);c.fillStyle='rgba(255,255,255,.95)';c.fill();c.font='34px KS';c.fillStyle='#4a4f63';c.textAlign='center';c.fillText('ผู้ร่วมช่วยเหลือ',0,-50);c.font='96px K';c.fillStyle='#D8353B';c.fillText(v.toLocaleString('en-US')+(v>=10000?'+':''),0,52);c.restore();}
 header(c,t,t0,'เจ้าหน้าที่ · อาสาสมัคร · นักดำน้ำ','ทีมกู้ภัยจากทั่วโลก','y',true);
}
function sDark(c,t,lt){
 const t0=28.29,tf=29.55;c.save();scaleAt(c,620,1000,1+lt*.008);
 c.fillStyle=lin(c,0,0,0,H,[[0,'#2b2119'],[1,'#3a2d22']]);c.fillRect(0,0,W,H);
 for(let i=0;i<30;i++)ell(c,rnd(i)*W,rnd(i+9)*1300,60+rnd(i+2)*140,40+rnd(i+4)*90,i%2?'#4a3a2c':'#33271e');
 const found=t>tf+.5;
 const pos=[[430,1010],[520,1000],[610,1012],[700,998],[790,1010],[880,1000],[400,1110],[490,1122],[580,1105],[670,1125],[760,1108],[850,1120]];
 pos.forEach((p,i)=>person(c,{...KIDS[i],x:p[0],y:p[1]+60,h:i<6?300:320,expr:found?'h':'w',arms:found&&i%3==0?'up':'down',look:-1},t));
 person(c,{...COACH,x:975,y:1150,h:430,expr:found?'h':'w',arms:found?'wave':'down',look:-1},t);
 c.fillStyle='#5a4535';c.beginPath();c.moveTo(300,1140);c.quadraticCurveTo(650,1090,1080,1120);c.lineTo(W,H);c.lineTo(300,H);c.fill();
 c.fillStyle='#4a382b';c.beginPath();c.moveTo(0,1180);c.quadraticCurveTo(300,1150,500,1210);c.lineTo(500,H);c.lineTo(0,H);c.fill();
 person(c,{x:150,y:1420,h:620,diver:1,top:'#1b2025',bot:'#1b2025',hair:'hood',mask:1,glove:'#1b2025',skin:'#E9B892',seed:3,helmet:null},t);
 // darkness with flashlight
 TX.setTransform(1,0,0,1,0,0);TX.globalCompositeOperation='source-over';TX.clearRect(0,0,W,H);TX.fillStyle='rgba(5,3,2,.86)';TX.fillRect(0,0,W,H);
 const ang=t<tf?-.35+Math.sin((t-t0)*2.4)*.35:-.12+Math.sin(t*.8)*.02;
 TX.globalCompositeOperation='destination-out';
 const ox=180,oy=760;const g=TX.createRadialGradient(ox,oy,10,ox,oy,1100);g.addColorStop(0,'rgba(0,0,0,1)');g.addColorStop(.8,'rgba(0,0,0,.85)');g.addColorStop(1,'rgba(0,0,0,0)');
 TX.fillStyle=g;TX.save();TX.translate(ox,oy);TX.rotate(ang);TX.beginPath();TX.moveTo(0,-10);TX.lineTo(1150,-330);TX.quadraticCurveTo(1250,0,1150,330);TX.lineTo(0,10);TX.closePath();TX.filter='blur(18px)';TX.fill();TX.filter='none';TX.restore();
 const g2=TX.createRadialGradient(150,1000,0,150,1000,330);g2.addColorStop(0,'rgba(0,0,0,.7)');g2.addColorStop(1,'rgba(0,0,0,0)');TX.fillStyle=g2;TX.fillRect(0,600,600,800);
 TX.globalCompositeOperation='source-over';
 c.drawImage(tmp,0,0);
 c.save();c.globalCompositeOperation='lighter';c.translate(ox,oy);c.rotate(ang);const g3=c.createLinearGradient(0,0,1100,0);g3.addColorStop(0,'rgba(255,240,190,.22)');g3.addColorStop(1,'rgba(255,240,190,0)');c.fillStyle=g3;c.beginPath();c.moveTo(0,-8);c.lineTo(1150,-320);c.lineTo(1150,320);c.lineTo(0,8);c.fill();c.restore();
 c.restore();
 if(t<tf)header(c,t,t0,'ผ่านไป','9 วัน','y');else header(c,t,tf,'นักดำน้ำชาวอังกฤษ','พบแล้ว! ทั้ง 13 คน','y');
 chip(c,t,tf,'2 ก.ค. 2561');
}
function sDist(c,t,lt){
 const t0=34.14;c.save();scaleAt(c,540,950,1.05+lt*.008);section(c,t,{level:960,t0:34.14});chamberPeople(c,t,1);
 const p=eio((t-t0-.4)/1.6);c.setLineDash([2,22]);c.lineCap='round';c.lineWidth=12;c.strokeStyle='#F7C744';
 c.beginPath();const N=60;for(let i=0;i<=N*p;i++){const [x,y]=tunAt(i/N);i?c.lineTo(x,y-50):c.moveTo(x,y-50);}c.stroke();c.setLineDash([]);
 pill(c,130,1150,'ปากถ้ำ',1,'rgba(255,255,255,.92)','#1d2233',30);
 pill(c,940,800,'จุดที่พบ',pop(t,t0+.2),'#F7C744','#262233',30);
 c.restore();
 pill(c,540,1180,'≈ 4 กม. จากปากถ้ำ',pop(t,36.0),'#F7C744','#262233',44);
 header(c,t,t0,'บนเนินดินในถ้ำ','ลึกราว 4 กิโลเมตร','y');
}
function sInfo(c,t,lt){
 const t0=38.01;c.fillStyle='#0f1428';c.fillRect(0,0,W,H);let g=c.createRadialGradient(W/2,820,50,W/2,820,900);g.addColorStop(0,'#2a3670');g.addColorStop(1,'rgba(15,20,40,0)');c.fillStyle=g;c.fillRect(0,0,W,H);
 c.save();scaleAt(c,W/2,850,1+lt*.006);
 const P=[[250,700,'dark','มืด',39.8],[540,700,'narrow','แคบ',40.35],[830,700,'water','น้ำท่วม',41.1]];
 c.setLineDash([3,20]);c.lineCap='round';c.lineWidth=10;c.strokeStyle='#F7C744';
 for(let i=1;i<3;i++){const q=eoc((t-P[i][4])/.4);if(q>0){c.beginPath();c.moveTo(P[i-1][0]+100,700);c.lineTo(P[i-1][0]+100+(P[i][0]-P[i-1][0]-200)*q,700);c.stroke();}}
 const q3=eoc((t-42.37)/.5);if(q3>0){c.beginPath();c.moveTo(540,800);c.lineTo(540,800+140*q3);c.stroke();}
 c.setLineDash([]);
 P.forEach(p=>{const s=pop(p[4]<=t?t:-1,p[4]);icon(c,p[0],p[1],s,p[2],'b',t);if(s>0){c.globalAlpha=cl(s);c.font='40px K';c.fillStyle='#fff';c.textAlign='center';c.fillText(p[3],p[0],p[1]+150);c.globalAlpha=1;}});
 const s4=pop(t,42.5);icon(c,540,1040,s4*1.15,'swim','r',t);
 c.restore();
 header(c,t,t0,'แต่เรื่องยังไม่จบ','ทางออกอันตราย','o');
}
function sMemorial(c,t,lt){
 const t0=44.78;c.save();scaleAt(c,W/2,900,1+lt*.012);
 c.fillStyle=lin(c,0,0,0,H,[[0,'#0c1120'],[1,'#1a2034']]);c.fillRect(0,0,W,H);
 c.fillStyle='rgba(255,255,255,.07)';c.beginPath();c.moveTo(420,0);c.lineTo(660,0);c.lineTo(900,1150);c.lineTo(180,1150);c.fill();
 ell(c,540,1130,360,60,'#151a2b');
 rr(c,455,560,170,520,80);c.fillStyle='#E8B12E';c.fill();rr(c,470,580,40,470,20);c.fillStyle='rgba(255,255,255,.22)';c.fill();
 rr(c,505,500,70,70,12);c.fillStyle='#2a2d36';c.fill();rr(c,470,480,140,30,10);c.fill();c.fillStyle='#1b1d24';c.fillRect(455,760,170,26);
 for(let i=0;i<7;i++){const x=330+i*70,y=1100+Math.sin(i)*12;c.strokeStyle='#3f7a4a';c.lineWidth=8;c.beginPath();c.moveTo(x,y+30);c.lineTo(x+(i-3)*6,y-30);c.stroke();
  for(let k=0;k<5;k++){c.save();c.translate(x+(i-3)*6,y-40);c.rotate(k*Math.PI*2/5+i);ell(c,0,-22,13,26,'#f5f3ea');c.restore();}ell(c,x+(i-3)*6,y-40,8,8,'#f2c94c');}
 for(const [x,ph] of[[250,0],[830,1.3]]){rr(c,x-22,1010,44,110,8);c.fillStyle='#f3efe4';c.fill();const fl=1+Math.sin(t*12+ph)*.08;ell(c,x,990,12*fl,24*fl,'#ffcf66');const g=c.createRadialGradient(x,990,0,x,990,160);g.addColorStop(0,'rgba(255,190,90,.35)');g.addColorStop(1,'rgba(255,190,90,0)');c.fillStyle=g;c.fillRect(x-160,830,320,320);}
 for(let i=0;i<30;i++){const x=(rnd(i)*W+t*10)%W,y=(rnd(i+3)*1100+H-t*18*(1+rnd(i)))%1150;ell(c,x,y,2.5,2.5,'rgba(255,255,255,.35)');}
 c.restore();
 chip(c,t,t0,'6 ก.ค. 2561');
 header(c,t,t0,'รำลึก','จ่าแซม','y');
 pill(c,540,430,'อดีตหน่วยซีล',pop(t,46.2),'rgba(255,255,255,.12)','#fff',32);
}
function sRescue(c,t,lt){
 const t0=50.67;c.save();scaleAt(c,540,950,1.05+lt*.006);section(c,t,{level:960,t0:50.67});
 const st=t0+.8,per=.75,n=Math.max(0,Math.min(8,Math.floor((t-st)/per)+1));
 const left=13-Math.min(n,8);for(let i=0;i<left;i++){const x=905+(i%7)*15,y=885-Math.floor(i/7)*16;ell(c,x,y,7,7,i===left-1?'#2F6B4F':'#C7343F');ell(c,x,y-10,5.5,5.5,SK[i%5]);}
 for(let k=0;k<8;k++){const f=1-(t-st-k*per)/2.2;if(f<0||f>1)continue;const [x,y]=tunAt(f);ell(c,x-10,y,13,13,'#1b2025');rr(c,x-24,y-12,9,22,4);c.fillStyle='#F2B630';c.fill();ell(c,x+12,y+4,10,10,'#C7343F');ell(c,x+12,y-8,7,7,SK[k%5]);}
 pill(c,130,1150,'ปากถ้ำ',1,'rgba(255,255,255,.92)','#1d2233',30);
 c.restore();
 const out=Math.max(0,Math.min(8,Math.floor((t-st-2.2)/per)+1));
 pill(c,540,1170,`ออกจากถ้ำแล้ว ${out}/13`,pop(t,t0+.4),'rgba(255,255,255,.95)','#1d2233',42);
 chip(c,t,t0,'8–10 ก.ค. 2561');
 header(c,t,t0,'ดำน้ำพาออกทีละคน','ภารกิจกู้ภัย','y');
}
function sExit(c,t,lt){
 const t0=56.41;const P=PAL.sunny;c.save();scaleAt(c,W/2,1000,1+lt*.006);
 c.fillStyle=lin(c,0,0,0,900,[[0,'#6fa8dc'],[1,'#d6ecf2']]);c.fillRect(0,0,W,1000);
 const g=c.createRadialGradient(820,320,10,820,320,420);g.addColorStop(0,'rgba(255,250,220,.9)');g.addColorStop(1,'rgba(255,250,220,0)');c.fillStyle=g;c.fillRect(0,0,W,900);
 drawLand(c,cache('exitL',()=>landscape(P,41,{y0:520,a0:120,y1:640,a1:80,y2:780,a2:50,yb:1050})),lt,12);
 c.drawImage(cache('exitC',()=>bakeL(1080,1920,()=>{cliff(P,-100,430,470,1010,[170,965,125,165],51);})),0,0);
 c.fillStyle=lin(c,0,960,0,1700,[[0,'#8fbf6a'],[1,'#5f9a4a']]);c.fillRect(0,975,W,900);
 c.drawImage(cache('exitG',()=>bakeL(1080,1920,()=>{groundBits(P,0,1080,975,1350,180,12);const r=rngF(3);for(let i=0;i<40;i++){const x=r()*1080,y=990+r()*300;K.fillStyle=['#ffffff','#f7d34a','#f29bb5'][i%3];for(let k=0;k<5;k++){K.beginPath();K.arc(x+Math.cos(k*1.26)*4,y+Math.sin(k*1.26)*4,3.2,0,7);K.fill();}}})),0,0);
 const pos=[[300,1070],[390,1060],[480,1072],[570,1058],[660,1070],[750,1060],[340,1250],[440,1262],[540,1248],[640,1264],[740,1250],[840,1262]];
 const done=t>59.92;
 pos.forEach((p,i)=>{const a=eoc((t-t0-.1-i*.12)/1.0);const x=170+(p[0]-170)*a,y=980+(p[1]-980)*a;if(a<=0)return;person(c,{...KIDS[i],x,y,h:(i<6?300:330)*(.6+.4*a),expr:'h',arms:done&&i%2==0?'up':'down'},t);});
 const ca=eoc((t-t0-1.6)/1.0);if(ca>0)person(c,{...COACH,x:170+(930-170)*ca,y:980+(1260-980)*ca,h:420*(.6+.4*ca),expr:'h',arms:done?'up':'down'},t);
 c.drawImage(cache('exitF',()=>bakeL(1080,1920,()=>{for(let i=0;i<5;i++)fern(1060-i*25,1180,120+i*15,PAL.sunny.fern,PAL.sunny.fernL,30+i,7,1.8);})),0,0);
 c.drawImage(cache('exitLeaf',()=>fgLeaves(PAL.sunny,[[1070,30,2.4]],9)),Math.sin(t*.8)*6,0);
 if(done)for(let i=0;i<60;i++){const x=rnd(i)*W,y=((t-59.92)*(200+rnd(i+1)*200)+rnd(i+2)*-600)%1400;if(y<0)continue;c.save();c.translate(x+Math.sin(t*3+i)*20,y);c.rotate(t*4+i);c.fillStyle=['#F7C744','#D8353B','#5fb4ff','#fff'][i%4];c.fillRect(-6,-3,12,6);c.restore();}
 c.restore();
 const ss=t<60.2?0:1;if(ss){const k=1+.8*(1-eoc((t-60.2)/.22));c.save();c.translate(540,560);c.rotate(-.12);c.scale(k,k);c.globalAlpha=cl((t-60.2)/.1);rr(c,-250,-70,500,140,18);c.fillStyle='rgba(255,255,255,.9)';c.fill();c.lineWidth=10;c.strokeStyle='#E8892B';c.stroke();c.font='86px K';c.fillStyle='#E8892B';c.textAlign='center';c.fillText('ครบ 13 คน',0,30);c.restore();}
 pill(c,540,700,'ติดอยู่ในถ้ำ 18 วัน',pop(t,61.4),'#F7C744','#262233',40);
 chip(c,t,t0,'10 ก.ค. 2561');
 header(c,t,t0,'ภารกิจสำเร็จ','ออกจากถ้ำครบทุกคน','y',true);
}
function sLesson(c,t,lt){
 const t0=63.33;c.save();scaleAt(c,W/2,900,1+lt*.006);
 c.fillStyle=lin(c,0,0,0,1200,[[0,'#2a2234'],[1,'#3b3042']]);c.fillRect(0,0,W,1300);
 rr(c,560,240,440,640,10);c.fillStyle='#1b2340';c.fill();c.save();rr(c,580,260,400,600,6);c.clip();c.fillStyle='#202a4c';c.fillRect(580,260,400,600);rain(c,t,580,260,400,600,50,'rgba(200,215,255,.4)');for(let i=0;i<25;i++)ell(c,600+rnd(i)*360,560+rnd(i+4)*280,3,3,'rgba(255,220,140,.7)');c.restore();c.fillStyle='#1b2340';c.fillRect(775,260,10,600);
 c.fillStyle='#f0d9a0';c.beginPath();c.moveTo(110,520);c.lineTo(230,520);c.lineTo(260,610);c.lineTo(80,610);c.fill();c.fillStyle='#4a3f45';c.fillRect(166,610,8,520);const lg=c.createRadialGradient(170,580,10,170,580,320);lg.addColorStop(0,'rgba(255,220,150,.3)');lg.addColorStop(1,'rgba(255,220,150,0)');c.fillStyle=lg;c.fillRect(0,300,500,600);
 rr(c,60,1000,960,260,60);c.fillStyle='#4f4458';c.fill();rr(c,30,1080,1020,320,50);c.fillStyle='#5c5066';c.fill();
 c.fillStyle='#1d1820';c.fillRect(0,1300,W,620);
 const s=pop(t,65.37,.45);
 if(s>0){c.save();scaleAt(c,540,820,s);rr(c,290,450,500,700,56);c.fillStyle='#14161f';c.fill();rr(c,312,472,456,656,40);c.fillStyle='#f4f5f8';c.fill();
  c.font='38px K';c.fillStyle='#262233';c.textAlign='center';c.fillText('ก่อนเข้าถ้ำ / ป่า',540,560);
  const rows=[['เช็กฤดูฝน · พยากรณ์',66.2],['อ่านป้ายเตือน',67.6]];
  rows.forEach((r,i)=>{const q=pop(t,r[1]);if(q<=0)return;c.save();scaleAt(c,540,640+i*130,q);rr(c,330,600+i*130,420,96,20);c.fillStyle='#e7f6ea';c.fill();c.lineWidth=4;c.strokeStyle='#44b25a';c.stroke();c.font='32px KS';c.fillStyle='#262233';c.textAlign='left';c.fillText(r[0],355,660+i*130);ell(c,705,648+i*130,26,26,'#44b25a');c.strokeStyle='#fff';c.lineWidth=7;c.beginPath();c.moveTo(692,648+i*130);c.lineTo(702,659+i*130);c.lineTo(720,637+i*130);c.stroke();c.restore();});
  c.restore();}
 c.restore();
 header(c,t,t0,'','บทเรียนจากถ้ำหลวง','y',false,65.37);
}
function sCTA(c,t,lt){
 const t0=69.57;c.save();scaleAt(c,W/2,900,1+lt*.006);studioBG(c,t,0);c.restore();
 const a=fade(t,t0+.05,.3);c.save();c.globalAlpha=a;
 richLine(c,'ถ้าคุณอยู่ในเหตุการณ์นั้น',W/2,300,64,'K');richLine(c,'คุณจะ{y:ทำอะไร}?',W/2,392,72,'K');
 c.font='28px PM';c.fillStyle='#fff';c.textAlign='center';c.fillText('What would you do if you were there?',W/2,450);c.restore();
 const s=pop(t,72.06);if(s>0){c.save();c.translate(540,540);c.scale(s,s);rr(c,-230,-46,460,92,46);c.fillStyle='#F7C744';c.fill();rr(c,-195,-22,52,38,10);c.fillStyle='#262233';c.fill();c.beginPath();c.moveTo(-182,14);c.lineTo(-188,30);c.lineTo(-168,14);c.fill();c.font='44px K';c.fillStyle='#262233';c.textAlign='left';c.fillText('คอมเมนต์มาเลย',-125,15);c.restore();}
}
// ---------- SFX list ----------
(function(){
 S.forEach((s,i)=>{if(i)sfx(s.t-.15,i%2?'sw1':'sw2',.5);});
 for(let i=0;i<12;i++)sfx(7.91+i*.27,'pop',.35);sfx(12.4,'pop',.5);sfx(10.5,'pop',.5);
 sfx(13.9+.9,'drop',.6);sfx(13.9+1.2,'pop',.4);
 sfx(20.6,'alert',.5);
 sfx(25.82,'tick',.5);sfx(27.25,'ding',.55);
 sfx(29.55,'ding',.5);sfx(36.0,'pop',.5);
 [39.8,40.35,41.1].forEach(x=>sfx(x,'pop',.5));sfx(42.5,'alert',.5);
 sfx(51.07,'pop',.4);
 sfx(60.2,'stamp',.7);sfx(61.4,'pop',.45);
 sfx(65.37,'pop',.5);sfx(66.2,'check',.5);sfx(67.6,'check',.5);sfx(72.06,'pop',.55);
 [4.86,29.55,44.78,50.67,56.41].forEach(x=>sfx(x+.1,'chip',.3));
})();
