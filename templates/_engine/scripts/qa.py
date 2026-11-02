"""QA for one rendered template (local only, output goes to <template>/build/qa/).
python3 scripts/qa.py ../03-slug [master.mp4]
 - stills at every planned cut (+0.15 s) and shot midpoint -> contact sheet
 - scdet scan vs planned cuts
 - integrated loudness / true peak
"""
import sys, os, json, subprocess
from PIL import Image, ImageDraw
T = os.path.abspath(sys.argv[1]); meta = json.load(open(f'{T}/meta.json'))
M = sys.argv[2] if len(sys.argv) > 2 else f"{T}/build/{os.path.basename(T)}.mp4"
Q = f'{T}/build/qa'; os.makedirs(Q, exist_ok=True)
cuts = meta['cuts']; dur = meta['dur']
bounds = [0] + cuts + [dur]
ts = sorted(set([round(c + 0.15, 3) for c in cuts] + [round((a + b) / 2, 3) for a, b in zip(bounds, bounds[1:])]))
W = 384; ims = []
for t in ts:
    p = f'{Q}/_s.png'; subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', str(t), '-i', M, '-frames:v', '1', '-vf', f'scale={W}:-2', p]); ims.append((t, Image.open(p).copy()))
h = ims[0][1].height; cols = 5; rows = (len(ims) + cols - 1) // cols
sheet = Image.new('RGB', (cols * W, rows * (h + 16)), 'white'); d = ImageDraw.Draw(sheet)
for i, (t, im) in enumerate(ims):
    x = (i % cols) * W; y = (i // cols) * (h + 16); sheet.paste(im, (x, y + 16)); d.text((x + 3, y + 2), f'{t:.2f}', fill='red')
sheet.save(f'{Q}/stills.png')
out = subprocess.run(['ffmpeg', '-v', 'info', '-i', M, '-vf', 'scale=320:180,scdet=threshold=8', '-an', '-f', 'null', '-'], capture_output=True, text=True).stderr
det = [float(l.split('lavfi.scd.time:')[1].split()[0]) for l in out.splitlines() if 'lavfi.scd.time' in l]
fps = meta['fps']; hit = []; miss = []
for c in cuts:
    m = [x for x in det if abs(x - c) <= 1.5 / fps]
    (hit if m else miss).append(c)
# frame-difference check at each planned cut (catches soft/low-contrast cuts scdet misses)
import numpy as np
raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', M, '-vf', 'scale=160:90,format=gray', '-f', 'rawvideo', '-'], capture_output=True).stdout
fr = np.frombuffer(raw, np.uint8).reshape(-1, 90, 160).astype(np.float32); df = np.abs(np.diff(fr, axis=0)).mean(axis=(1, 2))
confirmed = []; weak = []
for c in cuts:
    i = int(round(c * fps)) - 1
    win = df[max(0, i - 2):i + 3]; j = max(0, i - 2) + int(np.argmax(win)); loc = np.median(df[max(0, j - 12):j + 12]) + 0.05
    (confirmed if df[j] > 3 * loc and df[j] > 1.0 else weak).append((c, round(float(df[j]), 2), round(float(df[j] / loc), 1), round((j + 1) / fps - c, 3)))
eb = subprocess.run(['ffmpeg', '-v', 'info', '-i', M, '-af', 'ebur128=peak=true', '-f', 'null', '-'], capture_output=True, text=True).stderr
I = [l.strip() for l in eb.splitlines() if l.strip().startswith('I:')][-1]
P = [l.strip() for l in eb.splitlines() if l.strip().startswith('Peak:')][-1]
pr = subprocess.run(['ffprobe', '-v', 'error', '-select_streams', 'v', '-show_entries', 'stream=width,height,r_frame_rate,nb_frames', '-show_entries', 'format=duration', '-of', 'json', M], capture_output=True, text=True).stdout
rep = dict(planned=len(cuts), framediff_confirmed=len(confirmed), framediff_weak=weak, max_offset_s=max([abs(x[3]) for x in confirmed] or [0]), detected_match=len(hit), missed_by_scdet=miss, extra=[x for x in det if all(abs(x - c) > 1.5 / fps for c in cuts)], loudness=I, true_peak=P, probe=json.loads(pr))
json.dump(rep, open(f'{Q}/qa.json', 'w'), indent=1)
print(json.dumps({k: v for k, v in rep.items() if k != 'probe'}, ensure_ascii=False)); print(Q + '/stills.png')
