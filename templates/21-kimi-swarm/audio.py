# Template 21 soundtrack: 112 BPM driving electronic — a pulsing bass and tight hats under the fast cuts, an
# airy pad over the planet shots, a breakdown under the tile wall and a short tail on the end card.
import sys, os, json
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, os.path.join(H, '..', '_engine', 'audio'))
from synth import *
TL = json.load(open(f'{H}/timeline.json')); C = TL['cuts']; M = TL['marks']
S = Session(TL['dur'], 112, seed=21); OFF = C[0]
CH = [['D2', 'A2', 'C3', 'F3'], ['A#1', 'F2', 'A2', 'D3'], ['F1', 'C2', 'F2', 'A2'], ['C2', 'G2', 'A#2', 'E3']]
def chord(t): return CH[int(max(0, t - OFF) // S.BAR) % 4]
S.add(S.pads, warmpad([hz(n) * 2 for n in CH[0]], C[3] + 0.5), 0.0, 0.35)
for k, t in S.grid(C[0], C[20], S.BAR, OFF): S.add(S.pads, pad([hz(n) * 2 for n in chord(t)], S.BAR + 0.3, 1800, 0.3, 0.6), t, 0.22)
for k, t in S.grid(C[3], C[20], S.B, OFF):
    brk = C[16] <= t < C[17]
    if not brk: S.add(S.mus, kick(1.0, tone=50, dec=0.13), t, 0.42)
    if not brk and k % 2: S.add(S.mus, snare(), t, 0.16, 0.1)
for k, t in S.grid(C[3], C[20], S.E8 / 2, OFF):
    S.add(S.mus, bass(hz(chord(t)[0]), S.E8 / 2 * 0.8, 800 + 400 * (k % 4 == 0)), t, 0.14)
    if k % 2: S.add(S.mus, hat(False), t, 0.035, 0.3 * (-1) ** k)
for k, t in S.grid(C[16], C[17], S.E8, OFF): S.add(S.mus, pluck(hz(chord(t)[k % 4]) * 4, 0.2, 6000), t, 0.07, 0.4 * (-1) ** k)
S.add(S.mus, noise_riser(1.0, 300, 7000), C[17] - 1.0, 0.15)
S.add(S.pads, warmpad([hz(n) for n in CH[0]], TL['dur'] - C[20]), C[20], 0.42)
S.foley(TL['events'])
S.write(sys.argv[1] if len(sys.argv) > 1 else f'{H}/build/mix_raw.wav', mus_g=0.8, fx_g=1.0, fade=0.6)
