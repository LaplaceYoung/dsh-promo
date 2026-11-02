# Template 22 soundtrack: 87.5 BPM, warm and gentle — felt-piano style plucks, a soft pad and brushed hats;
# the paper fold and envelope are real CC0 paper recordings (Freesound, ASSETS.md).
import sys, os, json
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, os.path.join(H, '..', '_engine', 'audio'))
from synth import *
TL = json.load(open(f'{H}/timeline.json')); C = TL['cuts']; M = TL['marks']
S = Session(TL['dur'], 87.5, seed=22); OFF = 0.0
SMP = os.path.join(H, '..', '_engine', 'audio', 'samples')
P1, P2 = [x / (abs(x).max() + 1e-9) for x in (sample(f'{SMP}/fs851276-paper-fold.mp3'), sample(f'{SMP}/fs68224-paper-double.mp3'))]
CH = [['F2', 'C3', 'A3', 'E4'], ['D2', 'A2', 'F3', 'C4'], ['A#1', 'F2', 'D3', 'A3'], ['C2', 'G2', 'E3', 'A#3']]
def chord(t): return CH[int((t - OFF) // S.BAR) % 4]
for k, t in S.grid(0.0, M['logo'], S.BAR, OFF): S.add(S.pads, warmpad([hz(n) for n in chord(t)], S.BAR + 0.8), t, 0.6)
for k, t in S.grid(0.0, M['logo'], S.E8, OFF):
    if k % 3 != 1: S.add(S.mus, epiano(hz(chord(t)[(k * 3) % 4]) * 2, 0.9), t, 0.12, 0.3 * (-1) ** k)
for k, t in S.grid(C[1], C[7], S.B, OFF):
    S.add(S.mus, softkick(0.8), t, 0.55)
    S.add(S.mus, shaker(), t + S.E8, 0.1, 0.3)
    S.add(S.mus, bass(hz(chord(t)[0]), S.B * 0.8, 700), t, 0.4)
S.add(S.pads, warmpad([hz(n) for n in CH[0]], TL['dur'] - M['logo'] + 0.5), M['logo'] - 0.5, 0.4)
S.add(S.mus, bell(hz('C5'), 2.5), M['logo'], 0.1)
ev = [e for e in TL['events'] if e['kind'] not in ('paper', 'paper2')]
for e in TL['events']:
    if e['kind'] == 'paper': S.add(S.fx, P1[:int(1.2 * 48000)] if len(P1) > 1 else P1, e['t'] - 0.05, e['g'] * 0.4)
    if e['kind'] == 'paper2': S.add(S.fx, P2, e['t'], e['g'] * 0.4)
S.foley(ev)
S.write(sys.argv[1] if len(sys.argv) > 1 else f'{H}/build/mix_raw.wav', mus_g=0.8, fx_g=1.0, fade=0.8)
