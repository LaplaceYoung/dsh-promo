# Template 12 soundtrack: 130 BPM bright, airy pop — soft kick and claps under the product chapters,
# plucked chords and a warm pad, the beat drops out on each beige chapter card (a bell marks the glyph),
# and a light swell carries the suite line into the logo. numpy/scipy only.
import sys, os, json
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, os.path.join(H, '..', '_engine', 'audio'))
from synth import *
TL = json.load(open(f'{H}/timeline.json')); C = TL['cuts']; M = TL['marks']
S = Session(TL['dur'], 130, seed=12); OFF = C[0]
CH = [['D3', 'F#3', 'A3', 'C#4'], ['B2', 'D3', 'F#3', 'A3'], ['G2', 'B2', 'D3', 'F#3'], ['A2', 'C#3', 'E3', 'G3']]
def chord(t): return CH[int((t - OFF) // S.BAR) % 4]
def full(a, b, g=1.0, beat=True):
    for k, t in S.grid(a, b, S.B, OFF):
        if beat: S.add(S.mus, softkick(), t, 0.5 * g)
        if beat and k % 2 == 1: S.add(S.mus, clap(), t, 0.22 * g, 0.1)
        S.add(S.mus, bass(hz(chord(t)[0]) / 2, S.B * 0.8), t, 0.3 * g)
    for k, t in S.grid(a, b, S.E8, OFF):
        if beat: S.add(S.mus, shaker(), t, 0.06 * g, 0.3)
        if k % 3 != 1: S.add(S.mus, pluck(hz(chord(t)[k % 4]) * 2, 0.35), t, 0.12 * g, 0.25 * (-1) ** k)
    for k, t in S.grid(a, b, S.BAR, OFF):
        S.add(S.pads, warmpad([hz(n) for n in chord(t)], min(S.BAR, b - t) + 0.6), t, 0.4 * g)
def card(t0, t1):  # beige chapter stage: pad only, bell on the glyph
    for k, t in S.grid(t0, t1, S.BAR, OFF): S.add(S.pads, warmpad([hz(n) for n in chord(t)], min(S.BAR, t1 - t) + 0.6), t, 0.35)
S.add(S.pads, warmpad([hz(n) for n in CH[0]], C[0] + 0.5), 0.0, 0.3)
full(C[0], C[2], 0.5, beat=False)
full(C[2], M['conv'], 0.8)
S.add(S.mus, noise_riser(C[3] - M['conv'], 400, 7000), M['conv'], 0.22)
full(M['conv'], C[3], 0.8, beat=False)
card(C[3], M['p1g'])
full(M['p1g'], C[5], 1.0)
card(C[5], C[6]); full(C[6], C[8], 1.0)
card(C[8], C[10]); full(C[10], C[12], 1.0)
card(C[12], C[14]); full(C[14], C[16], 1.0)
full(C[16], M['row'], 0.55, beat=False)
S.add(S.mus, reverse_swell(hz('D4'), 1.0), M['row'] - 1.0, 0.25)
full(M['row'], M['logo2'], 0.8)
for k in ['p1', 'p2icon', 'p3icon', 'p4icon']: S.add(S.mus, bell(hz('A5'), 1.4), M[k], 0.12)
S.add(S.pads, warmpad([hz(n) for n in CH[0]], TL['dur'] - M['logo2']), M['logo2'], 0.35)
S.add(S.mus, bell(hz('D5'), 2.2), M['logo2'], 0.16)
S.foley(TL['events'])
S.write(sys.argv[1] if len(sys.argv) > 1 else f'{H}/build/mix_raw.wav', mus_g=0.8, fx_g=1.1, fade=0.6)
