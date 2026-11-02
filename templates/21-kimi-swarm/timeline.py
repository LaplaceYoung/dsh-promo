# Template 21 timeline — structure of Kimi "Meet Kimi K2.6 Agent Swarm" (2026), measured at 29.97 fps, built at 30.
# The detector also flags frame 2 (0.067 s, the cover frame); that is not a shot change and is left out.
import json, os
H = os.path.dirname(os.path.abspath(__file__))
FPS = 30; DUR = 37.367
CUTS = [1.468, 2.236, 2.603, 3.303, 4.771, 5.439, 6.573, 7.841, 9.142, 10.21, 12.045, 16.149, 16.95, 17.284, 18.118, 18.585, 19.119, 23.557, 26.527, 31.265, 34.334, 35.035, 36.036]
M = dict(title=0.25, ask=3.5, stat=7.0, out=14.4, tiles=19.4, scatter=23.6, say=32.1, end=35.1)
ev = []
def e(kind, t, g=1.0, **k): ev.append(dict(kind=kind, t=round(t, 3), g=g, **k))
for c in CUTS[:20]: e('tick', c, 0.22)
e('whoosh', M['title'], 0.3); e('pop', CUTS[0], 0.3); e('pop', CUTS[1], 0.3); e('swish', CUTS[2], 0.3)
for i in range(10): e('key', M['ask'] + i * 0.12, 0.15)
for i in range(8): e('blip', CUTS[9] + 0.2 + i * 0.2, 0.12)
for i in range(12): e('tick', M['tiles'] + i * 0.3, 0.12)
e('whoosh', M['scatter'], 0.3)
for i in range(12): e('key', M['say'] + i * 0.13, 0.18)
e('ding', M['end'], 0.3)
json.dump(dict(fps=FPS, dur=DUR, cuts=CUTS, marks=M, events=ev), open(f'{H}/timeline.json', 'w'), ensure_ascii=False, indent=1)
