// Template 08 — structure of Anthropic "Introducing Claude Haiku 4.5" (2025), MosMos content.
// Line illustration on a flat brand colour collapses to a dot, the dot grows into a window, a counter badge
// rides along while the camera moves between a speech transcript, a red/green polish diff and the target app,
// then a mosaic of windows shrinks back to a dot, serif lines with an orbiting stroke, and the logo.
import React from "react"
import { AbsoluteFill } from "remotion"
import { ACC, CJK, SANS, MONO, COPY, Wave, lerp, clamp01, inOut, out, useT, LogoPixels, Wordmark, Caret, typeAt } from "../_engine/src/mos"
import { SERIF, Camera, CamKey, track, vis } from "../_engine/src/kit"
import TL from "./timeline.json"

const M = TL.marks as Record<string, number>
const BG = ACC, INKC = "#141414", PAPER = "#fbfaf8"
const RAW = COPY.raw, OUT = COPY.polish[2].out!

// ---------- opening illustration: a profile speaking, sound nodes linking into a constellation
const NODES: [number, number][] = [[1010, 300], [1120, 230], [1190, 330], [1110, 420], [1240, 450], [1180, 560]]
const Illustration: React.FC<{ t: number }> = ({ t }) => {
	const col = lerp(t, M.collapse, M.dot, 0, 1, inOut)
	const cx = 960, cy = 540
	const P = NODES.map(([x, y]) => [x + (cx - x) * col, y + (cy - y) * col])
	const shown = (i: number) => clamp01((t - M.nodes0 - i * 0.37) / 0.2)
	const head = clamp01(1 - col * 1.6)
	return (
		<AbsoluteFill style={{ background: BG }}>
			<svg width={1920} height={1080} style={{ position: "absolute" }}>
				<g opacity={head} fill="none" stroke={INKC} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round">
					<path d="M900,180 C1020,190 1060,300 1030,370 C1015,405 1060,430 1045,470 C1035,500 1000,500 1005,530 C1012,575 990,610 950,615 C920,620 905,660 910,760" />
					<path d="M720,640 C780,600 860,610 900,650 M700,700 C770,660 860,670 905,710 M700,760 C780,725 860,735 910,770" />
				</g>
				{P.slice(1).map(([x, y], i) => { const a = Math.min(shown(i), shown(i + 1)); return <line key={i} x1={P[i][0]} y1={P[i][1]} x2={P[i][0] + (x - P[i][0]) * a} y2={P[i][1] + (y - P[i][1]) * a} stroke="#fff" strokeWidth={6} opacity={1 - col} /> })}
				{P.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={16 * shown(i) * (1 - col * 0.7)} fill="#fff" />)}
				{t > M.dot - 0.3 && <circle cx={cx} cy={cy} r={lerp(t, M.dot - 0.3, M.win, 22, 14)} fill="#fff" />}
			</svg>
		</AbsoluteFill>
	)
}
// ---------- UI pieces (stage 3200 x 1800, camera frames it)
const Win: React.FC<{ w: number; h: number; title: string; children: React.ReactNode; x: number; y: number; op?: number }> = ({ w, h, title, children, x, y, op = 1 }) => (
	<div style={{ position: "absolute", left: x, top: y, width: w, height: h, borderRadius: 18, background: PAPER, boxShadow: "0 30px 80px rgba(0,0,0,.25)", overflow: "hidden", opacity: op, fontFamily: CJK }}>
		<div style={{ height: 52, display: "flex", alignItems: "center", gap: 10, padding: "0 20px", borderBottom: "1px solid #ebe9e4" }}>
			{[0, 1, 2].map((i) => <div key={i} style={{ width: 14, height: 14, borderRadius: 7, background: "#d9d6cf" }} />)}
			<div style={{ marginLeft: 16, fontSize: 20, color: "#8a877f" }}>{title}</div>
		</div>
		<div style={{ position: "relative", padding: 34 }}>{children}</div>
	</div>
)
const Transcript: React.FC<{ t: number }> = ({ t }) => {
	const s = typeAt(RAW, t, M.type0, 17)
	return (
		<>
			<div style={{ margin: "0 auto", width: 560, border: `2px solid ${ACC}`, borderRadius: 14, padding: "18px 22px", textAlign: "center" }}>
				<div style={{ fontSize: 22, color: ACC }}>✻ 欢迎使用 MosMos</div>
				<div style={{ marginTop: 14, display: "flex", justifyContent: "center" }}><div style={{ width: 160, height: 44, borderRadius: 999, background: "#0b0b0c", display: "flex", alignItems: "center", justifyContent: "center" }}><Wave t={t} live={s.typing} n={9} h={20} /></div></div>
			</div>
			<div style={{ marginTop: 40, fontSize: 30, lineHeight: 1.7, color: "#2a2926" }}>{s.s}{s.typing && <Caret t={t} color={ACC} />}</div>
			<div style={{ position: "absolute", left: 34, right: 34, top: 520, borderTop: "1px solid #ebe9e4", paddingTop: 18, fontSize: 20, color: "#9a978f", fontFamily: MONO }}>按 Fn 开始 · 再按一次写好 · 风格：自动 · 简洁自然</div>
		</>
	)
}
const DIFF: [string, string][] = [["-", "嗯，我觉得这个方案吧，这个方案可以先，"], ["+", "先小范围测试"], ["-", "先做一个小范围的测试，然后然后看看反馈，"], ["-", "不对，是先收集一下反馈，"], ["+", "并收集反馈，"], ["-", "再决定要不要，就是要不要全部上线。"], ["+", "再决定是否全面上线。"], [" ", ""], [" ", "处理改口 · 去掉口头语 · 重组为简洁成稿"], [" ", "66 字 → 21 字"]]
const Diff: React.FC<{ t: number; t0: number }> = ({ t, t0 }) => (
	<div style={{ fontFamily: MONO, fontSize: 28, lineHeight: 1.75 }}>
		{DIFF.map(([k, s], i) => {
			const o = clamp01((t - t0 - i * 0.22) / 0.2)
			return <div key={i} style={{ opacity: o, background: k === "-" ? "rgba(228,87,46,.16)" : k === "+" ? "rgba(41,163,106,.2)" : "transparent", color: k === "-" ? "#a8371a" : k === "+" ? "#17784b" : "#7a776f", padding: "0 14px", textDecoration: k === "-" ? "line-through" : undefined, fontFamily: k === " " ? CJK : MONO }}>{k === " " ? "" : k + " "}{s}</div>
		})}
	</div>
)
const AppView: React.FC<{ t: number; big?: boolean }> = ({ big }) => (
	<div style={{ fontFamily: CJK }}>
		<div style={{ height: big ? 300 : 200, background: ACC, borderRadius: 14, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#fff" }}>
			<div style={{ fontSize: big ? 64 : 42, fontWeight: 700 }}>说得随意，写得体面。</div>
			<div style={{ fontSize: big ? 28 : 20, opacity: 0.8, marginTop: 12 }}>项目群 · 首页改版</div>
		</div>
		<div style={{ marginTop: 30, fontSize: 24, color: "#8a877f" }}>小林 · 刚刚</div>
		<div style={{ marginTop: 10, padding: "20px 26px", borderRadius: 16, background: "#eef2f9", fontSize: 32, color: INKC, lineHeight: 1.5, display: "inline-block" }}>{OUT}</div>
		<div style={{ marginTop: 18, display: "flex", gap: 12 }}>{["✓ 已写好", "已粘贴到输入框", "高级润色"].map((c) => <div key={c} style={{ padding: "8px 18px", borderRadius: 999, background: "#fff", border: "1px solid #e3e1dc", fontSize: 20, color: "#55534d" }}>{c}</div>)}</div>
	</div>
)
const Badge: React.FC<{ t: number }> = ({ t }) => {
	if (t < M.badge || t >= M.mosaic) return null
	const n = Math.round(lerp(t, M.badge, M.mosaic - 0.6, 0, 128, (x) => x))
	const big = vis(t, M.big0, M.big1, 0.35)
	const p = lerp(t, M.badge, M.badge + 0.3, 0.6, 1)
	const x = lerp(big, 0, 1, t < M.split ? 960 : 300, 960, (q) => q), y = lerp(big, 0, 1, t < M.split ? 700 : 960, 540, (q) => q)
	const s = p * (1 + big * 1.4)
	return (
		<div style={{ position: "absolute", left: x, top: y, transform: `translate(-50%,-50%) scale(${s})`, padding: "12px 22px", borderRadius: 14, background: "#16161a", color: "#fff", fontFamily: MONO, fontSize: 34, boxShadow: `0 0 ${20 + big * 60}px rgba(255,255,255,${0.25 + big * 0.35})` }}>{String(n).padStart(2, "0")} 字</div>
	)
}
const SCENEWIN = ["飞书 / 微信", "邮件", "文档", "提示词", "代码与终端"]
const Mosaic: React.FC<{ t: number }> = ({ t }) => {
	const s = Math.exp(lerp(t, M.mosaic, M.tiny, Math.log(1), Math.log(0.025), inOut))
	const toDot = clamp01((t - M.tiny) / 0.25)
	return (
		<AbsoluteFill style={{ background: BG, alignItems: "center", justifyContent: "center" }}>
			<div style={{ transform: `scale(${s})`, display: "grid", gridTemplateColumns: "repeat(5, 700px)", gap: 40, opacity: 1 - toDot }}>
				{Array.from({ length: 15 }).map((_, i) => (
					<div key={i} style={{ width: 700, height: 440, borderRadius: 16, background: i === 7 ? PAPER : i % 3 === 0 ? "#1b1c20" : PAPER, padding: 30, fontFamily: CJK, boxShadow: "0 20px 50px rgba(0,0,0,.2)" }}>
						<div style={{ fontSize: 22, color: i % 3 === 0 && i !== 7 ? "#8a8c90" : "#8a877f" }}>{SCENEWIN[i % 5]}</div>
						<div style={{ marginTop: 20, fontSize: 28, lineHeight: 1.5, color: i % 3 === 0 && i !== 7 ? "#e8e8ea" : INKC }}>{COPY.scenes[i % 5].out.split("\n")[0]}</div>
					</div>
				))}
			</div>
			{t > M.tiny && <div style={{ position: "absolute", width: lerp(t, M.tiny, M.wdot, 40, 22), height: lerp(t, M.tiny, M.wdot, 40, 22), borderRadius: lerp(t, M.tiny, M.wdot, 8, 11), background: "#fff" }} />}
		</AbsoluteFill>
	)
}
// ---------- closing: serif lines with an orbiting white stroke
const Orbit: React.FC<{ t: number; t0: number; rx: number; ry: number; fade?: number }> = ({ t, t0, rx, ry, fade = 1 }) => {
	const a = (t - t0) * 2.4
	const arc = Array.from({ length: 28 }, (_, i) => { const q = a - i * 0.045; return [960 + Math.cos(q) * rx, 540 + Math.sin(q) * ry * (1 + 0.15 * Math.sin(q * 0.5))] })
	return <svg width={1920} height={1080} style={{ position: "absolute" }}><path d={"M" + arc.map((p) => p.join(",")).join(" L")} stroke="#f2b134" strokeWidth={7} fill="none" strokeLinecap="round" opacity={fade} /></svg>
}
const Closing: React.FC<{ t: number }> = ({ t }) => {
	const L = [["说得随意，", M.l1], ["写得体面，", M.l2], ["在每个应用里。", M.l3]] as const
	return (
		<AbsoluteFill style={{ background: BG, alignItems: "center", justifyContent: "center" }}>
			{t < M.name && <div style={{ fontFamily: SERIF, fontSize: 64, color: "#fff", textAlign: "center", lineHeight: 1.35, opacity: 1 - clamp01((t - M.lout) / 0.35) }}>
				{L.map(([s, t0], i) => <div key={i} style={{ opacity: clamp01((t - t0) / 0.45), transform: `translateY(${(1 - clamp01((t - t0) / 0.45)) * 10}px)` }}>{s}</div>)}
			</div>}
			{t >= M.name && t < M.spark && <div style={{ fontFamily: SERIF, fontSize: 110, color: "#fff", opacity: clamp01((t - M.name) / 0.35) * (1 - clamp01((t - M.nout) / 0.3)) }}>MosMos</div>}
			{t < M.nout + 0.3 && <Orbit t={t} t0={M.l1 - 0.2} rx={t < M.name ? 420 : 330} ry={t < M.name ? 170 : 110} fade={clamp01((t - M.l1 + 0.2) / 0.3) * (1 - clamp01((t - M.nout) / 0.3))} />}
			{t >= M.nout + 0.1 && t < M.logo && <div style={{ position: "absolute", width: 18, height: 18, borderRadius: 9, background: "#fff", transform: `scale(${t > M.spark ? 1 + Math.sin((t - M.spark) * 18) * 0.5 : 1})`, boxShadow: t > M.spark ? "0 0 30px #fff" : undefined }} />}
			{t >= M.logo && <div style={{ display: "flex", alignItems: "center", gap: 26, opacity: clamp01((t - M.logo) / 0.3) }}><LogoPixels size={74} t={t} mode="in" t0={M.logo - 0.3} invert /><Wordmark size={70} color="#fff" /></div>}
		</AbsoluteFill>
	)
}

// camera over a 3200x1800 stage
const STAGE_W = 3200, STAGE_H = 1800
const CAM: CamKey[] = [
	[4.4, 1.0, 1600, 900], [10.9, 1.08, 1600, 880], [11.6, 0.82, 1880, 900], [13.84, 0.84, 1880, 900],
	[13.85, 1.7, 1150, 780], [14.29, 1.74, 1160, 780], [14.3, 1.45, 1260, 900], [19.09, 1.55, 1270, 900],
	[19.1, 1.25, 2320, 860], [19.24, 1.25, 2320, 860], [19.25, 1.6, 2300, 800], [19.8, 1.62, 2300, 800],
	[19.817, 0.85, 1880, 900], [27.75, 0.9, 1880, 900], [27.767, 1.5, 2340, 760], [28.3, 1.5, 2340, 760],
]
export const Film: React.FC = () => {
	const t = useT()
	if (t < M.win) return <Illustration t={t} />
	if (t >= M.wdot - 0.0 && t >= M.mosaic && t > M.wdot) return <Closing t={t} />
	if (t >= M.mosaic) return <Mosaic t={t} />
	const grow = lerp(t, M.win, M.open, 0, 1, out)
	const split = lerp(t, M.split, M.split + 0.6, 0, 1, inOut)
	const diffMode = t >= TL.cuts[1]
	const left = diffMode ? <Diff t={t} t0={TL.cuts[1] - 1.5} /> : <Transcript t={t} />
	return (
		<AbsoluteFill style={{ background: BG }}>
			<div style={{ position: "absolute", inset: 0, transform: `scale(${0.04 + 0.96 * grow})`, opacity: clamp01(grow * 3), borderRadius: (1 - grow) * 400 }}>
				<Camera t={t} keys={CAM} w={STAGE_W} h={STAGE_H}>
					<Win x={lerp(split, 0, 1, 900, 560)} y={460} w={1400} h={880} title={diffMode ? "MosMos · 润色" : "MosMos · 语音输入"}>{left}</Win>
					<Win x={2020} y={420} w={1100} h={960} title="飞书 · 项目群" op={split}><AppView t={t} /></Win>
				</Camera>
			</div>
			{(t >= TL.cuts[3] && t < TL.cuts[5]) && <AbsoluteFill style={{ background: BG }}><div style={{ position: "absolute", left: 120, top: 80, width: 1680, height: 920, borderRadius: 18, background: PAPER, padding: 50, transform: `scale(${t >= TL.cuts[4] ? 1.12 : 1})`, transformOrigin: "30% 20%", boxShadow: "0 30px 80px rgba(0,0,0,.25)" }}><AppView t={t} big /></div></AbsoluteFill>}
			<Badge t={t} />
		</AbsoluteFill>
	)
}
