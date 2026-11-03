# 模板 33 · 浅灰白底 + 会议一结束总结就来了

参考片：[Introducing Pulse: Stay up to date on what's happening across projects and initiatives](https://www.youtube.com/watch?v=mcWS9yiGzog)（Linear，2025）

风格：浅灰白底大字 · 侧栏微距推近 · 会议记录信息流 · 收件箱和总结页 · 手机特写 · 功能名和标志收尾

## 复刻了什么

- 浅灰白底大字「介绍 [像素标志] MosMos 会议记录」。
- 镜头微距推近侧栏（约 5.8 倍），再拉远到整个窗口。
- 大字「周会 / 评审会 / 客户沟通 / 一对一 结束，总结就写好了」，场合名逐个替换。
- 滚动的会议记录信息流：说话人时间轴的深色卡片、待办卡片。
- 「都整理好了」，然后「会议一结束，总结和待办就来了」。
- 会议记录收件箱，打开一份总结页，右上角「补充 Fn」按钮。
- 按钮微距化入手机特写，右对齐的听写文字「补充：周四的视觉评审 / 改到下午三点。」；再拉远到深色手机首屏（通用图标）。
- 「会议记录」字样，最后像素标志和 MosMos 字标。

画面里的产品、文案和界面都来自 [mosmos.io](https://mosmos.io)。这个模板没有用外部照片或录音（见 [ASSETS.md](ASSETS.md)）；配乐和音效用 numpy 合成。参考片只用来量时间和看运动方式，仓库里没有它的任何画面、音频或视频。

## 关键数字

| 项目 | 参考片 | 本模板 |
|---|---|---|
| 时长 | 43.47 秒 | 43.467 秒 |
| 帧率 | 30 | 30 |
| 画幅 | 1920×1080 | 1920×1080 |
| 剪辑点 | 5 个 | 5 个，时间相同（误差不超过 1 帧） |
| 速度 | 114 BPM | 114 BPM |
| 响度 | −23.4 LUFS | 约 −14 LUFS，真峰值不高于 −1.5 dBTP |

参考片讲的是项目动态的每日摘要；MosMos 没有项目管理功能，这里换成会议记录：会一结束，总结和待办就写好了。片中的 3 条待办、32 分钟等数字都是示例内容，不是产品数据。

## 预览

![预览](preview.gif)

完整版（720p）：[preview.mp4](preview.mp4)

## 怎么渲染

```bash
cd templates/_engine
npm install
scripts/fetch-fonts.sh   # 一次即可：安装 Noto Sans SC / Noto Serif SC 可变字重（OFL）
RENDER_DIR=/tmp/renders scripts/render.sh 33-linear-pulse
python3 scripts/qa.py ../33-linear-pulse /tmp/renders/33-linear-pulse.mp4   # 可选：剪辑点、响度和抽帧检查
```

`render.sh` 依次运行 `timeline.py`（剪辑点和音效事件）、`audio.py`（配乐）、`master.py`（归一到 −14 LUFS、限制真峰值）、Remotion 渲染，再合成 1080p 成片，并在本目录生成 `preview.mp4` 和 `preview.gif`。中间文件写在 `build/`，不进仓库。

## 文件

- `Film.tsx`：画面
- `timeline.py` / `timeline.json`：剪辑点、动画时间、音效事件
- `audio.py`：配乐和音效
- `meta.json`：规格和参考片信息
- `analysis.md`：参考片逐镜拆解
- `ASSETS.md`：外部素材来源和许可
