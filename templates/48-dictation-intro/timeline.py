# Template 48 timeline — structure of a 2025 voice-dictation intro film (screen recording + webcam bubble + talking head).
# 60 fps, 128.35 s, 18 hard cuts (the analyzer's 87.167 is hand motion inside a live shot, not a cut).
import json, os
H = os.path.dirname(os.path.abspath(__file__))
FPS = 60; DUR = 128.35
CUTS = [0.1, 16.1, 20.1, 30.467, 33.1, 45.733, 51.367, 54.217, 59.133, 74.667, 87.533, 91.167, 106.1, 108.4, 109.367, 113.383, 113.833, 122.533]
M = dict(ty0=0.55, ty1=10.5, sug1=2.8, sug1e=3.6, sug2=6.6, sug2e=7.6, zo=10.95, swap=11.55, zi=12.15, zie=12.8, pill1=12.95, paste1=15.8,
         pill2=22.6, mail=30.967, pill3=35.5, msg=41.9, send=45.0, zin5=46.2, pill6=51.9, pill7=59.6, code=66.6, zoom7=69.9, cmd=72.3,
         phone=79.3, phoneOut=87.0, logo=124.6, url=126.4, badges=127.1, wave=123.0)
CAP = [  # [t0, t1, caption]
 [13.0, 14.3, "用 MosMos"], [14.35, 15.75, "长长的提示词，直接说出来"],
 [16.25, 17.6, "这是 MosMos"], [17.65, 19.3, "带你看看它怎么用"], [19.35, 20.05, "开口就好"],
 [21.0, 22.5, "回邮件的时候"], [22.6, 24.4, "按一次 Fn，开始说"], [24.5, 26.4, "不用口述标点"], [26.5, 28.3, "也不用先组织成书面语"], [28.4, 30.4, "再按一次，文字写好"],
 [33.5, 35.3, "聊天也一样"], [35.5, 38.0, "它会按场景换写法"], [38.1, 41.5, "聊天就简洁自然"], [42.0, 45.5, "说完就写好"],
 [46.8, 48.5, "难认的词"], [48.6, 51.2, "教一次就够了"],
 [51.6, 53.5, "写提示词"], [53.6, 54.15, "说一大段也没关系"], [54.8, 58.9, "要求明确，结构清楚"],
 [59.5, 61.5, "写代码的时候"], [61.6, 64.5, "终端里也能开口说"], [64.6, 66.5, "说出需求"], [66.6, 69.5, "写成命令"], [70.2, 72.2, "代码与终端场景"], [72.3, 74.5, "命令已生成，按 Enter 执行"],
 [75.0, 78.2, "macOS 和 Windows 上都能用"], [78.3, 80.2, "手机呢？"], [80.3, 83.0, "iOS 即将上线"], [83.1, 85.0, "敬请期待"], [85.1, 87.45, "现在先在电脑上用起来"],
 [87.7, 89.5, "还有一件事"], [89.6, 91.1, "它也能记整场会"],
 [91.5, 94.0, "Fn + Shift，记整场会"], [94.1, 97.5, "持续转录、区分说话人"], [97.6, 101.0, "结束后给出总结和待办"], [101.1, 105.9, "谁说了什么，接下来做什么"],
 [106.3, 108.3, "iOS 即将上线"], [108.5, 109.3, "打开设置"], [109.5, 111.3, "场景、润色、热词"], [111.4, 113.3, "都可以按你的习惯调"], [113.4, 113.8, "选好就能用"],
 [114.0, 116.3, "想试试的话"], [116.4, 118.6, "打开 mosmos.io"], [118.7, 120.3, "下载 MosMos"], [120.4, 122.4, "macOS 和 Windows 都能用"],
]
ev = []
def e(kind, t, g=1.0, **k): ev.append(dict(kind=kind, t=round(t, 3), g=g, **k))
# slow typing in shot 1: one key per character
TYPED = "怎么把需求写清楚？"
for k in range(len(TYPED)): e('key', M['ty0'] + k * (M['ty1'] - M['ty0']) / len(TYPED), 0.3)
for t in (M['pill1'], M['pill2'], M['pill3'], M['pill6'], M['pill7']): e('pop', t, 0.08)
for t in (M['paste1'], M['mail'], M['msg'], CUTS[7], M['cmd']): e('click', t, 0.2)
e('swish', M['zo'], 0.08); e('swish', M['zi'], 0.08); e('swish', CUTS[3], 0.12); e('click', M['send'], 0.25); e('swish', M['zin5'], 0.08); e('swish', M['zoom7'], 0.1)
e('swish', M['phone'], 0.08); e('swish', M['phoneOut'], 0.08)
for t in (108.6, 109.4, 113.4): e('click', t, 0.2)
e('ding', M['logo'], 0.12)
json.dump(dict(fps=FPS, dur=DUR, cuts=CUTS, marks=M, cap=CAP, typed=TYPED, events=ev), open(f'{H}/timeline.json', 'w'), ensure_ascii=False, indent=1)
