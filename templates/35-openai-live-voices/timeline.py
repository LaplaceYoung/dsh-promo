# Template 35 timeline — structure of OpenAI "GPT-Live-1.1 has new voices and better accents." (2026), measured at 30 fps.
# One long take on a theatre-like marble wall (a slow drift, one pan) and a single cut to the white end card.
import json, os
H = os.path.dirname(os.path.abspath(__file__))
FPS = 30; DUR = 40.8
CUTS = [34.4]
# subtitle lines: [start, end, speaker index, text]
LINES = [[0.5, 2.6, 0, "好，大家都到了吗？我们开始吧。"], [4.0, 6.5, 0, "先点个名，都能听到吗？"], [6.8, 8.1, 1, "我在。"], [8.5, 10.2, 0, "好，下一位？"],
         [12.0, 14.2, 2, "在，随时可以开始。"], [15.0, 16.6, 2, "声音很清楚。"], [16.8, 18.5, 3, "我这边也没问题。"], [18.6, 20.2, 3, "看来人都到齐了。"],
         [20.5, 22.1, 4, "好，那就开始。"], [22.5, 24.1, 4, "等一下。"], [24.5, 26.2, 5, "是不是少了一个人？"], [26.5, 30.0, 5, "好像还差一位。"], [32.0, 34.3, 6, "我早就在了，只是没开口。"]]
# orb colour per time span (speaker shown on the phones)
ORB = [[2.6, 0], [8.4, 1], [11.6, 2], [16.7, 3], [20.4, 4], [24.4, 5], [30.8, 6]]
M = dict(pan=28.6, panEnd=30.8, zoom=31.5, end=34.4, type=34.9, sub=36.4, pow=38.6, logo=39.4)
ev = []
def e(kind, t, g=1.0, **k): ev.append(dict(kind=kind, t=round(t, 3), g=g, **k))
for a, b, s, x in LINES: e('blip', a, 0.12)
for t, k in ORB: e('pop', t, 0.1)
e('swish', M['pan'], 0.2); e('whoosh', CUTS[0], 0.15)
for i in range(12): e('key', M['type'] + 0.09 * i, 0.06)
e('pop', M['logo'], 0.2)
json.dump(dict(fps=FPS, dur=DUR, cuts=CUTS, marks=M, lines=LINES, orb=ORB, events=ev), open(f'{H}/timeline.json', 'w'), ensure_ascii=False, indent=1)
