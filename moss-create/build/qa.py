import glob,sys,json,os
from PIL import Image, ImageDraw, ImageFont
d=sys.argv[1]; out=sys.argv[2]; cols=int(sys.argv[3]) if len(sys.argv)>3 else 4
TL=json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)),'timeline.json')))
fs=sorted(glob.glob(d+'/f*.jpg'),key=lambda x:int(x.split('/f')[-1][:-4]))
im0=Image.open(fs[0]); w,h=im0.size; tw=480; th=int(h*tw/w)
font=ImageFont.truetype('/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc',20) if glob.glob('/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc') else None
pages=[fs[i:i+cols*4] for i in range(0,len(fs),cols*4)]
for pi,pg in enumerate(pages):
    S=Image.new('RGB',(cols*tw,((len(pg)+cols-1)//cols)*(th+26)),'white'); D=ImageDraw.Draw(S)
    for i,f in enumerate(pg):
        fr=int(f.split('/f')[-1][:-4]); sh=[s for s in TL['shots'] if s['f0']<=fr<s['f1']][0]
        im=Image.open(f).resize((tw,th)); x=(i%cols)*tw; y=(i//cols)*(th+26); S.paste(im,(x,y+26)); D.text((x+4,y+2),f"{sh['ref']} {sh['id']} f{fr}",fill='black',font=font)
    S.save(f'{out}{pi}.jpg')
print(len(pages))
