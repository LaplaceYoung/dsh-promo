#!/usr/bin/env bash
# Render one template end to end:  scripts/render.sh 03-claude-thinking
#   timeline -> audio -> loudnorm (-14 LUFS) -> remotion render -> mux -> previews
# Env: RENDER_DIR (where the 1080p master goes, default <template>/build), CONC (render concurrency)
set -euo pipefail
E=$(cd "$(dirname "$0")/.." && pwd); T=$(cd "$E/../$1" && pwd); slug=$(basename "$T")
OUT=${RENDER_DIR:-$T/build}; mkdir -p "$T/build" "$OUT"
meta() { python3 -c "import json,sys;print(json.load(open('$T/meta.json'))['$1'])"; }
COMP=$(meta comp)
[ -f "$T/timeline.py" ] && python3 "$T/timeline.py"
python3 "$T/audio.py" "$T/build/mix_raw.wav"
"$E/scripts/loudnorm.sh" "$T/build/mix_raw.wav" "$T/build/mix.wav"
cd "$E"
[ "${SKIP_RENDER:-0}" = 1 ] || npx remotion render src/index.ts "$COMP" "$T/build/silent.mp4" --codec h264 --crf 17 --concurrency "${CONC:-7}" --gl=swangle --muted --log=error
ffmpeg -v error -y -i "$T/build/silent.mp4" -i "$T/build/mix.wav" -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -shortest -movflags +faststart "$OUT/$slug.mp4"
"$E/scripts/previews.sh" "$OUT/$slug.mp4" "$T"
echo "done: $OUT/$slug.mp4"
