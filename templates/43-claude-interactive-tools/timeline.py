# Template 43 timeline — structure of Anthropic "Your tools are now interactive in Claude" (2026), measured at 24 fps.
import json, os
H = os.path.dirname(os.path.abspath(__file__))
FPS = 24; DUR = 53.917
CUTS = [4.0, 4.458, 9.042, 13.083, 15.5, 16.208, 18.125, 27.708, 34.625, 39.708, 49.333]
M = dict(
    # home: typing, push-in, send
    ty1=4.62, push=7.75, send1=8.85,
    # turn 1 (flow card): reply text, header, expand, zoom click, drag pan
    r1=9.25, h1=10.15, ex1=11.2, plus=12.55, drag0=13.85, drag1=14.45, shrink1=16.55,
    # turn 2 (scene card)
    ty2=18.2, send2=19.6, sw2=19.75, r2=20.05, h2=21.0, ex2=21.8, wave=22.3, out2=23.0, zin2=24.9, dd=25.9, ddOpen=26.25,
    # turn 3 (meeting card)
    ty3=27.8, send3=29.4, sw3=29.6, r3=30.0, h3=30.5, ex3=31.3, out3=32.0, zin3=33.3, check=34.05,
    # turn 4 (mail card)
    ty4=34.72, send4=35.9, sw4=36.1, r4=36.45, h4=37.0, ex4=37.9, zin4=39.4, sel=40.3, out4=43.6, paste=45.0, done=45.45, r5=46.5, ty5=47.5,
    end=49.333, logo=50.0, word=50.35)
ev = []
def e(kind, t, g=1.0, **k): ev.append(dict(kind=kind, t=round(t, 3), g=g, **k))
for c in CUTS: e('tick', c, 0.08)
for t in (M['send1'], M['plus'], M['send2'], M['dd'], 26.95, M['send3'], M['check'], M['send4'], M['paste']): e('click', t, 0.3)
for t in (M['h1'], M['h2'], M['h3'], M['h4']): e('pop', t, 0.1)
for t in (M['ex1'], M['ex2'], M['ex3'], M['ex4']): e('swish', t, 0.08)
e('scratch', M['drag0'], 0.05, dur=0.6); e('blip', M['ddOpen'], 0.08); e('chime', M['done'], 0.25); e('ding', M['word'], 0.18)
for a, b in ((M['ty1'], 7.6), (M['ty2'], 19.3), (M['ty3'], 29.0), (M['ty4'], 35.8), (M['ty5'], 49.2)):
    k = 0; t = a
    while t < b: e('key', t, 0.08 if k % 3 else 0.12); t += 0.085 + 0.03 * ((k * 7) % 3); k += 1
json.dump(dict(fps=FPS, dur=DUR, cuts=CUTS, marks=M, events=ev), open(f'{H}/timeline.json', 'w'), ensure_ascii=False, indent=1)
