// EPISODE TEMPLATE — copy to episodes/<name>/episode.js (tools/new_episode.sh does this)
// 1) put vo.mp3 in the episode folder  2) run tools/islands.py <name> to get phrase start times
// 3) fill C (one card per VO phrase) + S (one scene every ~5-8 s)  4) tools/snap.sh to check  5) tools/finish.sh
const END=20.0;           // VO length + ~1 s
// caption cards: [start, 'Thai line 1|line 2  {y:yellow word} {r:red pill word}', 'small English line']
const C=[
 [0.0,'สรุปข่าว{y:หัวข้อ} ใน 60 วินาที|เกิดอะไรขึ้น','The story in 60 seconds: what happened?'],
 [4.0,'วันที่ ... {r:คำแรง}','On ...'],
 [10.0,'ถ้าเป็นคุณ คุณจะ{y:ทำอะไร}?','What would you do?'],
 [14.0,'',''],             // empty card = no caption (CTA scene shows text on top)
];
const S=[{t:0,f:scStudio},{t:4.0,f:scFacts},{t:10.0,f:scLesson},{t:14.0,f:scCTA}];
const HOST={skin:'#E9B892',hair:'long',top:'#2B3A67',bot:'#22284A',jacket:1,seed:1.3};
function scStudio(c,t,lt){c.save();scaleAt(c,W/2,900,1+lt*.006);studioBG(c,t,0);person(c,{...HOST,x:540,y:1560,h:640,expr:'n'},t);c.restore();header(c,t,0,'สรุปข่าว','หัวข้อข่าว','y');}
function scFacts(c,t,lt){navyBG(c);counterCard(c,t,4.4,540,760,'ยอดเงิน',678,'ล้านบาท');stamp(c,t,6.5,540,1000,'ยังไม่ยืนยัน');header(c,t,4.0,'ตัวเลขที่ถูกพูดถึง','ข้อเท็จจริง','o');chip(c,t,4.0,'19 ต.ค. 2569');}
function scLesson(c,t,lt){roomBG(c,t);phoneChecklist(c,t,10.4,'ก่อนโอน เช็กก่อน',[['ชื่อบัญชีนิติบุคคล',11.0],['บัญชีส่วนตัว',12.0,false]]);header(c,t,10.0,'','บทเรียน','y',false,10.4);}
function scCTA(c,t,lt){studioBG(c,t,0);const a=fade(t,14.05,.3);c.save();c.globalAlpha=a;richLine(c,'ถ้าคุณอยู่ในเหตุการณ์นั้น',W/2,300,64,'K');richLine(c,'คุณจะ{y:ทำอะไร}?',W/2,392,72,'K');c.restore();ctaPill(c,t,15.0);}
// SFX: sfx(time,type,vol) types: sw1 sw2 (scene swoosh) pop ding check drop alert stamp chip tick
S.forEach((s,i)=>{if(i)sfx(s.t-.15,i%2?'sw1':'sw2',.5);});
sfx(4.4,'tick',.5);sfx(5.8,'ding',.5);sfx(6.5,'stamp',.7);sfx(10.4,'pop',.5);sfx(11.0,'check',.5);sfx(12.0,'alert',.4);sfx(15.0,'pop',.55);
