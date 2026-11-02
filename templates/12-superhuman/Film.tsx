// Template 12 — structure of the Superhuman suite launch film (2025), MosMos content.
// The opening portrait is a licensed stock photo (ASSETS.md). Soft cloud gradients carry floating product windows; between chapters a beige stage of drifting icon
// bubbles resolves into one black product glyph and its name. Four chapters (语音输入 / 场景识别 / 热词词库 /
// 会议记录), then the suite line word by word, the four glyphs in a row, and the logo on beige.
import React from "react"
import { AbsoluteFill, Img, staticFile } from "remotion"
import { CJK, SANS, COPY, lerp, clamp01, inOut, out, useT, Win, Pill, AppIcon, typeAt, Caret, SCENES, Cursor } from "../_engine/src/mos"
import { vis, rand } from "../_engine/src/kit"
import TL from "./timeline.json"

const M = TL.marks as unknown as Record<string, number> & { p3fix: number[]; p4todo: number[] }
const C = TL.cuts
const BEIGE = "#f1efea", DARK = "#1b1a1f"

// ---------- cloud gradients
type Pal = { base: string; blobs: [number, number, number, string][] }
const PAL: Record<string, Pal> = {
	sky: { base: "linear-gradient(180deg,#dfe5f6 0%,#eef0fa 45%,#dbe3f6 100%)", blobs: [[300, 260, 420, "rgba(255,255,255,.9)"], [1500, 200, 460, "rgba(255,255,255,.8)"], [900, 760, 520, "rgba(255,255,255,.75)"], [1700, 900, 380, "rgba(205,200,245,.6)"], [200, 900, 360, "rgba(200,214,248,.7)"]] },
	violet: { base: "linear-gradient(180deg,#b9aaeb 0%,#9a8fdc 50%,#a7b0ea 100%)", blobs: [[350, 300, 480, "rgba(214,198,250,.85)"], [1550, 260, 420, "rgba(130,118,214,.7)"], [1000, 900, 560, "rgba(222,214,252,.7)"], [1750, 820, 400, "rgba(150,170,236,.7)"]] },
	mint: { base: "linear-gradient(180deg,#3fbf98 0%,#7fdcbc 30%,#e9f6ef 58%,#5dcfa2 100%)", blobs: [[300, 560, 420, "rgba(255,255,255,.8)"], [1500, 600, 480, "rgba(230,248,240,.85)"], [900, 180, 500, "rgba(56,180,150,.6)"], [1600, 980, 380, "rgba(90,200,150,.7)"]] },
	sunset: { base: "linear-gradient(180deg,#ee8a6d 0%,#e9a4a3 35%,#b88bcb 70%,#8a6ec4 100%)", blobs: [[300, 200, 420, "rgba(246,170,120,.8)"], [1500, 280, 460, "rgba(240,150,170,.7)"], [800, 820, 560, "rgba(150,110,200,.7)"], [1600, 900, 420, "rgba(110,90,190,.7)"]] },
	ocean: { base: "linear-gradient(180deg,#6a95ea 0%,#3462d2 40%,#3aa2e6 72%,#2c4fbe 100%)", blobs: [[300, 260, 460, "rgba(130,170,245,.75)"], [1550, 220, 420, "rgba(40,80,200,.7)"], [900, 760, 540, "rgba(70,190,240,.6)"], [1700, 920, 420, "rgba(36,70,190,.7)"]] },
	dusk: { base: "linear-gradient(180deg,#9a4cad 0%,#dc69a9 33%,#62c4df 66%,#7a50b6 100%)", blobs: [[300, 240, 460, "rgba(220,110,180,.75)"], [1550, 300, 420, "rgba(150,80,190,.7)"], [800, 720, 540, "rgba(110,210,235,.6)"], [1650, 880, 420, "rgba(120,80,190,.7)"]] },
}
const Clouds: React.FC<{ t: number; p: string }> = ({ t, p }) => (
	<AbsoluteFill style={{ background: PAL[p].base, overflow: "hidden" }}>
		{PAL[p].blobs.map(([x, y, r, c], i) => (
			<div key={i} style={{ position: "absolute", left: x - r + Math.sin(t * 0.25 + i * 1.7) * 60, top: y - r * 0.6 + Math.cos(t * 0.2 + i) * 30, width: r * 2, height: r * 1.2, borderRadius: "50%", background: c, filter: "blur(90px)" }} />
		))}
	</AbsoluteFill>
)

// ---------- glyphs
const Glyph: React.FC<{ k: number; s: number; c?: string }> = ({ k, s, c = "#2a2a33" }) => {
	const d = [
		<path key="a" d="M4 5h16v10H10l-5 4v-4H4z" />, <g key="b"><rect x="3" y="6" width="18" height="12" rx="2" /><polyline points="3,7 12,13 21,7" /></g>,
		<g key="c"><path d="M6 3h8l4 4v14H6z" /><line x1="9" y1="12" x2="15" y2="12" /><line x1="9" y1="16" x2="14" y2="16" /></g>,
		<g key="d"><rect x="3" y="5" width="18" height="14" rx="2" /><polyline points="7,10 10,12 7,14" /><line x1="12" y1="15" x2="16" y2="15" /></g>,
		<g key="e"><rect x="4" y="5" width="16" height="15" rx="2" /><line x1="4" y1="10" x2="20" y2="10" /><line x1="9" y1="3" x2="9" y2="7" /><line x1="15" y1="3" x2="15" y2="7" /></g>,
		<g key="f"><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M6 11a6 6 0 0 0 12 0" /><line x1="12" y1="17" x2="12" y2="21" /></g>,
		<g key="g"><circle cx="9" cy="8" r="3" /><path d="M3 19c0-3 3-5 6-5s6 2 6 5" /><circle cx="17" cy="9" r="2.4" /><path d="M16 14c3 0 5 2 5 4" /></g>,
		<g key="h"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></g>,
	][k % 8]
	return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">{d}</svg>
}
const Bubble: React.FC<{ k: number; s: number; op?: number; glass?: boolean }> = ({ k, s, op = 1, glass }) => (
	<div style={{ width: s, height: s, borderRadius: "50%", background: glass ? "rgba(255,255,255,.92)" : "rgba(196,188,246,.42)", display: "flex", alignItems: "center", justifyContent: "center", opacity: op, boxShadow: glass ? "0 10px 24px rgba(40,30,90,.18)" : undefined }}>
		<Glyph k={k} s={s * 0.46} c={glass ? "#3b3a52" : "rgba(255,255,255,.95)"} />
	</div>
)
// four black product glyphs, one per chapter
const PG: React.FC<{ k: number; s: number; c?: string }> = ({ k, s, c = DARK }) => (
	<svg width={s} height={s} viewBox="0 0 100 100">
		{k === 0 && <g><rect x="14" y="14" width="72" height="72" rx="22" fill={c} />{[0.35, 0.7, 1, 0.7, 0.35].map((h, i) => <rect key={i} x={29 + i * 9.5} y={50 - 18 * h} width="5" height={36 * h} rx="2.5" fill={BEIGE} />)}</g>}
		{k === 1 && <g><rect x="12" y="12" width="52" height="52" rx="14" fill="none" stroke={c} strokeWidth="9" /><rect x="36" y="36" width="52" height="52" rx="14" fill={c} /></g>}
		{k === 2 && <g><path d="M24 12h52v76L50 70 24 88z" fill={c} strokeLinejoin="round" /><circle cx="50" cy="38" r="9" fill={BEIGE} /></g>}
		{k === 3 && <g><path d="M10 18h50a8 8 0 0 1 8 8v24a8 8 0 0 1-8 8H30l-14 12V58h-6a8 8 0 0 1-8-8V26a8 8 0 0 1 8-8z" fill={c} /><path d="M74 38h16a8 8 0 0 1 8 8v22a8 8 0 0 1-8 8h-4v10L74 76H54a8 8 0 0 1-8-8v-2h14a14 14 0 0 0 14-14z" fill={c} /></g>}
	</svg>
)
const NAMES = ["语音输入", "场景识别", "热词词库", "会议记录"]

// ---------- captions
const Cap: React.FC<{ t: number; t0: number; lines: string[]; dark?: boolean; size?: number; top?: number }> = ({ t, t0, lines, dark, size = 44, top = 96 }) => {
	const a = lerp(t, t0, t0 + 0.6, 0, 1)
	return (
		<div style={{ position: "absolute", top, left: 0, right: 0, textAlign: "center", fontFamily: CJK, fontWeight: 500, fontSize: size, lineHeight: 1.3, color: dark ? DARK : "#fff", opacity: a, transform: `translateY(${(1 - a) * 18}px)`, textShadow: dark ? undefined : "0 2px 18px rgba(30,20,80,.18)" }}>
			{lines.map((l) => <div key={l}>{l}</div>)}
		</div>
	)
}

// ---------- opening: line on sky, illustrated person card with floating app bubbles
// stock photo (Pexels, see ASSETS.md) multiplied onto a violet gradient so the white wall takes the brand tint
const Person: React.FC<{ w: number; h: number }> = ({ w, h }) => (
	<div style={{ position: "absolute", inset: 0, width: w, height: h, background: "linear-gradient(135deg,#c3b2f2,#8d8fe0)" }}>
		<Img src={staticFile("t12-woman.webp")} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", mixBlendMode: "multiply", filter: "saturate(1.05) contrast(1.05)" }} />
		<div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 75% 25%, rgba(255,215,240,.35), transparent 60%)" }} />
	</div>
)
const CARD_ICONS: [number, number, number][] = [[0.18, 0.28, 0], [0.33, 0.12, 1], [0.78, 0.18, 2], [0.86, 0.5, 3], [0.2, 0.62, 5], [0.72, 0.74, 6]]
const Opening: React.FC<{ t: number }> = ({ t }) => {
	const close = t >= C[1]
	const g = lerp(t, C[0], C[1], 0, 1, (x) => x)
	const w = close ? 1920 : 600 + g * 220, h = close ? 1080 : w * 0.625
	const cap = vis(t, M.cap0, 99, 0.5)
	return (
		<AbsoluteFill>
			<Clouds t={t} p="sky" />
			{!close && <div style={{ position: "absolute", top: t < C[0] ? 500 : 150, left: 0, right: 0, textAlign: "center", fontFamily: CJK, fontWeight: 500, fontSize: t < C[0] ? 52 : 40, color: DARK, opacity: cap, filter: `blur(${(1 - cap) * 6}px)` }}>每一份工作，都从一句话开始。</div>}
			{t >= C[0] && (
				<div style={{ position: "absolute", left: 960 - w / 2, top: close ? 0 : 640 - h / 2, width: w, height: h, borderRadius: close ? 0 : 18, overflow: "hidden", boxShadow: close ? undefined : "0 30px 70px rgba(40,40,110,.25)" }}>
					<div style={{ position: "absolute", inset: 0, transform: close ? `scale(${1.55 + (t - C[1]) * 0.1})` : "none", transformOrigin: "50% 40%" }}><Person w={w} h={close ? w * 0.625 : h} /></div>
					{CARD_ICONS.map(([x, y, k], i) => {
						const p = close ? 1 : lerp(t, M.icons0 + i * 0.38, M.icons0 + i * 0.38 + 0.4, 0, 1)
						const s = close ? 150 : 46 + g * 14
						const X = close ? 960 + (x - 0.52) * 2300 : x * w, Y = close ? 400 + (y - 0.36) * 1500 : y * h
						return <div key={i} style={{ position: "absolute", left: X - s / 2, top: Y - s / 2 + Math.sin(t * 1.4 + i) * 6, transform: `scale(${0.6 + 0.4 * p})`, opacity: p }}><Bubble k={k} s={s} glass /></div>
					})}
				</div>
			)}
		</AbsoluteFill>
	)
}

// ---------- the suite: bubbles orbit the MosMos mark on violet, then merge into it
const Suite: React.FC<{ t: number }> = ({ t }) => {
	const merge = t >= C[3]
	const s = merge ? lerp(t, C[3], C[3] + 0.6, 1.25, 1.1) : lerp(t, C[2], C[2] + 0.8, 0.82, 1)
	const conv = clamp01((t - M.conv) / (C[3] - M.conv))
	return (
		<AbsoluteFill>
			<Clouds t={t} p="violet" />
			{!merge && <Cap t={t} t0={M.cap1} lines={["所以，我们把这些", "都放进了 MosMos。"]} />}
			{!merge && Array.from({ length: 7 }).map((_, i) => {
				const p = clamp01((t - M.orbit - i * 0.45) / 0.4)
				const a = (i / 7) * Math.PI * 2 + (t - M.orbit) * 0.32
				const R = (1 - inOut(conv)) * 330 + 40
				const x = 960 + Math.cos(a) * R * 1.25, y = 610 + Math.sin(a) * R * 0.75
				return <div key={i} style={{ position: "absolute", left: x - 38, top: y - 38, opacity: p * (1 - conv * conv), transform: `scale(${(0.7 + 0.3 * p) * (1 - conv * 0.6)})` }}><Bubble k={i} s={76} glass /></div>
			})}
			<div style={{ position: "absolute", left: 960 - 110, top: 610 - 110, width: 220, height: 220, transform: `scale(${s})` }}>
				{merge && <div style={{ position: "absolute", inset: -120, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,.9), rgba(255,255,255,0) 65%)", opacity: lerp(t, C[3], C[3] + 0.4, 1, 0.55) }} />}
				<div style={{ position: "relative", filter: "drop-shadow(0 24px 40px rgba(40,30,110,.35))" }}><AppIcon size={220} /></div>
			</div>
		</AbsoluteFill>
	)
}

// ---------- beige chapter stage: drifting bubbles, one picked, then the product glyph and name
const Drift: React.FC<{ t: number; t0: number; seed: number; pick?: number }> = ({ t, t0, seed, pick }) => {
	const u = t - t0
	return (
		<AbsoluteFill style={{ background: BEIGE }}>
			{Array.from({ length: 9 }).map((_, i) => {
				const r = rand(seed * 10 + i), s = 140 + r * 120
				const x = ((i * 260 + seed * 97 - u * (90 + r * 60)) % 2300 + 2300) % 2300 - 190, y = 200 + ((i * 3 + seed) % 5) * 170 + Math.sin(u + i) * 20
				const fade = pick != null ? 1 - clamp01((t - pick) / 0.3) : 1
				return <div key={i} style={{ position: "absolute", left: x - s / 2, top: y - s / 2, opacity: fade }}><Bubble k={i + seed} s={s} /></div>
			})}
			{pick != null && t > pick - 0.6 && (() => {
				const p = clamp01((t - pick + 0.6) / 0.6)
				return <div style={{ position: "absolute", left: 960 - 100, top: 500 - 100, transform: `scale(${0.8 + 0.25 * out(p)})` }}>
					<div style={{ position: "absolute", inset: -90, borderRadius: "50%", background: "radial-gradient(circle, rgba(170,160,245,.55), rgba(170,160,245,0) 65%)", opacity: p }} />
					<Bubble k={seed + 4} s={200} op={p} />
				</div>
			})()}
		</AbsoluteFill>
	)
}
const Badge: React.FC<{ t: number; t0: number; k: number }> = ({ t, t0, k }) => {
	const p = lerp(t, t0, t0 + 0.5, 0, 1), lab = lerp(t, t0 + 0.25, t0 + 0.75, 0, 1)
	return (
		<AbsoluteFill style={{ background: BEIGE, alignItems: "center", justifyContent: "center" }}>
			<div style={{ transform: `scale(${0.85 + 0.15 * p})`, opacity: p }}><PG k={k} s={150} /></div>
			<div style={{ marginTop: 26, fontFamily: CJK, fontSize: 40, fontWeight: 500, color: DARK, opacity: lab, transform: `translateY(${(1 - lab) * 10}px)` }}>{NAMES[k]}</div>
		</AbsoluteFill>
	)
}

// ---------- floating product windows
const Float: React.FC<{ t: number; t0: number; children: React.ReactNode; y?: number; blur?: number }> = ({ t, t0, children, y = 600, blur = 0 }) => {
	const p = lerp(t, t0, t0 + 1.1, 0, 1), push = 1 + (t - t0) * 0.006
	return <div style={{ position: "absolute", left: 960, top: y + (1 - p) * 380, transform: `translate(-50%,-50%) scale(${1.12 * push})`, opacity: clamp01(p * 1.6), filter: blur ? `blur(${blur}px)` : undefined }}>{children}</div>
}
const Av: React.FC<{ c: string; n: string; s?: number }> = ({ c, n, s = 40 }) => <div style={{ width: s, height: s, borderRadius: "50%", background: c, color: "#fff", fontSize: s * 0.42, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: CJK, flexShrink: 0 }}>{n}</div>
const Line: React.FC<{ w: number; c?: string }> = ({ w, c = "#ececf0" }) => <div style={{ width: w, height: 11, borderRadius: 6, background: c, marginTop: 9 }} />
const Rail: React.FC<{ t: number; on: number }> = ({ t, on }) => (
	<div style={{ position: "absolute", right: -78, top: 40, width: 58, borderRadius: 18, background: "#fff", boxShadow: "0 16px 40px rgba(0,0,0,.14)", padding: "14px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
		<AppIcon size={34} />
		{[5, 0, 1, 2, 6].map((k, i) => <div key={i} style={{ width: 34, height: 34, borderRadius: 10, background: i === on ? "#ede9fe" : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}><Glyph k={k} s={22} c={i === on ? "#5b4bd6" : "#8a8c96"} /></div>)}
	</div>
)

const P1: React.FC<{ t: number }> = ({ t }) => {
	const intro = t < M.p1g
	if (intro) return <Badge t={t} t0={C[4]} k={0} />
	const fade = lerp(t, M.p1g, M.p1g + 0.45, 0, 1)
	const ty = typeAt(COPY.scenes[0].out, t, M.p1type, 14)
	const sent = t > M.p1send
	const state = t < M.p1pol ? "语音输入" : t < M.p1type ? "润色中" : "已写好"
	return (
		<AbsoluteFill>
			<AbsoluteFill style={{ background: BEIGE }}><div style={{ position: "absolute", left: 885, top: 435 }}><PG k={0} s={150} /></div></AbsoluteFill>
			<AbsoluteFill style={{ opacity: fade }}>
				<Clouds t={t} p="mint" />
				<Cap t={t} t0={M.p1cap} lines={["语音输入，把说出口的话，", "直接写进你正在用的应用。"]} />
				<Float t={t} t0={M.p1win} y={640}>
					<div style={{ position: "relative" }}>
						<Win w={1080} h={560} title="飞书 · 首页改版项目群">
							<div style={{ padding: "26px 34px", display: "flex", flexDirection: "column", gap: 22 }}>
								{[["#7b8cf0", "李", "李经理", "第一版大概什么时候能看到？"], ["#f0a35c", "周", "周舟", "我这边素材整理得差不多了。"]].map(([c, n, nm, m]) => (
									<div key={nm} style={{ display: "flex", gap: 14 }}><Av c={c} n={n} /><div><div style={{ fontSize: 15, color: "#8a8c90" }}>{nm}</div><div style={{ fontSize: 20, color: "#1d1e22", marginTop: 4 }}>{m}</div></div></div>
								))}
								{sent && <div style={{ display: "flex", gap: 14, alignSelf: "flex-end", flexDirection: "row-reverse", opacity: lerp(t, M.p1send, M.p1send + 0.3, 0, 1) }}><Av c="#2f5fa8" n="林" /><div style={{ background: "#e8efff", borderRadius: 14, padding: "12px 16px", fontSize: 20, color: "#1d1e22", maxWidth: 560 }}>{COPY.scenes[0].out}</div></div>}
							</div>
							<div style={{ position: "absolute", left: 30, right: 30, bottom: 26, height: 112, borderRadius: 14, border: "1px solid #e3e3e8", padding: "16px 20px", fontSize: 21, color: "#1d1e22", lineHeight: 1.5 }}>
								{!sent && <span>{ty.s}</span>}{!sent && t > M.p1pill && <Caret t={t} solid={ty.typing} />}
								<div style={{ position: "absolute", right: 14, bottom: 12, width: 40, height: 40, borderRadius: 12, background: ty.done && !sent ? "#2f5fa8" : "#d9dbe3", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>↑</div>
							</div>
						</Win>
						<Rail t={t} on={1} />
						{t > M.p1pill && t < M.p1send + 0.3 && <div style={{ position: "absolute", left: 540 - 200, top: 560 - 6, opacity: vis(t, M.p1pill, M.p1send + 0.3, 0.25) }}><Pill t={t} state={state} live={t < M.p1pol} /></div>}
					</div>
				</Float>
			</AbsoluteFill>
		</AbsoluteFill>
	)
}

const P2: React.FC<{ t: number }> = ({ t }) => {
	if (t < M.p2pre) {
		if (t < M.p2icon) return <Drift t={t} t0={C[5]} seed={1} pick={M.b2pick} />
		return <Badge t={t} t0={M.p2icon} k={1} />
	}
	const pre = t < C[7]
	const sel = t < M.p2sw ? 0 : 1
	const sc = COPY.scenes[sel]
	const ty = sel === 1 ? typeAt(sc.out, t, M.p2type, 60) : { s: sc.out, typing: false, done: true }
	const cur = t < M.p2sw ? lerp(t, C[7] + 0.4, M.p2sw - 0.1, 0, 1, inOut) : 1
	return (
		<AbsoluteFill>
			<Clouds t={t} p="sunset" />
			{!pre && <Cap t={t} t0={M.p2cap} lines={["场景识别，同一句话，", "在飞书和邮件里各有分寸。"]} />}
			<Float t={t} t0={pre ? C[6] - 0.3 : C[7] - 0.9} y={pre ? 700 : 650} blur={pre ? 10 : 0}>
				<Win w={1120} h={600} title="MosMos · 场景">
					<div style={{ display: "flex", height: "100%" }}>
						<div style={{ width: 250, background: "#f7f7f9", borderRight: "1px solid #ececf0", padding: "20px 14px", display: "flex", flexDirection: "column", gap: 6 }}>
							<div style={{ fontSize: 14, color: "#8a8c90", padding: "0 10px 8px" }}>当前应用</div>
							{SCENES.map((s, i) => <div key={s} style={{ fontSize: 19, padding: "10px 12px", borderRadius: 10, background: i === sel ? "#fff" : "transparent", boxShadow: i === sel ? "0 2px 8px rgba(0,0,0,.08)" : undefined, color: i === sel ? "#16171a" : "#6e7075", display: "flex", alignItems: "center", gap: 10 }}><Glyph k={[0, 1, 2, 5, 3][i]} s={20} c={i === sel ? "#5b4bd6" : "#9a9ca1"} />{s}</div>)}
						</div>
						<div style={{ flex: 1, padding: "28px 36px", position: "relative" }}>
							<div style={{ fontSize: 15, color: "#5b4bd6", background: "#efecfd", display: "inline-block", padding: "6px 12px", borderRadius: 8 }}>{sc.style}</div>
							<div style={{ marginTop: 14, fontSize: 15, color: "#9a9ca1" }}>你说的：{sc.raw.slice(0, 24)}…</div>
							<div style={{ marginTop: 22, fontSize: 22, color: "#1d1e22", lineHeight: 1.65, whiteSpace: "pre-wrap" }}>{ty.s}{ty.typing && <Caret t={t} solid />}</div>
						</div>
					</div>
					<div style={{ position: "absolute", left: 0, top: 0 }}><Cursor x={lerp(cur, 0, 1, 520, 130, (x) => x)} y={lerp(cur, 0, 1, 420, 132, (x) => x)} down={t > M.p2sw - 0.12 && t < M.p2sw + 0.1} /></div>
				</Win>
			</Float>
		</AbsoluteFill>
	)
}

const HOT = COPY.hot.filter((h) => h[2])
const P3: React.FC<{ t: number }> = ({ t }) => {
	if (t < C[10]) {
		if (t < C[9]) return <Drift t={t} t0={C[8]} seed={2} />
		return <Badge t={t} t0={C[9]} k={2} />
	}
	if (t < C[11]) return <Clouds t={t} p="ocean" />
	const line = t > M.p3line
	return (
		<AbsoluteFill>
			<Clouds t={t} p="ocean" />
			<Cap t={t} t0={M.p3cap} lines={["热词词库，人名和术语，", "教一次就能写对。"]} />
			<Float t={t} t0={C[11] - 0.4} y={650}>
				<div style={{ position: "relative" }}>
					<Win w={1120} h={580} title="邮件 · 收件箱">
						<div style={{ padding: "10px 0" }}>
							{["林清禾 · Nimbus 发布排期", "设计组 · Figma 组件库更新", "周舟 · 品牌素材已上传", "李经理 · 首页改版第一版", "财务 · 十月报销汇总", "林清禾 · 周会纪要"].map((s, i) => (
								<div key={s} style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 30px", borderBottom: "1px solid #f0f0f3", fontSize: 18, color: "#2a2b30" }}><Av c={["#7b8cf0", "#5cc0a0", "#f0a35c", "#2f5fa8", "#c07be0", "#7b8cf0"][i]} n={s[0]} s={34} /><span style={{ width: 380 }}>{s}</span><Line w={300} /></div>
							))}
						</div>
					</Win>
					<div style={{ position: "absolute", left: -120, top: 210, width: 560, borderRadius: 18, background: "#fff", boxShadow: "0 30px 70px rgba(10,30,90,.3)", padding: "22px 26px", opacity: lerp(t, M.p3card, M.p3card + 0.4, 0, 1), transform: `translateY(${lerp(t, M.p3card, M.p3card + 0.6, 30, 0)}px)`, fontFamily: CJK }}>
						<div style={{ fontSize: 15, color: "#8a8c90" }}>{COPY.hotStatus}</div>
						{HOT.map(([a, b], i) => {
							const on = t > M.p3fix[i]
							return <div key={b} style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 14, fontSize: 22 }}>
								<span style={{ color: "#9a9ca1", textDecoration: on ? "line-through" : "none", width: 130 }}>{a}</span><span style={{ color: "#c4c6cc" }}>→</span>
								<span style={{ color: "#1d1e22", fontWeight: 600, opacity: on ? 1 : 0.15 }}>{b}</span>
								<span style={{ marginLeft: "auto", width: 26, height: 26, borderRadius: 99, background: on ? "#3462d2" : "#e8e8ee", color: "#fff", fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center" }}>✓</span>
							</div>
						})}
						{line && <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid #eee", fontSize: 21, color: "#1d1e22", lineHeight: 1.6, opacity: lerp(t, M.p3line, M.p3line + 0.4, 0, 1) }}>请把 <b style={{ color: "#3462d2" }}>Figma</b> 里的 <b style={{ color: "#3462d2" }}>Nimbus</b> 文件发给 <b style={{ color: "#3462d2" }}>林清禾</b>。</div>}
					</div>
				</div>
			</Float>
		</AbsoluteFill>
	)
}

const P4: React.FC<{ t: number }> = ({ t }) => {
	if (t < C[14]) {
		if (t < C[13]) return <Drift t={t} t0={C[12]} seed={3} />
		return <Badge t={t} t0={C[13]} k={3} />
	}
	if (t < C[15]) return <AbsoluteFill><Clouds t={t} p="dusk" /><Float t={t} t0={C[14] - 0.2} y={760} blur={14}><Win w={1120} h={580} /></Float></AbsoluteFill>
	return (
		<AbsoluteFill>
			<Clouds t={t} p="dusk" />
			<Cap t={t} t0={M.p4cap} lines={["会议记录，谁说了什么、接下来做什么，", "会后自动整理好。"]} />
			<Float t={t} t0={C[15] - 0.6} y={660}>
				<Win w={1180} h={580} title="会议记录 · 首页改版周会">
					<div style={{ display: "flex", height: "100%" }}>
						<div style={{ flex: 1, padding: "24px 32px", display: "flex", flexDirection: "column", gap: 20 }}>
							{COPY.meeting.map(([who, tm, s], i) => <div key={i} style={{ opacity: lerp(t, C[15] + 0.2 + i * 0.35, C[15] + 0.5 + i * 0.35, 0, 1) }}><div style={{ fontSize: 14, color: "#8a8c90" }}>{who} · {tm}</div><div style={{ fontSize: 20, color: "#1d1e22", marginTop: 4 }}>{s}</div></div>)}
						</div>
						<div style={{ width: 400, background: "#faf8fd", borderLeft: "1px solid #ececf0", padding: "24px 26px", opacity: lerp(t, M.p4sum, M.p4sum + 0.4, 0, 1), transform: `translateX(${lerp(t, M.p4sum, M.p4sum + 0.5, 40, 0)}px)` }}>
							<div style={{ fontSize: 17, fontWeight: 600, color: "#1d1e22" }}>会议总结</div>
							<div style={{ fontSize: 16, color: "#4a4b52", lineHeight: 1.6, marginTop: 8 }}>{COPY.meetingConclusion}</div>
							<div style={{ fontSize: 17, fontWeight: 600, color: "#1d1e22", marginTop: 22 }}>待办</div>
							{COPY.todos.map((s, i) => { const on = t > M.p4todo[i]; return <div key={s} style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 12, fontSize: 17, color: "#2a2b30" }}><span style={{ width: 22, height: 22, borderRadius: 6, border: on ? "none" : "1.5px solid #c4c6cc", background: on ? "#9a4cad" : "transparent", color: "#fff", fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center" }}>{on ? "✓" : ""}</span>{s}</div> })}
						</div>
					</div>
				</Win>
			</Float>
		</AbsoluteFill>
	)
}

// ---------- end: suite line word by word, the four glyphs, logo on beige
const Words: React.FC<{ t: number; t0: number; words: string[]; step?: number }> = ({ t, t0, words, step = 0.32 }) => (
	<div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", maxWidth: 1100 }}>
		{words.map((w, i) => { const p = lerp(t, t0 + i * step, t0 + i * step + 0.5, 0, 1); return <span key={i} style={{ opacity: 0.12 + 0.88 * p, filter: `blur(${(1 - p) * 4}px)` }}>{w}</span> })}
	</div>
)
const End: React.FC<{ t: number }> = ({ t }) => {
	const beige = clamp01((t - M.logo2) / 0.45)
	const l1 = vis(t, C[16], M.e1out, 0.01, 0.25), l2 = vis(t, M.e2, M.e2out, 0.2, 0.2)
	return (
		<AbsoluteFill>
			<Clouds t={t} p="sky" />
			<AbsoluteFill style={{ alignItems: "center", justifyContent: "center", fontFamily: CJK, fontWeight: 500, fontSize: 68, color: DARK, lineHeight: 1.3 }}>
				{l1 > 0 && <div style={{ opacity: l1, textAlign: "center" }}><Words t={t} t0={M.e1} words={["MosMos，", "让你写下的", "每一句话，"]} /><Words t={t} t0={M.e1 + 1.3} words={["都"]} /></div>}
				{l2 > 0 && <div style={{ position: "absolute", opacity: l2, transform: `scale(${1 + (t - M.e2) * 0.04})` }}>更像你。</div>}
				{t > M.row && <div style={{ position: "absolute", display: "flex", gap: 70, alignItems: "center" }}>{[0, 1, 2, 3].map((k) => { const p = lerp(t, M.row + k * 0.24, M.row + k * 0.24 + 0.35, 0, 1); return <div key={k} style={{ opacity: p, transform: `scale(${0.7 + 0.3 * p})` }}><PG k={k} s={110} /></div> })}</div>}
			</AbsoluteFill>
			{beige > 0 && (
				<AbsoluteFill style={{ background: BEIGE, opacity: beige, alignItems: "center", justifyContent: "center" }}>
					<div style={{ transform: `scale(${lerp(t, M.logo2, M.logo2 + 0.8, 0.9, 1)})`, display: "flex", flexDirection: "column", alignItems: "center", gap: 26 }}>
						<AppIcon size={120} />
						<div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 64, letterSpacing: "0.12em", color: DARK }}>MOSMOS</div>
					</div>
					<div style={{ position: "absolute", bottom: 92, fontFamily: SANS, fontSize: 24, color: "#55545c" }}>{COPY.url}</div>
					<div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 26, background: "linear-gradient(90deg,#b9aaeb,#8a6ec4,#62c4df)" }} />
				</AbsoluteFill>
			)}
		</AbsoluteFill>
	)
}

export const Film: React.FC = () => {
	const t = useT()
	if (t < C[2]) return <Opening t={t} />
	if (t < C[4]) return <Suite t={t} />
	if (t < C[5]) return <P1 t={t} />
	if (t < C[8]) return <P2 t={t} />
	if (t < C[12]) return <P3 t={t} />
	if (t < C[16]) return <P4 t={t} />
	return <End t={t} />
}
