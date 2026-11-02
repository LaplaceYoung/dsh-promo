# Template 25 timeline — structure of Anthropic "Pick up where you left off with Claude" (2025), measured at 30 fps.
# One long take between the two cuts; the last frame (34.6 s) is black in the reference and here.
import json, os
H = os.path.dirname(os.path.abspath(__file__))
FPS = 30; DUR = 34.633
CUTS = [1.033, 30.4, 34.6]
M = dict(spark=0.2, blob=0.7, home=1.6, say=3.0, send=6.4, look=7.6, back=12.3, float=13.0, stack=19.3, card=21.4,
         fold=24.3, ans=24.6, say2=27.0, send2=29.4, shrink=29.9, logo=31.2)
ev = []
def e(kind, t, g=1.0, **k): ev.append(dict(kind=kind, t=round(t, 3), g=g, **k))
e('pop', M['spark'], 0.25); e('whoosh', M['blob'], 0.2); e('blip', M['say'], 0.25)
for i in range(16): e('key', M['say'] + 0.3 + i * 0.18, 0.1)
e('click', M['send'], 0.3); e('swish', M['back'], 0.2)
for i in range(10): e('tick', M['float'] + i * 0.55, 0.1)
e('whoosh', M['stack'], 0.25); e('pop', M['card'], 0.2); e('swish', M['fold'], 0.15)
for i in range(8): e('key', M['say2'] + 0.2 + i * 0.22, 0.1)
e('click', M['send2'], 0.3); e('whoosh', M['shrink'], 0.25); e('ding', M['logo'], 0.3)
json.dump(dict(fps=FPS, dur=DUR, cuts=CUTS, marks=M, events=ev), open(f'{H}/timeline.json', 'w'), ensure_ascii=False, indent=1)
