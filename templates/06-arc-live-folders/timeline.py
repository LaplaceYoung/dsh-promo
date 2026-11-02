# Template 06 timeline — structure of The Browser Company "Introducing Live Folders in Arc" (2024).
# 23 cuts measured frame by frame at 23.976 fps; reproduced at 30 fps (times kept in seconds).
import json, os
H = os.path.dirname(os.path.abspath(__file__))
FPS = 30; DUR = 29.933
SHOTS = [  # (t0, kind, arg)
    (0.0, 'black', None), (0.125, 'send', 0), (1.46, 'window', 0), (3.545, 'voice', 0),
    (5.464, 'card', ['你说的', '你说的|每句话']), (7.007, 'sendTilt', 0), (8.091, 'sideTilt', 0),
    (9.092, 'card', ['都写好了']), (9.968, 'sendTilt', 1), (11.053, 'sideTilt', 1),
    (12.179, 'card', ['飞书 / 微信']), (12.804, 'card', ['邮件、文档|提示词、终端']),
    (13.639, 'kbd', 0), (14.306, 'fn', 0), (15.307, 'window', 1), (15.807, 'sideClose', 0), (16.475, 'itemZoom', 0),
    (17.559, 'card', ['任意应用', '任意应用|都不用离开']), (19.019, 'meeting', 0),
    (22.856, 'card', ['语音|输入']), (23.815, 'cardSmall', ['现在，开口就好']),
    (24.775, 'fn', 1), (25.734, 'voice', 1), (27.361, 'logo', 0),
]
CARD_SWAP = {5.464: 6.25, 17.559: 18.2}
OVERLAY = (24.775, 27.361)
CUTS = [s[0] for s in SHOTS[1:]]
ev = []
def e(kind, t, g=1.0, **k): ev.append(dict(kind=kind, t=round(t, 3), g=g, **k))
for (t0, k, a) in SHOTS[1:]:
    if k.startswith('card'): e('hit', t0, 0.55)
    else: e('tick', t0, 0.5)
for t in CARD_SWAP.values(): e('hit', t, 0.45)
e('click', 0.6); e('click', 7.6, 0.6); e('click', 10.5, 0.6); e('keycap', 14.75, 0.9); e('keycap', 25.15, 0.8); e('click', 16.1, 0.6)
e('pop', 1.8, 0.5); e('pop', 8.6, 0.4); e('pop', 11.5, 0.4); e('ding', 27.361, 0.7)
json.dump(dict(fps=FPS, dur=DUR, shots=SHOTS, cuts=CUTS, swap=CARD_SWAP, overlay=OVERLAY, events=ev), open(f'{H}/timeline.json', 'w'), ensure_ascii=False, indent=1)
