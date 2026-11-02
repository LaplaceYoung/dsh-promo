import os; ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # project root
import json,sys
sys.path.insert(0,ROOT+'/ref'); from shots import S
TL=json.load(open(ROOT+'/build/timeline.json'))
OURS={
"black":("Black open","—"),
"logo":("Brand blue mesh texture from the site (tex-mesh), the real app icon's pixels assemble onto the white tile with a glitch, wordmark MosMos slides out","MosMos"),
"meet":("Black, white flash bar, then type-on with a glowing caret","认识一下"),
"cascade":("#efefef, core feature name. Swish, then a vertical cascade that scrolls up while the lower rows tint toward the accent. The hero demo card rises in at the end","语音输入 ×16"),
"ui_fn":("Recreated site hero demo card (dunes texture, 当前场景 · 飞书 / 微信) on a 3D tilt push-in. Cursor clicks the input box, the Fn keycap is pressed, and the idle dot expands into the voice pill (replaces the 标准→创造 dropdown)","当前场景 · 飞书 / 微信 / 语音输入"),
"card_fn":("White type card with the accent tail, zoom-blur exit left","按一次 Fn，开口就行"),
"listen":("Close-up of the raw-voice bubble streaming the site's demo sentence with filler 呃，. Fn is pressed again, the pill flips to 润色中 and collapses to a dot loader","呃，第一版我们周三前给你，你先把品牌素材发我。"),
"refine":("White: 原始语音 line, filler struck out, refined line assembles below (润色后 · 标准润色)","第一版周三前发你，你先把品牌素材给我就行。"),
"sent":("Generic monochrome chat window. The refined text pastes into the input, the pill reads 已写好, push-in, then the message lands as a black bubble (payoff, like the countdown's 今天辛苦了)","已写好"),
"card_done":("Type card","再按一次，文字写好"),
"tabs_mail":("Window floating on the blue mesh. Section 01 card 你在哪里说，决定我们怎么写. Cursor clicks the 邮件 scene chip and the pill style changes to 完整专业","飞书 / 微信 · 邮件 · 文档 · 提示词 · 代码与终端"),
"mail_speak":("Mail compose window, raw speech streams in (the site's mail demo). Fn press, then 润色中","那个，李经理您好，第一版方案…"),
"mail_out":("Formatted letter output line by line, pill 已写好","李经理，您好：… 谢谢！小林"),
"tabs_doc":("Scene chips again; cursor clicks 文档, style 结构清晰","文档"),
"doc_open":("Doc window opens with the raw 项目复盘 speech, pill 润色中","嗯，项目复盘，…"),
"doc_close":("Push-in on the structured output","项目复盘 / 目标： / 结果： / 下一步："),
"q_more":("Kicker plus big line, big line flips ink→accent","不只是聊天 / 还能说给谁听？"),
"q_prompt":("Type card","比如，给 AI 提需求？"),
"prompt":("AI chat window (generic), raw prompt speech, then the formatted prompt with numbered dimensions. Sub-cuts at the reference's 47.70 / 49.90 / 51.57","请对比分析三款语音输入产品。重点维度：1. 场景识别 …"),
"q_term":("Type card","或者，直接跟终端说？"),
"term":("Dark terminal: raw speech, then the command is typed and 命令已生成 · 按 Enter 执行. Sub-cuts at 55.13 / 55.87",'rg -l "API_KEY" .'),
"q_meet":("Type card plus echo duplicate (as the reference's 59.0 echo)","甚至，记下一整场会？"),
"meeting":("Dark meeting card (the site's 04 section): ascii bird, 录制中 · 3 位发言人, speaker lines appear, Fn + Shift keycaps","说话人 1/2/3 …"),
"card_yours":("Kicker plus accent big line popping per char on 8ths (as 你来定义)","保留多少原话 / 由你决定"),
"polish":("Customization beat (the reference's theme switching): 关闭/标准/高级 polish slider with the real outputs, light/dark flips on every reference sub-cut, then 热词 correction 飞马→Figma, 尼姆布斯→Nimbus, 林清和→林清禾","关闭 · 标准 · 高级 / 我的热词 · 3 条已启用"),
"typedel":("Type, delete, type, delete","聊天、邮件 → 文档、终端"),
"orbit":("Fragments assemble the big line, ring of mini scene cards orbits, zoom-blur push-through","都能直接说"),
"m_meet":("Montage: speaker transcript close-up, then a sub-cut to the 关键结论 / 待办 panel","—"),
"m_todo":("Montage: 待办事项 3 项 checked off → 一个键，两种用法 (Fn + Shift) → 两个快捷键 (右 Alt / Alt + M)","—"),
"m_hot":("Montage: Fn and 右 Alt keycaps with platform requirements","macOS 15+ · Apple 芯片 / Windows 10 / 11 · 64 位"),
"card_cards":("Big line with 4 site illustration cards (dunes, school, tree, orchid) in the corners (like 随心所愿)","想说就说"),
"m_bird":("Montage: completed meeting card rotating","会议记录 · 已完成"),
"m_advanced":("Montage: the long raw sentence with filler words highlighted and struck through, condensed to 高级润色","先小范围测试并收集反馈，再决定是否全面上线。"),
"slogan":("Accent big line assembles from scattered chars, push-in zoom (site footer slogan)","让文字，重新从声音开始"),
"tagline":("Black, white type-on with a glowing caret, select-all highlight, then delete (site hero title)","我们本来就会说，只是打字太久了。"),
"outro":("White, app icon plus MosMos wordmark. The wordmark disperses on the ding and the icon spins","MosMos"),
"black_end":("Black","—"),
}
L=["# MosMos promo: shot list against the reference","",f"Film: 1920×1080, 60 fps, {TL['end']:.2f} s. Music 110 BPM (the reference's measured tempo). Every cut is snapped to the 8th-note grid (0.2727 s).","",
"| # | ref shot | ref in–out | ours in–out | Δin | shot type | our content | on-screen text | sub-cuts (ours, s) |","|---|---|---|---|---|---|---|---|---|"]
for i,sh in enumerate(TL['shots']):
    r=S[i]; c,tx=OURS[sh['id']]
    subs=', '.join(f"{f/60:.2f}" for f in sh['subs']) or '—'
    L.append(f"| {i+1} | {sh['ref']} | {r[0]:.2f}–{r[1]:.2f} | {sh['t0']:.2f}–{sh['t1']:.2f} | {1000*(sh['t0']-r[0]):+.0f} ms | {r[2]} | {c} | {tx} | {subs} |")
open(ROOT+'/mosmos-shotlist.md','w').write('\n'.join(L)+'\n')
print('ok')
