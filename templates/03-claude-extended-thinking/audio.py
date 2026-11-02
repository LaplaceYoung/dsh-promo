# Template 03 soundtrack: 79 BPM, warm e-piano + soft groove, foley from timeline.json. numpy/scipy only.
import sys, os, json
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, os.path.join(H, '..', '_engine', 'audio'))
from synth import *
TL = json.load(open(f'{H}/timeline.json')); C = TL['cuts']
S = Session(TL['dur'], 79, seed=3); OFF = 0.06
CH = [['F3', 'A3', 'C4', 'E4'], ['E3', 'G3', 'B3', 'D4'], ['D3', 'F3', 'A3', 'C4', 'E4'], ['C3', 'E3', 'G3', 'B3']]
ROOT = ['F2', 'E2', 'D2', 'C2']
def bar(t): return int((t - OFF) // S.BAR) % 4
def chords(a, b, g=1.0, stab=True):
    for k, t in S.grid(a, b, S.BAR, OFF):
        c = CH[k % 4]
        for i, n in enumerate(c): S.add(S.mus, epiano(hz(n), 2.6), t + i * 0.012, 0.5 * g, (i - 2) * 0.15)
        S.add(S.pads, warmpad([hz(n) for n in c[:3]], S.BAR + 0.5, 0.4, 0.8), t, 0.7 * g)
        if stab:
            for j in (3, 7):
                for n in c[1:]: S.add(S.mus, epiano(hz(n) * 2, 0.5), t + j * S.E8, 0.16 * g, 0.3)
def groove(a, b, g=1.0, arp=True):
    for k, t in S.grid(a, b, S.E16, OFF):
        pos = k % 16; c = bar(t)
        if pos in (0, 8): S.add(S.mus, softkick(), t, 0.9 * g)
        if pos == 10: S.add(S.mus, softkick(0.7), t, 0.6 * g)
        if pos in (4, 12): S.add(S.mus, rim(), t, 0.35 * g, 0.2)
        S.add(S.mus, shaker(), t, (0.5 if pos % 2 else 0.28) * g, -0.3)
        if pos in (0, 6, 8): S.add(S.mus, subbass(hz(ROOT[c]), S.E8 * (3 if pos < 8 else 4)), t, 0.55 * g)
        if arp and pos % 2 == 0:
            ns = CH[c]; n = ns[(k // 2) % len(ns)]
            S.add(S.mus, pluck(hz(n) * 2, 0.35, 4000), t, 0.32 * g, 0.35 if (k // 2) % 2 else -0.35)
chords(0.0, C[3] - 0.01)
S.add(S.mus, reverse_swell(hz('F4'), 1.2), C[0] - 1.2, 0.4)
groove(1.6, C[3] - 0.01, 0.9, arp=False)
groove(C[0], C[3] - 0.01, 0.0 + 0.9, arp=True)
# S5 counter: thin to pads only
S.add(S.pads, warmpad([hz('D3'), hz('A3'), hz('E4')], C[4] - C[3] + 0.6, 0.2, 0.6), C[3], 0.9)
chords(C[4], C[6], 1.0)
groove(C[4], C[5] - 0.01, 0.9, arp=False)
S.add(S.mus, hit(), C[5], 0.5); S.add(S.mus, noise_riser(0.9, 500, 7000), C[5] - 0.9, 0.35)
groove(C[5], C[6] - 0.01, 1.05, arp=True)
# ending: back to the start state, one ringing chord
for i, n in enumerate(['F3', 'A3', 'C4', 'E4', 'G4']): S.add(S.mus, epiano(hz(n), 2.0), C[6] + i * 0.015, 0.45)
S.foley(TL['events'])
S.write(sys.argv[1] if len(sys.argv) > 1 else f'{H}/build/mix_raw.wav', mus_g=0.7, fx_g=2.0, fade=0.5)
