# Template 18 timeline — structure of Linear "Introducing Linear Agent" (2026), measured at 60 fps (2:1 source, built 16:9).
import json, os
H = os.path.dirname(os.path.abspath(__file__))
FPS = 60; DUR = 54.917
CUTS = [11.25, 17.1, 21.95, 29.733, 35.067, 40.617, 45.1]
M = dict(title=1.6, dark=3.3, bar=5.0, say1=6.2, rows=12.4, say2=18.0, doc=22.4, tab=25.0, flow=30.2, reply=41.4, end=45.6, logo=50.2)
ev = []
def e(kind, t, g=1.0, **k): ev.append(dict(kind=kind, t=round(t, 3), g=g, **k))
e('blip', M['title'], 0.2); e('swish', M['bar'], 0.2); e('blip', M['say1'], 0.25); e('blip', M['say2'], 0.25)
for i in range(5): e('tick', M['rows'] + i * 0.45, 0.18)
for i in range(4): e('tick', M['tab'] + i * 0.5, 0.15)
for i in range(6): e('tick', M['flow'] + 0.3 + i * 0.55, 0.15)
e('pop', M['reply'], 0.25); e('pop', M['reply'] + 1.3, 0.25)
for i in range(14): e('key', M['end'] + 0.4 + i * 0.12, 0.12)
e('ding', M['logo'], 0.3)
json.dump(dict(fps=FPS, dur=DUR, cuts=CUTS, marks=M, events=ev), open(f'{H}/timeline.json', 'w'), ensure_ascii=False, indent=1)
