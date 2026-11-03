# Template 33 soundtrack: 114 BPM, light and airy — plucked arpeggios over a soft pad, a soft four-on-the-floor
# from the first window, a breakdown on the "都整理好了" beat, back in for the phone, and a bell on the logo.
import sys, os, json
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, os.path.join(H, '..', '_engine', 'audio'))
from synth import *
TL = json.load(open(f'{H}/timeline.json')); M = TL['marks']; C = TL['cuts']
S = Session(TL['dur'], 114, seed=33); OFF = 0.0
CH = [['A2', 'E3', 'C4', 'G4'], ['F2', 'C3', 'A3', 'E4'], ['C2', 'G2', 'E3', 'B3'], ['G2', 'D3', 'B3', 'F#4']]
def chord(t): return CH[int((t - OFF) // S.BAR) % 4]
for k, t in S.grid(0.0, M['logo'], S.BAR, OFF): S.add(S.pads, warmpad([hz(n) * 2 for n in chord(t)], S.BAR + 0.8), t, 0.32)
for k, t in S.grid(0.3, M['logo'], S.E8, OFF):
    if M['caught'] - 0.2 < t < M['inbox']: continue
    S.add(S.mus, pluck(hz(chord(t)[1 + (k % 3)]) * 2, 0.3), t, 0.10, 0.35 * (-1) ** k)
for k, t in S.grid(M['win'], M['mark'], S.B, OFF):
    if M['caught'] - 0.2 < t < M['inbox']: continue
    S.add(S.mus, softkick(0.7), t, 0.32)
    S.add(S.mus, hat(), t + S.E8, 0.05, 0.25)
for k, t in S.grid(M['win'], M['mark'], S.BAR, OFF):
    S.add(S.mus, bass(hz(chord(t)[0]), S.BAR * 0.9), t, 0.16)
S.add(S.mus, reverse_swell(hz('E4'), 1.0), M['inbox'] - 1.0, 0.15)
S.add(S.pads, warmpad([hz(n) * 2 for n in CH[0]], TL['dur'] - M['mark']), M['mark'], 0.4)
S.add(S.mus, bell(hz('E6'), 2.5), M['logo'], 0.12)
S.foley(TL['events'])
S.write(sys.argv[1] if len(sys.argv) > 1 else f'{H}/build/mix_raw.wav', mus_g=0.8, fx_g=1.0, fade=0.6)
