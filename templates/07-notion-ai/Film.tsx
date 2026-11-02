// Template 07 — structure of Notion "Meet the new Notion AI" (2024), MosMos content.
// Warm off-white title cards with masked line rises, colour-block split screens with a mascot face,
// UI macros per feature, and a three-step outro (face → line → logo).
import React from "react"
import { AbsoluteFill } from "remotion"
import { ACC, CJK, SANS, MONO, COPY, Wave, lerp, clamp01, out, inOut, useT, LogoPixels, Wordmark, Caret, typeAt, Chip } from "../_engine/src/mos"
import { Hand, track, vis } from "../_engine/src/kit"
import TL from "./timeline.json"

const OFF = "#f6f5f3", RED = "#e4572e", YEL = "#f2b134", INKC = "#141414"
const SHOTS = TL.shots as [number, string][]
const sc = COPY.scenes
const I = TL.intro

/** Lines rise from behind a mask, like the reference's title type. */
const Rise: React.FC<{ t: number; t0: number; lines: React.ReactNode[]; size?: number; t1?: number }> = ({ t, t0, lines, size = 100, t1 = 999 }) => (
	<div style={{ fontFamily: CJK, fontWeight: 700, fontSize: size, color: INKC, textAlign: "center", lineHeight: 1.18, letterSpacing: "-0.01em" }}>
		{lines.map((l, i) => {
			const p = lerp(t, t0 + i * 0.06, t0 + i * 0.06 + 0.45, 0, 1), q = lerp(t, t1, t1 + 0.3, 0, 1, inOut)
			return <div key={i} style={{ overflow: "hidden", paddingBottom: 6 }}><div style={{ transform: `translateY(${(1 - p) * 100 - q * 100}%)` }}>{l}</div></div>
		})}
	</div>
)
const Face: React.FC<{ t: number; size?: number; mood?: number }> = ({ t, size = 300, mood = 0 }) => {
	const tilt = Math.sin(t * 2.2) * 6 + mood * 10, bob = Math.sin(t * 3.1) * 6
	return (
		<div style={{ width: size, height: size, borderRadius: "50%", background: "#fff", border: `${size * 0.03}px solid ${INKC}`, display: "flex", alignItems: "center", justifyContent: "center", transform: `rotate(${tilt}deg) translateY(${bob}px)`, flexDirection: "column", gap: size * 0.05 }}>
			<LogoPixels size={size * 0.46} t={t} mode="static" />
			<div style={{ transform: `scaleY(${0.6 + 0.4 * Math.abs(Math.sin(t * 5))})` }}><Wave t={t} live n={7} h={size * 0.09} color={INKC} /></div>
		</div>
	)
}
const Ico: React.FC<{ g: string; c: string; s?: number }> = ({ g, c, s = 120 }) => (
	<div style={{ width: s, height: s, borderRadius: s * 0.24, background: c, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: g.length > 1 ? MONO : CJK, fontWeight: 700, fontSize: s * (g.length > 1 ? 0.36 : 0.48) }}>{g}</div>
)
const ICONS: [string, string][] = [["飞", "#3370ff"], ["微", "#1aad19"], ["✉", "#e4572e"], ["文", "#f2b134"], [">_", "#1b1c1f"], ["✦", "#8a5cf6"]]
const Intro: React.FC<{ t: number }> = ({ t }) => {
	let body: React.ReactNode = null
	if (t < I.tool) body = <Rise t={t} t0={I.meet} t1={I.tool - 0.3} lines={[<span>认识<span style={{ display: "inline-block", transform: "skewX(-12deg)", color: ACC }}>全新</span>的</span>, "MosMos"]} />
	else if (t < I.all) {
		const k = I.pills.filter((p) => t >= p).length - 1
		const pill = k >= 0 ? TL.pills[k] : ""
		const pin = k >= 0 ? lerp(t, I.pills[k], I.pills[k] + 0.18, 0.85, 1) : 0
		body = <div style={{ display: "flex", alignItems: "center", gap: 28 }}><Rise t={t} t0={I.tool} lines={["一个工具，就能"]} />
			<div style={{ opacity: k >= 0 ? 1 : 0, transform: `scale(${pin})`, padding: "16px 30px", borderRadius: 18, background: "#fff", boxShadow: "0 6px 24px rgba(0,0,0,.08)", fontFamily: CJK, fontSize: 56, color: "#333", display: "flex", gap: 18, alignItems: "center", minWidth: 420 }}>
				<div style={{ width: 40, height: 40, borderRadius: 10, background: ICONS[k % 6]?.[1] ?? "#ccc" }} />{pill}</div></div>
	} else if (t < I.icons) body = <Rise t={t} t0={I.all} t1={I.icons - 0.3} lines={["一个工具，全都能写。"]} />
	else {
		const small = lerp(t, I.apps, I.apps + 0.5, 0, 1, inOut)
		body = <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 40 }}>
			{t >= I.apps && <Rise t={t} t0={I.apps} lines={["在任何应用里，", "开口就写"]} />}
			<div style={{ display: "flex", gap: lerp(small, 0, 1, 70, 16, (x) => x) }}>
				{ICONS.map(([g, c], i) => { const p = lerp(t, I.icons + i * 0.12, I.icons + i * 0.12 + 0.35, 0, 1); return <div key={i} style={{ transform: `scale(${p})` }}><Ico g={g} c={c} s={lerp(small, 0, 1, 130, 44, (x) => x)} /></div> })}
			</div></div>
	}
	return <AbsoluteFill style={{ background: OFF, alignItems: "center", justifyContent: "center" }}>{body}</AbsoluteFill>
}
const Panel: React.FC<{ t: number; t0: number; mode: "list" | "result" | "meeting"; s?: number }> = ({ t, t0, mode, s = 1 }) => {
	const rows = mode === "list" ? ["整理今天的会议记录", "回复项目群：第一版什么时候给", "把周报写成三段", "生成查找 API_KEY 的命令"] : []
	return (
		<div style={{ width: 760, borderRadius: 22, background: "#fff", boxShadow: "0 24px 60px rgba(0,0,0,.18)", padding: 34, fontFamily: CJK, transform: `scale(${s})`, transformOrigin: "50% 50%" }}>
			<div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 24, color: "#6e7075" }}><LogoPixels size={30} t={t} mode="static" /> MosMos · {mode === "meeting" ? "会议记录" : "最近"}</div>
			{mode === "list" && <><div style={{ fontSize: 34, fontWeight: 700, marginTop: 22, color: INKC }}>今天想写点什么？</div>
				{rows.map((r, i) => <div key={i} style={{ marginTop: 18, fontSize: 26, color: "#2a2b30", display: "flex", gap: 14, opacity: vis(t, t0 + 0.2 + i * 0.15, 999, 0.2), alignItems: "center" }}><span style={{ color: ACC }}>◎</span>{r}</div>)}</>}
			{mode === "result" && <>
				<div style={{ marginTop: 22, alignSelf: "flex-end", marginLeft: 180, padding: "16px 20px", borderRadius: 14, background: "#f1f1f2", color: "#8a8c90", fontSize: 22, lineHeight: 1.5 }}>{sc[0].filler}{sc[0].raw}</div>
				<div style={{ marginTop: 16, fontSize: 20, color: "#8a8c90" }}>识别场景 · 飞书 / 微信 → {sc[0].style}</div>
				<div style={{ marginTop: 18, fontSize: 32, color: INKC, lineHeight: 1.5, fontWeight: 600 }}>{typeAt(sc[0].out, t, t0 + 0.9, 16).s}<Caret t={t} color={ACC} /></div>
				<div style={{ display: "flex", gap: 10, marginTop: 22, opacity: vis(t, t0 + 2.6, 999) }}><Chip label="✓ 已写好" active /><Chip label="已粘贴到当前输入框" /></div></>}
			{mode === "meeting" && <>
				{COPY.meeting.map(([w, tm, x], i) => <div key={i} style={{ marginTop: 20, opacity: vis(t, t0 + 0.4 + i * 1.1, 999) }}><div style={{ fontSize: 18, color: "#8a8c90" }}>{w} · {tm}</div><div style={{ fontSize: 26, color: INKC, marginTop: 4 }}>{x}</div></div>)}
				<div style={{ marginTop: 26, paddingTop: 20, borderTop: "1px solid #eaeaec", opacity: vis(t, t0 + 4.2, 999) }}>
					<div style={{ fontSize: 22, color: ACC, fontWeight: 700 }}>待办事项</div>
					{COPY.todos.map((d, i) => <div key={i} style={{ marginTop: 10, fontSize: 24, color: "#2a2b30", opacity: vis(t, t0 + 4.6 + i * 0.5, 999) }}>☐ {d}</div>)}
				</div></>}
		</div>
	)
}
const Split: React.FC<{ t: number; t0: number; mode: "list" | "result" | "meeting" }> = ({ t, t0, mode }) => (
	<AbsoluteFill style={{ background: OFF }}>
		<div style={{ position: "absolute", left: 1060, top: 0, right: 0, bottom: 0, background: ACC, display: "flex", alignItems: "center", justifyContent: "center" }}><Face t={t} size={500} mood={mode === "result" ? Math.sin(t * 1.3) : 0} /></div>
		<div style={{ position: "absolute", left: 530, top: 540, transform: `translate(-50%, -50%) translateY(${lerp(t, t0, t0 + 0.6, 80, 0)}px) scale(1.3)` }}><Panel t={t} t0={t0} mode={mode} /></div>
	</AbsoluteFill>
)
const AskMacro: React.FC<{ t: number; t0: number }> = ({ t, t0 }) => (
	<AbsoluteFill style={{ background: OFF, alignItems: "center", justifyContent: "center" }}>
		<div style={{ transform: `scale(${lerp(t, t0, t0 + 2.3, 1.9, 2.05, (x) => x)})`, width: 760, fontFamily: CJK }}>
			<div style={{ marginLeft: 200, padding: "16px 20px", borderRadius: 14, background: "#ececee", fontSize: 22, color: "#2a2b30", lineHeight: 1.5 }}>{typeAt(sc[0].filler + sc[0].raw, t, t0 + 0.2, 13).s}</div>
			<div style={{ marginTop: 16, display: "flex", gap: 10, alignItems: "center", fontSize: 18, color: "#8a8c90" }}><LogoPixels size={20} t={t} mode="static" />正在识别场景 · 飞书 / 微信…</div>
			<div style={{ marginTop: 16, height: 64, borderRadius: 14, background: "#fff", boxShadow: "0 6px 20px rgba(0,0,0,.08)", display: "flex", alignItems: "center", padding: "0 20px", gap: 14 }}>
				<div style={{ width: 120, height: 40, borderRadius: 999, background: "#0b0b0c", display: "flex", alignItems: "center", justifyContent: "center" }}><Wave t={t} live n={8} h={18} /></div>
				<span style={{ fontSize: 20, color: "#8a8c90" }}>按 Fn 说话…</span></div>
		</div>
	</AbsoluteFill>
)
const DOCL = COPY.doc
const Doc: React.FC<{ t: number; t0: number }> = ({ t, t0 }) => (
	<div style={{ width: 1180, height: 760, background: "#fff", borderRadius: 18, boxShadow: "0 24px 60px rgba(0,0,0,.22)", padding: "60px 90px", fontFamily: CJK, position: "relative" }}>
		<div style={{ width: 64, height: 64, borderRadius: 14, background: RED, color: "#fff", fontSize: 34, display: "flex", alignItems: "center", justifyContent: "center" }}>文</div>
		<div style={{ fontSize: 46, fontWeight: 700, marginTop: 24, color: INKC }}>项目复盘</div>
		{DOCL.map(([a, b], i) => {
			const st = t0 + 0.6 + i * 1.2, s = typeAt(b, t, st, 18)
			return <div key={i} style={{ marginTop: 22, fontSize: 28, color: "#2a2b30", opacity: t >= st ? 1 : 0 }}><b>{a}</b><span style={{ background: s.typing ? "rgba(47,95,168,.14)" : "transparent" }}>{s.s}</span>{s.typing && <Caret t={t} color={ACC} />}</div>
		})}
		<div style={{ position: "absolute", left: 90, right: 90, bottom: 50, height: 60, borderRadius: 14, border: "1px solid #e6e6e9", display: "flex", alignItems: "center", gap: 14, padding: "0 18px", fontSize: 20, color: "#8a8c90" }}>
			<div style={{ width: 100, height: 36, borderRadius: 999, background: "#0b0b0c", display: "flex", alignItems: "center", justifyContent: "center" }}><Wave t={t} live={t < t0 + 0.6} n={7} h={16} /></div>{sc[2].style}</div>
	</div>
)
const Term: React.FC<{ t: number; t0: number; s: number }> = ({ t, t0, s }) => {
	const cmd = typeAt(sc[4].out, t, t0 + 0.7, 14)
	return (
		<div style={{ width: 1000, height: 560, borderRadius: 18, background: "#131316", boxShadow: "0 24px 60px rgba(0,0,0,.3)", padding: 40, fontFamily: MONO, fontSize: 28, color: "#e8e8ea", transform: `scale(${s})` }}>
			<div style={{ color: "#6e7075", fontSize: 20, fontFamily: CJK }}>终端 · ~/首页改版</div>
			<div style={{ marginTop: 24, color: "#8a8c90", fontFamily: CJK, fontSize: 24 }}># {sc[4].filler}{sc[4].raw}</div>
			<div style={{ marginTop: 20 }}><span style={{ color: "#29a36a" }}>❯</span> {cmd.s}<Caret t={t} color="#fff" /></div>
			{cmd.done && <div style={{ marginTop: 20, fontSize: 22, color: "#8a8c90", fontFamily: CJK }}>{sc[4].hint}</div>}
			{cmd.done && t > t0 + 3.0 && <div style={{ marginTop: 18, color: "#c8c9cc", fontSize: 24 }}>config/dev.env<br />scripts/deploy.sh</div>}
		</div>
	)
}

export const Film: React.FC = () => {
	const t = useT()
	let i = SHOTS.length - 1
	while (i > 0 && t < SHOTS[i][0]) i--
	const [t0, kind] = SHOTS[i]
	if (kind.startsWith("card:")) return <AbsoluteFill style={{ background: OFF, alignItems: "center", justifyContent: "center" }}><Rise t={t} t0={t0 + 0.05} lines={kind.slice(5).split("|")} /></AbsoluteFill>
	switch (kind) {
		case "logoClick": return <AbsoluteFill style={{ background: OFF, alignItems: "center", justifyContent: "center" }}><div style={{ transform: `scale(${Math.abs(t - 0.75) < 0.08 ? 0.92 : 1})` }}><LogoPixels size={90} t={t} mode="static" /></div><Hand x={track(t, [[0, 1080], [0.7, 975]])} y={track(t, [[0, 640], [0.7, 560]])} down={Math.abs(t - 0.75) < 0.08} s={0.8} /></AbsoluteFill>
		case "faceBlue": return <AbsoluteFill style={{ background: ACC, alignItems: "center", justifyContent: "center" }}><div style={{ transform: `scale(${lerp(t, t0, t0 + 0.4, 0.6, 1)})` }}><Face t={t} size={300} /></div></AbsoluteFill>
		case "intro": return <Intro t={t} />
		case "splitPanel": return <Split t={t} t0={t0} mode="list" />
		case "askMacro": return <AskMacro t={t} t0={t0} />
		case "splitResult": return <Split t={t} t0={t0} mode="result" />
		case "resultZoom": return <AbsoluteFill style={{ background: OFF, alignItems: "center", justifyContent: "center" }}><Panel t={t} t0={t0 - 4} mode="result" s={1.35} /></AbsoluteFill>
		case "docRed": return <AbsoluteFill style={{ background: RED, alignItems: "center", justifyContent: "center" }}><div style={{ transform: `scale(${lerp(t, t0, t0 + 1.6, 0.9, 0.95, (x) => x)})` }}><Doc t={t} t0={t0 + 0.6} /></div><Hand x={track(t, [[t0, 1300], [24.35, 1160]])} y={track(t, [[t0, 950], [24.35, 870]])} down={Math.abs(t - 24.4) < 0.08} s={0.9} /></AbsoluteFill>
		case "docMacro": case "docMacro2": {
			const k = kind === "docMacro" ? 0 : 1
			return <AbsoluteFill style={{ background: "#fff" }}><div style={{ position: "absolute", left: 130 - k * 60, top: k ? -420 : -60, transform: `scale(${lerp(t, t0, t0 + 4.6, 1.55, 1.65, (x) => x)})`, transformOrigin: "0 0" }}><Doc t={t} t0={25.4} /></div></AbsoluteFill>
		}
		case "splitMeeting": return <Split t={t} t0={t0} mode="meeting" />
		case "yellowMacro": return <AbsoluteFill style={{ background: YEL, alignItems: "center", justifyContent: "center" }}><div style={{ transform: `translate(${lerp(t, t0, t0 + 2.2, 420, 380, (x) => x)}px, 300px)` }}><Term t={t} t0={t0 + 0.3} s={1.9} /></div></AbsoluteFill>
		case "yellowWide": return <AbsoluteFill style={{ background: YEL, alignItems: "center", justifyContent: "center" }}><div style={{ transform: `translateY(${lerp(t, t0, t0 + 0.7, 60, 0)}px)` }}><Term t={t} t0={t0 + 0.4} s={1} /></div></AbsoluteFill>
		case "outro": {
			const O = TL.outro
			if (t < O.say) return <AbsoluteFill style={{ background: OFF, alignItems: "center", justifyContent: "center" }}><Face t={t} size={200} /></AbsoluteFill>
			if (t < O.logo) return <AbsoluteFill style={{ background: OFF, alignItems: "center", justifyContent: "center" }}><Rise t={t} t0={O.say} lines={["开口说。就写好。"]} size={84} /></AbsoluteFill>
			const p = lerp(t, O.logo, O.logo + 0.5, 0, 1)
			return <AbsoluteFill style={{ background: OFF, alignItems: "center", justifyContent: "center" }}><div style={{ display: "flex", alignItems: "center", gap: 26, opacity: p, transform: `translateY(${(1 - p) * 16}px)` }}><LogoPixels size={70} t={t} mode="static" /><Wordmark size={64} color={INKC} /></div></AbsoluteFill>
		}
	}
	return null
}
