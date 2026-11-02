#!/bin/bash
set -e
cd "$(dirname "$0")/.."
ffmpeg -hide_banner -loglevel error -y -i build/silent.mp4 -i audio/mix.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 256k -ar 48000 -shortest -movflags +faststart mosmos-promo.mp4
# vertical 1080x1920: full frame centered over a blurred, enlarged copy of itself
ffmpeg -hide_banner -loglevel error -y -i mosmos-promo.mp4 -filter_complex "[0:v]split=2[a][b];[a]scale=3414:1920,crop=1080:1920,boxblur=40:2,eq=brightness=-0.04[bg];[b]scale=1080:-2[fg];[bg][fg]overlay=0:(H-h)/2,format=yuv420p[v]" -map "[v]" -map 0:a -c:v libx264 -preset medium -crf 19 -r 60 -c:a copy -movflags +faststart mosmos-promo-vertical.mp4
python3 - <<'P'
import json,subprocess
from PIL import Image,ImageDraw,ImageFont
TL=json.load(open('build/timeline.json'))
f1=ImageFont.truetype('/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc',18)
W,H=384,216;C=6;S=TL['shots'];rows=(len(S)+C-1)//C
sh=Image.new('RGB',(C*W,rows*(H+30)),'#222')
for i,s in enumerate(S):
    t=s['t0']+(s['t1']-s['t0'])*0.6
    subprocess.run(['ffmpeg','-v','error','-y','-ss',f'{t:.3f}','-i','mosmos-promo.mp4','-frames:v','1','-s',f'{W}x{H}','/tmp/ms.png'])
    im=Image.open('/tmp/ms.png').convert('RGB'); x=(i%C)*W; y=(i//C)*(H+30)
    sh.paste(im,(x,y)); ImageDraw.Draw(sh).text((x+6,y+H+3),f"{i+1} {s['ref']} {s['t0']:.2f}–{s['t1']:.2f} {s['id']}",fill='white',font=f1)
sh.save('mosmos-shots.jpg',quality=88)
P
for f in mosmos-promo.mp4 mosmos-promo-vertical.mp4; do ffprobe -v error -show_entries stream=codec_name,width,height,r_frame_rate -show_entries format=duration -of compact $f; done
