# Template 15 timeline — structure of The Browser Company "Tidy Tabs by Arc" (2024), measured at 29.97 fps, built at 30.
import json, os
H = os.path.dirname(os.path.abspath(__file__))
FPS = 30; DUR = 20.567
CUTS = [1.301, 4.371, 5.539, 8.542, 9.676, 10.844, 12.179, 13.514, 14.882, 16.049, 17.351]
M = dict(w1=0.12, w2=0.42, items=1.5, scroll=3.0, k1=4.45, k2=4.85, hover=5.95, click=6.35, groups=6.9, zoom=7.0,
         k3=8.62, k4=8.95, wave6=10.0, k5=14.95, k6=15.3, wave11=16.45, logo=17.42, url=18.75)
ev = []
def e(kind, t, g=1.0, **k): ev.append(dict(kind=kind, t=round(t, 3), g=g, **k))
for t in [M['w1'], M['w2'], M['k1'], M['k2'], M['k3'], M['k4'], M['k5'], M['k6']]: e('hit', t, 0.35)
for i in range(7): e('pop', M['items'] + i * 0.35, 0.2)
e('click', M['click'], 0.45); e('swish', M['click'] + 0.05, 0.4); e('blip', M['groups'], 0.3)
e('swish', M['wave6'], 0.35); e('swish', M['wave11'], 0.35)
for c in [CUTS[5], CUTS[6], CUTS[7]]: e('tick', c, 0.3)
e('ding', M['logo'], 0.45); e('pop', M['url'], 0.3)
json.dump(dict(fps=FPS, dur=DUR, cuts=CUTS, marks=M, events=ev), open(f'{H}/timeline.json', 'w'), ensure_ascii=False, indent=1)
