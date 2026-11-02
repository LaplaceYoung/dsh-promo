# Template 32 soundtrack: 85 BPM, calm and airy — a soft pad that changes every bar, slow felt-piano figures, a light
# kick from the first window onwards, a swell into the logo card and a bell.
import sys, os, json
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, os.path.join(H, '..', '_engine', 'audio'))
from synth import *
TL = json.load(open(f'{H}/timeline.json')); C = TL['cuts']; M = TL['marks']
S = Session(TL['dur'], 85, seed=32); OFF = 0.0
CH = [['D2', 'A2', 'F#3', 'C#4'], ['B1', 'F#2', 'D3', 'A3'], ['G1', 'D2', 'B2', 'F#3'], ['A1', 'E2', 'C#3', 'G3']]
def chord(t): return CH[int((t - OFF) // S.BAR) % 4]
for k, t in S.grid(0.0, C[5], S.BAR, OFF): S.add(S.pads, warmpad([hz(n) * 2 for n in chord(t)], S.BAR + 0.8), t, 0.4)
for k, t in S.grid(0.0, C[5], S.E8, OFF):
    if k % 3 != 2: S.add(S.mus, epiano(hz(chord(t)[1 + (k % 3)]) * 2, 0.9), t, 0.1, 0.3 * (-1) ** k)
for k, t in S.grid(C[0], C[5], S.B, OFF):
    S.add(S.mus, softkick(0.6), t, 0.3); S.add(S.mus, shaker(), t + S.E8, 0.06, 0.3)
    if k % 4 == 0: S.add(S.mus, bass(hz(chord(t)[0]), S.B * 1.8, 600), t, 0.28)
S.add(S.mus, reverse_swell(hz('D3'), 1.4), C[5] - 1.4, 0.22)
S.add(S.pads, warmpad([hz(n) * 2 for n in CH[0]], TL['dur'] - C[5]), C[5], 0.45)
S.add(S.mus, bell(hz('A5'), 2.5), M['logo'], 0.12)
S.foley(TL['events'])
S.write(sys.argv[1] if len(sys.argv) > 1 else f'{H}/build/mix_raw.wav', mus_g=0.8, fx_g=1.0, fade=1.0)
