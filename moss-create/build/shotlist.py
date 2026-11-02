import os; ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # project root
import json,sys
sys.path.insert(0,ROOT+'/ref'); from shots import S
TL=json.load(open(ROOT+'/build/timeline.json'))
# id: (our content, on-screen text, source)
OURS={
"black":("Black open","—","—"),
"logo":("Drifting, blurred wall of real template covers from the site; the real MOSS Create mark (site SVG) glitches in, wordmark slides out","MOSS Create","real logo SVG + real covers"),
"meet":("Black, white flash bar, type-on with glowing caret","认识一下","type card"),
"cascade":("#efefef, product name, swish, vertical cascade scrolling up, lower rows tint to the brand green; the real home page rises in","MOSS Create ×18","type + real screenshot"),
"ui_auto":("Real home page screenshot (灵感) on a 3D tilt push-in. Cursor opens the composer's model menu: Auto ✓ / 专家 / 均衡 / 快速, hovers 专家 (parallel to 标准→创造)","Hi，今天想创作点什么？ / Auto · 专家 · 均衡 · 快速","real screenshots (menu pixels cropped from a real capture)"),
"card1":("White type card, green accent tail, zoom-blur exit","描述一下，直接成图","type card (site: 描述成图)"),
"chip1":("Real screen recording: cursor clicks the 快捷生图 chip 复古杂志封面, the composer fills with the full real prompt; camera pushes into the composer and send button","Hi，今天想创作点什么？ + real prompt","REAL footage"),
"chip2":("Real recording continues: the 像素游戏界面 chip fills a second real prompt (the 'agent working' beat)","real prompt","REAL footage"),
"mimage":("Real recording: MOSS Image zone masonry scroll (the result beat, like the countdown widget)","—","REAL footage"),
"card2":("Type card","喜欢哪个，直接用模板","type card (site button: 使用模板)"),
"side_hot":("Real home screenshot, close-up on the sidebar; cursor clicks 爆款","灵感 / 创作 / 音色库 / 资产 / 爆款 / 语音","real screenshot"),
"gallery":("Real recording: 爆款特效 gallery masonry scroll","—","REAL footage"),
"gallery2":("Real recording, closer: gallery mid-scroll","—","REAL footage"),
"tpl_card":("Masonry of real covers; the MOSS Bagel template card is hovered, its 使用模板 button appears and is clicked (hover state redrawn from the site's card UI)","使用模板","real covers + redrawn hover"),
"tpl_play":("Real template preview video (cats) pops up in a card","—","real template preview mp4"),
"tpl_push":("Push-in on the same preview","—","real template preview mp4"),
"q_more":("Kicker plus big line, big line flips ink→green","不止有画面 / 还能有声音","type card"),
"q1":("Type card","比如，给故事配个音？","type card"),
"voice":("Real recording: 音色库 voice library scroll, 4 framings on the reference's sub-cuts 47.70 / 49.90 / 51.57","精选音色 / 精选合集 …","REAL footage"),
"q2":("Type card","或者，来段早安电台？","type card (real scene chip 早安电台)"),
"synth":("Real 语音合成 page (screenshot), then real recording: the 早安电台 chip fills a multi-speaker script. Sub-cuts 55.13 / 55.87","试试这些场景 / 早安电台","real screenshot + REAL footage"),
"q3":("Type card plus echo duplicate","甚至，一起拍支宣传片？","type card"),
"agents":("Dark: the real 创作 (Agent) page floats in on a 3D tilt; cursor hovers the real example 生成源自长白山的矿泉水宣传视频","和 MOSS Create 一起，把想法变成作品","real screenshot"),
"card_yours":("Kicker plus green big line popping per char on 8ths","想做成什么样 / 你说了算","type card"),
"theme":("Customization beat (the reference's theme flips): real light mode, real dark mode, real English UI, flipping on every reference sub-cut","Hi，今天想创作点什么？ / Hi, what would you like to create today?","REAL footage + real screenshots"),
"typedel":("Type, delete, type, delete (two real feature names)","复古杂志封面 → 早安电台","type card"),
"orbit":("Fragments assemble the big line, ring of real template covers orbits, zoom-blur push-through","都能做出来","real covers"),
"m1":("Montage: real template preview videos (figurines → mushroom girl); sub-cut 77.27","—","real template previews"),
"m2":("Montage: three real portrait template previews, active one lit on each sub-cut 79.07 / 79.97","—","real template previews"),
"m3":("Montage: real template preview (snow scene)","—","real template preview"),
"card_cards":("Big line with 4 real template covers in the corners (like 随心所愿)","想到就做","real covers"),
"m4":("Montage: real template preview (penguin)","—","real template preview"),
"m5":("Montage: real recording, home page templates grid","—","REAL footage"),
"slogan":("Green big line assembles from scattered chars, push-in zoom (site's login tagline)","让灵感有声有色","type card (site copy)"),
"tagline":("Black, type-on with glowing caret, select-all highlight, delete (site's Agent page headline)","和 MOSS Create 一起，把想法变成作品","type card (site copy)"),
"outro":("Near-white, real mark plus MOSS Create wordmark; wordmark disperses on the ding, mark spins","MOSS Create","real logo SVG"),
"black_end":("Black","—","—"),
}
L=["# MOSS Create (mossland.studio) promo: shot list against the reference","",
f"Film: 1920×1080 60 fps and a re-laid-out 1080×1920 60 fps cut, {TL['end']:.2f} s. Music 110 BPM (the reference's tempo); every cut snapped to the 8th-note grid (0.2727 s). Same cut grid as the MosMos film.","",
"Reference = DeepSeek Harness 「创造模式」 (reference film, not included).","",
"| # | ref in–out | reference shot (type · content · text) | ours in–out | Δin | our shot | on-screen text (ours) | source | sub-cuts (ours, s) |","|---|---|---|---|---|---|---|---|---|"]
for i,sh in enumerate(TL['shots']):
    r=S[i]; c,tx,src=OURS[sh['id']]
    subs=', '.join(f"{f/60:.2f}" for f in sh['subs']) or '—'
    L.append(f"| {i+1} | {r[0]:.2f}–{r[1]:.2f} | {r[2]} · {r[3]} · {r[4]} | {sh['t0']:.2f}–{sh['t1']:.2f} | {1000*(sh['t0']-r[0]):+.0f} ms | {c} | {tx} | {src} | {subs} |")
open(ROOT+'/mossland-shotlist.md','w').write('\n'.join(L)+'\n')
print('ok')
