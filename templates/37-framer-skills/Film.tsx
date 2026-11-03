// Template 37 — structure of Framer "Introducing Skills" (2026), MosMos content.
// Pure black, a slanted dark input box where a spoken prompt is written word by word, a macro on the last words,
// a tilted canvas of finished drafts with blue glows, a prompt box that picks up the 提示词 scene as a blue tag,
// the scene list flashing by, a glowing scene tag, and the logo.
import React from "react"
import { AbsoluteFill } from "remotion"
import { CJK, lerp, clamp01, inOut, useT, LogoPixels, Wave, COPY, SCENES } from "../_engine/src/mos"
import { rand } from "../_engine/src/kit"
import TL from "./timeline.json"

const M = TL.marks as Record<string, number>, C = TL.cuts as number[], LIST = TL.list as number[]
const BLUE = "#4aa3ff", TX = "#ececee", DIM = "#7c7c84"
const SEG: [number, string, number][] = [[0.1, "输出要求：", 5.5], [1.12, "使用表格呈现差异，", 8], [2.36, "并给出 3 条", 8.5], [3.3, "改进建议。", 6]]
const typed = (t: number) => SEG.map(([t0, s, cps], k) => { const end = k < SEG.length - 1 ? SEG[k + 1][0] : 99
	return s.slice(0, Math.max(0, Math.min(s.length, Math.floor((Math.min(t, end) - t0) * cps + 1e-6)))) }).join("")
const Caret: React.FC<{ t: number; h: number; c?: string }> = ({ t, h, c = TX }) => <span style={{ display: "inline-block", width: Math.max(2, h * 0.06), height: h, background: c, marginLeft: h * 0.05, verticalAlign: "middle", opacity: Math.floor(t * 2.2) % 2 ? 0.2 : 1 }} />

// ---------- 0–4.2: slanted chat box ----------
const ChatBox: React.FC<{ t: number; s: number; fx: number; fy: number; rot: number }> = ({ t, s, fx, fy, rot }) => <AbsoluteFill style={{ background: "#000", perspective: 1800, overflow: "hidden" }}>
	<div style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 1080, transformOrigin: `${fx}px ${fy}px`, transform: `translate(${960 - fx}px, ${540 - fy}px) scale(${s}) rotateY(${rot}deg) rotateX(6deg)` }}>
		<div style={{ position: "absolute", left: 160, top: 220, width: 2200, height: 620, borderRadius: 30, background: "linear-gradient(180deg,#1d1d20,#151517)", boxShadow: "inset 0 0 0 2px #2a2a2e", fontFamily: CJK }}>
			<div style={{ position: "absolute", left: 60, top: 44, fontSize: 40, color: TX, fontWeight: 500 }}>新对话</div>
			<div style={{ position: "absolute", left: 0, right: 0, top: 120, height: 2, background: "#26262a" }} />
			<div style={{ position: "absolute", left: 60, top: 210, fontSize: 62, color: TX, whiteSpace: "nowrap" }}>{typed(t)}<Caret t={t} h={66} /></div>
			<div style={{ position: "absolute", left: 60, bottom: 50, display: "flex", gap: 22, alignItems: "center", fontSize: 30, color: DIM }}><span style={{ fontSize: 44 }}>＋</span><span>提示词 · 要求明确</span></div>
			<div style={{ position: "absolute", right: 60, bottom: 40, width: 150, height: 66, borderRadius: 33, background: "#2a2a2e", display: "flex", alignItems: "center", justifyContent: "center" }}><Wave live t={t} n={5} h={30} color="#fff" /></div>
		</div></div></AbsoluteFill>
const caretX0 = (t: number) => 160 + 60 + [...typed(t)].reduce((a, ch) => a + (/[\x00-\x7f]/.test(ch) ? 34 : 62), 0)

const caretX = (t: number) => { let a = 0; for (let k = 0; k < 8; k++) a += caretX0(t - k * 0.03); return a / 8 }
// ---------- canvas of finished drafts ----------
const KINDS = ["mail", "doc", "img", "chat", "prompt", "todo", "term", "doc", "mail", "chat", "prompt", "img2", "todo"]
const Thumb: React.FC<{ kind: string; w: number; h: number; glow: number; seed: number }> = ({ kind, w, h, glow, seed }) => {
	const line = (x: string, k: number, c = "#b9b9c0", fs = 13) => <div key={k} style={{ fontSize: fs, color: c, lineHeight: 1.5, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip" }}>{x}</div>
	const body = kind === "mail" ? COPY.mail.map((x, k) => line(x, k)) : kind === "doc" ? [line("项目复盘", 0, TX, 18), ...COPY.doc.map(([a, b], k) => line(a + b, k + 1))]
		: kind === "prompt" ? COPY.prompt.map((x, k) => line(x, k)) : kind === "todo" ? [line("会议总结", 0, TX, 18), line(COPY.meetingConclusion, 1), ...COPY.todos.map((x, k) => line("☐ " + x, k + 2))]
		: kind === "term" ? [line("$ " + COPY.termCmd, 0, "#7ee2a8", 15), line(COPY.scenes[4].hint || "", 1, DIM)]
		: kind === "chat" ? [COPY.chatOut, "好的，收到。", COPY.scenes[0].out].map((x, k) => <div key={k} style={{ alignSelf: k === 1 ? "flex-start" : "flex-end", background: k === 1 ? "#2a2a2e" : "#2f5fd0", color: "#fff", fontSize: 12, padding: "6px 10px", borderRadius: 10, marginTop: 8, maxWidth: "80%", whiteSpace: "nowrap", overflow: "hidden" }}>{x}</div>)
		: null
	const img = kind.startsWith("img")
	return <div style={{ width: w, height: h, borderRadius: 10, background: img ? (kind === "img" ? `linear-gradient(${120 + seed * 40}deg,#0b2a6b,#1f7bd8 45%,#2c8a4a 70%,#0d1d14)` : `linear-gradient(${200 + seed * 30}deg,#06142e,#1663d6 55%,#a8d4ff)`) : "#141416", boxShadow: `0 0 0 ${2 + glow * 2}px rgba(74,163,255,${0.12 + glow * 0.8}), 0 0 ${glow * 50}px rgba(74,163,255,${glow * 0.6})`, padding: img ? 0 : "16px 18px", boxSizing: "border-box", fontFamily: CJK, display: "flex", flexDirection: "column", overflow: "hidden" }}>
		{!img && <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>{[0, 1, 2].map((k) => <div key={k} style={{ width: 8, height: 8, borderRadius: 4, background: "#3a3a40" }} />)}</div>}{body}</div>
}
const Canvas: React.FC<{ t: number; s: number; fx: number; fy: number; rx: number; rz: number; phase: number }> = ({ t, s, fx, fy, rx, rz, phase }) => {
	const cells: React.ReactNode[] = []
	for (let r = 0; r < 7; r++) for (let c = 0; c < 11; c++) { const k = r * 11 + c, tall = rand(k * 7.1) > 0.75, kind = KINDS[Math.floor(rand(k * 3.3 + 1) * KINDS.length)]
		const g = clamp01(Math.sin((t + phase) * 2.2 + rand(k * 1.7) * 12) * 2 - 1.2) * (rand(k * 5.5) > 0.55 ? 1 : 0)
		cells.push(<div key={k} style={{ position: "absolute", left: c * 380, top: r * 270 - (tall ? 60 : 0) + (c % 2) * 40 }}><Thumb kind={kind} w={tall ? 220 : 340} h={tall ? 340 : 220} glow={g} seed={k % 5} /></div>) }
	return <AbsoluteFill style={{ background: "#000", perspective: 2400, overflow: "hidden" }}>
		<div style={{ position: "absolute", left: 0, top: 0, width: 4200, height: 1900, transformOrigin: `${fx}px ${fy}px`, transform: `translate(${960 - fx}px, ${540 - fy}px) scale(${s}) rotateX(${rx}deg) rotateZ(${rz}deg)` }}>{cells}</div></AbsoluteFill>
}

// ---------- prompt box ----------
const P1 = "请对比分析三款语音输入产品，", P2 = "用表格呈现差异"
const Chip: React.FC<{ label: string; fs: number; glow?: number }> = ({ label, fs, glow = 0 }) => <span style={{ display: "inline-block", fontSize: fs, color: BLUE, background: "rgba(40,120,255,.22)", padding: `${fs * 0.08}px ${fs * 0.22}px`, borderRadius: fs * 0.2, boxShadow: glow ? `0 0 0 ${fs * 0.04}px rgba(90,170,255,${0.5 + glow * 0.4}), 0 0 ${fs * 0.8 * glow}px rgba(60,150,255,${0.8 * glow}), inset 0 0 ${fs * 0.4}px rgba(80,160,255,${0.5 * glow})` : undefined, verticalAlign: "middle", whiteSpace: "nowrap" }}>{label}</span>
const PromptBox: React.FC<{ t: number; s: number; fx: number; fy: number; text: React.ReactNode; tw?: number }> = ({ t, s, fx, fy, text, tw }) => <AbsoluteFill style={{ background: "#000", overflow: "hidden" }}>
	<div style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 1080, transformOrigin: `${fx}px ${fy}px`, transform: `translate(${960 - fx}px, ${540 - fy}px) scale(${s})` }}>
		<div style={{ position: "absolute", left: 380, top: 330, width: 1160, height: 420, borderRadius: 26, background: "#19191b", boxShadow: "inset 0 0 0 2px #26262a", fontFamily: CJK }}>
			<div style={{ position: "absolute", left: 44, top: 40, width: tw || 1072, fontSize: 30, color: TX, lineHeight: 1.5 }}>{text}</div>
			<div style={{ position: "absolute", left: 44, bottom: 34, fontSize: 24, color: DIM }}>MosMos 正在听…</div>
			<div style={{ position: "absolute", right: 40, bottom: 28, display: "flex", gap: 14 }}>{[0, 1].map((k) => <div key={k} style={{ width: 52, height: 52, borderRadius: 26, background: "#2a2a2e", display: "flex", alignItems: "center", justifyContent: "center" }}>{k ? <Wave live t={t} n={3} h={22} color="#fff" /> : <span style={{ color: DIM, fontSize: 30 }}>＋</span>}</div>)}</div>
		</div></div></AbsoluteFill>
const ty = (s: string, t: number, t0: number, cps: number) => s.slice(0, Math.max(0, Math.min(s.length, Math.floor((t - t0) * cps))))

export const Film: React.FC = () => {
	const t = useT()
	const i = C.filter((c) => t >= c).length
	switch (i) {
		case 0: return <ChatBox t={t} s={lerp(t, 0, C[0], 1.0, 1.08)} fx={lerp(t, 0, C[0], 900, 960)} fy={480} rot={-16} />
		case 1: return <ChatBox t={t} s={lerp(t, C[0], C[1], 1.5, 1.56)} fx={caretX(t) - 260} fy={430} rot={-14} />
		case 2: { const z = lerp(t, M.macro - 0.2, M.macro + 0.15, 0, 1, inOut)
			const sc = lerp(t, C[1], M.macro - 0.2, 2.45, 2.55) + z * 1.0
			return <ChatBox t={t} s={sc} fx={caretX(t) - 300 / sc + z * 60} fy={500} rot={-5 - z * 6} /> }
		case 3: return <Canvas t={t} s={lerp(t, C[2], C[3], 0.72, 0.76)} fx={2000} fy={900} rx={12} rz={-4} phase={0} />
		case 4: return <Canvas t={t} s={lerp(t, C[3], C[4], 2.2, 2.4)} fx={1590} fy={640} rx={6} rz={-2} phase={1} />
		case 5: return <Canvas t={t} s={0.8} fx={lerp(t, C[4], C[5], 1200, 2900, inOut)} fy={lerp(t, C[4], C[5], 900, 1000)} rx={14} rz={-6} phase={2} />
		case 6: return <PromptBox t={t} s={1} fx={960} fy={540} text={<>{ty(P1, t, M.ty1, 5)}<Caret t={t} h={34} /></>} />
		case 7: { const p2 = ty(P2, t, C[6], 5.2)
			return <PromptBox t={t} s={2.6} fx={lerp(t, C[6], C[7], 735, 750)} fy={500} tw={560} text={<>{P1}{p2}{t > M.chip && <> <Chip label="提示词" fs={30} /></>}<Caret t={t} h={34} /></>} /> }
		case 8: return <Canvas t={t} s={lerp(t, C[7], C[8], 0.62, 0.72)} fx={lerp(t, C[7], C[8], 2400, 1700, inOut)} fy={900} rx={20} rz={-7} phase={3} />
		case 9: { const k = LIST.filter((x) => t >= x).length - 1, L = [...SCENES, "会议记录"]
			return <AbsoluteFill style={{ background: "#000", alignItems: "center", justifyContent: "center" }}>{k >= 0 && <div style={{ fontFamily: CJK, fontSize: 40, color: BLUE, textShadow: "0 0 18px rgba(74,163,255,.7)" }}>{L[k]}</div>}</AbsoluteFill> }
		case 10: return <PromptBox t={t} s={2.6} fx={700} fy={450} text={<>{ty("提示词", t, M.ty2, 6)}<Caret t={t} h={34} /></>} />
		default: { if (t >= M.logo) return <AbsoluteFill style={{ background: "#000", alignItems: "center", justifyContent: "center" }}><div style={{ opacity: clamp01((t - M.logo) / 0.25) }}><LogoPixels size={150} t={t} mode="static" invert /></div></AbsoluteFill>
			const g = 0.6 + 0.4 * Math.sin((t - M.glow) * 5), a = clamp01((M.logo - t) / 0.25)
			return <AbsoluteFill style={{ background: "#000", alignItems: "center", justifyContent: "center" }}><div style={{ opacity: a, transform: `scale(${lerp(t, M.glow, M.logo, 1, 1.06)})`, fontFamily: CJK }}><Chip label="提示词" fs={130} glow={clamp01((t - M.glow) / 0.3) * g} /></div></AbsoluteFill> }
	}
}
