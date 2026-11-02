# 模板 16 · 手绘小人 + 蓝框页面 + 卡片墙

参考片：[Introducing Notion 3.0 · Agents](https://www.youtube.com/watch?v=R1cF4T4lgI4)（Notion Labs，2025）

风格：手绘小人 · 蓝框页面 · 超大打字 · 声波 · 卡片墙

## 复刻了什么

- 米色底像素标志 →「你只管开口。/ 剩下的，MosMos 写好。」，上面一排手绘小人跳出来。小人全部来自 Open Peeps（CC0）。
- 蓝框里的页面：黄底待办块，右侧弹出 MosMos 面板「想写点什么？」。
- 米色底的角色选择：一排小人分别代表飞书、邮件、文档、提示词等写法，蓝框跟着选中项移动；放大一个小人，下拉框里换写法，冒出「你好，我来写！」。
- 超大字号逐字打出「帮我把周会整理成待办」，镜头跟着光标走；面板发出后是「正在听… / 润色中…」。
- 蓝框里的待办表逐行长出来；再说两句「再加一列：截止日期」「把李经理的事项标成紧急」，表格跟着变。
- 「首页改版周会 / 会议记录」大字 → 灰色声波 → 会议逐字稿页面（右下角小人头像）→ 再说一句，表里的待办逐条标成已完成。
- 「都写好了！接下来写什么？」→ 一张「会议记录员」卡片，周围长出一整墙写作助手卡片，镜头拉远 →「每个场景，都有人替你写。」→「从这里开始 mosmos.io」→ 标志和字标。

画面里的产品、文案和界面都来自 [mosmos.io](https://mosmos.io)。手绘小人是 Open Peeps（CC0，见 [ASSETS.md](ASSETS.md)）；配乐和音效用 numpy 合成。参考片只用来量时间和看运动方式，仓库里没有它的任何画面、音频或视频。

## 关键数字

| 项目 | 参考片 | 本模板 |
|---|---|---|
| 时长 | 90.05 秒 | 90.042 秒 |
| 帧率 | 24 | 24 |
| 画幅 | 1920×1080 | 1920×1080 |
| 剪辑点 | 26 个 | 26 个，时间相同（误差不超过 1 帧） |
| 速度 | 120 BPM | 120 BPM |
| 响度 | −15.2 LUFS | 约 −14 LUFS，真峰值不高于 −1.5 dBTP |

## 预览

![预览](preview.gif)

完整版（720p）：[preview.mp4](preview.mp4)

## 怎么渲染

```bash
cd templates/_engine
npm install
scripts/fetch-fonts.sh   # 一次即可：安装 Noto Sans SC / Noto Serif SC 可变字重（OFL）
RENDER_DIR=/tmp/renders scripts/render.sh 16-notion-agents
python3 scripts/qa.py ../16-notion-agents /tmp/renders/16-notion-agents.mp4   # 可选：剪辑点、响度和抽帧检查
```

`render.sh` 依次运行 `timeline.py`（剪辑点和音效事件）、`audio.py`（配乐）、`master.py`（归一到 −14 LUFS、限制真峰值）、Remotion 渲染，再合成 1080p 成片，并在本目录生成 `preview.mp4` 和 `preview.gif`。中间文件写在 `build/`，不进仓库。

## 文件

- `Film.tsx`：画面
- `timeline.py` / `timeline.json`：剪辑点、动画时间、音效事件
- `audio.py`：配乐和音效
- `meta.json`：规格和参考片信息
- `analysis.md`：参考片逐镜拆解
- `ASSETS.md`：外部素材来源和许可
- `peeps.mjs`：重新生成 Open Peeps 小人 SVG 的脚本
