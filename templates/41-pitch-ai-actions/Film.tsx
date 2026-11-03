// Template 41 — structure of Pitch "Introducing Pitch AI actions" (2025), MosMos content.
// Glossy purple-blue gradients with a translucent input bar, black title cards (outlined word boxes over a
// mountain photo, a serif word with orange dots, a retro window, huge type over a glitched sphere), a slide app
// with a yellow glow, an actions menu, progress pills, a mail modal, mono-type slides and the logo on 3D shapes.
import React from "react"
import { AbsoluteFill, Img, staticFile } from "remotion"
import { CJK, MONO, lerp, clamp01, inOut, useT, LogoPixels, Wordmark, Wave, Cursor, path, typeAt, COPY } from "../_engine/src/mos"
import TL from "./timeline.json"
const SERIF = "'Noto Serif CJK SC', 'Noto Serif SC', serif"

const M = TL.marks as Record<string, number>, C = TL.cuts as number[]
const INK = "#16131f", PUR = "#5b2be0", CREAM = "#eeeae1"
const fade = (t: number, a: number, b: number, d = 0.3, d2 = d) => clamp01((t - a) / d) * clamp01((b - t) / d2)
const RAW1 = "嗯，帮我做一份介绍首页改版的幻灯片，重点讲三个改动", OUT1 = "请制作一份介绍首页改版的幻灯片，重点讲三个主要改动。"

const Grad: React.FC<{ t: number; v?: number; children?: React.ReactNode }> = ({ t, v = 0, children }) => <AbsoluteFill style={{ background: "#7a5cf0", overflow: "hidden" }}>
	<AbsoluteFill style={{ filter: "blur(90px)" }}>
		<div style={{ position: "absolute", left: -300 + 200 * Math.sin(t * 0.4 + v), top: -200, width: 1300, height: 1100, borderRadius: "50%", background: "#5a2fe8" }} />
		<div style={{ position: "absolute", left: 900 + 200 * Math.cos(t * 0.3 + v), top: 100, width: 1200, height: 900, borderRadius: "50%", background: "#58b4ff" }} />
		<div style={{ position: "absolute", left: 400 + 300 * Math.sin(t * 0.25 + v * 2), top: 600, width: 1200, height: 700, borderRadius: "50%", background: "#e46ad9", opacity: 0.85 }} />
		<div style={{ position: "absolute", left: 1300, top: -300, width: 900, height: 700, borderRadius: "50%", background: "#d9d6ff", opacity: 0.8 }} /></AbsoluteFill>{children}</AbsoluteFill>
const Pill: React.FC<{ w: number; x?: number; y?: number; h?: number; fs?: number; children: React.ReactNode; btn?: boolean; down?: boolean; light?: boolean; blur?: number }> = ({ w, x = 960 - w / 2, y = 470, h = 140, fs = 46, children, btn = true, down, light, blur = 0 }) =>
	<div style={{ position: "absolute", left: x, top: y, width: w, height: h, borderRadius: h * 0.28, background: light ? "rgba(255,255,255,.9)" : "rgba(255,255,255,.14)", boxShadow: light ? "0 10px 40px rgba(40,20,120,.18)" : "inset 0 0 0 2px rgba(255,255,255,.22)", backdropFilter: "blur(10px)", display: "flex", alignItems: "center", gap: fs * 0.5, padding: `0 ${fs * 0.7}px`, boxSizing: "border-box", fontFamily: CJK, fontSize: fs, color: light ? INK : "#fff", fontWeight: 500, filter: blur ? `blur(${blur}px)` : undefined, whiteSpace: "nowrap", overflow: "hidden" }}>
		<div style={{ flex: 1, display: "flex", alignItems: "center", gap: fs * 0.4, overflow: "hidden" }}>{children}</div>
		{btn && <div style={{ width: h * 0.42, height: h * 0.42, borderRadius: light ? h * 0.08 : h * 0.21, background: light ? PUR : "#fff", color: light ? "#fff" : PUR, display: "flex", alignItems: "center", justifyContent: "center", fontSize: fs * 0.7, transform: `scale(${down ? 0.88 : 1})`, flexShrink: 0 }}>↑</div>}</div>
const Menu: React.FC<{ x: number; y: number; s?: number; hi?: number; items: string[] }> = ({ x, y, s = 1, hi = 0, items }) => <div style={{ position: "absolute", left: x, top: y, width: 640 * s, borderRadius: 18 * s, background: "#fff", boxShadow: "0 20px 50px rgba(30,10,90,.22)", fontFamily: CJK, padding: `${12 * s}px 0`, color: INK }}>
	<div style={{ display: "flex", gap: 10 * s, padding: `${6 * s}px ${16 * s}px ${12 * s}px`, fontSize: 22 * s }}>{["全部", "场景", "润色", "热词"].map((x, k) => <span key={x} style={{ padding: `${6 * s}px ${14 * s}px`, borderRadius: 10 * s, background: k === 0 ? "#efeef4" : undefined, color: k ? "#666" : INK }}>{x}</span>)}</div>
	{items.map((x, k) => <div key={x} style={{ display: "flex", alignItems: "center", gap: 18 * s, padding: `${12 * s}px ${20 * s}px`, fontSize: 28 * s, background: k === hi ? "#f1f0f6" : undefined }}>
		<div style={{ width: 40 * s, height: 40 * s, borderRadius: 10 * s, background: ["#7d5cf5", "#e66fd2", "#4b8cff", "#9a7af0", "#6a6a80"][k % 5], opacity: 0.85 }} /><span style={{ flex: 1 }}>{x}</span>{k === hi && <span style={{ fontSize: 22 * s, color: "#888" }}>Fn</span>}</div>)}</div>
const MENU = ["按文档场景写", "润色：标准", "润色：高级", "加入热词…", "按邮件场景写"]
const Slide: React.FC<{ w: number; x: number; y: number; title: React.ReactNode; body?: string; glow?: number; kind?: number }> = ({ w, x, y, title, body, glow = 0, kind = 0 }) => { const s = w / 1000
	return <div style={{ position: "absolute", left: x, top: y, width: w, height: w * 0.5625, background: kind === 2 ? "#4a1fd0" : CREAM, borderRadius: 10 * s, overflow: "hidden", boxShadow: glow ? `0 0 ${200 * s}px ${80 * s}px rgba(255,236,80,${0.6 * glow})` : "0 4px 20px rgba(0,0,0,.08)", fontFamily: kind === 2 ? MONO : SERIF, color: kind === 2 ? "#fff" : INK }}>
		{kind === 0 && <div style={{ position: "absolute", right: -80 * s, top: 200 * s, width: 560 * s, height: 560 * s, background: "#2a2420", transform: "rotate(-28deg)" }} />}
		<div style={{ position: "absolute", left: 70 * s, top: 70 * s, fontSize: 20 * s, fontFamily: CJK, opacity: 0.6 }}>首页改版 · 2026</div>
		<div style={{ position: "absolute", left: 70 * s, top: 130 * s, width: 600 * s, fontSize: (kind === 2 ? 52 : 66) * s, fontStyle: kind ? "normal" : "italic", lineHeight: 1.2 }}>{title}</div>
		{body && <div style={{ position: "absolute", left: 70 * s, top: 360 * s, width: 520 * s, fontSize: 24 * s, fontFamily: CJK, lineHeight: 1.6, opacity: 0.8 }}>{body}</div>}</div> }
const Deck: React.FC<{ t: number; glow: number }> = ({ t, glow }) => <div style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 1080, background: "#f7f7fa" }}>
	<div style={{ position: "absolute", left: 760, top: 160, width: 400, height: 760, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(255,240,90,.85), rgba(255,240,90,0))", opacity: glow }} />
	<div style={{ position: "absolute", left: 160, top: 120, fontFamily: CJK, fontSize: 30, fontWeight: 700, color: INK }}>● 首页改版</div>
	{[["Fn", "按一次 Fn，开始说"], ["logo", "说完，文字写好"], ["wave", "三个主要改动"]].map(([k, cap], j) => <div key={j} style={{ position: "absolute", left: 160 + j * 560, top: 240, width: 500, height: 560, borderRadius: 8, background: j === 1 ? `rgba(255,248,170,${0.4 + 0.6 * glow})` : "#fff", boxShadow: "0 0 0 2px #2a2a2a" }}>
		<div style={{ position: "absolute", left: 30, right: 30, top: 30, height: 300, background: j === 1 ? "#111" : "#f1f1f4", display: "flex", alignItems: "center", justifyContent: "center" }}>
			{k === "Fn" && <div style={{ width: 150, height: 150, borderRadius: 26, background: "#fff", boxShadow: "0 8px 0 #c9c9cf, 0 0 0 2px #bbb", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: CJK, fontSize: 64, fontWeight: 700 }}>Fn</div>}
			{k === "logo" && <LogoPixels size={150} t={t} mode="static" invert />}{k === "wave" && <div style={{ padding: "26px 40px", borderRadius: 50, background: INK }}><Wave live t={t} n={7} h={50} color="#fff" /></div>}</div>
		<div style={{ position: "absolute", left: 30, top: 360, fontFamily: MONO, fontSize: 30, color: INK }}>{cap}</div>
		<div style={{ position: "absolute", left: 30, top: 420, width: 420, fontFamily: CJK, fontSize: 22, color: "#666", lineHeight: 1.5 }}>{[COPY.steps[1].desc, COPY.steps[2].desc, COPY.polishDesc][j]}</div></div>)}</div>
const Sphere: React.FC<{ t: number }> = ({ t }) => <div style={{ position: "absolute", left: 820, top: 80, width: 900, height: 900 }}>
	{Array.from({ length: 18 }, (_, k) => <div key={k} style={{ position: "absolute", left: 0, top: k * 50, width: 900, height: 50, overflow: "hidden" }}><div style={{ position: "absolute", left: Math.sin(t * 9 + k * 1.7) * (k % 3 === 0 ? 40 : 8), top: -k * 50, width: 900, height: 900, borderRadius: "50%", background: "radial-gradient(circle at 35% 30%, #e8f0ff, #9bb4e6 45%, #2b3760 80%)" }} /></div>)}</div>
const Cut = (t: number, c: number) => clamp01((t - c) / 0.35)

const scene = (t: number): React.ReactElement => {
	const i = C.filter((c) => t >= c).length
	switch (i) {
		case 0: return <Grad t={t}><Pill w={1500} y={465} h={150} fs={58} down={Math.abs(t - M.c0) < 0.1}><span style={{ opacity: 0.7 }}>＋</span>{typeAt("谁都可以开口说", t, 0.3, 6).s}</Pill>
			{t > M.c0 - 0.6 && <Cursor x={lerp(t, M.c0 - 0.6, M.c0, 1800, 1640, inOut)} y={lerp(t, M.c0 - 0.6, M.c0, 760, 560, inOut)} s={1.6} down={Math.abs(t - M.c0) < 0.1} />}</Grad>
		case 1: { const z = lerp(t, M.zin, C[1], 1, 2.3, inOut)
			return <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 130%, #4a2bd0 0%, #0a0714 55%)", overflow: "hidden" }}><AbsoluteFill style={{ alignItems: "center", justifyContent: "center", transform: `scale(${z})`, transformOrigin: "70% 50%" }}>
				<div style={{ fontFamily: CJK, fontSize: 66, color: "#fff", opacity: clamp01((t - C[0] - 0.2) / 0.4) }}><span style={{ opacity: 0.85 }}>但不是每句话，</span><b>都能直接用。</b></div></AbsoluteFill></AbsoluteFill> }
		case 2: { const box = (s: string, x: number, y: number) => <div style={{ position: "absolute", left: x, top: y, padding: "6px 26px", boxShadow: "inset 0 0 0 4px #fff", borderRadius: 18, fontFamily: CJK, fontSize: 130, color: "#fff", whiteSpace: "nowrap" }}>{s}</div>
			return <AbsoluteFill style={{ background: "#2a2c4a", overflow: "hidden" }}><Img src={staticFile("t41-mountain.webp")} style={{ position: "absolute", left: lerp(t, C[1], C[2], -40, -120), top: -260, width: 2100 }} />
				<div style={{ position: "absolute", left: 0, right: 0, top: 660, bottom: 0, background: "#2a2c4a" }} />
				{box("能直接用的", 40, 680)}<div style={{ position: "absolute", left: 750, top: 775, width: 140, height: 4, background: "#fff" }} />{box("文字", 890, 680)}
				<div style={{ position: "absolute", left: 1560, top: 790, width: 4, height: 90, background: "#fff", opacity: clamp01((t - C[1] - 0.8) / 0.2) }} /><div style={{ opacity: clamp01((t - C[1] - 0.9) / 0.2) }}>{box("应该", 1400, 870)}</div>
				<div style={{ position: "absolute", left: 1020, top: 990, fontFamily: CJK, fontSize: 26, color: "#fff" }}>2026</div></AbsoluteFill> }
		case 3: return <AbsoluteFill style={{ background: "#000", overflow: "hidden" }}><div style={{ position: "absolute", left: 230, top: 150, width: 1460, height: 790, boxShadow: "inset 0 0 0 2px #888" }} />
			{[[1080, 80, 150], [440, 560, 150], [1690, 880, 150]].map(([x, y, r], k) => <div key={k} style={{ position: "absolute", left: x - r, top: y - r, width: r * 2, height: r * 2, borderRadius: r, background: "#f2602a" }} />)}
			<div style={{ position: "absolute", left: 0, right: 0, top: 430, textAlign: "center", fontFamily: SERIF, fontWeight: 700, fontSize: 170, color: "#fff" }}>通顺</div>
			<div style={{ position: "absolute", left: 270, top: 180, fontFamily: CJK, fontSize: 20, color: "#aaa" }}>MosMos · 润色</div><div style={{ position: "absolute", left: 1500, top: 180, fontFamily: CJK, fontSize: 20, color: "#aaa" }}>第 1 项</div></AbsoluteFill>
		case 4: return <AbsoluteFill style={{ background: "#f3efe3" }}><div style={{ position: "absolute", left: 100, top: 160, width: 1720, height: 760, background: "#efebe1", boxShadow: "inset 0 0 0 5px #222" }}>
			<div style={{ height: 40, borderBottom: "5px solid #222", background: "repeating-linear-gradient(0deg,#222 0 3px,transparent 3px 8px)" }} />
			<div style={{ position: "absolute", left: 0, right: 0, top: 250, textAlign: "center", fontFamily: SERIF, fontSize: 112, color: INK }}>像你写的</div>
			<div style={{ position: "absolute", left: 610, top: 470, width: 500, height: 40, boxShadow: "inset 0 0 0 4px #222" }}><div style={{ width: `${lerp(t, C[3], C[4], 15, 70)}%`, height: "100%", background: "#222" }} /></div></div></AbsoluteFill>
		case 5: return <AbsoluteFill style={{ background: "#000", overflow: "hidden" }}><Sphere t={t} /><div style={{ position: "absolute", left: 40, top: 150, fontFamily: CJK, fontSize: 300, lineHeight: 1.08, color: "#e9e9ee", fontWeight: 300 }}>也合<br />场景</div></AbsoluteFill>
		case 6: { if (t >= M.win) { const a = Cut(t, M.win)
				return <Grad t={t} v={1}><div style={{ position: "absolute", left: 300, top: 180, width: 1320, height: 742, borderRadius: 18, overflow: "hidden", opacity: a, transform: `scale(${0.96 + 0.04 * a})`, boxShadow: "0 30px 80px rgba(30,10,90,.3)" }}><div style={{ transform: "scale(0.6875)", transformOrigin: "0 0" }}><Deck t={t} glow={0.6} /></div></div>
					<Menu x={560} y={640} s={0.6} items={MENU} hi={0} /></Grad> }
			const out = t > M.out1, s = out ? OUT1 : typeAt(RAW1, t, M.d1, 11).s, cl = t > M.clear
			return <Grad t={t} v={1}><Pill w={1320} y={470} h={140} fs={42} down={Math.abs(t - M.click1) < 0.1} blur={t > 17.0 ? lerp(t, 17.0, 17.6, 0, 6) : 0}>
				{!cl ? <><div style={{ padding: "8px 16px", borderRadius: 30, background: "rgba(255,255,255,.2)", flexShrink: 0 }}><Wave live={!out} t={t} n={5} h={26} color="#fff" /></div><span style={{ opacity: out ? fade(t, M.out1, M.clear, 0.2, 0.2) : 1 }}>{s.length > 26 ? "…" + s.slice(-25) : s}</span></> : <span style={{ opacity: 0.6 }}>说点什么…</span>}</Pill>
				{t > M.click1 - 0.8 && t < M.clear + 0.5 && <Cursor x={lerp(t, M.click1 - 0.8, M.click1, 1800, 1560, inOut)} y={lerp(t, M.click1 - 0.8, M.click1, 760, 560, inOut)} s={1.6} down={Math.abs(t - M.click1) < 0.1} />}
				{out && !cl && <div style={{ position: "absolute", left: 300, top: 650, fontFamily: CJK, fontSize: 30, color: "#fff", opacity: 0.85 }}>提示词 · 要求明确</div>}</Grad> }
		case 7: return <AbsoluteFill style={{ overflow: "hidden" }}><div style={{ transform: "scale(1.7) translate(-330px, -200px)", transformOrigin: "0 0" }}><Deck t={t} glow={1} /></div><Menu x={560} y={420} s={1.6} items={MENU} hi={2} /></AbsoluteFill>
		case 8: { const ok = t > M.hotOk
			return <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 40%, #3a3a40 0%, #0b0b0d 70%)", overflow: "hidden" }}>
				<div style={{ position: "absolute", left: 560, top: 120, width: 800, height: 800, borderRadius: 120, background: "linear-gradient(160deg,#2c2c31,#121215)", boxShadow: "0 50px 0 #050506, inset 0 0 0 4px #3a3a40", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: CJK, fontSize: 330, fontWeight: 700, color: "#d8d8de", transform: `scale(${lerp(t, C[7], C[8], 1, 1.06)})` }}>Fn</div>
				<Pill w={1190} x={100} y={680} h={120} fs={40} light btn={false}><div style={{ width: 52, height: 52, borderRadius: 12, background: "linear-gradient(135deg,#7d5cf5,#e66fd2)", flexShrink: 0 }} />{ok ? "已加入热词：Nimbus" : t > M.hot ? `正在加入热词：${typeAt("Nimbus", t, M.hot, 5).s}` : "加入热词…"}<span style={{ flex: 1 }} /><div style={{ width: 52, height: 52, borderRadius: 12, background: PUR, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30 }}>{ok ? "✓" : "■"}</div></Pill></AbsoluteFill> }
		case 9: case 11: case 13: { const z = i === 13 ? lerp(t, C[12], C[13], 1.05, 0.92) : 0.92
			return <AbsoluteFill style={{ background: "#f7f7fa", overflow: "hidden" }}><div style={{ transform: `scale(${z})`, transformOrigin: "50% 50%" }}><Deck t={t} glow={1} /></div>
				{i === 9 && <Pill w={560} x={680} y={960} h={80} fs={26} light btn={false}><span style={{ color: "#1f8a6a" }}>✓</span>已加入热词：Nimbus</Pill>}</AbsoluteFill> }
		case 10: return <AbsoluteFill style={{ overflow: "hidden" }}><div style={{ transform: "scale(1.55) translate(-60px, -120px)", transformOrigin: "0 0" }}><Deck t={t} glow={1} /></div><Menu x={40} y={170} s={1.2} items={MENU} hi={3} /></AbsoluteFill>
		case 12: return <AbsoluteFill style={{ overflow: "hidden" }}><div style={{ transform: `scale(${lerp(t, C[11], C[12], 2.4, 2.5)}) translate(-690px, -230px)`, transformOrigin: "0 0" }}><Deck t={t} glow={1} /></div></AbsoluteFill>
		case 14: { if (t < M.slide2) return <Grad t={t} v={2}><Pill w={900} y={480} h={110} fs={36} btn={false} blur={4}><span style={{ opacity: 0.6 }}>说点什么…</span></Pill></Grad>
			const a = Cut(t, M.slide2)
			return <Grad t={t} v={2}><div style={{ opacity: a, transform: `scale(${0.95 + 0.05 * a})` }}><Slide w={1100} x={410} y={240} title={<>每句话，<br /><b>都能直接用。</b></>} body={COPY.meta} /><Menu x={540} y={680} s={0.55} items={MENU} hi={0} /></div></Grad> }
		case 15: return <AbsoluteFill style={{ background: CREAM, overflow: "hidden" }}><Slide w={3000} x={-500} y={-300} title={<>每句话，<br /><b>都能直接用。</b></>} /><Menu x={760} y={280} s={1.6} items={MENU} hi={1} /></AbsoluteFill>
		case 16: { const s = typeAt("改成写给客户看的版本", t, M.d2, 5).s
			return <AbsoluteFill style={{ background: CREAM, overflow: "hidden" }}><div style={{ position: "absolute", right: -400, top: 400, width: 1400, height: 1400, background: "#2a2420", transform: "rotate(-28deg)" }} />
				<div style={{ position: "absolute", left: -100, top: 300, width: 1900, height: 390, borderRadius: 40, background: "#fff", boxShadow: "0 0 0 6px #8b6ef5, 0 20px 60px rgba(0,0,0,.15)", fontFamily: CJK }}>
					<div style={{ position: "absolute", left: 160, top: 50, fontSize: 60, color: "#666" }}>‹ 按场景润色…</div><div style={{ position: "absolute", right: 60, top: 50, fontSize: 48, color: "#888" }}>返回 <span style={{ padding: "4px 14px", background: "#eee", borderRadius: 10 }}>Esc</span></div>
					<div style={{ position: "absolute", left: 160, top: 210, fontSize: 66, color: INK }}>{s}<span style={{ borderLeft: "4px solid #111", marginLeft: 4 }} /></div>
					<div style={{ position: "absolute", right: 60, top: 200, width: 110, height: 110, borderRadius: 24, background: PUR, color: "#fff", fontSize: 60, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${Math.abs(t - M.click2) < 0.1 ? 0.9 : 1})` }}>↑</div></div>
				{t > M.click2 - 0.8 && <Cursor x={lerp(t, M.click2 - 0.8, M.click2, 1900, 1790, inOut)} y={lerp(t, M.click2 - 0.8, M.click2, 900, 600, inOut)} s={3} down={Math.abs(t - M.click2) < 0.1} />}</AbsoluteFill> }
		case 17: case 18: { const done = i === 18
			return <AbsoluteFill style={{ background: done ? "linear-gradient(90deg,#f3f2f6,#fff 50%,#e9e6fb)" : CREAM, overflow: "hidden" }}>{!done && <div style={{ position: "absolute", right: -300, top: -200, width: 1200, height: 900, background: "#2a2420", transform: "rotate(-28deg)" }} />}
				<Pill w={done ? 1060 : 930} y={done ? 480 : 520} h={done ? 140 : 120} fs={done ? 52 : 40} light btn={!done}>{done ? <><span style={{ color: "#1f8a6a" }}>✓</span>已写好</> : <><Wave live t={t} n={4} h={26} color={PUR} />MosMos 正在润色…</>}</Pill></AbsoluteFill> }
		case 19: return <AbsoluteFill style={{ background: "#f4f2ec" }}><Slide w={1400} x={260} y={130} title={<>第一版方案，<br /><b>本周三前发给您。</b></>} body="麻烦您今天将品牌素材发给我，收到后我会提前检查。" />
			<Pill w={520} x={460} y={850} h={70} fs={24} light btn={false}><span style={{ color: "#1f8a6a" }}>✓</span>已按邮件场景润色</Pill></AbsoluteFill>
		case 20: { if (t < M.modal) return <Grad t={t} v={3}><Pill w={900} y={480} h={110} fs={36} btn={false} blur={lerp(t, C[19], M.modal, 0, 8)}><span style={{ opacity: 0.6 }}>说点什么…</span></Pill></Grad>
			const a = Cut(t, M.modal), c = path(t, [[M.modal, 1500, 900], [M.save - 0.3, 1330, 815], [C[20], 1350, 830]])
			return <Grad t={t} v={3}><div style={{ position: "absolute", left: 460, top: 170, width: 1000, height: 720, borderRadius: 20, background: "#fff", boxShadow: "0 30px 80px rgba(30,10,90,.25)", fontFamily: CJK, color: INK, opacity: a, transform: `scale(${0.96 + 0.04 * a})` }}>
				<div style={{ display: "flex", justifyContent: "space-between", padding: "34px 44px 10px", fontSize: 34, fontWeight: 700 }}><span>邮件 · 正式</span><span style={{ color: "#999" }}>×</span></div>
				<div style={{ padding: "0 44px", fontSize: 22, color: "#888" }}>{COPY.scenes[1].style}</div>
				<div style={{ margin: "26px 44px", padding: "26px 30px", borderRadius: 14, background: "#f6f5fa", fontSize: 26, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{COPY.scenes[1].out}</div>
				<div style={{ position: "absolute", right: 44, bottom: 34, display: "flex", gap: 16, fontSize: 24 }}><span style={{ padding: "12px 24px" }}>取消</span><span style={{ padding: "12px 26px", borderRadius: 10, background: PUR, color: "#fff", transform: `scale(${Math.abs(t - M.save) < 0.1 ? 0.92 : 1})` }}>保存</span></div></div>
				<Cursor x={c.x} y={c.y} s={1.4} down={Math.abs(t - M.save) < 0.1} /></Grad> }
		case 21: case 22: { const app = t > M.app
			if (!app) return <AbsoluteFill style={{ background: "#fff", fontFamily: CJK }}><div style={{ position: "absolute", left: 160, top: 160, width: 1600, fontSize: 52, lineHeight: 1.7, color: INK, whiteSpace: "pre-wrap", transform: `translateY(${lerp(t, C[20], M.app, 0, -80)}px)` }}>{COPY.scenes[1].out}</div></AbsoluteFill>
			const c = path(t, [[M.app, 1300, 900], [C[22], 760, 640]])
			return <Grad t={t} v={4}><div style={{ position: "absolute", left: 260, top: 140, width: 1400, height: 800, borderRadius: 18, background: "#fff", boxShadow: "0 30px 80px rgba(30,10,90,.25)", fontFamily: CJK, color: INK, overflow: "hidden", opacity: Cut(t, M.app), transform: i === 22 ? "scale(1.25)" : undefined, transformOrigin: "30% 40%" }}>
				<div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 300, background: "#f7f7f9", padding: 30, boxSizing: "border-box" }}><div style={{ display: "flex", gap: 12, alignItems: "center", fontSize: 28, fontWeight: 700, marginBottom: 30 }}><LogoPixels size={30} t={t} mode="static" />MosMos</div>{["首页", "热词", "会议记录", "场景"].map((x, k) => <div key={x} style={{ fontSize: 24, padding: "10px 12px", borderRadius: 8, background: k === 3 ? "#ecebf3" : undefined }}>{x}</div>)}</div>
				<div style={{ position: "absolute", left: 360, top: 50, fontSize: 44, fontWeight: 700 }}>邮件</div><div style={{ position: "absolute", left: 360, top: 120, fontSize: 24, color: "#777" }}>{COPY.sceneDesc}</div>
				<div style={{ position: "absolute", left: 360, top: 190, width: 960, padding: "24px 28px", borderRadius: 14, background: "#f6f5fa", fontSize: 24, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{COPY.scenes[1].out}</div>
				<div style={{ position: "absolute", left: 360, top: 640, padding: "12px 26px", borderRadius: 10, background: PUR, color: "#fff", fontSize: 24 }}>已保存</div></div><Cursor x={c.x} y={c.y} s={1.4} /></Grad> }
		case 23: return <AbsoluteFill style={{ background: "#4a1fd0" }}><Slide w={1600} x={160} y={90} kind={2} title={<>把说出来的话，<br />写成能直接用的文字。</>} /><Menu x={500} y={560} s={0.8} items={MENU} hi={0} /></AbsoluteFill>
		case 24: return <AbsoluteFill style={{ background: "#4a1fd0", overflow: "hidden" }}><div style={{ position: "absolute", left: lerp(t, C[23], C[24], -160, -260), top: 60, fontFamily: MONO, fontSize: 150, lineHeight: 1.2, color: "#fff", whiteSpace: "nowrap" }}>说出来的话，<br />写成能直接用的</div><Menu x={760} y={500} s={1.3} items={MENU} hi={0} /></AbsoluteFill>
		case 25: { const txt = t > M.txt3
			return <AbsoluteFill style={{ background: "#4a1fd0", overflow: "hidden", fontFamily: CJK }}>
				{!txt ? <><div style={{ position: "absolute", left: 120, top: 330, right: 120, display: "flex", justifyContent: "space-between", fontSize: 26, color: "#cfc6ff" }}>{["飞书 / 微信", "邮件", "文档", "提示词"].map((x) => <span key={x}>{x}<br /><span style={{ opacity: 0.6 }}>场景</span></span>)}</div>
					<Pill w={1300} x={140} y={470} h={130} fs={40} light btn={false}><Wave live t={t} n={4} h={26} color={PUR} />{t > M.pill3 ? "MosMos 正在按场景润色…" : "按场景润色…"}<span style={{ flex: 1 }} /><span style={{ width: 52, height: 52, borderRadius: 12, background: PUR, display: "inline-block" }} /></Pill></>
					: <><Slide w={1500} x={210} y={130} kind={2} title={<>{COPY.downloadDesc}</>} /><Pill w={600} x={540} y={900} h={70} fs={24} light btn={false}><span style={{ color: "#1f8a6a" }}>✓</span>已按场景润色</Pill></>}</AbsoluteFill> }
		default: { if (t >= M.logo) return <AbsoluteFill style={{ background: "#7b3cf2", overflow: "hidden" }}>
				{[[1500, 260, 320, "#a77bff"], [1680, 820, 260, "#c69bff"], [240, 860, 300, "#5a2bd8"], [300, 120, 180, "#9c6cf8"]].map(([x, y, r, c], k) => <div key={k} style={{ position: "absolute", left: (x as number) - (r as number) + Math.sin(t + k) * 20, top: (y as number) - (r as number), width: (r as number) * 2, height: (r as number) * 2, borderRadius: k % 2 ? "50%" : 40, background: `linear-gradient(140deg, ${c}, #4b1cc4)`, transform: `rotate(${(t - M.logo) * 20 + k * 30}deg)`, filter: k > 1 ? "blur(6px)" : undefined, opacity: 0.9 }} />)}
				<AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}><div style={{ display: "flex", alignItems: "center", gap: 26, opacity: Cut(t, M.logo) }}><LogoPixels size={110} t={t} mode="static" invert /><Wordmark size={100} color="#fff" /></div></AbsoluteFill></AbsoluteFill>
			if (t < M.small) return <AbsoluteFill style={{ background: "#4a1fd0" }}><Slide w={1500} x={210} y={130} kind={2} title={<>{COPY.downloadDesc}</>} /></AbsoluteFill>
			return <Grad t={t} v={5}><Pill w={600} y={490} h={100} fs={34} down={false}>{t > M.small + 0.8 ? "不只是听写" : "说点什么…"}</Pill></Grad> }
	}
}

// soft in-shot changes (no cut in the reference): 1 s linear dissolve from the frozen previous state
const SOFT = [M.win, M.txt3, M.app, M.small, M.logo]
export const Film: React.FC = () => {
	const t = useT()
	const m = SOFT.find((x) => t >= x && t < x + 1.0)
	if (m === undefined) return scene(t)
	return <AbsoluteFill><AbsoluteFill>{scene(m - 0.001)}</AbsoluteFill><AbsoluteFill style={{ opacity: clamp01((t - m) / 1.0) }}>{scene(t)}</AbsoluteFill></AbsoluteFill>
}
