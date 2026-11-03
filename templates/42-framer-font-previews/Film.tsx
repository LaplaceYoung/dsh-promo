// Template 42 — structure of Framer "Framer Update: Instant Font Previews" (2026), MosMos content.
// One continuous take: a dark editor window over a starfield, a heading gets selected, the view pushes in on the
// canvas and inspector, and hovering MosMos scene and polish options previews the heading live. Fade to black,
// a fast run of words in different type, then the pixel logo.
import React from "react"
import { AbsoluteFill } from "remotion"
import { CJK, HEAVY, MONO, lerp, clamp01, inOut, useT, LogoPixels, Cursor, path, COPY } from "../_engine/src/mos"
import { Camera, rand } from "../_engine/src/kit"
import TL from "./timeline.json"

const M = TL.marks as Record<string, number>
const SERIF = "'Noto Serif CJK SC', 'Noto Serif SC', serif"
const BLUE = "#0a84ff", P1 = "#111113", LN = "#26262a", TX = "#d8d8dc", T2 = "#8a8a90"
type Opt = { label: string; hint: string; text: string; font: string; w: number; fs?: number; it?: boolean }
const H0: Opt = { label: "", hint: "", text: "现在，开口就好。", font: CJK, w: 600 }
const SC: Opt[] = [
	{ label: "自动识别", hint: "按当前应用", text: "现在，开口就好。", font: CJK, w: 600 },
	{ label: COPY.scenes[0].label, hint: "简洁自然", text: COPY.chatOut, font: HEAVY, w: 800, fs: 30 },
	{ label: COPY.scenes[1].label, hint: "完整专业", text: COPY.mail[0], font: SERIF, w: 700 },
	{ label: COPY.scenes[2].label, hint: "结构清晰", text: COPY.doc[0][0] + COPY.doc[0][1], font: HEAVY, w: 900, fs: 32 },
	{ label: COPY.scenes[3].label, hint: "要求明确", text: COPY.prompt[0], font: CJK, w: 300 },
	{ label: COPY.scenes[4].label, hint: "生成命令", text: COPY.termCmd, font: MONO, w: 500 },
]
const PO: Opt[] = [
	{ label: "关闭", hint: COPY.polish[0].hint, text: COPY.raw.slice(0, 30) + "……", font: CJK, w: 400, fs: 28 },
	{ label: "标准", hint: COPY.polish[1].hint, text: COPY.polish[1].out!, font: CJK, w: 600, fs: 30 },
	{ label: "高级", hint: COPY.polish[2].hint, text: COPY.polish[2].out!, font: CJK, w: 700 },
]
const HS = ["h0", "h1", "h2", "h3", "h4", "h5"].map((k) => M[k]), PS = ["p0", "p1", "p2"].map((k) => M[k])
// popover geometry (world px)
const PX = 1322, PY = 726, PW = 226, RH = 27, LIST0 = PY + 100
const rowY = (k: number) => LIST0 + k * RH + RH / 2

const Stars: React.FC = () => <>{Array.from({ length: 140 }, (_, k) => <div key={k} style={{ position: "absolute", left: rand(k) * 1920, top: rand(k + 400) * 1080, width: 2, height: 2, borderRadius: 1, background: "#fff", opacity: 0.25 + 0.6 * rand(k + 900) }} />)}</>
const Row: React.FC<{ y: number; label: string; v?: React.ReactNode; hi?: boolean }> = ({ y, label, v, hi }) => <div style={{ position: "absolute", left: 1574, top: y, width: 282, height: 26, display: "flex", alignItems: "center", fontSize: 12, color: T2 }}>
	<span style={{ width: 70 }}>{label}</span>{v !== undefined && <div style={{ flex: 1, height: 22, borderRadius: 5, background: hi ? "#1e3a66" : "#1c1c1f", boxShadow: hi ? `0 0 0 1px ${BLUE}` : undefined, display: "flex", alignItems: "center", padding: "0 8px", color: TX, gap: 6 }}>{v}</div>}</div>
const Sec: React.FC<{ y: number; label: string }> = ({ y, label }) => <div style={{ position: "absolute", left: 1574, top: y, width: 282, display: "flex", justifyContent: "space-between", fontSize: 12.5, fontWeight: 600, color: TX }}><span>{label}</span><span style={{ color: T2 }}>+</span></div>

export const Film: React.FC = () => {
	const t = useT()
	// ---- words on black + logo ----
	if (t >= M.words) {
		if (t >= M.logo) return <AbsoluteFill style={{ background: "#000", alignItems: "center", justifyContent: "center" }}><div style={{ opacity: 1 - clamp01((t - M.end0) / 0.6) }}><LogoPixels size={112} t={t} mode="in" t0={M.logo} invert /></div></AbsoluteFill>
		const k = Math.floor((t - M.words) / M.step) % 12, a = clamp01((t - M.words - Math.floor((t - M.words) / M.step) * M.step) / 0.12)
		const st: React.CSSProperties = { color: "#fff", whiteSpace: "nowrap", transform: `scale(${0.92 + 0.08 * a})`, opacity: 0.3 + 0.7 * a }
		const W: React.ReactNode[] = [
			<div style={{ ...st, fontFamily: HEAVY, fontWeight: 900, fontSize: 112, transform: `${st.transform} skewX(-10deg)` }}>开口</div>,
			<div style={{ ...st, fontFamily: MONO, fontWeight: 700, fontSize: 100, letterSpacing: -2 }}>MosMos</div>,
			<div style={{ ...st, fontFamily: SERIF, fontWeight: 700, fontSize: 108 }}>消息</div>,
			<div style={{ ...st, fontFamily: CJK, fontWeight: 200, fontSize: 108, letterSpacing: 24 }}>邮件</div>,
			<div style={{ ...st, fontFamily: HEAVY, fontWeight: 800, fontSize: 62, lineHeight: 1.0, textAlign: "center" }}>说完<div style={{ fontSize: 24, margin: "4px 0" }}>就</div>写好</div>,
			<div style={{ ...st, fontFamily: HEAVY, fontWeight: 900, fontSize: 112 }}>文档</div>,
			<div style={{ ...st, fontFamily: CJK, fontWeight: 700, fontSize: 84, padding: "10px 34px", borderRadius: 22, boxShadow: "inset 0 0 0 5px #fff" }}>Fn</div>,
			<div style={{ ...st, fontFamily: SERIF, fontWeight: 400, fontSize: 104, fontStyle: "italic" }}>提示词</div>,
			<div style={{ ...st, fontFamily: MONO, fontWeight: 400, fontSize: 96 }}>命令</div>,
			<div style={{ ...st, fontFamily: HEAVY, fontWeight: 900, fontSize: 112, color: "transparent", WebkitTextStroke: "3px #fff" }}>热词</div>,
			<div style={{ ...st, fontFamily: CJK, fontWeight: 100, fontSize: 112 }}>纪要</div>,
			<div style={{ ...st, fontFamily: HEAVY, fontWeight: 900, fontSize: 108, transform: `${st.transform} skewX(-14deg)` }}>润色</div>,
		]
		return <AbsoluteFill style={{ background: "#000", alignItems: "center", justifyContent: "center" }}>{W[k]}</AbsoluteFill>
	}
	// ---- editor take ----
	const zin = lerp(t, M.z0, M.z1, 0, 1, inOut) * (1 - lerp(t, M.zo0, M.zo1, 0, 1, inOut))
	const cam: [number, number, number, number][] = [[0, 1, 960, 540], [8, 1.0, 960, 540], [M.z0, 1, 960, 540], [M.z1, 1.3, 1105, 746], [M.frame, 1.3, 1105, 746], [M.zo0, 1.3, 1080, 700], [M.zo1, 1, 960, 540], [M.fade1, 1, 960, 540]]
	const pz = 1 + 0.3 * zin
	const panelOn = clamp01((t - M.panel) / 0.25)
	const popOpen = t >= M.open && t < M.close
	const polishMode = t >= M.filtPick2
	const list = polishMode ? PO : SC
	const hs = polishMode ? PS : HS
	let hov = -1
	if (popOpen && !(t >= M.filt && t < M.filtPick + 0.2) && !(t >= M.filt2 && t < M.filtPick2 + 0.2)) hs.forEach((h, k) => { if (t >= h) hov = k })
	const chosen = t >= M.pick ? PO[2] : null
	const prev: Opt = chosen ?? (hov >= 0 && t < (polishMode ? M.pick : M.filt2) ? list[hov] : H0)
	const selOn = t >= M.sel
	const menuOpen = (t >= M.filt && t < M.filtPick) || (t >= M.filt2 && t < M.filtPick2)
	const menuHi = t < M.filtPick ? (t > M.filtPick - 0.5 ? 1 : 0) : (t > M.filtPick2 - 0.4 ? 2 : 1)
	const pScroll = lerp(t, M.frame, M.frame + 0.6, 0, 1, inOut)
	// cursor path (world)
	const lr = (k: number) => [PX + 120, rowY(k) + 4]
	const cp = path(t, [[0, 1250, 900], [4, 1080, 820], [9.6, 760, 520], [M.sel, 700, 477], [12.5, 900, 640], [M.panel + 0.6, 1640, 700], [M.open - 0.3, 1700, 734], [M.open, 1700, 734],
		[M.filt - 0.6, 1440, 785], [M.filt, 1430, 787], [M.filtPick - 0.4, 1420, 820], [M.filtPick, 1420, 820], [20.6, 1400, 840], [M.h0, ...lr(0)], [M.h1, ...lr(1)], [M.h2, ...lr(2)], [M.h3, ...lr(3)], [M.h4, ...lr(4)], [M.h5, ...lr(5)],
		[M.filt2 - 0.5, 1430, 787], [M.filt2, 1430, 787], [M.filtPick2 - 0.3, 1420, 846], [M.filtPick2, 1420, 846], [M.p0, ...lr(0)], [M.p1, ...lr(1)], [M.p2, ...lr(2)], [M.pick, ...lr(2)], [M.close, 1300, 640], [M.frame, 1180, 600], [M.zo1, 1250, 760], [M.fade1, 1300, 800]] as [number, number, number][])
	const down = [M.sel, M.open, M.filt, M.filtPick, M.filt2, M.filtPick2, M.pick, M.frame].some((c) => Math.abs(t - c) < 0.08)
	const fadeBlack = clamp01((t - M.fade0) / (M.fade1 - M.fade0))
	const F = CJK
	// inspector rows: 场景 row lands on y = 734
	const R = (n: number) => 734 + n * 30 - pScroll * 260
	return <AbsoluteFill style={{ background: "#000", fontFamily: F }}>
		<Camera t={t} keys={cam}>
			<Stars />
			<div style={{ position: "absolute", left: 50, top: 110, width: 1820, height: 1100, borderRadius: 14, background: "#0b0b0c", boxShadow: "0 0 0 1px #2a2a2e", overflow: "hidden" }}>
				{/* title bar */}
				<div style={{ position: "absolute", left: 0, top: 0, width: 1820, height: 62, borderBottom: `1px solid ${LN}`, display: "flex", alignItems: "center", gap: 14, padding: "0 18px", boxSizing: "border-box", fontSize: 12, color: TX }}>
					{["#ff5f57", "#febc2e", "#28c840"].map((c) => <div key={c} style={{ width: 12, height: 12, borderRadius: 6, background: c }} />)}
					<div style={{ marginLeft: 20, padding: "5px 12px", borderRadius: 6, background: "#1c1c1f", display: "flex", gap: 8, alignItems: "center" }}><LogoPixels size={12} t={t} mode="static" invert />首页改版</div>
					{["插入", "布局", "文字", "组件", "数据"].map((x) => <span key={x} style={{ color: T2, marginLeft: 10 }}>{x}</span>)}
					<span style={{ flex: 1, textAlign: "center", color: TX }}>首页改版</span>
					<span style={{ padding: "5px 12px", borderRadius: 6, background: "#1c1c1f" }}>邀请</span><span style={{ padding: "5px 12px", borderRadius: 6, background: BLUE, color: "#fff" }}>发布</span></div>
				{/* layers */}
				<div style={{ position: "absolute", left: 0, top: 62, width: 280, bottom: 0, borderRight: `1px solid ${LN}`, fontSize: 12, color: TX, padding: 14, boxSizing: "border-box" }}>
					<div style={{ display: "flex", gap: 6, marginBottom: 12 }}>{["页面", "图层", "素材"].map((x, k) => <span key={x} style={{ padding: "4px 10px", borderRadius: 5, background: k === 1 ? "#26262a" : undefined, color: k === 1 ? TX : T2 }}>{x}</span>)}</div>
					<div style={{ padding: "6px 8px", borderRadius: 6, background: "#1c1c1f", color: T2, marginBottom: 16 }}>⌕ 搜索…</div>
					{[["▾ ▢ 桌面", 0], ["▾ ▢ 首屏", 1], ["T 标题", 2], ["T 正文", 2], ["▢ 图片", 1]].map(([x, d], k) => <div key={k} style={{ padding: "6px 8px", paddingLeft: 8 + (d as number) * 14, borderRadius: 5, background: selOn && k === 2 ? BLUE : undefined, color: selOn && k === 2 ? "#fff" : TX }}>{x}</div>)}</div>
				{/* inspector */}
				<div style={{ position: "absolute", left: 1500, top: 62, width: 320, bottom: 0, borderLeft: `1px solid ${LN}`, background: P1 }} /></div>
			{/* inspector content in world coords */}
			<div style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 1210, clipPath: "inset(173px 50px 0 1550px)", opacity: panelOn, color: TX }}>
				<Sec y={R(-13)} label="叠加" /><Sec y={R(-12)} label="光标" /><Sec y={R(-11)} label="样式" /><Row y={R(-10)} label="透明度" v="1" /><Row y={R(-9)} label="可见" v="是" />
				<Sec y={R(-8)} label="变换" /><Sec y={R(-7)} label="文字" /><Row y={R(-6)} label="样式" v="选择…" /><Row y={R(-5)} label="内容" v={prev.text.slice(0, 8) + "…"} />
				<Row y={R(-4)} label="字体" v="系统字体" /><Row y={R(-3)} label="字号" v="34" /><Row y={R(-2)} label="对齐" v="左" />
				<Sec y={R(-0.8)} label="MosMos" />
				<Row y={R(0) + 12} label="场景" v={<>{polishMode ? "自动识别" : hov >= 0 && popOpen ? SC[hov].label : "自动识别"}<span style={{ flex: 1 }} />▾</>} hi={popOpen && !polishMode} />
				<Row y={R(1) + 12} label="润色" v={<>{chosen ? "高级" : polishMode && hov >= 0 && popOpen ? PO[hov].label : "标准"}<span style={{ flex: 1 }} />▾</>} hi={popOpen && polishMode} />
				<Row y={R(2) + 12} label="热词" v={COPY.hotStatus} /><Row y={R(3) + 12} label="快捷键" v="Fn" /><Row y={R(4) + 12} label="会议" v="Fn + Shift" />
				<Sec y={R(5.3) + 12} label="滚动区块" /><Sec y={R(6.3) + 12} label="无障碍" /><Row y={R(7.3) + 12} label="标签" v="H1" /><Sec y={R(8.6) + 12} label="布局" /><Row y={R(9.6) + 12} label="方向" v="纵向" /><Row y={R(10.6) + 12} label="间距" v="24" /></div>
			{/* canvas page */}
			<div style={{ position: "absolute", left: 340, top: 245, fontSize: 11, color: T2 }}>桌面 · 1200</div>
			<div style={{ position: "absolute", left: 331, top: 173, width: 1218, height: 1040, overflow: "hidden" }}><div style={{ position: "absolute", left: 44, top: 127, width: 1145, height: 1100, background: "#000", boxShadow: "0 0 0 1px #1d1d20", transformOrigin: "0 0", transform: `scale(${pz})`, overflow: "hidden" }}>
				<div style={{ position: "absolute", left: 20, top: 26 }}><LogoPixels size={26} t={t} mode="static" invert /></div>
				<div style={{ position: "absolute", left: 18, top: 152, width: 760, minHeight: 46, fontFamily: prev.font, fontWeight: prev.w, fontSize: prev.fs ?? 34, lineHeight: 1.25, color: "#fff", boxShadow: selOn ? `0 0 0 1.5px ${BLUE}` : undefined, padding: "2px 4px", whiteSpace: "pre-wrap" }}>
					{prev.text}{selOn && <div style={{ position: "absolute", right: -4, top: "50%", width: 7, height: 7, marginTop: -3, borderRadius: 4, background: "#fff", boxShadow: `0 0 0 1.5px ${BLUE}` }} />}</div>
				<div style={{ position: "absolute", left: 22, top: 245, width: 620, fontFamily: SERIF, fontSize: 22, lineHeight: 1.45, color: "#8d8d93" }}>{COPY.meta}</div>
				<div style={{ position: "absolute", left: 22, top: 430, width: 1100, height: 760, borderRadius: 40, overflow: "hidden", background: "linear-gradient(180deg,#14b4ff,#0a8cff 60%,#2860ff)" }}>
					<div style={{ position: "absolute", left: 240, top: 80, width: 720, height: 560, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(250,210,255,.95), rgba(200,160,255,.5) 60%, rgba(200,160,255,0))", filter: "blur(30px)" }} />
					<div style={{ position: "absolute", left: 250, top: 30, display: "flex", alignItems: "flex-end", gap: 34, transform: "perspective(900px) rotateY(-18deg) rotateX(8deg)", height: 440 }}>{[0.35, 0.6, 0.85, 1, 0.75, 0.5, 0.3].map((h, k) => <div key={k} style={{ width: 70, height: 440 * (0.55 + 0.45 * h) * (0.9 + 0.1 * Math.sin(t * 1.4 + k)), borderRadius: 35, boxShadow: "inset 0 0 0 5px #fff, 10px 10px 0 -2px rgba(255,255,255,.35)", alignSelf: "center" }} />)}</div></div></div></div>
			{/* popover */}
			{popOpen && <div style={{ position: "absolute", left: PX, top: PY, width: PW, height: 286, borderRadius: 10, background: "#18181b", boxShadow: "0 0 0 1px #2c2c30, 0 20px 40px rgba(0,0,0,.6)", fontSize: 12, color: TX, opacity: clamp01((t - M.open) / 0.12) * clamp01((M.close - t) / 0.12) }}>
				<div style={{ display: "flex", justifyContent: "space-between", padding: "10px 12px 6px", fontWeight: 600 }}><span>MosMos · 选项</span><span style={{ color: T2 }}>×</span></div>
				<div style={{ margin: "0 10px 6px", padding: "5px 8px", borderRadius: 5, background: "#222226", boxShadow: `0 0 0 1px ${BLUE}`, color: T2 }}>搜索</div>
				<div style={{ margin: "0 10px", padding: "5px 8px", borderRadius: 5, background: "#222226", display: "flex" }}>{t < M.filtPick ? "全部" : polishMode ? "润色" : "场景"}<span style={{ flex: 1 }} />▾</div>
				{(t >= M.filtPick ? list : [...SC.slice(0, 3), ...PO]).map((o, k) => <div key={k} style={{ position: "absolute", left: 6, top: LIST0 - PY + k * RH, width: PW - 12, height: RH - 2, borderRadius: 5, display: "flex", alignItems: "center", gap: 8, padding: "0 8px", boxSizing: "border-box", fontFamily: o.font, fontWeight: Math.min(o.w, 700),
					background: (chosen ? polishMode && k === 2 : k === hov) ? BLUE : (!polishMode && t < M.filt2 && k === 0 && t >= M.filtPick) || (polishMode && !chosen && k === 1) ? "#26262b" : undefined, color: "#fff" }}>{o.label}<span style={{ flex: 1 }} /><span style={{ fontFamily: CJK, fontWeight: 400, fontSize: 10.5, color: k === hov ? "#dbe8ff" : T2 }}>{o.hint}</span></div>)}
				{menuOpen && <div style={{ position: "absolute", left: 6, top: 82, width: PW - 12, borderRadius: 8, background: "#2a2a2f", boxShadow: "0 10px 30px rgba(0,0,0,.6)", padding: 4 }}>{["全部", "场景", "润色", "热词"].map((x, k) => <div key={x} style={{ padding: "5px 10px", borderRadius: 5, background: k === menuHi ? BLUE : undefined, display: "flex", gap: 8 }}><span style={{ width: 10 }}>{(t < M.filtPick ? k === 0 : k === 1) ? "✓" : ""}</span>{x}</div>)}</div>}</div>}
			<Cursor x={cp.x} y={cp.y} down={down} s={0.7} /></Camera>
		<AbsoluteFill style={{ background: "#000", opacity: fadeBlack }} /></AbsoluteFill>
}
