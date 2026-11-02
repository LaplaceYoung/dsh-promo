# Template 04 timeline — structure of Linear "Introducing Linear Releases" (2026). Cut and type-on times
# measured from the reference frame by frame (60 fps).
import json, os
H = os.path.dirname(os.path.abspath(__file__))
FPS = 60; DUR = 30.067
CUTS = [4.683, 9.067, 11.0, 15.567, 21.733, 26.2, 26.5]
W1 = "语音输入"; W2 = "现在，开口就好"
T1 = [21.967, 22.133, 22.3, 22.467]                       # ref: 8 letters 21.967–22.633
T2 = [24.283 + i * 0.17 for i in range(len(W2))]           # ref: 13 letters 24.283–25.3
M = dict(cursor_on=21.75, del_all=24.0, card_fade=10.0, panels=[11.0, 11.3, 11.6], logo=26.5, black=26.2)
ev = []
def e(kind, t, g=1.0, **k): ev.append(dict(kind=kind, t=round(t, 3), g=g, **k))
for t in T1 + T2: e('key', t, 1.0)
e('bksp', M['del_all'], 1.2)
e('whoosh', 4.683, 0.5); e('whoosh', 15.567, 0.5)
for t in M['panels']: e('swish', t + 0.2, 0.35)
e('hit', 9.067, 0.4); e('ding', 26.5, 0.6)
json.dump(dict(fps=FPS, dur=DUR, cuts=CUTS, w1=W1, w2=W2, t1=T1, t2=T2, marks=M, events=ev), open(f'{H}/timeline.json', 'w'), ensure_ascii=False, indent=1)
