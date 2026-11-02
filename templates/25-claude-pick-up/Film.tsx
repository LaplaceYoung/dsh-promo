// Template 25 — structure of Anthropic "Pick up where you left off with Claude" (2025), MosMos content.
// Beige stage, one long take inside a light window: back from a break, the user asks by voice what last week's
// meetings covered; meeting-record cards float up around the window, stack, and the latest meeting's conclusion
// and open todos are shown; then a spoken reply, and the window shrinks into the logo.
import React from "react"
import { AbsoluteFill } from "remotion"
import { CJK, SANS, lerp, clamp01, inOut, typeAt, useT, Wave, LogoPixels, Wordmark } from "../_engine/src/mos"
import { Camera, CamKey, rand } from "../_engine/src/kit"
import TL from "./timeline.json"

const M = TL.marks as Record<string, number>, C = TL.cuts
const BG = "#e4dac8", WIN = "#faf8f3", INKC = "#2a2723", DIM = "#8a857c", LN = "#e8e3d8", ORG = "#d9774a"
const Q = "我休假回来了，上周首页改版的会都聊了什么？"
const Q2 = "好，先看周五那场的逐字稿。"
const MEET = ["首页改版周会 · 周五", "交互稿评审 · 周三", "品牌素材对齐 · 周一", "视觉方向讨论", "上线检查清单", "周会 · 两周前", "文案终稿确认", "Nimbus 需求沟通", "设计组例会", "李经理电话", "Figma 组件整理", "周舟 1 对 1"]
const ANS = ["上周首页改版开了 3 场会，结论是交付计划不变，按素材、交互、视觉的顺序推进。", "还没完成的待办：", "· 周三前提交交互稿（林清禾）", "· 周四启动视觉设计（小林）", "要先看哪一场的逐字稿？"]

const Input: React.FC<{ t: number; text: string; t0: number; sent: number; w: number; ph: string }> = ({ t, text, t0, sent, w, ph }) => {
	const s = t < sent ? typeAt(text, t, t0, 5.5).s : ""
	return (
		<div style={{ width: w, borderRadius: 18, background: "#fff", boxShadow: `0 0 0 1px ${LN}, 0 8px 24px rgba(80,60,20,.06)`, padding: "18px 22px" }}>
			<div style={{ fontSize: 22, color: s ? INKC : "#aaa398", minHeight: 34 }}>{s || ph}{s && <span style={{ color: "#bbb" }}>|</span>}</div>
			<div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 14 }}>
				<div style={{ fontSize: 16, color: DIM, border: `1px solid ${LN}`, borderRadius: 8, padding: "4px 10px" }}>＋</div><div style={{ fontSize: 16, color: DIM }}>会议记录</div><div style={{ flex: 1 }} />
				<Wave t={t} live={t > t0 - 0.2 && t < sent} n={6} h={20} color={INKC} />
				<div style={{ width: 36, height: 36, borderRadius: 10, background: ORG, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, transform: `scale(${t > sent - 0.1 && t < sent + 0.1 ? 0.9 : 1})` }}>↑</div>
			</div>
		</div>
	)
}
const Bub: React.FC<{ children: React.ReactNode; op?: number }> = ({ children, op = 1 }) => <div style={{ display: "inline-flex", gap: 12, alignItems: "center", background: "#efeadf", borderRadius: 14, padding: "12px 18px", fontSize: 22, opacity: op }}><div style={{ width: 30, height: 30, borderRadius: 8, background: "#6b8f71", color: "#fff", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>林</div>{children}</div>
const Spin: React.FC<{ t: number }> = ({ t }) => <div style={{ width: 22, height: 22, borderRadius: 11, border: "3px solid #e3d6c4", borderTopColor: ORG, transform: `rotate(${t * 360}deg)` }} />

const Window: React.FC<{ t: number }> = ({ t }) => {
	const g = clamp01((t - C[0]) / 0.6), sh = clamp01((t - M.shrink) / (C[1] - M.shrink))
	const s = (0.65 + 0.35 * inOut(g)) * (1 - 0.9 * inOut(sh))
	const home = t < M.send
	const ansLen = Math.floor(clamp01((t - M.ans) / 2.2) * ANS.join("").length)
	let used = 0
	return (
		<div style={{ position: "absolute", left: 160, top: 90, width: 1600, height: 900, transform: `scale(${s})`, transformOrigin: "50% 50%", borderRadius: 26 + sh * 400, background: WIN, boxShadow: "0 20px 60px rgba(80,60,20,.12)", overflow: "hidden", fontFamily: CJK, color: INKC }}>
			<div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 64, borderRight: `1px solid ${LN}`, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 24, gap: 18 }}>{[0, 1, 2].map((i) => <div key={i} style={{ width: 22, height: 22, borderRadius: 6, background: i ? "#e9e3d7" : ORG }} />)}</div>
			{home ? (
				<div style={{ position: "absolute", left: 0, right: 0, top: 290, display: "flex", flexDirection: "column", alignItems: "center", opacity: clamp01((t - M.home) / 0.4) }}>
					<div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 52, fontFamily: "'Noto Serif CJK SC', serif" }}><LogoPixels size={34} t={t} mode="static" />欢迎回来，小林</div>
					<div style={{ marginTop: 36 }}><Input t={t} text={Q} t0={M.say} sent={M.send} w={880} ph="搜索会议记录，或者直接说…" /></div>
					<div style={{ display: "flex", gap: 12, marginTop: 20 }}>{["会议记录", "待办", "热词", "润色"].map((x) => <div key={x} style={{ fontSize: 17, color: DIM, border: `1px solid ${LN}`, borderRadius: 10, padding: "6px 14px", background: "#fff" }}>{x}</div>)}</div>
				</div>
			) : (
				<div style={{ position: "absolute", left: 360, top: 70, width: 920, fontSize: 24, lineHeight: 1.7 }}>
					<Bub>{Q}</Bub>
					<div style={{ marginTop: 26, opacity: clamp01((t - M.look) / 0.4) }}>欢迎回来。我在你的会议记录里找一下上周的内容。</div>
					{t < M.card ? (
						<div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 18, color: DIM, fontSize: 20, opacity: clamp01((t - M.look - 0.6) / 0.4) }}><Spin t={t} />正在查找相关的会议记录…</div>
					) : (
						<div style={{ marginTop: 18, borderRadius: 14, border: `1px solid ${LN}`, background: "#fff", padding: "12px 18px", fontSize: 20 }}>
							<div style={{ display: "flex", justifyContent: "space-between", color: DIM }}><span>▦ 相关会议记录</span><span>3 场</span></div>
							<div style={{ height: t < M.fold ? 3 * 44 : lerp(t, M.fold, M.fold + 0.4, 132, 0), overflow: "hidden" }}>{MEET.slice(0, 3).map((m, i) => <div key={m} style={{ height: 44, display: "flex", alignItems: "center", opacity: clamp01((t - M.card - i * 0.2) / 0.25) }}>{m}</div>)}</div>
						</div>
					)}
					{t > M.ans && <div style={{ marginTop: 20 }}>{ANS.map((l, i) => { const a = used; used += l.length; const s = l.slice(0, Math.max(0, ansLen - a)); return <div key={i} style={{ fontWeight: i === 0 ? 500 : 400, marginTop: i === 4 ? 14 : 0 }}>{s || "\u00a0"}</div> })}</div>}
					{t > M.send2 && <div style={{ marginTop: 24 }}><Bub op={clamp01((t - M.send2) / 0.25)}>{Q2}</Bub></div>}
				</div>
			)}
			{!home && t > M.say2 - 0.8 && t < M.send2 + 0.2 && <div style={{ position: "absolute", left: 360, bottom: 40, opacity: clamp01((t - M.say2 + 0.8) / 0.4) }}><Input t={t} text={Q2} t0={M.say2} sent={M.send2} w={920} ph="回复…" /></div>}
		</div>
	)
}
const Chips: React.FC<{ t: number }> = ({ t }) => {
	if (t < M.float || t > M.card + 0.3) return null
	return <>{MEET.map((m, i) => {
		const a = (i / MEET.length) * Math.PI * 2 + 0.4, r = 1050 + rand(i) * 220
		const x0 = 960 + Math.cos(a) * r - 140, y0 = 540 + Math.sin(a) * r * 0.62 - 25
		const drift = (t - M.float) * 14
		const p = inOut(clamp01((t - M.stack - i * 0.06) / 1.4)), sx = 420 + i * 2, sy = 215 + i * 6
		const op = clamp01((t - M.float - i * 0.25) / 0.4) * (1 - clamp01((t - M.card) / 0.3))
		return <div key={m} style={{ position: "absolute", left: lerp(p, 0, 1, x0 + Math.cos(a + 1.6) * drift, sx, (x) => x), top: lerp(p, 0, 1, y0 + Math.sin(a + 1.6) * drift, sy, (x) => x), opacity: op, transform: `rotate(${(1 - p) * (rand(i + 3) - 0.5) * 8}deg)`, background: "#fff", borderRadius: 12, padding: "12px 18px", fontFamily: CJK, fontSize: 22, color: INKC, boxShadow: "0 6px 18px rgba(80,60,20,.1)", whiteSpace: "nowrap", display: "flex", gap: 10, alignItems: "center" }}><span style={{ color: DIM }}>▦</span>{m}</div>
	})}</>
}

export const Film: React.FC = () => {
	const t = useT()
	if (t >= C[2]) return <AbsoluteFill style={{ background: "#000" }} />
	if (t < C[0]) {
		const b = clamp01((t - M.blob) / (C[0] - M.blob))
		return <AbsoluteFill style={{ background: BG, alignItems: "center", justifyContent: "center" }}>
			<div style={{ opacity: clamp01((t - M.spark) / 0.2) * (1 - b) }}><LogoPixels size={180} t={t} mode="spin" invert /></div>
			<div style={{ position: "absolute", left: 960 - 80, top: 540 - 60, width: 160, height: 120, borderRadius: "46% 54% 50% 50%", background: WIN, transform: `scale(${b * 8})`, opacity: b }} />
		</AbsoluteFill>
	}
	if (t < C[1]) {
		const k: CamKey[] = [[C[0], 1, 960, 540], [M.home, 1.05, 960, 540], [M.say - 0.2, 1.45, 960, 560], [M.say + 0.6, 1.7, 960, 560], [M.send, 1.7, 960, 560], [M.send + 0.6, 1.75, 980, 400], [M.back, 1.75, 980, 430],
			[M.back + 1.2, 0.9, 960, 540], [M.stack + 1.5, 0.9, 960, 540], [M.card + 0.6, 1.7, 980, 420], [M.fold, 1.7, 980, 440], [M.ans + 2.2, 1.7, 980, 560], [M.say2, 1.7, 980, 700], [M.send2 + 0.3, 1.7, 980, 700], [M.shrink + 0.2, 1, 960, 540]]
		return <AbsoluteFill style={{ background: BG }}><Camera t={t} keys={k}><Window t={t} /><Chips t={t} /></Camera></AbsoluteFill>
	}
	const l = clamp01((t - M.logo) / 0.4)
	return <AbsoluteFill style={{ background: BG, alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 30 }}>
		{t < M.logo && <div style={{ width: 60, height: 60, borderRadius: 30, background: WIN, transform: `scale(${lerp(t, C[1], M.logo, 3.2, 1.2)})` }} />}
		{t >= M.logo && <><LogoPixels size={88} t={t} mode="in" t0={M.logo} /><div style={{ opacity: clamp01((t - M.logo - 0.3) / 0.4) * l }}><Wordmark size={100} color={INKC} /></div></>}
	</AbsoluteFill>
}
