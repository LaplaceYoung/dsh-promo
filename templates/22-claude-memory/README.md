# 模板 22 · 米色纸面 + 橙色八角框

参考片：[Claude now has memory](https://www.youtube.com/watch?v=PupmfSttxlc)（Anthropic，2025）

风格：米色纸面 · 手绘线条 · 设置卡片 · 橙色八角框整理卡片 · 纸折信封收尾

## 复刻了什么

- 米色纸面（Pexels 纸纹，正片叠底）上一支笔画出一串波浪线，周围鼓起一朵白色思考云，云又变成「我的热词」设置卡片，鼠标打开「说话时优先识别热词」「润色时保持热词原样」两个开关。
- 卡片变高：「正在整理热词…」，人名 林清禾、项目 Nimbus、工具 Figma 逐条出现，各带一个近音词。
- 「你好，小林」→ 灰绿底的输入框，说出「帮我跟林清禾说一下，Nimbus 的 Figma 文件今天发她」；发出后像素标志转动「正在匹配热词…」，一个橙色圆点放大铺满画面。
- 橙色八角框里整理热词卡片：这次用到的热词 → 散落的卡片 → 按人名 / 项目 / 工具排成三列 → 「最近学到的词」→ 三列里高亮一张。
- 橙色缩回，回复逐字写出「清禾，Nimbus 的 Figma 文件今天发你，记得查收。」，热词高亮，下面一行写明没有出现的近音词；推近后这张纸折起来，变成一个信封，最后是 MosMos 标志和字标。

画面里的产品、文案和界面都来自 [mosmos.io](https://mosmos.io)。纸纹来自 Pexels，折纸和信封的声音是 Freesound 上的 CC0 录音（见 [ASSETS.md](ASSETS.md)）；配乐用 numpy 合成。参考片只用来量时间和看运动方式，仓库里没有它的任何画面、音频或视频。

## 关键数字

| 项目 | 参考片 | 本模板 |
|---|---|---|
| 时长 | 59.0 秒 | 59.0 秒 |
| 帧率 | 29.97 | 30 |
| 画幅 | 1920×1080 | 1920×1080 |
| 剪辑点 | 11 个 | 11 个，时间相同（误差不超过 1 帧） |
| 速度 | 87.5 BPM | 87.5 BPM |
| 响度 | −24.2 LUFS | 约 −14 LUFS，真峰值不高于 −1.5 dBTP |

参考片标称 29.97 fps，本模板用 30 fps。参考片讲的是「记忆」，这里换成 MosMos 的热词词库：英文专有词、近音词和人名，加入词库后优先识别，润色时保持原样。

## 预览

![预览](preview.gif)

完整版（720p）：[preview.mp4](preview.mp4)

## 怎么渲染

```bash
cd templates/_engine
npm install
scripts/fetch-fonts.sh   # 一次即可：安装 Noto Sans SC / Noto Serif SC 可变字重（OFL）
RENDER_DIR=/tmp/renders scripts/render.sh 22-claude-memory
python3 scripts/qa.py ../22-claude-memory /tmp/renders/22-claude-memory.mp4   # 可选：剪辑点、响度和抽帧检查
```

`render.sh` 依次运行 `timeline.py`（剪辑点和音效事件）、`audio.py`（配乐）、`master.py`（归一到 −14 LUFS、限制真峰值）、Remotion 渲染，再合成 1080p 成片，并在本目录生成 `preview.mp4` 和 `preview.gif`。中间文件写在 `build/`，不进仓库。

## 文件

- `Film.tsx`：画面
- `timeline.py` / `timeline.json`：剪辑点、动画时间、音效事件
- `audio.py`：配乐和音效
- `meta.json`：规格和参考片信息
- `analysis.md`：参考片逐镜拆解
- `ASSETS.md`：外部素材来源和许可
