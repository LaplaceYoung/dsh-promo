import React from "react"
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion"

export const INK = "#0b0b0c", INK2 = "#131316", PAPER = "#ffffff", CARD = "#fdfdfd", S1 = "#fafafb", S2 = "#f4f4f5"
export const LINE = "#eaeaec", T2 = "#6e7075", T3 = "#8a8c90", T4 = "#b4b6ba", TXT = "#16171a"
export const ACC = "#2f5fa8"
export const SANS = "Geist, 'Noto Sans CJK SC', 'Noto Sans SC', sans-serif"
export const CJK = "'Noto Sans CJK SC', 'Noto Sans SC', Geist, sans-serif"
export const HEAVY = "'Noto Sans SC', 'Noto Sans CJK SC', Geist, sans-serif"  // variable 100–900 (OFL), installed by scripts/fetch-fonts.sh
export const MONO = "'Geist Mono', 'Noto Sans CJK SC', monospace"
export const out = Easing.bezier(0.16, 1, 0.3, 1)
export const inOut = Easing.bezier(0.65, 0, 0.35, 1)
export const inQ = Easing.bezier(0.55, 0, 0.9, 0.4)
export const lerp = (x: number, a: number, b: number, from: number, to: number, ease: (t: number) => number = out) =>
	interpolate(x, [a, b], [from, to], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease })
export const clamp01 = (x: number) => Math.max(0, Math.min(1, x))

/** Visible part of a string typed at `cps` chars/s from t0, optionally deleted from `del` at `dcps`. */
export function typeAt(text: string, t: number, t0: number, cps = 14, del?: number, dcps = 30): { s: string; typing: boolean; done: boolean } {
	const chars = Array.from(text)
	let n = t < t0 ? 0 : Math.floor((t - t0) * cps) + 1
	n = Math.max(0, Math.min(chars.length, n))
	if (del != null && t >= del) {
		n = Math.max(0, chars.length - (Math.floor((t - del) * dcps) + 1))
		return { s: chars.slice(0, n).join(""), typing: n > 0, done: n === 0 }
	}
	return { s: chars.slice(0, n).join(""), typing: n > 0 && n < chars.length, done: n === chars.length }
}
export const useT = () => { const f = useCurrentFrame(); const { fps } = useVideoConfig(); return f / fps }
export const Caret: React.FC<{ t: number; solid?: boolean; color?: string; h?: number; glow?: boolean }> = ({ t, solid, color = TXT, h = 1, glow }) => {
	const on = solid || Math.floor(t * 2.2) % 2 === 0
	return <span style={{ display: "inline-block", width: "0.06em", height: `${h}em`, marginLeft: "0.06em", verticalAlign: "-0.12em", background: color, opacity: on ? 1 : 0, boxShadow: glow ? `0 0 14px 3px ${color}` : undefined }} />
}

/** Typed line with an accent tail starting at char index accentFrom. */
export const TypedLine: React.FC<{ text: string; t: number; t0: number; cps?: number; del?: number; dcps?: number; accentFrom?: number; size: number; color?: string; accent?: string; weight?: number; caret?: boolean; font?: string }> = ({ text, t, t0, cps = 14, del, dcps = 30, accentFrom = 999, size, color = TXT, accent = ACC, weight = 700, caret = true, font = CJK }) => {
	const { s, typing } = typeAt(text, t, t0, cps, del, dcps)
	const a = Array.from(s)
	return (
		<div style={{ fontFamily: font, fontWeight: weight, fontSize: size, color, whiteSpace: "nowrap" }}>
			<span>{a.slice(0, accentFrom).join("")}</span>
			<span style={{ color: accent }}>{a.slice(accentFrom).join("")}</span>
			{caret && <Caret t={t} solid={typing} color={color} />}
		</div>
	)
}

export const Center: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
	<AbsoluteFill style={{ alignItems: "center", justifyContent: "center", ...style }}>{children}</AbsoluteFill>
)

/** waveform glyph like the site's pill icon */
export const Wave: React.FC<{ t: number; live?: boolean; n?: number; h?: number; color?: string; shimmer?: boolean }> = ({ t, live, n = 12, h = 30, color = "#fff", shimmer }) => {
	const base = [0.35, 0.6, 0.9, 0.55, 1, 0.7, 0.4, 0.85, 0.6, 0.95, 0.5, 0.3, 0.7, 0.45]
	return (
		<div style={{ display: "flex", alignItems: "center", gap: h * 0.13, height: h }}>
			{Array.from({ length: n }).map((_, i) => {
				let v = base[i % base.length]
				if (live) v = 0.25 + 0.75 * Math.abs(Math.sin(t * 9.3 + i * 1.7) * Math.cos(t * 4.1 + i * 0.6))
				let op = 1
				if (shimmer) { const p = (t * 1.6) % 1; op = 0.35 + 0.65 * Math.max(0, 1 - Math.abs(i / n - p) * 4); v = 0.45 }
				return <div key={i} style={{ width: h * 0.1, height: h * v, borderRadius: 4, background: color, opacity: op }} />
			})}
		</div>
	)
}

/** MosMos voice pill (recreated from the site's demo). */
export const Pill: React.FC<{ t: number; state: "语音输入" | "润色中" | "已写好" | string; sub?: string; scale?: number; live?: boolean; dark?: boolean }> = ({ t, state, sub = "风格：自动 · 简洁自然", scale = 1, live, dark = true }) => (
	<div style={{ transform: `scale(${scale})`, transformOrigin: "center", width: 400, height: 66, borderRadius: 999, background: dark ? INK : "#fff", boxShadow: "0 18px 40px rgba(0,0,0,.28), 0 0 0 1px rgba(255,255,255,.06) inset", display: "flex", alignItems: "center", padding: "0 18px 0 24px", gap: 18, fontFamily: CJK }}>
		<Wave t={t} live={live} shimmer={state === "润色中"} h={30} color={dark ? "#fff" : INK} />
		<div style={{ flex: 1, lineHeight: 1.25 }}>
			<div style={{ color: dark ? "#fff" : INK, fontSize: 17, fontWeight: 500 }}>{state}</div>
			<div style={{ color: "#9a9ca1", fontSize: 13 }}>{sub}</div>
		</div>
		<div style={{ width: 26, height: 26, borderRadius: 99, background: "#3a3b40", color: "#d0d1d4", fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: SANS }}>✕</div>
	</div>
)

export const RawBubble: React.FC<{ text: string; filler?: string; fillerFade?: number; w?: number; size?: number; t?: number; live?: boolean; caret?: boolean }> = ({ text, filler = "", fillerFade = 0, w = 760, size = 22, t = 0, live, caret }) => (
	<div style={{ width: w, borderRadius: 18, background: S2, padding: "20px 26px", display: "flex", gap: 16, alignItems: "flex-start", fontFamily: CJK, fontSize: size, color: "#2a2b30", lineHeight: 1.55, boxShadow: "0 1px 0 rgba(0,0,0,.03)" }}>
		<div style={{ paddingTop: size * 0.25 }}><Wave t={t} live={live} n={6} h={size * 0.95} color={"#3a3b40"} /></div>
		<div style={{ flex: 1 }}>
			{filler && <span style={{ color: T3, background: "rgba(0,0,0,.06)", borderRadius: 4, padding: "0 2px", textDecoration: fillerFade > 0 ? "line-through" : undefined, opacity: 1 - fillerFade * 0.6 }}>{filler}</span>}
			<span>{text}</span>
			{caret && <Caret t={t} solid color="#2a2b30" />}
		</div>
	</div>
)

export const InkBubble: React.FC<{ children: React.ReactNode; w?: number; size?: number; style?: React.CSSProperties }> = ({ children, w = 760, size = 22, style }) => (
	<div style={{ width: w, borderRadius: 18, background: INK, color: "#fff", padding: "22px 28px", fontFamily: CJK, fontSize: size, lineHeight: 1.6, whiteSpace: "pre-wrap", boxShadow: "0 20px 50px rgba(0,0,0,.18)", ...style }}>{children}</div>
)

export const Keycap: React.FC<{ label: string; t: number; press: number; size?: number; wide?: number; dark?: boolean }> = ({ label, t, press, size = 120, wide = 1, dark }) => {
	const d = Math.abs(t - press)
	const p = d < 0.12 ? 1 - d / 0.12 : 0
	return (
		<div style={{ width: size * wide, height: size, borderRadius: size * 0.2, background: dark ? "#1c1d21" : "#fff", border: `1px solid ${dark ? "#2e2f34" : LINE}`, boxShadow: `0 ${14 - p * 10}px ${30 - p * 18}px rgba(0,0,0,${dark ? 0.5 : 0.16}), inset 0 -${6 - p * 4}px 0 ${dark ? "#121215" : "#ececef"}`, transform: `translateY(${p * 8}px)`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: SANS, fontWeight: 600, fontSize: size * 0.3, color: dark ? "#fff" : INK }}>{label}</div>
	)
}

export const Cursor: React.FC<{ x: number; y: number; down?: boolean; s?: number }> = ({ x, y, down, s = 1 }) => (
	<div style={{ position: "absolute", left: x, top: y, transform: `scale(${(down ? 0.86 : 1) * s})`, transformOrigin: "4px 2px", filter: "drop-shadow(0 3px 5px rgba(0,0,0,.35))", zIndex: 50 }}>
		<svg width="40" height="40" viewBox="0 0 24 24"><path d="M4 2.5 L4 19.5 L8.6 15.3 L11.6 21.8 L14.6 20.5 L11.7 14.2 L18 14.2 Z" fill="#0b0b0c" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" /></svg>
	</div>
)
/** piecewise cursor path: keys [t, x, y] */
export function path(t: number, keys: [number, number, number][]) {
	if (t <= keys[0][0]) return { x: keys[0][1], y: keys[0][2] }
	for (let i = 0; i < keys.length - 1; i++) {
		const [ta, xa, ya] = keys[i], [tb, xb, yb] = keys[i + 1]
		if (t <= tb) { const p = inOut(clamp01((t - ta) / (tb - ta))); return { x: xa + (xb - xa) * p, y: ya + (yb - ya) * p } }
	}
	const k = keys[keys.length - 1]; return { x: k[1], y: k[2] }
}

export const Tex: React.FC<{ name: string; style?: React.CSSProperties }> = ({ name, style }) => (
	<Img src={staticFile(`tex-${name}.webp`)} style={{ position: "absolute", objectFit: "cover", ...style }} />
)

/** Window chrome (generic macOS-like, monochrome). */
export const Win: React.FC<{ w: number; h: number; dark?: boolean; title?: string; children?: React.ReactNode; style?: React.CSSProperties }> = ({ w, h, dark, title, children, style }) => (
	<div style={{ width: w, height: h, borderRadius: 22, overflow: "hidden", background: dark ? INK2 : "#fff", boxShadow: dark ? "0 40px 90px rgba(0,0,0,.55), 0 0 0 1px #26272c" : "0 40px 90px rgba(10,20,40,.18), 0 0 0 1px #e6e6e9", position: "relative", fontFamily: CJK, ...style }}>
		<div style={{ height: 46, display: "flex", alignItems: "center", padding: "0 18px", gap: 9, borderBottom: `1px solid ${dark ? "#232428" : LINE}` }}>
			{["#ff5f57", "#febc2e", "#28c840"].map((c) => <div key={c} style={{ width: 13, height: 13, borderRadius: 99, background: dark ? "#3a3b40" : "#dcdce0" }} />)}
			<div style={{ marginLeft: 14, fontSize: 14, color: dark ? "#8a8c90" : T3, fontFamily: CJK }}>{title}</div>
		</div>
		<div style={{ position: "absolute", top: 46, left: 0, right: 0, bottom: 0 }}>{children}</div>
	</div>
)
export const Bar: React.FC<{ w: number; h?: number; c?: string; style?: React.CSSProperties }> = ({ w, h = 12, c = "#e8e8eb", style }) => <div style={{ width: w, height: h, borderRadius: h / 2, background: c, ...style }} />

export const Chip: React.FC<{ label: string; active?: boolean; size?: number; dark?: boolean }> = ({ label, active, size = 18, dark }) => (
	<div style={{ padding: `${size * 0.45}px ${size * 0.95}px`, borderRadius: size * 0.5, fontFamily: CJK, fontSize: size, background: active ? (dark ? "#fff" : INK) : dark ? "#1c1d21" : "#fff", color: active ? (dark ? INK : "#fff") : dark ? "#c8c9cc" : "#3a3b40", border: `1px solid ${active ? "transparent" : dark ? "#2e2f34" : LINE}`, whiteSpace: "nowrap" }}>{label}</div>
)
export const SCENES = ["飞书 / 微信", "邮件", "文档", "提示词", "代码与终端"]

/** Real MosMos logo, tiled so its pixels can animate. */
import GRID from "./logo_grid.json"
export const LogoPixels: React.FC<{ size: number; t: number; mode: "in" | "spin" | "static"; invert?: boolean; t0?: number }> = ({ size, t, mode, invert, t0 = 0 }) => {
	const G = GRID as string[]
	const rows = G.length, cols = G[0].length
	const c = size / Math.max(rows, cols)
	const cells: React.ReactNode[] = []
	let k = 0
	for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
		if (G[y][x] !== "#") continue
		k++
		let dx = 0, dy = 0, op = 1, rot = 0, sc = 1
		if (mode === "in") {
			const seed = Math.sin(k * 91.7) * 43758.5, r = seed - Math.floor(seed)
			const st = t0 + r * 0.45, p = lerp(t, st, st + 0.5, 0, 1)
			dx = (1 - p) * (r - 0.5) * size * 2.2; dy = (1 - p) * (Math.cos(k * 3.1)) * size * 0.9; op = p; sc = 0.4 + 0.6 * p
		}
		if (mode === "spin") { const p = lerp(t, t0, t0 + 1.0, 0, 1, inOut); rot = p * 360; const dist = Math.sin(p * Math.PI); dx = (x - cols / 2) * c * dist * 0.6; dy = (y - rows / 2) * c * dist * 0.6 }
		cells.push(<div key={k} style={{ position: "absolute", left: x * c + dx, top: y * c + dy, width: c + 0.6, height: c + 0.6, background: invert ? "#fff" : INK, opacity: op, transform: `rotate(${rot}deg) scale(${sc})` }} />)
	}
	return <div style={{ position: "relative", width: cols * c, height: rows * c }}>{cells}</div>
}
/** Real app icon (PNG); pixels assemble onto the white tile when `assemble` is given. */
export const AppIcon: React.FC<{ size: number; t?: number; assemble?: number; spin?: number }> = ({ size, t = 0, assemble, spin }) => {
	const G = GRID as string[]
	const showPx = assemble != null && t < assemble + 1.0
	const pngOp = assemble == null ? 1 : lerp(t, assemble + 0.8, assemble + 1.0, 0, 1)
	const tile = assemble == null ? 1 : lerp(t, assemble, assemble + 0.35, 0, 1)
	const rot = spin != null ? lerp(t, spin, spin + 1.1, 0, 360, inOut) : 0
	const inner = size * (117 / 180), off = size * (33 / 180), offY = size * (21 / 180)
	const c = inner / G[0].length
	let k = 0
	return (
		<div style={{ position: "relative", width: size, height: size, transform: `perspective(800px) rotateY(${rot}deg)` }}>
			<div style={{ position: "absolute", inset: 0, borderRadius: size * 0.22, background: "#fff", transform: `scale(${tile})`, opacity: tile }} />
			{showPx && G.map((row, y) => Array.from(row).map((ch, x) => {
				if (ch !== "#") return null
				k++
				const seed = Math.sin(k * 91.7) * 43758.5, r = seed - Math.floor(seed)
				const st = assemble! + 0.1 + r * 0.4, p = lerp(t, st, st + 0.45, 0, 1)
				return <div key={`${x}-${y}`} style={{ position: "absolute", left: off + x * c + (1 - p) * (r - 0.5) * size * 3, top: offY + y * c + (1 - p) * Math.cos(k * 3.1) * size, width: c + 0.5, height: c + 0.5, background: INK, opacity: p * (1 - pngOp) }} />
			}))}
			<Img src={staticFile("mossec-logo.png")} style={{ position: "absolute", inset: 0, width: size, height: size, opacity: pngOp }} />
		</div>
	)
}
export const Wordmark: React.FC<{ size: number; color?: string; disperse?: number }> = ({ size, color = INK, disperse = 0 }) => (
	<div style={{ display: "flex", fontFamily: SANS, fontWeight: 600, fontSize: size, color, letterSpacing: "-0.02em" }}>
		{Array.from("MosMos").map((ch, i) => {
			const d = clamp01(disperse * 1.6 - i * 0.12)
			return <span key={i} style={{ display: "inline-block", transform: `translate(${d * (40 + i * 26)}px, ${d * Math.sin(i * 2.1) * 30}px)`, opacity: 1 - d, filter: d > 0.01 ? `blur(${d * 10}px)` : undefined }}>{ch}</span>
		})}
	</div>
)

/** Real copy from mosmos.io (zh), used by all templates. */
export const COPY = {
	tagline: "我们本来就会说，只是打字太久了。",
	slogan: "让文字，重新从声音开始",
	steps: [
		{ num: "01", title: "点击任何输入框", desc: "聊天、邮件、文档、终端，都不用离开当前应用。", key: "任意应用" },
		{ num: "02", title: "按一次 Fn，开始说", desc: "不用口述标点，也不用先在脑中组织成书面语。", key: "Fn" },
		{ num: "03", title: "再按一次，文字写好", desc: "自动匹配场景、应用词库、完成润色并粘贴。", key: "Fn" },
		{ num: "04", title: "Fn + Shift，记整场会", desc: "持续转录、区分说话人，结束后给出总结和待办。", key: "Fn + Shift" },
	],
	raw: "嗯，我觉得这个方案吧，这个方案可以先，先做一个小范围的测试，然后然后看看反馈，不对，是先收集一下反馈，再决定要不要，就是要不要全部上线。",
	polish: [
		{ id: "off", label: "关闭", hint: "原样直出，一个字不改" },
		{ id: "std", label: "标准", hint: "改善语法与语序", out: "我觉得这个方案可以先做一个小范围测试，收集反馈后，再决定要不要全部上线。" },
		{ id: "adv", label: "高级", hint: "重组为简洁成稿", out: "先小范围测试并收集反馈，再决定是否全面上线。" },
	],
	hot: [["请把", "请把", false], ["飞马", "Figma", true], ["里的", "里的", false], ["尼姆布斯", "Nimbus", true], ["文件发给", "文件发给", false], ["林清和", "林清禾", true]] as [string, string, boolean][],
	chatRaw: "第一版我们周三前给你，你先把品牌素材发我。",
	chatOut: "第一版周三前发你，你先把品牌素材给我就行。",
	mail: ["李经理，您好：", "第一版方案将在本周三前发给您。麻烦您今天将品牌素材发给我，收到后我会提前检查。", "谢谢！", "小林"],
	doc: [["目标：", "将首页上线时间提前至周五。"], ["结果：", "交互稿按时完成，但品牌素材晚到一天。"], ["下一步：", "今天确认视觉稿，明天开始开发。"]],
	prompt: ["请对比分析三款语音输入产品。", "重点维度：", "1. 场景识别", "2. 词库能力", "3. 会议记录", "输出要求：使用表格呈现差异，并给出 3 条产品改进建议。"],
	termAsk: "呃，帮我，在当前项目里查找包含 API_KEY 的文件。",
	termCmd: 'rg -l "API_KEY" .',
	meeting: [["说话人 1", "10:03", "第一版交互稿我会在周三之前完成。"], ["说话人 2", "10:05", "客户的品牌素材今天下午同步到群里。"], ["说话人 3", "10:07", "素材到位以后，周四开始做视觉方案。"]],
	todos: ["今天同步品牌素材", "周三前提交交互稿", "周四启动视觉设计"],
	meetingFeatures: [["多人逐字稿", "识别不同发言人，保留完整上下文。"], ["会议总结", "整理会议背景、参会人员与关键结论。"], ["待办事项", "提取明确行动项，有负责人和时间时一并保留。"]],
	platforms: ["macOS 15+ · Apple 芯片", "Windows 10 / 11 · 64 位"],
	url: "mosmos.io",
	heads: {
		scene: ["你在哪里说，", "决定我们怎么写。"],
		polish: ["保留多少原话，", "由你决定。"],
		hot: ["难认的词，", "教一次就够了。"],
		meeting: ["谁说了什么，", "接下来做什么。"],
		how: ["一个键，两种用法。"],
		download: ["现在，", "开口就好。"],
	},
	sceneDesc: "MosMos 根据当前应用自动选择表达方式，也可以随时切换。",
	polishDesc: "关闭、标准、高级三档可调。",
	hotDesc: "英文专有词、近音词和人名，加入词库后优先识别，润色时保持原样。",
	hotStatus: "我的热词 · 3 条已启用",
	meetingDesc: "区分不同发言人，保留完整逐字稿；会议结束后，继续整理总结和待办。",
	meetingConclusion: "首页交付计划保持不变，各环节将按素材、交互与视觉的顺序推进。",
	downloadDesc: "从语音输入，到会议总结和待办。",
	meta: "自然说出想法。MosMos 理解当前场景，把它写成可以直接使用的文字。",
	ios: "iOS 即将上线",
	scenes: [
		{ id: "chat", label: "飞书 / 微信", style: "风格：自动 · 简洁自然", filler: "呃，", raw: "第一版我们周三前给你，你先把品牌素材发我。", out: "第一版周三前发你，你先把品牌素材给我就行。" },
		{ id: "mail", label: "邮件", style: "风格：自动 · 完整专业", filler: "那个，", raw: "李经理您好，第一版方案我们周三前发给您，麻烦今天把品牌素材发我，收到以后我会提前检查。谢谢，小林。", out: "李经理，您好：\n\n第一版方案将在本周三前发给您。麻烦您今天将品牌素材发给我，收到后我会提前检查。\n\n谢谢！\n小林" },
		{ id: "writing", label: "文档", style: "风格：自动 · 结构清晰", filler: "嗯，", raw: "项目复盘，目标是把首页上线提前到周五，结果是交互稿按时完成，但是品牌素材晚了一天，下一步今天确认视觉稿，明天开始开发。", out: "项目复盘\n\n目标：将首页上线时间提前至周五。\n\n结果：交互稿按时完成，但品牌素材晚到一天。\n\n下一步：今天确认视觉稿，明天开始开发。" },
		{ id: "prompt", label: "提示词", style: "风格：自动 · 要求明确", filler: "嗯，帮我，", raw: "分析三款语音输入产品，重点看场景识别、词库和会议记录，最后用表格对比，再给三条改进建议。", out: "请对比分析三款语音输入产品。\n\n重点维度：\n1. 场景识别\n2. 词库能力\n3. 会议记录\n\n输出要求：使用表格呈现差异，并给出 3 条产品改进建议。" },
		{ id: "terminal", label: "代码与终端", style: "风格：自动 · 生成命令", filler: "呃，帮我，", raw: "在当前项目里查找包含 API_KEY 的文件。", out: 'rg -l "API_KEY" .', hint: "命令已生成 · 按 Enter 执行" },
	],
}
