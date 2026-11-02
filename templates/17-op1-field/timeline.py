# Template 17 timeline — structure of teenage engineering "introducing OP–1 field" (2022), measured at native 25 fps.
import json, os
H = os.path.dirname(os.path.abspath(__file__))
FPS = 25; DUR = 28.08
CUTS = [2.84, 4.12, 4.8, 6.92, 9.32, 11.0, 13.16, 15.36, 21.96, 27.08]
M = dict(t0=0.7, t0out=2.55, a1=7.0, a2=7.9, a3=8.7, b1=11.1, b2=11.8, b3=12.5, pill=16.4, pol=18.6, done=19.8,
         n1=22.05, n1out=23.1, mark=23.3, fine=24.4, leak=26.7)
ev = []
def e(kind, t, g=1.0, **k): ev.append(dict(kind=kind, t=round(t, 3), g=g, **k))
for c in [CUTS[0], CUTS[1], CUTS[2], CUTS[4], CUTS[6], CUTS[7]]: e('mechkey', c, 0.5)
for k in ['a2', 'a3', 'b2', 'b3']: e('tick', M[k], 0.25)
e('mechkey', M['pill'] - 0.05, 0.6); e('mechkey', M['done'] - 0.05, 0.6); e('ding', M['done'], 0.25)
e('pop', M['mark'], 0.25); e('swish', M['leak'], 0.25)
json.dump(dict(fps=FPS, dur=DUR, cuts=CUTS, marks=M, events=ev), open(f'{H}/timeline.json', 'w'), ensure_ascii=False, indent=1)
