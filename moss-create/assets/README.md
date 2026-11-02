# MOSS Create 素材说明

这个目录本来放的是从 create.moss.cn（mossland.studio 会跳转到这里）抓下来的素材。为了版权和体积，仓库里**没有**放下面这些东西：

| 不在仓库里的 | 为什么 | 怎么重新拿到 |
|---|---|---|
| `remotion/public/c/*.jpg` 模板封面（约 35 张） | 社区用户做的作品，里面有第三方品牌和人物 | `tools/fetch_templates.sh` |
| `remotion/public/v/*.mp4` 模板预览视频（约 15 段） | 同上，而且体积大 | `tools/fetch_templates.sh` |
| `footage/*.mp4` 网站录屏（每段 5–30 MB） | 体积大；画面里也有社区作品 | `cd tools && npm i && npx playwright install chromium && node record.mjs` |
| `site/*.png` 网站截图、`site/index.html` | 第三方页面；HTML 里带临时签名链接 | `cd tools && node pages.mjs && node interact.mjs && node texts.mjs` |

抓完以后跑 `tools/stage.sh`，把需要的文件放进 `remotion/public/`。

仓库里留着的只有两样：`remotion/public/logo.svg`（MOSS Create 官网的标志，版权归模思）和 `remotion/public/s/menu.png`（模型菜单的一小块截图）。

几点提醒：

- 录屏全程没有登录。点输入框会弹登录框，所以片子里的“输入”是点快捷生图标签触发的真实填充，没有展示生成结果。
- 网站内容一直在变。模板换了、页面改版了，`Film.tsx` 里的模板 id、坐标和镜头时间点都可能要跟着改。
- `record.mjs` 会隐藏两个登录推广弹窗（按文字匹配），但英文界面下的弹窗不一定能藏住。
