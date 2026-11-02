"""Shared synth + foley kit for dsh-promo templates. numpy/scipy only, no samples.

Usage in a template's audio.py:
    import sys, os; sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', '_engine', 'audio'))
    from synth import *
    S = Session(duration, bpm)       # buffers + grid helpers
    S.add(S.mus, kick(), t) ...
    S.foley(events)                   # [{"kind":..., "t":..., "g":...}]
    S.write(path)
"""
import numpy as np
from scipy.io import wavfile
from scipy.signal import butter, sosfilt, fftconvolve

SR = 48000
rng = np.random.default_rng(11)

def env(n, a, d):
    t = np.arange(n) / SR
    return np.minimum(t / max(a, 1e-5), 1) * np.exp(-t / d)
def adsr(n, a, r):
    t = np.arange(n) / SR; dur = n / SR
    return np.minimum(t / max(a, 1e-4), 1) * np.clip((dur - t) / max(r, 1e-4), 0, 1)
lp = lambda x, f, o=2: sosfilt(butter(o, min(f, SR / 2 - 100), 'lp', fs=SR, output='sos'), x)
hp = lambda x, f, o=2: sosfilt(butter(o, f, 'hp', fs=SR, output='sos'), x)
bp = lambda x, a, b, o=2: sosfilt(butter(o, [a, min(b, SR / 2 - 100)], 'bp', fs=SR, output='sos'), x)

NOTE = {n: i for i, n in enumerate(['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'])}
def hz(name):
    """'A4' -> 440.0, 'F#3' etc."""
    p, o = name[:-1], int(name[-1])
    return 440.0 * 2 ** ((NOTE[p] + 12 * (o + 1) - 69) / 12)

# ---------- instruments ----------
def kick(g=1.0, tone=46, punch=150, dec=0.17):
    n = int(0.42 * SR); t = np.arange(n) / SR; f = tone + punch * np.exp(-t * 34); ph = 2 * np.pi * np.cumsum(f) / SR
    return np.tanh(1.8 * np.sin(ph) * env(n, 0.0008, dec)) * g + bp(rng.standard_normal(n), 2000, 6000) * env(n, 0.0002, 0.004) * 0.3
def softkick(g=1.0):
    return lp(kick(g, 42, 90, 0.22), 400)
def clap():
    n = int(0.3 * SR); x = bp(rng.standard_normal(n), 900, 4200); e = np.zeros(n)
    for k, o in enumerate([0, 0.009, 0.019, 0.028]):
        i = int(o * SR); e[i:] += env(n - i, 0.0003, 0.01 if k < 3 else 0.11)
    return x * e * 1.1
def snare(g=1.0):
    n = int(0.25 * SR); t = np.arange(n) / SR
    body = np.sin(2 * np.pi * (190 + 60 * np.exp(-t * 40)) * t) * env(n, 0.0005, 0.05)
    return (body * 0.7 + bp(rng.standard_normal(n), 1500, 9000) * env(n, 0.0005, 0.08)) * g
def rim():
    n = int(0.06 * SR); t = np.arange(n) / SR
    return (np.sin(2 * np.pi * 1700 * t) * 0.6 + bp(rng.standard_normal(n), 2500, 7000)) * env(n, 0.0002, 0.008)
def hat(op=False):
    n = int((0.25 if op else 0.07) * SR); x = hp(rng.standard_normal(n), 7500, 4); return x * env(n, 0.0004, 0.09 if op else 0.014) * 0.45
def shaker():
    n = int(0.09 * SR); x = bp(rng.standard_normal(n), 5000, 12000); return x * adsr(n, 0.03, 0.05) * 0.3
def saw(f, n, det=0.0):
    t = np.arange(n) / SR; out = 0
    for d in (-det, 0, det):
        ph = (f * (1 + d) * t) % 1; out = out + (2 * ph - 1)
    return out / 3
def tri(f, n):
    t = np.arange(n) / SR; ph = (f * t) % 1; return 4 * np.abs(ph - 0.5) - 1
def sine(f, n, ph=0):
    return np.sin(2 * np.pi * f * np.arange(n) / SR + ph)
def bass(f, dur, cut=1300):
    n = int(dur * SR); x = saw(f, n, 0.004) * 0.7 + sine(f, n) * 0.6
    dk = np.exp(-np.arange(n) / SR * 18); x = lp(x, cut) * dk + lp(x, 360) * (1 - dk); return np.tanh(1.4 * x) * env(n, 0.003, dur * 0.8) * 0.55
def subbass(f, dur):
    n = int(dur * SR); return np.tanh(1.2 * sine(f, n)) * adsr(n, 0.01, 0.08) * 0.6
def pluck(f, dur=0.3, bright=5500):
    n = int(dur * SR); x = saw(f, n, 0.006); dk = np.exp(-np.arange(n) / SR * 25); x = lp(x, bright) * dk + lp(x, 1800) * (1 - dk); return x * env(n, 0.002, 0.12) * 0.28
def epiano(f, dur=1.2):
    n = int(dur * SR); t = np.arange(n) / SR
    m = np.sin(2 * np.pi * f * 7 * t) * 1.2 * np.exp(-t * 6)
    return (np.sin(2 * np.pi * f * t + m) * env(n, 0.002, 0.6) + np.sin(2 * np.pi * f * 2 * t) * env(n, 0.002, 0.25) * 0.2) * 0.3
def pad(freqs, dur, bright=1200, a=0.6, r=0.8):
    n = int(dur * SR); x = 0
    for f in freqs: x = x + saw(f, n, 0.008)
    return lp(x / len(freqs), bright) * adsr(n, a, r) * 0.22
def warmpad(freqs, dur, a=1.0, r=1.2):
    n = int(dur * SR); x = 0
    for f in freqs: x = x + tri(f, n) * 0.6 + sine(f * 2, n) * 0.15 + tri(f * 1.003, n) * 0.4
    return lp(x / len(freqs), 2500) * adsr(n, a, r) * 0.22
def drone(f, dur, bright=600):
    n = int(dur * SR); x = saw(f, n, 0.01) + saw(f * 1.5, n, 0.01) * 0.5
    lfo = 0.5 + 0.5 * np.sin(2 * np.pi * 0.15 * np.arange(n) / SR)
    return lp(x, bright) * (0.7 + 0.3 * lfo) * adsr(n, 2.0, 2.0) * 0.18
def noise_riser(dur, f0=300, f1=9000):
    n = int(dur * SR); x = rng.standard_normal(n); out = np.zeros(n); blk = 1024
    for b in range(0, n, blk):
        p = b / n; fc = f0 * (f1 / f0) ** p; out[b:b + blk] = bp(x[b:b + blk], max(fc * 0.5, 40), min(fc * 1.5, 20000))
    return out * np.linspace(0, 1, n) ** 2 * 0.5
def reverse_swell(f, dur=1.2):
    n = int(dur * SR); x = pad([f, f * 1.5, f * 2], dur, 3000, 0.01, 0.01)
    return x * np.linspace(0, 1, n) ** 3 * 3

IR_n = int(2.2 * SR); _IR = rng.standard_normal((IR_n, 2)) * np.exp(-np.arange(IR_n) / SR / 0.55)[:, None]; _IR /= np.abs(_IR).sum(0) * 0.04
def verb(x, mix=0.3, size=1.0):
    if x.ndim == 1: x = np.stack([x, x], 1)
    ir = _IR if size == 1.0 else rng.standard_normal((int(2.2 * size * SR), 2)) * np.exp(-np.arange(int(2.2 * size * SR)) / SR / (0.55 * size))[:, None]
    if size != 1.0: ir = ir / (np.abs(ir).sum(0) * 0.04)
    w = np.stack([fftconvolve(x[:, c], ir[:, c])[:len(x) + len(ir) // 2] for c in (0, 1)], 1)
    out = np.zeros_like(w); out[:len(x)] += x * (1 - mix); out += w * mix; return out

# ---------- foley ----------
def key():
    n = int(0.045 * SR); x = bp(rng.standard_normal(n), 1800 + rng.uniform(-300, 500), 7000); t = np.arange(n) / SR
    body = np.sin(2 * np.pi * rng.uniform(380, 520) * t) * env(n, 0.0003, 0.006)
    return x * env(n, 0.0002, 0.0045) * 1.3 + body * 0.6
def bksp():
    n = int(0.05 * SR); x = bp(rng.standard_normal(n), 1100, 5000); return x * env(n, 0.0002, 0.006) * 1.3
def click():
    n = int(0.05 * SR); t = np.arange(n) / SR; x = bp(rng.standard_normal(n), 2000, 8000) * env(n, 0.0001, 0.003) * 2
    return x + np.sin(2 * np.pi * 3100 * t) * env(n, 0.0002, 0.005) * 0.5
def keycap():
    n = int(0.12 * SR); t = np.arange(n) / SR; body = np.sin(2 * np.pi * (180 + 120 * np.exp(-t * 60)) * t) * env(n, 0.0005, 0.03)
    return body * 0.9 + bp(rng.standard_normal(n), 900, 5000) * env(n, 0.0002, 0.008) * 1.2
def swish(dur=0.42):
    n = int(dur * SR); x = rng.standard_normal(n); out = np.zeros(n); blk = 512
    for b in range(0, n, blk):
        p = b / n; fc = 800 + 5000 * np.sin(np.pi * p); out[b:b + blk] = bp(x[b:b + blk], fc * 0.6, min(fc * 1.6, 20000))
    return out * np.sin(np.pi * np.linspace(0, 1, n)) ** 2 * 0.9
def whoosh_low(dur=0.8):
    n = int(dur * SR); return lp(rng.standard_normal(n), 900) * np.sin(np.pi * np.linspace(0, 1, n)) ** 2 * 0.8
def glitch():
    n = int(0.16 * SR); x = rng.standard_normal(n); step = int(SR / 900); x = np.repeat(x[::step], step)[:n]
    x = np.round(x * 3) / 3; return bp(x, 300, 9000) * env(n, 0.001, 0.06) * 0.8
def pop(f0=600):
    n = int(0.1 * SR); t = np.arange(n) / SR; return np.sin(2 * np.pi * (f0 + 900 * np.exp(-t * 50)) * t) * env(n, 0.0005, 0.03) * 0.8
def blip(f=1200, dur=0.08):
    n = int(dur * SR); return sine(f, n) * env(n, 0.001, dur / 3) * 0.5
def bell(f, dur=2.5, idx=2.0):
    n = int(dur * SR); t = np.arange(n) / SR; m = np.sin(2 * np.pi * f * 1.4 * t) * idx * np.exp(-t * 3)
    return np.sin(2 * np.pi * f * t + m) * env(n, 0.001, 0.7)
def impact():
    n = int(1.8 * SR); t = np.arange(n) / SR; boom = np.sin(2 * np.pi * np.cumsum(34 + 110 * np.exp(-t * 10)) / SR) * env(n, 0.001, 0.55)
    nz = lp(rng.standard_normal(n), 3000) * env(n, 0.001, 0.22) * 0.6; return np.tanh(1.4 * (boom + nz))
def hit():
    n = int(0.3 * SR); t = np.arange(n) / SR
    return np.tanh(2 * np.sin(2 * np.pi * (90 + 200 * np.exp(-t * 40)) * t) * env(n, 0.0005, 0.08)) * 0.8 + bp(rng.standard_normal(n), 1500, 6000) * env(n, 0.0002, 0.02) * 0.5
def tick():
    n = int(0.03 * SR); return hp(rng.standard_normal(n), 5000) * env(n, 0.0002, 0.004) * 0.6
def scratch(dur):
    """pen on paper: band-passed noise with a jittery amplitude"""
    n = int(dur * SR); x = bp(rng.standard_normal(n), 2500, 9000)
    j = np.repeat(rng.uniform(0.3, 1.0, n // 400 + 1), 400)[:n]; return x * j * adsr(n, 0.05, 0.1) * 0.12
def murmur(dur):
    """band-limited 'voice' texture (not speech)"""
    n = int(dur * SR); x = bp(rng.standard_normal(n), 250, 1200)
    am = 0.5 + 0.5 * np.abs(np.sin(np.arange(n) / SR * 2 * np.pi * 3.3)); return x * am * adsr(n, 0.15, 0.15) * 0.08

class Session:
    def __init__(self, dur, bpm, seed=11):
        global rng
        rng = np.random.default_rng(seed)
        self.D = dur; self.N = int(SR * dur); self.bpm = bpm
        self.B = 60 / bpm; self.E8 = self.B / 2; self.E16 = self.B / 4; self.BAR = 4 * self.B
        self.mus = np.zeros((self.N, 2)); self.fx = np.zeros((self.N, 2)); self.pads = np.zeros((self.N, 2))
    def add(self, buf, sig, t, g=1.0, pan=0.0):
        N = self.N; i = int(round(t * SR))
        if i >= N: return
        if sig.ndim == 1: sig = np.stack([sig * (1 - max(pan, 0)), sig * (1 + min(pan, 0))], 1)
        if i < 0: sig = sig[-i:]; i = 0
        n = min(len(sig), N - i)
        if n > 0: buf[i:i + n] += sig[:n] * g
    def grid(self, a, b, step=None, offset=0.0):
        step = step or self.E8
        k0 = int(np.ceil((a - offset) / step - 1e-6)); k1 = int(np.floor((b - offset) / step - 1e-6))
        return [(k, offset + k * step) for k in range(k0, k1 + 1)]
    def foley(self, events, scale=1.0):
        for e in events:
            k, t, g = e['kind'], e['t'], e.get('g', 1.0) * scale
            if g <= 0: continue
            pan = rng.uniform(-0.25, 0.25); fx = self.fx
            if k == 'key': self.add(fx, key(), t, 0.55 * g, pan)
            elif k == 'bksp': self.add(fx, bksp(), t, 0.55 * g, pan)
            elif k == 'click': self.add(fx, click(), t, 0.7 * g, 0.15)
            elif k == 'keycap': self.add(fx, keycap(), t, 0.9 * g)
            elif k == 'swish': self.add(fx, swish(), t - 0.12, 0.55 * g)
            elif k == 'whoosh': self.add(fx, whoosh_low(), t - 0.4, 0.6 * g)
            elif k == 'glitch': self.add(fx, glitch(), t, 0.6 * g)
            elif k == 'pop': self.add(fx, pop(), t, 0.5 * g)
            elif k == 'blip': self.add(fx, blip(e.get('f', 1200)), t, 0.5 * g, pan)
            elif k == 'chime': self.add(fx, verb(bell(1318.5, 1.2, 1.0) * 0.25, 0.4)[:int(1.2 * SR)], t, g)
            elif k == 'impact': self.add(fx, impact(), t, 0.75 * g)
            elif k == 'hit': self.add(fx, hit(), t, 0.6 * g)
            elif k == 'ding': self.add(fx, verb(bell(1046.5, 3.0, 1.6) * 0.55 + bell(2093, 3.0, 0.8) * 0.15, 0.45)[:int(3.0 * SR)], t, g)
            elif k == 'tick': self.add(fx, tick(), t, 0.3 * g)
            elif k == 'scratch': self.add(fx, scratch(e['dur']), t, g, pan)
            elif k == 'murmur': self.add(fx, murmur(e['dur']), t, g)
            elif k == 'riser': self.add(fx, noise_riser(e['dur']), t, 0.5 * g)
    def write(self, path, mus_g=0.62, fx_g=2.2, verb_mix=0.18, fade=0.7):
        mus = verb(self.mus + self.pads, verb_mix)[:self.N]
        mix = mus * mus_g + self.fx * fx_g
        f = np.ones(self.N); nf = int(fade * SR)
        if nf: f[-nf:] = np.linspace(1, 0, nf) ** 1.5
        mix *= f[:, None]; mix = np.tanh(mix * 0.9); mix /= np.max(np.abs(mix)) / 0.9
        wavfile.write(path, SR, (mix * 32767).astype(np.int16))
        print('wrote', path, round(self.D, 3), 's')
