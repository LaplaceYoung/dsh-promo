// Template 22 — structure of Anthropic "Claude now has memory" (2025), MosMos content (hot words, 热词).
// Warm paper background (licensed texture, ASSETS.md), a hand-drawn line that becomes a thought cloud and then a
// settings card, a chat where hot words are recognised, an orange octagon where word cards are sorted, and a
// reply that folds into an envelope.
import React from "react"
import { AbsoluteFill, Img, staticFile } from "remotion"
import { CJK, HEAVY, SANS, COPY, lerp, clamp01, inOut, typeAt, useT, Cursor, path, LogoPixels, Wordmark, Wave, T3 } from "../_engine/src/mos"
import { Camera, rand } from "../_engine/src/kit"
import TL from "./timeline.json"

const M = TL.marks as Record<string, number>, C = TL.cuts
const BEIGE = "#e7dece", SAGE = "#efefe8", ORG = "#d9734e", INKC = "#1f1d1a"
const Paper: React.FC<{ bg?: string }> = ({ bg = BEIGE }) => <AbsoluteFill style={{ background: bg }}><Img src={staticFile("t22-paper.webp")} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", mixBlendMode: "multiply", opacity: 0.35 }} /></AbsoluteFill>
const Sq: React.FC<{ p: number; w?: number; s?: number }> = ({ p, w = 6, s = 1 }) => <svg width={420 * s} height={140 * s} viewBox="0 0 420 140"><path d="M10 90 C40 20, 60 20, 70 80 S100 130, 120 70 S160 10, 175 75 S210 130, 230 70 S270 15, 285 75 S320 125, 340 70 S380 30, 410 60" fill="none" stroke={INKC} strokeWidth={w} strokeLinecap="round" strokeDasharray={1400} strokeDashoffset={1400 * (1 - p)} /></svg>

// ---------- settings card
const Toggle: React.FC<{ on: number }> = ({ on }) => <div style={{ width: 62, height: 36, borderRadius: 18, background: on > 0.5 ? "#2f6fdb" : "#d8d6d0", position: "relative" }}><div style={{ position: "absolute", top: 4, left: 4 + 26 * on, width: 28, height: 28, borderRadius: 14, background: "#fff" }} /></div>
const HOT = [["人名", "林清禾", "林清和"], ["项目", "Nimbus", "尼姆布斯"], ["工具", "Figma", "飞马"]]
const Settings: React.FC<{ t: number }> = ({ t }) => {
	const a = clamp01((t - M.card) / 0.6), gen = t > M.gen
	const w = lerp(t, M.card, M.card + 0.6, 380, 900, inOut), h = gen ? lerp(t, M.gen, M.gen + 0.5, 300, 560, inOut) : lerp(t, M.card, M.card + 0.6, 300, 300)
	const cur = path(t, [[M.card + 0.6, 1500, 900], [M.tg1 - 0.2, 1340, 476], [M.tg2 - 0.2, 1340, 566], [M.gen, 1500, 800]])
	return (
		<AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
			<div style={{ width: w, height: h, borderRadius: lerp(t, M.card, M.card + 0.6, 160, 22), background: "#fbfaf6", boxShadow: "0 20px 60px rgba(60,40,20,.15)", padding: a > 0.8 ? "40px 46px" : 0, overflow: "hidden", fontFamily: CJK, color: INKC }}>
				{a > 0.8 && !gen && <>
					<div style={{ fontFamily: HEAVY, fontWeight: 700, fontSize: 40 }}>我的热词</div>
					{[["说话时优先识别热词", M.tg1], ["润色时保持热词原样", M.tg2]].map(([l, tt]) => <div key={l as string} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 34, fontSize: 28 }}>{l}<Toggle on={clamp01((t - (tt as number)) / 0.15)} /></div>)}
				</>}
				{gen && <>
					<div style={{ fontSize: 24, color: T3 }}>{t < M.gen + 1.2 ? "正在整理热词…" : "热词 · 3 条已启用"}</div>
					{HOT.map(([k, v, n], i) => <div key={k} style={{ marginTop: 30, opacity: clamp01((t - M.gen - 0.8 - i * 0.5) / 0.3) }}><div style={{ fontSize: 22, color: T3 }}>{k}</div><div style={{ fontSize: 34, fontWeight: 600, marginTop: 4 }}>{v}<span style={{ fontSize: 22, color: T3, fontWeight: 400, marginLeft: 16 }}>近音：{n}</span></div></div>)}
				</>}
			</div>
			{t > M.card + 0.6 && t < M.gen && <Cursor x={cur.x} y={cur.y} down={Math.abs(t - M.tg1) < 0.08 || Math.abs(t - M.tg2) < 0.08} />}
		</AbsoluteFill>
	)
}
const Opening: React.FC<{ t: number }> = ({ t }) => {
	const cl = clamp01((t - M.cloud) / 0.5), out = clamp01((t - M.card) / 0.4)
	return (
		<AbsoluteFill>
			{t < M.card + 0.4 && <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity: 1 - out }}>
				<div style={{ position: "relative", width: 700, height: 460 }}>
					{[[350, 230, 200], [210, 260, 130], [490, 260, 140], [280, 150, 120], [430, 160, 120]].map(([x, y, r], i) => <div key={i} style={{ position: "absolute", left: x - r, top: y - r, width: r * 2, height: r * 2, borderRadius: 999, background: "#fbfaf6", transform: `scale(${cl})` }} />)}
					<div style={{ position: "absolute", left: 140, top: 160 }}><Sq p={clamp01((t - M.draw) / 1.1)} /></div>
				</div>
			</AbsoluteFill>}
			{t > M.card && <Settings t={t} />}
		</AbsoluteFill>
	)
}

// ---------- chat
const ASK = "帮我跟林清禾说一下，Nimbus 的 Figma 文件今天发她"
const REPLY = "清禾，Nimbus 的 Figma 文件今天发你，记得查收。"
const HL = (s: string) => s.split(/(林清禾|清禾|Nimbus|Figma)/).map((x, i) => /林清禾|清禾|Nimbus|Figma/.test(x) ? <span key={i} style={{ background: "#f6dccf", color: "#a4431f", borderRadius: 4, padding: "0 4px" }}>{x}</span> : <span key={i}>{x}</span>)
const Home: React.FC<{ t: number }> = ({ t }) => {
	const s = typeAt(ASK, t, M.say, 9).s, sent = t > M.send
	return (
		<AbsoluteFill><Paper bg={SAGE} />
			{!sent && <div style={{ position: "absolute", left: 0, right: 0, top: 300, textAlign: "center", fontFamily: HEAVY, fontWeight: 500, fontSize: 64, color: INKC }}><span style={{ color: ORG }}>✳</span> 你好，小林</div>}
			<div style={{ position: "absolute", left: 460, top: sent ? lerp(t, M.send, M.send + 0.5, 470, 120, inOut) : 470, width: 1000 }}>
				{!sent ? <div style={{ borderRadius: 22, background: "#fff", boxShadow: "0 10px 40px rgba(0,0,0,.08)", padding: "28px 32px", fontFamily: CJK }}>
					<div style={{ fontSize: 30, color: s ? INKC : "#a9a59c", minHeight: 90, lineHeight: 1.5 }}>{s || "按 Fn，说点什么…"}</div>
					<div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 18, color: "#7a766d" }}><span style={{ border: "1px solid #e3e0d8", padding: "6px 12px", borderRadius: 8 }}>场景：飞书</span><span style={{ border: "1px solid #e3e0d8", padding: "6px 12px", borderRadius: 8 }}>热词 3</span><div style={{ flex: 1 }} /><div style={{ width: 48, height: 48, borderRadius: 12, background: ORG, display: "flex", alignItems: "center", justifyContent: "center" }}><Wave t={t} live={!!s && s.length < ASK.length} n={5} h={20} color="#fff" /></div></div>
				</div> : <div style={{ marginLeft: "auto", width: "fit-content", maxWidth: 900, background: "#e6e4da", borderRadius: 18, padding: "18px 26px", fontFamily: CJK, fontSize: 28, color: INKC }}>{ASK}</div>}
			</div>
			{t > M.match && t < M.blob + 0.3 && <div style={{ position: "absolute", left: 460, top: 280, display: "flex", alignItems: "center", gap: 18, fontFamily: CJK, fontSize: 26, color: "#7a766d" }}><LogoPixels size={40} t={t} mode="spin" t0={M.match + 0.3} />正在匹配热词…</div>}
			{t > M.blob && <div style={{ position: "absolute", left: 945, top: 525, width: 30, height: 30, borderRadius: 999, background: ORG, transform: `scale(${lerp(t, M.blob, C[1], 0.3, 90, (x) => x * x * x)})` }} />}
		</AbsoluteFill>
	)
}

// ---------- orange octagon with word cards
const OCT = "polygon(12% 0, 88% 0, 100% 18%, 100% 82%, 88% 100%, 12% 100%, 0 82%, 0 18%)"
const WORDS = ["林清禾", "Nimbus", "Figma", "周舟", "李经理", "MosMos", "API_KEY", "Notion", "交互稿", "首页改版", "台灯样品", "灯罩", "品牌素材", "周会", "rg", "PRD"]
const W6 = [...HOT, ["人名", "周舟", "周州"], ["项目", "首页改版", "首页改板"], ["工具", "Notion", "诺神"]]
const WCard: React.FC<{ k: number; w?: number }> = ({ k, w = 420 }) => { const [a, b, c] = W6[k % 6]; return <div style={{ width: w, background: "#fbfaf6", borderRadius: 14, padding: "20px 24px", fontFamily: CJK, color: INKC, boxShadow: "0 8px 20px rgba(0,0,0,.12)" }}><div style={{ fontSize: 18, color: T3 }}>{a}</div><div style={{ fontSize: 32, fontWeight: 600, marginTop: 4 }}>{b}</div><div style={{ fontSize: 18, color: "#9b4a2a", marginTop: 8 }}>近音 “{c}” → {b}</div></div> }
const Octagon: React.FC<{ t: number }> = ({ t }) => {
	const sh = t > M.shrink ? lerp(t, M.shrink, M.shrink + 0.9, 0.45, 0, (x) => 1 - (1 - x) * (1 - x)) : 1
	let body: React.ReactNode
	if (t < C[2]) body = <div style={{ position: "absolute", left: 660, top: 300 }}><div style={{ width: 600, background: "#fbfaf6", borderRadius: 16, padding: 30, fontFamily: CJK }}><div style={{ fontSize: 22, color: T3 }}>这次用到的热词</div>{HOT.map(([k, v], i) => <div key={k} style={{ fontSize: 30, marginTop: 16, opacity: clamp01((t - C[1] - 0.4 - i * 0.4) / 0.3) }}>{k} · <b>{v}</b></div>)}</div></div>
	else if (t < C[5]) { const p = lerp(t, C[4], C[5] - 0.6, 0, 1, inOut); body = <>{[0, 1, 2, 3, 4, 5].map((i) => { const x0 = 300 + (i % 3) * 470 + rand(i) * 60, y0 = 220 + Math.floor(i / 3) * 300 + rand(i + 4) * 40; const x1 = 260 + (i % 3) * 480, y1 = 250 + Math.floor(i / 3) * 210; const op = t < C[3] ? clamp01((t - C[2] - i * 0.25) / 0.3) : 1; return <div key={i} style={{ position: "absolute", left: lerp(p, 0, 1, x0, x1, (x) => x), top: lerp(p, 0, 1, y0, y1, (x) => x), opacity: op, transform: `rotate(${(1 - p) * (rand(i + 7) - 0.5) * 10}deg)` }}><WCard k={i} /></div> })}{t > C[4] && ["人名", "项目", "工具"].map((h, i) => <div key={h} style={{ position: "absolute", left: 270 + i * 480, top: 170, fontFamily: HEAVY, fontWeight: 700, fontSize: 30, color: "#fff", opacity: clamp01((t - C[4] - 0.5) / 0.4) }}>{h}</div>)}</> }
	else if (t < C[6]) body = <div style={{ position: "absolute", left: 230, top: 200, width: 1460, display: "flex", flexWrap: "wrap", gap: 18 }}><div style={{ width: "100%", fontFamily: HEAVY, fontWeight: 700, fontSize: 34, color: "#fff", marginBottom: 10 }}>最近学到的词</div>{WORDS.map((w, i) => <div key={w} style={{ background: "#fbfaf6", borderRadius: 12, padding: "14px 24px", fontFamily: CJK, fontSize: 28, color: INKC, opacity: clamp01((t - C[5] - i * 0.07) / 0.2) }}>{w}</div>)}</div>
	else body = <>{["人名", "项目", "工具"].map((h, i) => <div key={h} style={{ position: "absolute", left: 270 + i * 480, top: 170 }}><div style={{ fontFamily: HEAVY, fontWeight: 700, fontSize: 30, color: "#fff", marginBottom: 16 }}>{h}</div>{[0, 1].map((j) => <div key={j} style={{ marginBottom: 16, outline: i === 0 && j === 0 && t > C[6] + 1.2 ? "4px solid #fff" : "none", borderRadius: 14 }}><WCard k={i + j * 3} /></div>)}</div>)}</>
	return (
		<AbsoluteFill style={{ background: t >= M.shrink ? "transparent" : SAGE }}>
			<div style={{ position: "absolute", left: 960 - 900 * sh, top: 540 - 500 * sh, width: 1800 * sh, height: 1000 * sh, background: ORG, clipPath: sh > 0.3 ? OCT : undefined, borderRadius: sh > 0.3 ? 0 : 999, overflow: "hidden" }}>
				<div style={{ position: "absolute", left: 60 - 960 + 900, top: 0, width: 1920, height: 1080, transform: `translate(${-(1 - sh) * 0}px, -40px)`, opacity: sh > 0.6 ? 1 : 0, transformOrigin: "38% 42%", scale: t >= C[3] && t < C[4] ? "1.35" : "1" }}><div style={{ position: "absolute", left: 0, right: 0, top: 70, textAlign: "center", fontFamily: CJK, fontSize: 24, color: "rgba(255,255,255,.85)" }}>我的热词</div>{body}</div>
			</div>
		</AbsoluteFill>
	)
}

// ---------- reply, fold, envelope
const Reply: React.FC<{ t: number; zoom?: boolean }> = ({ t, zoom }) => {
	const r = typeAt(REPLY, t, M.reply + 0.5, 4).s
	return (
		<AbsoluteFill><Paper bg={SAGE} />
			<Camera t={t} keys={zoom ? [[C[8], 1.35, 960, 560], [C[9], 1.5, 960, 560]] : [[C[7], 1, 960, 540]]}>
				<div style={{ position: "absolute", left: 460, top: 120, width: 1000, fontFamily: CJK, opacity: clamp01((t - C[7] - 0.6) / 0.4) }}>
					<div style={{ marginLeft: "auto", width: "fit-content", maxWidth: 900, background: "#e6e4da", borderRadius: 18, padding: "18px 26px", fontSize: 28, color: INKC }}>{ASK}</div>
					<div style={{ marginTop: 40, fontSize: 26, color: "#7a766d" }}><span style={{ color: ORG }}>✳</span> 已按热词写好，发到飞书：</div>
					<div style={{ marginTop: 20, background: "#fff", borderRadius: 18, padding: "30px 34px", fontSize: 34, lineHeight: 1.6, color: INKC, boxShadow: "0 10px 30px rgba(0,0,0,.06)", minHeight: 120 }}>{HL(r)}</div>
					<div style={{ marginTop: 22, fontSize: 22, color: "#7a766d", opacity: clamp01((t - M.reply - 6) / 0.5) }}>保持原样：Figma · Nimbus · 林清禾　　未出现：飞马 · 尼姆布斯 · 林清和</div>
				</div>
			</Camera>
		</AbsoluteFill>
	)
}
const Fold: React.FC<{ t: number }> = ({ t }) => {
	const p = clamp01((t - C[9]) / (C[10] - C[9]))
	return <AbsoluteFill><Paper /><AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}><div style={{ width: 1100, height: 700, background: "#fbfaf6", transform: `perspective(1400px) rotateX(${p * 70}deg) scaleY(${1 - p * 0.4})`, boxShadow: "0 20px 60px rgba(0,0,0,.15)", padding: 60, fontFamily: CJK, fontSize: 40, lineHeight: 1.6, color: INKC }}>{HL(REPLY)}</div></AbsoluteFill></AbsoluteFill>
}
const Env: React.FC<{ t: number }> = ({ t }) => {
	const p = lerp(t, C[10], C[10] + 1.2, 0, 1, inOut)
	return <AbsoluteFill><Paper /><div style={{ position: "absolute", left: lerp(p, 0, 1, 760, 820, (x) => x), top: lerp(p, 0, 1, 380, 400, (x) => x), transform: `rotate(${lerp(p, 0, 1, -14, -6, (x) => x)}deg) scale(${lerp(p, 0, 1, 1.2, 0.8, (x) => x)})`, opacity: clamp01((M.logo - t) / 0.3) }}>
		<svg width={400} height={260} viewBox="0 0 400 260"><rect x={4} y={4} width={392} height={252} fill="#fbfaf6" stroke={INKC} strokeWidth={6} strokeLinejoin="round" /><path d="M6 8 L200 150 L394 8" fill="none" stroke={INKC} strokeWidth={6} strokeLinejoin="round" /><path d="M6 252 L150 115 M394 252 L250 115" stroke={INKC} strokeWidth={4} /></svg></div></AbsoluteFill>
}

export const Film: React.FC = () => {
	const t = useT()
	if (t < C[0]) return <AbsoluteFill><Paper /><Opening t={t} /></AbsoluteFill>
	if (t < C[1]) {
		if (t < M.home) return <AbsoluteFill><Paper /><AbsoluteFill style={{ alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 20, fontFamily: HEAVY, fontWeight: 500, fontSize: 56, color: INKC, opacity: clamp01((t - M.hello) / 0.4) }}><span style={{ color: ORG }}>✳</span>{typeAt("你好，小林", t, M.hello + 0.2, 6).s}</AbsoluteFill></AbsoluteFill>
		return <Home t={t} />
	}
	if (t < C[7] + 0.9) return <AbsoluteFill>{t >= C[7] && <Reply t={t} />}<Octagon t={t} /></AbsoluteFill>
	if (t < C[8]) return <Reply t={t} />
	if (t < C[9]) return <Reply t={t} zoom />
	if (t < C[10]) return <Fold t={t} />
	if (t < M.logo) return <Env t={t} />
	return <AbsoluteFill><Paper /><AbsoluteFill style={{ alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 22, opacity: clamp01((t - M.logo) / 0.4) * clamp01((TL.dur - t) / 0.8) }}><LogoPixels size={80} t={t} mode="in" t0={M.logo} /><Wordmark size={72} color={INKC} /></AbsoluteFill></AbsoluteFill>
}
