# 模板 39 · 蓝色桌面上的文档 + 文档场景和润色

参考片：[ChatGPT for Word is now available](https://www.youtube.com/watch?v=lxVMdEpe0RQ)（OpenAI，2026）

风格：白底黑字逐词出现 · 蓝色渐变桌面上的文档窗口 · 推近右下角的输入卡片 · 文档里逐段写入并高亮 · 进度清单 · 竖向滚动的词 · 标志收尾

## 复刻了什么

- 白底大字逐词出现「介绍 MosMos / 用在你的文档里」。
- 蓝色渐变桌面上的文档窗口「首页改版项目复盘.docx」，右下角是 MosMos 听写卡片；镜头推近卡片，口述的话逐字出现。
- 镜头拉回，整理好的段落（目标 / 结果 / 下一步）带蓝色高亮写进文档。
- 口述「下一步」时，卡片里列出「去掉口头禅 / 调整语序 / 按文档场景整理成一段」。
- 润色菜单「关闭 / 标准 / 高级」被光标选中，热词「Nimbus」写对。
- 整理清单「整理中 · n/3」逐项打勾。
- 竖向滚轮「用 MosMos 写 消息 / 邮件 / 提示词 / 命令 / 纪要 / 文档」，「现在，开口就好」和 macOS、Windows 胶囊，最后像素标志。

画面里的产品、文案和界面都来自 [mosmos.io](https://mosmos.io)。这个模板没有用外部照片或录音（见 [ASSETS.md](ASSETS.md)）；配乐和音效用 numpy 合成。参考片只用来量时间和看运动方式，仓库里没有它的任何画面、音频或视频。

## 关键数字

| 项目 | 参考片 | 本模板 |
|---|---|---|
| 时长 | 42.05 秒 | 42.033 秒 |
| 帧率 | 30 | 30 |
| 画幅 | 1920×1080 | 1920×1080 |
| 剪辑点 | 10 个 | 10 个，时间相同（误差不超过 1 帧） |
| 速度 | 105 BPM | 105 BPM |
| 响度 | −16.1 LUFS | 约 −14 LUFS，真峰值不高于 −1.5 dBTP |

参考片介绍的是文字处理软件里的 AI 插件；这里换成 MosMos 的「文档」场景：在通用文档窗口里说话，整理好的段落写进文档。文档窗口是代码画的通用界面，不是任何真实软件。片中的项目名和日期都是示例。

## 预览

![预览](preview.gif)

完整版（720p）：[preview.mp4](preview.mp4)

## 怎么渲染

```bash
cd templates/_engine
npm install
scripts/fetch-fonts.sh   # 一次即可：安装 Noto Sans SC / Noto Serif SC 可变字重（OFL）
RENDER_DIR=/tmp/renders scripts/render.sh 39-chatgpt-word
python3 scripts/qa.py ../39-chatgpt-word /tmp/renders/39-chatgpt-word.mp4   # 可选：剪辑点、响度和抽帧检查
```

`render.sh` 依次运行 `timeline.py`（剪辑点和音效事件）、`audio.py`（配乐）、`master.py`（归一到 −14 LUFS、限制真峰值）、Remotion 渲染，再合成 1080p 成片，并在本目录生成 `preview.mp4` 和 `preview.gif`。中间文件写在 `build/`，不进仓库。

## 文件

- `Film.tsx`：画面
- `timeline.py` / `timeline.json`：剪辑点、动画时间、音效事件
- `audio.py`：配乐和音效
- `meta.json`：规格和参考片信息
- `analysis.md`：参考片逐镜拆解
- `ASSETS.md`：外部素材来源和许可
