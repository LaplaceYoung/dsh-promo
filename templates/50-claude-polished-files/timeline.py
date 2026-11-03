# Template 50 timeline — structure of Anthropic "Create polished files in minutes with Sonnet 4.5" (2025). 30 fps, 79.467 s, 4 hard cuts.
import json, os
H = os.path.dirname(os.path.abspath(__file__))
FPS = 30; DUR = 79.467
CUTS = [2.767, 46.533, 48.7, 70.767]
M = dict(pull=0.6, line=0.9, rel=1.8, redraw=2.3, mailIn=3.6, sel0=6.5, sel1=7.0, zo=7.4, sw=8.3, zi=8.75, say=9.9, said=11.8, pol=12.2, polE=12.7,
         drag=13.2, drop=14.3, send=15.8, conv=16.2, zoomOut=36.3, dl=38.2, sheet=39.4, tab2=41.9, tab3=42.9, tz=43.8, cell=45.3, cellSay=45.6, cellDone=46.3,
         dl2=48.0, docOut=50.6, chat2=52.4, zi2=53.6, say2=54.9, said2=56.5, pol2=56.7, send2=57.4, conv2=57.9, zo2=66.9, open=68.0, mailw=68.9,
         grid=71.4, anim=72.8, gather=74.3, logo=75.0, word=75.6)
R1 = [17.0, 19.3, 20.8, 22.6, 23.3, 24.0, 26.3, 28.6, 29.3, 32.9, 33.6, 34.1, 34.8, 35.3]
R2 = [58.9, 60.4, 61.4, 61.9, 62.4, 63.0, 63.4, 64.1, 64.6, 66.2]
M.update({f'r1_{k}': v for k, v in enumerate(R1)}); M.update({f'r2_{k}': v for k, v in enumerate(R2)})
ev = []
def e(kind, t, g=1.0, **k): ev.append(dict(kind=kind, t=round(t, 3), g=g, **k))
for t in (M['sel0'], M['send'], M['dl'], M['cell'], M['dl2'], M['send2'], M['open']): e('click', t, 0.25)
for t in (M['drop'], M['conv'], M['conv2'], M['pol'], M['pol2']): e('pop', t, 0.08)
for t in R1 + R2: e('blip', t, 0.04, f=1800)
for t in (M['zo'], M['sw'], M['zoomOut'], M['sheet'], M['docOut'], M['chat2'], M['zo2'], M['mailw'], M['gather']): e('swish', t, 0.1)
e('swish', M['pull'], 0.08); e('pop', M['line'], 0.06)
e('ding', M['cellDone'], 0.08); e('ding', M['word'], 0.12)
for k in range(9): e('blip', M['grid'] + k * 0.12, 0.03, f=1200)
json.dump(dict(fps=FPS, dur=DUR, cuts=CUTS, marks=M, events=ev), open(f'{H}/timeline.json', 'w'), ensure_ascii=False, indent=1)
