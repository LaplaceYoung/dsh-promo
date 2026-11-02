# Template 32 timeline — structure of Anthropic "An experimental new way to design software" (2025), measured at 59.94 fps
# and rendered at 60. Window pops at 13.25 s are soft in the reference and are not counted as cuts.
import json, os
H = os.path.dirname(os.path.abspath(__file__))
FPS = 60; DUR = 102.0
CUTS = [13.063, 29.129, 39.59, 53.303, 65.332, 95.162]
M = dict(go=4.6, chips=5.5, say=6.7, said=9.6, out=10.0, log=10.9, files=14.4, desk=22.3, more=26.5, note=29.3, noteSay=31.0, noteEnd=37.0,
         meet=40.6, rows=43.6, spk=47.6, todo=50.8, mail=53.5, mailSay=55.0, mailEnd=61.0, sent=63.6, apps=72.8, icons=75.8, dot=95.8, logo=96.6)
ev = []
def e(kind, t, g=1.0, **k): ev.append(dict(kind=kind, t=round(t, 3), g=g, **k))
e('pop', 0.4, 0.2); e('click', M['go'], 0.3); e('swish', M['chips'], 0.15); e('blip', M['say'], 0.25)
for i in range(14): e('key', M['say'] + 0.2 + i * 0.2, 0.06)
e('swish', M['out'], 0.15); e('pop', M['log'], 0.15)
e('pop', CUTS[0], 0.25)
for i in range(10): e('tick', M['files'] + i * 0.6, 0.08)
e('click', M['desk'], 0.25); e('pop', CUTS[1] + 0.1, 0.25); e('blip', M['noteSay'], 0.2)
for i in range(16): e('key', M['noteSay'] + 0.3 + i * 0.35, 0.06)
e('pop', M['meet'], 0.25); e('tick', M['rows'], 0.1); e('tick', M['spk'], 0.1); e('chime', M['todo'], 0.15)
e('pop', M['mail'], 0.25); e('blip', M['mailSay'], 0.2)
for i in range(16): e('key', M['mailSay'] + 0.3 + i * 0.35, 0.06)
e('click', M['sent'], 0.3); e('swish', CUTS[4], 0.15); e('click', M['apps'], 0.25)
for i in range(16): e('tick', M['icons'] + i * 1.0, 0.08)
e('whoosh', CUTS[5], 0.2); e('ding', M['logo'], 0.3)
json.dump(dict(fps=FPS, dur=DUR, cuts=CUTS, marks=M, events=ev), open(f'{H}/timeline.json', 'w'), ensure_ascii=False, indent=1)
