# Template 36 soundtrack: 90 BPM, confident keynote-style — a big synth stab on the logo, punchy kick and clap with
# a pulsing bass under the type shots, plucked arps under the UI shots, and a final hit on the logo card.
import sys, os, json
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, os.path.join(H, '..', '_engine', 'audio'))
from synth import *
TL = json.load(open(f'{H}/timeline.json')); M = TL['marks']; C = TL['cuts']
S = Session(TL['dur'], 90, seed=36); OFF = C[0]
CH = [['E2', 'B2', 'G3', 'D4'], ['C2', 'G2', 'E3', 'B3'], ['G2', 'D3', 'B3', 'F#4'], ['D2', 'A2', 'F#3', 'C#4']]
def chord(t): return CH[int(max(0, t - OFF) // S.BAR) % 4]
S.add(S.pads, drone(hz('E2'), C[0] + 0.5), 0.0, 0.3)
for k, t in S.grid(C[0], C[22], S.BAR, OFF): S.add(S.pads, pad([hz(n) * 2 for n in chord(t)], S.BAR + 0.6, bright=1800), t, 0.24)
for k, t in S.grid(C[0], C[22], S.B, OFF):
    S.add(S.mus, kick(0.9), t, 0.36)
    if k % 2 == 1: S.add(S.mus, clap(), t, 0.15)
    S.add(S.mus, hat(), t + S.E8, 0.06, 0.3)
for k, t in S.grid(C[0], C[22], S.E8, OFF):
    S.add(S.mus, bass(hz(chord(t)[0]), S.E8 * 0.8, cut=1100), t, 0.14)
    if k % 2 == 0: S.add(S.mus, pluck(hz(chord(t)[1 + (k // 2) % 3]) * 2, 0.25), t, 0.07, 0.3 * (-1) ** k)
S.add(S.mus, impact(), C[0], 0.3); S.add(S.mus, impact(), C[22], 0.3)
S.add(S.pads, warmpad([hz(n) * 2 for n in CH[0]], TL['dur'] - C[22]), C[22], 0.4)
S.add(S.mus, bell(hz('E6'), 2.5), C[22], 0.1)
S.foley(TL['events'])
S.write(sys.argv[1] if len(sys.argv) > 1 else f'{H}/build/mix_raw.wav', mus_g=0.8, fx_g=1.0, fade=1.0)
