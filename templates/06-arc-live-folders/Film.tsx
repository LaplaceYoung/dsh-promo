// Template 06 — structure of The Browser Company "Introducing Live Folders in Arc" (2024), MosMos content.
// Hard cuts on the beat between full-bleed brand-blue word cards and tilted, shallow-focus screen macros.
// The reference's live-action shots (a person talking / typing) become voice and keyboard macros.
import React from "react"
import { AbsoluteFill } from "remotion"
import { ACC, CJK, SANS, MONO, COPY, Keycap, Wave, lerp, clamp01, inOut, out, useT, LogoPixels, Caret } from "../_engine/src/mos"
import { DOF, Hand, track, Grain } from "../_engine/src/kit"
import TL from "./timeline.json"

const BLUE = ACC
const SHOTS = TL.shots as [number, string, any][]
const SIDE = "#dfe6f3"
const sc = COPY.scenes

const Card: React.FC<{ t: number; t0: number; words: string[]; small?: boolean }> = ({ t, t0, words, small }) => {
	const sw = (TL.swap as any)[String(t0)]
	const w = sw && t >= sw ? words[1] : words[0]
	return (
		<AbsoluteFill style={{ background: BLUE, alignItems: "center", justifyContent: "center" }}>
			<div style={{ fontFamily: CJK, fontWeight: 900, fontSize: small ? 96 : 190, lineHeight: 1.04, color: "#fff", textAlign: "center", letterSpacing: "0.02em", WebkitTextStroke: small ? "3px #fff" : "6px #fff" }}>
				{w.split("|").map((l, i) => <div key={i}>{l}</div>)}
			</div>
		</AbsoluteFill>
	)
}
const Composer: React.FC<{ t: number; click: number }> = ({ t, click }) => (
	<div style={{ width: 1500, height: 560, background: "#fff", position: "relative", fontFamily: CJK }}>
		<div style={{ position: "absolute", left: 40, top: 30, width: 1420, height: 300, borderRadius: 12, border: `2px solid ${ACC}`, padding: 26, fontSize: 30, color: "#2a2b2f", lineHeight: 1.6 }}>{sc[0].out}<Caret t={t} color={ACC} /></div>
		<div style={{ position: "absolute", left: 40, top: 350, fontSize: 24, color: "#6e7075" }}>按 Fn 说话 · {sc[0].style}</div>
		<div style={{ position: "absolute", right: 40, top: 360, height: 70, padding: "0 34px", borderRadius: 12, background: Math.abs(t - click) < 0.1 ? "#22468a" : ACC, color: "#fff", fontSize: 30, display: "flex", alignItems: "center", gap: 20 }}>发送 <span style={{ opacity: 0.6 }}>|</span> ⌄</div>
		<div style={{ position: "absolute", left: 40, top: 470, right: 40, height: 2, background: "#e6e6e9" }} />
		<div style={{ position: "absolute", left: 640, top: 490, fontSize: 24, color: "#55565a" }}>⌘ 1 条消息待发送</div>
	</div>
)
const Sidebar: React.FC<{ t: number; t0: number; hl?: number; close?: boolean }> = ({ t, t0, hl = 1, close }) => {
	const items = [["飞书 / 微信", sc[0].out], ["邮件", "李经理，您好："], ["代码与终端", sc[4].out]]
	return (
		<div style={{ width: 760, height: 900, background: SIDE, padding: "40px 30px", fontFamily: CJK, position: "relative" }}>
			<div style={{ fontSize: 22, color: "#7a8296", marginBottom: 24 }}>小林的工作区</div>
			<div style={{ fontSize: 30, color: "#2b3140", marginBottom: 22 }}>▢ 项目群 · 首页改版</div>
			<div style={{ fontSize: 30, color: "#2b3140", marginBottom: 16 }}>◎ 已写好</div>
			{items.map(([a, b], i) => {
				const o = clamp01((t - t0 - 0.15 - i * 0.18) / 0.2)
				return (
					<div key={i} style={{ marginLeft: 20, marginBottom: 14, padding: "14px 20px", borderRadius: 14, background: i === hl ? "rgba(255,255,255,.9)" : "rgba(255,255,255,.35)", opacity: o, transform: `translateY(${(1 - o) * 14}px)`, display: "flex", gap: 16, alignItems: "center", position: "relative" }}>
						<div style={{ width: 30, height: 30, borderRadius: 8, background: "#0b0b0c", display: "flex", alignItems: "center", justifyContent: "center" }}><Wave t={t} n={4} h={14} /></div>
						<div style={{ lineHeight: 1.3, width: 560 }}><div style={{ fontSize: 26, color: "#1d1f26", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontFamily: i === 2 ? MONO : CJK }}>{b}</div><div style={{ fontSize: 18, color: "#7a8296" }}>{a}</div></div>
						{close && i === 2 && <div style={{ position: "absolute", right: 20, fontSize: 26, color: "#555" }}>✕</div>}
					</div>
				)
			})}
			<div style={{ marginLeft: 20, marginTop: 10, fontSize: 24, color: "#8a91a3" }}>+ 新对话</div>
		</div>
	)
}
const Window: React.FC<{ t: number; t0: number; v: number }> = ({ t, t0, v }) => {
	const tip = clamp01((t - t0 - 0.3) / 0.2)
	return (
		<AbsoluteFill style={{ background: "linear-gradient(135deg,#8a4b2e,#c27a4a 40%,#5e3420)" }}>
			<div style={{ position: "absolute", left: 220, top: 60, width: 1600, height: 1060, borderRadius: 22, overflow: "hidden", display: "flex", boxShadow: "0 30px 80px rgba(0,0,0,.4)", transform: `scale(${lerp(t, t0, t0 + 2.1, 1.0, 1.05, (x) => x)})`, transformOrigin: "30% 30%" }}>
				<Sidebar t={t} t0={t0 - 1} hl={v === 0 ? 0 : 2} />
				<div style={{ flex: 1, background: "#fff", padding: 50, fontFamily: CJK, position: "relative" }}>
					<div style={{ fontSize: 22, color: "#8a8c90" }}>项目群 · 首页改版</div>
					<div style={{ fontSize: 54, fontWeight: 700, color: "#16171a", marginTop: 24 }}>{v === 0 ? "第一版周三前发你" : "已写好"}</div>
					<div style={{ display: "inline-flex", marginTop: 20, padding: "8px 18px", borderRadius: 999, background: v === 0 ? "#e7f0ff" : "#ede7ff", color: v === 0 ? ACC : "#6a4bd8", fontSize: 24 }}>{v === 0 ? "✓ 已写好" : "⑂ 已发送"}</div>
					<div style={{ marginTop: 40, padding: 28, borderRadius: 16, background: "#f4f4f5", fontSize: 28, color: "#2a2b30", lineHeight: 1.6, width: 700 }}>{v === 0 ? sc[0].out : sc[4].out}</div>
				</div>
			</div>
			{v === 0 && <div style={{ position: "absolute", left: 1010, top: 120, width: 520, padding: "18px 24px", borderRadius: 14, background: "#f3f3f1", boxShadow: "0 12px 30px rgba(0,0,0,.2)", fontFamily: CJK, opacity: tip, transform: `translateY(${(1 - tip) * 10}px)` }}>
				<div style={{ fontSize: 24, color: "#1d1d1f" }}>MosMos · 已写好</div>
				<div style={{ fontSize: 19, color: "#6e7075", marginTop: 6 }}>{COPY.steps[2].desc}</div>
			</div>}
		</AbsoluteFill>
	)
}
const Tilted: React.FC<{ children: React.ReactNode; rx: number; ry: number; rz: number; s: number; x: number; y: number; focus?: number; angle?: number }> = ({ children, rx, ry, rz, s, x, y, focus = 50, angle = 120 }) => (
	<AbsoluteFill style={{ background: "#bfc3c9" }}>
		<DOF tf={`translate(${x}px,${y}px) perspective(1500px) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg) scale(${s})`} angle={angle} focus={focus} band={13} blur={6} left={200} top={200}>{children}</DOF>
		<Grain op={0.12} />
	</AbsoluteFill>
)
const VoiceMacro: React.FC<{ t: number; t0: number; v: number }> = ({ t, t0, v }) => (
	<AbsoluteFill style={{ background: v ? "radial-gradient(circle at 50% 45%, #3c4a52, #12181c 75%)" : "radial-gradient(circle at 40% 40%, #5b8f8c, #1d3437 70%)", alignItems: "center", justifyContent: "center" }}>
		<div style={{ transform: `scale(${v ? 3.4 : 2.2}) translateX(${lerp(t, t0, t0 + 2, 10, -10, (x) => x)}px)`, filter: v ? "blur(5px)" : undefined }}>
			<div style={{ width: 400, height: 66, borderRadius: 999, background: "#0b0b0c", display: "flex", alignItems: "center", gap: 18, padding: "0 24px", fontFamily: CJK, boxShadow: "0 18px 40px rgba(0,0,0,.35)" }}>
				<Wave t={t} live h={30} />
				<div style={{ lineHeight: 1.25 }}><div style={{ color: "#fff", fontSize: 17 }}>语音输入</div><div style={{ color: "#9a9ca1", fontSize: 13 }}>{sc[v ? 1 : 0].style}</div></div>
			</div>
		</div>
	</AbsoluteFill>
)
const Kbd: React.FC<{ t: number; t0: number; macro: boolean; press: number }> = ({ t, t0, macro, press }) => {
	const rows = [["esc", "F1", "F2", "F3", "F4", "F5", "F6"], ["`", "1", "2", "3", "4", "5", "6"], ["⇥", "Q", "W", "E", "R", "T", "Y"], ["⇪", "A", "S", "D", "F", "G", "H"], ["⇧", "Z", "X", "C", "V", "B", "N"], ["Fn", "⌃", "⌥", "⌘", "space"]]
	return (
		<AbsoluteFill style={{ background: "linear-gradient(160deg,#2b3236,#0d1012)" }}><AbsoluteFill style={{ transform: macro ? `scale(${lerp(t, t0, t0 + 1, 2.4, 2.55, (x) => x)})` : undefined, transformOrigin: "420px 860px" }}>
			<div style={{ position: "absolute", left: 380, top: 120, transform: `perspective(1400px) rotateX(50deg) rotateZ(-8deg) scale(1.05) translateX(${lerp(t, t0, t0 + 1, 0, -30, (x) => x)}px)`, transformOrigin: "0 0" }}>
				{rows.map((r, i) => (
					<div key={i} style={{ display: "flex", gap: 16, marginBottom: 16 }}>
						{r.map((k) => <Keycap key={k} label={k} t={k === "Fn" ? t : -9} press={press} size={110} wide={k === "space" ? 4.4 : 1} dark />)}
					</div>
				))}
			</div>
		</AbsoluteFill></AbsoluteFill>
	)
}
const Meeting: React.FC<{ t: number; t0: number }> = ({ t, t0 }) => (
	<AbsoluteFill style={{ background: "radial-gradient(circle at 50% 40%, #e9eef0, #b9c4c8 80%)", alignItems: "center", justifyContent: "center", fontFamily: CJK }}>
		<div style={{ width: 1180, padding: 50, borderRadius: 26, background: "#fff", boxShadow: "0 30px 70px rgba(0,0,0,.18)", transform: `scale(${lerp(t, t0, t0 + 3.8, 1.0, 1.06, (x) => x)})` }}>
			<div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#6e7075" }}><span>会议记录 · Fn + Shift</span><span style={{ color: "#d64545" }}>● 录制中 · 3 位发言人</span></div>
			{COPY.meeting.map(([who, tm, txt], i) => {
				const o = clamp01((t - t0 - 0.3 - i * 1.0) / 0.3)
				return <div key={i} style={{ marginTop: 30, opacity: o, transform: `translateY(${(1 - o) * 16}px)` }}><div style={{ fontSize: 20, color: "#8a8c90" }}>{who} · {tm}</div><div style={{ fontSize: 34, color: "#16171a", marginTop: 6 }}>{txt}</div></div>
			})}
		</div>
	</AbsoluteFill>
)
const Overlay: React.FC<{ t: number }> = ({ t }) => t >= TL.overlay[0] && t < TL.overlay[1] ? (
	<AbsoluteFill style={{ alignItems: "center", justifyContent: "center", fontFamily: CJK, fontWeight: 900, fontSize: 64, color: "#fff", textAlign: "center", lineHeight: 1.2, textShadow: "0 4px 20px rgba(0,0,0,.35)" }}>
		<div>{COPY.platforms[0]}</div><div>{COPY.platforms[1]}</div>
	</AbsoluteFill>
) : null

export const Film: React.FC = () => {
	const t = useT()
	let i = SHOTS.length - 1
	while (i > 0 && t < SHOTS[i][0]) i--
	const [t0, kind, arg] = SHOTS[i]
	let body: React.ReactNode = null
	const hx = (a: number, b: number) => track(t, [[t0, a], [t0 + 0.5, b]])
	switch (kind) {
		case "black": body = <AbsoluteFill style={{ background: "#000" }} />; break
		case "card": body = <Card t={t} t0={t0} words={arg} />; break
		case "cardSmall": body = <Card t={t} t0={t0} words={arg} small />; break
		case "send": body = <AbsoluteFill style={{ background: "#fff" }}><div style={{ position: "absolute", left: -536, top: 67, transform: "scale(1.35)", transformOrigin: "0 0" }}><Composer t={t} click={0.6} /></div><Hand x={hx(1500, 1310)} y={hx(950, 610)} down={Math.abs(t - 0.6) < 0.08} s={0.9} /></AbsoluteFill>; break
		case "window": body = <Window t={t} t0={t0} v={arg} />; break
		case "voice": body = <VoiceMacro t={t} t0={t0} v={arg} />; break
		case "sendTilt": body = <Tilted rx={arg ? 32 : 25} ry={arg ? -18 : -22} rz={-12} s={1.25} x={lerp(t, t0, t0 + 1.1, 0, -60, (x) => x)} y={-80} focus={arg ? 45 : 55}><Composer t={t} click={arg ? 10.5 : 7.6} /></Tilted>; break
		case "sideTilt": body = <Tilted rx={20} ry={-28} rz={-8} s={1.4} x={lerp(t, t0, t0 + 1.1, 120, 40, (x) => x)} y={-120} focus={50} angle={100}><Sidebar t={t} t0={t0} hl={arg ? 2 : 1} /></Tilted>; break
		case "kbd": body = <Kbd t={t} t0={t0} macro={false} press={14.0} />; break
		case "fn": body = <Kbd t={t} t0={t0} macro press={arg ? 25.15 : 14.75} />; break
		case "sideClose": body = <AbsoluteFill style={{ background: SIDE }}><div style={{ position: "absolute", left: 60, top: -60, transform: "scale(1.45)", transformOrigin: "0 0" }}><Sidebar t={t} t0={t0 - 2} hl={2} close /></div><Hand x={track(t, [[t0, 1200], [16.1, 1180]])} y={track(t, [[t0, 900], [16.1, 640]])} down={Math.abs(t - 16.1) < 0.08} /></AbsoluteFill>; break
		case "itemZoom": body = <AbsoluteFill style={{ background: SIDE }}><div style={{ position: "absolute", left: -100, top: -420, transform: `scale(${lerp(t, t0, t0 + 1.1, 2.4, 2.6, (x) => x)})`, transformOrigin: "0 0" }}><Sidebar t={t} t0={t0 - 2} hl={2} close /></div></AbsoluteFill>; break
		case "meeting": body = <Meeting t={t} t0={t0} />; break
		case "logo": body = <AbsoluteFill style={{ background: BLUE, alignItems: "center", justifyContent: "center" }}><LogoPixels size={260} t={t} mode="static" invert /><div style={{ position: "absolute", bottom: 90, fontFamily: SANS, fontSize: 30, color: "rgba(255,255,255,.8)", letterSpacing: "0.04em" }}>mosmos.io</div></AbsoluteFill>; break
	}
	return <AbsoluteFill>{body}<Overlay t={t} /></AbsoluteFill>
}
