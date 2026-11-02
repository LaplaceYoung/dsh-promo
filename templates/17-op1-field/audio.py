# Template 17 soundtrack: 110 BPM — a soft analog-style pad and a quiet arpeggio under the macro shots, a fuller
# beat under the hero shot, then a long tail into the light leak. Key presses are real CC0 recordings
# (Freesound, see ASSETS.md); everything else is synthesized with numpy.
import sys, os, json
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, os.path.join(H, '..', '_engine', 'audio'))
from synth import *
TL = json.load(open(f'{H}/timeline.json')); C = TL['cuts']; M = TL['marks']
S = Session(TL['dur'], 110, seed=17); OFF = C[0]
SMP = os.path.join(H, '..', '_engine', 'audio', 'samples')
KEYS = [sample(f'{SMP}/{f}') for f in ['fs378085-mech-key.mp3', 'fs766640-key-tactile.mp3', 'fs570754-key-down.mp3']]
CH = [['F2', 'A2', 'C3', 'E3'], ['D2', 'F2', 'A2', 'C3'], ['A#1', 'D2', 'F2', 'A2'], ['C2', 'E2', 'G2', 'A#2']]
def chord(t): return CH[int(max(0, t - OFF) // S.BAR) % 4]
S.add(S.pads, drone(hz('F1'), C[0] + 1.0, 400), 0.0, 0.35)
for k, t in S.grid(C[0], C[7], S.BAR, OFF):
    S.add(S.pads, warmpad([hz(n) for n in chord(t)], S.BAR + 0.8), t, 0.45)
for k, t in S.grid(C[3], C[7], S.E8 / 2, OFF):  # quiet 16th arpeggio
    S.add(S.mus, pluck(hz(chord(t)[k % 4]) * 4, 0.18, 3500), t, 0.05 + 0.03 * (k % 4 == 0), 0.4 * (-1) ** k)
S.add(S.mus, noise_riser(1.4, 300, 6000), C[7] - 1.4, 0.18)
for k, t in S.grid(C[7], 25.5, S.B, OFF):
    S.add(S.mus, kick(1.0, tone=48, dec=0.2), t, 0.5)
    if k % 2: S.add(S.mus, snare(), t, 0.22, 0.1)
    S.add(S.mus, bass(hz(chord(t)[0]), S.B * 0.9, 900), t, 0.32)
for k, t in S.grid(C[7], 25.5, S.E8, OFF):
    S.add(S.mus, hat(k % 4 == 2), t, 0.07, 0.25)
    S.add(S.mus, pluck(hz(chord(t)[(k * 2) % 4]) * 2, 0.3), t, 0.1, -0.3 * (-1) ** k)
for k, t in S.grid(C[7], 25.5, S.BAR, OFF):
    S.add(S.pads, pad([hz(n) * 2 for n in chord(t)], S.BAR + 0.5, 2200, 0.2, 0.6), t, 0.35)
S.add(S.pads, warmpad([hz(n) for n in CH[0]], TL['dur'] - 25.5), 25.5, 0.4)
ev = [e for e in TL['events'] if e['kind'] != 'mechkey']
for i, e in enumerate(x for x in TL['events'] if x['kind'] == 'mechkey'):
    S.add(S.fx, KEYS[i % 3] / (abs(KEYS[i % 3]).max() + 1e-9), e['t'], 0.5 * e['g'], 0.15 * (-1) ** i)
for i, t in enumerate([M['pill'] + 0.3 + j * 0.13 for j in range(10)]):  # a short burst of typing as the text lands
    if t < M['pol']: S.add(S.fx, KEYS[i % 3] / (abs(KEYS[i % 3]).max() + 1e-9), t, 0.12, 0.3 * (-1) ** i)
S.foley(ev)
S.write(sys.argv[1] if len(sys.argv) > 1 else f'{H}/build/mix_raw.wav', mus_g=0.8, fx_g=1.0, fade=0.8)
