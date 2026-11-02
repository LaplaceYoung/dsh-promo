# Reference analysis — DeepSeek Harness 「创造模式」 promo

Source: the public Bilibili upload BV1i24P6rEmt (the video file is NOT included in this repo). 1280×720, 30 fps, 99.80 s, AAC 44.1 kHz stereo. Integrated loudness −16.3 LUFS, LRA 5.0 LU. A bilibili watermark sits top-left and is not part of the design.

## Method
- 5 fps frames of the whole film (499 frames, 13 contact sheets), 32 full-res key frames — kept locally only, not published.
- Cut scan: mean abs luma diff at native 30 fps (320×180), peaks > 7 and > 2.5× local median. 29 hard cuts are found. The rest are soft (type-on → cut, zoom-blur, dissolve), so they were timed by hand from the 5 fps sheets (±0.1 s).
- Audio: librosa onsets plus onset-envelope autocorrelation per section. `beat_track` reports 143.6 BPM, but that is a mis-lock. Autocorrelation peaks sit at 0.273 s (8th), 0.819 s (dotted quarter, 3-3-2 syncopation), 1.091 s (half) and 2.183 s (bar). **The track is 110.0 BPM** (beat 0.5455 s, bar 2.182 s), and an 8th-grid fit to the strongest onsets gives offset 0.030 s. 60–72 s is a half-time breakdown (dominant lag 1.637 s = 3 beats).
- Colors were sampled from frames. White text cards use #fdfdfd and the cascade card uses #efefef. Body text is #131925 / #1a2333 and the accent blue is #2c63c7. The intro fluid is #223a59 navy and the end cards are #000000 / #fcfcfc.

## Global style
- No voiceover. Upbeat electronic track at 110 BPM with 3-3-2 kick/synth syncopation, a half-time drop at 60–72 s and a full return at ~75 s. Music thins out from 92 s and ends on a logo ding.
- Heavy UI foley: key taps for every type-on character, mouse clicks, swooshes on zoom-blur exits, glitch hits on the logo, and a ding at the end.
- Monochrome chrome (white, near-black, grays) so the generated content carries all the color. A single accent blue marks the second half of each text card.
- Type: bold geometric CJK sans (PingFang-like), centered. Text cards run ~5–7.5 % of frame height, the big-line cards (更厉害的？ / 你来定义 / 都能实现 / 创造属于自己的插件) ~9–12 %, and small kicker lines ~2.5 %. The black cards use a white glowing caret.
- Motion: type-on at ~4–5 chars/s with a caret, a 3D-tilted UI window push-in, cursor-driven demos, zoom-blur whips between text and UI, a vertical cascade of duplicated words, fragment assembly for the big cards, and an echo/duplicate line.
- Rhythm: text cards last 1.5–3.3 s here (shorter than the brief's estimate) and UI demos 1.1–6.3 s, with ~37 shots plus ~14 sub-cuts (~51 cuts). Cuts land loosely on the 110 BPM 8th grid: mean |offset| is 59 ms against a 136 ms half-8th, so they are only partly locked. The tightest lock is in the 57–72 s and 96–99 s hard cuts (≤ 35 ms).

## Shot list / beat map

| # | in | out | dur | shot type | content | on-screen text | motion | transition out | audio cue | beat (110 BPM) |
|---|---|---|---|---|---|---|---|---|---|---|
| R1 | 0.00 | 0.53 | 0.53 | black | Black open | — | static | fade/glitch in | silence → riser start | -0.06 |
| R2 | 0.53 | 3.60 | 3.07 | logo | Smoky blue fluid bg (#223a59), white whale icon glitches in (scanlines 0.4–0.6), wordmark+badge slide out right at 2.0–2.4 | deepseek HARNESS | slow fluid drift, icon scale 0.9→1, wordmark slide-out | blur-dissolve to black 3.4–3.6 | pad + sub swell, glitch hit at 0.6 | 0.92 |
| R3 | 3.60 | 5.93 | 2.33 | text/black | Black; white selection bar flashes 4.6, then type-on with glowing caret | 认识一下 | type-on per char (~0.2 s/char), caret glow | hard cut (diff 250) | key taps on each char; hit at 5.93 | 6.55 |
| R4 | 5.93 | 9.60 | 3.67 | text/white | #efefef bg; feature name centered, dark slate #1a2333 bold ≈7.5% frame h; at 6.8 motion-blur swish, 7.0 duplicates into vertical column that scrolls up; last rows tint purple→blue gradient | 创造模式 ×9 | cascade/duplicate + upward scroll | UI window rises from bottom (9.4–10.2), overlap | whoosh 6.8, kick enters (4.93/6.03 onsets) | 10.82 |
| R5 | 9.60 | 13.07 | 3.47 | UI demo | Chat app window, 3D tilt push-in; headline 探索未至之境 + 预览版; cursor opens mode dropdown 标准模式→创造模式 (11.0–12.8) | 探索未至之境 / 标准模式 / 创造模式 | 3D tilt push-in, cursor move, menu pop | soft cut to white | mouse clicks 11.8, 12.6 | 17.55 |
| R6 | 13.07 | 16.40 | 3.33 | text/white | #fdfdfd; type-on, 2nd phrase in accent blue #2c63c7 | 创建插件，轻轻松松 | type-on, then zoom-blur exit left 16.0–16.4 | zoom-blur whip | key taps; swoosh 16.2 | 23.90 |
| R7 | 16.40 | 20.60 | 4.20 | UI close-up | Composer box tilted; types prompt; push to send button; click; button collapses to dot → pill loader | 帮我做一个下班倒计时插件 | type-on, camera push to button, morph | morph to white | typing foley, click 19.1, blip | 30.01 |
| R8 | 20.60 | 23.77 | 3.17 | UI stream | White; agent status lines stream in and scroll | 已完成分析 / 我会先加载插件开发技能… | line-by-line fade-up, scroll | hard cut | soft ticks | 37.71 |
| R9 | 23.77 | 28.40 | 4.63 | UI demo | Full app; push-in to countdown widget 00:00:04→00:00:00; flips green 已下班 / 今天辛苦了。 progress 100% | 00:00:04 … 今天辛苦了。 | push-in, digit ticks, color flip | cut to white 28.4 | tick per second, chime on done | 43.52 |
| R10 | 28.40 | 30.77 | 2.37 | text/white | Type-on, accent on 2nd phrase | 写好插件，直接开用 | type-on | hard cut | key taps | 52.01 |
| R11 | 30.77 | 32.27 | 1.50 | UI close-up | Window floating on dark blue bg; sidebar 更多 → menu 浏览更多插件 / 创建你的插件 | 更多 / 创建你的插件 | cursor, menu pop, slight push | hard cut | click | 56.35 |
| R12 | 32.27 | 35.70 | 3.43 | UI demo | Composer typing long prompt; send click | 创建一个带左侧栏入口的 DSH 插件。创建一个便签墙插件… | type-on, push to send | dissolve | typing, click 35.4 | 59.10 |
| R13 | 35.70 | 37.83 | 2.13 | UI stream | Agent response streams in window | … | scroll | hard cut | ticks | 65.40 |
| R14 | 37.83 | 39.73 | 1.90 | UI close-up | Sidebar: new 便签墙 entry appears, cursor clicks it | 便签墙 | cursor | hard cut | click 39.0 | 69.31 |
| R15 | 39.73 | 40.87 | 1.13 | UI demo | Sticky-note wall plugin opens (pastel notes) | 写下你的下一个灵感… | window open | hard cut | pop | 72.79 |
| R16 | 40.87 | 42.60 | 1.73 | UI close-up | Notes close-up, push-in | 给每个想法，一个落脚的地方。… | push-in | hard cut to white | — | 74.87 |
| R17 | 42.60 | 45.00 | 2.40 | text/white | Small line top, big line; big turns black→blue at 43.6 | 还想试试 / 更厉害的？ | fade-in, color flip | cut | hit 42.0 | 78.05 |
| R18 | 45.00 | 47.23 | 2.23 | text/white | Type-on with caret, accent phrase | 比如，内置设计工作台？ | type-on | hard cut | key taps | 82.45 |
| R19 | 47.23 | 52.20 | 4.97 | UI demo | Poster workbench (sub-cuts 47.70, 49.90, 51.57): poster palette changes | Everything can be created | close-ups, cursor clicks swatches | hard cuts | clicks on swatches | 86.54 |
| R20 | 52.20 | 54.53 | 2.33 | text/white | Type-on | 或者，一款沙盒游戏？ | type-on | hard cut | key taps | 95.65 |
| R21 | 54.53 | 57.57 | 3.03 | UI demo | Voxel island game, day→dusk→night (sub-cuts 55.13, 55.87) | — | orbit camera | hard cut | whoosh | 99.92 |
| R22 | 57.57 | 59.57 | 2.00 | text/white | Type-on; echo duplicate under line at 59.0 | 甚至，开发模型可视化工具？ | type-on + echo | hard cut | key taps | 105.49 |
| R23 | 59.57 | 62.90 | 3.33 | UI demo dark | Transformer 3D viz, dark navy | — | orbit/pan | hard cut | sub drop | 109.15 |
| R24 | 62.90 | 64.97 | 2.07 | text/white | Small gray line, big blue line typed per char | 你的 Harness / 你来定义 | per-char pop | hard cut | hits per char | 115.26 |
| R25 | 64.97 | 71.23 | 6.27 | UI demo dark | Dark app theme switching: navy→purple→green terminal→brown (sub-cuts 66.0, 67.5, 67.9, 68.9, 69.3, 70.4, 71.0) | — | cursor, rapid theme flips | hard cut | half-time groove (3-beat lag), clicks | 119.05 |
| R26 | 71.23 | 74.00 | 2.77 | text/white | Type 使用创造模式 → backspace → 你的想法 → backspace | 使用创造模式 / 你的想法 | type, delete, type, delete | fragment build | keys, backspace rattle | 130.54 |
| R27 | 74.00 | 75.77 | 1.77 | text+cards | Fragmented chars assemble into big text; ring of mini plugin cards orbit; zoom-blur push | 都能实现 | fragment assemble, orbit, zoom-blur through | zoom-blur cut | impact 74.0, riser | 135.61 |
| R28 | 75.77 | 78.23 | 2.47 | montage | Video editor plugin, dark (sub-cut 77.27) | — | push | hard cut | full beat returns | 138.85 |
| R29 | 78.23 | 80.97 | 2.73 | montage | 3D landmark viewer (sub-cuts 79.07, 79.97) | — | push | hard cut | — | 143.37 |
| R30 | 80.97 | 82.33 | 1.37 | montage | Fitness dashboard (green bars) | — | push | hard cut | — | 148.39 |
| R31 | 82.33 | 83.97 | 1.63 | text+cards | 4 illustrated cards in corners around center text | 随心所愿 | fragment assemble, cards float | hard cut | hit | 150.89 |
| R32 | 83.97 | 85.80 | 1.83 | montage | 3D human pose, dark | — | rotate | hard cut | — | 153.89 |
| R33 | 85.80 | 89.43 | 3.63 | montage | Document reader with highlights | — | scroll/highlight | hard cut | — | 157.25 |
| R34 | 89.43 | 91.83 | 2.40 | text/white | Big blue bold line assembles from scattered chars, then push-in zoom 91.2–91.8 | 创造属于自己的插件 | assemble + push-in | hard cut to black | riser into stop | 163.91 |
| R35 | 91.83 | 96.37 | 4.53 | text/black | Type-on with glowing caret, select-all highlight 94.4, delete | 创造模式，定制你的专属 Harness | type, select, delete | hard cut | keys; music drops out | 168.31 |
| R36 | 96.37 | 99.23 | 2.87 | logo/white | Logo + wordmark; wordmark disperses (97.0–97.4); icon alone spins | deepseek HARNESS | disperse, spin | cut to black | ding ~96.9, tail | 176.62 |
| R37 | 99.23 | 99.80 | 0.57 | black | End | — | — | — | tail | 181.87 |

Sub-cuts inside shots (exact, frame diff): 47.70, 49.90, 51.57 (R19); 55.13, 55.87 (R21); 66.00, 67.50, 67.90, 68.93, 69.33, 70.40, 70.97 (R25); 77.27 (R28); 79.07, 79.97 (R29).

## Act structure (proportions of 99.8 s)
| act | span | share |
|---|---|---|
| Logo intro + 认识一下 | 0–5.9 | 6 % |
| Feature-name cascade + UI mode switch | 5.9–13.1 | 7 % |
| Demo 1 (countdown) with 2 text cards | 13.1–30.8 | 18 % |
| Demo 2 (sticky wall) | 30.8–42.6 | 12 % |
| Escalating question cards + 3 big demos | 42.6–62.9 | 20 % |
| 你来定义 customization | 62.9–71.2 | 8 % |
| Typed/deleted + 都能实现 | 71.2–75.8 | 5 % |
| Rapid montage + 随心所愿 | 75.8–89.4 | 14 % |
| Payoff line, typed-deleted tagline, logo outro | 89.4–99.8 | 10 % |

Note: the earlier rough breakdown read the R31 card as 「随心所欲」. The frames show **「随心所愿」**.
