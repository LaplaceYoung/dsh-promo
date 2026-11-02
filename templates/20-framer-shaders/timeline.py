# Template 20 timeline — structure of Framer "Update: Interactive Shaders" (2026), measured at 60 fps.
import json, os
H = os.path.dirname(os.path.abspath(__file__))
FPS = 60; DUR = 80.267
CUTS = [6.0, 9.0, 27.433, 35.767]
M = dict(neon=3.0, irid_out=11.2, editor=11.5, zoom=13.0, s1=15.2, s2=18.4, s3=21.6, s4=24.4, pop=28.0, k1=29.6, k2=31.6, k3=33.4,
         dark=35.9, float=38.0, tab1=44.0, tab2=50.0, srch=56.0, tab3=64.0, out=73.6, logo=74.5)
ev = []
def e(kind, t, g=1.0, **k): ev.append(dict(kind=kind, t=round(t, 3), g=g, **k))
e('whoosh', M['neon'], 0.3); e('impact', CUTS[0], 0.25); e('swish', CUTS[1], 0.3); e('whoosh', M['editor'], 0.25)
for t in [M['s1'], M['s2'], M['s3'], M['s4']]: e('click', t, 0.25); e('scratch', t + 0.1, 0.12, dur=1.0)
e('pop', M['pop'], 0.3)
for t in [M['k1'], M['k2'], M['k3']]: e('click', t, 0.25)
for t in [M['tab1'], M['tab2'], M['tab3']]: e('blip', t, 0.2)
for i in range(9): e('key', M['srch'] + 0.3 + i * 0.16, 0.15)
e('ding', M['logo'], 0.35)
json.dump(dict(fps=FPS, dur=DUR, cuts=CUTS, marks=M, events=ev), open(f'{H}/timeline.json', 'w'), ensure_ascii=False, indent=1)
