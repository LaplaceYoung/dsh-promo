# Template 40 timeline — structure of Notion "Meet Custom Agents: Your 24/7 AI Team" (2026), measured at 30 fps.
import json, os
H = os.path.dirname(os.path.abspath(__file__))
FPS = 30; DUR = 70.9
CUTS = [7.9, 9.233, 12.433, 14.967, 17.3, 17.9, 18.9, 21.2, 23.267, 27.067, 33.367, 36.533, 37.8, 38.533, 42.867, 45.433, 46.967, 52.1, 54.4, 56.1, 56.5, 57.2, 58.233, 58.633, 59.033, 59.467, 61.2, 63.4, 65.1]
M = dict(belt0=0.9, fly=7.2, badge=9.6, pick=16.3, notes=25.0, mv1=28.4, mv2=30.4, new=31.8, list=35.0, hl=40.2, macro=50.0, click=64.4)
ev = []
def e(kind, t, g=1.0, **k): ev.append(dict(kind=kind, t=round(t, 3), g=g, **k))
for c in CUTS: e('tick', c, 0.1)
e('swish', M['fly'], 0.14); e('pop', M['badge'], 0.14); e('click', M['pick'], 0.25)
for t in (17.45, 18.05): e('pop', t, 0.16)
for t in (21.35, 21.7): e('swish', t, 0.1)
e('blip', M['notes'], 0.12); e('blip', M['notes'] + 0.5, 0.12)
for t in (M['mv1'], M['mv2'], M['new']): e('pop', t, 0.13)
e('blip', M['list'], 0.1); e('blip', M['hl'], 0.12); e('swish', M['macro'], 0.12); e('click', M['click'], 0.3)
json.dump(dict(fps=FPS, dur=DUR, cuts=CUTS, marks=M, events=ev), open(f'{H}/timeline.json', 'w'), ensure_ascii=False, indent=1)
