#!/bin/bash
# Mux audio onto the silent renders. Optional: REF_VIDEO=/path/to/reference.mp4 also builds the side-by-side compare.
set -e
cd "$(dirname "$0")/.."
ffmpeg -hide_banner -loglevel error -y -i build/silent.mp4 -i audio/mix.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 256k -ar 48000 -shortest -movflags +faststart mossland-promo.mp4
ffmpeg -hide_banner -loglevel error -y -i build/silentV.mp4 -i audio/mix.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 256k -ar 48000 -shortest -movflags +faststart mossland-promo-vertical.mp4
if [ -n "$REF_VIDEO" ]; then
ffmpeg -hide_banner -loglevel error -y -i "$REF_VIDEO" -i mossland-promo.mp4 -filter_complex "[0:v]scale=960:540,fps=30[a];[1:v]scale=960:540,fps=30[b];[a][b]hstack,format=yuv420p[v];[0:a]pan=mono|c0=0.5*c0+0.5*c1[l];[1:a]pan=mono|c0=0.5*c0+0.5*c1[r];[l][r]join=inputs=2:channel_layout=stereo[au]" -map "[v]" -map "[au]" -c:v libx264 -crf 22 -preset fast -c:a aac -b:a 192k -shortest compare_side_by_side.mp4
fi
