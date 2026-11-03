// Template 49 — structure of Pitch "Pitch 2.0" (2023), MosMos content.
// Kinetic purple launch film: a line whose middle word swells into a photo card, typed text that ends in a giant word,
// a hello with floating 3D shapes, a prompt card filled by voice, a stack of drafts flying up, a VHS rewind, a style
// picker, a document editor where text is written in place, a scene panel, present mode, a meeting record and an end card.
import React from "react"
import { AbsoluteFill, Img, staticFile } from "remotion"
import { CJK, SANS, MONO, HEAVY, lerp, clamp01, inOut, out, useT, LogoPixels, Cursor, Wave, COPY } from "../_engine/src/mos"
import { SERIF, rand } from "../_engine/src/kit"
import TL from "./timeline.json"

const M = TL.marks as Record<string, number>, C = TL.cuts as number[]
const P1 = "#6b30ed", P2 = "#7538ef", PT = "#5b2be0", INK = "#111014", BLUE = "#1d28d7", NAVY = "#2626c8", GOLD = "#f6c945"
const fade = (t: number, a: number, b: number, d = 0.3, d2 = d) => clamp01((t - a) / d) * clamp01((b - t) / d2)
const Purple: React.FC<{ children?: React.ReactNode }> = ({ children }) => <AbsoluteFill style={{ background: `linear-gradient(160deg, ${P1}, ${P2})`, overflow: "hidden", fontFamily: CJK }}>{children}</AbsoluteFill>
const Lav: React.FC<{ children?: React.ReactNode; c?: string }> = ({ children, c = "#eee1fe" }) => <AbsoluteFill style={{ background: `radial-gradient(ellipse 60% 55% at 50% 50%, #fdfbff 0%, #f6efff 45%, ${c} 100%)`, overflow: "hidden", fontFamily: CJK }}>{children}</AbsoluteFill>
const Line: React.FC<{ s: string; c?: string; size?: number; o?: number; y?: number; dx?: number; sc?: number }> = ({ s, c = "#fff", size = 88, o = 1, y = 540, dx = 0, sc = 1 }) =>
	<div style={{ position: "absolute", left: 0, right: 0, top: y - size * 0.72, textAlign: "center", fontFamily: HEAVY, fontWeight: 700, fontSize: size, color: c, opacity: o, whiteSpace: "nowrap", transform: `translateX(${dx}px) scale(${sc})`, letterSpacing: "0.01em" }}>{s}</div>
const Photo: React.FC<{ src: string; x: number; y: number; w: number; h: number; r?: number; gray?: boolean; z?: number; o?: number; glow?: boolean }> = ({ src, x, y, w, h, r = 14, gray, z = 1, o = 1, glow }) =>
	<div style={{ position: "absolute", left: x, top: y, width: w, height: h, borderRadius: r, overflow: "hidden", opacity: o, boxShadow: glow ? "0 0 0 3px rgba(255,255,255,.55), 0 0 30px rgba(255,255,255,.25)" : undefined }}>
		<Img src={staticFile(src)} style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${z})`, filter: gray ? "grayscale(1) contrast(1.05)" : undefined }} /></div>

// ---------- 0: big ideas ----------
const Ideas: React.FC<{ t: number }> = ({ t }) => {
	if (t >= M.worth) { const k = out(clamp01((t - M.worth) / 0.35)), z = 1.04 + 0.04 * clamp01((t - M.worth) / 2)
		return <AbsoluteFill style={{ background: "#000" }}><div style={{ position: "absolute", right: 1920 - 850 + 60 * (1 - k), top: 540 - 64, fontFamily: HEAVY, fontWeight: 700, fontSize: 88, color: "#fff", whiteSpace: "nowrap" }}>值得说出来</div>
			<Photo src="t49-crowd.webp" x={905 + 80 * (1 - k)} y={307} w={830} h={465} z={z} glow o={k} /></AbsoluteFill> }
	const g = inOut(clamp01((t - M.big) / (M.bigE - M.big))), sh = inOut(clamp01((t - M.card) / (M.cardE - M.card)))
	const bs = 88 * (1 + 4.2 * g) * (1 - sh) + 88 * sh, cw = 830 * out(clamp01((t - M.card) / 0.45)), split = sh
	const ch = 465 * out(clamp01((t - M.card) / 0.45)), z = 1.15 - 0.1 * clamp01((t - M.card) / 2)
	return <AbsoluteFill style={{ background: "#000" }}>
		{cw > 2 && <Photo src="t41-mountain.webp" x={960 - cw / 2} y={540 - ch / 2} w={cw} h={ch} z={z} glow />}
		<div style={{ position: "absolute", left: 0, right: 0, top: 540, display: "flex", justifyContent: "center", alignItems: "center", transform: "translateY(-50%)", fontFamily: HEAVY, fontWeight: 700, color: "#fff", whiteSpace: "nowrap" }}>
			<span style={{ fontSize: 88, marginRight: 22 + 60 * g * (1 - sh) + 400 * split }}>我们都有</span>
			<span style={{ fontSize: bs, lineHeight: 1, marginRight: split * 0 }}>大</span>
			<span style={{ fontSize: 88, marginLeft: 22 * (1 - sh) + 60 * g * (1 - sh) }}>想法</span></div></AbsoluteFill>
}

// ---------- 1–2: typed line ending in a big word ----------
const L1 = "可是大多数人，总是卡在", L2 = "最开始的那一步"
const Typed: React.FC<{ t: number }> = ({ t }) => {
	const n1 = Math.floor(clamp01((t - C[0]) / 0.3) * L1.length + 0.001), n2 = Math.floor(clamp01((t - M.l2) / 0.75) * L2.length + 0.001)
	const pan = inOut(clamp01((t - M.pan) / 0.5)), on = Math.floor(t * 2.2) % 2 === 0 || (t > M.l1 && t < M.l1 + 1.05) || (t > M.l2 && t < M.l2 + 0.8)
	const W = 88, s1 = L1.slice(0, n1), x0 = 1560 - W * L1.length
	return <Lav c="#f3eafe"><div style={{ position: "absolute", left: 0, top: 540 - 60, transform: `translateX(${-1600 * pan}px)`, fontFamily: HEAVY, fontWeight: 700, fontSize: W, color: INK, whiteSpace: "nowrap" }}>
		<span style={{ position: "absolute", left: x0 }}>{s1}{t < M.pan && <i style={{ display: "inline-block", width: 3, height: 96, background: INK, verticalAlign: "middle", opacity: on ? 1 : 0, marginLeft: 4 }} />}</span>
		<span style={{ position: "absolute", left: 1560 + 1600 - W * L2.length }}>{L2.slice(0, n2)}{t >= M.pan && <i style={{ display: "inline-block", width: 3, height: 96, background: INK, verticalAlign: "middle", opacity: on ? 1 : 0, marginLeft: 4 }} />}</span></div></Lav>
}
const BigWord: React.FC<{ t: number }> = ({ t }) => {
	const on = Math.floor((t - C[1]) * 2.1) % 2 === 0, dr = Math.sin((t - C[1]) * 1.3) * 18, zo = inOut(clamp01((t - M.zo) / 0.47))
	return <Lav c="#f3eafe"><div style={{ position: "absolute", left: 40 + dr + 260 * zo, top: 540 - 175, fontFamily: HEAVY, fontWeight: 800, fontSize: 290, color: INK, whiteSpace: "nowrap", transform: `scale(${1 + 0.12 * zo})`, transformOrigin: "100% 50%", textShadow: "3px 0 0 rgba(255,190,60,.35), -2px 0 0 rgba(60,90,255,.25)" }}>
		{zo > 0.05 && <span style={{ position: "absolute", right: "100%", whiteSpace: "nowrap" }}>开始的那</span>}第一步<i style={{ display: "inline-block", width: 9, height: 310, background: INK, verticalAlign: "middle", marginLeft: 10, opacity: on ? 1 : 0 }} /></div></Lav>
}

// ---------- 3: hello + shapes ----------
const Shape: React.FC<{ k: number; t: number }> = ({ k, t }) => {
	const a = out(clamp01((t - M.shp - k * 0.08) / 0.7)), f = (t - M.shp) * 0.25
	const S: [number, number, number, number, number, string][] = [[-330, 560, 620, -10, -1, "torus"], [270, 340, 400, 22, -1, "cone"], [1290, -60, 640, -25, 1, "disc"], [1080, 160, 170, 30, 1, "pill"], [1640, 380, 420, 10, 1, "disc"]]
	const [x, y, s, r, dir, kind] = S[k], dx = dir * 500 * (1 - a), dy = (k % 2 ? -1 : 1) * 30 * Math.sin(f * 3 + k)
	const g = "radial-gradient(circle at 35% 30%, #c9a8ff 0%, #8f5cff 35%, #5a1fe0 75%, #3d10b0 100%)"
	const st: React.CSSProperties = { position: "absolute", left: x + dx, top: y + dy, width: s, height: s, transform: `rotate(${r + f * 20 * dir}deg)`, opacity: a, filter: "drop-shadow(0 30px 40px rgba(40,0,120,.45))" }
	if (kind === "torus") return <div style={{ ...st, borderRadius: "50%", border: `${s * 0.22}px solid #8c58fa`, boxSizing: "border-box", boxShadow: "inset 0 0 60px rgba(40,0,140,.6)" }} />
	if (kind === "cone") return <div style={{ ...st, width: s * 0.8, background: "linear-gradient(100deg, #5a1fe0, #b593ff 45%, #7c45f5 70%, #4b16c9)", clipPath: "polygon(50% 0, 100% 92%, 85% 99%, 50% 100%, 15% 99%, 0 92%)" }} />
	if (kind === "pill") return <div style={{ ...st, width: s * 0.55, borderRadius: s, background: g }} />
	return <div style={{ ...st, height: s * 0.62, borderRadius: "50%", background: g, boxShadow: `inset 0 -${s * 0.12}px 0 #4b16c9` }} />
}
const Hello: React.FC<{ t: number }> = ({ t }) => {
	const m = inOut(clamp01((t - M.hi) / 0.5)), b = out(clamp01((t - M.badge) / 0.3))
	return <Purple><AbsoluteFill style={{ background: "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(140,90,255,.45), transparent)" }} />
		{[0, 1, 2, 3, 4].map((k) => <Shape key={k} k={k} t={t} />)}
		<div style={{ position: "absolute", left: 0, right: 0, top: 540, display: "flex", justifyContent: "center", alignItems: "center", transform: `translateY(-50%) translateX(${-80 * m}px)`, color: "#fff", whiteSpace: "nowrap" }}>
			<span style={{ fontFamily: HEAVY, fontWeight: 700, fontSize: 88, opacity: 1 - m, marginRight: 30 * (1 - m), width: (1 - m) * 280, overflow: "hidden", display: "inline-block" }}>你好，</span>
			<span style={{ fontFamily: SANS, fontWeight: 600, fontSize: 150 + 20 * m, letterSpacing: "-0.02em" }}>MosMos</span>
			<span style={{ marginLeft: 12, marginTop: -70, padding: "2px 10px", border: "2.5px solid rgba(255,255,255,.9)", borderRadius: 8, fontFamily: SANS, fontWeight: 600, fontSize: 40, opacity: b, transform: `scale(${0.6 + 0.4 * b})` }}>Fn</span></div></Purple>
}

// ---------- 4: prompt card ----------
const ASK = "给李经理写封邮件，说第一版方案周三前发给他"
const Prompt: React.FC<{ t: number }> = ({ t }) => {
	const sw = clamp01((t - C[3]) / 0.4), ci = out(clamp01((t - M.pc) / 0.55)), n = Math.floor(clamp01((t - M.ty) / (M.tyE - M.ty)) * ASK.length + 0.001)
	const down = Math.abs(t - M.clk) < 0.1, pr = n / ASK.length, ttl = out(clamp01((t - C[3] - 0.25) / 0.5)) * (1 - clamp01((t - M.pc + 0.2) / 0.3))
	const cx = lerp(t, M.clk - 0.8, M.clk, 1500, 1260, inOut), cy = lerp(t, M.clk - 0.8, M.clk, 1000, 712, inOut), cz = 1 + 0.03 * out(clamp01((t - M.clk - 0.1) / 0.6))
	return <Lav>
		<Line s="按一次 Fn，开始说" c={PT} size={88} o={ttl} />
		{ci > 0.01 && <div style={{ position: "absolute", left: 225, top: 292, width: 1470, height: 495, borderRadius: 26, background: "#fff", boxShadow: "0 20px 70px rgba(90,40,200,.14)", opacity: clamp01(ci * 2),
			transform: `perspective(1600px) translateY(${120 * (1 - ci)}px) rotateX(${22 * (1 - ci)}deg) scale(${(0.94 + 0.06 * ci) * cz})`, filter: ci < 0.9 ? `blur(${(1 - ci) * 10}px)` : undefined }}>
			<div style={{ position: "absolute", left: 62, top: 50, fontFamily: HEAVY, fontWeight: 700, fontSize: 34, color: "#2a2730" }}>你想写点什么？</div>
			<div style={{ position: "absolute", left: 62, right: 62, top: 120, height: 150, borderRadius: 14, boxShadow: "inset 0 0 0 2px #e6e2ee", display: "flex", alignItems: "center", padding: "0 34px", boxSizing: "border-box", fontSize: 34, color: "#26232c" }}>
				{ASK.slice(0, n)}<i style={{ display: "inline-block", width: 2.5, height: 40, background: "#26232c", marginLeft: 3, opacity: Math.floor(t * 2.4) % 2 }} /><span style={{ flex: 1 }} />
				{t > M.ty && t < M.tyE + 0.3 && <span style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 24, color: "#8a7fb0" }}><Wave t={t} n={7} h={26} color="#9b6cff" live />正在听</span>}</div>
			<div style={{ position: "absolute", left: 62, top: 300, width: 1346 * pr, height: 6, borderRadius: 3, background: "linear-gradient(90deg, #6b4cf0, #9a6bff)" }} />
			<div style={{ position: "absolute", left: 62, right: 62, top: 345, height: 108, borderRadius: 16, background: pr > 0.02 ? "linear-gradient(90deg, #1ea6f5, #5d63e8 50%, #d78ce8)" : "#8f8ae8", display: "flex", alignItems: "center", justifyContent: "center", gap: 16, color: "#fff", fontFamily: HEAVY, fontWeight: 600, fontSize: 32, transform: `scale(${down ? 0.98 : 1})` }}>✦ 再按一次 Fn，文字写好</div>
		</div>}
		{sw < 1 && <div style={{ position: "absolute", left: -900 - 1800 * out(sw), top: -400, width: 2400, height: 2400, borderRadius: "50%", background: "radial-gradient(circle at 60% 40%, #9a6cff, #6b30ed)", filter: "blur(6px)" }} />}
		{t > M.clk - 0.8 && <Cursor x={cx} y={cy} s={1.5} down={down} />}</Lav>
}

// ---------- 5–10: flying drafts, rewind ----------
const CARDS: { bg: string; c: string; h: string; b: string; photo?: string }[] = [
	{ bg: "linear-gradient(150deg, #2a1870, #3515a0)", c: GOLD, h: "首页改版：\n第一版方案", b: "" },
	{ bg: "#fff", c: "#24204a", h: "李经理，您好：", b: COPY.mail[1], photo: "t17-kb-white.webp" },
	{ bg: "#f7cf55", c: "#3a2a10", h: "下一步", b: COPY.doc[2][1] },
	{ bg: "#fff", c: "#24204a", h: "会议待办", b: COPY.todos.join("　·　"), photo: "t27-sea.webp" },
	{ bg: "#f7cf55", c: "#3a2a10", h: "结果", b: COPY.doc[1][1] },
]
const DCard: React.FC<{ k: number; x: number; y: number; r: number; o?: number }> = ({ k, x, y, r, o = 1 }) => { const d = CARDS[k]
	return <div style={{ position: "absolute", left: x - 560, top: y - 320, width: 1120, height: 640, borderRadius: 30, background: d.bg, transform: `rotate(${r}deg)`, boxShadow: "0 30px 60px rgba(30,0,90,.35)", overflow: "hidden", opacity: o }}>
		<div style={{ position: "absolute", left: 60, top: 40, fontSize: 22, color: k === 0 ? "#b9a8ff" : "#8a86a0" }}>MosMos · 第一版</div>
		{k === 0 ? <div style={{ position: "absolute", left: 60, top: 300, fontFamily: HEAVY, fontWeight: 700, fontSize: 96, lineHeight: 1.12, color: d.c, whiteSpace: "pre" }}>{d.h}</div>
			: <><div style={{ position: "absolute", left: 60, top: 100, fontFamily: HEAVY, fontWeight: 700, fontSize: 52, color: d.c }}>{d.h}</div>
				{d.photo && <><Photo src={d.photo} x={60} y={200} w={480} h={260} r={8} gray /><Photo src={k === 1 ? "t15-forest.webp" : "t20-studio.webp"} x={580} y={200} w={480} h={260} r={8} gray /></>}
				<div style={{ position: "absolute", left: 60, right: 60, top: d.photo ? 490 : 400, fontSize: 32, lineHeight: 1.5, color: d.c }}>{d.b}</div></>}</div> }
const flyPos = (k: number, u: number) => ({ x: 960 + (k % 2 ? 120 : -100) + 40 * Math.sin(u * 3 + k), y: lerp(u, 0, 1, 1500, -700, (v) => v), r: (k % 2 ? 6 : -7) + 10 * (u - 0.5) * (k % 2 ? 1 : -1) })
const Fly: React.FC<{ t: number; t0: number; dir?: number; speed?: number; blur?: number }> = ({ t, t0, dir = 1, speed = 1, blur = 0 }) =>
	<AbsoluteFill style={{ filter: blur ? `blur(${blur}px)` : undefined }}>{[4, 3, 2, 1, 0].map((k) => { const u = dir > 0 ? (t - t0 - k * 0.32) * 0.62 * speed + 0.32 : 0.6 - (t - t0) * 0.5 * speed + k * 0.13
		if (u < 0 || u > 1.05) return null; const p = flyPos(k, u); return <DCard key={k} k={k} x={p.x} y={p.y} r={p.r} /> })}</AbsoluteFill>
const Scan: React.FC<{ t: number }> = ({ t }) => <AbsoluteFill style={{ pointerEvents: "none" }}>
	{[0, 1, 2].map((k) => <div key={k} style={{ position: "absolute", left: 0, right: 0, top: ((t * 700 + k * 360) % 1200) - 60, height: 26 + 20 * k, background: "rgba(40,10,120,.28)", filter: "blur(3px)" }} />)}
	<AbsoluteFill style={{ background: "repeating-linear-gradient(0deg, rgba(255,255,255,.03) 0 2px, transparent 2px 4px)" }} /></AbsoluteFill>
const Osd: React.FC<{ s: string }> = ({ s }) => <div style={{ position: "absolute", left: 46, top: 34, fontFamily: MONO, fontSize: 72, color: "#fff", letterSpacing: "0.06em", textShadow: "2px 0 0 rgba(255,60,120,.5), -2px 0 0 rgba(60,200,255,.5)" }}>{s}</div>

// ---------- 11–13: style picker ----------
const LV = COPY.polish
const Picker: React.FC<{ t: number; zoomed: boolean }> = ({ t, zoomed }) => {
	const sel = t > M.pk1 ? 2 : 0, cam = zoomed ? inOut(clamp01((t - C[11]) / 2.4)) : 0, lst = out(clamp01((t - M.list) / 0.4)), fsel = t > M.pk2 ? 1 : 0
	const blue = zoomed, bg = blue ? "linear-gradient(160deg, #c3cbfc, #aeb8fa)" : "linear-gradient(160deg, #cdbdfc, #b9a3f8)"
	const cx = zoomed ? lerp(t, M.list + 0.1, M.pk2, 880, 330, inOut) : lerp(t, C[10], M.pk1, 1760, 1600, inOut), cy = zoomed ? lerp(t, M.list + 0.1, M.pk2, 700, 450, inOut) : lerp(t, C[10], M.pk1, 950, 640, inOut)
	const ser = fsel ? SERIF : HEAVY
	return <AbsoluteFill style={{ background: bg, overflow: "hidden", fontFamily: CJK }}>
		<div style={{ position: "absolute", inset: 0, transform: zoomed ? `translate(${560 - 120 * cam}px, ${-60 - 120 * cam}px) scale(${0.9 + 0.12 * cam})` : `translateY(${-lerp(t, C[10], C[11], 0, 70, (v) => v)}px)`, transformOrigin: "0 0" }}>
			<div style={{ position: "absolute", left: 150, top: 0, width: 1060, height: 570, borderRadius: 18, background: blue ? "#2b3ff0" : "linear-gradient(150deg, #2a1870, #3d1ab0)", boxShadow: "0 20px 50px rgba(40,0,120,.25)" }}>
				<div style={{ position: "absolute", left: 40, top: 30, fontSize: 20, color: "#b9a8ff" }}>MosMos · 润色</div>
				<div style={{ position: "absolute", left: 40, top: 150, width: 980, fontFamily: ser, fontWeight: 700, fontSize: sel ? 66 : 44, lineHeight: 1.3, color: blue ? "#8ae6ff" : GOLD }}>{sel ? LV[2].out : COPY.raw}</div></div>
			<div style={{ position: "absolute", left: 150, top: 660, width: 1060, height: 520, borderRadius: 18, background: "#f6f3ff", overflow: "hidden" }}>
				<Photo src="t17-kb-white.webp" x={0} y={0} w={500} h={520} r={0} gray />
				<div style={{ position: "absolute", left: 540, top: 40, fontSize: 18, color: "#6a66a0" }}>邮件 · 完整专业</div>
				<div style={{ position: "absolute", left: 540, top: 150, width: 470, fontFamily: ser, fontWeight: 700, fontSize: 40, lineHeight: 1.35, color: blue ? NAVY : "#3a1d8a" }}>{COPY.mail[0]}{COPY.mail[1].slice(0, 15)}</div></div>
			{zoomed && <div style={{ position: "absolute", left: 150, top: 1240, width: 1060, height: 500, borderRadius: 18, background: "#7fe3f2" }} />}
		</div>
		{(!zoomed || lst < 1) && <div style={{ position: "absolute", left: zoomed ? 1327 + 200 * cam : 1327, top: 165, width: 495, height: 750, opacity: zoomed ? 1 - lst : 1, borderRadius: 24, background: "rgba(255,255,255,.92)", boxShadow: "0 20px 60px rgba(60,20,160,.18)" }}>
			<div style={{ position: "absolute", left: 40, top: 34, fontFamily: HEAVY, fontWeight: 700, fontSize: 30, color: "#2a2730" }}>润色程度</div>
			{LV.map((l, k) => <div key={l.id} style={{ position: "absolute", left: 40, top: 120 + k * 200, width: 415, height: 160, borderRadius: 80, boxShadow: k === sel ? "0 0 0 5px #6b4cf0" : "inset 0 0 0 2px #e4e0f0", display: "flex", alignItems: "center", gap: 0, overflow: "hidden" }}>
				{[0, 1, 2, 3].map((j) => <span key={j} style={{ width: 104, height: "100%", background: ["#3b2f86", "#4a5ae8", "#7fd6f5", "#cde9ff"][(j + k) % 4], opacity: j <= k + 1 ? 1 : 0.25 }} />)}
				<span style={{ position: "absolute", left: 0, right: 0, textAlign: "center", fontFamily: HEAVY, fontWeight: 700, fontSize: 40, color: "#fff", textShadow: "0 2px 8px rgba(0,0,0,.35)" }}>{l.label}</span></div>)}</div>}
		{zoomed && lst > 0.01 && <div style={{ position: "absolute", left: 60 - 300 * (1 - lst), top: 190, width: 360, opacity: lst }}>
			{COPY.scenes.slice(0, 4).map((s, k) => <div key={s.id} style={{ height: 150, marginBottom: 26, borderRadius: 18, background: "#fff", boxShadow: k === fsel ? "0 0 0 5px #4a5ae8" : "0 8px 24px rgba(40,40,160,.12)", padding: "26px 30px", boxSizing: "border-box" }}>
				<div style={{ fontFamily: k === 1 ? SERIF : HEAVY, fontWeight: 700, fontSize: 40, color: "#1a1830" }}>{s.label}</div><div style={{ fontSize: 22, color: "#8a86a0", marginTop: 8 }}>{s.style.replace("风格：自动 · ", "")}</div></div>)}</div>}
		<Cursor x={cx} y={cy} s={1.9} down={Math.abs(t - (zoomed ? M.pk2 : M.pk1)) < 0.08} /></AbsoluteFill>
}
const EditBtn: React.FC<{ t: number }> = ({ t }) => {
	const b = 1 - clamp01((t - C[12]) / 0.5), down = Math.abs(t - M.ed) < 0.1, zo = inOut(clamp01((t - M.ed - 0.2) / 0.47))
	return <Lav c="#e9dbfc"><div style={{ position: "absolute", inset: 0, transform: `scale(${1 - 0.45 * zo}) translateY(${-240 * zo}px)`, transformOrigin: "50% 50%" }}>
		<div style={{ position: "absolute", left: 548, top: 415, width: 830, height: 272, borderRadius: 40, background: "linear-gradient(180deg, #8456f6, #6a3be8)", boxShadow: "0 20px 50px rgba(100,50,230,.3)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: HEAVY, fontWeight: 700, fontSize: 80, color: "#fff", filter: b > 0.02 ? `blur(${b * 18}px)` : undefined, transform: `scale(${(1.1 - 0.1 * (1 - b)) * (down ? 0.96 : 1)})` }}>开始编辑</div>
		{zo > 0 && <div style={{ position: "absolute", left: -400, right: -400, top: 860, height: 1200, background: BLUE, transform: `translateY(${300 * (1 - zo)}px)` }} />}
		{t > M.btn - 0.45 && <Cursor x={lerp(t, M.btn - 0.45, M.btn + 0.15, 1700, 1250, inOut) - 40 * clamp01((t - M.btn - 0.2) / 0.8)} y={lerp(t, M.btn - 0.45, M.btn + 0.15, 1100, 700, inOut) - 30 * clamp01((t - M.btn - 0.2) / 0.8)} s={2.4} down={down} />}</div></Lav>
}

// ---------- 14–28: editor ----------
const TOOLS = ["文本", "媒体", "形状", "贴纸", "图表", "表格", "嵌入", "录制"]
const BODY = COPY.mail[1]
const Thumbs: React.FC<{ cur: number }> = ({ cur }) => <div style={{ position: "absolute", left: 20, top: 150, width: 190 }}>
	<div style={{ fontSize: 18, color: "#555", marginBottom: 16, marginLeft: 30 }}>+ 添加页面</div>
	{["#1d28d7", "#f3f3fb", "#f3f3fb", "#7fe3f2", "#f3f3fb", "#eef6ff", "#7fe3f2"].map((c, k) => <div key={k} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}><span style={{ width: 18, fontSize: 15, color: "#666" }}>{k + 1}</span>
		<span style={{ width: 146, height: 82, borderRadius: 6, background: c, boxShadow: k === cur ? "0 0 0 3px #4a3df0" : "inset 0 0 0 1px #e2e2ea", position: "relative", overflow: "hidden" }}>{k === 1 && <span style={{ position: "absolute", left: 0, top: 0, width: 66, height: 82, background: "#555" }} />}</span></div>)}</div>
const Slide: React.FC<{ k: number; t: number; typed?: number; tags?: boolean; dark?: boolean }> = ({ k, t, typed = 1, tags, dark }) => {
	if (k === 0) return <div style={{ position: "absolute", inset: 0, background: BLUE }}><div style={{ position: "absolute", left: 48, top: 48, fontSize: 18, color: "#c8ccff" }}>MosMos · 第一版</div><div style={{ position: "absolute", right: 40, top: 36, width: 40, height: 40, borderRadius: 20, background: "#fff" }} />
		<div style={{ position: "absolute", left: 48, top: 270, fontFamily: SERIF, fontSize: 104, lineHeight: 1.15, color: "#86e4ff" }}>首页改版：<br />第一版方案</div></div>
	if (k === 2) return <div style={{ position: "absolute", inset: 0, background: "#fff" }}><div style={{ position: "absolute", left: 60, top: 60, fontFamily: SERIF, fontWeight: 700, fontSize: 56, color: NAVY }}>会议待办</div>
		{COPY.todos.map((s, j) => <div key={s} style={{ position: "absolute", left: 60 + j * 385, top: 190, width: 360 }}><Photo src={["t27-sea.webp", "t15-forest.webp", "t20-studio.webp"][j]} x={0} y={0} w={360} h={200} r={4} /><div style={{ position: "absolute", top: 226, fontFamily: SERIF, fontWeight: 700, fontSize: 30, color: NAVY, width: 360 }}>{s}</div><div style={{ position: "absolute", top: 290, fontSize: 20, color: "#777", width: 360 }}>{COPY.meeting[j][0]} · {COPY.meeting[j][1]}</div></div>)}</div>
	const n = Math.floor(typed * BODY.length + 0.001)
	return <div style={{ position: "absolute", inset: 0, background: "#f6f6fb" }}>{!dark && <Photo src="t17-kb-white.webp" x={0} y={0} w={560} h={700} r={0} gray z={1.05} />}
		<div style={{ position: "absolute", left: 640, top: 60, fontSize: 18, color: "#5a5ad0" }}>邮件 · 完整专业</div>
		<div style={{ position: "absolute", left: 620, top: 250, width: 560, padding: "16px 20px", boxShadow: tags ? "0 0 0 2px #a59cf5" : undefined, fontFamily: SERIF, fontWeight: 700, fontSize: 38, lineHeight: 1.32, color: NAVY }}>
			{COPY.mail[0]}<br />{BODY.slice(0, n)}{typed < 1 && <i style={{ display: "inline-block", width: 3, height: 40, background: NAVY, verticalAlign: "middle", marginLeft: 2 }} />}</div>
		{tags && <><div style={{ position: "absolute", left: 430, top: 210, padding: "8px 18px", borderRadius: 18, background: "#9ad0ff", fontSize: 20, color: "#123", fontWeight: 600 }}>林清禾</div>
			<div style={{ position: "absolute", left: 1020, top: 640, display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", borderRadius: 22, background: "#f58fae", fontSize: 22, color: "#3a0a1a", fontWeight: 700 }}><Wave t={t} n={4} h={16} color="#3a0a1a" live={typed < 1} />小林</div></>}</div>
}
type Pan = "none" | "scene" | "polish"
const Editor: React.FC<{ t: number; slide: number; cur?: number; typed?: number; tags?: boolean; panel?: Pan; panelO?: number; hl?: number; pick?: number }> = ({ t, slide, cur, typed, tags, panel = "none", panelO = 1, hl = -1, pick = -1 }) => {
	const pw = panel !== "none" ? 330 * panelO : 0
	return <div style={{ position: "absolute", left: 0, top: 0, width: 1640, height: 930, borderRadius: 20, background: "#fff", boxShadow: "0 30px 80px rgba(40,0,120,.35)", overflow: "hidden", fontFamily: CJK }}>
		<div style={{ height: 56, background: "#f2f2f5", display: "flex", alignItems: "center", gap: 18, padding: "0 20px" }}><span style={{ width: 30, height: 30, borderRadius: 8, background: "#dedee6" }} /><span style={{ padding: "6px 18px", borderRadius: 8, background: "#fff", fontSize: 17, color: "#333" }}>首页改版 · 第一版方案</span></div>
		<div style={{ position: "absolute", left: 0, right: 0, top: 56, height: 84, borderBottom: "1px solid #ececf2" }}>
			<div style={{ position: "absolute", left: 30, top: 18, fontSize: 20, fontWeight: 700, color: "#222" }}>首页改版</div><div style={{ position: "absolute", left: 30, top: 48, fontSize: 15, color: "#888" }}>团队</div>
			<div style={{ position: "absolute", left: 551, top: 14, display: "flex", gap: 30 }}>{TOOLS.map((s) => <div key={s} style={{ textAlign: "center", fontSize: 15, color: "#333" }}><div style={{ width: 26, height: 22, margin: "0 auto 6px", border: "2px solid #444", borderRadius: 5 }} />{s}</div>)}</div>
			<div style={{ position: "absolute", right: 30, top: 22, display: "flex", alignItems: "center", gap: 18 }}>
				{["#f2b134", "#e4572e", "#29a36a"].map((c) => <span key={c} style={{ width: 34, height: 34, borderRadius: 17, background: c, border: "2px solid #fff", marginLeft: -26 }} />)}
				<span style={{ width: 24, height: 24, border: "2px solid #444", borderRadius: "50% 50% 4px 4px" }} /><span style={{ fontSize: 22 }}>▮▮▮</span>
				<span style={{ padding: "9px 20px", borderRadius: 10, boxShadow: "inset 0 0 0 1.5px #ddd", fontSize: 18, background: hl === 1 ? "#efeff5" : undefined }}>▶ 演示</span><span style={{ padding: "9px 20px", borderRadius: 10, background: "#5a48f0", color: "#fff", fontSize: 18 }}>分享</span></div></div>
		<Thumbs cur={cur ?? slide} />
		<div style={{ position: "absolute", left: 250, top: 152, width: 1244 * (1 - pw / 1300), height: 700 * (1 - pw / 1300), transformOrigin: "0 0" }}>
			<div style={{ position: "absolute", left: 0, top: 0, width: 1244, height: 700, transform: `scale(${1 - pw / 1300})`, transformOrigin: "0 0", overflow: "hidden" }}><Slide k={slide} t={t} typed={typed} tags={tags} /></div></div>
		<div style={{ position: "absolute", left: 600, top: 875, display: "flex", gap: 34, fontSize: 17, color: "#444" }}><span><b style={{ background: "#4a3df0", color: "#fff", padding: "1px 6px", borderRadius: 3 }}>A</b> 页面样式</span><span>○ 页面颜色</span><span>／ 背景图片</span><span>···</span></div>
		<div style={{ position: "absolute", right: 0, top: 140, width: 74, bottom: 0, borderLeft: "1px solid #f0f0f4" }}>{[0, 1, 2, 3, 4, 5].map((k) => <div key={k} style={{ width: 28, height: 28, margin: "26px auto 0", borderRadius: 7, border: "2.5px solid #333", background: (panel === "scene" && k === 1) || (panel === "polish" && k === 1) ? "#e9e6ff" : undefined }} />)}</div>
		{pw > 1 && <div style={{ position: "absolute", right: 86, top: 156, width: 320, height: 760, borderRadius: 14, background: "#fff", boxShadow: "0 10px 40px rgba(0,0,0,.12), inset 0 0 0 1px #eee", opacity: panelO, overflow: "hidden" }}>
			<div style={{ position: "absolute", left: 24, top: 20, fontSize: 22, fontWeight: 700 }}>{panel === "scene" ? "场景" : "润色"}</div><div style={{ position: "absolute", right: 20, top: 20, width: 24, height: 24, borderRadius: 12, background: "#888", color: "#fff", fontSize: 16, textAlign: "center", lineHeight: "24px" }}>×</div>
			{panel === "scene" ? <><div style={{ position: "absolute", left: 24, right: 24, top: 70, height: 44, borderRadius: 10, background: "#f4f4f7", display: "flex" }}><span style={{ flex: 1, margin: 4, borderRadius: 8, background: "#fff", textAlign: "center", lineHeight: "36px", fontSize: 17 }}>自动识别</span><span style={{ flex: 1, textAlign: "center", lineHeight: "44px", fontSize: 17, color: "#666" }}>手动切换</span></div>
				{COPY.scenes.concat(COPY.scenes[0]).slice(0, 6).map((s, k) => <div key={k} style={{ position: "absolute", left: 24 + (k % 3) * 92, top: 140 + Math.floor(k / 3) * 120, width: 84, textAlign: "center" }}>
					<div style={{ width: 64, height: 64, margin: "0 auto", borderRadius: 10, background: k === pick ? "#1f9e63" : "#d9f5e7", boxShadow: k === pick ? "0 0 0 3px #a7e9c9" : undefined, color: k === pick ? "#fff" : "#1f9e63", fontSize: 24, fontWeight: 700, lineHeight: "64px" }}>{k === 5 ? "自" : s.label[0]}</div>
					<div style={{ fontSize: 14, color: "#444", marginTop: 8, whiteSpace: "nowrap" }}>{k === 5 ? "自动识别" : s.label}</div></div>)}
				<div style={{ position: "absolute", left: 24, top: 410, fontSize: 18, fontWeight: 700 }}>风格</div><div style={{ position: "absolute", left: 24, right: 24, top: 450, height: 50, borderRadius: 8, background: "#f4f4f7", fontSize: 16, color: "#555", lineHeight: "50px", paddingLeft: 16 }}>{pick >= 0 ? COPY.scenes[pick].style : "风格：自动"}</div>
				<div style={{ position: "absolute", left: 24, right: 24, top: 540, fontSize: 15, color: "#999", textAlign: "center", lineHeight: 1.6 }}>{COPY.sceneDesc}</div></>
				: <>{[["关闭", "／"], ["高级", "✦"]].map(([a, g], k) => <div key={a} style={{ position: "absolute", left: 24 + k * 142, top: 80, width: 128, textAlign: "center" }}><div style={{ height: 96, borderRadius: 8, boxShadow: (k === 1 && pick >= 1) ? "0 0 0 3px #6b5cf5" : "inset 0 0 0 1.5px #ccc", background: k === 1 && pick >= 1 ? "#eeeaff" : "#fff", fontSize: 34, lineHeight: "96px", color: k ? "#6b5cf5" : "#aaa" }}>{g}</div><div style={{ fontSize: 16, color: "#555", marginTop: 10 }}>{a}</div></div>)}
					<div style={{ position: "absolute", left: 24, right: 24, top: 250, fontSize: 15, color: "#888", lineHeight: 1.6 }}>{COPY.polishDesc}<br />{COPY.polish[2].hint}</div></>}</div>}
	</div>
}
const Present: React.FC<{ t: number }> = ({ t }) => { const k = t > M.nxt ? 2 : 1, ph = t + 0.002 >= C[24] ? 1 : 0, sl = inOut(clamp01((t - M.nxt) / 0.4))
	return <Purple><div style={{ position: "absolute", left: 165, top: 90, width: 1580, height: 855, borderRadius: 14, background: "#121218", overflow: "hidden", boxShadow: "0 30px 80px rgba(20,0,80,.4)" }}>
		<div style={{ height: 50, display: "flex", alignItems: "center", gap: 14, padding: "0 20px", color: "#ccc", fontSize: 16 }}><span style={{ padding: "4px 14px", borderRadius: 6, background: "#2a2a33" }}>▶ 首页改版</span><span style={{ flex: 1 }} /><span>✎ 编辑</span><span>分享</span></div>
		<div style={{ position: "absolute", left: 160, top: 70, width: 1244, height: 700, transform: "scale(1.02)", transformOrigin: "0 0", overflow: "hidden" }}>
			<Slide k={1} t={t} dark={!ph} />{k === 2 && <div style={{ position: "absolute", inset: 0, transform: `translateX(${(1 - sl) * 40}px)`, opacity: sl }}><Slide k={2} t={t} /></div>}</div>
		<div style={{ position: "absolute", left: 20, right: 20, bottom: 20, display: "flex", gap: 6 }}>{[0, 1, 2, 3, 4, 5, 6].map((j) => <span key={j} style={{ flex: 1, height: 4, borderRadius: 2, background: j < k ? "#fff" : "#444" }} />)}</div></div></Purple> }

// ---------- 29: meeting record ----------
const Meeting: React.FC<{ t: number }> = ({ t }) => {
	const z = inOut(clamp01((t - M.mzoom) / 0.6)), ex = out(clamp01((t - M.exp) / 0.4)), tip = fade(t, M.tip, 99, 0.2)
	const cx = t < M.mzoom ? lerp(t, C[28], M.mzoom, 1200, 930, inOut) : t < M.exp ? lerp(t, M.mzoom, M.exp, 930, 560, inOut) : lerp(t, M.exp, C[29], 560, 1500, inOut)
	const cy = t < M.mzoom ? lerp(t, C[28], M.mzoom, 300, 380, inOut) : t < M.exp ? lerp(t, M.mzoom, M.exp, 380, 340, inOut) : lerp(t, M.exp, C[29], 340, 640, inOut)
	return <Purple><div style={{ position: "absolute", inset: 0, transform: `translate(${-590 * z}px, ${-1433 * z}px) scale(${1 + 0.85 * z})`, transformOrigin: "0 0" }}>
		<div style={{ position: "absolute", left: 40, top: 30, width: 1840, height: 1300, borderRadius: 16, background: "#9a96a8", opacity: 0.85 }} />
		<div style={{ position: "absolute", left: 277, top: 46, width: 1390, height: 1500, borderRadius: 16, background: "#fff", boxShadow: "0 20px 60px rgba(0,0,0,.25)", fontFamily: CJK, color: "#222" }}>
			<div style={{ position: "absolute", left: 40, top: 26, fontSize: 24, fontWeight: 700 }}>‹　首页改版 · 会议记录</div><div style={{ position: "absolute", right: 30, top: 26, fontSize: 24, color: "#888" }}>×</div>
			<div style={{ position: "absolute", left: 40, top: 100, fontSize: 22, fontWeight: 700 }}>概览</div>
			<div style={{ position: "absolute", left: 40, right: 40, top: 145, height: 470, borderRadius: 12, boxShadow: "inset 0 0 0 1.5px #ececf2" }}>
				{COPY.meetingFeatures.map(([a, b], k) => <div key={a} style={{ position: "absolute", left: 30 + k * 420, top: 24, width: 380, paddingBottom: 14, borderBottom: k === 0 ? "3px solid #6b5cf5" : "3px solid transparent" }}><div style={{ fontSize: 26, fontWeight: 700, color: k === 0 ? "#5b4ce0" : "#222" }}>{a}</div><div style={{ fontSize: 16, color: "#888", marginTop: 6 }}>{b}</div></div>)}
				<div style={{ position: "absolute", left: 30, top: 150, fontSize: 16, color: "#999" }}>发言分布</div>
				{Array.from({ length: 15 }).map((_, k) => { const h = 40 + 220 * rand(k + 4), g = out(clamp01((t - C[28] - k * 0.04) / 0.5))
					return <div key={k} style={{ position: "absolute", left: 90 + k * 82, bottom: 50, width: 14, height: h * g, borderRadius: 3, background: ["#6b5cf5", "#9a8cf8", "#4a3dd0"][k % 3] }} /> })}
				<div style={{ position: "absolute", left: 30, right: 30, bottom: 48, borderTop: "1.5px solid #eee" }} /></div>
			<div style={{ position: "absolute", left: 40, top: 650, fontSize: 22, fontWeight: 700 }}>逐字稿</div>
			<div style={{ position: "absolute", left: 40, right: 40, top: 700, fontSize: 18, color: "#888", display: "flex", borderBottom: "1px solid #eee", paddingBottom: 12 }}><span style={{ width: 300 }}>说话人 ↓</span><span style={{ width: 160 }}>时间</span><span>内容</span></div>
			{[0, 1, 2].map((m, k) => { const row = COPY.meeting[m], top = 745 + k * 112 + (k > 1 ? 320 * ex : 0)
				return <div key={k} style={{ position: "absolute", left: 40, right: 40, top, height: 112, display: "flex", alignItems: "center", background: k === 1 ? "#f6f6f9" : undefined, borderBottom: "1px solid #f0f0f3", fontSize: 22 }}>
					<span style={{ width: 300, display: "flex", alignItems: "center", gap: 16 }}><span style={{ color: "#999" }}>›</span><span style={{ width: 40, height: 40, borderRadius: 20, background: "#ecebff", color: "#5b4ce0", fontSize: 18, textAlign: "center", lineHeight: "40px" }}>{m + 1}</span>{row[0]}</span>
					<span style={{ width: 160, color: "#555" }}>{row[1]}</span><span style={{ color: "#333" }}>{row[2]}</span></div> })}
			{ex > 0.01 && <div style={{ position: "absolute", left: 80, right: 80, top: 970, height: 300 * ex, overflow: "hidden", display: "flex", gap: 24 }}>
				{COPY.todos.concat(COPY.meetingConclusion.slice(0, 12) + "…").map((s, k) => <div key={k} style={{ position: "relative", flex: 1, height: 260, borderRadius: 10, background: ["#2b3ff0", "#f3f3fb", "#7fe3f2", "#121218"][k], color: k === 0 || k === 3 ? "#fff" : NAVY, padding: 22, boxSizing: "border-box", fontFamily: SERIF, fontWeight: 700, fontSize: 26 }}>
					<div style={{ fontSize: 14, fontFamily: CJK, opacity: 0.7, marginBottom: 12 }}>{k < 3 ? "待办事项" : "会议总结"}</div>{s}
					{k === 2 && tip > 0 && <div style={{ position: "absolute", left: 20, top: -10, padding: "12px 18px", borderRadius: 10, background: "#222", color: "#fff", fontFamily: CJK, fontWeight: 400, fontSize: 18, opacity: tip, whiteSpace: "nowrap" }}>{COPY.meeting[2][0]} · {COPY.meeting[2][1]}</div>}</div>)}</div>}
		</div></div><Cursor x={cx} y={cy} s={1.9} down={Math.abs(t - M.exp) < 0.08} /></Purple>
}

// ---------- 30–31: end ----------
const End: React.FC<{ t: number }> = ({ t }) => {
	if (t < C[30]) return <Purple><Line s="想到了" size={300} y={600} /></Purple>
	const ef = 1 - clamp01((t - M.endf) / 0.3), lg = clamp01((t - M.logo) / 0.4), wd = out(clamp01((t - M.word) / 0.5))
	const s = t < M.can ? "想到了" : t < M.pitch ? "想到了，就能说出来" : "说出来，就写好了"
	return <Purple>{ef > 0 && <Line s={s} size={64} o={ef} />}
		{t > M.logo && <div style={{ position: "absolute", left: 0, right: 0, top: 540 - 80, display: "flex", justifyContent: "center", alignItems: "center", gap: 34 * wd }}>
			<div style={{ opacity: lg, transform: `scale(${0.8 + 0.2 * out(lg)})` }}><LogoPixels size={140} t={t} mode="in" t0={M.logo} invert /></div>
			<span style={{ fontFamily: SANS, fontWeight: 600, fontSize: 132, color: "#fff", letterSpacing: "-0.02em", width: 600 * wd, overflow: "hidden", opacity: wd, whiteSpace: "nowrap", display: "inline-block" }}>MosMos</span></div>}
		{t > M.logo && <div style={{ position: "absolute", left: 0, right: 0, top: 878, textAlign: "center", fontFamily: SANS, fontSize: 46, color: "#d9ccff", opacity: lg }}>mosmos.io</div>}</Purple>
}

export const Film: React.FC = () => {
	const t = useT(), i = C.filter((c) => t + 0.002 >= c).length
	if (i === 0) return <Ideas t={t} />
	if (i === 1) return <Typed t={t} />
	if (i === 2) return <BigWord t={t} />
	if (i === 3) return <Hello t={t} />
	if (i === 4) return <Prompt t={t} />
	if (i === 5) return <Purple><Fly t={t} t0={C[4] - 0.25} /></Purple>
	if (i === 6) { const bl = 1 - clamp01((t - C[5]) / 0.18)
		return <Purple>{bl > 0 && <Fly t={t} t0={C[4] - 0.25} blur={24} speed={1.6} />}<Line s={t < M.q ? "就这样！" : "就这样？"} o={fade(t, M.that, 99, 0.15)} /></Purple> }
	if (i === 7) return <Purple><AbsoluteFill style={{ background: "rgba(20,0,70,.22)" }} /><Line s="就这样？" dx={Math.sin(t * 90) * 4} /><Scan t={t} /><Osd s="REW <<" /></Purple>
	if (i === 8 || i === 9) { const rew = t < M.stop, tt = rew ? t : M.stop + (t - M.stop) * 0.15
		return <Purple><Fly t={tt} t0={i === 9 ? C[7] - 0.45 : C[7]} dir={-1} />{rew && <Scan t={t} />}<Osd s={rew ? "REW <<" : "STOP ■"} />{!rew && t > M.stop + 0.6 && <AbsoluteFill style={{ background: "transparent" }} />}</Purple> }
	if (i === 10) { const bl = 1 - clamp01((t - C[9]) / 0.25), g = inOut(clamp01((t - M.glow) / 1.0)) * (1 + 0.15 * clamp01((t - M.glow - 1.0) / 0.8))
		return <Purple>{bl > 0 && <AbsoluteFill style={{ opacity: bl }}><div style={{ position: "absolute", inset: 0, transform: "scale(1.35) translate(120px, 80px)" }}><Fly t={C[7] - 0.15} t0={C[7] - 0.45} dir={-1} blur={30} /></div></AbsoluteFill>}
			{g > 0 && <div style={{ position: "absolute", left: 1420 - 650 * g, top: 430 - 560 * g, width: 1300 * g, height: 1120 * g, borderRadius: "50%", background: "radial-gradient(circle, #fff 0%, #ffd6f5 18%, #b7a0ff 40%, #7fb4ff 58%, transparent 72%)", filter: "blur(30px)", opacity: 0.9 }} />}
			<Line s="现在，按你的方式来写" o={fade(t, M.human - 0.15, 99, 0.45)} />
			{t > 30.9 && <Cursor x={lerp(t, 30.9, 31.6, 1980, 1370, inOut)} y={lerp(t, 30.9, 31.6, 640, 560, inOut)} s={1.9} />}</Purple> }
	if (i === 11) return <Picker t={t} zoomed={false} />
	if (i === 12) return <Picker t={t} zoomed />
	if (i === 13) return <EditBtn t={t} />
	// editor shots: camera = [x, y, scale]
	const ed = (cam: [number, number, number], el: React.ReactNode, cur?: [number, number, boolean?]) => <Purple><div style={{ position: "absolute", left: 0, top: 0, transform: `translate(${cam[0]}px, ${cam[1]}px) scale(${cam[2]})`, transformOrigin: "0 0" }}>{el}</div>{cur && <Cursor x={cur[0]} y={cur[1]} s={1.6} down={cur[2]} />}</Purple>
	const ty = (a: number) => clamp01((t - M.ty2) / 5.4) * a
	if (i === 14) { const z = inOut(clamp01((t - C[13]) / 0.75)), s = lerp(z, 0, 1, 2.6, 1.0, (v) => v)
		return ed([154 - 760 * (s - 1), 82 - 30 * (s - 1), s * 0.98 * (1 + 0.02 * clamp01((t - 39.8) / 1.8))], <Editor t={t} slide={0} cur={t > M.sl2 ? 1 : 0} typed={0} />, t > 40.3 ? [lerp(t, 40.3, M.sl2, 700, 270, inOut), lerp(t, 40.3, M.sl2, 700, 365, inOut), Math.abs(t - M.sl2) < 0.08] : undefined) }
	if (i === 15) { const z = inOut(clamp01((t - M.zt) / 0.8)), s = 1 + 1.1 * z
		return ed([154 + (-1597 - 154) * z, 82 + (-514 - 82) * z, s], <Editor t={t} slide={1} typed={ty(1)} tags />) }
	if (i === 16) { const z = inOut(clamp01((t - 46.1) / 0.9)), s = 2.5 - 1.2 * z
		return <Purple><div style={{ position: "absolute", inset: 0, transform: `perspective(2000px) rotateY(${-8 * (1 - z)}deg)` }}><div style={{ position: "absolute", left: 0, top: 0, transform: `translate(${154 - 1250 * (s - 1)}px, ${82 - 560 * (s - 1)}px) scale(${s})`, transformOrigin: "0 0" }}><Editor t={t} slide={1} typed={ty(1)} tags /></div></div></Purple> }
	if (i === 17) return ed([-20 - 30 * clamp01((t - C[16]) / 1.1), 60, 1.18], <Editor t={t} slide={1} typed={1} tags />)
	if (i === 18) return <Lav c="#e9dbfc"><Line s="让想法，落成文字" c={PT} size={88} /></Lav>
	if (i === 19) { const po = out(clamp01((t - M.panel) / 0.35)), z = inOut(clamp01((t - 51.7) / 1.0)), s = 1.12 + 0.5 * z
		return ed([40 - 1420 * (s - 1.12), 20 - 160 * (s - 1.12), s], <Editor t={t} slide={1} typed={1} panel={po > 0 ? "scene" : "none"} panelO={po} />, [lerp(t, 49.6, 50.5, 1000, 1700, inOut) - 1420 * (s - 1) * 0, lerp(t, 49.6, 50.5, 600, 300, inOut) + 200 * z, Math.abs(t - M.panel + 0.1) < 0.08]) }
	if (i === 20) return ed([150 - 1420 * 0.75, 37 - 160 * 0.75 - 40, 1.75], <Editor t={t} slide={1} typed={1} panel="scene" />, [1780, 480])
	if (i === 21) { const sw = t > M.pswap, z = inOut(clamp01((t - 54.6) / 1.2)), s = 1.5 + 0.5 * z
		return ed([150 - 1380 * (s - 1) - 60 * z, 37 - 60 * (s - 1) + 40 * z, s], <Editor t={t} slide={1} typed={1} panel={sw ? "polish" : "scene"} pick={sw ? (t > 55.3 ? 2 : 0) : (t > 53.45 ? 1 : -1)} />,
			[sw ? lerp(t, M.pswap, 55.3, 1460, 1610, inOut) : lerp(t, C[20], 53.45, 1520, 1430, inOut), sw ? lerp(t, M.pswap, 55.3, 650, 300, inOut) : lerp(t, C[20], 53.45, 650, 530, inOut), Math.abs(t - 53.45) < 0.08 || Math.abs(t - 55.3) < 0.08]) }
	if (i === 22) { const z = clamp01((t - C[21]) / 1.2)
		return <Lav c="#efe6ff"><div style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 1080, transform: `translate(${-40 * z}px, ${-30 * z}px) scale(${1 + 0.04 * z})`, transformOrigin: "50% 50%" }}>
			<div style={{ position: "absolute", left: 490, top: 220, width: 830, height: 640, borderRadius: 120, background: "#e2c9ff", filter: "blur(8px)" }} />
			<div style={{ position: "absolute", left: 380, top: 170, width: 10, height: 90, borderRadius: 5, background: "#5a48f0" }} />
			<div style={{ position: "absolute", left: 430, top: 160, fontSize: 70, color: "#333", fontFamily: SANS }}>2</div><div style={{ position: "absolute", left: 430, top: 780, fontSize: 70, color: "#333", fontFamily: SANS }}>3</div>
			{[1, 2].map((k) => <div key={k} style={{ position: "absolute", left: 580, top: k === 1 ? 60 : 680, width: 1244 * 0.52, height: 700 * 0.52, borderRadius: 18, overflow: "hidden", boxShadow: k === 1 ? "0 0 0 8px #6b5cf5" : "0 0 0 3px #d9d6e6" }}>
				<div style={{ width: 1244, height: 700, transform: "scale(0.52)", transformOrigin: "0 0", position: "relative" }}><Slide k={k} t={t} /></div></div>)}
			<div style={{ position: "absolute", left: 760, top: 500, width: 150, height: 130, borderRadius: 22, background: "#fff", boxShadow: "0 10px 30px rgba(60,20,160,.2)", fontSize: 60, textAlign: "center", lineHeight: "130px", color: "#5a48f0" }}>✦</div></div></Lav> }
	if (i === 23) { const z = clamp01((t - C[22]) / 2.2)
		return ed([-2200 - 120 * z, -60 - 40 * z, 2.3 + 0.1 * z], <Editor t={t} slide={1} typed={1} panel="polish" pick={2} hl={t > M.pres ? 1 : -1} />, [lerp(t, 57.9, M.pres, 1400, 1150, inOut), lerp(t, 57.9, M.pres, 600, 270, inOut), Math.abs(t - M.pclk) < 0.08]) }
	if (i <= 25) return <Present t={t} />
	if (i === 26) return <Lav c="#e9dbfc"><Line s={COPY.heads.meeting.join("")} c={PT} size={88} sc={1 + 0.02 * clamp01((t - C[25]) / 1.4)} /></Lav>
	if (i === 27) return ed([150, 37, 1], <Editor t={t} slide={1} typed={1} />, [lerp(t, C[26], C[27], 1300, 1460, inOut), lerp(t, C[26], C[27], 300, 150, inOut)])
	if (i === 28) { const b = 1 - Math.abs(t - (C[27] + C[28]) / 2) / 0.25
		return <Purple><AbsoluteFill style={{ filter: `blur(${b * 14}px)` }}><div style={{ position: "absolute", left: 150, top: 37 }}><Editor t={t} slide={1} typed={1} /></div><AbsoluteFill style={{ background: "rgba(80,80,90,.5)" }} /></AbsoluteFill></Purple> }
	if (i === 29) return <Meeting t={t} />
	return <End t={t} />
}
