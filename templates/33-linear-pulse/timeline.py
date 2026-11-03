# Template 33 timeline — structure of Linear "Introducing Pulse" (2025), measured at 30 fps.
# Five hard cuts; everything else is fades, zooms and slides between white UI scenes.
import json, os
H = os.path.dirname(os.path.abspath(__file__))
FPS = 30; DUR = 43.467
CUTS = [10.9, 11.733, 28.933, 33.4, 35.433]
M = dict(t1=0.3, t2=0.65, side=2.2, click=3.9, win=4.25, text=7.0, w1=8.4, w2=9.2, w3=9.9, caught=19.9, daily=21.6,
         inbox=23.7, iclick=26.1, doc=26.35, bclick=28.45, press=29.55, morph=30.3, type=30.45, out=31.6, mark=36.0, logo=40.3, fade=43.0)
ev = []
def e(kind, t, g=1.0, **k): ev.append(dict(kind=kind, t=round(t, 3), g=g, **k))
e('blip', M['t2'], 0.15); e('swish', M['side'], 0.12); e('click', M['click'], 0.3); e('swish', M['win'], 0.2)
e('pop', M['text'], 0.12)
for k in ('w1', 'w2', 'w3'): e('tick', M[k], 0.18)
e('whoosh', CUTS[0], 0.15); e('swish', CUTS[1], 0.15); e('pop', M['caught'], 0.15); e('swish', M['daily'], 0.12)
e('click', M['iclick'], 0.3); e('swish', M['doc'], 0.15); e('click', M['bclick'], 0.3); e('click', M['press'], 0.35); e('blip', M['morph'], 0.2)
for i in range(14): e('key', M['type'] + 0.08 * i, 0.06)
e('swish', M['out'], 0.15); e('whoosh', CUTS[3], 0.18); e('swish', CUTS[4], 0.12); e('pop', M['logo'], 0.2)
json.dump(dict(fps=FPS, dur=DUR, cuts=CUTS, marks=M, events=ev), open(f'{H}/timeline.json', 'w'), ensure_ascii=False, indent=1)
