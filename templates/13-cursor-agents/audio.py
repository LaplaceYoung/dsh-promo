# Template 13 soundtrack: 113 BPM, calm and sparse like the reference — soft electric-piano chords, a muted
# pulse that only enters on the long product demo, a short swell before the black end card. Typing uses the
# real CC0 key recordings in _engine/audio/samples (ASSETS.md); everything else is synthesized with numpy.
import sys, os, json
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, os.path.join(H, '..', '_engine', 'audio'))
from synth import *
TL = json.load(open(f'{H}/timeline.json')); C = TL['cuts']; M = TL['marks']
S = Session(TL['dur'], 113, seed=13); OFF = 0.0
SMP = os.path.join(H, '..', '_engine', 'audio', 'samples')
KEYS = [sample(f'{SMP}/{f}') for f in ['fs378085-mech-key.mp3', 'fs766640-key-tactile.mp3', 'fs570754-key-down.mp3']]
KEYS = [k / (abs(k).max() + 1e-9) for k in KEYS]
CH = [['D3', 'F#3', 'A3', 'C#4'], ['B2', 'D3', 'F#3', 'A3'], ['G2', 'B2', 'D3', 'F#3'], ['A2', 'C#3', 'E3', 'G3']]
def chord(t): return CH[int((t - OFF) // S.BAR) % 4]
for k, t in S.grid(0.0, C[7], S.BAR, OFF):
    S.add(S.pads, warmpad([hz(n) for n in chord(t)], S.BAR + 0.6), t, 0.32)
    for j, n in enumerate(chord(t)): S.add(S.mus, bell(hz(n) * 2, 1.6), t + j * S.E8 * 0.5, 0.05, 0.3 * (-1) ** j)
for k, t in S.grid(M['win'], C[7], S.B, OFF):  # muted pulse under the demos
    S.add(S.mus, kick(1.0, tone=46, dec=0.12), t, 0.22)
    S.add(S.mus, bass(hz(chord(t)[0]) / 2, S.B * 0.8, 600), t, 0.2)
for k, t in S.grid(M['x_cols'], C[7], S.E8, OFF):
    if k % 2: S.add(S.mus, hat(False), t, 0.035, 0.3)
S.add(S.mus, noise_riser(1.6, 300, 5000), C[7] - 1.6, 0.12)
S.add(S.pads, warmpad([hz(n) for n in CH[0]], TL['dur'] - C[7]), C[7], 0.42)
S.add(S.mus, bell(hz('D5'), 2.4), M['end'] + 0.1, 0.12)
ev = [e for e in TL['events'] if e['kind'] != 'mechkey']
for i, e in enumerate(x for x in TL['events'] if x['kind'] == 'mechkey'):
    S.add(S.fx, KEYS[i % 3], e['t'], 0.45 * e['g'] / 0.12 * 0.12, 0.12 * (-1) ** i)
S.foley(ev)
S.write(sys.argv[1] if len(sys.argv) > 1 else f'{H}/build/mix_raw.wav', mus_g=0.8, fx_g=1.0, fade=0.8)
