// Template 38 — structure of Linear "Introducing Code Intelligence" (2026), MosMos content.
// Near-black film: a tilted dark panel with a dotted logo, an italic question typed into a wide input, floating
// pixel-style dialog cards over blurred code, monospace tags, a tilted answer panel, a small dialog cycling through
// spoken requests, a white line and the logo.
import React from "react"
import { AbsoluteFill } from "remotion"
import { CJK, MONO, lerp, clamp01, inOut, useT, LogoPixels, Wordmark, Wave, COPY } from "../_engine/src/mos"
import { rand } from "../_engine/src/kit"
import TL from "./timeline.json"

const M = TL.marks as Record<string, number>, C = TL.cuts as number[]
const TX = "#e9e9ec", DIM = "#8a8a92", BG = "#060607"
const ASK = "在当前项目里查找包含 API_KEY 的文件", CMD = COPY.termCmd
const ty = (s: string, t: number, t0: number, cps: number) => s.slice(0, Math.max(0, Math.min(s.length, Math.floor((t - t0) * cps))))
const Caret: React.FC<{ t: number; h: number }> = ({ t, h }) => <span style={{ display: "inline-block", width: 2, height: h, background: TX, marginLeft: 3, verticalAlign: "middle", opacity: Math.floor(t * 2.2) % 2 ? 0.15 : 1 }} />
const fade = (t: number, a: number, b: number, d = 0.35, d2 = d) => clamp01((t - a) / d) * clamp01((b - t) / d2)
const Vignette = () => <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 40%, rgba(0,0,0,.75) 100%)" }} />

// ---------- 0–4.5: tilted panel with dotted logo ----------
const Dots: React.FC<{ t: number }> = ({ t }) => {
	const d: React.ReactNode[] = []
	for (let r = 0; r < 7; r++) for (let c = 0; c < 11; c++) { const a = clamp01((t - M.logo - rand(r * 11 + c) * 0.9) / 0.4)
		d.push(<div key={r * 11 + c} style={{ position: "absolute", left: c * 34, top: r * 34, width: 8, height: 8, borderRadius: 4, background: "#9a9aa2", opacity: a * (0.25 + 0.35 * rand(r * 7 + c * 3)) }} />) }
	return <div style={{ position: "relative", width: 350, height: 230 }}>{d}<div style={{ position: "absolute", left: 175 - 45, top: 115 - 45, opacity: clamp01((t - M.logo - 0.6) / 0.5) }}><LogoPixels size={90} t={t} mode="in" t0={M.logo + 0.5} invert /></div></div>
}
const Intro: React.FC<{ t: number }> = ({ t }) => {
	const s = lerp(t, 0, C[0], 1.0, 1.12), rz = lerp(t, 0, C[0], -14, -11)
	return <AbsoluteFill style={{ background: BG, perspective: 1600, overflow: "hidden" }}>
		<div style={{ position: "absolute", left: 160, top: 40, width: 1800, height: 1100, borderRadius: 40, background: "linear-gradient(160deg,#1d1d20,#0c0c0e 70%)", boxShadow: "inset 0 0 0 2px #2a2a2e", transform: `scale(${s}) rotateX(34deg) rotateZ(${rz}deg)`, transformOrigin: "50% 40%", opacity: clamp01(t / 0.5) }}>
			<div style={{ position: "absolute", left: 700, top: 250 }}><Dots t={t} /></div>
			<div style={{ position: "absolute", left: 0, right: 0, top: 540, textAlign: "center", fontFamily: CJK, fontSize: 64, color: TX, opacity: clamp01((t - M.title) / 0.6) }}>MosMos 代码与终端场景，现在就能用</div>
			<div style={{ position: "absolute", left: 120, top: 860, fontFamily: CJK, fontSize: 40, color: "#4a4a50" }}>按 Fn，说你想做的事</div>
		</div><Vignette /></AbsoluteFill>
}
// ---------- 4.5–8.2: wide input ----------
const Input: React.FC<{ t: number }> = ({ t }) => {
	const s = t < M.clear ? ty(ASK, t, M.ty, 9) : "", sent = t > M.send
	return <AbsoluteFill style={{ background: BG, overflow: "hidden" }}>
		<div style={{ position: "absolute", left: 180, top: 290, width: 1560, height: 290, borderRadius: 28, background: "#141416", boxShadow: "inset 0 0 0 2px #26262a, 0 40px 80px rgba(0,0,0,.6)", transform: `translateY(${lerp(t, C[0], C[0] + 0.6, 30, 0, inOut)}px) scale(${lerp(t, C[0], C[1], 1.0, 1.05)})`, transformOrigin: "50% 50%" }}>
			<div style={{ position: "absolute", left: 60, top: 64, fontFamily: CJK, fontSize: 54, color: s ? TX : "#55555c", fontStyle: "italic", transform: "skewX(-8deg)" }}>{s || (t > M.clear ? "说点什么…" : "")}{t < M.clear && <Caret t={t} h={50} />}</div>
			<div style={{ position: "absolute", right: 40, bottom: 34, display: "flex", gap: 30, alignItems: "center" }}><span style={{ color: DIM, fontSize: 34 }}>⌘</span><span style={{ color: DIM, fontSize: 34 }}>＋</span>
				<div style={{ width: 58, height: 58, borderRadius: 29, background: sent && t < M.send + 0.2 ? "#fff" : "#3a3a40", display: "flex", alignItems: "center", justifyContent: "center", color: sent && t < M.send + 0.2 ? "#000" : TX, fontSize: 30 }}>↑</div></div></div>
		<div style={{ position: "absolute", right: 260, top: 600, display: "flex", alignItems: "center", gap: 14, padding: "14px 26px", borderRadius: 30, background: "#18181b", boxShadow: "inset 0 0 0 1.5px #2a2a2e", fontFamily: CJK, fontSize: 30, color: TX }}><Wave live t={t} n={5} h={26} color="#fff" />MosMos · Fn</div>
		<Vignette /></AbsoluteFill>
}
// ---------- 8.2–18.8: dialogs over blurred code ----------
const CODE = ["export function findKeys(dir) {", "  const hits = scan(dir, /API_KEY/)", "  return hits.map((f) => f.path)", "}", "$ git status", "  modified: src/config.ts", "const env = loadEnv()", "if (!env.API_KEY) {", "  throw new Error(\"missing key\")", "}", "$ npm run build", "import { scan } from \"./scan\"", "  ok: 214 files", "function redact(s) {", "  return s.replace(KEY, \"***\")", "}"]
const CodeBg: React.FC<{ t: number; ox: number }> = ({ t, ox }) => <AbsoluteFill style={{ background: BG, overflow: "hidden" }}>
	{[0, 1, 2, 3].map((col) => <div key={col} style={{ position: "absolute", left: ox + col * 560 - 200 + Math.sin(t * 0.3 + col) * 20, top: 80 + col * 90 - ((t * 14) % 60), fontFamily: MONO, fontSize: 30, lineHeight: 1.6, color: "#7a7a82", filter: `blur(${col % 2 ? 2.5 : 1.2}px)`, opacity: col % 2 ? 0.35 : 0.55, whiteSpace: "pre" }}>
		{Array.from({ length: 14 }, (_, k) => CODE[(k + col * 5) % CODE.length]).join("\n")}</div>)}</AbsoluteFill>
const PixCard: React.FC<{ x: number; y: number; icon?: boolean; title: string; children: React.ReactNode; op: number; head: string }> = ({ x, y, icon, title, children, op, head }) =>
	<div style={{ position: "absolute", left: x, top: y, opacity: op, transform: `translateY(${(1 - op) * 16}px)` }}>
		<div style={{ fontFamily: MONO, fontSize: 46, letterSpacing: 8, color: "#cfcfd4", filter: "blur(4px)", marginBottom: 46, marginLeft: 60 }}>{head}</div>
		<div style={{ display: "flex", alignItems: "center", gap: 24 }}>
			{icon && <div style={{ width: 140, height: 140, borderRadius: 14, background: "#d9d9dc", display: "flex", alignItems: "center", justifyContent: "center" }}><Wave live t={0.5} n={4} h={38} color="#111" /></div>}
			<div style={{ width: 740, background: "#1c1c1f", boxShadow: "0 0 0 2px #4a4a50", fontFamily: CJK }}>
				<div style={{ padding: "40px 0", textAlign: "center", fontSize: 48, color: TX, letterSpacing: 3, fontWeight: 600 }}>{title}</div>{children}</div></div></div>
const Dialogs: React.FC<{ t: number }> = ({ t }) => {
	if (t >= M.chips) { const a = clamp01((t - M.chips) / 0.4)
		return <AbsoluteFill style={{ background: BG }}><div style={{ position: "absolute", left: 560, top: 180, fontFamily: CJK, opacity: a }}>
			<div style={{ fontSize: 84, color: TX, marginBottom: 56 }}>写进终端的是：</div>
			{[["rg", "搜索"], ["-l", "只列出文件名"], ['"API_KEY"', "要找的词"], [".", "当前项目"]].map(([c, d], k) => <div key={c} style={{ display: "flex", alignItems: "center", gap: 36, marginBottom: 34, opacity: clamp01((t - M.chips - 0.2 - k * 0.18) / 0.3) }}>
				<span style={{ fontFamily: MONO, fontSize: 56, color: "#d8d8dd", background: "#232326", padding: "8px 26px", borderRadius: 6, boxShadow: "inset 0 0 0 1.5px #3a3a40" }}>{c}</span><span style={{ fontSize: 48, color: DIM }}>{d}</span></div>)}
		</div></AbsoluteFill> }
	const btn = (label: string, on: boolean, full = true) => <div style={{ margin: full ? "0 46px 46px" : 0, flex: full ? undefined : 1, padding: "24px 0", textAlign: "center", fontSize: 40, letterSpacing: 2, background: on ? "#e6e6e9" : "#2a2a2e", color: on ? "#111" : "#bdbdc3", boxShadow: "inset 0 0 0 1.5px #55555c" }}>{label}</div>
	const ox = lerp(t, C[1], M.chips, 0, -300)
	return <AbsoluteFill><CodeBg t={t} ox={ox} />
		{t < M.c2 && <PixCard x={420} y={250} icon head="MOSMOS · 听写" title="听到：查找 API_KEY" op={fade(t, M.c1, M.c2 - 0.1, 0.3, 0.3)}>{btn("识别场景 →", t > M.c1 + 1.6)}</PixCard>}
		{t >= M.c2 - 0.05 && t < M.c3 && <PixCard x={640} y={200} head="当前应用 · 终端" title="代码与终端？" op={fade(t, M.c2, M.c3 - 0.1, 0.3, 0.3)}>
			<div style={{ display: "flex", margin: "0 46px 46px", gap: 0 }}>{btn("是", t > M.yes, false)}{btn("否", false, false)}</div></PixCard>}
		{t >= M.c3 - 0.05 && <PixCard x={590} y={260} head="代码与终端" title="命令已生成" op={fade(t, M.c3, M.chips - 0.05, 0.3, 0.3)}>
			<div style={{ margin: "0 46px 30px", fontFamily: MONO, fontSize: 40, color: "#cfcfd4", textAlign: "center" }}>{CMD}</div>{btn(t > M.paste ? "已粘贴到终端" : "粘贴到终端", t > M.paste)}</PixCard>}
		<Vignette /></AbsoluteFill>
}
// ---------- 18.8–end ----------
const Panel: React.FC<{ t: number }> = ({ t }) => <AbsoluteFill style={{ background: BG, perspective: 1500, overflow: "hidden" }}>
	<div style={{ position: "absolute", left: 140, top: 60, width: 1700, height: 1200, borderRadius: 36, background: "linear-gradient(160deg,#1b1b1e,#0b0b0d 75%)", boxShadow: "inset 0 0 0 2px #26262a", transform: `rotateX(30deg) rotateZ(-14deg) translate(${lerp(t, C[2], M.head, 40, -40)}px, ${lerp(t, C[2], M.head, 30, -30)}px)`, transformOrigin: "50% 30%", fontFamily: CJK, opacity: fade(t, C[2] - 1, M.head, 0.3, 0.3) }}>
		<div style={{ position: "absolute", left: 80, top: 50, fontSize: 36, color: DIM }}>MosMos</div>
		<div style={{ position: "absolute", right: 120, top: 150, width: 640, padding: "24px 30px", borderRadius: 18, background: "#2a2a2e", fontSize: 36, color: TX, lineHeight: 1.4 }}>{ASK}</div>
		<div style={{ position: "absolute", left: 120, top: 400, width: 1400, fontSize: 62, color: TX, lineHeight: 1.5 }}>在终端里说一句，MosMos 写成一条命令：</div>
		<div style={{ position: "absolute", left: 120, top: 600, fontFamily: MONO, fontSize: 46, color: "#d8d8dd", background: "#232326", padding: "10px 26px", borderRadius: 8, boxShadow: "inset 0 0 0 1.5px #3a3a40" }}>{CMD}</div>
		<div style={{ position: "absolute", left: 120, top: 730, fontSize: 40, color: DIM }}>{COPY.scenes[4].hint}</div>
	</div><Vignette /></AbsoluteFill>
const QS: [number, string, string][] = [[M.q1, "查一下 3000 端口被谁占用了", "lsof -i :3000"], [M.q2, "把这个分支推到远程", "git push -u origin HEAD"], [M.q3, "看看最近五次提交", "git log -5 --oneline"]]
const Outro: React.FC<{ t: number }> = ({ t }) => {
	if (t >= M.end) return <AbsoluteFill style={{ background: "#000", alignItems: "center", justifyContent: "center" }}><div style={{ display: "flex", alignItems: "center", gap: 22, opacity: clamp01((t - M.end) / 0.5) }}><LogoPixels size={92} t={t} mode="static" invert /><Wordmark size={86} color="#fff" /></div></AbsoluteFill>
	if (t >= M.tag) return <AbsoluteFill style={{ background: "#000", alignItems: "center", justifyContent: "center" }}><div style={{ fontFamily: CJK, fontSize: 92, color: TX, opacity: fade(t, M.tag, M.tagOut, 0.5, 0.4) }}>说出需求，写成命令</div></AbsoluteFill>
	const up = lerp(t, M.dlg, M.dlg + 0.9, 0, 1, inOut), q = QS.filter(([x]) => t >= x).pop()
	return <AbsoluteFill style={{ background: "#000" }}>
		<div style={{ position: "absolute", left: 0, right: 0, top: lerp(up, 0, 1, 470, 160), textAlign: "center", fontFamily: CJK, fontSize: 92, color: TX, opacity: fade(t, M.head, M.dlg + 0.6, 0.5, 0.5) }}>终端里，也能开口说</div>
		{t > M.dlg && <div style={{ position: "absolute", left: 370, top: lerp(up, 0, 1, 760, 260), width: 1180, height: 560, borderRadius: 30, background: "linear-gradient(180deg,#1c1c1f,#111113)", boxShadow: "inset 0 0 0 1.5px #2c2c30, 0 30px 60px rgba(0,0,0,.6)", fontFamily: CJK, opacity: clamp01((t - M.dlg) / 0.3) * clamp01((M.tag - 0.05 - t) / 0.3) }}>
			<div style={{ display: "flex", justifyContent: "space-between", padding: "36px 50px", fontSize: 44, color: TX, borderBottom: "1px solid #26262a" }}><span>MosMos · 代码与终端</span><span style={{ color: DIM }}>×</span></div>
			{q && <div key={q[0]} style={{ position: "absolute", right: 50, top: 180, width: 760, opacity: clamp01((t - q[0]) / 0.3) }}>
				<div style={{ padding: "26px 36px", borderRadius: 20, background: "#2a2a2e", fontSize: 50, color: TX, lineHeight: 1.4 }}>{q[1]}</div>
				<div style={{ marginTop: 40, fontFamily: MONO, fontSize: 42, color: "#cfcfd4", opacity: clamp01((t - q[0] - 0.7) / 0.3) }}>$ {q[2]}</div></div>}
		</div>}</AbsoluteFill>
}

export const Film: React.FC = () => {
	const t = useT()
	if (t < C[0]) return <Intro t={t} />
	if (t < C[1]) return <Input t={t} />
	if (t < C[2]) return <Dialogs t={t} />
	if (t < M.head) return <Panel t={t} />
	return <AbsoluteFill><Outro t={t} />{t < M.head + 0.35 && <AbsoluteFill style={{ opacity: 1 - clamp01((t - M.head) / 0.35) }}><Panel t={t} /></AbsoluteFill>}</AbsoluteFill>
}
