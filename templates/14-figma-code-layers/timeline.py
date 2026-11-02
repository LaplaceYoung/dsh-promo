# Template 14 timeline — structure of Figma "Code Layers: Collaborate with code on the canvas" (2026), native 24 fps.
import json, os
H = os.path.dirname(os.path.abspath(__file__))
FPS = 24; DUR = 34.875
CUTS = [1.25, 2.5, 3.667, 5.833, 10.917, 12.0, 14.167, 24.583, 30.417, 32.333, 32.917]
M = dict(h0=0.2, w1=1.25, w4=4.9, code=5.833, out=6.2, canvas=7.2, detail=17.0, dtype=17.6,
         e1=30.5, e2=30.95, px=32.333, logo=32.917)
ev = []
def e(kind, t, g=1.0, **k): ev.append(dict(kind=kind, t=round(t, 3), g=g, **k))
for c in CUTS[:4] + [M['w4']]: e('pop', c, 0.35)
e('whoosh', M['out'], 0.35)
for c in CUTS[4:8]: e('swish', c, 0.25)
for i in range(30): e('key', M['dtype'] + i * 0.08, 0.1)
for t in [9.0, 11.2, 15.0, 19.5, 26.0, 28.0]: e('click', t, 0.3)
e('hit', M['e1'], 0.35); e('glitch', M['px'], 0.4); e('ding', M['logo'] + 0.2, 0.45)
json.dump(dict(fps=FPS, dur=DUR, cuts=CUTS, marks=M, events=ev), open(f'{H}/timeline.json', 'w'), ensure_ascii=False, indent=1)
