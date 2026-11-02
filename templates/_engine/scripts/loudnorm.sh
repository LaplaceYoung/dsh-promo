#!/usr/bin/env bash
# two-pass loudnorm to -14 LUFS / -1.5 dBTP:  loudnorm.sh in.wav out.wav
set -euo pipefail
F="alimiter=limit=0.5:level=false,loudnorm=I=-14:TP=-1.5:LRA=11"
J=$(ffmpeg -hide_banner -y -i "$1" -af "$F:print_format=json" -f null - 2>&1 | sed -n '/{/,/}/p')
g() { echo "$J" | python3 -c "import json,sys;print(json.load(sys.stdin)['$1'])"; }
ffmpeg -v error -y -i "$1" -af "$F:measured_I=$(g input_i):measured_TP=$(g input_tp):measured_LRA=$(g input_lra):measured_thresh=$(g input_thresh):offset=$(g target_offset):linear=true" -ar 48000 "$2"
