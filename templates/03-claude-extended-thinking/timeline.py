# Template 03 timeline: cut points from the reference (Anthropic, "Claude 3.7 Sonnet with extended thinking"),
# action marks for MosMos content, and the foley event list shared by Film.tsx and audio.py.
import json, os
H = os.path.dirname(os.path.abspath(__file__))
FPS = 60; DUR = 39.867
CUTS = [9.167, 10.933, 12.867, 21.2, 24.3, 29.633, 38.833]
RAW = "嗯，我觉得这个方案吧，这个方案可以先，先做一个小范围的测试，然后然后看看反馈，不对，是先收集一下反馈，再决定要不要，就是要不要全部上线。"
HOT = "请把飞马里的尼姆布斯文件发给林清和"
M = dict(
    click_input=1.05, fn1=1.55, pill_in=1.7, raw_t0=2.35, raw_cps=11.5,
    zoom1=4.75, zoom2=7.75, menu_open=8.3,
    hover_adv=9.55, click_adv=10.05,
    fn2=12.35,
    think_box=12.87, chat_in=15.0, head2=17.4, head3=19.5,
    count_t0=21.35, count_t1=23.1, icon_in=23.0,
    hot_t0=25.45, hot_cps=9,
    c1=30.3, flip1=30.45, s_two=31.0, c2=33.0, flip2=33.15, s_adding=33.6, cbtn=35.3, flip3=35.75, s_done=36.0, confetti=37.25, hover_again=38.3,
)
ev = []
def e(kind, t, g=1.0, **k): ev.append(dict(kind=kind, t=round(t, 3), g=g, **k))
for c in CUTS: e('tick', c, 0.6)
e('click', M['click_input']); e('keycap', M['fn1'], 0.7); e('pop', M['pill_in'], 0.5)
e('murmur', M['raw_t0'], 1.0, dur=len(RAW) / M['raw_cps'])
e('click', M['menu_open'] - 0.1, 0.8); e('swish', CUTS[0], 0.5); e('click', M['click_adv']); e('blip', M['click_adv'] + 0.05, 0.5, f=1568)
e('swish', CUTS[1], 0.4); e('keycap', M['fn2'], 1.0)
e('swish', CUTS[2], 0.5)
e('pop', M['chat_in'], 0.4); e('blip', M['head2'], 0.35, f=1175); e('blip', M['head3'], 0.35, f=1397)
for k in range(12): e('tick', M['count_t0'] + k * (M['count_t1'] - M['count_t0']) / 12, 0.5)
e('chime', M['icon_in'], 0.5); e('swish', CUTS[4], 0.4)
e('murmur', M['hot_t0'], 1.0, dur=len(HOT) / M['hot_cps'])
e('swish', CUTS[5], 0.5)
for k in ('c1', 'c2', 'cbtn'): e('click', M[k])
for k in ('flip1', 'flip2', 'flip3'): e('pop', M[k], 0.7)
e('chime', M['s_done'], 0.8); e('ding', M['confetti'], 0.5); e('click', M['hover_again'] + 0.3, 0.4)
json.dump(dict(fps=FPS, dur=DUR, frames=round(DUR * FPS), cuts=CUTS, marks=M, raw=RAW, hot=HOT, events=ev), open(f'{H}/timeline.json', 'w'), ensure_ascii=False, indent=1)
