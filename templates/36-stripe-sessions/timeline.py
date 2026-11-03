# Template 36 timeline — structure of Stripe "Stripe Sessions 2024 | New Revenue and Finance Automation tools" (2024), measured at 30 fps.
import json, os
H = os.path.dirname(os.path.abspath(__file__))
FPS = 30; DUR = 66.967
CUTS = [0.833, 2.5, 4.367, 5.467, 6.8, 7.967, 9.533, 11.567, 14.3, 15.633, 17.333, 23.5, 24.433, 26.933, 31.633, 40.767, 44.633, 47.067, 53.0, 54.3, 59.833, 63.133, 64.3, 65.1, 65.5]
M = dict(w2=3.4, fclick=11.1, hot1=12.2, card=19.2, flip=20.2, wide=21.0, sub2=26.0, cclick=28.4, row2=28.7, cclick2=30.6, ov2=33.0,
         dd=36.0, ddopen=36.9, ddpick=37.6, field2=38.6, sum=42.6, sclick=44.0, imp2=45.8, addbtn=47.6, cards=49.2, kclick=50.4, third=51.3,
         rr2=56.4, panel=56.5)
ev = []
def e(kind, t, g=1.0, **k): ev.append(dict(kind=kind, t=round(t, 3), g=g, **k))
for c in CUTS[:-1]: e('tick', c, 0.12)
e('impact', CUTS[0], 0.2); e('swish', M['w2'], 0.12); e('click', M['fclick'], 0.3)
for k in range(3): e('key', M['hot1'] + k * 0.6, 0.08)
e('pop', M['card'], 0.15); e('blip', M['flip'], 0.15); e('swish', M['wide'], 0.15); e('click', M['cclick'], 0.3); e('click', M['cclick2'], 0.3)
e('click', M['ddopen'], 0.25); e('click', M['ddpick'], 0.25); e('click', M['sclick'], 0.3); e('click', M['addbtn'], 0.3); e('click', M['kclick'], 0.3); e('pop', M['third'], 0.15)
e('swish', M['panel'], 0.15); e('impact', CUTS[22], 0.2)
json.dump(dict(fps=FPS, dur=DUR, cuts=CUTS, marks=M, events=ev), open(f'{H}/timeline.json', 'w'), ensure_ascii=False, indent=1)
