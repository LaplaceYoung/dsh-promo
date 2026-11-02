// Template 09 — structure of Cursor "Software is changing" (2026), MosMos content.
// Collage on off-white: a chunky word that shatters into blocks, cut-out "photo" cards of a person at a retro
// computer (drawn here, no photos), coloured shapes travelling between them, a typed line, an isometric field
// of computers, a torn-paper reveal and a typed sign-off.
import React from "react"
import { AbsoluteFill } from "remotion"
import { ACC, CJK, SANS, MONO, COPY, lerp, clamp01, inOut, out, useT, LogoPixels, Caret, typeAt } from "../_engine/src/mos"
import { rand, Grain } from "../_engine/src/kit"
import TL from "./timeline.json"

const M = TL.marks as Record<string, number>, C = TL.cuts
const BG = "#efeeea", INKC = "#111", BLUE = ACC, YEL = "#f4c20d", RED = "#e8541f"
const COLS = [BLUE, YEL, RED]

// ---------- drawn props
const Retro: React.FC<{ s?: number; screen?: React.ReactNode; dark?: boolean }> = ({ s = 1, screen }) => (
	<svg width={300 * s} height={260 * s} viewBox="0 0 300 260">
		<polygon points="60,20 230,10 270,40 270,170 100,185 60,160" fill="#c9c3b4" />
		<polygon points="60,20 230,10 230,150 60,160" fill="#e4dfd2" />
		<polygon points="230,10 270,40 270,170 230,150" fill="#b4ad9d" />
		<rect x="80" y="34" width="130" height="98" rx="10" fill="#2b2d2f" />
		<foreignObject x="84" y="38" width="122" height="90">{screen}</foreignObject>
		<polygon points="40,200 220,188 290,215 110,232" fill="#d8d2c4" />
		<polygon points="110,232 290,215 290,224 110,242" fill="#a9a293" />
		<polygon points="40,200 110,232 110,242 40,209" fill="#bdb6a7" />
		{Array.from({ length: 4 }).map((_, r) => Array.from({ length: 10 }).map((_, c) => <rect key={`${r}${c}`} x={70 + c * 16 + r * 12} y={200 + r * 6 - c * 1.2} width={12} height={4} fill="#bfb8a8" />))}
	</svg>
)
const Person: React.FC<{ w?: number; h?: number }> = ({ w = 260, h = 340 }) => (
	<div style={{ width: w, height: h, background: "#1c1c1c", position: "relative", overflow: "hidden" }}>
		<svg width={w} height={h} viewBox="0 0 260 340" style={{ position: "absolute" }}>
			<rect x="150" y="250" width="110" height="10" fill="#555" />
			<circle cx="95" cy="95" r="34" fill="#9b9b9b" />
			<path d="M60,130 C40,180 50,250 70,290 L150,290 C150,240 140,170 120,135 Z" fill="#7a7a7a" />
			<path d="M110,170 C150,190 190,215 230,240" stroke="#8d8d8d" strokeWidth="22" strokeLinecap="round" fill="none" />
			<rect x="60" y="290" width="100" height="14" fill="#444" /><rect x="80" y="304" width="10" height="36" fill="#444" />
		</svg>
		<Grain op={0.25} />
	</div>
)
const Screen: React.FC<{ logo?: boolean; t?: number; tint?: string }> = ({ logo, t = 0, tint }) => (
	<div style={{ width: 122, height: 90, background: tint || "#dfe3e6", display: "flex", alignItems: "center", justifyContent: "center" }}>{logo ? <LogoPixels size={40} t={t} mode="static" /> : <div style={{ width: 70, height: 6, background: "#9aa3aa" }} />}</div>
)
const Shape: React.FC<{ k: number; x: number; y: number; s?: number; r?: number }> = ({ k, x, y, s = 40, r = 0 }) => {
	const c = COLS[k % 3], kind = Math.floor(rand(k * 7) * 3)
	const st: React.CSSProperties = { position: "absolute", left: x, top: y, width: s, height: s, transform: `rotate(${r}deg)` }
	if (kind === 0) return <div style={{ ...st, background: c }} />
	if (kind === 1) return <div style={{ ...st, width: 0, height: 0, borderLeft: `${s / 2}px solid transparent`, borderRight: `${s / 2}px solid transparent`, borderBottom: `${s}px solid ${c}` }} />
	return <div style={{ ...st, background: c, clipPath: "polygon(0 0,100% 0,100% 45%,45% 45%,45% 100%,0 100%)" }} />
}

// ---------- shots
const Word: React.FC<{ t: number }> = ({ t }) => {
	const fr = clamp01((t - M.frag) / 0.6)
	const glitchSplit = t < C[1] ? 60 : 0
	const tiles = 54
	const txt = <div style={{ fontFamily: CJK, fontWeight: 900, fontSize: 300, color: INKC, letterSpacing: "0.05em", WebkitTextStroke: "8px #111", lineHeight: 1, whiteSpace: "nowrap", display: "flex", gap: glitchSplit }}><span>想</span><span>法</span></div>
	if (fr <= 0) return <AbsoluteFill style={{ background: BG, alignItems: "center", justifyContent: "center" }}>{txt}</AbsoluteFill>
	return (
		<AbsoluteFill style={{ background: BG }}>
			{Array.from({ length: tiles }).map((_, i) => {
				const cw = 640 / 9, ch = 320 / 6, cx = (i % 9) * cw, cy = Math.floor(i / 9) * ch
				const j = fr * (1 + Math.sin(t * 9 + i) * 0.3)
				const dx = (rand(i) - 0.5) * 80 * j, dy = (rand(i + 50) - 0.5) * 60 * j, rot = (rand(i + 90) - 0.5) * 30 * j
				return <div key={i} style={{ position: "absolute", left: 640 + cx + dx, top: 390 + cy + dy, width: cw * (0.7 + 0.3 * rand(i + 3)), height: ch * (0.6 + 0.4 * rand(i + 4)), overflow: "hidden", transform: `rotate(${rot}deg)` }}>
					<div style={{ position: "absolute", left: -cx, top: -cy, width: 640 }}>{txt}</div></div>
			})}
		</AbsoluteFill>
	)
}
const Pair: React.FC<{ t: number; t0: number; bubble?: string; logo?: boolean; between?: React.ReactNode; shapes?: boolean }> = ({ t, t0, bubble, logo, between, shapes }) => (
	<AbsoluteFill style={{ background: BG }}>
		<div style={{ position: "absolute", left: 200, top: 330 }}><Person /></div>
		<div style={{ position: "absolute", left: 1180, top: 380 }}><Retro s={1.6} screen={<Screen logo={logo} t={t} />} /></div>
		{bubble && <div style={{ position: "absolute", left: 330, top: 250, padding: "14px 20px", background: "#fff", fontFamily: CJK, fontSize: 26, color: INKC, boxShadow: "0 6px 18px rgba(0,0,0,.1)", width: 520 }}>{typeAt(bubble, t, t0 + 0.2, 20).s}</div>}
		{shapes && Array.from({ length: 5 }).map((_, i) => { const p = ((t - t0) * 0.55 + i * 0.2) % 1; return <Shape key={i} k={i + Math.floor(t0)} x={480 + p * 720} y={520 + Math.sin(p * Math.PI) * -120 + i * 10} s={44} r={p * 180} /> })}
		{between}
	</AbsoluteFill>
)
const SQ: React.FC<{ t: number }> = ({ t }) => {
	const p = ((t - M.pass0) / 0.85) % 1, k = Math.floor((t - M.pass0) / 0.85)
	const fw = k % 2 === 0
	const x = fw ? 520 + p * 640 : 1160 - p * 640
	return <div style={{ position: "absolute", left: x, top: 560 - Math.sin(p * Math.PI) * 40, width: 26, height: 26, background: INKC }} />
}
const OldCard: React.FC<{ k: number; t: number }> = ({ k, t }) => {
	const cards = [
		<div style={{ width: 900, height: 600, background: "#2a2a2a", position: "relative" }}>{Array.from({ length: 5 }).map((_, r) => <div key={r} style={{ display: "flex", gap: 14, position: "absolute", left: 60 + r * 30, top: 80 + r * 96 }}>{Array.from({ length: 11 }).map((_, c) => <div key={c} style={{ width: 54, height: 70, borderRadius: 30, background: "#8f8f8f", boxShadow: "inset 0 -10px 0 #6a6a6a" }} />)}</div>)}<Grain op={0.3} /></div>,
		<div style={{ width: 900, height: 600, background: "#e9e2cf", position: "relative", fontFamily: MONO, fontSize: 30, color: "#444", padding: 50 }}>{"0123456789".split("").map((d, i) => <div key={i} style={{ display: "flex", gap: 22 }}>{Array.from({ length: 16 }).map((_, c) => <span key={c} style={{ opacity: rand(i * 31 + c) > 0.82 ? 0.1 : 1 }}>{rand(i * 31 + c) > 0.82 ? "█" : d}</span>)}</div>)}<Grain op={0.2} /></div>,
		<div style={{ width: 900, height: 600, background: "#0c0c0c", position: "relative", fontFamily: MONO, fontSize: 30, color: "#5bd46b", padding: 50, lineHeight: 1.6 }}>{["C:\\> EDIT REPORT.TXT", "正在输入……", "第一版周三前发你，", "你先把品牌素材给我就行。", "C:\\> _"].map((l, i) => <div key={i}>{l}</div>)}<Grain op={0.2} /></div>,
		<div style={{ width: 900, height: 600, background: "#0b2ea8", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ width: 520, background: "#b8b8b8", border: "4px solid #fff", fontFamily: MONO, fontSize: 26, color: "#111", padding: 30, textAlign: "center" }}>保存修改？<br /><br />[ 是 ]   [ 否 ]</div></div>,
	]
	return <AbsoluteFill style={{ background: BG, alignItems: "center", justifyContent: "center" }}><div style={{ width: 900, height: 600, overflow: "hidden", transform: `scale(${1 + (t % 1) * 0.03}) rotate(${(rand(k) - 0.5) * 3}deg)`, boxShadow: "0 10px 30px rgba(0,0,0,.2)" }}>{cards[k % 4]}</div></AbsoluteFill>
}
const OldUI: React.FC<{ k: number }> = ({ k }) => (
	<AbsoluteFill style={{ background: BG, alignItems: "center", justifyContent: "center" }}>
		<div style={{ width: 1100, height: 680, background: "#c0c0c0", border: "3px solid #fff", boxShadow: "6px 6px 0 #777", fontFamily: MONO }}>
			<div style={{ height: 36, background: "#000a7a", color: "#fff", fontSize: 20, padding: "6px 12px" }}>{["邮件 — 新建", "周报.doc — 文字处理", "修订 — 对比原话"][k]}</div>
			<div style={{ margin: 16, height: 590, background: "#fff", padding: 24, fontSize: 24, color: "#222", lineHeight: 1.7, fontFamily: CJK }}>{k === 2 ? [["-", "嗯，我觉得这个方案吧，这个方案可以先，"], ["+", "先小范围测试并收集反馈，"], ["-", "然后然后看看反馈，不对，"], ["+", "再决定是否全面上线。"]].map(([a, b], i) => <div key={i} style={{ background: a === "+" ? "#c9f2d2" : "#ffd6cc", fontFamily: MONO }}>{a} {b}</div>) : (k ? COPY.doc.map(([a, b]) => a + b) : COPY.mail).map((l, i) => <div key={i}>{l}</div>)}</div>
		</div>
	</AbsoluteFill>
)
const Stats: React.FC<{ t: number }> = ({ t }) => (
	<AbsoluteFill style={{ background: BG, alignItems: "center", justifyContent: "center", fontFamily: MONO }}>
		<div style={{ fontSize: 26, color: "#999", marginBottom: 18, width: 560 }}>说话 12s · 已写好</div>
		{[["周报.docx", "+184", "−0"], ["项目群回复", "+21", "−45"], ["终端", "+1", "−0"]].map(([a, b, c], i) => (
			<div key={i} style={{ width: 560, fontSize: 30, color: INKC, marginTop: 10, opacity: clamp01((t - M.stat - i * 0.15) / 0.15) }}>{a} <span style={{ color: "#29a36a" }}>{b}</span> <span style={{ color: RED }}>{c}</span></div>
		))}
	</AbsoluteFill>
)
const TypeCard: React.FC<{ t: number; a: string; b: string; ta: number; tb: number; size?: number }> = ({ t, a, b, ta, tb, size = 56 }) => {
	const s1 = typeAt(a, t, ta, 14), s2 = typeAt(b, t, tb, 14)
	return <AbsoluteFill style={{ background: BG, alignItems: "center", justifyContent: "center" }}><div style={{ fontFamily: CJK, fontSize: size, color: INKC, whiteSpace: "nowrap" }}>{s1.s}<span style={{ color: s2.done ? INKC : "#999" }}>{s2.s}</span><Caret t={t} color={INKC} /></div></AbsoluteFill>
}
const Orbit: React.FC<{ t: number }> = ({ t }) => {
	const mx = lerp(t, M.moon, M.field, -200, 2100, (x) => x)
	return (
		<AbsoluteFill style={{ background: BG }}>
			<div style={{ position: "absolute", left: 960 - 240, top: 540 - 210 }}><Retro s={1.6} screen={<Screen tint="#f6f6f6" />} /></div>
			{Array.from({ length: 18 }).map((_, i) => { const a = i / 18 * Math.PI * 2 + (t - M.orbit) * 0.7; return <Shape key={i} k={i} x={960 + Math.cos(a) * 420 - 22} y={520 + Math.sin(a) * 320 - 22} s={46} r={a * 57} /> })}
			<div style={{ position: "absolute", left: mx, top: 180 + Math.sin(mx / 400) * 30, width: 150, height: 150, borderRadius: 75, background: "radial-gradient(circle at 35% 35%, #f4f4f4, #bdbdbd 70%, #9a9a9a)" }} />
		</AbsoluteFill>
	)
}
const Field: React.FC<{ t: number }> = ({ t }) => {
	const n = Math.round(lerp(t, M.field, M.dense, 1, 60, (x) => x)), zoom = t < M.fieldOut ? lerp(t, M.field, M.dense, 1.5, 0.75) : lerp(t, M.fieldOut, M.few, 0.75, 1.1, inOut)
	const fade = t < M.fieldOut ? 1 : 1 - clamp01((t - M.fieldOut) / 0.8)
	const items = Array.from({ length: 60 }).map((_, i) => ({ x: (i % 10) * 330 - 700 + Math.floor(i / 10) * 140, y: Math.floor(i / 10) * 210 - 220 - (i % 10) * 40 }))
	return (
		<AbsoluteFill style={{ background: BG }}>
			<div style={{ position: "absolute", left: 960, top: 540, transform: `scale(${zoom}) translate(${(t - M.field) * -30}px, ${(t - M.field) * 12}px)` }}>
				{items.map((p, i) => { const show = i === 22 || i < n; const keep = i === 22 || rand(i) < fade; return show && keep ? <div key={i} style={{ position: "absolute", left: p.x - 150, top: p.y - 130 }}><Retro s={0.9} screen={<Screen tint={i % 7 === 0 ? "#cfd8ff" : undefined} />} /></div> : null })}
				{items.slice(0, n).map((p, i) => rand(i + 300) < 0.5 * fade ? <Shape key={`s${i}`} k={i} x={p.x + 60} y={p.y - 160} s={34} r={i * 30 + t * 40} /> : null)}
			</div>
		</AbsoluteFill>
	)
}
const Final: React.FC<{ t: number }> = ({ t }) => {
	const tear = clamp01((t - M.tear) / 0.35), grow = lerp(t, M.grow, C[17], 1, 1.25, inOut)
	if (t < M.tear) return <Pair t={t} t0={M.final} logo={t > M.logo} between={<div style={{ position: "absolute", left: 640, top: 520, width: 110, height: 80, background: BLUE, display: "flex", alignItems: "center", justifyContent: "center", transform: `translateX(${lerp(t, M.final, M.logo, -40, 520)}px)`, opacity: t < M.logo ? 1 : 0 }}><LogoPixels size={40} t={t} mode="static" invert /></div>} />
	return (
		<AbsoluteFill style={{ background: BG, alignItems: "center", justifyContent: "center" }}>
			<div style={{ width: 1100, height: 700, background: "#1c1c1c", position: "relative", transform: `scale(${grow}) rotate(${(1 - tear) * -3}deg)`, clipPath: tear < 1 ? `polygon(0 ${8 * (1 - tear)}%, 48% 0, 52% ${6 * (1 - tear)}%, 100% 2%, 100% 100%, 0 96%)` : undefined }}>
				<div style={{ position: "absolute", left: 60, top: 260 }}><Person w={300} h={420} /></div>
				<div style={{ position: "absolute", left: 470, top: 160 }}><Retro s={1.9} screen={<Screen logo t={t} />} /></div>
				<Grain op={0.2} />
			</div>
		</AbsoluteFill>
	)
}
export const Film: React.FC = () => {
	const t = useT()
	if (t < M.word) return <AbsoluteFill style={{ background: BG }} />
	if (t < C[3]) return <Word t={t} />
	if (t < M.pair) return <AbsoluteFill style={{ background: BG }}><div style={{ position: "absolute", left: 820, top: 360, transform: `rotate(${lerp(t, C[3], M.pair, -6, 0)}deg)` }}><Person /></div></AbsoluteFill>
	if (t < C[5]) return <Pair t={t} t0={M.pair} between={t > M.pass0 ? <SQ t={t} /> : null} />
	if (t < C[9]) { const k = C.slice(5, 9).filter((c) => t >= c).length - 1; return <OldCard k={k} t={t} /> }
	if (t < C[12]) return <OldUI k={t < C[10] ? 0 : t < C[11] ? 1 : 2} />
	if (t < C[13]) return <Stats t={t} />
	if (t < C[14]) return <Pair t={t} t0={t < 16.2 ? C[13] : 16.2} bubble={t < 16.2 ? COPY.scenes[4].filler + COPY.scenes[4].raw : COPY.scenes[0].filler + COPY.scenes[0].raw} shapes />
	if (t < C[15]) return <TypeCard t={t} a="逐字敲键盘，" b="不是未来。" ta={M.typeA} tb={M.typeB} />
	if (t < M.orbit) return <Pair t={t} t0={C[15]} between={t > M.idea ? <div style={{ position: "absolute", left: 640, top: 500, fontFamily: CJK, fontWeight: 900, fontSize: 70, color: INKC }}>想法</div> : null} />
	if (t < M.field) return <Orbit t={t} />
	if (t < M.final) return <Field t={t} />
	if (t < C[17]) return <Final t={t} />
	if (t < M.url) return <TypeCard t={t} a="有了 MosMos，" b={t < M.swap + 0.6 ? (t < M.swap ? "他们可以。" : "他们可以。".slice(0, Math.max(0, 5 - Math.floor((t - M.swap) / 0.07)))) : "你也可以。"} ta={M.t1} tb={t < M.swap + 0.6 ? M.t1 + 0.9 : M.swap + 0.6} />
	return <AbsoluteFill style={{ background: BG, alignItems: "center", justifyContent: "center" }}><div style={{ fontFamily: SANS, fontSize: 48, color: INKC }}>mosmos.io</div></AbsoluteFill>
}
