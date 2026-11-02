# Template 09 timeline — structure of Cursor "Software is changing" (2026). Native 24 fps.
import json, os
H = os.path.dirname(os.path.abspath(__file__))
FPS = 24; DUR = 54.625
CUTS = [0.417, 0.917, 2.667, 4.125, 4.792, 7.25, 7.917, 8.583, 9.167, 9.917, 10.5, 11.25, 11.833, 13.208, 19.208, 23.625, 43.792, 46.708]
M = dict(word=0.417, glitch=0.5, frag=2.667, frag1=4.0, pair=4.792, pass0=5.2, pass1=6.9, stat=12.0, bub=13.4, typeA=19.6, typeB=20.6,
         idea=24.4, orbit=25.8, moon=26.9, field=29.6, dense=33.0, fieldOut=37.6, few=38.6, final=39.4, logo=40.4, tear=43.792, grow=44.6,
         t1=46.708, swap=48.2, url=50.9)
ev = []
def e(kind, t, g=1.0, **k): ev.append(dict(kind=kind, t=round(t, 3), g=g, **k))
for c in CUTS: e('tick', c, 0.35)
e('glitch', M['frag'], 0.5)
for i in range(6): e('blip', M['pass0'] + i * 0.3, 0.2)
for i in range(18): e('key', M['typeA'] + i * 0.07, 0.25)
for i in range(10): e('key', M['typeB'] + i * 0.07, 0.25)
e('swish', M['orbit'], 0.3); e('whoosh', M['field'], 0.3); e('glitch', M['tear'], 0.4)
for i in range(8): e('key', M['t1'] + 0.1 + i * 0.07, 0.2)
for i in range(4): e('key', M['swap'] + i * 0.07, 0.2)
e('ding', M['url'], 0.4)
json.dump(dict(fps=FPS, dur=DUR, cuts=CUTS, marks=M, events=ev), open(f'{H}/timeline.json', 'w'), ensure_ascii=False, indent=1)
