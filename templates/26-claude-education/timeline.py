# Template 26 timeline — structure of Anthropic "Introducing Claude for Education" (2025), measured at 30 fps.
# One hard cut (10.4 s, the drop); everything else is a morph between card, dialog and window.
import json, os
H = os.path.dirname(os.path.abspath(__file__))
FPS = 30; DUR = 34.067
CUTS = [10.4]
M = dict(card=0.1, click1=1.5, open=1.9, focus=3.4, type=4.2, create=7.1, step2=7.5, drag=8.8, over=9.4, words=11.0,
         cont=14.3, page=14.7, zoom=17.6, pick=20.6, send=22.3, chat=22.7, reply=23.6, panel=27.2, doc=27.6, close=33.0, back=33.8)
ev = []
def e(kind, t, g=1.0, **k): ev.append(dict(kind=kind, t=round(t, 3), g=g, **k))
e('pop', M['card'], 0.2); e('click', M['click1'], 0.3); e('swish', M['open'], 0.2); e('click', M['focus'], 0.25)
for i in range(6): e('key', M['type'] + i * 0.22, 0.14)
e('click', M['create'], 0.3); e('swish', M['step2'], 0.15); e('swish', M['drag'], 0.15); e('pop', CUTS[0], 0.3)
for i in range(3): e('tick', M['words'] + i * 0.3, 0.15)
e('click', M['cont'], 0.3); e('whoosh', M['page'], 0.2); e('click', M['pick'], 0.3); e('click', M['send'], 0.3)
e('swish', M['panel'], 0.2); e('whoosh', M['close'], 0.2); e('pop', M['back'], 0.2)
json.dump(dict(fps=FPS, dur=DUR, cuts=CUTS, marks=M, events=ev), open(f'{H}/timeline.json', 'w'), ensure_ascii=False, indent=1)
