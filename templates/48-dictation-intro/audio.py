# Template 48 soundtrack: 126 BPM, warm and unhurried under a long product walkthrough — an electric-piano bed,
# soft kick and shaker that come in after the intro, a rounded bass, quiet keys while typing, small pops for the
# dictation pill, swishes on the zooms and a bell on the lock-up. The talking-head shots keep the same bed.
import sys, os, json
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, os.path.join(H, '..', '_engine', 'audio'))
from synth import *
TL = json.load(open(f'{H}/timeline.json')); M = TL['marks']; C = TL['cuts']
S = Session(TL['dur'], 126, seed=48)
CH = [['F2', 'C3', 'A3', 'E4'], ['D2', 'A2', 'F3', 'C4'], ['A#1', 'F2', 'D3', 'A3'], ['C2', 'G2', 'E3', 'B3']]
def chord(t): return CH[int(t // S.BAR) % 4]
END = C[17]
for k, t in S.grid(0, END, S.BAR): S.add(S.pads, pad([hz(n) * 2 for n in chord(t)], S.BAR + 0.4, bright=1100), t, 0.12)
for k, t in S.grid(0, END, S.B):
    for n in chord(t)[1:]: S.add(S.mus, epiano(hz(n) * 2, 0.9), t + (S.E8 if k % 2 else 0), 0.035)
for k, t in S.grid(C[1], END, S.B):
    S.add(S.mus, softkick(0.9), t, 0.22); S.add(S.mus, shaker(), t + S.E8, 0.05)
    if k % 2 == 1: S.add(S.mus, rim(), t, 0.05)
for k, t in S.grid(C[1], END, S.E8): S.add(S.mus, bass(hz(chord(t)[0]), S.E8 * 0.7, cut=700), t, 0.07)
S.add(S.mus, noise_riser(1.4), C[17] - 1.4, 0.05)
S.add(S.mus, bell(hz('F5'), 3.0), M['logo'], 0.08)
S.add(S.pads, warmpad([hz(n) * 2 for n in CH[0]], TL['dur'] - END), END, 0.3)
S.foley(TL['events'])
S.write(sys.argv[1] if len(sys.argv) > 1 else f'{H}/build/mix_raw.wav', mus_g=0.8, fx_g=1.0, fade=1.8)
