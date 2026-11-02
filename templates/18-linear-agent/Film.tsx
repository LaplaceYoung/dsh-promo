// Template 18 — structure of Linear "Introducing Linear Agent" (2026), MosMos content.
// A dark app interface lies on a tilted plane; a soft depth-of-field band slides across it while the camera
// glides. Voice requests in the "问 MosMos" bar turn a meeting into a summary, todos and an email.
// Depth of field: one blurred copy + one masked sharp copy (kit DOF), small radius to keep renders cheap.
import React from "react"
import { AbsoluteFill } from "remotion"
import { CJK, HEAVY, SANS, COPY, lerp, clamp01, inOut, typeAt, useT, Wave, LogoPixels } from "../_engine/src/mos"
import { DOF, track } from "../_engine/src/kit"
import TL from "./timeline.json"

const M = TL.marks as Record<string, number>, C = TL.cuts
const BG = "#060708", P1 = "#0e0f11", P2 = "#141518", LN = "#1f2024", TX = "#d9dadd", DIM = "#6c6e73"
const ST = ["#e5a93b", "#4fa36b", "#5e8ee6", "#9b6fe0", "#d65a5a"]

// ---------- plane with camera + depth of field
type K = [number, number, number, number, number, number, number] // t, x, y, rx, rz, s, focus%
const Plane: React.FC<{ t: number; keys: K[]; w?: number; h?: number; angle?: number; children: React.ReactNode }> = ({ t, keys, w = 1800, h = 1100, angle = 160, children }) => {
	const g = (i: number) => track(t, keys.map((k) => [k[0], k[i]] as [number, number]), inOut)
	const tf = `translate(${g(1)}px, ${g(2)}px) perspective(1700px) rotateX(${g(3)}deg) rotateZ(${g(4)}deg) scale(${g(5)})`
	return (
		<AbsoluteFill style={{ background: BG }}>
			<DOF tf={tf} angle={angle} focus={g(6)} band={16} blur={5} left={960 - w / 2} top={540 - h / 2} origin="50% 50%">
				<div style={{ width: w, height: h, background: P1, borderRadius: 26, boxShadow: `0 0 0 1px ${LN}`, position: "relative", overflow: "hidden", fontFamily: CJK, color: TX }}>{children}</div>
			</DOF>
			<AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,.75) 100%)" }} />
		</AbsoluteFill>
	)
}
const Side: React.FC = () => (
	<div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 300, borderRight: `1px solid ${LN}`, padding: "30px 24px", fontSize: 22 }}>
		<div style={{ display: "flex", gap: 10, marginBottom: 26 }}>{[0, 1, 2].map((i) => <div key={i} style={{ width: 13, height: 13, borderRadius: 9, background: "#2a2b2f" }} />)}</div>
		<div style={{ fontWeight: 600, marginBottom: 22 }}>MosMos ▾</div>
		{["收件箱", "我的输入", "会议记录", "热词"].map((x) => <div key={x} style={{ color: "#b4b6ba", padding: "9px 0" }}>{x}</div>)}
		<div style={{ color: DIM, fontSize: 17, marginTop: 26 }}>场景</div>
		{["飞书 / 微信", "邮件", "文档", "代码与终端"].map((x) => <div key={x} style={{ color: DIM, padding: "9px 0" }}>{x}</div>)}
	</div>
)
const Bar: React.FC<{ t: number; text: string; t0: number; w?: number }> = ({ t, text, t0, w = 1100 }) => {
	const s = typeAt(text, t, t0, 7).s
	return (
		<div style={{ width: w, height: 150, borderRadius: 22, background: P2, boxShadow: `0 0 0 1px ${LN}, 0 30px 80px rgba(0,0,0,.6)`, padding: "28px 32px", position: "relative" }}>
			<div style={{ fontSize: 34, color: s ? TX : DIM }}>{s || "问 MosMos…"}{s && s.length < text.length && <span style={{ color: "#888" }}>|</span>}</div>
			<div style={{ position: "absolute", right: 28, bottom: 24, display: "flex", alignItems: "center", gap: 16 }}>
				<Wave t={t} live={t > t0 - 0.4 && s.length < text.length} n={8} h={26} color="#c9cacd" /><div style={{ fontSize: 20, color: DIM, border: `1px solid ${LN}`, padding: "6px 14px", borderRadius: 10 }}>Fn</div>
			</div>
		</div>
	)
}
const ROWS: [string, string, number][] = [["周三前提交交互稿", "林清禾", 0], ["今天下午同步品牌素材", "周舟", 1], ["周四启动视觉设计", "李经理", 2], ["确认首页文案终稿", "小林", 3], ["整理上线检查清单", "林清禾", 4]]
const Row: React.FC<{ r: [string, string, number]; op: number; s?: number }> = ({ r, op, s = 1 }) => (
	<div style={{ display: "flex", alignItems: "center", gap: 18 * s, height: 64 * s, fontSize: 26 * s, opacity: op, borderBottom: `1px solid ${LN}` }}>
		<div style={{ width: 22 * s, height: 22 * s, borderRadius: 99, border: `3px solid ${ST[r[2]]}`, background: r[2] === 1 ? ST[1] : "transparent" }} />
		<div style={{ color: DIM, width: 110 * s, fontFamily: SANS, fontSize: 20 * s }}>MM-{120 + r[2]}</div>
		<div style={{ flex: 1 }}>{r[0]}</div><div style={{ color: DIM }}>{r[1]}</div>
	</div>
)
const Bubble: React.FC<{ me?: boolean; children: React.ReactNode; op?: number }> = ({ me, children, op = 1 }) => (
	<div style={{ alignSelf: me ? "flex-end" : "flex-start", maxWidth: 900, background: me ? "#1c1d21" : "transparent", border: me ? `1px solid ${LN}` : undefined, borderRadius: 18, padding: me ? "18px 24px" : "6px 0", fontSize: 30, lineHeight: 1.55, color: TX, opacity: op }}>{children}</div>
)
const Answer: React.FC<{ t: number; s?: number }> = ({ t, s = 1 }) => (
	<div style={{ position: "absolute", left: 360, top: 80, width: 1340 }}>
		<div style={{ fontSize: 22, color: DIM }}>问 MosMos</div>
		<div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 22 }}>
			<Bubble me>整理一下刚才的会</Bubble>
			<Bubble>整理好了：3 位发言人，12 分钟。会议结论是交互稿周三前完成、素材今天下午同步。待办如下：</Bubble>
		</div>
		<div style={{ marginTop: 16 }}>{ROWS.map((r, i) => <Row key={i} r={r} s={s} op={clamp01((t - M.rows - i * 0.45) / 0.3)} />)}</div>
	</div>
)
const Doc: React.FC<{ t: number }> = ({ t }) => (
	<div style={{ position: "absolute", left: 360, top: 70, width: 1300 }}>
		<div style={{ fontSize: 20, color: DIM }}>邮件 · 发给 李经理</div>
		<div style={{ fontFamily: HEAVY, fontWeight: 700, fontSize: 54, marginTop: 14 }}>{typeAt("首页改版周会 · 纪要与待办", t, M.doc, 14).s}</div>
		<div style={{ fontSize: 22, color: DIM, marginTop: 26 }}>概要</div>
		<div style={{ fontSize: 26, color: "#b9bbbf", marginTop: 8, lineHeight: 1.6, opacity: clamp01((t - M.doc - 1.2) / 0.4) }}>李经理，您好：本周会议确定交互稿周三前完成，品牌素材今天下午同步，素材到位后周四启动视觉设计。</div>
		<div style={{ fontSize: 22, color: DIM, marginTop: 30 }}>待办一览</div>
		<div style={{ marginTop: 10, border: `1px solid ${LN}`, borderRadius: 14 }}>
			{[["事项", "负责人", "截止"], ...ROWS.slice(0, 4).map((r) => [r[0], r[1], ["周三", "今天", "周四", "周五"][r[2]]])].map((r, i) => (
				<div key={i} style={{ display: "flex", padding: "16px 22px", borderTop: i ? `1px solid ${LN}` : undefined, fontSize: i ? 25 : 20, color: i ? TX : DIM, opacity: i ? clamp01((t - M.tab - (i - 1) * 0.5) / 0.3) : 1 }}>
					<div style={{ width: 640 }}>{r[0]}</div><div style={{ width: 300 }}>{r[1]}</div><div>{r[2]}</div></div>))}
		</div>
	</div>
)
const NODES: [string, number, number][] = [["说话人 1", 120, 150], ["说话人 2", 120, 420], ["说话人 3", 120, 690], ["逐字稿", 620, 420], ["会议总结", 1080, 250], ["待办", 1080, 590], ["邮件", 1480, 420]]
const EDGES = [[0, 3], [1, 3], [2, 3], [3, 4], [3, 5], [4, 6], [5, 6]]
const Flow: React.FC<{ t: number }> = ({ t }) => (
	<div style={{ position: "absolute", inset: 0 }}>
		<svg width={1800} height={1100} style={{ position: "absolute", inset: 0 }}>{EDGES.map(([a, b], i) => {
			const p = clamp01((t - M.flow - 0.3 - i * 0.4) / 0.6), A = NODES[a], B = NODES[b]
			const x1 = A[1] + 260, y1 = A[2] + 45, x2 = B[1], y2 = B[2] + 45, mx = (x1 + x2) / 2
			return <path key={i} d={`M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`} stroke="#3a3c42" strokeWidth={3} fill="none" strokeDasharray={1000} strokeDashoffset={1000 * (1 - p)} />
		})}</svg>
		{NODES.map(([l, x, y], i) => <div key={i} style={{ position: "absolute", left: x, top: y, width: 260, height: 90, borderRadius: 16, background: P2, boxShadow: `0 0 0 1px ${LN}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, opacity: clamp01((t - M.flow - i * 0.3) / 0.4) }}>{l}</div>)}
	</div>
)

export const Film: React.FC = () => {
	const t = useT()
	if (t < C[0]) {
		if (t < M.dark) return <Plane t={t} keys={[[0, -60, 120, 30, -22, 1.25, 30], [M.dark, 80, 60, 32, -20, 1.4, 42]]}><Side /><div style={{ position: "absolute", left: 760, top: 300, fontFamily: HEAVY, fontWeight: 700, fontSize: 60, opacity: clamp01((t - M.title) / 0.4) }}>首页改版周会</div></Plane>
		return <AbsoluteFill style={{ opacity: clamp01((t - M.dark) / 1.2) }}><Plane t={t} keys={[[M.dark, 0, -380, 36, -14, 1.4, 52], [C[0], 100, -460, 34, -12, 1.5, 55]]}><div style={{ position: "absolute", left: 360, top: 820 }}><Bar t={t} text="整理一下刚才的会" t0={M.say1} /></div></Plane></AbsoluteFill>
	}
	if (t < C[1]) return <Plane t={t} keys={[[C[0], -80, 60, 30, -14, 1.3, 40], [C[1], 40, 20, 28, -12, 1.38, 55]]}><Answer t={t} /></Plane>
	if (t < C[2]) return <Plane t={t} keys={[[C[1], 120, -300, 34, -20, 1.5, 50], [C[2], 40, -380, 32, -18, 1.6, 56]]}><Answer t={99} /><div style={{ position: "absolute", left: 360, top: 880 }}><Bar t={t} text="把待办写成邮件，发给李经理" t0={M.say2} /></div></Plane>
	if (t < C[3]) return <Plane t={t} keys={[[C[2], 0, 80, 26, -10, 1.35, 30], [C[3], -60, -60, 24, -8, 1.3, 55]]}><Doc t={t} /></Plane>
	if (t < C[4]) return <Plane t={t} keys={[[C[3], 0, 40, 40, -24, 1.0, 35], [C[4], 60, 0, 36, -20, 1.15, 60]]} angle={120}><div style={{ position: "absolute", inset: 0, background: BG }} /><Flow t={t} /></Plane>
	if (t < C[5]) return <Plane t={t} keys={[[C[4], 0, 0, 24, -12, 0.92, 45], [C[5], 40, -20, 22, -10, 1.0, 50]]}><Side /><Doc t={99} /><div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 420, background: P2, borderLeft: `1px solid ${LN}`, padding: 26 }}><div style={{ fontSize: 20, color: DIM }}>问 MosMos</div>{ROWS.map((r, i) => <Row key={i} r={r} op={1} s={0.7} />)}</div></Plane>
	if (t < C[6]) return (
		<Plane t={t} keys={[[C[5], 60, 160, 28, -16, 1.55, 40], [C[6], -40, 100, 26, -14, 1.65, 52]]}>
			<div style={{ position: "absolute", left: 360, top: 120, width: 1100, display: "flex", flexDirection: "column", gap: 26 }}>
				<Bubble me>把待办写成邮件，发给李经理</Bubble>
				<Bubble op={clamp01((t - M.reply) / 0.4)}>邮件写好了，「首页改版周会 · 纪要与待办」，4 条待办都在表里。</Bubble>
				<Bubble op={clamp01((t - M.reply - 1.3) / 0.4)}>还要我写什么？</Bubble>
				<div style={{ fontSize: 28, color: DIM, marginTop: 30, opacity: clamp01((t - M.reply - 2) / 0.4) }}>问 MosMos…</div>
			</div>
		</Plane>
	)
	if (t < M.logo) {
		const s = typeAt("MosMos。开口，就写好。", t, M.end + 0.4, 8).s, b = lerp(t, C[6], C[6] + 0.8, 14, 0)
		return <AbsoluteFill style={{ background: "#000", alignItems: "center", justifyContent: "center" }}><div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 64, color: "#e8e8ea", filter: `blur(${b}px)`, textShadow: "0 0 24px rgba(170,180,255,.45)", whiteSpace: "pre" }}>{s || "MosMos"}</div></AbsoluteFill>
	}
	return <AbsoluteFill style={{ background: "#000", alignItems: "center", justifyContent: "center" }}><div style={{ opacity: clamp01((t - M.logo) / 0.4) * clamp01((TL.dur - t) / 0.8) }}><LogoPixels size={70} t={t} mode="static" invert /></div></AbsoluteFill>
}
