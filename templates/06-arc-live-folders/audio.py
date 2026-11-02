# Template 06 soundtrack: 125 BPM upbeat indie-electronic groove (four-on-the-floor, claps, bass, bright stabs),
# like the reference's bed. It thins out under the meeting shot (where the reference has a voice) and lands on the logo.
import sys, os, json
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, os.path.join(H, '..', '_engine', 'audio'))
from synth import *
TL = json.load(open(f'{H}/timeline.json')); C = TL['cuts']
S = Session(TL['dur'], 125, seed=6); OFF = 0.296 - 0.48 * 0  # beat phase measured from cut 22.856
CH = [['D3', 'F#3', 'A3', 'C#4'], ['B2', 'D3', 'F#3', 'A3'], ['G2', 'B2', 'D3', 'F#3'], ['A2', 'C#3', 'E3', 'G#3']]
def chord(t): return CH[int((t - OFF) // S.BAR) % 4]
def groove(a, b, g=1.0, drums=True, stabs=True):
    for k, t in S.grid(a, b, S.B, OFF):
        if drums:
            S.add(S.mus, kick(1.0), t, 0.55 * g)
            if k % 2 == 1: S.add(S.mus, clap(), t, 0.32 * g)
        ch = chord(t)
        S.add(S.mus, bass(hz(ch[0]) / 2, 0.2, 900), t + S.E8, 0.42 * g)
    for k, t in S.grid(a, b, S.E8, OFF):
        if drums: S.add(S.mus, hat(k % 4 == 2), t, (0.12 if k % 2 else 0.07) * g, 0.3)
        if stabs and k % 8 in (0, 3, 6):
            S.add(S.mus, pluck(hz(chord(t)[1 + k % 3]) * 2, 0.22, 4200), t, 0.22 * g, -0.3 if k % 2 else 0.3)
    for k, t in S.grid(a, b, S.BAR, OFF):
        S.add(S.pads, pad([hz(n) * 2 for n in chord(t)], min(S.BAR, b - t) + 0.4, 1800, 0.05, 0.4), t, 0.5 * g)
S.add(S.mus, noise_riser(0.5, 400, 8000), 0.0, 0.25)
groove(C[0], C[2], 0.8, drums=False)
groove(C[2], C[17], 1.0)
groove(C[17], C[18], 0.45, drums=False, stabs=False)   # meeting shot: bed only (the reference has dialogue here)
S.add(S.mus, noise_riser(1.2, 300, 7000), C[18] - 1.2, 0.3)
groove(C[18], C[22], 1.1)
S.add(S.pads, pad([hz('D3'), hz('A3'), hz('F#4')], TL['dur'] - C[22], 2200, 0.02, 1.6), C[22], 0.7)
S.add(S.mus, subbass(hz('D1'), 1.8), C[22], 0.5)
S.foley(TL['events'])
S.write(sys.argv[1] if len(sys.argv) > 1 else f'{H}/build/mix_raw.wav', mus_g=0.8, fx_g=1.4, fade=0.4)
