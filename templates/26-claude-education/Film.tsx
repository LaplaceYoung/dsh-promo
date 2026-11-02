// Template 26 — structure of Anthropic "Introducing Claude for Education" (2025), MosMos content.
// Warm stage; one box morphs from a small card into a two-step dialog (name the meeting, drag in its hot
// words), then into a window where a suggestion button writes the meeting summary, a document panel opens on
// the right, and the window folds back into the card.
import React from "react"
import { AbsoluteFill } from "remotion"
import { CJK, lerp, clamp01, inOut, typeAt, useT, LogoPixels, Cursor, path, Wave } from "../_engine/src/mos"
import { Camera, CamKey } from "../_engine/src/kit"
import TL from "./timeline.json"

const M = TL.marks as Record<string, number>, C = TL.cuts
const BG = "#e3d9c6", BOX = "#faf8f3", INKC = "#2a2723", DIM = "#8a857c", LN = "#e6e0d4", ORG = "#c96a43", BLUE = "#d8e8f8"
const SERIF = "'Noto Serif CJK SC', serif"

function rect(t: number): [number, number] {
	const card: [number, number] = [620, 150], dlg: [number, number] = [1000, 470], win: [number, number] = [1640, 930]
	const mix = (a: [number, number], b: [number, number], p: number): [number, number] => [lerp(p, 0, 1, a[0], b[0], (x) => x), lerp(p, 0, 1, a[1], b[1], (x) => x)]
	if (t < M.open) return card
	if (t < M.page) return mix(card, dlg, inOut(clamp01((t - M.open) / 0.45)))
	if (t < M.close) return mix(dlg, win, inOut(clamp01((t - M.page) / 0.6)))
	return mix(win, card, inOut(clamp01((t - M.close) / 0.7)))
}
const Btn: React.FC<{ dark?: boolean; children: React.ReactNode; press?: boolean }> = ({ dark, children, press }) => <div style={{ padding: "10px 20px", borderRadius: 10, fontSize: 19, background: dark ? INKC : "transparent", color: dark ? "#fff" : INKC, transform: `scale(${press ? 0.93 : 1})` }}>{children}</div>
const Field: React.FC<{ children: React.ReactNode; w?: number }> = ({ children, w = 720 }) => <div style={{ width: w, borderRadius: 12, background: "#fff", boxShadow: `0 0 0 1px ${LN}`, padding: "14px 18px", fontSize: 22 }}>{children}</div>
const WORDS: [string, string][] = [["人名", "林清禾"], ["项目", "Nimbus"], ["工具", "Figma"]]
const Word: React.FC<{ w: [string, string]; s?: number }> = ({ w, s = 1 }) => <div style={{ width: 170 * s, borderRadius: 12, background: "#fff", boxShadow: `0 0 0 1px ${LN}, 0 6px 16px rgba(80,60,20,.08)`, padding: `${12 * s}px ${14 * s}px`, fontFamily: CJK }}><div style={{ fontSize: 14 * s, color: DIM }}>{w[0]}</div><div style={{ fontSize: 22 * s, fontWeight: 600, color: INKC }}>{w[1]}</div></div>
const PROMPT = "把这场会整理成总结，列出待办和负责人。"
const REPLY = "好的。这是首页改版周会的总结：交付计划不变，按素材、交互、视觉的顺序推进。3 条待办和负责人已经列在右边的文档里。"
const DOC: [string, string[]][] = [["会议背景", ["首页改版第二周，3 位说话人，32 分钟。"]], ["关键结论", ["首页交付计划保持不变。", "按素材、交互、视觉的顺序推进。"]], ["待办", ["今天下午同步品牌素材 · 周舟", "周三前提交交互稿 · 林清禾", "周四启动视觉设计 · 小林"]], ["整理时处理了", ["去掉口头禅和重复的话", "人名、项目名按热词写法"]]]

const Content: React.FC<{ t: number; w: number; h: number }> = ({ t, w, h }) => {
	if (t < M.open + 0.2 || t > M.close + 0.4) return (
		<div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", padding: "0 36px", gap: 20, opacity: t > M.close ? clamp01((t - M.back + 0.3) / 0.3) : 1 }}>
			<div style={{ flex: 1 }}><div style={{ fontSize: 26, fontWeight: 600 }}>会议记录</div><div style={{ fontSize: 19, color: DIM, marginTop: 4 }}>记下整场会，自动出总结和待办</div></div>
			<div style={{ width: 66, height: 66, borderRadius: 33, boxShadow: `0 0 0 2px ${INKC}`, display: "flex", alignItems: "center", justifyContent: "center" }}><Wave t={t} n={4} h={26} color={INKC} /></div>
		</div>)
	if (t < M.page) {
		const o = clamp01((t - M.open - 0.3) / 0.3)
		if (t < M.step2) return (
			<div style={{ position: "absolute", inset: 0, padding: "40px 46px", opacity: o }}>
				<div style={{ display: "flex", justifyContent: "space-between" }}><div style={{ fontSize: 34, fontFamily: SERIF }}>新建会议记录</div><div style={{ fontSize: 18, color: DIM }}>第 1 步，共 2 步</div></div>
				<div style={{ fontSize: 20, marginTop: 34, fontWeight: 600 }}>这场会叫什么？</div>
				<div style={{ marginTop: 12 }}><Field w={908}><span style={{ color: t > M.type ? INKC : "#aaa398" }}>{t > M.type ? typeAt("首页改版周会", t, M.type, 4.5).s : "会议名称"}</span>{t > M.focus && t < M.create && <span style={{ color: "#999" }}>|</span>}</Field></div>
				<div style={{ position: "absolute", right: 46, bottom: 40, display: "flex", gap: 10 }}><Btn>取消</Btn><Btn dark press={t > M.create - 0.05 && t < M.create + 0.12}>创建</Btn></div>
			</div>)
		const over = t > M.over && t < C[0]
		return (
			<div style={{ position: "absolute", inset: 0, padding: "40px 46px", opacity: clamp01((t - M.step2) / 0.3) }}>
				<div style={{ display: "flex", justifyContent: "space-between" }}><div style={{ fontSize: 34, fontFamily: SERIF }}>添加这场会的热词</div><div style={{ fontSize: 18, color: DIM }}>第 2 步，共 2 步</div></div>
				<div style={{ marginTop: 26, height: 250, borderRadius: 14, border: `2px ${t < C[0] ? "dashed" : "solid"} ${over ? "#7fb0e0" : LN}`, background: over ? BLUE : "#fff", display: "flex", alignItems: "center", justifyContent: "center", gap: 20 }}>
					{t < C[0] ? <div style={{ textAlign: "center", color: over ? "#3a6ea5" : DIM, fontSize: 20, lineHeight: 1.7 }}>{over ? "松开，加入热词" : <>把人名、项目名拖到这里<br />加入后优先识别，润色时保持原样</>}</div>
						: WORDS.map((w, i) => <div key={w[1]} style={{ opacity: clamp01((t - M.words - i * 0.3) / 0.25) }}><Word w={w} /></div>)}
				</div>
				<div style={{ position: "absolute", right: 46, bottom: 36 }}><Btn dark press={t > M.cont - 0.05 && t < M.cont + 0.12}>继续</Btn></div>
			</div>)
	}
	const chat = t > M.chat, panel = clamp01((t - M.panel) / 0.5)
	const o = clamp01((t - M.page - 0.5) / 0.4)
	return (
		<div style={{ position: "absolute", inset: 0, opacity: t > M.close ? 1 - clamp01((t - M.close) / 0.3) : o }}>
			{!chat ? (
				<div style={{ position: "absolute", left: 70, top: 60, width: 960 }}>
					<div style={{ display: "flex", alignItems: "center", gap: 14 }}><div style={{ fontSize: 50, fontFamily: SERIF }}>首页改版周会</div><div style={{ fontSize: 17, color: DIM, border: `1px solid ${LN}`, borderRadius: 8, padding: "2px 10px" }}>仅自己可见</div></div>
					<div style={{ fontSize: 22, color: "#5c574f", marginTop: 14, lineHeight: 1.6 }}>已录 32 分钟 · 3 位说话人。逐字稿已经区分好说话人，可以整理成总结、待办，或者写成邮件。</div>
					<div style={{ marginTop: 34, borderRadius: 18, background: "#fff", boxShadow: `0 0 0 1px ${LN}, 0 8px 24px rgba(80,60,20,.06)`, padding: "22px 24px" }}>
						<div style={{ fontSize: 24, color: t > M.pick ? INKC : "#aaa398", minHeight: 70 }}>{t > M.pick ? PROMPT : "需要我写点什么？"}</div>
						<div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 14 }}><span style={{ fontSize: 17, color: DIM }}>标准润色 ▾</span><div style={{ width: 40, height: 40, borderRadius: 10, background: ORG, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${t > M.send - 0.05 && t < M.send + 0.12 ? 0.9 : 1})` }}>↑</div></div>
					</div>
					<div style={{ display: "flex", gap: 12, marginTop: 18 }}>{["会议总结", "待办", "写成邮件"].map((x, i) => <div key={x} style={{ fontSize: 19, borderRadius: 10, padding: "8px 16px", boxShadow: `0 0 0 1px ${LN}`, background: i === 0 && t > M.pick - 0.1 && t < M.pick + 0.6 ? "#ebe4d6" : "#fff" }}>{x}</div>)}</div>
				</div>
			) : (
				<div style={{ position: "absolute", left: 70, top: 50, width: 700 * (1 - panel) + 640 * panel + (1 - panel) * 260, fontSize: 22, lineHeight: 1.7 }}>
					<div style={{ display: "inline-block", background: "#efeadf", borderRadius: 14, padding: "12px 18px" }}>{PROMPT}</div>
					<div style={{ marginTop: 22 }}>{REPLY.slice(0, Math.floor(clamp01((t - M.reply) / 2.6) * REPLY.length))}</div>
					{t > M.reply + 2.8 && <div style={{ marginTop: 18, display: "inline-flex", gap: 12, alignItems: "center", borderRadius: 12, boxShadow: `0 0 0 1px ${LN}`, background: "#fff", padding: "10px 16px", fontSize: 19 }}>▤ 首页改版周会 · 会议总结 <span style={{ color: DIM }}>文档</span></div>}
					<div style={{ position: "absolute", top: 760, width: 640, borderRadius: 16, background: "#fff", boxShadow: `0 0 0 1px ${LN}`, padding: "14px 18px", color: "#aaa398", fontSize: 20 }}>回复…</div>
				</div>
			)}
			{!chat && <div style={{ position: "absolute", right: 60, top: 60, width: 460, borderRadius: 16, boxShadow: `0 0 0 1px ${LN}`, background: "#fff", padding: 22 }}>
				<div style={{ fontSize: 20, fontWeight: 600 }}>这场会的热词</div>
				<div style={{ display: "flex", gap: 10, marginTop: 14 }}>{WORDS.map((w) => <Word key={w[1]} w={w} s={0.8} />)}</div>
				<div style={{ fontSize: 20, fontWeight: 600, marginTop: 24 }}>逐字稿</div>
				{["说话人 1 · 10:03", "说话人 2 · 10:05", "说话人 3 · 10:07"].map((x) => <div key={x} style={{ fontSize: 18, color: DIM, padding: "8px 0", borderTop: `1px solid ${LN}` }}>{x}</div>)}
			</div>}
			{chat && panel > 0 && <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 880 * panel, background: "#fff", borderLeft: `1px solid ${LN}`, overflow: "hidden" }}>
				<div style={{ width: 880, padding: "46px 50px" }}>
					<div style={{ fontSize: 34, fontWeight: 700, fontFamily: SERIF }}>首页改版周会 · 会议总结</div>
					{(() => { let n = Math.floor(clamp01((t - M.doc) / 4.6) * 14); return DOC.map(([hd, ls]) => { const show = n > 0; n -= 1; return <div key={hd} style={{ marginTop: 22, opacity: show ? 1 : 0 }}><div style={{ fontSize: 23, fontWeight: 700 }}>{hd}</div>{ls.map((l) => { const s2 = n > 0; n -= 1; return <div key={l} style={{ fontSize: 21, lineHeight: 1.7, color: "#3d3933", opacity: s2 ? 1 : 0 }}>· {l}</div> })}</div> }) })()}
				</div>
			</div>}
		</div>
	)
}

export const Film: React.FC = () => {
	const t = useT()
	const [w, h] = rect(t)
	const cur = path(t, [[0, 1300, 900], [0.6, 1300, 900], [M.click1 - 0.1, 1160, 560], [M.open + 0.4, 1160, 560], [M.focus - 0.1, 700, 470], [M.type + 1.6, 720, 480], [M.create - 0.15, 1350, 720], [M.step2 + 0.4, 1350, 720],
		[M.drag, 1560, 520], [M.over + 0.4, 1000, 520], [C[0] + 0.3, 1000, 540], [M.cont - 0.15, 1380, 735], [M.page + 0.3, 1380, 735], [M.pick - 0.2, 250, 503], [M.send - 0.15, 1118, 428], [M.chat + 0.5, 1300, 700]])
	const down = [M.click1, M.focus, M.create, M.cont, M.pick, M.send].some((c) => t > c - 0.05 && t < c + 0.12) || (t > M.drag && t < C[0])
	const k: CamKey[] = [[0, 1, 960, 540], [M.zoom, 1, 960, 540], [M.zoom + 1.0, 1.25, 820, 470], [M.chat, 1.25, 820, 470], [M.chat + 0.6, 1, 960, 540], [M.panel + 1.2, 1.05, 1100, 520], [M.close, 1.05, 1100, 520], [M.close + 0.5, 1, 960, 540]]
	const dragOn = t > M.drag - 0.2 && t < C[0]
	return (
		<AbsoluteFill style={{ background: BG }}>
			<Camera t={t} keys={k}>
				<div style={{ position: "absolute", left: 960 - w / 2, top: 540 - h / 2, width: w, height: h, borderRadius: 22, background: BOX, boxShadow: "0 18px 50px rgba(80,60,20,.14), 0 0 0 1px #ece6da", overflow: "hidden", fontFamily: CJK, color: INKC, opacity: clamp01((t - M.card) / 0.3) }}>
					<Content t={t} w={w} h={h} />
				</div>
				{t > M.step2 && t < C[0] && <div style={{ position: "absolute", left: dragOn ? cur.x - 60 : 1520, top: dragOn ? cur.y - 20 : 480, display: "flex", gap: 10, transform: "rotate(-4deg)", opacity: clamp01((t - M.step2 - 0.6) / 0.3) }}>{WORDS.map((x, i) => <div key={x[1]} style={{ marginLeft: i ? -120 : 0, marginTop: i * 8 }}><Word w={x} s={0.85} /></div>)}</div>}
				{t < M.chat + 1.5 && <Cursor x={cur.x} y={cur.y} down={down} s={1.2} />}
			</Camera>
		</AbsoluteFill>
	)
}
