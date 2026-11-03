# Template 46 timeline — structure of Spline "Introducing Hana - A new canvas for interactivity" (2025).
# 30 fps, 26.667 s. Cuts are the reference's hard changes, including the two-frame white flash bands over the
# highlighted word (7.767, 8.467) and the one-frame board flash before the end wordmark (22.533).
import json, os
H = os.path.dirname(os.path.abspath(__file__))
FPS = 30; DUR = 26.667
CUTS = [0.633, 1.867, 2.767, 3.933, 5.0, 7.133, 7.767, 7.833, 8.467, 8.533, 9.3, 11.067, 13.333, 15.367, 16.633, 17.7, 18.067,
        19.067, 19.8, 22.533, 22.567, 24.7, 25.8]
M = dict(press=4.45, m1=9.67, m2=10.23, m3=10.5, flip=11.9, flip2=12.8, ez=17.45, zo=21.75, glitch=22.75, col=23.25, logo=23.7,
         lc=23.95, by=24.3, ball=25.8)
ev = []
def e(kind, t, g=1.0, **k): ev.append(dict(kind=kind, t=round(t, 3), g=g, **k))
for c in CUTS: e('tick', c, 0.14)
e('keycap', M['press'], 0.5); e('blip', 7.767, 0.12, f=1800); e('blip', 8.467, 0.12, f=1800)
for t in (M['m1'], M['m2'], M['m3']): e('blip', t, 0.1, f=900)
for t in (M['flip'], M['flip2']): e('swish', t, 0.12)
for t in (20.3, 20.9, 21.4): e('click', t, 0.18)
e('whoosh', M['zo'] + 0.3, 0.2); e('glitch', M['glitch'], 0.25); e('ding', M['logo'], 0.14); e('impact', M['ball'], 0.25)
json.dump(dict(fps=FPS, dur=DUR, cuts=CUTS, marks=M, events=ev), open(f'{H}/timeline.json', 'w'), ensure_ascii=False, indent=1)
