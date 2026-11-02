// Template 13 — structure of Cursor "Introducing Cursor 2.0 and Composer" (2025), MosMos content.
// Light grey typed title cards, an illustrative bar chart, then long product demos inside an app window that
// sits on a landscape wallpaper (licensed photo, ASSETS.md). Most scene changes are soft dissolves; only 8 hard cuts.
import React from "react"
import { AbsoluteFill, Img, Loop, OffthreadVideo, Sequence, staticFile } from "remotion"
import { CJK, HEAVY, SANS, COPY, lerp, clamp01, inOut, typeAt, useT, Pill, Win, Wave, Cursor, path, LogoPixels, Wordmark, T3, LINE } from "../_engine/src/mos"
import { Camera, CamKey } from "../_engine/src/kit"
import TL from "./timeline.json"

const M = TL.marks as Record<string, number>, C = TL.cuts
const BG = "#f2f2f0", FPS = 60

// ---------- typed title card (no caret, like the reference)
const TypeCard: React.FC<{ t: number; t0: number; lines: string[]; size?: number }> = ({ t, t0, lines, size = 64 }) => {
	let s0 = t0
	return (
		<AbsoluteFill style={{ background: BG, alignItems: "center", justifyContent: "center" }}>
			<div style={{ fontFamily: SANS, fontWeight: 500, fontSize: size, color: "#161616", textAlign: "center", lineHeight: 1.3, letterSpacing: "-0.01em" }}>
				{lines.map((l, i) => { const st = s0; s0 += l.length / 24 + 0.15; return <div key={i} style={{ height: size * 1.3, whiteSpace: "pre" }}>{typeAt(l, t, st, 24).s || "\u00a0"}</div> })}
			</div>
		</AbsoluteFill>
	)
}

// ---------- opening mark
const Logo: React.FC<{ t: number }> = ({ t }) => (
	<AbsoluteFill style={{ background: BG, alignItems: "center", justifyContent: "center" }}>
		<div style={{ display: "flex", alignItems: "center", gap: 26, transform: `scale(${lerp(t, 0, 2.4, 1, 1.06, inOut)})` }}>
			<div style={{ transform: `perspective(700px) rotateY(${lerp(t, M.logo, M.logo + 0.9, -70, 0)}deg)`, opacity: clamp01((t - M.logo) / 0.2) }}><LogoPixels size={110} t={t} mode="static" /></div>
			<div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 84, color: "#161616", opacity: clamp01((t - M.logo - 0.4) / 0.3) }}>MosMos</div>
		</div>
	</AbsoluteFill>
)

// ---------- illustrative chart (no measured numbers)
const ROWS: [string, number, number][] = [["打字，再改", 0.82, 0.3], ["只打字", 0.7, 0.45], ["听写，再手改", 0.5, 0.55], ["MosMos", 0.9, 0.92]]
const Chart: React.FC<{ t: number }> = ({ t }) => {
	const panel = (k: 1 | 2, title: string) => (
		<div style={{ width: 620 }}>
			{ROWS.map(([l, a, b], i) => {
				const g = lerp(t, M.bars + i * 0.12 + (k - 1) * 0.25, M.bars + 1.1 + i * 0.12, 0, 1)
				const hi = i === ROWS.length - 1
				return <div key={i} style={{ display: "flex", alignItems: "center", height: 58 }}>
					<div style={{ width: 210, fontFamily: CJK, fontSize: 24, color: hi ? "#111" : "#8a8a88", fontWeight: hi ? 700 : 400 }}>{l}</div>
					<div style={{ height: 26, width: 400 * (k === 1 ? a : b) * g, background: hi ? "#111" : "#d6d6d3", borderRadius: 3 }} />
				</div>
			})}
			<div style={{ marginTop: 30, marginLeft: 210, fontFamily: CJK, fontSize: 24, color: "#111", fontWeight: 600 }}>{title}</div>
			<div style={{ marginLeft: 210, fontFamily: CJK, fontSize: 19, color: "#8a8a88", marginTop: 6 }}>示意，非实测</div>
		</div>
	)
	return (
		<AbsoluteFill style={{ background: BG }}>
			<Camera t={t} keys={[[M.x_chart, 0.9, 960, 540], [C[0], 1.0, 960, 540]]}>
				<div style={{ position: "absolute", left: 230, top: 330, display: "flex", gap: 60 }}>{panel(1, "成稿完整度")}{panel(2, "从开口到写好的速度")}</div>
			</Camera>
		</AbsoluteFill>
	)
}

// ---------- app window
const Wall: React.FC = () => <Img src={staticFile("t13-wall.webp")} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
const HIST = [["飞书", "第一版周三前发你，你先把品牌素材…"], ["邮件", "李经理，您好：第一版方案将在…"], ["文档", "目标：将首页上线时间提前至周五。"], ["会议", "首页改版周会 · 3 位发言人"], ["终端", COPY.termCmd], ["提示词", "请对比分析三款语音输入产品。"]]
const Side: React.FC<{ sel?: number }> = ({ sel = -1 }) => (
	<div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 330, background: "#f7f7f8", borderRight: `1px solid ${LINE}`, padding: "22px 14px", fontFamily: CJK }}>
		<div style={{ fontSize: 19, color: "#1b1b1d", padding: "10px 14px", borderRadius: 10, background: sel === -2 ? "#e9e9ec" : "transparent" }}>＋ 新输入</div>
		<div style={{ fontSize: 14, color: T3, padding: "18px 14px 6px" }}>最近</div>
		{HIST.map(([a, b], i) => <div key={i} style={{ padding: "10px 14px", borderRadius: 10, background: i === sel ? "#e9e9ec" : "transparent" }}>
			<div style={{ fontSize: 17, color: "#1b1b1d" }}>{a}</div><div style={{ fontSize: 14, color: T3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{b}</div></div>)}
	</div>
)
const Input: React.FC<{ text: string; w?: number; chip?: string; live?: boolean; t: number }> = ({ text, w = 1000, chip = "润色：标准", live, t }) => (
	<div style={{ width: w, borderRadius: 20, background: "#fff", boxShadow: "0 0 0 1px #e3e3e6, 0 10px 30px rgba(0,0,0,.06)", padding: "26px 30px 18px", fontFamily: CJK }}>
		<div style={{ fontSize: 30, color: text ? "#151517" : "#b4b6ba", minHeight: 44 }}>{text || "按 Fn，说点什么…"}</div>
		<div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 18 }}>
			<div style={{ fontSize: 17, color: "#55565b", background: "#f2f2f4", padding: "6px 12px", borderRadius: 8 }}>{chip}</div>
			<div style={{ fontSize: 17, color: "#55565b", background: "#f2f2f4", padding: "6px 12px", borderRadius: 8 }}>场景：飞书</div>
			<div style={{ flex: 1 }} />
			<div style={{ width: 44, height: 44, borderRadius: 99, background: "#111", display: "flex", alignItems: "center", justifyContent: "center" }}><Wave t={t} live={live} n={5} h={20} color="#fff" /></div>
		</div>
	</div>
)
const AppWin: React.FC<{ children?: React.ReactNode; sel?: number }> = ({ children, sel }) => (
	<div style={{ position: "absolute", left: 210, top: 100 }}><Win w={1500} h={880} title="MosMos"><Side sel={sel} /><div style={{ position: "absolute", left: 330, top: 0, right: 0, bottom: 0 }}>{children}</div></Win></div>
)
const Desk: React.FC<{ t: number }> = ({ t }) => {
	const cur = path(t, [[M.win, 1400, 820], [M.zoom - 0.3, 1400, 820], [M.zoom + 1.2, 330, 230], [M.x_input, 330, 230]])
	return (
		<AbsoluteFill><Wall />
			<Camera t={t} keys={[[M.win, 1, 960, 540], [M.zoom, 1, 960, 540], [M.zoom + 1.8, 2.2, 520, 330], [M.x_input + 0.5, 2.3, 520, 330]]}>
				<AppWin sel={t > M.zoom + 1.4 ? -2 : -1}><div style={{ position: "absolute", left: 0, right: 0, top: 300, display: "flex", flexDirection: "column", alignItems: "center", gap: 30 }}>
					<div style={{ fontFamily: CJK, fontSize: 34, color: "#151517", fontWeight: 600 }}>今天想写点什么？</div><Input t={t} text="" w={900} /></div></AppWin>
				<Cursor x={cur.x} y={cur.y} down={t > M.zoom + 1.35 && t < M.zoom + 1.5} />
			</Camera>
		</AbsoluteFill>
	)
}

// ---------- prompt, polish picker, three outputs
const ASK = "帮我回李经理：第一版周三前发，素材今天给我"
const Typing: React.FC<{ t: number }> = ({ t }) => (
	<AbsoluteFill style={{ background: "#fff" }}>
		<Camera t={t} keys={[[M.x_input, 1.12, 960, 520], [M.x_card3, 1.0, 960, 520]]}>
			<div style={{ position: "absolute", left: 460, top: 420 }}><Input t={t} text={typeAt(ASK, t, M.type1, 12).s} live /></div>
			<div style={{ position: "absolute", left: 760, top: 700 }}><Pill t={t} state="语音输入" live /></div>
		</Camera>
	</AbsoluteFill>
)
const Drop: React.FC<{ t: number }> = ({ t }) => {
	const cur = path(t, [[M.x_drop, 1300, 760], [M.pick - 0.3, 520, 640], [M.pick + 0.3, 520, 700], [M.pick + 0.8, 520, 760], [M.x_cols, 560, 790]])
	const n = [0, 1, 2].filter((i) => t > M.pick + i * 0.5).length
	return (
		<AbsoluteFill style={{ background: "#fff" }}>
			<div style={{ position: "absolute", left: 460, top: 400 }}><Input t={t} text={ASK} chip={n ? `润色：×${n}` : "润色：标准"} /></div>
			<div style={{ position: "absolute", left: 470, top: 610, width: 420, background: "#fff", borderRadius: 14, boxShadow: "0 0 0 1px #e3e3e6, 0 16px 40px rgba(0,0,0,.1)", padding: 8, fontFamily: CJK, opacity: clamp01((t - M.x_drop - 0.4) / 0.2) }}>
				{COPY.polish.map((p, i) => <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 14px", borderRadius: 10, background: i < n ? "#f2f2f4" : "transparent" }}>
					<div style={{ width: 22, height: 22, borderRadius: 6, border: "2px solid #111", background: i < n ? "#111" : "#fff", color: "#fff", fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center" }}>{i < n ? "✓" : ""}</div>
					<div style={{ fontSize: 21, color: "#151517" }}>{p.label}</div><div style={{ fontSize: 16, color: T3 }}>{p.hint}</div></div>)}
			</div>
			<Cursor x={cur.x} y={cur.y} down={[0, 1, 2].some((i) => Math.abs(t - M.pick - i * 0.5) < 0.06)} />
		</AbsoluteFill>
	)
}
const OUTS = [COPY.raw, COPY.polish[1].out!, COPY.polish[2].out!]
const Cols: React.FC<{ t: number }> = ({ t }) => (
	<AbsoluteFill style={{ background: "#fff" }}>
		<Camera t={t} keys={[[M.x_cols, 1, 960, 540], [M.push, 1, 960, 540], [M.push + 1.6, 1.65, 1300, 520], [M.pull, 1.65, 1300, 520], [M.pull + 1.6, 1, 960, 540]]}>
			<div style={{ position: "absolute", left: 120, top: 110, fontFamily: CJK, fontSize: 26, color: "#151517" }}>{ASK}<span style={{ color: T3, fontSize: 19, marginLeft: 18 }}>同一段话 · 3 种润色</span></div>
			{COPY.polish.map((p, i) => {
				const t0 = M.x_cols + 0.6 + i * 0.4, s = typeAt(OUTS[i], t, t0 + 1.2, [30, 12, 9][i])
				const pick = i === 2 && t > M.pull + 1.2
				return <div key={p.id} style={{ position: "absolute", left: 120 + i * 570, top: 190, width: 540, height: 720, borderRadius: 18, border: `${pick ? 2 : 1}px solid ${pick ? "#111" : "#e3e3e6"}`, padding: 30, fontFamily: CJK }}>
					<div style={{ display: "flex", alignItems: "center", gap: 12 }}><div style={{ fontSize: 22, fontWeight: 700, color: "#151517" }}>{p.label}</div><div style={{ fontSize: 16, color: T3 }}>{p.hint}</div></div>
					<div style={{ fontSize: 15, color: s.done ? "#2c9c6a" : T3, marginTop: 10 }}>{t < t0 + 1.2 ? "正在听写…" : s.done ? "已写好" : "润色中…"}</div>
					<div style={{ fontSize: 25, lineHeight: 1.75, color: "#25262a", marginTop: 26 }}>{s.s}</div>
					{s.done && <div style={{ position: "absolute", left: 30, bottom: 26, display: "flex", gap: 10, fontSize: 17, color: "#55565b" }}><span style={{ background: "#f2f2f4", padding: "6px 12px", borderRadius: 8 }}>复制</span><span style={{ background: pick ? "#111" : "#f2f2f4", color: pick ? "#fff" : "#55565b", padding: "6px 12px", borderRadius: 8 }}>插入到飞书</span></div>}
				</div>
			})}
		</Camera>
	</AbsoluteFill>
)

// ---------- review: what was removed and what was kept
const DIFF: [string, "" | "d" | "a"][] = [["嗯，", "d"], ["我觉得这个方案", ""], ["吧，这个方案", "d"], ["可以先", ""], ["，先", "d"], ["做一个小范围", ""], ["的", "d"], ["测试", ""], ["，然后然后看看反馈，不对，是先", "d"], ["，收集", ""], ["一下", "d"], ["反馈", ""], ["后", "a"], ["，再决定要不要", ""], ["，就是要不要", "d"], ["全部上线。", ""]]
const Diff: React.FC<{ t: number; t0: number; w?: number }> = ({ t, t0, w = 1100 }) => {
	let k = 0
	return (
		<div style={{ width: w, fontFamily: CJK }}>
			<div style={{ fontSize: 20, color: T3 }}>改动 · 删去口头语和重复，补一个字</div>
			<div style={{ fontSize: 34, lineHeight: 1.9, color: "#25262a", marginTop: 20 }}>
				{DIFF.map(([s, kind], i) => {
					const on = kind && t > t0 + (k++) * 0.22
					return <span key={i} style={on ? { background: kind === "d" ? "rgba(232,84,60,.14)" : "rgba(44,156,106,.16)", color: kind === "d" ? "#c0392b" : "#1f7a52", textDecoration: kind === "d" ? "line-through" : undefined, borderRadius: 4 } : { color: kind === "a" ? "transparent" : undefined }}>{s}</span>
				})}
			</div>
			<div style={{ marginTop: 34, paddingTop: 26, borderTop: `1px solid ${LINE}`, fontSize: 34, lineHeight: 1.7, color: "#151517", opacity: clamp01((t - t0 - 2.4) / 0.4) }}>{COPY.polish[1].out}</div>
		</div>
	)
}
const Review: React.FC<{ t: number }> = ({ t }) => (
	<AbsoluteFill style={{ background: "#fff" }}><Camera t={t} keys={[[M.x_review, 1.08, 960, 520], [M.x_revwin, 1.0, 960, 520]]}><div style={{ position: "absolute", left: 410, top: 260 }}><Diff t={t} t0={M.x_review + 0.5} /></div></Camera></AbsoluteFill>
)
const RevWin: React.FC<{ t: number }> = ({ t }) => (
	<AbsoluteFill><Wall /><Camera t={t} keys={[[M.x_revwin, 0.92, 960, 540], [C[3], 1.25, 1000, 460]]}><AppWin sel={0}><div style={{ position: "absolute", left: 60, top: 70 }}><Diff t={t} t0={-10} w={1050} /></div></AppWin></Camera></AbsoluteFill>
)

// ---------- meeting notes window (webcam tile is a licensed stock clip)
const Meet: React.FC<{ t: number; close?: boolean }> = ({ t, close }) => {
	const keys: CamKey[] = t < C[5] ? [[0, 1, 960, 540]] : t < C[6] ? [[0, 2.0, 900, 420]] : close ? [[M.x_close, 1.45, 1515, 560], [C[7], 1.6, 1515, 600]] : [[C[6], 1.02, 960, 540], [M.todo, 1.08, 1000, 540], [M.x_close, 1.3, 1300, 540]]
	const lines = COPY.meeting.filter((_, i) => t > M.meet + 0.3 + i * 1.6)
	return (
		<AbsoluteFill><Wall />
			<Camera t={t} keys={keys}>
				<div style={{ position: "absolute", left: 160, top: 90 }}><Win w={1600} h={900} title="MosMos · 会议记录">
					<div style={{ position: "absolute", left: 40, top: 36, width: 520, height: 292, borderRadius: 14, overflow: "hidden", background: "#000" }}>
						<Sequence from={Math.round(M.meet * FPS)} layout="none"><Loop durationInFrames={Math.round(3.5 * FPS)} layout="none"><OffthreadVideo src={staticFile("t15-talk.mp4")} muted style={{ width: 520, height: 292, objectFit: "cover" }} /></Loop></Sequence>
						<div style={{ position: "absolute", left: 12, bottom: 10, background: "rgba(0,0,0,.55)", color: "#fff", fontSize: 16, padding: "4px 10px", borderRadius: 6, fontFamily: CJK }}>说话人 1</div>
					</div>
					<div style={{ position: "absolute", left: 40, top: 356, width: 520, fontFamily: CJK }}>
						<div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 18, color: "#151517" }}><div style={{ width: 10, height: 10, borderRadius: 99, background: "#e8541f", opacity: 0.5 + 0.5 * Math.sin(t * 6) }} />正在记录 · Fn + Shift<Wave t={t} live n={9} h={22} color="#111" /></div>
						<div style={{ fontSize: 15, color: T3, marginTop: 10 }}>3 位发言人 · 首页改版周会</div>
					</div>
					<div style={{ position: "absolute", left: 600, top: 36, width: 520, fontFamily: CJK }}>
						<div style={{ fontSize: 15, color: T3 }}>逐字稿</div>
						{lines.map(([who, tm, s], i) => <div key={i} style={{ marginTop: 22, opacity: clamp01((t - M.meet - 0.3 - i * 1.6) / 0.3) }}><div style={{ fontSize: 15, color: T3 }}>{who} · {tm}</div><div style={{ fontSize: 23, lineHeight: 1.6, color: "#25262a", marginTop: 4 }}>{s}</div></div>)}
					</div>
					<div style={{ position: "absolute", left: 1150, top: 36, width: 410, height: 760, borderRadius: 16, background: "#f7f7f8", padding: 26, fontFamily: CJK }}>
						<div style={{ fontSize: 22, fontWeight: 700, color: "#151517" }}>会议总结</div>
						<div style={{ fontSize: 17, color: "#55565b", lineHeight: 1.7, marginTop: 12, opacity: clamp01((t - M.todo + 1.5) / 0.4) }}>交互稿周三前完成，品牌素材今天下午同步，素材到位后周四开始视觉方案。</div>
						<div style={{ fontSize: 15, color: T3, marginTop: 24 }}>待办</div>
						{COPY.todos.map((d, i) => { const on = t > M.todo + i * 0.7; return <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 14, fontSize: 19, color: "#151517", opacity: on ? 1 : 0.15 }}><div style={{ width: 20, height: 20, borderRadius: 5, border: "2px solid #111", background: on ? "#111" : "#fff", color: "#fff", fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center" }}>{on ? "✓" : ""}</div>{d}</div> })}
						<div style={{ position: "absolute", left: 26, right: 26, bottom: 26, height: 56, borderRadius: 12, background: t > 59.6 ? "#2c9c6a" : "#111", color: "#fff", fontSize: 19, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${Math.abs(t - 59.5) < 0.08 ? 0.96 : 1})` }}>{t > 59.6 ? "已发到项目群" : "发到项目群"}</div>
					</div>
				</Win></div>
				{close && <Cursor x={lerp(t, M.x_close + 0.5, 59.4, 1600, 1460)} y={lerp(t, M.x_close + 0.5, 59.4, 1000, 920)} down={Math.abs(t - 59.5) < 0.08} />}
			</Camera>
		</AbsoluteFill>
	)
}

const End: React.FC<{ t: number }> = ({ t }) => (
	<AbsoluteFill style={{ background: "#000", alignItems: "center", justifyContent: "center" }}>
		<div style={{ display: "flex", alignItems: "center", gap: 30 }}>
			<div style={{ transform: `perspective(700px) rotateY(${lerp(t, M.end, M.end + 1.0, -90, 0)}deg) scale(${lerp(t, M.end, M.mark, 1.5, 1, inOut)})` }}><LogoPixels size={110} t={t} mode="static" invert /></div>
			{t > M.mark && <div style={{ opacity: clamp01((t - M.mark) / 0.25) }}><Wordmark size={80} color="#fff" /></div>}
		</div>
	</AbsoluteFill>
)

type Sc = [number, number, (t: number) => React.ReactNode]
const SCENES: Sc[] = [
	[0, 0, (t) => <Logo t={t} />],
	[2.45, 0.12, (t) => <TypeCard t={t} t0={M.ty1} lines={["认识 MosMos，", "一个替你写好的输入法。"]} />],
	[M.x_chart, 0.35, (t) => <Chart t={t} />],
	[C[0], 0, (t) => <TypeCard t={t} t0={M.ty2} lines={["说一次，写进每个应用。"]} />],
	[C[1], 0, (t) => <Desk t={t} />],
	[M.x_input, 0.4, (t) => <Typing t={t} />],
	[M.x_card3, 0.3, (t) => <TypeCard t={t} t0={M.ty3} lines={["同一句话，三种写法。"]} />],
	[M.x_drop, 0.3, (t) => <Drop t={t} />],
	[M.x_cols, 0.35, (t) => <Cols t={t} />],
	[C[2], 0, (t) => <TypeCard t={t} t0={M.ty4} lines={["改了什么，一眼看清。"]} />],
	[M.x_review, 0.35, (t) => <Review t={t} />],
	[M.x_revwin, 0.4, (t) => <RevWin t={t} />],
	[C[3], 0, (t) => <TypeCard t={t} t0={M.ty5} lines={["开会时，它也在记。"]} />],
	[C[4], 0, (t) => <Meet t={t} />],
	[M.x_close, 0.4, (t) => <Meet t={t} close />],
	[C[7], 0, (t) => <End t={t} />],
]
export const Film: React.FC = () => {
	const t = useT()
	const out: React.ReactNode[] = []
	SCENES.forEach(([a, fi, el], i) => {
		const nx = SCENES[i + 1]
		if (t < a || (nx && t >= nx[0] + nx[1])) return
		out.push(<AbsoluteFill key={i} style={{ opacity: fi ? clamp01((t - a) / fi) : 1 }}>{el(t)}</AbsoluteFill>)
	})
	return <AbsoluteFill style={{ background: BG }}>{out}</AbsoluteFill>
}
