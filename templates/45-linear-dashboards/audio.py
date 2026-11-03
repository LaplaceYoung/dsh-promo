# Template 45 soundtrack: 132 BPM, dark and glassy under tilted dashboard shots — a low drone and slow pads, a soft
# pulse of muted kicks and ticking hats through the chart shots, glassy plucks, a riser into the cut to the first
# title card, then a sparse ambient tail for the title cards and a bell on the logo.
import sys, os, json
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, os.path.join(H, '..', '_engine', 'audio'))
from synth import *
TL = json.load(open(f'{H}/timeline.json')); M = TL['marks']; C = TL['cuts']
S = Session(TL['dur'], 132, seed=45)
CH = [['D2', 'A2', 'F3', 'C4'], ['A#1', 'F2', 'D3', 'A3'], ['F1', 'C2', 'A2', 'E3'], ['C2', 'G2', 'E3', 'G3']]
def chord(t): return CH[int(t // S.BAR) % 4]
S.add(S.pads, drone(hz('D1') * 2, M['logo'] + 1.0, bright=500), 0, 0.22)
for k, t in S.grid(0, M['logo'], S.BAR): S.add(S.pads, pad([hz(n) * 2 for n in chord(t)], S.BAR + 0.8, bright=1100 if t < C[4] else 800), t, 0.16)
for k, t in S.grid(C[0], C[4], S.B):
    S.add(S.mus, softkick(0.8), t, 0.2)
    S.add(S.mus, hat(), t + S.E8, 0.035)
    if k % 4 == 3: S.add(S.mus, rim(), t, 0.04)
for k, t in S.grid(C[0], C[4], S.E8): S.add(S.mus, bass(hz(chord(t)[0]), S.E8 * 0.6, cut=500), t, 0.08)
for k, t in S.grid(1.0, C[4], S.E8):
    if k % 3 != 2: S.add(S.mus, pluck(hz(chord(t)[1 + k % 3]) * 4, 0.22, bright=3500), t, 0.03, 0.4 * (-1) ** k)
for k, t in S.grid(C[4], M['logo'], S.B * 2): S.add(S.mus, epiano(hz(chord(t)[2]) * 2, 1.4), t, 0.05, 0.2 * (-1) ** k)
for c in C[:4]: S.add(S.mus, reverse_swell(hz(chord(c)[2]) * 2, 0.8), c - 0.8, 0.06)
S.add(S.mus, bell(hz('D6'), 3.0), M['logo'] + 0.2, 0.09)
S.add(S.pads, warmpad([hz(n) * 2 for n in CH[0]], TL['dur'] - M['logo']), M['logo'], 0.28)
S.foley(TL['events'])
S.write(sys.argv[1] if len(sys.argv) > 1 else f'{H}/build/mix_raw.wav', mus_g=0.8, fx_g=1.0, fade=1.5)
