# Template 27 soundtrack: 120 BPM electronic — a pulsing synth bass and arpeggio through the product shots,
# a four-on-the-floor kick for the feature cuts, a breakdown for the light-trail titles, then a wide swell
# into the logo and a long tail.
import sys, os, json
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, os.path.join(H, '..', '_engine', 'audio'))
from synth import *
TL = json.load(open(f'{H}/timeline.json')); C = TL['cuts']; M = TL['marks']
S = Session(TL['dur'], 120, seed=27); OFF = 0.0
CH = [['A1', 'E2', 'C3', 'G3'], ['F1', 'C2', 'A2', 'E3'], ['C2', 'G2', 'E3', 'B3'], ['G1', 'D2', 'B2', 'F#3']]
def chord(t): return CH[int((t - OFF) // S.BAR) % 4]
S.add(S.pads, drone(hz('A1'), C[2], 700), 0.0, 0.35)
for k, t in S.grid(0.0, C[25], S.BAR, OFF): S.add(S.pads, pad([hz(n) * 2 for n in chord(t)], S.BAR + 0.5, 1600), t, 0.3)
for k, t in S.grid(C[2], C[19], S.E8 / 2, OFF):
    S.add(S.mus, pluck(hz(chord(t)[k % 4]) * 4, 0.18, 5200), t, 0.08, 0.4 * (-1) ** k)
for k, t in S.grid(C[2], C[19], S.B, OFF):
    S.add(S.mus, kick(0.9), t, 0.55)
    S.add(S.mus, hat(k % 2 == 1), t + S.E8, 0.07, 0.25)
    S.add(S.mus, bass(hz(chord(t)[0]) * 2, S.B * 0.45, 1200), t + S.E8, 0.3)
    if k % 2: S.add(S.mus, clap(), t, 0.18)
for k, t in S.grid(C[19], C[20], S.B, OFF):
    S.add(S.mus, softkick(0.8), t, 0.4); S.add(S.mus, bass(hz(chord(t)[0]) * 2, S.B * 0.8, 900), t, 0.28)
for k, t in S.grid(C[20], C[24], S.E8, OFF): S.add(S.mus, epiano(hz(chord(t)[k % 4]) * 4, 0.8), t, 0.07, 0.35 * (-1) ** k)
S.add(S.mus, reverse_swell(hz('A3'), 1.6), C[24] - 1.6, 0.3)
S.add(S.pads, pad([hz(n) * 2 for n in CH[0]], TL['dur'] - C[24], 1400, 0.1, 4.0), C[24], 0.45)
S.add(S.mus, bell(hz('E5'), 4.0), C[26], 0.12)
S.foley(TL['events'])
S.write(sys.argv[1] if len(sys.argv) > 1 else f'{H}/build/mix_raw.wav', mus_g=0.8, fx_g=1.0, fade=3.0)
