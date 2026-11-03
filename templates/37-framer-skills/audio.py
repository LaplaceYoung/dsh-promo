# Template 37 soundtrack: 104 BPM, dark and minimal — a low pulse and soft keys under the typing, a fuller beat with
# glassy arps over the canvas shots, a drop to silence-ish for the list, and a bright hit for the glowing chip and logo.
import sys, os, json
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, os.path.join(H, '..', '_engine', 'audio'))
from synth import *
TL = json.load(open(f'{H}/timeline.json')); M = TL['marks']; C = TL['cuts']
S = Session(TL['dur'], 104, seed=37)
CH = [['A1', 'E2', 'C3', 'G3'], ['F1', 'C2', 'A2', 'E3'], ['C2', 'G2', 'E3', 'B3'], ['G1', 'D2', 'B2', 'F#3']]
def chord(t): return CH[int(t // S.BAR) % 4]
for k, t in S.grid(0, M['glow'], S.BAR): S.add(S.pads, pad([hz(n) * 2 for n in chord(t)], S.BAR + 0.6, bright=1200), t, 0.22)
for k, t in S.grid(0, M['glow'], S.E8):
    S.add(S.mus, bass(hz(chord(t)[0]) * 2, S.E8 * 0.7, cut=700), t, 0.12)
for k, t in S.grid(C[2], C[8], S.B):
    S.add(S.mus, kick(0.8), t, 0.32)
    if k % 2 == 1: S.add(S.mus, clap(), t, 0.12)
    S.add(S.mus, hat(), t + S.E8, 0.06)
for k, t in S.grid(C[2], C[8], S.E8 / 2):
    if k % 3 != 2: S.add(S.mus, pluck(hz(chord(t)[1 + k % 3]) * 4, 0.18), t, 0.05, 0.3 * (-1) ** k)
S.add(S.mus, impact(), M['glow'], 0.3); S.add(S.mus, bell(hz('A5'), 2.5), M['glow'], 0.1)
S.add(S.pads, warmpad([hz(n) * 2 for n in CH[0]], TL['dur'] - M['glow']), M['glow'], 0.4)
S.foley(TL['events'])
S.write(sys.argv[1] if len(sys.argv) > 1 else f'{H}/build/mix_raw.wav', mus_g=0.8, fx_g=1.0, fade=1.0)
