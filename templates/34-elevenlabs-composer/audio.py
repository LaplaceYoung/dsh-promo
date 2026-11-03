# Template 34 soundtrack: 112 BPM, dark and glossy — a low drone and sub under the titles, then a laid-back beat
# (kick, clap, hats) with an electric-piano riff once the input opens, a filtered breakdown on the waveform field,
# and a long pad tail under the logo.
import sys, os, json
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, os.path.join(H, '..', '_engine', 'audio'))
from synth import *
TL = json.load(open(f'{H}/timeline.json')); M = TL['marks']; C = TL['cuts']
S = Session(TL['dur'], 112, seed=34); OFF = 0.0
CH = [['D2', 'A2', 'F3', 'C4'], ['A#1', 'F2', 'D3', 'A3'], ['F2', 'C3', 'A3', 'E4'], ['C2', 'G2', 'E3', 'A#3']]
def chord(t): return CH[int((t - OFF) // S.BAR) % 4]
S.add(S.pads, drone(hz('D2'), M['ui'] + 1.0), 0.0, 0.35)
for k, t in S.grid(M['ui'], M['logo2'], S.BAR, OFF): S.add(S.pads, warmpad([hz(n) * 2 for n in chord(t)], S.BAR + 0.8), t, 0.3)
for k, t in S.grid(C[1], M['title2'], S.B, OFF):
    S.add(S.mus, kick(0.8), t, 0.34)
    if k % 2 == 1: S.add(S.mus, clap(), t, 0.12)
    S.add(S.mus, hat(), t + S.E8, 0.05, 0.3)
for k, t in S.grid(M['ui'], M['title2'], S.E8, OFF):
    if k % 4 in (0, 3): S.add(S.mus, epiano(hz(chord(t)[1 + (k % 3)]) * 2, 0.6), t, 0.09, 0.3 * (-1) ** k)
for k, t in S.grid(C[1], M['title2'], S.BAR / 2, OFF): S.add(S.mus, bass(hz(chord(t)[0]), S.BAR / 2 * 0.9, cut=900), t, 0.18)
S.add(S.pads, warmpad([hz(n) * 2 for n in CH[0]], TL['dur'] - M['logo2']), M['logo2'], 0.4)
S.add(S.mus, bell(hz('D6'), 3.0), M['end'], 0.1)
S.foley(TL['events'])
S.write(sys.argv[1] if len(sys.argv) > 1 else f'{H}/build/mix_raw.wav', mus_g=0.8, fx_g=1.0, fade=1.2)
