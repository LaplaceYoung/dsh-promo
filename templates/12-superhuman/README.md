# 模板 12 · 云雾渐变 + 套件分章

参考片：[Superhuman](https://www.youtube.com/watch?v=4XKq7qGnJus)（Superhuman (Grammarly)，2025）

风格：云雾渐变底 · 悬浮产品界面 · 米色图标转场 · 套件式分章

## 复刻了什么

- 淡蓝云雾开场「每一份工作，都从一句话开始。」，人物卡片周围浮起应用图标；紫色云雾里图标绕着 MosMos 图标转，再并进去。结构和时间点照参考片的 17 个剪辑点。
- 参考片的四个产品换成 MosMos 的四个功能：语音输入、场景识别、热词词库、会议记录，各有一个自绘的黑色图标。
- 每章同一个套路：米色底漂着图标气泡 → 黑色图标和名字 → 一种颜色的云雾 + 标题 + 界面浮上来演示（飞书群聊、场景切换、热词卡片、会议总结和待办）。
- 收尾：「MosMos，让你写下的每一句话，都」→「更像你。」→ 四个图标一排 → 米色底 MOSMOS 字标和 mosmos.io。开场人物用的是 Pexels 上的公开授权照片（见 [ASSETS.md](ASSETS.md)）。

画面里的产品、文案和界面都来自 [mosmos.io](https://mosmos.io)。开场人物照片来自 Pexels（见 [ASSETS.md](ASSETS.md)）；音乐是用 numpy 合成的，没有用任何采样或参考片的音频。参考片只用来量时间和看运动方式，仓库里没有它的任何画面、音频或视频。

## 关键数字

| 项目 | 参考片 | 本模板 |
|---|---|---|
| 时长 | 60.42 秒 | 60.417 秒 |
| 帧率 | 24 | 24 |
| 画幅 | 1920×1080（本地分析用 360p 副本） | 1920×1080 |
| 剪辑点 | 17 个 | 17 个，时间相同（误差不超过 1 帧） |
| 速度 | 130 BPM | 130 BPM |
| 响度 | −11.5 LUFS | 约 −14 LUFS，真峰值不高于 −1.5 dBTP |

帧率同为 24 fps。参考片 1080p 下载被 YouTube 人机验证拦住，分析用的是 360p 副本。

## 预览

![预览](preview.gif)

完整版（720p）：[preview.mp4](preview.mp4)

## 怎么渲染

```bash
cd templates/_engine
npm install
RENDER_DIR=/tmp/renders scripts/render.sh 12-superhuman
python3 scripts/qa.py ../12-superhuman /tmp/renders/12-superhuman.mp4   # 可选：剪辑点、响度和抽帧检查
```

`render.sh` 依次运行 `timeline.py`（剪辑点和音效事件）、`audio.py`（合成音乐）、`master.py`（归一到 −14 LUFS、限制真峰值）、Remotion 渲染，再合成 1080p 成片，并在本目录生成 `preview.mp4` 和 `preview.gif`。中间文件写在 `build/`，不进仓库。

## 文件

- `Film.tsx`：画面
- `timeline.py` / `timeline.json`：剪辑点、动画时间、音效事件
- `audio.py`：配乐和音效
- `meta.json`：规格和参考片信息
- `analysis.md`：参考片逐镜拆解
- `ASSETS.md`：外部素材来源和许可
