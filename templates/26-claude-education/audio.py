# Template 26 soundtrack: 90 BPM, calm and warm — soft pad, plucked arpeggio, light shaker; a low kick only
# after the drop, and the bed thins out for the closing card.
import sys, os, json
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, os.path.join(H, '..', '_engine', 'audio'))
from synth import *
TL = json.load(open(f'{H}/timeline.json')); C = TL['cuts']; M = TL['marks']
S = Session(TL['dur'], 90, seed=26); OFF = 0.0
CH = [['E3', 'B3', 'G#4', 'D#5'], ['C#3', 'G#3', 'E4', 'B4'], ['A2', 'E3', 'C#4', 'G#4'], ['B2', 'F#3', 'D#4', 'A4']]
def chord(t): return CH[int((t - OFF) // S.BAR) % 4]
for k, t in S.grid(0.0, M['close'], S.BAR, OFF): S.add(S.pads, warmpad([hz(n) for n in chord(t)], S.BAR + 0.8), t, 0.4)
for k, t in S.grid(0.0, M['close'], S.E8, OFF): S.add(S.mus, pluck(hz(chord(t)[k % 4]), 0.4, 3600), t, 0.12, 0.3 * (-1) ** k)
for k, t in S.grid(C[0], M['close'], S.B, OFF):
    S.add(S.mus, softkick(0.7), t, 0.45); S.add(S.mus, shaker(), t + S.E8, 0.08, 0.3)
    if k % 4 == 0: S.add(S.mus, bass(hz(chord(t)[0]) / 2, S.B * 1.8, 700), t, 0.35)
S.add(S.pads, warmpad([hz(n) for n in CH[0]], TL['dur'] - M['close'] + 0.3), M['close'], 0.4)
S.add(S.mus, bell(hz('B5'), 2.0), M['back'], 0.1)
S.foley(TL['events'])
S.write(sys.argv[1] if len(sys.argv) > 1 else f'{H}/build/mix_raw.wav', mus_g=0.8, fx_g=1.0, fade=0.3)
