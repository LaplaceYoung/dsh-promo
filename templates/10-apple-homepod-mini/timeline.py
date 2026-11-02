# Template 10 timeline — structure of Apple "The new HomePod mini 2" (2026). Native 30 fps.
import json, os
H = os.path.dirname(os.path.abspath(__file__))
FPS = 30; DUR = 40.033; BPM = 87; E8 = 60 / BPM / 2
CUTS = [0.067, 2.867, 6.3, 13.633, 16.467, 18.433, 18.733, 19.5, 21.9, 24.867, 25.433, 27.867, 31.867, 34.967]
M = dict(warp0=1.25, warp1=2.45, line=3.0, macro=5.7, ring=6.5, rings1=13.3, zoom=13.4, siri=13.9, siri2=14.5, dome=16.467,
         multi=18.433, slide=18.733, collage=19.5, tilted=20.7, cmd=22.0, lineup=25.433, shrink=27.5, priv=28.0, name=30.0, name2=30.8, logo=31.867, black=34.967)
# ring choreography: 7 slots (hexagon + centre), toggled on eighth notes between ring and rings1
SLOTS = [[0, 0], [-170, -100], [0, -200], [170, -100], [170, 100], [0, 200], [-170, 100]]
OUTER = [[0, -330], [285, -165], [285, 165], [0, 330], [-285, 165], [-285, -165]]
import random
random.seed(10)
rings = []  # [t_on, t_off, x, y, colour index]
rings.append([6.2, 8.3, 0, 0, 1])
seq = [(7.2, 1, 3), (7.6, 6, 2), (8.3, 2, 0), (8.8, 4, 3), (8.9, 6, 2), (9.1, 1, 0), (9.6, 5, 4), (9.9, 3, 1), (10.0, 0, 4), (10.3, 2, 0), (10.6, 6, 3), (10.95, 4, 0)]
for (ton, slot, c) in seq:
    rings.append([ton, min(11.2, ton + random.choice([1.0, 1.4, 1.8, 2.2])), SLOTS[slot][0], SLOTS[slot][1], c])
for i in range(7): rings.append([11.3 + i * 0.07, 12.75, SLOTS[i][0], SLOTS[i][1], (i * 2) % 5])
for i in range(6): rings.append([11.6 + i * 0.07, 12.6, OUTER[i][0], OUTER[i][1], (i + 1) % 5])
rings.append([12.75, 13.633, 0, 0, 1])
ev = []
def e(kind, t, g=1.0, **k): ev.append(dict(kind=kind, t=round(t, 3), g=g, **k))
for c in CUTS[1:]: e('tick', c, 0.3)
for r in rings: e('blip', r[0], 0.18)
e('swish', M['warp0'], 0.35); e('whoosh', M['zoom'], 0.35); e('swish', M['slide'], 0.3); e('swish', M['lineup'], 0.3); e('ding', M['logo'], 0.4)
json.dump(dict(fps=FPS, dur=DUR, cuts=CUTS, marks=M, rings=rings, events=ev), open(f'{H}/timeline.json', 'w'), ensure_ascii=False, indent=1)
