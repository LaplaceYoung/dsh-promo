# Template 43 soundtrack: 126 BPM, warm and light under a screen take — soft felt-piano chords, a gentle pulse that
# enters with the chat, brushed hats, a quiet bass, soft UI clicks and keys while typing, and a bell on the logo.
import sys, os, json
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, os.path.join(H, '..', '_engine', 'audio'))
from synth import *
TL = json.load(open(f'{H}/timeline.json')); M = TL['marks']; C = TL['cuts']
S = Session(TL['dur'], 126, seed=43)
CH = [['F2', 'C3', 'A3', 'E4'], ['D2', 'A2', 'F3', 'C4'], ['A#1', 'F2', 'D3', 'A3'], ['C2', 'G2', 'E3', 'B3']]
def chord(t): return CH[int(t // S.BAR) % 4]
for k, t in S.grid(0, M['end'], S.BAR): S.add(S.pads, pad([hz(n) * 2 for n in chord(t)], S.BAR + 0.6, bright=1500), t, 0.2)
for k, t in S.grid(0, M['end'], S.E8):
    if k % 2 == 0 or t > C[1]: S.add(S.mus, epiano(hz(chord(t)[1 + (k // 2) % 3]) * 2, 0.5), t, 0.05, 0.25 * (-1) ** k)
for k, t in S.grid(C[1], M['end'], S.B):
    S.add(S.mus, softkick(0.7), t, 0.22)
    S.add(S.mus, hat(), t + S.E8, 0.04)
    if k % 2 == 1: S.add(S.mus, rim(), t, 0.05)
for k, t in S.grid(C[1], M['end'], S.E8): S.add(S.mus, bass(hz(chord(t)[0]), S.E8 * 0.7, cut=700), t, 0.09)
for k, t in S.grid(0, C[0], S.E8): S.add(S.mus, pluck(hz(chord(t)[1 + k % 3]) * 4, 0.25), t, 0.05, 0.3 * (-1) ** k)
S.add(S.mus, impact(), C[0], 0.12); S.add(S.mus, bell(hz('C6'), 2.5), M['word'], 0.1)
S.add(S.pads, warmpad([hz(n) * 2 for n in CH[0]], TL['dur'] - M['end']), M['end'], 0.32)
S.foley(TL['events'])
S.write(sys.argv[1] if len(sys.argv) > 1 else f'{H}/build/mix_raw.wav', mus_g=0.8, fx_g=1.0, fade=1.5)
