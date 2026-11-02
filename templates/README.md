# 模板

每个 `NN-slug/` 是一个独立的模板：对着一支公开的产品宣传片逐帧拆解，照它的时长、剪辑点、节拍和镜头运动重做，内容换成 [MosMos](https://mosmos.io)。参考片清单见 [../docs/reference-catalog.md](../docs/reference-catalog.md)。

## 目录结构

```
templates/
  _engine/              共用的 Remotion 工程
    src/mos.tsx         MosMos 的颜色、字体、文案（COPY）和界面组件
    src/kit.tsx         镜头、景深、颗粒、手形光标等通用组件
    src/Root.tsx        注册所有模板的合成（T03、T04……）
    audio/synth.py      配乐合成器：鼓、贝斯、铺底、拨弦和 UI 音效
    scripts/render.sh   一条命令渲染一个模板
    scripts/master.py   母带：归一响度（默认 −14 LUFS），真峰值压到 −1.5 dBTP 以下
    scripts/register.py 把新模板注册进 Root.tsx
    scripts/qa.py       剪辑点、响度和抽帧检查
    scripts/previews.sh 生成 preview.mp4（720p）和 preview.gif
  NN-slug/
    Film.tsx  timeline.py  audio.py  meta.json  analysis.md  README.md
```

## 渲染

需要 Node.js 20+、ffmpeg、Python 3（numpy、scipy），以及系统字体 Noto Sans CJK SC、Geist、Geist Mono。

```bash
cd templates/_engine
npm install
RENDER_DIR=/tmp/renders scripts/render.sh 07-notion-ai          # 1080p 成片写到 /tmp/renders/
python3 scripts/qa.py ../07-notion-ai /tmp/renders/07-notion-ai.mp4
node stills.mjs T07 3.4 13.5 22.5                                 # 只看几帧静图，写到 build/stills/
```

中间文件（混音、无声视频、检查结果、静图）都写在各自的 `build/`，已经在 `.gitignore` 里。

- 响度：`master.py` 先限幅再编码成 AAC，按编码后的结果反复调整，直到响度在目标 ±0.4 LU 以内、真峰值不高于 −1.6 dBTP。目标默认 −14 LUFS，个别模板可以在 `meta.json` 里写 `"lufs": -16` 改掉。
- 只改了配乐：`SKIP_RENDER=1 RENDER_DIR=/tmp/renders scripts/render.sh 07-notion-ai` 会跳过画面渲染，从已有成片里取出画面，只重做音频、成片和预览。

## 新加一个模板

1. 拆参考片：剪辑点（逐帧差分）、抽帧通读、抄字取色、求 BPM，写进 `analysis.md`。
2. 写 `timeline.py`（剪辑点和音效事件）和 `meta.json`（id、合成名、帧率、时长、BPM、剪辑点、预览片段、参考片信息）。
3. 写 `Film.tsx`（导出 `Film`），在 `_engine` 里跑 `python3 scripts/register.py NN-slug` 注册到 `Root.tsx`。
4. 写 `audio.py`，用 `synth.py` 的 `Session`。
5. 跑 `render.sh` 和 `qa.py`，看静图、剪辑点和响度。
