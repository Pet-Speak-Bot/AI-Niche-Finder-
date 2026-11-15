#!/bin/bash
# bash tools/finish.sh <ep> "<file title>" [workers=4]
# renders 30 fps 1080x1920 in parallel, mixes audio, writes final/<title> (มีเพลง).mp4 + (ไม่มีเพลง).mp4
set -e; cd "$(dirname "$0")/.."; EP=$1; TITLE=${2:-$1}; NW=${3:-4}; D=episodes/$EP; mkdir -p $D/build/parts $D/final
node tools/meta.js $EP
END=$(python3 -c "import json;print(json.load(open('$D/build/meta.json'))['END'])"); N=$(python3 -c "print(int($END*30))")
for i in $(seq 0 $((NW-1))); do node tools/frames.js $EP $((i*N/NW)) $(((i+1)*N/NW)) $D/build/parts/p$i.mp4 & done; wait
: > $D/build/parts/list.txt; for i in $(seq 0 $((NW-1))); do echo "file 'p$i.mp4'" >> $D/build/parts/list.txt; done
ffmpeg -v error -y -f concat -safe 0 -i $D/build/parts/list.txt -c copy $D/build/video.mp4
python3 tools/audio.py $EP
for v in "มีเพลง:mix_music" "ไม่มีเพลง:mix_nomusic"; do n=${v%%:*}; a=${v##*:}
 ffmpeg -v error -y -i $D/build/video.mp4 -i $D/build/$a.wav -map 0:v -map 1:a -c:v libx264 -preset slow -crf 23 -pix_fmt yuv420p -c:a aac -b:a 160k -shortest -movflags +faststart "$D/final/$TITLE ($n).mp4"; done
ls -la $D/final
