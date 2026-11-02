# Template 27 timeline — structure of Framer "Framer 3.0 with Agents, Branching, and a new Community" (2026),
# measured at 29.97 fps, built at 30.
import json, os
H = os.path.dirname(os.path.abspath(__file__))
FPS = 30; DUR = 75.167
CUTS = [2.336, 7.14, 9.176, 10.11, 14.081, 15.282, 16.016, 17.451, 20.354, 23.524, 26.093, 27.594, 30.364, 32.132, 34.268, 35.235, 36.169, 37.137, 38.138, 40.24, 50.317, 54.154, 58.258, 60.36, 62.462, 65.165, 66.3]
M = dict(sel=4.0, sweep2=6.4, morph=8.3, drop=12.4, say=20.9, sent=23.0, ptype=30.6, ring=33.1, wall=45.0, t2=56.3, flash=61.8, fade=71.4)
ev = []
def e(kind, t, g=1.0, **k): ev.append(dict(kind=kind, t=round(t, 3), g=g, **k))
e('riser', 0.0, 0.25, dur=2.3); e('whoosh', CUTS[0], 0.2); e('tick', M['sel'], 0.2); e('swish', M['sweep2'], 0.2)
e('riser', CUTS[1], 0.25, dur=2.0); e('impact', CUTS[2], 0.35); e('click', M['drop'], 0.25)
for c in CUTS[3:20]: e('tick', c, 0.2)
for i in range(14): e('key', M['say'] + i * 0.14, 0.1)
e('blip', M['sent'], 0.25)
for i in range(14): e('key', M['ptype'] + i * 0.11, 0.1)
e('whoosh', M['ring'], 0.25); e('swish', M['wall'], 0.2)
for c in CUTS[20:24]: e('whoosh', c, 0.3)
e('riser', M['flash'] - 1.6, 0.35, dur=1.6); e('impact', CUTS[24], 0.4); e('whoosh', CUTS[25], 0.25); e('ding', CUTS[26], 0.3)
json.dump(dict(fps=FPS, dur=DUR, cuts=CUTS, marks=M, events=ev), open(f'{H}/timeline.json', 'w'), ensure_ascii=False, indent=1)
