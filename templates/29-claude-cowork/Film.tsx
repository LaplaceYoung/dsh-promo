// Template 29 — structure of Anthropic "Introducing Cowork" (2026), MosMos content.
// A serif line on beige; then a light grid stage: the 听写 | 会议 toggle flips to 会议, the toggle melts into the
// pixel logo, a title and six task cards appear, the user picks 记一场会 and says what to do with today's meeting,
// picks the meeting record, answers one question, watches a progress card while adding two spoken requests, and
// gets a summary, todos and transcript; a spoken reply, a serif closing line and the logo.
import React from "react"
import { AbsoluteFill } from "remotion"
import { CJK, lerp, clamp01, inOut, useT, Wave, LogoPixels, Wordmark, Cursor, path, COPY } from "../_engine/src/mos"
import { Camera } from "../_engine/src/kit"
import TL from "./timeline.json"

const M = TL.marks as Record<string, number>, C = TL.cuts
const BG = "#e2d8c7", PAPER = "#f8f5ef", INKC = "#25221e", DIM = "#8b867d", LN = "#e6e0d5", ORG = "#d9774a", BLUE = "#3a78d4", BUB = "#ebe7dd"
const SERIF = "'Noto Serif CJK SC', 'Noto Serif SC', serif"
const k = (t: number, a: number, d = 0.35) => clamp01((t - a) / d)
const typed = (s: string, t: number, a: number, b: number) => Array.from(s).slice(0, Math.floor(clamp01((t - a) / (b - a)) * Array.from(s).length)).join("")
const ASK = "整理一下今天的首页改版周会，给我总结和待办。哪些地方还能更省时间？"
const Grid: React.FC<{ children?: React.ReactNode }> = ({ children }) => <AbsoluteFill style={{ background: PAPER, backgroundImage: `linear-gradient(${LN} 1.5px, transparent 1.5px), linear-gradient(90deg, ${LN} 1.5px, transparent 1.5px)`, backgroundSize: "64px 64px", fontFamily: CJK, color: INKC }}>{children}</AbsoluteFill>
const Card: React.FC<{ style?: React.CSSProperties; children: React.ReactNode }> = ({ style, children }) => <div style={{ position: "absolute", background: "#fff", borderRadius: 22, boxShadow: "0 0 0 1.5px #e4ddd1, 0 14px 40px rgba(80,60,20,.10)", ...style }}>{children}</div>

// ---------- shot 1: toggle → mark → title → cards → input
const TASKS = [["▤", "回一条消息"], ["✉", "写一封邮件"], ["▦", "整理文档"], ["✦", "写提示词"], ["◎", "记一场会"], [">_", "终端命令"]]
const Start: React.FC<{ t: number }> = ({ t }) => {
	const on = k(t, M.click, 0.3), melt = k(t, M.blob, 0.5), mk = k(t, M.mark, 0.5)
	const up = inOut(k(t, M.cards - 0.2, 0.6)), down = inOut(k(t, M.down, 0.6))
	const cur = path(t, [[M.tog, 1300, 860], [M.click - 0.3, 1200, 560], [M.click + 0.3, 1200, 563], [M.blob, 1300, 760], [M.cards + 0.6, 760, 620], [M.pick - 0.9, 1150, 590], [M.pick - 0.3, 930, 700], [M.pick, 930, 704], [M.down + 0.3, 1500, 1000]])
	const ask = typed(ASK, t, M.say, M.said)
	return <Grid>
		{melt < 1 && <div style={{ position: "absolute", left: 960 - 260, top: 490, width: 520, height: 100, borderRadius: 30, background: "#efebe3", boxShadow: "0 12px 40px rgba(80,60,20,.16)", transform: `scale(${1.9 * (1 - melt * 0.8) * (0.8 + 0.2 * k(t, M.tog, 0.3))}) rotate(${melt * 40}deg)`, opacity: Math.min(k(t, M.tog, 0.25), 1 - melt), borderRadius_: 0 } as React.CSSProperties}>
			<div style={{ position: "absolute", left: 8 + on * 252, top: 8, width: 252, height: 84, borderRadius: 24, background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,.12)" }} />
			<div style={{ position: "absolute", left: 8, top: 8, width: 252, height: 84, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 34, color: on > 0.5 ? DIM : INKC }}>听写</div>
			<div style={{ position: "absolute", left: 260, top: 8, width: 252, height: 84, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 34, color: on > 0.5 ? INKC : DIM }}>会议</div>
		</div>}
		{melt > 0 && <div style={{ position: "absolute", left: 960 - 80, top: lerp(up, 0, 1, 460, 190), width: 160, display: "flex", justifyContent: "center", transform: `scale(${(melt < 1 ? melt : 1) * lerp(up, 0, 1, 1.6, 0.8)}) rotate(${(1 - mk) * -60}deg)`, opacity: melt }}><LogoPixels size={110} t={t} mode={mk < 1 ? "spin" : "static"} /></div>}
		{t > M.title && <div style={{ position: "absolute", top: lerp(up, 0, 1, 600, 300), width: 1920, textAlign: "center", fontFamily: SERIF, fontWeight: 700, fontSize: 84, opacity: k(t, M.title, 0.3) }}>{typed("今天，先把哪件事说完？", t, M.title, M.title + 0.7)}</div>}
		{t > M.cards && <div style={{ position: "absolute", left: 210, top: lerp(down, 0, 1, 450, 420), width: 1500, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 22, padding: 22, borderRadius: 30, background: "#efebe3", opacity: k(t, M.cards, 0.4) }}>
			{TASKS.map(([i, s], j) => { const sel = j === 4 && t > M.pick - 0.05; const hov = j === 4 && t > M.pick - 0.5; return <div key={s} style={{ display: "flex", alignItems: "center", gap: 22, height: 96, borderRadius: 18, background: sel ? "#e5dfd3" : "#fbfaf6", boxShadow: `0 0 0 1.5px ${hov ? "#cfc6b6" : "#e6e0d5"}`, padding: "0 24px", fontSize: 30, opacity: k(t, M.cards + j * 0.07, 0.3) }}><div style={{ width: 62, height: 50, borderRadius: 8, border: `1.5px solid #cfc6b6`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, color: DIM }}>{i}</div>{s}</div> })}
		</div>}
		{t > M.down && <Card style={{ left: 210, top: 720, width: 1500, height: 200, opacity: k(t, M.down, 0.4), padding: "26px 32px" }}>
			<div style={{ fontSize: 32, lineHeight: 1.45, minHeight: 92 }}>{ask || <span style={{ color: "#aaa398" }}>按 Fn 说出你要做的事…</span>}{ask && t < M.said + 0.3 && <span style={{ color: "#bbb" }}>|</span>}</div>
			<div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 8 }}><div style={{ fontSize: 22, border: `1.5px solid ${LN}`, borderRadius: 10, padding: "6px 14px" }}>▭ 选择会议记录</div><div style={{ fontSize: 28, color: DIM }}>＋</div><div style={{ flex: 1 }} /><Wave t={t} live={t > M.say && t < M.said} n={8} h={28} color={INKC} /><div style={{ fontSize: 24, background: ORG, color: "#fff", borderRadius: 12, padding: "10px 20px" }}>开始整理 →</div></div>
		</Card>}
		{t > M.tog + 0.2 && <Cursor x={cur.x} y={cur.y} down={Math.abs(t - M.click) < 0.1 || Math.abs(t - M.pick) < 0.1} s={1.5} />}
	</Grid>
}
// ---------- record picker overlay
const RECS = ["首页改版周会", "交互稿评审", "品牌素材对齐", "设计组例会", "Nimbus 需求沟通", "周舟 1 对 1"]
const Picker: React.FC<{ t: number }> = ({ t }) => {
	const cur = path(t, [[C[1], 1250, 700], [M.pickRec - 0.2, 905, 470], [M.pickRec, 906, 472]])
	return <AbsoluteFill><div style={{ filter: "blur(3px)" }}><Start t={C[1] - 0.01} /></div><AbsoluteFill style={{ background: "rgba(40,38,34,.55)" }} />
		<div style={{ position: "absolute", left: 300, top: 150, width: 1320, height: 780, borderRadius: 18, background: "#f7f6f3", boxShadow: "0 30px 80px rgba(0,0,0,.35)", display: "flex", overflow: "hidden", fontFamily: CJK, color: INKC }}>
			<div style={{ width: 280, background: "#eeece7", padding: 30, fontSize: 22, lineHeight: "46px", color: "#5d5850" }}><div style={{ fontSize: 16, color: DIM }}>MosMos</div><div>我的输入</div><div style={{ background: "#dfe7f3", borderRadius: 8, paddingLeft: 10, color: INKC }}>会议记录</div><div>热词</div><div style={{ fontSize: 16, color: DIM, marginTop: 20 }}>最近</div><div>本周</div><div>上周</div></div>
			<div style={{ flex: 1, padding: "30px 40px" }}>
				<div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: DIM, marginBottom: 30 }}><span>‹ ›  会议记录</span><span style={{ border: `1px solid ${LN}`, borderRadius: 8, padding: "2px 30px" }}>搜索</span></div>
				<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 40 }}>{RECS.map((r, i) => <div key={r} style={{ textAlign: "center", fontSize: 22 }}><div style={{ height: 150, borderRadius: 14, background: i === 0 && t > M.pickRec - 0.3 ? "#cfe0f6" : "#fff", boxShadow: `0 0 0 1.5px ${i === 0 && t > M.pickRec - 0.3 ? BLUE : LN}`, display: "flex", alignItems: "center", justifyContent: "center" }}><Wave t={t + i} n={9} h={50} color={i === 0 ? BLUE : "#9cb6d8"} /></div><div style={{ marginTop: 12 }}>{r}</div></div>)}</div>
				<div style={{ position: "absolute", right: 340, bottom: 190, display: "flex", gap: 16, fontSize: 20 }}><span style={{ border: `1px solid ${LN}`, borderRadius: 8, padding: "6px 20px", background: "#fff" }}>取消</span><span style={{ background: BLUE, color: "#fff", borderRadius: 8, padding: "6px 24px" }}>选择</span></div>
			</div>
		</div>
		<Cursor x={cur.x} y={cur.y} down={Math.abs(t - M.pickRec) < 0.1} s={1.5} />
	</AbsoluteFill>
}
const InputClose: React.FC<{ t: number }> = ({ t }) => {
	const cur = path(t, [[C[2], 640, 980], [C[2] + 0.8, 520, 890], [M.go - 0.6, 1590, 880], [M.go, 1592, 884]])
	return <Camera t={t} keys={[[C[2], 2.1, 560, 815], [C[2] + 1.0, 2.1, 600, 818], [M.go - 0.6, 2.1, 1420, 818], [C[3], 2.15, 1430, 820]]}><Grid>
		<Card style={{ left: 210, top: 720, width: 1500, height: 200, padding: "26px 32px" }}>
			<div style={{ fontSize: 32, lineHeight: 1.45, minHeight: 92 }}>{ASK}</div>
			<div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 8 }}><div style={{ fontSize: 22, border: `1.5px solid ${LN}`, borderRadius: 10, padding: "6px 14px" }}>▭ 首页改版周会 ▾</div><div style={{ fontSize: 28, color: DIM }}>＋</div><div style={{ flex: 1 }} /><div style={{ fontSize: 24, background: Math.abs(t - M.go) < 0.12 ? "#c3653b" : ORG, color: "#fff", borderRadius: 12, padding: "10px 20px" }}>开始整理 →</div></div>
		</Card>
		<Cursor x={cur.x} y={cur.y} down={Math.abs(t - M.go) < 0.1} s={0.8} />
	</Grid></Camera>
}
// ---------- question
const OPTS = [["总结和待办", "关键结论与行动项"], ["只要待办", "列出行动项，不写其他"], ["完整逐字稿", "区分说话人，保留全文"], ["输入其他要求…", ""]]
const Question: React.FC<{ t: number }> = ({ t }) => {
	const q = k(t, M.q, 0.4)
	const cur = path(t, [[M.q, 1300, 800], [M.opt - 0.4, 1060, 440], [M.opt, 1062, 444]])
	return <Grid>
		{q < 1 && <div style={{ position: "absolute", left: 440, top: 380, fontFamily: SERIF, fontSize: 84, lineHeight: 1.5, opacity: 1 - q }}>{typed("我先把这场会过一遍。", t, C[3] + 0.3, C[3] + 1.4)}<br />{typed("先问一个问题——", t, C[3] + 1.6, C[3] + 2.4)}<div style={{ marginTop: 20 }}><LogoPixels size={80} t={t} mode="spin" /></div></div>}
		{q > 0 && <Card style={{ left: 560, top: 240, width: 800, padding: "26px 0 20px", transform: `translateY(${(1 - q) * 30}px)`, opacity: q }}>
			<div style={{ fontSize: 30, fontWeight: 600, padding: "0 30px 20px" }}>要整理成什么样？</div>
			{OPTS.map(([a, b], i) => <div key={a} style={{ display: "flex", alignItems: "center", padding: "18px 30px", borderTop: `1.5px solid ${LN}`, background: i === 0 && t > M.opt - 0.5 ? "#efebe3" : "#fff" }}><div style={{ flex: 1 }}><div style={{ fontSize: 28, color: b ? INKC : DIM }}>{a}</div>{b && <div style={{ fontSize: 22, color: DIM }}>{b}</div>}</div><div style={{ fontSize: 22, color: DIM, border: `1px solid ${LN}`, borderRadius: 6, padding: "0 10px" }}>{i + 1}</div></div>)}
			<div style={{ margin: "18px 30px 0", fontSize: 22, border: `1.5px solid ${LN}`, borderRadius: 10, padding: "6px 22px", display: "inline-block" }}>跳过</div>
		</Card>}
		{q > 0 && <Cursor x={cur.x} y={cur.y} down={Math.abs(t - M.opt) < 0.1} s={1.4} />}
	</Grid>
}
// ---------- progress
const STEPS = ["转写会议录音", "区分说话人", "提取待办事项", "标注负责人和时间", "保留完整逐字稿", "生成会议总结"]
const Prog: React.FC<{ t: number; done: number; n?: number; s?: number }> = ({ t, done, n = 4, s = 1 }) => <div style={{ width: 640 * s, fontSize: 24 * s }}>
	<div style={{ display: "flex", justifyContent: "space-between", fontWeight: 600, padding: `${18 * s}px ${26 * s}px`, fontSize: 24 * s }}><span>进度</span><span style={{ color: DIM }}>⌄</span></div>
	{STEPS.slice(0, n).map((x, i) => <div key={x} style={{ display: "flex", alignItems: "center", gap: 18 * s, padding: `${11 * s}px ${26 * s}px`, color: i < done ? DIM : i === done ? INKC : DIM, textDecoration: i < done ? "line-through" : undefined }}>
		<div style={{ width: 34 * s, height: 34 * s, borderRadius: 17 * s, border: `${2.5 * s}px solid ${i <= done ? BLUE : "#cfc6b6"}`, background: i < done ? BLUE : "transparent", color: i < done ? "#fff" : i === done ? BLUE : DIM, fontSize: 20 * s, display: "flex", alignItems: "center", justifyContent: "center" }}>{i < done ? "✓" : i + 1}</div>{x}</div>)}
</div>
const Bubble: React.FC<{ s: string; op: number; size?: number }> = ({ s, op, size = 26 }) => <div style={{ display: "inline-block", background: BUB, borderRadius: 16, padding: `${size * 0.55}px ${size * 0.9}px`, fontSize: size, opacity: op }}>{s}</div>
const Working: React.FC<{ t: number }> = ({ t }) => {
	const p = k(t, M.prog, 0.4), b1 = k(t, M.b1, 0.3), mv = inOut(k(t, M.b1 + 2.4, 0.6))
	return <Grid>
		{t < M.prog + 0.3 && <div style={{ position: "absolute", left: 620, top: 470, display: "flex", alignItems: "center", gap: 30, fontFamily: SERIF, fontSize: 96, fontStyle: "italic", opacity: 1 - p, backgroundImage: `linear-gradient(90deg, ${INKC} ${((t * 0.6) % 1) * 100 - 20}%, #c9c2b6 ${((t * 0.6) % 1) * 100}%, ${INKC} ${((t * 0.6) % 1) * 100 + 20}%)`, WebkitBackgroundClip: "text", color: "transparent" }}><span style={{ width: 14, height: 14, borderRadius: 7, background: ORG }} />正在整理…</div>}
		{p > 0 && t < M.b1 && <Card style={{ left: 512, top: 220, opacity: p }}><Prog t={t} done={0} s={1.4} /></Card>}
		{t > M.b1 && <div style={{ position: "absolute", left: lerp(mv, 0, 1, 960 - 420, 1000), top: lerp(mv, 0, 1, 450, 250), transform: `scale(${lerp(mv, 0, 1, 2.0, 1.0)})`, transformOrigin: "0 0" }}><Bubble s={typed("对了，还有一件事", t, M.b1, M.b1 + 1.4)} op={b1} size={44} /></div>}
		{t > M.b2 && <div style={{ position: "absolute", right: 120, top: 400 }}><Bubble s="待办里有负责人和时间的，也一起写上" op={k(t, M.b2, 0.3)} size={44} /></div>}
		{t > M.b3 && <div style={{ position: "absolute", right: 120, top: 560 }}><Bubble s="逐字稿保留完整，别删" op={k(t, M.b3, 0.3)} size={44} /></div>}
		{t > M.b1 && <div style={{ position: "absolute", left: 140, top: 760 }}><LogoPixels size={46} t={t} mode="spin" /></div>}
	</Grid>
}
// ---------- record window, context, outputs, wide view
const RecWin: React.FC<{ t: number }> = ({ t }) => <Camera t={t} keys={[[C[8], 1.9, 700, 300], [C[9], 1.95, 760, 310]]}><AbsoluteFill style={{ background: PAPER }}>
	<div style={{ position: "absolute", left: 160, top: 90, width: 1600, height: 900, borderRadius: 16, background: "#fff", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,.15)", fontFamily: CJK, color: INKC }}>
		<div style={{ height: 70, background: "#2b2a28", display: "flex", alignItems: "center", gap: 12, padding: "0 22px" }}>{["#ee6a5f", "#f5be4f", "#62c554"].map((c) => <div key={c} style={{ width: 16, height: 16, borderRadius: 8, background: c }} />)}<div style={{ marginLeft: 20, background: ORG, color: "#fff", fontSize: 18, borderRadius: 6, padding: "2px 10px" }}>MosMos</div><div style={{ background: "#3d3c39", color: "#eee", fontSize: 18, borderRadius: 8, padding: "6px 16px", border: `2px solid ${ORG}` }}>会议记录 · 首页改版周会 ✕</div></div>
		<div style={{ padding: "30px 40px", display: "flex", alignItems: "center", gap: 24 }}><div style={{ fontSize: 34 }}>☰</div><LogoPixels size={40} t={t} mode="static" /><div style={{ fontSize: 34 }}>首页改版周会</div><div style={{ flex: 1 }} /><div style={{ fontSize: 24, border: `1.5px solid ${LN}`, borderRadius: 24, padding: "8px 26px" }}>逐字稿</div></div>
		<div style={{ padding: "0 40px", display: "flex", gap: 30 }}>{COPY.meeting.map(([w, tm], i) => <div key={tm} style={{ borderRadius: 14, boxShadow: `0 0 0 1.5px ${LN}`, padding: "16px 22px", fontSize: 24 }}>{w}<div style={{ fontSize: 20, color: DIM }}>{tm}</div></div>)}</div>
	</div></AbsoluteFill></Camera>
const Context: React.FC<{ t: number }> = ({ t }) => {
	const a = k(t, M.art, 0.4)
	const cur = path(t, [[M.art, 1300, 900], [M.art3 - 0.4, 1000, 640], [M.art3, 1002, 642], [C[10], 1010, 650]])
	return <Grid>
		{a < 1 && <div style={{ position: "absolute", left: 120, top: 150, opacity: 1 - a, transform: `scale(${lerp(t, C[9], M.art, 3.3, 3.1)})`, transformOrigin: "0 0" }}>{[["▭", "首页改版周会 · 录音"], ["✦", "热词 · 3 条已启用"], ["▤", "逐字稿 · 3 位说话人"]].map(([i, s]) => <div key={s} style={{ display: "flex", alignItems: "center", gap: 26, fontSize: 30, marginBottom: 26 }}><div style={{ width: 64, height: 64, borderRadius: 10, background: "#ece7de", display: "flex", alignItems: "center", justifyContent: "center", color: DIM }}>{i}</div>{s}</div>)}</div>}
		{a > 0 && <Card style={{ left: 480, top: 300, width: 960, padding: "26px 30px", opacity: a, transform: `scale(${lerp(t, M.art, C[10], 1.45, 1.52)})` }}>
			<div style={{ display: "flex", justifyContent: "space-between", fontSize: 34, marginBottom: 14 }}><span>生成内容</span><span style={{ color: DIM }}>⌄</span></div>
			{["会议总结", "待办事项", "多人逐字稿"].map((s, i) => <div key={s} style={{ display: "flex", alignItems: "center", gap: 22, fontSize: 32, padding: "16px 18px", borderRadius: 16, background: i === 2 && t > M.art3 - 0.3 ? "#ece8df" : "transparent", opacity: i === 2 ? k(t, M.art + 0.8, 0.4) : 1 }}><div style={{ width: 52, height: 52, borderRadius: 8, background: "#ece7de", display: "flex", alignItems: "center", justifyContent: "center", color: DIM, fontSize: 24 }}>▤</div>{s}</div>)}
		</Card>}
		{a > 0 && <Cursor x={cur.x} y={cur.y} down={Math.abs(t - M.art3) < 0.1} s={1.5} />}
	</Grid>
}
const Wide: React.FC<{ t: number }> = ({ t }) => <AbsoluteFill style={{ background: BG, fontFamily: CJK, color: INKC }}>
	<div style={{ position: "absolute", left: 140, top: 70, width: 1640, height: 940, borderRadius: 20, background: PAPER, boxShadow: "0 30px 80px rgba(80,60,20,.2)", overflow: "hidden", transform: `scale(${lerp(t, C[10], C[11], 0.98, 1.02)})` }}>
		<div style={{ position: "absolute", left: 30, top: 60, width: 380, fontSize: 21, lineHeight: 1.7 }}>首页改版周会已经整理好：<div>✓ 会议总结</div><div>✓ 待办事项（含负责人和时间）</div><div>✓ 多人逐字稿</div><div style={{ marginTop: 12, fontWeight: 600 }}>要点</div>{["交付顺序按素材、交互、视觉推进", "品牌素材今天下午同步", "周四开始视觉方案"].map((x) => <div key={x}>· {x}</div>)}<div style={{ marginTop: 16 }}><LogoPixels size={30} t={t} mode="static" /></div></div>
		<div style={{ position: "absolute", left: 30, bottom: 30, width: 380, height: 100, borderRadius: 16, background: "#fff", boxShadow: `0 0 0 1px ${LN}`, padding: 16, fontSize: 20, color: "#aaa398" }}>按 Fn 回复…</div>
		<div style={{ position: "absolute", left: 440, top: 30, width: 820, bottom: 30, borderRadius: 14, background: "#fff", boxShadow: `0 0 0 1px ${LN}`, overflow: "hidden" }}>
			<div style={{ height: 50, borderBottom: `1px solid ${LN}`, fontSize: 18, padding: "12px 20px", color: DIM }}>首页改版周会 · 会议总结</div>
			<div style={{ margin: 24, height: 330, borderRadius: 8, background: "#1f2a3a", color: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: SERIF }}><div style={{ fontSize: 46, fontWeight: 700 }}>首页改版周会</div><div style={{ fontSize: 20, letterSpacing: 6, marginTop: 12, color: "#b9c3d3" }}>会议总结 · 待办</div></div>
			<div style={{ margin: "0 24px", fontSize: 26, fontWeight: 600 }}>这场会的概况</div>
			<div style={{ display: "flex", gap: 18, margin: 24 }}>{[["3", "位说话人"], ["3", "条待办"], ["1", "条结论"]].map(([n, s]) => <div key={s} style={{ flex: 1, height: 220, borderRadius: 8, background: "#b9657e", color: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}><div style={{ fontSize: 80, fontFamily: SERIF }}>{n}</div><div style={{ fontSize: 20 }}>{s}</div></div>)}</div>
		</div>
		<div style={{ position: "absolute", right: 30, top: 30, width: 330, fontSize: 18 }}>{[["进度", STEPS], ["生成内容", ["会议总结", "待办事项", "多人逐字稿"]], ["资料", ["首页改版周会 · 录音", "热词 · 3 条已启用"]]].map(([h, xs]) => <div key={h as string} style={{ background: "#fff", borderRadius: 12, boxShadow: `0 0 0 1px ${LN}`, padding: "12px 16px", marginBottom: 16 }}><div style={{ fontWeight: 600, marginBottom: 6 }}>{h as string}</div>{(xs as string[]).map((x) => <div key={x} style={{ lineHeight: "34px", color: "#5d5850" }}>{h === "进度" ? <span style={{ color: BLUE }}>✓ </span> : "▤ "}{x}</div>)}</div>)}</div>
	</div>
</AbsoluteFill>
const Reply: React.FC<{ t: number }> = ({ t }) => {
	const s = typed("太好了，就按这个来。", t, M.say2, M.said2)
	return <Camera t={t} keys={[[C[11], 2.2, 450, 900], [C[12], 2.25, 455, 905]]}><Wide t={C[11]} />
		<div style={{ position: "absolute", left: 170, top: 878, width: 380, height: 100, borderRadius: 16, background: "#fff", padding: 16, fontSize: 20, color: s ? INKC : "#aaa398", fontFamily: CJK, boxShadow: "0 0 0 1px #e6e0d5" }}>{s || "按 Fn 回复…"}{s && <span style={{ color: "#bbb" }}>|</span>}
			<div style={{ position: "absolute", right: 14, bottom: 12, width: 36, height: 36, borderRadius: 9, background: ORG, color: "#fff", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>↑</div>
			<div style={{ position: "absolute", left: 16, bottom: 14 }}><Wave t={t} live={t > M.say2 && t < M.said2} n={6} h={18} color={INKC} /></div></div>
		<Cursor x={lerp(t, C[11], C[11] + 0.6, 560, 528, inOut)} y={lerp(t, C[11], C[11] + 0.6, 1000, 962, inOut)} down={t > C[12] - 0.3} s={0.7} />
	</Camera>
}
const End: React.FC<{ t: number }> = ({ t }) => {
	if (t < M.dot) return <AbsoluteFill style={{ background: BG }}><AbsoluteFill style={{ alignItems: "center", justifyContent: "center", fontFamily: CJK, color: INKC, opacity: 1 - k(t, M.dot - 0.7, 0.7) }}>
		<div style={{ fontSize: 22, letterSpacing: 4, border: `1.5px solid ${INKC}`, borderRadius: 8, padding: "4px 14px", opacity: k(t, M.endText, 0.4) }}>◎ 会议记录</div>
		<div style={{ marginTop: 26, fontFamily: SERIF, fontSize: 76, opacity: k(t, M.endText + 0.3, 0.5) }}>下一场会，开口就好</div>
	</AbsoluteFill></AbsoluteFill>
	const a = inOut(k(t, M.logo, 0.45)), d = k(t, M.dot, 0.5)
	return <AbsoluteFill style={{ background: BG, alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 26 * a }}>
		<div style={{ opacity: d, transform: `scale(${t < M.logo ? lerp(d, 0, 1, 0.6, 1.2) : lerp(a, 0, 1, 1.2, 1)})` }}><LogoPixels size={86} t={t} mode="static" /></div>
		<div style={{ width: a * 400, overflow: "hidden", opacity: a }}><Wordmark size={100} color={INKC} /></div>
	</AbsoluteFill>
}
export const Film: React.FC = () => {
	const t = useT()
	if (t < C[0]) return <AbsoluteFill style={{ background: BG, alignItems: "center", justifyContent: "center", fontFamily: SERIF, fontSize: 52, color: INKC }}><div style={{ opacity: k(t, 0.15, 0.5) }}>一个键，记下整场会</div></AbsoluteFill>
	if (t < C[1]) return <Camera t={t} keys={[[C[0], 1.0, 960, 540], [M.down - 0.1, 1.0, 960, 540], [M.down + 0.5, 1.1, 960, 590], [C[1], 1.12, 960, 595]]}><Start t={t} /></Camera>
	if (t < C[2]) return <Picker t={t} />
	if (t < C[3]) return <InputClose t={t} />
	if (t < C[4]) return <Question t={t} />
	if (t < C[5]) return <Working t={t} />
	if (t < C[6]) return <Grid><Card style={{ left: 512, top: 220 }}><Prog t={t} done={1} s={1.4} /></Card></Grid>
	if (t < C[7]) return <Grid><Card style={{ left: 520, top: 260 }}><Prog t={t} done={2} n={5} s={1.35} /></Card></Grid>
	if (t < C[8]) return <Camera t={t} keys={[[C[7], 2.7, 760, 560], [C[8], 2.75, 760, 600]]}><Grid><Card style={{ left: 520, top: 260 }}><Prog t={t} done={2} n={6} s={1.35} /></Card></Grid></Camera>
	if (t < C[9]) return <RecWin t={t} />
	if (t < C[10]) return <Context t={t} />
	if (t < C[11]) return <Wide t={t} />
	if (t < C[12]) return <Reply t={t} />
	return <End t={t} />
}
