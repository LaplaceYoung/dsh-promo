# Template 07 timeline — structure of Notion "Meet the new Notion AI" (2024).
# 17 hard cuts measured at 23.976 fps; text swaps inside the long title shot measured from the contact sheet.
import json, os
H = os.path.dirname(os.path.abspath(__file__))
FPS = 30; DUR = 56.633
SHOTS = [
    (0.0, 'logoClick'), (1.168, 'faceBlue'), (2.461, 'intro'), (12.638, 'splitPanel'), (14.64, 'askMacro'),
    (16.975, 'splitResult'), (21.104, 'resultZoom'), (21.521, 'card:写得更顺，|也懂你的用词'), (23.44, 'docRed'),
    (25.067, 'docMacro'), (29.655, 'docMacro2'), (31.281, 'card:整场会议，|也能记下来'), (33.45, 'splitMeeting'),
    (42.042, 'card:中文、English，|混着说也行'), (43.543, 'yellowMacro'), (45.712, 'yellowWide'),
    (50.217, 'card:下载 MosMos|就在 mosmos.io'), (52.594, 'outro'),
]
# inside 'intro'
INTRO = dict(meet=2.75, tool=4.3, pills=[4.6, 5.1, 5.6, 6.1, 6.6, 7.1, 7.6], all=8.0, icons=9.4, apps=10.9)
PILLS = ['回复消息', '写邮件', '整理周报', '写提示词', '润色文案', '输入终端命令', '记会议']
OUTRO = dict(say=53.7, logo=55.0)
CUTS = [s[0] for s in SHOTS[1:]]
ev = []
def e(kind, t, g=1.0, **k): ev.append(dict(kind=kind, t=round(t, 3), g=g, **k))
e('click', 0.75, 0.8)
for (t0, k) in SHOTS[1:]: e('swish' if k.startswith('card') else 'tick', t0, 0.35)
for t in INTRO['pills']: e('blip', t, 0.35)
for t in [INTRO['meet'], INTRO['tool'], INTRO['all'], INTRO['apps']]: e('pop', t, 0.35)
for i in range(6): e('pop', INTRO['icons'] + i * 0.12, 0.25)
e('click', 24.4, 0.6); e('click', 44.3, 0.5); e('ding', 20.0, 0.4); e('ding', 48.2, 0.4)
for i in range(18): e('key', 25.4 + i * 0.09, 0.25)
for i in range(16): e('key', 46.4 + i * 0.07, 0.25)
e('pop', OUTRO['say'], 0.4); e('ding', OUTRO['logo'], 0.6)
json.dump(dict(fps=FPS, dur=DUR, shots=SHOTS, cuts=CUTS, intro=INTRO, pills=PILLS, outro=OUTRO, events=ev), open(f'{H}/timeline.json', 'w'), ensure_ascii=False, indent=1)
