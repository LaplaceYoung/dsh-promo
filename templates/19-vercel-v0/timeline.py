# Template 19 timeline — structure of Vercel "Introducing v0: Generative UI" (2023), measured at 60 fps.
# One hard cut (30.633); everything else is continuous camera moves and fades.
import json, os
H = os.path.dirname(os.path.abspath(__file__))
FPS = 60; DUR = 47.5
CUTS = [30.633]
M = dict(logo=0.9, ask=3.0, pill=4.0, bar=5.0, p1=6.2, p1x=8.6, p2=9.3, p2x=10.2, p3=10.6, go=12.6, page=13.4, zoom=16.4,
         sel=18.4, say=19.4, upd=22.6, back=25.0, raw=28.8, drop=32.0, pick=33.6, wide=36.4, grid=37.8, url=39.2, logo2=41.0,
         mark=42.4, fade=45.4)
ev = []
def e(kind, t, g=1.0, **k): ev.append(dict(kind=kind, t=round(t, 3), g=g, **k))
e('whoosh', M['logo'], 0.3); e('pop', M['pill'], 0.3); e('swish', M['bar'], 0.25)
for a, n in [(M['p1'], 8), (M['p2'], 5), (M['p3'], 9)]:
    for i in range(n): e('key', a + i * 0.13, 0.18)
e('click', M['go'], 0.35); e('swish', M['page'], 0.3); e('swish', M['zoom'], 0.2); e('click', M['sel'], 0.3)
e('blip', M['upd'], 0.3); e('swish', M['back'], 0.2); e('click', M['pick'], 0.3); e('swish', M['grid'], 0.3)
e('pop', M['url'], 0.3); e('ding', M['mark'], 0.4)
json.dump(dict(fps=FPS, dur=DUR, cuts=CUTS, marks=M, events=ev), open(f'{H}/timeline.json', 'w'), ensure_ascii=False, indent=1)
