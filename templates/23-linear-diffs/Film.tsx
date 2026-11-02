// Template 23 — structure of Linear "Introducing Linear Diffs" (2026), MosMos content.
// A dark app on a tilted plane with a sliding depth-of-field band. The diff is MosMos's 对比 view: the raw
// spoken words (red, removed) against the polished text (green, added), a 确认润色 button, and an inline
// voice comment that edits one line.
import React from "react"
import { AbsoluteFill } from "remotion"
import { CJK, HEAVY, SANS, MONO, lerp, clamp01, inOut, typeAt, useT, Wave, LogoPixels } from "../_engine/src/mos"
import { DOF, track } from "../_engine/src/kit"
import TL from "./timeline.json"

const M = TL.marks as Record<string, number>, C = TL.cuts
const BG = "#060708", P1 = "#0e0f11", P2 = "#141518", LN = "#1f2024", TX = "#d9dadd", DIM = "#6c6e73"
const RED = "rgba(214,72,72,.22)", REDT = "#e08a8a", GRN = "rgba(60,170,100,.2)", GRNT = "#7fd39a", VIO = "#5b5bd6"

type K = [number, number, number, number, number, number, number] // t, x, y, rx, rz, s, focus%
const Plane: React.FC<{ t: number; keys: K[]; w?: number; h?: number; angle?: number; blur?: number; children: React.ReactNode }> = ({ t, keys, w = 1800, h = 1100, angle = 160, blur = 5, children }) => {
	const g = (i: number) => track(t, keys.map((k) => [k[0], k[i]] as [number, number]), inOut)
	const tf = `translate(${g(1)}px, ${g(2)}px) perspective(1700px) rotateX(${g(3)}deg) rotateZ(${g(4)}deg) scale(${g(5)})`
	return (
		<AbsoluteFill style={{ background: BG }}>
			<DOF tf={tf} angle={angle} focus={g(6)} band={16} blur={blur} left={960 - w / 2} top={540 - h / 2} origin="50% 50%">
				<div style={{ width: w, height: h, background: P1, borderRadius: 26, boxShadow: `0 0 0 1px ${LN}`, position: "relative", overflow: "hidden", fontFamily: CJK, color: TX }}>{children}</div>
			</DOF>
			<AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,.75) 100%)" }} />
		</AbsoluteFill>
	)
}
const Side: React.FC<{ t: number }> = ({ t }) => (
	<div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 420, borderRight: `1px solid ${LN}`, padding: "40px 30px", fontSize: 34 }}>
		<div style={{ display: "flex", gap: 12, marginBottom: 40 }}>{["#e5534b", "#e5a93b", "#4fa36b"].map((c) => <div key={c} style={{ width: 18, height: 18, borderRadius: 9, background: c }} />)}</div>
		<div style={{ fontWeight: 600, marginBottom: 30 }}>MosMos ▾</div>
		{["收件箱", "我的输入", "对比"].map((x, i) => <div key={x} style={{ color: "#c4c6ca", padding: "14px 16px", borderRadius: 12, background: i === 2 && t > M.pick ? "#1d1e22" : "transparent" }}>{x}</div>)}
		<div style={{ color: DIM, fontSize: 26, marginTop: 40 }}>场景 ▾</div>
		{["飞书 / 微信", "邮件", "文档"].map((x) => <div key={x} style={{ color: DIM, padding: "12px 16px", fontSize: 30 }}>{x}</div>)}
	</div>
)
const LIST = [["MM-880", "李经理的邮件", "+6 −9"], ["MM-881", "飞书回复：素材进度", "+2 −4"], ["MM-882", "首页改版周会纪要", "+8 −14"], ["MM-883", "群公告：周四启动", "+3 −2"], ["MM-884", "待办整理", "+4 −5"], ["MM-885", "给周舟的回复", "+1 −3"]]
const List: React.FC<{ t: number }> = ({ t }) => (
	<div style={{ position: "absolute", left: 460, top: 60, width: 1300 }}>
		<div style={{ fontSize: 26, color: DIM, marginBottom: 20 }}>待确认的润色 · 6</div>
		{LIST.map((r, i) => <div key={i} style={{ display: "flex", alignItems: "center", gap: 26, height: 82, borderBottom: `1px solid ${LN}`, fontSize: 30, opacity: clamp01((t - M.list - i * 0.12) / 0.3), background: i === 2 ? "#15161a" : undefined }}>
			<span style={{ fontFamily: MONO, color: DIM, fontSize: 24, width: 130 }}>{r[0]}</span><span style={{ flex: 1 }}>{r[1]}</span><span style={{ fontFamily: MONO, fontSize: 24, color: GRNT }}>{r[2].split(" ")[0]}</span><span style={{ fontFamily: MONO, fontSize: 24, color: REDT }}>{r[2].split(" ")[1]}</span></div>)}
	</div>
)
// unified diff: raw speech (−) vs polished (+)
const DIFF: [string, string][] = [[" ", "首页改版周会 · 纪要"], [" ", ""], ["-", "嗯，那个，交互稿的话，我们就是周三之前，嗯，给出来吧。"], ["+", "交互稿周三前完成。"],
	["-", "然后素材那边，那个，今天下午，对，今天下午同步一下。"], ["+", "品牌素材今天下午同步。"], [" ", ""], [" ", "待办"],
	["-", "视觉的话就是，等素材到了再说，大概周四吧。"], ["+", "素材到位后，周四启动视觉设计。"], ["-", "林清和负责文案"], ["+", "林清禾负责首页文案终稿。"],
	[" ", ""], ["-", "还有那个上线清单，谁有空谁弄一下。"], ["+", "上线检查清单由小林整理。"], [" ", ""], [" ", "下次周会：下周一 10:00"]]
const Diff: React.FC<{ t: number; size?: number; rows?: [string, string][]; from?: number; edit?: number }> = ({ t, size = 30, rows = DIFF, from = 40, edit }) => (
	<div style={{ fontSize: size }}>
		{rows.map(([k, s], i) => {
			const ed = edit !== undefined && i === 5 && t > edit
			return <div key={i} style={{ display: "flex", height: size * 1.9, alignItems: "center", background: k === "-" ? RED : k === "+" ? GRN : "transparent", color: k === "-" ? REDT : k === "+" ? GRNT : TX }}>
				<span style={{ fontFamily: MONO, width: size * 2.6, textAlign: "right", color: DIM, fontSize: size * 0.75, paddingRight: size * 0.6 }}>{from + i}</span>
				<span style={{ fontFamily: MONO, width: size * 1.1, color: DIM }}>{k === " " ? "" : k}</span>
				<span style={{ whiteSpace: "nowrap" }}>{ed ? "素材今天下午同步。" : s}</span></div>
		})}
	</div>
)
const Tabs: React.FC<{ t: number }> = ({ t }) => (
	<div style={{ position: "absolute", left: 330, top: 260 }}>
		<div style={{ display: "flex", alignItems: "center", gap: 26, fontSize: 64, fontWeight: 600 }}><div style={{ width: 50, height: 50, borderRadius: 25, border: "6px solid #4fa36b" }} /><span style={{ fontFamily: MONO }}>MM-882</span><span style={{ color: DIM }}>›</span><span style={{ color: "#4fa36b" }}>⇄</span><span>首页改版周会纪要</span></div>
		<div style={{ display: "flex", gap: 22, marginTop: 70 }}>{["原话", "润色", "对比"].map((x, i) => { const on = t > M.tab ? i === 2 : i === 1; return <div key={x} style={{ fontSize: 50, padding: "18px 44px", borderRadius: 60, background: on ? "#26272c" : "#141518", boxShadow: `0 0 0 2px ${on ? "#3a3c42" : LN}`, color: on ? "#fff" : "#a9abaf", transform: `scale(${i === 2 && t > M.tab - 0.1 && t < M.tab + 0.1 ? 0.95 : 1})` }}>{x}</div> })}</div>
	</div>
)
const Split: React.FC<{ t: number }> = ({ t }) => (
	<>
		<div style={{ position: "absolute", left: 0, top: 0, right: 0, height: 70, borderBottom: `1px solid ${LN}`, display: "flex", alignItems: "center", gap: 18, padding: "0 30px", fontSize: 22, color: DIM }}><span style={{ fontFamily: MONO }}>MM-882</span>首页改版周会纪要<span style={{ marginLeft: 30, color: TX }}>对比</span></div>
		<div style={{ position: "absolute", left: 30, top: 110, width: 640 }}>
			<div style={{ fontSize: 20, color: DIM }}>润色说明</div>
			<div style={{ fontSize: 36, fontWeight: 600, marginTop: 10 }}>周会纪要 · 标准润色</div>
			<div style={{ fontSize: 24, color: "#aeb0b4", lineHeight: 1.6, marginTop: 16 }}>去掉口头禅和重复的话，热词按词库写法统一，每条待办写明负责人和时间。</div>
			<div style={{ marginTop: 34 }}>{LIST.slice(0, 5).map((r, i) => <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, height: 60, borderTop: `1px solid ${LN}`, fontSize: 22, background: i === 2 ? "#17181c" : undefined }}><span style={{ color: "#4fa36b" }}>●</span><span style={{ flex: 1 }}>{r[1]}</span><span style={{ fontFamily: MONO, color: GRNT }}>{r[2].split(" ")[0]}</span><span style={{ fontFamily: MONO, color: REDT }}>{r[2].split(" ")[1]}</span></div>)}</div>
		</div>
		<div style={{ position: "absolute", left: 700, top: 90, right: 20, bottom: 0, background: "#0b0c0e", borderLeft: `1px solid ${LN}`, overflow: "hidden" }}>
			<div style={{ transform: `translateY(${lerp(t, C[2], C[3], 0, -260, inOut)}px)`, paddingTop: 20 }}><Diff t={t} size={26} /></div>
		</div>
	</>
)
const Btns: React.FC<{ t: number; s?: number }> = ({ t, s = 1 }) => {
	const pr = t > M.press - 0.08 && t < M.press + 0.12
	return <div style={{ display: "flex", gap: 20 * s, alignItems: "center", fontSize: 30 * s }}>
		<div style={{ padding: `${14 * s}px ${30 * s}px`, borderRadius: 40, boxShadow: `0 0 0 1px ${LN}`, background: P2 }}>✓ 采用</div>
		<div style={{ padding: `${14 * s}px ${34 * s}px`, borderRadius: 40, background: VIO, color: "#fff", transform: `scale(${pr ? 0.94 : 1})`, boxShadow: "0 0 40px rgba(91,91,214,.35)" }}>{t > M.press + 0.12 ? "已确认 ✓" : "确认润色"}</div>
	</div>
}
const Comment: React.FC<{ t: number }> = ({ t }) => {
	const s = typeAt("把这句的「品牌」去掉，就叫素材", t, M.say, 5.5).s
	return (
		<div style={{ position: "absolute", left: 360, top: 300, width: 1050 }}>
			<div style={{ borderRadius: 26, background: P2, boxShadow: `0 0 0 1px ${LN}, 0 30px 80px rgba(0,0,0,.6)`, padding: "30px 34px" }}>
				<div style={{ fontSize: 34, lineHeight: 1.6 }}>
					<span style={{ fontFamily: MONO, fontSize: 26, background: "#22232a", padding: "4px 12px", borderRadius: 8, color: "#b9bbc0" }}>周会纪要 · 第 45 行</span>{" "}
					{t < M.sent ? s : "把这句的「品牌」去掉，就叫素材"}{t < M.sent && <span style={{ color: "#888" }}>|</span>}</div>
				{t > M.reply && <div style={{ fontSize: 28, color: "#a9abaf", marginTop: 22, lineHeight: 1.6, opacity: clamp01((t - M.reply) / 0.4) }}>改好了：第 45 行写成「素材今天下午同步。」，其他行不变。</div>}
				<div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 18, marginTop: 20 }}><Wave t={t} live={t > M.say - 0.3 && t < M.sent} n={8} h={24} color="#c9cacd" /><div style={{ width: 52, height: 52, borderRadius: 26, background: VIO, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>↑</div></div>
			</div>
		</div>
	)
}

export const Film: React.FC = () => {
	const t = useT()
	if (t < C[0]) {
		if (t < M.list) return <Plane t={t} keys={[[0, 1150, 500, 22, -14, 1.7, 30], [M.list, 1000, 380, 24, -16, 1.75, 40]]}><Side t={t} /></Plane>
		return <Plane t={t} keys={[[M.list, 240, 120, 30, -20, 1.25, 36], [C[0], 80, -40, 32, -22, 1.35, 52]]}><Side t={99} /><List t={t} /></Plane>
	}
	if (t < C[1]) return <Plane t={t} keys={[[C[0], -60, 260, 34, -20, 1.45, 35], [C[1], 20, -120, 34, -18, 1.55, 58]]}><div style={{ position: "absolute", left: 60, top: lerp(t, C[0], C[1], 300, 40, inOut) }}><Diff t={t} size={34} /></div></Plane>
	if (t < C[2]) return <Plane t={t} keys={[[C[1], -40, 60, 28, -14, 1.3, 40], [C[2], 30, 30, 26, -12, 1.4, 48]]} blur={7}><Tabs t={t} /></Plane>
	if (t < C[3]) {
		const k: K[] = t < M.wide ? [[C[2], 140, 40, 14, -6, 1.5, 45], [M.red, 0, 60, 16, -8, 1.65, 55], [M.wide, -140, 80, 18, -8, 1.7, 60]] : [[M.wide, 0, 0, 20, -10, 1.0, 45], [C[3], 40, -40, 22, -12, 1.1, 55]]
		return <Plane t={t} keys={k} angle={110}><Split t={t} /></Plane>
	}
	if (t < C[4]) return <Plane t={t} keys={[[C[3], 120, 40, 24, -16, 1.6, 45], [C[4], 60, 20, 22, -14, 1.7, 50]]} blur={7}>
		<div style={{ position: "absolute", left: 600, top: 380, display: "flex", alignItems: "center", gap: 40 }}><Btns t={t + (M.press - C[3] - 1.0) * (t > C[3] + 0.9 ? 1 : 0)} s={2} /><div style={{ fontSize: 60, color: DIM }}>➤</div></div>
		<div style={{ position: "absolute", left: 1120, top: 200, fontSize: 50, color: "#a9abaf", display: "flex", gap: 40 }}><span>⇄</span><span>⋯</span></div>
	</Plane>
	if (t < C[5]) return <Plane t={t} keys={[[C[4], -80, 100, 30, -16, 1.6, 38], [C[5], 0, 0, 28, -14, 1.7, 54]]}><div style={{ position: "absolute", left: 40, top: lerp(t, C[4], C[5], 60, -60, inOut) }}><Diff t={t} size={36} />{t > M.hover && <div style={{ position: "absolute", left: 130, top: 4 * 68 + 10, width: 46, height: 46, borderRadius: 10, background: VIO, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30 }}>＋</div>}</div></Plane>
	if (t < C[6]) return <Plane t={t} keys={[[C[5], 40, 120, 20, -10, 1.7, 45], [C[6], 0, 80, 18, -8, 1.8, 50]]}><div style={{ position: "absolute", left: 40, top: 60, opacity: 0.5 }}><Diff t={t} size={30} /></div><Comment t={t} /></Plane>
	if (t < M.end) return <><Plane t={t} keys={[[C[6], 0, 60, 26, -12, 1.4, 42], [M.end, 40, 0, 24, -10, 1.5, 55]]}><div style={{ position: "absolute", left: 60, top: -40 }}><Diff t={t} size={34} edit={C[6]} /></div><div style={{ position: "absolute", left: 420, top: 640, padding: 20, borderRadius: 50, background: "rgba(14,15,17,.9)", boxShadow: `0 0 0 1px ${LN}` }}><Btns t={t} s={1.2} /></div></Plane><AbsoluteFill style={{ background: "#000", opacity: clamp01((t - M.end + 0.32) / 0.3) }} /></>
	if (t < M.logo) {
		const op = Math.pow(clamp01((t - M.end - 0.05) / 1.2), 1.6) * clamp01((M.logo - 0.15 - t) / 0.5)
		return <AbsoluteFill style={{ background: "#000", alignItems: "center", justifyContent: "center" }}><div style={{ fontFamily: SANS, fontWeight: 500, fontSize: 92, color: "#e8e8ea", opacity: op }}>看清每一处改动</div></AbsoluteFill>
	}
	return <AbsoluteFill style={{ background: "#000", alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 36 }}>
		<div style={{ opacity: clamp01((t - M.logo) / 0.3) }}><LogoPixels size={104} t={t} mode="in" t0={M.logo} invert /></div>
		<div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 100, color: "#fff", opacity: clamp01((t - M.logo - 0.3) / 0.4) * clamp01((TL.dur - t) / 0.6) }}>MosMos</div>
	</AbsoluteFill>
}
