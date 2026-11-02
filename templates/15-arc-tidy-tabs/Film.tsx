// Template 15 — structure of The Browser Company "Tidy Tabs by Arc" (2024), MosMos content.
// Heavy white words on brand blue alternate with macro shots of a tinted sidebar over a landscape wallpaper.
// The sidebar is MosMos's input history; a broom button sweeps a wavy line across and the entries regroup by
// scene. Wallpapers, the lamp photo and the meeting webcam clip are licensed stock (ASSETS.md).
import React from "react"
import { AbsoluteFill, Img, OffthreadVideo, Sequence, staticFile } from "remotion"
import { ACC, CJK, HEAVY, SANS, COPY, lerp, clamp01, inOut, out, useT, LogoPixels, Cursor } from "../_engine/src/mos"
import TL from "./timeline.json"

const M = TL.marks as Record<string, number>
const C = TL.cuts
const BLUE = "#1b5cf2"

// ---------- word cards
const Card: React.FC<{ t: number; a: string; b?: string; tb?: number; italicB?: boolean; size?: number }> = ({ t, a, b, tb = 99, italicB, size = 150 }) => (
	<AbsoluteFill style={{ background: BLUE, alignItems: "center", justifyContent: "center" }}>
		<div style={{ fontFamily: HEAVY, fontWeight: 900, fontSize: size, color: "#fff", letterSpacing: "-0.01em", whiteSpace: "nowrap", display: "flex", alignItems: "baseline" }}>
			<span>{a}</span>
			{b && t >= tb && <span style={{ display: "inline-block", transform: italicB ? "skewX(-12deg)" : undefined, marginLeft: a.match(/[A-Za-z]$/) ? "0.25em" : 0, opacity: clamp01((t - tb) / 0.06) }}>{b}</span>}
		</div>
	</AbsoluteFill>
)

// ---------- history sidebar
type Item = { app: string; c: string; text: string; g: string }
const ITEMS: Item[] = [
	{ app: "飞", c: "#3370ff", text: COPY.scenes[0].out, g: "飞书 / 微信" },
	{ app: "邮", c: "#e8663c", text: "李经理，您好：第一版方案将在本周三前发给您。", g: "邮件" },
	{ app: "文", c: "#f2b134", text: "项目复盘 · 目标：将首页上线时间提前至周五。", g: "文档" },
	{ app: "会", c: "#2c9c6a", text: "首页改版周会 · 3 位发言人 · 2 条待办", g: "会议记录" },
	{ app: "邮", c: "#e8663c", text: "台灯样品下周二寄到，麻烦确认灯罩尺寸。", g: "邮件" },
	{ app: ">_", c: "#2a2b30", text: COPY.termCmd, g: "终端" },
	{ app: "飞", c: "#3370ff", text: "收到，素材我今晚整理好发群里。", g: "飞书 / 微信" },
]
const GROUPS = ["飞书 / 微信", "邮件", "文档", "会议记录"]
const Icon: React.FC<{ it: Item; s?: number }> = ({ it, s = 30 }) => <div style={{ width: s, height: s, borderRadius: s * 0.28, background: it.c, color: "#fff", fontFamily: CJK, fontWeight: 700, fontSize: s * (it.app.length > 1 ? 0.42 : 0.55), display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{it.app}</div>
const Row: React.FC<{ it: Item; sel?: boolean; op?: number }> = ({ it, sel, op = 1 }) => (
	<div style={{ display: "flex", alignItems: "center", gap: 16, height: 60, padding: "0 16px", margin: "4px 10px", borderRadius: 14, background: sel ? "rgba(255,255,255,.85)" : "transparent", boxShadow: sel ? "0 2px 8px rgba(0,0,0,.12)" : undefined, opacity: op }}>
		<Icon it={it} />
		<div style={{ fontFamily: CJK, fontSize: 25, color: "#1d1e22", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", width: 400 }}>{it.text}</div>
	</div>
)
const Broom: React.FC<{ hot?: boolean }> = ({ hot }) => (
	<div style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: CJK, fontSize: 22, color: "rgba(0,0,0,.45)" }}>
		<div style={{ width: 44, height: 44, borderRadius: 10, background: hot ? "rgba(0,0,0,.12)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
			<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round"><path d="M14 3l-4 9" /><path d="M6 13h9l2 8H4z" fill="#333" /></svg>
		</div>整理
	</div>
)
const Wave: React.FC<{ p: number; w?: number }> = ({ p, w = 380 }) => {
	const pts = Array.from({ length: 60 }, (_, i) => `${(i / 59) * w},${10 + Math.sin(i * 0.9 - p * 18) * 5}`).join(" ")
	return <svg width={w} height={20} style={{ opacity: p > 0 && p < 1 ? 1 : 0.35 }}><defs><clipPath id="wv"><rect x={w * (1 - clamp01(p * 1.3))} y={0} width={w} height={20} /></clipPath></defs><polyline points={pts} fill="none" stroke="rgba(0,0,0,.35)" strokeWidth="2.5" clipPath={p > 0 ? "url(#wv)" : undefined} /></svg>
}
const Sidebar: React.FC<{ t: number; tint: string; n?: number; grouped?: number; sel?: number; wave?: number; hot?: boolean; top?: Item }> = ({ t, tint, n = 7, grouped = 0, sel = -1, wave = 0, hot, top }) => {
	const list = grouped > 0 ? GROUPS.flatMap((g) => [g, ...ITEMS.map((it, i) => [it, i] as const).filter(([it]) => it.g === g)]) : ITEMS.slice(0, n).map((it, i) => [it, i] as const)
	return (
		<div style={{ width: 560, height: 1300, background: tint, backdropFilter: "blur(20px)", borderRadius: 26, padding: "26px 0", boxShadow: "0 30px 80px rgba(0,0,0,.25)", position: "relative" }}>
			{top && <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "6px 26px 14px", fontFamily: SANS, fontSize: 30, color: "#1d1e22" }}><Icon it={top} s={40} />{top.g}</div>}
			<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 22px 0 26px", height: 56 }}><Wave p={wave} /><Broom hot={hot} /></div>
			<div style={{ fontFamily: CJK, fontSize: 25, color: "rgba(0,0,0,.4)", padding: "10px 26px 12px" }}>＋ 新输入</div>
			{list.map((x, k) => typeof x === "string"
				? <div key={x} style={{ fontFamily: CJK, fontSize: 18, color: "rgba(0,0,0,.45)", padding: "12px 26px 2px", opacity: grouped }}>{x}</div>
				: <Row key={x[1]} it={x[0]} sel={x[1] === sel} op={grouped > 0 ? 1 : clamp01(n - x[1])} />)}
		</div>
	)
}
const Wall: React.FC<{ src: string; filter?: string }> = ({ src, filter }) => <Img src={staticFile(src)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter }} />
const Page: React.FC<{ children: React.ReactNode }> = ({ children }) => <div style={{ position: "absolute", left: 760, top: -20, width: 1300, height: 1200, background: "#fff", borderRadius: 18, boxShadow: "0 20px 60px rgba(0,0,0,.2)", padding: "70px 80px", fontFamily: CJK }}>{children}</div>
const Cam: React.FC<{ s: number; x: number; y: number; children: React.ReactNode }> = ({ s, x, y, children }) => <div style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 1080, transform: `translate(${x}px,${y}px) scale(${s})`, transformOrigin: "0 0" }}>{children}</div>

// ---------- shots
const Messy: React.FC<{ t: number }> = ({ t }) => {
	const n = clamp01((t - M.items) / 0.35 / 7) * 7 + 0.5
	const sc = lerp(t, M.scroll, C[1], 0, -330, inOut)
	return <AbsoluteFill><Wall src="t15-forest.webp" /><Cam s={1.75} x={-200} y={-120 + sc}><div style={{ position: "absolute", left: 700, top: 60 }}><Sidebar t={t} tint="rgba(206,216,210,.86)" n={Math.min(7, n)} /></div></Cam><Cursor x={1700} y={300 + Math.sin(t * 2) * 30} /></AbsoluteFill>
}
const Tidy: React.FC<{ t: number }> = ({ t }) => {
	const z = lerp(t, M.zoom, M.zoom + 0.7, 0, 1, inOut)
	const wave = clamp01((t - M.click) / (M.groups - M.click))
	const g = clamp01((t - M.groups) / 0.25)
	const cx = lerp(t, C[2], M.hover, 1500, 1180, inOut)
	return (
		<AbsoluteFill><Wall src="t15-forest.webp" />
			<Cam s={1.9 - 0.95 * z} x={-560 + 520 * z} y={-80 + 60 * z}>
				<div style={{ position: "absolute", left: 300, top: 40 }}><Sidebar t={t} tint="rgba(206,216,210,.88)" grouped={g} wave={t > M.click ? wave : 0} hot={t > M.hover} sel={g > 0 ? 0 : -1} /></div>
				{z > 0 && <div style={{ opacity: z }}><Page><div style={{ fontSize: 22, color: "#8a8c90" }}>飞书 / 微信 · 首页改版项目群</div><div style={{ fontFamily: HEAVY, fontWeight: 900, fontSize: 64, marginTop: 14, color: "#111" }}>第一版周三前发你</div><div style={{ fontSize: 26, color: "#3a3b40", marginTop: 26, lineHeight: 1.7, width: 900 }}>{COPY.scenes[0].out}</div></Page></div>}
			</Cam>
			{z < 0.5 && <Cursor x={cx} y={lerp(t, C[2], M.hover, 400, 196, inOut)} down={t > M.click - 0.05 && t < M.click + 0.1} />}
		</AbsoluteFill>
	)
}
const Macro: React.FC<{ t: number; t0: number; tint: string; wall: string; top?: Item }> = ({ t, t0, tint, wall, top }) => (
	<AbsoluteFill><Wall src={wall} />
		<Cam s={2.2} x={-1250} y={top ? -60 : -40}><div style={{ position: "absolute", left: 600, top: 40 }}><Sidebar t={t} tint={tint} wave={clamp01((t - t0) / 0.7)} hot top={top} /></div></Cam>
		<Cursor x={1400 + (top ? 40 : 0)} y={top ? 320 : 240} s={1.5} />
	</AbsoluteFill>
)
const Grouped: React.FC<{ t: number; tint: string; wall: string; wallF?: string; sel: number; children: React.ReactNode }> = ({ t, tint, wall, wallF, sel, children }) => (
	<AbsoluteFill><Wall src={wall} filter={wallF} />
		<Cam s={1.25 + (t % 10) * 0.004} x={-130} y={-140}><div style={{ position: "absolute", left: 300, top: 40 }}><Sidebar t={t} tint={tint} grouped={1} sel={sel} /></div>{children}</Cam>
	</AbsoluteFill>
)
const MailPage: React.FC = () => <Page><div style={{ fontSize: 22, color: "#8a8c90" }}>邮件 · 发给 李经理</div><div style={{ fontFamily: HEAVY, fontWeight: 900, fontSize: 64, marginTop: 14, color: "#111", lineHeight: 1.15 }}>第一版方案<br />本周三前发您</div><div style={{ fontSize: 20, color: "#8a8c90", marginTop: 18 }}>小林 · 2 分钟前 · 由 MosMos 写好</div>{COPY.mail.map((l, i) => <div key={i} style={{ fontSize: 26, color: "#2a2b30", marginTop: 20, lineHeight: 1.6, width: 900 }}>{l}</div>)}</Page>
const MeetPage: React.FC = () => (
	<Page>
		<div style={{ fontSize: 22, color: "#8a8c90" }}>会议记录 · 10:03 开始</div>
		<div style={{ fontFamily: HEAVY, fontWeight: 900, fontSize: 60, marginTop: 14, color: "#111" }}>首页改版周会</div>
		<div style={{ marginTop: 30, width: 760, height: 428, borderRadius: 18, overflow: "hidden", position: "relative", background: "#000" }}>
			<Sequence from={Math.round(C[6] * 30)} durationInFrames={Math.round((C[7] - C[6]) * 30) + 2} layout="none"><OffthreadVideo src={staticFile("t15-talk.mp4")} muted style={{ width: 760, height: 428, objectFit: "cover" }} /></Sequence>
			<div style={{ position: "absolute", left: 16, bottom: 14, background: "rgba(0,0,0,.55)", color: "#fff", fontSize: 20, padding: "6px 12px", borderRadius: 8 }}>说话人 1 · {COPY.meeting[0][2]}</div>
		</div>
	</Page>
)
const LampPage: React.FC = () => (
	<Page>
		<div style={{ fontSize: 22, color: "#8a8c90" }}>邮件 · 发给 供应商</div>
		<div style={{ display: "flex", gap: 50, marginTop: 24 }}>
			<div style={{ width: 460, height: 460, borderRadius: 14, overflow: "hidden", border: "1px solid #eee" }}><Img src={staticFile("t15-lamp.webp")} style={{ width: 460, height: 460, objectFit: "cover" }} /></div>
			<div style={{ width: 520 }}><div style={{ fontFamily: HEAVY, fontWeight: 900, fontSize: 52, color: "#111", lineHeight: 1.2 }}>台灯样品确认</div><div style={{ fontSize: 25, color: "#3a3b40", marginTop: 22, lineHeight: 1.7 }}>样品下周二寄到。麻烦确认灯罩尺寸，并附上最新报价，我们周四前回复。</div></div>
		</div>
	</Page>
)
const End: React.FC<{ t: number }> = ({ t }) => (
	<AbsoluteFill style={{ background: BLUE, alignItems: "center", justifyContent: "center" }}>
		{t < M.url ? <div style={{ transform: `scale(${lerp(t, M.logo, M.logo + 0.5, 0.7, 1)}) rotate(${lerp(t, M.logo, M.logo + 0.6, -25, 0)}deg)` }}><LogoPixels size={190} t={t} mode="in" t0={M.logo} invert /></div>
			: <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 120, color: "#fff", letterSpacing: "-0.02em" }}>{COPY.url}</div>}
	</AbsoluteFill>
)

export const Film: React.FC = () => {
	const t = useT()
	if (t < C[0]) return <Card t={t} a="别" b="担心" tb={M.w2} />
	if (t < C[1]) return <Messy t={t} />
	if (t < C[2]) return <Card t={t} a="开口" b="就说" tb={M.k2} italicB />
	if (t < C[3]) return <Tidy t={t} />
	if (t < C[4]) return <Card t={t} a="一键" b="整理" tb={M.k4} />
	if (t < C[5]) return <Macro t={t} t0={M.wave6} tint="rgba(236,152,124,.92)" wall="t15-forest.webp" />
	if (t < C[6]) return <Grouped t={t} tint="rgba(236,152,124,.92)" wall="t15-mist.webp" sel={1}><MailPage /></Grouped>
	if (t < C[7]) return <Grouped t={t} tint="rgba(150,214,206,.92)" wall="t15-mist.webp" wallF="sepia(.3) hue-rotate(160deg) saturate(2) brightness(1.1)" sel={3}><MeetPage /></Grouped>
	if (t < C[8]) return <Grouped t={t} tint="rgba(228,150,104,.92)" wall="t15-forest.webp" wallF="hue-rotate(-20deg) brightness(.8)" sel={4}><LampPage /></Grouped>
	if (t < C[9]) return <Card t={t} a="现在就在" b={"\u00a0MosMos\u00a0里"} tb={M.k6} size={120} />
	if (t < C[10]) return <Macro t={t} t0={M.wave11} tint="rgba(150,214,206,.92)" wall="t15-mist.webp" top={ITEMS[0]} />
	return <End t={t} />
}
