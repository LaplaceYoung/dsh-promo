# Template 38 timeline — structure of Linear "Introducing Code Intelligence" (2026), measured at 60 fps.
import json, os
H = os.path.dirname(os.path.abspath(__file__))
FPS = 60; DUR = 33.867
CUTS = [4.533, 8.183, 18.817]
M = dict(logo=0.45, title=1.1, ty=4.9, send=7.55, clear=7.85, c1=8.45, c2=11.2, yes=12.9, c3=14.2, paste=15.4, chips=17.3,
         panel=18.82, head=21.45, dlg=22.8, q1=23.3, q2=25.2, q3=26.9, dlgOut=28.2, tag=28.55, tagOut=30.9, end=31.3)
ev = []
def e(kind, t, g=1.0, **k): ev.append(dict(kind=kind, t=round(t, 3), g=g, **k))
for c in CUTS: e('tick', c, 0.1)
e('swish', M['logo'], 0.1)
for k in range(16): e('key', M['ty'] + k * 0.15, 0.06)
e('click', M['send'], 0.25)
for t in (M['c1'], M['c2'], M['c3']): e('pop', t, 0.14)
e('click', M['yes'], 0.25); e('click', M['paste'], 0.25)
for k in range(4): e('blip', M['chips'] + 0.2 + k * 0.18, 0.08)
for t in (M['q1'], M['q2'], M['q3']): e('blip', t, 0.12)
e('impact', M['end'], 0.18)
json.dump(dict(fps=FPS, dur=DUR, cuts=CUTS, marks=M, events=ev), open(f'{H}/timeline.json', 'w'), ensure_ascii=False, indent=1)
