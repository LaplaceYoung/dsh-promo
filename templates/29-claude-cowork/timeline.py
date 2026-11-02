# Template 29 timeline — structure of Anthropic "Introducing Cowork" (2026), measured at 24 fps.
import json, os
H = os.path.dirname(os.path.abspath(__file__))
FPS = 24; DUR = 68.625
CUTS = [2.25, 14.792, 16.083, 19.708, 28.167, 42.25, 43.5, 44.125, 45.625, 47.375, 53.5, 57.375, 62.167]
M = dict(tog=2.5, click=5.0, blob=5.7, mark=6.3, title=7.2, cards=8.3, pick=11.0, down=11.5, say=12.1, said=14.4, pickRec=15.5,
         go=19.35, q=23.3, opt=26.9, plan=28.4, prog=30.8, b1=35.0, b2=38.4, b3=39.8, art=50.2, art3=52.0, say2=58.2, said2=60.4,
         endText=62.4, dot=65.6, logo=66.3)
ev = []
def e(kind, t, g=1.0, **k): ev.append(dict(kind=kind, t=round(t, 3), g=g, **k))
e('pop', M['tog'], 0.2); e('click', M['click'], 0.35); e('whoosh', M['blob'], 0.2); e('pop', M['mark'], 0.25)
for i in range(6): e('tick', M['cards'] + i * 0.08, 0.08)
e('click', M['pick'], 0.3); e('swish', M['down'], 0.15); e('blip', M['say'], 0.25)
for i in range(10): e('key', M['say'] + 0.2 + i * 0.22, 0.07)
e('swish', CUTS[1], 0.15); e('click', M['pickRec'], 0.3); e('click', M['go'], 0.35)
for i in range(12): e('key', CUTS[3] + 0.3 + i * 0.14, 0.06)
e('pop', M['q'], 0.2); e('click', M['opt'], 0.3); e('swish', M['plan'], 0.15); e('pop', M['prog'], 0.2)
for t in (M['b1'], M['b2'], M['b3']): e('blip', t, 0.2)
for c in CUTS[5:8]: e('chime', c + 0.1, 0.12)
e('swish', CUTS[8], 0.15); e('swish', CUTS[9], 0.15); e('pop', M['art'], 0.15); e('click', M['art3'], 0.3); e('whoosh', CUTS[10], 0.2)
e('blip', M['say2'], 0.2)
for i in range(6): e('key', M['say2'] + 0.2 + i * 0.3, 0.07)
e('click', CUTS[12] - 0.25, 0.35); e('swish', CUTS[12], 0.15); e('ding', M['logo'], 0.3)
json.dump(dict(fps=FPS, dur=DUR, cuts=CUTS, marks=M, events=ev), open(f'{H}/timeline.json', 'w'), ensure_ascii=False, indent=1)
