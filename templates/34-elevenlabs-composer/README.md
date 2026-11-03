# 模板 34 · 黑底流体青色 + 听写、场景和润色

参考片：[Introducing Composer, a section-by-section song editor.](https://www.youtube.com/watch?v=OzfgOjEfK98)（ElevenLabs，2026）

风格：黑底 · 流体青色质感 · 大号输入胶囊 · 堆叠的场景胶囊 · 滚轮选择 · 声波时间线 · 漂浮的声波卡片

## 复刻了什么

- 黑底上像素标志缩小，大字「听写.」带一个青色圆点。
- 首页「说点什么」，输入框和四张流体缩略图；「听写 / 会议记录」两张模式卡，光标选第一张。
- 大号输入胶囊：流体圆和一行滚动的原话。
- 青色流体底上场景胶囊逐个出现，选中「邮件」后折叠成邮件面板，写好的正文出现。
- 面板缩成润色卡片，在关闭 / 标准 / 高级之间切换，下面是每档的说明。
- 场景滚轮（先大后小），旁边「自动 / 手动」。
- 声波时间线：口头禅被调暗，标注「原话 / 去掉口头禅 / 调整语序 / 成稿」；流体声波卡片和一片漂浮的卡片。
- 「听写.」再出现，最后青色描边框里的标志、字标和 mosmos.io。

画面里的产品、文案和界面都来自 [mosmos.io](https://mosmos.io)。这个模板没有用外部照片或录音（见 [ASSETS.md](ASSETS.md)）；配乐和音效用 numpy 合成。参考片只用来量时间和看运动方式，仓库里没有它的任何画面、音频或视频。

## 关键数字

| 项目 | 参考片 | 本模板 |
|---|---|---|
| 时长 | 59.12 秒 | 59.118 秒 |
| 帧率 | 30 | 30 |
| 画幅 | 1920×1080 | 1920×1080 |
| 剪辑点 | 6 个 | 6 个，时间相同（误差不超过 1 帧） |
| 速度 | 112 BPM | 112 BPM |
| 响度 | −9.0 LUFS | 约 −14 LUFS，真峰值不高于 −1.5 dBTP |

参考片是一个分段写歌的编辑器；MosMos 不做音乐，这里换成听写：说出来的原话、按场景选写法、三档润色、去掉口头禅的声波。片中第 19.8 秒的面板变卡片是一次柔和的过渡，不算剪辑点。

## 预览

![预览](preview.gif)

完整版（720p）：[preview.mp4](preview.mp4)

## 怎么渲染

```bash
cd templates/_engine
npm install
scripts/fetch-fonts.sh   # 一次即可：安装 Noto Sans SC / Noto Serif SC 可变字重（OFL）
RENDER_DIR=/tmp/renders scripts/render.sh 34-elevenlabs-composer
python3 scripts/qa.py ../34-elevenlabs-composer /tmp/renders/34-elevenlabs-composer.mp4   # 可选：剪辑点、响度和抽帧检查
```

`render.sh` 依次运行 `timeline.py`（剪辑点和音效事件）、`audio.py`（配乐）、`master.py`（归一到 −14 LUFS、限制真峰值）、Remotion 渲染，再合成 1080p 成片，并在本目录生成 `preview.mp4` 和 `preview.gif`。中间文件写在 `build/`，不进仓库。

## 文件

- `Film.tsx`：画面
- `timeline.py` / `timeline.json`：剪辑点、动画时间、音效事件
- `audio.py`：配乐和音效
- `meta.json`：规格和参考片信息
- `analysis.md`：参考片逐镜拆解
- `ASSETS.md`：外部素材来源和许可
