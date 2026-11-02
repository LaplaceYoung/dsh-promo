import React from "react"
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useVideoConfig } from "remotion"
import TL from "./timeline.json"

export const FPS = 60
export const INK = "#222726", PAPER = "#ffffff", CARD = "#fdfdfd", LINE = "#eaeaec", T2 = "#6e7075", T3 = "#8a8c90", TXT = "#1d2120"
export const ACC = "#005f4a" // MOSS Create CTA green (sampled from the site)
export const CJK = "'Noto Sans CJK SC', 'Noto Sans SC', Inter, sans-serif"
export const SANS = "Inter, 'Noto Sans CJK SC', sans-serif"
export const out = Easing.bezier(0.16, 1, 0.3, 1)
export const inOut = Easing.bezier(0.65, 0, 0.35, 1)
export const inQ = Easing.bezier(0.55, 0, 0.9, 0.4)
export const lerp = (x: number, a: number, b: number, from: number, to: number, ease: (t: number) => number = out) =>
	interpolate(x, [a, b], [from, to], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease })
export const clamp01 = (x: number) => Math.max(0, Math.min(1, x))
export const useV = () => { const { width, height } = useVideoConfig(); return { W: width, H: height, V: height > width } }

type TypeEv = { id: string; text: string; t0: number; cps: number; dele: number | null; dcps: number }
const TYPING: Record<string, TypeEv> = Object.fromEntries((TL.typing as TypeEv[]).map((e) => [e.id, e]))
export function typed(id: string, t: number): { s: string; typing: boolean; done: boolean } {
	const e = TYPING[id]
	const chars = Array.from(e.text)
	let n = Math.floor((t - e.t0) * e.cps) + 1
	if (t < e.t0) n = 0
	n = Math.max(0, Math.min(chars.length, n))
	if (e.dele != null && t >= e.dele) {
		const k = Math.floor((t - e.dele) * e.dcps) + 1
		n = Math.max(0, chars.length - k)
		return { s: chars.slice(0, n).join(""), typing: n > 0, done: n === 0 }
	}
	return { s: chars.slice(0, n).join(""), typing: n > 0 && n < chars.length, done: n === chars.length }
}

export const Caret: React.FC<{ t: number; solid?: boolean; color?: string; glow?: boolean }> = ({ t, solid, color = TXT, glow }) => {
	const on = solid || Math.floor(t * 2.2) % 2 === 0
	return <span style={{ display: "inline-block", width: "0.06em", height: "1em", marginLeft: "0.06em", verticalAlign: "-0.12em", background: color, opacity: on ? 1 : 0, boxShadow: glow ? `0 0 14px 3px ${color}` : undefined }} />
}

/** Typed line; accent tail from char index accentFrom; in vertical it breaks after the first "，". */
export const TypedLine: React.FC<{ id: string; t: number; accentFrom?: number; size: number; color?: string; accent?: string; weight?: number; caret?: boolean; glow?: boolean; brk?: boolean }> = ({ id, t, accentFrom = 999, size, color = TXT, accent = ACC, weight = 700, caret = true, glow, brk }) => {
	const { s, typing } = typed(id, t)
	const a = Array.from(s)
	const full = Array.from(TYPING[id].text)
	const bi = brk ? full.indexOf("，") + 1 : -1
	const seg = (from: number, to: number) => {
		const parts: React.ReactNode[] = []
		const A = a.slice(from, to)
		const k = Math.max(0, Math.min(A.length, accentFrom - from))
		parts.push(<span key="a">{A.slice(0, k).join("")}</span>, <span key="b" style={{ color: accent }}>{A.slice(k).join("")}</span>)
		return parts
	}
	const cur = caret && <Caret t={t} solid={typing} color={glow ? "#fff" : color} glow={glow} />
	const st: React.CSSProperties = { fontFamily: CJK, fontWeight: weight, fontSize: size, color, letterSpacing: "0.01em", whiteSpace: "nowrap", textShadow: glow ? `0 0 18px rgba(255,255,255,.45)` : undefined, lineHeight: 1.3, textAlign: "center" }
	if (bi > 0) return (
		<div style={st}>
			<div>{seg(0, bi)}{a.length <= bi && cur}</div>
			<div style={{ minHeight: size * 1.3 }}>{seg(bi, a.length)}{a.length > bi && cur}</div>
		</div>
	)
	return <div style={st}>{seg(0, a.length)}{cur}</div>
}

export const Center: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
	<AbsoluteFill style={{ alignItems: "center", justifyContent: "center", ...style }}>{children}</AbsoluteFill>
)

export const Cursor: React.FC<{ x: number; y: number; down?: boolean; s?: number }> = ({ x, y, down, s = 1 }) => (
	<div style={{ position: "absolute", left: x, top: y, transform: `scale(${(down ? 0.86 : 1) * s})`, transformOrigin: "4px 2px", filter: "drop-shadow(0 3px 5px rgba(0,0,0,.35))", zIndex: 50 }}>
		<svg width="34" height="34" viewBox="0 0 24 24"><path d="M4 2.5 L4 19.5 L8.6 15.3 L11.6 21.8 L14.6 20.5 L11.7 14.2 L18 14.2 Z" fill="#111" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" /></svg>
	</div>
)
export function path(t: number, keys: [number, number, number][]) {
	if (t <= keys[0][0]) return { x: keys[0][1], y: keys[0][2] }
	for (let i = 0; i < keys.length - 1; i++) {
		const [ta, xa, ya] = keys[i], [tb, xb, yb] = keys[i + 1]
		if (t <= tb) { const p = inOut(clamp01((t - ta) / (tb - ta))); return { x: xa + (xb - xa) * p, y: ya + (yb - ya) * p } }
	}
	const k = keys[keys.length - 1]; return { x: k[1], y: k[2] }
}

/** Real MOSS Create brand mark (from the site's SVG). */
export const Mark: React.FC<{ size: number; white?: boolean; style?: React.CSSProperties }> = ({ size, white, style }) => (
	<Img src={staticFile("logo.svg")} style={{ width: size, height: size * (25.1019 / 34), filter: white ? "brightness(0) invert(1)" : undefined, ...style }} />
)
export const Wordmark: React.FC<{ size: number; color?: string; disperse?: number }> = ({ size, color = INK, disperse = 0 }) => (
	<div style={{ display: "flex", fontFamily: SANS, fontWeight: 600, fontSize: size, color, letterSpacing: "-0.02em", whiteSpace: "pre" }}>
		{Array.from("MOSS Create").map((ch, i) => {
			const d = clamp01(disperse * 1.6 - i * 0.08)
			return <span key={i} style={{ display: "inline-block", transform: `translate(${d * (40 + i * 22)}px, ${d * Math.sin(i * 2.1) * 30}px)`, opacity: 1 - d, filter: d > 0.01 ? `blur(${d * 10}px)` : undefined }}>{ch}</span>
		})}
	</div>
)
export const Cover: React.FC<{ id: string; style?: React.CSSProperties }> = ({ id, style }) => <Img src={staticFile(`c/${id}.jpg`)} style={{ objectFit: "cover", display: "block", ...style }} />
