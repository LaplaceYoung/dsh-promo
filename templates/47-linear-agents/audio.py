# Template 47 soundtrack: 144 BPM, sleek and driving under a dark product take — a tight kick and offbeat hats, a
# rolling 16th bass, airy pads, glassy plucks on the list and thread, soft UI clicks and keys, a lift into the
# rotating title words and a long bell on the lock-up.
import sys, os, json
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, os.path.join(H, '..', '_engine', 'audio'))
from synth import *
TL = json.load(open(f'{H}/timeline.json')); M = TL['marks']; C = TL['cuts']
S = Session(TL['dur'], 144, seed=47)
CH = [['E2', 'B2', 'G3', 'D4'], ['C2', 'G2', 'E3', 'B3'], ['G1', 'D2', 'B2', 'F#3'], ['D2', 'A2', 'F#3', 'C#4']]
def chord(t): return CH[int(t // S.BAR) % 4]
END = M['logo']
for k, t in S.grid(0, END, S.BAR): S.add(S.pads, pad([hz(n) * 2 for n in chord(t)], S.BAR + 0.4, bright=1500), t, 0.13)
for k, t in S.grid(M['list'], END, S.B):
    S.add(S.mus, softkick(0.9) if t < C[6] else kick(), t, 0.26 if t < C[6] else 0.34)
    S.add(S.mus, hat(), t + S.E8, 0.05)
    if k % 2 == 1 and t >= C[6]: S.add(S.mus, clap(), t, 0.12)
for k, t in S.grid(M['list'], END, S.E8 / 2): S.add(S.mus, bass(hz(chord(t)[0]), S.E8 * 0.4, cut=800), t, 0.07)
for k, t in S.grid(0, END, S.E8):
    if k % 3 != 1: S.add(S.mus, pluck(hz(chord(t)[1 + k % 3]) * 4, 0.2, bright=4000), t, 0.03, 0.35 * (-1) ** k)
S.add(S.mus, noise_riser(1.2), C[6] - 1.2, 0.05); S.add(S.mus, impact(), C[6], 0.12)
S.add(S.mus, bell(hz('E6'), 3.0), M['logo'] + 0.1, 0.09)
S.add(S.pads, warmpad([hz(n) * 2 for n in CH[0]], TL['dur'] - END), END, 0.28)
S.foley(TL['events'])
S.write(sys.argv[1] if len(sys.argv) > 1 else f'{H}/build/mix_raw.wav', mus_g=0.8, fx_g=1.0, fade=1.6)
