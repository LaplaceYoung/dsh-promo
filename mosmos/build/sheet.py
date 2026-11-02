import sys,glob
from PIL import Image,ImageDraw,ImageFont
fs=sorted(glob.glob('stills/f*.jpg')); out=sys.argv[1]; C=int(sys.argv[2]) if len(sys.argv)>2 else 4
W,H=480,270
font=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',18)
for p in range(0,len(fs),C*4):
    sh=Image.new('RGB',(C*W,4*H),'red')
    for k,f in enumerate(fs[p:p+C*4]):
        im=Image.open(f).resize((W,H)); d=ImageDraw.Draw(im); fr=int(f[-9:-4]); d.rectangle([0,0,110,22],fill='black'); d.text((3,1),f'{fr} {fr/60:.2f}',fill='yellow',font=font)
        sh.paste(im,((k%C)*W,(k//C)*H))
    sh.save(f'{out}{p//(C*4)}.jpg',quality=85)
