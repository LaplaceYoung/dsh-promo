# Template 31 soundtrack: 110 BPM, bouncy and bright — a drum-machine groove (kick, snare, hats) that starts with the
# speaker-timeline shot, plucked chords, quicker hits through the closing montage, and a bell on the logo.
import sys, os, json
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, os.path.join(H, '..', '_engine', 'audio'))
from synth import *
TL = json.load(open(f'{H}/timeline.json')); C = TL['cuts']; M = TL['marks']
S = Session(TL['dur'], 110, seed=31); OFF = 0.0
CH = [['A2', 'E3', 'C#4', 'G#4'], ['F#2', 'C#3', 'A3', 'E4'], ['D2', 'A2', 'F#3', 'C#4'], ['E2', 'B2', 'G#3', 'D4']]
def chord(t): return CH[int((t - OFF) // S.BAR) % 4]
for k, t in S.grid(0.0, C[19], S.BAR, OFF): S.add(S.pads, warmpad([hz(n) * 2 for n in chord(t)], S.BAR + 0.6), t, 0.32)
for k, t in S.grid(0.0, C[19], S.E8, OFF):
    if k % 4 != 3: S.add(S.mus, epiano(hz(chord(t)[1 + (k % 3)]) * 2, 0.6), t, 0.11, 0.3 * (-1) ** k)
for k, t in S.grid(M['play'], C[19], S.B, OFF):
    S.add(S.mus, softkick(0.8), t, 0.42); S.add(S.mus, shaker(), t + S.E8, 0.09, 0.3)
    if k % 2 == 1: S.add(S.mus, snare(), t, 0.2)
    if k % 4 == 0: S.add(S.mus, bass(hz(chord(t)[0]), S.B * 1.8, 700), t, 0.32)
S.add(S.pads, warmpad([hz(n) * 2 for n in CH[0]], TL['dur'] - C[19]), C[19], 0.45)
S.add(S.mus, bell(hz('E6'), 2.5), C[19] + 0.15, 0.12)
S.foley(TL['events'])
S.write(sys.argv[1] if len(sys.argv) > 1 else f'{H}/build/mix_raw.wav', mus_g=0.8, fx_g=1.0, fade=0.8)
