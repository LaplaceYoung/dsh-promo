# Template 09 soundtrack: 136 BPM playful collage groove — plucky marimba-like stabs, tight kick/rim, bass,
# glitch ticks on the shatter and the tear, a drop to a sparse bed under the typed line. numpy/scipy only.
import sys, os, json
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, os.path.join(H, '..', '_engine', 'audio'))
from synth import *
TL = json.load(open(f'{H}/timeline.json')); C = TL['cuts']; M = TL['marks']
S = Session(TL['dur'], 136, seed=9); OFF = 0.417
CH = [['D3', 'F3', 'A3', 'C4'], ['A#2', 'D3', 'F3', 'A3'], ['F2', 'A2', 'C3', 'E3'], ['C3', 'E3', 'G3', 'A#3']]
def chord(t): return CH[int((t - OFF) // S.BAR) % 4]
def bed(a, b, g=1.0, drums=True, stabs=True):
    for k, t in S.grid(a, b, S.B, OFF):
        if drums:
            S.add(S.mus, kick(0.9, dec=0.12), t, (0.5 if k % 2 == 0 else 0.3) * g)
            if k % 2 == 1: S.add(S.mus, rim(), t, 0.25 * g, -0.2)
        if k % 2 == 0: S.add(S.mus, bass(hz(chord(t)[0]) / 2, 0.3, 900), t, 0.35 * g)
    for k, t in S.grid(a, b, S.E8, OFF):
        if drums: S.add(S.mus, shaker(), t, 0.06 * g, 0.3)
        if stabs and k % 8 in (0, 3, 5, 6):
            S.add(S.mus, pluck(hz(chord(t)[k % 4]) * 4, 0.18, 3200), t, 0.22 * g, -0.35 if k % 2 else 0.35)
    for k, t in S.grid(a, b, S.BAR, OFF):
        S.add(S.pads, pad([hz(n) * 2 for n in chord(t)], min(S.BAR, b - t) + 0.3, 1400, 0.1, 0.5), t, 0.3 * g)
bed(M['word'], C[3], 0.6, drums=False)
bed(C[3], C[14], 1.0)
bed(C[14], C[15], 0.4, drums=False, stabs=False)
bed(C[15], M['field'], 0.9)
bed(M['field'], M['fieldOut'], 1.15)
S.add(S.mus, noise_riser(1.2, 300, 7000), M['field'] - 1.2, 0.25)
bed(M['fieldOut'], C[17], 0.8)
bed(C[17], M['url'], 0.45, drums=False)
S.add(S.pads, pad([hz('D3'), hz('A3'), hz('F4'), hz('C5')], TL['dur'] - M['url'], 1800, 0.05, 2.0), M['url'], 0.55)
S.foley(TL['events'])
S.write(sys.argv[1] if len(sys.argv) > 1 else f'{H}/build/mix_raw.wav', mus_g=0.8, fx_g=1.3, fade=0.6)
