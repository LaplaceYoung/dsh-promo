#!/usr/bin/env bash
# Render one template end to end:  scripts/render.sh 03-claude-thinking
#   timeline -> audio -> loudnorm (-14 LUFS) -> remotion render -> mux -> previews
# Env: RENDER_DIR (where the 1080p master goes, default <template>/build), CONC (render concurrency),
#      SKIP_RENDER=1 (audio only). meta.json may set "lufs" (default -14).
set -euo pipefail
E=$(cd "$(dirname "$0")/.." && pwd); T=$(cd "$E/../$1" && pwd); slug=$(basename "$T")
OUT=${RENDER_DIR:-$T/build}; mkdir -p "$T/build" "$OUT"
meta() { python3 -c "import json,sys;print(json.load(open('$T/meta.json'))['$1'])"; }
COMP=$(meta comp)
[ -f "$T/timeline.py" ] && python3 "$T/timeline.py"
python3 "$T/audio.py" "$T/build/mix_raw.wav"
LUFS=$(python3 -c "import json;print(json.load(open('$T/meta.json')).get('lufs',-14))")
"$E/scripts/loudnorm.sh" "$T/build/mix_raw.wav" "$T/build/mix.wav" "$LUFS"
cd "$E"
# SKIP_RENDER=1 re-masters audio only: reuse the picture of an existing master if build/silent.mp4 is gone
if [ "${SKIP_RENDER:-0}" = 1 ] && [ ! -f "$T/build/silent.mp4" ] && [ -f "$OUT/$slug.mp4" ]; then ffmpeg -v error -y -i "$OUT/$slug.mp4" -map 0:v -c copy "$T/build/silent.mp4"; fi
[ "${SKIP_RENDER:-0}" = 1 ] || npx remotion render src/index.ts "$COMP" "$T/build/silent.mp4" --codec h264 --crf 17 --concurrency "${CONC:-7}" --gl=swangle --muted --log=error
ffmpeg -v error -y -i "$T/build/silent.mp4" -i "$T/build/mix.wav" -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -shortest -movflags +faststart "$OUT/$slug.mp4"
"$E/scripts/previews.sh" "$OUT/$slug.mp4" "$T"
echo "done: $OUT/$slug.mp4"
