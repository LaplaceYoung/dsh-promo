# Template 44 timeline — structure of The Browser Company "Boosts by Arc · Meet Your New Internet" (2023).
# The reference runs at 23.976 fps; cuts are kept on the same frame numbers and rendered at 24 fps.
import json, os
H = os.path.dirname(os.path.abspath(__file__))
FPS = 24; DUR = 42.125
CUTS = [1.417, 1.792, 2.25, 2.708, 3.083, 3.625, 4.667, 6.0, 6.792, 7.542, 8.458, 8.875, 9.625, 10.375, 10.833, 11.667, 12.125, 12.542, 12.917, 14.208, 15.125, 16.667, 17.958, 18.708, 19.625, 20.083, 21.208, 21.583, 22.417, 22.958, 23.75, 24.333, 25.167, 25.917, 26.375, 27.083, 28.333, 29.5, 30.0, 31.542, 32.792, 33.708, 34.542, 35.667, 36.917, 37.667, 38.417, 39.917]
M = dict(wipe=4.15, w2=5.2, w3=5.45, coral=5.792, blue=6.25, zap=14.0, zbar=14.95, zone=16.4, ybar=18.3, tog=29.1, paint=30.7, share=31.0, draw=31.75, press=33.05, logo=38.6, url=40.9)
ev = []
def e(kind, t, g=1.0, **k): ev.append(dict(kind=kind, t=round(t, 3), g=g, **k))
for c in CUTS: e('tick', c, 0.12)
for t in (M['zap'], 15.9, 19.3, 21.9, M['tog'], M['press'], 38.0): e('click', t, 0.3)
for t in (M['zbar'], M['ybar'], 20.5, 21.3): e('pop', t, 0.12)
for t in (16.62, 19.6, 22.4): e('glitch', t, 0.12)
for t in (M['w2'], M['w3'], M['blue'], M['paint'], M['share']): e('blip', t, 0.08)
e('swish', 34.54, 0.2); e('whoosh', 35.67, 0.25); e('chime', 33.72, 0.3); e('impact', M['logo'], 0.35); e('ding', M['url'], 0.15)
FLIPS = [5.792, 6.25, 27.333]  # hard in-shot colour flips the reference also has on these frames (scored as cuts by QA)
json.dump(dict(fps=FPS, dur=DUR, cuts=CUTS, flips=FLIPS, marks=M, events=ev), open(f'{H}/timeline.json', 'w'), ensure_ascii=False, indent=1)
