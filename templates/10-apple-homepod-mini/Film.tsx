// Template 10 — structure of Apple "The new HomePod mini 2" (2026), MosMos content.
// Near-white stage, a lowercase wordmark that twists in 3D, word-by-word gradient lines, a top-down rhythm of
// coloured rings, a giant cropped "dome" (here the MosMos voice pill), a lineup, and an Apple-style end card.
// MosMos is software, so the hero object is its real UI element (the voice pill), not invented hardware.
import React from "react"
import { AbsoluteFill } from "remotion"
import { ACC, CJK, SANS, COPY, Wave, lerp, clamp01, inOut, out, useT, LogoPixels, Wordmark } from "../_engine/src/mos"
import { rand } from "../_engine/src/kit"
import TL from "./timeline.json"

const M = TL.marks as Record<string, number>, C = TL.cuts
const BG = "#f3f3f5", INKC = "#1d1d1f"
const PAL = ["#0b0b0c", ACC, "#a9c1e8", "#d9d6cf", "#ffffff"]
const GRAD = ["#c98aa0", "#7a8fc0", ACC, "#1f3f7a"]

const Words: React.FC<{ t: number; t0: number; words: string[]; size?: number; dt?: number }> = ({ t, t0, words, size = 64, dt = 0.22 }) => (
	<div style={{ fontFamily: CJK, fontWeight: 700, fontSize: size, display: "flex", justifyContent: "center", letterSpacing: "-0.01em", whiteSpace: "nowrap" }}>
		{words.map((w, i) => { const p = clamp01((t - t0 - i * dt) / 0.35); const col = p < 1 ? GRAD[Math.min(3, Math.floor(p * 3))] : GRAD[3]; return <span key={i} style={{ opacity: clamp01(p * 2), color: t - t0 - i * dt < 0.8 ? GRAD[Math.min(3, Math.floor(clamp01((t - t0 - i * dt) / 0.8) * 4))] : INKC }}>{w}</span> })}
	</div>
)
const Ring: React.FC<{ c: number; s?: number; tilt?: number }> = ({ c, s = 130, tilt = 0 }) => {
	const col = PAL[c], light = c === 4 || c === 3 || c === 2
	return (
		<div style={{ width: s, height: s, borderRadius: "50%", background: col, boxShadow: `inset 0 -${s * 0.05}px ${s * 0.08}px rgba(0,0,0,.25), 0 ${s * 0.06}px ${s * 0.12}px rgba(0,0,0,.18)`, display: "flex", alignItems: "center", justifyContent: "center", transform: tilt ? `perspective(900px) rotateX(${tilt}deg)` : undefined, border: c === 4 ? "1px solid #e2e2e6" : undefined }}>
			<div style={{ width: s * 0.56, height: s * 0.56, borderRadius: "50%", background: light ? "#f7f7f9" : "rgba(255,255,255,.88)", boxShadow: "inset 0 2px 6px rgba(0,0,0,.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
				<div style={{ display: "flex", gap: s * 0.03, alignItems: "center" }}>{[0.3, 0.6, 1, 0.6, 0.3].map((h, i) => <div key={i} style={{ width: s * 0.03, height: s * 0.2 * h, borderRadius: 2, background: c === 0 ? "#0b0b0c" : ACC, opacity: 0.7 }} />)}</div>
			</div>
		</div>
	)
}
const Pill: React.FC<{ t: number; w: number; glow?: number; live?: boolean; tone?: string }> = ({ t, w, glow = 0, live = true, tone = "#0b0b0c" }) => (
	<div style={{ width: w, height: w * 0.32, borderRadius: w, background: tone, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 ${w * 0.04}px ${w * 0.08}px rgba(0,0,0,.25), inset 0 ${w * 0.01}px ${w * 0.02}px rgba(255,255,255,.18)` }}>
		{glow > 0 && <div style={{ position: "absolute", inset: w * 0.03, borderRadius: w, background: `radial-gradient(ellipse at ${50 + Math.sin(t * 1.3) * 20}% 50%, rgba(255,190,140,${0.6 * glow}), rgba(140,170,255,${0.55 * glow}) 45%, transparent 75%)`, filter: `blur(${w * 0.02}px)` }} />}
		<div style={{ transform: `scale(${w / 260})` }}><Wave t={t} live={live} n={12} h={30} /></div>
	</div>
)
const Opening: React.FC<{ t: number }> = ({ t }) => {
	const w = t >= C[1] ? 0 : clamp01((t - M.warp0) / (C[1] - M.warp0)) * 0.8
	const intro = clamp01(t / 0.3)
	return (
		<AbsoluteFill style={{ background: BG, alignItems: "center", justifyContent: "center", perspective: 900 }}>
			<div style={{ display: "flex", fontFamily: SANS, fontWeight: 600, fontSize: t >= C[1] ? 104 : 120, color: INKC, letterSpacing: "-0.03em", transform: `scale(${1 + Math.pow(1 - intro, 2) * 2})` }}>
				{Array.from("mosmos").map((ch, i) => {
					const ph = Math.sin(w * Math.PI) , rot = ph * (i % 2 ? 70 : -70) * Math.sin(w * Math.PI * 2 + i), sx = 1 + ph * (i === 3 ? 1.4 : 0.4) * Math.cos(i)
					return <span key={i} style={{ display: "inline-block", transform: `rotateY(${rot}deg) scaleX(${sx * (0.2 + 0.8 * intro)}) skewX(${(1 - intro) * 50}deg)`, filter: (1 - intro) > 0.05 || ph > 0.5 ? `blur(${(1 - intro) * 8 + ph * 2}px)` : undefined }}>{ch}</span>
				})}
			</div>
		</AbsoluteFill>
	)
}
const Macro: React.FC<{ t: number }> = ({ t }) => {
	// soft dissolve into an extreme macro of the button top, hard cut at C[2] to the pulled-back ring
	const s = t < C[2] ? lerp(t, M.macro, C[2], 5.5, 4, (x) => x) : Math.exp(lerp(t, C[2], M.ring + 0.15, Math.log(1.1), Math.log(0.5), inOut))
	const fade = t < C[2] ? clamp01((t - M.macro) / 0.15) : 1
	return <AbsoluteFill style={{ background: BG }}><div style={{ position: "absolute", left: 960 - 130, top: 540 - 130, transform: `scale(${s})`, opacity: fade }}><Ring c={t < C[2] ? 4 : 1} s={260} /></div></AbsoluteFill>
}
const Rings: React.FC<{ t: number }> = ({ t }) => {
	const z = t > M.zoom ? Math.exp(lerp(t, M.zoom, C[3], 0, Math.log(16), inOut)) : 1
	return (
		<AbsoluteFill style={{ background: BG }}>
			<div style={{ position: "absolute", left: 960, top: 540, transform: `scale(${z})` }}>
				{(TL.rings as number[][]).map(([a, b, x, y, c], i) => {
					if (t < a || t > b) return null
					const p = clamp01((t - a) / 0.18) * clamp01((b - t) / 0.18)
					return <div key={i} style={{ position: "absolute", left: x - 65, top: y - 65, transform: `scale(${0.6 + 0.4 * p})`, opacity: p }}><Ring c={c} /></div>
				})}
			</div>
		</AbsoluteFill>
	)
}
const Siri: React.FC<{ t: number }> = ({ t }) => (
	<AbsoluteFill style={{ background: BG, alignItems: "center", justifyContent: "center" }}>
		<Words t={t} t0={M.siri} words={["MosMos 润色。"]} size={60} />
		<div style={{ height: 14 }} />
		<Words t={t} t0={M.siri2} words={["更懂场景。", "更懂你。"]} size={72} dt={0.5} />
		<div style={{ position: "absolute", bottom: 70, fontFamily: CJK, fontSize: 16, color: "#9a9aa0" }}>润色效果取决于所选档位：关闭、标准、高级。</div>
	</AbsoluteFill>
)
const Dome: React.FC<{ t: number }> = ({ t }) => (
	<AbsoluteFill style={{ background: BG }}>
		<div style={{ position: "absolute", left: 960, top: 900, transform: `translate(-50%,-50%) rotate(${lerp(t, C[4], C[5], -2, 2, (x) => x)}deg)` }}><Pill t={t} w={1500} /></div>
	</AbsoluteFill>
)
const WIN = [["飞书 / 微信", COPY.scenes[0].out, "#0b0b0c", -720, -420, 1.0], ["邮件", "李经理，您好：", "#d9d6cf", 640, -380, 0.9], ["文档", "项目复盘", ACC, -680, 360, 0.95], ["代码与终端", 'rg -l "API_KEY" .', "#131316", 700, 380, 1.0]] as const
const Multi: React.FC<{ t: number }> = ({ t }) => {
	const n = t < C[6] ? 0 : t < C[7] ? 1 : 4
	const toRings = clamp01((t - M.tilted) / 0.6)
	return (
		<AbsoluteFill style={{ background: BG, alignItems: "center", justifyContent: "center" }}>
			<div style={{ opacity: 1 - toRings }}><Words t={t} t0={M.multi} words={["飞书、邮件、文档，", "到终端，"]} size={60} dt={0.35} /><div style={{ height: 8 }} /><Words t={t} t0={M.multi + 0.8} words={["都能写。"]} size={60} /></div>
			{WIN.slice(0, n).map(([a, b, c, x, y, s], i) => {
				const p = clamp01((t - (i ? M.collage : M.slide) - i * 0.08) / 0.5)
				return <div key={i} style={{ position: "absolute", left: 960 + x * (1.6 - 0.6 * out(p)) - 330, top: 540 + y * (1.6 - 0.6 * out(p)) - 200, width: 660, height: 400, borderRadius: 40, background: c, opacity: (1 - toRings), boxShadow: "0 30px 60px rgba(0,0,0,.2)", padding: 40, fontFamily: CJK, transform: `scale(${s})` }}>
					<div style={{ fontSize: 26, color: c === "#d9d6cf" ? "#55534d" : "#c8c9cc" }}>{a}</div><div style={{ fontSize: 34, marginTop: 20, color: c === "#d9d6cf" ? INKC : "#fff", lineHeight: 1.4 }}>{b}</div></div>
			})}
			{toRings > 0 && [[0, -260, 1], [-300, -60, 2], [300, -60, 0], [-190, 230, 3], [190, 230, 4]].map(([x, y, c], i) => <div key={i} style={{ position: "absolute", left: 960 + x - 65, top: 540 + y - 65, opacity: toRings, transform: `scale(${0.8 + 0.2 * toRings})` }}><Ring c={c} tilt={35} /></div>)}
		</AbsoluteFill>
	)
}
const Command: React.FC<{ t: number }> = ({ t }) => (
	<AbsoluteFill style={{ background: BG }}>
		<div style={{ position: "absolute", top: 300, width: 1920 }}><Words t={t} t0={M.cmd} words={["你说，", "它来写，", "写进你正在用的应用。"]} size={66} dt={0.55} /></div>
		<div style={{ position: "absolute", left: 960, top: 1010, transform: `translate(-50%,-50%) scale(${t < C[9] ? 1 : t < C[10] ? 1.5 : 1})` }}><Pill t={t} w={1300} glow={clamp01((t - M.cmd - 0.6) / 0.8)} /></div>
	</AbsoluteFill>
)
const LINE = [["#ffffff", "飞书"], [ACC, "邮件"], ["#0b0b0c", "文档"], ["#a9c1e8", "提示词"], ["#d9d6cf", "终端"]] as const
const Lineup: React.FC<{ t: number }> = ({ t }) => {
	const sh = lerp(t, M.shrink, C[11], 1, 0.6, inOut)
	return (
		<AbsoluteFill style={{ background: BG, alignItems: "center", justifyContent: "center" }}>
			<div style={{ display: "flex", gap: 40, alignItems: "flex-end", transform: `scale(${sh})` }}>
				{LINE.map(([c, l], i) => {
					const p = clamp01((t - M.lineup - (i === 2 ? 0.5 : Math.abs(i - 2) * 0.15)) / 0.6)
					const big = i === 2 ? 1.25 : 1
					return <div key={i} style={{ transform: `translateX(${(1 - out(p)) * (i - 2) * 400}px) scale(${big})`, opacity: p, display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
						<Pill t={t + i} w={300} tone={c} live={i === 2} />
						<div style={{ fontFamily: CJK, fontSize: 24, color: "#6e6e73" }}>{l}</div></div>
				})}
			</div>
		</AbsoluteFill>
	)
}
const EndCard: React.FC<{ t: number }> = ({ t }) => {
	if (t < M.name) return <AbsoluteFill style={{ background: BG, alignItems: "center", justifyContent: "center" }}><Words t={t} t0={M.priv} words={["Mac", "\u00a0和\u00a0", "Windows", "\u00a0都能用。"]} size={64} dt={0.25} /></AbsoluteFill>
	if (t < C[12]) {
		const k = t < M.name2 ? 0 : 1
		return <AbsoluteFill style={{ background: BG, alignItems: "center", justifyContent: "center" }}><div style={{ display: "flex", alignItems: "center", gap: 18, opacity: clamp01((t - M.name) / 0.3) }}><LogoPixels size={52} t={t} mode="static" /><Wordmark size={60} color={INKC} />{k ? <span style={{ fontFamily: CJK, fontSize: 56, color: INKC, fontWeight: 600, opacity: clamp01((t - M.name2) / 0.3) }}>语音输入</span> : null}</div></AbsoluteFill>
	}
	const sw = clamp01((t - C[12]) / 0.6)
	return (
		<AbsoluteFill style={{ background: BG, alignItems: "center", justifyContent: "center" }}>
			<div style={{ transform: `translateX(${(1 - out(sw)) * -160}px) rotate(${(1 - sw) * -30}deg)`, opacity: sw }}><LogoPixels size={120} t={t} mode="in" t0={C[12]} /></div>
			<div style={{ position: "absolute", bottom: 80, width: 1300, fontFamily: CJK, fontSize: 15, color: "#8e8e93", lineHeight: 1.7, textAlign: "center" }}>MosMos 支持 macOS 15 及以上（Apple 芯片）与 Windows 10 / 11（64 位）。可在任意输入框中按 Fn 开始语音输入，再按一次完成写作；Fn + Shift 开始会议记录。润色分为关闭、标准、高级三档。下载与更多信息见 mosmos.io。</div>
		</AbsoluteFill>
	)
}
export const Film: React.FC = () => {
	const t = useT()
	if (t < C[0]) return <AbsoluteFill style={{ background: "#000" }} />
	if (t < M.line) return <Opening t={t} />
	if (t < M.macro) return <AbsoluteFill style={{ background: BG, alignItems: "center", justifyContent: "center" }}><Words t={t} t0={M.line} words={["声音，", "直接", "变成", "文字。"]} size={64} /></AbsoluteFill>
	if (t < M.ring + 0.15) return <Macro t={t} />
	if (t < C[3]) return <Rings t={t} />
	if (t < C[4]) return <Siri t={t} />
	if (t < C[5]) return <Dome t={t} />
	if (t < C[8]) return <Multi t={t} />
	if (t < C[10]) return <Command t={t} />
	if (t < C[11]) return <Lineup t={t} />
	if (t < C[13]) return <EndCard t={t} />
	return <AbsoluteFill style={{ background: "#000" }} />
}
