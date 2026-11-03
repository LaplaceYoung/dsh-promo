// Template 43 — structure of Anthropic "Your tools are now interactive in Claude" (2026), MosMos content.
// Paper-cut shapes on warm beige join into one canvas, then a cream chat window: a spoken request is typed into the
// composer, the camera pushes in, and the reply opens an interactive card that fills the frame (a flow you can zoom
// and drag, a scene card with a dropdown, a meeting to-do list you tick off, a mail draft that is pasted), with slow
// zooms out to the whole window on beige between them, and the logo on beige at the end.
import React from "react"
import { AbsoluteFill, Easing } from "remotion"
import { CJK, lerp, clamp01, inOut, useT, LogoPixels, Wordmark, Cursor, typeAt, COPY } from "../_engine/src/mos"
import { camAt, CamKey, Hand, rand } from "../_engine/src/kit"
import TL from "./timeline.json"

const M = TL.marks as Record<string, number>, C = TL.cuts as number[]
const SERIF = "'Noto Serif SC', 'Noto Serif CJK SC', serif"
const BEIGE = "#e3dacb", CREAM = "#faf8f4", INK = "#1f1e1c", ORA = "#c6613f", GREY = "#77736b", LINE = "#e6e1d7"
const fade = (t: number, a: number, d = 0.3) => clamp01((t - a) / d)

const RAW = [
	"嗯，下午三点跟李经理开会，那个，会前先把品牌素材收齐，交互稿过一遍，然后周三前把第一版发给他。",
	"呃，第一版我们周三前给你，你先把品牌素材发我。",
	"说话人 1：第一版交互稿我会在周三之前完成。说话人 2：客户的品牌素材今天下午同步到群里。",
	"那个，李经理您好，第一版方案我们周三前发给您，麻烦今天把品牌素材发我，收到以后我会提前检查。谢谢，小林。",
	"那顺便，把会议总结也发到群里",
]
const REPLY = ["写好了。这句话，MosMos 是这样写的：", "已按「飞书 / 微信」写好，场景随时可以换：", "会议结束，总结和待办都写好了：", "已按「邮件」写好：", "说完，文字就写好了。"]
const TITLE = ["处理过程", "场景", "会议记录", "邮件"]

// ---------- camera stage: window x 210–1710, chat column x 460–1460
const Cam: React.FC<{ t: number; keys: CamKey[]; children: React.ReactNode; bg?: string }> = ({ t, keys, children, bg = BEIGE }) => {
	const c = camAt(t, keys)
	return <AbsoluteFill style={{ background: bg, overflow: "hidden" }}><div style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 1080, transformOrigin: "0 0", transform: `translate(${960 - c.x * c.s}px, ${540 - c.y * c.s}px) scale(${c.s})` }}>{children}</div></AbsoluteFill>
}
const Spin: React.FC<{ t: number; x: number; y: number; s?: number; on?: boolean }> = ({ t, x, y, s = 1, on = true }) => <div style={{ position: "absolute", left: x, top: y, width: 26 * s, height: 26 * s }}>
	{Array.from({ length: 10 }, (_, k) => <div key={k} style={{ position: "absolute", left: 12 * s, top: 0, width: 2.4 * s, height: 9 * s, borderRadius: 2, background: ORA, transformOrigin: `${1.2 * s}px ${13 * s}px`, transform: `rotate(${k * 36}deg)`, opacity: on ? 0.25 + 0.75 * ((k - Math.floor(t * 12)) % 10 + 10) % 10 / 9 : 1 }} />)}</div>
const Composer: React.FC<{ x: number; y: number; w: number; h: number; fs: number; text: string; t: number; down?: boolean; rec?: boolean; ph?: string }> = ({ x, y, w, h, fs, text, t, down, rec, ph = "按 Fn，开始说…" }) =>
	<div style={{ position: "absolute", left: x, top: y, width: w, minHeight: h, borderRadius: fs * 1.1, background: "#fff", boxShadow: `0 ${fs * 0.15}px ${fs * 0.9}px rgba(60,40,20,.08), 0 0 0 1px ${LINE}`, fontFamily: CJK, color: INK, boxSizing: "border-box", padding: `${fs * 0.9}px ${fs * 1.1}px ${fs * 3.6}px` }}>
		{rec && <div style={{ display: "inline-flex", alignItems: "center", gap: fs * 0.4, fontSize: fs * 0.75, color: ORA, marginBottom: fs * 0.4 }}><span style={{ width: fs * 0.5, height: fs * 0.5, borderRadius: fs, background: ORA, opacity: 0.5 + 0.5 * Math.sin(t * 6) }} />正在记录会议 · Fn + Shift</div>}
		<div style={{ fontSize: fs, lineHeight: 1.55, opacity: text ? 1 : 0.45 }}>{text || ph}{text && <span style={{ display: "inline-block", width: fs * 0.08, height: fs * 1.1, marginLeft: 2, verticalAlign: "middle", background: INK, opacity: Math.floor(t * 2.2) % 2 ? 0 : 1 }} />}</div>
		<div style={{ position: "absolute", left: fs * 1.1, bottom: fs * 0.9, fontSize: fs * 1.4, color: GREY, lineHeight: 1 }}>＋</div>
		<div style={{ position: "absolute", right: fs * 1.1, bottom: fs * 0.75, display: "flex", alignItems: "center", gap: fs * 0.9 }}>
			<span style={{ fontSize: fs * 0.85, color: GREY }}>场景：自动 ⌄</span>
			<div style={{ width: fs * 2.1, height: fs * 2.1, borderRadius: fs * 0.45, background: ORA, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: fs * 1.1, transform: `scale(${down ? 0.88 : 1})` }}>↑</div></div></div>

// ---------- cards
const NODE: Record<string, string[]> = { p: ["#d9ccfb", "#9b82e8"], b: ["#cfe5fb", "#6ea8e0"], y: ["#fbe7ad", "#e0b54e"], g: ["#d3f0d1", "#7cc277"] }
const Node: React.FC<{ x: number; y: number; w?: number; h?: number; c: string; a: string; b?: string }> = ({ x, y, w = 190, h = 100, c, a, b }) =>
	<div style={{ position: "absolute", left: x, top: y, width: w, height: h, background: NODE[c][0], border: `2px solid ${NODE[c][1]}`, borderRadius: 4, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: CJK, color: INK }}>
		<div style={{ fontSize: w < 180 ? 17 : 22, fontWeight: 700 }}>{a}</div>{b && <div style={{ fontSize: 13, marginTop: 4, color: "#555" }}>{b}</div>}</div>
const Dia: React.FC<{ x: number; y: number; c: string; a: string }> = ({ x, y, c, a }) => <div style={{ position: "absolute", left: x, top: y, width: 120, height: 120 }}>
	<div style={{ position: "absolute", inset: 18, background: NODE[c][0], border: `2px solid ${NODE[c][1]}`, transform: "rotate(45deg)", borderRadius: 4 }} />
	<div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: CJK, fontSize: 15, textAlign: "center", lineHeight: 1.25 }}>{a}</div></div>
const L: React.FC<{ d: string }> = ({ d }) => <path d={d} fill="none" stroke="#9a9a9a" strokeWidth={2} markerEnd="url(#ar)" />
const Flow: React.FC = () => <div style={{ position: "absolute", left: 0, top: 0, width: 1500, height: 740 }}>
	<svg width={1500} height={740} style={{ position: "absolute" }}><defs><marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#9a9a9a" /></marker></defs>
		<L d="M265 220 V262" /><L d="M360 315 H400 V170 H478" /><L d="M573 220 V262" /><L d="M573 365 V418" /><L d="M573 540 V600" /><L d="M633 480 H720 V170 H806" />
		<L d="M901 220 V262" /><L d="M901 365 V418" /><L d="M901 540 V600" /><L d="M961 480 H1048 V170 H1134" /><L d="M1229 220 V262" /></svg>
	<Node x={170} y={120} c="p" a="说出来" b="按一次 Fn" /><Node x={170} y={265} c="p" a="原话" b="嗯、那个、然后…" />
	<Node x={478} y={120} c="b" a="识别场景" b="当前应用 · 飞书" /><Node x={478} y={265} c="b" a="应用词库" b="热词优先识别" /><Dia x={513} y={420} c="b" a={"有专有词？"} /><Node x={498} y={600} w={150} h={64} c="b" a="按热词写" />
	<Node x={806} y={120} c="y" a="润色" b="标准 · 改善语法与语序" /><Node x={806} y={265} c="y" a="调整语序" b="去掉口头禅" /><Dia x={841} y={420} c="y" a={"润色档位？"} /><Node x={826} y={600} w={150} h={64} c="y" a="关闭：原样直出" />
	<Node x={1134} y={120} c="g" a="粘贴" b="写进当前输入框" /><Node x={1134} y={265} c="g" a="文字写好" b="可以直接用" />
	{[[640, 455, "是"], [968, 455, "高级"], [545, 560, "否"], [873, 560, "关闭"]].map(([x, y, s], k) => <div key={k} style={{ position: "absolute", left: x as number, top: y as number, fontFamily: CJK, fontSize: 14, color: "#555" }}>{s}</div>)}</div>
const WAV = Array.from({ length: 64 }, (_, k) => 0.25 + 0.75 * Math.abs(Math.sin(k * 0.7) * Math.cos(k * 0.23)) * (k > 4 ? 1 : 0.4))
const Scene: React.FC<{ t: number; s: number; open: number; hi: number }> = ({ t, s, open, hi }) => { const p = clamp01((t - M.wave) / 1.6)
	const words = ["呃", "第一版", "我们", "周三前", "给你", "你先把", "品牌素材", "发我"]
	return <div style={{ position: "absolute", inset: 0, fontFamily: CJK, color: INK }}>
		<div style={{ position: "absolute", left: 40 * s, top: 30 * s, fontSize: 22 * s, fontWeight: 600 }}>这句话 · 原话和成稿</div>
		<div style={{ position: "absolute", right: 36 * s, top: 22 * s, padding: `${6 * s}px ${14 * s}px`, borderRadius: 8 * s, border: `1px solid ${LINE}`, fontSize: 16 * s }}>飞书 / 微信 ⌄</div>
		{open > 0 && <div style={{ position: "absolute", right: 36 * s, top: 62 * s, width: 210 * s, padding: `${6 * s}px 0`, borderRadius: 10 * s, background: "#fff", boxShadow: "0 8px 30px rgba(0,0,0,.14)", fontSize: 16 * s, opacity: open, zIndex: 5 }}>
			{["自动识别", "飞书 / 微信", "邮件", "文档", "提示词", "代码与终端"].map((x, k) => <div key={x} style={{ padding: `${8 * s}px ${16 * s}px`, background: k === hi ? "#f2efe9" : undefined }}>{x}</div>)}</div>}
		<div style={{ position: "absolute", left: 60 * s, right: 60 * s, top: 120 * s, height: 170 * s, display: "flex", alignItems: "center", gap: 4 * s }}>
			{WAV.map((v, k) => <div key={k} style={{ flex: 1, height: `${v * 100 * clamp01(p * 64 - k)}%`, borderRadius: 3 * s, background: k < 5 ? "#c9c4ba" : "#3b6fd8" }} />)}</div>
		<div style={{ position: "absolute", left: 60 * s, right: 60 * s, top: 304 * s, display: "flex", justifyContent: "space-between", fontSize: 14 * s, color: GREY }}>{words.map((w, k) => <span key={k} style={{ color: k === 0 ? "#b7b1a6" : k === 3 ? "#3b6fd8" : GREY, textDecoration: k === 0 ? "line-through" : undefined }}>{w}</span>)}</div>
		<div style={{ position: "absolute", left: 60 * s, top: 350 * s, display: "flex", gap: 26 * s, fontSize: 13 * s, color: GREY }}><span><span style={{ color: "#3b6fd8" }}>●</span> 写进成稿</span><span><span style={{ color: "#c9c4ba" }}>●</span> 去掉的口头禅</span></div>
		<div style={{ position: "absolute", left: 40 * s, right: 40 * s, bottom: 24 * s, paddingTop: 16 * s, borderTop: `1px solid ${LINE}`, display: "flex", justifyContent: "space-between", fontSize: 18 * s }}><span>{COPY.chatOut}</span><span style={{ fontSize: 14 * s, color: "#3b6fd8" }}>风格：自动 · 简洁自然</span></div></div> }
const Todo: React.FC<{ t: number; s: number }> = ({ t, s }) => { const rows: [string, string, string, string][] = [[COPY.todos[0], "说话人 2", "今天", "#f6c9c4"], [COPY.todos[1], "说话人 1", "周三", "#fbe2a6"], [COPY.todos[2], "说话人 3", "周四", "#d8ecd3"]]
	return <div style={{ position: "absolute", inset: 0, fontFamily: CJK, color: INK }}>
		<div style={{ position: "absolute", left: 40 * s, top: 26 * s, display: "flex", alignItems: "center", gap: 16 * s }}><div style={{ width: 50 * s, height: 50 * s, borderRadius: 12 * s, background: "#5d8de0", display: "flex", alignItems: "center", justifyContent: "center" }}><LogoPixels size={30 * s} t={t} mode="static" invert /></div><span style={{ fontSize: 26 * s, fontWeight: 700 }}>首页交付计划</span></div>
		<div style={{ position: "absolute", right: 40 * s, top: 34 * s, padding: `${8 * s}px ${18 * s}px`, borderRadius: 8 * s, background: "#2d5fd8", color: "#fff", fontSize: 15 * s }}>打开会议记录</div>
		<div style={{ position: "absolute", left: 40 * s, top: 100 * s, fontSize: 17 * s, fontWeight: 700 }}>▾ 待办</div>
		{rows.map(([a, who, d, c], k) => { const done = k === 0 && t > M.check
			return <div key={k} style={{ position: "absolute", left: 30 * s, right: 30 * s, top: (136 + k * 52) * s, height: 52 * s, display: "flex", alignItems: "center", gap: 16 * s, padding: `0 ${12 * s}px`, borderBottom: `1px solid ${LINE}`, background: k === 0 && t > M.check - 0.6 ? "#f6f3ee" : undefined, fontSize: 17 * s }}>
				<span style={{ width: 20 * s, height: 20 * s, borderRadius: 20 * s, border: `${1.5 * s}px solid ${done ? "#3b9a5b" : "#999"}`, background: done ? "#3b9a5b" : undefined, color: "#fff", fontSize: 13 * s, display: "flex", alignItems: "center", justifyContent: "center" }}>{done ? "✓" : ""}</span>
				<span style={{ flex: 1, color: done ? GREY : INK }}>{a}</span><span style={{ width: 120 * s, fontSize: 14 * s, color: GREY }}>{who}</span>
				<span style={{ width: 70 * s, textAlign: "center", padding: `${3 * s}px 0`, borderRadius: 5 * s, background: c, fontSize: 14 * s }}>{d}</span></div> })}
		<div style={{ position: "absolute", left: 40 * s, top: 310 * s, fontSize: 17 * s, fontWeight: 700 }}>▾ 会议总结</div>
		<div style={{ position: "absolute", left: 40 * s, right: 40 * s, top: 346 * s, fontSize: 16 * s, lineHeight: 1.6, color: "#444" }}>{COPY.meetingConclusion}<br /><span style={{ color: GREY }}>多人逐字稿 · 3 位说话人</span></div></div> }
const Mail: React.FC<{ t: number; s: number }> = ({ t, s }) => { const sel = clamp01((t - M.sel) / 0.7)
	return <div style={{ position: "absolute", inset: 0, fontFamily: CJK, color: INK }}>
		<div style={{ position: "absolute", left: 40 * s, top: 24 * s, display: "flex", alignItems: "center", gap: 12 * s, fontSize: 16 * s, color: GREY }}>收件人 <span style={{ width: 26 * s, height: 26 * s, borderRadius: 26 * s, background: "#8a78d8", display: "inline-block" }} /><span style={{ color: INK }}>李经理</span></div>
		<div style={{ position: "absolute", left: 40 * s, right: 40 * s, top: 70 * s, bottom: 80 * s, padding: `${22 * s}px ${26 * s}px`, borderRadius: 10 * s, background: "#f7f5f0", fontSize: 19 * s, lineHeight: 1.75 }}>
			<div>{COPY.mail[0]}</div><div style={{ marginTop: 10 * s }}>第一版方案将在本周三前发给您。<span style={{ background: `linear-gradient(90deg, #b9d3f5 ${sel * 100}%, transparent ${sel * 100}%)` }}>麻烦您今天将品牌素材发给我</span>，收到后我会提前检查。</div>
			<div style={{ marginTop: 10 * s }}>{COPY.mail[2]}</div><div>{COPY.mail[3]}</div></div>
		<div style={{ position: "absolute", left: 40 * s, bottom: 26 * s, fontSize: 15 * s, color: GREY }}>风格：自动 · 完整专业</div>
		<div style={{ position: "absolute", right: 40 * s, bottom: 20 * s, padding: `${8 * s}px ${22 * s}px`, borderRadius: 8 * s, background: INK, color: "#fff", fontSize: 16 * s, transform: `scale(${Math.abs(t - M.paste) < 0.1 ? 0.92 : 1})` }}>粘贴</div></div> }

// Card: inline (x 460, w 1000) <-> expanded (x 260, w 1400, top 60), header 64 tall
const CH = [495, 420, 470, 430], CY = 230
const cardBox = (k: number, head: number, full: number, ex: number) => { const w = 1000 + 400 * ex, s = w / 1000
	const hh = 64 + 60 * (1 - full); return { x: 460 - 200 * ex, y: CY - (CY - 60) * ex, w, s, hh, hb: CH[k] * full * s, h: hh * head + CH[k] * full * s } }
const Card: React.FC<{ k: number; t: number; head: number; full: number; ex: number; children?: (s: number, w: number, h: number) => React.ReactNode }> = ({ k, t, head, full, ex, children }) => {
	const b = cardBox(k, head, full, ex)
	return <div style={{ position: "absolute", left: b.x, top: b.y, width: b.w, height: b.h, borderRadius: 14, background: "#fff", boxShadow: `0 0 0 1px ${LINE}, 0 6px 24px rgba(60,40,20,.05)`, overflow: "hidden", opacity: head }}>
		<div style={{ height: b.hh, display: "flex", alignItems: "center", gap: 12 * b.hh / 64, padding: `0 ${22 * b.hh / 64}px`, fontFamily: CJK, fontSize: 20 * b.hh / 64, color: INK }}><LogoPixels size={20 * b.hh / 64} t={t} mode="static" /><span>MosMos · {TITLE[k]}</span><span style={{ flex: 1 }} /><span style={{ color: GREY, fontSize: 18, opacity: full }}>⤢</span></div>
		{full > 0 && <div style={{ position: "absolute", left: 0, right: 0, top: b.hh, height: b.hb, borderTop: `1px solid ${LINE}`, opacity: clamp01(full * 1.5 - 0.3), overflow: "hidden" }}>{children?.(b.s, b.w, b.hb)}</div>}</div>
}
// A turn: user bubble, card, reply text with spinner, composer (holding the next request). Stage coordinates.
type TP = { bub?: number; solo?: boolean; k: number; t: number; r: number; head: number; full: number; ex?: number; next?: string; rec?: boolean; down?: boolean; body?: (s: number, w: number, h: number) => React.ReactNode; paste?: number; r2?: number; cur?: [number, number, boolean?] }
const layout = (k: number, head: number, full: number, paste = 0) => { const ch = paste > 0 ? lerp(paste, 0, 1, 64 + CH[k] * full, 128, inOut) : (64 + 60 * (1 - full)) * head + CH[k] * full
	const ty = CY + (head > 0 ? ch + 34 : 0), cy = paste > 0 ? ty + 190 : Math.max(ty + 130, 960); return { ch, ty, cy } }
const Turn: React.FC<TP> = ({ bub = 1, solo, k, t, r, head, full, ex = 0, next = "", rec, down, body, paste = 0, r2 = 99, cur }) => {
	const { ch, ty, cy } = layout(k, head, full, paste), fs = paste > 0 ? 23 : lerp(full, 0, 1, 30, 23, (v) => v)
	return <div style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 1080 }}>
		<div style={{ position: "absolute", left: 210, top: 0, width: 1500, height: cy + 420, borderRadius: 22, background: CREAM, boxShadow: "0 30px 80px rgba(60,40,20,.12)" }}>
			<div style={{ position: "absolute", left: 22, top: 70, opacity: 1 - ex, display: "flex", flexDirection: "column", gap: 26 }}>{[0, 1, 2, 3, 4].map((i) => <div key={i} style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid #b9b3a8` }} />)}</div>
			<div style={{ position: "absolute", left: 80, top: 24, opacity: (1 - ex) * bub, fontFamily: CJK, fontSize: 18, color: "#55524c" }}>首页交付 · 会前准备 ⌄</div></div>
		<div style={{ position: "absolute", right: 460, top: 100, opacity: (1 - ex) * bub * (solo ? 0 : 1), maxWidth: 720, padding: "12px 20px", borderRadius: 14, background: "#efebe3", fontFamily: CJK, fontSize: 17, color: INK, lineHeight: 1.5, whiteSpace: "nowrap" }}>{k === 2 ? "（会议记录 · 3 位说话人）" : RAW[k].length > 38 ? RAW[k].slice(0, 38) + "…" : RAW[k]}</div>
		<div style={{ position: "absolute", left: 460, top: ty, width: 1000, opacity: (1 - ex) * (solo ? 0 : 1), fontFamily: SERIF, fontSize: fs, color: INK, lineHeight: 1.6 }}>{typeAt(REPLY[k], t, r, 26).s}{t > r2 && <><br />{typeAt(REPLY[4], t, r2, 22).s}</>}</div>
		{ex < 0.5 && !solo && <Spin t={t} x={462} y={ty + fs * 2.3 + (t > r2 ? fs * 1.6 : 0)} s={fs / 18} on={t < r + 2.5 || (t > r2 && t < r2 + 1.5)} />}
		<Composer x={460} y={cy} w={1000} h={solo ? 180 : paste > 0 ? 160 : 130} fs={solo ? 27 : paste > 0 ? 25 : 21} text={next} t={t} down={down} rec={rec} />
		{paste > 0 ? <div style={{ position: "absolute", left: 460, top: CY, width: 1000, height: ch, borderRadius: 14, background: "#fff", boxShadow: `0 0 0 1px ${LINE}`, overflow: "hidden", fontFamily: CJK, color: INK }}>
			<div style={{ height: 64, display: "flex", alignItems: "center", gap: 12, padding: "0 22px", fontSize: 20 }}><LogoPixels size={20} t={t} mode="static" />MosMos · 邮件</div>
			<div style={{ position: "absolute", left: 22, right: 22, top: 74, display: "flex", alignItems: "center", fontSize: 18, opacity: clamp01(paste * 2 - 1) }}><div><b>已粘贴到邮件</b><div style={{ fontSize: 15, color: GREY }}>收件人：李经理 · 风格：完整专业</div></div><span style={{ flex: 1 }} /><span style={{ width: 30, height: 30, borderRadius: 30, background: "#dff0dd", color: "#3b9a5b", display: "flex", alignItems: "center", justifyContent: "center" }}>✓</span></div>
			{paste < 1 && <div style={{ position: "absolute", left: 0, right: 0, top: 64, opacity: 1 - paste * 2 }}><div style={{ position: "relative", height: CH[3] }}><Mail t={t} s={1} /></div></div>}</div>
			: !solo && <Card k={k} t={t} head={head} full={full} ex={ex}>{body}</Card>}
		{cur && <Cursor x={cur[0]} y={cur[1]} s={0.8} down={cur[2]} />}</div>
}

// ---------- intro: paper-cut shapes on beige
const SH = [["sq", -1, -1], ["tri", 0, -1], ["sq", 1, -1], ["sq", -1, 0], ["ci", 0, 0], ["tri", 1, 0], ["tri", -1, 1], ["ci", 0, 1], ["bow", 1, 1]] as const
const Shape: React.FC<{ k: string; x: number; y: number; r: number; rot: number }> = ({ k, x, y, r, rot }) => <div style={{ position: "absolute", left: x - r, top: y - r, width: r * 2, height: r * 2, transform: `rotate(${rot}deg)` }}>
	<svg width={r * 2} height={r * 2} viewBox="-50 -50 100 100">{k === "sq" ? <rect x={-44} y={-44} width={88} height={88} rx={6} fill="#fbf8f3" /> : k === "ci" ? <circle r={46} fill="#fbf8f3" /> : k === "tri" ? <path d="M-46 40 L0 -44 L46 40 Z" fill="#fbf8f3" /> : <path d="M-46 -44 L46 -44 L-46 44 L46 44 Z" fill="#fbf8f3" />}</svg></div>
const Intro: React.FC<{ t: number }> = ({ t }) => { const g = lerp(t, 0.6, 1.8, 0, 1, inOut), m = lerp(t, 3.15, 3.85, 0, 1, inOut), net = clamp01((t - 2.45) / 0.5)
	return <AbsoluteFill style={{ background: BEIGE, overflow: "hidden" }}>
		{SH.map(([k, cx, cy], i) => { const born = 0.05 + i * 0.16, p = clamp01((t - born) / 0.25), sx = 520 + rand(i) * 500, sy = 380 + rand(i + 4) * 320
			const gx = 760 + cx * 170, gy = 540 + cy * 170, x = lerp(g, 0, 1, sx, gx, (v) => v) * (1 - m) + (820 + cx * 60) * m, y = lerp(g, 0, 1, sy, gy, (v) => v) * (1 - m) + (540 + cy * 50) * m
			return p > 0 && <Shape key={i} k={k} x={x} y={y} r={88 * p * (1 + 0.45 * m)} rot={(1 - g) * (rand(i + 2) - 0.5) * 70} /> })}
		<div style={{ position: "absolute", left: 1150 - 80 * m, top: 470, width: 140, height: 140, borderRadius: 70, background: "#fbf8f3", opacity: clamp01((t - 1.6) / 0.3), transform: `scale(${1 + m * 0.4})` }}><div style={{ position: "absolute", left: 58, top: 58, width: 24, height: 24, borderRadius: 10, background: INK }} /></div>
		<svg width={1920} height={1080} style={{ position: "absolute" }}>
			<path d="M430 680 C 560 720, 700 660, 780 470" stroke={INK} strokeWidth={13} strokeLinecap="round" fill="none" strokeDasharray={600} strokeDashoffset={600 * (1 - clamp01(t / 0.7))} opacity={1 - clamp01((t - 1.2) / 0.4)} />
			<path d="M560 440 C 680 380, 860 390, 960 470" stroke={INK} strokeWidth={13} strokeLinecap="round" fill="none" strokeDasharray={400} strokeDashoffset={400 * (1 - clamp01((t - 0.8) / 0.5))} opacity={clamp01((t - 0.8) / 0.1) * (1 - clamp01((t - 1.7) / 0.3))} />
			{net > 0 && <g opacity={net * (1 - m * 0.3)}>{[[590, 370], [590, 710], [760, 540], [930, 370], [930, 710]].map(([x, y], k) => <line key={k} x1={x * (1 - m) + 840 * m} y1={y * (1 - m) + 540 * m} x2={1050} y2={540} stroke={INK} strokeWidth={16} />)}
				<line x1={590 * (1 - m) + 760 * m} y1={540} x2={1220} y2={540} stroke={INK} strokeWidth={16} />
				{[[590, 370], [590, 710], [590, 540], [760, 540], [930, 370], [930, 710], [1050, 540]].map(([x, y], k) => <circle key={k} cx={x * (1 - m) + (k === 6 ? 1050 : 820) * m} cy={y * (1 - m) + 540 * m} r={19} fill={INK} />)}</g>}</svg></AbsoluteFill> }

const ease = (x: number) => x, PUSH = Easing.bezier(0.45, 0, 0.2, 1)
const FlowBody = (t: number, z: number, px: number, py: number) => (s: number, w: number, h: number) => <div style={{ position: "absolute", inset: 0, background: "#f3f3f3", backgroundImage: "radial-gradient(#d9d9d9 1px, transparent 1px)", backgroundSize: `${18 * s * z}px ${18 * s * z}px`, overflow: "hidden" }}>
	<div style={{ position: "absolute", left: w / 2, top: h / 2, transform: `scale(${z * w / 1500}) translate(${px}px, ${py}px)` }}><div style={{ position: "absolute", left: -750, top: -370 }}><Flow /></div></div>
	<div style={{ position: "absolute", right: 16 * s, bottom: 14 * s, display: "flex", gap: 6 * s, fontFamily: CJK, fontSize: 13 * s }}><span style={{ padding: `${5 * s}px ${12 * s}px`, borderRadius: 6 * s, background: "#fff", boxShadow: `0 0 0 1px ${LINE}` }}>在 MosMos 中打开</span>{["−", "+"].map((x) => <span key={x} style={{ width: 26 * s, height: 26 * s, borderRadius: 6 * s, background: x === "+" && Math.abs(t - M.plus) < 0.15 ? "#9b82e8" : "#fff", boxShadow: `0 0 0 1px ${LINE}`, display: "flex", alignItems: "center", justifyContent: "center" }}>{x}</span>)}</div></div>
const FULLCAM = (t0: number): CamKey => [t0, 1.336, 960, 437]
const liveKeys = (r: number, h: number): CamKey[] => [[r - 0.4, 1.4, 956, 240], [h, 1.4, 956, 240], [h + 0.3, 1.4, 956, 380]]
const compCam = (k: number, t0: number): CamKey => [t0, 1.67, 955, layout(k, 1, 1).cy - 84]
const WIN = (t0: number, fy = 403): CamKey => [t0, 1.14, 960, fy]
const typing = (s: string, t: number, t0: number, t1: number) => typeAt(s, t, t0, s.length / Math.max(0.3, t1 - t0)).s
const scene = (t: number): React.ReactElement => {
	const i = C.filter((c) => t >= c).length
	switch (i) {
		case 0: return <Intro t={t} />
		case 1: { const p = lerp(t, C[0], C[1], 0, 1, ease), j = (k: number) => (rand(k) - 0.5) * 24
			const x0 = 250 - 120 * p, y0 = 150 - 70 * p, x1 = 1700 + 120 * p, y1 = 900 + 70 * p
			return <AbsoluteFill style={{ background: BEIGE }}><svg width={1920} height={1080} style={{ position: "absolute" }}><path d={`M${x0 + 40} ${y0 + j(1)} L${(x0 + x1) / 2} ${y0 + j(2)} L${x1 - 30} ${y0 + 8} Q${x1} ${y0} ${x1 + j(3)} ${y0 + 50} L${x1 + j(4)} ${(y0 + y1) / 2} L${x1 - 6} ${y1 - 40} Q${x1} ${y1} ${x1 - 50} ${y1 + j(5)} L${(x0 + x1) / 2} ${y1 + j(6)} L${x0 + 40} ${y1 - 6} Q${x0} ${y1} ${x0 + j(7)} ${y1 - 50} L${x0 + j(8)} ${(y0 + y1) / 2} L${x0 + 8} ${y0 + 40} Q${x0} ${y0} ${x0 + 40} ${y0 + j(1)} Z`} fill="#fbf8f3" /></svg>
				<div style={{ position: "absolute", left: 950, top: 530, width: 22, height: 22, borderRadius: 11, background: INK }} /></AbsoluteFill> }
		case 2: { const ty = typing(RAW[0], t, M.ty1, 7.6), cam = t < M.push - 0.3 ? camAt(t, [[C[1], 1.33, 960, 520], [M.push - 0.3, 1.5, 960, 545]]) : camAt(t, [[M.push - 0.3, 1.5, 960, 545], [C[2] - 0.1, 2.85, 1135, 615]], PUSH)
			const cx = lerp(t, M.send1 - 0.6, M.send1, 1500, 1398, inOut), cy = lerp(t, M.send1 - 0.6, M.send1, 760, 615, inOut)
			return <AbsoluteFill style={{ background: CREAM, overflow: "hidden" }}><div style={{ position: "absolute", width: 1920, height: 1080, transformOrigin: "0 0", transform: `translate(${960 - cam.x * cam.s}px, ${540 - cam.y * cam.s}px) scale(${cam.s})` }}>
				<div style={{ position: "absolute", left: 0, right: 0, top: 300, display: "flex", justifyContent: "center", alignItems: "center", gap: 22, fontFamily: SERIF, fontSize: 80, color: INK }}><LogoPixels size={66} t={t} mode="static" />今天，说点什么？</div>
				<Composer x={460} y={470} w={1000} h={205} fs={30} text={ty} t={t} down={Math.abs(t - M.send1) < 0.08} />
				<Cursor x={t > M.send1 - 0.6 ? cx : 1500 + 6 * Math.sin(t)} y={t > M.send1 - 0.6 ? cy : 520 + 4 * Math.cos(t)} s={0.9} down={Math.abs(t - M.send1) < 0.08} /></div></AbsoluteFill> }
		case 3: case 4: case 5: { // turn 1: reply, card header, expand to fill the frame; canvas zoom and drag inside the card
			const head = fade(t, M.h1, 0.25), ex = lerp(t, M.ex1, M.ex1 + 0.7, 0, 1, inOut)
			let z = 1, px = 0, py = 0
			if (i === 3) z = lerp(t, M.plus, M.plus + 0.25, 1, 1.12, inOut)
			if (i === 4) { z = 1.95; px = lerp(t, M.drag0, M.drag1, -10, 300, inOut); py = lerp(t, M.drag0, M.drag1, -50, 120, inOut) }
			if (i === 5) { z = 1.95; px = lerp(t, C[4], C[5], 110, 70); py = -110 }
			return <Cam t={t} keys={[...liveKeys(M.r1, M.h1), [M.ex1, 1.4, 956, 380], FULLCAM(M.ex1 + 0.7)]} bg={CREAM}><Turn bub={0} k={0} t={t} r={M.r1} head={head} full={ex} ex={ex} body={FlowBody(t, z, px, py)} /></Cam> }
		case 6: { const sh = lerp(t, M.shrink1, M.shrink1 + 0.9, 1, 0, inOut)
			return <Cam t={t} keys={[[C[5], 0.86, 960, 520], [C[6], 0.8, 960, 560]]}><Turn k={0} t={t} r={M.r1 - 5} head={1} full={1} ex={sh} body={FlowBody(t, 1, 0, 0)} /></Cam> }
		case 7: { if (t < M.sw2) return <Cam t={t} keys={[compCam(0, C[6]), compCam(0, M.sw2)]}><Turn k={0} t={t} r={0} head={1} full={1} body={FlowBody(t, 1, 0, 0)} next={typing(RAW[1], t, M.ty2, 19.3)} down={Math.abs(t - M.send2) < 0.08} cur={[lerp(t, M.send2 - 0.6, M.send2, 1500, 1418, inOut), lerp(t, M.send2 - 0.6, M.send2, 1150, layout(0, 1, 1).cy + 100, inOut), Math.abs(t - M.send2) < 0.08]} /></Cam>
			const head = fade(t, M.h2, 0.25), ex = lerp(t, M.ex2, M.ex2 + 0.35, 0, 1, inOut) * (1 - lerp(t, M.out2, M.out2 + 1.0, 0, 1, inOut)), full = fade(t, M.ex2, 0.35)
			const open = fade(t, M.ddOpen, 0.15), hi = t < 26.6 ? 1 : 2, dy = 271 + 64 + 46 + hi * 37
			const cur: [number, number, boolean] = [t < M.dd ? lerp(t, M.zin2, M.dd, 1200, 1362, inOut) : lerp(t, 26.4, 26.9, 1362, 1330, inOut), t < M.dd ? lerp(t, M.zin2, M.dd, 420, 276, inOut) : lerp(t, 26.3, 26.9, 276, dy, inOut), Math.abs(t - M.dd) < 0.08]
			return <Cam t={t} keys={[...liveKeys(M.r2, M.h2), [M.ex2, 1.4, 956, 380], FULLCAM(M.ex2 + 0.35), FULLCAM(M.out2), WIN(M.out2 + 0.6), WIN(M.zin2), [M.zin2 + 0.95, 2.6, 1079, 421], [C[7], 2.7, 1079, 425]]} bg={BEIGE}>
				<Turn bub={fade(t, M.out2, 0.4)} k={1} t={t} r={M.r2} head={head} full={full} ex={ex} body={(s) => <Scene t={t} s={s} open={open} hi={hi} />} cur={t > M.zin2 ? cur : undefined} /></Cam> }
		case 8: { const sceneBody = (s: number) => <Scene t={t} s={s} open={0} hi={1} />
			if (t < M.sw3) return <Cam t={t} keys={[[C[7], 1.43, 960, layout(1, 1, 1).cy + 110], [M.sw3, 1.46, 960, layout(1, 1, 1).cy + 110]]}><Turn solo k={1} t={t} r={0} head={1} full={1} body={sceneBody} rec next={typing(RAW[2], t, M.ty3, 29.0)} down={Math.abs(t - M.send3) < 0.08} /></Cam>
			const head = fade(t, M.h3, 0.25), full = lerp(t, M.ex3, M.ex3 + 0.5, 0, 1, inOut)
			return <Cam t={t} keys={[...liveKeys(M.r3, M.h3), [M.ex3, 1.4, 956, 380], WIN(M.out3 + 0.4, 430), WIN(M.zin3, 430), [M.zin3 + 0.85, 2.6, 777, 350], [C[8], 2.65, 777, 352]]}>
				<Turn bub={fade(t, M.ex3 + 0.2, 0.4)} k={2} t={t} r={M.r3} head={head} full={full} body={(s) => <Todo t={t} s={s} />} cur={t > M.zin3 ? [lerp(t, M.zin3, M.check, 640, 514, inOut), lerp(t, M.zin3, M.check, 470, 398, inOut), Math.abs(t - M.check) < 0.08] : undefined} /></Cam> }
		case 9: { if (t < M.sw4) return <Cam t={t} keys={[[C[8], 1.43, 960, layout(2, 1, 1).cy + 110], [M.sw4, 1.46, 960, layout(2, 1, 1).cy + 110]]}><Turn solo k={2} t={t} r={0} head={1} full={1} body={(s) => <Todo t={99} s={s} />} next={typing(RAW[3], t, M.ty4, 35.8)} down={Math.abs(t - M.send4) < 0.08} /></Cam>
			const head = fade(t, M.h4, 0.25), full = lerp(t, M.ex4, M.ex4 + 0.5, 0, 1, inOut)
			return <Cam t={t} keys={[...liveKeys(M.r4, M.h4), [M.ex4, 1.4, 956, 380], [M.ex4 + 0.7, 1.6, 960, 450], [M.zin4, 1.6, 960, 450], [C[9], 2.5, 1060, 330]]}>
				<Turn bub={0} k={3} t={t} r={M.r4} head={head} full={full} body={(s) => <Mail t={t} s={s} />} /></Cam> }
		case 10: { const pst = lerp(t, M.done, M.done + 0.45, 0, 1, inOut), lay = layout(3, 1, 1, 1)
			const cur: [number, number, boolean] = [lerp(t, M.paste - 0.8, M.paste, 1100, 1410, inOut), lerp(t, M.paste - 0.8, M.paste, 500, CY + 64 + CH[3] - 38, inOut), Math.abs(t - M.paste) < 0.08]
			return <Cam t={t} keys={[[C[9], 3.0, 746, 538], [42.4, 3.15, 760, 535], [M.out4 - 0.4, 3.9, 830, 520], [M.out4 + 0.9, 1.14, 960, 430], [M.done - 0.3, 1.14, 960, 430], [M.done + 0.4, 1.67, 955, lay.ty - 40], [M.r5 + 0.6, 1.67, 955, lay.ty + 60], [C[10], 1.67, 955, lay.ty + 150]]}>
				<Turn k={3} t={t} r={0} head={1} full={1} paste={pst} r2={M.r5} body={(s) => <Mail t={t} s={s} />} next={typing(RAW[4], t, M.ty5, 49.2)} cur={t > M.out4 && t < M.done + 0.3 ? cur : undefined} /></Cam> }
		default: { const lay = layout(3, 1, 1, 1), ov = t < M.logo - 0.2 ? 0.55 + 0.45 * clamp01((t - C[10]) / 0.45) : 1, w = clamp01((t - M.word) / 0.6)
			return <AbsoluteFill style={{ background: BEIGE }}>{ov < 1 && <Cam t={t} keys={[compCam(3, C[10])]}><Turn k={3} t={60} r={0} head={1} full={1} paste={1} r2={0} next={RAW[4]} /></Cam>}
				<AbsoluteFill style={{ background: BEIGE, opacity: ov }} />
				<AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}><div style={{ display: "flex", alignItems: "center", gap: 24 * w, opacity: fade(t, M.logo, 0.3), transform: `scale(${lerp(t, M.logo, M.logo + 0.5, 0.85, 1)})` }}>
					<LogoPixels size={60} t={t} mode="in" t0={M.logo - 0.1} /><div style={{ width: 340 * inOut(w), overflow: "hidden" }}><div style={{ opacity: w, transform: `translateX(${(1 - inOut(w)) * -40}px)` }}><Wordmark size={80} /></div></div></div></AbsoluteFill></AbsoluteFill> }
	}
}
const Overlay: React.FC<{ t: number }> = ({ t }) => { const i = C.filter((c) => t >= c).length
	if (i === 3) { const x = lerp(t, M.plus - 0.7, M.plus, 1500, 1840, inOut), y = lerp(t, M.plus - 0.7, M.plus, 860, 997, inOut); return t > M.ex1 + 0.8 ? <Cursor x={x} y={y} s={1.2} down={Math.abs(t - M.plus) < 0.08} /> : null }
	if (i === 4) { const d = t > M.drag0 && t < M.drag1; return <Hand x={lerp(t, M.drag0 - 0.5, M.drag1, 900, 1340, inOut)} y={lerp(t, M.drag0 - 0.5, M.drag1, 700, 640, inOut)} s={1.3} down={d} /> }
	if (i === 5) return <Cursor x={lerp(t, C[4], C[5], 1040, 1150)} y={560} s={1.2} />
	if (i === 6) return <Cursor x={lerp(t, C[5], C[6], 1500, 1640)} y={lerp(t, C[5], C[6], 160, 120)} s={0.9} />
	return null
}
// in-shot view changes with no cut in the reference (the chat scrolls to the new reply): 0.25 s dissolve from the frozen view
const SOFT = [M.sw2, M.sw3, M.sw4]
export const Film: React.FC = () => { const t = useT(), m = SOFT.find((x) => t >= x && t < x + 0.25)
	return <AbsoluteFill>{m === undefined ? scene(t) : <><AbsoluteFill>{scene(m - 0.001)}</AbsoluteFill><AbsoluteFill style={{ opacity: clamp01((t - m) / 0.25) }}>{scene(t)}</AbsoluteFill></>}<Overlay t={t} /></AbsoluteFill> }
