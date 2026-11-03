# Template 44 soundtrack: 136 BPM, bright and punchy under a fast re-skin montage — four-on-the-floor kick from the
# first page, offbeat hats, claps on 2 and 4, a bouncing bass, plucked arps that change register with each skin,
# a drop to pads under the horizon cards, and a bell on the logo.
import sys, os, json
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, os.path.join(H, '..', '_engine', 'audio'))
from synth import *
TL = json.load(open(f'{H}/timeline.json')); M = TL['marks']; C = TL['cuts']
S = Session(TL['dur'], 136, seed=44)
CH = [['A1', 'E2', 'C#3', 'E3'], ['F#1', 'C#2', 'A2', 'E3'], ['D2', 'A2', 'F#3', 'A3'], ['E2', 'B2', 'G#3', 'B3']]
def chord(t): return CH[int(t // S.BAR) % 4]
DROP0, DROP1 = C[42], C[44]          # horizon cards: pads only
END = C[46]
def on(t): return not (DROP0 <= t < DROP1) and t < END
for k, t in S.grid(0, END, S.BAR): S.add(S.pads, pad([hz(n) * 2 for n in chord(t)], S.BAR + 0.4, bright=2200), t, 0.12 if on(t) else 0.26)
for k, t in S.grid(C[2], END, S.B):
    if not on(t): continue
    S.add(S.mus, kick(), t, 0.42)
    S.add(S.mus, hat(), t + S.E8, 0.07)
    if k % 2 == 1: S.add(S.mus, clap(), t, 0.16)
for k, t in S.grid(C[2], END, S.E8):
    if on(t): S.add(S.mus, bass(hz(chord(t)[0]) * (2 if k % 4 == 3 else 1), S.E8 * 0.6, cut=900), t, 0.14)
for k, t in S.grid(0, END, S.E8 / 2):
    if on(t) or t < C[2]:
        oc = 4 if (k // 16) % 2 == 0 else 8
        S.add(S.mus, pluck(hz(chord(t)[1 + k % 3]) * oc, 0.18), t, 0.035, 0.35 * (-1) ** k)
for t in (C[0], C[2], C[6], DROP1): S.add(S.mus, impact(), t, 0.14)
S.add(S.mus, bell(hz('E6'), 2.5), M['logo'], 0.12); S.add(S.mus, bell(hz('A6'), 2.0), M['url'], 0.08)
S.add(S.pads, warmpad([hz(n) * 2 for n in CH[0]], TL['dur'] - END), END, 0.3)
S.foley(TL['events'])
S.write(sys.argv[1] if len(sys.argv) > 1 else f'{H}/build/mix_raw.wav', mus_g=0.8, fx_g=1.0, fade=1.0)
