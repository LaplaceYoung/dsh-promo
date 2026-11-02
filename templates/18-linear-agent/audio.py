# Template 18 soundtrack: slow (71 BPM) and dark like the reference — a low drone, soft electric-piano chords,
# a sub pulse that only enters for the document and flow shots, and a reversed swell into the end line.
import sys, os, json
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, os.path.join(H, '..', '_engine', 'audio'))
from synth import *
TL = json.load(open(f'{H}/timeline.json')); C = TL['cuts']; M = TL['marks']
S = Session(TL['dur'], 71, seed=18); OFF = 0.0
CH = [['A2', 'E3', 'G3', 'C4'], ['F2', 'C3', 'E3', 'A3'], ['D2', 'A2', 'C3', 'F3'], ['E2', 'B2', 'D3', 'G3']]
def chord(t): return CH[int((t - OFF) // S.BAR) % 4]
S.add(S.pads, drone(hz('A1'), C[6], 500), 0.0, 0.4)
for k, t in S.grid(0.0, C[6], S.BAR, OFF):
    S.add(S.pads, warmpad([hz(n) for n in chord(t)], S.BAR + 1.0), t, 0.3)
    for j, n in enumerate(chord(t)): S.add(S.mus, epiano(hz(n) * 2, 1.6), t + j * S.B * 0.5, 0.06, 0.25 * (-1) ** j)
for k, t in S.grid(C[2], C[5], S.B, OFF):
    S.add(S.mus, subbass(hz(chord(t)[0]), S.B * 0.9), t, 0.22)
    if k % 2: S.add(S.mus, hat(False), t + S.E8, 0.03, 0.3)
S.add(S.mus, reverse_swell(hz('A3'), 1.4), C[6] - 1.4, 0.2)
S.add(S.pads, warmpad([hz(n) for n in CH[0]], TL['dur'] - C[6]), C[6], 0.4)
S.add(S.mus, bell(hz('E5'), 3.0), M['logo'], 0.1)
S.foley(TL['events'])
S.write(sys.argv[1] if len(sys.argv) > 1 else f'{H}/build/mix_raw.wav', mus_g=0.8, fx_g=1.0, fade=1.0)
