// Template 50 — structure of Anthropic "Create polished files in minutes with Sonnet 4.5" (2025), MosMos content.
// One long warm-beige screen take: a hand-drawn easel opens, a mail window zooms in and a request is highlighted, a chat
// window's input is filled by voice and MosMos turns the rambling request into a clear prompt, the reply streams with
// step rows and file cards, a progress sheet opens and one cell is filled by voice, a document and a second spoken request
// follow, the reply draft opens in mail, and a grid of line icons gathers into the pixel logo.
import React from "react"
import { AbsoluteFill } from "remotion"
import { CJK, SANS, lerp, clamp01, inOut, out, useT, Wave, LogoPixels, Wordmark, Pill, path, COPY } from "../_engine/src/mos"
import { Camera, CamKey, Hand, SERIF, track } from "../_engine/src/kit"
import TL from "./timeline.json"

const M = TL.marks as Record<string, number>, C = TL.cuts as number[]
const BG = "#e4dacd", WIN = "#faf8f4", INKC = "#25221e", DIM = "#8b867d", LN = "#e6e0d5", ORG = "#d9774a", HL = "#f0b89a", BUB = "#edebe3"
const k = (t: number, a: number, d = 0.35) => clamp01((t - a) / d)
const chars = (s: string, t: number, a: number, d: number) => Array.from(s).slice(0, Math.floor(k(t, a, d) * Array.from(s).length + 0.001)).join("")

// ---------- backdrop with contour lines
const Topo: React.FC = () => <AbsoluteFill style={{ background: BG }}><svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
	{Array.from({ length: 14 }).map((_, i) => { const y = -60 + i * 90, a = 30 + (i % 4) * 14
		return <path key={i} d={`M-50,${y} C300,${y - a} 520,${y + a * 1.6} 860,${y + 10} S1400,${y - a * 1.4} 1980,${y + a}`} stroke="#fff" strokeOpacity={0.28} strokeWidth={2.2} fill="none" /> })}
	{[[330, 760, 120], [1500, 260, 150], [1650, 860, 90]].map(([x, y, r], i) => [1, 0.7, 0.42].map((f) => <ellipse key={i + "-" + f} cx={x} cy={y} rx={r * f * 1.4} ry={r * f} stroke="#fff" strokeOpacity={0.26} strokeWidth={2.2} fill="none" />))}
</svg></AbsoluteFill>

// ---------- 0: hand-drawn easel
const Draw: React.FC<{ d: string; p: number; w?: number; c?: string; len?: number }> = ({ d, p, w = 7, c = INKC, len = 1400 }) => <path d={d} stroke={c} strokeWidth={w} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={len} strokeDashoffset={len * (1 - clamp01(p))} />
const HandD: React.FC<{ x: number; y: number }> = ({ x, y }) => <g transform={`translate(${x},${y})`}><path d="M-40,10 Q-46,-20 -30,-28 Q-20,-30 -18,-12 L-16,-34 Q-8,-44 2,-34 L2,-14 L6,-38 Q14,-46 22,-36 L20,-10 L26,-30 Q34,-36 40,-26 Q44,10 30,34 Q10,52 -14,44 Q-34,36 -40,10 Z" stroke={INKC} strokeWidth={6} fill="#fbfaf6" strokeLinejoin="round" /><circle cx={-2} cy={-2} r={14} stroke={INKC} strokeWidth={6} fill="none" /></g>
const Opener: React.FC<{ t: number }> = ({ t }) => {
	const pull = inOut(k(t, M.pull, 0.6)), rel = k(t, M.rel, 0.3), sh = 470 * pull, hy = t < M.rel ? 300 + sh + 20 : 300 + sh + 20 + 400 * rel * rel
	const wave = (p: number, alt: number) => Array.from({ length: 11 }).map((_, i) => { const h = (alt ? [40, 90, 60, 140, 80, 170, 110, 70, 130, 60, 30] : [30, 60, 120, 80, 150, 100, 160, 90, 60, 100, 40])[i] * clamp01(p * 11 - i)
		return <line key={i} x1={720 + i * 48} x2={720 + i * 48} y1={470 - h / 2} y2={470 + h / 2} stroke={INKC} strokeWidth={11} strokeLinecap="round" /> })
	return <AbsoluteFill><Topo /><svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
		<Draw d="M600,232 L1335,232" p={1} w={12} /><path d="M600,222 L1335,222 L1335,244 L600,244 Z" fill="none" stroke={INKC} strokeWidth={6} />
		<Draw d="M965,222 L965,205 M950,205 A15,15 0 1 1 980,205" p={1} w={6} len={200} />
		{sh > 2 && <path d={`M640,244 L1295,244 L1295,${244 + sh} L640,${244 + sh} Z`} fill="#fbfaf6" stroke={INKC} strokeWidth={7} />}
		{sh > 2 && <path d={`M625,${244 + sh} L1310,${244 + sh}`} stroke={INKC} strokeWidth={10} strokeLinecap="round" />}
		{t > M.line && t < M.redraw && wave(k(t, M.line, 0.4), 0)}{t >= M.redraw && wave(k(t, M.redraw, 0.35), 1)}
		<path d={`M965,${244 + sh} L965,${270 + sh + (t > M.rel ? 25 * Math.sin((t - M.rel) * 14) * (1 - rel) : 0)}`} stroke={INKC} strokeWidth={5} />
		<circle cx={965} cy={276 + sh} r={9} fill="none" stroke={INKC} strokeWidth={5} />
		{(t < M.rel + 0.35) && <HandD x={985} y={t < M.pull ? 320 + 40 * Math.sin(t * 3) * 0 + 110 * (1 - k(t, 0, M.pull)) : hy} />}
	</svg></AbsoluteFill>
}

// ---------- windows
const Win: React.FC<{ title: string; dark?: boolean; children?: React.ReactNode; x?: number; y?: number; w?: number; h?: number }> = ({ title, dark, children, x = 160, y = 90, w = 1600, h = 900 }) =>
	<div style={{ position: "absolute", left: x, top: y, width: w, height: h, borderRadius: 18, background: WIN, boxShadow: "0 30px 80px rgba(80,60,20,.2)", overflow: "hidden", fontFamily: CJK, color: INKC }}>
		<div style={{ height: 56, background: dark ? "#2b2a29" : "#f1ede6", display: "flex", alignItems: "center", gap: 10, padding: "0 20px" }}>{["#ee6a5f", "#f5be4f", "#62c554"].map((c) => <span key={c} style={{ width: 14, height: 14, borderRadius: 7, background: c }} />)}
			<span style={{ marginLeft: 20, padding: "6px 18px", borderRadius: 8, background: dark ? "#3c3b39" : "#fff", fontSize: 18, color: dark ? "#ddd" : "#555" }}>{title}</span></div>
		<div style={{ position: "absolute", left: 0, right: 0, top: 56, bottom: 0, overflow: "hidden" }}>{children}</div></div>
const MAILIN = ["小林，你好：", "周四开会前，想请你先整理三件事：", "· 交互稿进度", "· 品牌素材什么时候到", "· 视觉方案的时间安排", "麻烦尽快整理一份进度说明，谢谢！", "李经理"]
const Mail: React.FC<{ t: number; reply?: boolean }> = ({ t, reply }) => { const o = reply ? 1 : k(t, M.mailIn, 0.3), sel = k(t, M.sel0, M.sel1 - M.sel0)
	const rows = reply ? COPY.mail : MAILIN
	return <div style={{ position: "absolute", inset: 0, background: "#fff" }}>
		<div style={{ position: "absolute", left: 0, top: 0, width: 230, bottom: 0, background: "#f7f5f1", borderRight: `1px solid ${LN}` }}>{["收件箱", "已加星标", "已发送", "草稿"].map((s, i) => <div key={s} style={{ margin: "20px 26px 0", fontSize: 20, color: i === (reply ? 3 : 0) ? INKC : DIM, fontWeight: i === (reply ? 3 : 0) ? 700 : 400 }}>{s}</div>)}</div>
		<div style={{ position: "absolute", left: 230, right: 0, top: 0, height: 64, borderBottom: `1px solid ${LN}`, display: "flex", alignItems: "center", gap: 26, padding: "0 30px", fontSize: 20, color: DIM }}>{["←", "□", "⌫", "✉", "⋯"].map((s) => <span key={s}>{s}</span>)}</div>
		<div style={{ position: "absolute", left: 300, top: 100, width: 1100, opacity: o }}>
			<div style={{ display: "flex", alignItems: "center", gap: 18 }}><span style={{ width: 48, height: 48, borderRadius: 24, background: reply ? "#d9774a" : "#6b8f71", color: "#fff", fontSize: 22, display: "flex", alignItems: "center", justifyContent: "center" }}>{reply ? "林" : "李"}</span>
				<div><div style={{ fontSize: 22, fontWeight: 700 }}>{reply ? "小林" : "李经理"} <span style={{ fontWeight: 400, color: DIM, fontSize: 18 }}>{reply ? "收件人：李经理" : "发给 我"}</span></div><div style={{ fontSize: 17, color: DIM }}>{reply ? "回复：首页改版进度 · 草稿" : "首页改版进度"}</div></div></div>
			<div style={{ marginTop: 40, fontSize: 26, lineHeight: 1.75 }}>{rows.map((s, i) => { const on = !reply && i >= 2 && i <= 4
				return <div key={i} style={{ marginTop: i === rows.length - 1 || (!reply && i === 5) || (reply && i >= 2) ? 22 : 0 }}><span style={{ background: on && sel > 0 ? `linear-gradient(90deg, ${HL} ${sel * 100}%, transparent ${sel * 100}%)` : undefined, padding: "2px 4px" }}>{s}</span></div> })}</div></div></div> }

// ---------- chat
const RAW1 = "嗯，帮我，根据李经理这封邮件，整理一下首页改版的进度，就是交互稿、品牌素材，还有那个视觉方案，做个进度表，再写一页说明。"
const P1 = ["请根据李经理的邮件，整理首页改版的进度：", "· 交互稿进度", "· 品牌素材到位时间", "· 视觉方案安排", "输出要求：一份进度表和一页说明，语气正式。"]
const RAW2 = "嗯，这些都没问题，那个，再帮我写一封回复给李经理，就说第一版方案周三前发他，请他今天把品牌素材发我。"
const P2 = ["这些都没问题。请再写一封回复给李经理：第一版方案周三前发给他，并请他今天把品牌素材发给我。"]
type It = { k: "p" | "step" | "row" | "h" | "link" | "li" | "file"; s: string; b?: string }
const IT1: It[] = [{ k: "p", s: "好的，我先看一下邮件和会议记录，再整理进度表和说明。" }, { k: "step", s: "读取 李经理的邮件 和 首页改版 · 会议记录" }, { k: "p", s: "会议里提到的待办如下，我按时间整理：" },
	...COPY.meeting.map((m) => ({ k: "row" as const, s: `${m[0]} · ${m[1]}　${m[2]}` })), { k: "p", s: "信息够了，开始整理进度表和说明。" }, { k: "row", s: "新建 首页改版进度表" }, { k: "row", s: "新建 进度说明" },
	{ k: "p", s: "都整理好了。" }, { k: "h", s: "✓ 首页改版进度表和说明已整理好" }, { k: "link", s: "▦ 进度表　　▤ 进度说明" }, { k: "p", s: COPY.meetingConclusion }, { k: "li", s: COPY.todos.join("\n") }]
const IT2: It[] = [{ k: "p", s: "好的，我按邮件的格式来写。" }, { k: "step", s: "写作 回复李经理 · 邮件草稿" }, { k: "row", s: "称呼与问候" }, { k: "row", s: "交付时间：周三前" }, { k: "row", s: "请求：今天提供品牌素材" },
	{ k: "h", s: "✓ 回复邮件已写好" }, { k: "link", s: "✉ 查看邮件" }, { k: "p", s: "邮件包括：" }, { k: "li", s: COPY.mail.slice(0, 3).join("\n") }, { k: "file", s: "回复李经理 · 邮件草稿", b: "打开" }]
const FILES = [["首页改版进度表", "表格 · XLSX"], ["进度说明", "文档 · DOCX"]]
const hOf = (it: It) => it.k === "p" ? (Array.from(it.s).length > 30 ? 96 : 56) : it.k === "li" ? it.s.split("\n").length * 44 + 16 : it.k === "h" ? 70 : it.k === "file" ? 110 : 52
const Item: React.FC<{ it: It; t: number; t0: number }> = ({ it, t, t0 }) => { const a = k(t, t0, 0.25)
	if (it.k === "p") return <div style={{ fontFamily: SERIF, fontSize: 26, lineHeight: 1.75 }}>{chars(it.s, t, t0, Math.min(1.2, Array.from(it.s).length * 0.03))}</div>
	if (it.k === "step" || it.k === "row") { const done = t > t0 + 0.7
		return <div style={{ opacity: a, display: "flex", alignItems: "center", gap: 14, height: 44, padding: "0 18px", borderRadius: 10, boxShadow: `inset 0 0 0 1px ${LN}`, background: "#fff", fontSize: 19, color: "#4a463f", width: it.k === "step" ? 820 : 900 }}>
			<span style={{ color: done ? "#6b8f71" : ORG }}>{done ? "✓" : "◌"}</span>{it.s}<span style={{ flex: 1 }} /><span style={{ color: "#b7b1a6", fontSize: 16 }}>{it.k === "step" ? "已读取 ⌄" : "完成 ⌄"}</span></div> }
	if (it.k === "h") return <div style={{ opacity: a, fontFamily: SERIF, fontSize: 32, fontWeight: 700, color: INKC }}><span style={{ background: "#6b8f71", color: "#fff", borderRadius: 6, padding: "0 6px", marginRight: 10 }}>✓</span>{it.s.slice(2)}</div>
	if (it.k === "link") return <div style={{ opacity: a, fontFamily: SERIF, fontSize: 26, color: INKC, textDecoration: "underline", textUnderlineOffset: 6 }}>{it.s}</div>
	if (it.k === "li") return <div style={{ opacity: a, fontFamily: SERIF, fontSize: 25, lineHeight: 1.75 }}>{it.s.split("\n").map((s, i) => <div key={i} style={{ opacity: k(t, t0 + i * 0.2, 0.2) }}>•　{s}</div>)}</div>
	return <FileCard t={t} name={it.s} kind="邮件 · 草稿" btn={it.b || "下载"} o={a} />
}
const FileCard: React.FC<{ t: number; name: string; kind: string; btn: string; o?: number; press?: boolean }> = ({ name, kind, btn, o = 1, press }) =>
	<div style={{ opacity: o, display: "flex", alignItems: "center", gap: 20, width: 900, height: 92, padding: "0 24px", boxSizing: "border-box", borderRadius: 14, background: "#fff", boxShadow: `inset 0 0 0 1px ${LN}` }}>
		<span style={{ width: 40, height: 50, borderRadius: 6, border: `2px solid ${DIM}` }} /><div style={{ flex: 1 }}><div style={{ fontSize: 22 }}>{name}</div><div style={{ fontSize: 16, color: DIM }}>{kind}</div></div>
		<span style={{ padding: "10px 22px", borderRadius: 10, boxShadow: `inset 0 0 0 1px ${LN}`, fontSize: 19, background: press ? "#efe9df" : "#faf8f4" }}>⤓ {btn}</span></div>
const Input: React.FC<{ t: number; raw: string; p: string[]; say: number; said: number; pol: number; ph: string; chips?: boolean; w?: number; sub: string }> = ({ t, raw, p, say, said, pol, ph, chips, w = 1000, sub }) => {
	const polished = t > pol + 0.35, s = chars(raw, t, say, said - say), dz = k(t, M.drag, 0.3)
	return <div style={{ position: "relative", width: w, borderRadius: 24, background: "#fff", boxShadow: `0 0 0 1.5px ${LN}, 0 10px 30px rgba(80,60,20,.06)`, padding: "24px 30px 18px", boxSizing: "border-box" }}>
		<div style={{ fontSize: 24, lineHeight: 1.6, minHeight: 40, color: s ? INKC : "#aaa398" }}>{polished ? p.map((x, i) => <div key={i} style={{ opacity: k(t, pol + 0.35 + i * 0.06, 0.2) }}>{x}</div>) : s ? <span style={{ color: t > pol ? "#b3ada3" : INKC }}>{s}</span> : ph}
			{t > say && !polished && t < said + 0.3 && <span style={{ color: "#bbb" }}>|</span>}</div>
		{chips && t > M.drop && <div style={{ display: "flex", gap: 14, marginTop: 12 }}>{["李经理的邮件", "首页改版 · 会议记录"].map((h) => <div key={h} style={{ width: 170, height: 110, borderRadius: 10, boxShadow: `inset 0 0 0 1px ${LN}`, padding: 12, boxSizing: "border-box", fontSize: 16, color: "#5d5850", opacity: k(t, M.drop, 0.25) }}>{h}<div style={{ marginTop: 34, fontSize: 13, color: DIM }}>附件</div></div>)}</div>}
		<div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 14, fontSize: 18, color: DIM }}><span style={{ border: `1px solid ${LN}`, borderRadius: 8, padding: "2px 10px" }}>＋</span><span>⚲ 搜索</span><span style={{ flex: 1 }} />
			{t > say && t < pol + 0.4 && <Wave t={t} live={t < said} n={7} h={24} color={INKC} />}<span>AI 助手 ⌄</span>
			<span style={{ width: 40, height: 40, borderRadius: 10, background: ORG, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>↑</span></div>
		{t > say - 0.2 && t < pol + 1.0 && <div style={{ position: "absolute", left: w / 2 - 200, top: "100%", marginTop: 26, opacity: 1 - k(t, pol + 0.7, 0.3) }}><Pill t={t} state={t < said ? "语音输入" : t < pol + 0.35 ? "润色中" : "已写好"} sub={sub} live={t < said} /></div>}
		{chips && dz > 0 && t < M.drop && <div style={{ position: "absolute", inset: 0, borderRadius: 24, background: `rgba(222,236,250,${0.94 * dz})`, border: "3px dashed #9cc0e6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, color: "#3d7cc0" }}>松开，添加附件</div>}
	</div>
}
const Home: React.FC<{ t: number }> = ({ t }) => <div style={{ position: "absolute", inset: 0 }}>
	<div style={{ position: "absolute", top: 230, left: 0, right: 0, display: "flex", justifyContent: "center", alignItems: "center", gap: 22, fontFamily: SERIF, fontSize: 60 }}><LogoPixels size={50} t={t} mode="static" />下午好，小林</div>
	<div style={{ position: "absolute", left: 300, top: 350 }}><Input t={t} raw={RAW1} p={P1} say={M.say} said={M.said} pol={M.pol} ph="今天想做点什么？" chips sub="场景：提示词 · 要求明确" /></div></div>
// conversation: list of [item, t0]; scroll keeps the newest item in view
const Conv: React.FC<{ t: number; user: string[]; items: It[]; times: number[]; t0: number; files?: boolean; pressDl?: number; extraScroll?: number; noInput?: boolean }> = ({ t, user, items, times, t0, files, pressDl = -1, extraScroll = 0, noInput }) => {
	let y = 0; const tops: number[] = []; const ub = user.length * 40 + 60
	y = ub + 40; items.forEach((it) => { tops.push(y); y += hOf(it) + 22 })
	const fy = y; if (files) y += 2 * 112
	const keys: [number, number][] = [[t0, 0]]; items.forEach((it, i) => keys.push([times[i] + 0.2, Math.max(0, tops[i] + hOf(it) - 560)]))
	if (files) keys.push([times[times.length - 1] + 1.4, Math.max(0, fy + 224 - 600)])
	const sc = track(t, keys) + extraScroll
	return <div style={{ position: "absolute", inset: 0 }}><div style={{ position: "absolute", left: 300, top: 40 - sc, width: 1000 }}>
		<div style={{ position: "absolute", left: 0, top: 0, width: 1000, borderRadius: 18, background: BUB, padding: "24px 30px", boxSizing: "border-box", fontSize: 23, lineHeight: 1.7, opacity: k(t, t0, 0.25) }}>
			<span style={{ float: "left", width: 36, height: 36, borderRadius: 18, background: "#6b8f71", color: "#fff", fontSize: 18, textAlign: "center", lineHeight: "36px", marginRight: 16 }}>林</span>{user.map((s, i) => <div key={i}>{s}</div>)}</div>
		{items.map((it, i) => t >= times[i] && <div key={i} style={{ position: "absolute", left: 0, top: tops[i], width: 1000 }}><Item it={it} t={t} t0={times[i]} /></div>)}
		{t < times[times.length - 1] + 1.2 && <div style={{ position: "absolute", left: 0, top: tops[items.findIndex((_, i) => i === items.length - 1 || t < times[i + 1])] + 70, color: ORG, fontSize: 30, transform: `rotate(${t * 200}deg)`, width: 30, textAlign: "center" }}>◌</div>}
		{files && FILES.map(([n, kd], i) => <div key={n} style={{ position: "absolute", left: 0, top: fy + i * 112 }}><FileCard t={t} name={n} kind={kd} btn="下载" o={k(t, times[times.length - 1] + 0.6 + i * 0.2, 0.3)} press={pressDl === i} /></div>)}
	</div>
		{!noInput && <div style={{ position: "absolute", left: 300, bottom: 26, width: 1000, height: 104, borderRadius: 22, background: "#fff", boxShadow: `0 0 0 1.5px ${LN}`, fontSize: 22, color: "#aaa398", padding: "18px 28px", boxSizing: "border-box" }}>回复 AI 助手…<div style={{ position: "absolute", right: 20, bottom: 14, width: 36, height: 36, borderRadius: 10, background: "#e8b49a" }} /></div>}</div>
}

// ---------- sheet + doc
const ROWS = [["今天同步品牌素材", "小林", "今天", "已完成"], ["周三前提交交互稿", "林清禾", "周三", "进行中"], ["周四启动视觉设计", "小林", "周四", ""], ["首页上线", "全组", "周五", ""]]
const Sheet: React.FC<{ t: number; tab: number }> = ({ t, tab }) => { const fill = k(t, M.cellSay, M.cellDone - M.cellSay), done = t > M.cellDone
	const val = (r: number, c: number) => r === 2 && c === 3 ? (t > M.cellSay ? chars("准备中", t, M.cellSay, M.cellDone - M.cellSay) : "") : ROWS[r][c]
	return <div style={{ position: "absolute", inset: 0, background: "#fff" }}>
		<div style={{ height: 50, background: "#f3f1ec", display: "flex", alignItems: "center", gap: 22, padding: "0 24px", fontSize: 18, color: "#5d5850" }}>首页改版进度表<span style={{ flex: 1 }} />{["↶", "B", "I", "Σ", "▦"].map((x) => <span key={x}>{x}</span>)}</div>
		<div style={{ display: "flex", gap: 0, borderBottom: `1px solid ${LN}`, fontSize: 17 }}>{["待办进度", "会议记录", "时间安排"].map((s, i) => <span key={s} style={{ padding: "10px 26px", background: i === tab ? "#fff" : "#f7f5f1", borderRight: `1px solid ${LN}`, color: i === tab ? "#2f4f7a" : DIM, fontWeight: i === tab ? 700 : 400 }}>{s}</span>)}</div>
		<div style={{ padding: "34px 60px" }}><div style={{ fontSize: 34, fontWeight: 700, marginBottom: 20 }}>首页改版 · {["待办进度", "会议记录", "时间安排"][tab]}</div>
			{tab === 1 ? <div style={{ display: "grid", gridTemplateColumns: "200px 160px 760px", fontSize: 25 }}>{[["说话人", "时间", "内容"], ...COPY.meeting].map((r, i) => r.map((c, j) => <div key={i + "-" + j} style={{ padding: "14px 16px", background: i ? "#fff" : "#2f4f7a", color: i ? INKC : "#fff", borderBottom: `1px solid ${LN}` }}>{c}</div>))}</div>
				: tab === 2 ? <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 240px)", fontSize: 24 }}>{["周一", "周二", "周三", "周四", "周五"].map((d) => <div key={d} style={{ padding: "12px 16px", background: "#2f4f7a", color: "#fff" }}>{d}</div>)}{["品牌素材", "", "交互稿", "视觉方案", "首页上线"].map((d, i) => <div key={i} style={{ padding: "26px 16px", height: 90, borderRight: `1px solid ${LN}`, borderBottom: `1px solid ${LN}` }}>{d && <span style={{ padding: "6px 12px", borderRadius: 8, background: ["#f3cdb8", "", "#dfe8f3", "#e3eedf", "#f3e6b8"][i] }}>{d}</span>}</div>)}</div>
				: <div style={{ display: "grid", gridTemplateColumns: "560px 220px 200px 260px", fontSize: 27 }}>
					{["事项", "负责人", "时间", "状态"].map((h) => <div key={h} style={{ background: "#2f4f7a", color: "#fff", padding: "12px 16px", fontWeight: 600 }}>{h}</div>)}
					{ROWS.map((r, i) => r.map((_, j) => { const sel = i === 2 && j === 3 && t > M.cell; return <div key={i + "-" + j} style={{ padding: "14px 16px", borderBottom: `1px solid ${LN}`, borderRight: `1px solid ${LN}`, height: 64, boxSizing: "border-box", background: sel ? (done ? "#fff4b8" : "#e8f0fb") : "#fff", boxShadow: sel ? "inset 0 0 0 3px #3d7cc0" : undefined }}>{val(i, j)}{sel && !done && fill > 0 && <span style={{ color: "#3d7cc0" }}>|</span>}</div> }))}</div>}</div></div> }
const DOC = [["目标", COPY.doc[0][1]], ["结果", COPY.doc[1][1]], ["下一步", COPY.doc[2][1]]]
const Doc: React.FC = () => <div style={{ position: "absolute", inset: 0, background: "#f1ede6" }}><div style={{ position: "absolute", left: 300, top: 30, width: 1000, height: 1400, background: "#fff", boxShadow: "0 4px 20px rgba(0,0,0,.08)", padding: "80px 90px", boxSizing: "border-box", fontFamily: SERIF, color: INKC }}>
	<div style={{ fontSize: 44, fontWeight: 700 }}>首页改版 · 进度说明</div><div style={{ fontSize: 20, color: DIM, marginTop: 8, fontFamily: CJK }}>给 李经理 · 周四会前</div>
	{DOC.map(([a, b]) => <div key={a} style={{ marginTop: 40 }}><div style={{ fontSize: 30, fontWeight: 700, color: "#2f4f7a" }}>{a}</div><div style={{ fontSize: 26, lineHeight: 1.8, marginTop: 8 }}>{b}</div></div>)}
	<div style={{ marginTop: 40, fontSize: 30, fontWeight: 700, color: "#2f4f7a" }}>待办事项</div>{COPY.todos.map((s) => <div key={s} style={{ fontSize: 26, lineHeight: 1.9 }}>•　{s}</div>)}
	<div style={{ marginTop: 40, fontSize: 30, fontWeight: 700, color: "#2f4f7a" }}>会议结论</div><div style={{ fontSize: 26, lineHeight: 1.8 }}>{COPY.meetingConclusion}</div></div></div>

// ---------- icons + logo
const ICONS = ["M20,80 L20,20 M20,80 L90,80 M28,70 L48,46 L62,58 L86,28 M76,28 L86,28 L86,38", "M22,14 L70,14 L70,86 L22,86 Z M32,30 L60,30 M32,44 L60,44 M32,58 L50,58", "M20,24 L84,24 L84,70 L20,70 Z M32,48 A10,10 0 1 1 52,48 A10,10 0 1 1 32,48 M60,40 L76,40 M60,52 L76,52",
	"M14,22 L90,22 L90,82 L14,82 Z M14,36 L90,36 M30,46 L74,46 L74,74 L30,74 Z M30,58 L74,58 M52,46 L52,74", "M40,30 L40,62 Q40,74 52,74 Q64,74 64,62 L64,30 Q64,18 52,18 Q40,18 40,30 Z M30,58 Q30,86 52,86 Q74,86 74,58 M52,86 L52,96", "M24,24 L40,24 L40,40 L24,40 Z M28,32 L32,36 L38,28 M24,52 L40,52 L40,68 L24,68 Z M50,32 L86,32 M50,60 L86,60",
	"M26,20 L66,20 L78,32 L78,86 L26,86 Z M66,20 L66,32 L78,32 M18,28 L18,92 L70,92", "M18,86 L18,64 L32,64 L32,86 M42,86 L42,50 L56,50 L56,86 M66,86 L66,34 L80,34 L80,86 M20,44 Q50,40 76,16 M66,16 L76,16 L76,26", "M16,20 L88,20 L88,66 L16,66 Z M52,66 L52,76 M36,90 L52,76 L68,90 M32,34 L72,34 M32,48 L60,48"]
const Icons: React.FC<{ t: number }> = ({ t }) => { const g = inOut(k(t, M.gather, 0.5)), first = t < M.grid
	return <AbsoluteFill><Topo />{ICONS.map((d, i) => { const x = 960 + ((i % 3) - 1) * 355, y = 540 + (Math.floor(i / 3) - 1) * 255, a = i === 8 ? 1 : k(t, M.grid + i * 0.1, 0.35)
		if (first && i !== 8) return null
		const fx = first ? 960 : lerp(k(t, M.grid, 0.5), 0, 1, 960, x, inOut), fy = first ? 540 : lerp(k(t, M.grid, 0.5), 0, 1, 540, y, inOut), sz = first ? 260 : lerp(k(t, M.grid, 0.5), 0, 1, i === 8 ? 260 : 175, 175, inOut)
		const wob = i === 4 && t > M.anim && t < M.gather ? Math.sin((t - M.anim) * 6) * 8 : 0
		return <svg key={i} width={sz} height={sz} viewBox="0 0 100 100" style={{ position: "absolute", left: fx - sz / 2, top: fy - sz / 2 + wob, opacity: 1 - g, transform: `scale(${1 - g * 0.75})` }}><Draw d={d} p={first ? k(t, C[3], 0.4) : a} w={2.8} len={500} /></svg> })}</AbsoluteFill> }
const End: React.FC<{ t: number }> = ({ t }) => { const a = inOut(k(t, M.word, 0.5)), d = k(t, M.logo - 0.2, 0.3)
	return <AbsoluteFill><Topo /><AbsoluteFill style={{ alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 26 * a }}>
		<div style={{ transform: `scale(${lerp(d, 0, 1, 0.3, 1)}) rotate(${(1 - d) * 90}deg)`, opacity: d }}><LogoPixels size={72} t={t} mode="static" /></div>
		<div style={{ width: a * 360, overflow: "hidden", opacity: a }}><Wordmark size={86} color={INKC} /></div></AbsoluteFill></AbsoluteFill> }

// ---------- main
const W0 = 160, H0 = 90
export const Film: React.FC = () => {
	const t = useT()
	if (t < C[0]) return <Opener t={t} />
	const hand = (x: number, y: number, down?: boolean) => <Hand x={x} y={y} s={1.3} down={down} />
	if (t < C[1]) {
		const mail = t < M.sw, sheet = t >= M.sheet
		const keys: CamKey[] = mail ? [[C[0], 0.75, 960, 540], [M.mailIn, 0.78, 960, 540], [4.6, 1.06, 960, 560], [6.2, 1.08, 960, 570], [M.zo, 1.08, 960, 570], [M.sw, 0.62, 960, 540]]
			: !sheet ? [[M.sw, 0.62, 960, 540], [M.zi - 0.1, 0.7, 960, 540], [M.zi + 0.9, 1.1, 960, 520], [M.drag, 1.1, 960, 560], [M.conv - 0.1, 1.12, 960, 600], [M.conv + 0.5, 1.3, 960, 560], [M.zoomOut, 1.3, 960, 560], [M.zoomOut + 0.6, 0.88, 960, 560], [M.sheet, 0.88, 960, 560]]
				: [[M.sheet, 0.8, 960, 560], [M.sheet + 1.2, 1.0, 960, 540], [M.tz, 1.0, 960, 540], [M.tz + 0.5, 1.6, 1100, 500], [M.tz + 1.0, 2.4, 1300, 560], [C[1], 2.5, 1310, 562]]
		const sw = k(t, M.sw - 0.15, 0.3), sin = k(t, M.sheet - 0.1, 0.35)
		let cur = { x: 0, y: 0 }, down = false
		if (mail) { cur = path(t, [[M.mailIn, 1300, 900], [M.sel0 - 0.2, 470, 425], [M.sel1, 760, 520], [M.sw, 900, 600]]); down = t > M.sel0 && t < M.sel1 }
		else if (!sheet) { cur = t < M.conv ? path(t, [[M.sw, 1200, 800], [M.drag, 1500, 700], [M.drop, 1000, 650], [M.send - 0.5, 1400, 860], [M.send, 1405, 868]]) : path(t, [[M.conv, 1405, 868], [M.dl - 0.6, 1500, 950], [M.dl, 1290, 720], [M.sheet, 1290, 720]]); down = Math.abs(t - M.send) < 0.1 || Math.abs(t - M.dl) < 0.1 }
		else { cur = path(t, [[M.sheet, 1400, 900], [M.cell - 0.3, 1330, 568], [M.cell, 1333, 570], [C[1], 1333, 570]]); down = Math.abs(t - M.cell) < 0.1 }
		return <AbsoluteFill><Topo /><Camera t={t} keys={keys}>
			{mail && <div style={{ position: "absolute", inset: 0, transform: `translateX(${-1900 * sw}px)` }}><Win title="邮件 · 首页改版进度"><Mail t={t} /></Win></div>}
			{!mail && !sheet && <div style={{ position: "absolute", inset: 0, transform: `translateX(${1900 * (1 - sw)}px)`, opacity: 1 - sin }}><Win title="AI 助手">{t < M.conv ? <Home t={t} /> : <Conv t={t} user={P1} items={IT1} times={(TL.marks as any) && IT1.map((_, i) => M["r1_" + i])} t0={M.conv} files pressDl={Math.abs(t - M.dl) < 0.15 ? 1 : -1} />}</Win></div>}
			{sheet && <div style={{ position: "absolute", inset: 0, transform: `scale(${0.9 + 0.1 * sin})`, transformOrigin: "50% 50%", opacity: sin }}><Win title="首页改版进度表" dark><Sheet t={t} tab={t < M.tab2 ? 0 : t < M.tab3 ? 1 : t < M.tz ? 2 : 0} /></Win></div>}
			{sheet && t > M.cellSay - 0.3 && <div style={{ position: "absolute", left: 1060, top: 640 }}><Pill t={t} state={t < M.cellDone ? "语音输入" : "已写好"} sub="润色：关闭 · 原样直出" live={t < M.cellDone} scale={0.7} /></div>}
			{hand(cur.x, cur.y, down)}
		</Camera></AbsoluteFill>
	}
	const times1 = IT1.map((_, i) => M["r1_" + i]), times2 = IT2.map((_, i) => M["r2_" + i])
	if (t < C[2]) { const cur = path(t, [[C[1], 1250, 640], [M.dl2 - 0.5, 1288, 716], [M.dl2, 1290, 720], [C[2], 1300, 730]])
		return <AbsoluteFill><Topo /><Camera t={t} keys={[[C[1], 1.5, 860, 640], [C[2], 1.55, 870, 650]]}><Win title="AI 助手"><Conv t={t} user={P1} items={IT1} times={times1} t0={M.conv} files pressDl={Math.abs(t - M.dl2) < 0.15 ? 1 : -1} /></Win>{hand(cur.x, cur.y, Math.abs(t - M.dl2) < 0.1)}</Camera></AbsoluteFill> }
	if (t < C[3]) {
		const doc = t < M.chat2, mw = t >= M.mailw
		const keys: CamKey[] = doc ? [[C[2], 0.95, 960, 540], [M.docOut, 0.97, 960, 540], [M.docOut + 0.7, 0.82, 960, 540], [M.chat2, 0.8, 960, 540]]
			: !mw ? [[M.chat2, 0.8, 960, 540], [M.zi2, 0.9, 960, 600], [M.zi2 + 0.9, 1.2, 960, 760], [M.conv2, 1.25, 960, 600], [M.conv2 + 0.6, 1.3, 960, 560], [M.zo2, 1.3, 960, 560], [M.zo2 + 0.8, 1.0, 960, 560], [M.mailw, 0.7, 960, 540]]
				: [[M.mailw, 0.7, 960, 540], [M.mailw + 1.0, 0.78, 960, 520], [C[3], 0.8, 960, 520]]
		const sw = k(t, M.chat2 - 0.15, 0.3), mi = k(t, M.mailw - 0.1, 0.35)
		const pre = t < M.conv2
		const cur = mw ? { x: 1500, y: 800 } : path(t, [[M.chat2, 1500, 900], [M.send2 - 0.5, 1400, 916], [M.send2, 1405, 921], [M.zo2, 1450, 900], [M.open - 0.4, 1300, 680], [M.open, 1302, 682], [M.mailw, 1302, 682]])
		return <AbsoluteFill><Topo /><Camera t={t} keys={keys}>
			{doc ? <div style={{ position: "absolute", inset: 0, transform: `translateX(${-1900 * sw}px)` }}><Win title="进度说明 · 文档"><div style={{ position: "absolute", inset: 0, transform: `translateY(${-lerp(t, C[2], M.docOut, 0, 380, inOut)}px)` }}><Doc /></div></Win></div>
				: !mw ? <div style={{ position: "absolute", inset: 0, transform: `translateX(${1900 * (1 - sw)}px)`, opacity: 1 - mi }}><Win title="AI 助手">
					{pre ? <><div style={{ position: "absolute", inset: 0 }}><Conv t={M.dl + 2} user={P1} items={IT1} times={times1} t0={M.conv} files noInput extraScroll={140} /></div>
						<div style={{ position: "absolute", left: 300, top: 640 }}><Input t={t} raw={RAW2} p={P2} say={M.say2} said={M.said2} pol={M.pol2} ph="回复 AI 助手…" sub="场景：提示词 · 要求明确" /></div></>
						: <Conv t={t} user={P2} items={IT2} times={times2} t0={M.conv2} />}</Win></div>
					: <div style={{ position: "absolute", inset: 0, opacity: mi, transform: `scale(${0.92 + 0.08 * mi})`, transformOrigin: "50% 50%" }}><Win title="邮件 · 回复：首页改版进度"><Mail t={t} reply /></Win></div>}
			{!doc && !mw && hand(cur.x, cur.y, Math.abs(t - M.send2) < 0.1 || Math.abs(t - M.open) < 0.1)}
		</Camera></AbsoluteFill>
	}
	if (t < M.logo - 0.2) return <Icons t={t} />
	return <End t={t} />
}
