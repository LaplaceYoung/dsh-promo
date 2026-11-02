# Template 20 soundtrack: 100 BPM, dark and glossy — a low drone and filtered pads, a bright stab on each shader
# reveal, a restrained beat under the editor, and a long ambient bed for the floating widget.
import sys, os, json
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, os.path.join(H, '..', '_engine', 'audio'))
from synth import *
TL = json.load(open(f'{H}/timeline.json')); C = TL['cuts']; M = TL['marks']
S = Session(TL['dur'], 100, seed=20); OFF = 0.0
CH = [['C#2', 'G#2', 'B2', 'E3'], ['A1', 'E2', 'G#2', 'C#3'], ['F#1', 'C#2', 'E2', 'A2'], ['B1', 'F#2', 'A2', 'D#3']]
def chord(t): return CH[int((t - OFF) // S.BAR) % 4]
S.add(S.pads, drone(hz('C#1'), M['logo'], 450), 0.0, 0.35)
for k, t in S.grid(0.0, M['logo'], S.BAR, OFF): S.add(S.pads, pad([hz(n) * 2 for n in chord(t)], S.BAR + 0.6, 900 + 500 * (t > M['editor']), 0.6, 0.9), t, 0.28)
for t in [M['neon'], C[0], C[1]]: S.add(S.mus, pad([hz(n) * 4 for n in chord(t)], 1.2, 4000, 0.01, 0.9), t, 0.18); S.add(S.mus, impact(), t, 0.25)
for k, t in S.grid(M['zoom'], C[3], S.B, OFF):
    S.add(S.mus, kick(1.0, tone=44, dec=0.16), t, 0.3)
    if k % 2: S.add(S.mus, rim(), t, 0.08, 0.2)
    S.add(S.mus, bass(hz(chord(t)[0]), S.B * 0.8, 700), t, 0.22)
for k, t in S.grid(M['zoom'], C[3], S.E8, OFF): S.add(S.mus, hat(k % 4 == 2), t, 0.035, 0.3)
for k, t in S.grid(M['float'], M['out'], S.E8 * 2, OFF): S.add(S.mus, bell(hz(chord(t)[k % 4]) * 4, 1.4, 1.5), t, 0.025, 0.4 * (-1) ** k)
S.add(S.pads, warmpad([hz(n) for n in CH[0]], TL['dur'] - M['logo'] + 0.5), M['logo'] - 0.5, 0.4)
S.foley(TL['events'])
S.write(sys.argv[1] if len(sys.argv) > 1 else f'{H}/build/mix_raw.wav', mus_g=0.8, fx_g=1.0, fade=1.2)
