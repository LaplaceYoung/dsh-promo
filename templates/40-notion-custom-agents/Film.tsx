// Template 40 — structure of Notion "Meet Custom Agents: Your 24/7 AI Team" (2026), MosMos content.
// Cream paper, a conveyor belt of things you would otherwise type, a scattered pile, big black lines of type,
// cross-hatched hands placing bold round scene icons, kanban and list UIs, a navy night full of flying icons,
// a download button and the logo.
import React from "react"
import { AbsoluteFill } from "remotion"
import { CJK, lerp, clamp01, inOut, useT, LogoPixels, Wordmark, Cursor, path, COPY, SCENES } from "../_engine/src/mos"
import { rand } from "../_engine/src/kit"
import TL from "./timeline.json"

const M = TL.marks as Record<string, number>, C = TL.cuts as number[]
const BG = "#f6f5f2", INK = "#111", NAVY = "#050838", DIM = "#8d8a84"
const TASKS = ["回复客户的微信", "给李经理写邮件", "整理周会纪要", "给 AI 写一段提示词", "写项目复盘", "记下今天的待办", "在终端里查文件", "回复群里的提问", "写周报", "补充评审意见", "改一版产品文案", "给设计同步需求"]
const COL = ["#9b6bf2", "#f0883a", "#20a39a", "#4f7cf0", "#e2557a"]
const fade = (t: number, a: number, b: number, d = 0.3, d2 = d) => clamp01((t - a) / d) * clamp01((b - t) / d2)
const Tag: React.FC<{ s: string; fs?: number; style?: React.CSSProperties }> = ({ s, fs = 34, style }) => <div style={{ display: "inline-flex", alignItems: "center", gap: fs * 0.4, padding: `${fs * 0.35}px ${fs * 0.55}px`, background: "#fff", borderRadius: fs * 0.3, boxShadow: `0 0 0 ${fs * 0.06}px ${INK}`, fontFamily: CJK, fontSize: fs, color: INK, whiteSpace: "nowrap", ...style }}><span style={{ width: fs * 0.6, height: fs * 0.6, borderRadius: fs * 0.1, boxShadow: `inset 0 0 0 ${fs * 0.07}px ${INK}` }} />{s}</div>
const Glyph: React.FC<{ k: number; s: number }> = ({ k, s }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth={2.2} strokeLinejoin="round" strokeLinecap="round">
	{k % 5 === 0 && <path d="M4 5h16v11H10l-4 3v-3H4z" fill="#fff" />}{k % 5 === 1 && <><rect x="3" y="6" width="18" height="12" rx="1.5" fill="#fff" /><path d="M3 7l9 6 9-6" /></>}
	{k % 5 === 2 && <><path d="M6 3h9l4 4v14H6z" fill="#fff" /><path d="M9 11h7M9 15h7" /></>}{k % 5 === 3 && <><rect x="4" y="4" width="16" height="16" rx="3" fill="#fff" /><path d="M8 12l3 3 5-6" /></>}
	{k % 5 === 4 && <><rect x="3" y="5" width="18" height="14" rx="2" fill="#fff" /><path d="M7 10l3 2-3 2M12 15h5" /></>}</svg>
const Icon: React.FC<{ k: number; x: number; y: number; r?: number; op?: number; trail?: number }> = ({ k, x, y, r = 100, op = 1, trail = 0 }) => <div style={{ position: "absolute", left: x - r, top: y - r, width: r * 2, height: r * 2, opacity: op }}>
	{trail > 0 && [0, 1, 2].map((j) => <div key={j} style={{ position: "absolute", right: r * 2.3 + j * r * 0.3, top: r * (0.5 + j * 0.45), width: trail * (0.6 + 0.3 * j), height: 5, borderRadius: 3, background: COL[k % 5], opacity: 0.8, backgroundImage: `repeating-linear-gradient(90deg, ${COL[k % 5]} 0 ${r * 0.5}px, transparent ${r * 0.5}px ${r * 0.7}px)` }} />)}
	<div style={{ width: r * 2, height: r * 2, borderRadius: r, background: COL[k % 5], boxShadow: `inset 0 0 0 ${r * 0.09}px ${INK}`, display: "flex", alignItems: "center", justifyContent: "center" }}><Glyph k={k} s={r * 1.1} /></div></div>
const Hand: React.FC<{ x: number; y: number; s?: number; rot?: number; flip?: boolean }> = ({ x, y, s = 1, rot = 0, flip }) => <svg width={400 * s} height={760 * s} viewBox="0 0 400 760" style={{ position: "absolute", left: x - 255 * s, top: y - 700 * s, transform: `rotate(${rot}deg) scaleX(${flip ? -1 : 1})`, transformOrigin: "64% 92%", overflow: "visible" }}>
	<defs><pattern id="hatch" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(35)"><rect width="14" height="14" fill="#fff" /><line x1="0" y1="0" x2="0" y2="14" stroke={INK} strokeWidth="4" /></pattern></defs>
	<g stroke={INK} strokeWidth="7" strokeLinejoin="round" fill="url(#hatch)">
		<path d="M140 -40 L290 -40 L300 330 C330 360 340 420 320 470 L290 540 L270 520 L250 470 C240 520 210 560 180 560 C130 560 110 500 120 440 C100 410 110 360 140 330 Z" />
		<path d="M250 470 L272 700 C274 724 244 728 240 704 L214 520 Z" /><path d="M180 540 C176 600 200 650 226 690 C238 708 214 724 202 706 C170 660 146 610 150 545 Z" /></g></svg>
const Big: React.FC<{ t: number; t0: number; lines: string[]; size?: number; color?: string }> = ({ t, t0, lines, size = 120, color = INK }) => <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
	<div style={{ fontFamily: CJK, fontWeight: 700, fontSize: size, color, textAlign: "center", lineHeight: 1.18, letterSpacing: "-0.01em", opacity: clamp01((t - t0) / 0.25), transform: `scale(${lerp(t, t0, t0 + 0.4, 0.96, 1, inOut)})` }}>{lines.map((l) => <div key={l}>{l}</div>)}</div></AbsoluteFill>

// ---------- 0–12.4: belt and pile ----------
const Belt: React.FC<{ t: number }> = ({ t }) => {
	const grow = lerp(t, M.belt0, M.belt0 + 0.8, 0, 2400, inOut), off = (t * 170) % 120, fl = clamp01((t - M.fly) / 0.6)
	return <AbsoluteFill style={{ background: BG, overflow: "hidden" }}>
		<div style={{ position: "absolute", left: -240, top: 560, width: grow, height: 34, borderRadius: 17, background: INK, overflow: "hidden" }}>{Array.from({ length: 24 }, (_, k) => <div key={k} style={{ position: "absolute", left: k * 120 - off, top: 7, width: 20, height: 20, borderRadius: 10, background: "#fff" }} />)}</div>
		{TASKS.map((s, k) => { const x = 1000 + k * 640 - (t - 1) * 272, r = rand(k * 3.1)
			if (x > grow - 300) return null
			return <div key={k} style={{ position: "absolute", left: x + fl * (r - 0.5) * 400, top: 466 - fl * (300 + r * 500), transform: `rotate(${fl * (r - 0.5) * 50}deg)` }}><Tag s={s} fs={40} /></div> })}</AbsoluteFill>
}
const Pile: React.FC<{ t: number; badge?: boolean }> = ({ t, badge }) => <AbsoluteFill style={{ background: BG, overflow: "hidden" }}>
	{Array.from({ length: 24 }, (_, k) => { const r = rand(k * 1.7), q = rand(k * 5.3), dx = Math.sin(t * 0.5 + k) * 6
		return <div key={k} style={{ position: "absolute", left: 60 + (k % 4) * 440 + q * 140 + dx + (badge ? 120 : (r - 0.5) * 200), top: 120 + Math.floor(k / 4) * 150 + r * 60 + (badge ? 140 : 0), transform: `rotate(${(r - 0.5) * 50}deg) scale(${badge ? 0.82 : 1})` }}><Tag s={TASKS[k % TASKS.length]} fs={38} /></div> })}
	{badge && <div style={{ position: "absolute", left: 620, top: 80, display: "flex", alignItems: "center", gap: 18, padding: "14px 30px", borderRadius: 40, background: "#e6dcfb", fontFamily: CJK, fontSize: 52, fontWeight: 700, color: "#5b3bb8", opacity: clamp01((t - M.badge) / 0.3), transform: `scale(${0.8 + 0.2 * clamp01((t - M.badge) / 0.3)})` }}><span style={{ width: 30, height: 30, borderRadius: 15, background: "#9b6bf2" }} />要打的字</div>}</AbsoluteFill>
// ---------- 15–17.3: MosMos window ----------
const App: React.FC<{ t: number }> = ({ t }) => { const c = path(t, [[C[3], 1100, 900], [M.pick - 0.3, 330, 640], [C[4], 360, 660]])
	return <AbsoluteFill style={{ background: BG }}><div style={{ position: "absolute", left: 120, top: 120, width: 1900, height: 1100, borderRadius: 24, background: "#fff", boxShadow: "0 0 0 2px #e4e2dc, 0 20px 60px rgba(0,0,0,.08)", fontFamily: CJK, overflow: "hidden", transform: `scale(${lerp(t, C[3], C[4], 1, 1.04)})`, transformOrigin: "0 0" }}>
		<div style={{ position: "absolute", left: 0, top: 0, width: 420, bottom: 0, background: "#f7f7f5", borderRight: "1px solid #eceae5", padding: "30px 30px" }}>
			<div style={{ display: "flex", gap: 10, marginBottom: 34 }}>{["#ff5f57", "#febc2e", "#28c840"].map((x) => <div key={x} style={{ width: 16, height: 16, borderRadius: 8, background: x }} />)}</div>
			<div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 34, fontWeight: 700, marginBottom: 30 }}><LogoPixels size={34} t={t} mode="static" />MosMos</div>
			{["首页", "热词", "会议记录"].map((x) => <div key={x} style={{ fontSize: 30, color: "#555", padding: "12px 0" }}>{x}</div>)}
			<div style={{ fontSize: 24, color: DIM, margin: "30px 0 12px" }}>场景</div>
			{SCENES.map((x, k) => <div key={x} style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 30, padding: "10px 12px", borderRadius: 12, background: k === 1 && t > M.pick ? "#ecebe7" : undefined }}><div style={{ width: 34, height: 34, borderRadius: 17, background: COL[k], boxShadow: `inset 0 0 0 3px ${INK}` }} />{x}</div>)}</div>
		<div style={{ position: "absolute", left: 500, top: 60, fontSize: 64, fontWeight: 700 }}>{t > M.pick ? "邮件" : "首页"}</div>
		<div style={{ position: "absolute", left: 500, top: 170, fontSize: 30, color: DIM }}>{t > M.pick ? COPY.scenes[1].style : COPY.sceneDesc}</div>
		<div style={{ position: "absolute", left: 500, top: 260, width: 1100 }}>{(t > M.pick ? COPY.mail : COPY.todos).map((x, k) => <div key={k} style={{ fontSize: 32, padding: "18px 0", borderBottom: "1px solid #eceae5" }}>{x}</div>)}</div>
	</div><Cursor x={c.x} y={c.y} s={1.4} down={Math.abs(t - M.pick) < 0.1} /></AbsoluteFill> }
// ---------- kanban ----------
const KCOL = [["原话", "#efe8fb", "#7a52d8"], ["润色中", "#f7efd9", "#b38612"], ["成稿", "#e3f3ee", "#1f8a6a"]]
const Kanban: React.FC<{ t: number }> = ({ t }) => {
	const cards: [string, number][] = [[COPY.chatRaw, t < M.mv1 ? 0 : t < M.mv2 ? 1 : 2], ["嗯，下一步今天确认视觉稿，明天开始开发", 0], ["那个，李经理您好，第一版方案我们周三前发给您", t < M.new ? 0 : 1], ["呃，帮我在当前项目里查找包含 API_KEY 的文件", 0]]
	const ic = path(t, [[C[9], 700, 330], [M.mv1, 1180, 360], [M.mv2 - 0.3, 1180, 360], [M.mv2, 1900, 360], [M.new - 0.4, 700, 620], [M.new, 1180, 560], [C[10], 1180, 560]])
	return <AbsoluteFill style={{ background: BG, fontFamily: CJK }}><div style={{ position: "absolute", left: 80, top: 110, transform: `scale(${lerp(t, C[9], C[10], 1, 1.05)})`, transformOrigin: "40% 30%" }}>
		{KCOL.map(([n, bg, fg], ci) => <div key={n} style={{ position: "absolute", left: ci * 720, top: 0, width: 690, minHeight: 900, borderRadius: 20, background: bg, padding: 22, boxSizing: "border-box" }}>
			<div style={{ display: "inline-flex", padding: "6px 18px", borderRadius: 20, background: "rgba(255,255,255,.7)", color: fg, fontSize: 28, fontWeight: 600, marginBottom: 20 }}>● {n}</div>
			{cards.filter(([, c]) => c === ci).map(([s]) => <div key={s} style={{ background: "#fff", borderRadius: 14, padding: "24px 28px", marginBottom: 18, fontSize: 36, lineHeight: 1.45, boxShadow: "0 1px 3px rgba(0,0,0,.08)" }}>{ci === 2 ? COPY.chatOut : s}<div style={{ marginTop: 12, fontSize: 22, color: DIM }}>{["飞书 / 微信", "文档", "邮件", "代码与终端"][cards.findIndex((c) => c[0] === s)]}</div></div>)}</div>)}
	</div><Icon k={3} x={ic.x} y={ic.y} r={92} /></AbsoluteFill>
}
// ---------- transcript list ----------
const LINES = [...COPY.meeting, ["说话人 1", "10:09", "交互稿评审放在周三下午。"], ["说话人 2", "10:11", "素材我今天下午三点前发群里。"], ["说话人 3", "10:12", "视觉方案先出两版。"], ["说话人 1", "10:14", "好，那我们按这个顺序推进。"]] as string[][]
const List: React.FC<{ t: number; off: number; blur?: number; hl?: boolean }> = ({ t, off, blur = 0, hl }) => <AbsoluteFill style={{ background: BG, fontFamily: CJK, overflow: "hidden" }}>
	<div style={{ position: "absolute", left: 420, top: 120 - off, width: 900, filter: blur ? `blur(${blur}px)` : undefined }}>{LINES.concat(LINES).map(([sp, tm, s], k) => { const n = Number(sp.slice(-1)) - 1
		return <div key={k} style={{ display: "flex", gap: 26, alignItems: "flex-start", width: 900, boxSizing: "border-box", background: "#fff", borderRadius: 18, padding: "24px 30px", marginBottom: 16, boxShadow: hl && k === 3 ? `0 0 0 3px ${COL[1]}` : "0 1px 3px rgba(0,0,0,.08)", opacity: clamp01((t - M.list - k * 0.12) / 0.25) || (off > 0 ? 1 : 0) }}>
			<div style={{ width: 76, height: 76, borderRadius: 38, background: COL[n], boxShadow: `inset 0 0 0 3px ${INK}`, color: "#fff", fontSize: 28, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{n + 1}</div>
			<div><div style={{ fontSize: 32, fontWeight: 700 }}>{sp} <span style={{ fontWeight: 400, color: DIM }}>{tm}</span></div><div style={{ fontSize: 38, marginTop: 4 }}>{s}</div>
				{hl && k === 3 && <div style={{ marginTop: 10, fontSize: 24, color: "#1f8a6a" }}>✓ 已整理进待办</div>}</div></div> })}</div>
	<Icon k={0} x={1480} y={300} r={96} /></AbsoluteFill>
// ---------- night ----------
const Night: React.FC<{ t: number; seed: number; n: number; z: number }> = ({ t, seed, n, z }) => <AbsoluteFill style={{ background: NAVY, overflow: "hidden" }}>
	{Array.from({ length: n }, (_, k) => { const r = rand(k * 3.7 + seed), q = rand(k * 9.1 + seed), sp = 260 + 300 * r, x = ((q * 2600 + (t - C[19]) * sp) % 2600) - 340, y = 60 + rand(k * 1.3 + seed) * 960, s = (0.35 + 0.55 * rand(k * 7 + seed)) * z
		return <div key={k} style={{ position: "absolute", left: x, top: y, display: "flex", alignItems: "center", gap: 14 * s, transform: `scale(${s})`, transformOrigin: "0 50%" }}>
			<div style={{ width: 260, height: 6, borderRadius: 3, background: `linear-gradient(90deg, transparent, ${COL[k % 5]})`, position: "absolute", right: "100%" }} />
			<Icon k={k} x={60} y={0} r={92} /><div style={{ position: "relative", marginLeft: 210, top: -30 }}><Tag s={TASKS[k % TASKS.length]} fs={30} /></div></div> })}</AbsoluteFill>

export const Film: React.FC = () => {
	const t = useT()
	const i = C.filter((c) => t >= c).length
	switch (i) {
		case 0: return <Belt t={t} />
		case 1: return <Pile t={t} />
		case 2: return <Pile t={t} badge />
		case 3: return <AbsoluteFill style={{ background: BG }}><Big t={t} t0={C[2]} lines={["再见，打字。"]} /></AbsoluteFill>
		case 4: return <App t={t} />
		case 5: case 6: { const d = lerp(t, C[4], C[4] + 0.35, -400, 0, inOut), d2 = lerp(t, C[5], C[5] + 0.35, 500, 0, inOut)
			return <AbsoluteFill style={{ background: BG, overflow: "hidden" }}><AbsoluteFill style={{ transform: i === 6 ? "scale(1.18) translate(60px, -40px)" : undefined }}><Big t={t} t0={C[4] - 0.3} lines={["你好，MosMos 场景。"]} />
				<Hand x={400} y={430 + d} s={1.3} rot={-8} /><Icon k={0} x={450} y={500 + d} r={100} />
				{i === 6 && <><Hand x={1460} y={1500 + d2} s={1.3} rot={175} /><Icon k={1} x={1430} y={700 + d2} r={100} /></>}</AbsoluteFill></AbsoluteFill> }
		case 7: { const p = clamp01((t - C[6]) / 2.3)
			return <AbsoluteFill style={{ background: BG, overflow: "hidden" }}><Hand x={lerp(p, 0, 1, 300, 200)} y={lerp(p, 0, 1, 380, 250)} s={1.1} rot={-20} /><Hand x={1600} y={1400} s={1} rot={160} />
				<Icon k={0} x={lerp(p, 0, 1, 360, 900)} y={lerp(p, 0, 1, 470, 380)} r={100} trail={p * 200} /><Icon k={1} x={lerp(p, 0, 1, 1400, 1650)} y={lerp(p, 0, 1, 700, 500)} r={100} /><Icon k={2} x={lerp(p, 0, 1, 700, 760)} y={lerp(p, 0, 1, 1200, 820)} r={100} /></AbsoluteFill> }
		case 8: { const p = lerp(t, C[7], C[7] + 1.1, 0, 1, inOut)
			return <AbsoluteFill style={{ background: BG, overflow: "hidden" }}><Big t={t} t0={C[7]} lines={["你在哪里说，", "决定我们怎么写。"]} />
				<Icon k={3} x={lerp(p, 0, 1, -200, 1220)} y={250} r={96} trail={180} /><Icon k={1} x={lerp(p, 0, 1, -400, 600)} y={830} r={96} trail={180} /></AbsoluteFill> }
		case 9: { const n = t > M.notes
			return <AbsoluteFill style={{ background: BG, overflow: "hidden", fontFamily: CJK }}>{t < M.notes + 0.1 && <AbsoluteFill style={{ opacity: 1 - clamp01((t - M.notes + 0.25) / 0.35) }}><Big t={t} t0={C[8]} lines={["自动识别场景"]} /></AbsoluteFill>}{n && <>
				{[[1, COPY.scenes[1].style, "当前应用：邮件"], [0, COPY.scenes[0].style, "当前应用：飞书 / 微信"]].map(([k, s, h], j) => <div key={j} style={{ position: "absolute", left: 560, top: 360 + j * 200, width: 800, padding: "28px 34px", borderRadius: 16, background: "#fff", boxShadow: "0 0 0 2px #e4e2dc", opacity: clamp01((t - M.notes - j * 0.5) / 0.3), transform: `translateX(${(1 - clamp01((t - M.notes - j * 0.5) / 0.3)) * 60}px)` }}>
					<div style={{ display: "flex", gap: 16, alignItems: "center", fontSize: 36, fontWeight: 700 }}><div style={{ width: 48, height: 48, borderRadius: 12, background: COL[k as number] }} />{h}</div><div style={{ fontSize: 30, color: "#555", marginTop: 8, marginLeft: 64 }}>{s}</div></div>)}
				<Icon k={1} x={lerp(t, M.notes, C[9], 200, 520)} y={480} r={96} trail={180} /></>}</AbsoluteFill> }
		case 10: return <Kanban t={t} />
		case 11: return <AbsoluteFill style={{ background: BG }}>{t >= M.list - 0.1 && <List t={t} off={0} />}{t < M.list + 0.6 && <AbsoluteFill style={{ background: BG, opacity: 1 - clamp01((t - M.list + 0.1) / 0.7) }}><Big t={t} t0={C[10]} lines={["会议里，谁说了什么"]} /></AbsoluteFill>}</AbsoluteFill>
		case 12: return <List t={t} off={lerp(t, C[11], C[12], 260, 420)} />
		case 13: return <List t={t} off={lerp(t, C[12], C[13], 560, 760)} blur={6} />
		case 14: return <List t={t} off={lerp(t, C[13], C[14], 200, 240)} hl={t > M.hl} />
		case 15: { const w = clamp01((t - C[14] - 0.4) / 1.2)
			return <AbsoluteFill style={{ background: BG }}><Big t={t} t0={C[14]} lines={["会后，总结和待办都写好了"]} size={104} /><div style={{ position: "absolute", left: 340, top: 610, width: 1240 * w, height: 6, background: "repeating-linear-gradient(90deg,#20a39a 0 40px,transparent 40px 56px)" }} /></AbsoluteFill> }
		case 16: return <AbsoluteFill style={{ background: BG, fontFamily: CJK }}><div style={{ position: "absolute", left: 200, top: 220, fontSize: 52, fontWeight: 700 }}>▤ 会议记录</div>
			<div style={{ position: "absolute", left: 200, top: 320, width: 1520 }}>{[["会议", "说话人", "状态"], ["首页改版周会", "3 位", "已整理"], ["交互稿评审", "2 位", "已整理"], ["客户沟通", "4 位", "已整理"], ["一对一", "2 位", "整理中"]].map((r, k) => <div key={k} style={{ display: "flex", fontSize: 32, padding: "20px 0", borderBottom: "1px solid #e4e2dc", color: k ? INK : DIM, opacity: clamp01((t - C[15] - k * 0.12) / 0.2) }}>
				<span style={{ width: 640 }}>{r[0]}</span><span style={{ width: 400 }}>{r[1]}</span><span style={{ color: k && r[2] === "已整理" ? "#1f8a6a" : undefined }}>{r[2]}</span></div>)}</div><Icon k={2} x={190} y={445} r={80} /></AbsoluteFill>
		case 17: { const doc = <AbsoluteFill style={{ background: BG, fontFamily: CJK }}><div style={{ position: "absolute", left: 360, top: 140, width: 1200, height: 1000, background: "#fff", borderRadius: 16, boxShadow: "0 0 0 2px #e4e2dc", padding: "60px 70px", boxSizing: "border-box", transform: `scale(${lerp(t, C[16], M.macro, 1, 1.15)})`, transformOrigin: "30% 20%" }}>
				<div style={{ fontSize: 56, fontWeight: 700 }}>首页改版周会 · 会议总结</div><div style={{ fontSize: 28, color: DIM, margin: "16px 0 30px" }}>3 位说话人 · 今天</div>
				<div style={{ fontSize: 32, lineHeight: 1.6 }}>{COPY.meetingConclusion}</div><div style={{ fontSize: 34, fontWeight: 700, margin: "30px 0 10px" }}>待办</div>
				{COPY.todos.map((x) => <div key={x} style={{ fontSize: 32, lineHeight: 1.8 }}>☐ {x}</div>)}</div><Icon k={2} x={340} y={200} r={92} /></AbsoluteFill>
			if (t < M.macro) return doc
			return <AbsoluteFill style={{ background: BG }}>{t < M.macro + 0.6 && <AbsoluteFill style={{ opacity: 1 - clamp01((t - M.macro) / 0.6) }}>{doc}</AbsoluteFill>}<AbsoluteFill style={{ background: BG, fontFamily: CJK, overflow: "hidden", opacity: clamp01((t - M.macro) / 0.6) }}><div style={{ position: "absolute", left: 120, top: 260, width: 2400, height: 700, borderRadius: 60, background: "#fff", boxShadow: "0 0 0 3px #e4e2dc" }} />
				<div style={{ position: "absolute", left: lerp(t, M.macro, C[17], 160, -200), top: 470, fontSize: 230, fontWeight: 700, whiteSpace: "nowrap" }}>待办 <span style={{ color: "#a9a6a0" }}>@今天</span></div>
				<div style={{ position: "absolute", left: 1000, top: 320, display: "flex" }}>{[0, 1, 2].map((k) => <div key={k} style={{ width: 90, height: 90, borderRadius: 45, background: COL[k], boxShadow: `inset 0 0 0 4px ${INK}, 0 0 0 5px #fff`, marginLeft: -20, opacity: clamp01((t - M.macro - 0.7 - k * 0.35) / 0.35) }} />)}</div></AbsoluteFill></AbsoluteFill> }
		case 18: { const p = lerp(t, C[17], C[18], 0, 1)
			return <AbsoluteFill style={{ background: BG, overflow: "hidden" }}><Big t={t} t0={C[17]} lines={["从早上的第一条消息……"]} size={104} /><Hand x={1320} y={1500 - p * 200} s={1} rot={180} /><Icon k={0} x={1300} y={800 - p * 200} r={90} /></AbsoluteFill> }
		case 19: return <AbsoluteFill style={{ background: NAVY }}><Big t={t} t0={C[18]} lines={["……到晚上的最后一封邮件。"]} size={96} color="#fff" /><Icon k={1} x={lerp(t, C[18], C[19], 1200, 1500)} y={760} r={80} trail={160} /></AbsoluteFill>
		case 27: return <AbsoluteFill style={{ background: NAVY }} />
		case 28: { const c = path(t, [[C[27], 1300, 900], [M.click - 0.3, 1080, 560], [C[28], 1090, 580]])
			return <AbsoluteFill style={{ background: NAVY, alignItems: "center", justifyContent: "center" }}><div style={{ padding: "40px 90px", borderRadius: 26, background: "#fff", fontFamily: CJK, fontSize: 72, fontWeight: 600, color: INK, transform: `scale(${Math.abs(t - M.click) < 0.1 ? 0.95 : 1})` }}>＋ 下载 MosMos</div><Cursor x={c.x} y={c.y} s={1.5} down={Math.abs(t - M.click) < 0.1} /></AbsoluteFill> }
		case 29: return <AbsoluteFill style={{ background: NAVY, alignItems: "center", justifyContent: "center" }}><div style={{ display: "flex", alignItems: "center", gap: 24, opacity: clamp01((t - C[28]) / 0.4) }}><LogoPixels size={96} t={t} mode="static" invert /><Wordmark size={88} color="#fff" /></div></AbsoluteFill>
		default: return <Night t={t} seed={i * 13} n={[7, 6, 10, 14, 12, 16, 20, 24][i - 20]} z={[2.2, 1.9, 1.5, 1.2, 1.3, 1.0, 0.9, 0.8][i - 20]} />
	}
}
