# Template 46 soundtrack: 129 BPM, bright and bouncy under a fast black-ground showcase — chiptune-ish square plucks,
# a tight kick and clap from the icon grid on, a pulsing bass, little bleeps on every hard change, a break with only
# arps under the board pans, a glitch into the wordmark and a bell on the colour logo.
import sys, os, json
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, os.path.join(H, '..', '_engine', 'audio'))
from synth import *
TL = json.load(open(f'{H}/timeline.json')); M = TL['marks']; C = TL['cuts']
S = Session(TL['dur'], 129, seed=46)
CH = [['C2', 'G2', 'E3', 'B3'], ['A1', 'E2', 'C3', 'G3'], ['F1', 'C2', 'A2', 'E3'], ['G1', 'D2', 'B2', 'F#3']]
def chord(t): return CH[int(t // S.BAR) % 4]
END = C[20]
for k, t in S.grid(0, END, S.BAR): S.add(S.pads, pad([hz(n) * 2 for n in chord(t)], S.BAR + 0.3, bright=1800), t, 0.1)
for k, t in S.grid(C[0], END, S.B):
    brk = C[14] <= t < C[18]
    if not brk: S.add(S.mus, kick(), t, 0.36)
    S.add(S.mus, hat(), t + S.E8, 0.06)
    if k % 2 == 1 and not brk: S.add(S.mus, clap(), t, 0.14)
for k, t in S.grid(C[0], END, S.E8): S.add(S.mus, bass(hz(chord(t)[0]), S.E8 * 0.55, cut=1000), t, 0.12 if not (C[14] <= t < C[18]) else 0.06)
for k, t in S.grid(0, END, S.E8 / 2): S.add(S.mus, pluck(hz(chord(t)[k % 4]) * (4 if (k // 8) % 2 else 8), 0.12, bright=7000), t, 0.03, 0.4 * (-1) ** k)
S.add(S.mus, impact(), C[0], 0.12); S.add(S.mus, impact(), C[5], 0.12)
S.add(S.mus, bell(hz('C6'), 2.5), 23.75, 0.1); S.add(S.mus, bell(hz('G6'), 2.0), M['ball'], 0.08)
S.add(S.pads, warmpad([hz(n) * 2 for n in CH[0]], TL['dur'] - END), END, 0.26)
S.foley(TL['events'])
S.write(sys.argv[1] if len(sys.argv) > 1 else f'{H}/build/mix_raw.wav', mus_g=0.8, fx_g=1.0, fade=0.8)
