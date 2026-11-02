// Template 21 — structure of Kimi "Meet Kimi K2.6 Agent Swarm" (2026), MosMos content.
// A planet horizon (licensed stock photo, ASSETS.md) under a two-line title, a capsule title that grows word by
// word, then fast cuts through one request fanning out into many outputs: checklists, tables, documents, a wall
// of flipping tiles, and a white input where the last line is typed.
import React from "react"
import { AbsoluteFill, Img, staticFile } from "remotion"
import { CJK, HEAVY, SANS, COPY, lerp, clamp01, inOut, typeAt, useT, Wave, LogoPixels, Caret, T3, LINE, SCENES } from "../_engine/src/mos"
import { rand } from "../_engine/src/kit"
import TL from "./timeline.json"

const M = TL.marks as Record<string, number>, C = TL.cuts
const NAVY = "#0a0f1e", BLUE = "#3b6cf6"
const Earth: React.FC<{ t: number; s?: number; y?: number; dim?: number; hue?: number }> = ({ t, s = 1.15, y = 0, dim = 1, hue = 175 }) => (
	<AbsoluteFill style={{ background: "#03050b", overflow: "hidden" }}>
		<Img src={staticFile("t21-earth.webp")} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transform: `scale(${s + t * 0.004}) translateY(${y}px)`, filter: `hue-rotate(${hue}deg) saturate(1.3) brightness(${dim})` }} />
	</AbsoluteFill>
)
const Card: React.FC<{ w: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ w, children, style }) => <div style={{ width: w, borderRadius: 18, background: "#fff", boxShadow: "0 20px 60px rgba(0,0,0,.35)", padding: 26, fontFamily: CJK, ...style }}>{children}</div>
const Cap: React.FC<{ text: string; s?: number; dark?: boolean; arrow?: boolean }> = ({ text, s = 1, dark, arrow }) => (
	<div style={{ display: "inline-flex", alignItems: "center", gap: 18, padding: `${22 * s}px ${44 * s}px`, borderRadius: 999, background: dark ? "#111" : "#fff", boxShadow: "0 10px 40px rgba(0,0,0,.15)", fontFamily: SANS, fontWeight: 600, fontSize: 70 * s, color: dark ? "#fff" : BLUE, whiteSpace: "nowrap" }}>
		{text}{arrow && <span style={{ fontSize: 40 * s, color: "#999" }}>▾</span>}
	</div>
)
const ASK = "把这场周会的录音，写成纪要、待办、给李经理的邮件和群公告"
const Ask: React.FC<{ t: number; t0: number; s?: number }> = ({ t, t0, s = 1 }) => (
	<Card w={980} style={{ transform: `scale(${s})` }}>
		<div style={{ fontSize: 30, lineHeight: 1.6, color: "#151517", minHeight: 150 }}>{typeAt(ASK, t, t0, 22).s}</div>
		<div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 14 }}>
			<div style={{ width: 46, height: 46, borderRadius: 99, background: "#eef2ff", display: "flex", alignItems: "center", justifyContent: "center" }}><Wave t={t} live n={5} h={18} color={BLUE} /></div>
			<div style={{ flex: 1 }} /><div style={{ fontSize: 20, color: "#55565b", fontFamily: SANS }}>MosMos · 会议记录 ▾</div>
			<div style={{ width: 46, height: 46, borderRadius: 99, background: "#111", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>↑</div>
		</div>
	</Card>
)
const STEPS = ["识别 3 位发言人", "去掉口头语和重复", "匹配热词：Figma、Nimbus、林清禾", "整理会议总结", "提取 3 条待办", "写给李经理的邮件", "写群公告", "按场景润色并粘贴"]
const Steps: React.FC<{ t: number; t0: number; big?: boolean }> = ({ t, t0, big }) => (
	<div style={{ fontFamily: CJK, fontSize: big ? 58 : 24, color: "#151517" }}>
		{STEPS.map((s, i) => { const on = t > t0 + i * 0.2; return <div key={i} style={{ display: "flex", alignItems: "center", gap: big ? 26 : 12, height: big ? 96 : 42 }}><div style={{ width: big ? 44 : 20, height: big ? 44 : 20, borderRadius: 99, background: on ? "#22a06b" : "#e3e3e6", color: "#fff", fontSize: big ? 26 : 12, display: "flex", alignItems: "center", justifyContent: "center" }}>{on ? "✓" : ""}</div><span style={{ color: on ? "#151517" : "#9a9ca1" }}>{s}</span></div> })}
	</div>
)
const Stat: React.FC<{ t: number; t0: number }> = ({ t, t0 }) => (
	<div style={{ fontFamily: HEAVY, fontWeight: 700, fontSize: 62, color: "#fff", lineHeight: 1.3, opacity: clamp01((t - t0) / 0.2) }}>一次开口<br /><span style={{ fontWeight: 400, fontSize: 40, color: "#b8c3e6" }}>5 个场景 · 3 档润色 · 同时写好</span></div>
)
const ROWS: [string, string, string, string][] = [["交互稿", "林清禾", "周三", "进行中"], ["品牌素材", "周舟", "今天", "待开始"], ["视觉设计", "李经理", "周四", "待开始"], ["首页文案", "小林", "周五", "进行中"], ["上线清单", "林清禾", "周五", "待开始"], ["样品确认", "小林", "周二", "已完成"]]
const CHIP: Record<string, string> = { 进行中: "#fde68a", 待开始: "#e5e7eb", 已完成: "#bbf7d0" }
const Sheet: React.FC = () => (
	<Card w={1200}><div style={{ fontSize: 20, color: T3, marginBottom: 12 }}>待办表 · 由会议录音生成</div>
		{[["事项", "负责人", "截止", "状态"], ...ROWS].map((r, i) => <div key={i} style={{ display: "flex", borderTop: `1px solid ${LINE}`, height: 58, alignItems: "center", fontSize: i ? 24 : 18, color: i ? "#222" : T3 }}>{r.map((c, j) => <div key={j} style={{ width: [420, 260, 200, 240][j] }}>{j === 3 && i ? <span style={{ background: CHIP[c], padding: "6px 14px", borderRadius: 6 }}>{c}</span> : c}</div>)}</div>)}
	</Card>
)
const Page: React.FC<{ k: number; w?: number }> = ({ k, w = 640 }) => {
	const P = [["会议纪要", "首页改版周会", COPY.meetingDesc], ["邮件", "第一版方案周三前发您", COPY.mail[1]], ["群公告", "素材今天下午同步", "各位，品牌素材今天下午同步到群里，周四开始做视觉方案。"], ["文档", "项目复盘", COPY.doc.map((d) => d.join("")).join(" ")]][k % 4]
	return <Card w={w} style={{ height: w * 1.25 }}><div style={{ fontSize: 16, color: T3 }}>{P[0]}</div><div style={{ fontFamily: HEAVY, fontWeight: 800, fontSize: 36, marginTop: 10 }}>{P[1]}</div><div style={{ fontSize: 20, lineHeight: 1.8, color: "#333", marginTop: 16 }}>{P[2]}</div>{[0, 1, 2, 3, 4].map((i) => <div key={i} style={{ height: 12, borderRadius: 6, background: "#eef0f3", marginTop: 18, width: `${90 - (i * 13) % 40}%` }} />)}</Card>
}
const Tiles: React.FC<{ t: number }> = ({ t }) => (
	<AbsoluteFill style={{ background: NAVY }}>
		{Array.from({ length: 8 * 5 }, (_, i) => {
			const c = i % 8, r = Math.floor(i / 8), p = clamp01((t - M.tiles - rand(i) * 3.2) / 0.3), flip = (Math.floor((t - M.tiles) * 1.3 + rand(i + 9) * 4) % 3) === 0
			return <div key={i} style={{ position: "absolute", left: 60 + c * 228, top: 40 + r * 205, width: 210, height: 190, borderRadius: 10, background: flip && p > 0.5 ? "#1b2340" : "#fff", transform: `perspective(600px) rotateY(${(1 - p) * 90}deg)`, opacity: p, padding: 16, fontFamily: CJK, fontSize: 15, color: "#666", overflow: "hidden" }}>{!flip && SCENES[i % 5]}</div>
		})}
		<div style={{ position: "absolute", left: 460, top: 470, width: 1000, height: 120, borderRadius: 60, background: "rgba(15,20,40,.92)", display: "flex", alignItems: "center", justifyContent: "center", gap: 20, fontFamily: CJK, fontSize: 36, color: "#fff", boxShadow: "0 20px 60px rgba(0,0,0,.5)" }}><Wave t={t} live n={7} h={30} color="#fff" />说一次，每一处都写好</div>
	</AbsoluteFill>
)
const Scatter: React.FC<{ t: number; zoom?: boolean }> = ({ t, zoom }) => (
	<AbsoluteFill style={{ background: NAVY }}>
		<div style={{ position: "absolute", inset: 0, transform: `scale(${zoom ? lerp(t, C[18], C[19], 0.55, 0.4, inOut) : lerp(t, C[17], C[18], 1.15, 0.8, inOut)})`, transformOrigin: "50% 50%" }}>
			{Array.from({ length: zoom ? 24 : 9 }, (_, i) => { const c = i % (zoom ? 6 : 3), r = Math.floor(i / (zoom ? 6 : 3)); return <div key={i} style={{ position: "absolute", left: (zoom ? -400 : 120) + c * (zoom ? 470 : 600) + rand(i) * 40, top: (zoom ? -300 : 60) + r * (zoom ? 560 : 340) + rand(i + 3) * 40, transform: `scale(${zoom ? 0.65 : 0.45}) rotate(${(rand(i + 5) - 0.5) * 6}deg)`, transformOrigin: "0 0" }}>{i % 4 === 2 ? <Sheet /> : <Page k={i} />}</div> })}
		</div>
		{zoom && <div style={{ position: "absolute", left: 660, top: 40, padding: "12px 28px", borderRadius: 30, background: "rgba(15,20,40,.9)", color: "#fff", fontFamily: CJK, fontSize: 26 }}>24 份成稿 · 来自同一段录音</div>}
	</AbsoluteFill>
)

export const Film: React.FC = () => {
	const t = useT()
	const sc = (i: number) => (t - (i < 0 ? 0 : C[i])) // seconds into shot
	if (t < C[0]) return <AbsoluteFill><Earth t={t} /><AbsoluteFill style={{ alignItems: "center", justifyContent: "center", paddingBottom: 200 }}><div style={{ fontFamily: HEAVY, fontWeight: 700, fontSize: 76, color: "#fff", textAlign: "center", lineHeight: 1.25, opacity: clamp01((t - M.title) / 0.3) }}>全新的 MosMos<br />一次开口，处处写好</div></AbsoluteFill></AbsoluteFill>
	if (t < C[1]) return <AbsoluteFill style={{ background: "#eef1f8", alignItems: "center", justifyContent: "center" }}><Cap text="MosMos" s={1.3} /></AbsoluteFill>
	if (t < C[2]) return <AbsoluteFill style={{ background: "#eef1f8", alignItems: "center", justifyContent: "center" }}><Cap text="MosMos 会议" s={1.15} /></AbsoluteFill>
	if (t < C[3]) return <AbsoluteFill style={{ background: "#eef1f8", alignItems: "center", justifyContent: "center" }}><div style={{ transform: `perspective(1200px) rotateY(${lerp(t, C[2], C[3], -14, -4)}deg) rotateZ(-6deg) scale(${lerp(t, C[2], C[3], 1.25, 1.4)})` }}><Cap text="MosMos 会议记录" arrow /></div></AbsoluteFill>
	if (t < C[4]) return <AbsoluteFill><Earth t={t} dim={0.55} /><AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}><Ask t={t} t0={M.ask} /></AbsoluteFill></AbsoluteFill>
	if (t < C[5]) return <AbsoluteFill style={{ background: "linear-gradient(135deg, #5a4bd1, #9a8cf0)", alignItems: "center", justifyContent: "center" }}><Ask t={t} t0={-9} s={1.25} /></AbsoluteFill>
	if (t < C[6]) return <AbsoluteFill style={{ background: "linear-gradient(160deg, #1b2547, #0a0f1e)" }}><div style={{ position: "absolute", left: 300, top: 170 }}><Card w={560}><div style={{ fontSize: 18, color: T3, marginBottom: 8 }}>分给 5 个场景</div>{SCENES.map((s, i) => <div key={s} style={{ display: "flex", justifyContent: "space-between", height: 56, alignItems: "center", fontSize: 24, borderTop: i ? `1px solid ${LINE}` : undefined, opacity: clamp01((sc(5) - i * 0.12) / 0.15) }}>{s}<span style={{ color: BLUE, fontSize: 18 }}>准备中</span></div>)}</Card></div><div style={{ position: "absolute", left: 920, top: 330, transform: "scale(.8)", transformOrigin: "0 0" }}><Card w={560}><div style={{ fontSize: 18, color: T3 }}>润色</div>{COPY.polish.map((p) => <div key={p.id} style={{ fontSize: 24, height: 52, display: "flex", alignItems: "center" }}>{p.label} · <span style={{ color: T3, fontSize: 18, marginLeft: 8 }}>{p.hint}</span></div>)}</Card></div></AbsoluteFill>
	if (t < C[7]) return <AbsoluteFill style={{ background: "linear-gradient(160deg, #1b2547, #0a0f1e)" }}><div style={{ position: "absolute", left: 180, top: 120 }}><Card w={700}><Steps t={t} t0={C[6]} /></Card></div><div style={{ position: "absolute", left: 1000, top: 400 }}><Stat t={t} t0={M.stat} /></div></AbsoluteFill>
	if (t < C[8]) return <AbsoluteFill style={{ background: "linear-gradient(160deg, #1b2547, #0a0f1e)" }}>{[0, 1, 2].map((i) => <div key={i} style={{ position: "absolute", left: 140 + i * 560, top: 160 + (i % 2) * 60, transform: `scale(.75) translateY(${lerp(t, C[7], C[8], 40, -20)}px)`, transformOrigin: "0 0" }}><Page k={i} /></div>)}</AbsoluteFill>
	if (t < C[9]) return <AbsoluteFill style={{ background: "linear-gradient(160deg, #1b2547, #0a0f1e)", alignItems: "center", justifyContent: "center" }}><div style={{ transform: `scale(${lerp(t, C[8], C[9], 1.0, 1.08)})` }}><Sheet /></div></AbsoluteFill>
	if (t < C[10]) return <AbsoluteFill style={{ background: "#fff" }}><div style={{ position: "absolute", left: 300, top: lerp(t, C[9], C[10], 140, -260, inOut) }}><Steps t={t} t0={C[9] + 0.1} big /></div></AbsoluteFill>
	if (t < C[11]) return <AbsoluteFill style={{ background: NAVY }}>{[0, 1, 2, 3].map((i) => <div key={i} style={{ position: "absolute", left: 110 + i * 440, top: 130 + lerp(t, C[10] + i * 0.3, C[10] + 0.8 + i * 0.3, 300, 0), opacity: clamp01((t - C[10] - i * 0.3) / 0.3), transform: "scale(.62)", transformOrigin: "0 0" }}><Page k={i} /></div>)}{t > M.out && <div style={{ position: "absolute", left: 1350, top: 820, fontFamily: HEAVY, fontWeight: 700, fontSize: 52, color: "#fff", lineHeight: 1.3, opacity: clamp01((t - M.out) / 0.2) }}>一段录音<br />多种成稿</div>}</AbsoluteFill>
	if (t < C[16]) { const k = C.slice(11, 16).filter((c) => t >= c).length; return <AbsoluteFill style={{ background: k % 2 ? "#eef1f8" : NAVY, alignItems: "center", justifyContent: "center" }}><div style={{ transform: `scale(${1.0 + 0.1 * (k % 3)}) rotate(${(k % 2 ? -2 : 2)}deg)` }}>{k === 2 ? <Sheet /> : <Page k={k} w={k % 2 ? 900 : 720} />}</div></AbsoluteFill> }
	if (t < C[17]) return <Tiles t={t} />
	if (t < C[18]) return <Scatter t={t} />
	if (t < C[19]) return <Scatter t={t} zoom />
	if (t < C[20]) { const s = typeAt("MosMos，说过的都不落下。", t, M.say, 7).s; return <AbsoluteFill style={{ background: "#fff" }}><div style={{ position: "absolute", left: 360, top: 300, width: 1200 }}><div style={{ fontFamily: CJK, fontSize: 22, color: T3, marginBottom: 20 }}>{t < M.say - 0.3 ? "5 份文件已写好 · 查看或下载" : ""}</div><div style={{ borderRadius: 24, boxShadow: `0 0 0 1px ${LINE}, 0 20px 60px rgba(0,0,0,.08)`, padding: 34 }}><div style={{ fontFamily: CJK, fontSize: 44, color: "#151517", minHeight: 70 }}>{s}<Caret t={t} h={0.9} /></div><div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 30 }}><Wave t={t} live n={6} h={24} color={BLUE} /><div style={{ flex: 1 }} /><span style={{ fontFamily: SANS, fontSize: 22, color: "#55565b" }}>MosMos · 会议记录 ▾</span><div style={{ width: 54, height: 54, borderRadius: 99, background: "#111", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>↑</div></div></div></div></AbsoluteFill> }
	if (t < C[21]) return <AbsoluteFill><Earth t={t} s={1.4} y={-80} dim={0.35} /><AbsoluteFill style={{ backdropFilter: "blur(14px)" }} /></AbsoluteFill>
	if (t < C[22]) return <AbsoluteFill><Earth t={t} s={1.3} dim={0.3} /><AbsoluteFill style={{ alignItems: "center", justifyContent: "center", gap: 18, flexDirection: "row" }}><LogoPixels size={70} t={t} mode="in" t0={C[21]} invert /><div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 64, color: "#fff", opacity: clamp01((t - C[21] - 0.3) / 0.3) }}>MosMos</div></AbsoluteFill></AbsoluteFill>
	return <AbsoluteFill style={{ background: "#000", alignItems: "center", justifyContent: "center" }}><div style={{ fontFamily: SANS, fontSize: 40, color: "#fff", opacity: clamp01((t - C[22]) / 0.3) * clamp01((TL.dur - t) / 0.5) }}>{COPY.url}</div></AbsoluteFill>
}
