# Template 13 timeline — structure of Cursor "Introducing Cursor 2.0 and Composer" (2025), measured at 60 fps.
# Only 8 hard cuts; most scene changes are soft dissolves (listed in marks as x*).
import json, os
H = os.path.dirname(os.path.abspath(__file__))
FPS = 60; DUR = 64.483
CUTS = [8.483, 11.367, 33.317, 42.617, 44.567, 45.25, 46.45, 62.283]
M = dict(logo=0.15, ty1=2.5, x_chart=4.45, bars=5.2, ty2=8.6, win=11.367, zoom=13.2, x_input=16.4, type1=16.8,
         x_card3=18.4, ty3=18.6, x_drop=20.5, pick=21.6, x_cols=23.3, push=26.0, pull=30.0,
         ty4=33.45, x_review=35.6, x_revwin=39.0, ty5=42.75, meet=44.567, todo=50.5, x_close=57.0, end=62.283, mark=63.3)
ev = []
def e(kind, t, g=1.0, **k): ev.append(dict(kind=kind, t=round(t, 3), g=g, **k))
def typing(t0, n, cps=26, g=0.12):
    for i in range(0, n, 2): e('mechkey', t0 + i / cps, g)
typing(M['ty1'], 22); typing(M['ty2'], 11); typing(M['type1'], 16, 18); typing(M['ty3'], 10); typing(M['ty4'], 10); typing(M['ty5'], 8)
e('whoosh', M['logo'], 0.3); e('pop', M['bars'], 0.25)
for t in [M['zoom'], M['push'], M['pull'], M['x_revwin'], M['x_close']]: e('swish', t, 0.25)
e('click', M['pick'], 0.35); e('click', M['pick'] + 0.5, 0.35); e('click', M['pick'] + 1.0, 0.35)
e('blip', M['x_cols'], 0.25); e('blip', M['todo'], 0.3)
for c in CUTS[4:7]: e('tick', c, 0.3)
e('ding', M['end'] + 0.1, 0.4)
json.dump(dict(fps=FPS, dur=DUR, cuts=CUTS, marks=M, events=ev), open(f'{H}/timeline.json', 'w'), ensure_ascii=False, indent=1)
