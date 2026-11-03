# Template 40 soundtrack: 115 BPM, playful and bouncy — marimba-like plucks and a clapping groove on the light
# shots, a darker, sparkling arpeggio over the night section, a warm chord and bell on the logo.
import sys, os, json
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, os.path.join(H, '..', '_engine', 'audio'))
from synth import *
TL = json.load(open(f'{H}/timeline.json')); M = TL['marks']; C = TL['cuts']
S = Session(TL['dur'], 115, seed=40)
CH = [['C2', 'G2', 'E3', 'B3'], ['A1', 'E2', 'C3', 'G3'], ['F1', 'C2', 'A2', 'E3'], ['G1', 'D2', 'B2', 'F3']]
def chord(t): return CH[int(t // S.BAR) % 4]
NIGHT = C[18]; END = C[28]
for k, t in S.grid(0, END, S.BAR): S.add(S.pads, pad([hz(n) * 2 for n in chord(t)], S.BAR + 0.5, bright=1500 if t >= NIGHT else 2400), t, 0.2)
for k, t in S.grid(0, END, S.B):
    S.add(S.mus, kick(0.7), t, 0.28)
    if k % 2 == 1: S.add(S.mus, clap(), t, 0.12)
    S.add(S.mus, hat(), t + S.E8, 0.05)
for k, t in S.grid(0, END, S.E8):
    S.add(S.mus, bass(hz(chord(t)[0]), S.E8 * 0.7, cut=900), t, 0.11)
    if t < NIGHT:
        if k % 2 == 0: S.add(S.mus, pluck(hz(chord(t)[1 + (k // 2) % 3]) * 2, 0.25), t, 0.07, 0.3 * (-1) ** k)
    else: S.add(S.mus, pluck(hz(chord(t)[1 + k % 3]) * 4, 0.18), t, 0.05, 0.4 * (-1) ** k)
S.add(S.mus, impact(), END, 0.25); S.add(S.mus, bell(hz('C6'), 2.5), END, 0.1)
S.add(S.pads, warmpad([hz(n) * 2 for n in CH[0]], TL['dur'] - END), END, 0.35)
S.foley(TL['events'])
S.write(sys.argv[1] if len(sys.argv) > 1 else f'{H}/build/mix_raw.wav', mus_g=0.8, fx_g=1.0, fade=1.5)
