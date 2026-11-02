// Template 17 — structure of teenage engineering "introducing OP–1 field" (2022), MosMos content.
// Tiny light type on black, then slow macro product photography of keys (licensed stock photos of two
// keyboards, ASSETS.md), tiny type on soft white with the last word swapped, a hero shot with the MosMos
// voice pill hovering over the keys, a thin wordmark with a badge, and a warm light leak to black.
import React from "react"
import { AbsoluteFill, Img, staticFile } from "remotion"
import { SANS, COPY, lerp, clamp01, inOut, useT, Pill } from "../_engine/src/mos"
import TL from "./timeline.json"

const M = TL.marks as Record<string, number>
const C = TL.cuts
const THIN = "'Noto Sans SC', Geist, sans-serif"
const WHITE = "#f3f3f2"

const Vignette: React.FC = () => <AbsoluteFill style={{ background: "radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(0,0,0,.09) 100%)" }} />
const Tiny: React.FC<{ t: number; text: string; t0: number; t1?: number; dark?: boolean }> = ({ t, text, t0, t1 = 99, dark }) => (
	<AbsoluteFill style={{ background: dark ? "#000" : WHITE, alignItems: "center", justifyContent: "center" }}>
		<div style={{ fontFamily: THIN, fontWeight: 300, fontSize: 30, letterSpacing: "0.04em", color: dark ? "#cfcfcf" : "#2b2b2b", opacity: clamp01((t - t0) / 0.4) * clamp01((t1 - t) / 0.3) }}>{text}</div>
		{!dark && <Vignette />}
	</AbsoluteFill>
)
const Swap: React.FC<{ t: number; ks: [number, string][] }> = ({ t, ks }) => {
	let s = ""
	for (const [k, v] of ks) if (t >= k) s = v
	return <Tiny t={t} text={s} t0={ks[0][0]} />
}
// a photo shot: crop/rotate/push a still with CSS, optional brightness ramp
const Photo: React.FC<{ t: number; t0: number; t1: number; src: string; s0: number; s1: number; x: number; y: number; r0: number; r1: number; b0?: number; b1?: number; children?: React.ReactNode }> = ({ t, t0, t1, src, s0, s1, x, y, r0, r1, b0 = 1, b1 = 1, children }) => {
	const p = clamp01((t - t0) / (t1 - t0))
	const s = s0 + (s1 - s0) * p, r = r0 + (r1 - r0) * p, b = b0 + (b1 - b0) * inOut(p)
	return (
		<AbsoluteFill style={{ background: WHITE, overflow: "hidden" }}>
			<div style={{ position: "absolute", left: 960, top: 540, width: 1920, height: 1280, marginLeft: -960, marginTop: -640, transform: `translate(${x}px,${y}px) rotate(${r}deg) scale(${s})`, filter: `brightness(${b})` }}>
				<Img src={staticFile(src)} style={{ width: 1920, height: 1280, objectFit: "cover" }} />
				{children}
			</div>
			<Vignette />
		</AbsoluteFill>
	)
}
const Floating: React.FC<{ t: number; t0: number; state: string; live: boolean; s?: number }> = ({ t, t0, state, live, s = 1.3 }) => (
	<div style={{ position: "absolute", left: 960 - 200, top: 300, transform: `scale(${s}) translateY(${Math.sin(t * 1.4) * 4}px)`, opacity: clamp01((t - t0) / 0.4), filter: "drop-shadow(0 30px 40px rgba(0,0,0,.35))" }}><Pill t={t} state={state} live={live} /></div>
)
const Mark: React.FC<{ t: number }> = ({ t }) => {
	const leak = clamp01((t - M.leak) / 0.9)
	return (
		<AbsoluteFill style={{ background: WHITE, alignItems: "center", justifyContent: "center" }}>
			{t < M.n1out && <div style={{ fontFamily: THIN, fontWeight: 300, fontSize: 30, color: "#2b2b2b", opacity: clamp01((t - M.n1) / 0.3) * clamp01((M.n1out - t) / 0.2) }}>全新的</div>}
			{t >= M.mark && <div style={{ display: "flex", alignItems: "center", gap: 18, opacity: clamp01((t - M.mark) / 0.25) }}>
				<div style={{ fontFamily: SANS, fontWeight: 200, fontSize: 104, letterSpacing: "-0.01em", color: "#1a1a1a" }}>MosMos</div>
				<div style={{ fontFamily: THIN, fontWeight: 400, fontSize: 20, color: "#444", border: "1.5px solid #888", borderRadius: 8, padding: "4px 10px", marginTop: 18 }}>语音输入</div>
			</div>}
			{t >= M.fine && <div style={{ position: "absolute", bottom: 120, width: 1100, textAlign: "center", fontFamily: THIN, fontWeight: 300, fontSize: 15, lineHeight: 1.7, color: "#6a6a6a", opacity: clamp01((t - M.fine) / 0.4) }}>{COPY.platforms.join("　·　")}。在任意输入框按 Fn 开始说话，再按一次写好；Fn + Shift 记录整场会议。<br />{COPY.url}</div>}
			<Vignette />
			{leak > 0 && <AbsoluteFill style={{ background: `linear-gradient(90deg, rgba(30,18,28,${0.85 * leak}) 0%, rgba(120,60,60,${0.5 * leak}) 55%, rgba(255,170,110,${0.9 * leak}) 85%, rgba(255,235,210,${leak}) 100%)` }} />}
		</AbsoluteFill>
	)
}

export const Film: React.FC = () => {
	const t = useT()
	if (t < C[0]) return <Tiny t={t} text="从打字，回到说话。" t0={M.t0} t1={M.t0out} dark />
	if (t < C[1]) return <Photo t={t} t0={C[0]} t1={C[1]} src="t17-kb-retro.webp" s0={2.6} s1={2.3} x={-700} y={200} r0={-28} r1={-24} b0={0.45} b1={1.0} />
	if (t < C[2]) return <Photo t={t} t0={C[1]} t1={C[2]} src="t17-kb-white.webp" s0={2.8} s1={2.7} x={200} y={-100} r0={-14} r1={-13} />
	if (t < C[3]) return <Photo t={t} t0={C[2]} t1={C[3]} src="t17-kb-retro.webp" s0={3.4} s1={3.0} x={300} y={-250} r0={8} r1={6} />
	if (t < C[4]) return <Swap t={t} ks={[[M.a1, "按下 Fn，说话。"], [M.a2, "按下 Fn，润色。"], [M.a3, "按下 Fn，写好。"]]} />
	if (t < C[5]) return <AbsoluteFill><Photo t={t} t0={C[4]} t1={C[5]} src="t17-kb-retro.webp" s0={1.55} s1={1.5} x={260} y={200} r0={-16} r1={-15} /><Floating t={t} t0={C[4]} state="语音输入" live s={1.5} /></AbsoluteFill>
	if (t < C[6]) return <Swap t={t} ks={[[M.b1, "少打字，"], [M.b2, "少打字，少改字，"], [M.b3, "少打字，少改字，多说话。"]]} />
	if (t < C[7]) return <Photo t={t} t0={C[6]} t1={C[7]} src="t17-kb-white.webp" s0={2.0} s1={1.85} x={500} y={250} r0={30} r1={24} />
	if (t < C[8]) {
		const st = t < M.pol ? "语音输入" : t < M.done ? "润色中" : "已写好"
		return <AbsoluteFill><Photo t={t} t0={C[7]} t1={C[8]} src="t17-kb-white.webp" s0={1.08} s1={1.12} x={0} y={120} r0={0} r1={0} />{t > M.pill && <Floating t={t} t0={M.pill} state={st} live={t < M.pol} />}</AbsoluteFill>
	}
	if (t < C[9]) return <Mark t={t} />
	return <AbsoluteFill style={{ background: `rgb(${Math.round(40 * (1 - clamp01((t - C[9]) / 0.5)))},${Math.round(25 * (1 - clamp01((t - C[9]) / 0.5)))},${Math.round(35 * (1 - clamp01((t - C[9]) / 0.5)))})` }} />
}
