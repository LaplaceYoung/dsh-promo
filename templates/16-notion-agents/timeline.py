# Template 16 timeline — structure of Notion "Introducing Notion 3.0 · Agents" (2025), measured at 24 fps.
import json, os
H = os.path.dirname(os.path.abspath(__file__))
FPS = 24; DUR = 90.042
CUTS = [2.042, 4.042, 5.083, 10.042, 21.208, 22.958, 25.167, 32.0, 34.458, 45.167, 48.5, 49.833, 51.833, 55.458, 57.333,
        60.167, 61.5, 62.833, 66.0, 70.75, 73.167, 75.417, 80.0, 82.125, 83.167, 85.125]
M = dict(logo=0.2, a1=2.15, peeps=2.55, a2=3.0, panel=8.0, sel1=11.0, sel2=12.0, sel3=13.0, big=14.4, drop=15.6, pick=17.4,
         hello=19.8, bt=23.1, send=30.9, think2=33.3, rows=35.2, p2=45.5, col=48.7, p3=52.1, mark=55.9, p4=66.3, upd=71.0,
         done=73.4, more=77.4, logo2=86.5)
ev = []
def e(kind, t, g=1.0, **k): ev.append(dict(kind=kind, t=round(t, 3), g=g, **k))
for t in [M['logo'], M['a1'], M['a2']]: e('pop', t, 0.3)
for i in range(6): e('pop', M['peeps'] + i * 0.07, 0.15)
for t in [M['sel1'], M['sel2'], M['sel3'], M['pick']]: e('click', t, 0.35)
e('swish', M['big'], 0.3); e('blip', M['drop'], 0.25); e('chime', M['hello'], 0.3)
for i in range(10): e('key', M['bt'] + i * 0.2, 0.3)
e('click', M['send'], 0.4); e('blip', M['think2'], 0.25)
for i in range(7): e('tick', M['rows'] + i * 1.1, 0.2)
for t in [M['p2'], M['p3'], M['p4']]:
    for i in range(8): e('key', t + 0.3 + i * 0.16, 0.2)
e('pop', M['col'], 0.3); e('pop', M['mark'], 0.3); e('whoosh', CUTS[16], 0.3)
for i in range(5): e('tick', M['upd'] + i * 0.4, 0.2)
e('chime', M['done'], 0.35)
for c in CUTS[21:25]: e('swish', c, 0.25)
e('ding', CUTS[25], 0.35); e('ding', M['logo2'], 0.4)
json.dump(dict(fps=FPS, dur=DUR, cuts=CUTS, marks=M, events=ev), open(f'{H}/timeline.json', 'w'), ensure_ascii=False, indent=1)
