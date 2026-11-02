# Template 11 timeline — structure of Raycast "New Raycast. Coming 2026" (2025). Native 30 fps.
import json, os
H = os.path.dirname(os.path.abspath(__file__))
FPS = 30; DUR = 38.567
CUTS = [1.0, 3.667, 4.067, 5.667, 8.467, 8.9, 14.0, 20.233, 20.767, 22.467, 24.2, 26.167, 28.267]
M = dict(bar=1.0, type0=4.3, keys=7.0, hist=8.9, grid=11.0, tiles=14.0, sel=[14.0, 14.8, 15.6, 16.2], fade=17.0, pill=17.5,
         ask=20.767, ask_t=21.3, win=22.467, steps=24.2, toast=26.167, w=[28.267, 29.6, 30.9, 32.3, 34.5], logo=36.7)
WORDS = [["新", "场景识别"], ["新", "热词词库"], ["新", "会议记录"], ["新", "MOSMOS"], ["新 MOSMOS", "MOSMOS.IO"]]
ev = []
def e(kind, t, g=1.0, **k): ev.append(dict(kind=kind, t=round(t, 3), g=g, **k))
for c in CUTS: e('tick', c, 0.3)
for i in range(6): e('key', M['type0'] + i * 0.18, 0.3)
for t in M['sel']: e('blip', t, 0.3)
e('swish', M['pill'], 0.3)
for i in range(16): e('key', M['ask_t'] + i * 0.07, 0.2)
for t in M['w']: e('glitch', t, 0.18)
e('ding', M['logo'], 0.35)
json.dump(dict(fps=FPS, dur=DUR, cuts=CUTS, marks=M, words=WORDS, events=ev), open(f'{H}/timeline.json', 'w'), ensure_ascii=False, indent=1)
