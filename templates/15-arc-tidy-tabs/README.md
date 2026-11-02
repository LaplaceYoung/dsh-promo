# 模板 15 · 品牌蓝粗体字卡 + 侧栏微距

参考片：[Tidy Tabs by Arc · A browser that tidies for you](https://www.youtube.com/watch?v=DHTmMtJzRrc)（The Browser Company，2024）

风格：品牌蓝粗体字卡 · 侧栏微距 · 风景壁纸 · 一键整理

## 复刻了什么

- 品牌蓝底上 Noto Sans SC Black 白字一词一跳：「别 / 担心」「开口 / 就说」「一键 / 整理」「现在就在 / MosMos 里」。
- 字卡之间是侧栏微距：MosMos 的输入历史叠在风景壁纸上（Pexels 公开授权照片），鼠标按下扫帚「整理」按钮，一条波浪线扫过，条目按场景分组（飞书 / 微信、邮件、文档、会议记录）。
- 分组后打开三页：给李经理的邮件、带摄像头画面的会议记录（Pexels 公开授权视频）、附台灯照片的样品确认邮件。
- 收尾：蓝底像素标志旋转落定，再出 mosmos.io。

画面里的产品、文案和界面都来自 [mosmos.io](https://mosmos.io)。壁纸、台灯照片和会议画面来自 Pexels（见 [ASSETS.md](ASSETS.md)）；配乐和音效用 numpy 合成。参考片只用来量时间和看运动方式，仓库里没有它的任何画面、音频或视频。

## 关键数字

| 项目 | 参考片 | 本模板 |
|---|---|---|
| 时长 | 20.57 秒 | 20.567 秒 |
| 帧率 | 29.97 | 30 |
| 画幅 | 1920×1080 | 1920×1080 |
| 剪辑点 | 11 个 | 11 个，时间相同（误差不超过 1 帧） |
| 速度 | 138 BPM | 138 BPM |
| 响度 | −17.3 LUFS | 约 −14 LUFS，真峰值不高于 −1.5 dBTP |

参考片标称 29.97 fps，本模板用 30 fps，剪辑点时间按秒对齐。

## 预览

![预览](preview.gif)

完整版（720p）：[preview.mp4](preview.mp4)

## 怎么渲染

```bash
cd templates/_engine
npm install
scripts/fetch-fonts.sh   # 一次即可：安装 Noto Sans SC / Noto Serif SC 可变字重（OFL）
RENDER_DIR=/tmp/renders scripts/render.sh 15-arc-tidy-tabs
python3 scripts/qa.py ../15-arc-tidy-tabs /tmp/renders/15-arc-tidy-tabs.mp4   # 可选：剪辑点、响度和抽帧检查
```

`render.sh` 依次运行 `timeline.py`（剪辑点和音效事件）、`audio.py`（配乐）、`master.py`（归一到 −14 LUFS、限制真峰值）、Remotion 渲染，再合成 1080p 成片，并在本目录生成 `preview.mp4` 和 `preview.gif`。中间文件写在 `build/`，不进仓库。

## 文件

- `Film.tsx`：画面
- `timeline.py` / `timeline.json`：剪辑点、动画时间、音效事件
- `audio.py`：配乐和音效
- `meta.json`：规格和参考片信息
- `analysis.md`：参考片逐镜拆解
- `ASSETS.md`：外部素材来源和许可
