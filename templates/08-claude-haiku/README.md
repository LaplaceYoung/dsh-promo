# 模板 08 · 点长成窗口 + 计数徽标

参考片：[Introducing Claude Haiku 4.5](https://www.youtube.com/watch?v=ccQSHQ3VGIc)（Anthropic，2025）

风格：色底线描插画 · 窗口从一个点长出 · 计数徽标 · 衬线字 + 环绕笔触

## 复刻了什么

- 蓝底线描侧脸，声音节点连成星座再收成一个点，点长成窗口，结构和时间点照参考片的 7 个剪辑点。
- 参考片里跟着跑的秒数计时器换成字数徽标「NN 字」，口语原话流进来时一路数到 128。
- 代码 diff 换成润色 diff：口头语标红删掉，整理后的句子标绿；生成的网页换成写进飞书的那条消息。
- 结尾：15 个场景窗口拼成马赛克缩回一个点，白色衬线字「说得随意，/ 写得体面，/ 在每个应用里。」配一道黄色笔触，然后 MosMos 和 logo。

画面里的产品、文案和界面都来自 [mosmos.io](https://mosmos.io)。音乐是用 numpy 合成的，没有用任何采样或参考片的音频。参考片只用来量时间和看运动方式，仓库里没有它的任何画面、音频或视频。

## 关键数字

| 项目 | 参考片 | 本模板 |
|---|---|---|
| 时长 | 40.08 秒 | 40.067 秒 |
| 帧率 | 60 | 60 |
| 画幅 | 1920×1080 | 1920×1080 |
| 剪辑点 | 7 个 | 7 个，时间相同（误差不超过 1 帧） |
| 速度 | 97 BPM | 97 BPM |
| 响度 | −9.1 LUFS | 约 −14 LUFS，真峰值不高于 −1.5 dBTP |

参考片 60 fps，这里也是 60 fps。

## 预览

![预览](preview.gif)

完整版（720p）：[preview.mp4](preview.mp4)

## 怎么渲染

```bash
cd templates/_engine
npm install
RENDER_DIR=/tmp/renders scripts/render.sh 08-claude-haiku
python3 scripts/qa.py ../08-claude-haiku /tmp/renders/08-claude-haiku.mp4   # 可选：剪辑点、响度和抽帧检查
```

`render.sh` 依次运行 `timeline.py`（剪辑点和音效事件）、`audio.py`（合成音乐）、`master.py`（归一到 −14 LUFS、限制真峰值）、Remotion 渲染，再合成 1080p 成片，并在本目录生成 `preview.mp4` 和 `preview.gif`。中间文件写在 `build/`，不进仓库。

## 文件

- `Film.tsx`：画面
- `timeline.py` / `timeline.json`：剪辑点、动画时间、音效事件
- `audio.py`：配乐和音效
- `meta.json`：规格和参考片信息
- `analysis.md`：参考片逐镜拆解
