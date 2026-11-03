// Template 39 — structure of OpenAI "ChatGPT for Word is now available" (2026), MosMos content.
// White title built word by word, then a document window on a bright blue desktop. The camera pushes into the
// MosMos card in the lower right while a sentence is dictated, pulls back as polished paragraphs land in the
// document, and repeats; a polish-level menu, a hot word chip, a progress checklist, a vertical word roller and the logo.
import React from "react"
import { AbsoluteFill } from "remotion"
import { CJK, lerp, clamp01, inOut, useT, LogoPixels, Wave, typeAt, path, Cursor, COPY } from "../_engine/src/mos"
import { Camera, CamKey } from "../_engine/src/kit"
import TL from "./timeline.json"

const M = TL.marks as Record<string, number>, C = TL.cuts as number[]
const INK = "#0d0d0d", DIM = "#8b8b90", BLUE = "#2f6fe8"
const fade = (t: number, a: number, b: number, d = 0.3, d2 = d) => clamp01((t - a) / d) * clamp01((b - t) / d2)
const R1 = "嗯，项目复盘，目标是把首页上线提前到周五，结果是交互稿按时完成，但是品牌素材晚了一天", R2 = "嗯，下一步今天确认视觉稿，明天开始开发"
const P = [["目标：", "将首页上线时间提前至周五。"], ["结果：", "交互稿按时完成，但品牌素材晚到一天。"], ["下一步：", "今天确认视觉稿，明天开始开发。"], ["补充：", "Nimbus 的交付节点同步到周五。"]]

const Wall: React.FC = () => <AbsoluteFill style={{ background: "radial-gradient(ellipse at 15% 110%, #2d6cf0 0%, #6f9cf6 30%, rgba(160,190,250,.6) 55%, #f4f6fb 80%)" }} />
const Bars: React.FC<{ n: number; w?: number }> = ({ n, w = 680 }) => <>{Array.from({ length: n }, (_, k) => <div key={k} style={{ height: 7, width: k % 4 === 3 ? w * 0.55 : w, background: "#d9d9dd", borderRadius: 3, margin: "9px 0" }} />)}</>
const Para: React.FC<{ t: number; at: number; k: number }> = ({ t, at, k }) => { const a = clamp01((t - at) / 0.4), hl = 1 - clamp01((t - at - 1.4) / 0.8)
	return t < at ? null : <div style={{ fontSize: 17, lineHeight: 1.7, color: INK, margin: "10px 0", opacity: a, background: `rgba(47,111,232,${0.14 * hl})`, borderLeft: `3px solid rgba(47,111,232,${hl})`, paddingLeft: 8 }}><b>{P[k][0]}</b>{k === 3 ? <><span style={{ color: BLUE }}>Nimbus</span>{P[k][1].slice(6)}</> : P[k][1]}</div> }
const Dictation: React.FC<{ t: number; raw: React.ReactNode; live: boolean; note?: boolean }> = ({ t, raw, live, note }) => <div style={{ position: "absolute", left: 1140, top: 590, width: 480, height: 300, fontFamily: CJK }}>
	{note && <div style={{ position: "absolute", left: 0, right: 0, top: -64, height: 52, borderRadius: 14, background: "#f3f3f5", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 18px", fontSize: 15, color: INK }}><span>已写入文档</span><span style={{ fontSize: 13, color: DIM, background: "#e6e6ea", padding: "4px 10px", borderRadius: 8 }}>高级润色</span></div>}
	<div style={{ position: "absolute", inset: 0, borderRadius: 18, background: "#fff", boxShadow: "0 0 0 1px #e2e2e6, 0 8px 24px rgba(0,0,0,.06)" }}>
		<div style={{ position: "absolute", left: 18, top: 16, fontSize: 13, color: BLUE, background: "#eaf1fd", padding: "5px 10px", borderRadius: 8 }}>▤ 首页改版项目复盘</div>
		<div style={{ position: "absolute", left: 18, top: 58, right: 18, fontSize: 17, lineHeight: 1.6, color: INK }}>{raw}</div>
		<div style={{ position: "absolute", left: 18, right: 14, bottom: 14, display: "flex", alignItems: "center", gap: 14, fontSize: 15, color: DIM }}>
			<span style={{ fontSize: 22, color: INK }}>＋</span><span style={{ color: BLUE }}>MosMos · 文档 ▾</span><span style={{ flex: 1 }} />
			<div style={{ width: 38, height: 38, borderRadius: 19, background: INK, display: "flex", alignItems: "center", justifyContent: "center" }}>{live ? <Wave live t={t} n={4} h={16} color="#fff" /> : <span style={{ color: "#fff", fontSize: 18 }}>↑</span>}</div></div></div></div>
const Win: React.FC<{ t: number; paras: number[]; dict?: React.ReactNode; scroll?: number }> = ({ t, paras, dict, scroll = 0 }) => <>
	<Wall />
	<div style={{ position: "absolute", left: 140, top: 70, width: 1640, height: 940, borderRadius: 14, background: "#f0f0f2", boxShadow: "0 30px 80px rgba(20,40,120,.25)", overflow: "hidden", fontFamily: CJK }}>
		<div style={{ height: 44, background: "#fbfbfc", display: "flex", alignItems: "center", gap: 8, padding: "0 16px", borderBottom: "1px solid #e4e4e8" }}>{["#ff5f57", "#febc2e", "#28c840"].map((c) => <div key={c} style={{ width: 12, height: 12, borderRadius: 6, background: c }} />)}<span style={{ marginLeft: 600, fontSize: 14, color: "#555" }}>首页改版项目复盘.docx</span></div>
		<div style={{ height: 76, background: "#fbfbfc", borderBottom: "1px solid #e4e4e8", display: "flex", alignItems: "center", gap: 26, padding: "0 24px" }}>{Array.from({ length: 22 }, (_, k) => <div key={k} style={{ width: k % 5 === 0 ? 46 : 24, height: k % 5 === 0 ? 46 : 22, borderRadius: 5, background: k % 5 === 0 ? "#e4e8f0" : "#e9e9ec" }} />)}</div>
		<div style={{ position: "absolute", left: 160, top: 140 - scroll, width: 780, minHeight: 1400, background: "#fff", boxShadow: "0 0 0 1px #e4e4e8", padding: "70px 60px", boxSizing: "border-box" }}>
			<div style={{ fontSize: 30, fontWeight: 700, color: INK }}>首页改版项目复盘</div><div style={{ fontSize: 14, color: DIM, margin: "8px 0 18px" }}>2026 年 11 月 · 小林</div>
			<Bars n={3} w={660} />
			{paras.map((at, k) => <Para key={k} t={t} at={at} k={k} />)}
			<Bars n={12} w={660} />
		</div>
		<div style={{ position: "absolute", left: 980, top: 120, width: 660, height: 780, background: "#fff", borderLeft: "1px solid #e4e4e8" }}>
			<div style={{ padding: "20px 24px", fontSize: 15, color: INK, fontWeight: 600 }}>批注</div>
			{[0, 1].map((k) => <div key={k} style={{ margin: "0 24px 16px", padding: 14, borderRadius: 10, background: "#f6f6f8" }}><Bars n={2} w={380} /></div>)}</div>
		{dict}
		<div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 40, background: "#fbfbfc", borderTop: "1px solid #e4e4e8", display: "flex", alignItems: "center", gap: 24, padding: "0 20px", fontSize: 13, color: "#666" }}><span>第 1 页，共 2 页</span><span>中文（中国）</span><span style={{ flex: 1 }} /><span>专注</span><span>130%</span></div>
	</div></>
const rawSpan = (s: string) => <>{s.startsWith("嗯，") ? <><span style={{ color: "#b0b0b5" }}>{s.slice(0, 2)}</span>{s.slice(2)}</> : s}</>

export const Film: React.FC = () => {
	const t = useT()
	const i = C.filter((c) => t >= c).length
	const Z: CamKey = [0, 2.5, 1520, 810]
	switch (i) {
		case 0: { const W = [[M.w1, "介绍"], [M.w2, " MosMos"], [M.w3, "用在"], [M.w4, "你的文档里"]] as [number, string][]
			const op = (k: number) => clamp01((t - W[k][0]) / 0.2)
			return <AbsoluteFill style={{ background: "#fff", alignItems: "center", justifyContent: "center", fontFamily: CJK, fontWeight: 700, color: INK, fontSize: 92, lineHeight: 1.25, textAlign: "center" }}>
				<div><span style={{ opacity: op(0) }}>{W[0][1]}</span><span style={{ opacity: op(1) }}>{W[1][1]}</span><br /><span style={{ opacity: op(2) }}>{W[2][1]}</span><span style={{ opacity: op(3) }}>{W[3][1]}</span></div></AbsoluteFill> }
		case 1: { const s = t < M.d1 ? "" : typeAt(R1, t, M.d1, 13).s
			return <Camera t={t} keys={[[C[0], 1.0, 960, 540], [M.zoom, 1.03, 960, 540], [M.zoom + 0.8, 2.0, 1420, 800], [C[1], 2.05, 1425, 800]]}><Win t={t} paras={[]} dict={<Dictation t={t} raw={<>{rawSpan(s)}{t < M.fn1 && <span style={{ borderLeft: "2px solid #111", marginLeft: 2 }} />}</>} live={t < M.fn1} />} /></Camera> }
		case 2: return <Camera t={t} keys={[[C[1], 1.06, 960, 540], [C[2], 1.0, 960, 540]]}><Win t={t} paras={[M.p1, M.p1 + 0.9]} dict={<Dictation t={t} raw="" live={false} />} /></Camera>
		case 3: return <Camera t={t} keys={[[C[2], 1.45, 760, 400], [C[3], 1.45, 760, 440]]}><Win t={t} paras={[0, 0]} scroll={lerp(t, C[2], C[3], 0, 60)} /></Camera>
		case 4: { const s = t < M.d2 ? "" : typeAt(R2, t, M.d2, 9).s
			return <Camera t={t} keys={[[C[3], 2.0, 1420, 800], [C[4], 2.05, 1425, 800]]}><Win t={t} paras={[0, 0]} dict={<Dictation t={t} raw={<>{rawSpan(s)}{t < M.fn2 && <span style={{ borderLeft: "2px solid #111", marginLeft: 2 }} />}</>} live={t < M.fn2} />} /></Camera> }
		case 5: return <Camera t={t} keys={[[C[4], 1.0, 960, 540], [C[5], 1.04, 960, 540]]}><Win t={t} paras={[0, 0, M.p2]} dict={<Dictation t={t} raw="" live={false} />} /></Camera>
		case 6: { const L = ["听到：嗯，下一步今天确认视觉稿，明天开始开发", "去掉口头禅「嗯」", "调整语序", "按文档场景整理成一段"]
			return <AbsoluteFill style={{ background: "#fff", fontFamily: CJK }}><div style={{ position: "absolute", right: 0, top: 0, width: 260, height: 1080, background: "linear-gradient(90deg,#fff,#a9c3f8)" }} />
				<div style={{ position: "absolute", left: 340, top: lerp(t, C[5], C[6], 150, 110), width: 1100 }}>
					{L.map((x, k) => <div key={k} style={{ fontSize: 36, color: "#b4b4b9", lineHeight: 1.9 }}>{x}</div>)}
					<div style={{ fontSize: 40, color: INK, marginTop: 26, lineHeight: 1.6 }}>已写入第 3 段：</div>
					<div style={{ fontSize: 40, color: INK, lineHeight: 1.6, paddingLeft: 30 }}>• <b>{P[2][0]}</b>{P[2][1]}</div>
					<div style={{ display: "inline-block", marginTop: 24, fontSize: 30, color: BLUE, background: "#eaf1fd", padding: "8px 18px", borderRadius: 10 }}>标准润色</div></div></AbsoluteFill> }
		case 7: { const menu = t > M.menu && t < M.menuOut, c = path(t, [[C[6], 1700, 990], [M.menu - 0.2, 1395, 948], [M.pick - 0.25, 1360, 842], [M.menuOut + 0.3, 1720, 990], [C[7], 1720, 990]])
			const s = t < M.d3 ? "" : typeAt("把 Nimbus 的交付节点同步到周五", t, M.d3, 7).s
			const raw = <>{s.slice(0, 2)}{s.length > 2 && <span style={{ color: BLUE, background: "#eaf1fd", padding: "0 4px", borderRadius: 4 }}>{s.slice(2, 8)}</span>}{s.slice(8)}{t > M.d3 && t < M.fn3 && <span style={{ borderLeft: "2px solid #111", marginLeft: 2 }} />}</>
			return <Camera t={t} keys={[[C[6], 2.0, 1420, 800], [C[7], 2.05, 1425, 800]]}><Win t={t} paras={[0, 0, 0]} dict={<><Dictation t={t} raw={raw} live={t > M.d3 && t < M.fn3} note />
				{menu && <div style={{ position: "absolute", left: 1160, top: 640, width: 260, borderRadius: 14, background: "#fff", boxShadow: "0 0 0 1px #e2e2e6, 0 12px 30px rgba(0,0,0,.12)", padding: "8px 0", fontFamily: CJK }}>
					<div style={{ fontSize: 12, color: DIM, padding: "6px 16px" }}>润色程度</div>
					{COPY.polish.map((p, k) => <div key={p.id} style={{ padding: "8px 16px", fontSize: 15, color: INK, background: k === 2 && t > M.pick - 0.3 ? "#eef3fd" : undefined }}>{p.label} <span style={{ color: DIM, fontSize: 12 }}>{p.hint}</span></div>)}</div>}
				<Cursor x={c.x - 140} y={c.y - 70} s={0.5} down={Math.abs(t - M.menu) < 0.1 || Math.abs(t - M.pick) < 0.1} /></>} /></Camera> }
		case 8: { const items: [string, number][] = [["去掉口头禅，保留原意", M.s1], ["调整语序，写成完整的一句", M.s2], ["按文档场景放进第 4 段", 99]]
			const done = items.filter(([, x]) => t > x).length
			return <AbsoluteFill style={{ background: "#fff", fontFamily: CJK }}><div style={{ position: "absolute", right: 0, top: 0, width: 300, height: 1080, background: "linear-gradient(90deg,#fff,#a9c3f8)" }} />
				<div style={{ position: "absolute", left: 160, top: 260, width: 1300, borderRadius: 26, boxShadow: "0 0 0 2px #e6e6ea", padding: "30px 44px", boxSizing: "border-box", transform: `scale(${lerp(t, C[7], C[8], 1, 1.03)})` }}>
					<div style={{ fontSize: 34, color: "#444", marginBottom: 26 }}>☰  整理中 · {done}/3 完成</div>
					{items.map(([x, at], k) => <div key={k} style={{ display: "flex", alignItems: "center", gap: 26, fontSize: 40, color: INK, lineHeight: 2 }}>
						<div style={{ width: 34, height: 34, borderRadius: 17, background: t > at ? "#2fb36b" : "transparent", boxShadow: t > at ? undefined : k === done ? "inset 0 0 0 4px #333" : "inset 0 0 0 4px #ccc", color: "#fff", fontSize: 22, display: "flex", alignItems: "center", justifyContent: "center", clipPath: t <= at && k === done ? `inset(0 0 ${50 + 50 * Math.sin(t * 6)}% 0)` : undefined }}>{t > at ? "✓" : ""}</div>{x}</div>)}</div></AbsoluteFill> }
		case 9: return <Camera t={t} keys={[[C[8], 1.0, 960, 540], [C[9], 1.05, 960, 545]]}><Win t={t} paras={[0, 0, 0, M.p3]} dict={<Dictation t={t} raw="" live={false} note />} /></Camera>
		default: {
			if (t >= M.logo) return <AbsoluteFill style={{ background: "#fff", alignItems: "center", justifyContent: "center" }}><div style={{ opacity: clamp01((t - M.logo) / 0.3) }}><LogoPixels size={230} t={t} mode="static" /></div></AbsoluteFill>
			const WD = ["消息", "邮件", "提示词", "命令", "纪要", "文档"], p = lerp(t, M.roll, M.rollEnd, 0, WD.length - 1, (x) => x), sw = clamp01((t - M.start) / 0.3)
			return <AbsoluteFill style={{ background: "#fff", fontFamily: CJK, fontWeight: 700, color: INK }}>
				<div style={{ opacity: 1 - sw, position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }}>
					<div style={{ position: "absolute", right: 1000, top: 540 - 56, fontSize: 84, whiteSpace: "nowrap" }}>用 MosMos 写</div>
					{WD.map((w, k) => { const d = k - p; return Math.abs(d) > 3 ? null : <div key={k} style={{ position: "absolute", left: 960, top: 540 - 56 + d * 118, fontSize: 84, color: Math.abs(d) < 0.5 ? INK : "#c4c4c8", opacity: 1 - Math.abs(d) * 0.3 }}>{w}</div> })}</div>
				<AbsoluteFill style={{ opacity: sw, alignItems: "center", justifyContent: "center" }}><div style={{ fontSize: 92 }}>现在，开口就好</div>
					<div style={{ display: "flex", gap: 22, marginTop: 40, fontWeight: 500 }}>{["macOS", "Windows"].map((x, k) => <div key={x} style={{ fontSize: 40, padding: "12px 30px", borderRadius: 16, background: "#f2f2f4", opacity: clamp01((t - [M.pl1, M.pl2][k]) / 0.25), transform: `scale(${0.8 + 0.2 * clamp01((t - [M.pl1, M.pl2][k]) / 0.25)})` }}>{x}</div>)}</div></AbsoluteFill>
			</AbsoluteFill> }
	}
}
