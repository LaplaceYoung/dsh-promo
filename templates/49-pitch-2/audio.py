# Template 49 soundtrack: 123 BPM, bright and bouncy under a purple launch film — a soft intro of pads and plucks on
# the black opening, the beat dropping on the hello, a light four-on-the-floor with offbeat hats and claps through the
# product tour, a tape-stop "rewind" dip, keys and clicks for the typed and spoken text, and a bell on the lock-up.
import sys, os, json
import numpy as np
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, os.path.join(H, '..', '_engine', 'audio'))
from synth import *
TL = json.load(open(f'{H}/timeline.json')); M = TL['marks']; C = TL['cuts']
S = Session(TL['dur'], 123, seed=49)
CH = [['D2', 'A2', 'F#3', 'C#4'], ['B1', 'F#2', 'D3', 'A3'], ['G1', 'D2', 'B2', 'F#3'], ['A1', 'E2', 'C#3', 'E3']]
def chord(t): return CH[int(t // S.BAR) % 4]
END = M['logo']; REW0, REW1 = C[6], M['stop']
quiet = lambda t: REW0 <= t < REW1 + 0.3
for k, t in S.grid(0, END, S.BAR):
    if not quiet(t): S.add(S.pads, pad([hz(n) * 2 for n in chord(t)], S.BAR + 0.4, bright=1700), t, 0.12)
for k, t in S.grid(0, END, S.E8):
    if k % 4 != 3 and not quiet(t): S.add(S.mus, pluck(hz(chord(t)[1 + k % 3]) * 4, 0.22, bright=4200), t, 0.03 if t < C[2] else 0.025, 0.3 * (-1) ** k)
for k, t in S.grid(C[2], END, S.B):
    if quiet(t): continue
    S.add(S.mus, kick() if t >= C[3] else softkick(0.9), t, 0.34 if t >= C[3] else 0.22)
    S.add(S.mus, hat(), t + S.E8, 0.05)
    if k % 2 == 1 and t >= C[3]: S.add(S.mus, clap(), t, 0.11)
for k, t in S.grid(C[3], END, S.E8):
    if not quiet(t): S.add(S.mus, bass(hz(chord(t)[0]), S.E8 * 0.6, cut=900), t, 0.08)
for k, t in S.grid(C[1], C[3], S.E8 / 2): S.add(S.mus, shaker(), t, 0.02)
S.add(S.mus, noise_riser(1.0), C[3] - 1.0, 0.05); S.add(S.mus, impact(), C[3], 0.1)
S.add(S.mus, noise_riser(0.8), C[29] - 0.8, 0.05); S.add(S.mus, impact(), C[29], 0.11)
# tape rewind: a falling noise sweep with a warble, then a stop thump
n = int((REW1 - REW0) * SR); tt = np.arange(n) / SR
sweep = np.sin(2 * np.pi * np.cumsum(220 + 160 * np.sin(tt * 18)) / SR) * 0.4 + np.random.default_rng(49).normal(0, 0.25, n)
S.add(S.fx, sweep * np.exp(-tt * 0.3) * 0.5, REW0, 0.07)
S.add(S.mus, softkick(0.7), REW1, 0.2)
S.add(S.mus, bell(hz('D6'), 3.0), M['word'] + 0.05, 0.09)
S.add(S.pads, warmpad([hz(n) * 2 for n in CH[0]], TL['dur'] - END), END, 0.28)
S.foley(TL['events'])
S.write(sys.argv[1] if len(sys.argv) > 1 else f'{H}/build/mix_raw.wav', mus_g=0.8, fx_g=1.0, fade=1.6)
