#!/usr/bin/env python3
"""master.py in.wav out.wav [target_I] — loudness + true-peak mastering that survives AAC encoding.
Loop: gain -> brickwall limiter (4x oversampled via aresample) -> encode AAC 192k -> measure I / true peak with ebur128.
Adjust gain and ceiling until I is within ±0.5 LU of target and TP <= -1.5 dBTP (after AAC)."""
import subprocess, sys, re, tempfile, os
src, dst = sys.argv[1], sys.argv[2]
TI = float(sys.argv[3]) if len(sys.argv) > 3 else -14.0
TP_MAX = -1.5
def meas(path):
    e = subprocess.run(['ffmpeg', '-hide_banner', '-i', path, '-af', 'ebur128=peak=true', '-f', 'null', '-'], capture_output=True, text=True).stderr
    I = float(re.findall(r'I:\s+(-?[\d.]+) LUFS', e)[-1]); P = float(re.findall(r'Peak:\s+(-?[\d.inf]+) dBFS', e)[-1])
    return I, P
def render(gain_db, ceil_db, out):
    lim = 10 ** (ceil_db / 20)
    af = f'volume={gain_db:.3f}dB,aresample=192000,alimiter=limit={lim:.5f}:attack=0.5:release=40:level=false,aresample=48000'
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', src, '-af', af, '-ar', '48000', out], check=True)
I0, _ = meas(src)
gain, ceil = TI - I0, -2.6
tmp = tempfile.mkdtemp(); aac = os.path.join(tmp, 'a.m4a')
for it in range(6):
    render(gain, ceil, dst)
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', dst, '-c:a', 'aac', '-b:a', '192k', aac], check=True)
    I, P = meas(aac)
    print(f'master pass {it}: gain {gain:+.2f} dB ceil {ceil:.2f} -> I {I:.2f} LUFS, TP(aac) {P:.2f} dBTP')
    ok_i, ok_p = abs(I - TI) <= 0.4, P <= TP_MAX - 0.1
    if ok_i and ok_p: break
    if not ok_p: ceil -= (P - (TP_MAX - 0.3))
    if not ok_i: gain += (TI - I)
print(f'master: {dst} I {I:.2f} LUFS TP {P:.2f} dBTP')
