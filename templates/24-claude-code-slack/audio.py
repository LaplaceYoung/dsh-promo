# Template 24 soundtrack: 93 BPM, bright and friendly — plucked guitar-like arpeggios, a soft kick and shaker,
# a warm pad; drums drop out for the status card and come back for the session page.
import sys, os, json
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, os.path.join(H, '..', '_engine', 'audio'))
from synth import *
TL = json.load(open(f'{H}/timeline.json')); C = TL['cuts']; M = TL['marks']
S = Session(TL['dur'], 93, seed=24); OFF = 0.0
CH = [['C3', 'G3', 'E4', 'B4'], ['A2', 'E3', 'C4', 'G4'], ['F2', 'C3', 'A3', 'E4'], ['G2', 'D3', 'B3', 'F#4']]
def chord(t): return CH[int((t - OFF) // S.BAR) % 4]
for k, t in S.grid(0.0, M['logo'], S.BAR, OFF): S.add(S.pads, warmpad([hz(n) for n in chord(t)], S.BAR + 0.8), t, 0.35)
for k, t in S.grid(C[0], M['logo'], S.E8, OFF):
    S.add(S.mus, pluck(hz(chord(t)[k % 4]) * 2, 0.35, 4200), t, 0.14, 0.35 * (-1) ** k)
for k, t in S.grid(C[0], M['logo'], S.B, OFF):
    if C[1] <= t < C[2]: continue
    S.add(S.mus, softkick(0.8), t, 0.5); S.add(S.mus, shaker(), t + S.E8, 0.1, 0.3)
    if k % 4 == 0: S.add(S.mus, bass(hz(chord(t)[0]), S.B * 1.8, 800), t, 0.35)
S.add(S.pads, warmpad([hz(n) for n in CH[0]], TL['dur'] - M['logo'] + 0.5), M['logo'] - 0.3, 0.45)
S.add(S.mus, bell(hz('E5'), 2.5), M['logo'], 0.12)
S.foley(TL['events'])
S.write(sys.argv[1] if len(sys.argv) > 1 else f'{H}/build/mix_raw.wav', mus_g=0.8, fx_g=1.0, fade=0.8)
