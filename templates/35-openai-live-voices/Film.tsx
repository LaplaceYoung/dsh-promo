// Template 35 — structure of OpenAI "GPT-Live-1.1 has new voices and better accents." (2026), MosMos content.
// A warm, theatre-like marble wall (Pexels photo, toned) with bulbs and a curtain; two phones running a MosMos
// meeting record: the left one shows a glowing orb in the current speaker's colour, the right one the transcript
// as it is written. Lines appear as subtitles. A pan finds a third phone, then a cut to a white end card where the
// headline types on and the MosMos mark settles in.
import React from "react"
import { AbsoluteFill, Img, staticFile } from "remotion"
import { CJK, SANS, lerp, clamp01, inOut, useT, LogoPixels, Wordmark, typeAt, Wave, COPY } from "../_engine/src/mos"
import { Camera, CamKey } from "../_engine/src/kit"
import TL from "./timeline.json"

const M = TL.marks as Record<string, number>
const LINES = TL.lines as [number, number, number, string][], ORB = TL.orb as [number, number][]
const COL = [["#cfd6ff", "#6f86f0"], ["#bdf3ee", "#23b3a6"], ["#f2f2f2", "#1e1e22"], ["#fff2b8", "#f0c23a"], ["#ffd9c9", "#f07a58"], ["#efe1ff", "#9b78f0"], ["#d8e4ff", "#4d74e8"]]
const TX = "#1d1b1a"

const Orb: React.FC<{ t: number; k: number; s: number }> = ({ t, k, s }) => {
	const [a, b] = COL[Math.max(0, k)], live = LINES.some(([x, y, sp]) => sp === k && t > x && t < y)
	const pulse = live ? 1 + 0.05 * Math.sin(t * 11) * Math.sin(t * 3.7) : 1
	return <div style={{ width: s, height: s, borderRadius: s, transform: `scale(${pulse})`, background: `radial-gradient(circle at 50% 30%, #ffffff 0%, ${a} 30%, ${b} 75%, ${b} 100%)`, boxShadow: `0 ${s * 0.08}px ${s * 0.25}px ${b}55`, opacity: k < 0 ? 0 : 1 }} />
}
const orbAt = (t: number) => { let k = -1; for (const [x, i] of ORB) if (t >= x) k = i; return k }
const Phone: React.FC<{ t: number; x: number; y: number; w: number; mode: "orb" | "text"; k: number; fadeIn?: number }> = ({ t, x, y, w, mode, k }) => {
	const h = w * 2.12, cur = LINES.filter(([a]) => t >= a)
	return <div style={{ position: "absolute", left: x - w / 2, top: y - h / 2, width: w, height: h, borderRadius: w * 0.16, background: "#2a2523", padding: w * 0.035, boxSizing: "border-box", boxShadow: `0 ${w * 0.08}px ${w * 0.2}px rgba(90,40,20,.35)` }}>
		<div style={{ width: "100%", height: "100%", borderRadius: w * 0.13, background: "#fbf7f1", overflow: "hidden", position: "relative", fontFamily: CJK, color: TX }}>
			<div style={{ position: "absolute", left: w * 0.36, top: w * 0.04, width: w * 0.22, height: w * 0.065, borderRadius: w, background: "#111" }} />
			<div style={{ position: "absolute", left: w * 0.1, top: w * 0.045, fontSize: w * 0.05, fontWeight: 600 }}>9:41</div>
			<div style={{ position: "absolute", left: w * 0.08, top: w * 0.16, fontSize: w * 0.055, color: "#8c857e" }}>会议记录 · 录音中</div>
			{mode === "orb" ? <>
				<div style={{ position: "absolute", left: w * 0.27, top: h * 0.33 }}><Orb t={t} k={k} s={w * 0.4} /></div>
				<div style={{ position: "absolute", top: h * 0.33 + w * 0.48, width: "100%", textAlign: "center", fontSize: w * 0.06, color: "#6d665f", opacity: k < 0 ? 0 : 1 }}>说话人 {k + 1}</div>
			</> : <div style={{ position: "absolute", left: w * 0.08, right: w * 0.08, bottom: w * 0.3, display: "flex", flexDirection: "column", gap: w * 0.035 }}>
				{cur.slice(-6).map(([a, , sp, s]) => <div key={a} style={{ display: "flex", gap: w * 0.03, fontSize: w * 0.048, lineHeight: 1.4, opacity: clamp01((t - a) / 0.3) }}><div style={{ width: w * 0.05, height: w * 0.05, marginTop: w * 0.012, borderRadius: w, flex: "none", background: COL[sp][1] }} /><span>{typeAt(s, t, a, 12).s}</span></div>)}
			</div>}
			<div style={{ position: "absolute", left: w * 0.06, right: w * 0.06, bottom: w * 0.07, height: w * 0.13, borderRadius: w, background: "#f0ebe4", display: "flex", alignItems: "center", justifyContent: "space-between", padding: `0 ${w * 0.04}px`, boxSizing: "border-box" }}>
				<Wave t={t} live n={5} h={w * 0.05} color="#8c857e" /><div style={{ width: w * 0.08, height: w * 0.08, borderRadius: w, background: "#1d1b1a" }} /></div>
		</div>
	</div>
}
const Stage: React.FC<{ t: number }> = ({ t }) => {
	const k = orbAt(t), W = 4000
	const bulbs = [330, 2250, 2600, 3950]
	return <div style={{ position: "absolute", left: -300, top: 0, width: W, height: 1080 }}>
		<Img src={staticFile("t35-marble.webp")} style={{ position: "absolute", left: 0, top: 60, width: 2000, height: 900, objectFit: "cover", filter: "saturate(0.4) brightness(1.12) contrast(0.55)" }} />
		<Img src={staticFile("t35-marble.webp")} style={{ position: "absolute", left: 2000, top: 60, width: 2000, height: 900, objectFit: "cover", transform: "scaleX(-1)", filter: "saturate(0.4) brightness(1.12) contrast(0.55)" }} />
		<div style={{ position: "absolute", left: 0, top: 60, width: W, height: 900, background: "radial-gradient(ellipse at 20% 0%, rgba(255,190,120,.45), transparent 50%), radial-gradient(ellipse at 55% 0%, rgba(255,190,120,.4), transparent 45%), radial-gradient(ellipse at 90% 0%, rgba(255,190,120,.45), transparent 50%), rgba(252,226,216,.5)" }} />
		<div style={{ position: "absolute", left: 0, top: 0, width: W, height: 92, background: "linear-gradient(180deg,#5a3a22,#a8784a 55%,#d6a46a 80%,#7a5232)", boxShadow: "0 10px 30px rgba(80,40,10,.4)" }} />
		{bulbs.map((x) => <div key={x} style={{ position: "absolute", left: x - 60, top: 20, width: 120, height: 120, borderRadius: 60, background: "radial-gradient(circle, #fffbe8 0%, #ffd27a 35%, rgba(255,160,60,.0) 70%)", filter: "blur(2px)" }} />)}
		{[2280, 3480].map((x, i) => <div key={x} style={{ position: "absolute", left: x, top: 40, width: 240, height: 1000, background: "linear-gradient(90deg,#4a0d12,#9c1f28 40%,#5c1016 70%,#2a0608)", borderRadius: "0 0 40% 40%", transform: `skewX(${i ? 6 : -6}deg)`, opacity: 0.95 }} />)}
		<div style={{ position: "absolute", left: 0, top: 960, width: W, height: 120, background: "linear-gradient(180deg,#3a0a0e,#120304)" }} />
		<Phone t={t} x={1110} y={560} w={180} mode="orb" k={k} />
		<Phone t={t} x={1410} y={560} w={180} mode="text" k={k} />
		<Phone t={t} x={2760} y={560} w={180} mode="orb" k={t > 30.8 ? 6 : -1} />
	</div>
}
const Sub: React.FC<{ t: number }> = ({ t }) => {
	const l = LINES.find(([a, b]) => t >= a && t < b)
	if (!l) return null
	const o = clamp01((t - l[0]) / 0.15) * clamp01((l[1] - t) / 0.15)
	return <div style={{ position: "absolute", top: 846, width: "100%", textAlign: "center", fontFamily: CJK, fontSize: 46, fontWeight: 500, color: TX, opacity: o }}>{l[3]}</div>
}
const End: React.FC<{ t: number }> = ({ t }) => {
	const head = typeAt("谁说了哪句，都分得清。", t, M.type, 9).s, sub = clamp01((t - M.sub) / 0.4), pw = clamp01((t - M.pow) / 0.4)
	const up = lerp(t, M.pow, M.pow + 0.6, 0, -110, inOut)
	return <AbsoluteFill style={{ background: "#fdfcfb", fontFamily: CJK, color: TX }}>
		<div style={{ position: "absolute", top: 470 + up, width: "100%", textAlign: "center", fontSize: 76, fontWeight: 600, opacity: 1 - pw }}>{head}</div>
		<div style={{ position: "absolute", top: 600 + up, width: "100%", textAlign: "center", fontSize: 32, color: "#7a746e", opacity: sub * (1 - pw) }}>{COPY.meetingFeatures[0][1]}</div>
		<AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity: pw }}>
			<div style={{ fontSize: 60, fontWeight: 600, marginBottom: 60 }}>MosMos 会议记录</div>
			<div style={{ display: "flex", alignItems: "center", gap: 28, opacity: clamp01((t - M.logo) / 0.4) }}><LogoPixels size={92} t={t} mode="in" t0={M.logo} /><Wordmark size={84} color={TX} /></div>
			<div style={{ marginTop: 60, fontFamily: SANS, fontSize: 26, color: "#8c857e", opacity: clamp01((t - M.logo - 0.6) / 0.4) }}>mosmos.io · {COPY.platforms.map((p) => p.split(" ")[0]).join(" · ")} · {COPY.ios}</div>
		</AbsoluteFill>
	</AbsoluteFill>
}
export const Film: React.FC = () => {
	const t = useT()
	if (t >= M.end) return <End t={t} />
	const d = 18 * Math.sin(t * 0.25)
	const k: CamKey[] = [[0, 1.0, 960 + d, 540], [M.pan, 1.0, 960 + d, 540], [M.panEnd, 1.0, 2460, 540], [M.zoom, 1.0, 2460, 540], [M.end, 1.22, 2460, 560]]
	return <AbsoluteFill style={{ background: "#120304" }}>
		<Camera t={t} keys={k} w={4000}><Stage t={t} /></Camera>
		<Sub t={t} />
		<AbsoluteFill style={{ background: "#000", opacity: 1 - clamp01(t / 0.4) }} />
	</AbsoluteFill>
}
