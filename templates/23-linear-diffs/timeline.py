# Template 23 timeline — structure of Linear "Introducing Linear Diffs" (2026), measured at 60 fps.
import json, os
H = os.path.dirname(os.path.abspath(__file__))
FPS = 60; DUR = 51.967
CUTS = [6.733, 12.767, 14.95, 25.3, 27.633, 31.95, 40.783]
M = dict(pick=1.6, list=3.1, rise=8.0, tab=13.9, red=17.2, green=18.4, wide=20.0, hover=29.0, say=33.0, sent=36.6, reply=37.6,
         press=43.3, end=44.25, logo=47.3)
ev = []
def e(kind, t, g=1.0, **k): ev.append(dict(kind=kind, t=round(t, 3), g=g, **k))
e('click', M['pick'], 0.25); e('swish', M['list'], 0.15)
for i in range(6): e('tick', M['rise'] + i * 0.4, 0.12)
e('click', M['tab'], 0.3); e('blip', M['red'], 0.15); e('blip', M['green'], 0.15)
e('click', CUTS[3] + 1.0, 0.3); e('pop', M['hover'], 0.15)
for i in range(18): e('key', M['say'] + i * 0.18, 0.12)
e('blip', M['sent'], 0.25); e('pop', M['reply'], 0.2)
e('click', M['press'], 0.3); e('ding', M['logo'], 0.3)
json.dump(dict(fps=FPS, dur=DUR, cuts=CUTS, marks=M, events=ev), open(f'{H}/timeline.json', 'w'), ensure_ascii=False, indent=1)
