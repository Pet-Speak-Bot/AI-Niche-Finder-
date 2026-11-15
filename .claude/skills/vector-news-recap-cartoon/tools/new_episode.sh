#!/bin/bash
# bash tools/new_episode.sh <name> [/path/to/vo.mp3]
set -e; cd "$(dirname "$0")/.."; mkdir -p episodes/$1; cp templates/episode-template.js episodes/$1/episode.js
[ -n "$2" ] && cp "$2" episodes/$1/vo.mp3; echo "created episodes/$1 (put vo.mp3 there, then: python3 tools/islands.py $1)"
