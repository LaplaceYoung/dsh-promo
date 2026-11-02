# 模板 19 · 白底黑色输入胶囊 + 生成页面

参考片：[Introducing v0: Generative UI](https://www.youtube.com/watch?v=By9wCB9IZp0)（Vercel，2023）

风格：白底黑色输入胶囊 · 逐句提示词 · 生成页面推近 · 作品墙 · 标志收尾

## 复刻了什么

- 白底上像素标志拼出来，「你想写点什么？」逐词显出，再收进一个黑色胶囊，胶囊拉长成输入条。
- 输入条里依次说出「给李经理回一封邮件」「一条飞书回复」「首页改版周会的会议纪要」，下面一行灰字提示下一句，节奏照参考片的几条提示词。
- 生成结果出现在浏览器框里：会议纪要和待办。镜头推近，选中正文（蓝框），再说「语气正式一点，像发给客户的」，正文换成正式写法。
- 暗色面板显示原话逐字稿（参考片的代码视图）；硬切后打开「润色程度」下拉框选「高级」。
- 一整墙成稿卡片（飞书、邮件、文档、提示词、终端……）慢慢上移，然后 mosmos.io，最后像素标志和 MosMos 字标，淡出。

画面里的产品、文案和界面都来自 [mosmos.io](https://mosmos.io)。这个模板没有用外部照片或录音（见 [ASSETS.md](ASSETS.md)）；配乐用 numpy 合成。参考片只用来量时间和看运动方式，仓库里没有它的任何画面、音频或视频。

## 关键数字

| 项目 | 参考片 | 本模板 |
|---|---|---|
| 时长 | 47.51 秒 | 47.5 秒 |
| 帧率 | 60 | 60 |
| 画幅 | 1920×1080 | 1920×1080 |
| 剪辑点 | 1 个 | 1 个，时间相同（误差不超过 1 帧） |
| 速度 | 100 BPM | 100 BPM |
| 响度 | −16.7 LUFS | 约 −14 LUFS，真峰值不高于 −1.5 dBTP |

参考片只有一个硬切（30.633 秒），其余全是连续推拉和淡入淡出，本模板一样。

## 预览

![预览](preview.gif)

完整版（720p）：[preview.mp4](preview.mp4)

## 怎么渲染

```bash
cd templates/_engine
npm install
scripts/fetch-fonts.sh   # 一次即可：安装 Noto Sans SC / Noto Serif SC 可变字重（OFL）
RENDER_DIR=/tmp/renders scripts/render.sh 19-vercel-v0
python3 scripts/qa.py ../19-vercel-v0 /tmp/renders/19-vercel-v0.mp4   # 可选：剪辑点、响度和抽帧检查
```

`render.sh` 依次运行 `timeline.py`（剪辑点和音效事件）、`audio.py`（配乐）、`master.py`（归一到 −14 LUFS、限制真峰值）、Remotion 渲染，再合成 1080p 成片，并在本目录生成 `preview.mp4` 和 `preview.gif`。中间文件写在 `build/`，不进仓库。

## 文件

- `Film.tsx`：画面
- `timeline.py` / `timeline.json`：剪辑点、动画时间、音效事件
- `audio.py`：配乐和音效
- `meta.json`：规格和参考片信息
- `analysis.md`：参考片逐镜拆解
- `ASSETS.md`：外部素材来源和许可
