// Template 47 — structure of Linear "Introducing Linear For Agents" (2025), MosMos content.
// Near-black product film: a white title, a zoomed dark list where rows get multi-selected and a dropdown picks a
// scene, a comment thread where replies arrive one by one (with a push-in), a card list that scrolls with motion
// blur, a document page with a reply that writes a structured prompt, rotating title words and a fading lock-up.
import React from "react"
import { AbsoluteFill } from "remotion"
import { CJK, MONO, SANS, lerp, clamp01, inOut, out, useT, LogoPixels, Cursor, Wave, COPY, SCENES } from "../_engine/src/mos"
import TL from "./timeline.json"

const M = TL.marks as Record<string, number>, C = TL.cuts as number[]
const BG = "#0f0f11", TX = "#e6e6ea", DIM = "#7d7e86", LINE = "#1d1e22", PUR = "#6c63ff", SEL = "#161735"
const fade = (t: number, a: number, b: number, d = 0.3, d2 = d) => clamp01((t - a) / d) * clamp01((b - t) / d2)
const Bg: React.FC<{ children?: React.ReactNode }> = ({ children }) => <AbsoluteFill style={{ background: BG, overflow: "hidden", fontFamily: CJK, color: TX }}>{children}</AbsoluteFill>
const T: React.FC<{ x: number; y: number; s?: number; c?: string; w?: number; b?: boolean; mono?: boolean; o?: number; children: React.ReactNode }> = ({ x, y, s = 30, c = TX, w, b, mono, o = 1, children }) =>
	<div style={{ position: "absolute", left: x, top: y, width: w, fontSize: s, color: c, fontWeight: b ? 600 : 400, fontFamily: mono ? MONO : CJK, whiteSpace: w ? "normal" : "nowrap", lineHeight: 1.45, opacity: o }}>{children}</div>
const Title: React.FC<{ s: string; o?: number; dy?: number }> = ({ s, o = 1, dy = 0 }) =>
	<div style={{ position: "absolute", left: 0, right: 0, top: 482 + dy, textAlign: "center", fontFamily: CJK, fontWeight: 600, fontSize: 90, color: "#f2f2f4", opacity: o }}>{s}</div>
const Ico: React.FC<{ c: string; ch: string; s?: number }> = ({ c, ch, s = 34 }) => <span style={{ display: "inline-flex", width: s, height: s, borderRadius: s * 0.28, background: c, alignItems: "center", justifyContent: "center", fontSize: s * 0.55, color: "#fff", fontWeight: 700, flexShrink: 0 }}>{ch}</span>
const SC: Record<string, [string, string]> = { "自动识别": ["#3a3b44", "自"], "飞书 / 微信": ["#2f9e5a", "聊"], "邮件": ["#3b6fd8", "邮"], "代码与终端": [PUR, ">_"], "文档": ["#8a5cd8", "文"], "提示词": ["#d8902f", "提"] }

// ---------- list of spoken lines ----------
const ROWS = ["第一版我们周三前给你，你先把品牌素材发我。", "李经理您好，第一版方案我们周三前发给您。", "项目复盘，目标是把首页上线提前到周五。", "在当前项目里查找包含 API_KEY 的文件。", "分析三款语音输入产品，最后用表格对比。", "麻烦今天把品牌素材发我，收到以后我会提前检查。", "素材到位以后，周四开始做视觉方案。", "客户的品牌素材今天下午同步到群里。", "第一版交互稿我会在周三之前完成。"]
const List: React.FC<{ t: number; picked: boolean }> = ({ t, picked }) => {
	const nSel = picked ? 6 : Math.floor(clamp01((t - M.sel) / 0.6) * 6.99)
	return <><div style={{ position: "absolute", left: 230, top: 30, display: "flex", gap: 16, alignItems: "center" }}><Ico c={PUR} ch="M" s={30} /><span style={{ fontSize: 30 }}>首页改版 · 原话</span></div>
		<div style={{ position: "absolute", left: 225, top: 96, width: 1440, height: 1000, borderTop: `1px solid ${LINE}` }}>{ROWS.map((r, k) => { const sel = k < nSel
			return <div key={k} style={{ position: "absolute", left: 0, top: k * 115, width: 1440, height: 115, background: sel ? SEL : undefined, borderBottom: `1px solid ${LINE}`, display: "flex", alignItems: "center", gap: 28, padding: "0 26px", boxSizing: "border-box" }}>
				<span style={{ width: 30, height: 30, borderRadius: 6, background: sel ? PUR : "transparent", border: sel ? undefined : "2px solid #3a3b42", color: "#fff", fontSize: 22, display: "flex", alignItems: "center", justifyContent: "center" }}>{sel ? "✓" : ""}</span>
				<span style={{ width: 120, fontFamily: MONO, fontSize: 26, color: DIM }}>{`10:0${k}`}</span><Wave t={t + k} n={4} h={22} color={sel ? "#a9a4ff" : "#4a4b52"} />
				<span style={{ flex: 1, fontSize: 31, color: sel ? "#f0f0f4" : "#c9cad0", fontWeight: sel ? 600 : 400 }}>{r}</span>
				{picked && sel ? <Ico c={PUR} ch=">_" s={34} /> : <span style={{ width: 34, height: 34, borderRadius: 17, border: "2px dashed #4a4b52" }} />}</div> })}</div></>
}
const DD = ["自动识别", "飞书 / 微信", "邮件", "代码与终端", "文档", "提示词"]
const Drop: React.FC<{ t: number }> = ({ t }) => { const o = fade(t, M.dd, M.pick + 0.15, 0.15, 0.25), dim = 0.5 * clamp01((t - M.pick) / 0.15), hv = t > M.hov ? 3 : -1
	return <><AbsoluteFill style={{ background: BG, opacity: dim }} /><div style={{ position: "absolute", left: 255, top: 82, width: 1415, height: 900, borderRadius: 18, background: "#18191d", boxShadow: "0 30px 80px rgba(0,0,0,.7), inset 0 0 0 1.5px #27282d", opacity: o }}>
		<div style={{ display: "flex", alignItems: "center", gap: 24, height: 110, padding: "0 30px", borderBottom: `1px solid ${LINE}` }}><span style={{ padding: "6px 16px", borderRadius: 8, background: "#25262b", fontSize: 24, color: "#bbb" }}>6 条</span><span style={{ fontSize: 36, color: "#9a9ba3" }}>切换场景…</span></div>
		{DD.map((s, k) => <div key={s} style={{ position: "absolute", left: 14, right: 14, top: 128 + k * 108, height: 96, borderRadius: 12, background: k === hv ? "#24252b" : undefined, display: "flex", alignItems: "center", gap: 22, padding: "0 30px" }}><Ico c={SC[s][0]} ch={SC[s][1]} /><span style={{ fontSize: 30 }}>{s}</span><span style={{ fontSize: 22, color: DIM }}>{k ? COPY.scenes[[0, 1, 4, 2, 3][k - 1]].style.replace("风格：", "") : "默认"}</span></div>)}</div></> }

// ---------- thread ----------
const Act: React.FC<{ y: number; s: string; o?: number; ic?: string }> = ({ y, s, o = 1, ic = "#555" }) => <div style={{ position: "absolute", left: 120, top: y, display: "flex", alignItems: "center", gap: 18, fontSize: 24, color: DIM, opacity: o }}><span style={{ width: 22, height: 22, borderRadius: 11, background: ic }} />{s}</div>
const Card: React.FC<{ x?: number; y: number; w?: number; h: number; o?: number; children: React.ReactNode }> = ({ x = 110, y, w = 1700, h, o = 1, children }) =>
	<div style={{ position: "absolute", left: x, top: y, width: w, height: h, borderRadius: 18, background: "#16171a", boxShadow: "inset 0 0 0 1.5px #232428", opacity: o, overflow: "hidden" }}>{children}</div>
const Crumb: React.FC<{ s: string }> = ({ s }) => <div style={{ position: "absolute", left: 30, top: 24, display: "flex", gap: 14, alignItems: "center", fontSize: 24, color: "#a9aab1" }}><Ico c={PUR} ch="M" s={24} />MosMos <span style={{ color: DIM }}>›</span> {s} <span style={{ color: DIM }}>··· ☆</span></div>
const Thread: React.FC<{ t: number }> = ({ t }) => { const z = inOut(clamp01((t - M.zoom) / 0.8)), s = 1 + 0.55 * z
	const typed = COPY.termCmd.slice(0, Math.floor(clamp01((t - M.msg2 - 0.3) / 0.8) * COPY.termCmd.length))
	return <Bg><div style={{ position: "absolute", inset: 0, transform: `translate(${-120 * z}px, ${-560 * z}px) scale(${s})`, transformOrigin: "0 0" }}>
		<Crumb s="代码与终端" />
		<Act y={110} s="你 用语音输入了一段话 · 刚刚" /><Act y={160} s="场景自动识别为 代码与终端 · 刚刚" ic={PUR} o={fade(t, 8.15, 99, 0.3)} />
		<Card y={240} h={200} o={t + 0.002 < C[1] ? 0 : t < 9.367 ? 0.5 : 1}><div style={{ position: "absolute", left: 36, top: 28, display: "flex", gap: 16, alignItems: "center" }}><Ico c="#444" ch="你" s={34} /><span style={{ fontSize: 26, fontWeight: 600 }}>你</span><span style={{ fontSize: 22, color: DIM }}>语音输入 · 刚刚</span></div>
			<T x={36} y={90} s={32} c="#d0d1d7">{COPY.termAsk}</T></Card>
		{t + 0.002 >= C[2] && <Card y={470} h={260} o={t < M.msg2 - 0.2 ? 0.4 : 0.4 + 0.6 * clamp01((t - M.msg2 + 0.2) / 0.25)}><div style={{ position: "absolute", left: 36, top: 28, display: "flex", gap: 16, alignItems: "center" }}><Ico c={PUR} ch=">_" s={34} /><span style={{ fontSize: 26, fontWeight: 600 }}>MosMos</span><span style={{ fontSize: 22, color: DIM }}>代码与终端 · 生成命令</span></div>
			<T x={36} y={90} s={32}>已去掉口头禅，生成命令：<span style={{ fontFamily: MONO, padding: "2px 12px", borderRadius: 8, background: "#232430" }}>{typed}</span></T>
			<T x={36} y={170} s={24} c={DIM} o={fade(t, 11.6, 99, 0.3)}>命令已生成 · 按 Enter 执行</T></Card>}
		<Act y={760} s="命令已粘贴到终端 · 刚刚" ic="#2ea44f" o={fade(t, M.act, 99, 0.3)} /><Act y={810} s="原话保留在逐字稿 · 刚刚" ic="#555" o={fade(t, M.act + 0.4, 99, 0.3)} />
		<div style={{ position: "absolute", left: 110, top: 880, width: 1700, height: 90, borderRadius: 14, background: "#141518", boxShadow: "inset 0 0 0 1.5px #222327", display: "flex", alignItems: "center", gap: 18, padding: "0 30px", fontFamily: MONO, fontSize: 26, color: "#bbb", opacity: fade(t, M.act + 0.7, 99, 0.3) }}>$ {COPY.termCmd}<span style={{ flex: 1 }} /><span style={{ color: "#2ea44f", fontFamily: CJK }}>● 已粘贴</span></div>
	</div>{t < 9.6 && <AbsoluteFill style={{ background: BG, opacity: 0 }} />}</Bg> }

// ---------- scene cards ----------
const Scenes: React.FC<{ t: number }> = ({ t }) => { const sc = inOut(clamp01((t - M.blur) / 0.5)), bl = Math.sin(Math.PI * clamp01((t - M.blur) / 0.5)) * 22, en = t > M.en
	const items = COPY.scenes.map((s) => [s.label, s.style.replace("风格：", ""), s.raw] as [string, string, string]).concat([["热词", "加入词库后优先识别", COPY.hotDesc], ["会议", "Fn + Shift", COPY.meetingDesc]])
	return <Bg>{sc < 0.05 && <T x={180} y={40} s={56} b>场景</T>}<div style={{ position: "absolute", left: 0, top: 160 - sc * 600, width: 1920, filter: bl > 0.5 ? `blur(0px) url(#mb)` : undefined }}>
		<svg width={0} height={0}><filter id="mb"><feGaussianBlur stdDeviation={`0 ${bl}`} /></filter></svg>
		{items.map(([a, b, c], k) => { const on = (k === 0 && sc < 0.5) || (k === 3 && en)
			return <Card key={a} x={180} y={k * 200} w={1560} h={180}><div style={{ position: "absolute", left: 36, top: 30, display: "flex", gap: 22, alignItems: "center" }}><Ico c={(SC[a] || ["#555", a[0]])[0]} ch={(SC[a] || ["#555", a[0]])[1]} s={50} /><span style={{ fontSize: 32, fontWeight: 600 }}>{a}</span><span style={{ fontSize: 24, color: DIM }}>{b}</span></div>
				<T x={36} y={110} s={24} c={DIM}>{c.slice(0, 34)}{c.length > 34 ? "…" : ""}</T>
				<div style={{ position: "absolute", right: 36, top: 56, padding: "14px 34px", borderRadius: 10, background: on ? "transparent" : "#5e5bd6", color: on ? "#cfd0d6" : "#fff", fontSize: 26 }}>{on ? "✓ 当前场景" : "切换"}</div></Card> })}
		{t > M.blur + 0.5 && <Cursor x={lerp(t, M.blur + 0.5, M.en, 1500, 1640, inOut)} y={lerp(t, M.blur + 0.5, M.en, 900, 7 * 200 - 600 * sc + 160 - 940, inOut) + 0} s={1.2} down={Math.abs(t - M.en) < 0.08} />}
	</div></Bg> }

// ---------- prompt doc ----------
const RAWP = COPY.scenes[3].raw
const Doc: React.FC<{ t: number }> = ({ t }) => { const ty = RAWP.slice(0, Math.floor(clamp01((t - 17.6) / 1.4) * RAWP.length))
	return <Bg><Crumb s="提示词" /><T x={150} y={140} s={52} b>对比分析三款语音输入产品</T><T x={150} y={230} s={30} c="#a9aab1" w={1500}>场景：提示词 · 风格：自动 · 要求明确。按 Fn 说出想法，MosMos 整理成可以直接发给 AI 的提示词。</T>
		<div style={{ position: "absolute", left: 150, top: 340, width: 1560, borderTop: `1px solid ${LINE}` }} /><T x={150} y={380} s={30} c="#c9cad0">动态</T><Act y={440} s="你 新建了这页 · 1 分钟前" />
		<Card x={150} y={520} w={1560} h={210}><div style={{ position: "absolute", left: 36, top: 28, display: "flex", gap: 16, alignItems: "center" }}><Ico c="#444" ch="你" s={34} /><span style={{ fontSize: 26, fontWeight: 600 }}>你</span><span style={{ fontSize: 22, color: DIM }}>语音输入中</span><Wave t={t} n={6} h={20} color="#a9a4ff" live /></div>
			<T x={36} y={92} s={32} w={1480}>{ty}<span style={{ display: "inline-block", width: 3, height: 34, background: TX, marginLeft: 3, verticalAlign: "middle", opacity: Math.floor(t * 2.4) % 2 }} /></T></Card></Bg> }
const Reply: React.FC<{ t: number }> = ({ t }) => { const n = Math.floor(clamp01((t - M.rep - 0.3) / 1.2) * COPY.prompt.length + 0.01), z = lerp(t, C[5], C[6], 0, 1, (v) => v)
	return <Bg><Crumb s="提示词" /><div style={{ position: "absolute", inset: 0, transform: `translateY(${-z * 60}px)` }}>
		<Card x={170} y={110} w={1580} h={920}><div style={{ position: "absolute", left: 36, top: 28, display: "flex", gap: 16, alignItems: "center" }}><Ico c="#444" ch="你" s={30} /><span style={{ fontSize: 24, fontWeight: 600 }}>你</span><span style={{ fontSize: 20, color: DIM }}>1 分钟前</span></div>
			<T x={36} y={80} s={28} c="#c9cad0" w={1500}>{RAWP}</T>
			<div style={{ position: "absolute", left: 18, right: 18, top: 200, bottom: 18, borderRadius: 14, background: "#121316" }}>
				<div style={{ position: "absolute", left: 30, top: 24, display: "flex", gap: 16, alignItems: "center", opacity: fade(t, M.rep, 99, 0.2) }}><Ico c="#d8902f" ch="提" s={30} /><span style={{ fontSize: 24, fontWeight: 600 }}>MosMos</span><span style={{ fontSize: 20, color: DIM }}>提示词 · 要求明确 · 刚刚</span></div>
				{COPY.prompt.slice(0, n).map((l, k) => <T key={k} x={k >= 2 && k <= 4 ? 70 : 30} y={84 + k * 54} s={28} c={k === 0 ? "#f0f0f4" : "#c9cad0"}>{k >= 2 && k <= 4 ? "• " : ""}{l}</T>)}
				<div style={{ position: "absolute", left: 30, right: 30, top: 440, height: 220, borderRadius: 12, background: "#0c0d0f", boxShadow: "inset 0 0 0 1.5px #1e1f23", fontFamily: MONO, fontSize: 24, lineHeight: 1.7, padding: "20px 28px", boxSizing: "border-box", opacity: fade(t, M.code, 99, 0.3) }}>
					<div style={{ color: "#6a6b72" }}>// 输出要求</div><div><span style={{ color: "#e0a060" }}>| 维度 |</span> 产品 A | 产品 B | 产品 C |</div><div style={{ color: "#9aa0ff" }}>| 场景识别 | 词库能力 | 会议记录 |</div><div style={{ color: "#6a6b72" }}>+ 3 条产品改进建议</div></div>
			</div></Card>
		<Cursor x={lerp(t, 22.2, 23.3, 1300, 1060, inOut)} y={lerp(t, 22.2, 23.3, 980, 850, inOut)} s={1.2} /></div></Bg> }

// ---------- words ----------
const Words: React.FC<{ t: number }> = ({ t }) => { const W: [number, string][] = [[C[6], "开口写代码"], [M.w1, "开口写邮件"], [M.w2, "开口写文档"], [M.w3, "开口写提示词"], [M.w4, "开口"], [M.w5, "开口就好"]]
	let k = 0; W.forEach(([a], i) => { if (t >= a) k = i })
	const sl = k > 0 && k < 4 ? out(clamp01((t - W[k][0]) / 0.12)) : 1
	return <Bg>{k > 0 && k < 4 && sl < 1 && <Title s={W[k - 1][1]} o={1 - sl} dy={-30 * sl} />}<Title s={W[k][1]} o={k > 0 && k < 4 ? sl : 1} dy={k > 0 && k < 4 ? 30 * (1 - sl) : 0} /></Bg> }
const Lock: React.FC<{ t: number }> = ({ t }) => <Bg><AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity: 1 - inOut(clamp01((t - M.fade) / 1.0)) }}><div style={{ display: "flex", alignItems: "center", gap: 28 }}><LogoPixels size={80} t={t} mode="static" invert /><span style={{ fontFamily: SANS, fontWeight: 600, fontSize: 92, color: "#f2f2f4", letterSpacing: "-0.02em" }}>MosMos</span></div></AbsoluteFill></Bg>

export const Film: React.FC = () => {
	const t = useT(), i = C.filter((c) => t + 0.002 >= c).length
	if (i === 0) { const lo = clamp01((t - M.list) / 0.6)
		return <Bg><Title s="开口就好" o={1 - lo} /><AbsoluteFill style={{ opacity: lo }}><List t={t} picked={false} /><Drop t={t} />{t > 3.2 && <Cursor x={lerp(t, 3.2, M.hov, 1500, 1200, inOut)} y={lerp(t, 3.2, M.hov, 700, 560, inOut)} s={1.3} down={Math.abs(t - M.pick) < 0.08} />}</AbsoluteFill></Bg> }
	if (i === 1) { const o = 1 - clamp01((t - M.out) / 0.3)
		return <Bg><AbsoluteFill style={{ opacity: o }}><List t={t} picked /><Cursor x={lerp(t, C[0], 7.5, 1200, 1250)} y={lerp(t, C[0], 7.5, 560, 600)} s={1.3} /></AbsoluteFill>
			{t > M.out && <AbsoluteFill style={{ opacity: clamp01((t - M.out - 0.2) / 0.3) }}><Crumb s="代码与终端" /><Act y={110} s="你 用语音输入了一段话 · 刚刚" /><Act y={160} s="场景自动识别为 代码与终端 · 刚刚" ic={PUR} o={fade(t, 8.15, 99, 0.3)} /></AbsoluteFill>}</Bg> }
	if (i === 2 || i === 3) return <Thread t={t} />
	if (i === 4) return <Scenes t={t} />
	if (i === 5) return <Doc t={t} />
	if (i === 6) return <Reply t={t} />
	if (t < M.logo) return <Words t={t} />
	return <Lock t={t} />
}
