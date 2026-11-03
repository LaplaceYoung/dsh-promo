# Template 35 soundtrack: 100 BPM, warm and playful — a music-box pluck over a soft pad and brushed shaker, a blip
# on every spoken line (the voices themselves are left to the user's own recording), a lift on the pan and a bell
# on the end card.
import sys, os, json
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, os.path.join(H, '..', '_engine', 'audio'))
from synth import *
TL = json.load(open(f'{H}/timeline.json')); M = TL['marks']
S = Session(TL['dur'], 100, seed=35); OFF = 0.0
CH = [['C3', 'G3', 'E4', 'B4'], ['A2', 'E3', 'C4', 'G4'], ['F2', 'C3', 'A3', 'E4'], ['G2', 'D3', 'B3', 'F4']]
def chord(t): return CH[int((t - OFF) // S.BAR) % 4]
for k, t in S.grid(0.0, M['end'], S.BAR, OFF): S.add(S.pads, warmpad([hz(n) * 2 for n in chord(t)], S.BAR + 0.8), t, 0.34)
for k, t in S.grid(0.0, M['end'], S.E8, OFF):
    if k % 2 == 0 or k % 8 == 5: S.add(S.mus, pluck(hz(chord(t)[1 + (k % 3)]) * 4, 0.35, bright=4000), t, 0.07, 0.4 * (-1) ** k)
for k, t in S.grid(4.0, M['end'], S.B, OFF):
    S.add(S.mus, softkick(0.5), t, 0.22); S.add(S.mus, shaker(), t + S.E8, 0.05, 0.3)
S.add(S.mus, reverse_swell(hz('G3'), 1.4), M['pan'] - 0.4, 0.15)
S.add(S.pads, warmpad([hz(n) * 2 for n in CH[0]], TL['dur'] - M['end']), M['end'], 0.42)
for k, t in S.grid(M['end'], TL['dur'] - 1.0, S.B, OFF): S.add(S.mus, epiano(hz(CH[0][1 + k % 3]) * 2, 0.9), t, 0.08)
S.add(S.mus, bell(hz('C6'), 2.5), M['logo'], 0.12)
S.foley(TL['events'])
S.write(sys.argv[1] if len(sys.argv) > 1 else f'{H}/build/mix_raw.wav', mus_g=0.8, fx_g=1.0, fade=0.8)
