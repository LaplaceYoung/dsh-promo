# Template 30 timeline — structure of Anthropic "Claude Code on desktop" (2025), measured at 30 fps.
# The reference has no hard cut: one take of camera moves over a desktop window, a wipe to a title card, then the logo.
import json, os
H = os.path.dirname(os.path.abspath(__file__))
FPS = 30; DUR = 20.367
CUTS = []
M = dict(zoom=1.55, click=3.0, mode=3.45, out1=5.2, out2=7.35, say=8.3, said=9.9, drop=10.5, pick=11.1, polish=11.35, send=11.8,
         wipe=12.25, text=13.0, textOut=15.85, logo=16.75)
ev = []
def e(kind, t, g=1.0, **k): ev.append(dict(kind=kind, t=round(t, 3), g=g, **k))
e('swish', M['zoom'], 0.18); e('click', M['click'], 0.35); e('pop', M['mode'], 0.2); e('swish', M['out1'], 0.15); e('swish', M['out2'], 0.15)
e('blip', M['say'], 0.25)
for i in range(9): e('key', M['say'] + 0.25 + i * 0.17, 0.08)
e('click', M['drop'], 0.3); e('click', M['pick'], 0.3); e('chime', M['polish'], 0.18); e('click', M['send'], 0.35)
e('whoosh', M['wipe'], 0.3); e('pop', M['logo'], 0.25)
json.dump(dict(fps=FPS, dur=DUR, cuts=CUTS, marks=M, events=ev), open(f'{H}/timeline.json', 'w'), ensure_ascii=False, indent=1)
