// Template 33 — structure of Linear "Introducing Pulse" (2025), MosMos content.
// White, type-led feature film for MosMos 会议记录: a big title, a macro push-in on the sidebar, a zoom out to the
// meeting feed, a line of big type whose last word keeps changing, the scrolling feed of meeting summaries, the
// meeting inbox and a summary page, a press on 「补充」 that becomes a phone close-up where a spoken line is added,
// a dark phone, then the feature name and the MosMos logo.
import React from "react"
import { AbsoluteFill } from "remotion"
import { CJK, lerp, clamp01, inOut, useT, Wave, LogoPixels, Wordmark, Cursor, path, typeAt, COPY } from "../_engine/src/mos"
import { Camera, CamKey } from "../_engine/src/kit"
import TL from "./timeline.json"

const M = TL.marks as Record<string, number>, C = TL.cuts as number[]
const BG = "#f6f6f6", W = "#ffffff", TX = "#1e1e1f", DIM = "#8b8b8f", LN = "#e7e7e9", GRN = "#3c9d5a", BLU = "#5e6ad2"
const fade = (t: number, a: number, b: number, d = 0.3, d2 = d) => clamp01((t - a) / d) * clamp01((b - t) / d2)

const Icon: React.FC<{ k: "in" | "hot" | "meet"; s: number; c?: string }> = ({ k, s, c = "#6b6b70" }) => {
	if (k === "meet") return <div style={{ width: s, height: s, display: "flex", alignItems: "center", justifyContent: "center" }}><Wave t={0} n={4} h={s * 0.8} color={c} /></div>
	if (k === "hot") return <div style={{ width: s, height: s, display: "flex", alignItems: "center", justifyContent: "center", fontSize: s * 0.95, fontWeight: 600, color: c, fontFamily: CJK }}>#</div>
	return <div style={{ width: s * 0.86, height: s * 0.62, margin: `${s * 0.19}px ${s * 0.07}px`, borderRadius: s * 0.12, boxShadow: `inset 0 0 0 ${s * 0.09}px ${c}` }} />
}
const Dot: React.FC<{ c: string; s?: number; ch?: string }> = ({ c, s = 34, ch = "" }) => <div style={{ width: s, height: s, borderRadius: s, background: c, color: "#fff", fontSize: s * 0.48, display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>{ch}</div>

// ---------- window (stage coords; seen through the camera in the opening) ----------
const WX = 160, WY = 150, WW = 1600, WH = 860, SB = 300
const NAV: [string, "in" | "hot" | "meet"][] = [["输入", "in"], ["热词", "hot"], ["会议", "meet"]]
const Window: React.FC<{ t: number }> = ({ t }) => {
	const sel = t > M.click
	return <div style={{ position: "absolute", left: WX, top: WY, width: WW, height: WH, borderRadius: 14, background: W, boxShadow: "0 0 0 1px #e4e4e6, 0 20px 60px rgba(0,0,0,.06)", overflow: "hidden", fontFamily: CJK, color: TX }}>
		<div style={{ position: "absolute", left: 0, top: 0, width: SB, height: WH, background: "#fafafa", borderRight: `1px solid ${LN}` }}>
			<div style={{ position: "absolute", left: 20, top: 18, display: "flex", gap: 8 }}>{["#ff5f57", "#febc2e", "#28c840"].map((c) => <div key={c} style={{ width: 12, height: 12, borderRadius: 6, background: c }} />)}</div>
			<div style={{ position: "absolute", left: 24, top: 64, display: "flex", alignItems: "center", gap: 10, fontSize: 16, fontWeight: 600 }}><LogoPixels size={18} t={t} mode="static" />MosMos <span style={{ color: DIM, fontWeight: 400 }}>▾</span></div>
			{NAV.map(([l, k], i) => <div key={l} style={{ position: "absolute", left: 18, top: 96 + i * 36, width: 264, height: 32, borderRadius: 7, display: "flex", alignItems: "center", gap: 10, paddingLeft: 12, fontSize: 15, background: i === 2 && sel ? "#ececee" : undefined, color: i === 2 && !sel ? "transparent" : TX }}>
				<Icon k={k} s={18} c={i === 2 ? "#4a4a4f" : "#6b6b70"} />{l}</div>)}
			<div style={{ position: "absolute", left: 30, top: 220, fontSize: 13, color: DIM }}>最近</div>
			{["首页改版周会", "交互稿评审", "品牌素材对齐"].map((l, i) => <div key={l} style={{ position: "absolute", left: 30, top: 248 + i * 32, fontSize: 15, color: "#55555a", display: "flex", gap: 10, alignItems: "center" }}><Dot c={["#7d8cd8", "#c79b5a", "#5aa58a"][i]} s={14} />{l}</div>)}
		</div>
		<div style={{ position: "absolute", left: SB, top: 0, right: 0, height: 52, borderBottom: `1px solid ${LN}`, display: "flex", alignItems: "center", gap: 10, paddingLeft: 24, fontSize: 15 }}>
			<b>会议</b>{["全部", "本周", "待办"].map((x, i) => <span key={x} style={{ padding: "4px 10px", borderRadius: 6, background: i === 0 ? "#efeff1" : undefined, color: i ? DIM : TX }}>{x}</span>)}
		</div>
		<div style={{ position: "absolute", left: SB + 40, top: 100, fontSize: 14, color: DIM }}>本周</div>
		<div style={{ position: "absolute", left: SB + 200, top: 92, width: 900 }}>
			<div style={{ fontSize: 22, fontWeight: 600 }}>首页改版周会</div>
			<div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: DIM, margin: "8px 0 16px" }}><span style={{ color: GRN }}>● 已整理</span><Dot c="#7d8cd8" s={18} ch="林" />林清禾 记录了一场会 · 32 分钟 · 3 位说话人</div>
			<div style={{ fontSize: 17, lineHeight: 1.75, color: "#3a3a3e" }}>{COPY.meetingConclusion}<br /><br />待办：{COPY.todos.join("；")}。<br /><br />{COPY.meeting[0][2]}{COPY.meeting[1][2]}</div>
			<div style={{ display: "flex", gap: 10, marginTop: 16, fontSize: 13, color: DIM }}>{["💬 2 条评论", "✓ 3 条待办"].map((x) => <span key={x} style={{ padding: "4px 10px", borderRadius: 14, boxShadow: `0 0 0 1px ${LN}` }}>{x}</span>)}</div>
			<div style={{ fontSize: 22, fontWeight: 600, marginTop: 44 }}>交互稿评审</div>
		</div>
	</div>
}
const Opening: React.FC<{ t: number }> = ({ t }) => {
	const k: CamKey[] = [[M.side, 6.3, 222, 316], [M.click - 0.4, 5.8, 214, 318], [M.click + 0.1, 5.8, 214, 318], [M.win + 0.6, 2.2, 538, 359], [M.text - 0.6, 2.08, 560, 362]]
	const blur = t > M.win ? 7 * Math.sin(Math.PI * clamp01((t - M.win) / 1.5)) : 0
	const c = path(t, [[M.side, 330, 520], [M.side + 0.5, 300, 470], [M.click - 0.15, 196, 197], [M.win + 0.4, 196, 197]])
	return <AbsoluteFill style={{ background: BG, opacity: fade(t, M.side, M.text + 0.3, 0.35, 0.55) }}>
		<Camera t={t} keys={k} blur={blur}>
			<Window t={t} />
			{t < M.win + 0.5 && <Cursor x={c.x} y={c.y} down={Math.abs(t - M.click) < 0.08} s={0.35} />}
		</Camera>
	</AbsoluteFill>
}
// ---------- title cards ----------
const Title: React.FC<{ t: number }> = ({ t }) => {
	const a = clamp01((t - M.t1) / 0.4), b = clamp01((t - M.t2) / 0.4), o = 1 - clamp01((t - M.side + 0.05) / 0.35)
	return <AbsoluteFill style={{ background: BG, alignItems: "center", justifyContent: "center" }}>
		<div style={{ display: "flex", alignItems: "center", gap: 34, fontFamily: CJK, fontSize: 104, fontWeight: 600, opacity: o, filter: o < 1 ? `blur(${(1 - o) * 8}px)` : undefined }}>
			<span style={{ color: "#5d5d61", opacity: a }}>介绍</span>
			<span style={{ opacity: b, transform: `translateX(${(1 - b) * 30}px)`, display: "flex", alignItems: "center", gap: 34 }}><span style={{ opacity: 0.55 }}><LogoPixels size={84} t={t} mode="static" /></span><span style={{ color: TX }}>MosMos 会议记录</span></span>
		</div>
	</AbsoluteFill>
}
const Words: React.FC<{ t: number }> = ({ t }) => {
	const W4 = ["周会", "评审会", "客户沟通", "一对一"], T4 = [M.text, M.w1, M.w2, M.w3]
	const i = T4.filter((x) => t >= x).length - 1, p = clamp01((t - T4[i]) / 0.3)
	const a = clamp01((t - M.text) / 0.4)
	return <AbsoluteFill style={{ background: W, alignItems: "center", justifyContent: "center" }}>
		<div style={{ fontFamily: CJK, fontSize: 104, fontWeight: 600, color: TX, display: "flex", opacity: a, transform: `translateY(${(1 - a) * 24}px)` }}>
			<span style={{ display: "inline-block", opacity: i ? p : 1, filter: i && p < 1 ? `blur(${(1 - p) * 10}px)` : undefined, transform: `translateY(${i ? (1 - p) * 40 : 0}px)` }}>{W4[i]}</span>
			<span>结束，总结就写好了</span>
		</div>
	</AbsoluteFill>
}
const Caught: React.FC<{ t: number }> = ({ t }) => <AbsoluteFill style={{ background: BG, alignItems: "center", justifyContent: "center" }}>
	{t < M.daily ? <div style={{ opacity: fade(t, M.caught, M.daily, 0.3), display: "flex", flexDirection: "column", alignItems: "center", gap: 22, fontFamily: CJK, fontSize: 40, color: DIM }}>
		<div style={{ width: 64, height: 64, borderRadius: 32, background: "#e3e3e6", display: "flex", alignItems: "center", justifyContent: "center", color: "#6b6b70", fontSize: 34 }}>✓</div>都整理好了</div>
		: <div style={{ opacity: fade(t, M.daily + 0.1, M.inbox + 0.1, 0.35, 0.3), fontFamily: CJK, fontSize: 104, fontWeight: 600, color: TX }}>会议一结束，总结和待办就来了</div>}
</AbsoluteFill>

// ---------- feed (1:1 scale) ----------
const Para: React.FC<{ children: React.ReactNode }> = ({ children }) => <div style={{ fontSize: 32, lineHeight: 1.62, color: "#3a3a3e", marginBottom: 26 }}>{children}</div>
const Head: React.FC<{ title: string; who: string; c: string; ch: string; st?: [string, string] }> = ({ title, who, c, ch, st = ["● 已整理", GRN] }) => <>
	<div style={{ fontSize: 42, fontWeight: 600, marginTop: 60 }}>{title}</div>
	<div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 28, color: DIM, margin: "14px 0 26px" }}><span style={{ color: st[1] }}>{st[0]}</span><Dot c={c} s={34} ch={ch} />{who}</div></>
const React2: React.FC = () => <div style={{ display: "flex", gap: 14, fontSize: 24, color: DIM, marginBottom: 10 }}>{["💬", "✓ 待办"].map((x) => <span key={x} style={{ padding: "6px 16px", borderRadius: 22, boxShadow: `0 0 0 1px ${LN}` }}>{x}</span>)}</div>
const Timeline: React.FC<{ t: number }> = ({ t }) => {
	const SP: [string, string, number[][]][] = [["说话人 1", "#7d8cd8", [[0, 0.16], [0.42, 0.55], [0.8, 0.9]]], ["说话人 2", "#c79b5a", [[0.18, 0.3], [0.57, 0.66]]], ["说话人 3", "#5aa58a", [[0.31, 0.4], [0.67, 0.78], [0.91, 1]]]]
	return <div style={{ margin: "10px 0 40px", height: 620, borderRadius: 22, background: "#f0f0f2", padding: 40 }}>
		<div style={{ height: 540, borderRadius: 16, background: "#19191b", color: "#e9e9ec", padding: "28px 34px", boxShadow: "0 20px 40px rgba(0,0,0,.18)" }}>
			<div style={{ display: "flex", justifyContent: "space-between", fontSize: 30, fontWeight: 600 }}><span>首页改版周会 · 说话人</span><span style={{ fontSize: 24, color: "#9c9ca3", fontWeight: 400 }}>▶ 逐字稿</span></div>
			<div style={{ marginTop: 34 }}>{SP.map(([n, c, seg], k) => <div key={n} style={{ display: "flex", alignItems: "center", gap: 24, height: 64 }}><span style={{ width: 150, fontSize: 24, color: "#b9b9c0" }}>{n}</span>
				<div style={{ position: "relative", flex: 1, height: 26, borderRadius: 13, background: "#26262a" }}>{seg.map(([a, b], j) => <div key={j} style={{ position: "absolute", left: `${a * 100}%`, width: `${(b - a) * 100 * clamp01((t - C[1] - 0.2 - k * 0.15 - j * 0.1) / 0.5)}%`, top: 0, height: 26, borderRadius: 13, background: c }} />)}</div></div>)}</div>
			<div style={{ marginTop: 26, borderTop: "1px solid #2e2e33" }}>{COPY.meeting.map(([n, tm, s], k) => <div key={n} style={{ display: "flex", gap: 24, fontSize: 22, height: 54, alignItems: "center", borderBottom: "1px solid #2e2e33" }}><Dot c={SP[k][1]} s={26} /><span style={{ width: 120, color: "#b9b9c0" }}>{n}</span><span style={{ width: 90, color: "#7d7d85" }}>{tm}</span><span>{s}</span></div>)}</div>
		</div>
	</div>
}
const TodoArt: React.FC = () => <div style={{ margin: "10px 0 40px", height: 600, borderRadius: 22, background: "#173d2c", position: "relative", overflow: "hidden" }}>
	{COPY.todos.map((x, k) => <div key={x} style={{ position: "absolute", left: 110 + k * 400, top: 120 + (k % 2) * 40, width: 360, height: 380, borderRadius: 18, background: ["#4fd16c", "#f07a5f", "#1f8f6f"][k], transform: `rotate(${[-6, 3, -2][k]}deg)`, padding: 34, boxShadow: "0 24px 40px rgba(0,0,0,.3)", color: k === 1 ? "#fff" : "#0f2a1e" }}>
		<div style={{ fontSize: 26, opacity: 0.8 }}>待办 {k + 1}</div><div style={{ fontSize: 44, fontWeight: 700, lineHeight: 1.3, marginTop: 16 }}>{x}</div><div style={{ fontSize: 24, marginTop: 30, opacity: 0.85 }}>{["周舟", "林清禾", "小林"][k]}</div></div>)}
</div>
const FEED_Y0 = 120
const Feed: React.FC<{ t: number }> = ({ t }) => {
	// scroll position (px): a short shot on the first entry, a cut, then one long scroll through the feed
	const y = t < C[1] ? lerp(t, C[0], C[1], 330, 380, (x) => x) : lerp(t, C[1], M.caught - 0.15, 820, 2700, (x) => 0.3 * x + 0.7 * inOut(x))
	return <AbsoluteFill style={{ background: W, fontFamily: CJK, color: TX, opacity: 1 - clamp01((t - M.caught + 0.45) / 0.45) }}>
		<div style={{ position: "absolute", left: 380, top: FEED_Y0 - y, width: 1380 }}>
			<Head title="首页改版周会" who="林清禾 记录了一场会 · 2 天前" c="#7d8cd8" ch="林" />
			<Para>{COPY.meetingConclusion}</Para>
			<Para>{COPY.meeting.map((m) => `${m[0]}：${m[2]}`).join(" ")}</Para>
			<Para>待办已经按负责人列好，3 条都带了时间。</Para>
			<React2 />
			<Head title="交互稿评审" who="小林 记录了一场会 · 3 天前" c="#c79b5a" ch="小" />
			<Timeline t={t} />
			<Head title="品牌素材对齐" who="周舟 记录了一场会 · 4 天前" c="#5aa58a" ch="周" st={["● 待确认", "#c58a2a"]} />
			<Para>品牌素材今天下午同步到群里；素材到位以后，周四开始做视觉方案。</Para>
			<Para>整理时去掉了口头禅和重复的话，人名、项目名按热词写法：林清禾、Nimbus、Figma。</Para>
			<React2 />
			<Head title="周一站会" who="小林 记录了一场会 · 5 天前" c="#c79b5a" ch="小" />
			<Para>本周重点是首页改版。交互稿周三前提交，视觉设计周四启动。</Para>
			<TodoArt />
			<React2 />
			<Head title="客户沟通 · 李经理" who="小林 记录了一场会 · 6 天前" c="#c79b5a" ch="小" />
			<Para>第一版方案周三前发给李经理，品牌素材今天发过来。</Para>
		</div>
		<div style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 96, background: "rgba(255,255,255,.96)", borderBottom: `1px solid ${LN}`, display: "flex", alignItems: "center", gap: 18, paddingLeft: 120, fontSize: 28 }}>
			<b>会议</b>{["全部", "本周", "待办"].map((x, i) => <span key={x} style={{ padding: "6px 16px", borderRadius: 8, background: i === 0 ? "#efeff1" : undefined, color: i ? DIM : TX }}>{x}</span>)}</div>
		<div style={{ position: "absolute", left: 120, top: 180, fontSize: 26, color: DIM }}>本周</div>
	</AbsoluteFill>
}
// ---------- inbox + summary page ----------
const ROWS: [string, string, string, string, boolean][] = [["首页改版周会", "总结已整理 · 3 条待办", "刚刚", "#1e1e1f", true], ["交互稿评审", "林清禾：交互稿周三前提交", "2 小时", "#c79b5a", true], ["品牌素材对齐", "周舟：素材今天下午同步到群里", "昨天", "#5aa58a", false], ["周一站会", "小林：本周重点是首页改版", "1 周", "#7d8cd8", false]]
const Inbox: React.FC<{ t: number }> = ({ t }) => {
	const s = lerp(t, M.inbox, M.iclick, 1.0, 1.05, inOut)
	return <div style={{ position: "absolute", inset: 0, transform: `scale(${s})`, transformOrigin: "900px 420px" }}>
		<div style={{ position: "absolute", left: 0, top: 0, width: 1540, height: 1080, background: W, borderRight: `1px solid ${LN}` }} />
		<div style={{ position: "absolute", left: 440, top: 262, fontSize: 40, fontWeight: 500 }}>会议记录 <span style={{ color: DIM, fontSize: 30 }}>···</span></div>
		{ROWS.map(([a, b, tm, c, unread], k) => <div key={a} style={{ position: "absolute", left: 392, top: 340 + k * 128, width: 1130, height: 120, borderRadius: 16, background: k === 0 ? "#ededef" : undefined, display: "flex", alignItems: "center", gap: 30, padding: "0 30px", boxSizing: "border-box" }}>
			<div style={{ width: 92, height: 92, borderRadius: 46, background: c, display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>{k === 0 ? <LogoPixels size={44} t={t} mode="static" invert /> : <span style={{ color: "#fff", fontSize: 40 }}>{["", "林", "周", "小"][k]}</span>}</div>
			<div style={{ flex: 1, lineHeight: 1.35 }}><div style={{ fontSize: 40, fontWeight: unread ? 600 : 400, color: unread ? TX : "#55555a" }}>{unread && <span style={{ color: BLU, fontSize: 28, marginRight: 14 }}>●</span>}{a}</div><div style={{ fontSize: 32, color: DIM }}>{b}</div></div>
			<div style={{ fontSize: 30, color: DIM }}>{tm}</div></div>)}
	</div>
}
const Doc: React.FC<{ t: number; x: number }> = ({ t, x }) => {
	const press = Math.abs(t - M.bclick) < 0.09
	return <div style={{ position: "absolute", left: x, top: 0, width: 1920, height: 1080, background: W, boxShadow: "-20px 0 60px rgba(0,0,0,.08)" }}>
		<div style={{ position: "absolute", left: 344, top: 180, fontSize: 46, fontWeight: 600 }}>首页改版周会 · 会议总结</div>
		<div style={{ position: "absolute", left: 1400, top: 176, display: "flex", alignItems: "center", gap: 16, transform: `scale(${press ? 0.95 : 1})` }}><div style={{ padding: "10px 22px", borderRadius: 12, boxShadow: `0 0 0 2px ${LN}`, fontSize: 30, display: "flex", gap: 12, alignItems: "center" }}><Wave t={t} n={4} h={26} color={TX} />补充</div><span style={{ fontSize: 30, color: DIM }}>Fn</span></div>
		<div style={{ position: "absolute", left: 344, top: 270, width: 1270, borderTop: `1px solid ${LN}` }} />
		<div style={{ position: "absolute", left: 344, top: 296, width: 1270, fontSize: 30, lineHeight: 1.6 }}>
			{[["会议背景", ["首页改版第二周，3 位说话人，32 分钟。"]], ["关键结论", [COPY.meetingConclusion]], ["待办", ["今天下午同步品牌素材 · 周舟", "周三前提交交互稿 · 林清禾", "周四启动视觉设计 · 小林"]]].map(([h, ls]) => <div key={h as string} style={{ marginBottom: 26 }}>
				<div style={{ fontSize: 26, color: DIM, marginBottom: 8 }}>{h as string}</div>{(ls as string[]).map((l) => <div key={l} style={{ color: "#333337" }}>• {l}</div>)}</div>)}
		</div>
	</div>
}
const Pages: React.FC<{ t: number }> = ({ t }) => {
	const dx = lerp(t, M.doc, M.doc + 0.5, 1920, 0, inOut)
	const c = path(t, [[M.inbox + 0.3, 1300, 900], [M.iclick - 0.15, 860, 420], [M.doc + 0.6, 900, 470], [M.bclick - 0.15, 1470, 210], [C[2], 1470, 210]])
	const down = Math.abs(t - M.iclick) < 0.08 || Math.abs(t - M.bclick) < 0.08
	return <AbsoluteFill style={{ background: BG, fontFamily: CJK, color: TX, opacity: clamp01((t - M.inbox) / 0.35) }}>
		<Inbox t={t} />
		{t > M.doc && <Doc t={t} x={dx} />}
		<Cursor x={c.x} y={c.y} down={down} s={1.4} />
	</AbsoluteFill>
}
// ---------- macro button → phone ----------
const ADD = ["补充：周四的视觉评审", "改到下午三点。"]
const Phone: React.FC<{ t: number; dark?: boolean }> = ({ t, dark }) => {
	const typed = typeAt(ADD.join("\n"), t, M.type, 11).s.split("\n")
	return <div style={{ position: "absolute", left: 580, top: 48, width: 732, height: 1500, borderRadius: 110, background: "#0d0d0e", padding: 20, boxSizing: "border-box", boxShadow: "0 30px 80px rgba(0,0,0,.25)" }}>
		<div style={{ width: "100%", height: "100%", borderRadius: 92, background: dark ? "#111" : W, overflow: "hidden", position: "relative", fontFamily: CJK, color: dark ? "#eee" : TX }}>
			<div style={{ position: "absolute", left: 260, top: 22, width: 172, height: 50, borderRadius: 25, background: "#000" }} />
			<div style={{ position: "absolute", left: 70, top: 34, fontSize: 26, fontWeight: 600 }}>9:41</div>
			<div style={{ position: "absolute", right: 64, top: 34, fontSize: 22 }}>▮▮▮ ◔</div>
			{!dark && <>
				<div style={{ position: "absolute", left: 50, top: 122, fontSize: 22, color: DIM }}>会议记录</div>
				<div style={{ position: "absolute", left: 50, top: 154, fontSize: 44, fontWeight: 700 }}>首页改版周会</div>
				<div style={{ position: "absolute", left: 520, top: 150, display: "flex", gap: 14 }}>
					<div style={{ width: 56, height: 56, borderRadius: 28, boxShadow: "inset 0 0 0 3px #d9d9dc", display: "flex", alignItems: "center", justifyContent: "center" }}><Wave t={t} live={t > M.type && t < M.out} n={4} h={22} color={TX} /></div>
					<div style={{ width: 56, height: 56, borderRadius: 28, background: TX, display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ width: 18, height: 18, borderRadius: 4, background: "#fff" }} /></div></div>
				<div style={{ position: "absolute", left: 50, top: 250, width: 592, fontSize: 26, lineHeight: 1.62 }}>
					<div style={{ textAlign: "right", fontWeight: 500, minHeight: 84 }}>{typed.map((l, i) => <div key={i}><span style={{ background: t > M.out ? "#eef0fb" : undefined, borderRadius: 6 }}>{l}</span></div>)}</div>
					<div style={{ color: "#3a3a3e", marginTop: 18 }}>关键结论：{COPY.meetingConclusion}</div>
					<div style={{ color: "#3a3a3e", marginTop: 18 }}>待办：<br />• 今天下午同步品牌素材 · 周舟<br />• 周三前提交交互稿 · 林清禾<br />• 周四启动视觉设计 · 小林</div>
					<div style={{ color: "#3a3a3e", marginTop: 18 }}>整理时去掉了口头禅和重复的话，人名、项目名按热词写法。</div>
				</div></>}
			{dark && <DarkHome t={t} />}
		</div>
	</div>
}
const DarkHome: React.FC<{ t: number }> = ({ t }) => <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg,#2a2b30,#101012 60%)" }}>
	<div style={{ position: "absolute", left: 44, top: 120, width: 290, height: 290, borderRadius: 40, background: "#1c1c1f", padding: 26, boxSizing: "border-box" }}>
		<div style={{ fontSize: 20, color: "#ff5b4f", fontWeight: 700 }}>星期三</div><div style={{ fontSize: 56, fontWeight: 300, lineHeight: 1.1 }}>16</div>
		{[["首页改版周会", "#c98f2a", "10:00"], ["交互稿评审", "#3c9d5a", "14:00"]].map(([a, c, tm]) => <div key={a} style={{ marginTop: 12, borderLeft: `5px solid ${c}`, paddingLeft: 10, fontSize: 20, lineHeight: 1.35 }}>{a}<br /><span style={{ color: "#a2a2a8" }}>{tm}</span></div>)}</div>
	<div style={{ position: "absolute", left: 358, top: 120, width: 290, height: 290, borderRadius: 40, background: "#1c1c1f", overflow: "hidden" }}>
		<div style={{ height: 64, background: "#e9b93a", color: "#222", fontSize: 22, fontWeight: 600, display: "flex", alignItems: "center", paddingLeft: 22 }}>笔记</div>
		<div style={{ padding: 22, fontSize: 21, lineHeight: 1.45 }}>首页改版周会总结<br /><span style={{ color: "#a2a2a8" }}>3 条待办，周三前交稿</span></div></div>
	<div style={{ position: "absolute", left: 44, top: 440, display: "grid", gridTemplateColumns: "repeat(4, 124px)", columnGap: 44, rowGap: 34 }}>
		{["#e8564f", "#f2a33a", "#47b26b", "#3d8bf2", "#8a5cf0", "#f06aa0", "#2fb3c0", "#9a9aa2", "#f2c94c", "#56c271", "#4f6df5", "#e0603a"].map((c, k) => <div key={k} style={{ textAlign: "center" }}><div style={{ width: 124, height: 124, borderRadius: 30, background: `linear-gradient(160deg, ${c}, ${c}aa)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 52, color: "#fff" }}>{["✉", "✎", "◐", "☁", "♪", "♥", "◎", "⚙", "★", "✓", "⌂", "☰"][k]}</div>
			<div style={{ fontSize: 20, color: "#ddd", marginTop: 8 }}>{["邮件", "笔记", "照片", "天气", "音乐", "健康", "地图", "设置", "收藏", "提醒", "家庭", "文件"][k]}</div></div>)}</div>
</div>
const Macro: React.FC<{ t: number }> = ({ t }) => {
	if (t < M.morph + 0.4 && t >= M.morph) return <AbsoluteFill><MacroPhone t={t} /><AbsoluteFill style={{ opacity: 1 - clamp01((t - M.morph) / 0.4), transform: `scale(${1 + clamp01((t - M.morph) / 0.4) * 0.5})` }}><MacroBtn t={t} /></AbsoluteFill></AbsoluteFill>
	return t < M.morph ? <MacroBtn t={t} /> : <MacroPhone t={t} />
}
const MacroBtn: React.FC<{ t: number }> = ({ t }) => {
	{
		const press = t > M.press - 0.06 && t < M.press + 0.14, z = lerp(t, C[2], M.morph, 1.0, 1.06, inOut)
		const c = path(t, [[C[2], 260, 1000], [M.press - 0.2, 930, 500], [M.morph, 930, 500]])
		return <AbsoluteFill style={{ background: BG, alignItems: "center", justifyContent: "center" }}>
			<div style={{ display: "flex", alignItems: "center", gap: 50, transform: `scale(${z * (press ? 0.95 : 1)})`, fontFamily: CJK }}>
				<div style={{ height: 136, padding: "0 50px", borderRadius: 28, background: W, boxShadow: `0 0 0 3px ${LN}`, display: "flex", alignItems: "center", gap: 30, fontSize: 72, color: TX }}><Wave t={t} live={t > M.press} n={4} h={64} color={TX} />补充</div>
				<span style={{ fontSize: 72, color: DIM }}>Fn</span></div>
			<Cursor x={c.x} y={c.y} down={press} s={2.2} />
		</AbsoluteFill>
	}
}
const MacroPhone: React.FC<{ t: number }> = ({ t }) => {
	const k: CamKey[] = [[M.morph, 4.0, 1226, 262], [M.out, 3.8, 1232, 262], [M.out + 0.9, 1.0, 960, 540], [C[3], 0.98, 960, 560]]
	return <AbsoluteFill style={{ background: W }}><Camera t={t} keys={k}><Phone t={t} /></Camera></AbsoluteFill>
}
const Dark: React.FC<{ t: number }> = ({ t }) => {
	const s = t < C[4] ? lerp(t, C[3], C[4], 1.02, 1.0, inOut) : lerp(t, C[4], M.mark, 1.0, 0.96)
	const o = t < C[4] ? 1 : 0.6 * (1 - clamp01((t - C[4]) / 0.5))
	return <AbsoluteFill style={{ background: W }}><div style={{ position: "absolute", inset: 0, transform: `scale(${s}) translateY(${t < C[4] ? lerp(t, C[3], C[4], 20, 0) : 0}px)`, opacity: o }}><Phone t={t} dark /></div></AbsoluteFill>
}
const End: React.FC<{ t: number }> = ({ t }) => {
	if (t < M.logo + 0.15) return <AbsoluteFill style={{ background: W, alignItems: "center", justifyContent: "center" }}>
		<div style={{ display: "flex", alignItems: "center", gap: 34, opacity: fade(t, M.mark, M.logo + 0.15, 0.5, 0.3), fontFamily: CJK, fontSize: 120, fontWeight: 600, color: TX }}><div style={{ width: 120, height: 120, borderRadius: 30, background: "linear-gradient(150deg,#d9d9de,#9a9aa2)", display: "flex", alignItems: "center", justifyContent: "center" }}><Wave t={0} n={4} h={62} color="#fff" /></div>会议记录</div>
	</AbsoluteFill>
	return <AbsoluteFill style={{ background: W, alignItems: "center", justifyContent: "center" }}>
		<div style={{ display: "flex", alignItems: "center", gap: 36, opacity: fade(t, M.logo, M.fade + 0.4, 0.35, 0.4) }}><LogoPixels size={130} t={t} mode="static" /><Wordmark size={112} color={TX} /></div>
	</AbsoluteFill>
}
export const Film: React.FC = () => {
	const t = useT()
	if (t < M.side) return <Title t={t} />
	if (t < M.text) return <AbsoluteFill style={{ background: BG }}><Title t={t} /><Opening t={t} /></AbsoluteFill>
	if (t < C[0]) return <AbsoluteFill style={{ background: BG }}><Opening t={t} /><AbsoluteFill style={{ opacity: clamp01((t - M.text + 0.25) / 0.3) }}><Words t={t} /></AbsoluteFill></AbsoluteFill>
	if (t < M.caught) return <AbsoluteFill style={{ background: BG }}><Feed t={t} /></AbsoluteFill>
	if (t < M.inbox) return <AbsoluteFill><Caught t={t} /></AbsoluteFill>
	if (t < C[2]) return <AbsoluteFill><Caught t={t} /><Pages t={t} /></AbsoluteFill>
	if (t < C[3]) return <Macro t={t} />
	if (t < M.mark) return <Dark t={t} />
	return <End t={t} />
}
