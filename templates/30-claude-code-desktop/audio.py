# Template 30 soundtrack: 90 BPM, quiet and warm — felt-piano figures over a soft pad, a light shaker once the
# code mode opens, a swell into the wipe and a single bell on the logo.
import sys, os, json
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, os.path.join(H, '..', '_engine', 'audio'))
from synth import *
TL = json.load(open(f'{H}/timeline.json')); M = TL['marks']
S = Session(TL['dur'], 90, seed=30); OFF = 0.0
CH = [['F2', 'C3', 'A3', 'E4'], ['D2', 'A2', 'F3', 'C4'], ['A#1', 'F2', 'D3', 'A3'], ['C2', 'G2', 'E3', 'A#3']]
def chord(t): return CH[int((t - OFF) // S.BAR) % 4]
for k, t in S.grid(0.0, M['logo'], S.BAR, OFF): S.add(S.pads, warmpad([hz(n) * 2 for n in chord(t)], S.BAR + 0.8), t, 0.4)
for k, t in S.grid(0.0, M['wipe'], S.E8, OFF):
    if k % 3 != 2: S.add(S.mus, epiano(hz(chord(t)[1 + (k % 3)]) * 2, 0.8), t, 0.12, 0.3 * (-1) ** k)
for k, t in S.grid(M['mode'], M['wipe'], S.B, OFF):
    S.add(S.mus, softkick(0.6), t, 0.3); S.add(S.mus, shaker(), t + S.E8, 0.07, 0.3)
S.add(S.mus, reverse_swell(hz('F3'), 1.2), M['wipe'] - 1.2, 0.2)
S.add(S.pads, warmpad([hz(n) * 2 for n in CH[0]], TL['dur'] - M['wipe']), M['wipe'], 0.45)
S.add(S.mus, bell(hz('C6'), 2.5), M['logo'], 0.12)
S.foley(TL['events'])
S.write(sys.argv[1] if len(sys.argv) > 1 else f'{H}/build/mix_raw.wav', mus_g=0.8, fx_g=1.0, fade=0.8)
