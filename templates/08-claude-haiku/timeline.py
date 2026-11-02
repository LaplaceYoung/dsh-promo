# Template 08 timeline — structure of Anthropic "Introducing Claude Haiku 4.5" (2025), measured at native 60 fps.
import json, os
H = os.path.dirname(os.path.abspath(__file__))
FPS = 60; DUR = 40.067
CUTS = [4.033, 13.85, 14.3, 19.1, 19.25, 19.817, 27.767]
M = dict(nodes0=0.25, nodes1=2.5, collapse=2.6, dot=3.5, win=4.033, open=4.4, type0=5.0, type1=8.8, badge=9.0, split=11.1,
         big0=24.0, big1=26.5, mosaic=28.3, tiny=29.75, wdot=30.0, l1=30.3, l2=31.0, l3=32.3, lout=34.0, name=34.4, nout=36.2, spark=36.9, logo=37.4)
ev = []
def e(kind, t, g=1.0, **k): ev.append(dict(kind=kind, t=round(t, 3), g=g, **k))
for i in range(6): e('blip', M['nodes0'] + i * 0.37, 0.25)
e('swish', M['collapse'], 0.3); e('pop', M['win'], 0.5)
for i in range(40): e('key', M['type0'] + i * 0.095, 0.18)
e('pop', M['badge'], 0.4); e('swish', M['split'], 0.25)
for c in CUTS[1:]: e('tick', c, 0.35)
e('hit', M['big0'], 0.35); e('swish', M['mosaic'], 0.35)
for k in ['l1', 'l2', 'l3', 'name']: e('pop', M[k], 0.3)
e('ding', M['spark'], 0.5)
json.dump(dict(fps=FPS, dur=DUR, cuts=CUTS, marks=M, events=ev), open(f'{H}/timeline.json', 'w'), ensure_ascii=False, indent=1)
