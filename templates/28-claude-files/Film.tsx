// Template 28 — structure of Anthropic "Claude can create and edit files" (2025), MosMos content.
// A hand-drawn whiteboard opens on beige; then large warm-white UI close-ups: a meeting is recorded with hot words
// dropped in, the transcript streams, a grey overlay shows MosMos organising it into a summary and todos, the notes
// open as a document, a spoken addition is polished into the doc, a status cell in a progress sheet is filled by
// voice, and a grid of line icons gathers into the pixel logo.
import React from "react"
import { AbsoluteFill } from "remotion"
import { CJK, MONO, lerp, clamp01, inOut, useT, Wave, LogoPixels, Wordmark, Cursor, path, Pill, COPY } from "../_engine/src/mos"
import { Camera, CamKey } from "../_engine/src/kit"
import TL from "./timeline.json"

const M = TL.marks as Record<string, number>, C = TL.cuts
const BG = "#e2d8c7", WIN = "#faf8f4", INKC = "#25221e", DIM = "#8b867d", LN = "#e6e0d5", ORG = "#d9774a", HL = "#f3cdb8", GRY = "#efece5"
const SERIF = "'Noto Serif CJK SC', 'Noto Serif SC', serif"
const SAY = "开个短会：首页改版这周要定交付顺序，林清禾和 Nimbus 那边都在。"
const HOT = ["林清禾", "Nimbus", "Figma"]
const ADD_RAW = "嗯，补一句，那个，素材到了以后周四就开始做视觉，不对，是周四开始视觉方案。"
const ADD_OUT = "补充：素材到位后，周四开始视觉方案。"
const k = (t: number, a: number, d = 0.35) => clamp01((t - a) / d)

// ---------- hand-drawn pieces
const Draw: React.FC<{ d: string; p: number; w?: number; c?: string; len?: number }> = ({ d, p, w = 7, c = INKC, len = 1400 }) => <path d={d} stroke={c} strokeWidth={w} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={len} strokeDashoffset={len * (1 - clamp01(p))} />
const Opener: React.FC<{ t: number }> = ({ t }) => {
	const z = lerp(t, 1.6, C[0], 1, 0.86, inOut)
	return <AbsoluteFill style={{ background: BG }}><svg width={1920} height={1080} style={{ transform: `scale(${z})`, transformOrigin: "50% 45%" }}>
		<Draw d="M640,250 L1280,250" p={k(t, 0.05, 0.4)} w={9} />
		<Draw d="M960,250 L960,215 M945,215 A15,15 0 1 1 975,215" p={k(t, 0.4, 0.3)} w={7} len={200} />
		<path d="M660,256 L1260,256 L1260,640 L660,640 Z" fill="#fbfaf6" opacity={k(t, 0.55, 0.3)} />
		<Draw d="M660,256 L660,640 L1260,640 L1260,256" p={k(t, 0.5, 0.45)} w={8} />
		<Draw d="M750,540 L860,440 L990,500 L1150,380" p={k(t, 0.95, 0.55)} w={10} />
		{[[750, 540], [860, 440], [990, 500], [1150, 380]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={18 * k(t, 1.0 + i * 0.14, 0.15)} fill={INKC} />)}
		<Draw d="M960,640 L960,700" p={k(t, 0.85, 0.2)} w={8} len={80} />
		<Draw d="M890,705 L1030,705 L1020,800 Q960,830 900,800 Z M1030,725 Q1075,735 1065,765 Q1055,790 1022,785" p={k(t, 0.2, 0.9)} w={8} len={900} />
		<Draw d="M930,690 Q915,660 935,635 M975,690 Q960,655 985,630" p={k(t, 1.3, 0.5)} w={6} len={160} c={ORG} />
	</svg></AbsoluteFill>
}
// ---------- home / record box
const Home: React.FC<{ t: number; zoom?: boolean }> = ({ t, zoom }) => {
	const n = Math.floor(clamp01((t - M.say) / (M.said - M.say)) * Array.from(SAY).length)
	const s = Array.from(SAY).slice(0, n).join("")
	const dz = k(t, M.drag, 0.3), dropped = t > M.drop, rec = t > M.rec
	const hl = (x: string) => x.split(/(首页改版)/).map((p, i) => p === "首页改版" ? <span key={i} style={{ background: HL, borderRadius: 4 }}>{p}</span> : <span key={i}>{p}</span>)
	const cur = path(t, [[M.drag, 1700, 800], [M.drop - 0.1, 1330, 520], [M.drop + 0.5, 1330, 520], [M.rec - 0.4, 1390, 640], [M.rec, 1392, 648]])
	return <AbsoluteFill style={{ background: WIN, fontFamily: CJK, color: INKC }}>
		<div style={{ position: "absolute", top: 290, width: 1920, display: "flex", justifyContent: "center", alignItems: "center", gap: 26, fontFamily: SERIF, fontSize: 78 }}><LogoPixels size={66} t={t} mode="static" />开会前，先喝杯咖啡？</div>
		<div style={{ position: "absolute", left: 360, top: 440, width: 1200, minHeight: 230, borderRadius: 28, background: "#fff", boxShadow: `0 0 0 2px ${LN}, 0 10px 30px rgba(80,60,20,.06)`, padding: "30px 36px" }}>
			<div style={{ fontSize: 34, lineHeight: 1.5, color: s ? INKC : "#aaa398", minHeight: 102 }}>{s ? hl(s) : "按 Fn + Shift 开始记录会议"}{s && t < M.said + 0.4 && <span style={{ color: "#bbb" }}>|</span>}</div>
			{dropped && <div style={{ display: "flex", gap: 14, marginTop: 6 }}>{HOT.map((h) => <div key={h} style={{ fontSize: 24, padding: "8px 16px", borderRadius: 12, background: "#f5efe6", boxShadow: `0 0 0 1px ${LN}` }}>热词 · {h}</div>)}</div>}
			<div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 20 }}>
				<div style={{ fontSize: 24, color: DIM, border: `1px solid ${LN}`, borderRadius: 10, padding: "4px 14px" }}>＋</div><div style={{ fontSize: 24, color: DIM }}>会议记录 · 区分说话人</div><div style={{ flex: 1 }} />
				<Wave t={t} live={t > M.say && t < M.said} n={8} h={30} color={INKC} />
				<div style={{ height: 56, borderRadius: 14, background: ORG, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, padding: "0 22px", transform: `scale(${Math.abs(t - M.rec) < 0.1 ? 0.92 : 1})` }}>{rec ? "● 记录中" : "开始记录"}</div>
			</div>
			{dz > 0 && !dropped && <div style={{ position: "absolute", inset: 0, borderRadius: 28, background: `rgba(222,236,250,${0.94 * dz})`, border: "3px dashed #9cc0e6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, color: "#3d7cc0" }}>松开，加入这场会的热词</div>}
		</div>
		<div style={{ position: "absolute", top: 760, width: 1920, display: "flex", justifyContent: "center", gap: 16 }}>{["飞书 / 微信", "邮件", "文档", "提示词", "代码与终端"].map((x) => <div key={x} style={{ fontSize: 24, color: "#5d5850", border: `1px solid ${LN}`, borderRadius: 12, padding: "10px 18px", background: "#fff" }}>{x}</div>)}</div>
		{dz > 0 && !dropped && <div style={{ position: "absolute", left: cur.x - 150, top: cur.y - 70 }}>{HOT.map((h, i) => <div key={h} style={{ position: "absolute", left: i * 18, top: i * 14, width: 150, height: 180, borderRadius: 12, background: "#fff", boxShadow: "0 6px 18px rgba(0,0,0,.15)", padding: 14, fontSize: 22 }}>热词<div style={{ marginTop: 12, fontWeight: 600 }}>{h}</div></div>)}<div style={{ position: "absolute", left: 160, top: 160, width: 40, height: 40, borderRadius: 20, background: "#e0473a", color: "#fff", fontSize: 24, display: "flex", alignItems: "center", justifyContent: "center" }}>3</div></div>}
		{t > M.drag && <Cursor x={cur.x} y={cur.y} down={Math.abs(t - M.rec) < 0.1} s={1.4} />}
	</AbsoluteFill>
}
// ---------- transcript shots
const LINES = [...COPY.meeting, ["说话人 1", "10:09", "那首页的交付顺序就按素材、交互、视觉来。"], ["说话人 2", "10:11", "我下午把 Figma 链接也发到群里。"]]
const SPK = ["#d9774a", "#6b8f71", "#5f7fb4"]
const Transcript: React.FC<{ t: number; t0: number; n0: number; big?: boolean }> = ({ t, t0, n0, big }) => (
	<AbsoluteFill style={{ background: WIN, fontFamily: CJK, color: INKC, padding: big ? "150px 300px" : "90px 260px" }}>
		<div style={{ borderRadius: 26, background: GRY, padding: "34px 40px" }}>
			{LINES.slice(0, n0 + Math.floor(Math.max(0, t - t0) / 0.8) + 1).slice(-4).map(([w, tm, s], i) => <div key={tm} style={{ display: "flex", gap: 20, marginBottom: 22, fontSize: big ? 36 : 32, lineHeight: 1.5 }}>
				<div style={{ width: 44, height: 44, flexShrink: 0, borderRadius: 12, background: SPK[Number(w.slice(-1)) - 1], color: "#fff", fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 6 }}>{w.slice(-1)}</div>
				<div><span style={{ fontSize: 22, color: DIM }}>{w} · {tm}</span><br />{s}</div></div>)}
		</div>
		<div style={{ marginTop: 26, marginLeft: 20 }}><Wave t={t} live n={9} h={34} color={ORG} /></div>
	</AbsoluteFill>
)
const Overlay: React.FC<{ t: number; mode: "head" | "code" | "list" }> = ({ t, mode }) => (
	<AbsoluteFill style={{ background: WIN }}>
		<div style={{ position: "absolute", inset: 0, filter: "blur(6px)", opacity: 0.8 }}><Transcript t={C[4]} t0={C[4]} n0={4} /></div>
		<AbsoluteFill style={{ background: "rgba(70,66,60,.58)" }} />
		{mode !== "list" ? <div style={{ position: "absolute", left: 300, top: mode === "head" ? 380 : 210, width: 1320, borderRadius: 26, background: "#fbfaf7", padding: "26px 34px", fontFamily: CJK, boxShadow: "0 20px 60px rgba(0,0,0,.25)" }}>
			<div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 36, color: mode === "head" ? INKC : "#a39e95" }}><span style={{ fontFamily: MONO }}>▤</span>会议结束，正在整理总结和待办…<span style={{ flex: 1 }} />⌃</div>
			{mode === "code" && <div style={{ marginTop: 18, borderRadius: 16, background: "#eef3e6", padding: "20px 26px", fontFamily: MONO, fontSize: 30, lineHeight: 1.6, color: "#5f8a4c", height: 420, overflow: "hidden" }}>
				<div style={{ transform: `translateY(${-(t - C[5]) * 40}px)` }}>{LINES.map(([w, tm, s]) => <div key={tm}>[{tm}] {w}：{s}</div>)}<div>— 3 位说话人 · 逐字稿已保存</div></div>
			</div>}
		</div> : <div style={{ position: "absolute", left: 300, top: 230, width: 1320, fontFamily: CJK }}>
			<div style={{ borderRadius: 26, background: "#fbfaf7", padding: "26px 34px", fontSize: 36, display: "flex", gap: 20 }}><span style={{ fontFamily: MONO }}>▤</span>会议结束，正在整理总结和待办…<span style={{ flex: 1 }} />⌄</div>
			<div style={{ marginTop: 26, borderRadius: 26, background: "#fbfaf7", padding: "10px 34px" }}>{COPY.meetingFeatures.map(([a, b], i) => <div key={a} style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 34, padding: "22px 0", opacity: k(t, C[6] + 0.3 + i * 1.0, 0.3) }}><span style={{ color: t > C[6] + 1.0 + i * 1.0 ? "#5f8a4c" : DIM }}>{t > C[6] + 1.0 + i * 1.0 ? "✓" : "◌"}</span>正在{a === "多人逐字稿" ? "整理多人逐字稿" : a === "会议总结" ? "生成会议总结" : "提取待办事项"}<span style={{ flex: 1 }} /><span style={{ fontSize: 24, color: DIM }}>{b}</span></div>)}</div>
		</div>}
	</AbsoluteFill>
)
// ---------- result window + document
const SUM = ["首页改版周会 · 会议纪要", "结论：交付顺序按素材、交互、视觉推进。", "待办：", ...COPY.todos.map((x) => "· " + x)]
const OWN = ["小林", "林清禾", "小林"], DUE = ["今天", "周三", "周四"]
const Result: React.FC<{ t: number }> = ({ t }) => {
	const cur = path(t, [[C[7], 1500, 900], [M.open - 0.4, 1250, 690], [M.open, 1252, 694], [C[8], 1252, 694]])
	return <AbsoluteFill style={{ background: BG }}>
		<div style={{ position: "absolute", left: 170, top: 70, width: 1580, height: 940, borderRadius: 18, background: WIN, boxShadow: "0 30px 80px rgba(80,60,20,.18)", overflow: "hidden", fontFamily: CJK, color: INKC }}>
			<div style={{ height: 60, borderBottom: `1px solid ${LN}`, display: "flex", alignItems: "center", padding: "0 26px", gap: 16, fontSize: 22 }}><LogoPixels size={26} t={t} mode="static" />MosMos · 会议记录<span style={{ color: DIM }}> › 首页改版周会</span></div>
			<div style={{ position: "absolute", left: 240, top: 100, width: 1100, fontSize: 30, lineHeight: 1.7 }}>
				{SUM.map((s, i) => <div key={i} style={{ fontWeight: i === 0 ? 700 : 400, fontFamily: i === 0 ? SERIF : CJK, fontSize: i === 0 ? 40 : 30, marginBottom: i === 0 ? 14 : 0 }}>{s}</div>)}
				<div style={{ marginTop: 34, display: "flex", alignItems: "center", gap: 22, border: `1px solid ${LN}`, borderRadius: 18, padding: "20px 26px", background: "#fff", width: 760 }}>
					<div style={{ width: 52, height: 64, border: `2px solid ${DIM}`, borderRadius: 6 }} /><div style={{ flex: 1, fontSize: 26 }}>首页改版周会纪要<div style={{ fontSize: 20, color: DIM }}>文档 · 总结与待办</div></div>
					<div style={{ fontSize: 24, border: `1px solid ${LN}`, borderRadius: 12, padding: "10px 22px", background: Math.abs(t - M.open) < 0.15 ? "#efe9df" : "#fff" }}>打开</div>
				</div>
				<div style={{ marginTop: 26 }}><LogoPixels size={34} t={t} mode="spin" /></div>
			</div>
			<div style={{ position: "absolute", left: 240, bottom: 40, width: 1100, height: 110, borderRadius: 22, background: "#fff", boxShadow: `0 0 0 1px ${LN}`, padding: "20px 26px", fontSize: 24, color: "#aaa398" }}>按 Fn 说出你的回复…</div>
		</div>
		<Cursor x={cur.x} y={cur.y} down={Math.abs(t - M.open) < 0.1} s={1.4} />
	</AbsoluteFill>
}
const Doc: React.FC<{ t: number; added?: number; size?: number }> = ({ t, added = 0, size = 1 }) => (
	<div style={{ width: 1920, background: "#fff", fontFamily: CJK, color: INKC }}>
		<div style={{ height: 64, background: "#f6f4f0", borderBottom: `1px solid ${LN}`, display: "flex", alignItems: "center", gap: 26, padding: "0 30px", fontSize: 22, color: "#5d5850" }}>{["↶", "↷", "🖨", "100%", "正文 ▾", "思源宋体 ▾", "— 16 +", "B", "I", "U", "A", "🔗", "☰"].map((x, i) => <span key={i}>{x}</span>)}</div>
		<div style={{ padding: `${70 * size}px ${330}px`, fontSize: 30 * size, lineHeight: 1.75 }}>
			<div style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 52 * size, color: "#2f4f7a" }}>首页改版周会 · 会议纪要</div>
			<div style={{ fontSize: 24 * size, color: DIM, marginBottom: 20 }}>3 位说话人 · 逐字稿已保存在 MosMos</div>
			<div style={{ fontWeight: 700, fontSize: 34 * size, color: "#2f4f7a" }}>会议背景</div>
			<div>首页改版进入交付阶段，需要确认素材、交互和视觉的顺序。</div>
			<div style={{ fontWeight: 700, fontSize: 34 * size, color: "#2f4f7a", marginTop: 16 }}>关键结论</div>
			<div>交付计划不变，按素材、交互、视觉的顺序推进。</div>
			{added > 0 && <div style={{ background: `rgba(243,205,184,${0.9 * added})`, display: "inline-block", borderRadius: 6, padding: "0 6px" }}>{Array.from(ADD_OUT).slice(0, Math.ceil(added * Array.from(ADD_OUT).length)).join("")}</div>}
			<div style={{ fontWeight: 700, fontSize: 34 * size, color: "#2f4f7a", marginTop: 16 }}>待办事项</div>
			<div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", border: `1px solid ${LN}`, fontSize: 28 * size }}>{[["事项", "负责人", "时间"], ...COPY.todos.map((x, i) => [x, OWN[i], DUE[i]])].map((r, i) => r.map((c, j) => <div key={i + "-" + j} style={{ padding: "12px 18px", borderTop: i ? `1px solid ${LN}` : undefined, background: i ? "#fff" : "#eef2f8", fontWeight: i ? 400 : 600 }}>{c}</div>))}</div>
		</div>
	</div>
)
// ---------- spreadsheet
const ROWS = [["今天同步品牌素材", "小林", "今天", "已完成"], ["周三前提交交互稿", "林清禾", "周三", "进行中"], ["周四启动视觉设计", "小林", "周四", ""], ["确认首页文案", "周舟", "周四", ""], ["上线检查清单", "小林", "周五", ""]]
const Sheet: React.FC<{ t: number }> = ({ t }) => {
	const fill = clamp01((t - M.cellSay) / (M.cellDone - M.cellSay)), done = t > M.cellDone
	const val = (r: number, c: number) => r === 2 && c === 3 ? (t > M.cellSay ? Array.from("准备中").slice(0, Math.ceil(fill * 3)).join("") : "") : ROWS[r][c]
	return <div style={{ width: 1600, height: 900, background: "#fff", fontFamily: CJK, color: INKC, borderRadius: 16, overflow: "hidden", boxShadow: "0 30px 80px rgba(80,60,20,.18)" }}>
		<div style={{ height: 56, background: "#f3f1ec", display: "flex", alignItems: "center", gap: 22, padding: "0 24px", fontSize: 20, color: "#5d5850" }}>首页改版进度表<span style={{ flex: 1 }} />{["↶", "B", "I", "Σ", "▦"].map((x) => <span key={x}>{x}</span>)}</div>
		<div style={{ padding: "40px 60px" }}>
			<div style={{ fontSize: 36, fontWeight: 700, marginBottom: 20 }}>首页改版 · 待办进度</div>
			<div style={{ display: "grid", gridTemplateColumns: "560px 220px 200px 260px", fontSize: 28 }}>
				{["事项", "负责人", "时间", "状态"].map((h) => <div key={h} style={{ background: "#2f4f7a", color: "#fff", padding: "12px 16px", fontWeight: 600 }}>{h}</div>)}
				{ROWS.map((r, i) => r.map((_, j) => { const sel = i === 2 && j === 3 && t > M.cell; return <div key={i + "-" + j} style={{ padding: "14px 16px", borderBottom: `1px solid ${LN}`, borderRight: `1px solid ${LN}`, height: 64, background: sel ? (done ? "#fff4b8" : "#e8f0fb") : "#fff", boxShadow: sel ? "inset 0 0 0 3px #3d7cc0" : undefined }}>{val(i, j)}</div> }))}
			</div>
		</div>
	</div>
}
// ---------- icons + logo
const ICONS = ["M20,80 L20,20 M20,80 L90,80 M28,70 L48,46 L62,58 L86,28 M76,28 L86,28 L86,38", "M22,14 L70,14 L70,86 L22,86 Z M32,30 L60,30 M32,44 L60,44 M32,58 L50,58", "M20,24 L84,24 L84,70 L20,70 Z M32,48 A10,10 0 1 1 52,48 A10,10 0 1 1 32,48 M60,40 L76,40 M60,52 L76,52",
	"M14,22 L90,22 L90,82 L14,82 Z M14,36 L90,36 M30,46 L74,46 L74,74 L30,74 Z M30,58 L74,58 M52,46 L52,74", "M40,30 L40,62 Q40,74 52,74 Q64,74 64,62 L64,30 Q64,18 52,18 Q40,18 40,30 Z M30,58 Q30,86 52,86 Q74,86 74,58 M52,86 L52,96", "M24,24 L40,24 L40,40 L24,40 Z M28,32 L32,36 L38,28 M24,52 L40,52 L40,68 L24,68 Z M50,32 L86,32 M50,60 L86,60",
	"M26,20 L66,20 L78,32 L78,86 L26,86 Z M66,20 L66,32 L78,32 M18,28 L18,92 L70,92", "M18,86 L18,64 L32,64 L32,86 M42,86 L42,50 L56,50 L56,86 M66,86 L66,34 L80,34 L80,86 M20,44 Q50,40 76,16 M66,16 L76,16 L76,26", "M16,20 L88,20 L88,66 L16,66 Z M52,66 L52,76 M36,90 L52,76 L68,90 M32,34 L72,34 M32,48 L60,48"]
const Icons: React.FC<{ t: number }> = ({ t }) => {
	const g = inOut(clamp01((t - M.gather) / 0.45))
	if (t < M.grid) return <AbsoluteFill style={{ background: BG, alignItems: "center", justifyContent: "center" }}><svg width={300} height={300} viewBox="0 0 100 100"><Draw d={ICONS[3]} p={k(t, C[18], 0.5)} w={3} len={500} /></svg></AbsoluteFill>
	return <AbsoluteFill style={{ background: BG }}>{ICONS.map((d, i) => {
		const x = 960 + ((i % 3) - 1) * 330, y = 540 + (Math.floor(i / 3) - 1) * 250, a = k(t, M.grid + i * 0.12, 0.3)
		return <svg key={i} width={170} height={170} viewBox="0 0 100 100" style={{ position: "absolute", left: lerp(g, 0, 1, x, 960) - 85, top: lerp(g, 0, 1, y, 540) - 85, opacity: (1 - g), transform: `scale(${(i === 4 ? 1 : 1) * (1 - g * 0.8)})` }}><Draw d={d} p={a} w={3} len={500} /></svg>
	})}</AbsoluteFill>
}
const End: React.FC<{ t: number }> = ({ t }) => {
	const a = inOut(clamp01((t - M.logo) / 0.45)), d = clamp01((t - M.gather - 0.3) / 0.4)
	return <AbsoluteFill style={{ background: BG, alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 30 * a }}>
		<div style={{ transform: `scale(${t < M.logo ? lerp(d, 0, 1, 0.3, 1.25) : lerp(a, 0, 1, 1.25, 1)}) rotate(${t < M.logo ? (1 - d) * 90 : 0}deg)` }}><LogoPixels size={100} t={t} mode="static" /></div>
		<div style={{ width: a * 470, overflow: "hidden", opacity: a }}><Wordmark size={116} color={INKC} /></div>
	</AbsoluteFill>
}
export const Film: React.FC = () => {
	const t = useT()
	if (t < C[0]) return <Opener t={t} />
	if (t < C[1]) return <Camera t={t} keys={[[C[0], 1, 960, 540], [M.drag - 0.3, 1.06, 960, 560], [M.drag + 0.4, 1.12, 960, 600], [C[1], 1.14, 960, 600]]}><Home t={t} /></Camera>
	if (t < C[2]) return <Camera t={t} keys={[[C[1], 1.25, 1000, 600], [C[2], 1.3, 1100, 620]]}><Home t={t} /></Camera>
	if (t < C[3]) return <Camera t={t} keys={[[C[2], 1.0, 960, 540], [C[3], 1.06, 960, 520]]}><Transcript t={t} t0={C[2]} n0={0} /></Camera>
	if (t < C[4]) return <Camera t={t} keys={[[C[3], 1.15, 900, 500], [C[4], 1.2, 900, 560]]}><Transcript t={t} t0={C[3]} n0={2} big /></Camera>
	if (t < C[5]) return <Overlay t={t} mode="head" />
	if (t < C[6]) return <Camera t={t} keys={[[C[5], 1.0, 960, 540], [C[6], 1.05, 960, 560]]}><Overlay t={t} mode="code" /></Camera>
	if (t < C[7]) return <Camera t={t} keys={[[C[6], 1.0, 960, 540], [C[7], 1.04, 960, 520]]}><Overlay t={t} mode="list" /></Camera>
	if (t < C[8]) return <Camera t={t} keys={[[C[7], 1.0, 960, 540], [C[8], 1.05, 980, 560]]}><Result t={t} /></Camera>
	if (t < C[9]) return <AbsoluteFill style={{ background: BG }}><div style={{ position: "absolute", left: 270, top: 100, transform: "scale(0.72)", transformOrigin: "0 0", borderRadius: 20, overflow: "hidden", boxShadow: "0 30px 80px rgba(80,60,20,.2)" }}><Doc t={t} /></div></AbsoluteFill>
	if (t < C[10]) return <AbsoluteFill style={{ background: "#fff" }}><div style={{ transform: `translateY(${-lerp(t, C[9], C[10], 0, 160)}px)` }}><Doc t={t} /></div></AbsoluteFill>
	if (t < C[11]) return <AbsoluteFill style={{ background: BG }}><div style={{ position: "absolute", left: 180, top: 60, transform: "scale(0.82)", transformOrigin: "0 0", borderRadius: 20, overflow: "hidden" }}><Doc t={t} /></div></AbsoluteFill>
	if (t < C[13]) {
		const ad = t < C[12] ? clamp01((t - M.dictEnd) / 0.7) : 1
		const raw = Array.from(ADD_RAW), n = Math.floor(clamp01((t - M.dict - 0.2) / (M.dictEnd - M.dict - 0.4)) * raw.length)
		const close = t >= C[12]
		return <AbsoluteFill style={{ background: "#fff" }}>
			<Camera t={t} keys={close ? [[C[12], 1.9, 760, 760], [C[13], 1.95, 760, 770]] : [[C[11], 1.35, 960, 560], [C[12], 1.42, 960, 590]]}><div style={{ transform: "translateY(-100px)" }}><Doc t={t} added={ad} /></div>
				{t > M.dict - 0.3 && <div style={{ position: "absolute", left: 560, top: 860 }}><Pill t={t} state={t < M.dictEnd ? "语音输入" : t < M.dictEnd + 0.6 ? "润色中" : "已写好"} sub="场景：文档 · 标准润色" live={t < M.dictEnd} scale={1.25} /></div>}
				{t > M.dict && t < M.dictEnd + 0.5 && <div style={{ position: "absolute", left: 420, top: 960, width: 1080, fontSize: 26, color: DIM, fontFamily: CJK }}>{raw.slice(0, n).join("")}</div>}
			</Camera></AbsoluteFill>
	}
	if (t < C[14]) return <AbsoluteFill style={{ background: "#fff" }}>
		<div style={{ position: "absolute", inset: 0, filter: "blur(6px)" }}><div style={{ transform: "translateY(-100px) scale(1.2)" }}><Doc t={t} added={1} /></div></div><AbsoluteFill style={{ background: "rgba(70,66,60,.58)" }} />
		<div style={{ position: "absolute", left: 300, top: 260, width: 1320, borderRadius: 26, background: "#fbfaf7", padding: "30px 40px", fontFamily: CJK, color: INKC }}>
			<div style={{ fontSize: 26, color: DIM }}>原话</div><div style={{ fontSize: 32, lineHeight: 1.6, color: "#a39e95", textDecoration: "line-through", textDecorationColor: "rgba(200,80,60,.5)" }}>{ADD_RAW}</div>
			<div style={{ fontSize: 26, color: DIM, marginTop: 24 }}>润色后 · 文档</div><div style={{ fontSize: 38, lineHeight: 1.6, opacity: k(t, C[13] + 0.4, 0.4) }}>{ADD_OUT}</div>
		</div></AbsoluteFill>
	if (t < C[15]) return <AbsoluteFill style={{ background: "#fff" }}><Camera t={t} keys={[[C[14], 1.25, 900, 640], [C[15], 1.3, 900, 650]]}><div style={{ transform: "translateY(-100px)" }}><Doc t={t} added={1} /></div></Camera></AbsoluteFill>
	if (t < C[16]) return <AbsoluteFill style={{ background: BG }}><div style={{ position: "absolute", left: 160, top: 90, transform: `scale(${lerp(t, C[15], C[16], 0.6, 0.5)})`, transformOrigin: "50% 30%", width: 1600, borderRadius: 20, overflow: "hidden", boxShadow: "0 30px 80px rgba(80,60,20,.2)" }}><Doc t={t} added={1} /></div></AbsoluteFill>
	if (t < C[18]) {
		const cur = path(t, [[C[16], 1500, 950], [M.cell - 0.4, 1230, 525], [M.cell, 1232, 528], [C[18], 1240, 540]])
		const close = t >= C[17]
		return <AbsoluteFill style={{ background: BG }}><Camera t={t} keys={close ? [[C[17], 1.9, 1120, 530], [C[18], 2.0, 1140, 540]] : [[C[16], 1.0, 960, 540], [C[17], 1.12, 1050, 540]]}>
			<div style={{ position: "absolute", left: 160, top: 90 }}><Sheet t={t} /></div>
			{t > M.cellSay - 0.4 && <div style={{ position: "absolute", left: 1180, top: 720 }}><Pill t={t} state={t < M.cellDone ? "语音输入" : "已写好"} sub="场景：表格 · 原样直出" live={t < M.cellDone} scale={0.9} /></div>}
			<Cursor x={cur.x} y={cur.y} down={Math.abs(t - M.cell) < 0.1} s={1.2} />
		</Camera></AbsoluteFill>
	}
	if (t < M.gather + 0.45) return <Icons t={t} />
	return <End t={t} />
}
