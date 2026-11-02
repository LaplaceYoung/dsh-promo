# Template 07 soundtrack: 105 BPM light, plucky pop bed (soft kick, rim, shaker, plucked chords, round bass),
# matching the reference's bright tutorial feel. Plays from the first title card and resolves on the outro face.
import sys, os, json
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, os.path.join(H, '..', '_engine', 'audio'))
from synth import *
TL = json.load(open(f'{H}/timeline.json')); C = TL['cuts']
S = Session(TL['dur'], 105, seed=7); OFF = 0.175
CH = [['C3', 'E3', 'G3', 'B3'], ['A2', 'C3', 'E3', 'G3'], ['F2', 'A2', 'C3', 'E3'], ['G2', 'B2', 'D3', 'F3']]
def chord(t): return CH[int((t - OFF) // S.BAR) % 4]
def bed(a, b, g=1.0, drums=True):
    for k, t in S.grid(a, b, S.B, OFF):
        if drums:
            S.add(S.mus, softkick(1.0), t, (0.5 if k % 2 == 0 else 0.25) * g)
            if k % 2 == 1: S.add(S.mus, rim(), t, 0.22 * g, 0.2)
        S.add(S.mus, bass(hz(chord(t)[0]) / 2, 0.35, 700), t, 0.32 * g)
    for k, t in S.grid(a, b, S.E8, OFF):
        if drums: S.add(S.mus, shaker(), t, (0.08 if k % 2 else 0.05) * g, -0.3)
        n = chord(t)[[0, 2, 1, 3, 2, 1, 3, 2][k % 8]]
        S.add(S.mus, pluck(hz(n) * 4, 0.28, 3800), t, 0.2 * g, 0.35 if k % 2 else -0.35)
    for k, t in S.grid(a, b, S.BAR, OFF):
        S.add(S.pads, warmpad([hz(n) * 2 for n in chord(t)], min(S.BAR, b - t) + 0.6), t, 0.4 * g)
S.add(S.mus, bell(hz('G5'), 1.6), 0.75, 0.25)
S.add(S.pads, pad([hz('C4'), hz('G4'), hz('E5')], C[1] + 0.3, 2000, 0.3, 0.6), 0.2, 0.35)
bed(C[1], C[2], 0.8, drums=False)
bed(C[2], C[15], 1.0)
bed(C[15], C[16], 0.7, drums=False)
S.add(S.pads, pad([hz('C3'), hz('G3'), hz('E4'), hz('B4')], TL['dur'] - C[16], 1800, 0.05, 2.0), C[16], 0.7)
S.add(S.mus, bell(hz('E5'), 2.5), C[16], 0.2); S.add(S.mus, bell(hz('C6'), 2.5), TL['outro']['logo'], 0.2)
S.foley(TL['events'])
S.write(sys.argv[1] if len(sys.argv) > 1 else f'{H}/build/mix_raw.wav', mus_g=0.8, fx_g=1.4, fade=0.5)
