// Template 48 — structure of a 2025 voice-dictation intro film (screen recording with a webcam bubble, talking-head
// shots and a phone), MosMos content. Typing slowly in a chat box, a zoom-out to the desktop and back into a fresh
// chat where a long prompt is spoken instead; a talking-head intro; mail, team chat, hot words, a prompt builder and a
// code editor, each dictated with the MosMos pill and burned-in captions; talking-head shots with a phone held up
// ("iOS 即将上线"); settings with a scene picker; the website and the address bar; a dark lock-up.
// The presenter is a Pexels stock clip (see ASSETS.md); nothing of the reference's product, brand or people is used.
import React from "react"
import { AbsoluteFill, OffthreadVideo, Sequence, staticFile } from "remotion"
import { CJK, MONO, SANS, lerp, clamp01, inOut, out, useT, LogoPixels, Cursor, Wave, COPY } from "../_engine/src/mos"
import { SERIF } from "../_engine/src/kit"
import TL from "./timeline.json"

const M = TL.marks as Record<string, number>, C = TL.cuts as number[], CAP = TL.cap as [number, number, string][], FPS = 60
const X0 = 126 // the reference is 1668 px wide; all layout below is in reference pixels inside a centred 1668×1080 stage
const fade = (t: number, a: number, b: number, d = 0.25, d2 = d) => clamp01((t - a) / d) * clamp01((b - t) / d2)
const Abs: React.FC<{ x?: number; y?: number; w?: number; h?: number; style?: React.CSSProperties; children?: React.ReactNode }> = ({ x = 0, y = 0, w, h, style, children }) =>
	<div style={{ position: "absolute", left: x, top: y, width: w, height: h, ...style }}>{children}</div>
const Stage: React.FC<{ bg: string; children?: React.ReactNode; over?: React.ReactNode }> = ({ bg, children, over }) =>
	<AbsoluteFill style={{ background: bg, overflow: "hidden", fontFamily: CJK }}><div style={{ position: "absolute", left: X0, top: 0, width: 1668, height: 1080 }}>{children}</div>
		<div style={{ position: "absolute", left: X0, top: 0, width: 1668, height: 1080 }}>{over}</div></AbsoluteFill>
const Zoom: React.FC<{ s: number; ox: number; oy: number; blur?: number; children: React.ReactNode }> = ({ s, ox, oy, blur = 0, children }) =>
	<div style={{ position: "absolute", left: -X0, top: 0, width: 1920, height: 1080, transform: `translate(${ox + X0}px, ${oy}px) scale(${s}) translate(${-ox - X0}px, ${-oy}px)`, transformOrigin: "0 0", filter: blur > 0.2 ? `blur(${blur}px)` : undefined }}>
		<div style={{ position: "absolute", left: X0, top: 0, width: 1668, height: 1080 }}>{children}</div></div>

// ---------- presenter clip (Pexels, 25 fps, 34.9 s) ----------
const Talk: React.FC<{ t0: number; t1: number; off: number; style?: React.CSSProperties; mirror?: boolean; pos?: string }> = ({ t0, t1, off, style, mirror, pos = "50% 30%" }) =>
	<Sequence from={Math.round(t0 * FPS)} durationInFrames={Math.round((t1 - t0) * FPS) + 1} layout="none">
		<OffthreadVideo src={staticFile("t48-talk.mp4")} muted startFrom={Math.round(off * FPS)} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: pos, transform: mirror ? "scaleX(-1)" : undefined, ...style }} /></Sequence>
const Bubble: React.FC<{ t0: number; t1: number; off: number; x?: number; y?: number; w?: number; h?: number; r?: number }> = ({ t0, t1, off, x = 1231, y = 49, w = 381, h = 219, r = 50 }) =>
	<div style={{ position: "absolute", left: x, top: y, width: w, height: h, borderRadius: r, overflow: "hidden", boxShadow: "0 10px 30px rgba(0,0,0,.28)", background: "#333", zIndex: 40 }}>
		<Talk t0={t0} t1={t1} off={off} pos="50% 22%" style={{ transform: "scale(1.5)", transformOrigin: "50% 25%" }} /></div>
const Full: React.FC<{ t0: number; t1: number; off: number; s?: number; mirror?: boolean; blur?: number }> = ({ t0, t1, off, s = 1, mirror, blur = 0 }) =>
	<AbsoluteFill style={{ transform: `scale(${s})`, filter: blur ? `blur(${blur}px)` : undefined }}><Talk t0={t0} t1={t1} off={off} mirror={mirror} pos="50% 40%" /></AbsoluteFill>

// ---------- overlays ----------
const Caption: React.FC<{ t: number; y?: number; x?: number }> = ({ t, y = 906, x = 834 }) => { const c = CAP.find(([a, b]) => t >= a && t < b)
	if (!c) return null
	return <div style={{ position: "absolute", left: x, top: y, transform: "translate(-50%,-50%)", padding: "4px 14px", borderRadius: 6, background: "rgba(45,45,48,.78)", color: "#fff", fontSize: 36, fontFamily: CJK, whiteSpace: "nowrap", zIndex: 45 }}>{c[2]}</div> }
const Dict: React.FC<{ t: number; y?: number; x?: number; o?: number }> = ({ t, y = 970, x = 873, o = 1 }) => o <= 0 ? null :
	<div style={{ position: "absolute", left: x, top: y - 29, transform: "translateX(-50%)", opacity: o, zIndex: 44, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
		<div style={{ padding: "10px 24px", borderRadius: 30, background: "#0d0d0f", color: "#fff", fontSize: 26, display: "flex", alignItems: "center", gap: 12, whiteSpace: "nowrap" }}><span style={{ width: 12, height: 12, borderRadius: 6, background: "#ff5a5f" }} />MosMos 正在听…</div>
		<div style={{ padding: "8px 26px", borderRadius: 26, background: "#0d0d0f" }}><Wave t={t} live n={10} h={28} /></div></div>
const Cur: React.FC<{ x: number; y: number; down?: boolean; beam?: boolean }> = ({ x, y, down, beam }) => beam
	? <div style={{ position: "absolute", left: x - 10, top: y - 36, width: 20, height: 72, zIndex: 50 }}><svg width="20" height="72" viewBox="0 0 20 72"><path d="M3 3 H17 M10 3 V69 M3 69 H17" stroke="#000" strokeWidth="4" fill="none" /><path d="M3 3 H17 M10 3 V69 M3 69 H17" stroke="#fff" strokeWidth="1.5" fill="none" /></svg></div>
	: <Cursor x={x} y={y} s={2.7} down={down} />

// ---------- desktop chrome ----------
const MenuBar: React.FC<{ dark?: boolean; h?: number }> = ({ dark, h = 26 }) =>
	<Abs x={0} y={0} w={1668} h={h} style={{ background: dark ? "#2a2a2e" : "rgba(236,236,240,.92)", display: "flex", alignItems: "center", gap: 22, padding: "0 18px", fontSize: h * 0.55, color: dark ? "#ccc" : "#222", boxSizing: "border-box" }}>
		<b>MosMos</b><span>文件</span><span>编辑</span><span>显示</span><span>窗口</span><span>帮助</span><span style={{ flex: 1 }} /><span>周五 下午 4:21</span></Abs>
const Dock: React.FC<{ y?: number; s?: number }> = ({ y = 1020, s = 1 }) =>
	<Abs x={0} y={y} w={1668} h={60 * s} style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10 * s }}><div style={{ display: "flex", gap: 10 * s, padding: `${6 * s}px ${14 * s}px`, borderRadius: 18 * s, background: "rgba(40,40,46,.55)" }}>
		{["#5b8def", "#f2b134", "#3fbf7f", "#e4572e", "#9b6bff", "#2bb3c0", "#f07aa0", "#8a8f99", "#ffffff", "#ffcc4d", "#4a4f5a", "#6fcf97"].map((c, k) => <div key={k} style={{ width: 44 * s, height: 44 * s, borderRadius: 11 * s, background: c }} />)}</div></Abs>
const Browser: React.FC<{ url?: string; tab?: string; children?: React.ReactNode; top?: number }> = ({ url = "chat.example.com", tab = "新对话", children, top = 26 }) =>
	<Abs x={0} y={top} w={1668} h={1080 - top} style={{ background: "#fff" }}>
		<Abs x={0} y={0} w={1668} h={36} style={{ background: "#dfe3e8", display: "flex", alignItems: "center", gap: 8, padding: "0 14px" }}>{["#ff5f57", "#febc2e", "#28c840"].map((c) => <span key={c} style={{ width: 12, height: 12, borderRadius: 6, background: c }} />)}
			<span style={{ marginLeft: 20, padding: "6px 18px", borderRadius: "8px 8px 0 0", background: "#fff", fontSize: 15, color: "#333", marginTop: 6 }}>{tab}</span></Abs>
		<Abs x={0} y={36} w={1668} h={36} style={{ display: "flex", alignItems: "center", gap: 14, padding: "0 16px", fontSize: 15, color: "#555", borderBottom: "1px solid #eee" }}><span>←</span><span>→</span><span>↻</span>
			<span style={{ flex: 1, padding: "5px 14px", borderRadius: 16, background: "#f1f3f4", color: "#222" }}>{url}</span></Abs>
		<Abs x={0} y={72} w={1668} h={1080 - top - 72}>{children}</Abs></Abs>

// ---------- shot 1: chat page typed slowly, then a fresh chat spoken into ----------
const ChatPage: React.FC<{ title: string; text: string; ph?: string; caret?: boolean; sug?: string[]; y: number; x0: number; x1: number; h: number; fs: number; send?: boolean }> = ({ title, text, ph = "", caret, sug, y, x0, x1, h, fs, send }) => <>
	<Abs x={0} y={y - fs * 2.9} w={1668} style={{ textAlign: "center", fontSize: fs * 1.33, color: "#111", fontFamily: SANS }}>{title}</Abs>
	<Abs x={x0} y={y} w={x1 - x0} h={h} style={{ borderRadius: h / 2, border: "1px solid #e3e3e3", boxShadow: "0 4px 14px rgba(0,0,0,.06)", background: "#fff", display: "flex", alignItems: "center", padding: `0 ${h * 0.28}px`, boxSizing: "border-box", gap: h * 0.25 }}>
		<span style={{ fontSize: fs * 1.1, color: "#333" }}>＋</span><span style={{ flex: 1, fontSize: fs, color: text ? "#111" : "#9a9a9a", whiteSpace: "nowrap", overflow: "hidden" }}>{text || ph}{caret && <span style={{ borderLeft: "2px solid #111", marginLeft: 2 }} />}</span>
		<span style={{ fontSize: fs * 0.9, color: "#444" }}>🎙︎</span><span style={{ width: h * 0.62, height: h * 0.62, borderRadius: h, background: send ? "#111" : "#d9d9d9", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: fs * 0.9 }}>↑</span></Abs>
	{sug && <Abs x={x0 + 60} y={y + h + 18} w={x1 - x0 - 120}>{sug.map((s, k) => <div key={k} style={{ fontSize: fs * 0.72, color: "#888", padding: `${fs * 0.35}px 0`, borderBottom: "1px solid #f0f0f0" }}><span style={{ color: "#bbb" }}>{s.slice(0, 2)}</span>{s.slice(2)}</div>)}</Abs>}</>
const Shot1: React.FC<{ t: number }> = ({ t }) => {
	const typed = TL.typed as string, n = Math.floor(clamp01((t - M.ty0) / (M.ty1 - M.ty0)) * typed.length + 0.0001)
	const z = t < M.zo ? 2 : t < M.zi ? lerp(t, M.zo, M.swap - 0.05, 2, 1, inOut) : lerp(t, M.zi, M.zie, 1, 2, inOut)
	const fresh = t >= M.swap, sug = (t > M.sug1 && t < M.sug1e) ? ["怎么写周报？", "怎么安排这周的会？", "怎么回一封客户邮件？"] : (t > M.sug2 && t < M.sug2e) ? ["怎么把需求写成任务？", "怎么把需求讲给设计？", "怎么把需求拆小？"] : undefined
	const page = fresh ? <ChatPage title="准备好了，你说吧。" text={t >= M.paste1 ? "用 MosMos，长长的提示词也可以直接说出来。" : ""} ph="随便问点什么" y={265} x0={550} x1={1190} h={49} fs={18} send={t >= M.paste1} />
		: <ChatPage title="今天想问点什么？" text={typed.slice(0, n)} caret={Math.floor(t * 2) % 2 === 0 || n < typed.length} sug={sug} y={390} x0={466} x1={1240} h={57} fs={18} send={n > 0} />
	const bz = 1 + 0.42 * (t < M.swap ? lerp(t, M.zo, M.swap - 0.05, 0, 1, inOut) : 1 - lerp(t, M.zi, M.zie, 0, 1, inOut)), curX = fresh ? 520 : 368, curY = fresh ? 375 : 564
	return <Stage bg={z < 1.98 ? "#c9d3e6" : "#fff"} over={<><Bubble t0={C[0]} t1={C[1]} off={0} x={1612 - 381 * bz} w={381 * bz} h={219 * bz} /><Cur x={curX + (z < 1.98 ? 0 : 0)} y={curY} /><Dict t={t} o={fade(t, M.pill1, M.paste1 - 0.05, 0.15, 0.1)} /><Caption t={t} y={898} /></>}>
		<Zoom s={z} ox={834} oy={300}><div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg,#c9d3e6,#e6dff0)" }} /><MenuBar /><Browser tab={fresh ? "新对话" : "今天想问点什么"}>{null}</Browser>
			<Abs x={0} y={0} w={1668} h={1080}>{page}</Abs><Dock /></Zoom></Stage> }

// ---------- talking head + lower third ----------
const Lower: React.FC<{ t: number }> = ({ t }) => { const p = lerp(t, C[1] + 0.1, C[1] + 0.6, 0, 1)
	return <Abs x={0} y={560} w={1628} style={{ textAlign: "right", color: "#fff", opacity: p, transform: `translateX(${(1 - p) * 40}px)`, textShadow: "0 2px 12px rgba(0,0,0,.35)" }}>
		<div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 84 }}>MosMos</div><div style={{ fontSize: 46, fontWeight: 500, marginTop: 4 }}>让文字，重新从声音开始</div></Abs> }

// ---------- shot 3/4: mail ----------
const MailWin: React.FC<{ t: number; body: boolean }> = ({ t, body }) =>
	<Abs x={104} y={27} w={1524} h={990} style={{ background: "#fff", borderRadius: 14, boxShadow: "0 12px 40px rgba(0,0,0,.35)", overflow: "hidden", fontSize: 22, color: "#222" }}>
		<Abs x={0} y={0} w={1524} h={58} style={{ background: "#f2f6fc", display: "flex", alignItems: "center", padding: "0 26px", fontWeight: 600, boxSizing: "border-box" }}>首页改版 · 第一版方案</Abs>
		<Abs x={26} y={78} w={1470} style={{ paddingBottom: 14, borderBottom: "1px solid #eceff3" }}><span style={{ color: "#777" }}>收件人　</span>李经理</Abs>
		<Abs x={26} y={146} w={1470} style={{ paddingBottom: 14, borderBottom: "1px solid #eceff3" }}>首页改版 · 第一版方案</Abs>
		<Abs x={26} y={226} w={1100} style={{ lineHeight: 1.75 }}>{body ? <>{COPY.mail.slice(0, 3).map((l, k) => <div key={k} style={{ marginBottom: k === 1 ? 8 : 0 }}>{l}</div>)}<div style={{ height: 22 }} /></> : <div style={{ height: 44 }}><span style={{ borderLeft: "2px solid #222", opacity: Math.floor(t * 2) % 2 }} /></div>}
			<div style={{ marginTop: 30 }}>— 用 <span style={{ color: "#1a5fd0", textDecoration: "underline" }}>MosMos</span> 说出来的</div><div style={{ marginTop: 24 }}>小林</div><div>首页改版项目组</div></Abs>
		<Abs x={26} y={846} w={1000} style={{ display: "flex", gap: 26, color: "#555", fontSize: 22 }}>{["↶", "↷", "无衬线 ▾", "T", "B", "I", "U", "A", "≡", "•", "1.", "❝", "S̶"].map((s, k) => <span key={k}>{s}</span>)}</Abs>
		<Abs x={26} y={913} w={176} h={52} style={{ borderRadius: 26, background: "#0b57d0", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600 }}>发送</Abs></Abs>
const MailBg: React.FC = () => <><div style={{ position: "absolute", inset: 0, background: "#7a7b7d" }} />
	<Abs x={0} y={0} w={1668} h={70} style={{ background: "#6f7072" }} />{Array.from({ length: 9 }).map((_, k) => <Abs key={k} x={20} y={150 + k * 52} w={70} h={14} style={{ borderRadius: 7, background: "#8c8d90" }} />)}</>

// ---------- shot 5: team chat DM ----------
const DM: React.FC<{ t: number }> = ({ t }) => { const sent = t >= M.msg
	return <><Abs x={0} y={0} w={189} h={1080} style={{ background: "linear-gradient(180deg,#413f51,#32454d)" }} /><Abs x={189} y={0} w={1479} h={1080} style={{ background: "#fff" }} />
		<Abs x={234} y={88} w={238} h={241} style={{ borderRadius: 26, background: "#efe6d8", overflow: "hidden" }}><img src={staticFile("t16-p2-head.svg")} style={{ width: "100%", height: "100%", objectFit: "contain" }} /></Abs>
		<Abs x={498} y={152} style={{ fontSize: 42, fontWeight: 700, color: "#1d1c1d" }}>林清禾</Abs><Abs x={498} y={220} style={{ fontSize: 32, color: "#333" }}>品牌设计</Abs>
		<Abs x={234} y={372} w={1360} style={{ fontSize: 39, lineHeight: 1.55, color: "#1d1c1d" }}>这是你和 <span style={{ color: "#1264a3", background: "#e8f5fa", padding: "0 4px" }}>@林清禾</span> 的私信。热词里记着她的名字，说出来也不会写错。</Abs>
		<Abs x={231} y={530} w={251} h={78} style={{ border: "2px solid #c9c9c9", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, fontWeight: 600 }}>查看资料</Abs>
		<Abs x={234} y={654} w={1434} h={91} style={{ background: "#f8f8f8", borderRadius: "12px 0 0 0", border: "1px solid #e5e5e5", display: "flex", alignItems: "center", padding: "0 30px", fontSize: 28, color: "#555", gap: 18, boxSizing: "border-box" }}>🔔︎ 林清禾 暂停了通知</Abs>
		<Abs x={234} y={745} w={1434} h={300} style={{ border: "1px solid #ccc", borderTop: "none", boxSizing: "border-box" }}>
			<Abs x={30} y={30} style={{ display: "flex", gap: 46, fontSize: 32, color: "#555", fontWeight: 700 }}>{["B", "I", "S̶", "🔗︎", "≔", "1.", "</>", "❝"].map((s, k) => <span key={k}>{s}</span>)}</Abs>
			<Abs x={30} y={118} w={1300} style={{ fontSize: 34, color: sent ? "#1d1c1d" : "#8a8a8a" }}>{sent ? COPY.chatOut : "给 林清禾 发消息"}</Abs>
			<Abs x={30} y={208} style={{ display: "flex", gap: 40, fontSize: 32, color: "#555" }}>{["＋", "Aa", "☺", "@"].map((s, k) => <span key={k}>{s}</span>)}</Abs>
			<Abs x={1290} y={204} w={84} h={56} style={{ borderRadius: 10, background: sent ? "#007a5a" : "transparent", color: sent ? "#fff" : "#999", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, transform: Math.abs(t - M.send) < 0.08 ? "scale(.92)" : undefined }}>➤</Abs></Abs></> }

// ---------- shot 6: hot words ----------
const Hot: React.FC = () => <><div style={{ position: "absolute", inset: 0, background: "#fff" }} />
	<Abs x={270} y={22} style={{ fontSize: 40, fontWeight: 600 }}>热词</Abs><Abs x={1322} y={26} w={131} h={46} style={{ borderRadius: 8, background: "#111", color: "#fff", fontSize: 22, display: "flex", alignItems: "center", justifyContent: "center" }}>新建</Abs>
	<Abs x={270} y={126} style={{ display: "flex", gap: 34, fontSize: 22, color: "#888" }}><span style={{ color: "#111", borderBottom: "2px solid #111", paddingBottom: 8 }}>全部</span><span>已启用</span></Abs>
	<Abs x={270} y={230} w={1183} h={547} style={{ background: "#fdfbe6", border: "2px solid #efe9c0", borderRadius: 14 }}>
		<Abs x={56} y={40} style={{ fontFamily: SERIF, fontSize: 55, color: "#222" }}>难认的词，教一次就够了。</Abs>
		<Abs x={56} y={140} w={1050} style={{ fontSize: 24, lineHeight: 1.7, color: "#444" }}>{COPY.hotDesc}</Abs>
		{(COPY.hot.filter((h) => h[2]) as [string, string, boolean][]).map(([a, b], k) => <Abs key={k} x={56} y={240 + k * 69} style={{ display: "flex", gap: 22, alignItems: "center", fontSize: 24 }}>
			<span style={{ padding: "8px 18px", border: "1px solid #d8d4b8", borderRadius: 8, background: "#fff", width: 180 }}>{a}</span><span>→</span><span style={{ padding: "8px 18px", border: "1px solid #d8d4b8", borderRadius: 8, background: "#fff", width: 300 }}>{b}</span></Abs>)}
		<Abs x={56} y={468} w={186} h={50} style={{ borderRadius: 8, background: "#111", color: "#fff", fontSize: 22, display: "flex", alignItems: "center", justifyContent: "center" }}>加入热词</Abs></Abs>
	<Abs x={270} y={823} w={1183} h={231} style={{ border: "1px solid #e8e8e8", borderRadius: 14, overflow: "hidden" }}>{[["Figma", "英文专有词 · 优先识别"], ["Nimbus", "近音词 · 润色时保持原样"], ["林清禾", "人名 · 优先识别"]].map(([a, b], k) =>
		<div key={k} style={{ height: 77, display: "flex", alignItems: "center", gap: 26, padding: "0 30px", borderBottom: "1px solid #f0f0f0", fontSize: 24 }}><b style={{ width: 160 }}>{a}</b><span style={{ color: "#777" }}>{b}</span></div>)}</Abs></>

// ---------- shot 7/8: prompt builder ----------
const GRAD = "linear-gradient(180deg,#ffffff 0%,#d8e3f9 23%,#aaa6e2 62%,#f27993 90%,#f59a6a 100%)"
const Prompt: React.FC<{ t: number; long: boolean }> = ({ long }) => <><div style={{ position: "absolute", left: -X0, top: 0, width: 1920, height: 1080, background: GRAD }} />
	<Abs x={0} y={272} w={1668} style={{ textAlign: "center", fontSize: 62, fontWeight: 700, color: "#111" }}>想做点什么？说出来就行</Abs>
	<Abs x={0} y={364} w={1668} style={{ textAlign: "center", fontSize: 28, color: "#555" }}>提示词场景 · 要求明确</Abs>
	<Abs x={296} y={470} w={1131} h={long ? 361 : 211} style={{ borderRadius: 39, background: "rgba(255,255,255,.92)", boxShadow: "0 10px 30px rgba(60,40,120,.18)" }}>
		<Abs x={34} y={26} w={1060} style={{ fontSize: 26, color: long ? "#222" : "#9a9a9a", lineHeight: 1.5 }}>{long ? COPY.prompt.map((l, k) => <div key={k}>{l}</div>) : "描述你想做的东西…"}</Abs>
		<Abs x={30} y={long ? 300 : 150} style={{ display: "flex", gap: 18, fontSize: 22, color: "#444" }}><span>＋</span><span style={{ padding: "2px 14px", border: "1px solid #ddd", borderRadius: 16 }}>附件</span></Abs>
		<Abs x={1068} y={long ? 294 : 144} w={42} h={42} style={{ borderRadius: 21, background: long ? "#111" : "#bbb", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>↑</Abs></Abs></>

// ---------- shot 9: code editor ----------
const CODE = ["import { readFileSync } from \"fs\"", "", "export interface SearchResult {", "  file: string", "  line: number", "  text: string", "}", "", "export function findKeys(dir: string) {", "  const hits: SearchResult[] = []", "  // TODO: walk the project", "  return hits", "}", "", "export const config = {", "  root: \".\",", "  ignore: [\"node_modules\", \"dist\"],", "}"]
const Editor: React.FC<{ t: number }> = ({ t }) => { const asked = t >= 71.0, done = t >= M.cmd
	return <><div style={{ position: "absolute", left: -X0, top: 0, width: 1920, height: 1080, background: "#18191f" }} /><MenuBar dark h={24} />
		<Abs x={0} y={24} w={1668} h={36} style={{ background: "#1f2026", borderBottom: "1px solid #2a2b31" }} />
		<Abs x={0} y={60} w={326} h={960} style={{ background: "#1b1c21", borderRight: "1px solid #2a2b31", fontFamily: MONO, fontSize: 15, color: "#9aa0aa", padding: "16px 20px", boxSizing: "border-box", lineHeight: 1.9 }}>
			{["▾ src", "  api.ts", "  auth.ts", "  config.ts", "  search.ts", "▾ components", "  Button.tsx", "  Input.tsx", "▸ utils", "▸ tests", "package.json", "README.md"].map((s, k) => <div key={k} style={{ whiteSpace: "pre", color: k === 4 ? "#e6e6e6" : undefined }}>{s}</div>)}</Abs>
		<Abs x={326} y={60} w={944} h={960} style={{ fontFamily: MONO, fontSize: 16, color: "#c8ccd4", padding: "20px 0", lineHeight: 1.85 }}>{CODE.map((l, k) => <div key={k} style={{ whiteSpace: "pre" }}><span style={{ display: "inline-block", width: 56, textAlign: "right", marginRight: 22, color: "#555a66" }}>{k + 1}</span>
			<span style={{ color: l.startsWith("export") || l.startsWith("import") ? "#c792ea" : l.trim().startsWith("//") ? "#6a737d" : undefined }}>{l}</span></div>)}</Abs>
		<Abs x={1270} y={60} w={398} h={960} style={{ background: "#1c1d22", borderLeft: "1px solid #2a2b31", fontSize: 15, color: "#ddd" }}>
			<Abs x={18} y={14} style={{ fontWeight: 600 }}>新对话</Abs>
			<Abs x={14} y={50} w={370} h={150} style={{ borderRadius: 10, background: "#25262c", border: "1px solid #34353c" }}>
				<Abs x={10} y={10} style={{ display: "flex", gap: 6, fontSize: 12, color: "#9aa" }}>{["@ search.ts", "@ config.ts"].map((s) => <span key={s} style={{ padding: "1px 6px", borderRadius: 5, background: "#2f3138" }}>{s}</span>)}</Abs>
				<Abs x={10} y={38} w={350} style={{ fontSize: 15, lineHeight: 1.6, color: asked ? "#eee" : "#777" }}>{done ? <>已去掉口头禅，生成命令：<span style={{ fontFamily: MONO, padding: "1px 6px", borderRadius: 4, background: "#2f3a5a", color: "#cfe0ff" }}>{COPY.termCmd}</span><div style={{ color: "#8fa", marginTop: 4 }}>命令已生成 · 按 Enter 执行</div></> : asked ? COPY.termAsk : "说出你的需求…"}</Abs>
				<Abs x={10} y={122} style={{ fontSize: 12, color: "#889" }}>代码与终端 · 自动</Abs></Abs></Abs>
		<Dock y={1018} s={0.95} /></> }

// ---------- phone (iOS is not out yet: the screen says so) ----------
const Phone: React.FC<{ t: number; x: number; y: number; h: number; rot: number }> = ({ t, x, y, h, rot }) => { const w = h * 0.49
	return <div style={{ position: "absolute", left: x - w / 2, top: y - h / 2, width: w, height: h, borderRadius: w * 0.16, background: "#111", padding: w * 0.035, boxSizing: "border-box", transform: `rotate(${rot}deg)`, boxShadow: "0 30px 60px rgba(0,0,0,.45)", zIndex: 30 }}>
		<div style={{ width: "100%", height: "100%", borderRadius: w * 0.13, background: "linear-gradient(180deg,#eef2fb,#dfe6f6)", position: "relative", overflow: "hidden", fontFamily: CJK }}>
			<div style={{ position: "absolute", left: "50%", top: w * 0.04, width: w * 0.3, height: w * 0.08, borderRadius: w, background: "#111", transform: "translateX(-50%)" }} />
			<div style={{ position: "absolute", left: 0, right: 0, top: h * 0.26, display: "flex", flexDirection: "column", alignItems: "center", gap: h * 0.03 }}>
				<LogoPixels size={w * 0.3} t={t} mode="static" /><div style={{ fontFamily: SANS, fontWeight: 700, fontSize: w * 0.13, color: "#111" }}>MosMos</div>
				<div style={{ fontSize: w * 0.085, color: "#333", padding: `${w * 0.02}px ${w * 0.06}px`, borderRadius: w, background: "#fff" }}>{COPY.ios}</div>
				<div style={{ marginTop: h * 0.04, padding: `${w * 0.03}px ${w * 0.07}px`, borderRadius: w, background: "#111" }}><Wave t={t} live n={9} h={w * 0.09} /></div></div></div></div> }

// ---------- settings ----------
const Home: React.FC = () => <><div style={{ position: "absolute", left: -X0, top: 0, width: 1920, height: 1080, background: "#f8f7fa" }} />
	<Abs x={0} y={0} w={300} h={1080} style={{ background: "#f1f0f4", padding: "30px 26px", boxSizing: "border-box", fontSize: 22, lineHeight: 2.4, color: "#333" }}>
		<div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 20 }}><LogoPixels size={30} t={0} mode="static" /><b style={{ fontFamily: SANS }}>MosMos</b></div>{["首页", "场景", "润色", "热词", "会议记录"].map((s) => <div key={s}>{s}</div>)}</Abs>
	<Abs x={380} y={60} style={{ fontSize: 40, fontWeight: 600 }}>欢迎回来</Abs>
	<Abs x={380} y={150} w={1200} h={150} style={{ borderRadius: 16, background: "#fff", border: "1px solid #eee", padding: "30px 40px", boxSizing: "border-box" }}><div style={{ fontFamily: SERIF, fontSize: 36 }}>在任意输入框里，开口说</div><div style={{ fontSize: 22, color: "#777", marginTop: 10 }}>{COPY.steps[0].desc}</div></Abs>
	{COPY.meeting.map(([who, tm, s], k) => <Abs key={k} x={380} y={360 + k * 70} style={{ fontSize: 22, color: "#444", display: "flex", gap: 30 }}><span style={{ color: "#999" }}>{tm}</span><span>{s}</span></Abs>)}</>
const SetModal: React.FC = () => <Abs x={238} y={137} w={1205} h={802} style={{ background: "#fff", borderRadius: 26, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,.25)" }}>
	<Abs x={0} y={0} w={260} h={802} style={{ background: "#f7f7f8", padding: "30px 24px", boxSizing: "border-box", fontSize: 21, lineHeight: 2.3, color: "#333" }}>
		<div style={{ fontSize: 15, color: "#999" }}>设置</div>{["通用", "场景", "润色", "热词", "会议记录"].map((s, k) => <div key={s} style={{ background: k === 0 ? "#e9e9ec" : undefined, borderRadius: 8, padding: "0 12px" }}>{s}</div>)}</Abs>
	<Abs x={322} y={60} style={{ fontSize: 32, fontWeight: 600 }}>通用</Abs>
	<Abs x={322} y={131} w={824} h={325} style={{ borderRadius: 16, background: "#f7f7f8" }}>{[["快捷键", "按一次 Fn 开始说，再按一次写好"], ["会议记录", "Fn + Shift，记整场会"], ["场景", "自动识别 · 可手动切换"]].map(([a, b], k) =>
		<Abs key={k} x={0} y={k * 108} w={824} h={108} style={{ display: "flex", alignItems: "center", padding: "0 30px", boxSizing: "border-box", borderBottom: k < 2 ? "1px solid #ececef" : undefined }}>
			<div style={{ flex: 1 }}><div style={{ fontSize: 22, fontWeight: 600 }}>{a}</div><div style={{ fontSize: 19, color: "#777", marginTop: 6 }}>{b}</div></div>
			<span style={{ width: 208, height: 44, borderRadius: 8, background: "#ececef", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>更改</span></Abs>)}</Abs></Abs>
const PICK = ["自动识别", "飞书 / 微信", "邮件", "文档", "提示词", "代码与终端", "润色：关闭", "润色：标准", "润色：高级"]
const SceneModal: React.FC<{ t: number }> = ({ t }) => { const on = (k: number) => k === 0 || (k === 4 && t > 110.4) || (k === 7) || (k === 2 && t > 111.6)
	return <Abs x={303} y={216} w={1071} h={671} style={{ background: "#fff", borderRadius: 20, boxShadow: "0 20px 60px rgba(0,0,0,.3)", overflow: "hidden" }}>
		<Abs x={30} y={20} style={{ fontSize: 30, fontWeight: 600 }}>场景和润色</Abs><Abs x={30} y={66} style={{ fontSize: 20, color: "#777" }}>选择 MosMos 在你常用的地方怎么写</Abs>
		<Abs x={30} y={120} w={700} h={48} style={{ border: "1px solid #e3e3e3", borderRadius: 10, display: "flex", alignItems: "center", padding: "0 16px", fontSize: 19, color: "#999" }}>搜索场景</Abs>
		{PICK.map((s, k) => <Abs key={s} x={49 + (k % 3) * 228} y={198 + Math.floor(k / 3) * 70} w={212} h={52} style={{ borderRadius: 10, border: on(k) ? "2px solid #8f7ae6" : "1px solid #e6e6e8", background: on(k) ? "#f3f0ff" : "#fafafa", display: "flex", alignItems: "center", padding: "0 14px", fontSize: 19, boxSizing: "border-box" }}>{s}</Abs>)}
		<Abs x={759} y={170} style={{ fontSize: 18, color: "#777", lineHeight: 2.3 }}><div style={{ fontWeight: 600, color: "#333" }}>已选</div>{PICK.filter((_, k) => on(k)).map((s) => <div key={s}>{s}</div>)}</Abs>
		<Abs x={873} y={589} w={169} h={46} style={{ borderRadius: 10, background: "#111", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 19 }}>保存并关闭</Abs></Abs> }

// ---------- website ----------
const RIB = COPY.meeting.map((m) => m[2]).join("  ") + "  " + COPY.chatOut + "  " + COPY.todos.join("  ")
const Site: React.FC<{ t: number }> = ({ t }) => <><div style={{ position: "absolute", left: -X0, top: 0, width: 1920, height: 1080, background: "#2b2d33" }} /><MenuBar />
	<Browser url="mosmos.io" tab="MosMos · 开口就好"><div style={{ position: "absolute", inset: 0, background: "#fefde9" }} />
		<Abs x={0} y={58} w={1668} h={58} style={{ background: "#004e45", color: "#d9efe9", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>{COPY.platforms.join("　·　")}</Abs>
		<Abs x={330} y={175} w={1008} style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 18, color: "#333" }}><LogoPixels size={26} t={0} mode="static" /><b style={{ fontFamily: SANS, fontSize: 22 }}>MosMos</b><span style={{ flex: 1 }} /><span>场景</span><span>润色</span><span>热词</span><span>会议记录</span><span>下载</span></Abs>
		<Abs x={0} y={380} w={1668} style={{ textAlign: "center", fontFamily: SERIF, fontSize: 86, letterSpacing: "-0.02em" }}><span style={{ color: "#a9a69c" }}>我们本来就会说，</span><span style={{ color: "#111" }}>只是打字太久了。</span></Abs>
		<Abs x={434} y={520} w={800} style={{ textAlign: "center", fontSize: 23, fontWeight: 600, lineHeight: 1.5, color: "#222" }}>{COPY.meta}</Abs>
		<Abs x={720} y={606} w={228} h={49} style={{ borderRadius: 10, background: "#e6d8fb", border: "1px solid #c9b4f2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>下载 MosMos</Abs>
		<Abs x={0} y={680} w={1668} style={{ textAlign: "center", fontSize: 16, color: "#777" }}>{COPY.platforms.join(" · ")}</Abs>
		<svg style={{ position: "absolute", left: 0, top: 0 }} width={1668} height={1000}><defs><path id="rib" d="M 60 120 C -40 260, 160 420, 120 520 S 300 760, 700 790 S 1300 720, 1700 640" /></defs>
			<text fontSize={24} fill="#8a877c" fontFamily={CJK}><textPath href="#rib" startOffset={`${-60 + ((t - C[16]) * 3) % 40}%`}>{RIB}</textPath></text></svg></Browser><Dock /></>

// ---------- end ----------
const Bars: React.FC<{ h: number; t: number }> = ({ h, t }) => <div style={{ display: "flex", gap: h * 0.12, alignItems: "center", height: h }}>{[0.45, 0.8, 1, 0.8, 0.45].map((v, k) => <div key={k} style={{ width: h * 0.13, height: h * v * (0.85 + 0.15 * Math.sin(t * 6 + k)), borderRadius: h, background: "#fff" }} />)}</div>
const End: React.FC<{ t: number }> = ({ t }) => { const lg = t >= M.logo, up = lerp(t, M.url - 0.3, M.url + 0.4, 0, 1, inOut), s = 1 - 0.16 * up
	return <Stage bg="#171320">{t >= M.wave && !lg && <Abs x={0} y={489} w={1668} style={{ display: "flex", justifyContent: "center", opacity: lerp(t, M.wave, M.wave + 0.3, 0, 1) }}><Bars h={128} t={t} /></Abs>}
		{lg && <Abs x={0} y={515 - 65 * up} w={1668} style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 46, transform: `translate(0,-50%) scale(${s * lerp(t, M.logo, M.logo + 0.5, 0.9, 1)})` }}><LogoPixels size={190} t={t} mode="in" invert t0={M.logo} /><div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 150, color: "#fff", letterSpacing: "-0.02em" }}>MosMos</div></Abs>}
		<Abs x={0} y={580} w={1668} style={{ textAlign: "center", fontSize: 44, color: "#eee9f6", fontFamily: SANS, opacity: lerp(t, M.url, M.url + 0.4, 0, 1) }}>mosmos.io</Abs>
		<Abs x={0} y={806} w={1668} style={{ display: "flex", justifyContent: "center", gap: 40, fontSize: 28, color: "#c9a7ff", opacity: lerp(t, M.badges, M.badges + 0.4, 0, 1) }}>{COPY.platforms.map((p) => <span key={p}>▪ {p}</span>)}</Abs></Stage> }

export const Film: React.FC = () => {
	const t = useT(), i = C.filter((c) => t + 0.002 >= c).length
	if (i === 0) return <AbsoluteFill style={{ background: "#171320" }}><Full t0={0} t1={C[0]} off={20} /><AbsoluteFill style={{ background: "linear-gradient(90deg,rgba(23,19,32,.9),rgba(23,19,32,.1))" }} />
		<div style={{ position: "absolute", left: 140, top: 120, display: "flex", alignItems: "center", gap: 30 }}><LogoPixels size={120} t={0} mode="static" invert /><div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 120, color: "#fff" }}>MosMos</div></div></AbsoluteFill>
	if (i === 1) return <Shot1 t={t} />
	if (i === 2) return <AbsoluteFill style={{ background: "#000" }}><Full t0={C[1]} t1={C[2]} off={16.5} /><div style={{ position: "absolute", left: X0, top: 0, width: 1668, height: 1080 }}><Lower t={t} /><Caption t={t} y={975} /></div></AbsoluteFill>
	if (i === 3 || i === 4) { const zoom = i === 4, p = zoom ? 0.3 + 0.7 * lerp(t, C[3], C[3] + 0.2, 0, 1, out) : 0
		return <Stage bg="#7a7b7d" over={<><Bubble t0={C[2]} t1={C[4]} off={2} /><Cur x={lerp(t, C[2], C[3], 150, 165) + p * 40} y={640 + p * 260} />{!zoom && <><Dict t={t} o={fade(t, M.pill2, C[3] - 0.03, 0.15, 0.05)} /><Caption t={t} y={906} /></>}</>}>
			<Zoom s={1 + 1.2 * p} ox={176} oy={21} blur={zoom ? Math.sin(p * Math.PI) * 4 : 0}><MailBg /><MailWin t={t} body={t >= M.mail} /></Zoom></Stage> }
	if (i === 5) return <Stage bg="#fff" over={<><Bubble t0={C[4]} t1={C[5]} off={20} /><Cur x={lerp(t, C[4], 44.6, 640, 1530, inOut)} y={lerp(t, C[4], 44.6, 905, 975, inOut)} down={Math.abs(t - M.send) < 0.08} /><Dict t={t} y={958} x={883} o={fade(t, M.pill3, M.msg - 0.05, 0.15, 0.05)} /><Caption t={t} y={850} /></>}><DM t={t} /></Stage>
	if (i === 6) { const z = lerp(t, M.zin5, M.zin5 + 0.6, 0.72, 1, inOut)
		return <Stage bg="#c9d3e6" over={<><Bubble t0={C[5]} t1={C[8]} off={5} /><Cur x={640} y={lerp(t, C[5], C[6], 870, 900)} /><Caption t={t} y={880} /></>}>
			<Zoom s={z} ox={862} oy={540}><div style={{ position: "absolute", left: -400, top: -300, width: 2500, height: 1700, background: "linear-gradient(160deg,#c9d3e6,#e6dff0)" }} /><Hot /></Zoom></Stage> }
	if (i === 7 || i === 8) { const long = i === 8
		return <Stage bg="#fff" over={<><Bubble t0={C[5]} t1={C[8]} off={5} /><Cur beam x={long ? 900 : 860} y={long ? 260 : 515} /><Dict t={t} y={long ? 944 : 1013} x={834} o={long ? fade(t, C[7], 58.9, 0.01, 0.1) : fade(t, M.pill6, 99, 0.15)} /><Caption t={t} y={long ? 812 : 906} /></>}>
			<Zoom s={long ? 1.47 : 1} ox={870} oy={1094}><Prompt t={t} long={long} /></Zoom></Stage> }
	if (i === 9) { const p = lerp(t, M.zoom7, M.zoom7 + 0.7, 0, 1, inOut)
		const bx = lerp(p, 0, 1, 1075, 1231, (v) => v), by = lerp(p, 0, 1, 719, 811, (v) => v), bw = lerp(p, 0, 1, 537, 381, (v) => v), bh = lerp(p, 0, 1, 294, 215, (v) => v)
		return <Stage bg="#18191f" over={<><Bubble t0={C[8]} t1={C[9]} off={18} x={bx} y={by} w={bw} h={bh} r={60} /><Cur x={lerp(t, C[8], 69, 820, 760) + p * 40} y={lerp(t, C[8], 69, 560, 520) - p * 40} /><Dict t={t} y={1000} x={834} o={fade(t, M.pill7, 70.95, 0.15, 0.05) * (1 - p)} /><Caption t={t} y={p > 0.5 ? 908 : 905} x={p > 0.5 ? 782 : 827} /></>}>
			<Zoom s={1 + 1.6 * p} ox={1673} oy={-14}><Editor t={t} /></Zoom></Stage> }
	if (i === 10) { const up = lerp(t, M.phone, M.phone + 0.9, 0, 1, out), dn = lerp(t, M.phoneOut, C[10], 0, 1, inOut), wob = Math.sin(t * 1.7) * 1.5
		return <AbsoluteFill style={{ background: "#000" }}><Full t0={C[9]} t1={C[10]} off={21} />{up > 0 && <div style={{ position: "absolute", left: X0, top: 0, width: 1668, height: 1080 }}><Phone t={t} x={720 + wob * 6} y={1700 - 1150 * up + 1400 * dn} h={1050} rot={-5 + wob} /></div>}
			<div style={{ position: "absolute", left: X0, top: 0, width: 1668, height: 1080 }}><Caption t={t} y={975} /></div></AbsoluteFill> }
	if (i === 11) return <AbsoluteFill style={{ background: "#000" }}><Full t0={C[10]} t1={C[11]} off={8} mirror /><div style={{ position: "absolute", left: X0, top: 0, width: 1668, height: 1080 }}><Caption t={t} y={975} /></div></AbsoluteFill>
	if (i === 12) return <AbsoluteFill style={{ background: "#000" }}><Full t0={C[11]} t1={C[12]} off={10} s={1.15} /><div style={{ position: "absolute", left: X0, top: 0, width: 1668, height: 1080 }}><Caption t={t} y={975} /></div></AbsoluteFill>
	if (i === 13) { const wob = Math.sin(t * 1.9) * 1.2
		return <AbsoluteFill style={{ background: "#000" }}><Full t0={C[12]} t1={C[13]} off={26} blur={3} /><div style={{ position: "absolute", left: X0, top: 0, width: 1668, height: 1080 }}><Phone t={t} x={760 + wob * 8} y={lerp(t, C[12], C[13], 600, 540)} h={1300} rot={-3 + wob} /><Caption t={t} y={975} /></div></AbsoluteFill> }
	const off = 12 + (C[13] - C[13])
	if (i >= 14 && i <= 16) return <Stage bg="#7c797d" over={<><Bubble t0={C[13]} t1={C[16]} off={off} /><Cur x={i === 15 ? lerp(t, C[14], 112.6, 700, 1250, inOut) : 820} y={i === 15 ? lerp(t, C[14], 112.6, 520, 830, inOut) : 640} down={Math.abs(t - 110.4) < 0.08 || Math.abs(t - 111.6) < 0.08} /><Caption t={t} y={906} /></>}>
		<Home /><div style={{ position: "absolute", left: -X0, top: 0, width: 1920, height: 1080, background: "rgba(0,0,0,.5)" }} /><SetModal />{i === 15 && <><div style={{ position: "absolute", left: -X0, top: 0, width: 1920, height: 1080, background: "rgba(0,0,0,.35)" }} /><SceneModal t={t} /></>}</Stage>
	if (i === 17) { const zi = lerp(t, 116.0, 116.7, 0, 1, inOut) * (1 - lerp(t, 118.4, 119.1, 0, 1, inOut)), big = t >= 119.1
		return <Stage bg="#2b2d33" over={<><Bubble t0={C[16]} t1={C[17]} off={off + (C[16] - C[13])} x={big ? 1065 : 1231} y={49} w={big ? 547 : 381} h={big ? 310 : 219} r={60} /><Cur x={lerp(t, C[16], 116, 600, 1080, inOut) - 220 * zi} y={lerp(t, C[16], 116, 600, 280, inOut) + 300 * zi} /><Caption t={t} y={zi > 0.5 ? 906 : 940} /></>}>
			<Zoom s={1 + 3.0 * zi} ox={10} oy={-13}><Site t={t} /></Zoom></Stage> }
	return <End t={t} />
}
