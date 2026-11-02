#!/bin/bash
# peek.sh clip.mp4 out.jpg : 8 frames evenly
f=$1; o=$2; d=$(ffprobe -v error -show_entries format=duration -of csv=p=0 $f)
python3 - "$f" "$o" "$d" <<'P'
import sys,subprocess
from PIL import Image,ImageDraw,ImageFont
f,o,d=sys.argv[1],sys.argv[2],float(sys.argv[3])
font=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',22)
sh=Image.new('RGB',(1920,1080))
for k in range(8):
    t=d*(k+0.5)/8
    subprocess.run(['ffmpeg','-v','error','-y','-ss',f'{t:.2f}','-i',f,'-frames:v','1','-s','960x540','/tmp/pk.png'])
    im=Image.open('/tmp/pk.png').convert('RGB'); ImageDraw.Draw(im).text((6,6),f'{t:.1f}/{d:.1f}',fill='red',font=font)
    sh.paste(im.resize((480,270)),((k%4)*480,(k//4)*270))
sh.crop((0,0,1920,540)).save(o,quality=85)
P
