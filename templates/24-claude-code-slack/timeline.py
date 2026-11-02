# Template 24 timeline — structure of Anthropic "Claude Code in Slack" (2025), measured at 30 fps.
import json, os
H = os.path.dirname(os.path.abspath(__file__))
FPS = 30; DUR = 41.1
CUTS = [3.2, 15.2, 19.067, 21.667, 24.733, 25.367, 25.733, 26.2, 29.567, 33.7]
M = dict(draw=0.15, bub=1.2, grow=2.55, msg=3.8, thread=6.4, zoom=8.2, fn=9.0, polish=11.4, done=12.2, send=13.2,
         s1=16.3, s2=17.3, s3=18.2, click=20.6, steps=22.1, doc=26.4, post=30.2, pill=33.7, logo=35.9)
ev = []
def e(kind, t, g=1.0, **k): ev.append(dict(kind=kind, t=round(t, 3), g=g, **k))
e('scratch', M['draw'], 0.2, dur=1.0); e('pop', M['bub'], 0.3); e('whoosh', M['grow'], 0.25)
e('pop', M['msg'], 0.25); e('swish', M['thread'], 0.2); e('blip', M['fn'], 0.3); e('chime', M['done'], 0.2); e('click', M['send'], 0.3)
for k in ('s1', 's2', 's3'): e('tick', M[k], 0.2)
e('click', M['click'], 0.3)
for i in range(5): e('tick', M['steps'] + i * 0.45, 0.15)
for c in CUTS[4:8]: e('tick', c, 0.2)
e('pop', M['post'], 0.25); e('impact', M['pill'], 0.25); e('ding', M['logo'], 0.3)
json.dump(dict(fps=FPS, dur=DUR, cuts=CUTS, marks=M, events=ev), open(f'{H}/timeline.json', 'w'), ensure_ascii=False, indent=1)
