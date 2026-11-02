// Template 19 — structure of Vercel "Introducing v0: Generative UI" (2023), MosMos content.
// White page, a question that turns into a black input capsule, prompts typed one after another, then the
// generated result inside a browser frame: the camera pushes in, a block is selected and rewritten by voice,
// the raw transcript shows in a dark panel, a wall of results, the URL and the logo.
import React from "react"
import { AbsoluteFill } from "remotion"
import { CJK, HEAVY, SANS, MONO, COPY, lerp, clamp01, inOut, typeAt, useT, Wave, Cursor, path, LogoPixels, Wordmark, T3, LINE } from "../_engine/src/mos"
import { Camera, CamKey } from "../_engine/src/kit"
import TL from "./timeline.json"

const M = TL.marks as Record<string, number>, C = TL.cuts
const BLUE = "#2f6bff"

// ---------- input capsule
const PROMPTS: [string, number, number][] = [["给李经理回一封邮件", M.p1, M.p1x], ["一条飞书回复", M.p2, M.p2x], ["首页改版周会的会议纪要", M.p3, 99]]
const Capsule: React.FC<{ t: number }> = ({ t }) => {
	const w = lerp(t, M.pill, M.bar + 0.4, 520, 1060, inOut)
	let txt = "你想写点什么？", grey = false
	if (t > M.p1 - 0.3) { const cur = [...PROMPTS].reverse().find((p) => t >= p[1] - 0.3)!; txt = typeAt(cur[0], t, cur[1], 8, cur[2], 40).s; grey = false }
	const next = t > M.p1 && t < M.p3 + 1.5 ? PROMPTS[t < M.p2 - 0.3 ? 1 : 2][0] : ""
	return (
		<div style={{ position: "absolute", left: 960 - w / 2, top: 470, width: w }}>
			<div style={{ height: 120, borderRadius: 60, background: "#0b0b0c", display: "flex", alignItems: "center", padding: "0 26px", gap: 20, boxShadow: "0 20px 50px rgba(0,0,0,.18)" }}>
				<div style={{ width: 64, height: 64, borderRadius: 99, background: "#222327", display: "flex", alignItems: "center", justifyContent: "center", opacity: clamp01((t - M.bar) / 0.3) }}><Wave t={t} live={t > M.p1 && t < M.go} n={5} h={26} color="#fff" /></div>
				<div style={{ flex: 1, fontFamily: CJK, fontWeight: 600, fontSize: 40, color: grey ? "#777" : "#fff", whiteSpace: "nowrap", overflow: "hidden", textAlign: t < M.bar ? "center" : "left" }}>{txt}{t > M.p1 - 0.3 && t < M.go && <span style={{ opacity: Math.floor(t * 2.5) % 2 ? 1 : 0.2 }}>|</span>}</div>
				<div style={{ width: 64, height: 64, borderRadius: 99, background: t > M.go - 0.1 ? "#fff" : "#2a2b2f", color: t > M.go - 0.1 ? "#000" : "#bbb", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, opacity: clamp01((t - M.bar) / 0.3) }}>↵</div>
			</div>
			{next && <div style={{ fontFamily: CJK, fontSize: 30, color: "#b5b5b8", marginTop: 26, paddingLeft: 110 }}>{next}</div>}
		</div>
	)
}
const Intro: React.FC<{ t: number }> = ({ t }) => (
	<AbsoluteFill style={{ background: "#fff", opacity: clamp01((M.page + 0.4 - t) / 0.6) }}>
		{t < M.ask && <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}><div style={{ transform: `scale(${lerp(t, M.logo, M.ask, 1.15, 1, inOut)})` }}><LogoPixels size={190} t={t} mode="in" t0={M.logo} /></div></AbsoluteFill>}
		{t >= M.ask && t < M.pill && <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", fontFamily: CJK, fontWeight: 600, fontSize: 64 }}><div>{["你想", "写点", "什么？"].map((w, i) => <span key={i} style={{ color: `rgba(20,20,22,${clamp01((t - M.ask - i * 0.25) / 0.4)})` }}>{w}</span>)}</div></AbsoluteFill>}
		{t >= M.pill && <Capsule t={t} />}
	</AbsoluteFill>
)

// ---------- generated page in a browser frame
const Frame: React.FC<{ t: number; title: string; formal: number; sel?: number; children?: React.ReactNode }> = ({ t, title, formal, sel = 0, children }) => (
	<div style={{ position: "absolute", left: 160, top: 90, width: 1600, height: 900, borderRadius: 18, background: "#fff", boxShadow: `0 0 0 1px ${LINE}, 0 30px 80px rgba(0,0,0,.08)`, overflow: "hidden", fontFamily: CJK }}>
		<div style={{ height: 60, borderBottom: `1px solid ${LINE}`, display: "flex", alignItems: "center", gap: 14, padding: "0 22px" }}>
			<LogoPixels size={26} t={0} mode="static" /><div style={{ fontSize: 19, color: "#222" }}>{title}</div><div style={{ fontSize: 15, color: "#b07a10", background: "#fdf3dc", padding: "3px 10px", borderRadius: 6 }}>润色：{formal > 0.5 ? "高级" : "标准"}</div>
			<div style={{ flex: 1 }} /><div style={{ fontSize: 16, color: "#fff", background: "#111", padding: "7px 14px", borderRadius: 8 }}>插入到邮件</div>
		</div>
		<div style={{ position: "absolute", left: 0, top: 60, bottom: 0, width: 290, borderRight: `1px solid ${LINE}`, padding: "24px 20px", fontSize: 18, color: "#555" }}>
			{["会议纪要", "待办", "发言人", "原话", "热词"].map((x, i) => <div key={x} style={{ padding: "9px 12px", borderRadius: 8, background: i === 0 ? "#eef3ff" : "transparent", color: i === 0 ? BLUE : "#555" }}>{x}</div>)}
		</div>
		<div style={{ position: "absolute", left: 340, top: 110, width: 1180 }}>
			<div style={{ display: "inline-block", outline: sel ? `${2 + sel}px solid ${BLUE}` : "none", outlineOffset: 8, borderRadius: 4, position: "relative" }}>
				{sel > 0 && <div style={{ position: "absolute", left: -10, top: -44, background: BLUE, color: "#fff", fontSize: 14, padding: "3px 8px", borderRadius: 4, fontFamily: SANS }}>正文</div>}
				<div style={{ fontFamily: HEAVY, fontWeight: 800, fontSize: 46, color: "#111" }}>首页改版周会 · 会议纪要</div>
				<div style={{ fontSize: 24, lineHeight: 1.7, color: "#333", marginTop: 16, width: 1100 }}>{formal > 0.5 ? "李经理，您好：本周会议确定，交互稿将于周三前完成；品牌素材今天下午同步，素材到位后，周四启动视觉设计。" : "李经理你好，这周会上定了：交互稿周三前弄完，素材今天下午发群里，到了之后周四开始做视觉。"}</div>
			</div>
			<div style={{ fontSize: 18, color: T3, marginTop: 40 }}>待办</div>
			{COPY.todos.map((d, i) => <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 0", borderBottom: `1px solid ${LINE}`, fontSize: 22, color: "#222" }}><div style={{ width: 20, height: 20, borderRadius: 5, border: "2px solid #333" }} />{d}<div style={{ flex: 1 }} /><span style={{ fontSize: 16, color: T3 }}>{["今天", "周三", "周四"][i]}</span></div>)}
		</div>
		{children}
	</div>
)
const Prompt: React.FC<{ t: number; text?: string; t0?: number }> = ({ t, text = "", t0 = 0 }) => {
	const s = typeAt(text, t, t0, 8).s
	return <div style={{ position: "absolute", left: 660, top: 1010, width: 600, height: 56, borderRadius: 28, background: "#0b0b0c", display: "flex", alignItems: "center", gap: 14, padding: "0 20px", fontFamily: CJK, fontSize: 20, color: s ? "#fff" : "#888" }}><Wave t={t} live={!!s && s.length < text.length} n={5} h={18} color="#fff" />{s || "按 Fn，接着说…"}</div>
}
const Raw: React.FC<{ t: number }> = ({ t }) => (
	<div style={{ position: "absolute", left: 160, top: 90, width: 1600, height: 900, borderRadius: 18, background: "#0c0c0d", padding: "36px 44px", fontFamily: MONO, fontSize: 22, color: "#9fa1a6", lineHeight: 1.9, opacity: clamp01((t - M.raw) / 0.3) }}>
		<div style={{ color: "#fff", fontFamily: CJK, fontSize: 22, marginBottom: 18 }}>原话 · 首页改版周会</div>
		{COPY.meeting.map(([w, tm, s], i) => <div key={i}><span style={{ color: "#5f8cff" }}>{tm}</span>  <span style={{ color: "#e6b450" }}>{w}</span>  <span style={{ color: "#d6d7da", fontFamily: CJK }}>嗯，{s}</span></div>)}
		<div><span style={{ color: "#5f8cff" }}>10:09</span>  <span style={{ color: "#e6b450" }}>说话人 1</span>  <span style={{ color: "#d6d7da", fontFamily: CJK }}>{COPY.raw}</span></div>
	</div>
)
const Gen: React.FC<{ t: number }> = ({ t }) => {
	const formal = t > M.upd ? 1 : 0
	const sel = t > M.sel && t < M.back + 0.5 ? 1 : 0
	const keys: CamKey[] = t < C[0]
		? [[M.page, 0.94, 960, 560], [M.zoom, 1.0, 960, 560], [M.zoom + 1.5, 1.7, 820, 330], [M.back, 1.7, 820, 330], [M.back + 1.5, 1.0, 960, 560]]
		: [[C[0], 1.35, 760, 300], [M.wide, 1.35, 780, 300], [M.grid, 1.0, 960, 540]]
	const cur = path(t, [[M.zoom + 1.0, 1300, 700], [M.sel - 0.1, 620, 300], [M.back, 640, 320]])
	const after = t >= C[0]
	return (
		<AbsoluteFill style={{ background: "#fff", opacity: clamp01((t - M.page) / 0.4) * clamp01((M.grid + 0.3 - t) / 0.4) }}>
			<Camera t={t} keys={keys}>
				<Frame t={t} title={after ? "首页改版周会" : "首页改版周会的会议纪要"} formal={after ? (t > M.pick ? 1 : 0.6) : formal} sel={sel}>
					{t > M.say - 0.2 && t < M.upd + 0.6 && !after && <div style={{ position: "absolute", left: 560, top: 260, width: 470, background: "#fff", borderRadius: 12, boxShadow: `0 0 0 1px ${LINE}, 0 12px 30px rgba(0,0,0,.12)`, padding: 18, fontSize: 21, color: "#222" }}>
						{typeAt("语气正式一点，像发给客户的", t, M.say, 7).s}
						<div style={{ display: "flex", justifyContent: "flex-end", marginTop: 14 }}><div style={{ background: BLUE, color: "#fff", fontSize: 17, padding: "6px 14px", borderRadius: 8, transform: `scale(${Math.abs(t - M.upd + 0.3) < 0.08 ? 0.94 : 1})` }}>更新 ↵</div></div></div>}
					{after && t > M.drop && <div style={{ position: "absolute", left: 300, top: 56, width: 380, background: "#fff", borderRadius: 12, boxShadow: `0 0 0 1px ${LINE}, 0 12px 30px rgba(0,0,0,.12)`, padding: 10, fontSize: 19, opacity: clamp01((M.wide - t) / 0.3) }}>
						<div style={{ padding: "8px 12px", fontWeight: 700 }}>润色程度</div>
						{COPY.polish.map((p, i) => <div key={p.id} style={{ display: "flex", justifyContent: "space-between", padding: "10px 12px", borderRadius: 8, background: (i === 2 && t > M.pick) || (i === 1 && t <= M.pick) ? "#f2f5ff" : "transparent" }}><span>{p.label} <span style={{ color: T3, fontSize: 15 }}>{p.hint}</span></span><span>{(i === 2 && t > M.pick) || (i === 1 && t <= M.pick) ? "●" : "○"}</span></div>)}
					</div>}
				</Frame>
				{!after && t > M.raw && <Raw t={t} />}
				<Prompt t={t} text={!after && t > M.say - 0.5 && t < M.upd ? "语气正式一点，像发给客户的" : ""} t0={M.say} />
				{!after && t > M.zoom + 1 && t < M.back + 0.3 && <Cursor x={cur.x} y={cur.y} down={Math.abs(t - M.sel) < 0.08} />}
				{after && t > M.drop - 1 && t < M.wide && <Cursor x={lerp(t, M.drop - 1, M.pick - 0.1, 700, 640)} y={lerp(t, M.drop - 1, M.pick - 0.1, 120, 300)} down={Math.abs(t - M.pick) < 0.08} />}
			</Camera>
		</AbsoluteFill>
	)
}

// ---------- wall of results
const CARDS: [string, string][] = [["飞书", COPY.chatOut], ["邮件", COPY.mail[1]], ["文档", COPY.doc[0][1]], ["提示词", COPY.prompt[0]], ["终端", COPY.termCmd], ["会议", COPY.meeting[0][2]], ["待办", COPY.todos[0]], ["润色", COPY.polish[2].out!], ["热词", "Figma · Nimbus · 林清禾"], ["邮件", "台灯样品下周二寄到，麻烦确认灯罩尺寸。"], ["飞书", "收到，素材我今晚整理好发群里。"], ["文档", COPY.doc[2][1]]]
const Grid: React.FC<{ t: number }> = ({ t }) => (
	<AbsoluteFill style={{ background: "#fff", opacity: clamp01((t - M.grid) / 0.3) * clamp01((M.url - t) / 0.5) }}>
		<div style={{ position: "absolute", left: 60, top: 40, display: "grid", gridTemplateColumns: "repeat(4, 430px)", gap: 30, transform: `translateY(${lerp(t, M.grid, M.url, 0, -120, inOut)}px)` }}>
			{CARDS.map(([a, b], i) => <div key={i} style={{ height: 300, borderRadius: 16, boxShadow: `0 0 0 1px ${LINE}`, padding: 26, fontFamily: CJK, background: i % 5 === 3 ? "#fff8d9" : i % 7 === 4 ? "#0d0d0e" : "#fff", color: i % 7 === 4 ? "#ddd" : "#222" }}><div style={{ fontSize: 16, color: T3 }}>{a}</div><div style={{ fontSize: 24, lineHeight: 1.6, marginTop: 12 }}>{b}</div></div>)}
		</div>
	</AbsoluteFill>
)

export const Film: React.FC = () => {
	const t = useT()
	if (t < M.page + 0.5) return <AbsoluteFill style={{ background: "#fff" }}><Intro t={t} />{t > M.page && <Gen t={t} />}</AbsoluteFill>
	if (t < M.grid + 0.4) return <AbsoluteFill style={{ background: "#fff" }}><Gen t={t} />{t > M.grid && <Grid t={t} />}</AbsoluteFill>
	if (t < M.url) return <AbsoluteFill style={{ background: "#fff" }}><Grid t={t} /></AbsoluteFill>
	if (t < M.logo2) return <AbsoluteFill style={{ background: "#fff", alignItems: "center", justifyContent: "center", fontFamily: SANS, fontWeight: 600, fontSize: 64, color: "#111" }}><span style={{ opacity: clamp01((t - M.url) / 0.3) }}>{COPY.url}</span></AbsoluteFill>
	return (
		<AbsoluteFill style={{ background: "#fff", alignItems: "center", justifyContent: "center", opacity: clamp01((TL.dur - t) / 1.4) }}>
			<div style={{ display: "flex", alignItems: "center", gap: 26 }}><div style={{ transform: `scale(${lerp(t, M.logo2, M.mark, 1.6, 1, inOut)})` }}><LogoPixels size={110} t={t} mode="static" /></div>{t > M.mark && <div style={{ opacity: clamp01((t - M.mark) / 0.3) }}><Wordmark size={96} /></div>}</div>
		</AbsoluteFill>
	)
}
