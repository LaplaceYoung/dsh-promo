# Template 14 soundtrack: 128 BPM clean, playful electronic — bright plucks and a light four-on-the-floor under
# the canvas, the beat drops out on the code wall pull-back and on the black end card. numpy/scipy only.
import sys, os, json
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, os.path.join(H, '..', '_engine', 'audio'))
from synth import *
TL = json.load(open(f'{H}/timeline.json')); C = TL['cuts']; M = TL['marks']
S = Session(TL['dur'], 128, seed=14); OFF = 0.0
CH = [['C3', 'E3', 'G3', 'B3'], ['A2', 'C3', 'E3', 'G3'], ['F2', 'A2', 'C3', 'E3'], ['G2', 'B2', 'D3', 'F3']]
def chord(t): return CH[int((t - OFF) // S.BAR) % 4]
def bed(a, b, g=1.0, beat=True):
    for k, t in S.grid(a, b, S.B, OFF):
        if beat: S.add(S.mus, kick(1.0, tone=50, dec=0.15), t, 0.46 * g)
        if beat and k % 2: S.add(S.mus, clap(), t, 0.2 * g, 0.1)
        S.add(S.mus, bass(hz(chord(t)[0]) / 2, S.B * 0.7), t + S.E8, 0.28 * g)
    for k, t in S.grid(a, b, S.E8, OFF):
        if beat: S.add(S.mus, hat(k % 2 == 1), t, 0.07 * g, 0.3)
        if k % 3 != 2: S.add(S.mus, pluck(hz(chord(t)[k % 4]) * 2, 0.22, 6000), t, 0.11 * g, 0.35 * (-1) ** k)
    for k, t in S.grid(a, b, S.BAR, OFF):
        S.add(S.pads, pad([hz(n) for n in chord(t)], min(S.BAR, b - t) + 0.4, 1500, 0.2, 0.6), t, 0.3 * g)
bed(0.0, C[3], 0.85)
bed(C[3], M['canvas'], 0.5, beat=False); S.add(S.mus, noise_riser(M['canvas'] - C[3], 400, 7000), C[3], 0.15)
bed(M['canvas'], C[8], 1.0)
bed(C[8], C[10], 0.55, beat=False)
S.add(S.mus, bell(hz('C5'), 2.2), M['logo'] + 0.2, 0.16); S.add(S.pads, warmpad([hz(n) for n in CH[0]], TL['dur'] - C[10]), C[10], 0.35)
S.foley(TL['events'])
S.write(sys.argv[1] if len(sys.argv) > 1 else f'{H}/build/mix_raw.wav', mus_g=0.8, fx_g=1.1, fade=0.6)
