# Setup (for the AI to run)

The user opened this folder in Claude Code and typed something like "อ่าน SETUP.md แล้วติดตั้งทุกอย่างให้หน่อย".

## 0. Starter kit — once per machine (check this first)
This skill relies on the tadmaipen.com starter kit ("ชุดติดตั้งเริ่มต้น"), which installs the shared tools once per machine.
- Look for `~/.tadmaipen/setup-done.json` (Windows: `%USERPROFILE%\.tadmaipen\setup-done.json`).
- **Found:** the shared tools are already installed. Skip every step below that only installs Homebrew/winget, ffmpeg,
  Node, Python, Git/Git LFS, libraqm, numpy, scipy, pillow, soundfile, opencv-python-headless, pythainlp, sherpa-onnx,
  the Whisper turbo model in `~/asr/sherpa-onnx-whisper-turbo`, Playwright Chromium or the HyperFrames plugin.
  Do only what is specific to this skill.
- **Not found:** tell the user in Thai: "เครื่องนี้ยังไม่ได้ติดตั้งชุดติดตั้งเริ่มต้น (ทำครั้งเดียวต่อเครื่อง)
  ดาวน์โหลดได้ที่ https://tadmaipen.com/th/start" and offer to install it first (download the zip from that page,
  unzip, follow its SETUP.md), then come back here. If the user prefers, carry on with the full steps below instead.
- The self-test / example render (if this file has one) is optional: skip it unless the user asks for a test clip.

## 1. Skill-specific tools
The starter kit already has Node + Playwright (Chromium), ffmpeg, Python 3 + numpy, sherpa-onnx and the Thai Whisper turbo model
(`~/asr/sherpa-onnx-whisper-turbo`), so usually nothing else is needed.
If `node -e "require('playwright')"` fails in this folder, run `npm init -y && npm i playwright` here once.
Without the starter kit: on a Mac run `bash tools/setup-mac.sh`; on Windows install Node 18+, ffmpeg and Python, then
`npm i playwright && npx playwright install chromium` and `python -m pip install numpy sherpa-onnx`.
Test (optional): `node tools/snap.js tham-luang 2 15 30` and open `episodes/tham-luang/build/snap/sheet.jpg`.

## 2. Install the skill
Copy this folder so every new Claude Code session knows it, from any folder:
- Mac: `mkdir -p ~/.claude/skills && cp -R <this folder> ~/.claude/skills/vector-news-recap-cartoon`
- Windows: copy the folder to `%USERPROFILE%\.claude\skills\vector-news-recap-cartoon`

## 3. Finish
Tell the user in Thai, in 2-3 short lines, that the skill is ready and what to type next (see HOW-TO-USE.md if present).
