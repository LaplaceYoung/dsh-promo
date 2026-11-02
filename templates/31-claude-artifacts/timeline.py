# Template 31 timeline — structure of Anthropic "Turn ideas into interactive artifacts" (2025), measured at 30 fps.
import json, os
H = os.path.dirname(os.path.abspath(__file__))
FPS = 30; DUR = 45.067
CUTS = [3.6, 9.1, 18.333, 19.167, 20.867, 23.033, 24.9, 26.4, 28.0, 30.5, 32.0, 33.367, 35.533, 38.067, 38.4, 38.733, 39.067, 39.367, 39.967, 40.433]
M = dict(zoom=1.9, click=3.0, tile=3.7, bar=6.4, say=6.9, said=8.5, win=8.6, play=10.2, toggle=13.0, stop=17.4, circle=21.4, story=25.4,
         theme=32.6, term=33.6, url=41.0)
ev = []
def e(kind, t, g=1.0, **k): ev.append(dict(kind=kind, t=round(t, 3), g=g, **k))
e('swish', M['zoom'], 0.15); e('click', M['click'], 0.35); e('pop', M['tile'], 0.25); e('whoosh', M['bar'], 0.2); e('blip', M['say'], 0.25)
for i in range(10): e('key', M['say'] + 0.1 + i * 0.16, 0.07)
e('whoosh', M['win'], 0.2); e('click', M['play'], 0.3)
for i in range(6): e('click', M['toggle'] + i * 0.5, 0.15)
e('click', M['stop'], 0.3)
for c in CUTS[2:13]: e('swish', c, 0.12)
e('scratch', M['circle'], 0.15, dur=1.3); e('chime', M['story'], 0.15)
for i in range(12): e('key', M['term'] + i * 0.15, 0.06)
for c in CUTS[13:]: e('tick', c, 0.15)
e('ding', CUTS[19] + 0.15, 0.3)
for i in range(9): e('key', M['url'] + i * 0.09, 0.05)
json.dump(dict(fps=FPS, dur=DUR, cuts=CUTS, marks=M, events=ev), open(f'{H}/timeline.json', 'w'), ensure_ascii=False, indent=1)
