// Template 46 — structure of Spline "Introducing Hana - A new canvas for interactivity" (2025), MosMos content.
// Fast black-ground showcase: a pixel wordmark, a grid of neon outline icons, a grid of line animations, a sci-fi
// HUD, a soft keypad on lavender, a widget collage on grey, a pixel line with a reversed highlight and flash bands,
// an isometric wireframe key, a pixel menu, a fanned card stack, colour shapes, an echoing pixel word, a dark board
// that zooms and pans across frames, then the pixel wordmark, the pixel logo, the URL on grey and a colour logo.
import React from "react"
import { AbsoluteFill } from "remotion"
import { CJK, MONO, lerp, clamp01, inOut, out, useT, LogoPixels, Cursor, Wave, COPY, SCENES } from "../_engine/src/mos"
import { rand } from "../_engine/src/kit"
import TL from "./timeline.json"

const M = TL.marks as Record<string, number>, C = TL.cuts as number[]
const PIX = "'Fusion Pixel 12px Prop zh-Hans', monospace"
const RAINBOW = ["#f5c518", "#33d1c4", "#3b7bff", "#a259ff", "#ff4fd8", "#ff7a2a"]
const Bg: React.FC<{ c: string; children?: React.ReactNode }> = ({ c, children }) => <AbsoluteFill style={{ background: c, overflow: "hidden" }}>{children}</AbsoluteFill>
const Pix: React.FC<{ s: string; size: number; c?: string | string[]; style?: React.CSSProperties }> = ({ s, size, c = "#fff", style }) =>
	<span style={{ fontFamily: PIX, fontSize: size, lineHeight: 1, whiteSpace: "nowrap", color: typeof c === "string" ? c : undefined, ...style }}>{typeof c === "string" ? s : Array.from(s).map((ch, k) => <span key={k} style={{ color: c[k % c.length] }}>{ch}</span>)}</span>
const Mid: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", ...style }}>{children}</AbsoluteFill>

// ---------- 0–0.63 / 22.57–24.7: pixel wordmark ----------
const Word: React.FC<{ t: number; t0: number; col: number; size: number; glitch?: number }> = ({ t, col, size, glitch = 0 }) => {
	const cs = col > 0.5 ? RAINBOW : "#fff"
	return <Mid><div style={{ position: "relative" }}>{glitch > 0 && [0, 1, 2].map((k) => <div key={k} style={{ position: "absolute", left: (rand(k + Math.floor(t * 30)) - 0.5) * 80 * glitch, top: (rand(k * 3 + Math.floor(t * 30)) - 0.5) * 40 * glitch, opacity: 0.7, transform: `scaleY(${1 + rand(k * 7 + Math.floor(t * 30)) * glitch * 1.5})` }}><Pix s="MosMos" size={size} c={RAINBOW.slice(k)} /></div>)}
		<Pix s="MosMos" size={size} c={cs} /></div></Mid>
}

// ---------- 0.63–1.87: neon outline icons ----------
const ICONS: ((c: string) => React.ReactNode)[] = [
	(c) => <><rect x={38} y={12} width={24} height={44} rx={12} /><path d="M24 44 a26 26 0 0 0 52 0 M50 70 v16" /></>,
	(c) => <><rect x={10} y={16} width={56} height={40} rx={10} /><path d="M24 56 l-6 14 l18 -14" /><rect x={40} y={36} width={50} height={34} rx={10} fill={c} fillOpacity={0.25} /></>,
	(c) => <><circle cx={50} cy={30} r={16} /><path d="M18 86 c0 -22 14 -34 32 -34 s32 12 32 34 z" fill={c} fillOpacity={0.3} /></>,
	(c) => <><rect x={14} y={16} width={72} height={64} rx={6} /><path d="M14 66 l22 -22 l16 16 l12 -12 l22 18" /><circle cx={66} cy={34} r={7} /></>,
	(c) => <><path d="M10 34 h80 M10 64 h80" /><circle cx={36} cy={34} r={10} fill={c} fillOpacity={0.4} /><circle cx={64} cy={64} r={10} fill={c} fillOpacity={0.4} /></>,
	(c) => <><rect x={14} y={20} width={72} height={60} rx={8} transform="rotate(-18 50 50)" /><path d="M30 50 l10 8 l22 -20" /></>,
	(c) => <><rect x={10} y={24} width={80} height={54} rx={6} /><path d="M10 28 l40 28 l40 -28" /><circle cx={84} cy={22} r={10} fill="#ff3b3b" stroke="none" /></>,
	(c) => <><rect x={22} y={10} width={56} height={80} rx={6} /><path d="M34 32 h32 M34 50 h32 M34 68 h20" /></>,
	(c) => <><path d="M28 70 a22 22 0 0 1 4 -44 a26 26 0 0 1 48 10 a18 18 0 0 1 -6 34 z" fill={c} fillOpacity={0.25} /><path d="M38 84 l-4 8 M52 84 l-4 8 M66 84 l-4 8" /></>,
]
const ICOL = ["#7c7c7c", "#22d3c5", "#c36bff", "#ff9a3c", "#ff4d4d", "#4f8bff", "#33cc55", "#6a5cff", "#bba37a"]
const Icons: React.FC<{ t: number }> = ({ t }) => <Bg c="#000">{ICONS.map((f, k) => { const c = ICOL[(k + (t > 1.25 ? 3 : 0)) % 9]
	return <svg key={k} width={130} height={130} viewBox="0 0 100 100" style={{ position: "absolute", left: 694 + (k % 3) * 262 - 65, top: 225 + Math.floor(k / 3) * 290 - 65, filter: `drop-shadow(0 0 6px ${c})` }} fill="none" stroke={c} strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round">{f(c)}</svg> })}</Bg>

// ---------- 1.87–2.77: grid of line animations ----------
const Cell: React.FC<{ k: number; t: number }> = ({ k, t }) => { const a = (t - C[1]) * 2, s = "#e8e8e8"
	const g: React.ReactNode[] = [
		<>{[0, 1, 2, 3, 4].map((i) => <rect key={i} x={320 - 40 * (i + 1)} y={180 - 30 * (i + 1)} width={80 * (i + 1)} height={60 * (i + 1)} transform={`rotate(${a * 20 * (i % 2 ? -1 : 1)} 320 180)`} />)}</>,
		<rect x={290} y={130 + 10 * Math.sin(a * 3)} width={60} height={100} rx={30} />,
		<>{[0, 1, 2].map((i) => <line key={i} x1={320 - 120 * Math.cos(a + i * 1.05)} y1={180 - 120 * Math.sin(a + i * 1.05)} x2={320 + 120 * Math.cos(a + i * 1.05)} y2={180 + 120 * Math.sin(a + i * 1.05)} />)}{[0, 1, 2].map((i) => <circle key={i} cx={320 + 90 * Math.cos(a * 2 + i * 2)} cy={180 + 90 * Math.sin(a * 2 + i * 2)} r={9} fill={s} />)}</>,
		<>{Array.from({ length: 14 }, (_, i) => <line key={i} x1={600} y1={330} x2={40 + i * 30 + 20 * Math.sin(a + i)} y2={60 + (i % 5) * 50} />)}</>,
		<><circle cx={320} cy={180} r={110} /><circle cx={320} cy={180} r={150} stroke="#555" />{[0, 1, 2].map((i) => <circle key={i} cx={320 + 110 * Math.cos(a + i * 2.1)} cy={180 + 110 * Math.sin(a + i * 2.1)} r={8} fill={s} />)}</>,
		<>{[0, 1, 2, 3].map((i) => <ellipse key={i} cx={320} cy={180} rx={160} ry={70} transform={`rotate(${i * 45 + a * 10} 320 180)`} />)}<circle cx={320} cy={180} r={60} /></>,
		<>{[0, 1, 2, 3, 4, 5].map((i) => <ellipse key={i} cx={320} cy={130 + i * 18} rx={90 - Math.abs(i - 2.5) * 6} ry={26} transform={`rotate(${Math.sin(a + i) * 8} 320 180)`} />)}</>,
		<>{[-2, -1, 0, 1, 2].map((i) => <rect key={i} x={320 + i * 110 - (i ? 40 : 90)} y={70} width={i ? 80 : 180} height={220} rx={14} transform={`translate(${Math.sin(a) * 20 * i} 0)`} />)}</>,
		<>{Array.from({ length: 11 }, (_, i) => <circle key={i} cx={160 + i * 32} cy={250 - 110 * Math.sin((i / 10) * Math.PI) * (0.8 + 0.2 * Math.sin(a * 2))} r={11} fill={s} />)}</>,
	]
	return <svg width={640} height={360} viewBox="0 0 640 360" fill="none" stroke={s} strokeWidth={3} style={{ background: k === 0 || k === 4 ? "#1c1c1c" : "#141414" }}>{g[k]}</svg>
}
const Lines: React.FC<{ t: number }> = ({ t }) => <Bg c="#000"><div style={{ position: "absolute", left: 12, top: 12, display: "grid", gridTemplateColumns: "repeat(3, 624px)", gridAutoRows: "344px", gap: 12 }}>{Array.from({ length: 9 }, (_, k) => <div key={k} style={{ overflow: "hidden", borderRadius: 4 }}><div style={{ transform: "scale(0.975)", transformOrigin: "0 0" }}><Cell k={k} t={t} /></div></div>)}</div></Bg>

// ---------- 2.77–3.93: meeting HUD ----------
const OR = "#ff9a2e", GR = "#2ee6a0"
const Hud: React.FC<{ t: number }> = ({ t }) => { const k = (t - C[2]) / (C[3] - C[2])
	const box = (x: number, y: number, w: number, h: number, c = OR) => <div style={{ position: "absolute", left: x, top: y, width: w, height: h, border: `2px solid ${c}`, borderRadius: 18, clipPath: "polygon(0 0, 92% 0, 100% 14%, 100% 100%, 8% 100%, 0 86%)" }} />
	return <Bg c="#000"><div style={{ position: "absolute", inset: 0, transform: `scale(${1.02 + 0.04 * k}) translateX(${-20 * k}px)`, transformOrigin: "50% 50%", fontFamily: MONO, color: OR }}>
		{box(80, 80, 1800, 920, "#5a3a1a")}
		<div style={{ position: "absolute", left: 1040, top: 100, display: "flex", gap: 60, fontSize: 26 }}><span>会议 <b style={{ color: GR }}>首页改版</b></span><span>说话人 <b style={{ color: GR }}>3</b></span><span>场景 <b style={{ color: GR }}>自动识别</b></span></div>
		{box(150, 170, 620, 560)}<div style={{ position: "absolute", left: 200, top: 210, fontSize: 64, fontFamily: PIX }}>REC</div><div style={{ position: "absolute", left: 200, top: 300, fontSize: 22, color: GR }}>Fn + Shift · 录音中 <Wave t={t} n={6} h={18} color={GR} live /></div>
		<div style={{ position: "absolute", left: 200, top: 350, width: 520, fontFamily: CJK, fontSize: 24, lineHeight: 1.6, color: GR }}>{COPY.meeting.map(([a, b, c]) => <div key={b}>{b} {a}：{c}</div>)}</div>
		{box(820, 300, 380, 300)}<div style={{ position: "absolute", left: 860, top: 330, fontSize: 80, fontFamily: PIX }}>{["01", "02", "03"][Math.min(2, Math.floor(k * 3))]}</div>
		<div style={{ position: "absolute", left: 860, top: 440, fontSize: 24 }}>&gt; 待办 &lt;</div><div style={{ position: "absolute", left: 860, top: 480, fontFamily: CJK, fontSize: 24, color: GR }}>{COPY.todos[Math.min(2, Math.floor(k * 3))]}</div>
		<div style={{ position: "absolute", left: 860, top: 540, display: "flex", gap: 6 }}>{Array.from({ length: 10 }, (_, i) => <span key={i} style={{ width: 26, height: 22, background: i < 3 + k * 7 ? "#f5c518" : "#3a2a10" }} />)}</div>
		{box(1260, 220, 520, 400)}<div style={{ position: "absolute", left: 1300, top: 250, fontSize: 28 }}>[ 会议总结 ]</div>
		<div style={{ position: "absolute", left: 1300, top: 310, width: 440, fontFamily: CJK, fontSize: 24, lineHeight: 1.7, color: GR }}>{COPY.meetingFeatures.map(([a, b]) => <div key={a}>{a} · <span style={{ color: OR }}>{b.slice(0, 8)}</span></div>)}</div>
		{box(150, 780, 900, 170)}<div style={{ position: "absolute", left: 200, top: 810, fontSize: 24, color: GR }}>[ 多人逐字稿 ] 识别不同发言人，保留完整上下文</div>
		<svg width={240} height={160} style={{ position: "absolute", left: 220, top: 600 }} fill="none" stroke={OR} strokeWidth={2}><path d={`M20 90 L110 40 L220 70 L130 130 Z M20 90 v30 l110 40 v-30 M130 160 l90 -60 v-30`} transform={`rotate(${k * 8} 120 90)`} /></svg>
		{box(1120, 680, 700, 280)}<div style={{ position: "absolute", left: 1160, top: 720, fontSize: 28 }}>[ 场景 ]</div>
		<div style={{ position: "absolute", left: 1160, top: 780, display: "flex", gap: 30, fontFamily: CJK, fontSize: 24, color: GR }}>{SCENES.slice(0, 3).map((s) => <span key={s}>&gt; {s}</span>)}</div>
	</div></Bg> }

// ---------- 3.93–5.0: soft keypad on lavender ----------
const Key: React.FC<{ l: string; w?: number; c?: string; p?: boolean }> = ({ l, w = 140, c = "#f4f5fa", p }) =>
	<div style={{ width: w, height: 140, borderRadius: 20, background: c, boxShadow: p ? "inset 0 4px 10px rgba(0,0,0,.18)" : "0 8px 0 rgba(150,155,175,.7), 0 14px 20px rgba(80,85,120,.25)", transform: p ? "translateY(6px)" : undefined, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: CJK, fontSize: 40, color: "#333", fontWeight: 600 }}>{l}</div>
const Keypad: React.FC<{ t: number }> = ({ t }) => { const p = Math.abs(t - M.press) < 0.15
	return <Bg c="#9ea3c4"><Mid><div style={{ padding: 34, borderRadius: 60, background: "linear-gradient(180deg,#ffffff,#e6e8f2)", boxShadow: "0 40px 60px rgba(60,65,110,.35), inset 0 -10px 0 #cfd3e2" }}><div style={{ padding: 22, borderRadius: 34, background: "#c9cde0", display: "grid", gridTemplateColumns: "140px 140px 140px", gridAutoRows: "140px", gap: 18 }}>
		<Key l="关闭" /><Key l="标准" /><Key l="高级" />
		<Key l="Fn" c="#9de8b4" p={p} /><Key l="⇧" c="#f6a6ec" /><div style={{ gridRow: "span 2", gridColumn: "3" }}><div style={{ width: 140, height: 298, borderRadius: 20, background: "#f4f5fa", boxShadow: "0 8px 0 rgba(150,155,175,.7)" }} /></div>
		<Key l="Alt" c="#f7a99a" /><Key l="说完" w={140} /></div></div></Mid></Bg> }

// ---------- 5.0–7.13: widget collage on grey ----------
const W: React.FC<{ x: number; y: number; w: number; h: number; r?: number; bg?: string; children?: React.ReactNode }> = ({ x, y, w, h, r = 40, bg = "#0b0b0b", children }) =>
	<div style={{ position: "absolute", left: x, top: y, width: w, height: h, borderRadius: r, background: bg, overflow: "hidden", color: "#fff", fontFamily: CJK }}>{children}</div>
const Widgets: React.FC<{ t: number }> = ({ t }) => { const a = (t - C[4]) * 0.8, on = t > 6.1
	return <Bg c="#c3c4c8"><div style={{ position: "absolute", left: 236, top: 135, width: 1450, height: 820 }}>
		<W x={0} y={0} w={250} h={250} r={125}>{[0, 1].map((i) => <div key={i} style={{ position: "absolute", left: 123, top: 40 + i * 30, width: 6, height: 85 - i * 30, background: i ? "#f33" : "#fff", transformOrigin: "50% 100%", transform: `rotate(${a * (i ? 360 : 30) + 60}deg)`, borderRadius: 3 }} />)}</W>
		<W x={290} y={0} w={110} h={250} r={55} bg="#fff"><div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 120, background: "#0b0b0b" }} /><div style={{ position: "absolute", left: 40, top: 30, fontSize: 30, color: "#000" }}>☀</div></W>
		<W x={430} y={0} w={110} h={110} r={55}><Mid><span style={{ fontSize: 34 }}>☾</span></Mid></W><W x={430} y={140} w={110} h={110} r={55}><Mid><Wave t={t} n={4} h={30} color="#fff" live /></Mid></W>
		<W x={570} y={0} w={500} h={250}><div style={{ position: "absolute", left: 40, top: 30, fontSize: 44, fontWeight: 700 }}>会议记录</div><div style={{ position: "absolute", left: 40, top: 100, fontSize: 24, color: "#aaa" }}>多人逐字稿 · 总结 · 待办</div>
			<div style={{ position: "absolute", left: 40, top: 160, display: "flex", gap: 30 }}>{["说话人 1", "说话人 2", "说话人 3"].map((s) => <span key={s} style={{ fontSize: 20, color: "#ccc" }}>● {s}</span>)}</div></W>
		<W x={1110} y={0} w={330} h={420} bg="#fff"><div style={{ position: "absolute", left: 65, top: -110, width: 200, height: 200, borderRadius: 100, background: "repeating-radial-gradient(#111 0 6px, #222 6px 12px)", transform: `rotate(${a * 90}deg)` }} /><div style={{ position: "absolute", left: 0, right: 0, top: 130, textAlign: "center", fontSize: 30, color: "#111", fontWeight: 700 }}>开口就好</div>
			<div style={{ position: "absolute", left: 0, right: 0, top: 180, textAlign: "center", fontSize: 22, color: "#666" }}>按一次 Fn</div><div style={{ position: "absolute", left: 50, top: 260, width: 230, height: 8, borderRadius: 4, background: "#ddd" }}><div style={{ width: `${30 + 40 * clamp01(a / 1.7)}%`, height: 8, borderRadius: 4, background: "#3b7bff" }} /></div></W>
		<W x={0} y={290} w={110} h={250} r={55} bg="#fff"><div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 120, background: "#0b0b0b" }} /><div style={{ position: "absolute", left: 38, top: 30, fontSize: 30, color: "#000" }}>♪</div></W>
		<W x={140} y={290} w={110} h={110} r={55}><Mid><span style={{ fontSize: 30 }}>🔔</span></Mid></W><W x={140} y={430} w={110} h={110} r={55}><Mid><span style={{ width: 40, height: 40, borderRadius: 20, border: "6px solid #e33" }} /></Mid></W>
		<W x={290} y={290} w={250} h={250}><div style={{ position: "absolute", left: 0, right: 0, top: 30, textAlign: "center", fontSize: 20, color: "#aaa" }}>润色档位</div><div style={{ position: "absolute", left: 0, right: 0, top: 70, textAlign: "center", fontSize: 50, fontWeight: 700 }}>标准</div>
			<div style={{ position: "absolute", left: 30, top: 160, display: "flex", gap: 8 }}>{[0, 1, 2].map((i) => <span key={i} style={{ width: 56, height: 56, borderRadius: 10, background: i < 2 ? "#3ee07a" : "#1d4d2c" }} />)}</div></W>
		<W x={570} y={290} w={240} h={110} r={55} bg="#000"><div style={{ position: "absolute", left: 10, top: 10, width: 110, height: 90, borderRadius: 45, background: on ? "#222" : "#fff", color: on ? "#888" : "#000", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>关闭</div><div style={{ position: "absolute", right: 10, top: 10, width: 110, height: 90, borderRadius: 45, background: on ? "#fff" : "#222", color: on ? "#000" : "#888", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>开启</div></W>
		<W x={570} y={430} w={240} h={110} r={55} bg="#fff"><div style={{ position: "absolute", left: 20, top: 20, width: 70, height: 70, borderRadius: 35, border: "4px solid #000", display: "flex", alignItems: "center", justifyContent: "center", color: "#000", fontSize: 26 }}>Ⅱ</div><div style={{ position: "absolute", left: 110, top: 30 }}><Wave t={t} n={9} h={50} color="#000" live /></div></W>
		<W x={840} y={250} w={250} h={250} r={125}><div style={{ position: "absolute", left: 105, top: 30, width: 0, height: 0, borderLeft: "20px solid transparent", borderRight: "20px solid transparent", borderBottom: "36px solid #fff", transformOrigin: "20px 95px", transform: `rotate(${Math.sin(a * 2) * 40}deg)` }} />{Array.from({ length: 24 }, (_, i) => <span key={i} style={{ position: "absolute", left: 123 + 105 * Math.sin(i / 24 * Math.PI * 2), top: 123 - 105 * Math.cos(i / 24 * Math.PI * 2), width: 4, height: 4, background: "#666" }} />)}</W>
		<W x={1110} y={460} w={330} h={80} r={40}><div style={{ position: "absolute", left: 40, top: 20, fontSize: 28 }}>☾ 热词 · 已启用</div></W>
		<W x={0} y={580} w={250} h={240} r={30}><div style={{ position: "absolute", left: 24, top: 20, fontSize: 22, color: "#aaa" }}>待办</div>{COPY.todos.map((s, i) => <div key={s} style={{ position: "absolute", left: 24, top: 66 + i * 46, fontSize: 20, color: "#ddd" }}><span style={{ color: "#ff4fd8" }}>●</span> {s}</div>)}<div style={{ position: "absolute", left: 24, bottom: 20, width: 200, height: 8, borderRadius: 4, background: "#ff4fd8" }} /></W>
		<W x={290} y={580} w={250} h={240} r={125}><div style={{ position: "absolute", left: 0, right: 0, top: 50, textAlign: "center", fontSize: 18, color: "#aaa" }}>说话中</div><div style={{ position: "absolute", left: 0, right: 0, top: 80, textAlign: "center", fontSize: 40, fontWeight: 700 }}>Fn</div><div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 100 + 15 * Math.sin(a * 3), background: "#3b8bff", borderRadius: "40% 40% 0 0" }} /></W>
		<W x={570} y={580} w={240} h={240} r={30}><div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 40, background: "#3b9bff" }} /><div style={{ position: "absolute", left: 0, right: 0, top: 30, height: 40, background: "#f5c518" }} /><div style={{ position: "absolute", left: 0, right: 0, top: 60, height: 80, background: "#c0262e" }} /><div style={{ position: "absolute", left: 20, top: 160, fontSize: 18, color: "#aaa" }}>邮件</div><div style={{ position: "absolute", left: 20, top: 190, fontSize: 24, fontWeight: 700 }}>完整专业</div></W>
		<W x={840} y={540} w={600} h={280} r={30} bg="#fff"><div style={{ position: "absolute", left: 30, top: 30, fontSize: 22, color: "#666" }}>周三</div><div style={{ position: "absolute", left: 30, top: 70, fontSize: 56, color: "#111" }}>10:03</div><div style={{ position: "absolute", left: 30, bottom: 30, fontSize: 20, color: "#666" }}>● 会议</div>
			{COPY.meeting.slice(0, 2).map(([a, b, c], i) => <div key={b} style={{ position: "absolute", left: 230, top: 30 + i * 120, width: 340, height: 100, borderRadius: 12, background: "#0b0b0b", padding: "14px 18px", boxSizing: "border-box" }}><div style={{ fontSize: 20 }}>{a}</div><div style={{ fontSize: 16, color: "#999", marginTop: 6 }}>{b} · {c.slice(0, 10)}…</div></div>)}<div style={{ position: "absolute", left: 200, top: 152, width: 400, height: 2, background: "#e33" }} /></W>
	</div></Bg> }

// ---------- 7.13–8.53: pixel line with reversed highlight ----------
const Canvas: React.FC<{ t: number; band: number }> = ({ t, band }) =>
	<Bg c="#000">{band >= 0 && <div style={{ position: "absolute", left: band ? 1012 : 1468, top: 0, width: 238, height: 1080, background: "#fafafa" }} />}
		<div style={{ position: "absolute", left: 0, right: 0, top: 466, display: "flex", justifyContent: "center", alignItems: "center", mixBlendMode: band >= 0 ? "difference" : undefined }}>
			<Pix s="一个键，" size={96} /><span style={{ position: "relative", padding: "0 6px", background: band >= 0 ? "transparent" : "#fff" }}><Pix s="两种用法" size={96} c={band >= 0 ? "#fff" : "#000"} />
				{band < 0 && <span style={{ position: "absolute", left: 12, top: 12, right: -12, bottom: -12, border: "3px solid #fff" }} />}</span></div></Bg>

// ---------- 8.53–9.3: isometric wireframe key ----------
const Iso: React.FC<{ t: number }> = ({ t }) => { const k = (t - C[9]) / (C[10] - C[9])
	const cube = (x: number, y: number, s: number, o: number, key?: boolean) => <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}><path d="M0 -60 L104 0 L0 60 L-104 0 Z M-104 0 v110 L0 170 L104 110 V0 M0 60 V170" fill={key ? "rgba(255,255,255,.12)" : "none"} />{key && <text x={-30} y={18} fontFamily={PIX} fontSize={48} fill="#111" stroke="none" transform="skewY(30) scale(1 .85)">Fn</text>}</g>
	return <Bg c="#c4c4c4"><svg width={1920} height={1080} style={{ position: "absolute" }} fill="none" stroke="#777" strokeWidth={2}>
		<path d="M-200 300 L1400 1220 M200 -100 L2100 1000 M900 -200 L2300 600 M-300 760 L800 120" stroke="#9a9a9a" />
		{Array.from({ length: 6 }, (_, i) => cube(1060 + i * 210 - k * 100, 400 - i * 120 + k * 60, 1, 0.75 - i * 0.1))}
		<ellipse cx={640} cy={650} rx={150} ry={60} fill="rgba(0,0,0,.18)" stroke="none" /><g stroke="#111" strokeWidth={4}>{cube(640, 410, 1.4, 1, true)}</g></svg>
		<div style={{ position: "absolute", left: 40, top: 40, fontFamily: CJK, fontSize: 38, color: "#111" }}>快捷键</div><div style={{ position: "absolute", left: 40, top: 92, fontFamily: CJK, fontSize: 20, color: "#555" }}>macOS · Windows</div>
		<div style={{ position: "absolute", left: 40, bottom: 40, display: "flex", gap: 16 }}>{["Fn", "Fn + Shift", "Right Alt", "Alt + M"].map((s, i) => <div key={s} style={{ width: i === 3 ? 240 : 130, height: 130, borderRadius: 24, background: i === 0 ? "#000" : i === 3 ? "#9a9a9a" : "transparent", border: i === 1 || i === 2 ? "2px solid #444" : undefined, color: i === 0 ? "#fff" : "#111", fontFamily: CJK, fontSize: 20, display: "flex", alignItems: "flex-end", padding: 16, boxSizing: "border-box" }}>{s}</div>)}</div></Bg> }

// ---------- 9.3–11.07: pixel menu ----------
const MENU = ["语音输入", "场景", "润色", "热词", "会议", "待办"]
const Menu: React.FC<{ t: number }> = ({ t }) => { const mv = (a: number) => inOut(clamp01((t - a) / 0.2)), h = 1 + mv(M.m1) + mv(M.m2), sc = (h - 1) * 0.9, hi = Math.round(h)
	const Y = (k: number) => 190 + (k - sc) * 214
	return <Bg c="#000">{MENU.map((s, k) => <div key={s} style={{ position: "absolute", left: 337, top: Y(k), width: 1246, height: 176, boxSizing: "border-box", border: `3px solid ${k === hi ? "#fff" : "#2a2a2a"}`, display: "flex", alignItems: "center", paddingLeft: 60 }}><Pix s={s} size={96} c="#3a3a3a" /></div>)}
		<div style={{ position: "absolute", left: 347, top: Y(h) + 10, width: 600, height: 156, background: "#fff", overflow: "hidden" }}>{MENU.map((s, k) => <div key={s} style={{ position: "absolute", left: 50, top: Y(k) - Y(h) + 3, height: 150, display: "flex", alignItems: "center" }}><Pix s={s} size={96} c="#000" /></div>)}</div></Bg> }

// ---------- 11.07–13.33: fanned card stack ----------
const Fan: React.FC<{ t: number }> = ({ t }) => { const f = (m: number) => clamp01((t - m) / 0.7)
	return <Bg c="#000"><div style={{ position: "absolute", left: 1000, top: 560, perspective: 1400, transform: "scale(1.45)" }}>{Array.from({ length: 9 }, (_, k) => { const top = k === 8, fl = top ? out(f(M.flip)) - out(f(M.flip2)) * 0 : 0
		return <div key={k} style={{ position: "absolute", left: -470 + k * 52 + (top ? 120 * fl : 0), top: -160 - (top ? 60 * fl : 0), width: 300, height: 300, borderRadius: 40, border: "5px solid #eee", background: top ? "linear-gradient(135deg,#444,#111)" : "#000", transform: `rotateY(${-55 + (top ? 40 * fl : 0)}deg) rotateZ(${-8 + (top ? 22 * fl : 0)}deg) skewY(-6deg)`, boxShadow: "0 0 0 2px #000" }} /> })}</div></Bg> }

// ---------- 13.33–15.37: colour shapes ----------
const Shapes: React.FC<{ t: number }> = ({ t }) => { const a = t - C[12]
	const S: [number, number, number, string, string, number][] = [[60, 30, 150, "#1f5cff", "sq", 20], [210, -20, 210, "#ff4545", "sq", 25], [400, 160, 130, "#ff9f0a", "sq", 30], [560, -40, 240, "#ff9f0a", "sq", -6], [500, 40, 50, "#1f5cff", "ci", 0], [700, 40, 90, "#1f5cff", "ci", 0], [1000, 40, 110, "#1f5cff", "ci", 0], [820, 120, 140, "#1f5cff", "pill", -40],
		[100, 220, 180, "#1f5cff", "sq", 15], [0, 330, 220, "#ff4545", "sq", -20], [200, 340, 110, "#1f5cff", "ci", 0], [1300, 240, 150, "#1f5cff", "ci", 0], [1160, 180, 200, "#19d2b8", "sq", -18], [1360, 270, 300, "#1f5cff", "sq", 30], [400, 400, 120, "#1f5cff", "ci", 0], [470, 420, 140, "#19d2b8", "sq", 20], [520, 420, 150, "#1f5cff", "pill", 0], [640, 380, 140, "#1f5cff", "ci", 0], [200, 520, 150, "#1f5cff", "sq", 0], [1700, 60, 140, "#19d2b8", "sq", 20], [1650, 420, 160, "#1f5cff", "sq", -12]]
	return <Bg c="#e6e6e8"><div style={{ position: "absolute", left: 0, top: 0, transform: "scale(1.875)", transformOrigin: "0 0" }}>{S.map(([x, y, s, c, k, r], i) => <div key={i} style={{ position: "absolute", left: x * 0.55 + Math.sin(a * 0.8 + i) * 8, top: y + Math.cos(a * 0.7 + i) * 8, width: k === "pill" ? s : s * 0.55, height: k === "pill" ? 18 : s * 0.55, borderRadius: k === "ci" || k === "pill" ? 999 : 14, background: c, transform: `rotate(${r + a * 6 * (i % 2 ? 1 : -1)}deg)`, boxShadow: `0 12px 24px ${c}55` }} />)}</div>
		<Mid><Pix s="热词" size={120} c="#000" /></Mid></Bg> }

// ---------- 15.37–16.63: echoing pixel word ----------
const Echo: React.FC<{ t: number; s?: number }> = ({ t, s = 1 }) => { const a = (t - C[13]) * 1.2
	return <div style={{ position: "relative", width: 1920, height: 1080, transform: `scale(${s})`, transformOrigin: "0 0" }}><div style={{ position: "absolute", inset: 0, perspective: 1200 }}>{Array.from({ length: 16 }, (_, k) => { const d = (k - 8) * 26
		return <div key={k} style={{ position: "absolute", left: 0, right: 0, top: 440 + d * 0.9, textAlign: "center", opacity: k === 8 ? 1 : 0.16, transform: `rotateY(${Math.sin(a) * 18}deg) rotateX(${20 + Math.cos(a) * 10}deg) translateZ(${-Math.abs(k - 8) * 30}px) translateX(${d * Math.sin(a) * 1.2}px)`, filter: k === 8 ? undefined : "blur(1px)" }}><Pix s="会议记录" size={192} c={k === 8 ? "#fff" : "none"} style={k === 8 ? undefined : { WebkitTextStroke: "2px #fff" } as React.CSSProperties} /></div> })}</div></div> }

// ---------- 16.63–22.57: dark board ----------
const Frame: React.FC<{ x: number; y: number; w: number; h: number; label: string; children?: React.ReactNode; bg?: string }> = ({ x, y, w, h, label, children, bg = "#000" }) =>
	<div style={{ position: "absolute", left: x, top: y, width: w, height: h }}><div style={{ position: "absolute", left: 0, top: -30, fontFamily: CJK, fontSize: 18, color: "#777" }}>▣ {label}</div><div style={{ position: "absolute", inset: 0, background: bg, overflow: "hidden" }}>{children}</div></div>
const Arrows: React.FC<{ t: number; cx: number; cy: number }> = ({ t, cx, cy }) => <>{Array.from({ length: 7 * 14 }, (_, k) => { const x = 60 + (k % 14) * 90, y = 60 + Math.floor(k / 14) * 80, ang = Math.atan2(cy - y, cx - x)
	return <div key={k} style={{ position: "absolute", left: x, top: y, width: 34, height: 6, background: "#a04bff", transform: `rotate(${ang}rad)`, boxShadow: "0 0 6px #7a2bff" }}><span style={{ position: "absolute", right: -4, top: -6, width: 0, height: 0, borderLeft: "12px solid #a04bff", borderTop: "9px solid transparent", borderBottom: "9px solid transparent" }} /></div> })}</>
const BOARD = (t: number): React.ReactNode[] => [
	<Frame key="a" x={0} y={0} w={1600} h={900} label="会议记录"><Echo t={t} s={1600 / 1920} /></Frame>,
	<Frame key="b" x={-1760} y={0} w={1600} h={900} label="线条动画"><div style={{ transform: `scale(${1600 / 1920})`, transformOrigin: "0 0" }}><Lines t={C[1] + 0.3} /></div></Frame>,
	<Frame key="c" x={1760} y={0} w={1600} h={900} label="热词" bg="#e6e6e8"><div style={{ transform: `scale(${1600 / 1920})`, transformOrigin: "0 0" }}><Shapes t={C[12] + 0.5} /></div></Frame>,
	<Frame key="d" x={0} y={-1060} w={1600} h={900} label="场景图标"><div style={{ transform: `scale(${1600 / 1920})`, transformOrigin: "0 0" }}><Icons t={1.0} /></div></Frame>,
	<Frame key="e" x={1760} y={-1060} w={1600} h={900} label="组件" bg="#c3c4c8"><div style={{ transform: `scale(${1600 / 1920})`, transformOrigin: "0 0" }}><Widgets t={6.0} /></div></Frame>,
	<Frame key="f" x={-1760} y={-1060} w={1600} h={900} label="按键" bg="#9ea3c4"><div style={{ transform: `scale(${1600 / 1920})`, transformOrigin: "0 0" }}><Keypad t={0} /></div></Frame>,
	<Frame key="g" x={0} y={1060} w={1600} h={900} label="跟随光标"><Arrows t={t} cx={800} cy={450} /></Frame>,
	<Frame key="h" x={1760} y={1060} w={1600} h={900} label="菜单"><div style={{ transform: `scale(${1600 / 1920})`, transformOrigin: "0 0" }}><Menu t={C[10] + 0.4} /></div></Frame>,
	<Frame key="i" x={-1760} y={1060} w={1600} h={900} label="会议 HUD"><div style={{ transform: `scale(${1600 / 1920})`, transformOrigin: "0 0" }}><Hud t={C[2] + 0.5} /></div></Frame>,
]
const Chrome = () => <>
	<div style={{ position: "absolute", left: 14, top: 14, width: 290, bottom: 14, borderRadius: 18, background: "#1b1b1e", boxShadow: "inset 0 0 0 1px #2a2a2e", fontFamily: CJK, color: "#ccc", fontSize: 18 }}>
		<div style={{ padding: "18px 20px", borderBottom: "1px solid #2a2a2e" }}>MosMos</div><div style={{ padding: "14px 20px", color: "#777" }}>场景</div>
		{SCENES.map((s, k) => <div key={s} style={{ padding: "10px 34px", color: k === 0 ? "#fff" : "#999" }}>▣ {s}</div>)}<div style={{ padding: "18px 20px 10px", color: "#777" }}>热词</div>
		{["Figma", "Nimbus", "林清禾", "MosMos"].map((s) => <div key={s} style={{ padding: "10px 34px", color: "#999" }}>◇ {s}</div>)}<div style={{ padding: "18px 20px 10px", color: "#777" }}>会议</div>
		{["多人逐字稿", "会议总结", "待办事项"].map((s) => <div key={s} style={{ padding: "10px 34px", color: "#999" }}>▤ {s}</div>)}</div>
	<div style={{ position: "absolute", left: 1616, top: 14, width: 290, height: 360, borderRadius: 18, background: "#1b1b1e", boxShadow: "inset 0 0 0 1px #2a2a2e", fontFamily: CJK, color: "#ccc", fontSize: 18 }}>
		<div style={{ display: "flex", alignItems: "center", gap: 10, padding: "16px 20px" }}><span style={{ width: 30, height: 30, borderRadius: 15, background: "#3b7bff" }} /><span style={{ flex: 1 }} /><span style={{ padding: "6px 16px", borderRadius: 8, background: "#5b4cff", color: "#fff" }}>Fn</span></div>
		<div style={{ padding: "10px 20px", color: "#777" }}>场景</div><div style={{ padding: "4px 20px" }}>自动识别 · 可手动切换</div><div style={{ padding: "16px 20px 6px", color: "#777" }}>润色</div>
		<div style={{ display: "flex", gap: 6, padding: "4px 20px" }}>{["关闭", "标准", "高级"].map((s, k) => <span key={s} style={{ flex: 1, textAlign: "center", padding: "6px 0", borderRadius: 6, background: k === 1 ? "#5b4cff" : "#2a2a2e", color: k === 1 ? "#fff" : "#999" }}>{s}</span>)}</div>
		<div style={{ padding: "16px 20px 6px", color: "#777" }}>快捷键</div><div style={{ padding: "4px 20px" }}>Fn · Fn + Shift</div></div>
	<div style={{ position: "absolute", left: 800, top: 14, height: 44, padding: "0 16px", borderRadius: 12, background: "#1b1b1e", display: "flex", gap: 22, alignItems: "center", color: "#aaa", fontSize: 20 }}>{["▸", "▢", "◯", "T", "✎", "⌘"].map((s, k) => <span key={k} style={{ color: k === 0 ? "#7c6cff" : undefined }}>{s}</span>)}</div></>
const CAM: [number, number, number, number][] = [[16.633, 0.82, 800, 450], [17.7, 0.77, 800, 450], [17.7, 0.5, 1240, 70], [17.8, 0.42, 1300, 0], [18.067, 0.42, 1300, 0], [18.067, 0.36, 300, -20], [19.067, 0.36, 300, -20], [19.067, 0.2, 800, -100], [19.8, 0.2, 800, -100], [19.8, 0.82, 800, 1510], [21.75, 0.82, 800, 1510], [22.5, 0.17, 800, 450]]
const Board: React.FC<{ t: number }> = ({ t }) => { let s = 0.82, x = 800, y = 450
	for (let k = 0; k < CAM.length - 1; k++) { const [t0, s0, x0, y0] = CAM[k], [t1, s1, x1, y1] = CAM[k + 1]; if (t + 0.002 >= t0 && t + 0.002 < t1) { const u = t1 > t0 ? inOut(clamp01((t + 0.002 - t0) / (t1 - t0))) : 1; s = s0 + (s1 - s0) * u; x = x0 + (x1 - x0) * u; y = y0 + (y1 - y0) * u } }
	if (t >= 22.5) { s = 0.17 }
	const cur: [number, number] = t >= 19.8 && t < 21.75 ? [800 + 520 * Math.sin((t - 19.8) * 2.2), 1510 + 280 * Math.sin((t - 19.8) * 3.1 + 1)] : [1100, 700]
	const board = BOARD(t).map((n, k) => k === 6 ? <Frame key="g" x={0} y={1060} w={1600} h={900} label="跟随光标"><Arrows t={t} cx={cur[0]} cy={cur[1] - 1060} /></Frame> : n)
	return <Bg c="#121214"><div style={{ position: "absolute", left: 0, top: 0, transform: `translate(${960 - x * s}px, ${560 - y * s}px) scale(${s})`, transformOrigin: "0 0" }}>{board}
		{t >= 19.8 && t < 21.75 && <div style={{ position: "absolute", left: cur[0], top: cur[1], width: 22, height: 22, borderRadius: 11, background: "#fff" }} />}</div>
		{t >= C[14] && t < 17.6 && <Cursor x={1100} y={760} s={0.9} />}<Chrome /></Bg> }
const Dots: React.FC = () => <Bg c="#121214"><div style={{ position: "absolute", left: 400, top: 250, width: 1120, height: 600, background: "#eef1f8", boxShadow: "0 0 0 2px #5b4cff" }}><Mid>{["#ff3d5a", "#ff4f8f", "#ff6bd0", "#ff7aef", "#9a6bff", "#4f7bff"].map((c, k) => <span key={c} style={{ position: "absolute", left: 270 + k * 100, top: 240, width: 130, height: 130, borderRadius: 65, background: c }} />)}</Mid></div><Chrome /></Bg>

// ---------- end ----------
const Logo: React.FC<{ t: number; size: number; col: boolean }> = ({ t, size, col }) => <div style={{ position: "relative", width: size, height: size }}><LogoPixels size={size} t={t} mode="static" invert />
	{col && <div style={{ position: "absolute", inset: -2, background: "conic-gradient(from 200deg, #ff4fd8, #3b7bff, #33d1c4, #f5c518, #ff4fd8)", mixBlendMode: "multiply" }} />}</div>
const End: React.FC<{ t: number }> = ({ t }) => {
	if (t < M.logo) { const g = t >= M.glitch && t < M.col ? 1 - (t - M.glitch) / (M.col - M.glitch) * 0.6 : 0
		return <Bg c="#000"><Word t={t} t0={C[20]} col={t >= M.glitch ? 1 : 0} size={t < M.glitch ? 72 : 96} glitch={g} /></Bg> }
	if (t < M.by) return <Bg c="#000"><Mid><Logo t={t} size={t < M.lc ? 72 : 96} col={t >= 23.75} /></Mid></Bg>
	return <Bg c="#000"><Mid><Pix s="开口就好" size={72} /></Mid></Bg>
}
const Ball: React.FC<{ t: number }> = ({ t }) => { const p = clamp01((t - M.ball) / 0.45)
	return <Bg c="#000"><Mid><div style={{ position: "relative", width: 200, height: 200, borderRadius: 100, overflow: "hidden", background: "conic-gradient(from 210deg, #ff4fd8, #7a5cff, #3b7bff, #33d1c4, #f5c518, #ff4fd8)", filter: p < 1 ? `blur(${(1 - p) * 6}px)` : undefined, transform: `scale(${0.9 + 0.1 * out(p)})` }}>
		<div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}><LogoPixels size={110} t={t} mode="static" invert /></div></div></Mid></Bg> }

export const Film: React.FC = () => {
	const t = useT(), i = C.filter((c) => t + 0.002 >= c).length
	switch (i) {
		case 0: return <Bg c="#000"><Word t={t} t0={0} col={t > 0.2 ? 1 : 0} size={t < 0.2 ? 96 : t < 0.45 ? 144 : 216} /></Bg>
		case 1: return <Icons t={t} />
		case 2: return <Lines t={t} />
		case 3: return <Hud t={t} />
		case 4: return <Keypad t={t} />
		case 5: return <Widgets t={t} />
		case 6: return <Canvas t={t} band={-1} />
		case 7: return <Canvas t={t} band={0} />
		case 8: return <Canvas t={t} band={-1} />
		case 9: return <Canvas t={t} band={1} />
		case 10: return <Iso t={t} />
		case 11: return <Menu t={t} />
		case 12: return <Fan t={t} />
		case 13: return <Shapes t={t} />
		case 14: return <Bg c="#000"><Echo t={t} /></Bg>
		case 15: case 16: case 17: case 18: case 19: return <Board t={t} />
		case 20: return <Dots />
		case 21: return <End t={t} />
		case 22: return <Bg c="#dcdcdc"><Mid><Pix s="mosmos.io" size={72} c="#000" /></Mid></Bg>
		default: return <Ball t={t} />
	}
}
