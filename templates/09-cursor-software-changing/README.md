# 模板 09 · 米白拼贴 + 复古电脑

参考片：[Software is changing](https://www.youtube.com/watch?v=2SkrTnGMsr0)（Cursor，2026）

风格：米白底拼贴 · 复古电脑 · 碎片字 · 彩色几何块 · 打字字卡

## 复刻了什么

- 「想法」两个粗黑大字拼出来再碎成方块，开头 13 秒的碎剪照参考片的节奏。
- 参考片里的老照片全部换成自绘：人物卡片、SVG 老电脑、打字机键、穿孔卡、绿色 CRT、蓝色 DOS 对话框。
- 打字字卡「逐字敲键盘，不是未来。」，之后彩色几何块绕着电脑转，铺成一整片等距电脑阵列。
- 结尾卡片撕开露出 MosMos logo，打字「有了 MosMos，他们可以。」→「你也可以。」→ mosmos.io。

画面里的产品、文案和界面都来自 [mosmos.io](https://mosmos.io)。音乐是用 numpy 合成的，没有用任何采样或参考片的音频。参考片只用来量时间和看运动方式，仓库里没有它的任何画面、音频或视频。

## 关键数字

| 项目 | 参考片 | 本模板 |
|---|---|---|
| 时长 | 54.64 秒 | 54.625 秒 |
| 帧率 | 24 | 24 |
| 画幅 | 1440×1080 | 1920×1080 |
| 剪辑点 | 18 个 | 18 个，时间相同（误差不超过 1 帧） |
| 速度 | 136 BPM | 136 BPM |
| 响度 | −18.4 LUFS | 约 −14 LUFS，真峰值不高于 −1.5 dBTP |

参考片是 4:3（1440×1080），这里做成 16:9，内容居中。帧率同为 24 fps。

## 预览

![预览](preview.gif)

完整版（720p）：[preview.mp4](preview.mp4)

## 怎么渲染

```bash
cd templates/_engine
npm install
RENDER_DIR=/tmp/renders scripts/render.sh 09-cursor-software-changing
python3 scripts/qa.py ../09-cursor-software-changing /tmp/renders/09-cursor-software-changing.mp4   # 可选：剪辑点、响度和抽帧检查
```

`render.sh` 依次运行 `timeline.py`（剪辑点和音效事件）、`audio.py`（合成音乐）、`master.py`（归一到 −14 LUFS、限制真峰值）、Remotion 渲染，再合成 1080p 成片，并在本目录生成 `preview.mp4` 和 `preview.gif`。中间文件写在 `build/`，不进仓库。

## 文件

- `Film.tsx`：画面
- `timeline.py` / `timeline.json`：剪辑点、动画时间、音效事件
- `audio.py`：配乐和音效
- `meta.json`：规格和参考片信息
- `analysis.md`：参考片逐镜拆解
