// DEMO: aquarium kit showcase (no VO). Scenes show every aqua piece; reuse them in real episodes.
const END=33.5;
const C=[
 [0.0,'เซ็ตตู้{y:ไม้น้ำ}ครั้งแรก|ใน 60 วินาที','Your first planted tank in 60 seconds'],
 [5.5,'ตู้แรกของคนส่วนใหญ่|{r:พังภายในเดือนแรก}','Most first tanks fail within the first month'],
 [11.0,'{y:กุ้งแคระ} ตัวเท่าเม็ดข้าว|แต่ช่วยทำความสะอาดตู้','Dwarf shrimp: tiny, but great tank cleaners'],
 [17.0,'ปลา{y:เลี้ยงง่าย} สำหรับมือใหม่','Easy fish for beginners'],
 [22.5,'ของที่{y:ต้องมี} ก่อนใส่ปลา','What you need before adding fish'],
 [28.0,'ตู้ไม่สมดุล {r:ตะไคร่บุก}|ตู้สมดุล {y:ใสสะอาด}','Unbalanced tank: algae. Balanced tank: crystal clear'],
];
const S=[{t:0,f:sHero},{t:5.5,f:sRoom},{t:11,f:sShrimp},{t:17,f:sFish},{t:22.5,f:sGear},{t:28,f:sBalance}];
const HOST={skin:'#E9B892',hair:'short',top:'#2F6B4F',bot:'#2b2f3a',shortSleeve:1,seed:2.1};
const tankLife=(c,t)=>{aqSchool(c,t,{kind:'neon',n:14,cx:560,cy:720,w:520,h:240,A:200,s:1.1,seed:3});
 aqShrimpWalk(c,t,{col:'cherry',x0:440,x1:700,y:1150,s:1.6,seed:1});aqShrimpWalk(c,t,{col:'blue',x0:650,x1:900,y:1166,s:1.4,seed:4,speed:.18});};
function sHero(c,t,lt){c.save();scaleAt(c,W/2,900,1+lt*.01);aqWorld(c,t,{fill:tankLife});c.restore();header(c,t,0,'มือใหม่ 60 วิ','เซ็ตตู้ไม้น้ำครั้งแรก','y',true);}
function sRoom(c,t,lt){c.save();scaleAt(c,W/2,800,1+lt*.006);
 aqRoom(c,t,{fill:(c,t)=>{tankLife(c,t);fish(c,300+Math.sin(t*.4)*120,560,1.6,'betta',t,{sx:cl(Math.cos(t*.4)*3,-1,1),col:'#c8243a'});}});
 person(c,{...HOST,x:890,y:1650,h:600,expr:'w'},t);c.restore();stamp(c,t,7.2,430,760,'พังเดือนแรก!','#D8353B');header(c,t,5.5,'','ทำไมตู้แรกพัง?','y',true);}
function sShrimp(c,t,lt){aqBlurBG(c,{zoom:1.5,cy:1100});c.fillStyle='rgba(8,30,40,.35)';c.fillRect(0,0,W,H);
 const s=pop(t,11.2,.5);if(s>0){c.save();scaleAt(c,560,720,s);shrimp(c,560,720,5.2,'cherry',t,{cute:1,expr:'h',walk:.4});c.restore();}
 const L=[['cherry','เชอร์รี่'],['blue','บลู'],['yellow','เยลโล่'],['crystal','คริสตัล'],['amano','อะมาโน่']];
 L.forEach((q,i)=>{const t0=13+i*.45,k=pop(t,t0);if(k<=0)return;const x=120+i*210;c.save();scaleAt(c,x,1100,k);shrimp(c,x,1090,1.35,q[0],t,{seed:i});c.restore();pill(c,x,1190,q[1],k,'rgba(20,40,50,.85)','#fff',28);});
 header(c,t,11,'รู้จักสายพันธุ์','กุ้งแคระ','y',true);}
function sFish(c,t,lt){aqBlurBG(c,{pal:'amber'});c.fillStyle='rgba(10,20,30,.3)';c.fillRect(0,0,W,H);
 const F=[['neon','นีออน',290,640,2.3],['guppy','หางนกยูง',790,640,2.4],['betta','ปลากัด',300,1000,1.8],['goldfish','ปลาทอง',790,1000,2]];
 F.forEach((q,i)=>{const t0=17.3+i*.6,k=pop(t,t0);if(k<=0)return;c.save();scaleAt(c,q[2],q[3],k);fish(c,q[2]+Math.sin(t*.8+i)*14,q[3],q[4],q[0],t,{seed:i,sx:1});c.restore();pill(c,q[2],q[3]+150,q[1],k,'rgba(20,30,45,.85)','#fff',32);});
 header(c,t,17,'รู้จักสายพันธุ์','ปลาเลี้ยงง่าย','y',true);}
function sGear(c,t,lt){navyBG(c);counterCard(c,t,22.8,540,600,'อุณหภูมิน้ำที่เหมาะ',26,'°C (โดยประมาณ)',1.0,'#1f8fb0');
 const P=[[160,'ปรับน้ำ','#2f9e6a'],[400,'',''],[660,'',''],[920,'ปุ๋ยน้ำ','#d8862f']];const k=i=>pop(t,24+i*.5);
 aqBottle(c,170,1080,k(0),'ปรับน้ำ','#2f9e6a');aqHeater(c,410,1070,k(1),t);aqTestTube(c,660,1080,k(2),'#5bbf6a',t);aqBottle(c,910,1080,k(3),'ปุ๋ยน้ำ','#d8862f');
 ['น้ำยาปรับสภาพ','ฮีตเตอร์','ชุดวัดค่าน้ำ','ปุ๋ยน้ำ'].forEach((n,i)=>pill(c,[170,410,660,910][i],1215,n,k(i),'rgba(255,255,255,.12)','#fff',28));
 header(c,t,22.5,'อุปกรณ์','ของที่ต้องมี','y');}
function sBalance(c,t,lt){navyBG(c);
 const a=pop(t,28.2,.45),b=pop(t,29.4,.45);
 if(a>0){c.save();scaleAt(c,540,555,a);rr(c,84,390,912,330,22);c.fillStyle='#111317';c.fill();aqView(c,t,100,406,880,298,900,{algae:1,cloudy:.5,fill:(c,t)=>{aqFlakes(c,t,0,620,700,40);}},14);c.restore();pill(c,540,755,'ตู้ไม่สมดุล',a,'#D8353B','#fff',34);}
 if(b>0){c.save();scaleAt(c,540,955,b);rr(c,84,790,912,330,22);c.fillStyle='#111317';c.fill();aqView(c,t,100,806,880,298,820,{fill:tankLife},14);c.restore();pill(c,540,1160,'ตู้สมดุล',b,'#2f9e6a','#fff',34);}
 header(c,t,28,'','ตู้ไหนคือตู้คุณ?','y');}
S.forEach((s,i)=>{if(i)sfx(s.t-.15,i%2?'sw1':'sw2',.5);});
sfx(7.2,'stamp',.7);sfx(11.2,'pop',.5);[0,1,2,3,4].forEach(i=>sfx(13+i*.45,'pop',.35));[0,1,2,3].forEach(i=>sfx(17.3+i*.6,'pop',.4));sfx(22.8,'tick',.5);[0,1,2,3].forEach(i=>sfx(24+i*.5,'pop',.35));sfx(28.2,'alert',.4);sfx(29.4,'ding',.5);
