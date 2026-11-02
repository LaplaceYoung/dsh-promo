# Template 19 soundtrack: 100 BPM, bright and clean — a plucked synth arpeggio and a soft four-on-the-floor that
# builds while the prompts are typed, a filtered drop for the generated page, and a long chord under the logo.
import sys, os, json
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, os.path.join(H, '..', '_engine', 'audio'))
from synth import *
TL = json.load(open(f'{H}/timeline.json')); C = TL['cuts']; M = TL['marks']
S = Session(TL['dur'], 100, seed=19); OFF = 0.0
CH = [['E3', 'G#3', 'B3', 'D#4'], ['C#3', 'E3', 'G#3', 'B3'], ['A2', 'C#3', 'E3', 'G#3'], ['B2', 'D#3', 'F#3', 'A3']]
def chord(t): return CH[int((t - OFF) // S.BAR) % 4]
for k, t in S.grid(0.0, M['logo2'], S.BAR, OFF): S.add(S.pads, pad([hz(n) for n in chord(t)], S.BAR + 0.4, 1600, 0.4, 0.7), t, 0.26)
for k, t in S.grid(M['bar'], M['logo2'], S.E8 / 2, OFF):
    S.add(S.mus, pluck(hz(chord(t)[k % 4]) * 2, 0.2, 5000), t, 0.06 + 0.03 * (k % 4 == 0), 0.35 * (-1) ** k)
for k, t in S.grid(M['p1'], M['logo2'], S.B, OFF):
    S.add(S.mus, kick(1.0, tone=50, dec=0.14), t, 0.36)
    if k % 2: S.add(S.mus, clap(), t, 0.16, 0.1)
    S.add(S.mus, bass(hz(chord(t)[0]), S.B * 0.6, 1000), t + S.E8, 0.24)
for k, t in S.grid(M['page'], M['logo2'], S.E8, OFF): S.add(S.mus, hat(k % 2 == 1), t, 0.05, 0.3)
S.add(S.mus, noise_riser(1.2, 300, 7000), M['page'] - 1.2, 0.14)
S.add(S.pads, warmpad([hz(n) for n in CH[0]], TL['dur'] - M['logo2']), M['logo2'], 0.42)
S.foley(TL['events'])
S.write(sys.argv[1] if len(sys.argv) > 1 else f'{H}/build/mix_raw.wav', mus_g=0.8, fx_g=1.0, fade=1.4)
