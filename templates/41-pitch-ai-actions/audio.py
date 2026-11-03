# Template 41 soundtrack: 94 BPM, glossy and upbeat — wide synth chords, a punchy kick-snare groove, bright plucks
# that lift on the gradient shots, short stops on the black title cards, and a hit on the logo.
import sys, os, json
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, os.path.join(H, '..', '_engine', 'audio'))
from synth import *
TL = json.load(open(f'{H}/timeline.json')); M = TL['marks']; C = TL['cuts']
S = Session(TL['dur'], 94, seed=41)
CH = [['E2', 'B2', 'G#3', 'D#4'], ['C#2', 'G#2', 'E3', 'B3'], ['A1', 'E2', 'C#3', 'G#3'], ['B1', 'F#2', 'D#3', 'A3']]
def chord(t): return CH[int(t // S.BAR) % 4]
for k, t in S.grid(0, M['logo'], S.BAR): S.add(S.pads, pad([hz(n) * 2 for n in chord(t)], S.BAR + 0.5, bright=2000), t, 0.22)
for k, t in S.grid(C[0], M['logo'], S.B):
    S.add(S.mus, kick(0.85), t, 0.32)
    if k % 2 == 1: S.add(S.mus, clap(), t, 0.14)
    S.add(S.mus, hat(), t + S.E8, 0.06)
for k, t in S.grid(0, M['logo'], S.E8):
    S.add(S.mus, bass(hz(chord(t)[0]), S.E8 * 0.75, cut=1000), t, 0.12)
    if k % 2 == 0: S.add(S.mus, pluck(hz(chord(t)[1 + (k // 2) % 3]) * 4, 0.2), t, 0.05, 0.3 * (-1) ** k)
for c in C[:5]: S.add(S.mus, impact(), c, 0.12)
S.add(S.mus, impact(), M['logo'], 0.28); S.add(S.mus, bell(hz('E6'), 2.5), M['logo'], 0.1)
S.add(S.pads, warmpad([hz(n) * 2 for n in CH[0]], TL['dur'] - M['logo']), M['logo'], 0.35)
S.foley(TL['events'])
S.write(sys.argv[1] if len(sys.argv) > 1 else f'{H}/build/mix_raw.wav', mus_g=0.8, fx_g=1.0, fade=1.2)
