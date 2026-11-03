# Template 50 soundtrack: 152 BPM (felt in half time), warm and unhurried under a long screen take — soft electric
# piano and plucked chords, a light shaker and rim pulse that thickens once the reply starts streaming, a low bass,
# quiet keys, clicks and pops for the interface, a lift into the icon grid and a bell on the lock-up.
import sys, os, json
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, os.path.join(H, '..', '_engine', 'audio'))
from synth import *
TL = json.load(open(f'{H}/timeline.json')); M = TL['marks']; C = TL['cuts']
S = Session(TL['dur'], 152, seed=50)
CH = [['F2', 'C3', 'A3', 'E4'], ['D2', 'A2', 'F3', 'C4'], ['A#1', 'F2', 'D3', 'A3'], ['C2', 'G2', 'E3', 'B3']]
BAR2 = S.BAR * 2
def chord(t): return CH[int(t // BAR2) % 4]
END = M['logo']
for k, t in S.grid(0, END, BAR2): S.add(S.pads, warmpad([hz(n) * 2 for n in chord(t)], BAR2 + 0.5), t, 0.10)
for k, t in S.grid(0, END, S.B):
    for j, n in enumerate(chord(t)[1:]): S.add(S.mus, epiano(hz(n) * 2, S.B * 0.9), t + j * 0.012, 0.022 if k % 2 == 0 else 0.014)
for k, t in S.grid(C[0], END, S.E8):
    if k % 3 != 2: S.add(S.mus, pluck(hz(chord(t)[1 + k % 3]) * 4, 0.18, bright=3200), t, 0.022, 0.3 * (-1) ** k)
for k, t in S.grid(C[0], END, S.B * 2):
    S.add(S.mus, softkick(0.8), t, 0.18)
    S.add(S.mus, rim(), t + S.B, 0.05 if t > M['conv'] else 0.03)
for k, t in S.grid(M['conv'], END, S.E8): S.add(S.mus, shaker(), t, 0.018)
for k, t in S.grid(C[0], END, S.B * 2): S.add(S.mus, bass(hz(chord(t)[0]), S.B * 1.6, cut=600), t, 0.07)
S.add(S.mus, noise_riser(1.2), C[3] - 1.2, 0.04)
S.add(S.mus, bell(hz('F6'), 3.0), M['word'] + 0.05, 0.08)
S.add(S.pads, warmpad([hz(n) * 2 for n in CH[0]], TL['dur'] - END), END, 0.26)
S.foley(TL['events'])
S.write(sys.argv[1] if len(sys.argv) > 1 else f'{H}/build/mix_raw.wav', mus_g=0.8, fx_g=1.0, fade=1.8)
