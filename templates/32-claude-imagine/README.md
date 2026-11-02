# 模板 32 · 淡紫底 + 桌面上一扇扇写字的窗口

参考片：[An experimental new way to design software](https://www.youtube.com/watch?v=dGiqrsv530Y)（Anthropic，2025）

风格：淡紫底和飘动的白线 · 底部输入条 · 桌面上一扇扇打开的窗口 · 右侧的输入记录 · 米白卡片收尾

## 复刻了什么

- 淡紫底上飘动的白线，开场卡片「和 MosMos 一起写」。
- 底部输入条，几个建议胶囊，用语音说出一句话；镜头推近输入条。
- 右边出现「我的输入」记录面板。
- 窗口依次打开：「会议记录」文件夹、桌面、笔记「首页改版想法.txt」（MosMos 浮窗在写）、正在进行的会议记录、写给李经理的邮件、「应用」文件夹（16 个通用彩色图标）。
- 米白底，像素标志和 MosMos 字标。

画面里的产品、文案和界面都来自 [mosmos.io](https://mosmos.io)。这个模板没有用外部照片或录音（见 [ASSETS.md](ASSETS.md)）；配乐和音效用 numpy 合成。参考片只用来量时间和看运动方式，仓库里没有它的任何画面、音频或视频。

## 关键数字

| 项目 | 参考片 | 本模板 |
|---|---|---|
| 时长 | 102.01 秒 | 102.0 秒 |
| 帧率 | 59.94 | 60 |
| 画幅 | 1920×1080 | 1920×1080 |
| 剪辑点 | 6 个 | 6 个，时间相同（误差不超过 1 帧） |
| 速度 | 85 BPM | 85 BPM |
| 响度 | −18.6 LUFS | 约 −14 LUFS，真峰值不高于 −1.5 dBTP |

参考片标称 59.94 fps，本模板用 60 fps。参考片是助手当场生成一个桌面和里面的窗口；这里换成一扇扇窗口里用 MosMos 说话写字。13.247 秒窗口弹出是一次柔和的过渡，不算剪辑点。

## 预览

![预览](preview.gif)

完整版（720p）：[preview.mp4](preview.mp4)

## 怎么渲染

```bash
cd templates/_engine
npm install
scripts/fetch-fonts.sh   # 一次即可：安装 Noto Sans SC / Noto Serif SC 可变字重（OFL）
RENDER_DIR=/tmp/renders scripts/render.sh 32-claude-imagine
python3 scripts/qa.py ../32-claude-imagine /tmp/renders/32-claude-imagine.mp4   # 可选：剪辑点、响度和抽帧检查
```

`render.sh` 依次运行 `timeline.py`（剪辑点和音效事件）、`audio.py`（配乐）、`master.py`（归一到 −14 LUFS、限制真峰值）、Remotion 渲染，再合成 1080p 成片，并在本目录生成 `preview.mp4` 和 `preview.gif`。中间文件写在 `build/`，不进仓库。

## 文件

- `Film.tsx`：画面
- `timeline.py` / `timeline.json`：剪辑点、动画时间、音效事件
- `audio.py`：配乐和音效
- `meta.json`：规格和参考片信息
- `analysis.md`：参考片逐镜拆解
- `ASSETS.md`：外部素材来源和许可
