// Template 14 — structure of Figma "Code Layers" (2026), MosMos content.
// A swapped last phrase on white over app shots, a wall of giant monospaced transcript that pulls back into a
// grey canvas of phone frames with named collaborator cursors, a long drift across frames whose product copy
// is being written by voice, then a white line on black, colour pixel blocks and the logo.
// Product photos are licensed stock (ASSETS.md).
import React from "react"
import { AbsoluteFill, Img, staticFile } from "remotion"
import { ACC, CJK, HEAVY, MONO, SANS, COPY, lerp, clamp01, inOut, useT, Cursor, Pill, LogoPixels, typeAt, Caret } from "../_engine/src/mos"
import { Camera, CamKey } from "../_engine/src/kit"
import TL from "./timeline.json"

const M = TL.marks as Record<string, number>
const C = TL.cuts
const CANVAS = "#e3e3e3", PURPLE = "#4b2a5e", LIME = "#d9f99d", BLUE = "#1f8bff"
type Prod = { img: string; name: string; desc: string }
const PRODS: Prod[] = [
	{ img: "t14-armchair.webp", name: "白色扶手椅", desc: "布面柔软，尺寸小，放在窄客厅也不挤。" },
	{ img: "t14-chair.webp", name: "原木餐椅", desc: "实木椅背，配圆桌刚好。" },
	{ img: "t14-lounge.webp", name: "羊羔绒单人椅", desc: "坐深够，适合靠窗看书。" },
	{ img: "t14-lamp.webp", name: "黄铜台灯", desc: "暖光灯泡，床头和书桌都合适。" },
]
const Photo: React.FC<{ p: Prod; w: number; h: number; r?: number }> = ({ p, w, h, r = 12 }) => <div style={{ width: w, height: h, borderRadius: r, overflow: "hidden", background: "#f4f4f4", flexShrink: 0 }}><Img src={staticFile(p.img)} style={{ width: w, height: h, objectFit: "cover" }} /></div>

// phone frame: shop list, grid or detail; typed description in detail view
const Phone: React.FC<{ kind: "list" | "grid" | "detail"; t?: number; i?: number; t0?: number; tint?: string }> = ({ kind, t = 0, i = 0, t0 = 99, tint = "#dceefb" }) => (
	<div style={{ width: 300, height: 620, background: tint, borderRadius: 26, overflow: "hidden", boxShadow: "0 1px 0 rgba(0,0,0,.08)", fontFamily: CJK, position: "relative" }}>
		<div style={{ height: 40, display: "flex", alignItems: "center", padding: "0 16px", fontSize: 13, fontWeight: 700, color: PURPLE }}>选品清单</div>
		{kind === "list" && <>
			<div style={{ margin: "0 12px", background: PURPLE, borderRadius: 14, padding: 14, color: "#fff", display: "flex", gap: 10 }}><div style={{ fontSize: 19, fontWeight: 700, lineHeight: 1.25, width: 130 }}>新到的家具，就在附近</div><Photo p={PRODS[0]} w={110} h={86} /></div>
			<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, margin: 12 }}>{[1, 2, 3, 0].map((k) => <div key={k} style={{ background: "#fff", borderRadius: 12, padding: 8 }}><Photo p={PRODS[k]} w={118} h={100} r={8} /><div style={{ fontSize: 12, marginTop: 6, color: "#222" }}>{PRODS[k].name}</div></div>)}</div>
		</>}
		{kind === "grid" && <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, margin: 12 }}>{Array.from({ length: 15 }).map((_, k) => <div key={k} style={{ background: "#fff", borderRadius: 10, padding: 4 }}><Photo p={PRODS[(k * 3 + i) % 4]} w={78} h={78} r={6} /></div>)}</div>}
		{kind === "detail" && (() => { const p = PRODS[i % 4], ty = typeAt(p.desc, t, t0, 9); return <div style={{ margin: 12 }}>
			<div style={{ background: LIME, borderRadius: 16, padding: 16, display: "flex", justifyContent: "center" }}><Photo p={p} w={230} h={230} /></div>
			<div style={{ fontSize: 22, fontWeight: 700, marginTop: 14, color: "#111" }}>{p.name}</div>
			<div style={{ fontSize: 15, color: "#333", marginTop: 8, lineHeight: 1.55, minHeight: 70 }}>{t >= t0 ? ty.s : p.desc}{ty.typing && <Caret t={t} solid />}</div>
			<div style={{ marginTop: 14, background: PURPLE, color: "#fff", borderRadius: 10, padding: "10px 0", textAlign: "center", fontSize: 15 }}>加入清单</div>
		</div> })()}
	</div>
)
const Tag: React.FC<{ name: string; c: string; x: number; y: number }> = ({ name, c, x, y }) => (
	<div style={{ position: "absolute", left: x, top: y }}>
		<svg width="26" height="26" viewBox="0 0 24 24"><path d="M3 2l17 9-8 2-3 8z" fill={c} stroke="#fff" strokeWidth="1.5" /></svg>
		<div style={{ position: "absolute", left: 22, top: 22, background: c, color: "#fff", fontFamily: CJK, fontSize: 18, padding: "4px 10px", borderRadius: 6, whiteSpace: "nowrap" }}>{name}</div>
	</div>
)
// canvas layout (stage px); frames at fixed spots, cursors wander
const FRAMES: [number, number, "list" | "grid" | "detail", number, string][] = [
	[200, 120, "list", 0, "#dceefb"], [560, 120, "detail", 0, "#dceefb"], [920, 120, "grid", 1, "#e8f1e1"], [1280, 120, "detail", 3, "#fdeee2"],
	[1640, 120, "list", 1, "#ece6f8"], [2000, 120, "detail", 2, "#dceefb"], [200, 820, "grid", 2, "#fdeee2"], [560, 820, "detail", 1, "#e8f1e1"],
	[920, 820, "list", 2, "#dceefb"], [1280, 820, "grid", 0, "#ece6f8"], [1640, 820, "detail", 2, "#fdeee2"], [2000, 820, "grid", 3, "#dceefb"],
]
const Canvas: React.FC<{ t: number; keys: CamKey[]; tags: [string, string, number, number, number, number][]; typeAt0?: number; typeIdx?: number }> = ({ t, keys, tags, typeAt0 = 99, typeIdx = 1 }) => (
	<AbsoluteFill style={{ background: CANVAS }}>
		<Camera t={t} keys={keys} w={2500} h={1600}>
			{FRAMES.map(([x, y, k, i, tint], n) => <div key={n} style={{ position: "absolute", left: x, top: y }}><div style={{ fontFamily: SANS, fontSize: 14, color: "#777", marginBottom: 6 }}>选品清单 / {k === "detail" ? "详情" : k === "grid" ? "全部" : "首页"}</div><Phone kind={k} i={i} t={t} t0={n === typeIdx ? typeAt0 : 99} tint={tint} /></div>)}
			{tags.map(([name, c, x0, y0, x1, y1], i) => { const p = inOut(clamp01(((t * 0.35 + i * 0.3) % 2) / 2)); return <Tag key={name} name={name} c={c} x={x0 + (x1 - x0) * p} y={y0 + (y1 - y0) * p} /> })}
		</Camera>
	</AbsoluteFill>
)
const TAGS1: [string, string, number, number, number, number][] = [["林清禾", "#ec4899", 420, 560, 520, 470], ["周舟", "#16a34a", 820, 420, 760, 520]]
const TAGS2: [string, string, number, number, number, number][] = [["李经理", BLUE, 1150, 600, 1080, 500], ["MosMos", "#f97316", 1480, 420, 1560, 520], ["周舟", "#16a34a", 760, 1240, 860, 1180]]

// ---------- intro word swap
const Intro: React.FC<{ t: number; word: string; children?: React.ReactNode }> = ({ t, word, children }) => (
	<AbsoluteFill style={{ background: "#fff" }}>
		<div style={{ position: "absolute", left: 0, width: children ? 760 : 1920, top: 0, bottom: 0, display: "flex", alignItems: "center", justifyContent: children ? "flex-end" : "center", paddingRight: children ? 60 : 0, fontFamily: HEAVY, fontWeight: 500, fontSize: children ? 72 : 78, color: children ? BLUE : "#111", lineHeight: 1.2, textAlign: "center" }}>{word}</div>
		{children && <div style={{ position: "absolute", left: 820, top: 0, bottom: 0, display: "flex", alignItems: "center", transform: "scale(1.45)", transformOrigin: "0 50%" }}>{children}</div>}
	</AbsoluteFill>
)
const Dialog: React.FC<{ t: number; title: string; body: React.ReactNode; btn: string; press: number }> = ({ t, title, body, btn, press }) => (
	<div style={{ width: 640, background: "#fff", borderRadius: 18, boxShadow: "0 20px 60px rgba(0,0,0,.14), 0 0 0 1px #e8e8e8", padding: "24px 28px", fontFamily: CJK, position: "relative" }}>
		<div style={{ fontSize: 22, fontWeight: 600, color: "#111" }}>{title}</div>
		<div style={{ marginTop: 16, fontSize: 20, color: "#333", lineHeight: 1.6 }}>{body}</div>
		<div style={{ display: "flex", justifyContent: "flex-end", marginTop: 18 }}><div style={{ background: t > press ? "#0d63d6" : BLUE, color: "#fff", borderRadius: 10, padding: "10px 22px", fontSize: 18 }}>{btn}</div></div>
		<div style={{ position: "absolute", right: 20, bottom: -30 }}><Cursor x={0} y={0} down={t > press && t < press + 0.15} s={1.4} /></div>
	</div>
)
const Browser: React.FC = () => (
	<div style={{ width: 960, height: 600, background: "#eef6fb", borderRadius: 16, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,.14)", fontFamily: CJK }}>
		<div style={{ height: 40, background: "#f3f3f3", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: "#777" }}>xuanpin.example</div>
		<div style={{ display: "flex", gap: 24, padding: 30 }}>
			<div style={{ width: 360 }}><div style={{ fontSize: 40, fontWeight: 800, color: PURPLE, lineHeight: 1.2 }}>附近的好家具，一页看完</div><div style={{ marginTop: 18, background: PURPLE, color: "#fff", display: "inline-block", padding: "10px 18px", borderRadius: 10, fontSize: 16 }}>开始逛</div></div>
			<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>{PRODS.map((p) => <div key={p.name} style={{ background: "#fff", borderRadius: 12, padding: 8 }}><Photo p={p} w={230} h={150} r={8} /><div style={{ fontSize: 14, marginTop: 6 }}>{p.name}</div></div>)}</div>
		</div>
	</div>
)
const CodeWall: React.FC<{ t: number }> = ({ t }) => {
	const z = Math.exp(lerp(t, M.out, M.canvas, Math.log(1), Math.log(0.08), inOut))
	const fade = clamp01((t - M.out - 0.4) / 0.6)
	const line = (COPY.raw + COPY.raw).replace(/[，。]/g, " ")
	return (
		<AbsoluteFill style={{ background: CANVAS }}>
			<div style={{ opacity: fade }}><Canvas t={t} keys={[[M.canvas, 0.42, 1250, 780], [9.3, 0.85, 560, 470], [C[4], 0.9, 600, 470]]} tags={TAGS1} /></div>
			<AbsoluteFill style={{ background: "#fff", opacity: 1 - fade, transform: `scale(${z})`, alignItems: "center", justifyContent: "center" }}>
				<div style={{ fontFamily: MONO, fontSize: 120, lineHeight: 1.05, color: "#bdbdbd", width: 2600, wordBreak: "break-all", marginLeft: -300 }}>{line}</div>
			</AbsoluteFill>
		</AbsoluteFill>
	)
}
const Blocks: React.FC<{ t: number }> = ({ t }) => {
	const cols = ["#22d3ee", "#a78bfa", "#f472b6", "#d9f99d", "#ffffff", "#c4b5fd"]
	return (
		<AbsoluteFill style={{ background: "#000" }}>
			{Array.from({ length: 22 }).map((_, i) => { const x = 760 + ((i * 97) % 420), y = 380 + ((i * 53) % 300); return <div key={i} style={{ position: "absolute", left: x, top: y, width: 60 + (i % 3) * 40, height: 44, background: cols[i % cols.length], opacity: 0.9 }} /> })}
			<div style={{ position: "absolute", left: 800, top: 420, fontFamily: MONO, fontSize: 64, color: "#2563eb", background: "#f472b6" }}>/说.tsx</div>
			<div style={{ position: "absolute", left: 840, top: 500, fontFamily: MONO, fontSize: 64, color: "#2563eb", background: "#22d3ee" }}>写好()</div>
		</AbsoluteFill>
	)
}

export const Film: React.FC = () => {
	const t = useT()
	if (t < C[0]) return <AbsoluteFill style={{ background: "#fff", alignItems: "center", justifyContent: "center", fontFamily: HEAVY, fontWeight: 500, fontSize: 80, color: "#111", textAlign: "center", lineHeight: 1.2, opacity: clamp01((t - M.h0) / 0.2) }}><div>把说的话，</div><div style={{ color: t < 0.7 ? BLUE : "#111" }}>带进</div></AbsoluteFill>
	if (t < C[1]) return <Intro t={t} word="一个输入框"><div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}><Phone kind="list" /><div style={{ marginTop: 60 }}><Pill t={t} state="语音输入" live /></div></div></Intro>
	if (t < C[2]) return <Intro t={t} word="一个网页"><div style={{ transform: "scale(0.75)", transformOrigin: "0 50%" }}><Browser /></div></Intro>
	if (t < C[3]) return t < M.w4
		? <Intro t={t} word="一段对话"><Dialog t={t} title="飞书 · 选品群" body={<span>把这几款椅子的介绍，整理成三句话发群里。</span>} btn="发送" press={4.5} /></Intro>
		: <Intro t={t} word="一个终端"><Dialog t={t} title="代码与终端" body={<span style={{ fontFamily: MONO }}>{COPY.termCmd}</span>} btn="执行" press={5.5} /></Intro>
	if (t < C[4]) return <CodeWall t={t} />
	if (t < C[5]) return <Canvas t={t} keys={[[C[4], 0.95, 700, 470], [C[5], 1.0, 760, 470]]} tags={TAGS1} />
	if (t < C[6]) return <Canvas t={t} keys={[[C[5], 0.9, 900, 520], [C[6], 0.6, 1150, 700]]} tags={TAGS2} />
	if (t < C[7]) return <Canvas t={t} keys={[[C[6], 0.85, 760, 470], [M.detail - 0.3, 1.05, 720, 470], [21.5, 1.05, 720, 470], [C[7], 0.8, 1100, 520]]} tags={TAGS2} typeAt0={M.dtype} typeIdx={1} />
	if (t < C[8]) return <Canvas t={t} keys={[[C[7], 0.8, 1450, 1180], [C[8], 0.85, 1900, 1120]]} tags={[["MosMos", "#f97316", 1500, 1300, 1640, 1240], ["李经理", BLUE, 1880, 900, 1800, 1000]]} typeAt0={C[7] + 1.0} typeIdx={10} />
	if (t < C[9]) return (
		<AbsoluteFill style={{ background: "#000", alignItems: "center", justifyContent: "center", fontFamily: HEAVY, fontWeight: 500, fontSize: 76, color: "#fff", textAlign: "center", lineHeight: 1.25 }}>
			<div style={{ color: t < M.e2 ? "#facc15" : "#fff" }}>开口说，</div>{t >= M.e2 && <div>写进每个应用。</div>}
		</AbsoluteFill>
	)
	if (t < C[10]) return <Blocks t={t} />
	return <AbsoluteFill style={{ background: "#000", alignItems: "center", justifyContent: "center" }}><LogoPixels size={230} t={t} mode="in" t0={M.logo} invert /></AbsoluteFill>
}
