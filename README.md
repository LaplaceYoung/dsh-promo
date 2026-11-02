# dsh-promo

这个仓库用代码把 DeepSeek Harness「创造模式」宣传片的结构和节奏一帧帧拆出来，再套到两个产品上，各做了一支宣传片：

- **MosMos**（mosmos.io，桌面语音输入工具）
- **MOSS Create**（mossland.studio，访问会跳转到 create.moss.cn，是一个 AI 图像、视频和配音创作平台）

两支片子都是 99.8 秒、37 个镜头。剪辑点和参考片对齐，统一吸附到 110 BPM 的八分音符网格上。画面用 Remotion 逐帧渲染，配乐和音效全部用 Python 合成，没有用任何采样。

这里放的是全部代码、工程文件，还有复刻的思路和过程。参考片本身**不在仓库里**。

## 成片

### MosMos

<video src="https://raw.githubusercontent.com/LaplaceYoung/dsh-promo/main/preview/mosmos-promo.mp4" controls width="100%"></video>

播放不了的话直接打开：[preview/mosmos-promo.mp4](preview/mosmos-promo.mp4)

### MOSS Create

<video src="https://raw.githubusercontent.com/LaplaceYoung/dsh-promo/main/preview/moss-create-promo.mp4" controls width="100%"></video>

播放不了的话直接打开：[preview/moss-create-promo.mp4](preview/moss-create-promo.mp4)

两个文件都是完整的 99.8 秒成片，为了放进仓库，重新压成了 1080p、30 fps，每个大约 13 MB。原始母版是 60 fps，可以按下面的步骤自己渲染。

## 目录

```
docs/
  method.md               复刻思路和过程（怎么拆参考片、怎么对节拍、怎么做产品画面和配乐、怎么检查）
  reference-analysis.md   参考片拆解：逐镜头表、节拍、配色、段落比例（纯文字，没有画面）
mosmos/
  build/timeline.py       时间线：37 个镜头 + 镜头内小切 + 打字和音效事件，生成 timeline.json
  build/shotlist.py       生成和参考片逐条对照的镜头表
  build/finish.sh         混音、竖版
  audio/audio.py          配乐和 UI 音效合成（numpy / scipy）
  remotion/src/           Film.tsx（每个镜头的画面）、lib.tsx（打字、光标、logo 等组件）
  remotion/public/        MosMos 官网的 logo 和插画纹理
  ref/shots.py            参考片镜头表（给 shotlist.py 用）
  tools/                  抓 mosmos.io 截图的 Playwright 脚本
  mosmos-shotlist.md      镜头对照表
  PROGRESS.md             重建命令
moss-create/
  build/  audio/  remotion/  ref/   同上；remotion 里多了竖版构图 MossV
  tools/                  抓 create.moss.cn 的截图、录屏、模板素材的脚本
  assets/README.md        哪些素材没放进仓库、为什么、怎么重新抓
  mossland-shotlist.md    镜头对照表
  PROGRESS.md             重建命令
preview/                  两支成片（1080p / 30 fps 压缩版）
```

## 环境

- Node.js 20 以上（我们用的是 24），Remotion 4.0.539（`npm ci` 会装好）
- ffmpeg（7.x 可以）
- Python 3，需要 `numpy scipy pillow`
- 字体：Noto Sans CJK SC、Inter、Geist、Geist Mono，要装成系统字体。Debian / Ubuntu 上 `apt install fonts-noto-cjk`，Inter 和 Geist 可以从 Google Fonts 下载。没装中文字体会出现方块字。
- 只有重新抓 MOSS Create 素材时才需要 Playwright（`tools/package.json`，`npx playwright install chromium`）
- 渲染用的是 `--gl=swangle`（无 GPU 的服务器也能跑）。一支横版大约渲染 6–7 分钟（7 并发）。

## 怎么重建

具体命令在 `mosmos/PROGRESS.md` 和 `moss-create/PROGRESS.md`。大致顺序：

```bash
cd mosmos                      # 或 moss-create
python3 build/timeline.py && cp build/timeline.json remotion/src/
cd audio && python3 audio.py && cd ..     # 再按 PROGRESS.md 做两遍 loudnorm，得到 audio/mix.wav
cd remotion && npm ci && npx remotion render src/index.ts Mosmos ../build/silent.mp4 --codec h264 --crf 17 --gl=swangle --muted
cd .. && build/finish.sh
```

MOSS Create 的合成名叫 `Moss`（横版）和 `MossV`（竖版）。渲染前要先按 `moss-create/assets/README.md` 把录屏和模板素材抓回来，仓库里没有这些，直接渲染会缺文件。

改文案改节奏，只动 `build/timeline.py`（时间和打字内容）和 `remotion/src/Film.tsx`（画面）。音效的时间点也从 timeline.json 读，所以画面和声音不会对不上。

## 几件要说清楚的事

- **参考片**：DeepSeek Harness「创造模式」宣传片，版权归原作者。仓库里没有它的视频、音频、截图或缩略图，`docs/` 里只有文字拆解（镜头时间、画面描述、屏幕上的文字）。想对照的话，自己找公开版本看。
- **MOSS Create 成片里的模板内容**：画面中出现的模板封面和预览视频是 create.moss.cn 上社区用户的作品，有些带第三方品牌，版权归各自作者和品牌方，仓库只是按网站原样录屏展示。
- **产品名称和标志**：MosMos、MOSS Create、DeepSeek 等名称和 logo 归各自所有者。`mosmos/remotion/public/` 里的 logo 和纹理取自 mosmos.io，`moss-create/remotion/public/logo.svg` 取自 create.moss.cn，放在这里只是为了能把工程跑起来。
- **这不是官方宣传片**。两支片子是练手和方法演示，和这几家公司都没有关系。
- MosMos 是要安装的桌面软件，我们没有真实录屏，界面是照官网演示重画的。MOSS Create 用的是不登录时的真实录屏和截图，没法展示生成过程和结果。
- 代码按 MIT 协议开源（见 `LICENSE`），协议不覆盖上面提到的第三方内容。
