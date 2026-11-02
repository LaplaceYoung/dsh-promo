# 模板 28 · 米色手绘开场 + 会议纪要写成文档和表格

参考片：[Claude can create and edit files](https://www.youtube.com/watch?v=EV89Ws8Ui9Y)（Anthropic，2025）

风格：米色手绘线稿开场 · 暖白界面大字特写 · 灰色遮罩下的整理过程 · 文档与表格 · 线稿图标阵列收尾

## 复刻了什么

- 米色底上手画的白板和一只咖啡杯，线条逐笔画出。
- 首页大字「开会前，先喝杯咖啡？」，下面的输入框里实时听写会议内容；三张热词卡片被拖进来，右上角出现「3」的角标。
- 逐字稿气泡按说话人一条条出现。
- 灰色遮罩上写着「会议结束，正在整理总结和待办…」，接着是等宽字体的逐字稿片段和三步清单逐个完成。
- 结果窗口里出现一张文档卡片，鼠标点「打开」。
- 文档「首页改版周会 · 会议纪要」：结论和一张待办表格（事项、负责人、时间）。
- 在文档里用 MosMos 浮窗说话，加进一段润色好的段落；旁边叠出原话和润色后的对比。
- 一张通用的进度表格，用语音把一个单元格填成「准备中」。
- 一片线稿图标聚到一起，变成像素标志和 MosMos 字标。

画面里的产品、文案和界面都来自 [mosmos.io](https://mosmos.io)。这个模板没有用外部照片或录音（见 [ASSETS.md](ASSETS.md)）；配乐和音效用 numpy 合成。参考片只用来量时间和看运动方式，仓库里没有它的任何画面、音频或视频。

## 关键数字

| 项目 | 参考片 | 本模板 |
|---|---|---|
| 时长 | 59.56 秒 | 59.542 秒 |
| 帧率 | 24 | 24 |
| 画幅 | 1920×1080 | 1920×1080 |
| 剪辑点 | 19 个 | 19 个，时间相同（误差不超过 1 帧） |
| 速度 | 94 BPM | 94 BPM |
| 响度 | −17.8 LUFS | 约 −14 LUFS，真峰值不高于 −1.5 dBTP |

参考片讲的是让助手生成和编辑文件；MosMos 不生成文件，这里换成会议记录整理出的纪要和待办，再用语音把内容写进文档和表格。

## 预览

![预览](preview.gif)

完整版（720p）：[preview.mp4](preview.mp4)

## 怎么渲染

```bash
cd templates/_engine
npm install
scripts/fetch-fonts.sh   # 一次即可：安装 Noto Sans SC / Noto Serif SC 可变字重（OFL）
RENDER_DIR=/tmp/renders scripts/render.sh 28-claude-files
python3 scripts/qa.py ../28-claude-files /tmp/renders/28-claude-files.mp4   # 可选：剪辑点、响度和抽帧检查
```

`render.sh` 依次运行 `timeline.py`（剪辑点和音效事件）、`audio.py`（配乐）、`master.py`（归一到 −14 LUFS、限制真峰值）、Remotion 渲染，再合成 1080p 成片，并在本目录生成 `preview.mp4` 和 `preview.gif`。中间文件写在 `build/`，不进仓库。

## 文件

- `Film.tsx`：画面
- `timeline.py` / `timeline.json`：剪辑点、动画时间、音效事件
- `audio.py`：配乐和音效
- `meta.json`：规格和参考片信息
- `analysis.md`：参考片逐镜拆解
- `ASSETS.md`：外部素材来源和许可
