#!/usr/bin/env bash
# previews.sh master.mp4 template_dir  ->  template_dir/preview.mp4 (720p) + preview.gif (640px)
# Size targets keep the whole template library small enough for a git push: MP4_MB (default 4.8), GIF_MAX bytes (default 2900000).
set -euo pipefail
M=$1; T=$2; tmp=$(mktemp -d)
dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$M")
fps=$(python3 -c "import json;print(min(30,json.load(open('$T/meta.json'))['fps']))")
vb=$(python3 -c "print(int(min(2600, ${MP4_MB:-4.8}*8192/$dur - 96)))")
( cd "$tmp" && ffmpeg -v error -y -i "$M" -vf "scale=1280:720:flags=lanczos,fps=$fps" -c:v libx264 -preset slow -b:v ${vb}k -pass 1 -an -f mp4 /dev/null && \
  ffmpeg -v error -y -i "$M" -vf "scale=1280:720:flags=lanczos,fps=$fps" -c:v libx264 -preset slow -b:v ${vb}k -pass 2 -pix_fmt yuv420p -c:a aac -b:a 96k -movflags +faststart "$T/preview.mp4" )
segs=$(python3 -c "import json;print(' '.join(f'{a}-{b}' for a,b in json.load(open('$T/meta.json'))['highlights']))")
mk() { w=$1; r=$2; nc=${3:-160}; di=${4:-sierra2_4a}; [ "$di" = bayer ] && di="bayer:bayer_scale=4" || true; fc=""; n=0; cat=""
  for s in $segs; do a=${s%-*}; b=${s#*-}; fc+="[0:v]trim=$a:$b,setpts=PTS-STARTPTS,fps=$r,scale=$w:-1:flags=lanczos[v$n];"; cat+="[v$n]"; n=$((n+1)); done
  fc+="${cat}concat=n=$n:v=1:a=0,split[x][y];[x]palettegen=max_colors=$nc:stats_mode=diff[p];[y][p]paletteuse=dither=$di:diff_mode=rectangle"
  ffmpeg -v error -y -i "$M" -filter_complex "$fc" -loop 0 "$T/preview.gif"; }
# photographic templates need fewer colours and ordered dither to fit
for cfg in "640 15" "640 12" "640 10" "640 8" "640 10 128 bayer" "640 8 96 bayer" "640 6 64 bayer"; do mk $cfg; sz=$(stat -c %s "$T/preview.gif"); [ $sz -le ${GIF_MAX:-2900000} ] && break; done
rm -rf "$tmp"
ls -l "$T/preview.mp4" "$T/preview.gif"
