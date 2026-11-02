# Template 15 soundtrack: 138 BPM bright, bouncy electro-pop — punchy kick and claps on the blue word cards,
# plucked chords under the sidebar shots, a broom swish on each tidy, a short lift into the logo. numpy/scipy only.
import sys, os, json
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, os.path.join(H, '..', '_engine', 'audio'))
from synth import *
TL = json.load(open(f'{H}/timeline.json')); C = TL['cuts']; M = TL['marks']
S = Session(TL['dur'], 138, seed=15); OFF = 0.0
CH = [['E3', 'G#3', 'B3', 'D#4'], ['C#3', 'E3', 'G#3', 'B3'], ['A2', 'C#3', 'E3', 'G#3'], ['B2', 'D#3', 'F#3', 'A3']]
def chord(t): return CH[int((t - OFF) // S.BAR) % 4]
def bed(a, b, g=1.0, beat=True):
    for k, t in S.grid(a, b, S.B, OFF):
        if beat: S.add(S.mus, kick(1.0, tone=52, dec=0.16), t, 0.5 * g)
        if beat and k % 2 == 1: S.add(S.mus, clap(), t, 0.25 * g, -0.1)
        S.add(S.mus, bass(hz(chord(t)[0]) / 2, S.E8 * 1.6), t, 0.32 * g)
        S.add(S.mus, bass(hz(chord(t)[0]) / 2, S.E8 * 0.8), t + S.E8, 0.2 * g)
    for k, t in S.grid(a, b, S.E8, OFF):
        if beat: S.add(S.mus, hat(k % 2 == 1), t, 0.08 * g, 0.3)
        S.add(S.mus, pluck(hz(chord(t)[(k * 3) % 4]) * 2, 0.25), t, 0.11 * g, 0.3 * (-1) ** k)
    for k, t in S.grid(a, b, S.BAR, OFF):
        S.add(S.pads, pad([hz(n) for n in chord(t)], min(S.BAR, b - t) + 0.4, 1600, 0.15, 0.5), t, 0.35 * g)
bed(0.0, C[0], 0.8)
bed(C[0], M['logo'] - 0.9, 1.0)
S.add(S.mus, noise_riser(0.9, 500, 8000), M['logo'] - 0.9, 0.22)
bed(M['logo'], TL['dur'] - 0.6, 0.6, beat=False)
S.add(S.mus, bell(hz('E5'), 2.0), M['logo'], 0.15)
S.foley(TL['events'])
S.write(sys.argv[1] if len(sys.argv) > 1 else f'{H}/build/mix_raw.wav', mus_g=0.8, fx_g=1.1, fade=0.5)
