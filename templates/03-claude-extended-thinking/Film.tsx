// Template 03 — structure of Anthropic "Claude 3.7 Sonnet with extended thinking" (2025), MosMos content.
// One continuous UI demo inside a brand-colour frame; camera pushes into a menu, a key, a status panel
// and a counter; ends with an interactive card game and a return to the empty start state.
import React from "react"
import { AbsoluteFill, Img, staticFile } from "remotion"
import { ACC, CJK, SANS, MONO, COPY, Keycap, Wave, lerp, clamp01, inOut, out, typeAt, useT, Caret } from "../_engine/src/mos"
import { Camera, CamKey, Hand, SERIF, Confetti, vis, track } from "../_engine/src/kit"
import TL from "./timeline.json"

const M = TL.marks as Record<string, number>
const C = TL.cuts
const WIN = "#f6f6f3", INKC = "#1d1d1f", GREY = "#77777a", LINE = "#e3e3df"
const ADV = COPY.polish[2].out!
const nRaw = Array.from(TL.raw).length, nAdv = Array.from(ADV).length

const Frame: React.FC<{ children: React.ReactNode; bg?: string }> = ({ children, bg = WIN }) => (
	<AbsoluteFill style={{ background: ACC }}>
		<div style={{ position: "absolute", left: 48, top: 48, width: 1824, height: 1160, borderRadius: 26, background: bg, overflow: "hidden", boxShadow: "0 30px 80px rgba(0,0,0,.25)" }}>{children}</div>
	</AbsoluteFill>
)
const Icon: React.FC<{ s: number }> = ({ s }) => <Img src={staticFile("mossec-logo.png")} style={{ width: s, height: s, borderRadius: s * 0.22 }} />

// ---------- home / composer (S1, S2, S8) ----------
const IN = { x: 270, y: 300, w: 1284 } // inside-window coords
const Composer: React.FC<{ t: number; text: string; caret?: boolean; chip: string; hot?: boolean }> = ({ t, text, caret, chip }) => (
	<div style={{ position: "absolute", left: IN.x, top: IN.y, width: IN.w, borderRadius: 20, background: "#fff", boxShadow: "0 2px 12px rgba(0,0,0,.06), 0 0 0 1px #e8e8e4", padding: "26px 30px 74px", fontFamily: CJK, fontSize: 25, lineHeight: 1.6, color: text ? "#55565a" : "#a3a3a0", minHeight: 170 }}>
		{text || "输入消息…"}{caret && <Caret t={t} solid color={ACC} />}
		<div style={{ position: "absolute", left: 26, bottom: 20, display: "flex", alignItems: "center", gap: 10, fontSize: 18, color: "#3a3b3f", fontFamily: CJK }}>
			<Wave t={t} n={5} h={16} color="#3a3b3f" /> {chip} <span style={{ color: GREY, fontSize: 14 }}>⌄</span>
		</div>
		<div style={{ position: "absolute", right: 22, bottom: 18, width: 40, height: 40, borderRadius: 10, background: ACC, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontFamily: SANS }}>↑</div>
	</div>
)
const Menu: React.FC<{ t: number; adv: boolean; hover: boolean; top: number }> = ({ t, adv, hover, top }) => {
	const row = (title: string, sub: string, y: number, sel: boolean, hl: boolean) => (
		<div style={{ position: "absolute", left: 10, right: 10, top: y, height: 62, borderRadius: 12, background: hl ? "#eeeeea" : "transparent", padding: "8px 16px" }}>
			<div style={{ fontSize: 20, color: INKC }}>{title}</div>
			<div style={{ fontSize: 15, color: GREY }}>{sub}</div>
			{sel && <div style={{ position: "absolute", right: 18, top: 18, color: ACC, fontSize: 22 }}>✓</div>}
		</div>
	)
	const o = clamp01((t - M.menu_open) / 0.12)
	return (
		<div style={{ position: "absolute", left: IN.x + 20, top, width: 470, height: 318, borderRadius: 16, background: "#fbfbf9", boxShadow: "0 18px 40px rgba(0,0,0,.14), 0 0 0 1px #e4e4e0", fontFamily: CJK, opacity: o, transform: `translateY(${(1 - o) * -8}px)` }}>
			{row("风格：自动", "根据当前应用自动选择表达方式", 10, true, true)}
			<div style={{ position: "absolute", left: 26, top: 88, fontSize: 15, color: GREY }}>润色程度</div>
			{row("标准", COPY.polish[1].hint, 114, false, false)}
			{row("高级", COPY.polish[2].hint, 178, adv, hover || adv)}
			<div style={{ position: "absolute", left: 20, right: 20, top: 252, height: 1, background: LINE }} />
			<div style={{ position: "absolute", left: 26, top: 268, fontSize: 18, color: INKC }}>{COPY.hotStatus}<span style={{ position: "absolute", left: 400, color: GREY }}>›</span></div>
		</div>
	)
}
const Home: React.FC<{ t: number; text?: string; caret?: boolean; menu?: boolean; pill?: number; hand?: { x: number; y: number; down?: boolean } }> = ({ t, text = "", caret, menu, pill = 0, hand }) => {
	const adv = t >= M.click_adv
	const boxH = text ? 170 + Math.max(0, Math.ceil((Array.from(text).length * 25) / (IN.w - 60)) - 2) * 40 : 170
	return (
		<Frame>
			<div style={{ position: "absolute", left: 0, right: 0, top: 128, display: "flex", justifyContent: "center" }}>
				<div style={{ padding: "5px 14px", borderRadius: 8, background: "#e9e9e5", fontFamily: CJK, fontSize: 15, color: GREY }}>项目群 · 首页改版</div>
			</div>
			<div style={{ position: "absolute", left: 0, right: 0, top: 192, display: "flex", justifyContent: "center", alignItems: "center", gap: 18, fontFamily: SERIF, fontSize: 50, color: INKC }}>
				<Icon s={48} /> 早上好，小林
			</div>
			<Composer t={t} text={text} caret={caret} chip={`MosMos · ${adv ? "高级 ✦" : "标准"}`} />
			{menu && t >= M.menu_open && <Menu t={t} adv={adv} hover={t >= M.hover_adv} top={IN.y + boxH + 10} />}
			{pill > 0 && (
				<div style={{ position: "absolute", left: 912 - 200, top: 880, opacity: pill, transform: `translateY(${(1 - pill) * 20}px)` }}>
					<div style={{ width: 400, height: 66, borderRadius: 999, background: "#0b0b0c", display: "flex", alignItems: "center", gap: 18, padding: "0 24px", fontFamily: CJK, boxShadow: "0 18px 40px rgba(0,0,0,.25)" }}>
						<Wave t={t} live h={30} />
						<div style={{ lineHeight: 1.25 }}><div style={{ color: "#fff", fontSize: 17 }}>语音输入</div><div style={{ color: "#9a9ca1", fontSize: 13 }}>{COPY.scenes[0].style}</div></div>
					</div>
				</div>
			)}
			{hand && <Hand {...hand} s={1.1} />}
		</Frame>
	)
}
const S1: React.FC<{ t: number }> = ({ t }) => {
	const raw = typeAt(TL.raw, t, M.raw_t0, M.raw_cps)
	const keys: CamKey[] = [[0, 1, 960, 540], [M.zoom1, 1, 960, 540], [M.zoom1 + 0.3, 1.12, 960, 520], [M.zoom2, 1.12, 960, 520], [M.zoom2 + 0.5, 1.3, 820, 640]]
	const hx = track(t, [[0.2, 1300], [M.click_input - 0.05, 1100], [2.0, 1180], [M.menu_open - 0.15, 470], [9.2, 520]])
	const hy = track(t, [[0.2, 820], [M.click_input - 0.05, 420], [2.0, 760], [M.menu_open - 0.15, 640], [9.2, 700]])
	return <Camera t={t} keys={keys}><Home t={t} text={raw.s} caret={t > M.click_input && t < M.menu_open} menu pill={lerp(t, M.pill_in, M.pill_in + 0.3, 0, 1) * (1 - lerp(t, 8.0, 8.3, 0, 1))} hand={{ x: hx, y: hy, down: Math.abs(t - M.click_input) < 0.08 || Math.abs(t - (M.menu_open - 0.1)) < 0.08 }} /></Camera>
}
const S2: React.FC<{ t: number }> = ({ t }) => {
	const keys: CamKey[] = [[C[0], 2.55, 560, 690], [C[1], 2.7, 575, 700]]
	const hx = track(t, [[C[0], 620], [M.hover_adv, 470], [C[1], 478]]), hy = track(t, [[C[0], 820], [M.hover_adv, 714], [C[1], 718]])
	return <Camera t={t} keys={keys} ease={(x) => x}><Home t={t} text={TL.raw} menu hand={{ x: hx, y: hy, down: Math.abs(t - M.click_adv) < 0.08 }} /></Camera>
}
const S3: React.FC<{ t: number }> = ({ t }) => {
	const s = lerp(t, C[1], C[2], 1, 1.06, (x) => x)
	const hx = track(t, [[11.4, 640], [12.1, 520]]), hy = track(t, [[11.4, 1150], [12.1, 590]])
	return (
		<AbsoluteFill style={{ background: WIN }}>
			<AbsoluteFill style={{ transform: `scale(${s})` }}>
				<div style={{ position: "absolute", left: 360, top: 425 }}><Keycap label="Fn" t={t} press={M.fn2} size={230} /></div>
				<Hand x={hx} y={hy} down={Math.abs(t - M.fn2) < 0.09} s={1.5} />
			</AbsoluteFill>
		</AbsoluteFill>
	)
}
// ---------- polishing thread (S4) ----------
const lines: [number, string, string[]][] = [
	[M.chat_in, "润色中", ["当前场景：飞书 / 微信，风格：自动 · 简洁自然。", "原话有重复和口头语：嗯、吧、然后然后、就是。"]],
	[M.head2, "处理改口", ["“然后然后看看反馈，不对，是先收集一下反馈”", "这里改口了，按后面的意思写。"]],
	[M.head3, "重组为简洁成稿", ["先小范围测试，收集反馈，", "再决定是否全面上线。"]],
]
const countAt = (t: number) => Math.round(track(t, [[M.chat_in, nRaw], [M.head2, 48], [M.head3, 34], [C[3], 30], [M.count_t0, 30], [M.count_t1, nAdv]], (x) => x))
const Thread: React.FC<{ t: number }> = ({ t }) => {
	const cur = [...lines].reverse().find((l) => t >= l[0]) || lines[0]
	const k = lines.indexOf(cur)
	return (
		<Frame>
			<div style={{ position: "absolute", left: 470, top: 250, width: 880, height: 64, borderRadius: 16, background: "#ebebe6", display: "flex", alignItems: "center", gap: 16, padding: "0 18px", fontFamily: CJK, fontSize: 22, color: INKC }}>
				<div style={{ width: 34, height: 34, borderRadius: 99, background: "#2a2b2f", color: "#fff", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>林</div>
				<span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>原始语音：{TL.raw.slice(0, 26)}…</span>
			</div>
			<div style={{ position: "absolute", left: 470, top: 340, width: 880, height: 290, borderRadius: 16, background: "#fbfbf9", boxShadow: "0 0 0 1px #e2e2de", padding: "18px 26px", fontFamily: SERIF }}>
				<div style={{ display: "flex", justifyContent: "space-between", fontFamily: CJK, fontSize: 16, color: GREY }}><span>{cur[1]}</span><span>{countAt(t)} 字</span></div>
				<div style={{ marginTop: 18, fontSize: 24, lineHeight: 1.75, color: "#2c2c2e" }}>
					{cur[2].map((s, i) => { const r = typeAt(s, t, cur[0] + 0.25 + i * 0.9, 18); return <div key={i}>{r.s}</div> })}
				</div>
			</div>
			<Hand x={track(t, [[M.chat_in, 1180], [21, 1150]])} y={track(t, [[M.chat_in, 600], [21, 640]])} s={1.0} />
			{k >= 0 && null}
		</Frame>
	)
}
const S4: React.FC<{ t: number }> = ({ t }) => {
	if (t < M.chat_in) {
		const o = lerp(t, M.think_box, M.chat_in - 0.3, 0.15, 1, inOut), s = lerp(t, M.think_box, M.chat_in, 1.25, 1.1, (x) => x)
		return (
			<AbsoluteFill style={{ background: WIN }}>
				<div style={{ position: "absolute", left: 820, top: 560, width: 1100, height: 420, borderRadius: 30, background: "#efefeb", transform: `scale(${s})`, transformOrigin: "0 0", opacity: o }}>
					<div style={{ position: "absolute", left: 60, top: 60, width: 980, height: 150, borderRadius: 24, border: "3px solid #d6d6d2", display: "flex", alignItems: "center", paddingLeft: 50, fontFamily: SERIF, fontSize: 76, color: `rgba(60,60,62,${0.25 + 0.5 * o})`, filter: `blur(${(1 - o) * 6}px)` }}>润色中</div>
				</div>
			</AbsoluteFill>
		)
	}
	const keys: CamKey[] = [[M.chat_in, 1.62, 910, 430], [C[3], 1.62, 930, 470]]
	return <Camera t={t} keys={keys} ease={(x) => x}><Thread t={t} /></Camera>
}
const S5: React.FC<{ t: number }> = ({ t }) => {
	const s = lerp(t, C[3], C[4], 1.0, 1.08, (x) => x)
	const ic = clamp01((t - M.icon_in) / 0.25)
	return (
		<AbsoluteFill style={{ background: "#f3f1f0" }}>
			<AbsoluteFill style={{ transform: `scale(${s})`, transformOrigin: "60% 40%" }}>
				<div style={{ position: "absolute", left: -200, top: 210, width: 1680, height: 1000, borderRadius: 120, border: "6px solid #c9c7c4" }} />
				<div style={{ position: "absolute", left: -200, top: 740, width: 1640, height: 6, background: "#d4d2cf" }} />
				<div style={{ position: "absolute", right: 520, top: 380, display: "flex", alignItems: "center", gap: 40, fontFamily: SANS, fontSize: 190, color: "#8f8d8a", fontWeight: 400 }}>
					<span style={{ fontSize: 120, opacity: ic, transform: `scale(${0.6 + 0.4 * ic})` }}>✦</span>
					<span>{countAt(t)}</span><span style={{ fontFamily: CJK, fontSize: 150 }}>字</span>
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	)
}
// ---------- result (S6) ----------
const S6: React.FC<{ t: number }> = ({ t }) => {
	const keys: CamKey[] = [[C[4], 1.4, 960, 400], [C[4] + 0.7, 1.0, 960, 540], [C[5], 1.0, 960, 540]]
	const hot = typeAt(TL.hot, t, M.hot_t0, M.hot_cps)
	return (
		<Camera t={t} keys={keys}>
			<Frame>
				<div style={{ position: "absolute", left: 420, top: 70, width: 980, borderRadius: 16, background: "#fbfbf9", boxShadow: "0 0 0 1px #e2e2de", padding: "16px 24px", fontFamily: CJK }}>
					<div style={{ display: "flex", justifyContent: "space-between", fontSize: 16, color: GREY }}><span>高级润色 · 已写好</span><span>✦ {nAdv} 字</span></div>
					<div style={{ fontFamily: SERIF, fontSize: 30, fontWeight: 700, color: INKC, marginTop: 20 }}>润色后</div>
					<div style={{ fontFamily: SERIF, fontSize: 25, lineHeight: 1.7, color: "#2c2c2e", marginTop: 10 }}>{ADV}</div>
					<div style={{ fontSize: 17, lineHeight: 1.7, color: GREY, marginTop: 14 }}>原始语音 {nRaw} 字 · {COPY.polish[2].hint}</div>
				</div>
				<div style={{ position: "absolute", left: 430, top: 440 }}><Icon s={40} /></div>
				<div style={{ position: "absolute", left: 420, top: 510, width: 980, borderRadius: 20, background: "#fff", boxShadow: "0 2px 12px rgba(0,0,0,.06), 0 0 0 1px #e8e8e4", padding: "24px 28px 70px", fontFamily: CJK, fontSize: 25, color: hot.s ? "#55565a" : "#a3a3a0" }}>
					{hot.s || "输入消息…"}{t > M.hot_t0 - 0.3 && <Caret t={t} solid={hot.typing} color={ACC} />}
					<div style={{ position: "absolute", left: 24, bottom: 18, display: "flex", alignItems: "center", gap: 10, fontSize: 18, color: "#3a3b3f" }}><Wave t={t} n={5} h={16} live={hot.typing} color="#3a3b3f" /> MosMos · 高级 ✦</div>
					<div style={{ position: "absolute", right: 22, bottom: 16, width: 40, height: 40, borderRadius: 10, background: ACC, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>↑</div>
				</div>
			</Frame>
		</Camera>
	)
}
// ---------- hot-word cards (S7) ----------
const CARDS: [string, string, number][] = [["飞马", "Figma", M.flip1], ["尼姆布斯", "Nimbus", M.flip2], ["林清和", "林清禾", M.flip3]]
const S7: React.FC<{ t: number }> = ({ t }) => {
	const sub = t >= M.s_done ? COPY.hotStatus : t >= M.s_adding ? "加入热词中…" : t >= M.s_two ? "还剩两个" : "这三个词识别错了，点一下教它"
	const done = t >= M.s_done
	const hx = track(t, [[C[5], 960], [M.c1 - 0.1, 610], [31.6, 760], [M.c2 - 0.1, 920], [34.4, 1000], [M.cbtn - 0.1, 1120], [36.6, 1060], [M.hover_again, 1000]])
	const hy = track(t, [[C[5], 1010], [M.c1 - 0.1, 560], [31.6, 900], [M.c2 - 0.1, 560], [34.4, 860], [M.cbtn - 0.1, 935], [36.6, 1000], [M.hover_again, 945]])
	const down = [M.c1, M.c2, M.cbtn].some((c) => Math.abs(t - c) < 0.08)
	return (
		<Frame bg="#f8fafb">
			<div style={{ position: "absolute", left: 0, right: 0, top: 110, textAlign: "center", fontFamily: CJK, fontWeight: 700, fontSize: 44, color: "#16181d" }}>难认的词，教一次就够了。</div>
			<div style={{ position: "absolute", left: 0, right: 0, top: 185, textAlign: "center", fontFamily: CJK, fontWeight: 600, fontSize: 22, color: "#2a2c31" }}>{sub}</div>
			{CARDS.map(([a, b, tf], i) => {
				const p = lerp(t, tf, tf + 0.3, 0, 1, inOut), flipped = p > 0.5, rot = p * 180
				return (
					<div key={i} style={{ position: "absolute", left: 912 - 115 + (i - 1) * 310, top: 330, width: 230, height: 330, perspective: 1200 }}>
						<div style={{ width: "100%", height: "100%", borderRadius: 14, transform: `rotateY(${flipped ? rot - 180 : rot}deg)`, background: flipped ? "#fff" : "#23252b", border: `3px solid ${flipped ? "#3a3c42" : "#111215"}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, fontFamily: CJK, boxShadow: "0 10px 24px rgba(0,0,0,.12)" }}>
							<div style={{ fontSize: flipped ? 44 : 40, fontWeight: 700, color: flipped ? ACC : "#f2f2f2", fontFamily: flipped && /[A-Za-z]/.test(b) ? SANS : CJK }}>{flipped ? b : a}</div>
							<div style={{ fontSize: 16, color: flipped ? "#6e7075" : "#8d8f95" }}>{flipped ? `${a} → ${b}` : "识别结果"}</div>
						</div>
					</div>
				)
			})}
			<div style={{ position: "absolute", left: 0, right: 0, top: 715, textAlign: "center", fontFamily: CJK, fontSize: 27, color: "#2a2c31", opacity: clamp01((t - M.s_done) / 0.3) }}>
				{COPY.hot.map(([a, b, m], i) => <span key={i} style={{ color: m ? ACC : undefined, fontWeight: m ? 700 : 400, margin: /[A-Za-z]/.test(b) ? "0 0.25em" : undefined }}>{b}</span>)}
			</div>
			<div style={{ position: "absolute", left: 0, right: 0, top: 800, display: "flex", justifyContent: "center", gap: 24, fontFamily: CJK, fontSize: 19 }}>
				{done ? (
					<div style={{ padding: "12px 30px", borderRadius: 10, background: "#e3ecfb", border: "2px solid #bcd0f5", color: "#2a3f6b" }}>↻ 再说一句</div>
				) : (
					<>
						<div style={{ padding: "12px 26px", borderRadius: 10, background: "#fdf1c7", border: "2px solid #f0d78a", color: "#5b4a12" }}>● 加入热词</div>
						<div style={{ padding: "12px 26px", borderRadius: 10, background: "#e3ecfb", border: "2px solid #bcd0f5", color: "#2a3f6b" }}>⇄ 全部加入</div>
					</>
				)}
			</div>
			<Confetti t={t} t0={M.confetti} w={1824} />
			<Hand x={hx} y={hy} down={down} s={1.1} />
		</Frame>
	)
}
export const Film: React.FC = () => {
	const t = useT()
	if (t < C[0]) return <S1 t={t} />
	if (t < C[1]) return <S2 t={t} />
	if (t < C[2]) return <S3 t={t} />
	if (t < C[3]) return <S4 t={t} />
	if (t < C[4]) return <S5 t={t} />
	if (t < C[5]) return <S6 t={t} />
	if (t < C[6]) return <S7 t={t} />
	return <Home t={t} />
}
