# Template 39 timeline — structure of OpenAI "ChatGPT for Word is now available" (2026), measured at 30 fps.
import json, os
H = os.path.dirname(os.path.abspath(__file__))
FPS = 30; DUR = 42.033
CUTS = [2.1, 7.9, 11.633, 14.233, 18.167, 21.1, 22.8, 29.1, 31.2, 35.3]
M = dict(w1=0.15, w2=0.4, w3=0.65, w4=0.85, zoom=3.5, d1=4.2, fn1=7.55, p1=8.3, d2=14.7, fn2=17.8, p2=18.6, note=23.0, menu=23.4, pick=24.3, menuOut=24.7,
         d3=25.1, fn3=28.7, s1=29.5, s2=30.3, p3=31.6, roll=35.5, rollEnd=37.4, start=37.75, pl1=38.3, pl2=38.6, logo=39.95)
ev = []
def e(kind, t, g=1.0, **k): ev.append(dict(kind=kind, t=round(t, 3), g=g, **k))
for c in CUTS: e('tick', c, 0.1)
for t in (M['w1'], M['w2'], M['w3'], M['w4']): e('blip', t, 0.1)
e('swish', M['zoom'], 0.12)
for t in (M['fn1'], M['fn2'], M['fn3']): e('click', t, 0.28)
for t in (M['p1'], M['p2'], M['p3']): e('pop', t, 0.12)
e('click', M['menu'], 0.22); e('click', M['pick'], 0.25); e('blip', M['s1'], 0.1); e('blip', M['s2'], 0.1)
for k in range(6): e('tick', M['roll'] + k * 0.33, 0.06)
e('pop', M['pl1'], 0.12); e('pop', M['pl2'], 0.12); e('impact', M['logo'], 0.16)
json.dump(dict(fps=FPS, dur=DUR, cuts=CUTS, marks=M, events=ev), open(f'{H}/timeline.json', 'w'), ensure_ascii=False, indent=1)
