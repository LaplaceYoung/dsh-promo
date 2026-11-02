# Template 05 timeline — structure of "Orbit (by Linear)" (2026). Times measured at the reference's native 48 fps.
import json, os
H = os.path.dirname(os.path.abspath(__file__))
FPS = 48; DUR = 28.604
CUTS = [3.0, 7.146, 9.438, 12.146, 14.583, 17.771]
M = dict(blur0=19.375, blur1=20.0, info_in=20.45, swap0=23.25, swap1=23.9, music_in=9.4, end_freeze=28.354)
ev = []
def e(kind, t, g=1.0, **k): ev.append(dict(kind=kind, t=round(t, 3), g=g, **k))
for c in CUTS[:-1]: e('tick', c, 0.4)
e('whoosh', CUTS[-1], 0.25)
# pen strokes (match the Ink t0/t1 in Film.tsx)
for a, b in [(0.0, 3.0), (1.25, 3.0), (3.0, 7.0), (4.4, 7.1), (7.3, 9.3), (9.6, 11.8), (12.15, 12.85), (12.85, 14.4)]:
    e('scratch', a, 1.0, dur=b - a)
json.dump(dict(fps=FPS, dur=DUR, cuts=CUTS, marks=M, events=ev), open(f'{H}/timeline.json', 'w'), indent=1)
