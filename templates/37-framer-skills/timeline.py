# Template 37 timeline — structure of Framer "Introducing Skills" (2026), measured at 29.97 fps, rendered at 30 fps.
import json, os
H = os.path.dirname(os.path.abspath(__file__))
FPS = 30; DUR = 30.067
CUTS = [1.068, 2.302, 4.204, 5.639, 6.974, 11.478, 14.781, 17.751, 23.156, 25.259, 26.326]
M = dict(macro=3.2, ty1=11.9, chip=16.0, list0=23.4, ty2=25.45, glow=26.33, logo=27.75)
LIST = [23.4, 23.75, 24.1, 24.45, 24.8, 25.05]
ev = []
def e(kind, t, g=1.0, **k): ev.append(dict(kind=kind, t=round(t, 3), g=g, **k))
for c in CUTS: e('tick', c, 0.1)
for k in range(10): e('key', 0.1 + k * 0.42, 0.07)
for k in range(14): e('key', M['ty1'] + k * 0.3, 0.06)
e('pop', M['chip'], 0.15)
for t in LIST: e('blip', t, 0.08)
for k in range(3): e('key', M['ty2'] + k * 0.25, 0.08)
e('impact', M['glow'], 0.2); e('swish', M['logo'] - 0.2, 0.12)
json.dump(dict(fps=FPS, dur=DUR, cuts=CUTS, marks=M, list=LIST, events=ev), open(f'{H}/timeline.json', 'w'), ensure_ascii=False, indent=1)
