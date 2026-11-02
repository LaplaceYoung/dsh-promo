// Template 11 — structure of Raycast "New Raycast. Coming 2026" (2025), MosMos content.
// Glossy black satin forms drift behind frosted-glass UI shot in macro with shallow focus; tiles slide under a
// moving selection; a voice pill; then tiny monospaced captions on pure black and a tiny logo.
import React from "react"
import { AbsoluteFill } from "remotion"
import { ACC, CJK, SANS, MONO, COPY, Wave, lerp, clamp01, inOut, out, useT, LogoPixels, Caret, typeAt, Keycap } from "../_engine/src/mos"
import { DOF, rand } from "../_engine/src/kit"
import TL from "./timeline.json"

const M = TL.marks as any, C = TL.cuts
const Satin: React.FC<{ t: number; k?: number }> = ({ t, k = 0 }) => (
	<AbsoluteFill style={{ background: "#050505", overflow: "hidden" }}>
		{[0, 1, 2].map((i) => {
			const a = t * 6 + i * 70 + k * 40
			return <div key={i} style={{ position: "absolute", left: 300 + i * 420 - 900, top: -600 + i * 260, width: 2400, height: 900, borderRadius: "50%", transform: `rotate(${-28 + a * 0.15 + i * 18}deg) translateX(${Math.sin(t * 0.3 + i) * 80}px)`,
				background: `linear-gradient(${170 + i * 20}deg, #000 8%, #161618 32%, #7c7c80 48%, #2a2a2c 60%, #000 88%)`, filter: `blur(${44 + i * 16}px)`, opacity: 0.8 - i * 0.18 }} />
		})}
		<div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 60%, transparent 30%, rgba(0,0,0,.7) 90%)" }} />
	</AbsoluteFill>
)
const Glass: React.FC<{ w: number; h?: number; children: React.ReactNode; r?: number }> = ({ w, h, children, r = 28 }) => (
	<div style={{ width: w, height: h, borderRadius: r, background: "rgba(28,28,30,.72)", border: "1px solid rgba(255,255,255,.14)", boxShadow: "0 30px 80px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.12)", backdropFilter: "blur(30px)", fontFamily: CJK, color: "#e9e9ec", overflow: "hidden", position: "relative" }}>{children}</div>
)
const Shot: React.FC<{ t: number; tf: string; focus?: number; children: React.ReactNode; k?: number; angle?: number }> = ({ t, tf, focus = 50, children, k = 0, angle = 100 }) => (
	<AbsoluteFill><Satin t={t} k={k} /><DOF tf={tf} focus={focus} band={16} blur={6} angle={angle} left={0} top={0}>{children}</DOF></AbsoluteFill>
)
const tilt = (rx: number, ry: number, s: number, x: number, y: number) => `translate(${x}px,${y}px) perspective(1600px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${s})`
/** centre an element of size w x h, then offset by dx/dy */
const tc = (rx: number, ry: number, s: number, w: number, h: number, dx = 0, dy = 0) => tilt(rx, ry, s, 960 - w / 2 + dx, 540 - h / 2 + dy)

const SearchBar: React.FC<{ t: number; text: string; caret?: boolean; w?: number }> = ({ t, text, caret, w = 1100 }) => (
	<Glass w={w} h={170} r={85}>
		<div style={{ display: "flex", alignItems: "center", height: 170, padding: "0 56px", gap: 34 }}>
			<LogoPixels size={66} t={t} mode="static" invert />
			{caret && <Caret t={t} color="#fff" />}
			<div style={{ fontSize: 70, color: text ? "#fff" : "rgba(255,255,255,.45)" }}>{text || "按 Fn 说话，或输入"}</div>
		</div>
	</Glass>
)
const Results: React.FC<{ t: number }> = ({ t }) => {
	const q = typeAt("热词", t, M.type0, 6)
	return (
		<Glass w={1000} h={420}>
			<div style={{ display: "flex", alignItems: "center", gap: 20, padding: "28px 34px", borderBottom: "1px solid rgba(255,255,255,.1)", fontSize: 34 }}><LogoPixels size={34} t={t} mode="static" invert />{q.s}<Caret t={t} color="#fff" /></div>
			<div style={{ padding: "18px 34px", fontSize: 22, color: "#8e8e93" }}>结果</div>
			{q.s.length > 0 && <div style={{ margin: "0 20px", padding: "18px 16px", borderRadius: 14, background: "rgba(255,255,255,.08)", display: "flex", alignItems: "center", gap: 18, fontSize: 30 }}>
				<div style={{ width: 44, height: 44, borderRadius: 10, background: "#e4572e", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>词</div>我的热词<span style={{ color: "#8e8e93", fontSize: 24 }}>MosMos</span><span style={{ marginLeft: "auto", fontSize: 20, color: "#8e8e93" }}>3 条已启用</span></div>}
		</Glass>
	)
}
const Menu: React.FC<{ t: number; t0: number }> = ({ t, t0 }) => (
	<Glass w={760} h={520}>
		<div style={{ padding: "20px 28px", fontSize: 20, color: "#8e8e93", textAlign: "right" }}>MosMos</div>
		{["风格：自动", "标准 · 改善语法与语序", "高级 · 重组为简洁成稿", "我的热词 · 3 条已启用", "会议记录 · Fn + Shift"].map((s, i) => <div key={i} style={{ margin: "4px 18px", padding: "14px 18px", borderRadius: 12, fontSize: 28, background: i === Math.min(4, Math.floor((t - t0) / 0.45)) ? "rgba(255,255,255,.1)" : "transparent", display: "flex", gap: 16 }}><span style={{ color: "#8e8e93" }}>◦</span>{s}</div>)}
	</Glass>
)
const KeyPanel: React.FC<{ t: number }> = ({ t }) => (
	<Glass w={900} h={460}>
		<div style={{ padding: "22px 30px", fontSize: 22, color: "#8e8e93" }}>快捷键</div>
		<div style={{ margin: "10px 60px", height: 260, borderRadius: 20, background: "rgba(50,110,80,.25)", border: "1px solid rgba(120,200,150,.3)", display: "flex", alignItems: "center", justifyContent: "center", gap: 20 }}>
			<Keycap label="Fn" t={t} press={M.keys + 0.6} size={110} dark /><span style={{ fontSize: 40, color: "#aaa" }}>+</span><Keycap label="⇧" t={t} press={M.keys + 1.0} size={110} dark />
		</div>
		<div style={{ padding: "16px 30px", fontSize: 22, color: "#c8c9cc" }}>Fn 一次开始说 · Fn + Shift 记整场会</div>
	</Glass>
)
const History: React.FC<{ t: number }> = ({ t }) => (
	<Glass w={980} h={560}>
		<div style={{ padding: "26px 34px", fontSize: 32, color: "rgba(255,255,255,.4)", borderBottom: "1px solid rgba(255,255,255,.1)" }}>‹  筛选今天写过的…</div>
		<div style={{ padding: "16px 34px", fontSize: 22, color: "#8e8e93" }}>今天</div>
		{COPY.scenes.map((s, i) => <div key={i} style={{ margin: "6px 20px", padding: "12px 16px", borderRadius: 12, fontSize: 26, display: "flex", gap: 16, alignItems: "center", opacity: clamp01((t - M.hist - i * 0.25) / 0.2), background: i === 0 ? "rgba(255,255,255,.08)" : "transparent" }}>
			<div style={{ width: 36, height: 36, borderRadius: 8, background: ["#3370ff", "#e4572e", "#f2b134", "#8a5cf6", "#3a3a3c"][i] }} /><span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", width: 780, fontFamily: i === 4 ? MONO : CJK }}>{s.out.split("\n")[0]}</span></div>)}
	</Glass>
)
const TILES = [["飞", "#3370ff"], ["微", "#1aad19"], ["✉", "#e4572e"], ["文", "#f2b134"], ["✦", "#8a5cf6"], [">_", "#3a3a3c"], ["词", "#e4572e"], ["会", "#29a36a"], ["译", "#3bb4e5"], ["Fn", "#555"], ["≋", "#fff"]]
const Tile: React.FC<{ g: string; c: string; sel?: string; s?: number; t: number }> = ({ g, c, sel, s = 300, t }) => (
	<div style={{ width: s, height: s, borderRadius: s * 0.16, background: "rgba(40,40,42,.9)", border: sel ? `6px solid ${sel}` : "1px solid rgba(255,255,255,.1)", boxShadow: sel ? `0 0 40px ${sel}66` : undefined, display: "flex", alignItems: "center", justifyContent: "center" }}>
		{g === "≋" ? <div style={{ transform: `scale(${s / 160})` }}><Wave t={t} live n={7} h={30} /></div> : <div style={{ width: s * 0.5, height: s * 0.5, borderRadius: s * 0.12, background: c, color: "#fff", fontFamily: g.length > 1 ? MONO : CJK, fontWeight: 700, fontSize: s * 0.22, display: "flex", alignItems: "center", justifyContent: "center" }}>{g}</div>}
	</div>
)
const Grid: React.FC<{ t: number }> = ({ t }) => (
	<Glass w={1100} h={640}>
		<div style={{ display: "grid", gridTemplateColumns: "repeat(5, 170px)", gap: 24, padding: 40 }}>{TILES.concat(TILES).slice(0, 15).map(([g, c], i) => <div key={i} style={{ opacity: clamp01((t - M.grid - i * 0.05) / 0.2) }}><Tile g={g} c={c} s={170} t={t} sel={i === 7 ? "#888" : undefined} /></div>)}</div>
		<div style={{ position: "absolute", bottom: 20, left: 40, fontSize: 24, color: "#c8c9cc" }}>选择一个场景</div>
	</Glass>
)
const Tiles: React.FC<{ t: number }> = ({ t }) => {
	const k = (M.sel as number[]).filter((x) => t >= x).length - 1
	const selCol = ["#e8a33c", "#e4572e", "#3bb4e5", "#ffffff"][Math.max(0, k)]
	const x = lerp(t, M.tiles, M.fade, 300, -1500, (q) => q)
	const fade = clamp01((t - M.fade) / 0.4)
	return (
		<AbsoluteFill><Satin t={t} k={2} />
			<div style={{ position: "absolute", left: x, top: 320, display: "flex", gap: 40, opacity: 1 - fade * 0.9 }}>
				{TILES.map(([g, c], i) => <Tile key={i} g={g} c={c} s={380} t={t} sel={i === 4 + k * 2 || (k === 3 && i === 10) ? selCol : undefined} />)}
			</div>
			{fade > 0 && <div style={{ position: "absolute", left: 930, top: 510, opacity: fade, width: 60, height: 60, borderRadius: 14, border: "2px solid rgba(255,255,255,.6)", display: "flex", alignItems: "center", justifyContent: "center" }}><Wave t={t} n={4} h={16} /></div>}
		</AbsoluteFill>
	)
}
const VoicePill: React.FC<{ t: number }> = ({ t }) => (
	<Shot t={t} k={3} tf={tc(10, -8, 2.0, 700, 120, lerp(t, M.pill, C[7], 40, -40, (x) => x), 0)} focus={50}>
		<Glass w={700} h={120} r={60}>
			<div style={{ display: "flex", alignItems: "center", height: 120, padding: "0 36px", gap: 30 }}>
				<div style={{ fontSize: 30, color: "#aaa" }}>≡</div><div style={{ flex: 1, display: "flex", justifyContent: "center" }}><Wave t={t} live n={16} h={40} /></div>
				<div style={{ width: 56, height: 56, borderRadius: 28, background: "#fff", color: "#000", fontSize: 30, display: "flex", alignItems: "center", justifyContent: "center" }}>✓</div>
			</div>
		</Glass>
	</Shot>
)
const Ask: React.FC<{ t: number }> = ({ t }) => (
	<Glass w={900} h={520}>
		{COPY.scenes.map((s, i) => <div key={i} style={{ margin: "8px 22px", padding: "12px 16px", borderRadius: 12, fontSize: 28, background: i === 0 ? "rgba(255,255,255,.1)" : "transparent", display: "flex", gap: 14 }}><span style={{ color: ["#3370ff", "#e4572e", "#f2b134", "#8a5cf6", "#bbb"][i] }}>●</span>{s.label}<span style={{ marginLeft: "auto", color: "#8e8e93", fontSize: 20 }}>{s.style.replace("风格：", "")}</span></div>)}
		<div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "22px 30px", borderTop: "1px solid rgba(255,255,255,.1)", fontSize: 26, display: "flex", gap: 14 }}><span style={{ color: "#8e8e93" }}>+</span>{typeAt("整理今天的会议，列出待办", t, M.ask_t, 14).s}<Caret t={t} color="#fff" /></div>
	</Glass>
)
const MeetWin: React.FC<{ t: number }> = ({ t }) => (
	<Glass w={1400} h={760} r={22}>
		<div style={{ display: "flex", gap: 10, padding: 20 }}>{["#ff5f57", "#febc2e", "#28c840"].map((c) => <div key={c} style={{ width: 14, height: 14, borderRadius: 7, background: c }} />)}<div style={{ marginLeft: 500, fontSize: 22, color: "#c8c9cc" }}>会议记录 · 录制中</div></div>
		<div style={{ position: "absolute", right: 40, top: 80, padding: "10px 18px", borderRadius: 12, background: "rgba(255,255,255,.08)", fontSize: 22, color: "#c8c9cc" }}>整理今天的会议，列出待办</div>
		<div style={{ position: "absolute", left: 60, top: 300 }}><Wave t={t} live n={10} h={30} /></div>
	</Glass>
)
const Steps: React.FC<{ t: number }> = ({ t }) => (
	<Glass w={1100} h={420}>
		{COPY.meetingFeatures.map(([a, b], i) => { const st = M.steps + 0.2 + i * 0.5, done = t > st + 0.9; return <div key={i} style={{ margin: "26px 40px", fontSize: 30, display: "flex", gap: 18, alignItems: "center", opacity: clamp01((t - st) / 0.2) }}>
			<div style={{ width: 30, height: 30, borderRadius: 15, border: "3px solid #888", borderTopColor: done ? "#888" : "#fff", transform: `rotate(${t * 400}deg)`, background: done ? "#29a36a" : "transparent" }} />正在整理{a}…<span style={{ fontSize: 20, color: "#8e8e93" }}>{b}</span></div> })}
	</Glass>
)
const Toast: React.FC<{ t: number }> = ({ t }) => (
	<Glass w={520} h={96} r={48}><div style={{ display: "flex", alignItems: "center", gap: 22, height: 96, padding: "0 34px", fontSize: 30 }}><div style={{ width: 30, height: 30, borderRadius: 15, border: "3px solid #666", borderTopColor: "#fff", transform: `rotate(${t * 360}deg)` }} />正在写好…</div></Glass>
)
const Captions: React.FC<{ t: number }> = ({ t }) => {
	const W = TL.words as string[][], k = (M.w as number[]).filter((x) => t >= x).length - 1
	const [a, b] = W[k], age = t - M.w[k]
	const scr = (s: string) => age < 0.3 ? Array.from(s).map((ch, i) => rand(i + Math.floor(t * 30)) < (0.3 - age) * 3 ? "▚▞░▒"[i % 4] : ch).join("") : s
	return (
		<AbsoluteFill style={{ background: "#000", fontFamily: MONO, fontSize: 22, color: "#e8e8ea", letterSpacing: "0.18em" }}>
			{k < 4 ? <div style={{ position: "absolute", top: 528, left: 0, width: 1920, display: "flex", justifyContent: "center", gap: 300 }}><span>{a}</span><span>{scr(b)}</span></div>
				: <div style={{ position: "absolute", top: 510, width: 1920, textAlign: "center", lineHeight: 1.6 }}><div>{scr(a)}</div><div style={{ opacity: clamp01((age - 0.4) / 0.2) }}>{b}</div></div>}
		</AbsoluteFill>
	)
}
export const Film: React.FC = () => {
	const t = useT()
	if (t < C[0]) return <Satin t={t} />
	if (t < C[1]) return <Shot t={t} tf={tc(14, -16, lerp(t, C[0], C[1], 2.3, 1.8), 1100, 170, lerp(t, C[0], C[1], 260, 120), 0)} focus={42} angle={95}><SearchBar t={t} text="" caret /></Shot>
	if (t < C[2]) return <Shot t={t} tf={tc(12, -10, 1.6, 1100, 170, 60, 0)} focus={45}><SearchBar t={t} text="" caret /></Shot>
	if (t < C[3]) return <Shot t={t} k={1} tf={tc(16, -12, lerp(t, C[2], C[3], 1.7, 1.85), 1000, 420, 120, 60)} focus={40}><Results t={t} /></Shot>
	if (t < M.keys) return <Shot t={t} k={1} tf={tc(18, 14, 1.7, 760, 520, -80, 40)} focus={45}><Menu t={t} t0={C[3]} /></Shot>
	if (t < C[4]) return <Shot t={t} k={1} tf={tc(14, -18, lerp(t, M.keys, C[4], 1.5, 1.65), 900, 460)} focus={50}><KeyPanel t={t} /></Shot>
	if (t < M.grid) return <Shot t={t} k={2} tf={tc(12, 16, t < C[5] ? 1.9 : lerp(t, C[5], M.grid, 1.6, 1.5), 980, 560, 80, 60)} focus={36}><History t={t} /></Shot>
	if (t < C[6]) return <Shot t={t} k={2} tf={tc(20, -12, lerp(t, M.grid, C[6], 1.4, 1.65), 1100, 640)} focus={50}><Grid t={t} /></Shot>
	if (t < M.pill) return <Tiles t={t} />
	if (t < C[7]) return <VoicePill t={t} />
	if (t < C[8]) return <AbsoluteFill><Satin t={t} k={4} /></AbsoluteFill>
	if (t < C[9]) return <Shot t={t} k={4} tf={tc(10, 12, 1.65, 900, 520, -60, 40)} focus={60}><Ask t={t} /></Shot>
	if (t < C[10]) return <Shot t={t} k={5} tf={tc(14, -20, lerp(t, C[9], C[10], 1.3, 1.45), 1400, 760, 120, 40)} focus={40} angle={80}><MeetWin t={t} /></Shot>
	if (t < C[11]) return <Shot t={t} k={5} tf={tc(12, 10, 1.6, 1100, 420, -40, 0)} focus={45}><Steps t={t} /></Shot>
	if (t < C[12]) return <Shot t={t} k={6} tf={tc(8, -14, lerp(t, C[11], C[12], 1.8, 1.95), 520, 96)} focus={50}><Toast t={t} /></Shot>
	if (t < M.logo) return <Captions t={t} />
	return <AbsoluteFill style={{ background: "#000", alignItems: "center", justifyContent: "center" }}><div style={{ opacity: clamp01((t - M.logo) / 0.3) }}><LogoPixels size={44} t={t} mode="static" invert /></div></AbsoluteFill>
}
