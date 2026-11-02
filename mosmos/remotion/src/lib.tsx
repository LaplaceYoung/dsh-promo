import React from "react"
import { AbsoluteFill, Easing, Img, interpolate, staticFile } from "remotion"
import TL from "./timeline.json"

export const FPS = 60
export const INK = "#0b0b0c", INK2 = "#131316", PAPER = "#ffffff", CARD = "#fdfdfd", S1 = "#fafafb", S2 = "#f4f4f5"
export const LINE = "#eaeaec", T2 = "#6e7075", T3 = "#8a8c90", T4 = "#b4b6ba", TXT = "#16171a"
export const ACC = "#2f5fa8"
export const SANS = "Geist, 'Noto Sans CJK SC', 'Noto Sans SC', sans-serif"
export const CJK = "'Noto Sans CJK SC', 'Noto Sans SC', Geist, sans-serif"
export const MONO = "'Geist Mono', 'Noto Sans CJK SC', monospace"
export const out = Easing.bezier(0.16, 1, 0.3, 1)
export const inOut = Easing.bezier(0.65, 0, 0.35, 1)
export const inQ = Easing.bezier(0.55, 0, 0.9, 0.4)
export const lerp = (x: number, a: number, b: number, from: number, to: number, ease: (t: number) => number = out) =>
	interpolate(x, [a, b], [from, to], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease })
export const clamp01 = (x: number) => Math.max(0, Math.min(1, x))

type TypeEv = { id: string; text: string; t0: number; cps: number; dele: number | null; dcps: number }
const TYPING: Record<string, TypeEv> = Object.fromEntries((TL.typing as TypeEv[]).map((e) => [e.id, e]))
/** visible part of a typed string at absolute time t (seconds). */
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
export const typeEnd = (id: string) => { const e = TYPING[id]; return e.t0 + (Array.from(e.text).length - 1) / e.cps }

export const Caret: React.FC<{ t: number; solid?: boolean; color?: string; h?: number; glow?: boolean }> = ({ t, solid, color = TXT, h = 1, glow }) => {
	const on = solid || Math.floor(t * 2.2) % 2 === 0
	return <span style={{ display: "inline-block", width: "0.06em", height: `${h}em`, marginLeft: "0.06em", verticalAlign: "-0.12em", background: color, opacity: on ? 1 : 0, boxShadow: glow ? `0 0 14px 3px ${color}` : undefined }} />
}

/** Typed line with an accent tail starting at char index accentFrom. */
export const TypedLine: React.FC<{ id: string; t: number; accentFrom?: number; size: number; color?: string; accent?: string; weight?: number; caret?: boolean; glow?: boolean }> = ({ id, t, accentFrom = 999, size, color = TXT, accent = ACC, weight = 700, caret = true, glow }) => {
	const { s, typing } = typed(id, t)
	const a = Array.from(s)
	return (
		<div style={{ fontFamily: CJK, fontWeight: weight, fontSize: size, color, letterSpacing: "0.01em", whiteSpace: "nowrap", textShadow: glow ? `0 0 18px rgba(255,255,255,.45)` : undefined }}>
			<span>{a.slice(0, accentFrom).join("")}</span>
			<span style={{ color: accent }}>{a.slice(accentFrom).join("")}</span>
			{caret && <Caret t={t} solid={typing} color={glow ? "#fff" : color} glow={glow} />}
		</div>
	)
}

export const Center: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
	<AbsoluteFill style={{ alignItems: "center", justifyContent: "center", ...style }}>{children}</AbsoluteFill>
)

/** waveform glyph like the site's pill icon */
export const Wave: React.FC<{ t: number; live?: boolean; n?: number; h?: number; color?: string; shimmer?: boolean }> = ({ t, live, n = 12, h = 30, color = "#fff", shimmer }) => {
	const base = [0.35, 0.6, 0.9, 0.55, 1, 0.7, 0.4, 0.85, 0.6, 0.95, 0.5, 0.3, 0.7, 0.45]
	return (
		<div style={{ display: "flex", alignItems: "center", gap: h * 0.13, height: h }}>
			{Array.from({ length: n }).map((_, i) => {
				let v = base[i % base.length]
				if (live) v = 0.25 + 0.75 * Math.abs(Math.sin(t * 9.3 + i * 1.7) * Math.cos(t * 4.1 + i * 0.6))
				let op = 1
				if (shimmer) { const p = (t * 1.6) % 1; op = 0.35 + 0.65 * Math.max(0, 1 - Math.abs(i / n - p) * 4); v = 0.45 }
				return <div key={i} style={{ width: h * 0.1, height: h * v, borderRadius: 4, background: color, opacity: op }} />
			})}
		</div>
	)
}

/** MosMos voice pill (recreated from the site's demo). */
export const Pill: React.FC<{ t: number; state: "语音输入" | "润色中" | "已写好" | string; sub?: string; scale?: number; live?: boolean; dark?: boolean }> = ({ t, state, sub = "风格：自动 · 简洁自然", scale = 1, live, dark = true }) => (
	<div style={{ transform: `scale(${scale})`, transformOrigin: "center", width: 400, height: 66, borderRadius: 999, background: dark ? INK : "#fff", boxShadow: "0 18px 40px rgba(0,0,0,.28), 0 0 0 1px rgba(255,255,255,.06) inset", display: "flex", alignItems: "center", padding: "0 18px 0 24px", gap: 18, fontFamily: CJK }}>
		<Wave t={t} live={live} shimmer={state === "润色中"} h={30} color={dark ? "#fff" : INK} />
		<div style={{ flex: 1, lineHeight: 1.25 }}>
			<div style={{ color: dark ? "#fff" : INK, fontSize: 17, fontWeight: 500 }}>{state}</div>
			<div style={{ color: "#9a9ca1", fontSize: 13 }}>{sub}</div>
		</div>
		<div style={{ width: 26, height: 26, borderRadius: 99, background: "#3a3b40", color: "#d0d1d4", fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: SANS }}>✕</div>
	</div>
)

export const RawBubble: React.FC<{ text: string; filler?: string; fillerFade?: number; w?: number; size?: number; t?: number; live?: boolean; caret?: boolean }> = ({ text, filler = "", fillerFade = 0, w = 760, size = 22, t = 0, live, caret }) => (
	<div style={{ width: w, borderRadius: 18, background: S2, padding: "20px 26px", display: "flex", gap: 16, alignItems: "flex-start", fontFamily: CJK, fontSize: size, color: "#2a2b30", lineHeight: 1.55, boxShadow: "0 1px 0 rgba(0,0,0,.03)" }}>
		<div style={{ paddingTop: size * 0.25 }}><Wave t={t} live={live} n={6} h={size * 0.95} color={"#3a3b40"} /></div>
		<div style={{ flex: 1 }}>
			{filler && <span style={{ color: T3, background: "rgba(0,0,0,.06)", borderRadius: 4, padding: "0 2px", textDecoration: fillerFade > 0 ? "line-through" : undefined, opacity: 1 - fillerFade * 0.6 }}>{filler}</span>}
			<span>{text}</span>
			{caret && <Caret t={t} solid color="#2a2b30" />}
		</div>
	</div>
)

export const InkBubble: React.FC<{ children: React.ReactNode; w?: number; size?: number; style?: React.CSSProperties }> = ({ children, w = 760, size = 22, style }) => (
	<div style={{ width: w, borderRadius: 18, background: INK, color: "#fff", padding: "22px 28px", fontFamily: CJK, fontSize: size, lineHeight: 1.6, whiteSpace: "pre-wrap", boxShadow: "0 20px 50px rgba(0,0,0,.18)", ...style }}>{children}</div>
)

export const Keycap: React.FC<{ label: string; t: number; press: number; size?: number; wide?: number; dark?: boolean }> = ({ label, t, press, size = 120, wide = 1, dark }) => {
	const d = Math.abs(t - press)
	const p = d < 0.12 ? 1 - d / 0.12 : 0
	return (
		<div style={{ width: size * wide, height: size, borderRadius: size * 0.2, background: dark ? "#1c1d21" : "#fff", border: `1px solid ${dark ? "#2e2f34" : LINE}`, boxShadow: `0 ${14 - p * 10}px ${30 - p * 18}px rgba(0,0,0,${dark ? 0.5 : 0.16}), inset 0 -${6 - p * 4}px 0 ${dark ? "#121215" : "#ececef"}`, transform: `translateY(${p * 8}px)`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: SANS, fontWeight: 600, fontSize: size * 0.3, color: dark ? "#fff" : INK }}>{label}</div>
	)
}

export const Cursor: React.FC<{ x: number; y: number; down?: boolean; s?: number }> = ({ x, y, down, s = 1 }) => (
	<div style={{ position: "absolute", left: x, top: y, transform: `scale(${(down ? 0.86 : 1) * s})`, transformOrigin: "4px 2px", filter: "drop-shadow(0 3px 5px rgba(0,0,0,.35))", zIndex: 50 }}>
		<svg width="40" height="40" viewBox="0 0 24 24"><path d="M4 2.5 L4 19.5 L8.6 15.3 L11.6 21.8 L14.6 20.5 L11.7 14.2 L18 14.2 Z" fill="#0b0b0c" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" /></svg>
	</div>
)
/** piecewise cursor path: keys [t, x, y] */
export function path(t: number, keys: [number, number, number][]) {
	if (t <= keys[0][0]) return { x: keys[0][1], y: keys[0][2] }
	for (let i = 0; i < keys.length - 1; i++) {
		const [ta, xa, ya] = keys[i], [tb, xb, yb] = keys[i + 1]
		if (t <= tb) { const p = inOut(clamp01((t - ta) / (tb - ta))); return { x: xa + (xb - xa) * p, y: ya + (yb - ya) * p } }
	}
	const k = keys[keys.length - 1]; return { x: k[1], y: k[2] }
}

export const Tex: React.FC<{ name: string; style?: React.CSSProperties }> = ({ name, style }) => (
	<Img src={staticFile(`tex-${name}.webp`)} style={{ position: "absolute", objectFit: "cover", ...style }} />
)

/** Window chrome (generic macOS-like, monochrome). */
export const Win: React.FC<{ w: number; h: number; dark?: boolean; title?: string; children?: React.ReactNode; style?: React.CSSProperties }> = ({ w, h, dark, title, children, style }) => (
	<div style={{ width: w, height: h, borderRadius: 22, overflow: "hidden", background: dark ? INK2 : "#fff", boxShadow: dark ? "0 40px 90px rgba(0,0,0,.55), 0 0 0 1px #26272c" : "0 40px 90px rgba(10,20,40,.18), 0 0 0 1px #e6e6e9", position: "relative", fontFamily: CJK, ...style }}>
		<div style={{ height: 46, display: "flex", alignItems: "center", padding: "0 18px", gap: 9, borderBottom: `1px solid ${dark ? "#232428" : LINE}` }}>
			{["#ff5f57", "#febc2e", "#28c840"].map((c) => <div key={c} style={{ width: 13, height: 13, borderRadius: 99, background: dark ? "#3a3b40" : "#dcdce0" }} />)}
			<div style={{ marginLeft: 14, fontSize: 14, color: dark ? "#8a8c90" : T3, fontFamily: CJK }}>{title}</div>
		</div>
		<div style={{ position: "absolute", top: 46, left: 0, right: 0, bottom: 0 }}>{children}</div>
	</div>
)
export const Bar: React.FC<{ w: number; h?: number; c?: string; style?: React.CSSProperties }> = ({ w, h = 12, c = "#e8e8eb", style }) => <div style={{ width: w, height: h, borderRadius: h / 2, background: c, ...style }} />

export const Chip: React.FC<{ label: string; active?: boolean; size?: number; dark?: boolean }> = ({ label, active, size = 18, dark }) => (
	<div style={{ padding: `${size * 0.45}px ${size * 0.95}px`, borderRadius: size * 0.5, fontFamily: CJK, fontSize: size, background: active ? (dark ? "#fff" : INK) : dark ? "#1c1d21" : "#fff", color: active ? (dark ? INK : "#fff") : dark ? "#c8c9cc" : "#3a3b40", border: `1px solid ${active ? "transparent" : dark ? "#2e2f34" : LINE}`, whiteSpace: "nowrap" }}>{label}</div>
)
export const SCENES = ["飞书 / 微信", "邮件", "文档", "提示词", "代码与终端"]

/** Real MosMos logo, tiled so its pixels can animate. */
import GRID from "./logo_grid.json"
export const LogoPixels: React.FC<{ size: number; t: number; mode: "in" | "spin" | "static"; invert?: boolean; t0?: number }> = ({ size, t, mode, invert, t0 = 0 }) => {
	const G = GRID as string[]
	const rows = G.length, cols = G[0].length
	const c = size / Math.max(rows, cols)
	const cells: React.ReactNode[] = []
	let k = 0
	for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
		if (G[y][x] !== "#") continue
		k++
		let dx = 0, dy = 0, op = 1, rot = 0, sc = 1
		if (mode === "in") {
			const seed = Math.sin(k * 91.7) * 43758.5, r = seed - Math.floor(seed)
			const st = t0 + r * 0.45, p = lerp(t, st, st + 0.5, 0, 1)
			dx = (1 - p) * (r - 0.5) * size * 2.2; dy = (1 - p) * (Math.cos(k * 3.1)) * size * 0.9; op = p; sc = 0.4 + 0.6 * p
		}
		if (mode === "spin") { const p = lerp(t, t0, t0 + 1.0, 0, 1, inOut); rot = p * 360; const dist = Math.sin(p * Math.PI); dx = (x - cols / 2) * c * dist * 0.6; dy = (y - rows / 2) * c * dist * 0.6 }
		cells.push(<div key={k} style={{ position: "absolute", left: x * c + dx, top: y * c + dy, width: c + 0.6, height: c + 0.6, background: invert ? "#fff" : INK, opacity: op, transform: `rotate(${rot}deg) scale(${sc})` }} />)
	}
	return <div style={{ position: "relative", width: cols * c, height: rows * c }}>{cells}</div>
}
/** Real app icon (PNG); pixels assemble onto the white tile when `assemble` is given. */
export const AppIcon: React.FC<{ size: number; t?: number; assemble?: number; spin?: number }> = ({ size, t = 0, assemble, spin }) => {
	const G = GRID as string[]
	const showPx = assemble != null && t < assemble + 1.0
	const pngOp = assemble == null ? 1 : lerp(t, assemble + 0.8, assemble + 1.0, 0, 1)
	const tile = assemble == null ? 1 : lerp(t, assemble, assemble + 0.35, 0, 1)
	const rot = spin != null ? lerp(t, spin, spin + 1.1, 0, 360, inOut) : 0
	const inner = size * (117 / 180), off = size * (33 / 180), offY = size * (21 / 180)
	const c = inner / G[0].length
	let k = 0
	return (
		<div style={{ position: "relative", width: size, height: size, transform: `perspective(800px) rotateY(${rot}deg)` }}>
			<div style={{ position: "absolute", inset: 0, borderRadius: size * 0.22, background: "#fff", transform: `scale(${tile})`, opacity: tile }} />
			{showPx && G.map((row, y) => Array.from(row).map((ch, x) => {
				if (ch !== "#") return null
				k++
				const seed = Math.sin(k * 91.7) * 43758.5, r = seed - Math.floor(seed)
				const st = assemble! + 0.1 + r * 0.4, p = lerp(t, st, st + 0.45, 0, 1)
				return <div key={`${x}-${y}`} style={{ position: "absolute", left: off + x * c + (1 - p) * (r - 0.5) * size * 3, top: offY + y * c + (1 - p) * Math.cos(k * 3.1) * size, width: c + 0.5, height: c + 0.5, background: INK, opacity: p * (1 - pngOp) }} />
			}))}
			<Img src={staticFile("mossec-logo.png")} style={{ position: "absolute", inset: 0, width: size, height: size, opacity: pngOp }} />
		</div>
	)
}
export const Wordmark: React.FC<{ size: number; color?: string; disperse?: number }> = ({ size, color = INK, disperse = 0 }) => (
	<div style={{ display: "flex", fontFamily: SANS, fontWeight: 600, fontSize: size, color, letterSpacing: "-0.02em" }}>
		{Array.from("MosMos").map((ch, i) => {
			const d = clamp01(disperse * 1.6 - i * 0.12)
			return <span key={i} style={{ display: "inline-block", transform: `translate(${d * (40 + i * 26)}px, ${d * Math.sin(i * 2.1) * 30}px)`, opacity: 1 - d, filter: d > 0.01 ? `blur(${d * 10}px)` : undefined }}>{ch}</span>
		})}
	</div>
)
