# Template 22 timeline — structure of Anthropic "Claude now has memory" (2025), measured at 29.97 fps, built at 30.
import json, os
H = os.path.dirname(os.path.abspath(__file__))
FPS = 30; DUR = 59.0
CUTS = [11.712, 23.69, 26.426, 29.263, 29.696, 33.033, 34.902, 38.739, 50.951, 54.087, 54.688]
M = dict(draw=0.3, cloud=1.4, card=3.0, tg1=6.3, tg2=7.8, gen=8.5, hello=12.2, home=13.5, say=14.8, send=18.0, match=19.8,
         blob=21.9, cols=30.2, shrink=38.739, reply=40.4, fold=54.087, env=54.688, logo=56.4)
ev = []
def e(kind, t, g=1.0, **k): ev.append(dict(kind=kind, t=round(t, 3), g=g, **k))
e('scratch', M['draw'], 0.2, dur=1.1); e('pop', M['cloud'], 0.25); e('swish', M['card'], 0.2)
e('click', M['tg1'], 0.35); e('click', M['tg2'], 0.35); e('blip', M['gen'], 0.2)
for i in range(6): e('tick', M['gen'] + 0.6 + i * 0.4, 0.12)
e('chime', M['hello'], 0.25)
for i in range(14): e('key', M['say'] + i * 0.2, 0.14)
e('pop', M['send'], 0.3); e('whoosh', M['blob'], 0.3)
for c in CUTS[1:7]: e('swish', c, 0.2)
e('whoosh', M['shrink'], 0.25)
for i in range(14): e('key', M['reply'] + 0.5 + i * 0.25, 0.1)
e('paper', M['fold'], 0.6); e('paper2', M['env'], 0.6); e('ding', M['logo'], 0.35)
json.dump(dict(fps=FPS, dur=DUR, cuts=CUTS, marks=M, events=ev), open(f'{H}/timeline.json', 'w'), ensure_ascii=False, indent=1)
