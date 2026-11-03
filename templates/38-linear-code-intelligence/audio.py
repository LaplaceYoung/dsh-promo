# Template 38 soundtrack: 120 BPM, dark and restrained — a soft sub pulse and filtered pad under the slanted panels,
# ticking hats and glassy plucks under the floating dialog cards, a low hit and long tail on the logo.
import sys, os, json
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, os.path.join(H, '..', '_engine', 'audio'))
from synth import *
TL = json.load(open(f'{H}/timeline.json')); M = TL['marks']; C = TL['cuts']
S = Session(TL['dur'], 120, seed=38)
CH = [['D2', 'A2', 'F3', 'C4'], ['A#1', 'F2', 'D3', 'A3'], ['F2', 'C3', 'A3', 'E4'], ['C2', 'G2', 'E3', 'B3']]
def chord(t): return CH[int(t // S.BAR) % 4]
S.add(S.pads, drone(hz('D2'), M['end']), 0.0, 0.22)
for k, t in S.grid(0, M['end'], S.BAR): S.add(S.pads, pad([hz(n) * 2 for n in chord(t)], S.BAR + 0.6, bright=1000), t, 0.2)
for k, t in S.grid(C[0], M['end'], S.B):
    S.add(S.mus, kick(0.7), t, 0.22 if t > C[1] else 0.12)
    S.add(S.mus, hat(), t + S.E8, 0.05)
for k, t in S.grid(C[1], M['end'], S.E8):
    if k % 3 != 1: S.add(S.mus, pluck(hz(chord(t)[1 + k % 3]) * 4, 0.2), t, 0.045, 0.3 * (-1) ** k)
S.add(S.mus, impact(), M['end'], 0.25)
S.add(S.pads, warmpad([hz(n) * 2 for n in CH[0]], TL['dur'] - M['end']), M['end'], 0.35)
S.foley(TL['events'])
S.write(sys.argv[1] if len(sys.argv) > 1 else f'{H}/build/mix_raw.wav', mus_g=0.8, fx_g=1.0, fade=1.2)
