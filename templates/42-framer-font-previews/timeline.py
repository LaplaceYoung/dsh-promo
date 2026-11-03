# Template 42 timeline — structure of Framer "Framer Update: Instant Font Previews" (2026), one continuous 60 fps screen take, no cuts.
import json, os
H = os.path.dirname(os.path.abspath(__file__))
FPS = 60; DUR = 68.683
CUTS = []
M = dict(sel=10.6, panel=13.3, z0=14.2, z1=14.9, open=15.0, filt=17.0, filtPick=19.0, h0=21.3, h1=22.6, h2=24.0, h3=25.5, h4=27.0, h5=28.4,
         filt2=30.0, filtPick2=30.8, p0=32.0, p1=33.8, p2=35.6, pick=38.0, close=39.2, frame=41.0, zo0=42.8, zo1=44.6, fade0=46.0, fade1=47.4,
         words=47.5, step=0.5, logo=59.5, end0=68.0)
ev = []
def e(kind, t, g=1.0, **k): ev.append(dict(kind=kind, t=round(t, 3), g=g, **k))
for t in (M['sel'], M['open'], M['filt'], M['filtPick'], M['filt2'], M['filtPick2'], M['pick'], M['frame']): e('click', t, 0.2)
for k in ('h0', 'h1', 'h2', 'h3', 'h4', 'h5', 'p0', 'p1', 'p2'): e('tick', M[k], 0.07)
e('swish', M['z0'], 0.08); e('swish', M['zo0'], 0.08)
for k in range(24): e('blip', M['words'] + k * M['step'], 0.05)
e('impact', M['logo'], 0.14)
json.dump(dict(fps=FPS, dur=DUR, cuts=CUTS, marks=M, events=ev), open(f'{H}/timeline.json', 'w'), ensure_ascii=False, indent=1)
