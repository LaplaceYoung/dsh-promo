# Template 47 timeline — structure of Linear "Introducing Linear For Agents" (2025). 30 fps, 32.633 s, 7 hard cuts.
import json, os
H = os.path.dirname(os.path.abspath(__file__))
FPS = 30; DUR = 32.633
CUTS = [5.033, 9.233, 10.067, 14.767, 17.467, 19.267, 24.133]
M = dict(list=1.5, sel=2.2, dd=3.0, hov=3.6, pick=4.75, out=7.9, msg2=10.6, zoom=12.5, act=13.2, blur=15.4, en=16.7, rep=19.9,
         code=21.6, w1=24.75, w2=25.2, w3=25.7, w4=26.4, w5=26.9, logo=29.033, fade=31.0)
ev = []
def e(kind, t, g=1.0, **k): ev.append(dict(kind=kind, t=round(t, 3), g=g, **k))
for k in range(6): e('click', M['sel'] + k * 0.1, 0.12)
e('pop', M['dd'], 0.1); e('click', M['pick'], 0.25); e('click', M['en'], 0.25); e('pop', CUTS[1], 0.08); e('pop', CUTS[2], 0.06); e('pop', M['msg2'], 0.08)
e('swish', M['blur'], 0.15)
for k in range(30): e('key', 17.6 + k * 0.045, 0.25)
for t in (M['w1'], M['w2'], M['w3'], M['w4'], M['w5']): e('blip', t, 0.06, f=1500)
e('ding', M['logo'] + 0.1, 0.12)
json.dump(dict(fps=FPS, dur=DUR, cuts=CUTS, marks=M, events=ev), open(f'{H}/timeline.json', 'w'), ensure_ascii=False, indent=1)
