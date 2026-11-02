# Template 23 soundtrack: 87 BPM, dark and patient like the reference — a low drone and soft chords,
# a filtered pulse through the diff shots, and a reversed swell into the end line.
import sys, os, json
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, os.path.join(H, '..', '_engine', 'audio'))
from synth import *
TL = json.load(open(f'{H}/timeline.json')); C = TL['cuts']; M = TL['marks']
S = Session(TL['dur'], 87, seed=23); OFF = 0.0
CH = [['D2', 'A2', 'C3', 'F3'], ['A#1', 'F2', 'A2', 'D3'], ['G1', 'D2', 'F2', 'A#2'], ['A1', 'E2', 'G2', 'C3']]
def chord(t): return CH[int((t - OFF) // S.BAR) % 4]
S.add(S.pads, drone(hz('D1'), M['end'], 500), 0.0, 0.45)
for k, t in S.grid(0.0, M['end'], S.BAR, OFF):
    S.add(S.pads, warmpad([hz(n) * 2 for n in chord(t)], S.BAR + 1.0), t, 0.35)
    for j, n in enumerate(chord(t)): S.add(S.mus, epiano(hz(n) * 4, 1.4), t + j * S.B, 0.07, 0.25 * (-1) ** j)
for k, t in S.grid(C[0], C[6], S.B, OFF):
    S.add(S.mus, subbass(hz(chord(t)[0]) * 2, S.B * 0.9), t, 0.3)
    if k % 2: S.add(S.mus, hat(False), t + S.E8, 0.04, 0.3)
for k, t in S.grid(C[2], C[3], S.B * 2, OFF): S.add(S.mus, softkick(0.7), t, 0.35)
S.add(S.mus, reverse_swell(hz('D3'), 1.4), M['end'] - 1.4, 0.25)
S.add(S.pads, warmpad([hz(n) * 2 for n in CH[0]], TL['dur'] - M['end']), M['end'], 0.45)
S.add(S.mus, bell(hz('A5'), 3.0), M['logo'], 0.1)
S.foley(TL['events'])
S.write(sys.argv[1] if len(sys.argv) > 1 else f'{H}/build/mix_raw.wav', mus_g=0.8, fx_g=1.0, fade=1.0)
