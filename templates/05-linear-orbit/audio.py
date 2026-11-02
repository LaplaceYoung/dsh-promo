# Template 05 soundtrack: pen-on-paper foley alone for the first 9.4 s (as in the reference), then a soft
# 123 BPM felt-piano and pad bed that fades out under the info lines. numpy/scipy only.
import sys, os, json
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, os.path.join(H, '..', '_engine', 'audio'))
from synth import *
TL = json.load(open(f'{H}/timeline.json')); C = TL['cuts']; Mk = TL['marks']
S = Session(TL['dur'], 123, seed=5); OFF = Mk['music_in']
CH = [['C3', 'G3', 'D4', 'E4'], ['A2', 'E3', 'B3', 'C4'], ['F2', 'C3', 'G3', 'A3'], ['G2', 'D3', 'A3', 'B3']]
n = int(S.D * SR); S.add(S.pads, lp(rng.standard_normal(n), 300) * 0.012, 0)          # room tone
for k, t in S.grid(OFF, 26.0, S.BAR, OFF):
    ch = CH[k % 4]; g = 1.0 if t < 22 else 0.5
    S.add(S.pads, warmpad([hz(x) for x in ch[:3]], S.BAR + 0.8, 0.6, 1.0), t, 0.9 * g)
    for j, x in enumerate(ch): S.add(S.mus, epiano(hz(x) * 2, 1.8), t + j * S.E8 * 1.5, 0.35 * g, (j - 1.5) * 0.25)
for k, t in S.grid(OFF, 23.0, S.E8, OFF):
    S.add(S.mus, pluck(hz(CH[int((t - OFF) // S.BAR) % 4][k % 4]) * 4, 0.2, 3000), t, 0.12 if k % 2 else 0.2, 0.5 if k % 2 else -0.5)
for k, t in S.grid(10.6, 21.0, S.B, OFF):
    S.add(S.mus, softkick(0.5), t, 0.35)
S.add(S.mus, reverse_swell(hz('G4'), 1.0), C[-1] - 1.0, 0.35)
S.add(S.mus, bell(hz('E5'), 2.5, 0.8) * 0.2, C[-1])
S.foley(TL['events'])
S.write(sys.argv[1] if len(sys.argv) > 1 else f'{H}/build/mix_raw.wav', mus_g=0.7, fx_g=2.2, fade=2.0)
