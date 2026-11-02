# Single source of truth for picture (Remotion) and sound (audio.py).  MOSS Create (mossland.studio → create.moss.cn)
import os; ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # project root
import json
BPM=110; E=60/BPM/2; FPS=60
def s(t): return round(round(t/E)*E,4)
REF=[0.0,0.533,3.6,5.933,9.6,13.067,16.4,20.6,23.767,28.4,30.767,32.267,35.7,37.833,39.733,40.867,42.6,45.0,47.233,52.2,54.533,57.567,59.567,62.9,64.967,71.233,74.0,75.767,78.233,80.967,82.333,83.967,85.8,89.433,91.833,96.367,99.233]
END=s(99.8)
names=["black","logo","meet","cascade","ui_auto","card1","chip1","chip2","mimage","card2","side_hot","gallery","gallery2","tpl_card","tpl_play","tpl_push","q_more","q1","voice","q2","synth","q3","agents","card_yours","theme","typedel","orbit","m1","m2","m3","card_cards","m4","m5","slogan","tagline","outro","black_end"]
shots=[]
for i,n in enumerate(names):
    a=s(REF[i]); b=s(REF[i+1]) if i+1<len(REF) else END
    shots.append(dict(id=n,ref=f"R{i+1}",ref_in=REF[i],ref_out=REF[i+1] if i+1<len(REF) else 99.8,t0=a,t1=b,f0=round(a*FPS),f1=round(b*FPS)))
sub={"voice":[47.70,49.90,51.57],"synth":[55.13,55.87],"theme":[66.0,67.5,67.9,68.93,69.33,70.4,70.97],"m1":[77.27],"m2":[79.07,79.97]}
for sh in shots: sh["subs"]=[round(s(x)*FPS) for x in sub.get(sh["id"],[])]
T={sh["id"]:sh for sh in shots}
typing=[]
def ty(id,text,t0,cps,dele=None,dcps=14): typing.append(dict(id=id,text=text,t0=round(t0,4),cps=cps,dele=dele,dcps=dcps))
ty("meet","认识一下",s(4.91),4.4)
ty("card1","描述一下，直接成图",T["card1"]["t0"]+0.30,9.0)
ty("card2","喜欢哪个，直接用模板",T["card2"]["t0"]+0.20,10.0)
ty("q1","比如，给故事配个音？",T["q1"]["t0"]+0.2,8.0)
ty("q2","或者，来段早安电台？",T["q2"]["t0"]+0.2,8.0)
ty("q3","甚至，一起拍支宣传片？",T["q3"]["t0"]+0.2,8.5)
ty("typedel1","复古杂志封面",T["typedel"]["t0"]+0.15,8.0,dele=T["typedel"]["t0"]+1.05,dcps=18)
ty("typedel2","早安电台",T["typedel"]["t0"]+1.55,7.0,dele=T["typedel"]["t0"]+2.40,dcps=16)
ty("tagline","和 MOSS Create 一起，把想法变成作品",T["tagline"]["t0"]+0.20,10.0,dele=s(94.6),dcps=400)
def chars(e): return [round(e["t0"]+i/e["cps"],4) for i,c in enumerate(e["text"]) if c!=" "]
ev=[]
def add(kind,t,g=1.0): ev.append(dict(kind=kind,t=round(t,4),g=g))
for e in typing:
    for t in chars(e): add("key",t,0.8)
    if e["dele"]:
        if e["dcps"]>100: add("bksp",e["dele"],0.9)
        else:
            for i in range(len(e["text"])): add("bksp",e["dele"]+i/e["dcps"],0.6)
# clicks (absolute seconds); the chip clicks are where the real footage clicks
marks=dict(
  auto_click=T["ui_auto"]["t0"]+1.35, pro_click=T["ui_auto"]["t0"]+2.65,
  chip1_click=T["chip1"]["t0"]+1.1,          # home_chip.mp4 from 1.2s -> click at 2.3s
  chip2_click=T["chip2"]["t0"]+0.35,
  hot_click=T["side_hot"]["t0"]+0.95,
  tpl_click=T["tpl_card"]["t0"]+1.35,
  agent_click=T["agents"]["t0"]+2.2,
  theme=[s(66.0),s(67.5),s(67.9),s(68.93),s(69.33),s(70.4),s(70.97)],
  ding=s(96.9),
)
for k in ["auto_click","pro_click","chip1_click","chip2_click","hot_click","tpl_click","agent_click"]: add("click",marks[k])
for t in marks["theme"]: add("click",t,0.8)
add("ding",marks["ding"],1.0)
add("glitch",s(0.533)+0.05,1.0); add("glitch",s(0.533)+0.30,0.6)
add("swish",s(6.8)-0.2,0.8)
add("swish",T["card1"]["t1"]-0.35,0.8); add("swish",T["card2"]["t1"]-0.3,0.5)
add("pop",T["tpl_play"]["t0"]+0.05,0.8); add("chime",T["mimage"]["t0"]+0.1,0.5)
add("impact",T["orbit"]["t0"],1.0); add("riser_end",T["orbit"]["t1"],1.0)
add("impact",T["slogan"]["t0"],0.7); add("swish",T["slogan"]["t1"]-0.55,1.0)
for i in range(4): add("hit",T["card_yours"]["t0"]+0.15+i*0.2727,0.6)
add("select",s(94.33),0.8)
for sh in shots[1:]: add("cut",sh["t0"],0.5)
json.dump(dict(bpm=BPM,eighth=E,fps=FPS,end=END,frames=round(END*FPS),shots=shots,typing=typing,events=sorted(ev,key=lambda x:x["t"]),marks=marks),open(ROOT+"/build/timeline.json","w"),ensure_ascii=False,indent=1)
for sh in shots: print(f'{sh["ref"]:>4} {sh["id"]:<11} ref {sh["ref_in"]:6.2f}  ours {sh["t0"]:6.3f}-{sh["t1"]:6.3f} ({sh["t1"]-sh["t0"]:.2f}s) d_in {1000*(sh["t0"]-sh["ref_in"]):+.0f}ms subs {sh["subs"]}')
print("end",END,round(END*FPS))
