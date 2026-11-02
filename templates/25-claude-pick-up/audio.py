# Template 25 soundtrack: 100 BPM, light and airy — felt-piano arpeggios over a soft pad, brushed shaker,
# a gentle kick that enters when the meeting cards float up.
import sys, os, json
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, os.path.join(H, '..', '_engine', 'audio'))
from synth import *
TL = json.load(open(f'{H}/timeline.json')); C = TL['cuts']; M = TL['marks']
S = Session(TL['dur'], 100, seed=25); OFF = 0.0
CH = [['D3', 'A3', 'F#4', 'C#5'], ['B2', 'F#3', 'D4', 'A4'], ['G2', 'D3', 'B3', 'F#4'], ['A2', 'E3', 'C#4', 'G4']]
def chord(t): return CH[int((t - OFF) // S.BAR) % 4]
for k, t in S.grid(0.0, M['logo'], S.BAR, OFF): S.add(S.pads, warmpad([hz(n) for n in chord(t)], S.BAR + 0.8), t, 0.4)
for k, t in S.grid(C[0], M['logo'], S.E8, OFF):
    if k % 4 != 3: S.add(S.mus, epiano(hz(chord(t)[(k * 3) % 4]), 0.9), t, 0.13, 0.3 * (-1) ** k)
for k, t in S.grid(M['float'], C[1], S.B, OFF):
    S.add(S.mus, softkick(0.7), t, 0.45); S.add(S.mus, shaker(), t + S.E8, 0.09, 0.3)
    if k % 4 == 0: S.add(S.mus, bass(hz(chord(t)[0]) / 2, S.B * 1.8, 700), t, 0.35)
S.add(S.pads, warmpad([hz(n) for n in CH[0]], TL['dur'] - M['logo']), M['logo'] - 0.3, 0.45)
S.add(S.mus, bell(hz('A5'), 2.5), M['logo'], 0.12)
S.foley(TL['events'])
S.write(sys.argv[1] if len(sys.argv) > 1 else f'{H}/build/mix_raw.wav', mus_g=0.8, fx_g=1.0, fade=0.8)
