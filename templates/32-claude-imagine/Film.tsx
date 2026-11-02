// Template 32 — structure of Anthropic "An experimental new way to design software" (2025), MosMos content.
// A lavender desk with drifting white lines. An intro card, then a spoken request in a bottom bar; a "我的输入" log
// on the right fills as the user talks, while windows open on the desk: a folder of meeting records, a note written
// by voice, a live meeting record with speakers and todos, an email written by voice, and a folder of apps where
// MosMos writes. A cream card with the logo closes it.
import React from "react"
import { AbsoluteFill } from "remotion"
import { CJK, lerp, clamp01, inOut, useT, Wave, LogoPixels, Wordmark, Cursor, path, Pill, COPY } from "../_engine/src/mos"
import { Camera } from "../_engine/src/kit"
import TL from "./timeline.json"

const M = TL.marks as Record<string, number>, C = TL.cuts
const LAV = "#c5c3db", WIN = "#f6f4ef", INKC = "#25221e", DIM = "#8b867d", LN = "#e4dfd5", ORG = "#c9563c", CREAM = "#f3f1ea"
const SERIF = "'Noto Serif CJK SC', 'Noto Serif SC', serif"
const k = (t: number, a: number, d = 0.35) => clamp01((t - a) / d)
const typed = (s: string, t: number, a: number, b: number) => Array.from(s).slice(0, Math.floor(clamp01((t - a) / (b - a)) * Array.from(s).length)).join("")
const ASK = "帮我把这周首页改版的会和想法都理一理"
const Lines: React.FC<{ t: number }> = ({ t }) => <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>{Array.from({ length: 6 }).map((_, i) => {
	const y = 120 + i * 170, a = t * 0.15 + i
	return <path key={i} d={`M-100,${y} C${300 + Math.sin(a) * 120},${y - 160} ${600 + Math.cos(a) * 140},${y + 200} ${960},${y + Math.sin(a * 1.3) * 40} S${1500 + Math.sin(a) * 100},${y - 180} 2020,${y + 60}`} stroke="rgba(255,255,255,.55)" strokeWidth={9} fill="none" strokeLinecap="round" />
})}</svg>
const Win: React.FC<{ x: number; y: number; w: number; h: number; title: string; op?: number; s?: number; children?: React.ReactNode }> = ({ x, y, w, h, title, op = 1, s = 1, children }) => (
	<div style={{ position: "absolute", left: x, top: y, width: w, height: h, borderRadius: 10, background: WIN, boxShadow: "0 18px 50px rgba(50,40,90,.22), 0 0 0 1px rgba(0,0,0,.06)", overflow: "hidden", opacity: op, transform: `scale(${s})`, fontFamily: CJK, color: INKC }}>
		<div style={{ height: 34, borderBottom: `1px solid ${LN}`, display: "flex", alignItems: "center", padding: "0 14px", fontSize: 15, color: "#555" }}>{title}<span style={{ flex: 1 }} /><span style={{ color: DIM }}>✕</span></div>
		<div style={{ position: "absolute", left: 0, right: 0, top: 34, bottom: 0 }}>{children}</div>
	</div>
)
// ---------- bottom bar + log panel
const CHIPS = ["整理这周的会", "给李经理回邮件", "写一条提示词"]
const Bar: React.FC<{ t: number }> = ({ t }) => {
	const s = typed(ASK, t, M.say, M.said), on = t > M.say && t < M.said
	return <div style={{ position: "absolute", left: 560, top: 880, width: 800, fontFamily: CJK }}>
		<div style={{ display: "flex", gap: 14, marginBottom: 14 }}>{CHIPS.map((c) => <div key={c} style={{ flex: 1, background: "rgba(236,234,244,.9)", borderRadius: 12, padding: "16px 18px", fontSize: 19, color: INKC, boxShadow: "0 0 0 1px rgba(255,255,255,.6)" }}>{c}</div>)}</div>
		<div style={{ height: 64, borderRadius: 32, background: "rgba(246,245,250,.95)", display: "flex", alignItems: "center", padding: "0 12px 0 28px", gap: 14, boxShadow: "0 8px 30px rgba(50,40,90,.15)" }}>
			<div style={{ flex: 1, fontSize: 22, color: s && t < M.out + 0.5 ? INKC : "#9c99ab" }}>{t < M.out + 0.5 && s ? s : "按 Fn 开始说"}</div><Wave t={t} live={on} n={7} h={22} color="#555" />
			<div style={{ width: 44, height: 44, borderRadius: 22, background: ORG, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>↑</div>
		</div>
	</div>
}
const LOG: [number, string][] = [[0, "已记下：" + ASK + "。"], [1, "会议记录里有 6 场首页改版相关的会。"], [2, "已在「首页改版想法」里写好一段。"], [3, "正在记录：首页改版周会。"], [4, "已写好给李经理的邮件。"], [5, "这些应用里，按 Fn 都能直接说。"]]
const LOG_T = [M.log, M.files + 1.0, M.noteEnd, M.meet + 0.5, M.mailEnd, M.icons + 2.0]
const Log: React.FC<{ t: number }> = ({ t }) => {
	const shown = LOG.filter(([i]) => t > LOG_T[i]).slice(-3)
	if (!shown.length) return null
	return <div style={{ position: "absolute", left: 1440, top: 130, width: 380, fontFamily: CJK }}>
		<div style={{ position: "absolute", left: 340, top: -52, width: 34, height: 34, borderRadius: 17, background: "#f6f4ef", display: "flex", alignItems: "center", justifyContent: "center" }}><LogoPixels size={20} t={t} mode="static" /></div>
		<div style={{ borderRadius: 14, background: "rgba(246,245,250,.95)", padding: "18px 20px", boxShadow: "0 8px 30px rgba(50,40,90,.12)", fontSize: 17, lineHeight: 1.7, color: "#3b3846" }}>
			<div style={{ fontSize: 14, color: DIM, marginBottom: 6 }}>我的输入</div>
			{shown.map(([i, s]) => { const lt = LOG_T[i]; return <div key={i} style={{ marginBottom: 10 }}>{typed(s, t, lt, lt + 1.2)}</div> })}
		</div>
	</div>
}
// ---------- intro card
const Intro: React.FC<{ t: number }> = ({ t }) => {
	const a = k(t, 0.3, 0.5), out = k(t, M.go + 0.2, 0.6)
	const cur = path(t, [[1.5, 1200, 700], [M.go - 0.5, 965, 520], [M.go, 966, 522]])
	return <><div style={{ position: "absolute", left: 960 - 210, top: 290, width: 420, height: 420, background: WIN, borderRadius: 6, boxShadow: "0 18px 50px rgba(50,40,90,.18)", opacity: a * (1 - out), display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: CJK, color: INKC, transform: `translateY(${-out * 40}px)` }}>
		<LogoPixels size={56} t={t} mode="static" /><div style={{ fontSize: 26, fontWeight: 600, marginTop: 22 }}>和 MosMos 一起写</div>
		<div style={{ fontSize: 15, color: DIM, textAlign: "center", lineHeight: 1.6, marginTop: 10, width: 320 }}>按 Fn 开始说，再按一次，<br />文字就写进你正在用的应用。</div>
		<div style={{ marginTop: 26, background: "#151515", color: "#fff", fontSize: 16, borderRadius: 6, padding: "8px 22px", transform: `scale(${Math.abs(t - M.go) < 0.1 ? 0.93 : 1})` }}>开始</div>
		<div style={{ fontSize: 12, color: "#aaa", marginTop: 22 }}>mosmos.io</div>
	</div>{t > 1.5 && t < M.go + 0.5 && <Cursor x={cur.x} y={cur.y} down={Math.abs(t - M.go) < 0.1} s={0.9} />}</>
}
// ---------- folder windows
const SIDE = ["桌面", "文稿", "下载", "会议记录", "应用"]
const Folder: React.FC<{ t: number; sel: string; items: [string, string][]; t0: number; step?: number; cols?: number }> = ({ t, sel, items, t0, step = 0.6, cols = 6 }) => (
	<div style={{ display: "flex", height: "100%" }}>
		<div style={{ width: 170, padding: 14, fontSize: 15, lineHeight: "30px", color: "#555" }}><div style={{ fontSize: 12, color: DIM }}>位置</div>{SIDE.map((s) => <div key={s} style={{ borderRadius: 6, paddingLeft: 8, background: s === sel ? ORG : "transparent", color: s === sel ? "#fff" : "#555" }}>▸ {s}</div>)}</div>
		<div style={{ flex: 1, display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 22, padding: 26, alignContent: "start" }}>{items.map(([ic, n], i) => <div key={n} style={{ textAlign: "center", fontSize: 13, opacity: k(t, t0 + i * step, 0.25), transform: `scale(${0.6 + 0.4 * k(t, t0 + i * step, 0.25)})` }}><div style={{ fontSize: 44, height: 56, color: ic.startsWith("#") ? ic : "#9a7b52" }}>{ic.startsWith("#") ? <div style={{ width: 52, height: 52, margin: "0 auto", borderRadius: 12, background: ic, color: "#fff", fontSize: 26, display: "flex", alignItems: "center", justifyContent: "center" }}>{n[0]}</div> : ic}</div>{n}</div>)}</div>
	</div>
)
const RECS: [string, string][] = [["▤", "首页改版周会"], ["▤", "交互稿评审"], ["▤", "品牌素材对齐"], ["▤", "视觉方向讨论"], ["▤", "Nimbus 需求沟通"], ["▤", "设计组例会"], ["▦", "热词表"], ["▦", "逐字稿导出"]]
const DESK: [string, string][] = [["✎", "首页改版想法"], ["◎", "会议记录"], ["✉", "邮件草稿"], ["▦", "待办清单"]]
const APPS: [string, string][] = [["#4a8fe0", "聊天"], ["#3aa36a", "邮件"], ["#e0a43a", "文档"], ["#d9534f", "表格"], ["#222222", "终端"], ["#7b5ad6", "提示词"], ["#e07a3a", "笔记"], ["#2fa3b5", "日历"], ["#a6478d", "幻灯片"], ["#5d7a2e", "浏览器"], ["#c27c2e", "任务"], ["#4b5bd6", "代码编辑器"], ["#888888", "设置"], ["#d2588a", "相册"], ["#3c8c8c", "地图"], ["#6b6b2e", "阅读"]]
// ---------- note / meeting / mail
const NOTE = "首页改版的想法：先把首屏的信息减到三块，客户的品牌素材到位后再定主视觉。交互稿周三前给到，视觉方案周四开始。"
const Note: React.FC<{ t: number }> = ({ t }) => <div style={{ padding: "26px 30px", fontSize: 20, lineHeight: 1.8 }}><div style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 30, marginBottom: 14 }}>首页改版想法</div>{typed(NOTE, t, M.noteSay + 0.4, M.noteEnd)}{t < M.noteEnd + 0.3 && <span style={{ color: "#bbb" }}>|</span>}</div>
const Meet: React.FC<{ t: number }> = ({ t }) => <div style={{ padding: 24, fontSize: 17 }}>
	<div style={{ display: "flex", alignItems: "center", gap: 12 }}><span style={{ width: 12, height: 12, borderRadius: 6, background: "#e0473a" }} /><b style={{ fontSize: 22 }}>首页改版周会 · 记录中</b><span style={{ flex: 1 }} /><Wave t={t} live n={9} h={24} color={INKC} /></div>
	{t > M.rows && <div style={{ display: "flex", gap: 30, marginTop: 22, opacity: k(t, M.rows, 0.4) }}>{["说话人 1", "说话人 2", "说话人 3"].map((s, i) => <div key={s} style={{ textAlign: "center" }}><div style={{ width: 70, height: 70, borderRadius: 35, background: ["#d9774a", "#6b8f71", "#5f7fb4"][i], color: "#fff", fontSize: 28, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto" }}>{i + 1}</div><div style={{ marginTop: 6, color: DIM }}>{s}</div></div>)}</div>}
	{t > M.spk && <div style={{ marginTop: 22, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, opacity: k(t, M.spk, 0.4) }}>{COPY.meeting.map(([w, tm, s]) => <div key={tm} style={{ borderRadius: 10, background: "#ece8de", padding: "12px 14px", lineHeight: 1.5 }}><b>{w}</b> <span style={{ color: DIM }}>{tm}</span><br />{s}</div>)}</div>}
	{t > M.todo && <div style={{ marginTop: 18, display: "flex", gap: 12, flexWrap: "wrap", opacity: k(t, M.todo, 0.4) }}>{COPY.todos.map((x) => <span key={x} style={{ borderRadius: 8, padding: "6px 12px", background: "#dff0dc", color: "#2e6b34" }}>待办 · {x}</span>)}</div>}
</div>
const MAILT = COPY.mail.join("\n")
const Mail: React.FC<{ t: number }> = ({ t }) => <div style={{ padding: 24, fontSize: 18 }}>
	<div style={{ display: "flex", gap: 12, alignItems: "center", borderBottom: `1px solid ${LN}`, paddingBottom: 10 }}><span style={{ color: DIM }}>收件人</span><b>李经理</b><span style={{ flex: 1 }} /><span style={{ background: "#dff0dc", color: "#2e6b34", borderRadius: 6, padding: "2px 10px", fontSize: 14 }}>场景：邮件</span></div>
	<div style={{ display: "flex", gap: 12, borderBottom: `1px solid ${LN}`, padding: "10px 0" }}><span style={{ color: DIM }}>主题</span>首页改版 · 第一版时间</div>
	<div style={{ whiteSpace: "pre-wrap", lineHeight: 1.9, marginTop: 14, fontSize: 20 }}>{typed(MAILT, t, M.mailSay + 0.4, M.mailEnd)}</div>
	{t > M.mailEnd && <div style={{ position: "absolute", right: 24, bottom: 20, background: Math.abs(t - M.sent) < 0.12 ? "#a8432e" : ORG, color: "#fff", borderRadius: 8, padding: "8px 22px" }}>{t > M.sent ? "已发送 ✓" : "发送"}</div>}
</div>
// ---------- stage
const Stage: React.FC<{ t: number }> = ({ t }) => {
	const fileT = C[0], deskT = M.desk
	const cur = path(t, [[C[0], 1100, 900], [M.desk - 0.5, 100, 226], [M.desk, 102, 229], [C[1] + 0.2, 700, 500], [C[4] + 0.5, 1000, 800], [M.apps - 0.5, 100, 346], [M.apps, 102, 349], [C[5], 700, 760]])
	const showCur = (t > C[0] + 0.5 && t < C[1] + 0.3) || (t > C[4] && t < C[5])
	const sentCur = path(t, [[M.mailEnd, 1100, 900], [M.sent - 0.3, 1140, 722], [M.sent, 1142, 724]])
	let main: React.ReactNode = null
	if (t < C[1]) main = <Win x={40} y={150} w={1340} h={450} title={t < deskT ? "会议记录" : "桌面"} s={lerp(k(t, fileT, 0.2), 0, 1, 0.97, 1)}>{t < deskT ? <Folder t={t} sel="会议记录" items={RECS} t0={M.files} step={0.8} /> : <Folder t={t} sel="桌面" items={DESK} t0={deskT + 0.3} step={t > M.more ? 0.5 : 1.5} />}</Win>
	else if (t < C[2]) main = <><Win x={40} y={150} w={1340} h={450} title="桌面"><Folder t={99} sel="桌面" items={DESK} t0={0} /></Win><Win x={140} y={200} w={900} h={460} title="首页改版想法.txt" s={lerp(k(t, C[1], 0.3), 0, 1, 0.85, 1)}><Note t={t} /></Win>
		{t > M.noteSay - 0.3 && t < M.noteEnd + 0.8 && <div style={{ position: "absolute", left: 420, top: 690 }}><Pill t={t} state={t < M.noteEnd ? "语音输入" : "已写好"} sub="场景：文档 · 标准润色" live={t < M.noteEnd} scale={0.8} /></div>}</>
	else if (t < C[3]) main = <><Win x={40} y={150} w={1340} h={450} title="桌面"><Folder t={99} sel="桌面" items={DESK} t0={0} /></Win><Win x={200} y={190} w={900} h={600} title="会议记录 · 首页改版周会" s={lerp(k(t, M.meet, 0.3), 0, 1, 0.85, 1)} op={k(t, M.meet, 0.2)}><Meet t={t} /></Win></>
	else if (t < C[4]) main = <><Win x={40} y={150} w={1340} h={450} title="桌面"><Folder t={99} sel="桌面" items={DESK} t0={0} /></Win><Win x={200} y={180} w={1000} h={580} title="新邮件" s={lerp(k(t, M.mail, 0.3), 0, 1, 0.85, 1)} op={k(t, M.mail, 0.2)}><Mail t={t} /></Win>
		{t > M.mailSay - 0.3 && t < M.mailEnd + 0.8 && <div style={{ position: "absolute", left: 480, top: 790 }}><Pill t={t} state={t < M.mailEnd ? "语音输入" : "已写好"} sub="场景：邮件 · 标准润色" live={t < M.mailEnd} scale={0.8} /></div>}
		{t > M.mailEnd && <Cursor x={sentCur.x} y={sentCur.y} down={Math.abs(t - M.sent) < 0.1} s={0.9} />}</>
	else main = <Win x={40} y={150} w={1340} h={t < M.apps ? 450 : lerp(k(t, M.icons + 6, 1.0), 0, 1, 450, 600)} title={t < M.apps ? "桌面" : "应用"}>{t < M.apps ? <Folder t={99} sel="桌面" items={DESK} t0={0} /> : <Folder t={t} sel="应用" items={APPS} t0={M.icons} step={1.0} cols={8} />}</Win>
	return <AbsoluteFill style={{ background: LAV, overflow: "hidden" }}><Lines t={t} />{main}<Bar t={t} /><Log t={t} />{showCur && <Cursor x={cur.x} y={cur.y} down={Math.abs(t - M.desk) < 0.1 || Math.abs(t - M.apps) < 0.1} s={0.9} />}</AbsoluteFill>
}
const End: React.FC<{ t: number }> = ({ t }) => {
	const d = k(t, M.dot, 0.3), a = inOut(k(t, M.logo, 0.5))
	return <AbsoluteFill style={{ background: CREAM, alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 20 * a }}>
		<div style={{ opacity: d, transform: `scale(${t < M.logo ? lerp(d, 0, 1, 0.4, 1) : 1})` }}><LogoPixels size={72} t={t} mode="static" /></div>
		<div style={{ width: a * 370, overflow: "hidden", opacity: a }}><Wordmark size={86} color={INKC} /></div>
	</AbsoluteFill>
}
export const Film: React.FC = () => {
	const t = useT()
	if (t < M.chips) return <AbsoluteFill style={{ background: LAV }}><Lines t={t} /><Intro t={t} /></AbsoluteFill>
	if (t < C[0]) {
		return <Camera t={t} keys={[[M.chips, 1.9, 960, 785], [M.out, 1.9, 960, 790], [M.out + 0.7, 1.0, 960, 540], [C[0], 1.0, 960, 540]]}><AbsoluteFill style={{ background: LAV }}><Lines t={t} /><div style={{ opacity: k(t, M.chips, 0.5) }}><Bar t={t} /></div><Log t={t} /></AbsoluteFill></Camera>
	}
	if (t < C[5]) return <Stage t={t} />
	return <End t={t} />
}
