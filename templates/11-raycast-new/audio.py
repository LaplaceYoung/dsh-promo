# Template 11 soundtrack: 129 BPM dark, glossy electronic — sub pulses, filtered saw chords, tight hats,
# a short drop around the voice pill, then a sparse ticking bed under the black captions. numpy/scipy only.
import sys, os, json
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, os.path.join(H, '..', '_engine', 'audio'))
from synth import *
TL = json.load(open(f'{H}/timeline.json')); C = TL['cuts']; M = TL['marks']
S = Session(TL['dur'], 129, seed=11); OFF = 1.0
CH = [['A2', 'C3', 'E3', 'G3'], ['F2', 'A2', 'C3', 'E3'], ['D2', 'F2', 'A2', 'C3'], ['E2', 'G#2', 'B2', 'D3']]
def chord(t): return CH[int((t - OFF) // S.BAR) % 4]
def bed(a, b, g=1.0, drums=True, bright=1200):
    for k, t in S.grid(a, b, S.B, OFF):
        if drums: S.add(S.mus, kick(1.0, tone=42, dec=0.2), t, 0.55 * g)
        S.add(S.mus, subbass(hz(chord(t)[0]) / 2, 0.4), t + S.E8, 0.4 * g)
    for k, t in S.grid(a, b, S.E8, OFF):
        if drums: S.add(S.mus, hat(k % 4 == 2), t, (0.09 if k % 2 else 0.05) * g, 0.25)
        if k % 4 == 3 and drums: S.add(S.mus, rim(), t, 0.12 * g, -0.3)
    for k, t in S.grid(a, b, S.BAR, OFF):
        S.add(S.pads, pad([hz(n) for n in chord(t)], min(S.BAR, b - t) + 0.5, bright, 0.2, 0.6), t, 0.55 * g)
        S.add(S.pads, drone(hz(chord(t)[0]) / 2, min(S.BAR, b - t) + 0.5, 300), t, 0.5 * g)
S.add(S.pads, drone(hz('A1'), C[0] + 0.5, 250), 0.0, 0.5)
S.add(S.mus, reverse_swell(hz('E4'), 0.9), C[0] - 0.9, 0.3)
bed(C[0], C[3], 0.7, drums=False, bright=900)
bed(C[3], M['pill'], 1.0, bright=1400)
bed(M['pill'], C[8], 0.55, drums=False, bright=2200)
S.add(S.mus, noise_riser(1.0, 300, 6000), C[8] - 1.0, 0.25)
bed(C[8], C[12], 1.1, bright=1800)
bed(C[12], M['logo'], 0.35, drums=False, bright=700)
for k, t in S.grid(C[12], M['logo'], S.B, OFF): S.add(S.mus, tick(), t, 0.12)
S.add(S.mus, subbass(hz('A1'), 1.8), M['logo'], 0.45)
S.foley(TL['events'])
S.write(sys.argv[1] if len(sys.argv) > 1 else f'{H}/build/mix_raw.wav', mus_g=0.8, fx_g=1.2, fade=0.5)
