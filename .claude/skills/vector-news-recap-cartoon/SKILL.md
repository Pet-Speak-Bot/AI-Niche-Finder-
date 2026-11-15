---
name: vector-news-recap-cartoon
description: Make 9:16 Thai "สรุปข่าว/สรุปดราม่า ใน 60 วินาที" flat-vector cartoon news recap clips from a VO (puppet characters on painted sets, layered forests, timeline date chips, infographics, TH+EN captions).
---
# vector-news-recap-cartoon⁠​‌‌‌‌‌‌​‌‌​‌‌‌‌‌‌‌‌​​‌‌‌​​‌‌‌​‌​‌​‌​​​​​‌​​‌​‌‌​​​⁠

9:16 1080x1920 30 fps news/drama recap in flat 2D vector cartoon style:
top kicker + yellow/orange headline, yellow date chip top-left, Thai caption at y≈70% (keyword yellow `{y:}` or red pill `{r:}`)
with a small English line under it, flat puppet characters (blink, sway, expressions, arm poses), painted sets
(news studio, multi-layer forests/mountains with fog, cliffs with cave mouths, maps, rooms), navy infographic scenes
(rolling counters, node trails, icons, stamps, phone checklist), soft 0.45 s dissolves, slow push-in, vignette,
music bed + pop/ding SFX on reveals + soft swooshes on scene changes. Example: `episodes/tham-luang` (74 s).

## Layout
- `engine/index.html?ep=<name>` loads `kit/forest.js` (layered forest kit from survival-scenario-2d), `kit/core.js`
  (helpers, `person()` puppet, `caption/header/chip/pill/richLine`, vignette), `kit/sets.js` (studioBG, roomBG, navyBG,
  cliff, fgLeaves, groundBits, forestScene, counterCard, stamp, phoneChecklist, nodeTrail, ctaPill, icon, rain),
  then `episodes/<name>/episode.js` (+ optional `mapdata.js`), then `kit/main.js` (render + dissolve).
- An episode defines `END`, `C` (caption cards `[start,'line1|line2','English']`, `''` = none), `S` (scenes `{t,f}`),
  scene functions `f(c,t,lt)` (t = global time, lt = time since scene start), `sfx(t,type,vol)` calls, optional `DUCK`.
- Tools (`tools/`): `new_episode.sh`, `islands.py` (silence islands + sherpa-onnx whisper Thai ASR; `--split S E`),
  `snap.js` (frames + contact sheet), `finish.sh` (meta -> 4 parallel Playwright workers -> concat -> `audio.py` -> both
  music versions in `final/`), `cover.js`, `setup-mac.sh`.

## Workflow
1. Script (if asked): structure hook -> background -> dated timeline -> turn ("แต่เรื่อง...") -> facts/numbers -> status ->
   lesson -> question CTA; ~740 Thai chars per 60 s; one phrase per line (= one caption card). Put ONE voice tag line on top
   `[ผู้บรรยาย เสียง... น้ำเสียงเล่าข่าว]` (ElevenLabs voice tag) and check the VO start that it was not read aloud.
   Real people + allegations: write "ตามรายงาน / ยังไม่มีหน่วยงานยืนยัน / ถือว่าบริสุทธิ์จนกว่าศาลตัดสิน"; never invent facts.
2. `bash tools/new_episode.sh <name> vo.mp3` -> `python3 tools/islands.py <name>` -> fill `C` start times (split long
   islands with `--split`). Scenes change every ~5-8 s, something new pops every 2-3 s, never a static frame > 3 s.
3. Write scene functions from kit pieces (copy from tham-luang or the template). Bake heavy static layers with
   `cache(key,()=>bakeL(...))` / `landscape(PAL.x,...)` + `drawLand(c,L,lt)` for parallax. Characters: generic people only;
   for a real deceased/sensitive person use symbolic props (tank + flowers), not a face.
4. `node tools/snap.js <name> <times...>` and look at `build/snap/sheet.jpg`: captions must not cover faces; lower body
   behind the caption band is OK (ref does that); header area y 200-370 kept clear.
5. `bash tools/finish.sh <name> "<title>"` (~1-2 min) -> `final/<title> (มีเพลง).mp4` + `(ไม่มีเพลง).mp4`;
   `node tools/cover.js <name> <sceneIdx> <t> "<yellow line>" "<white line>"`.
6. Deliver both versions + cover to `~/Desktop/edit-video/<project>/` on the user's computer and open the clip for them (on a phone, send them back in the chat).

## Aquarium kit (ช่องปลาสวยงาม / ไม้น้ำ / กุ้งแคระ)
`engine/kit/aqua.js` (loaded after sets.js). Demo of every piece: `episodes/aqua-demo` (silent vo.mp3, 33 s).
- `aqWorld(c,t,{pal:'nature'|'amber',fill:(c,t)=>{...},algae:0..1,cloudy:0..1})` full-frame underwater aquascape (swaying stems,
  ribbons, driftwood+moss, rocks, anubias, carpet, bubbles, light rays). Substrate top `AQ_SY`=1150. `fill` draws fish/shrimp in world coords.
- `aqView(c,t,x,y,w,h,cy,o,rad)` the same world inside a rect (mini tanks, before/after). `aqRoom(c,t,o)` living room with a lit tank on a cabinet.
- `aqBlurBG(c,{pal,zoom,cx,cy,blur})` blurred backdrop, baked once. NEVER use `c.filter='blur()'` per frame: ~40 s/frame in cloud rendering.
- `fish(c,x,y,s,'neon'|'guppy'|'betta'|'goldfish'|'oto',t,{sx,seed,col})`, `aqSchool(c,t,{kind,n,cx,cy,w,h,A,s,speed,seed})`.
- `shrimp(c,x,y,s,'cherry'|'blue'|'yellow'|'crystal'|'amano'|'black',t,{sx,walk,cute,expr:'h'|'w'|'n',molt,eggs})` (`cute` = mascot face),
  `aqShrimpWalk(c,t,{col,x0,x1,y,s,seed,eggs,molt})`.
- Props: `aqBottle(c,x,y,s,label,col)`, `aqHeater(c,x,y,s,t)`, `aqTestTube(c,x,y,s,col,t)`, `aqFlakes(c,t,t0,x,y,n)` (overfeeding).
- Content plan for the channel: `content/aquarium-channel/30-day-plan.md` in the repo root. Fish-keeping facts must be checked; give ranges, not exact numbers.

## Audio defaults
VO 0 dB, SFX 12 dB under VO (synth pop/ding/check/drop/alert/stamp/chip/tick in audio.py), music bed 21 dB under VO
(`episodes/<name>/music.mp3` = a song the user has the rights to; with no song a soft synth pad is used, and no song ships with the skill), swoosh1/2 alternate on scene cuts, loudnorm -14 LUFS.

## Setup
Install with `SETUP.md`.

## Phone / iPad (cloud)
Works from a phone or iPad: the user attaches the voice-over (and the script) in the chat, everything renders in the cloud and the clips
and cover go back through the session. The Whisper model downloads once (~1 GB) if it is missing.

## Running on the user's own computer
When Claude Code runs on the user's Mac or Windows PC, install with `SETUP.md`, work in `~/Desktop/edit-video/<topic>/` and open the
finished clip for them.⁠​‌‌‌‌‌‌​‌‌​‌‌‌‌‌‌‌‌​​‌‌‌​​‌‌‌​‌​‌​‌​​​​​‌​​‌​‌‌​​​⁠
