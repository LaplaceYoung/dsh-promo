# Template 10 soundtrack: 87 BPM airy pop — soft kick and finger snaps, round sub bass, bright plucks and
# a shimmering pad; a lift into the lineup, near-silence on the end card, silent black tail. numpy/scipy only.
import sys, os, json
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, os.path.join(H, '..', '_engine', 'audio'))
from synth import *
TL = json.load(open(f'{H}/timeline.json')); C = TL['cuts']; M = TL['marks']
S = Session(TL['dur'], 87, seed=10); OFF = 0.067
CH = [['G2', 'B2', 'D3', 'F#3'], ['E2', 'G2', 'B2', 'D3'], ['C3', 'E3', 'G3', 'B3'], ['D3', 'F#3', 'A3', 'C4']]
def chord(t): return CH[int((t - OFF) // S.BAR) % 4]
def bed(a, b, g=1.0, drums=True):
    for k, t in S.grid(a, b, S.B, OFF):
        if drums:
            S.add(S.mus, softkick(1.0), t, (0.55 if k % 2 == 0 else 0.2) * g)
            if k % 2 == 1: S.add(S.mus, clap(), t, 0.18 * g, 0.15)
        S.add(S.mus, subbass(hz(chord(t)[0]) / 2, 0.5), t, 0.3 * g)
    for k, t in S.grid(a, b, S.E8, OFF):
        if drums: S.add(S.mus, hat(), t, 0.05 * g, -0.3)
        S.add(S.mus, pluck(hz(chord(t)[[0, 2, 3, 1][k % 4]]) * 4, 0.25, 5200), t, 0.15 * g, 0.4 if k % 2 else -0.4)
    for k, t in S.grid(a, b, S.BAR, OFF):
        S.add(S.pads, warmpad([hz(n) * 2 for n in chord(t)], min(S.BAR, b - t) + 0.8), t, 0.45 * g)
bed(C[0], M['ring'], 0.7, drums=False)
bed(M['ring'], C[3], 1.0)
bed(C[3], C[4], 0.6, drums=False)
bed(C[4], C[10], 1.0)
S.add(S.mus, noise_riser(1.0, 400, 9000), C[10] - 1.0, 0.25)
bed(C[10], C[11], 1.15)
bed(C[11], C[12], 0.5, drums=False)
S.add(S.pads, pad([hz('G3'), hz('D4'), hz('B4')], C[13] - C[12], 2200, 0.05, 1.6), C[12], 0.5)
S.add(S.mus, bell(hz('D6'), 2.0), C[12], 0.2)
S.foley(TL['events'])
S.write(sys.argv[1] if len(sys.argv) > 1 else f'{H}/build/mix_raw.wav', mus_g=0.8, fx_g=1.2, fade=0.3)
