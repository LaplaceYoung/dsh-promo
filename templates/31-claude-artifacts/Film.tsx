// Template 31 — structure of Anthropic "Turn ideas into interactive artifacts" (2025), MosMos content.
// Orange stage: the home window, a click in the sidebar, a bouncing tile that turns into a spoken request, then a
// long shot of a meeting speaker timeline (a step-grid like the reference's drum machine), followed by a montage of
// quick shots — one per place MosMos writes: hot words, the Fn key, a chat, an email, the logo in ASCII, scenes,
// a terminal, a prompt, hot-word fixes, polish levels, a meeting summary — and the logo card with mosmos.io.
import React from "react"
import { AbsoluteFill } from "remotion"
import { CJK, MONO, lerp, clamp01, inOut, useT, Wave, LogoPixels, Wordmark, Cursor, path, COPY, SCENES } from "../_engine/src/mos"
import { Camera } from "../_engine/src/kit"
import GRID from "../_engine/src/logo_grid.json"
import TL from "./timeline.json"

const M = TL.marks as Record<string, number>, C = TL.cuts
const OR = "#d97650", WIN = "#faf8f4", INKC = "#25221e", DIM = "#8b867d", LN = "#e6e0d5", HOT = "#f26a1b", CREAM = "#f3f1ea"
const SERIF = "'Noto Serif CJK SC', 'Noto Serif SC', serif"
const k = (t: number, a: number, d = 0.35) => clamp01((t - a) / d)
const typed = (s: string, t: number, a: number, b: number) => Array.from(s).slice(0, Math.floor(clamp01((t - a) / (b - a)) * Array.from(s).length)).join("")
const ASK = "做一张首页改版周会的发言时间线，看看谁说了多久"
const Tilt: React.FC<{ t: number; t0: number; t1: number; ry?: [number, number]; rx?: number; bg?: string; children: React.ReactNode }> = ({ t, t0, t1, ry = [0, 0], rx = 0, bg = "#2a2a2a", children }) => (
	<AbsoluteFill style={{ background: bg, perspective: 1600 }}><AbsoluteFill style={{ transform: `rotateY(${lerp(t, t0, t1, ry[0], ry[1])}deg) rotateX(${rx}deg) scale(1.08)`, transformStyle: "preserve-3d" }}>{children}</AbsoluteFill></AbsoluteFill>
)
// ---------- opening
const Home: React.FC<{ t: number }> = ({ t }) => {
	const cur = path(t, [[1.0, 1000, 700], [M.click - 0.4, 220, 330], [M.click, 222, 334]])
	return <Camera t={t} keys={[[0, 1.0, 960, 540], [M.zoom - 0.1, 1.02, 960, 540], [M.zoom + 0.6, 2.6, 380, 330], [C[0], 2.7, 380, 335]]}><AbsoluteFill style={{ background: OR }}>
		<div style={{ position: "absolute", left: 160, top: 90, width: 1600, height: 900, borderRadius: 18, background: WIN, boxShadow: "0 30px 80px rgba(0,0,0,.18)", fontFamily: CJK, color: INKC, overflow: "hidden" }}>
			<div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 110, borderRight: `1px solid ${LN}`, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 30, gap: 30, fontSize: 26, color: DIM }}>
				<div>☰</div><div style={{ width: 44, height: 44, borderRadius: 22, background: OR, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>＋</div><div>▭</div><div>⌕</div>
				<div style={{ width: 44, height: 44, borderRadius: 10, background: t > M.click ? "#ece6dc" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", color: INKC }}>◇</div>
			</div>
			<div style={{ position: "absolute", left: 110, right: 0, top: 330, display: "flex", flexDirection: "column", alignItems: "center" }}>
				<div style={{ display: "flex", alignItems: "center", gap: 16, fontFamily: SERIF, fontSize: 54 }}><LogoPixels size={44} t={t} mode="static" />欢迎回来，小林</div>
				<div style={{ marginTop: 36, width: 780, borderRadius: 18, background: "#fff", boxShadow: `0 0 0 1px ${LN}`, padding: "18px 22px", fontSize: 22, color: "#aaa398" }}>按 Fn 开始说<div style={{ height: 50 }} /></div>
			</div>
		</div>
		<Cursor x={cur.x} y={cur.y} down={Math.abs(t - M.click) < 0.1} s={1.0} />
	</AbsoluteFill></Camera>
}
const Tile: React.FC<{ t: number }> = ({ t }) => {
	const a = t - M.tile, bar = inOut(k(t, M.bar, 0.5))
	const w = lerp(bar, 0, 1, 230, 880), h = lerp(bar, 0, 1, 230, 150)
	const s = typed(ASK, t, M.say, M.said)
	const sc = a < 0.3 ? lerp(a, 0, 0.3, 0.3, 1.15) : a < 0.6 ? lerp(a, 0.3, 0.6, 1.15, 0.95) : 1
	const z = inOut(k(t, M.win, C[1] - M.win))
	return <AbsoluteFill style={{ background: OR, alignItems: "center", justifyContent: "center", fontFamily: CJK }}>
		<div style={{ width: w, height: h, borderRadius: lerp(bar, 0, 1, 40, 34), background: "#fdfbf7", boxShadow: "0 18px 50px rgba(80,30,10,.25)", transform: `scale(${sc * (1 - z * 0.3)}) rotate(${bar < 1 ? Math.sin(a * 5) * 8 * (1 - bar) : 0}deg)`, display: "flex", alignItems: "center", justifyContent: bar > 0.5 ? "flex-start" : "center", padding: bar > 0.5 ? "0 44px" : 0, opacity: 1 - z }}>
			{bar < 0.5 ? <div style={{ opacity: 1 - bar * 2 }}><LogoPixels size={120} t={t} mode="spin" /></div> : <div style={{ fontSize: 40, color: INKC, lineHeight: 1.4 }}>{s || <span style={{ color: "#aaa398" }}>按 Fn 开始说</span>}{s && t < M.said && <span style={{ color: "#bbb" }}>|</span>}</div>}
		</div>
		{z > 0 && <div style={{ position: "absolute", transform: `scale(${lerp(z, 0, 1, 0.2, 0.62)})`, opacity: z }}><Timeline t={C[1]} /></div>}
	</AbsoluteFill>
}
// ---------- speaker timeline (step grid)
const SPK = ["说话人 1", "说话人 2", "说话人 3", "说话人 4", "说话人 5"]
const PAT = ["1101100110100000", "0000100000100000", "1010101010101000", "0000000000100000", "0000100000000000"]
const Timeline: React.FC<{ t: number }> = ({ t }) => {
	const playing = t > M.play && t < M.stop, col = playing ? Math.floor((t - M.play) * 110 / 60 * 2) % 16 : -1
	const on = (r: number, c: number) => PAT[r][c] === "1" || (r === 3 && c >= 6 && t > M.toggle + (c - 6) * 0.5)
	return <div style={{ width: 1500, borderRadius: 18, background: "#fff", boxShadow: "0 20px 60px rgba(0,0,0,.15)", padding: "40px 50px", fontFamily: CJK, color: INKC }}>
		<div style={{ fontSize: 40, fontWeight: 800, letterSpacing: 2 }}>发言时间线</div><div style={{ fontSize: 20, color: DIM }}>首页改版周会 · 区分说话人</div>
		<div style={{ display: "flex", gap: 14, marginTop: 22, alignItems: "center" }}><div style={{ flex: 1, border: `1px solid ${LN}`, borderRadius: 10, padding: "12px 16px", fontSize: 20, color: "#aaa398" }}>筛选：全部说话人</div><div style={{ background: "#151515", color: "#fff", borderRadius: 10, padding: "12px 22px", fontSize: 20 }}>导出逐字稿</div></div>
		<div style={{ display: "flex", gap: 12, marginTop: 18, fontSize: 18, alignItems: "center" }}><span style={{ color: DIM }}>跳到：</span>{["开场", "交付顺序", "素材", "交互稿", "视觉方案", "待办"].map((x) => <span key={x} style={{ border: `1px solid ${LN}`, borderRadius: 8, padding: "6px 12px" }}>{x}</span>)}</div>
		<div style={{ display: "flex", gap: 14, marginTop: 24, fontSize: 22, alignItems: "center" }}>{[["▶ 播放", t > M.play - 0.1 && t < M.stop], ["■ 停止", t > M.stop - 0.1], ["⟲ 重置", false]].map(([x, a]) => <span key={x as string} style={{ border: `1.5px solid ${LN}`, borderRadius: 12, padding: "10px 20px", background: a ? "#f2efe9" : "#fff" }}>{x as string}</span>)}<span style={{ color: DIM, fontSize: 18, marginLeft: 20 }}>速度</span><div style={{ width: 160, height: 4, background: LN, position: "relative" }}><div style={{ position: "absolute", left: 90, top: -7, width: 18, height: 18, borderRadius: 9, background: HOT }} /></div><span style={{ fontSize: 18, fontFamily: MONO }}>1.0×</span></div>
		<div style={{ marginTop: 26, borderRadius: 16, background: "#f6f6f4", padding: "22px 26px" }}>{SPK.map((s, r) => <div key={s} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}><div style={{ width: 120, fontSize: 18, color: "#555" }}>{s}</div>{Array.from({ length: 16 }).map((_, c) => <div key={c} style={{ width: 62, height: 46, borderRadius: 8, background: on(r, c) ? HOT : c === col ? "#fde1cf" : "#fff", boxShadow: `0 0 0 1.5px ${on(r, c) ? HOT : "#e8e8e5"}`, transform: `scale(${c === col && on(r, c) ? 1.08 : 1})` }} />)}</div>)}</div>
		<div style={{ display: "flex", gap: 16, marginTop: 20, fontSize: 18 }}>{["逐字稿", "会议总结", "待办", "发言时长", "关键词"].map((x) => <span key={x} style={{ border: `1px solid ${LN}`, borderRadius: 8, padding: "6px 14px" }}>{x}</span>)}</div>
	</div>
}
const TimelineShot: React.FC<{ t: number }> = ({ t }) => {
	const cur = path(t, [[C[1], 800, 700], [M.play - 0.4, 340, 350], [M.play, 342, 352], [M.toggle - 0.4, 850, 720], ...Array.from({ length: 6 }).map((_, i) => [M.toggle + i * 0.5, 850 + i * 72, 720] as [number, number, number]), [M.stop - 0.4, 500, 352], [M.stop, 502, 354]])
	return <Camera t={t} keys={[[C[1], 1.0, 960, 540], [C[1] + 1.2, 1.0, 960, 540], [M.toggle - 0.5, 1.35, 900, 600], [M.stop - 0.8, 1.35, 1000, 620], [M.stop, 1.6, 600, 420], [C[2], 1.65, 610, 430]]}>
		<AbsoluteFill style={{ background: "#eef0f3", alignItems: "center", justifyContent: "center" }}><Timeline t={t} /></AbsoluteFill>
		<div style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 1080 }}><Cursor x={cur.x} y={cur.y} down={[M.play, M.stop, ...Array.from({ length: 6 }).map((_, i) => M.toggle + i * 0.5)].some((x) => Math.abs(t - x) < 0.08)} s={1.1} /></div>
	</Camera>
}
// ---------- montage pieces
const HOTW = ["林清禾", "Nimbus", "Figma", "周舟", "MosMos", "首页改版", "李经理", "交互稿", "品牌素材", "视觉方案", "上线", "逐字稿"]
const Dots: React.FC<{ t: number; t0: number }> = ({ t, t0 }) => <AbsoluteFill style={{ background: "#1d1640", fontFamily: CJK }}>
	<div style={{ position: "absolute", left: 160, top: 80, width: 1100, height: 920, borderRadius: 26, background: "linear-gradient(160deg,#2c2160,#3c1f6a)", padding: 50 }}>
		<div style={{ color: "#fff", fontSize: 40, fontWeight: 700 }}>热词 · 已启用</div>
		<div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 22, marginTop: 40 }}>{Array.from({ length: 36 }).map((_, i) => { const lit = i >= 36 - Math.floor((t - t0 + 0.6) * 9); const hw = HOTW[i % HOTW.length]; return <div key={i} style={{ width: 140, height: 120, borderRadius: 60, background: lit ? (i % 3 ? "#f6a21a" : "#ec4f86") : "#2e2a6a", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 22, fontWeight: 600 }}>{lit ? hw : ""}</div> })}</div>
	</div>
	<div style={{ position: "absolute", left: 1300, top: 80, width: 480, height: 920, borderRadius: 26, background: "#3a2a6e", padding: 36, color: "#d9d2f5", fontSize: 26, lineHeight: 1.6 }}><div style={{ color: "#fff", fontWeight: 700, fontSize: 30 }}>说明</div>{COPY.hotDesc}<div style={{ marginTop: 26, color: "#fff" }}>{COPY.hotStatus}</div></div>
</AbsoluteFill>
const Circle: React.FC<{ t: number }> = ({ t }) => {
	const p = k(t, M.circle, 1.3), L = 1500
	return <AbsoluteFill style={{ background: "#fff", backgroundImage: "linear-gradient(#eee 1px, transparent 1px), linear-gradient(90deg, #eee 1px, transparent 1px)", backgroundSize: "60px 60px", fontFamily: CJK, color: INKC }}>
		<div style={{ position: "absolute", left: 30, top: 24, display: "flex", gap: 12, fontSize: 18 }}><span style={{ border: "1px solid #ddd", borderRadius: 6, padding: "4px 12px" }}>清除</span><span style={{ border: "1px solid #ddd", borderRadius: 6, padding: "4px 12px" }}>提示</span></div>
		<div style={{ position: "absolute", left: 960 - 90, top: 400, width: 180, height: 180, borderRadius: 26, background: "#f4f4f2", boxShadow: "0 8px 0 #ddd, 0 0 0 2px #ccc", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 72, fontWeight: 700 }}>Fn</div>
		<svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}><path d="M960,250 C1200,240 1240,480 1220,560 C1190,720 1010,760 920,740 C760,710 680,600 700,470 C720,340 830,260 980,262" stroke={INKC} strokeWidth={7} fill="none" strokeLinecap="round" strokeDasharray={L} strokeDashoffset={L * (1 - p)} /></svg>
		<div style={{ position: "absolute", top: 820, width: 1920, textAlign: "center", fontSize: 44, fontWeight: 700 }}>按一次 Fn，开始说</div>
		<div style={{ position: "absolute", top: 890, width: 1920, textAlign: "center", fontSize: 24, color: DIM }}>再按一次，文字写好</div>
	</AbsoluteFill>
}
const Forest: React.FC<{ t: number; t0: number }> = ({ t, t0 }) => <AbsoluteFill style={{ background: "linear-gradient(#6fb6e9, #b9def5 60%, #1f4a1a 60%)", overflow: "hidden" }}>
	{Array.from({ length: 14 }).map((_, i) => { const x = ((i * 157) % 1900) - (t - t0) * 60 * (1 + (i % 3)), s = 0.5 + (i % 4) * 0.35; return <div key={i} style={{ position: "absolute", left: x, top: 648 - 380 * s, width: 0, height: 0, borderLeft: `${110 * s}px solid transparent`, borderRight: `${110 * s}px solid transparent`, borderBottom: `${380 * s}px solid ${i % 2 ? "#1f4d2b" : "#2c6a35"}` }} /> })}
	<div style={{ position: "absolute", left: 760, top: 820 }}><div style={{ width: 400, height: 66, borderRadius: 999, background: "#111", display: "flex", alignItems: "center", gap: 18, padding: "0 24px", color: "#fff", fontFamily: CJK, fontSize: 20 }}><Wave t={t} live n={10} h={28} />走路的时候，也能把想法说下来</div></div>
</AbsoluteFill>
const Polishing: React.FC<{ t: number }> = ({ t }) => <AbsoluteFill style={{ background: "linear-gradient(135deg,#efeaf9,#fbe9ee)", alignItems: "center", justifyContent: "center", fontFamily: CJK, color: INKC }}>
	<div style={{ width: 620, height: 380, borderRadius: 26, background: "#fff", boxShadow: "0 20px 60px rgba(80,60,120,.15)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18 }}><LogoPixels size={70} t={t} mode="spin" /><div style={{ fontSize: 40, fontWeight: 700 }}>正在润色邮件…</div><div style={{ fontSize: 22, color: DIM }}>场景：邮件 · 标准润色</div></div>
</AbsoluteFill>
const Mail: React.FC<{ t: number; t0: number }> = ({ t, t0 }) => <AbsoluteFill style={{ background: "linear-gradient(135deg,#e7e3f8,#f6e4ec)", fontFamily: CJK, color: INKC }}>
	<div style={{ position: "absolute", left: 560, top: 60 - (t - t0) * 30, width: 800, borderRadius: 18, background: "#fff", overflow: "hidden", boxShadow: "0 20px 60px rgba(80,60,120,.15)" }}>
		<div style={{ background: "linear-gradient(90deg,#6c4bd8,#8f5be8)", color: "#fff", padding: "22px 30px", fontSize: 32, fontWeight: 700, textAlign: "center" }}>✉ 邮件已写好<div style={{ fontSize: 18, fontWeight: 400, opacity: 0.85 }}>原话保留意思，语气改成正式</div></div>
		<div style={{ padding: "30px 40px", fontSize: 28, lineHeight: 1.8, fontFamily: SERIF }}>{COPY.mail.map((x, i) => <p key={i} style={{ margin: "0 0 18px" }}>{x}</p>)}<p style={{ color: DIM, fontSize: 22 }}>原话：{COPY.chatRaw}</p></div>
	</div>
</AbsoluteFill>
const Ascii: React.FC<{ t: number; t0: number }> = ({ t, t0 }) => {
	const G = GRID as string[], ch = "MOSMOS@#%*+=-:. "
	return <AbsoluteFill style={{ background: "#14161c", alignItems: "center", justifyContent: "center" }}><div style={{ borderRadius: 20, background: "#1d2029", padding: 40, fontFamily: MONO, fontSize: 900 / (G.length * 1.25), lineHeight: 1.1, color: "#d8dbe3", whiteSpace: "pre", transform: `scale(${lerp(t, t0, t0 + 2.5, 1.0, 0.92)})` }}>
		{G.map((row, y) => <div key={y}>{Array.from(row).map((c, x) => { const v = c === "#" ? Math.floor((Math.sin(x * 0.7 + y * 0.5 + t * 4) + 1) * 2.5) : 10 + Math.floor((Math.sin(x * 0.3 - y * 0.4 + t * 2) + 1) * 2.5); return ch[Math.min(ch.length - 1, v)] + ch[Math.min(ch.length - 1, v)] }).join("")}</div>)}
	</div></AbsoluteFill>
}
const Scenes: React.FC<{ t: number }> = ({ t }) => <AbsoluteFill style={{ background: "#0f2a2e", alignItems: "center", justifyContent: "center", fontFamily: CJK }}>
	<div style={{ width: 1000, borderRadius: 20, background: "#13353a", padding: 40, color: "#e6f1ef", textAlign: "center" }}><div style={{ fontSize: 40, fontWeight: 700 }}>选择场景</div><div style={{ fontSize: 20, color: "#8fb3ae", marginTop: 6 }}>{COPY.sceneDesc}</div>
		<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginTop: 30 }}>{[...SCENES, "自动识别"].map((s, i) => <div key={s} style={{ border: `2px solid ${i === 4 && t > M.theme ? "#f2c14e" : "#2c5a60"}`, borderRadius: 12, padding: "22px 0", fontSize: 26 }}>{s}</div>)}</div>
	</div></AbsoluteFill>
const Term: React.FC<{ t: number }> = ({ t }) => <AbsoluteFill style={{ background: "#0b0d12", alignItems: "center", justifyContent: "center", fontFamily: MONO }}>
	<div style={{ width: 1300, height: 700, borderRadius: 16, background: "#12151c", boxShadow: "0 0 0 1px #2a2f3a", padding: 50, color: "#cfd6e4", fontSize: 42, lineHeight: 1.7 }}>
		<div style={{ color: "#6f7a8f" }}># 说：{COPY.termAsk}</div>
		<div><span style={{ color: "#62c554" }}>~/order-service ❯</span> {typed(COPY.termCmd, t, M.term, M.term + 1.4)}<span style={{ opacity: Math.floor(t * 3) % 2 ? 1 : 0 }}>▋</span></div>
		{t > M.term + 1.6 && <div style={{ color: "#f5be4f" }}>./config/staging.env<br />./scripts/deploy.sh</div>}
		<div style={{ position: "absolute" }} />
	</div></AbsoluteFill>
const Prompt: React.FC<{ t: number; t0: number }> = ({ t, t0 }) => <AbsoluteFill style={{ background: "linear-gradient(135deg,#ece9fb,#f8f3ff)", fontFamily: CJK, color: INKC }}>
	<div style={{ position: "absolute", left: 90, top: 80, width: 860, height: 920, borderRadius: 20, background: "#fff", padding: 40, boxShadow: "0 20px 60px rgba(80,60,120,.12)" }}>
		<div style={{ fontSize: 40, fontWeight: 700, color: "#3d3a8a" }}>提示词 · 已写好</div><div style={{ fontSize: 20, color: DIM }}>场景：提示词 · 高级润色</div>
		<div style={{ marginTop: 30, borderRadius: 14, background: "#f4f2fd", padding: 26, fontSize: 28, lineHeight: 1.8 }}>{COPY.prompt.map((x) => <div key={x}>{x}</div>)}</div>
		<div style={{ marginTop: 30, borderRadius: 12, background: "#6c4bd8", color: "#fff", padding: "16px 0", textAlign: "center", fontSize: 26 }}>粘贴到对话框</div>
	</div>
	<div style={{ position: "absolute", left: 1000, top: 80, width: 830, fontSize: 24, lineHeight: 1.9, color: "#4b4860", transform: `translateY(${-(t - t0) * 40}px)` }}><div style={{ fontWeight: 700, fontSize: 30 }}>原话</div>{COPY.raw}<div style={{ fontWeight: 700, fontSize: 30, marginTop: 30 }}>润色后 · 标准</div>{COPY.polish[1].out}<div style={{ fontWeight: 700, fontSize: 30, marginTop: 30 }}>润色后 · 高级</div>{COPY.polish[2].out}</div>
</AbsoluteFill>
const HotFix: React.FC<{ t: number; t0: number }> = ({ t, t0 }) => { const a = k(t, t0 + 0.12, 0.15); return <AbsoluteFill style={{ background: "#16130f", alignItems: "center", justifyContent: "center", fontFamily: SERIF, color: "#f3efe6", fontSize: 92 }}><div>请把 <span style={{ textDecoration: a > 0.5 ? "line-through" : undefined, opacity: 1 - a * 0.6, fontSize: 70 }}>飞马</span></div><div style={{ fontSize: 120, fontFamily: CJK, fontWeight: 700, opacity: a }}>「Figma」</div></AbsoluteFill> }
const Chat: React.FC<{ t: number }> = () => <AbsoluteFill style={{ background: "#3f9a4a", fontFamily: CJK }}>
	<div style={{ position: "absolute", left: 960, top: 0, width: 6, height: 1080, background: "#fff" }} />
	<div style={{ position: "absolute", left: 1100, top: 330, maxWidth: 680, background: "#95ec69", borderRadius: 18, padding: "26px 34px", fontSize: 44, color: "#1a1a1a" }}>{COPY.chatOut}</div>
	<div style={{ position: "absolute", left: 140, top: 520, maxWidth: 680, background: "#fff", borderRadius: 18, padding: "26px 34px", fontSize: 44, color: "#1a1a1a" }}>好的，周三等你。</div>
</AbsoluteFill>
const Levels: React.FC<{ t: number }> = () => <AbsoluteFill style={{ background: "linear-gradient(135deg,#8f8bf0,#b9b5f6)", alignItems: "center", justifyContent: "center", fontFamily: CJK, color: INKC }}>
	<div style={{ width: 1100, borderRadius: 30, background: "#fff", padding: 50 }}><div style={{ fontSize: 48, fontWeight: 700 }}>润色档位</div>
		<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 22, marginTop: 30 }}>{COPY.polish.map((p) => <div key={p.id} style={{ borderRadius: 16, padding: "26px 24px", boxShadow: `0 0 0 ${p.id === "std" ? 3 : 1.5}px ${p.id === "std" ? "#6c63e6" : LN}`, background: p.id === "std" ? "#f1f0fe" : "#fff" }}><div style={{ fontSize: 36, fontWeight: 600 }}>{p.label}</div><div style={{ fontSize: 24, color: DIM, marginTop: 6 }}>{p.hint}</div></div>)}</div>
	</div></AbsoluteFill>
const Icons: React.FC<{ t: number }> = () => <AbsoluteFill style={{ background: "#4a3a4e", alignItems: "center", justifyContent: "center", flexDirection: "row" }}>{[["#8e6be0", "🎙"], ["#c54fd3", "◎"], ["#e5455e", "✓"], ["#2e9bd9", "Fn"]].map(([c, i], j) => <div key={j} style={{ width: 300, height: 300, borderRadius: 150, background: c, marginLeft: j ? -40 : 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 110, fontFamily: CJK, fontWeight: 700, boxShadow: "0 0 0 8px rgba(255,255,255,.12)" }}>{i}</div>)}</AbsoluteFill>
const Notes: React.FC<{ t: number }> = () => <AbsoluteFill style={{ background: "#b8d39a", fontFamily: CJK, color: INKC }}>
	<div style={{ position: "absolute", left: 120, top: 60, fontSize: 34 }}>把会议的原话，整理成结构化的纪要</div>
	<div style={{ position: "absolute", left: 120, top: 150, width: 720, height: 760, borderRadius: 16, background: "#fff", padding: 30, fontSize: 24, lineHeight: 1.7, color: "#555" }}><div style={{ fontWeight: 700, fontSize: 30, color: INKC }}>原始逐字稿</div>{COPY.meeting.map(([w, tm, s]) => <div key={tm}>{tm} {w}：{s}</div>)}</div>
	<div style={{ position: "absolute", left: 900, top: 150, width: 900, height: 900, borderRadius: 16, background: "#fff", padding: 36, fontSize: 26, lineHeight: 1.8 }}><div style={{ fontWeight: 700, fontSize: 38 }}>首页改版周会 · 会议总结</div><div style={{ fontWeight: 700, marginTop: 14 }}>会议概要</div>交付顺序按素材、交互、视觉推进。<div style={{ fontWeight: 700, marginTop: 14 }}>待办事项</div>{COPY.todos.map((x) => <div key={x}>· {x}</div>)}</div>
</AbsoluteFill>
const End: React.FC<{ t: number }> = ({ t }) => {
	const a = inOut(k(t, C[19], 0.3))
	return <AbsoluteFill style={{ background: "#fff", alignItems: "center", justifyContent: "center" }}>
		<div style={{ width: lerp(a, 0, 1, 1500, 1920), height: lerp(a, 0, 1, 850, 1080), borderRadius: lerp(a, 0, 1, 14, 0), background: CREAM, boxShadow: `0 0 0 ${2 * (1 - a)}px #ddd`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
			<div style={{ display: "flex", alignItems: "center", gap: 30 }}><LogoPixels size={112} t={t} mode="static" /><Wordmark size={134} color={INKC} /></div>
			<div style={{ position: "absolute", top: 900, fontFamily: CJK, fontSize: 40, color: INKC }}>开口说，就能写好 · <b>{typed("mosmos.io", t, M.url, M.url + 0.8)}</b></div>
		</div>
	</AbsoluteFill>
}
export const Film: React.FC = () => {
	const t = useT()
	if (t < C[0]) return <Home t={t} />
	if (t < C[1]) return <Tile t={t} />
	if (t < C[2]) return <TimelineShot t={t} />
	if (t < C[3]) return <Dots t={t} t0={C[2]} />
	if (t < C[4]) return <Tilt t={t} t0={C[3]} t1={C[4]} ry={[-14, -20]} bg="#120d2a"><Dots t={t} t0={C[2]} /></Tilt>
	if (t < C[5]) return <Circle t={t} />
	if (t < C[6]) return <Forest t={t} t0={C[5]} />
	if (t < C[7]) return <Polishing t={t} />
	if (t < C[8]) return <Mail t={t} t0={C[7]} />
	if (t < C[9]) return <Ascii t={t} t0={C[8]} />
	if (t < C[10]) return <Tilt t={t} t0={C[9]} t1={C[10]} ry={[18, 8]} bg="#0a1a1d"><Ascii t={t} t0={C[8]} /></Tilt>
	if (t < C[11]) return <Scenes t={t} />
	if (t < C[12]) return <Term t={t} />
	if (t < C[13]) return <Prompt t={t} t0={C[12]} />
	if (t < C[14]) return <Tilt t={t} t0={C[13]} t1={C[14]} ry={[-10, -14]} bg="#e8e6e0"><HotFix t={t} t0={C[13]} /></Tilt>
	if (t < C[15]) return <Tilt t={t} t0={C[14]} t1={C[15]} ry={[12, 16]} bg="#e8e6e0"><Chat t={t} /></Tilt>
	if (t < C[16]) return <Tilt t={t} t0={C[15]} t1={C[16]} ry={[-12, -16]} bg="#e8e6e0"><Levels t={t} /></Tilt>
	if (t < C[17]) return <Tilt t={t} t0={C[16]} t1={C[17]} ry={[10, 14]} bg="#e8e6e0"><Icons t={t} /></Tilt>
	if (t < C[18]) return <Tilt t={t} t0={C[17]} t1={C[18]} ry={[-8, -12]} bg="#e8e6e0"><Notes t={t} /></Tilt>
	if (t < C[19]) return <Tilt t={t} t0={C[18]} t1={C[19]} ry={[10, 14]} bg="#e8e6e0"><Dots t={t} t0={C[2]} /></Tilt>
	return <End t={t} />
}
