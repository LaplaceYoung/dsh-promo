// Template 34 — structure of ElevenLabs "Introducing Composer" (2026), MosMos content.
// Black, glossy feature film for MosMos 听写: the pixel logo shrinks, a big title, the dictation home screen, a
// mode picker, a huge input pill where the spoken sentence scrolls past, stacked scene pills on a teal fluid
// texture that open into the email draft, a polish-level card, a scene wheel, a speech waveform with the fillers
// dimmed out, a field of floating waveform cards, the title again and the logo inside teal outline frames.
import React from "react"
import { AbsoluteFill } from "remotion"
import { CJK, SANS, lerp, clamp01, inOut, useT, Wave, LogoPixels, Wordmark, Cursor, path, typeAt, COPY, SCENES } from "../_engine/src/mos"
import { rand } from "../_engine/src/kit"
import TL from "./timeline.json"

const M = TL.marks as Record<string, number>, C = TL.cuts as number[]
const BG = "#0b0b0c", PAN = "#161618", LN = "rgba(255,255,255,.09)", TX = "#f2f2f3", DIM = "#8d8d93", TEAL = "#38c6d9"
const fade = (t: number, a: number, b: number, d = 0.3, d2 = d) => clamp01((t - a) / d) * clamp01((b - t) / d2)
const Dark: React.FC<{ children?: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => <AbsoluteFill style={{ background: `radial-gradient(ellipse at 60% 40%, #1a1a1c 0%, ${BG} 70%)`, ...style }}>{children}</AbsoluteFill>

/** Teal liquid texture: blurred gradient blobs pushed through fractal-noise displacement (pure SVG). */
const Fluid: React.FC<{ t: number; w: number; h: number; seed?: number; hue?: number }> = ({ t, w, h, seed = 1, hue = 0 }) => {
	const id = `fl${seed}`
	const B = [["#0e7f93", 0.2, 0.3, 0.6], ["#6fe0ee", 0.65, 0.35, 0.45], ["#0a3b48", 0.8, 0.85, 0.6], ["#c9f6fb", 0.4, 0.7, 0.25], ["#1aa7bd", 0.1, 0.9, 0.5]] as [string, number, number, number][]
	return <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ position: "absolute", inset: 0, filter: hue ? `hue-rotate(${hue}deg)` : undefined }}>
		<defs><filter id={id} x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation={Math.min(w, h) * 0.035} result="b" />
			<feTurbulence type="fractalNoise" baseFrequency={7 / Math.max(w, h)} numOctaves={4} seed={seed} result="n" />
			<feDisplacementMap in="b" in2="n" scale={Math.min(w, h) * 0.38} xChannelSelector="R" yChannelSelector="G" /></filter></defs>
		<rect width={w} height={h} fill="#0c5664" />
		<g filter={`url(#${id})`}>{B.map(([c, x, y, r], k) => <ellipse key={k} cx={w * (x + 0.08 * Math.sin(t * 0.5 + k * 1.7 + seed))} cy={h * (y + 0.08 * Math.cos(t * 0.43 + k * 2.1 + seed))} rx={w * r} ry={h * r * 0.8} fill={c} />)}</g>
	</svg>
}
const Box: React.FC<{ t: number; x: number; y: number; w: number; h: number; r?: number; seed?: number; children?: React.ReactNode; op?: number }> = ({ t, x, y, w, h, r = 36, seed = 1, children, op = 1 }) =>
	<div style={{ position: "absolute", left: x, top: y, width: w, height: h, borderRadius: r, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,.5), inset 0 0 0 1px rgba(255,255,255,.18)", opacity: op }}>
		<Fluid t={t} w={w} h={h} seed={seed} />{children}</div>
const Bars: React.FC<{ n: number; h: number; t: number; seed?: number; color?: string; live?: boolean; gap?: number; dimFrom?: number[] }> = ({ n, h, t, seed = 1, color = "#fff", live, gap = 0.55, dimFrom = [] }) =>
	<div style={{ display: "flex", alignItems: "center", gap: h * 0.05 * gap * 2, height: h }}>{Array.from({ length: n }).map((_, i) => {
		let v = 0.15 + 0.85 * Math.pow(Math.abs(Math.sin(i * 0.7 + seed) * Math.cos(i * 0.23 + seed * 2)), 0.8)
		if (live) v *= 0.55 + 0.45 * Math.abs(Math.sin(t * 7 + i))
		return <div key={i} style={{ width: h * 0.05, height: Math.max(h * 0.08, h * v), borderRadius: 6, background: color, opacity: dimFrom.includes(i) ? 0.25 : 1 }} />
	})}</div>

// ---------- 0–4.5: logo, title ----------
const Opening: React.FC<{ t: number }> = ({ t }) => {
	if (t < M.title) {
		const s = lerp(t, 0, M.shrink + 0.4, 1, 0.42, inOut), o = 1 - clamp01((t - M.title + 0.3) / 0.3)
		return <Dark style={{ alignItems: "center", justifyContent: "center" }}><div style={{ transform: `scale(${s})`, opacity: o }}><LogoPixels size={380} t={t} mode="static" invert /></div></Dark>
	}
	const a = clamp01((t - M.title) / 0.8), o = 1 - clamp01((t - M.tOut) / 0.3)
	return <Dark style={{ alignItems: "center", justifyContent: "center" }}><div style={{ fontFamily: CJK, fontSize: 160, fontWeight: 400, letterSpacing: "0.02em", opacity: o, color: `rgba(242,242,243,${0.35 + 0.65 * a})`, filter: a < 1 ? `blur(${(1 - a) * 6}px)` : undefined }}>听写<span style={{ color: TEAL }}>.</span></div></Dark>
}
// ---------- 4.5–8.0: home ----------
const Home: React.FC<{ t: number }> = ({ t }) => {
	const s = lerp(t, M.ui, C[0], 1.0, 1.06, (x) => x), o = clamp01((t - M.ui) / 0.5)
	const txt = typeAt("嗯，帮我给李经理回封邮件……", t, M.type0, 8).s
	return <Dark><div style={{ position: "absolute", inset: 0, transform: `scale(${s})`, opacity: o, fontFamily: CJK, color: TX }}>
		<svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}><path d="M 150 300 C 120 120 40 80 -20 90" stroke="#1d8e9e" strokeWidth={3} fill="none" opacity={0.6} /><path d="M 1770 300 C 1800 120 1880 80 1940 90" stroke="#1d8e9e" strokeWidth={3} fill="none" opacity={0.6} /></svg>
		<div style={{ position: "absolute", top: 196, width: "100%", textAlign: "center", fontSize: 54 }}>说点什么</div>
		<div style={{ position: "absolute", top: 280, width: "100%", textAlign: "center", fontSize: 26, color: DIM }}>按一次 Fn 开始说，或者从一场会议记录开始。</div>
		<div style={{ position: "absolute", left: 340, top: 360, width: 1240, height: 230, borderRadius: 30, background: PAN, boxShadow: `inset 0 0 0 1px ${LN}` }}>
			<div style={{ position: "absolute", left: 30, top: 30, width: 56, height: 56, borderRadius: 28, background: "#232326", display: "flex", alignItems: "center", justifyContent: "center" }}><Wave t={t} live={t > M.type0} n={4} h={24} color={TX} /></div>
			<div style={{ position: "absolute", left: 110, top: 38, fontSize: 34 }}>{txt}<span style={{ color: TEAL }}>{t > M.type0 && Math.floor(t * 2) % 2 ? "|" : ""}</span></div>
			<div style={{ position: "absolute", left: 30, bottom: 26, display: "flex", gap: 14, fontSize: 24, color: "#c5c5ca" }}>{["场景 · 邮件", "润色 · 标准", "热词 3"].map((x) => <span key={x} style={{ padding: "8px 18px", borderRadius: 22, background: "#202023" }}>{x}</span>)}</div>
			<div style={{ position: "absolute", right: 26, bottom: 22, padding: "10px 26px", borderRadius: 24, background: "#3a3a3e", fontSize: 26 }}>写好</div>
		</div>
		<div style={{ position: "absolute", top: 640, width: "100%", textAlign: "center", fontSize: 22, color: "#55555a" }}>或</div>
		<div style={{ position: "absolute", left: 340, top: 690, fontSize: 28 }}>最近的会议记录</div>
		{["首页改版周会", "交互稿评审", "品牌素材对齐", "周一站会"].map((x, k) => <div key={x} style={{ position: "absolute", left: 340 + k * 320, top: 744 }}>
			<div style={{ position: "relative", width: 290, height: 290, borderRadius: 22, overflow: "hidden" }}><Fluid t={t} w={290} h={290} seed={k + 3} hue={[0, 160, 30, 200][k]} /></div>
			<div style={{ fontSize: 24, color: "#c5c5ca", marginTop: 12 }}>{x}</div></div>)}
	</div></Dark>
}
// ---------- 8.0–10.1: mode cards ----------
const Modes: React.FC<{ t: number }> = ({ t }) => {
	const s = lerp(t, C[0], C[1], 1.0, 1.04, (x) => x)
	const c = path(t, [[C[0], 1500, 900], [M.pick - 0.2, 700, 480], [C[1], 700, 480]]), on = t > M.pick
	return <Dark><div style={{ position: "absolute", inset: 0, transform: `scale(${s})`, fontFamily: CJK, color: TX }}>
		<div style={{ position: "absolute", left: 140, top: 340, width: 1660, height: 600, borderRadius: 44, background: "rgba(255,255,255,.04)", boxShadow: `inset 0 0 0 2px ${LN}` }} />
		{[["听写", "按一次 Fn 开始说", 0], ["会议记录", "Fn + Shift，记整场会", 1]].map(([a, b, k]) => <div key={a as string} style={{ position: "absolute", left: 170 + (k as number) * 810, top: 370, width: 790, height: 290, borderRadius: 30, background: on && k === 0 ? "#2a2a2e" : "#1c1c1f", boxShadow: on && k === 0 ? `inset 0 0 0 2px ${TEAL}` : undefined, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18 }}>
			<Wave t={t} live={on && k === 0} n={k ? 6 : 4} h={60} color={k ? "#9a9aa0" : TX} /><div style={{ fontSize: 44 }}>{a}</div><div style={{ fontSize: 26, color: DIM }}>{b}</div></div>)}
		<div style={{ position: "absolute", left: 170, top: 680, width: 1600, height: 230, borderRadius: 30, background: PAN, boxShadow: `inset 0 0 0 1px ${LN}` }}>
			<div style={{ position: "absolute", left: 30, top: 34, fontSize: 36 }}>嗯，帮我给李经理回封邮件……</div>
			<div style={{ position: "absolute", left: 30, bottom: 28, display: "flex", gap: 14, fontSize: 26, color: "#c5c5ca" }}>{["场景 · 邮件", "润色 · 标准"].map((x) => <span key={x} style={{ padding: "8px 18px", borderRadius: 22, background: "#202023" }}>{x}</span>)}</div>
			<div style={{ position: "absolute", right: 28, bottom: 24, padding: "12px 30px", borderRadius: 26, background: "#3a3a3e", fontSize: 28 }}>写好</div></div>
		<Cursor x={c.x} y={c.y} down={Math.abs(t - M.pick) < 0.08} s={1.5} />
	</div></Dark>
}
// ---------- 10.1–15.0: the big input pill ----------
const SAY = COPY.raw
const Big: React.FC<{ t: number }> = ({ t }) => {
	const w = lerp(t, C[1], C[1] + 0.9, 420, 1500, inOut), x0 = t < M.plus ? 230 : lerp(t, M.plus, M.plus + 0.6, 230, -170, inOut)
	const typed = typeAt(SAY, t, M.live, 9).s, shift = Math.max(0, typed.length * 120 - 1250)
	return <Dark style={{ fontFamily: CJK }}>
		<div style={{ position: "absolute", left: x0, top: 340, width: w, height: 400, borderRadius: 200, background: "#151517", boxShadow: `inset 0 0 0 2px ${LN}`, overflow: "hidden" }}>
			<div style={{ position: "absolute", left: 470, right: 60, top: 0, height: 400, overflow: "hidden" }}>
				<div style={{ position: "absolute", left: -shift, top: 120, whiteSpace: "nowrap", fontSize: 120, color: TX }}>{typed}<span style={{ color: TEAL }}>|</span></div></div>
			<div style={{ position: "absolute", left: 10, top: 10, width: 380, height: 380, borderRadius: 190, overflow: "hidden", transform: `scale(${t > M.plus - 0.05 && t < M.plus + 0.12 ? 0.94 : 1})` }}>
				<Fluid t={t} w={380} h={380} seed={7} />
				<div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>{t < M.plus ? <Wave t={t} live={t > M.live} n={4} h={150} color="#fff" /> : <div style={{ width: 110, height: 110, borderRadius: 22, background: "#fff" }} />}</div>
			</div>
		</div>
	</Dark>
}
// ---------- 15.0–24.8: scene pills → draft panel → polish card ----------
const Teal: React.FC<{ t: number; children?: React.ReactNode }> = ({ t, children }) => <AbsoluteFill><Fluid t={t} w={1920} h={1080} seed={11} />{children}</AbsoluteFill>
const Scenes: React.FC<{ t: number }> = ({ t }) => {
	const fold = clamp01((t - M.panel) / 0.5), card = clamp01((t - M.card) / 0.8)
	if (t < M.card) return <Teal t={t}>
		<div style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 1080, fontFamily: CJK }}>
			{SCENES.map((s, k) => { const a = clamp01((t - M.pills - k * 0.22) / 0.3), sel = k === 1 && t > M.sel
				const y = 540 + (k - 2) * 170, ty = lerp(fold, 0, 1, y, k === 1 ? 168 : y + (k < 1 ? -900 : 900), inOut)
				return <div key={s} style={{ position: "absolute", left: 960 - 200, top: ty - 52, width: 400, height: 104, borderRadius: 30, background: "#121214", boxShadow: sel ? `0 0 0 3px #fff` : "0 10px 30px rgba(0,0,0,.4)", opacity: a * (k === 1 ? 1 : 1 - fold), transform: `scale(${0.8 + 0.2 * a})`, display: "flex", alignItems: "center", justifyContent: "center", gap: 16, fontSize: 40, color: TX }}>
					{s}<span style={{ fontSize: 26, color: DIM }}>{["微信", "正式", "清晰", "结构化", "命令"][k]}</span></div> })}
			{fold > 0 && <div style={{ position: "absolute", left: 270, top: 116, width: 1380, height: 1000, borderRadius: 50, background: "#121214", opacity: fold, boxShadow: "0 30px 80px rgba(0,0,0,.5)" }}>
				<div style={{ position: "absolute", left: 60, top: 40, fontSize: 52, color: TX }}>邮件 <span style={{ fontSize: 32, color: DIM }}>正式</span></div>
				<div style={{ position: "absolute", right: 60, top: 54, fontSize: 26, color: DIM, opacity: 1 - clamp01((t - M.card + 0.45) / 0.45) }}>润色 · 标准 ▾</div>
				<div style={{ position: "absolute", left: 70, top: 160, width: 1240, height: 520, borderRadius: 26, opacity: 1 - clamp01((t - M.card + 0.45) / 0.45), background: "#232326", padding: "40px 46px", boxSizing: "border-box", fontSize: 40, lineHeight: 1.75 }}>
					{COPY.mail.map((l, i) => <div key={i} style={{ color: i === 1 ? TX : "#c8c8cc" }}>{l.split("").map((ch, j) => <span key={j} style={{ color: i === 1 && j > 18 && j < 40 ? "#7ed9e6" : undefined }}>{ch}</span>)}</div>)}</div>
			</div>}
		</div></Teal>
	const L = ["关闭", "标准", "高级"], lv = t < M.l1 ? 1 : t < M.l2 ? 2 : t < M.l3 ? 1 : 0
	const w = lerp(card, 0, 1, 1380, 600, inOut), h = lerp(card, 0, 1, 1000, 330, inOut)
	return <Dark><AbsoluteFill style={{ opacity: 1 - card }}><Fluid t={t} w={1920} h={1080} seed={11} /></AbsoluteFill><Box t={t} x={960 - w / 2} y={540 - h / 2 + lerp(card, 0, 1, 26, 0)} w={w} h={h} r={lerp(card, 0, 1, 50, 36)} seed={12}>
		<div style={{ position: "absolute", inset: 0, opacity: card, fontFamily: CJK, color: "#fff", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 44 }}>
			<div style={{ display: "flex", alignItems: "center", gap: 44 }}><div style={{ width: 56, height: 56, borderRadius: 28, boxShadow: "inset 0 0 0 3px #fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40 }}>−</div>
				<div style={{ fontSize: 104, width: 260, textAlign: "center", lineHeight: 1 }}>{L[lv]}</div>
				<div style={{ width: 56, height: 56, borderRadius: 28, boxShadow: "inset 0 0 0 3px #fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40 }}>+</div></div>
			<div style={{ marginTop: 34, width: 500, height: 90, borderRadius: 22, background: "rgba(255,255,255,.16)", boxShadow: "inset 0 0 0 1px rgba(255,255,255,.5)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>{COPY.polish[lv].hint}</div>
		</div></Box>
		{card < 1 && <div style={{ position: "absolute", left: 960 - w / 2, top: 540 - h / 2 + lerp(card, 0, 1, 26, 0), width: w, height: h, borderRadius: lerp(card, 0, 1, 50, 36), background: "#121214", opacity: 1 - clamp01(card / 0.75), overflow: "hidden" }}>
			<div style={{ position: "absolute", left: 60, top: 40, fontSize: 52, color: TX, fontFamily: CJK, opacity: 1 - clamp01(card / 0.3) }}>邮件</div></div>}</Dark>
}
// ---------- 24.8–28: scene wheel ----------
const Wheel: React.FC<{ t: number; small?: boolean }> = ({ t, small }) => {
	const p = small ? 2 : lerp(t, M.wheel, M.wheel + 0.7, 0.6, 1.0, inOut) + 1, s = small ? 0.42 : 1
	const W = small ? 760 : 1820, H = small ? 240 : 1020
	const inner = <div style={{ position: "absolute", inset: 0, fontFamily: CJK, color: "#fff" }}>
		<div style={{ position: "absolute", left: W * 0.3 - 80, top: H / 2 - 32 * (small ? 1 : 1.5), fontSize: small ? 44 : 64 }}>场景</div>
		<div style={{ position: "absolute", left: W * 0.44, top: 0 }}>{SCENES.map((x, k) => <div key={x} style={{ position: "absolute", left: 0, top: H / 2 + (k - p) * (small ? 56 : 84) - (small ? 56 : 84) / 2, whiteSpace: "nowrap", height: (small ? 56 : 84), lineHeight: `${(small ? 56 : 84)}px`, fontSize: small ? 40 : 60, opacity: Math.max(0.12, 1 - Math.abs(k - p) * 0.55) }}>{x}</div>)}</div>
		<div style={{ position: "absolute", left: W * 0.68, top: H / 2 - (small ? 50 : 76), fontSize: small ? 40 : 60, lineHeight: 1.3 }}><div>自动</div><div style={{ opacity: 0.45 }}>手动</div></div>
	</div>
	return <Dark><Box t={t} x={960 - W / 2} y={540 - H / 2} w={W} h={H} r={small ? 30 : 70} seed={small ? 14 : 13}>{inner}</Box></Dark>
}
// ---------- 28–32.2: waveform timeline ----------
const DIMS = [5, 6, 7, 21, 22, 40, 41, 42, 58, 59, 75, 76]
const Timeline: React.FC<{ t: number }> = ({ t }) => {
	const a = clamp01((t - M.wave) / 0.6), sw = lerp(t, M.sweep, C[5], 0, 1, (x) => x), sel = t > C[5] - 1.6
	return <Dark style={{ fontFamily: CJK }}>
		<div style={{ position: "absolute", left: 0, top: 260, width: 1920, display: "flex", justifyContent: "space-around", fontSize: 18, color: "#6a6a70", opacity: a }}>{Array.from({ length: 16 }).map((_, k) => <span key={k}>{k % 2 ? "·" : `0:${String(k * 2).padStart(2, "0")}`}</span>)}</div>
		<div style={{ position: "absolute", left: 20, top: 400, opacity: a, transform: `scaleY(${a})`, filter: `drop-shadow(0 0 ${8 * (1 - a)}px ${TEAL})` }}><Bars n={96} h={240} t={t} seed={3} color="#9a9aa0" dimFrom={DIMS} /></div>
		{sel && <div style={{ position: "absolute", left: 600, top: 330, width: 680, height: 380, borderRadius: 30, background: "rgba(255,255,255,.06)", boxShadow: `inset 0 0 0 1px ${LN}`, opacity: clamp01((t - C[5] + 1.6) / 0.4) }} />}
		<div style={{ position: "absolute", left: 20 + sw * 1880, top: 380, width: 3, height: 280, background: TEAL, opacity: a * (sw > 0 ? 1 : 0) }} />
		<div style={{ position: "absolute", left: 0, top: 760, width: 1920, display: "flex", opacity: a, fontSize: 20, color: "#6a6a70" }}>{["原话", "去掉口头禅", "调整语序", "成稿"].map((x) => <div key={x} style={{ flex: 1, borderTop: "2px solid #2a2a2e", margin: "0 20px", paddingTop: 10 }}>{x}</div>)}</div>
	</Dark>
}
// ---------- 32.2–50: waveform card, then a field of cards ----------
const Field: React.FC<{ t: number }> = ({ t }) => {
	const f = clamp01((t - M.field) / 0.8)
	const cw = lerp(f, 0, 1, 800, 560, inOut), ch = lerp(f, 0, 1, 500, 312, inOut)
	const cx = 960 + f * 220 * Math.sin((t - M.field) * 0.35), cy = 540 + f * 120 * Math.cos((t - M.field) * 0.5) - lerp(t, C[5], M.field, 60, 0, inOut)
	const z = (t - M.field) * 40
	const out = clamp01((t - M.title2 + 0.4) / 0.6)
	return <Dark style={{ opacity: 1 - out }}>
		{f > 0 && Array.from({ length: 22 }).map((_, k) => { const d = 0.35 + rand(k) * 0.65, x = ((rand(k + 9) * 2400 - z * d * 3 + 4000) % 2400) - 240, y = rand(k + 4) * 1080, w = 220 + d * 200
			return <div key={k} style={{ position: "absolute", left: x, top: y - w * 0.28, width: w, height: w * 0.56, borderRadius: 24, background: "#18181b", boxShadow: `inset 0 0 0 1px ${LN}`, opacity: f * (0.4 + 0.6 * d), filter: `blur(${(1 - d) * 6}px)`, display: "flex", alignItems: "center", justifyContent: "center" }}><Bars n={14} h={w * 0.26} t={t} seed={k + 1} color="#c9c9cd" /></div> })}
		<Box t={t} x={cx - cw / 2} y={cy - ch / 2} w={cw} h={ch} r={40} seed={15}><div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}><Bars n={18} h={ch * 0.42} t={t} live seed={5} /></div></Box>
	</Dark>
}
// ---------- 50–59: title, logo, end frame ----------
const End: React.FC<{ t: number }> = ({ t }) => {
	if (t < M.logo2) { const a = clamp01((t - M.title2) / 0.6), o = 1 - clamp01((t - M.logo2 + 0.3) / 0.3)
		return <Dark style={{ alignItems: "center", justifyContent: "center" }}><div style={{ fontFamily: CJK, fontSize: 160, opacity: o * a, color: TX }}>听写<span style={{ color: TEAL }}>.</span></div></Dark> }
	const e = clamp01((t - M.end) / 0.8), p = clamp01((t - M.logo2) / 0.5)
	const Frame: React.FC<{ s: number; op: number }> = ({ s, op }) => <div style={{ position: "absolute", left: 960 - 340 * s, top: 540 - 390 * s, width: 680 * s, height: 780 * s, borderRadius: 150 * s, boxShadow: `inset 0 0 0 2px ${TEAL}`, opacity: op }} />
	return <Dark>
		<Frame s={lerp(t, M.logo2, M.end + 0.8, 0.6, 1, inOut)} op={0.5 + 0.5 * p} /><Frame s={lerp(t, M.logo2, M.end + 0.8, 1.2, 1.9, inOut)} op={0.35 * p} /><Frame s={lerp(t, M.logo2, M.end + 0.8, 2.0, 3.0, inOut)} op={0.25 * p} />
		<AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
			{t < M.end ? <div style={{ opacity: p, transform: `scale(${lerp(t, M.logo2, M.end, 1.2, 0.9)})` }}><LogoPixels size={120} t={t} mode="in" t0={M.logo2} invert /></div>
				: <div style={{ display: "flex", alignItems: "center", gap: 26, opacity: e }}><LogoPixels size={76} t={t} mode="static" invert /><Wordmark size={76} color={TX} /></div>}
		</AbsoluteFill>
		<div style={{ position: "absolute", top: 540 + 300, width: "100%", textAlign: "center", fontFamily: SANS, fontSize: 30, color: "#d6d6da", opacity: e }}>mosmos.io</div>
	</Dark>
}
export const Film: React.FC = () => {
	const t = useT()
	if (t < M.ui) return <Opening t={t} />
	if (t < C[0]) return <Home t={t} />
	if (t < C[1]) return <Modes t={t} />
	if (t < C[2]) return <Big t={t} />
	if (t < C[3]) return <Scenes t={t} />
	if (t < C[4]) return <Wheel t={t} />
	if (t < M.wave) return <Wheel t={t} small />
	if (t < C[5]) return <AbsoluteFill><Timeline t={t} /><AbsoluteFill style={{ opacity: 1 - clamp01((t - M.wave) / 0.4) }}><Wheel t={t} small /></AbsoluteFill></AbsoluteFill>
	if (t < M.title2) return <Field t={t} />
	return <End t={t} />
}
