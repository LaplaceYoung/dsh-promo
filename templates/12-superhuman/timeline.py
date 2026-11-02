# Template 12 timeline — structure of Superhuman "Superhuman" suite launch (2025), measured at native 24 fps.
import json, os
H = os.path.dirname(os.path.abspath(__file__))
FPS = 24; DUR = 60.417
CUTS = [2.292, 5.5, 6.375, 14.708, 16.167, 24.958, 28.833, 29.375, 34.875, 36.417, 38.292, 38.75, 44.333, 45.792, 47.667, 48.292, 52.417]
C = CUTS
M = dict(cap0=0.35, card=C[0], icons0=2.7, close=C[1], logo=C[2], cap1=7.4, orbit=9.0, conv=13.6, merge=C[3],
         p1=C[4], p1g=16.85, p1cap=17.2, p1win=17.3, p1pill=19.6, p1pol=21.2, p1type=21.8, p1send=23.9,
         b2=C[5], b2pick=26.8, p2icon=27.45, p2pre=C[6], p2=C[7], p2cap=29.6, p2sw=31.4, p2type=31.9,
         b3=C[8], p3icon=C[9], p3pre=C[10], p3=C[11], p3cap=39.0, p3card=39.8, p3fix=[40.6, 41.4, 42.2], p3line=42.9,
         b4=C[12], p4icon=C[13], p4pre=C[14], p4=C[15], p4cap=48.5, p4sum=50.0, p4todo=[50.8, 51.3, 51.8],
         end=C[16], e1=52.7, e1out=55.3, e2=55.55, e2out=56.4, row=56.5, logo2=57.85)
ev = []
def e(kind, t, g=1.0, **k): ev.append(dict(kind=kind, t=round(t, 3), g=g, **k))
e('swish', C[0], 0.25)
for i in range(6): e('pop', M['icons0'] + i * 0.38, 0.2)
e('whoosh', C[1], 0.25); e('hit', C[2], 0.3)
for i in range(7): e('blip', M['orbit'] + i * 0.45, 0.15)
e('noise', M['conv'], 0.0); e('whoosh', M['conv'], 0.35); e('ding', M['merge'], 0.35)
for k in ['p1', 'p2icon', 'p3icon', 'p4icon']: e('pop', M[k], 0.45)
for k in ['p1g', 'p2pre', 'p3pre', 'p4pre']: e('swish', M[k], 0.3)
for k in ['b2', 'b3', 'b4']: e('whoosh', M[k], 0.25)
for i in range(26): e('key', M['p1type'] + i * 0.07, 0.12)
e('click', M['p1send'], 0.35); e('click', M['p2sw'], 0.35)
for i in range(30): e('key', M['p2type'] + i * 0.06, 0.1)
for t in M['p3fix']: e('blip', t, 0.3)
for t in M['p4todo']: e('tick', t, 0.35)
e('pop', M['p4sum'], 0.3)
for i in range(4): e('pop', M['row'] + i * 0.24, 0.3)
e('ding', M['logo2'], 0.5)
ev = [x for x in ev if x['kind'] != 'noise']
json.dump(dict(fps=FPS, dur=DUR, cuts=CUTS, marks=M, events=ev), open(f'{H}/timeline.json', 'w'), ensure_ascii=False, indent=1)
