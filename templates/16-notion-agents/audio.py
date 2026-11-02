# Template 16 soundtrack: 120 BPM, light and playful like the reference — plucked "guitar" chords on the
# off-beats, a bouncy bass, claps and shakers; the beat thins out on the thinking card and the waveform,
# and resolves on the logo. numpy/scipy only.
import sys, os, json
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, os.path.join(H, '..', '_engine', 'audio'))
from synth import *
TL = json.load(open(f'{H}/timeline.json')); C = TL['cuts']; M = TL['marks']
S = Session(TL['dur'], 120, seed=16); OFF = C[0]
CH = [['G2', 'B2', 'D3', 'G3'], ['E2', 'G2', 'B2', 'E3'], ['C2', 'E2', 'G2', 'C3'], ['D2', 'F#2', 'A2', 'D3']]
def chord(t): return CH[int(max(0, t - OFF) // S.BAR) % 4]
QUIET = [(C[7], C[8]), (C[16], C[17]), (C[20], C[21])]
def quiet(t): return any(a <= t < b for a, b in QUIET)
S.add(S.mus, bell(hz('G4'), 1.5), M['logo'], 0.12)
for k, t in S.grid(OFF, C[25], S.B, OFF):
    q = quiet(t)
    if not q: S.add(S.mus, kick(1.0, tone=52, dec=0.13), t, 0.4)
    if not q and k % 2: S.add(S.mus, clap(), t, 0.2, 0.1)
    S.add(S.mus, bass(hz(chord(t)[0 if k % 2 == 0 else 2]), S.B * 0.5, 900), t, 0.26 * (0.5 if q else 1))
for k, t in S.grid(OFF, C[25], S.E8, OFF):
    if k % 2:  # off-beat strums
        for j, n in enumerate(chord(t)[1:]): S.add(S.mus, pluck(hz(n) * 2, 0.25, 4500), t + j * 0.012, 0.07, 0.3 * (-1) ** j)
    if not quiet(t): S.add(S.mus, hat(k % 4 == 3), t, 0.05, -0.3)
for k, t in S.grid(OFF, C[25], S.BAR, OFF):
    S.add(S.pads, pad([hz(n) * 2 for n in chord(t)], S.BAR + 0.3, 1800, 0.25, 0.6), t, 0.22)
S.add(S.pads, warmpad([hz(n) for n in CH[0]], TL['dur'] - C[25]), C[25], 0.45)
S.add(S.mus, bell(hz('D5'), 2.0), M['logo2'], 0.14)
S.foley(TL['events'])
S.write(sys.argv[1] if len(sys.argv) > 1 else f'{H}/build/mix_raw.wav', mus_g=0.8, fx_g=1.0, fade=0.8)
