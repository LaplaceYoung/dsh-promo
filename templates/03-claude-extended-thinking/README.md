# 模板 03 · 思考过程，一镜到底

参考片：[Claude 3.7 Sonnet with extended thinking](https://www.youtube.com/watch?v=t3nnDXa81Hs)（Anthropic，2025）

风格：暖色 UI 演示 · 连续镜头推拉 · 宏观特写

## 复刻了什么

- 一个连续的暖色界面舞台，镜头在输入框、菜单、思考过程和结果之间推拉，7 个剪辑点和参考片逐帧对齐（最大偏差 0.016 秒）。
- 参考片的「extended thinking」过程换成 MosMos 的润色过程：原话流入输入框 → 选「高级」→ 按 Fn → 润色中 / 处理改口 / 重组为简洁成稿 → 字数从 66 降到 21。
- 结尾的热词卡片（飞马→Figma、尼姆布斯→Nimbus、林清和→林清禾）对应参考片的结果展示，最后回到起始画面。

画面里的产品、文案和界面都来自 [mosmos.io](https://mosmos.io)。音乐是用 numpy 合成的，没有用任何采样或参考片的音频。参考片只用来量时间和看运动方式，仓库里没有它的任何画面、音频或视频。

## 关键数字

| 项目 | 参考片 | 本模板 |
|---|---|---|
| 时长 | 39.87 秒 | 39.867 秒 |
| 帧率 | 60 | 60 |
| 画幅 | 1920×1080 | 1920×1080 |
| 剪辑点 | 7 个 | 7 个，时间相同（误差不超过 1 帧） |
| 速度 | 79 BPM | 79 BPM |
| 响度 | −14.3 LUFS | 约 −14 LUFS |

## 预览

![预览](preview.gif)

完整版（720p）：[preview.mp4](preview.mp4)

## 怎么渲染

```bash
cd templates/_engine
npm install
RENDER_DIR=/tmp/renders scripts/render.sh 03-claude-extended-thinking
python3 scripts/qa.py ../03-claude-extended-thinking /tmp/renders/03-claude-extended-thinking.mp4   # 可选：剪辑点、响度和抽帧检查
```

`render.sh` 依次运行 `timeline.py`（剪辑点和音效事件）、`audio.py`（合成音乐，归一到 −14 LUFS）、Remotion 渲染，再合成 1080p 成片，并在本目录生成 `preview.mp4` 和 `preview.gif`。中间文件写在 `build/`，不进仓库。

## 文件

- `Film.tsx`：画面
- `timeline.py` / `timeline.json`：剪辑点、换字时间、音效事件
- `audio.py`：配乐和音效
- `meta.json`：规格和参考片信息
- `analysis.md`：参考片逐镜拆解
