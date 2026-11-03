# Template 49 timeline — structure of Pitch "Pitch 2.0" (2023). 30 fps, 81.5 s, 31 hard cuts.
import json, os
H = os.path.dirname(os.path.abspath(__file__))
FPS = 30; DUR = 81.5
CUTS = [5.8, 9.467, 12.267, 15.633, 22.767, 24.433, 26.6, 27.667, 28.033, 30.133, 32.933, 34.0, 36.767, 39.067, 41.633, 45.6,
        47.033, 48.133, 49.433, 52.767, 53.167, 56.367, 57.533, 59.7, 60.9, 63.9, 65.367, 66.367, 66.867, 73.667, 74.367]
M = dict(big=1.0, bigE=1.75, card=2.0, cardE=2.5, worth=3.85, l1=5.9, pan=7.3, l2=7.9, zo=11.8,
         hi=13.0, shp=13.2, badge=14.0, pc=17.3, ty=17.8, tyE=20.8, clk=21.9, that=24.6, q=25.9, stop=28.5, human=30.4, glow=31.5,
         pk1=33.6, list=35.2, pk2=35.8, btn=37.3, ed=38.4, tb=39.8, sl2=41.1, zt=43.0, ty2=41.9, panel=50.6, pswap=54.0,
         pres=58.7, pclk=59.3, nxt=62.6, mzoom=69.8, exp=71.0, tip=72.2, can=74.85, pitch=75.7, endf=77.2, logo=77.7, word=78.1)
ev = []
def e(kind, t, g=1.0, **k): ev.append(dict(kind=kind, t=round(t, 3), g=g, **k))
for k in range(10): e('key', M['l1'] + k * 0.07, 0.22)
for k in range(10): e('key', M['l2'] + k * 0.07, 0.22)
for k in range(36): e('key', M['ty'] + k * 0.08, 0.16)
for k in range(14): e('key', M['ty2'] + k * 0.1, 0.16)
for t in (M['clk'], M['pk1'], M['pk2'], M['ed'], M['pclk'], M['exp'], M['sl2']): e('click', t, 0.25)
for t in (M['card'], M['worth'], M['badge'], M['pc'], M['panel'], M['pswap'], M['tip']): e('pop', t, 0.08)
for t in (CUTS[3], CUTS[4], CUTS[9], CUTS[13], CUTS[27]): e('swish', t, 0.12)
for t in (M['big'], M['hi'], M['that'], M['q'], M['human'], CUTS[17] + 0.1, CUTS[25] + 0.1, CUTS[29], M['can'], M['pitch']): e('blip', t, 0.06, f=1400)
e('ding', M['word'], 0.12)
json.dump(dict(fps=FPS, dur=DUR, cuts=CUTS, marks=M, events=ev), open(f'{H}/timeline.json', 'w'), ensure_ascii=False, indent=1)
