# 素材署名

模板默认用代码画画面、用 numpy 合成配乐。从模板 12 开始，如果参考片里有实拍或照片，会改用许可允许再分发的公开素材（Pexels、Pixabay、Unsplash、Mixkit、Freesound CC0/CC-BY、Google Fonts/OFL、Poly Haven CC0 等）。每个用到外部素材的模板目录里有一份 `ASSETS.md`，这里汇总。

规则：

- 只用许可允许在公开仓库里再分发的素材，并在这里署名。
- 不用其他品牌的商标 logo，不用可辨认的名人。
- 原始大文件留在仓库外，仓库里只放构建需要的裁切、压缩版本；太大的素材改用下载脚本。

| 模板 | 文件 | 标题 | 作者 | 来源 | 许可 |
|---|---|---|---|---|---|
| 12 | `templates/_engine/public/t12-woman.webp` | Back View of a Woman in a White Shirt and Hair in a Low Bun | Mathilde Langevin | <https://www.pexels.com/photo/back-view-of-a-woman-in-a-white-shirt-and-hair-in-a-low-bun-13347114/> | [Pexels License](https://www.pexels.com/license/) |
| 13 | `templates/_engine/public/t13-wall.webp` | Aerial Shot of Forest and Mountains | Richard Wilson | <https://www.pexels.com/photo/10191081/> | [Pexels License](https://www.pexels.com/license/) |
| 13 | `templates/_engine/public/t15-talk.mp4` | Man Wearing Headphones Talking（截取 2–5.6 秒，640×360，无声） | Antoni Shkraba | <https://www.pexels.com/video/8048325/> | [Pexels License](https://www.pexels.com/license/) |
| 13 | `templates/_engine/audio/samples/fs378085-mech-key.mp3` | mechanical key hard.wav | bigmonmulgrew | <https://freesound.org/s/378085/> | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| 13 | `templates/_engine/audio/samples/fs766640-key-tactile.mp3` | Keyboard_Tactile_9 | StavSounds | <https://freesound.org/s/766640/> | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| 13 | `templates/_engine/audio/samples/fs570754-key-down.mp3` | Keyboard - Press down | Foxfire- | <https://freesound.org/s/570754/> | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| 13 | 系统字体（不进仓库，`templates/_engine/scripts/fetch-fonts.sh` 下载） | Noto Sans SC / Noto Serif SC 可变字重 | Google Fonts / Adobe | <https://github.com/google/fonts/tree/main/ofl/notosanssc> | [SIL OFL 1.1](https://openfontlicense.org) |
| 14 | `templates/_engine/public/t14-armchair.webp` | White Armchair Beside the Wooden Side Table | dada _design | <https://www.pexels.com/photo/12277405/> | [Pexels License](https://www.pexels.com/license/) |
| 14 | `templates/_engine/public/t14-chair.webp` | Ceramic Vase on the Center Table Beside Wooden Chair | dada _design | <https://www.pexels.com/photo/12278558/> | [Pexels License](https://www.pexels.com/license/) |
| 14 | `templates/_engine/public/t14-lounge.webp` | Minimalist Interior with White Armchairs and Textured Decor | Pavel Morillo | <https://www.pexels.com/photo/30183860/> | [Pexels License](https://www.pexels.com/license/) |
| 14 | `templates/_engine/public/t14-lamp.webp` | A White Ceramic Vase on the Bedside Table | Taryn Elliott | <https://www.pexels.com/photo/9565784/> | [Pexels License](https://www.pexels.com/license/) |
| 14 | 系统字体（不进仓库，`templates/_engine/scripts/fetch-fonts.sh` 下载） | Noto Sans SC / Noto Serif SC 可变字重 | Google Fonts / Adobe | <https://github.com/google/fonts/tree/main/ofl/notosanssc> | [SIL OFL 1.1](https://openfontlicense.org) |
| 15 | `templates/_engine/public/t15-forest.webp` | Aerial Photography of Tall Trees and Green Mountains | Barnabas Davoti | <https://www.pexels.com/photo/9246670/> | [Pexels License](https://www.pexels.com/license/) |
| 15 | `templates/_engine/public/t15-mist.webp` | Aerial Shot of Forest and Mountains（转灰度） | Richard Wilson | <https://www.pexels.com/photo/10191081/> | [Pexels License](https://www.pexels.com/license/) |
| 15 | `templates/_engine/public/t15-lamp.webp` | A White Ceramic Vase on the Bedside Table（裁切） | Taryn Elliott | <https://www.pexels.com/photo/9565784/> | [Pexels License](https://www.pexels.com/license/) |
| 15 | `templates/_engine/public/t15-talk.mp4` | Man Wearing Headphones Talking（截取 2–5.6 秒，640×360，无声） | Antoni Shkraba | <https://www.pexels.com/video/8048325/> | [Pexels License](https://www.pexels.com/license/) |
| 15 | 系统字体（不进仓库，`templates/_engine/scripts/fetch-fonts.sh` 下载） | Noto Sans SC / Noto Serif SC 可变字重 | Google Fonts / Adobe | <https://github.com/google/fonts/tree/main/ofl/notosanssc> | [SIL OFL 1.1](https://openfontlicense.org) |
| 16 | `templates/_engine/public/t16-p1…p6.svg、t16-p1-head…p6-head.svg` | Open Peeps（6 个角色，由 `peeps.mjs` 从 npm 包 @opeepsfun/open-peeps 1.0.6 拼出） | Pablo Stanley（插画）；opeeps.fun（npm 包，MIT） | <https://www.openpeeps.com/> | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| 16 | 系统字体（不进仓库，`templates/_engine/scripts/fetch-fonts.sh` 下载） | Noto Sans SC / Noto Serif SC 可变字重 | Google Fonts / Adobe | <https://github.com/google/fonts/tree/main/ofl/notosanssc> | [SIL OFL 1.1](https://openfontlicense.org) |
| 17 | `templates/_engine/public/t17-kb-white.webp` | Macbook Keyboard（画面里没有品牌标志） | Pixabay | <https://www.pexels.com/photo/532173/> | [Pexels License](https://www.pexels.com/license/) |
| 17 | `templates/_engine/public/t17-kb-retro.webp` | Keyboard with White Keys | Huy Phan | <https://www.pexels.com/photo/16222012/> | [Pexels License](https://www.pexels.com/license/) |
| 17 | `templates/_engine/audio/samples/fs378085-mech-key.mp3` | mechanical key hard.wav | bigmonmulgrew | <https://freesound.org/s/378085/> | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| 17 | `templates/_engine/audio/samples/fs766640-key-tactile.mp3` | Keyboard_Tactile_9 | StavSounds | <https://freesound.org/s/766640/> | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| 17 | `templates/_engine/audio/samples/fs570754-key-down.mp3` | Keyboard - Press down | Foxfire- | <https://freesound.org/s/570754/> | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| 17 | 系统字体（不进仓库，`templates/_engine/scripts/fetch-fonts.sh` 下载） | Noto Sans SC / Noto Serif SC 可变字重 | Google Fonts / Adobe | <https://github.com/google/fonts/tree/main/ofl/notosanssc> | [SIL OFL 1.1](https://openfontlicense.org) |
| 18–22 | 系统字体（不进仓库，`templates/_engine/scripts/fetch-fonts.sh` 下载） | Noto Sans SC / Noto Serif SC 可变字重 | Google Fonts / Adobe | <https://github.com/google/fonts/tree/main/ofl/notosanssc> | [SIL OFL 1.1](https://openfontlicense.org) |
| 20 | `templates/_engine/public/t20-studio.webp` | Studio Small 03（色调映射 JPG，缩到 1024×512） | Greg Zaal（Poly Haven） | <https://polyhaven.com/a/studio_small_03> | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| 21 | `templates/_engine/public/t21-earth.webp` | Distant Sunlight Illuminating Earth's Horizon（旋转 90°、裁切，片中调成蓝色） | Zelch Csaba | <https://www.pexels.com/photo/30596307/> | [Pexels License](https://www.pexels.com/license/) |
| 22 | `templates/_engine/public/t22-paper.webp` | Photograph of a Brown Surface（缩到 1280×720，正片叠底） | Clarissa Schwarz | <https://www.pexels.com/photo/8941371/> | [Pexels License](https://www.pexels.com/license/) |
| 22 | `templates/_engine/audio/samples/fs851276-paper-fold.mp3` | Folding paper quickly in different ways（转单声道） | kindofjo | <https://freesound.org/s/851276/> | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| 22 | `templates/_engine/audio/samples/fs68224-paper-double.mp3` | paper_double.wav（转单声道） | XTYL33 | <https://freesound.org/s/68224/> | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| 23–27 | 系统字体（不进仓库，`templates/_engine/scripts/fetch-fonts.sh` 下载） | Noto Sans SC / Noto Serif SC 可变字重 | Google Fonts / Adobe | <https://github.com/google/fonts/tree/main/ofl/notosanssc> | [SIL OFL 1.1](https://openfontlicense.org) |
| 27 | `templates/_engine/public/t27-streaks.webp` | Irregular Streaks of Lights（裁到 1600×900，片中调成蓝色） | Mahdi Bafande | <https://www.pexels.com/photo/15629018/> | [Pexels License](https://www.pexels.com/license/) |
| 27 | `templates/_engine/public/t27-streaks-teal.webp` | Abstract Blue Light Streaks on Dark Background（旋转 90°，裁到 1600×900） | Djimmer Koster | <https://www.pexels.com/photo/29333569/> | [Pexels License](https://www.pexels.com/license/) |
| 27 | `templates/_engine/public/t27-sea.webp` | Aerial Photo of Water Waves（裁到 960×640） | Magda Ehlers | <https://www.pexels.com/photo/988526/> | [Pexels License](https://www.pexels.com/license/) |
| 28–32 | 系统字体（不进仓库，`templates/_engine/scripts/fetch-fonts.sh` 下载） | Noto Sans SC / Noto Serif SC 可变字重 | Google Fonts / Adobe | <https://github.com/google/fonts/tree/main/ofl/notosanssc> | [SIL OFL 1.1](https://openfontlicense.org) |
| 33–37 | 系统字体（不进仓库，`templates/_engine/scripts/fetch-fonts.sh` 下载） | Noto Sans SC / Noto Serif SC 可变字重 | Google Fonts / Adobe | <https://github.com/google/fonts/tree/main/ofl/notosanssc> | [SIL OFL 1.1](https://openfontlicense.org) |
| 35 | `templates/_engine/public/t35-marble.webp` | Light Pink Marble Stone Texture（旋转 90°，缩到 2000×1125，片中调亮） | Kaboompics.com | <https://www.pexels.com/photo/4709032/> | [Pexels License](https://www.pexels.com/license/) |
