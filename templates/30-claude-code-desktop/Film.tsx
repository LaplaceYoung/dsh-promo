// Template 30 — structure of Anthropic "Claude Code on desktop" (2025), MosMos content.
// One take over a light MosMos desktop window on beige: the home screen, a push-in to the sidebar where the
// mode toggle switches from 听写 to 代码与终端, a pull-out to the code panel, a spoken request that MosMos turns
// into a terminal command, a wipe to a serif title card, and the pixel logo with the wordmark.
import React from "react"
import { AbsoluteFill } from "remotion"
import { CJK, MONO, lerp, clamp01, inOut, useT, Wave, LogoPixels, Wordmark, Cursor, path, COPY, SCENES } from "../_engine/src/mos"
import { Camera, CamKey } from "../_engine/src/kit"
import TL from "./timeline.json"

const M = TL.marks as Record<string, number>
const BG = "#e2d8c7", WIN = "#faf9f6", SIDE = "#f3f0ea", INKC = "#2b2925", DIM = "#8b867d", LN = "#e7e2d8", ORG = "#d9774a"
const SERIF = "'Noto Serif CJK SC', 'Noto Serif SC', serif"
const WX = 160, WY = 90, WW = 1600, WH = 900, SW = 300
const RAW = COPY.termAsk, CMD = COPY.termCmd

const Toggle: React.FC<{ t: number }> = ({ t }) => {
	const on = clamp01((t - M.mode) / 0.25)
	return <div style={{ position: "absolute", left: 28, top: 70, width: 120, height: 46, borderRadius: 23, background: "#e9e5dd", boxShadow: `0 0 0 1px ${LN} inset` }}>
		<div style={{ position: "absolute", left: 4 + on * 58, top: 4, width: 54, height: 38, borderRadius: 19, background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,.12)" }} />
		<div style={{ position: "absolute", left: 4, top: 4, width: 54, height: 38, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 19, color: INKC }}>🎙</div>
		<div style={{ position: "absolute", left: 62, top: 4, width: 54, height: 38, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, fontFamily: MONO, color: INKC }}>{"</>"}</div>
	</div>
}
const Burst: React.FC<{ t: number }> = ({ t }) => {
	const a = (t - M.click) / 0.45
	if (a < 0 || a > 1) return null
	return <svg width={300} height={300} style={{ position: "absolute", left: 117 - 150, top: 93 - 150 }}>{Array.from({ length: 10 }).map((_, i) => {
		const g = (i / 10) * Math.PI * 2, r0 = 40 + a * 40, r1 = r0 + 26 * (1 - a)
		return <line key={i} x1={150 + Math.cos(g) * r0} y1={150 + Math.sin(g) * r0} x2={150 + Math.cos(g) * r1} y2={150 + Math.sin(g) * r1} stroke={ORG} strokeWidth={6} strokeLinecap="round" opacity={1 - a * 0.6} />
	})}</svg>
}
const NAV = [["💬", "我的输入"], ["◎", "会议记录"], ["✦", "热词"], ["⚙", "设置"]]
const RECENT = ["给李经理回周会时间", "首页改版周会纪要", "Nimbus 需求邮件", "设计组例会总结", "交互稿评审意见", "品牌素材清单", "周五上线检查"]
const SESS: [string, string][] = [["查找包含 API_KEY 的文件", "~/order-service"], ["解释这段报错", "~/order-service"], ["写这次的提交说明", "~/mobile"], ["列出最近改过的文件", "~/web"], ["清理构建目录", "~/web"]]
const Side: React.FC<{ t: number }> = ({ t }) => {
	const code = t > M.mode + 0.1
	return <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: SW, background: SIDE, borderRight: `1px solid ${LN}` }}>
		<div style={{ position: "absolute", left: 26, top: 24, display: "flex", gap: 9 }}>{["#ee6a5f", "#f5be4f", "#62c554"].map((c) => <div key={c} style={{ width: 14, height: 14, borderRadius: 7, background: c }} />)}<div style={{ marginLeft: 28, width: 18, height: 14, border: `2px solid ${DIM}`, borderRadius: 3 }} /></div>
		<Toggle t={t} />
		<div style={{ position: "absolute", left: 238, top: 72, width: 42, height: 42, borderRadius: 21, background: ORG, color: "#fff", fontSize: 28, display: "flex", alignItems: "center", justifyContent: "center" }}>＋</div>
		{!code ? <div style={{ position: "absolute", left: 30, top: 140, fontSize: 19, color: INKC, lineHeight: "40px" }}>
			{NAV.map(([i, s]) => <div key={s} style={{ display: "flex", gap: 14 }}><span style={{ width: 22, color: DIM }}>{i}</span>{s}</div>)}
			<div style={{ marginTop: 22, fontSize: 15, color: DIM }}>最近</div>
			{RECENT.map((s) => <div key={s} style={{ fontSize: 17, lineHeight: "36px", color: "#4a463f" }}>{s}</div>)}
		</div> : <div style={{ position: "absolute", left: 30, right: 20, top: 140, fontSize: 19, color: INKC, opacity: clamp01((t - M.mode - 0.1) / 0.3) }}>
			<div style={{ display: "flex", justifyContent: "space-between", fontSize: 15, color: DIM }}><span>终端输入</span><span>≡</span></div>
			{SESS.map(([a, b], i) => <div key={a} style={{ marginTop: 18, opacity: clamp01((t - M.mode - 0.15 - i * 0.07) / 0.25) }}><div style={{ display: "flex", justifyContent: "space-between" }}><span>{a}</span><span style={{ color: ORG, fontSize: 12 }}>●</span></div><div style={{ fontSize: 14, color: DIM, fontFamily: MONO, marginTop: 4 }}>{b}</div></div>)}
		</div>}
		<div style={{ position: "absolute", left: 26, bottom: 22, display: "flex", gap: 12, alignItems: "center", fontSize: 16 }}><div style={{ width: 34, height: 34, borderRadius: 17, background: "#6b8f71", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>林</div><div>小林<div style={{ fontSize: 13, color: DIM }}>mosmos.io</div></div></div>
	</div>
}
const Home: React.FC<{ t: number }> = ({ t }) => (
	<div style={{ position: "absolute", left: SW, right: 0, top: 0, bottom: 0, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 330 }}>
		<div style={{ display: "flex", alignItems: "center", gap: 18, fontFamily: SERIF, fontSize: 50, color: INKC }}><LogoPixels size={44} t={t} mode="static" />你好，小林</div>
		<div style={{ marginTop: 40, width: 700, borderRadius: 18, background: "#fff", boxShadow: `0 0 0 1px ${LN}, 0 8px 24px rgba(80,60,20,.06)`, padding: "18px 22px" }}>
			<div style={{ fontSize: 20, color: "#aaa398", fontFamily: CJK }}>想写点什么？按 Fn 开始说</div>
			<div style={{ display: "flex", justifyContent: "flex-end", marginTop: 18 }}><div style={{ width: 36, height: 36, borderRadius: 10, background: "#efc3ad", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>↑</div></div>
		</div>
		<div style={{ display: "flex", gap: 14, marginTop: 20 }}>{SCENES.map((s) => <div key={s} style={{ fontSize: 16, color: "#5d5850", border: `1px solid ${LN}`, borderRadius: 10, padding: "8px 14px", background: "#fff" }}>{s}</div>)}</div>
	</div>
)
const Drop: React.FC<{ t: number }> = ({ t }) => {
	const open = t > M.drop && t < M.pick + 0.15, picked = t > M.pick
	return <div style={{ position: "relative" }}>
		<div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 16, color: INKC, border: `1px solid ${LN}`, borderRadius: 10, padding: "8px 14px", background: "#fff" }}>{picked ? "代码与终端" : "自动识别场景"} <span style={{ color: DIM }}>▾</span></div>
		{open && <div style={{ position: "absolute", right: 0, top: 46, width: 220, borderRadius: 12, background: "#fff", boxShadow: "0 10px 30px rgba(60,40,10,.16)", padding: 8, fontSize: 16, color: INKC, zIndex: 5 }}>
			{SCENES.map((s) => <div key={s} style={{ padding: "8px 10px", borderRadius: 8, background: s === "代码与终端" && t > M.pick - 0.25 ? "#f1ece3" : "transparent" }}>{s}</div>)}
		</div>}
	</div>
}
const Code: React.FC<{ t: number }> = ({ t }) => {
	const op = clamp01((t - M.mode - 0.15) / 0.35)
	const heard = Math.floor(clamp01((t - M.say - 0.2) / (M.said - M.say - 0.2)) * Array.from(RAW).length)
	const pol = clamp01((t - M.polish) / 0.3), sent = t > M.send
	return <div style={{ position: "absolute", left: SW, right: 0, top: 0, bottom: 0, opacity: op, backgroundImage: "radial-gradient(#e3ddd2 1.4px, transparent 1.4px)", backgroundSize: "22px 22px", background: undefined }}>
		<AbsoluteFill style={{ backgroundImage: "radial-gradient(#e2dccf 1.5px, transparent 1.5px)", backgroundSize: "22px 22px" }} />
		<div style={{ position: "absolute", left: 30, top: 22, fontSize: 15, color: DIM, border: `1px solid ${LN}`, borderRadius: 8, padding: "4px 12px", background: "#fff" }}>预览</div>
		<div style={{ position: "absolute", left: 270, top: 250, width: 760 }}>
			<div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}><LogoPixels size={64} t={t} mode="static" /></div>
			<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
				<div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 16, color: INKC, border: `1px solid ${LN}`, borderRadius: 10, padding: "8px 14px", background: "#fff", width: 360, fontFamily: MONO }}>▭ ~/order-service<span style={{ flex: 1 }} /><span style={{ color: DIM }}>▾</span></div>
				<Drop t={t} />
			</div>
			<div style={{ marginTop: 14, borderRadius: 16, background: "#fff", boxShadow: `0 0 0 1px ${LN}, 0 8px 24px rgba(80,60,20,.06)`, padding: "18px 22px", height: 150, position: "relative" }}>
				{heard === 0 && <div style={{ fontSize: 20, color: "#aaa398" }}>说出你想在终端里做的事</div>}
				{heard > 0 && <div style={{ fontSize: 20, color: INKC, opacity: 1 - pol, position: "absolute", left: 22, top: 18, right: 22 }}>{Array.from(RAW).slice(0, heard).join("")}{t < M.said && <span style={{ color: "#bbb" }}>|</span>}</div>}
				{pol > 0 && <div style={{ fontSize: 22, color: INKC, fontFamily: MONO, opacity: pol, position: "absolute", left: 22, top: 18, background: "#f6f2ea", borderRadius: 8, padding: "4px 10px" }}>{CMD}</div>}
				<div style={{ position: "absolute", right: 18, bottom: 16, display: "flex", alignItems: "center", gap: 14 }}>
					<Wave t={t} live={t > M.say && t < M.said} n={7} h={22} color={INKC} /><span style={{ fontSize: 15, color: DIM }}>{sent ? "已粘贴到终端" : "标准润色 ▾"}</span>
					<div style={{ width: 38, height: 38, borderRadius: 10, background: ORG, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{sent ? "✓" : "↑"}</div>
				</div>
			</div>
			<div style={{ display: "flex", gap: 14, marginTop: 16 }}>{[["查找包含", "API_KEY", "的文件"], ["解释", "最近一次", "报错"], ["写一段", "提交说明", ""]].map(([a, b, c]) => <div key={a + b} style={{ flex: 1, border: `1px solid ${LN}`, borderRadius: 12, background: "#fff", padding: "14px 16px", fontSize: 16, color: "#5d5850", lineHeight: 1.6 }}>{a} <span style={{ color: ORG, background: "#fbeee6", borderRadius: 4, padding: "0 4px", fontFamily: MONO, fontSize: 14 }}>{b}</span> {c}</div>)}</div>
		</div>
	</div>
}
// cursor in window coordinates
const CUR: [number, number, number][] = [[0, 700, 600], [2.4, 260, 260], [2.9, 117, 95], [3.4, 112, 92], [5.2, 200, 300], [8.0, 1300, 700], [10.2, 1265, 330], [10.5, 1265, 352], [10.9, 1240, 570], [11.1, 1240, 572], [11.55, 1290, 530], [11.8, 1293, 537], [13, 1293, 537]]
const Window: React.FC<{ t: number }> = ({ t }) => {
	const c = path(t, CUR)
	const down = Math.abs(t - M.click) < 0.08 || Math.abs(t - M.drop) < 0.08 || Math.abs(t - M.pick) < 0.08 || Math.abs(t - M.send) < 0.08
	return <div style={{ position: "absolute", left: WX, top: WY, width: WW, height: WH, borderRadius: 18, background: WIN, boxShadow: "0 30px 80px rgba(80,60,20,.18), 0 0 0 1px rgba(0,0,0,.05)", overflow: "hidden", fontFamily: CJK, color: INKC }}>
		{t < M.mode + 0.2 && <div style={{ opacity: 1 - clamp01((t - M.mode) / 0.2) }}><Home t={t} /></div>}
		{t > M.mode && <Code t={t} />}
		<Side t={t} />
		<Burst t={t} />
		{t > 2.2 && <Cursor x={c.x} y={c.y} down={down} s={1.1} />}
	</div>
}
export const Film: React.FC = () => {
	const t = useT()
	if (t < M.text) {
		const k: CamKey[] = [[0, 1.0, 960, 540], [M.zoom, 1.04, 960, 540], [M.zoom + 0.65, 2.5, 474, 300], [M.out1, 2.55, 480, 305], [M.out1 + 0.8, 1.75, 1010, 520], [M.out2, 1.72, 1020, 520],
			[M.out2 + 0.65, 1.45, 1100, 520], [M.drop - 0.5, 1.47, 1100, 525], [M.drop + 0.1, 1.75, 1190, 520], [M.wipe, 1.78, 1190, 525]]
		const w = inOut(clamp01((t - M.wipe) / (M.text - M.wipe)))
		return <AbsoluteFill style={{ background: BG }}>
			<Title t={t} />
			<div style={{ position: "absolute", inset: 0, transform: `translateX(${-w * 2300}px)` }}>
				<AbsoluteFill style={{ background: BG, WebkitMaskImage: undefined }}><Camera t={t} keys={k}><Window t={t} /></Camera></AbsoluteFill>
				{w > 0 && <div style={{ position: "absolute", left: 1920, top: 0, width: 380, height: 1080, background: `linear-gradient(90deg, ${WIN}, ${BG})` }} />}
			</div>
		</AbsoluteFill>
	}
	return <AbsoluteFill style={{ background: BG }}>{t < M.textOut ? <Title t={t} /> : <End t={t} />}</AbsoluteFill>
}
const Title: React.FC<{ t: number }> = ({ t }) => {
	if (t < M.wipe) return null
	const d = t - M.text
	return <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
		<div style={{ transform: `translate(${d < 0 ? -d * 300 : 0}px, ${Math.sin(t * 3) * 4}px) rotate(${Math.sin(t * 2.2) * 4}deg)` }}><LogoPixels size={120} t={t} mode="static" /></div>
		<div style={{ marginTop: 56, fontFamily: SERIF, fontSize: 112, lineHeight: 1.35, color: INKC, textAlign: "center" }}>代码与终端里，<br />也一样开口说</div>
	</AbsoluteFill>
}
const End: React.FC<{ t: number }> = ({ t }) => {
	const a = clamp01((t - M.logo) / 0.35), dot = clamp01((t - M.textOut - 0.1) / 0.3)
	return <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 28 * a }}>
		<div style={{ transform: `scale(${t < M.logo ? lerp(dot, 0, 1, 0.2, 0.55) : lerp(a, 0, 1, 0.55, 1)})` }}><LogoPixels size={112} t={t} mode="static" /></div>
		<div style={{ width: a * 500, overflow: "hidden", opacity: a }}><Wordmark size={122} color={INKC} /></div>
	</AbsoluteFill>
}
