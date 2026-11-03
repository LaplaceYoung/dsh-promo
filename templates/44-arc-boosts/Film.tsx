// Template 44 — structure of The Browser Company "Boosts by Arc · Meet Your New Internet" (2023), MosMos content.
// A 48-cut restyle montage: one app page re-skinned again and again (colour, font, case) to match each scene, bold
// words on flat colour, a polish dial panel, a zap bar that deletes filler words, stacked app windows, a keyword
// list with toggles, an earth horizon title card and a bouncing wordmark.
import React from "react"
import { AbsoluteFill, Img, staticFile } from "remotion"
import { CJK, HEAVY, MONO, lerp, clamp01, inOut, out, useT, LogoPixels, Wordmark, Cursor, Wave, COPY } from "../_engine/src/mos"
import { rand } from "../_engine/src/kit"
import TL from "./timeline.json"

const M = TL.marks as Record<string, number>, C = TL.cuts as number[]
const SERIF = "'Noto Serif SC', 'Noto Serif CJK SC', serif"
const BLUE = "#3a3af4", CREAMBG = "#f3f1ea", INK = "#141414"
const Bg: React.FC<{ c: string; children?: React.ReactNode }> = ({ c, children }) => <AbsoluteFill style={{ background: c, overflow: "hidden" }}>{children}</AbsoluteFill>
const Word: React.FC<{ s: string; c: string; size?: number; italic?: boolean; font?: string; style?: React.CSSProperties }> = ({ s, c, size = 76, italic, font = HEAVY, style }) =>
	<AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}><div style={{ fontFamily: font, fontWeight: 800, fontSize: size, color: c, letterSpacing: "-0.01em", transform: italic ? "skewX(-12deg)" : undefined, whiteSpace: "nowrap", ...style }}>{s}</div></AbsoluteFill>
const Zoom: React.FC<{ s: number; x: number; y: number; children: React.ReactNode }> = ({ s, x, y, children }) => <div style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 1080, transformOrigin: "0 0", transform: `translate(${960 - x * s}px, ${540 - y * s}px) scale(${s})` }}>{children}</div>
// warm wallpaper behind the first window
const Wall: React.FC<{ hue?: number; children?: React.ReactNode }> = ({ hue = 0, children }) => <AbsoluteFill style={{ overflow: "hidden" }}><AbsoluteFill style={{ background: "#f6a21a", filter: hue ? `hue-rotate(${hue}deg)` : undefined }}>
	{[["#ffd35a", -300, 500, 1400], ["#ff7a1a", 900, 600, 1500], ["#ff5a2a", 1300, -400, 1200], ["#ffe8a8", -200, -500, 1100]].map(([c, x, y, r], k) => <div key={k} style={{ position: "absolute", left: x as number, top: y as number, width: r as number, height: (r as number) * 0.7, borderRadius: "50%", background: c as string, filter: "blur(60px)", opacity: 0.9 }} />)}</AbsoluteFill>{children}</AbsoluteFill>

// ---------- the app page that gets re-skinned
type Th = { bg: string; side: string; text: string; sub: string; banner: string; accent: string; btn: string; font: string; up?: boolean; heavy?: boolean; label: string; msg: string }
const OUT = COPY.scenes
const TH: Record<string, Th> = {
	white: { bg: "#ffffff", side: "#ffffff", text: INK, sub: "#6b6f76", banner: BLUE, accent: "#1d9bf0", btn: "#1d9bf0", font: CJK, label: "飞书 / 微信", msg: OUT[0].out },
	purple: { bg: "#6c4be8", side: "#5a37d6", text: "#ffffff", sub: "#d9d0ff", banner: BLUE, accent: "#ffffff", btn: "#ffffff", font: CJK, label: "提示词", msg: "请对比分析三款语音输入产品，重点看场景识别、词库能力和会议记录。" },
	cream: { bg: "#f6f1df", side: "#f6f1df", text: "#1d2a8a", sub: "#4a5490", banner: "#2b44ff", accent: "#2b44ff", btn: "#22d36b", font: CJK, label: "文档", msg: COPY.doc[0][0] + COPY.doc[0][1] },
	dark: { bg: "#333435", side: "#2a2b2c", text: "#e8e8e8", sub: "#9a9a9a", banner: BLUE, accent: "#e8e8e8", btn: "#7d7d7d", font: MONO, label: "代码与终端", msg: OUT[4].out },
	orange: { bg: "#e8560f", side: "#e8560f", text: "#ffffff", sub: "#ffe3d2", banner: BLUE, accent: "#ffd23a", btn: "#ffd23a", font: SERIF, up: true, heavy: true, label: "邮件", msg: "李经理，您好：第一版方案将在本周三前发给您。" },
}
const Page: React.FC<{ th: Th; t: number }> = ({ th, t }) => { const f = (s: string) => th.up ? s.toUpperCase() : s
	return <div style={{ position: "absolute", left: 0, top: 0, width: 1740, height: 950, background: th.bg, fontFamily: th.font, color: th.text, overflow: "hidden" }}>
		<div style={{ position: "absolute", left: 0, top: 0, width: 300, bottom: 0, background: th.side, padding: "36px 0 0 46px", boxSizing: "border-box" }}>
			<div style={{ marginBottom: 30 }}><LogoPixels size={40} t={t} mode="static" invert={th.text === "#ffffff" || th.text === "#e8e8e8"} /></div>
			{["首页", "消息", "通讯录", "日历", "文档", "会议记录", "热词", "设置"].map((x, k) => <div key={x} style={{ fontSize: 27, fontWeight: th.heavy || k === 1 ? 800 : 500, margin: "0 0 26px", display: "flex", alignItems: "center", gap: 18 }}><span style={{ width: 26, height: 26, borderRadius: 7, border: `3px solid ${th.text}`, opacity: 0.85 }} />{f(x)}</div>)}
			<div style={{ marginTop: 18, width: 210, height: 62, borderRadius: 31, background: th.btn, color: th.btn === "#ffffff" || th.btn === "#ffd23a" ? INK : "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 700 }}>按 Fn 说话</div></div>
		<div style={{ position: "absolute", left: 300, top: 0, width: 960, height: 950, borderLeft: `2px solid ${th.sub}33`, borderRight: `2px solid ${th.sub}33` }}>
			<div style={{ height: 70, display: "flex", alignItems: "center", padding: "0 30px", fontSize: 26, fontWeight: 800 }}>{f("首页改版小组")}<span style={{ fontSize: 18, fontWeight: 400, color: th.sub, marginLeft: 16 }}>{f("场景：" + th.label)}</span></div>
			<div style={{ height: 300, background: th.banner, position: "relative" }}><div style={{ position: "absolute", right: 40, top: 40, fontFamily: HEAVY, fontWeight: 900, fontSize: 92, lineHeight: 0.95, color: "#fff", textAlign: "right" }}>开口<br />就好</div></div>
			<div style={{ position: "absolute", left: 36, top: 270, width: 190, height: 190, borderRadius: 95, background: BLUE, border: `8px solid ${th.bg}` }} />
			<div style={{ position: "absolute", right: 30, top: 395, padding: "12px 30px", borderRadius: 30, border: `2px solid ${th.text}`, fontSize: 22, fontWeight: 700 }}>{f("已加入")}</div>
			<div style={{ position: "absolute", left: 36, top: 480, fontSize: 36, fontWeight: 800 }}>{f("首页改版小组")} <span style={{ color: th.accent }}>●</span></div>
			<div style={{ position: "absolute", left: 36, top: 535, fontSize: 22, color: th.sub }}>{f("@mosmos · 5 位成员")}</div>
			<div style={{ position: "absolute", left: 36, top: 590, width: 880, fontSize: 28, lineHeight: 1.55, fontWeight: th.heavy ? 800 : 500 }}>{f(th.msg)}</div>
			<div style={{ position: "absolute", left: 36, top: 760, display: "flex", gap: 34, fontSize: 21, color: th.sub }}>{["风格：自动", "已润色", "已粘贴"].map((x) => <span key={x}>◦ {f(x)}</span>)}</div></div>
		<div style={{ position: "absolute", left: 1290, top: 30, width: 410 }}>
			<div style={{ height: 54, borderRadius: 27, background: `${th.sub}22`, display: "flex", alignItems: "center", padding: "0 24px", fontSize: 20, color: th.sub }}>{f("搜索")}</div>
			<div style={{ marginTop: 26, padding: 22, borderRadius: 18, background: `${th.sub}18` }}><div style={{ fontSize: 26, fontWeight: 800, marginBottom: 16 }}>{f("场景")}</div>
				{OUT.map((x, k) => <div key={x.id} style={{ display: "flex", alignItems: "center", gap: 14, margin: "14px 0", fontSize: 21 }}><span style={{ width: 44, height: 44, borderRadius: 22, background: ["#ff5a5a", "#ffb12a", "#2ac46b", "#6a5cff", "#333"][k] }} /><span style={{ flex: 1 }}>{f(x.label)}</span><span style={{ padding: "6px 16px", borderRadius: 18, background: th.text, color: th.bg, fontSize: 16 }}>{f(x.label === th.label ? "当前" : "切换")}</span></div>)}</div></div></div> }
const Window: React.FC<{ th: Th; t: number; x?: number; y?: number; s?: number }> = ({ th, t, x = 90, y = 66, s = 1 }) => <div style={{ position: "absolute", left: x, top: y, width: 1740, height: 950, transform: `scale(${s})`, transformOrigin: "0 0", borderRadius: 16, overflow: "hidden", boxShadow: "0 30px 80px rgba(80,30,0,.35)" }}><Page th={th} t={t} /></div>

// ---------- polish dial panel
const Dial: React.FC<{ t: number; a: number; w?: number; cal?: boolean }> = ({ t, a, w = 560, cal }) => { const s = w / 560, r = 150, x = 280 + r * Math.cos(a), y = 280 + r * Math.sin(a)
	return <div style={{ width: 560 * s, height: (cal ? 980 : 720) * s, position: "relative" }}><div style={{ position: "absolute", inset: 0, transform: `scale(${s})`, transformOrigin: "0 0", width: 560, height: cal ? 980 : 720, borderRadius: 40, background: "#fff", boxShadow: "0 20px 60px rgba(0,0,0,.25)" }}>
		<div style={{ position: "absolute", left: 40, top: 40, width: 480, height: 480, borderRadius: 36, background: "conic-gradient(from 0deg, #ff4d4d, #ffb12a, #f6f63a, #2ad36b, #2ab8ff, #6a5cff, #ff4dd8, #ff4d4d)", padding: 26, boxSizing: "border-box" }}>
			<div style={{ width: "100%", height: "100%", borderRadius: 22, background: "#fff" }} /></div>
		<svg width={560} height={560} style={{ position: "absolute", left: 0, top: 0 }}><circle cx={280} cy={280} r={r} fill="none" stroke="#ddd" strokeWidth={3} strokeDasharray="6 8" />
			{[-Math.PI / 2, Math.PI / 6, Math.PI * 5 / 6].map((q, k) => <circle key={k} cx={280 + r * Math.cos(q)} cy={280 + r * Math.sin(q)} r={18} fill={INK} />)}
			<circle cx={x} cy={y} r={48} fill="#2a8bff" stroke="#fff" strokeWidth={8} /></svg>
		{[["关闭", 280, 92], ["标准", 445, 380], ["高级", 115, 380]].map(([s2, lx, ly]) => <div key={s2 as string} style={{ position: "absolute", left: (lx as number) - 40, top: ly as number, width: 80, textAlign: "center", fontFamily: CJK, fontSize: 22, color: "#666" }}>{s2}</div>)}
		<div style={{ position: "absolute", left: 40, top: 560, display: "flex", gap: 22 }}>{["润色", "场景", "热词"].map((x, k) => <div key={x} style={{ width: 145, height: 110, borderRadius: 24, background: k === 0 ? INK : "#f0f0f0", color: k === 0 ? "#fff" : INK, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: CJK, fontSize: 28, fontWeight: 700 }}>{x}</div>)}</div>
		{cal && <div style={{ position: "absolute", left: 40, top: 700, right: 40, display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 10 }}>{Array.from({ length: 21 }, (_, k) => <div key={k} style={{ height: 50, borderRadius: 12, background: k === 9 ? INK : "#f2f2f2", color: k === 9 ? "#fff" : "#555", fontFamily: CJK, fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>{["关", "标", "高"][k % 3]}</div>)}</div>}</div></div> }
const Photo: React.FC<{ src: string; style: React.CSSProperties; blur?: number }> = ({ src, style, blur }) => <Img src={staticFile(src)} style={{ position: "absolute", objectFit: "cover", filter: blur ? `blur(${blur}px)` : undefined, ...style }} />

// ---------- zap: delete filler words from a list
const RAWS = ["嗯，", "我觉得这个方案吧，", "这个方案可以先，", "先做一个小范围的测试，", "然后然后，", "看看反馈，", "不对，", "是先收集一下反馈，", "再决定要不要全部上线。"]
const ZapBar: React.FC<{ x: number; y: number; s?: number; a?: string; b?: string }> = ({ x, y, s = 1, a = "去掉这个", b = "去掉所有口头禅" }) => <div style={{ position: "absolute", left: x, top: y, display: "flex", gap: 10 * s, padding: 10 * s, borderRadius: 20 * s, background: "#ececec", boxShadow: "0 12px 40px rgba(0,0,0,.25)", fontFamily: CJK, fontSize: 22 * s, zIndex: 10 }}>
	<div style={{ padding: `${12 * s}px ${22 * s}px`, borderRadius: 12 * s, background: "#ff4a2a", color: "#fff", fontWeight: 700 }}>⚡ {a}</div><div style={{ padding: `${12 * s}px ${22 * s}px`, borderRadius: 12 * s, background: "#ff7a3a", color: "#fff", width: 330 * s }}>{b}</div><div style={{ padding: `${12 * s}px ${22 * s}px`, borderRadius: 12 * s, background: "#7a7a7a", color: "#fff" }}>取消</div></div>
const List: React.FC<{ items: string[]; hi: number; gone?: number[]; x: number; y: number; s?: number; color?: string; font?: string }> = ({ items, hi, gone = [], x, y, s = 1, color = INK, font = CJK }) => <div style={{ position: "absolute", left: x, top: y, fontFamily: font, color }}>
	{items.map((it, k) => gone.includes(k) ? null : <div key={k} style={{ display: "flex", alignItems: "center", gap: 26 * s, height: 86 * s, padding: `0 ${26 * s}px`, borderRadius: 16 * s, background: k === hi ? "#ffc61a" : undefined, fontSize: 36 * s, fontWeight: k === hi ? 700 : 500, width: 520 * s, boxSizing: "border-box" }}><span style={{ width: 34 * s, height: 34 * s, borderRadius: 9 * s, border: `${4 * s}px solid ${color}` }} />{it}</div>)}</div>

// ---------- keyword list popup
const HOT = [["Figma", true], ["Nimbus", true], ["林清禾", false], ["MosMos", true]] as [string, boolean][]
const Hot: React.FC<{ t: number; on: boolean; s?: number }> = ({ t, on, s = 1 }) => <div style={{ width: 640 * s, borderRadius: 26 * s, background: "#fff", boxShadow: "0 20px 60px rgba(0,0,0,.25)", padding: `${24 * s}px 0`, fontFamily: CJK, color: INK }}>
	<div style={{ padding: `0 ${30 * s}px ${16 * s}px`, fontSize: 22 * s, color: "#888" }}>我的热词 · <span style={{ color: BLUE }}>{on ? 4 : 3} 条已启用</span></div>
	{HOT.map(([w, a], k) => { const v = k === 2 ? on : a
		return <div key={w} style={{ display: "flex", alignItems: "center", gap: 16 * s, padding: `${14 * s}px ${30 * s}px`, background: k === 2 ? "#f1f1f1" : undefined, fontSize: 28 * s }}><span style={{ flex: 1 }}>{w}</span><span style={{ fontSize: 18 * s, color: "#999" }}>热词</span>
			<span style={{ width: 66 * s, height: 38 * s, borderRadius: 19 * s, background: v ? INK : "#d9d9d9", position: "relative" }}><span style={{ position: "absolute", top: 4 * s, left: (v ? 32 : 4) * s, width: 30 * s, height: 30 * s, borderRadius: 15 * s, background: "#fff" }} /></span></div> })}</div>

// ---------- big title page (re-skinned)
const Album: React.FC<{ bg: string; fg: string; font: string; italic?: boolean; side?: string; t: number; panel?: boolean; win?: string }> = ({ bg, fg, font, italic, side, t, panel, win }) => <div style={{ position: "absolute", inset: 0, background: win || bg }}><div style={{ position: "absolute", left: win ? (panel ? -250 : 120) : 0, top: win ? (panel ? 60 : 50) : 0, width: 1920, height: 1080, background: bg, color: fg, overflow: "hidden", borderRadius: win ? 30 : 0, clipPath: panel ? "inset(0 290px 0 230px round 30px)" : undefined, transform: win && !panel ? "scale(0.85)" : undefined, transformOrigin: "0 0", boxShadow: win ? "0 20px 60px rgba(0,0,0,.3)" : undefined }}>
	{side && <div style={{ position: "absolute", left: 0, top: 0, width: 150, bottom: 0, background: side }}>{Array.from({ length: 7 }, (_, k) => <div key={k} style={{ margin: "40px 0 0 45px", width: 60, height: 60, borderRadius: 14, background: "rgba(255,255,255,.18)" }} />)}</div>}
	<div style={{ position: "absolute", left: side ? 230 : 80, top: 110, width: 420, height: 420, overflow: "hidden", borderRadius: 8 }}><Photo src="t12-woman.webp" style={{ width: 420, height: 420 }} /></div>
	<div style={{ position: "absolute", left: side ? 700 : 560, top: 170, fontFamily: CJK, fontSize: 30, opacity: 0.8 }}>MosMos</div>
	<div style={{ position: "absolute", left: side ? 690 : 550, top: 210, fontFamily: font, fontWeight: 800, fontSize: 230, lineHeight: 1.1, transform: italic ? "skewX(-12deg)" : undefined, whiteSpace: "nowrap" }}>开口就好</div>
	<div style={{ position: "absolute", left: side ? 700 : 560, top: 480, fontFamily: CJK, fontSize: 28, opacity: 0.85 }}>MosMos · macOS · Windows · 从语音输入到会议总结和待办</div>
	<div style={{ position: "absolute", left: side ? 230 : 80, top: 600, display: "flex", gap: 24 }}>{[0, 1].map((k) => <div key={k} style={{ width: 90, height: 90, borderRadius: 45, background: k ? "transparent" : fg, border: `4px solid ${fg}`, display: "flex", alignItems: "center", justifyContent: "center" }}>{k ? "♡" : <Wave t={t} n={4} h={30} color={bg} live />}</div>)}</div>
	{OUT.map((x, k) => <div key={x.id} style={{ position: "absolute", left: side ? 230 : 80, top: 740 + k * 66, width: 1180, display: "flex", gap: 40, fontFamily: font, fontSize: 30, borderBottom: `1px solid ${fg}33`, paddingBottom: 14 }}><span style={{ opacity: 0.6 }}>{k + 1}</span><span style={{ flex: 1 }}>{x.label}</span><span style={{ opacity: 0.6 }}>{x.style.replace("风格：", "")}</span></div>)}
	</div>{panel && <div style={{ position: "absolute", left: 1520, top: 70 }}><Dial t={t} a={Math.PI / 6 + Math.sin(t * 2) * 0.3} w={340} cal /></div>}</div>

const Doc: React.FC<{ mono?: boolean }> = ({ mono }) => <div style={{ position: "absolute", left: 310, top: 290, width: 1300, height: 900, borderRadius: 14, background: mono ? "#8f2cf0" : "#fff", color: mono ? "#fff" : INK, padding: "40px 60px", boxSizing: "border-box", boxShadow: "0 20px 60px rgba(40,0,90,.3)" }}>
	<div style={{ textAlign: "center", fontFamily: mono ? MONO : SERIF, fontSize: 44, fontWeight: 800, borderBottom: `1px solid ${mono ? "#fff6" : "#ddd"}`, paddingBottom: 18 }}>MosMos · 文档</div>
	<div style={{ marginTop: 50, fontFamily: mono ? MONO : SERIF, fontSize: 84, lineHeight: 1.2, fontWeight: 600 }}>项目复盘：首页上线<br />提前到周五</div>
	<div style={{ marginTop: 26, fontFamily: mono ? MONO : SERIF, fontSize: 36, lineHeight: 1.5, opacity: 0.85 }}>{COPY.doc[1][0] + COPY.doc[1][1]}</div>
	<div style={{ marginTop: 30, height: 300, borderRadius: 8, overflow: "hidden", position: "relative" }}><Photo src="t14-lounge.webp" style={{ width: "100%", height: "100%" }} /></div></div>

const Term: React.FC<{ t: number }> = ({ t }) => <AbsoluteFill style={{ background: "#0b1a14", filter: `hue-rotate(${lerp(t, C[9], C[10], 0, 120, (v) => v)}deg)`, overflow: "hidden" }}>
	<Photo src="t13-wall.webp" style={{ left: 0, top: 0, width: 1920, height: 1080, opacity: 0.35 }} blur={6} />
	<div style={{ position: "absolute", left: 100, top: 130, right: 100, fontFamily: MONO, color: "#9dffcf", textShadow: "0 0 18px rgba(80,255,170,.5)" }}>
		<div style={{ fontSize: 64, fontWeight: 700 }}>MOSMOS · 代码与终端</div>
		<div style={{ display: "flex", gap: 24, margin: "40px 0" }}>{["场景：自动", "生成命令"].map((x) => <div key={x} style={{ padding: "14px 34px", borderRadius: 40, background: "#2ae890", color: "#062", fontSize: 30, fontWeight: 700 }}>{x}</div>)}</div>
		<div style={{ fontSize: 46, lineHeight: 1.6 }}>$ 说：{OUT[4].raw}<br />$ {OUT[4].out}<br /><span style={{ opacity: 0.7 }}># {OUT[4].hint}</span></div></div></AbsoluteFill>

const Stack: React.FC<{ n: number; t: number }> = ({ n, t }) => { const W = [["飞书 / 微信", OUT[0].out, "#e9f4ff"], ["邮件", COPY.mail.join(" "), "#fff8e6"], ["文档", COPY.doc.map((d) => d.join("")).join(" "), "#f3ffe9"], ["提示词", COPY.prompt.join(" "), "#f6efff"], ["代码与终端", OUT[4].out, "#1d1f24"]]
	return <AbsoluteFill style={{ background: "#e8e8ec" }}>{W.slice(0, n).map(([a, b, c], k) => <div key={a} style={{ position: "absolute", left: 90 + k * 150, top: 110 + k * 62, width: 1160, height: 820, borderRadius: 16, background: c, boxShadow: "0 20px 50px rgba(0,0,0,.2)", overflow: "hidden", color: k === 4 ? "#ddd" : INK }}>
		<div style={{ height: 54, background: "rgba(0,0,0,.06)", display: "flex", alignItems: "center", gap: 10, padding: "0 22px" }}>{[0, 1, 2].map((i) => <span key={i} style={{ width: 14, height: 14, borderRadius: 7, background: ["#ff5f57", "#febc2e", "#28c840"][i] }} />)}<span style={{ marginLeft: 16, fontFamily: CJK, fontSize: 20 }}>{a}</span></div>
		<div style={{ padding: "34px 40px", fontFamily: k === 4 ? MONO : k === 2 ? SERIF : CJK, fontSize: k === 2 ? 50 : 38, lineHeight: 1.5 }}>{b}</div>
		{k === 1 && <div style={{ position: "absolute", left: 40, bottom: 40, width: 500, height: 290, borderRadius: 10, overflow: "hidden" }}><Photo src="t14-armchair.webp" style={{ width: "100%", height: "100%" }} /></div>}</div>)}
		<Cursor x={lerp(t, C[32], C[35], 1300, 1500)} y={lerp(t, C[32], C[35], 600, 760)} s={1.6} /></AbsoluteFill> }

const Profile: React.FC<{ v: number }> = ({ v }) => { const red = v >= 0, up = v > 1
	return <AbsoluteFill style={{ background: v < 0 ? "#fff" : v === 0 ? "#4a0d0f" : v === 1 ? "#d40f12" : "#b80d10", color: red ? "#fff" : INK, fontFamily: up ? SERIF : CJK }}>
		<div style={{ position: "absolute", left: 0, top: 0, width: 130, bottom: 0, borderRight: `2px solid ${red ? "#ff5a5a" : "#eee"}` }}>{Array.from({ length: 6 }, (_, k) => <div key={k} style={{ margin: "50px 0 0 40px", width: 46, height: 46, borderRadius: 10, border: `4px solid ${red ? "#fff" : INK}` }} />)}</div>
		<div style={{ position: "absolute", left: 130, top: 0, right: 0, height: 470, overflow: "hidden", filter: red ? "sepia(.6) saturate(3) hue-rotate(-30deg)" : undefined }}><Photo src="t13-wall.webp" style={{ width: "100%", height: 700, top: -100 }} /></div>
		<div style={{ position: "absolute", left: 200, top: 330, width: 300, height: 300, borderRadius: 150, background: "#f1e7da", border: `10px solid ${red ? "#d40f12" : "#fff"}`, overflow: "hidden" }}><Img src={staticFile("t16-p1-head.svg")} style={{ width: 300, height: 300 }} /></div>
		<div style={{ position: "absolute", left: 200, top: 660, fontSize: 70, fontWeight: 800, letterSpacing: up ? "0.06em" : undefined }}>林清禾 <span style={{ fontSize: 40, color: red ? "#ffd23a" : BLUE }}>✓</span></div>
		<div style={{ position: "absolute", left: 200, top: 760, fontSize: 32, opacity: 0.7 }}>{up ? "热词 · 人名 · 优先识别" : "热词 · 人名"}</div>
		<div style={{ position: "absolute", left: 200, top: 830, width: 1300, fontSize: 32, lineHeight: 1.5 }}>请把 Figma 里的 Nimbus 文件发给林清禾。</div>
		<div style={{ position: "absolute", right: 120, top: 520, padding: "18px 44px", borderRadius: 40, background: red ? "#fff" : INK, color: red ? "#d40f12" : "#fff", fontSize: 30, fontWeight: 700, fontFamily: CJK }}>{up ? "已启用" : "已加入"}</div></AbsoluteFill> }

const scene = (t: number): React.ReactElement => {
	const i = C.filter((c) => t >= c).length
	switch (i) {
		case 0: return <Wall><Zoom s={lerp(t, 0, C[0], 1, 1.04)} x={960} y={540}><Window th={TH.white} t={t} /></Zoom></Wall>
		case 1: return <Bg c="#000"><Word s="准备好了吗" c="#fff" size={120} /></Bg>
		case 2: return <Bg c={CREAMBG}><Word s="准备好了吗" c={BLUE} size={120} /></Bg>
		case 3: return <Wall hue={-10}><Zoom s={1.15} x={664} y={405}><Window th={TH.white} t={t} /></Zoom></Wall>
		case 4: return <Wall hue={220}><Zoom s={1.15} x={664} y={405}><Window th={TH.purple} t={t} /></Zoom></Wall>
		case 5: return <AbsoluteFill style={{ background: "linear-gradient(180deg,#2a7cff,#9fd2ff)" }}><Zoom s={1.15} x={664} y={405}><Window th={TH.cream} t={t} /></Zoom></AbsoluteFill>
		case 6: { const w = clamp01((t - M.wipe) / 0.2)
			return <AbsoluteFill style={{ background: "#999" }}><Zoom s={1.15} x={664} y={405}><Window th={TH.dark} t={t} /></Zoom>
				<AbsoluteFill style={{ clipPath: `inset(0 0 0 ${(1 - w) * 100}%)`, background: "linear-gradient(180deg,#ff8a3a,#6a2a1a)" }}><Zoom s={1.15} x={664} y={405}><Window th={TH.orange} t={t} /></Zoom></AbsoluteFill></AbsoluteFill> }
		case 7: { const s = t < M.w2 ? "让每一个输入框" : t < M.w3 ? "输入框" : "你的输入框"; return <Bg c={t < M.coral ? CREAMBG : "#ef5f63"}><Word s={s} c={t < M.coral ? BLUE : "#fff"} size={78} /></Bg> }
		case 8: return <Bg c={t < M.blue ? "#1ec3ea" : "#2a2af2"}><Word s="你的输入框" c="#fff" size={78} italic={t >= M.blue} /></Bg>
		case 9: return <AbsoluteFill style={{ background: "#58b98c" }}><Photo src="t27-sea.webp" style={{ left: 0, top: 0, width: 700, height: 1080 }} blur={10} />
			<div style={{ position: "absolute", left: 460, top: 20 }}><Dial t={t} a={lerp(t, C[8], C[9], -Math.PI / 2, Math.PI * 0.85, inOut)} w={930} /></div></AbsoluteFill>
		case 10: return <Term t={t} />
		case 11: return <AbsoluteFill style={{ background: "linear-gradient(160deg,#8b5cf6,#5b21b6)" }}><Doc /></AbsoluteFill>
		case 12: return <AbsoluteFill style={{ background: "linear-gradient(160deg,#a855f7,#6d28d9)" }}><Doc mono /></AbsoluteFill>
		case 13: return <Album bg="#f2c7a6" fg="#3a2216" font={MONO} t={t} panel win="#d9d4e4" />
		case 14: return <Album bg="#a6e07e" fg="#14300a" font={MONO} t={t} panel win="#d9d4e4" />
		case 15: return <AbsoluteFill><Zoom s={1.5} x={900} y={420}><Album bg="#9be37a" fg="#0d2a06" font={MONO} t={t} side="#5eb54a" /></Zoom></AbsoluteFill>
		case 16: return <Album bg="#1ec8a8" fg="#fff" font={MONO} t={t} side="#173a7a" win="#8f7ad6" />
		case 17: return <Album bg="#7b2fd6" fg="#fff" font={HEAVY} italic t={t} side="#2a0a5a" win="#9d8ad8" />
		case 18: return <Album bg="#f78fb3" fg="#3a0a1a" font={SERIF} t={t} side="#e86f97" win="#a593d6" />
		case 19: { const z = t > M.zap, hov = t > 13.45
			return <AbsoluteFill style={{ background: "#dfe7f0" }}><Photo src="t27-sea.webp" style={{ left: 0, top: 0, width: 1920, height: 1080, opacity: 0.4 }} blur={20} />
				<div style={{ position: "absolute", left: 538, top: 71, display: "grid", gridTemplateColumns: "390px 390px", columnGap: 50, rowGap: 90, padding: 44, borderRadius: 60, background: "rgba(255,255,255,.8)" }}>
					{[["润色", ""], ["场景", ""], ["去口头禅", "⚡"], ["热词", "{ }"]].map(([a, b], k) => <div key={a} style={{ gridColumn: k >= 2 ? "1 / 3" : undefined, height: 200, borderRadius: 40, background: k === 2 && z ? "#3a3a3a" : k === 2 && hov ? "#d6d6d6" : "#e9e9e9", color: k === 2 && z ? "#fff" : INK, display: "flex", alignItems: "center", justifyContent: k >= 2 ? "space-between" : "center", padding: "0 60px", fontFamily: CJK, fontSize: 66, fontWeight: 600 }}><span>{a}</span><span>{b}</span></div>)}</div>
				<Cursor x={lerp(t, 13.0, 13.9, 860, 880, inOut)} y={lerp(t, 13.0, 13.9, 300, 520, inOut)} s={2.6} down={Math.abs(t - M.zap) < 0.1} /></AbsoluteFill> }
		case 20: return <AbsoluteFill style={{ background: "#fff" }}><List items={RAWS} hi={t < 14.6 ? 3 : 4} x={150} y={-90} s={1.6} /><Photo src="t14-chair.webp" style={{ left: 1040, top: 0, width: 880, height: 360, borderRadius: "0 0 0 40px" }} />
			<div style={{ position: "absolute", left: 1080, top: 410, fontFamily: CJK, fontSize: 52, fontWeight: 800 }}>原话 · 首页改版</div><div style={{ position: "absolute", left: 1080, top: 500, width: 780, fontFamily: CJK, fontSize: 36, lineHeight: 1.6, color: "#555" }}>{COPY.polish[1].out}</div>
			{t > M.zbar && <ZapBar x={60} y={720} s={1.3} />}</AbsoluteFill>
		case 21: return <AbsoluteFill style={{ background: "#fff" }}><List items={RAWS} hi={t < M.zone ? 4 : -1} gone={t >= M.zone ? [4] : []} x={130} y={-250} s={1.75} /><Photo src="t14-chair.webp" style={{ left: 1040, top: 0, width: 880, height: 360, borderRadius: "0 0 0 40px" }} />
			<div style={{ position: "absolute", left: 1080, top: 410, fontFamily: CJK, fontSize: 52, fontWeight: 800 }}>原话 · 首页改版</div><div style={{ position: "absolute", left: 1080, top: 500, width: 780, fontFamily: CJK, fontSize: 36, lineHeight: 1.6, color: "#555" }}>{COPY.polish[1].out}</div>
			{t < M.zone && <ZapBar x={60} y={720} s={1.3} />}<Cursor x={lerp(t, C[20], 15.9, 700, 210, inOut)} y={lerp(t, C[20], 15.9, 960, 770, inOut)} s={1.6} down={Math.abs(t - 15.9) < 0.1} /></AbsoluteFill>
		case 22: return <AbsoluteFill style={{ background: "#fff" }}><Zoom s={1.25} x={760} y={600}><List items={RAWS} hi={6} gone={[4]} x={170} y={60} s={1.25} /></Zoom></AbsoluteFill>
		case 23: case 24: case 25: { const mail = ["那个，", "李经理您好，", "第一版方案", "我们周三前发给您，", "麻烦今天", "把品牌素材发我，", "收到以后我会提前检查。"]
			return <AbsoluteFill style={{ background: "#ee5b6a" }}><div style={{ position: "absolute", left: i === 24 ? 100 : 160, top: i === 24 ? -10 : 80, width: 1600, transform: i === 24 ? "scale(1.12)" : undefined, transformOrigin: "0 0", height: 1000, borderRadius: 20, background: "#fff", overflow: "hidden" }}>
				<div style={{ position: "absolute", left: 40, top: 30, fontFamily: HEAVY, fontWeight: 800, fontSize: 36 }}>✉ 邮件 <span style={{ fontSize: 22, fontWeight: 400, color: "#888" }}>风格：自动 · 完整专业</span></div>
				<List items={mail} hi={i === 25 ? -1 : 0} gone={i === 25 ? [0] : []} x={30} y={110} s={1.3} />
				<div style={{ position: "absolute", left: 860, top: 110, width: 700, fontFamily: CJK, fontSize: 38, lineHeight: 1.7, whiteSpace: "pre-wrap", color: "#333" }}>{OUT[1].out}</div>
				{i === 24 && <ZapBar x={40} y={230} s={1.2} />}{i === 23 && t > M.ybar && <ZapBar x={40} y={230} s={1.2} />}</div></AbsoluteFill> }
		case 26: return <AbsoluteFill style={{ background: "#fff" }}><Zoom s={lerp(t, C[25], C[26], 1.8, 1.95)} x={1165} y={416}><div style={{ position: "absolute", left: 60, top: 60, width: 1100, fontFamily: SERIF, fontSize: 38, lineHeight: 1.65, color: INK }}>项目复盘，目标是把首页上线提前到周五，结果是交互稿按时完成，但是品牌素材晚了一天，下一步今天确认视觉稿，明天开始开发。</div>
			<div style={{ position: "absolute", left: 1240, top: 40, width: 620, display: "flex", flexDirection: "column", gap: 26 }}>{["嗯，", "就是，", "那个，"].map((x, k) => <div key={k} style={{ height: 260, borderRadius: 14, background: "#ffc61a", display: "flex", gap: 24, padding: 26, fontFamily: CJK }}><div style={{ fontSize: 56, fontWeight: 900 }}>{k + 1}.</div><div style={{ fontSize: 34, fontWeight: 700 }}>口头禅「{x}」<div style={{ fontSize: 24, fontWeight: 400, marginTop: 14 }}>去掉后不影响原意</div></div></div>)}</div>
			{t > 20.5 && <ZapBar x={1060} y={600} s={1.0} />}</Zoom></AbsoluteFill>
		case 27: case 28: case 29: { const rows = COPY.meeting
			return <AbsoluteFill style={{ background: "#3fbf8a" }}><Zoom s={1.4} x={760} y={480}><div style={{ position: "absolute", left: 150, top: 120, width: 1620, height: 900, borderRadius: 20, background: "#1d1f22", color: "#e6e6e6", fontFamily: MONO, overflow: "hidden" }}>
				<div style={{ display: "flex", alignItems: "center", gap: 30, height: 90, padding: "0 40px", fontSize: 26, borderBottom: "2px solid #333" }}><b>会议记录 · 3 位说话人</b><span style={{ flex: 1 }} /><span style={{ padding: "10px 24px", borderRadius: 8, background: "#e6c229", color: INK, fontWeight: 700 }}>Fn + Shift</span></div>
				<div style={{ textAlign: "center", padding: 22, fontSize: 28, color: "#aaa" }}>逐字稿 · 总结 · 待办</div>
				{rows.map(([a, b, c], k) => <div key={k} style={{ display: "flex", alignItems: "center", gap: 40, height: 110, padding: "0 40px", borderTop: "2px solid #2c2e31", background: i >= 28 && k === 0 ? "#3a3420" : undefined, fontSize: 28 }}><span style={{ width: 160, color: "#8ad" }}>{a}</span><span style={{ width: 100, color: "#888" }}>{b}</span><span style={{ flex: 1 }}>{i === 29 && k === 0 ? "☑ " + COPY.todos[1] : c}</span><span style={{ padding: "10px 26px", borderRadius: 8, background: i === 29 && k === 0 ? "#2ae890" : "#e6e6e6", color: INK }}>{i === 29 && k === 0 ? "待办" : "原话"}</span></div>)}
				{i < 29 && <ZapBar x={60} y={i === 27 ? 250 : 330} s={1.0} a="提取待办" b="提取全部待办" />}</div></Zoom></AbsoluteFill> }
		case 30: return <AbsoluteFill style={{ background: "#58b98c" }}><div style={{ position: "absolute", left: 690, top: 30 }}><Dial t={t} a={Math.PI / 6} w={440} cal /></div></AbsoluteFill>
		case 31: return <AbsoluteFill style={{ background: "#58b98c" }}><div style={{ position: "absolute", left: 560, top: 30 }}><Dial t={t} a={lerp(t, C[30], C[31], Math.PI / 6, Math.PI * 5 / 6, inOut)} w={640} /></div></AbsoluteFill>
		case 32: { const w = clamp01((t - 24.55) / 0.35), p = inOut(w) * 260
			const Mb = ({ b }: { b: boolean }) => <div style={{ position: "absolute", left: 300, top: 120, width: 1320, height: 840, borderRadius: 24, background: b ? "#2f3cff" : "#f4f2ff", overflow: "hidden", color: b ? "#fff" : INK, fontFamily: CJK }}>
				<div style={{ height: 90, display: "flex", alignItems: "center", gap: 40, padding: "0 50px", fontSize: 26, fontWeight: 700, background: b ? "#2a2acc" : "#3b3bf5", color: "#fff" }}>首页改版 · 视觉参考<span style={{ flex: 1 }} />素材 · 交互稿 · 视觉稿</div>
				<div style={{ padding: "40px 50px", fontSize: 44, fontWeight: 800 }}>素材到位以后，周四开始做视觉方案。</div>
				{["t14-armchair.webp", "t14-chair.webp", "t14-lamp.webp"].map((p, k) => <div key={p} style={{ position: "absolute", left: 80 + k * 400, top: 330, width: 360, height: 420, borderRadius: 10, overflow: "hidden", border: `6px solid ${b ? "#fff" : INK}` }}><Photo src={p} style={{ width: "100%", height: "100%" }} /></div>)}</div>
			return <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 60%, #ff7ad9, #7c2ae8 60%, #2a0a6a)" }}><Mb b={false} />
				{w > 0 && <AbsoluteFill style={{ clipPath: `polygon(0% 100%, 0% ${100 - p}%, ${p}% 100%)` }}><Mb b /></AbsoluteFill>}</AbsoluteFill> }
		case 33: return <Stack n={3} t={t} />
		case 34: return <Stack n={4} t={t} />
		case 35: return <Stack n={5} t={t} />
		case 36: return <Profile v={t < 27.333 ? 0 : t < 28.125 ? 1 : 2} />
		case 37: return <AbsoluteFill style={{ background: "#fff" }}><Profile v={-1} /><AbsoluteFill style={{ background: "rgba(0,0,0,.08)" }} /><div style={{ position: "absolute", left: 120, top: 330 }}><Hot t={t} on={t > M.tog} s={1.6} /></div>
			<Cursor x={lerp(t, C[36], M.tog, 1300, 1043, inOut)} y={lerp(t, C[36], M.tog, 1000, 773, inOut)} s={1.6} down={Math.abs(t - M.tog) < 0.1} /></AbsoluteFill>
		case 38: return <AbsoluteFill><Profile v={2} /><div style={{ position: "absolute", left: 120, top: 330 }}><Hot t={t} on s={1.6} /></div></AbsoluteFill>
		case 39: { const w = t < M.paint ? "去掉" : t < M.share ? "润色" : "记住", ic = t < M.paint ? "⚡" : t < M.share ? "✎" : "✦"
			return <AbsoluteFill style={{ background: "linear-gradient(120deg,#2f6bff,#20c2a0 55%,#7d4cf0)" }}><Word s={w} c="#fff" size={260} italic style={{ textShadow: "0 8px 30px rgba(0,0,0,.25)" }} />
				<div style={{ position: "absolute", left: 1270, top: 600, fontSize: 120, color: "#ffd23a", transform: `rotate(${Math.sin(t * 6) * 10}deg)` }}>{ic}</div></AbsoluteFill> }
		case 40: { const d = clamp01((t - M.draw) / 0.9)
			return <AbsoluteFill style={{ background: "#e9ebe4" }}><div style={{ position: "absolute", inset: 0, fontFamily: MONO, fontSize: 70, color: "#cfd2c8", lineHeight: 1.2, padding: 40 }}>Figma Nimbus 林清禾 MosMos Figma Nimbus 林清禾 MosMos Figma Nimbus 林清禾</div>
				<div style={{ position: "absolute", left: 610, top: 150, width: 700, height: 780, borderRadius: 30, background: "#fff", boxShadow: "0 20px 60px rgba(0,0,0,.2)", fontFamily: CJK, color: INK }}>
					<div style={{ display: "flex", alignItems: "center", gap: 20, padding: 40 }}><div style={{ width: 64, height: 64, borderRadius: 16, background: "#3bd16f", display: "flex", alignItems: "center", justifyContent: "center" }}><LogoPixels size={36} t={t} mode="static" invert /></div><div><div style={{ fontSize: 34, fontWeight: 700 }}>新热词</div><div style={{ fontSize: 20, color: "#888" }}>MosMos · 我的热词</div></div></div>
					<div style={{ margin: "0 40px", fontSize: 24, color: "#666", lineHeight: 1.6 }}>{COPY.hotDesc}</div>
					<svg width={620} height={300} style={{ position: "absolute", left: 40, top: 340 }}><path d="M20 180 C 80 40, 120 260, 180 150 S 260 60, 300 170 S 380 250, 420 120 S 520 80, 600 160" fill="none" stroke={INK} strokeWidth={6} strokeLinecap="round" strokeDasharray={900} strokeDashoffset={900 * (1 - d)} /><line x1={20} y1={250} x2={600} y2={250} stroke="#e44" strokeWidth={2} strokeDasharray="8 8" /></svg>
					<div style={{ position: "absolute", left: 40, bottom: 36, fontSize: 24, color: "#888" }}>说一遍：Nimbus</div><div style={{ position: "absolute", right: 40, bottom: 26, padding: "14px 30px", borderRadius: 12, background: BLUE, color: "#fff", fontSize: 24 }}>加入热词</div></div></AbsoluteFill> }
		case 41: { const p = t > M.press
			return <AbsoluteFill style={{ background: "#f0f0fa" }}><svg width={1920} height={300} style={{ position: "absolute", top: 0 }}><path d={`M0 160 ${Array.from({ length: 21 }, (_, k) => `Q ${k * 96 + 48} ${110 + 20 * Math.sin(k)} ${(k + 1) * 96} 160`).join(" ")} V0 H0 Z`} fill="#e3e3f5" /></svg>
				<div style={{ position: "absolute", left: 250, top: 230, width: 1420, height: 680, borderRadius: 50, background: "#fff", boxShadow: "0 20px 60px rgba(0,0,0,.12)" }} />
				<div style={{ position: "absolute", left: 490, top: 465, width: 940, height: 210, borderRadius: 30, background: p ? "#c9cbf4" : BLUE, color: p ? "#8a8cd0" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", gap: 50, fontFamily: CJK, fontSize: 78, fontWeight: 700, transform: `scale(${Math.abs(t - M.press) < 0.12 ? 0.95 : 1})` }}>加入热词<span style={{ padding: "4px 18px", borderRadius: 12, border: `3px solid ${p ? "#8a8cd0" : "#fff"}`, fontSize: 40 }}>↵</span></div>
				<Cursor x={lerp(t, C[40], M.press, 1300, 1100, inOut)} y={lerp(t, C[40], M.press, 800, 560, inOut)} s={2.2} down={Math.abs(t - M.press) < 0.1} /></AbsoluteFill> }
		case 42: { const g = lerp(t, C[41], C[42], 0.6, 1.25, out)
			return <AbsoluteFill style={{ background: "#eef0fb" }}><AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
				<div style={{ position: "absolute", width: 900 * g, height: 900 * g, borderRadius: "50%", boxShadow: `inset 0 0 ${120 * g}px ${30 * g}px rgba(80,90,255,${0.5 / g})` }} />
				<svg width={300} height={280} viewBox="0 0 100 92" style={{ filter: "drop-shadow(0 10px 30px rgba(60,60,255,.5))" }}><path d="M50 88 C 20 66, 2 48, 2 28 C 2 12, 14 2, 28 2 C 38 2, 46 8, 50 16 C 54 8, 62 2, 72 2 C 86 2, 98 12, 98 28 C 98 48, 80 66, 50 88 Z" fill="#6670ff" /><path d="M30 44 L44 58 L72 30" stroke="#fff" strokeWidth={9} fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
				<div style={{ marginTop: 30, fontFamily: CJK, fontSize: 40, fontWeight: 700, color: "#4a52d8" }}>已加入热词</div></AbsoluteFill></AbsoluteFill> }
		case 43: case 44: { const k = i - 43, rise = lerp(t, C[42], C[44], 0, 1, (v) => v)
			return <AbsoluteFill style={{ background: "#000", overflow: "hidden" }}><Photo src="t21-earth.webp" style={{ left: -60, top: -40 - rise * 160, width: 2040, height: 1148 }} />
				<Word s={k ? "按一次 Fn" : "你的每一个输入框"} c="#fff" size={k ? 160 : 140} italic style={{ marginTop: k ? 40 : -10, textShadow: "0 4px 30px rgba(0,0,0,.5)" }} /></AbsoluteFill> }
		case 45: case 46: { const mn = i === 46, hv = mn && t > 37.9
			return <AbsoluteFill style={{ background: "linear-gradient(135deg,#8a6cf0,#c3a6ff)" }}><Zoom s={mn ? 1.5 : 1.8} x={mn ? 1410 : 830} y={mn ? 336 : 359}><div style={{ position: "absolute", left: 360, top: 120, width: mn ? 1300 : 760, height: 900, borderRadius: 26, background: "#f4f1fb", overflow: "hidden", fontFamily: CJK }}>
				<div style={{ position: "absolute", left: 30, top: 30, display: "flex", gap: 12 }}>{[0, 1, 2].map((k) => <span key={k} style={{ width: 20, height: 20, borderRadius: 10, background: "#cfc8e0" }} />)}<span style={{ marginLeft: 20, fontSize: 24, color: "#555" }}>mosmos.io</span></div>
				<div style={{ position: "absolute", left: 40, top: 110, display: "flex", gap: 24 }}>{["#ff4d4d", "#ff4d4d", "#2ac46b"].map((c, k) => <div key={k} style={{ width: 120, height: 90, borderRadius: 18, background: "#e7e2f2", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ width: 40, height: 40, borderRadius: 10, background: c }} /></div>)}</div>
				{["会议记录", "热词", "场景"].map((x, k) => <div key={x} style={{ position: "absolute", left: 50, top: 260 + k * 70, fontSize: 30, color: "#333" }}>□ {x}</div>)}
				{mn && <div style={{ position: "absolute", left: 560, top: 90, width: 620, borderRadius: 26, background: "#fff", boxShadow: "0 20px 50px rgba(0,0,0,.18)", padding: "26px 0", fontSize: 30, color: INK }}>
					<div style={{ padding: "0 34px 14px", fontSize: 22, color: "#888" }}>MosMos · 当前场景：自动识别</div>
					{["润色：标准", "新热词…", "全部热词"].map((x, k) => <div key={x} style={{ margin: "6px 18px", padding: "18px 18px", borderRadius: 14, background: k === 1 && hv ? "#e4dfe9" : k === 0 ? "#f2eef5" : undefined }}>{x}</div>)}</div>}</div>
				<Cursor x={mn ? lerp(t, C[45], 37.9, 1500, 1100, inOut) : lerp(t, C[44], C[45], 900, 1050)} y={mn ? lerp(t, C[45], 37.9, 600, 385, inOut) : lerp(t, C[44], C[45], 700, 520)} s={1.1} down={mn && Math.abs(t - 38.0) < 0.1} /></Zoom></AbsoluteFill> }
		case 47: { const p = (k: number) => clamp01((t - M.logo - k * 0.04) / 0.25), b = (k: number) => Math.sin(clamp01((t - M.logo - k * 0.04) / 0.4) * Math.PI) * -60
			return <Bg c="#f9f8e6"><AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}><div style={{ display: "flex", alignItems: "flex-end", gap: 0 }}>
				{Array.from("MosMos").map((ch, k) => <span key={k} style={{ fontFamily: "Geist, sans-serif", fontWeight: 900, fontSize: 260, color: "#2448e8", letterSpacing: "-0.04em", display: "inline-block", opacity: p(k), transform: `translateY(${b(k)}px) scale(${0.6 + 0.4 * out(p(k))}, ${1 + 0.25 * Math.sin(p(k) * Math.PI)})` }}>{ch}</span>)}
				<div style={{ marginLeft: 20, marginBottom: 150, opacity: p(6), transform: `rotate(${(1 - p(6)) * 90}deg)` }}><LogoPixels size={150} t={t} mode="static" /></div></div></AbsoluteFill></Bg> }
		default: { const u = clamp01((t - M.url) / 0.3)
			return <Bg c="#f9f8e6"><AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
				{u < 1 && <div style={{ opacity: 1 - u, transform: `scale(${lerp(t, C[47], C[47] + 0.4, 0.6, 1)})` }}><LogoPixels size={240} t={t} mode="static" /></div>}
				{u > 0 && <div style={{ position: "absolute", fontFamily: "Geist, sans-serif", fontWeight: 900, fontSize: 64, color: "#2448e8", opacity: u }}>mosmos.io</div>}</AbsoluteFill></Bg> }
	}
}
export const Film: React.FC = () => { const t = useT(); return scene(t) }
