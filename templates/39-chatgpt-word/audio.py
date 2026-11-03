# Template 39 soundtrack: 105 BPM, bright and light — soft electric-piano chords, a gentle kick and shaker groove
# under the document shots, little plucks on each dictation, a lift into the word roller and a bell on the logo.
import sys, os, json
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, os.path.join(H, '..', '_engine', 'audio'))
from synth import *
TL = json.load(open(f'{H}/timeline.json')); M = TL['marks']; C = TL['cuts']
S = Session(TL['dur'], 105, seed=39)
CH = [['F2', 'C3', 'A3', 'E4'], ['D2', 'A2', 'F3', 'C4'], ['A#1', 'F2', 'D3', 'A3'], ['C2', 'G2', 'E3', 'B3']]
def chord(t): return CH[int(t // S.BAR) % 4]
for k, t in S.grid(0, M['logo'], S.BAR): S.add(S.pads, pad([hz(n) * 2 for n in chord(t)], S.BAR + 0.5, bright=2200), t, 0.22)
for k, t in S.grid(C[0], M['logo'], S.B):
    S.add(S.mus, kick(0.6), t, 0.26)
    if k % 2 == 1: S.add(S.mus, clap(), t, 0.09)
    S.add(S.mus, hat(), t + S.E8, 0.05)
for k, t in S.grid(0, M['logo'], S.E8):
    if k % 4 in (0, 3): S.add(S.mus, pluck(hz(chord(t)[2 + k % 2]) * 2, 0.3), t, 0.05, 0.25 * (-1) ** k)
    S.add(S.mus, bass(hz(chord(t)[0]), S.E8 * 0.8, cut=900), t, 0.1)
S.add(S.mus, bell(hz('F5'), 2.5), M['logo'], 0.1)
S.add(S.pads, warmpad([hz(n) * 2 for n in CH[0]], TL['dur'] - M['logo']), M['logo'], 0.35)
S.foley(TL['events'])
S.write(sys.argv[1] if len(sys.argv) > 1 else f'{H}/build/mix_raw.wav', mus_g=0.8, fx_g=1.0, fade=1.2)
