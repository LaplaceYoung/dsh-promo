# Template 04 soundtrack: 110 BPM ambient pulse (like the reference's quiet synth bed), key clicks on the
# type-on, silence after the logo. numpy/scipy only.
import sys, os, json
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, os.path.join(H, '..', '_engine', 'audio'))
from synth import *
TL = json.load(open(f'{H}/timeline.json')); C = TL['cuts']
S = Session(TL['dur'], 110, seed=4); OFF = 0.136
CH = [['A2', 'E3', 'B3', 'C#4'], ['F#2', 'C#3', 'A3', 'E4'], ['D2', 'A2', 'F#3', 'C#4'], ['E2', 'B2', 'G#3', 'D#4']]
def bed(a, b, g=1.0, pulse=True, bright=900):
    for k, t in S.grid(a, b, S.BAR, OFF):
        ch = CH[k % 4]; d = min(S.BAR, b - t) + 1.0
        S.add(S.pads, pad([hz(n) for n in ch], d, bright, 0.8, 1.0), t, 0.9 * g)
        S.add(S.pads, drone(hz(ch[0]) / 2, d, 400), t, 0.8 * g)
    if pulse:
        for k, t in S.grid(a, b, S.E8, OFF):
            ch = CH[int((t - OFF) // S.BAR) % 4]
            S.add(S.mus, pluck(hz(ch[(k % 3) + 1]) * 2, 0.25, 2200 + 1500 * g), t, (0.22 if k % 2 else 0.32) * g, 0.4 if k % 2 else -0.4)
bed(0, C[0], 0.7)
bed(C[0], C[1], 0.85)
S.add(S.mus, reverse_swell(hz('E4'), 1.0), C[1] - 1.0, 0.4)
S.add(S.pads, pad([hz('A3'), hz('E4'), hz('B4')], C[2] - C[1] + 0.5, 2000, 0.01, 1.0), C[1], 0.7)   # text card: held chord
bed(C[2], C[4], 1.1, bright=1400)
for k, t in S.grid(C[2], C[4], S.B, OFF):
    S.add(S.mus, softkick(0.6), t, 0.35 if (k % 4) == 0 else 0.0)
S.add(S.mus, noise_riser(1.5, 300, 6000), C[4] - 1.5, 0.3)
# type-on section: near silence, a low room tone
n = int((C[5] - C[4]) * SR); S.add(S.pads, lp(rng.standard_normal(n), 200) * 0.02, C[4])
S.add(S.mus, subbass(hz('A1'), 1.6), C[6], 0.6)
S.foley(TL['events'])
S.write(sys.argv[1] if len(sys.argv) > 1 else f'{H}/build/mix_raw.wav', mus_g=0.75, fx_g=2.0, fade=0.3)
