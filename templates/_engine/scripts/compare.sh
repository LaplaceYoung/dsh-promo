#!/usr/bin/env bash
# compare.sh ref.mp4 ours.mp4 out.mp4 — reference left (left channel), ours right (right channel). LOCAL ONLY, never commit.
set -euo pipefail
ffmpeg -v error -y -i "$1" -i "$2" -filter_complex "[0:v]scale=960:540:force_original_aspect_ratio=decrease,pad=960:540:(ow-iw)/2:(oh-ih)/2,fps=30[a];[1:v]scale=960:540,fps=30[b];[a][b]hstack[v];[0:a]pan=mono|c0=c0[l];[1:a]pan=mono|c0=c0[r];[l][r]join=inputs=2:channel_layout=stereo[au]" -map "[v]" -map "[au]" -c:v libx264 -crf 30 -preset veryfast -c:a aac -b:a 96k -shortest "$3"
