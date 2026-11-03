# Template 34 timeline — structure of ElevenLabs "Introducing Composer" (2026), measured at 30 fps.
import json, os
H = os.path.dirname(os.path.abspath(__file__))
FPS = 30; DUR = 59.118
CUTS = [8.033, 10.067, 15.033, 24.767, 26.6, 32.167]
M = dict(shrink=0.5, title=1.45, tOut=4.25, ui=4.5, type0=5.1, pick=9.2, live=10.4, plus=12.1, pills=15.3, sel=16.6, panel=17.2, card=19.8,
         l1=21.4, l2=22.7, l3=23.8, wheel=25.2, wave=28.0, sweep=29.2, field=37.0, title2=50.3, logo2=52.4, end=54.0)
ev = []
def e(kind, t, g=1.0, **k): ev.append(dict(kind=kind, t=round(t, 3), g=g, **k))
e('impact', 0.0, 0.25); e('swish', M['shrink'], 0.15); e('riser', M['title'] - 0.4, 0.15, dur=1.2); e('whoosh', M['ui'], 0.15)
for i in range(18): e('key', M['type0'] + 0.1 * i, 0.05)
e('swish', CUTS[0], 0.2); e('click', M['pick'], 0.3); e('pop', CUTS[1], 0.2); e('click', M['plus'], 0.25)
e('whoosh', CUTS[2], 0.2)
for k in range(5): e('tick', M['pills'] + k * 0.22, 0.12)
e('click', M['sel'], 0.25); e('swish', M['panel'], 0.15); e('swish', M['card'], 0.15)
for k in ('l1', 'l2', 'l3'): e('click', M[k], 0.25)
e('whoosh', CUTS[3], 0.2); e('tick', M['wheel'], 0.15); e('swish', CUTS[4], 0.15); e('swish', M['wave'], 0.2); e('whoosh', CUTS[5], 0.2)
e('swish', M['field'], 0.15); e('riser', M['title2'] - 1.0, 0.15, dur=1.0); e('impact', M['logo2'], 0.2); e('swish', M['end'], 0.15)
json.dump(dict(fps=FPS, dur=DUR, cuts=CUTS, marks=M, events=ev), open(f'{H}/timeline.json', 'w'), ensure_ascii=False, indent=1)
