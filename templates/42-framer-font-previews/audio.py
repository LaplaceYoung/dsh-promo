# Template 42 soundtrack: 105 BPM, soft and focused under the screen take — warm keys, brushed hats and a light
# kick, quiet UI clicks on every hover; the beat tightens for the word run on black and settles on the logo.
import sys, os, json
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, os.path.join(H, '..', '_engine', 'audio'))
from synth import *
TL = json.load(open(f'{H}/timeline.json')); M = TL['marks']
S = Session(TL['dur'], 105, seed=42)
CH = [['D2', 'A2', 'F#3', 'C#4'], ['B1', 'F#2', 'D3', 'A3'], ['G1', 'D2', 'B2', 'F#3'], ['A1', 'E2', 'C#3', 'G#3']]
def chord(t): return CH[int(t // S.BAR) % 4]
for k, t in S.grid(0, M['logo'], S.BAR): S.add(S.pads, pad([hz(n) * 2 for n in chord(t)], S.BAR + 0.5, bright=1600), t, 0.22)
for k, t in S.grid(0, M['fade0'], S.E8):
    if k % 2 == 0: S.add(S.mus, pluck(hz(chord(t)[1 + (k // 2) % 3]) * 4, 0.25), t, 0.045, 0.3 * (-1) ** k)
for k, t in S.grid(M['z0'], M['fade0'], S.B):
    S.add(S.mus, kick(0.7), t, 0.2)
    if k % 2 == 1: S.add(S.mus, clap(), t, 0.08)
    S.add(S.mus, hat(), t + S.E8, 0.05)
for k, t in S.grid(0, M['logo'], S.E8): S.add(S.mus, bass(hz(chord(t)[0]), S.E8 * 0.7, cut=800), t, 0.1)
for k in range(24):
    t = M['words'] + k * M['step']
    S.add(S.mus, kick(0.85), t, 0.3); S.add(S.mus, hat(), t + 0.25, 0.07)
    if k % 2 == 1: S.add(S.mus, clap(), t, 0.13)
    S.add(S.mus, pluck(hz(chord(t)[1 + k % 3]) * 4, 0.2), t, 0.06)
S.add(S.mus, impact(), M['logo'], 0.26); S.add(S.mus, bell(hz('D6'), 2.5), M['logo'], 0.1)
S.add(S.pads, warmpad([hz(n) * 2 for n in CH[0]], TL['dur'] - M['logo']), M['logo'], 0.35)
S.foley(TL['events'])
S.write(sys.argv[1] if len(sys.argv) > 1 else f'{H}/build/mix_raw.wav', mus_g=0.8, fx_g=1.0, fade=1.0)
