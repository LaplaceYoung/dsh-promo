# Single source of truth for picture (Remotion reads timeline.json) and sound (audio.py reads it).
import os; ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # project root
import json, math
BPM=110; E=60/BPM/2          # eighth note = 0.2727 s ; music starts at t=0 on beat
FPS=60
def s(t): return round(round(t/E)*E,4)   # snap to eighth grid
REF=[0.0,0.533,3.6,5.933,9.6,13.067,16.4,20.6,23.767,28.4,30.767,32.267,35.7,37.833,39.733,40.867,42.6,45.0,47.233,52.2,54.533,57.567,59.567,62.9,64.967,71.233,74.0,75.767,78.233,80.967,82.333,83.967,85.8,89.433,91.833,96.367,99.233]
END=s(99.8)
names=["black","logo","meet","cascade","ui_fn","card_fn","listen","refine","sent","card_done","tabs_mail","mail_speak","mail_out","tabs_doc","doc_open","doc_close","q_more","q_prompt","prompt","q_term","term","q_meet","meeting","card_yours","polish","typedel","orbit","m_meet","m_todo","m_hot","card_cards","m_bird","m_advanced","slogan","tagline","outro","black_end"]
shots=[]
for i,n in enumerate(names):
    a=s(REF[i]); b=s(REF[i+1]) if i+1<len(REF) else END
    shots.append(dict(id=n,ref=f"R{i+1}",ref_in=REF[i],ref_out=REF[i+1] if i+1<len(REF) else 99.8,t0=a,t1=b,f0=round(a*FPS),f1=round(b*FPS)))
sub={ "prompt":[47.70,49.90,51.57], "term":[55.13,55.87], "polish":[66.0,67.5,67.9,68.93,69.33,70.4,70.97], "m_meet":[77.27], "m_todo":[79.07,79.97] }
for sh in shots:
    sh["subs"]=[round(s(x)*FPS) for x in sub.get(sh["id"],[])]
T={sh["id"]:sh for sh in shots}
# ---- type-on events (absolute seconds) ----
typing=[]
def ty(id,text,t0,cps,dele=None,dcps=14):
    typing.append(dict(id=id,text=text,t0=round(t0,4),cps=cps,dele=dele,dcps=dcps))
ty("meet","认识一下",s(4.91),4.4)
ty("card_fn","按一次 Fn，开口就行",T["card_fn"]["t0"]+0.30,9.0)
ty("listen","呃，第一版我们周三前给你，你先把品牌素材发我。",T["listen"]["t0"]+0.25,9.5)
ty("card_done","再按一次，文字写好",T["card_done"]["t0"]+0.25,9.0)
ty("mail_speak","那个，李经理您好，第一版方案我们周三前发给您，麻烦今天把品牌素材发我。",T["mail_speak"]["t0"]+0.15,12.0)
ty("q_prompt","比如，给 AI 提需求？",T["q_prompt"]["t0"]+0.2,8.0)
ty("prompt","嗯，帮我，分析三款语音输入产品，重点看场景识别、词库和会议记录，最后用表格对比，再给三条改进建议。",T["prompt"]["t0"]+0.1,20.0)
ty("q_term","或者，直接跟终端说？",T["q_term"]["t0"]+0.2,8.0)
ty("term_raw","呃，帮我，在当前项目里查找包含 API_KEY 的文件。",T["term"]["t0"]+0.05,26.0)
ty("term_cmd",'rg -l "API_KEY" .',s(55.87)+0.10,16.0)
ty("q_meet","甚至，记下一整场会？",T["q_meet"]["t0"]+0.2,8.0)
ty("typedel1","聊天、邮件",T["typedel"]["t0"]+0.15,7.0,dele=T["typedel"]["t0"]+1.05,dcps=16)
ty("typedel2","文档、终端",T["typedel"]["t0"]+1.55,7.0,dele=T["typedel"]["t0"]+2.40,dcps=16)
ty("tagline","我们本来就会说，只是打字太久了。",T["tagline"]["t0"]+0.20,8.0,dele=s(94.6),dcps=400)
def chars(e):
    out=[]; 
    for i,c in enumerate(e["text"]):
        if c!=" ": out.append(round(e["t0"]+i/e["cps"],4))
    return out
# ---- discrete foley ----
ev=[]
def add(kind,t,g=1.0): ev.append(dict(kind=kind,t=round(t,4),g=g))
for e in typing:
    for t in chars(e): add("key",t,0.8 if e["id"] not in ("prompt","term_raw","mail_speak","listen") else 0.0)
    if e["dele"]:
        n=len(e["text"])
        if e["dcps"]>100: add("bksp",e["dele"],0.9)
        else:
            for i in range(n): add("bksp",e["dele"]+i/e["dcps"],0.6)
# clicks / key presses (absolute seconds) — mirrored in Promo.tsx via timeline.json "marks"
marks=dict(
  ui_click=T["ui_fn"]["t0"]+1.45, ui_fn=T["ui_fn"]["t0"]+2.45,
  listen_fn=T["listen"]["t0"]+3.0,
  mail_click=T["tabs_mail"]["t0"]+0.95, mail_fn=T["mail_speak"]["t0"]+3.05,
  doc_click=T["tabs_doc"]["t0"]+1.10,
  meet_fn=T["meeting"]["t0"]+0.35,
  todo_check=[s(78.8),s(79.07)+0.3,s(79.97)+0.25],
  pol=[s(66.0),s(67.5),s(67.9),s(68.93),s(69.33),s(70.4),s(70.97)],
  ding=s(96.9),
)
add("click",marks["ui_click"]); add("keycap",marks["ui_fn"]); add("keycap",marks["listen_fn"])
add("click",marks["mail_click"]); add("keycap",marks["mail_fn"]); add("click",marks["doc_click"]); add("keycap",marks["meet_fn"],1.0)
for t in marks["todo_check"]: add("click",t,0.7)
for t in marks["pol"]: add("click",t,0.8)
add("ding",marks["ding"],1.0)
add("glitch",s(0.533)+0.05,1.0); add("glitch",s(0.533)+0.30,0.6)
add("swish",s(6.8)-0.2,0.8)        # cascade swish
add("swish",T["card_fn"]["t1"]-0.35,0.8); add("swish",T["card_done"]["t1"]-0.3,0.5)
add("pop",T["sent"]["t0"]+2.55,0.8)   # message sent
add("chime",T["sent"]["t0"]+2.6,0.6)
add("impact",T["orbit"]["t0"],1.0); add("riser_end",T["orbit"]["t1"],1.0)
add("impact",T["slogan"]["t0"],0.7); add("swish",T["slogan"]["t1"]-0.55,1.0)
for i in range(4): add("hit",T["card_yours"]["t0"]+0.15+i*0.2727,0.6)
add("select",s(94.33),0.8)
for sh in shots[1:]:
    add("cut",sh["t0"],0.5)
json.dump(dict(bpm=BPM,eighth=E,fps=FPS,end=END,frames=round(END*FPS),shots=shots,typing=typing,events=sorted(ev,key=lambda x:x["t"]),marks=marks),open(ROOT+"/build/timeline.json","w"),ensure_ascii=False,indent=1)
for sh in shots: print(f'{sh["ref"]:>4} {sh["id"]:<11} ref {sh["ref_in"]:6.2f}-{sh["ref_out"]:6.2f}  ours {sh["t0"]:6.3f}-{sh["t1"]:6.3f}  ({sh["t1"]-sh["t0"]:.2f}s) d_in {1000*(sh["t0"]-sh["ref_in"]):+.0f}ms subs {sh["subs"]}')
print("end",END,round(END*FPS))
