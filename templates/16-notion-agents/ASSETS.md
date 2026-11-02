# 素材来源

| 文件 | 用在哪里 | 标题 | 作者 | 来源 | 许可 |
|---|---|---|---|---|---|
| `templates/_engine/public/t16-p1…p6.svg、t16-p1-head…p6-head.svg` | 所有手绘小人：开场一排、写法选择、思考中、会议头像、卡片墙 | Open Peeps（6 个角色，由 `peeps.mjs` 从 npm 包 @opeepsfun/open-peeps 1.0.6 拼出） | Pablo Stanley（插画）；opeeps.fun（npm 包，MIT） | <https://www.openpeeps.com/> | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| 系统字体（不进仓库，`templates/_engine/scripts/fetch-fonts.sh` 下载） | 粗体中文（Noto Sans SC 800） | Noto Sans SC / Noto Serif SC 可变字重 | Google Fonts / Adobe | <https://github.com/google/fonts/tree/main/ofl/notosanssc> | [SIL OFL 1.1](https://openfontlicense.org) |

Pexels 素材可免费使用和修改，不需署名，这里仍然署名。Freesound 和 Open Peeps 素材是 CC0（公有领域）。

其余画面是代码画的，配乐和音效是 numpy 合成的。小人 SVG 可以用 `node peeps.mjs '<配置>'` 重新生成（需要先 `npm pack @opeepsfun/open-peeps` 并解包，见文件开头注释）。
