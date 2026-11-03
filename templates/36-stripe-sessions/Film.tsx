// Template 36 — structure of Stripe "Stripe Sessions 2024 | New Revenue and Finance Automation tools" (2024), MosMos content.
// A keynote-style launch film: deep navy with purple/pink/orange light, one phrase per shot in big gradient type,
// interleaved with glowing glass UI cards (hot words, polish levels, scenes, meeting records) operated by a hand
// cursor, and a white logo card at both ends.
import React from "react"
import { AbsoluteFill } from "remotion"
import { CJK, lerp, clamp01, inOut, useT, LogoPixels, Wordmark, Wave, typeAt, path, COPY, SCENES } from "../_engine/src/mos"
import TL from "./timeline.json"

const M = TL.marks as Record<string, number>, C = TL.cuts as number[]
const NAVY = "#1f1b33", TX = "#ffffff", DIM = "#a7a3c0", ACC = "#7a6cf5"
const G1 = "linear-gradient(90deg,#8f86ff,#c6a6ff 60%,#f3c1ff)", G2 = "linear-gradient(90deg,#ff9d7a,#e05bd0 50%,#9a5cf5)", G3 = "linear-gradient(90deg,#7d7bff,#a99bff)"
const gt = (g: string): React.CSSProperties => ({ background: g, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" })

const Glow: React.FC<{ t: number; v?: number; op?: number; low?: boolean }> = ({ t, v = 0, op = 1, low }) => <AbsoluteFill style={{ opacity: op, filter: "blur(60px)" }}>
	<div style={{ position: "absolute", left: 200 + 200 * Math.sin(t * 0.4 + v), top: low ? 760 : -260, width: 1500, height: 520, borderRadius: "50%", background: "radial-gradient(closest-side, #b23bd8, rgba(178,59,216,0))", transform: `rotate(${-8 + 4 * Math.sin(t * 0.3)}deg)` }} />
	<div style={{ position: "absolute", left: 900 + 160 * Math.cos(t * 0.35 + v), top: low ? 820 : -200, width: 1300, height: 420, borderRadius: "50%", background: "radial-gradient(closest-side, #ff8a6a, rgba(255,138,106,0))", opacity: 0.7 }} />
	<div style={{ position: "absolute", left: -200, top: low ? 700 : -120, width: 900, height: 500, borderRadius: "50%", background: "radial-gradient(closest-side, #5b3cf0, rgba(91,60,240,0))", opacity: 0.8 }} />
</AbsoluteFill>
const Navy: React.FC<{ children?: React.ReactNode }> = ({ children }) => <AbsoluteFill style={{ background: NAVY, fontFamily: CJK, color: TX }}>{children}</AbsoluteFill>
const Grad: React.FC<{ t: number; warm?: boolean; children?: React.ReactNode }> = ({ t, warm, children }) => <AbsoluteFill style={{ background: warm ? `linear-gradient(${120 + 10 * Math.sin(t)}deg,#ff8f5a,#e2479a 45%,#a64fe0)` : `linear-gradient(${150 + 10 * Math.sin(t)}deg,#d23fbf,#a34be6 60%,#7d55f0)`, fontFamily: CJK, color: TX }}>{children}</AbsoluteFill>
type Part = [string, string?]
const Phrase: React.FC<{ t: number; t0: number; parts: Part[]; size?: number; dark?: boolean }> = ({ t, t0, parts, size = 150, dark }) => {
	const a = clamp01((t - t0) / 0.35)
	return <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
		<div style={{ fontFamily: CJK, fontWeight: 600, fontSize: size, letterSpacing: "-0.01em", opacity: a, transform: `translateY(${(1 - a) * 30}px)`, color: dark ? "#25213a" : TX, whiteSpace: "nowrap" }}>
			{parts.map(([s, g], k) => <span key={k} style={g ? gt(g) : undefined}>{s}</span>)}</div></AbsoluteFill>
}
const Steps: React.FC<{ t: number; seq: [number, Part[]][]; size?: number; dark?: boolean }> = ({ t, seq, size, dark }) => {
	const cur = seq.filter(([x]) => t >= x).pop()
	return cur ? <Phrase key={cur[0]} t={t} t0={cur[0]} parts={cur[1]} size={size} dark={dark} /> : null
}
const LogoCard: React.FC<{ t: number; s?: number; op?: number }> = ({ t, s = 1, op = 1 }) => <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
	<div style={{ width: 400 * s, height: 250 * s, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", gap: 18 * s, opacity: op, boxShadow: "0 20px 60px rgba(0,0,0,.25)" }}><LogoPixels size={70 * s} t={t} mode="static" /><Wordmark size={62 * s} color="#2a1f5c" /></div></AbsoluteFill>
const Ribbon: React.FC<{ t: number }> = ({ t }) => <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
	<defs><linearGradient id="rb" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ff9ad5" /><stop offset="0.5" stopColor="#b14df0" /><stop offset="1" stopColor="#5c3cf0" /></linearGradient></defs>
	{[0, 1, 2, 3, 4].map((k) => <path key={k} d={`M ${1300 + k * 40} 1200 C ${1350 + k * 40} ${520 - k * 30 - t * 30} ${1700 + k * 30} ${260 + k * 20} ${2000} ${420 + k * 40}`} stroke="url(#rb)" strokeWidth={70 - k * 10} fill="none" opacity={0.85 - k * 0.12} />)}</svg>

// ---------- glass UI ----------
const Card: React.FC<{ x: number; y: number; w: number; h?: number; title?: string; children?: React.ReactNode; op?: number; light?: boolean }> = ({ x, y, w, h, title, children, op = 1, light }) =>
	<div style={{ position: "absolute", left: x, top: y, width: w, height: h, borderRadius: 18, background: light ? "#ffffff" : "linear-gradient(180deg, rgba(88,82,120,.72), rgba(46,42,70,.78))", boxShadow: light ? "0 0 0 1px #e6e4ef" : "inset 0 0 0 1.5px rgba(255,255,255,.16), 0 30px 60px rgba(0,0,0,.35)", opacity: op, color: light ? "#26233a" : TX, fontFamily: CJK, overflow: "hidden" }}>
		{title && <div style={{ padding: "30px 40px", fontSize: 44, fontWeight: 600, borderBottom: light ? "1px solid #ecebf2" : "1px solid rgba(255,255,255,.12)" }}>{title}</div>}{children}</div>
const Field: React.FC<{ label?: string; value: string; light?: boolean; focus?: boolean; caret?: boolean }> = ({ label, value, light, focus }) => <div style={{ margin: "18px 40px" }}>
	{label && <div style={{ fontSize: 28, marginBottom: 10, color: light ? "#4a4760" : "#e4e1f2", fontWeight: 500 }}>{label}</div>}
	<div style={{ height: 66, borderRadius: 12, padding: "0 22px", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 28, background: light ? "#fff" : "rgba(30,27,48,.7)", boxShadow: focus ? `0 0 0 2px ${ACC}` : light ? "0 0 0 1px #dcd9e6" : "inset 0 0 0 1px rgba(255,255,255,.2)" }}><span>{value}</span><span style={{ opacity: 0.6 }}>⌄</span></div></div>
const Btn: React.FC<{ children: React.ReactNode; down?: boolean; style?: React.CSSProperties }> = ({ children, down, style }) => <div style={{ display: "inline-flex", padding: "14px 30px", borderRadius: 12, background: ACC, color: "#fff", fontSize: 28, fontWeight: 500, transform: `scale(${down ? 0.95 : 1})`, ...style }}>{children}</div>
const Hand: React.FC<{ x: number; y: number; down?: boolean; s?: number; arrow?: boolean }> = ({ x, y, down, s = 2.1, arrow }) => <div style={{ position: "absolute", left: x, top: y, transform: `scale(${(down ? 0.88 : 1) * s})`, transformOrigin: "10px 2px", filter: "drop-shadow(0 3px 4px rgba(0,0,0,.4))", zIndex: 40 }}>
	{arrow ? <svg width="40" height="40" viewBox="0 0 24 24"><path d="M4 2.5 L4 19.5 L8.6 15.3 L11.6 21.8 L14.6 20.5 L11.7 14.2 L18 14.2 Z" fill="#0b0b0c" stroke="#fff" strokeWidth="1.5" /></svg>
		: <svg width="40" height="44" viewBox="0 0 24 26"><path d="M8 2.5 C8 1.4 10 1.4 10 2.5 L10 11 L10.5 8 C10.5 7 12.5 7 12.5 8 L12.6 11 L13 9 C13 8 15 8 15 9 L15 12 L15.5 10.5 C15.6 9.6 17.5 9.6 17.5 10.8 L17.5 16 C17.5 20 15 23 11.5 23 C8.5 23 7 21.5 5.5 19 L2.8 14.5 C2.2 13.4 3.6 12.4 4.6 13.3 L8 16 Z" fill="#fff" stroke="#111" strokeWidth="1.4" strokeLinejoin="round" /></svg>}</div>
const click = (t: number, at: number) => Math.abs(t - at) < 0.09

const HotForm: React.FC<{ t: number; x?: number }> = ({ t, x = 552 }) => <Card x={x} y={200} w={816} title="新建热词" light>
	<Field label="写法" value="Nimbus" light /><Field label="容易听成" value="尼姆布斯" light /><Field label="类别" value="项目名" light />
	<div style={{ margin: "30px 40px 36px", display: "flex", justifyContent: "flex-end" }}><Btn down={click(t, M.fclick)}>添加热词</Btn></div></Card>
const HotList: React.FC<{ t: number }> = ({ t }) => <div style={{ position: "absolute", left: 980, top: 140, width: 900, height: 600, borderRadius: 20, background: "rgba(40,36,62,.92)", boxShadow: "inset 0 0 0 1.5px rgba(255,255,255,.14)", fontFamily: CJK, color: TX, padding: "30px 40px", boxSizing: "border-box" }}>
	<div style={{ fontSize: 32, color: "#b9b2ff", marginBottom: 26 }}>▤ 我的热词 · 3 条已启用</div>
	{COPY.hot.filter((h) => h[2]).map(([raw, out], k) => { const s = typeAt(`${out}   ←  ${raw}`, t, M.hot1 + k * 0.6, 14).s
		return <div key={out} style={{ display: "flex", gap: 22, fontSize: 34, height: 70, alignItems: "center", fontFamily: CJK }}><span style={{ color: "#6f6a90", width: 40 }}>{k + 1}</span><span>{s}</span></div> })}
	<div style={{ fontSize: 26, color: DIM, marginTop: 30, lineHeight: 1.6 }}>{COPY.hotDesc}</div></div>
const Fix: React.FC<{ t: number }> = ({ t }) => {
	const a = clamp01((t - M.card) / 0.4), w = lerp(t, M.wide, M.wide + 0.6, 740, 1500, inOut), x = 960 - w / 2
	return <Navy><Glow t={t} op={0.6} /><div style={{ position: "absolute", left: 960, top: 150, width: 2, height: 160 * a, background: "#8f86ff" }} />
		<Card x={x} y={310} w={w} h={470} op={a}>
			<div style={{ padding: "34px 40px", fontSize: 36, fontWeight: 600 }}>热词校正 <span style={{ fontSize: 24, color: DIM, fontWeight: 400 }}>说话时优先识别</span></div>
			<div style={{ position: "absolute", left: 40, top: 130, width: 660, fontSize: 40, lineHeight: 1.9 }}>{COPY.hot.map(([raw, out, hot], k) => { const p = hot ? clamp01((t - M.flip - k * 0.25) / 0.3) : 1
				return <span key={k} style={{ color: hot ? (p > 0.5 ? "#b9b2ff" : "#ff9d9d") : TX, borderBottom: hot ? "3px solid currentColor" : undefined }}>{hot && p <= 0.5 ? raw : out}</span> })}</div>
			{w > 1000 && <div style={{ position: "absolute", left: 760, top: 120, width: 700, opacity: clamp01((t - M.wide - 0.3) / 0.4) }}>{COPY.hot.filter((h) => h[2]).map(([raw, out], k) => <div key={out} style={{ display: "flex", justifyContent: "space-between", fontSize: 30, height: 84, alignItems: "center", borderBottom: "1px solid rgba(255,255,255,.1)" }}><span style={{ color: "#ff9d9d", textDecoration: "line-through" }}>{raw}</span><span>→</span><span style={{ color: "#b9b2ff" }}>{out}</span></div>)}</div>}
		</Card></Navy>
}
const Polish: React.FC<{ t: number }> = ({ t }) => {
	const c = path(t, [[C[13], 1300, 900], [M.cclick - 0.2, 700, 560], [M.cclick + 0.4, 760, 640], [M.cclick2 - 0.2, 1270, 760], [C[14], 1270, 760]])
	return <Navy><Glow t={t} low v={1} /><Card x={480} y={300} w={960} title="润色程度">
		<div style={{ display: "flex", alignItems: "center", gap: 20, margin: "26px 40px 0" }}><span style={{ fontSize: 28, opacity: 0.5 }}>⋮⋮</span><div style={{ flex: 1 }}><Field value={`标准 · ${COPY.polish[1].hint}`} /></div><span style={{ fontSize: 34, opacity: 0.7 }}>✕</span></div>
		{t > M.row2 && <div style={{ display: "flex", alignItems: "center", gap: 20, margin: "0 40px", opacity: clamp01((t - M.row2) / 0.3) }}><span style={{ fontSize: 28, opacity: 0.5 }}>⋮⋮</span><div style={{ flex: 1 }}><Field value={`高级 · ${COPY.polish[2].hint}`} focus /></div><span style={{ fontSize: 34, opacity: 0.7 }}>✕</span></div>}
		<div style={{ margin: "14px 40px", fontSize: 28, color: "#a99bff" }}>+ 再加一档</div>
		<div style={{ margin: "20px 40px 34px", display: "flex", justifyContent: "flex-end" }}><Btn down={click(t, M.cclick2)}>保存</Btn></div></Card>
		<Hand x={c.x} y={c.y} down={click(t, M.cclick) || click(t, M.cclick2)} /></Navy>
}
const SceneUI: React.FC<{ t: number }> = ({ t }) => {
	const open = t > M.ddopen && t < M.ddpick + 0.15, picked = t > M.ddpick
	const c = path(t, [[M.dd, 1500, 900], [M.ddopen - 0.2, 1240, 360], [M.ddpick - 0.25, 760, 545], [M.field2 + 0.4, 1000, 700], [C[15], 1000, 720]])
	return <Navy><Glow t={t} v={2} /><div style={{ position: "absolute", left: 480, top: 260, width: 960, opacity: clamp01((t - M.dd) / 0.3) }}>
		<div style={{ fontSize: 40, fontWeight: 600, marginBottom: 16 }}>场景</div>
		<div style={{ height: 76, borderRadius: 14, background: "rgba(50,45,80,.8)", boxShadow: `0 0 0 2px ${open ? ACC : "#9b8cf5"}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 26px", fontSize: 32 }}><span>{picked ? "邮件 · 正式" : "选择一个场景"}</span><span>⌃⌄</span></div>
		{open && <div style={{ marginTop: 10, borderRadius: 14, background: "rgba(50,45,80,.95)", boxShadow: "inset 0 0 0 1px rgba(255,255,255,.18)", padding: "10px 0" }}>{SCENES.map((s, k) => <div key={s} style={{ height: 64, display: "flex", alignItems: "center", padding: "0 26px", fontSize: 30, background: k === 1 && t > M.ddpick - 0.3 ? "rgba(122,108,245,.4)" : undefined }}>{s}</div>)}</div>}
		{t > M.field2 && <div style={{ marginTop: 50, opacity: clamp01((t - M.field2) / 0.3) }}><div style={{ fontSize: 40, fontWeight: 600, marginBottom: 16 }}>风格</div>
			<div style={{ height: 76, borderRadius: 14, background: "rgba(50,45,80,.8)", boxShadow: "inset 0 0 0 1.5px rgba(255,255,255,.25)", display: "flex", alignItems: "center", padding: "0 26px", fontSize: 32 }}>自动 · 简洁自然</div></div>}
	</div><Hand x={c.x} y={c.y} down={click(t, M.ddopen) || click(t, M.ddpick)} /></Navy>
}
const AppUI: React.FC<{ t: number }> = ({ t }) => {
	const sum = t > M.sum, c = path(t, [[C[15], 1300, 900], [M.sum - 0.6, 600, 560], [M.sclick - 0.25, 1300, 790], [C[16], 1300, 790]])
	return <Navy><Glow t={t} v={3} />
		{!sum ? <div style={{ position: "absolute", left: 360, top: 280, width: 1000, fontFamily: CJK }}>
			<div style={{ fontSize: 40, fontWeight: 600, marginBottom: 16 }}>当前应用</div>
			<div style={{ height: 76, borderRadius: 14, background: "rgba(50,45,80,.8)", boxShadow: "0 0 0 2px #9b8cf5", display: "flex", alignItems: "center", padding: "0 26px", fontSize: 32, gap: 16 }}>✉ 邮件</div>
			<div style={{ fontSize: 40, fontWeight: 600, margin: "56px 0 20px" }}>怎么选场景</div>
			{["自动识别", "我来指定"].map((x, k) => <div key={x} style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 32, height: 64 }}><div style={{ width: 30, height: 30, borderRadius: 15, boxShadow: "inset 0 0 0 3px #b9b2ff", background: k === 0 && t > M.sum - 0.6 ? "radial-gradient(circle, #b9b2ff 40%, transparent 45%)" : undefined }} />{x}</div>)}
		</div> : <Card x={480} y={260} w={960} title="将使用" op={clamp01((t - M.sum) / 0.3)}>
			{["✉ 当前应用：邮件", "◎ 场景：自动识别", "✎ 润色：标准"].map((x) => <div key={x} style={{ margin: "26px 40px", fontSize: 32 }}>{x}</div>)}
			<div style={{ margin: "10px 40px 34px", display: "flex", justifyContent: "flex-end" }}><Btn down={click(t, M.sclick)}>保存</Btn></div></Card>}
		<Hand x={c.x} y={c.y} down={click(t, M.sclick)} /></Navy>
}
const MeetUI: React.FC<{ t: number }> = ({ t }) => {
	const c = path(t, [[C[17], 1200, 900], [M.addbtn - 0.2, 1010, 560], [M.cards + 0.2, 1100, 700], [M.kclick - 0.2, 700, 520], [C[18], 760, 600]])
	if (t < M.cards) { const p = clamp01((t - M.addbtn) / 0.5)
		return <Navy><Glow t={t} v={4} /><AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}><div style={{ width: 640, height: 90, borderRadius: 14, background: ACC, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 38, transform: `scale(${click(t, M.addbtn) ? 0.95 : 1 + p * 0.03})`, opacity: 1 - clamp01((t - M.cards + 0.3) / 0.3) }}>+ 开始会议记录</div></AbsoluteFill><Hand x={c.x} y={c.y} down={click(t, M.addbtn)} /></Navy> }
	const F = COPY.meetingFeatures
	return <Navy><Glow t={t} v={4} />
		{F.slice(0, 2).map(([a, b], k) => <Card key={a} x={380 + k * 620} y={300} w={560} h={300} op={clamp01((t - M.cards - k * 0.15) / 0.3)}>
			<div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20, paddingTop: 54 }}><div style={{ width: 84, height: 84, borderRadius: 18, background: ["#4f6df5", "#e0603a"][k], display: "flex", alignItems: "center", justifyContent: "center" }}><Wave t={t} n={4} h={40} /></div>
				<div style={{ fontSize: 38, fontWeight: 600 }}>{a}</div><div style={{ fontSize: 24, color: DIM, padding: "0 30px", textAlign: "center" }}>{b}</div></div></Card>)}
		{t > M.third && <><svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}><path d="M 660 600 L 660 700 L 960 700 L 960 760 M 1280 600 L 1280 700 L 960 700" stroke="#8f86ff" strokeWidth={3} fill="none" opacity={clamp01((t - M.third) / 0.4)} /></svg>
			<Card x={760} y={760} w={400} h={170} op={clamp01((t - M.third - 0.2) / 0.3)}><div style={{ textAlign: "center", paddingTop: 40 }}><div style={{ fontSize: 34, fontWeight: 600 }}>{F[2][0]}</div><div style={{ fontSize: 22, color: DIM, marginTop: 10 }}>有负责人和时间时一并保留</div></div></Card></>}
		<Hand x={c.x} y={c.y} down={click(t, M.kclick)} /></Navy>
}
const TodoPanel: React.FC<{ t: number }> = ({ t }) => <Navy><Glow t={t} low v={5} /><Card x={240} y={170} w={1440} h={700} op={clamp01((t - M.panel) / 0.4)}>
	<div style={{ padding: "34px 44px 16px", fontSize: 40, fontWeight: 600 }}>首页改版周会 · 待办</div>
	<div style={{ margin: "0 44px", fontSize: 26, color: "#a99bff", borderBottom: "2px solid #a99bff", display: "inline-block", paddingBottom: 8 }}>来自会议记录</div>
	{["今天下午同步品牌素材 · 周舟", "周三前提交交互稿 · 林清禾", "周四启动视觉设计 · 小林"].map((x, k) => <div key={x} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "0 44px", height: 120, borderBottom: "1px solid rgba(255,255,255,.1)", fontSize: 34, opacity: clamp01((t - M.panel - 0.4 - k * 0.3) / 0.3) }}>
		<span>› {x}</span><span style={{ fontSize: 24, padding: "8px 20px", borderRadius: 10, background: "#3fae74", color: "#0d2a1b" }}>已整理</span></div>)}
	<div style={{ position: "absolute", right: 44, bottom: 34, display: "flex", gap: 16 }}><div style={{ padding: "14px 28px", borderRadius: 12, boxShadow: "inset 0 0 0 1.5px rgba(255,255,255,.3)", fontSize: 26 }}>复制</div><Btn>发到群里</Btn></div></Card></Navy>

export const Film: React.FC = () => {
	const t = useT()
	const i = C.filter((c) => t >= c).length
	switch (i) {
		case 0: return <Navy><LogoCard t={t} op={0.12 + 0.15 * clamp01(t / 0.6)} /></Navy>
		case 1: return <Grad t={t}><Ribbon t={t} /><LogoCard t={t} s={lerp(t, C[0], C[1], 0.85, 0.92)} /></Grad>
		case 2: { const x = lerp(t, C[1], M.w2, 600, 0, inOut)
			return <AbsoluteFill style={{ background: "#fff" }}><div style={{ position: "absolute", inset: 0, transform: `translateX(${t < M.w2 ? x : 0}px)` }}>
				<Steps t={t} seq={[[C[1], [["开口说", G1]]], [M.w2, [["就能", "linear-gradient(90deg,#8f86ff,#a99bff)"], ["写好", G1]]]]} size={t < M.w2 ? lerp(t, C[1], M.w2, 360, 220, inOut) : 220} /></div></AbsoluteFill> }
		case 3: { const y = lerp(t, C[2], C[3], 60, -60)
			return <Grad t={t}><div style={{ position: "absolute", left: 160, top: 250 + y, fontWeight: 600, lineHeight: 1.08 }}>
				<div style={{ fontSize: 120, opacity: 0.45 }}>会议记录</div><div style={{ fontSize: 170 }}>语音输入<br />与润色</div><div style={{ fontSize: 120, opacity: 0.45 }}>热词</div></div></Grad> }
		case 4: return <Grad t={t} warm><div style={{ position: "absolute", left: 220, top: 300, fontSize: 170, fontWeight: 600, lineHeight: 1.1 }}>语音输入<br />与润色</div></Grad>
		case 5: return <Navy><Phrase t={t} t0={C[4]} parts={[["介绍"]]} /></Navy>
		case 6: return <Navy><AbsoluteFill style={{ transform: `scale(${lerp(t, C[5], C[6], 0.9, 1.0)})` }}><Phrase t={t} t0={C[5]} parts={[["场景润色", G2]]} /></AbsoluteFill></Navy>
		case 7: { const c = path(t, [[C[6], 1400, 980], [M.fclick - 0.25, 1240, 830], [C[7], 1240, 830]])
			return <AbsoluteFill style={{ background: "#fbfbfe" }}><Glow t={t} low op={0.9} /><HotForm t={t} /><Hand x={c.x} y={c.y} down={click(t, M.fclick)} arrow s={1.4} /></AbsoluteFill> }
		case 8: return <Navy><div style={{ position: "absolute", left: 0, top: 0, width: 900, height: 1080, background: "#fbfbfe", overflow: "hidden" }}><Glow t={t} low /><HotForm t={t} x={60} /></div><HotList t={t} /></Navy>
		case 9: return <Navy><Phrase t={t} t0={C[8]} parts={[["说", G3], ["一次"]]} /></Navy>
		case 10: return <Navy><Phrase t={t} t0={C[9]} parts={[["就"], ["记住", G3]]} /></Navy>
		case 11: return t < M.card ? <Navy><Phrase t={t} t0={C[10]} parts={[["下次直接"], ["写对", G2]]} /></Navy> : <Fix t={t} />
		case 12: return <Navy><Phrase t={t} t0={C[11] - 0.2} parts={[["调整"]]} size={190} /></Navy>
		case 13: return <Navy><Steps t={t} seq={[[C[12], [["润色程度", G2]]], [M.sub2, [["按"], ["你的习惯", G3]]]]} /></Navy>
		case 14: return <Polish t={t} />
		case 15: return t < M.dd ? <Navy><Steps t={t} seq={[[C[14], [["按场景"]]], [M.ov2, [["按场景"], ["换一种写法", G2]]]]} /></Navy> : <SceneUI t={t} />
		case 16: return <AppUI t={t} />
		case 17: return <Navy><Steps t={t} seq={[[C[16], [["开会时", G3]]], [M.imp2, [["按 "], ["Fn + Shift", G3]]]]} /></Navy>
		case 18: return <MeetUI t={t} />
		case 19: return <Navy><Phrase t={t} t0={C[18]} parts={[["接着整理"]]} /></Navy>
		case 20: return t < M.panel ? <Navy><Phrase t={t} t0={C[19]} parts={[["总结和待办", G2]]} /></Navy> : <TodoPanel t={t} />
		case 21: return <Navy><Phrase t={t} t0={C[20]} parts={[["MosMos 会议记录", G1]]} size={110} /></Navy>
		case 22: return <AbsoluteFill style={{ background: "#f6f6f8" }}><Phrase t={t} t0={C[21] - 0.3} parts={[["现在，", "linear-gradient(90deg,#7d7bff,#a99bff)"], ["开口就好", G1]]} size={170} /></AbsoluteFill>
		case 23: return <Grad t={t}><LogoCard t={t} s={0.9} /></Grad>
		case 24: return <Grad t={t}><LogoCard t={t} s={1.3} /></Grad>
		default: return <Navy />
	}
}
