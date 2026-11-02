# Template 28 timeline — structure of Anthropic "Claude can create and edit files" (2025), measured at 24 fps.
import json, os
H = os.path.dirname(os.path.abspath(__file__))
FPS = 24; DUR = 59.542
CUTS = [2.833, 9.583, 12.083, 14.458, 15.917, 16.542, 18.542, 22.375, 24.875, 25.542, 30.875, 31.375, 37.375, 39.5, 41.5, 44.083, 44.708, 48.125, 52.0]
M = dict(say=3.4, said=7.6, drag=7.9, drop=9.1, rec=11.3, open=24.1, dict=32.6, dictEnd=36.4, cell=46.6, cellSay=48.8, cellDone=50.6,
         grid=52.9, gather=55.6, logo=56.8)
ev = []
def e(kind, t, g=1.0, **k): ev.append(dict(kind=kind, t=round(t, 3), g=g, **k))
e('scratch', 0.1, 0.18, dur=2.0); e('swish', CUTS[0], 0.15)
for i in range(14): e('key', M['say'] + i * 0.3, 0.07)
e('swish', M['drag'], 0.15); e('pop', M['drop'], 0.25); e('click', M['rec'], 0.35)
for c in CUTS[2:5]: e('tick', c, 0.12)
e('whoosh', CUTS[4], 0.2)
for i in range(3): e('chime', CUTS[6] + 0.6 + i * 1.0, 0.1)
e('swish', CUTS[7], 0.15); e('click', M['open'], 0.3); e('swish', CUTS[9], 0.15)
e('blip', M['dict'], 0.25)
for i in range(10): e('key', M['dict'] + 0.3 + i * 0.32, 0.07)
e('chime', CUTS[14] + 0.3, 0.15); e('swish', CUTS[15], 0.15)
e('click', M['cell'], 0.3); e('blip', M['cellSay'], 0.2); e('chime', M['cellDone'], 0.15)
e('pop', CUTS[18], 0.2)
for i in range(9): e('tick', M['grid'] + i * 0.12, 0.08)
e('whoosh', M['gather'], 0.2); e('ding', M['logo'], 0.3)
json.dump(dict(fps=FPS, dur=DUR, cuts=CUTS, marks=M, events=ev), open(f'{H}/timeline.json', 'w'), ensure_ascii=False, indent=1)
