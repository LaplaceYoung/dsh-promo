// Template 27 — structure of Framer "Framer 3.0 with Agents, Branching, and a new Community" (2026), MosMos content.
// Black stage; a blue neon line sweeps across and reveals pieces of the MosMos interface, morphs into a glowing
// button, then fast feature cuts (scenes, polish levels, a spoken edit, three polish versions side by side, a
// prompt, a ring of cards, hot words), a hot-word library and a wall of drafts, light-trail title cards
// (licensed Pexels long-exposure photos, ASSETS.md), a neon logo and a slow fade to black.
import React from "react"
import { AbsoluteFill, Img, staticFile } from "remotion"
import { CJK, HEAVY, SANS, MONO, COPY, SCENES, lerp, clamp01, inOut, typeAt, useT, Wave, LogoPixels } from "../_engine/src/mos"
import { rand } from "../_engine/src/kit"
import TL from "./timeline.json"

const M = TL.marks as Record<string, number>, C = TL.cuts
const B1 = "#3d7bff", PAN = "#0b0d14", LN = "rgba(90,130,255,.28)", TX = "#e8ecff", DIM = "#7d86a8"
const GLOW = `0 0 10px ${B1}, 0 0 34px #2a5cff, 0 0 90px rgba(40,90,255,.55)`
const Line: React.FC<{ x: number; y?: number; h?: number; op?: number }> = ({ x, y = 290, h = 500, op = 1 }) => <div style={{ position: "absolute", left: x - 3, top: y, width: 6, height: h, borderRadius: 3, background: "#cfe0ff", boxShadow: GLOW, opacity: op }} />
const Panel: React.FC<{ w: number; h?: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ w, h, children, style }) => <div style={{ width: w, height: h, borderRadius: 22, background: PAN, boxShadow: `0 0 0 1px ${LN}, 0 0 60px rgba(40,90,255,.18)`, fontFamily: CJK, color: TX, overflow: "hidden", position: "relative", ...style }}>{children}</div>
const Btn: React.FC<{ children: React.ReactNode; on?: boolean; s?: number }> = ({ children, on, s = 1 }) => <div style={{ padding: `${10 * s}px ${22 * s}px`, borderRadius: 12 * s, fontSize: 22 * s, background: on ? "#2f6bff" : "#1a1e2b", color: "#fff", boxShadow: on ? `0 0 24px rgba(60,120,255,.6)` : undefined }}>{children}</div>
const Sea: React.FC<{ style?: React.CSSProperties }> = ({ style }) => <Img src={staticFile("t27-sea.webp")} style={{ position: "absolute", objectFit: "cover", ...style }} />
const Toolbar: React.FC<{ s?: number }> = ({ s = 1 }) => (
	<Panel w={640 * s} h={300 * s}>
		<div style={{ display: "flex", alignItems: "center", gap: 22 * s, padding: `${24 * s}px ${28 * s}px`, fontSize: 28 * s }}><div style={{ background: "#1f2433", borderRadius: 12, padding: `${8 * s}px ${16 * s}px` }}>MosMos ▾</div><span>＋</span><span>◎</span><span>T</span><span style={{ color: DIM }}>▽</span></div>
		<div style={{ display: "flex", gap: 30 * s, padding: `0 ${30 * s}px`, fontSize: 24 * s, color: DIM }}><span style={{ color: TX, background: "#1f2433", borderRadius: 10, padding: `${4 * s}px ${14 * s}px` }}>输入</span><span>会议</span><span>热词</span></div>
		<div style={{ padding: `${30 * s}px ${30 * s}px 0`, fontSize: 20 * s, color: DIM }}>场景</div>
	</Panel>
)
const Search: React.FC<{ t: number }> = ({ t }) => (
	<Panel w={560} h={520}>
		<div style={{ margin: 22, padding: "12px 16px", borderRadius: 12, background: "#141826", color: DIM, fontSize: 22 }}>⌕ 搜索…</div>
		<div style={{ padding: "0 22px", fontSize: 18, color: DIM }}>全部</div>
		{SCENES.map((s, i) => <div key={s} style={{ margin: "6px 14px", padding: "12px 16px", borderRadius: 12, fontSize: 24, background: i === 1 && t > M.sel ? "#1e2a52" : undefined, display: "flex", gap: 14, alignItems: "center" }}><span style={{ color: i === 1 && t > M.sel ? B1 : DIM }}>{["◌", "✉", "▤", "✦", "›_"][i]}</span>{s}{i === 1 && t > M.sel && <span style={{ marginLeft: "auto", fontSize: 16, color: DIM }}>当前</span>}</div>)}
		<div style={{ margin: "6px 14px 0 54px", fontSize: 20, color: DIM, lineHeight: 2 }}>{t > M.sel ? <>· 发给李经理<br />· 周会纪要</> : null}</div>
	</Panel>
)
const Hero: React.FC<{ big?: boolean; text?: string }> = ({ big, text }) => (
	<Panel w={1500} h={860}>
		<div style={{ display: "flex", justifyContent: "space-between", padding: "26px 40px", fontSize: 22, color: DIM }}><b style={{ color: TX, letterSpacing: 4 }}>NIMBUS</b><span>项目　团队　联系</span></div>
		<div style={{ padding: "20px 40px", fontFamily: HEAVY, fontWeight: 800, fontSize: big ? 150 : 90, letterSpacing: 6, color: "#fff" }}>NIMBUS</div>
		<div style={{ padding: "0 40px", fontSize: 26, color: "#b9c2e6", width: 900, lineHeight: 1.6 }}>{text || "首页改版第二版：交付计划不变，按素材、交互、视觉的顺序推进。"}</div>
		<Sea style={{ left: 0, right: 0, bottom: 0, width: 1500, height: 380 }} />
	</Panel>
)
const Phone: React.FC<{ nav?: boolean }> = ({ nav }) => (
	<Panel w={400} h={800} style={{ borderRadius: 40 }}>
		<div style={{ padding: "30px 26px", display: "flex", justifyContent: "space-between", fontSize: 20 }}><b style={{ letterSpacing: 3 }}>NIMBUS</b><span>≡</span></div>
		{nav ? <div style={{ padding: "10px 26px", fontSize: 30, lineHeight: 2.1 }}>{["首页", "项目", "团队", "联系"].map((x) => <div key={x}>{x}</div>)}</div> : <div style={{ padding: "0 26px", fontSize: 22, color: "#b9c2e6", lineHeight: 1.6 }}>首页改版第二版：交付计划不变。</div>}
		<Sea style={{ left: 0, right: 0, bottom: 0, height: nav ? 300 : 460, width: 400 }} />
	</Panel>
)
const Trails: React.FC<{ t: number; t0: number; src: string; hue?: number; children: React.ReactNode }> = ({ t, t0, src, hue = 0, children }) => (
	<AbsoluteFill style={{ background: "#000", overflow: "hidden" }}>
		<Img src={staticFile(src)} style={{ position: "absolute", left: -200 + (t - t0) * -60, top: -40, width: 2400, height: 1160, objectFit: "cover", filter: `hue-rotate(${hue}deg) saturate(1.3) brightness(1.15)` }} />
		<AbsoluteFill style={{ alignItems: "center", justifyContent: "center", fontFamily: CJK, fontSize: 64, color: "#fff", textShadow: "0 0 30px rgba(120,160,255,.9)" }}>{children}</AbsoluteFill>
	</AbsoluteFill>
)
const Ring: React.FC<{ t: number; close?: boolean }> = ({ t, close }) => (
	<AbsoluteFill style={{ background: "#000", perspective: 1400 }}>
		<div style={{ position: "absolute", left: 960, top: 540, transformStyle: "preserve-3d", transform: `rotateX(${close ? 12 : -14}deg) rotateY(${t * 40}deg) scale(${close ? 1.4 : 1})` }}>
			{Array.from({ length: 10 }).map((_, i) => <div key={i} style={{ position: "absolute", left: -110, top: -140, width: 220, height: 280, borderRadius: 18, transform: `rotateY(${i * 36}deg) translateZ(520px)`, background: `linear-gradient(160deg, hsl(${215 + i * 9},80%,${46 + (i % 3) * 8}%), #0b1640)`, boxShadow: "0 0 0 1px rgba(150,180,255,.4)", fontFamily: CJK, color: "#fff", fontSize: 30, display: "flex", alignItems: "flex-end", padding: 18 }}>{[...SCENES, "会议记录", "热词", "关闭", "标准", "高级"][i]}</div>)}
		</div>
	</AbsoluteFill>
)
const Dots: React.FC<{ t: number }> = ({ t }) => (
	<AbsoluteFill style={{ background: "#000" }}>{Array.from({ length: 260 }).map((_, i) => {
		const th = Math.acos(1 - 2 * (i + 0.5) / 260), ph = i * 2.39996 + t * 0.8
		const x = Math.sin(th) * Math.cos(ph), z = Math.sin(th) * Math.sin(ph), y = Math.cos(th)
		return <div key={i} style={{ position: "absolute", left: 960 + x * 300, top: 540 + y * 300, width: 5, height: 5, borderRadius: 3, background: "#cfe0ff", opacity: 0.35 + 0.65 * (z + 1) / 2 }} />
	})}</AbsoluteFill>
)
const ROWS: [string, string, string][] = [["林清禾", "人名", "林清和"], ["Nimbus", "项目", "尼姆布斯"], ["Figma", "工具", "飞马"], ["周舟", "人名", "周州"], ["首页改版", "项目", "首页改板"], ["Notion", "工具", "诺神"], ["李经理", "人名", "李经历"], ["交互稿", "术语", "交互搞"], ["API_KEY", "代码", "API key"], ["rg", "代码", "RG"], ["品牌素材", "术语", "品牌速材"], ["台灯样品", "项目", "台登样品"]]

// Per-shot framing pass (batch 6): zoom each shot so UI scale matches the reference. [scale, originX, originY]
const Z: Record<number, [number, number, number]> = { 0: [2.0, 600, 420], 1: [1.3, 420, 200], 2: [1.3, 960, 540], 3: [1.35, 960, 540], 4: [1.5, 1200, 300], 6: [1.5, 960, 540], 7: [1.4, 960, 540], 9: [1.3, 960, 420], 10: [1.4, 960, 540], 17: [1.3, 960, 540], 18: [1.4, 960, 540], 19: [1.4, 960, 540], 21: [1.25, 960, 540], 22: [1.25, 960, 540], 23: [1.25, 960, 540] }
export const Film: React.FC = () => {
	const t = useT()
	const i = C.filter((c) => t >= c).length
	const z = Z[i]
	if (!z) return <Shot t={t} />
	return <AbsoluteFill style={{ background: "#000", overflow: "hidden" }}><AbsoluteFill style={{ transform: `scale(${z[0]})`, transformOrigin: `${z[1]}px ${z[2]}px` }}><Shot t={t} /></AbsoluteFill></AbsoluteFill>
}
const Shot: React.FC<{ t: number }> = ({ t }) => {
	const i = C.filter((c) => t >= c).length, u = t - (i ? C[i - 1] : 0)
	const center = (n: React.ReactNode, s = 1) => <AbsoluteFill style={{ background: "#000", alignItems: "center", justifyContent: "center" }}><div style={{ transform: `scale(${s})` }}>{n}</div></AbsoluteFill>
	switch (i) {
		case 0: { const x = lerp(t, 0.1, 2.2, 512, 1420, inOut); return <AbsoluteFill style={{ background: "#000" }}><div style={{ position: "absolute", left: 512, top: 330, clipPath: `inset(0 ${Math.max(0, 1420 - x)}px 0 0)`, transform: `scale(${lerp(t, 0, 2.3, 1.0, 1.05)})` }}><Toolbar s={1.4} /></div><Line x={x} y={220} h={640} op={clamp01(t / 0.3)} /></AbsoluteFill> }
		case 1: { const x = t < M.sweep2 ? 1500 : lerp(t, M.sweep2, C[1], 1500, 1000, inOut); return <AbsoluteFill style={{ background: "#000" }}><div style={{ position: "absolute", left: 420, top: 200, transformOrigin: "0 0", transform: `translateY(${lerp(t, C[0], C[1], 30, -40)}px) scale(1.3)`, clipPath: t < M.sweep2 ? undefined : `inset(0 ${1500 - x}px 0 0)` }}><Search t={t} /></div><Line x={t < M.sweep2 ? lerp(t, C[0], C[0] + 1.2, 420, 1500, inOut) : x} y={200} h={680} op={t < C[0] + 1.3 || t > M.sweep2 ? 1 : 0} /></AbsoluteFill> }
		case 2: { const p = inOut(clamp01((t - M.morph) / 0.8)), w = 6 + p * 360, h = 500 - p * 360; return <AbsoluteFill style={{ background: "#000" }}><div style={{ position: "absolute", left: 960 - w / 2 + lerp(t, C[1], M.morph, -300, 0, inOut), top: 540 - h / 2, width: w, height: h, borderRadius: 4 + p * 36, border: p > 0.05 ? `5px solid #cfe0ff` : undefined, background: p > 0.05 ? "rgba(40,90,255,.15)" : "#cfe0ff", boxShadow: GLOW }} /></AbsoluteFill> }
		case 3: return center(<div style={{ padding: "40px 110px", borderRadius: 50, background: "linear-gradient(180deg,#4f8dff,#1f4fe0)", border: "5px solid #cfe0ff", boxShadow: GLOW, fontFamily: CJK, fontSize: 110, fontWeight: 600, color: "#fff" }}>已写好</div>, lerp(t, C[2], C[3], 1.0, 1.08))
		case 4: return <AbsoluteFill style={{ background: "#000" }}><div style={{ position: "absolute", left: 520, top: 220, transform: `scale(${lerp(t, C[3], C[4], 1.5, 1.25, inOut)})`, transformOrigin: "50% 0" }}><Panel w={880} h={560}>
			<div style={{ display: "flex", gap: 16, padding: 22, justifyContent: "flex-end", alignItems: "center" }}><span style={{ color: DIM, fontSize: 22 }}>◎ ▶</span><Btn>标准润色 ▾</Btn><Btn on>已写好</Btn></div>
			<div style={{ display: "flex", gap: 14, padding: "0 24px", fontSize: 22 }}><span style={{ background: "#1f2433", borderRadius: 10, padding: "6px 14px" }}>场景</span><span style={{ color: DIM, padding: "6px 0" }}>风格</span></div>
			<div style={{ margin: 24, padding: "14px 18px", borderRadius: 12, background: "#141826", fontSize: 22, display: "flex", justifyContent: "space-between", opacity: t > M.drop ? 1 : 0.4 }}>{t > M.drop ? "新的输入 · 邮件" : "新的输入"} <span>▾</span></div>
			<div style={{ margin: "0 24px", padding: "18px", borderRadius: 12, boxShadow: `0 0 0 1px ${LN}`, fontSize: 22, color: DIM, display: "flex", alignItems: "center", gap: 14 }}><Wave t={t} live={t > M.drop} n={6} h={22} color="#9fb4ff" />说点什么…</div>
		</Panel></div></AbsoluteFill>
		case 5: return <AbsoluteFill style={{ background: "#000" }}><div style={{ position: "absolute", left: -200, top: 120, transform: `scale(1.3) translateX(${-u * 30}px)` }}><Hero /></div></AbsoluteFill>
		case 6: return center(<Panel w={760} h={360}><div style={{ padding: 30, fontSize: 26, lineHeight: 2.2 }}>{[["润色", "标准"], ["场景", "自动"], ["热词", "3 条已启用"], ["粘贴", "写好后自动"]].map(([a, b]) => <div key={a} style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${LN}` }}><span style={{ color: DIM }}>{a}</span><span>{b}</span></div>)}</div></Panel>, 1.4)
		case 7: return center(<Phone />, lerp(t, C[6], C[7], 1.0, 1.05))
		case 8: return <AbsoluteFill style={{ background: "#000" }}><div style={{ position: "absolute", left: 210, top: 110, transform: `scale(${lerp(t, C[7], C[8], 1.0, 1.06)})` }}><Hero big /></div></AbsoluteFill>
		case 9: { const s = t < M.sent ? typeAt("把这一页的文案改得正式一点，和上面的风格统一", t, M.say, 9).s : "把这一页的文案改得正式一点，和上面的风格统一"; return <AbsoluteFill style={{ background: "#000" }}><div style={{ position: "absolute", left: 210, top: 110, opacity: 0.35 }}><Hero big /></div><div style={{ position: "absolute", left: 460, top: 360 }}><Panel w={1000} h={260}><div style={{ padding: 30, fontSize: 34, lineHeight: 1.5 }}><span style={{ color: B1 }}>MosMos</span> {s}</div><div style={{ position: "absolute", left: 30, right: 30, bottom: 24, display: "flex", alignItems: "center", gap: 16 }}><Wave t={t} live={t < M.sent} n={8} h={26} color="#9fb4ff" /><span style={{ color: DIM, fontSize: 20 }}>场景：文档 · {t < M.sent ? "语音输入" : "润色中…"}</span><div style={{ flex: 1 }} /><Btn>标准润色 ▾</Btn><div style={{ width: 50, height: 50, borderRadius: 25, background: "#2f6bff", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>↑</div></div></Panel></div></AbsoluteFill> }
		case 10: return center(<Phone nav />, lerp(t, C[9], C[10], 1.1, 1.0))
		case 11: return <AbsoluteFill style={{ background: "#000" }}><div style={{ position: "absolute", left: 60, top: 160, opacity: 0.6 }}><Hero text="首页改版第二版已经确定：交付计划保持不变，将按素材、交互与视觉的顺序推进。" /></div><div style={{ position: "absolute", left: 1180, top: 300, transform: "scale(1.5)", transformOrigin: "0 0" }}><Panel w={300} h={230}><div style={{ padding: 16, fontSize: 20, lineHeight: 2.1 }}>{["复制", "查看原话", "换成高级润色", "撤销"].map((x, k) => <div key={x} style={{ padding: "0 12px", borderRadius: 8, background: k === 2 && u > 0.6 ? "#1e2a52" : undefined }}>{x}</div>)}</div></Panel></div></AbsoluteFill>
		case 12: return <AbsoluteFill style={{ background: "#000", flexDirection: "row", gap: 30, alignItems: "center", justifyContent: "center" }}>{[["关闭", COPY.raw], ["标准", COPY.polish[1].out], ["高级", COPY.polish[2].out]].map(([l, x], k) => <div key={l} style={{ opacity: clamp01((u - k * 0.25) / 0.3) }}><Panel w={520} h={640}><div style={{ padding: 30 }}><div style={{ fontSize: 22, color: B1 }}>{l}</div><div style={{ fontSize: 28, lineHeight: 1.7, marginTop: 16 }}>{x}</div></div></Panel></div>)}</AbsoluteFill>
		case 13: return center(<Panel w={980} h={300}><div style={{ padding: 30, fontSize: 32, lineHeight: 1.5 }}>{typeAt("写一段提示词：把会议录音整理成总结和待办，按负责人分组", t, M.ptype, 16).s}</div><div style={{ position: "absolute", left: 30, bottom: 24, fontSize: 20, color: DIM, display: "flex", gap: 12, alignItems: "center" }}><Wave t={t} n={6} h={20} color="#9fb4ff" shimmer />场景：提示词 · 润色中…</div></Panel>, 1.15)
		case 14: return u < 1.0 ? center(<Panel w={900} h={420}><div style={{ padding: 30, fontFamily: MONO, fontSize: 24, lineHeight: 1.8, color: "#b9c2e6" }}>{["请把下面的会议录音整理成：", "1. 会议总结（背景、结论）", "2. 待办事项，按负责人分组", "3. 每条写明截止时间", "输出：Markdown 列表"].map((l) => <div key={l}>{l}</div>)}</div></Panel>) : <Ring t={t} />
		case 15: return <Dots t={t} />
		case 16: return <Ring t={t} close />
		case 17: return <AbsoluteFill style={{ background: "#000", alignItems: "center", justifyContent: "center", gap: 6 }}>{[["林清禾", 300, ""], ["Nimbus", 800, "italic"], ["Figma", 500, ""], ["首页改版", 900, ""], ["周舟", 200, ""]].map(([w, f, st], k) => <div key={k} style={{ fontFamily: HEAVY, fontWeight: f as number, fontStyle: st as string, fontSize: 70, color: "#fff", opacity: clamp01((u - k * 0.1) / 0.15) }}>{w}</div>)}</AbsoluteFill>
		case 18: return <AbsoluteFill style={{ background: "#000", alignItems: "center", justifyContent: "center" }}><div style={{ display: "grid", gridTemplateColumns: "repeat(5, 170px)", gap: 22, transform: `scale(${lerp(u, 0, 1, 1.05, 1.0)})` }}>{["聊", "邮", "文", "词", "码", "会", "稿", "改", "说", "记", "待", "写", "润", "热", "听"].map((ch, k) => <div key={k} style={{ width: 170, height: 170, borderRadius: 34, background: `linear-gradient(150deg, hsl(${200 + rand(k) * 50},90%,${55 + rand(k + 2) * 15}%), hsl(${225 + rand(k + 1) * 30},85%,28%))`, boxShadow: "inset 0 2px 0 rgba(255,255,255,.4), 0 10px 30px rgba(0,0,0,.6)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: HEAVY, fontWeight: 800, fontSize: 70, color: "#fff" }}>{ch}</div>)}</div></AbsoluteFill>
		case 19: return <AbsoluteFill style={{ background: "#000", alignItems: "center", justifyContent: "center" }}><div style={{ fontFamily: CJK, fontSize: 52, color: "#fff", opacity: clamp01((u - 0.2) / 0.5) * clamp01((C[19] - t) / 0.3) }}>在任何应用里，都能开口说</div></AbsoluteFill>
		case 20: {
			if (t < M.wall) return <AbsoluteFill style={{ background: "#000" }}><div style={{ position: "absolute", left: 160, top: 80, transform: `scale(${lerp(t, C[19], M.wall, 1.0, 0.9)})`, transformOrigin: "50% 0" }}><Panel w={1600} h={980}><div style={{ padding: "26px 36px", fontSize: 26, display: "flex", justifyContent: "space-between" }}><b>我的热词</b><span style={{ color: DIM, fontSize: 20 }}>12 条 · 说话时优先识别</span></div>
				<div style={{ transform: `translateY(${-u * 40}px)` }}>{ROWS.map(([a, b, c], k) => <div key={a} style={{ display: "flex", padding: "0 36px", height: 70, alignItems: "center", fontSize: 24, borderTop: `1px solid ${LN}`, opacity: clamp01((u - k * 0.15) / 0.3) }}><span style={{ width: 380 }}>{a}</span><span style={{ width: 260, color: DIM }}>{b}</span><span style={{ color: "#8fa0d8" }}>近音 “{c}” → {a}</span><span style={{ marginLeft: "auto", color: B1 }}>●</span></div>)}</div></Panel></div></AbsoluteFill>
			const w = t - M.wall
			return <AbsoluteFill style={{ background: "#000", overflow: "hidden" }}><div style={{ position: "absolute", left: -200 - w * 60, top: -100, display: "grid", gridTemplateColumns: "repeat(8, 340px)", gap: 24 }}>{Array.from({ length: 32 }).map((_, k) => <div key={k} style={{ height: 230, borderRadius: 16, background: k % 5 === 2 ? undefined : PAN, boxShadow: `0 0 0 1px ${LN}`, overflow: "hidden", position: "relative", padding: 18, fontFamily: CJK, color: TX, fontSize: 18, lineHeight: 1.6 }}>{k % 5 === 2 ? <Sea style={{ inset: 0, width: 340, height: 230 }} /> : <><div style={{ color: B1, fontSize: 15 }}>{[...SCENES, "会议记录"][k % 6]}</div>{[COPY.chatOut, COPY.mail[1], COPY.polish[2].out, COPY.doc[0][1], "交互稿周三前完成。", "品牌素材今天下午同步。"][k % 6]}</>}</div>)}</div></AbsoluteFill>
		}
		case 21: return <Trails t={t} t0={C[20]} src="t27-streaks.webp" hue={200}><div style={{ opacity: clamp01((u - 0.4) / 0.6) }}>欢迎使用 MosMos</div></Trails>
		case 22: return <Trails t={t} t0={C[21]} src="t27-streaks.webp" hue={180}><div>{t < M.t2 ? "开口说" : "按场景润色"}</div></Trails>
		case 23: return <Trails t={t} t0={C[22]} src="t27-streaks-teal.webp"><div>会议也一起记下</div></Trails>
		case 24: { const f = clamp01((t - M.flash) / 0.6); return <AbsoluteFill style={{ background: "#000" }}><Trails t={t} t0={C[23]} src="t27-streaks.webp" hue={205}><div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 90 }}>MosMos</div></Trails><AbsoluteFill style={{ background: "radial-gradient(circle at 50% 50%, #fff 0%, #9cc0ff 35%, rgba(40,90,255,0) 75%)", opacity: f }} /></AbsoluteFill> }
		case 25: return <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 50%, #0b2a8a 0%, #000 70%)", alignItems: "center", justifyContent: "center" }}><div style={{ filter: `drop-shadow(0 0 18px ${B1}) drop-shadow(0 0 50px #2a5cff)`, transform: `scale(${lerp(u, 0, 2.7, 1.25, 1.1)})` }}><LogoPixels size={300} t={t} mode="static" invert /></div></AbsoluteFill>
		case 26: { const p = clamp01(u / 1.1); return <AbsoluteFill style={{ background: "#000", alignItems: "center", justifyContent: "center" }}><div style={{ width: 1000 * (1 - p) + 30, height: 30 * (1 - p) + 20, borderRadius: 30, background: "#cfe0ff", boxShadow: GLOW, opacity: 1 - p * 0.3 }} /></AbsoluteFill> }
		default: return <AbsoluteFill style={{ background: "#000", alignItems: "center", justifyContent: "center" }}><div style={{ opacity: clamp01(u / 0.4) * clamp01((M.fade + 2.0 - t) / 2.0) }}><LogoPixels size={140} t={t} mode="static" invert /></div></AbsoluteFill>
	}
}
