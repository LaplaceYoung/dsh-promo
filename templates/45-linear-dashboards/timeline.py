# Template 45 timeline — structure of Linear "Introducing Dashboards" (2025).
# The reference is 1920×960 at 60 fps; we render 1920×1080 at 60 fps with the 960-high picture centred (black bands
# blend into the black ground). Five hard cuts, then a run of fades through black between title cards and panels.
import json, os
H = os.path.dirname(os.path.abspath(__file__))
FPS = 60; DUR = 44.183
CUTS = [5.083, 9.883, 14.667, 19.467, 24.333]
M = dict(t1=1.6, b0=5.1, r0=10.4, tip=12.6, e0=19.5, pan=20.9, x1=24.4, k1=25.6, k1o=28.2, x2=29.3, x2o=30.65, d2=31.25,
         d2o=33.85, x3=34.0, p3=35.7, l3=37.7, l3o=40.6, logo=41.0, end=44.183)
ev = []
def e(kind, t, g=1.0, **k): ev.append(dict(kind=kind, t=round(t, 3), g=g, **k))
for t in (12.6, 32.4, 33.2): e('click', t, 0.2)
e('blip', 12.6, 0.06); e('riser', 22.3, 0.12, dur=2.0); e('impact', 24.333, 0.18)
for t in (M['x1'], M['x2'], M['x3']): e('swish', t + 0.1, 0.06)
e('ding', M['logo'] + 0.2, 0.12)
json.dump(dict(fps=FPS, dur=DUR, cuts=CUTS, marks=M, events=ev), open(f'{H}/timeline.json', 'w'), ensure_ascii=False, indent=1)
