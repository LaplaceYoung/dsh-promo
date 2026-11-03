// Template 45 — structure of Linear "Introducing Dashboards in Linear" (2025), MosMos content.
// Near-black film shot on tilted dashboard planes with depth of field: glowing waveform curves under a white title,
// a red scatter of spoken lines, glowing thin bars per scene, colour clusters per scene, keyword bars panning into a
// meeting area chart, then title cards fading through black into dark panels (scene cards, polish levels, meeting
// summary and its to-do list) and a white logo lock-up. The ref is 1920×960; content sits in the centred 960 band.
import React from "react"
import { AbsoluteFill } from "remotion"
import { CJK, SANS, lerp, clamp01, inOut, out, useT, LogoPixels, Cursor, COPY, SCENES } from "../_engine/src/mos"
import { rand, DOF } from "../_engine/src/kit"
import TL from "./timeline.json"

const M = TL.marks as Record<string, number>, C = TL.cuts as number[]
const TX = "#e8e8ea", DIM = "#6c6d73", FAINT = "#3a3b40", BG = "#050506", PANEL = "#0d0d10"
const fade = (t: number, a: number, b: number, d = 0.4, d2 = d) => clamp01((t - a) / d) * clamp01((b - t) / d2)
const glow = (c: string, r = 10) => `0 0 ${r}px ${c}, 0 0 ${r * 2.4}px ${c}`
const Lbl: React.FC<{ x: number; y: number; s?: number; c?: string; w?: number; b?: boolean; children: React.ReactNode }> = ({ x, y, s = 22, c = DIM, w, b, children }) =>
	<div style={{ position: "absolute", left: x, top: y, width: w, fontFamily: CJK, fontSize: s, color: c, fontWeight: b ? 600 : 400, whiteSpace: "nowrap" }}>{children}</div>
const Card: React.FC<{ x: number; y: number; w: number; h: number; children?: React.ReactNode }> = ({ x, y, w, h, children }) =>
	<div style={{ position: "absolute", left: x, top: y, width: w, height: h, borderRadius: 18, background: PANEL, boxShadow: `inset 0 0 0 1.5px #1c1c21` }}>{children}</div>
const Title: React.FC<{ s: string; o: number; x?: number }> = ({ s, o, x }) =>
	<div style={{ position: "absolute", left: x ?? 0, width: x === undefined ? 1920 : undefined, top: 490, textAlign: x === undefined ? "center" : undefined, fontFamily: CJK, fontWeight: 600, fontSize: 72, color: "#f4f4f6", opacity: o, letterSpacing: "0.01em" }}>{s}</div>
const Vig = () => <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0) 45%, rgba(0,0,0,.7) 100%)" }} />

// ---------- A 0–5.08: glowing waveform curves on a tilted plane ----------
const Curves: React.FC<{ t: number }> = ({ t }) => {
	const grow = clamp01(t / 3.5)
	const lines = Array.from({ length: 9 }, (_, k) => { const pts: string[] = []
		for (let i = 0; i <= 60; i++) { const x = i * 40, y = 80 + k * 80 + 700 * Math.pow(i / 60, 1.8) - 26 * Math.sin(i * 0.35 + k + t * 0.8) * (0.4 + k * 0.08); pts.push(`${i ? "L" : "M"}${x} ${y.toFixed(1)}`) }
		return pts.join(" ") })
	return <div style={{ position: "relative", width: 2600, height: 1400 }}>
		<svg width={2400} height={1100} style={{ position: "absolute", left: 0, top: 200, overflow: "visible" }}>
			{lines.map((d, k) => <path key={k} d={d} fill="none" stroke={k % 3 ? "#5b5cff" : "#9aa0ff"} strokeWidth={k % 3 ? 4 : 3} strokeDasharray={3000} strokeDashoffset={3000 * (1 - grow)} style={{ filter: "drop-shadow(0 0 8px #4a4cff) drop-shadow(0 0 22px #3436d8)" }} opacity={0.5 + 0.5 * rand(k)} />)}
		</svg>
		{Array.from({ length: 6 }, (_, r) => <div key={r} style={{ position: "absolute", left: 2050, top: 420 + r * 120, display: "flex", gap: 26, alignItems: "center" }}>
			<span style={{ width: 22, height: 22, borderRadius: 6, background: ["#ff7a2a", "#4ade80", "#60a5fa", "#f472b6", "#facc15", "#a78bfa"][r], boxShadow: glow(["#ff7a2a", "#4ade80", "#60a5fa", "#f472b6", "#facc15", "#a78bfa"][r], 4) }} />
			<span style={{ fontFamily: CJK, fontSize: 30, color: "#9a9ba2" }}>{SCENES[r % 5]}</span></div>)}
		<div style={{ position: "absolute", left: 1500, top: 30, display: "grid", gridTemplateColumns: "repeat(26, 22px)", gap: 10 }}>{Array.from({ length: 26 * 7 }, (_, k) =>
			<span key={k} style={{ width: 10, height: 10, borderRadius: 5, background: "#b9a3ff", opacity: rand(k * 3) > 0.55 ? 0.15 + 0.7 * rand(k) * fade(t, rand(k) * 3, 99, 0.6) : 0.05 }} />)}</div>
		<Lbl x={2050} y={330} s={34} c="#cfd0d6" b>场景 · 自动识别</Lbl>
	</div>
}
const ShotA: React.FC<{ t: number }> = ({ t }) => {
	const k = t / C[0], tf = `translate(${-1300 + 120 * k}px, ${-200 + 40 * k}px) perspective(1600px) rotateX(${45 - 4 * k}deg) rotateZ(${16 - 3 * k}deg) scale(${1.1 + 0.08 * k})`
	return <AbsoluteFill style={{ background: BG, overflow: "hidden" }}>
		<AbsoluteFill style={{ opacity: clamp01(t / 2.6) }}><DOF tf={tf} angle={160} focus={58} band={16} blur={8} origin="50% 50%"><Curves t={t} /></DOF></AbsoluteFill>
		<Title s="从语音输入，到会议总结和待办" o={inOut(clamp01((t - M.t1) / 1.7))} x={420} /><Vig /></AbsoluteFill>
}

// ---------- B 5.08–9.88: red scatter of spoken lines ----------
const Scatter: React.FC<{ t: number }> = ({ t }) => {
	const d: React.ReactNode[] = []
	for (let k = 0; k < 420; k++) { const u = rand(k * 1.7), x = 60 + u * 2200, y = 700 - u * 330 - (rand(k * 5.1) - 0.5) * 320 * (0.6 + u * 0.7)
		const a = clamp01((t - M.b0 - u * 3.6) / 0.35), r = 13 + rand(k * 9) * 8
		d.push(<span key={k} style={{ position: "absolute", left: x, top: y, width: r, height: r, borderRadius: r, background: "#ff3344", boxShadow: glow("#ff2233", 6), opacity: a, transform: `scale(${0.4 + 0.6 * out(a)})` }} />) }
	return <div style={{ position: "relative", width: 2400, height: 1300 }}>
		<Card x={0} y={0} w={2400} h={1000}><Lbl x={60} y={50} s={36} c={TX} b>逐字稿 · 每一句话</Lbl><Lbl x={60} y={104} s={24}>按 Fn + Shift 开始记录</Lbl>{d}
			{["开场", "讨论", "结论", "待办", "收尾"].map((s, k) => <Lbl key={s} x={160 + k * 470} y={900} s={26}>{s}</Lbl>)}</Card>
		<div style={{ position: "absolute", left: 0, top: 1030, width: 2400, height: 200, borderRadius: 18, background: "#141519" }}>
			<Lbl x={940} y={20} s={26}>说话人</Lbl>{["说话人 1", "说话人 2", "说话人 3", "说话人 1", "说话人 2"].map((s, k) => <Lbl key={k} x={420 + k * 380} y={110} s={30} c="#c9cad0" b>{s}</Lbl>)}</div>
	</div>
}
const ShotB: React.FC<{ t: number }> = ({ t }) => {
	const k = (t - C[0]) / (C[1] - C[0]), tf = `translate(${-200 - 160 * k}px, ${20 - 30 * k}px) perspective(1500px) rotateX(56deg) rotateZ(${-10 + 2 * k}deg) scale(${1.25 + 0.12 * k})`
	return <AbsoluteFill style={{ background: BG, overflow: "hidden", opacity: clamp01((t - C[0]) / 0.5) * 0.65 + 0.35 }}><DOF tf={tf} angle={180} focus={52} band={15} blur={7}><Scatter t={t} /></DOF><Vig /></AbsoluteFill>
}

// ---------- C 9.88–14.67: thin glowing bars per scene ----------
const Bars: React.FC<{ t: number }> = ({ t }) => {
	const blue = [0.95, 0.8, 0.66, 0.52, 0.4, 0.24, 0.12], red = [1, 0.9, 0.8, 0.7, 0.58, 0.5, 0.4, 0.3], tip = t > M.tip
	const g = (k: number) => out(clamp01((t - M.r0 - k * 0.12) / 0.9))
	return <div style={{ position: "relative", width: 2600, height: 1200 }}>
		<Card x={0} y={0} w={1150} h={1100}><Lbl x={50} y={50} s={34} c="#b9bac0" b>场景</Lbl><Lbl x={50} y={100} s={22}>自动识别当前应用</Lbl>
			{blue.map((h, k) => <div key={k} style={{ position: "absolute", left: 90 + k * 140, bottom: 160, width: 7, height: 760 * h, borderRadius: 4, background: "#36b6ff", boxShadow: glow("#1e90ff", 8) }} />)}
			{blue.map((_, k) => <span key={k} style={{ position: "absolute", left: 72 + k * 140, bottom: 80, width: 44, height: 44, borderRadius: 22, background: "#2a2b31", color: "#cfd0d6", fontFamily: CJK, fontSize: 22, display: "flex", alignItems: "center", justifyContent: "center" }}>{"飞邮文提码会词"[k]}</span>)}</Card>
		<Card x={1250} y={0} w={1300} h={1100}><Lbl x={50} y={50} s={34} c="#b9bac0" b>润色</Lbl><Lbl x={50} y={100} s={22}>关闭 · 标准 · 高级</Lbl>
			{red.map((h, k) => <div key={k} style={{ position: "absolute", left: 100 + k * 150, bottom: 160, width: 7, height: 800 * h * g(k), borderRadius: 4, background: "#ff4757", boxShadow: glow("#ff1f3a", 9) }} />)}
			{red.map((_, k) => <span key={k} style={{ position: "absolute", left: 82 + k * 150, bottom: 80, width: 44, height: 44, borderRadius: 22, background: ["#2a2b31", "#3a2a2a", "#2a3140", "#30302a"][k % 4], border: k === 4 ? "3px solid #6c7cff" : undefined }} />)}
			{tip && <div style={{ position: "absolute", left: 640, top: 330, padding: "14px 26px", borderRadius: 12, background: "#1d1e23", boxShadow: "0 10px 30px rgba(0,0,0,.6), inset 0 0 0 1.5px #2c2d33", display: "flex", gap: 18, alignItems: "center", fontFamily: CJK, fontSize: 30, color: TX, opacity: clamp01((t - M.tip) / 0.25) }}>
				<span style={{ width: 16, height: 16, borderRadius: 4, background: "#ff4757" }} />邮件<span style={{ color: DIM }}>完整专业</span></div>}</Card>
	</div>
}
const ShotC: React.FC<{ t: number }> = ({ t }) => {
	const k = (t - C[1]) / (C[2] - C[1]), tf = `translate(${-520 - 200 * k}px, ${330 - 20 * k}px) perspective(1500px) rotateX(36deg) rotateY(-10deg) rotateZ(-30deg) scale(${1.1 + 0.1 * k})`
	return <AbsoluteFill style={{ background: BG, overflow: "hidden", opacity: 1 - 0.2 * clamp01((t - 14.2) / 0.45) }}><DOF tf={tf} angle={150} focus={62} band={14} blur={8}><Bars t={t} /></DOF><Vig /></AbsoluteFill>
}

// ---------- D 14.67–19.47: colour clusters per scene ----------
const COLS = ["#4ade80", "#60a5fa", "#facc15", "#f472b6", "#22d3ee", "#fb923c"]
const Clusters: React.FC<{ t: number }> = ({ t }) => {
	const d: React.ReactNode[] = []
	for (let g = 0; g < 4; g++) for (let k = 0; k < 70; k++) { const n = g * 70 + k, a = rand(n * 2.3) * Math.PI * 2, r = 30 + rand(n * 4.1) * 210
		const x = 260 + g * 600 + Math.cos(a) * r * 0.85, y = 470 + Math.sin(a) * r * 0.75, o = clamp01((t - C[2] - rand(n) * 2.6) / 0.3)
		d.push(<span key={n} style={{ position: "absolute", left: x, top: y, width: 15, height: 15, borderRadius: 8, background: COLS[n % 6], boxShadow: glow(COLS[n % 6], 5), opacity: o }} />) }
	return <div style={{ position: "relative", width: 2500, height: 1300 }}>
		<Card x={500} y={0} w={700} h={170}><Lbl x={40} y={30} s={26} c="#c9cad0" b>自动识别场景</Lbl><Lbl x={40} y={86} s={34} c={TX}>按当前应用</Lbl></Card>
		<Card x={1260} y={0} w={700} h={170}><Lbl x={40} y={30} s={26} c="#c9cad0" b>手动切换</Lbl><Lbl x={40} y={86} s={34} c={TX}>随时可改</Lbl></Card>
		<Card x={0} y={210} w={2500} h={1000}><div style={{ position: "absolute", left: 0, top: 0 }}>{d}</div>
			{SCENES.slice(0, 4).map((s, g) => <Lbl key={s} x={190 + g * 600} y={820} s={30}>{s}</Lbl>)}</Card>
	</div>
}
const ShotD: React.FC<{ t: number }> = ({ t }) => {
	const k = (t - C[2]) / (C[3] - C[2]), tf = `translate(${-300 + 160 * k}px, ${-120 + 30 * k}px) perspective(1600px) rotateX(${48 - 4 * k}deg) rotateZ(${-4 + 2 * k}deg) scale(${1.1 + 0.06 * k})`
	return <AbsoluteFill style={{ background: BG, overflow: "hidden" }}><DOF tf={tf} angle={180} focus={50} band={17} blur={7}><Clusters t={t} /></DOF><Vig /></AbsoluteFill>
}

// ---------- E 19.47–24.33: keyword bars, pan to the meeting area chart ----------
const Area: React.FC<{ t: number }> = ({ t }) => {
	const g = (k: number) => out(clamp01((t - M.e0 - k * 0.1) / 1.0)), a = inOut(clamp01((t - M.pan) / 2.0))
	const hs = [0.25, 0.38, 0.52, 0.45, 0.66, 0.8, 0.7, 0.95, 0.6, 0.5]
	const top = (w: number, amp: number) => { let p = "M0 700"; for (let i = 0; i <= 40; i++) { const u = i / 40, y = 700 - amp * (0.15 + 0.85 * Math.pow(u, 0.9)) * clamp01(a * 1.4 - u * 0.4) - 30 * Math.sin(i * 0.45 + w) * a; p += ` L${i * 30} ${y.toFixed(1)}` } return p + " L1200 700 Z" }
	return <div style={{ position: "relative", width: 2900, height: 1200 }}>
		<Card x={0} y={0} w={1300} h={1000}><Lbl x={50} y={50} s={32} c="#c9cad0" b>热词</Lbl><Lbl x={50} y={100} s={22}>英文专有词、近音词和人名</Lbl>
			{hs.map((h, k) => <div key={k} style={{ position: "absolute", left: 90 + k * 115, bottom: 120, width: 8, height: 700 * h * g(k), borderRadius: 4, background: ["#a78bfa", "#60a5fa", "#ff5d7a", "#4ade80", "#22d3ee"][k % 5], boxShadow: glow(["#8b5cf6", "#3b82f6", "#ff2d55", "#22c55e", "#06b6d4"][k % 5], 8) }} />)}
			{["Figma", "Nimbus", "林清禾", "MosMos"].map((s, k) => <Lbl key={s} x={90 + k * 290} y={910} s={24}>{s}</Lbl>)}</Card>
		<Card x={1400} y={0} w={1400} h={1000}><Lbl x={50} y={50} s={40} c={TX} b>会议进行中 · 多人逐字稿</Lbl>
			<svg width={1200} height={760} style={{ position: "absolute", left: 100, top: 160, overflow: "visible" }}>
				<defs><linearGradient id="ga" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#7c7cff" stopOpacity="0.95" /><stop offset="1" stopColor="#2b2b9a" stopOpacity="0.2" /></linearGradient></defs>
				<path d={top(0, 380)} fill="url(#ga)" style={{ filter: "drop-shadow(0 0 18px #5b5cff)" }} /><path d={top(2, 140)} fill="#c9c9ff" opacity={0.35} />
			</svg>
			{["开场", "讨论", "结论", "待办"].map((s, k) => <Lbl key={s} x={120 + k * 330} y={930} s={22}>{s}</Lbl>)}</Card>
	</div>
}
const ShotE: React.FC<{ t: number }> = ({ t }) => {
	const p = inOut(clamp01((t - M.pan) / 1.8)), z = (t - C[3]) / (C[4] - C[3])
	const tf = `translate(${-500 - 650 * p}px, ${-60 - 40 * p}px) perspective(1600px) rotateX(${50 - 6 * p}deg) rotateY(${-4 * p}deg) rotateZ(-28deg) scale(${0.78 + 0.14 * z})`
	return <AbsoluteFill style={{ background: BG, overflow: "hidden" }}><DOF tf={tf} angle={160} focus={55} band={16} blur={8}><Area t={t} /></DOF>
		<AbsoluteFill style={{ background: "radial-gradient(ellipse at 60% 60%, rgba(110,110,255,.35), rgba(0,0,0,0) 60%)", opacity: clamp01((t - 22.0) / 1.4) }} /><Vig /></AbsoluteFill>
}

// ---------- 24.33–: title cards fading through black into panels ----------
const SceneCards: React.FC<{ t: number }> = ({ t }) => {
	const xs = [["飞书 / 微信", COPY.scenes[0].style, COPY.scenes[0].out], ["邮件", COPY.scenes[1].style, COPY.mail[1]], ["文档", COPY.scenes[2].style, COPY.doc.map((d) => d.join("")).join(" ")]]
	return <div style={{ position: "relative", width: 2400, height: 1200 }}>{xs.map(([a, b, c], k) =>
		<Card key={a} x={k * 640} y={k * 70} w={600} h={900}><div style={{ position: "absolute", left: 36, top: 34, display: "flex", gap: 16, alignItems: "center" }}><span style={{ width: 34, height: 34, borderRadius: 8, background: ["#2f9e5a", "#3b6fd8", "#8a5cd8"][k], display: "flex", alignItems: "center", justifyContent: "center", fontFamily: CJK, fontSize: 20, color: "#fff" }}>{a[0]}</span><span style={{ fontFamily: CJK, fontSize: 34, color: TX, fontWeight: 600 }}>{a}</span></div>
			<Lbl x={36} y={110} s={24}>{b}</Lbl><div style={{ position: "absolute", left: 36, top: 180, width: 520, fontFamily: CJK, fontSize: 26, lineHeight: 1.7, color: "#9c9da4" }}>{c}</div>
			<div style={{ position: "absolute", left: 36, bottom: 40, display: "flex", gap: 12 }}>{[0, 1, 2].map((i) => <span key={i} style={{ width: 120, height: 14, borderRadius: 7, background: i ? FAINT : ["#2f9e5a", "#3b6fd8", "#8a5cd8"][k] }} />)}</div></Card>)}</div>
}
const Polish: React.FC<{ t: number }> = ({ t }) => {
	const sel = t > 32.4 ? 1 : 0
	return <div style={{ position: "relative", width: 2200, height: 1100 }}><Card x={0} y={0} w={2100} h={1000}>
		<div style={{ position: "absolute", left: 40, top: 36, display: "flex", gap: 16, alignItems: "center" }}><span style={{ width: 34, height: 34, borderRadius: 8, background: "#2f9e5a" }} /><span style={{ fontFamily: CJK, fontSize: 36, color: TX, fontWeight: 600 }}>润色档位</span></div>
		<Lbl x={40} y={110} s={24}>{COPY.polishDesc}</Lbl>
		{COPY.polish.map((p, k) => <div key={p.id} style={{ position: "absolute", left: 40 + k * 680, top: 200, width: 640, height: 740, borderRadius: 16, background: k === sel ? "#16171c" : "#0f1013", boxShadow: k === sel ? "inset 0 0 0 2px #3a3c48" : "inset 0 0 0 1.5px #1a1b20" }}>
			<Lbl x={30} y={30} s={40} c={TX} b>{p.label}</Lbl><Lbl x={30} y={96} s={24}>{p.hint}</Lbl>
			<div style={{ position: "absolute", left: 30, top: 170, width: 580, fontFamily: CJK, fontSize: 27, lineHeight: 1.7, color: k === sel ? "#d5d6dc" : "#7b7c83" }}>{p.out || COPY.raw}</div>
			{Array.from({ length: 14 }, (_, i) => <span key={i} style={{ position: "absolute", left: 40 + i * 40, bottom: 40 + 60 * rand(k * 20 + i), width: 10, height: 10, borderRadius: 5, background: COLS[(i + k) % 6], boxShadow: glow(COLS[(i + k) % 6], 4) }} />)}</div>)}
		<Cursor x={lerp(t, M.d2, 32.3, 520, 1000, inOut)} y={lerp(t, M.d2, 32.3, 620, 330, inOut)} s={1.3} down={Math.abs(t - 32.4) < 0.08} /></Card></div>
}
const Summary: React.FC<{ t: number }> = ({ t }) => <div style={{ position: "relative", width: 2200, height: 1100 }}><Card x={0} y={0} w={2100} h={980}>
	<div style={{ position: "absolute", left: 40, top: 36, display: "flex", gap: 16, alignItems: "center" }}><span style={{ width: 34, height: 34, borderRadius: 8, background: "#3b6fd8" }} /><span style={{ fontFamily: CJK, fontSize: 36, color: TX, fontWeight: 600 }}>会议总结</span></div>
	{COPY.meetingFeatures.map(([a, b], k) => <div key={a} style={{ position: "absolute", left: 40 + k * 680, top: 140 }}><Lbl x={0} y={0} s={26} c="#a8a9b0" b>{a}</Lbl><Lbl x={0} y={50} s={22}>{b}</Lbl></div>)}
	<div style={{ position: "absolute", left: 40, top: 300, width: 1400, fontFamily: CJK, fontSize: 34, color: "#c9cad0", lineHeight: 1.6 }}>{COPY.meetingConclusion}</div>
	{Array.from({ length: 12 }, (_, k) => <div key={k} style={{ position: "absolute", left: 120 + k * 70, bottom: 60, width: 10, height: 80 + 260 * Math.abs(Math.sin(k * 1.3 + 0.4)) * clamp01((t - M.p3 - k * 0.04) / 0.6), borderRadius: 5, background: "#5a4fd0", boxShadow: glow("#3f33b8", 5) }} />)}</Card></div>
const Todo: React.FC<{ t: number }> = ({ t }) => <div style={{ position: "relative", width: 2400, height: 1300 }}>
	<Card x={0} y={0} w={700} h={600}><Lbl x={36} y={34} s={30} c={TX} b>待办事项</Lbl>{COPY.todos.map((s, k) => <div key={s} style={{ position: "absolute", left: 36, top: 120 + k * 80, display: "flex", gap: 18, alignItems: "center", fontFamily: CJK, fontSize: 26, color: "#b9bac0" }}><span style={{ width: 22, height: 22, borderRadius: 6, border: "2px solid #4ade80" }} />{s}</div>)}</Card>
	<Card x={760} y={0} w={1500} h={1250}><Lbl x={36} y={34} s={26}>多人逐字稿</Lbl>
		{Array.from({ length: 14 }, (_, k) => { const [a, b, c] = COPY.meeting[k % 3]; const o = clamp01((t - M.l3 - k * 0.05) / 0.3)
			return <div key={k} style={{ position: "absolute", left: 36, top: 100 + k * 78, width: 1420, display: "flex", gap: 30, alignItems: "center", fontFamily: CJK, fontSize: 26, color: k < 7 ? "#c9cad0" : "#5c5d63", opacity: o }}>
				<span style={{ color: DIM, width: 80 }}>{b}</span><span style={{ width: 120, color: COLS[k % 3] }}>{a}</span><span style={{ flex: 1 }}>{c}</span><span style={{ width: 26, height: 26, borderRadius: 13, background: COLS[(k + 2) % 6], opacity: 0.8 }} /></div> })}</Card></div>

const Late: React.FC<{ t: number }> = ({ t }) => {
	let body: React.ReactNode = null, o = 1
	if (t < M.k1 + 0.1) body = null
	else if (t < M.x2) { const k = (t - M.k1) / (M.x2 - M.k1); o = fade(t, M.k1, M.x2, 0.45, 1.1)
		body = <DOF tf={`translate(${-430 - 220 * k}px, ${120 - 40 * k}px) perspective(1600px) rotateX(38deg) rotateZ(-14deg) scale(${1.0 + 0.05 * k})`} angle={165} focus={48} band={18} blur={6}><SceneCards t={t} /></DOF> }
	else if (t >= M.d2 && t < M.x3) { const k = (t - M.d2) / (M.x3 - M.d2); o = fade(t, M.d2, M.d2o + 0.15, 0.45, 0.15)
		body = <DOF tf={`translate(${-60 + 120 * k}px, ${70 - 30 * k}px) perspective(1700px) rotateX(30deg) rotateZ(-8deg) scale(${0.95 + 0.06 * k})`} angle={170} focus={45} band={20} blur={6}><Polish t={t} /></DOF> }
	else if (t >= M.p3 && t < M.l3 + 0.3) { const k = (t - M.p3) / 2.3; o = fade(t, M.p3, M.l3 + 0.3, 0.35, 0.5)
		body = <DOF tf={`translate(${-40 + 100 * k}px, ${80 - 20 * k}px) perspective(1700px) rotateX(32deg) rotateZ(-6deg) scale(0.98)`} angle={170} focus={40} band={22} blur={6}><Summary t={t} /></DOF> }
	if (t >= M.l3 - 0.2 && t < M.logo) { const k = (t - M.l3) / 3; const o2 = fade(t, M.l3 - 0.2, M.l3o + 0.4, 0.6, 0.4)
		body = <>{body && <AbsoluteFill style={{ opacity: o }}>{body}</AbsoluteFill>}<AbsoluteFill style={{ opacity: o2 }}><DOF tf={`translate(${-100 + 160 * k}px, ${20 - 40 * k}px) perspective(1700px) rotateX(34deg) rotateZ(-7deg) scale(0.9)`} angle={170} focus={42} band={22} blur={6}><Todo t={t} /></DOF></AbsoluteFill></>; o = 1 }
	const tx = t < M.k1 + 0.6 ? ["谁说了什么，接下来做什么", fade(t, M.x1, M.k1 + 0.6, 1.0, 0.35)] : t < M.d2 + 0.3 ? ["保留多少原话，由你决定", fade(t, M.x2, M.x2o + 0.55, 0.9, 0.55)] : t < M.p3 ? ["你在哪里说，决定我们怎么写", fade(t, M.x3, M.p3, 0.85, 0.03)] : ["", 0]
	const lo = clamp01((t - M.logo) / 1.2)
	return <AbsoluteFill style={{ background: BG, overflow: "hidden" }}>{body && <AbsoluteFill style={{ opacity: o }}>{body}</AbsoluteFill>}
		{(tx[1] as number) > 0 && <Title s={tx[0] as string} o={tx[1] as number} />}
		{t >= M.logo && <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity: inOut(lo) }}><div style={{ display: "flex", alignItems: "center", gap: 22 }}><LogoPixels size={84} t={t} mode="static" invert /><span style={{ fontFamily: SANS, fontWeight: 600, fontSize: 84, color: "#f4f4f6", letterSpacing: "-0.02em" }}>MosMos</span></div></AbsoluteFill>}
		<Vig /></AbsoluteFill>
}

export const Film: React.FC = () => {
	const t = useT(), i = C.filter((c) => t >= c).length
	return [<ShotA t={t} />, <ShotB t={t} />, <ShotC t={t} />, <ShotD t={t} />, <ShotE t={t} />][i] ?? <Late t={t} />
}
