// Template 16 — structure of Notion "Introducing Notion 3.0 · Agents" (2025), MosMos content.
// Hand-drawn characters (Open Peeps, CC0 — ASSETS.md) play MosMos's writing helpers; product shots sit inside a
// blue frame; a huge typed line, a grey waveform and a wall of helper cards carry the middle and the end.
import React from "react"
import { AbsoluteFill, Img, staticFile } from "remotion"
import { CJK, HEAVY, SANS, COPY, lerp, clamp01, inOut, typeAt, useT, Cursor, path, LogoPixels, Wordmark, Caret, T3, LINE } from "../_engine/src/mos"
import { Camera, CamKey, rand } from "../_engine/src/kit"
import TL from "./timeline.json"

const M = TL.marks as Record<string, number>, C = TL.cuts
const BEIGE = "#f6f5f1", BLUE = "#2b7de0", YEL = "#fbf3db"
const Peep: React.FC<{ k: number; s: number; head?: boolean; style?: React.CSSProperties }> = ({ k, s, head, style }) => <Img src={staticFile(`t16-p${(k % 6) + 1}${head ? "-head" : ""}.svg`)} style={{ width: s, height: head ? s * 760 / 720 : s * 1130 / 940, ...style }} />
const pop = (t: number, t0: number) => lerp(t, t0, t0 + 0.3, 0, 1)

// ---------- title cards
const Title: React.FC<{ t: number; lines: [string, number][]; peeps?: number; size?: number; bg?: string }> = ({ t, lines, peeps, size = 76, bg = "#fff" }) => (
	<AbsoluteFill style={{ background: bg, alignItems: "center", justifyContent: "center" }}>
		{peeps != null && <div style={{ display: "flex", marginBottom: 20, height: 220, alignItems: "flex-end" }}>{[0, 1, 2, 3, 4, 5].map((i) => { const p = pop(t, peeps + i * 0.07); return <div key={i} style={{ margin: "0 -18px", transform: `translateY(${(1 - p) * 60}px) scale(${0.6 + 0.4 * p})`, opacity: p }}><Peep k={i} s={170} head /></div> })}</div>}
		{lines.map(([l, t0], i) => <div key={i} style={{ fontFamily: HEAVY, fontWeight: 800, fontSize: size, color: "#111", lineHeight: 1.25, opacity: t >= t0 ? 1 : 0 }}>{l}</div>)}
	</AbsoluteFill>
)

// ---------- blue frame + pages
const Frame: React.FC<{ t: number; keys: CamKey[]; children: React.ReactNode }> = ({ t, keys, children }) => (
	<AbsoluteFill style={{ background: BLUE }}>
		<Camera t={t} keys={keys}><div style={{ position: "absolute", left: 40, top: 30, width: 1840, height: 1100, background: "#fff", borderRadius: 18, overflow: "hidden", fontFamily: CJK }}>{children}</div></Camera>
	</AbsoluteFill>
)
const TODO = ["整理首页改版周会的待办", "给李经理回第一版时间", "把品牌素材发到项目群", "确认台灯样品的灯罩尺寸"]
const Doc: React.FC<{ t: number }> = ({ t }) => (
	<div style={{ position: "absolute", left: 220, top: 110, width: 1000 }}>
		<Peep k={0} s={70} head />
		<div style={{ fontFamily: HEAVY, fontWeight: 800, fontSize: 52, color: "#111", marginTop: 14 }}>今天要写的</div>
		{TODO.map((d, i) => <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 14, padding: "10px 14px", background: YEL, borderRadius: 6, fontSize: 24, color: "#2a2b30" }}><div style={{ width: 20, height: 20, border: "2px solid #999", borderRadius: 4 }} />{d}</div>)}
		<div style={{ fontSize: 22, color: T3, marginTop: 40 }}>快速入口</div>
		<div style={{ display: "flex", gap: 60, marginTop: 14, fontSize: 22, color: "#2a2b30" }}>{["飞书回复", "邮件起草", "会议记录", "周报"].map((x) => <div key={x}>↗ {x}</div>)}</div>
	</div>
)
const Panel: React.FC<{ t: number; text?: string; t0?: number; title?: string; s?: number }> = ({ t, text = "", t0 = 0, title = "想写点什么？", s = 1 }) => {
	const ty = typeAt(text, t, t0, 9)
	return (
		<div style={{ width: 620, borderRadius: 18, background: "#fff", boxShadow: "0 0 0 1px #e6e6e6, 0 20px 50px rgba(0,0,0,.12)", padding: 28, fontFamily: CJK, transform: `scale(${s})`, transformOrigin: "0 0" }}>
			<Peep k={0} s={64} head />
			<div style={{ fontSize: 28, fontWeight: 700, color: "#111", marginTop: 6 }}>{title}</div>
			{["整理会议记录", "回一条飞书消息", "起草一封邮件"].map((x) => <div key={x} style={{ fontSize: 19, color: "#55565b", marginTop: 12 }}>✎ {x}</div>)}
			<div style={{ marginTop: 22, borderRadius: 14, border: `1.5px solid ${ty.s ? BLUE : "#e3e3e6"}`, padding: "16px 18px", minHeight: 96 }}>
				<div style={{ fontSize: 22, color: ty.s ? "#151517" : "#b4b6ba" }}>{ty.s || "按 Fn 说，或在这里输入…"}{ty.typing && <Caret t={t} h={0.9} />}</div>
				<div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 14, fontSize: 15, color: T3 }}><span>＠ 添加上下文</span><span>· 润色：标准</span><div style={{ flex: 1 }} /><div style={{ width: 34, height: 34, borderRadius: 99, background: ty.s ? BLUE : "#e3e3e6", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>↑</div></div>
			</div>
		</div>
	)
}
type Row = [string, string, string, string]
const ROWS: Row[] = [["周三前提交交互稿", "林清禾", "进行中", "周三"], ["今天同步品牌素材", "周舟", "待开始", "今天"], ["周四启动视觉设计", "李经理", "待开始", "周四"], ["确认台灯灯罩尺寸", "小林", "待开始", "周二"], ["回复供应商报价", "小林", "待开始", "周四"], ["整理首页文案", "周舟", "进行中", "周五"], ["上线前检查清单", "林清禾", "待开始", "周五"]]
const CHIP: Record<string, string> = { 进行中: "#d7e8fb", 待开始: "#eeeeec", 已完成: "#dbeedd", 紧急: "#fbdcd6" }
const Table: React.FC<{ t: number; n?: number; due?: number; urgent?: number; done?: number }> = ({ t, n = 7, due = 0, urgent = 0, done = 0 }) => (
	<div style={{ position: "absolute", left: 160, top: 90, width: 1500, fontFamily: CJK }}>
		<Peep k={4} s={60} head />
		<div style={{ fontFamily: HEAVY, fontWeight: 800, fontSize: 46, color: "#111", marginTop: 6 }}>首页改版 · 待办</div>
		<div style={{ fontSize: 17, color: T3, margin: "8px 0 22px" }}>由 MosMos 根据周会录音整理 · 3 位发言人</div>
		<div style={{ display: "flex", fontSize: 17, color: T3, borderBottom: `1px solid ${LINE}`, paddingBottom: 10 }}>{["事项", "负责人", "状态", "截止"].map((h, i) => <div key={h} style={{ width: [560, 260, 260, 260][i], opacity: i === 3 ? due : 1 }}>{h}</div>)}</div>
		{ROWS.map((r, i) => {
			const op = clamp01(n - i)
			const st = i < done ? "已完成" : urgent > 0 && r[1] === "李经理" ? "紧急" : r[2]
			return <div key={i} style={{ display: "flex", alignItems: "center", height: 62, borderBottom: `1px solid ${LINE}`, fontSize: 22, color: "#25262a", opacity: op }}>
				<div style={{ width: 560 }}>{r[0]}</div><div style={{ width: 260 }}>{r[1]}</div>
				<div style={{ width: 260 }}><span style={{ background: CHIP[st], padding: "4px 12px", borderRadius: 6, fontSize: 18 }}>{st}</span></div>
				<div style={{ width: 260, opacity: due }}>{r[3]}</div>
			</div>
		})}
	</div>
)

// ---------- character picker
const STY = ["飞书", "邮件", "文档", "提示词", "终端", "会议"]
const Picker: React.FC<{ t: number }> = ({ t }) => {
	const sel = t < M.sel1 ? 0 : t < M.sel2 ? 1 : t < M.sel3 ? 2 : 3
	if (t < M.big) return (
		<AbsoluteFill style={{ background: BEIGE }}>
			<div style={{ position: "absolute", top: 380, left: 960 - sel * 260 - 130, display: "flex", gap: 40, transition: "none" }}>
				{STY.map((s, i) => <div key={i} style={{ width: 220, height: 260, borderRadius: 24, border: `4px solid ${i === sel ? BLUE : "transparent"}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", opacity: Math.abs(i - sel) > 2 ? 0.3 : 1 }}><Peep k={i} s={170} head /><div style={{ fontFamily: CJK, fontSize: 22, color: "#55565b", marginTop: 4 }}>{s}</div></div>)}
			</div>
		</AbsoluteFill>
	)
	const open = t > M.drop && t < M.pick + 0.3
	const k = t > M.pick ? 1 : 3
	const cur = path(t, [[M.big, 1500, 900], [M.drop - 0.2, 1080, 700], [M.drop + 0.8, 1080, 700], [M.pick - 0.1, 1100, 820], [C[4], 1300, 900]])
	return (
		<AbsoluteFill style={{ background: BEIGE }}>
			<div style={{ position: "absolute", left: 760, top: 280, transform: `scale(${lerp(t, M.big, M.big + 0.5, 0.7, 1)})` }}><Peep k={k} s={400} head /></div>
			{t < M.hello && <div style={{ position: "absolute", left: 1000, top: 660, width: 300, background: "#fff", borderRadius: 12, boxShadow: "0 0 0 1px #e3e3e6, 0 10px 30px rgba(0,0,0,.1)", fontFamily: CJK, fontSize: 20, padding: 8 }}>
				<div style={{ padding: "8px 12px", color: "#151517" }}>写法：{STY[k]} ▾</div>
				{open && STY.slice(0, 4).map((s, i) => <div key={s} style={{ padding: "8px 12px", borderRadius: 8, background: i === 1 && t > M.pick - 0.4 ? "#eef3fc" : "transparent", color: "#3a3b40" }}>{s}</div>)}
			</div>}
			{t > M.hello && <div style={{ position: "absolute", left: 420, top: 360, background: "#fff", borderRadius: 18, padding: "18px 26px", fontFamily: HEAVY, fontWeight: 700, fontSize: 34, color: "#111", boxShadow: "0 6px 20px rgba(0,0,0,.08)", transform: `scale(${pop(t, M.hello)})` }}>你好，我来写！</div>}
			{t < M.hello && <Cursor x={cur.x} y={cur.y} down={Math.abs(t - M.pick) < 0.08 || Math.abs(t - M.drop) < 0.08} />}
		</AbsoluteFill>
	)
}

// ---------- big typed line, waveform, thinking
const BIG = "帮我把周会整理成待办"
const BigType: React.FC<{ t: number }> = ({ t }) => {
	const s = typeAt(BIG, t, M.bt, 4.6).s
	const w = s.length * 230
	return <AbsoluteFill style={{ background: "#fff" }}><div style={{ position: "absolute", top: 400, left: Math.min(200, 1300 - w), whiteSpace: "nowrap", fontFamily: HEAVY, fontWeight: 500, fontSize: 230, color: "#111", lineHeight: 1 }}>{s}<Caret t={t} solid h={1} /></div></AbsoluteFill>
}
const Thinking: React.FC<{ t: number }> = ({ t }) => (
	<AbsoluteFill style={{ background: BEIGE, alignItems: "center", justifyContent: "center" }}>
		<div style={{ display: "flex", alignItems: "center", gap: 30 }}><Peep k={0} s={200} head style={{ transform: `rotate(${Math.sin(t * 5) * 4}deg)` }} />
			<div style={{ fontFamily: HEAVY, fontWeight: 700, fontSize: 64, color: "#111" }}>{t < M.think2 ? "正在听" : "润色中"}<span style={{ color: "#e8541f" }}>{".".repeat(1 + (Math.floor(t * 3) % 3))}</span></div></div>
	</AbsoluteFill>
)
const Bars: React.FC<{ t: number }> = ({ t }) => (
	<AbsoluteFill style={{ background: "#fff", alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 22 }}>
		{Array.from({ length: 40 }, (_, i) => { const v = 0.15 + 0.85 * Math.abs(Math.sin(i * 0.7 + t * 9) * Math.sin(i * 0.23 + t * 3.1)) * (0.4 + 0.6 * rand(i)); return <div key={i} style={{ width: 22, height: 700 * v, borderRadius: 11, background: "#c9c9c6" }} /> })}
	</AbsoluteFill>
)
const Notes: React.FC<{ t: number }> = ({ t }) => (
	<div style={{ position: "absolute", left: 220, top: 110, width: 1300, fontFamily: CJK }}>
		<div style={{ fontFamily: HEAVY, fontWeight: 800, fontSize: 46, color: "#111" }}>首页改版周会</div>
		<div style={{ fontSize: 17, color: T3, margin: "8px 0 26px" }}>会议记录 · 10:03 开始 · Fn + Shift 录制</div>
		{COPY.meeting.map(([w, tm, s], i) => <div key={i} style={{ marginTop: 20 }}><div style={{ fontSize: 16, color: T3 }}>{w} · {tm}</div><div style={{ fontSize: 26, color: "#25262a", marginTop: 4 }}>{s}</div></div>)}
		<div style={{ position: "absolute", right: -260, top: 560 }}><Peep k={2} s={150} head /></div>
	</div>
)

// ---------- helper cards
const NAMES = ["会议记录员", "飞书回复", "邮件起草", "文档润色", "提示词整理", "终端命令", "周报汇总", "客户回信", "待办提取", "日程确认", "产品描述", "群公告", "访谈整理", "需求文档", "复盘总结", "发布说明", "招聘描述", "翻译润色"]
const HCard: React.FC<{ k: number }> = ({ k }) => <div style={{ width: 300, height: 140, borderRadius: 16, background: "#fff", boxShadow: "0 0 0 1px #e8e8e6, 0 6px 16px rgba(0,0,0,.05)", display: "flex", alignItems: "center", gap: 16, padding: "0 22px", fontFamily: HEAVY, fontWeight: 700, fontSize: 28, color: "#111" }}><Peep k={k} s={80} head />{NAMES[k]}</div>
const Wall: React.FC<{ t: number }> = ({ t }) => {
	const keys: CamKey[] = t < C[22] ? [[C[21], 2.0, 960, 540], [M.more, 2.0, 960, 540], [C[22], 1.2, 960, 540]] : t < C[23] ? [[C[22], 1.0, 960 + 0, 540], [C[23], 1.0, 1080, 540]] : [[C[23], 0.72, 960, 540], [C[24], 0.68, 1000, 540]]
	return (
		<AbsoluteFill style={{ background: BEIGE }}>
			<Camera t={t} keys={keys}>
				{NAMES.map((_, k) => { const col = k % 6, row = Math.floor(k / 6); const x = 960 - 150 + (col - 2) * 340 + (row % 2) * 60 - 170, y = 540 - 70 + (row - 1) * 180
					const center = k === 0; const op = center ? 1 : pop(t, M.more + rand(k) * 1.2)
					return <div key={k} style={{ position: "absolute", left: center ? 810 : x, top: center ? 470 : y, opacity: op }}><HCard k={k} /></div> })}
			</Camera>
		</AbsoluteFill>
	)
}

const Logo: React.FC<{ t: number; t0: number; word?: boolean }> = ({ t, t0, word }) => (
	<AbsoluteFill style={{ background: BEIGE, alignItems: "center", justifyContent: "center" }}>
		<div style={{ display: "flex", alignItems: "center", gap: 24, transform: `scale(${lerp(t, t0, t0 + 0.4, 0.85, 1)})` }}><LogoPixels size={word ? 90 : 120} t={t} mode="in" t0={t0} />{word && <Wordmark size={70} />}</div>
	</AbsoluteFill>
)

export const Film: React.FC = () => {
	const t = useT()
	const F = (keys: CamKey[], el: React.ReactNode, panel?: React.ReactNode) => <Frame t={t} keys={keys}>{el}{panel && <div style={{ position: "absolute", left: 1160, top: 120 }}>{panel}</div>}</Frame>
	if (t < C[0]) return <Logo t={t} t0={M.logo} />
	if (t < C[1]) return <Title t={t} peeps={M.peeps} lines={[["你只管开口。", M.a1], ["剩下的，MosMos 写好。", M.a2]]} />
	if (t < C[2]) return F([[C[1], 1.5, 600, 300], [C[2], 1.4, 620, 320]], <Doc t={t} />)
	if (t < C[3]) { const c = path(t, [[C[2], 900, 700], [M.panel - 0.3, 1600, 300], [C[3], 1500, 520]]); return <>{F([[C[2], 1, 960, 540]], <Doc t={t} />, t > M.panel ? <div style={{ opacity: pop(t, M.panel), transform: `translateY(${(1 - pop(t, M.panel)) * 30}px)` }}><Panel t={t} /></div> : null)}<Cursor x={c.x} y={c.y} /></> }
	if (t < C[4]) return <Picker t={t} />
	if (t < C[5]) return F([[C[4], 1.45, 1510, 420]], <Doc t={t} />, <Panel t={t} />)
	if (t < C[6]) return <BigType t={t} />
	if (t < C[7]) return F([[C[6], 1.5, 1510, 420], [C[7], 1.6, 1480, 460]], <Doc t={t} />, <Panel t={t} text={BIG} t0={-9} />)
	if (t < C[8]) return <Thinking t={t} />
	if (t < C[9]) return F([[C[8], 1.0, 960, 540], [C[9], 1.12, 900, 520]], <Table t={t} n={(t - M.rows) / 1.1 + 1} />)
	if (t < C[10]) return F([[C[9], 1.5, 1510, 420]], <Table t={t} />, <Panel t={t} text="再加一列：截止日期" t0={M.p2} />)
	if (t < C[11]) return F([[C[10], 1.0, 960, 540]], <Table t={t} due={pop(t, M.col)} />)
	if (t < C[12]) return F([[C[11], 1.8, 1500, 520], [C[12], 1.9, 1520, 520]], <Table t={t} due={1} />)
	if (t < C[13]) return F([[C[12], 1.5, 1510, 420]], <Table t={t} due={1} />, <Panel t={t} text="把李经理的事项标成紧急" t0={M.p3} />)
	if (t < C[14]) return F([[C[13], 1.25, 1000, 460]], <Table t={t} due={1} urgent={t > M.mark ? 1 : 0} />)
	if (t < C[15]) return F([[C[14], 0.9, 960, 540], [C[15], 0.95, 960, 540]], <Table t={t} due={1} urgent={1} />, <Panel t={t} />)
	if (t < C[16]) return <Title t={t} lines={[["首页改版周会", 0], ["会议记录", 0]]} size={110} />
	if (t < C[17]) return <Bars t={t} />
	if (t < C[18]) return F([[C[17], 1.1, 900, 480], [C[18], 1.15, 900, 470]], <Notes t={t} />)
	if (t < C[19]) return F([[C[18], 1.5, 1510, 420]], <Notes t={t} />, <Panel t={t} text="根据这场会，更新待办表" t0={M.p4} />)
	if (t < C[20]) return F([[C[19], 1.1, 960, 520]], <Table t={t} due={1} urgent={1} done={(t - M.upd) / 0.4} />)
	if (t < C[21]) { const s = typeAt("都写好了！", t, M.done, 10).s, s2 = typeAt("接下来写什么？", t, M.done + 0.8, 10).s; return <AbsoluteFill style={{ background: "#fff", alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 40 }}><Peep k={1} s={260} head /><div style={{ fontFamily: HEAVY, fontWeight: 800, fontSize: 70, color: "#111", lineHeight: 1.3, width: 640 }}>{s}<br />{s2}</div></AbsoluteFill> }
	if (t < C[24]) return <Wall t={t} />
	if (t < C[25]) return <Title t={t} bg={BEIGE} peeps={C[24]} lines={[["每个场景，", C[24] + 0.3], ["都有人替你写。", C[24] + 0.7]]} />
	if (t < M.logo2) return <Title t={t} bg={BEIGE} lines={[["从这里开始", 0], [COPY.url, 0]]} size={80} />
	return <Logo t={t} t0={M.logo2} word />
}
