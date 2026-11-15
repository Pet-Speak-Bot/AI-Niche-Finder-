// DEMO: Betta & Co. mascot คุณเบต + น้องเชอร์รี่ (no VO)
const END=22.5;
const C=[[0,'',''],[4,'คุณเบต มีหลาย{y:อารมณ์}','Mr. Bet has many moods'],[9,'',''],[14,'',''],[18.5,'','']];
const S=[{t:0,f:sIntro},{t:4,f:sMoods},{t:9,f:sDuo},{t:14,f:sNo},{t:18.5,f:sOutro}];
function sIntro(c,t,lt){aqBlurBG(c,{zoom:1.2,cy:1000});const x=-300+eoc(lt/1.4)*820;
 bettaLogo(c,t,.2,540,380);betta(c,x,950,1.25,t,{expr:'h',pose:lt>1.5?'wave':'idle',talk:lt>1.6&&lt<3.6});talkBubble(c,t,1.7,560,1340,'สวัสดีครับ ผม{y:คุณเบต}',600,1180);}
function sMoods(c,t,lt){navyBG(c);const M=[['h','idle','ยิ้ม'],['w','idle','ตกใจ'],['smug','point','ชี้ / มั่นใจ'],['h','flare','กางครีบอวด']];
 M.forEach((m,i)=>{const x=i%2?800:290,y=i<2?600:1000,k=pop(t,4.2+i*.5);if(k<=0)return;c.save();scaleAt(c,x,y,k);betta(c,x+50,y,.86,t,{expr:m[0],pose:m[1],seed:i});c.restore();pill(c,x,y+170,m[2],k,'rgba(255,255,255,.14)','#fff',30);});
 header(c,t,4,'Betta & Co.','มาสคอตคุณเบต','y');}
function sDuo(c,t,lt){c.save();scaleAt(c,W/2,900,1+lt*.008);aqWorld(c,t,{});c.restore();
 shrimp(c,250,1100,3,'cherry',t,{cute:1,expr:'w',walk:.2});betta(c,770,760,1.0,t,{sx:-1,expr:lt>2.6?'smug':'h',pose:lt>2.6?'point':'idle',talk:lt>2.6});
 talkBubble(c,t,9.3,330,500,'พี่เบต ทำไม|กุ้งเพื่อนหนู{r:ตายยกตู้}?',260,980,11.8);talkBubble(c,t,11.9,620,420,'เพราะ{y:ค่าน้ำแกว่ง}ไงน้อง',700,640);}
function sNo(c,t,lt){navyBG(c);betta(c,560,900,1.25,t,{expr:'w',pose:'flare'});stamp(c,t,14.6,540,560,'ห้ามทำ!','#D8353B');talkBubble(c,t,15.4,540,1300,'อย่า{r:เปลี่ยนน้ำ 100%}!',560,1150);}
function sOutro(c,t,lt){aqBlurBG(c,{zoom:1.2,cy:1000});bettaLogo(c,t,18.6,540,420);betta(c,520,920,1.1,t,{expr:'smug',pose:'wave',talk:lt<2});shrimp(c,880,1130,1.8,'cherry',t,{cute:1,expr:'h',sx:-1});
 talkBubble(c,t,19,540,1290,'แล้วเจอกันที่ {y:Betta & Co.}',540,1150);ctaPill(c,t,20,'กดติดตาม',1470);}
S.forEach((s,i)=>{if(i)sfx(s.t-.15,i%2?'sw1':'sw2',.5);});sfx(.2,'ding',.5);sfx(1.7,'pop',.5);[0,1,2,3].forEach(i=>sfx(4.2+i*.5,'pop',.4));sfx(9.3,'pop',.5);sfx(11.9,'pop',.5);sfx(14.6,'stamp',.7);sfx(15.4,'alert',.4);sfx(18.6,'ding',.5);sfx(19,'pop',.5);sfx(20,'pop',.5);
