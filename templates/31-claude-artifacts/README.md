# 模板 31 · 橙色底 + 一连串快切的使用场景

参考片：[Turn ideas into interactive artifacts](https://www.youtube.com/watch?v=iSn77jvjojA)（Anthropic，2025）

风格：橙色底 · 弹跳的方块变成输入框 · 长镜头的步进网格 · 一连串快切的使用场景 · 倾斜卡片 · 标志卡片收尾

## 复刻了什么

- 橙色底上的窗口首页，点侧栏，一个方块弹跳着变成输入框，用语音说出需求。
- 按说话人排的时间轴网格：每一格是一段发言，网格逐行亮起。
- 一连串快切：热词圆点、Fn 键圆圈、代码画的森林、润色过程、邮件、ASCII 标志、场景列表、终端、提示词、「飞马」被改成 Figma、聊天、三档润色、图标、笔记。
- 结尾卡片：像素标志和「开口说，就能写好 · mosmos.io」。

画面里的产品、文案和界面都来自 [mosmos.io](https://mosmos.io)。这个模板没有用外部照片或录音（见 [ASSETS.md](ASSETS.md)）；配乐和音效用 numpy 合成。参考片只用来量时间和看运动方式，仓库里没有它的任何画面、音频或视频。

## 关键数字

| 项目 | 参考片 | 本模板 |
|---|---|---|
| 时长 | 45.07 秒 | 45.067 秒 |
| 帧率 | 30 | 30 |
| 画幅 | 1920×1080 | 1920×1080 |
| 剪辑点 | 20 个 | 20 个，时间相同（误差不超过 1 帧） |
| 速度 | 110 BPM | 110 BPM |
| 响度 | −15.8 LUFS | 约 −14 LUFS，真峰值不高于 −1.5 dBTP |

参考片展示的是让助手做出各种小应用和小游戏；MosMos 不做应用，这里换成 MosMos 能写字的各个地方。参考片里的鼓机网格换成按说话人排的时间轴。

## 预览

![预览](preview.gif)

完整版（720p）：[preview.mp4](preview.mp4)

## 怎么渲染

```bash
cd templates/_engine
npm install
scripts/fetch-fonts.sh   # 一次即可：安装 Noto Sans SC / Noto Serif SC 可变字重（OFL）
RENDER_DIR=/tmp/renders scripts/render.sh 31-claude-artifacts
python3 scripts/qa.py ../31-claude-artifacts /tmp/renders/31-claude-artifacts.mp4   # 可选：剪辑点、响度和抽帧检查
```

`render.sh` 依次运行 `timeline.py`（剪辑点和音效事件）、`audio.py`（配乐）、`master.py`（归一到 −14 LUFS、限制真峰值）、Remotion 渲染，再合成 1080p 成片，并在本目录生成 `preview.mp4` 和 `preview.gif`。中间文件写在 `build/`，不进仓库。

## 文件

- `Film.tsx`：画面
- `timeline.py` / `timeline.json`：剪辑点、动画时间、音效事件
- `audio.py`：配乐和音效
- `meta.json`：规格和参考片信息
- `analysis.md`：参考片逐镜拆解
- `ASSETS.md`：外部素材来源和许可
