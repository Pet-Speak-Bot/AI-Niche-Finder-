#!/bin/bash
# one-time setup on macOS (Homebrew): ffmpeg, node + playwright chromium, python numpy + sherpa-onnx + whisper model (~1 GB)
set -e; cd "$(dirname "$0")/.."
command -v brew >/dev/null || { echo "install Homebrew first: https://brew.sh"; exit 1; }
brew install ffmpeg node python3 || true
npm init -y >/dev/null 2>&1 || true; npm i playwright; npx playwright install chromium
python3 -m pip install --user numpy sherpa-onnx
mkdir -p ~/asr && cd ~/asr && [ -d sherpa-onnx-whisper-turbo ] || { curl -L -o m.tar.bz2 https://github.com/k2-fsa/sherpa-onnx/releases/download/asr-models/sherpa-onnx-whisper-turbo.tar.bz2 && tar xjf m.tar.bz2 && rm m.tar.bz2; }
echo "setup done"
