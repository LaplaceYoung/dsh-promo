// Template 20 — structure of Framer "Update: Interactive Shaders" (2026), MosMos content.
// Black stage. Glass UI and shader-looking type: a neon word, a chrome ring (reflections are a Poly Haven CC0
// studio HDRI, ASSETS.md), iridescent extruded letters; then an editor where sliders reshape a glass MosMos
// toolbar, a spring-curve popover, and a long slow float of the finished glass widget.
import React from "react"
import { AbsoluteFill, Img, staticFile } from "remotion"
import { CJK, HEAVY, SANS, COPY, lerp, clamp01, inOut, typeAt, useT, Cursor, path, LogoPixels, Wave } from "../_engine/src/mos"
import { Camera, CamKey, track } from "../_engine/src/kit"
import TL from "./timeline.json"

const M = TL.marks as Record<string, number>, C = TL.cuts
const HDRI = staticFile("t20-studio.webp")

// ---------- glass primitives
type G = { radius: number; refr: number; blur: number; disp: number }
const G0: G = { radius: 22, refr: 0.5, blur: 6, disp: 0.3 }
const Glass: React.FC<{ g: G; t: number; style?: React.CSSProperties; children?: React.ReactNode }> = ({ g, t, style, children }) => (
	<div style={{ position: "relative", borderRadius: g.radius, overflow: "hidden", background: "linear-gradient(140deg, rgba(255,255,255,.16), rgba(255,255,255,.03) 45%, rgba(255,255,255,.08))", boxShadow: `inset 0 1.5px 0 rgba(255,255,255,.55), inset 0 -1px 0 rgba(255,255,255,.18), inset 0 0 0 1px rgba(255,255,255,.14), 0 30px 70px rgba(0,0,0,.85)`, ...style }}>
		<Img src={HDRI} style={{ position: "absolute", left: -200 + Math.sin(t * 0.4) * 60, top: -120, width: 1400, height: 700, objectFit: "cover", opacity: 0.1 + 0.25 * g.refr, filter: `blur(${g.blur}px)`, mixBlendMode: "screen" }} />
		<div style={{ position: "absolute", inset: 0, borderRadius: g.radius, boxShadow: `inset ${2 + g.disp * 6}px 0 ${6 + g.disp * 10}px rgba(90,160,255,${0.15 + g.disp * 0.3}), inset -${2 + g.disp * 6}px 0 ${6 + g.disp * 10}px rgba(255,120,170,${0.1 + g.disp * 0.25})` }} />
		<div style={{ position: "relative", display: "flex", alignItems: "center", gap: style?.gap, width: "100%" }}>{children}</div>
	</div>
)
const TABS = ["输入", "润色", "会议"]
const Widget: React.FC<{ t: number; g?: G; tab?: number; search?: string; s?: number }> = ({ t, g = G0, tab = 0, search = "", s = 1 }) => (
	<div style={{ width: 760, transform: `scale(${s})`, transformOrigin: "0 0", display: "flex", flexDirection: "column", gap: 18, fontFamily: CJK }}>
		<div style={{ display: "flex", gap: 18, alignItems: "center" }}>
			<Glass g={g} t={t} style={{ padding: "16px 26px", display: "flex", alignItems: "center", gap: 14 }}><LogoPixels size={30} t={0} mode="static" invert /><span style={{ color: "#fff", fontSize: 28, fontWeight: 600, fontFamily: SANS }}>MosMos</span><span style={{ color: "#aaa", fontSize: 20 }}>▾</span></Glass>
			{["＋", "◻", "◯", "△"].map((x) => <div key={x} style={{ color: "rgba(255,255,255,.55)", fontSize: 30, width: 40, textAlign: "center" }}>{x}</div>)}
		</div>
		<div style={{ display: "flex", gap: 30, alignItems: "center" }}>
			{TABS.map((x, i) => i === tab ? <Glass key={x} g={g} t={t} style={{ padding: "14px 26px", color: "#fff", fontSize: 30, fontWeight: 600 }}>{x}</Glass> : <div key={x} style={{ color: "rgba(255,255,255,.42)", fontSize: 30 }}>{x}</div>)}
		</div>
		<Glass g={g} t={t} style={{ padding: "22px 28px", display: "flex", alignItems: "center", gap: 18, width: 660 }}><span style={{ color: "#aaa", fontSize: 28 }}>⌕</span><span style={{ color: search ? "#fff" : "rgba(255,255,255,.4)", fontSize: 28 }}>{search || "搜索热词…"}</span><div style={{ flex: 1 }} /><Wave t={t} live={!!search} n={6} h={22} color="rgba(255,255,255,.7)" /></Glass>
	</div>
)

// ---------- shader type
const Neon: React.FC<{ t: number }> = ({ t }) => {
	const fl = 0.85 + 0.15 * Math.sin(t * 37) * Math.sin(t * 13), on = clamp01((t - M.neon) / 0.25)
	return (
		<AbsoluteFill style={{ background: "#000", alignItems: "center", justifyContent: "center" }}>
			<div style={{ fontFamily: HEAVY, fontWeight: 900, fontSize: 300, color: "#bfe4ff", opacity: on * fl, transform: `scale(${lerp(t, M.neon, C[0], 0.96, 1.04, inOut)}) rotate(-4deg)`, textShadow: "0 0 8px #fff, 0 0 30px #49a6ff, 0 0 70px #1d6bff, 0 0 140px #1d4dff", WebkitTextStroke: "3px #e8f5ff", letterSpacing: "0.04em" }}>开口说</div>
		</AbsoluteFill>
	)
}
const Ring: React.FC<{ t: number }> = ({ t }) => {
	const r = lerp(t, C[0], C[1], -18, 14, inOut), px = (t - C[0]) * 60
	return (
		<AbsoluteFill style={{ background: "#000" }}>
			<div style={{ width: 560, height: 560, borderRadius: 999, position: "absolute", left: 680, top: 260, transform: `perspective(1200px) rotateY(${r}deg) rotateX(8deg)`, overflow: "hidden", boxShadow: "0 40px 120px rgba(0,0,0,.9)" }}>
				<Img src={HDRI} style={{ position: "absolute", left: -900 + px, top: -170, width: 2000, height: 900, objectFit: "cover", filter: "grayscale(1) contrast(1.6)" }} />
				<div style={{ position: "absolute", inset: 0, borderRadius: 999, background: "radial-gradient(circle at 35% 30%, rgba(255,255,255,.55), transparent 40%), radial-gradient(circle, transparent 55%, rgba(0,0,0,.65) 72%, rgba(0,0,0,.1) 85%, rgba(0,0,0,.7) 100%)" }} />
				<div style={{ position: "absolute", left: 95, top: 95, width: 370, height: 370, borderRadius: 999, background: "radial-gradient(circle at 40% 35%, #2a2b30, #050506)", boxShadow: "inset 0 0 40px rgba(0,0,0,.9), inset 0 2px 0 rgba(255,255,255,.3)", display: "flex", flexDirection: "column", justifyContent: "center", gap: 22, padding: "0 70px", fontFamily: CJK }}>
					{COPY.polish.map((p, i) => <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "#eee", fontSize: 30 }}>{p.label}<div style={{ width: 44, height: 44, borderRadius: 12, background: i === 1 ? "#fff" : "rgba(255,255,255,.12)", color: i === 1 ? "#000" : "#bbb", fontSize: 22, display: "flex", alignItems: "center", justifyContent: "center" }}>{["○", "◐", "●"][i]}</div></div>)}
				</div>
			</div>
		</AbsoluteFill>
	)
}
const Irid: React.FC<{ t: number }> = ({ t }) => {
	const sh = (t - C[1]) * 90
	const grad = `linear-gradient(${100 + sh * 0.2}deg, #9ff3ff ${-40 + sh % 40}%, #3c7bff 25%, #f7f7ff 42%, #ff6fb0 60%, #ffc15a 75%, #7af0ff 95%)`
	return (
		<AbsoluteFill style={{ background: "#000", alignItems: "center", justifyContent: "center", opacity: clamp01((M.irid_out + 0.3 - t) / 0.3) }}>
			<div style={{ position: "relative", transform: `perspective(1400px) rotateY(${lerp(t, C[1], M.irid_out, 16, -10, inOut)}deg)` }}>
				{[6, 5, 4, 3, 2, 1].map((d) => <div key={d} style={{ position: "absolute", left: d * 2.5, top: d * 3.5, fontFamily: SANS, fontWeight: 800, fontSize: 250, letterSpacing: "-0.02em", color: `rgba(20,40,${90 + d * 15},1)` }}>MosMos</div>)}
				<div style={{ position: "relative", fontFamily: SANS, fontWeight: 800, fontSize: 250, letterSpacing: "-0.02em", backgroundImage: grad, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", filter: "drop-shadow(0 0 18px rgba(120,180,255,.35))" }}>MosMos</div>
			</div>
		</AbsoluteFill>
	)
}

// ---------- editor
const PROPS: [string, (g: G) => number, number][] = [["圆角", (g) => g.radius / 40, 0], ["折射", (g) => g.refr, 0], ["模糊", (g) => g.blur / 16, 0], ["色散", (g) => g.disp, 0]]
const gAt = (t: number): G => ({
	radius: track(t, [[M.s1, 22], [M.s1 + 1.2, 34], [M.s4, 34], [M.s4 + 1.2, 28]]),
	refr: track(t, [[M.s2, 0.5], [M.s2 + 1.2, 0.9]]),
	blur: track(t, [[M.s3, 6], [M.s3 + 1.2, 2]]),
	disp: track(t, [[M.s4, 0.3], [M.s4 + 1.2, 0.8]]),
})
const Slider: React.FC<{ l: string; v: number; hot?: boolean }> = ({ l, v, hot }) => (
	<div style={{ display: "flex", alignItems: "center", gap: 14, height: 46, fontSize: 18, color: "#cfd0d3" }}>
		<div style={{ width: 70 }}>{l}</div><div style={{ width: 70, background: "#1d1e22", borderRadius: 6, padding: "4px 8px", fontFamily: SANS }}>{v.toFixed(2)}</div>
		<div style={{ flex: 1, height: 4, borderRadius: 2, background: "#2a2b30", position: "relative" }}><div style={{ width: `${v * 100}%`, height: 4, borderRadius: 2, background: hot ? "#3b82f6" : "#666" }} /><div style={{ position: "absolute", left: `calc(${v * 100}% - 9px)`, top: -7, width: 18, height: 18, borderRadius: 9, background: "#fff" }} /></div>
	</div>
)
const Spring: React.FC<{ t: number }> = ({ t }) => {
	const k = track(t, [[M.k1, 0.4], [M.k1 + 0.8, 0.75], [M.k3, 0.75], [M.k3 + 0.8, 0.55]]), d = track(t, [[M.k2, 0.5], [M.k2 + 0.8, 0.25]])
	const pts = Array.from({ length: 60 }, (_, i) => { const x = i / 59; const y = 1 - Math.exp(-x * (3 + k * 6)) * Math.cos(x * (4 + k * 14)) * (0.3 + d * 0.9); return `${x * 300},${120 - y * 90}` }).join(" ")
	return (
		<div style={{ position: "absolute", left: 1000, top: 380, width: 360, background: "#141518", borderRadius: 14, boxShadow: "0 0 0 1px #26272c, 0 20px 50px rgba(0,0,0,.7)", padding: 20, fontFamily: CJK, color: "#ddd", opacity: clamp01((t - M.pop) / 0.25) }}>
			<div style={{ fontSize: 18, fontWeight: 600 }}>过渡</div>
			<svg width={320} height={140} style={{ marginTop: 10, background: "#0d0e10", borderRadius: 8 }}><polyline points={pts} fill="none" stroke="#ddd" strokeWidth={2.5} transform="translate(10,8)" /></svg>
			{[["弹性", "#3b82f6"], ["刚度", ""], ["阻尼", ""], ["质量", ""]].map(([l], i) => <div key={l} style={{ display: "flex", justifyContent: "space-between", fontSize: 16, marginTop: 10, color: "#bbb" }}><span>{l}</span><span style={{ fontFamily: SANS, background: "#1d1e22", padding: "2px 10px", borderRadius: 5 }}>{i === 0 ? "开" : i === 1 ? Math.round(200 + k * 400) : i === 2 ? Math.round(10 + d * 40) : 1}</span></div>)}
		</div>
	)
}
const Editor: React.FC<{ t: number }> = ({ t }) => {
	const g = gAt(t)
	const keys: CamKey[] = t < C[2] ? [[M.editor, 0.62, 960, 540], [M.zoom, 0.62, 960, 540], [M.zoom + 1.4, 1.05, 1180, 560], [C[2], 1.1, 1200, 560]] : [[C[2], 1.15, 1250, 560], [C[3], 1.2, 1280, 560]]
	const hot = [M.s1, M.s2, M.s3, M.s4].findIndex((s) => t > s - 0.3 && t < s + 1.6)
	const cy = 330 + Math.max(0, hot) * 46
	const cur = path(t, t < C[2] ? [[M.zoom + 1.4, 1900, 900], [M.s1 - 0.3, 1700, 330], [M.s1 + 1.2, 1800, 330], [M.s2 - 0.3, 1700, 376], [M.s2 + 1.2, 1830, 376], [M.s3 - 0.3, 1800, 422], [M.s3 + 1.2, 1700, 422], [M.s4 - 0.3, 1720, 468], [M.s4 + 1.2, 1840, 468]] : [[C[2], 1840, 468], [M.k1 - 0.2, 1320, 620], [M.k2 - 0.2, 1320, 650], [M.k3 - 0.2, 1320, 620]])
	return (
		<AbsoluteFill style={{ background: "#000", opacity: clamp01((t - M.editor) / 0.4) * clamp01((M.float - 0.2 - t) / 1.5) }}>
			<Camera t={t} keys={keys}>
				<div style={{ position: "absolute", left: -260, top: -120, width: 2440, height: 1320, background: "#0b0b0d", borderRadius: 20, boxShadow: "0 0 0 1px #1e1f23" }}>
					<div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 300, borderRight: "1px solid #1e1f23", padding: 26, fontFamily: CJK, fontSize: 18, color: "#9a9ca1" }}>{["页面", "图层", "  浮窗", "  标签", "  搜索", "资源"].map((x) => <div key={x} style={{ padding: "8px 0", whiteSpace: "pre" }}>{x}</div>)}</div>
				</div>
				<div style={{ position: "absolute", left: 380, top: 300 }}><Widget t={t} g={g} /></div>
				<div style={{ position: "absolute", left: 1560, top: 240, width: 380, fontFamily: CJK }}>
					<div style={{ fontSize: 18, color: "#fff", fontWeight: 600, marginBottom: 10 }}>玻璃</div>
					{PROPS.map(([l, f], i) => <Slider key={l} l={l} v={f(g)} hot={hot === i} />)}
					<div style={{ fontSize: 18, color: "#fff", fontWeight: 600, margin: "26px 0 10px" }}>交互</div>
					<div style={{ display: "flex", justifyContent: "space-between", fontSize: 17, color: "#bbb", height: 40 }}><span>悬停</span><span>放大 1.04</span></div>
					<div style={{ display: "flex", justifyContent: "space-between", fontSize: 17, color: "#bbb", height: 40 }}><span>过渡</span><span style={{ color: "#3b82f6" }}>弹性</span></div>
				</div>
				{t > M.pop && t < C[3] && <Spring t={t} />}
				{t > M.zoom + 1.4 && <Cursor x={cur.x} y={hot >= 0 || t > C[2] ? cur.y : cy} />}
			</Camera>
		</AbsoluteFill>
	)
}
const Float: React.FC<{ t: number }> = ({ t }) => {
	const tab = t < M.tab1 ? 0 : t < M.tab2 ? 1 : t < M.tab3 ? 2 : 0
	const q = typeAt("热词：Nimbus", t, M.srch + 0.3, 6).s
	const ry = Math.sin((t - M.float) * 0.18) * 9, rx = 6 + Math.sin((t - M.float) * 0.11) * 3
	return (
		<AbsoluteFill style={{ background: "#000", opacity: clamp01((t - M.float) / 1.6) * clamp01((M.out + 0.6 - t) / 0.6) }}>
			<div style={{ position: "absolute", left: 560, top: 330, transform: `perspective(1600px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${lerp(t, M.float, M.out, 0.95, 1.1, inOut)})` }}>
				<Widget t={t} g={{ radius: 28, refr: 0.9, blur: 2, disp: 0.8 }} tab={tab} search={t > M.srch && t < M.tab3 + 4 ? q : ""} />
			</div>
		</AbsoluteFill>
	)
}

export const Film: React.FC = () => {
	const t = useT()
	if (t < M.neon) return <AbsoluteFill style={{ background: "#000" }}><div style={{ position: "absolute", left: 600, top: 330, opacity: clamp01(t / 0.8) * 0.7, transform: `perspective(1600px) rotateX(10deg) rotateY(${lerp(t, 0, M.neon, -12, -4)}deg)` }}><Widget t={t} /></div></AbsoluteFill>
	if (t < C[0]) return <Neon t={t} />
	if (t < C[1]) return <Ring t={t} />
	if (t < M.editor) return <Irid t={t} />
	if (t < M.float) return <Editor t={t} />
	if (t < M.logo) return <AbsoluteFill style={{ background: "#000" }}>{t < M.float + 0.1 && <Editor t={t} />}<Float t={t} /></AbsoluteFill>
	return <AbsoluteFill style={{ background: "#000", alignItems: "center", justifyContent: "center" }}><div style={{ opacity: clamp01((t - M.logo) / 0.4) * clamp01((TL.dur - t) / 1.2) }}><LogoPixels size={110} t={t} mode="in" t0={M.logo} invert /></div></AbsoluteFill>
}
