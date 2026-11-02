# Template 08 soundtrack: 97 BPM bright electronic-pop bed (plucked arps, round bass, soft kick, claps),
# entering when the dot becomes a window and resolving on the logo. numpy/scipy only.
import sys, os, json
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, os.path.join(H, '..', '_engine', 'audio'))
from synth import *
TL = json.load(open(f'{H}/timeline.json')); C = TL['cuts']; M = TL['marks']
S = Session(TL['dur'], 97, seed=8); OFF = 0.321
CH = [['E3', 'G#3', 'B3', 'D#4'], ['C#3', 'E3', 'G#3', 'B3'], ['A2', 'C#3', 'E3', 'G#3'], ['B2', 'D#3', 'F#3', 'A3']]
def chord(t): return CH[int((t - OFF) // S.BAR) % 4]
def bed(a, b, g=1.0, drums=True):
    for k, t in S.grid(a, b, S.B, OFF):
        if drums:
            S.add(S.mus, kick(0.9), t, 0.5 * g)
            if k % 2 == 1: S.add(S.mus, clap(), t, 0.25 * g)
        S.add(S.mus, bass(hz(chord(t)[0]) / 2, 0.45, 800), t, 0.36 * g)
    for k, t in S.grid(a, b, S.E8 / 2, OFF):
        if drums and k % 2 == 0: S.add(S.mus, hat(k % 8 == 4), t, 0.06 * g, 0.3)
        n = chord(t)[[0, 1, 2, 3, 2, 1][k % 6]]
        S.add(S.mus, pluck(hz(n) * 4, 0.2, 4200), t, 0.12 * g, 0.4 if k % 2 else -0.4)
    for k, t in S.grid(a, b, S.BAR, OFF):
        S.add(S.pads, warmpad([hz(n) * 2 for n in chord(t)], min(S.BAR, b - t) + 0.6), t, 0.45 * g)
S.add(S.pads, pad([hz('E4'), hz('B4'), hz('G#5')], M['win'] + 0.4, 2400, 1.2, 0.5), 0.0, 0.4)
S.add(S.mus, reverse_swell(hz('B4'), 1.0), M['win'] - 1.0, 0.35)
bed(M['win'], M['badge'], 0.75, drums=False)
bed(M['badge'], M['mosaic'], 1.0)
S.add(S.mus, noise_riser(1.4, 400, 8000), M['tiny'] - 1.4, 0.25)
bed(M['wdot'], M['spark'], 0.7, drums=False)
S.add(S.pads, pad([hz('E3'), hz('B3'), hz('G#4'), hz('D#5')], TL['dur'] - M['spark'], 2200, 0.05, 2.0), M['spark'], 0.6)
S.add(S.mus, bell(hz('B5'), 2.4), M['spark'], 0.25)
S.foley(TL['events'])
S.write(sys.argv[1] if len(sys.argv) > 1 else f'{H}/build/mix_raw.wav', mus_g=0.8, fx_g=1.3, fade=0.4)
