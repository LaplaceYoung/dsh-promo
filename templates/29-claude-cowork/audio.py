# Template 29 soundtrack: 110 BPM, bright and light — felt-piano chords, a soft kick and shaker from the first UI shot,
# a quieter stretch while the notes are organised, and a bell on the logo.
import sys, os, json
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, os.path.join(H, '..', '_engine', 'audio'))
from synth import *
TL = json.load(open(f'{H}/timeline.json')); C = TL['cuts']; M = TL['marks']
S = Session(TL['dur'], 110, seed=29); OFF = 0.0
CH = [['E2', 'B2', 'G#3', 'D#4'], ['C#2', 'G#2', 'E3', 'B3'], ['A1', 'E2', 'C#3', 'G#3'], ['B1', 'F#2', 'D#3', 'A3']]
def chord(t): return CH[int((t - OFF) // S.BAR) % 4]
for k, t in S.grid(0.0, M['logo'], S.BAR, OFF): S.add(S.pads, warmpad([hz(n) * 2 for n in chord(t)], S.BAR + 0.8), t, 0.38)
for k, t in S.grid(0.0, C[12], S.E8, OFF):
    if k % 4 != 3: S.add(S.mus, epiano(hz(chord(t)[1 + (k % 3)]) * 2, 0.8), t, 0.11, 0.3 * (-1) ** k)
for k, t in S.grid(C[0], C[12], S.B, OFF):
    quiet = C[4] <= t < C[5]
    S.add(S.mus, softkick(0.6), t, 0.18 if quiet else 0.38)
    if not quiet: S.add(S.mus, shaker(), t + S.E8, 0.07, 0.3)
    if k % 4 == 0: S.add(S.mus, bass(hz(chord(t)[0]), S.B * 1.8, 600), t, 0.3)
S.add(S.mus, reverse_swell(hz('E3'), 1.4), M['logo'] - 1.4, 0.2)
S.add(S.pads, warmpad([hz(n) * 2 for n in CH[0]], TL['dur'] - M['logo']), M['logo'] - 0.2, 0.45)
S.add(S.mus, bell(hz('B5'), 2.5), M['logo'], 0.12)
S.foley(TL['events'])
S.write(sys.argv[1] if len(sys.argv) > 1 else f'{H}/build/mix_raw.wav', mus_g=0.8, fx_g=1.0, fade=0.8)
