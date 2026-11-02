// Template 24 — structure of Anthropic "Claude Code in Slack" (2025), MosMos content.
// Beige stage. Hand-drawn braces around a speech bubble open the film; then a generic team-chat window where a
// thread reply is spoken with MosMos, a status card while the meeting recording is turned into notes, the MosMos
// meeting window with its steps, quick cuts of the transcript, the finished notes posted back, a green pill.
import React from "react"
import { AbsoluteFill } from "remotion"
import { CJK, HEAVY, SANS, MONO, lerp, clamp01, inOut, typeAt, useT, Wave, LogoPixels, Wordmark, Pill, Cursor, path, COPY } from "../_engine/src/mos"
import { Camera, CamKey } from "../_engine/src/kit"
import TL from "./timeline.json"

const M = TL.marks as Record<string, number>, C = TL.cuts
const BG = "#e4dac8", INKC = "#1d1c1a", DIM = "#7b7f86", LN = "#e7e7ea", RAIL = "#2b2f3a", GREEN = "#1f7a3e", ORG = "#d9774a"

// ---------- opening: hand-drawn braces and a bubble
const Opening: React.FC<{ t: number }> = ({ t }) => {
	const d = clamp01((t - M.draw) / 1.1), b = clamp01((t - M.bub) / 0.35), g = clamp01((t - M.grow) / (C[0] - M.grow))
	const L = "M880,330 C840,330 840,360 840,420 C840,480 840,520 800,540 C840,560 840,600 840,660 C840,720 840,750 880,750"
	const R = "M1040,330 C1080,330 1080,360 1080,420 C1080,480 1080,520 1120,540 C1080,560 1080,600 1080,660 C1080,720 1080,750 1040,750"
	const gs = 1 + Math.pow(g, 4) * 14
	return (
		<AbsoluteFill style={{ background: BG }}><AbsoluteFill style={{ transform: `scale(${1.3 + 0.12 * Math.sin(clamp01((t - 1.3) / 1.6) * Math.PI)})` }}>
			<svg width={1920} height={1080} style={{ position: "absolute", inset: 0, opacity: 1 - Math.pow(g, 3) }}>{[L, R].map((p, i) => <path key={i} d={p} stroke={INKC} strokeWidth={9} fill="none" strokeLinecap="round" strokeDasharray={700} strokeDashoffset={700 * (1 - d)} />)}</svg>
			<div style={{ position: "absolute", left: 960 - 105, top: 540 - 88, width: 210, height: 176, borderRadius: "48% 52% 46% 54%", background: "#fff", transform: `scale(${b * (1 + 0.15 * Math.sin(Math.min(1, (t - M.bub) / 0.35) * Math.PI)) * gs})`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 0 rgba(0,0,0,.04)" }}>
				<div style={{ opacity: 1 - g * 3 }}><Wave t={t} live n={5} h={60} color={INKC} /></div>
			</div>
		</AbsoluteFill></AbsoluteFill>
	)
}

// ---------- chat app
type Msg = { who: string; c: string; time: string; body: React.ReactNode; op?: number }
const Avatar: React.FC<{ c: string; ch: string; s?: number }> = ({ c, ch, s = 44 }) => <div style={{ width: s, height: s, borderRadius: 10, background: c, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: s * 0.45, fontWeight: 600, flexShrink: 0 }}>{ch}</div>
const MsgRow: React.FC<Msg> = ({ who, c, time, body, op = 1 }) => (
	<div style={{ display: "flex", gap: 14, padding: "12px 0", opacity: op }}>
		<Avatar c={c} ch={who[0]} />
		<div style={{ flex: 1 }}><div style={{ fontSize: 19 }}><b>{who}</b> <span style={{ color: DIM, fontSize: 15, marginLeft: 6 }}>{time}</span></div><div style={{ fontSize: 19, lineHeight: 1.6, marginTop: 4 }}>{body}</div></div>
	</div>
)
const ASK = "李经理在问今天周会的纪要，下午能发出来吗？录音在群文件里。"
const RAW = "嗯可以，那个，我现在就整理，整理完了发群里"
const OUT = "可以，我现在整理，好了发到群里。"
const NOTES = ["结论：首页交付计划不变，按素材、交互、视觉的顺序推进。", "· 今天下午同步品牌素材（周舟）", "· 周三前提交交互稿（林清禾）", "· 周四启动视觉设计（小林）"]
const Input: React.FC<{ t: number; w: number }> = ({ t, w }) => {
	const raw = typeAt(RAW, t, M.fn + 0.3, 9).s
	const text = t < M.done ? raw : t < M.send ? OUT : ""
	return (
		<div style={{ width: w, borderRadius: 12, boxShadow: `0 0 0 1px #d6d7db`, padding: "14px 16px", background: "#fff" }}>
			<div style={{ display: "flex", gap: 14, color: "#9a9ca1", fontSize: 16, marginBottom: 10 }}><b>B</b><i>I</i><s>S</s><span>🔗</span><span>≡</span></div>
			<div style={{ fontSize: 19, minHeight: 30, color: text ? (t < M.polish ? "#8a8c90" : INKC) : "#a6a8ad" }}>{text || "回复…"}</div>
			<div style={{ display: "flex", justifyContent: "flex-end" }}><div style={{ width: 38, height: 30, borderRadius: 6, background: text && t > M.done ? GREEN : "#e4e4e7", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, transform: `scale(${t > M.send - 0.1 && t < M.send + 0.1 ? 0.9 : 1})` }}>➤</div></div>
		</div>
	)
}
const Chat: React.FC<{ t: number; mode: "first" | "after" }> = ({ t, mode }) => {
	const th = mode === "after" ? 1 : clamp01((t - M.thread) / 0.35)
	return (
		<div style={{ position: "absolute", left: 180, top: 100, width: 1560, height: 880, borderRadius: 18, overflow: "hidden", background: "#fff", boxShadow: "0 30px 80px rgba(60,40,10,.18)", fontFamily: CJK, color: INKC, display: "flex" }}>
			<div style={{ width: 76, background: RAIL, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 22, gap: 18 }}>{[0, 1, 2, 3].map((i) => <div key={i} style={{ width: 40, height: 40, borderRadius: 10, background: i ? "rgba(255,255,255,.12)" : "#fff" }} />)}</div>
			<div style={{ width: 270, background: "#f6f6f7", borderRight: `1px solid ${LN}`, padding: "22px 18px", fontSize: 18 }}>
				<div style={{ fontWeight: 700, fontSize: 21, marginBottom: 20 }}>设计组 ▾</div>
				{["# 全员", "# 首页改版", "# 品牌素材", "# 周会"].map((x, i) => <div key={x} style={{ padding: "8px 12px", borderRadius: 8, background: i === 1 ? "#dde3ee" : undefined, color: i === 1 ? INKC : "#5c5f66", fontWeight: i === 1 ? 600 : 400 }}>{x}</div>)}
				<div style={{ color: DIM, fontSize: 15, margin: "22px 0 8px" }}>私信</div>
				{["周舟", "林清禾", "李经理"].map((x) => <div key={x} style={{ padding: "7px 12px", color: "#5c5f66" }}>{x}</div>)}
			</div>
			<div style={{ flex: 1, position: "relative", borderRight: `1px solid ${LN}` }}>
				<div style={{ height: 64, borderBottom: `1px solid ${LN}`, display: "flex", alignItems: "center", padding: "0 24px", fontWeight: 700, fontSize: 21 }}># 首页改版</div>
				<div style={{ padding: "10px 24px" }}>
					<MsgRow who="林清禾" c="#7c6fd6" time="上午 10:40" body="交互稿初版放在群文件了，大家有空看一下。" />
					<MsgRow who="周舟" c="#d9774a" time="下午 2:05" op={mode === "after" ? 1 : clamp01((t - M.msg) / 0.3)} body={<>{ASK}<div style={{ marginTop: 8, fontSize: 15, color: "#2f5fa8" }}>{mode === "after" || t > M.send + 0.3 ? "2 条回复" : t > M.thread ? "" : ""}</div></>} />
				</div>
				<div style={{ position: "absolute", left: 24, right: 24, bottom: 20 }}><div style={{ borderRadius: 12, boxShadow: "0 0 0 1px #d6d7db", padding: "18px 16px", color: "#a6a8ad", fontSize: 18 }}>发消息到 # 首页改版</div></div>
			</div>
			<div style={{ width: 520 * th, overflow: "hidden", position: "relative", flexShrink: 0 }}>
				<div style={{ width: 520, position: "absolute", inset: 0 }}>
					<div style={{ height: 64, borderBottom: `1px solid ${LN}`, display: "flex", alignItems: "center", padding: "0 22px", fontWeight: 700, fontSize: 20 }}>话题 <span style={{ color: DIM, fontWeight: 400, fontSize: 16, marginLeft: 10 }}># 首页改版</span></div>
					<div style={{ padding: "8px 22px" }}>
						<MsgRow who="周舟" c="#d9774a" time="下午 2:05" body={ASK} />
						{(mode === "after" || t > M.send) && <MsgRow who="小林" c="#2f5fa8" time="下午 2:06" body={OUT} op={mode === "after" ? 1 : clamp01((t - M.send) / 0.25)} />}
						{mode === "after" && <MsgRow who="小林" c="#2f5fa8" time="下午 2:31" op={clamp01((t - M.post) / 0.3)} body={<div><b>首页改版周会纪要</b>{NOTES.map((n, i) => <div key={i} style={{ fontSize: 17, opacity: clamp01((t - M.post - 0.3 - i * 0.25) / 0.3) }}>{n}</div>)}<div style={{ fontSize: 14, color: DIM, marginTop: 6 }}>MosMos · 会议记录 · 标准润色</div></div>} />}
					</div>
					<div style={{ position: "absolute", left: 22, bottom: 20 }}><Input t={mode === "after" ? 0 : t} w={476} /></div>
				</div>
			</div>
		</div>
	)
}
// ---------- status card
const Status: React.FC<{ t: number; label: string; s?: number }> = ({ t, label, s = 1 }) => (
	<div style={{ transform: `scale(${s})`, width: 640, borderRadius: 18, background: "#fff", boxShadow: "0 20px 60px rgba(60,40,10,.15), 0 0 0 1px #eee", padding: "28px 32px", display: "flex", gap: 22, alignItems: "center", fontFamily: CJK }}>
		<div style={{ width: 70, height: 70, borderRadius: 16, background: INKC, display: "flex", alignItems: "center", justifyContent: "center" }}><LogoPixels size={40} t={t} mode="spin" invert /></div>
		<div><div style={{ fontSize: 22 }}><b>MosMos</b> <span style={{ fontSize: 14, color: DIM, border: "1px solid #ddd", borderRadius: 5, padding: "1px 6px", marginLeft: 6 }}>会议记录</span></div><div style={{ fontSize: 26, marginTop: 6, color: "#3a3b40" }}>{label}</div></div>
	</div>
)
// ---------- MosMos meeting window
const STEPS = ["转写录音（3 位说话人）", "去掉口头禅和重复", "按热词校对：林清禾、Nimbus、Figma", "整理会议总结", "提取待办，写明负责人和时间"]
const Session: React.FC<{ t: number }> = ({ t }) => (
	<div style={{ position: "absolute", left: 120, top: 80, width: 1680, height: 920, borderRadius: 18, overflow: "hidden", background: "#fff", boxShadow: "0 30px 80px rgba(60,40,10,.18)", fontFamily: CJK, color: INKC, display: "flex" }}>
		<div style={{ width: 640, background: "#fafafa", borderRight: `1px solid ${LN}`, padding: 36 }}>
			<div style={{ display: "flex", gap: 14, alignItems: "center" }}><LogoPixels size={30} t={t} mode="static" /><b style={{ fontSize: 24 }}>MosMos · 会议记录</b></div>
			<div style={{ marginTop: 34, fontSize: 18, color: DIM }}>今天</div>
			{["首页改版周会 · 32 分钟", "品牌素材对齐 · 18 分钟"].map((x, i) => <div key={x} style={{ padding: "16px 18px", borderRadius: 12, marginTop: 10, fontSize: 22, background: i ? undefined : "#eef0f4" }}>{x}</div>)}
		</div>
		<div style={{ flex: 1, padding: "40px 50px" }}>
			<div style={{ fontSize: 30, fontWeight: 700 }}>首页改版周会</div>
			<div style={{ fontSize: 18, color: DIM, marginTop: 8 }}>3 位说话人 · 标准润色</div>
			<div style={{ marginTop: 30 }}>{STEPS.map((s, i) => { const on = t > M.steps + i * 0.45; return <div key={s} style={{ display: "flex", alignItems: "center", gap: 18, height: 64, fontSize: 24, color: on ? INKC : "#a6a8ad" }}><div style={{ width: 28, height: 28, borderRadius: 14, border: `2px solid ${on ? GREEN : "#ccc"}`, background: on ? GREEN : "transparent", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>{on ? "✓" : ""}</div>{s}</div> })}</div>
			<div style={{ marginTop: 20, fontSize: 20, color: ORG, opacity: t > M.steps + 2.4 ? 1 : 0 }}>✳ 正在写成纪要…</div>
		</div>
	</div>
)
const SPK: [string, string, string][] = [["说话人 1 · 林清禾", "10:03", "嗯，交互稿的话，我周三之前，周三之前给出来。"], ["说话人 2 · 周舟", "10:05", "那个，品牌素材今天下午，对，下午同步到群里。"], ["说话人 3 · 小林", "10:07", "素材到了以后，我们周四就开始做视觉吧。"]]
const Block: React.FC<{ k: number; t: number }> = ({ k, t }) => (
	<AbsoluteFill style={{ background: "#fff", fontFamily: CJK, color: INKC, padding: "120px 260px" }}>
		<div style={{ fontSize: 26, marginBottom: 18 }}>● 逐字稿 <span style={{ color: DIM, fontFamily: MONO, fontSize: 22 }}>首页改版周会 / {SPK[k][1]}</span></div>
		<div style={{ borderRadius: 14, boxShadow: `0 0 0 1px ${LN}`, overflow: "hidden" }}>
			<div style={{ padding: "12px 22px", background: "#f6f6f7", fontSize: 20, color: DIM }}>{SPK[k][0]}</div>
			{[0, 1, 2].map((j) => <div key={j} style={{ display: "flex", gap: 30, padding: "14px 22px", background: "#e9f5ea", fontSize: 30, borderTop: "1px solid #dcebdc" }}><span style={{ fontFamily: MONO, color: "#7a9a7f", width: 40 }}>{j + 1}</span>{j === 0 ? SPK[k][2] : SPK[(k + j) % 3][2]}</div>)}
			<div style={{ padding: "14px", textAlign: "center", color: DIM, fontSize: 20, borderTop: `1px solid ${LN}` }}>还有 {[12, 9, 15][k]} 行</div>
		</div>
	</AbsoluteFill>
)
const Doc: React.FC<{ t: number }> = ({ t }) => (
	<AbsoluteFill style={{ background: "#fff", fontFamily: CJK, color: INKC }}>
		<div style={{ position: "absolute", left: 240, top: lerp(t, C[7], C[8], 120, -260, inOut), width: 1300, fontSize: 32, lineHeight: 1.7 }}>
			<div style={{ fontSize: 46, fontWeight: 700 }}>首页改版周会纪要</div>
			<div style={{ fontSize: 22, color: DIM, marginBottom: 20 }}>3 位说话人 · 32 分钟 · 标准润色</div>
			<div style={{ fontWeight: 700, marginTop: 10 }}>会议结论</div>
			<div>首页交付计划保持不变，按素材、交互、视觉的顺序推进。</div>
			<div style={{ fontWeight: 700, marginTop: 24 }}>待办</div>
			{NOTES.slice(1).map((n) => <div key={n}>{n}</div>)}
			<div style={{ fontWeight: 700, marginTop: 24 }}>整理时处理了</div>
			{["· 去掉口头禅和重复的话", "· 人名按热词写法：林清禾", "· 每条待办写明负责人和时间"].map((n) => <div key={n}>{n}</div>)}
		</div>
		<div style={{ position: "absolute", left: 240, right: 380, bottom: 60, borderRadius: 14, boxShadow: `0 0 0 1px ${LN}, 0 10px 30px rgba(0,0,0,.06)`, background: "#fff", padding: "18px 24px", display: "flex", alignItems: "center", gap: 18, fontSize: 22 }}>
			<span style={{ fontFamily: MONO, color: DIM, flex: 1 }}>首页改版周会纪要 · 4 条</span>
			<div style={{ padding: "10px 20px", borderRadius: 10, boxShadow: `0 0 0 1px ${LN}` }}>复制</div>
			<div style={{ padding: "10px 20px", borderRadius: 10, background: GREEN, color: "#fff" }}>发到 # 首页改版</div>
		</div>
	</AbsoluteFill>
)

export const Film: React.FC = () => {
	const t = useT()
	if (t < C[0]) return <Opening t={t} />
	if (t < C[1]) {
		const k: CamKey[] = [[C[0], 1.0, 960, 540], [M.thread, 1.0, 960, 540], [M.zoom, 1.0, 1150, 560], [M.zoom + 1.0, 1.75, 1470, 790], [M.send + 0.4, 1.75, 1470, 760], [C[1], 1.3, 1350, 600]]
		const pc = clamp01((t - M.fn) / 0.3) * clamp01((M.send + 0.3 - t) / 0.3)
		return <AbsoluteFill style={{ background: BG }}><Camera t={t} keys={k}><Chat t={t} mode="first" /><div style={{ position: "absolute", left: 1270, top: 700, opacity: pc, transform: `translateY(${(1 - pc) * 14}px)` }}><Pill t={t} state={t < M.polish ? "语音输入" : t < M.done ? "润色中" : "已写好"} sub="场景：飞书 / 微信 · 标准润色" live={t < M.polish} scale={0.9} /></div></Camera></AbsoluteFill>
	}
	if (t < C[2]) { const l = t < M.s1 ? "正在转写录音…" : t < M.s2 ? "正在区分说话人…" : t < M.s3 ? "正在整理待办…" : "正在润色成纪要…"; return <AbsoluteFill style={{ background: BG, alignItems: "center", justifyContent: "center" }}><Status t={t} label={l} s={lerp(t, C[1], C[2], 1.6, 1.7)} /></AbsoluteFill> }
	if (t < C[3]) {
		const p = path(t, [[C[2], 1100, 900], [M.click - 0.1, 905, 735], [C[3], 905, 735]])
		return (
			<AbsoluteFill style={{ background: BG }}>
				<div style={{ position: "absolute", left: 420, top: 150, width: 1080, transform: `scale(${lerp(t, C[2], C[3], 1.0, 1.06)})`, borderRadius: 20, background: "#fff", padding: "34px 40px", fontFamily: CJK, color: INKC, boxShadow: "0 20px 60px rgba(60,40,10,.12)" }}>
					<div style={{ fontSize: 30, lineHeight: 1.6, color: "#3a3b40" }}>{ASK}</div>
					<div style={{ display: "flex", gap: 12, marginTop: 16 }}>{["👍 2", "👀 1"].map((x) => <div key={x} style={{ fontSize: 20, borderRadius: 14, background: "#eef0f4", padding: "4px 12px" }}>{x}</div>)}</div>
					<div style={{ display: "flex", gap: 20, marginTop: 30 }}><div style={{ width: 70, height: 70, borderRadius: 16, background: INKC, display: "flex", alignItems: "center", justifyContent: "center" }}><LogoPixels size={40} t={t} mode="static" invert /></div>
						<div><div style={{ fontSize: 28 }}><b>MosMos</b> <span style={{ fontSize: 18, color: DIM }}>会议记录</span></div><div style={{ fontSize: 20, color: DIM }}>首页改版周会 · 已写好</div><div style={{ fontSize: 30, marginTop: 8 }}>纪要写好了，结论和 3 条待办都在里面。</div>
							<div style={{ marginTop: 22, display: "inline-block", padding: "12px 24px", borderRadius: 10, boxShadow: "0 0 0 1px #ccc", fontSize: 24, background: t > M.click ? "#eef0f4" : "#fff" }}>查看纪要</div></div></div>
				</div>
				<Cursor x={p.x} y={p.y} down={t > M.click - 0.05 && t < M.click + 0.15} s={1.3} />
			</AbsoluteFill>
		)
	}
	if (t < C[4]) return <AbsoluteFill style={{ background: BG }}><Camera t={t} keys={[[C[3], 1.0, 960, 540], [C[4], 1.12, 1180, 520]]}><Session t={t} /></Camera></AbsoluteFill>
	if (t < C[5]) return <Block k={0} t={t} />
	if (t < C[6]) return <Block k={1} t={t} />
	if (t < C[7]) return <Block k={2} t={t} />
	if (t < C[8]) return <Doc t={t} />
	if (t < C[9]) return <AbsoluteFill style={{ background: BG }}><Camera t={t} keys={[[C[8], 0.9, 960, 540], [C[9], 0.96, 1060, 560]]}><Chat t={t} mode="after" /></Camera></AbsoluteFill>
	if (t < M.logo) {
		const a = t - M.pill, s = a < 0.25 ? lerp(a, 0, 0.25, 0.6, 1.25) : a < 0.6 ? lerp(a, 0.25, 0.6, 1.25, 0.8) : lerp(a, 0.6, 2.2, 0.8, 0.75)
		const drop = clamp01((t - (M.logo - 0.35)) / 0.35)
		return <AbsoluteFill style={{ background: BG, alignItems: "center", justifyContent: "center" }}><div style={{ transform: `translateY(${drop * 500}px) scale(${s})`, padding: "56px 120px", borderRadius: 140, background: GREEN, color: "#fff", fontFamily: CJK, fontSize: 150, fontWeight: 600, display: "flex", gap: 20, alignItems: "center" }}>✓ 已发送</div></AbsoluteFill>
	}
	return <AbsoluteFill style={{ background: BG, alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 40 }}>
		<div style={{ opacity: clamp01((t - M.logo) / 0.3) }}><LogoPixels size={170} t={t} mode="in" t0={M.logo} /></div>
		<div style={{ opacity: clamp01((t - M.logo - 0.3) / 0.4) * clamp01((TL.dur - t) / 0.6) }}><Wordmark size={170} color={INKC} /></div>
	</AbsoluteFill>
}
