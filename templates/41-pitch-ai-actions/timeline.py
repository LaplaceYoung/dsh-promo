# Template 41 timeline — structure of Pitch "Introducing Pitch AI actions" (2025), measured at 24 fps.
import json, os
H = os.path.dirname(os.path.abspath(__file__))
FPS = 24; DUR = 79.042
CUTS = [3.292, 6.0, 8.5, 9.583, 11.125, 12.625, 22.583, 23.542, 27.292, 29.042, 30.792, 31.708, 33.5, 35.958, 42.583, 43.792, 47.708, 50.458, 51.625, 54.5, 63.292, 66.667, 67.917, 69.125, 71.875, 74.792]
M = dict(c0=2.75, zin=4.9, d1=13.0, out1=15.4, click1=15.8, clear=16.4, win=20.3, hot=24.0, hotOk=26.6, slide2=40.4, d2=44.4, click2=47.1, modal=58.3, save=62.3, app=65.4, pill3=72.3, txt3=73.6, small=75.2, logo=77.25)
ev = []
def e(kind, t, g=1.0, **k): ev.append(dict(kind=kind, t=round(t, 3), g=g, **k))
for c in CUTS: e('tick', c, 0.1)
for t in (M['c0'], M['click1'], M['click2'], M['save']): e('click', t, 0.27)
e('swish', M['zin'], 0.12); e('pop', M['out1'], 0.12); e('pop', M['win'], 0.12); e('blip', M['hot'], 0.1); e('pop', M['hotOk'], 0.14)
e('pop', 50.5, 0.14); e('swish', M['modal'], 0.1); e('pop', M['pill3'], 0.12); e('impact', M['logo'], 0.2)
json.dump(dict(fps=FPS, dur=DUR, cuts=CUTS, marks=M, events=ev), open(f'{H}/timeline.json', 'w'), ensure_ascii=False, indent=1)
