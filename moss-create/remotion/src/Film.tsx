import React from "react"
import { AbsoluteFill, Img, OffthreadVideo, Sequence, staticFile, useCurrentFrame } from "remotion"
import TL from "./timeline.json"
import { ACC, CARD, Caret, Center, CJK, clamp01, Cover, Cursor, FPS, INK, inOut, inQ, lerp, LINE, Mark, out, path, SANS, T2, T3, TXT, typed, TypedLine, useV, Wordmark } from "./lib"

type Shot = (typeof TL.shots)[number]
type P = { t: number; lt: number; d: number; sh: Shot }
const M = TL.marks
const subK = (sh: Shot, f: number) => { let k = 0; for (const s of sh.subs) if (f >= s) k++; return k }
const subT = (sh: Shot, k: number) => (k === 0 ? sh.f0 : sh.subs[k - 1]) / FPS
const subD = (sh: Shot, k: number) => ((k < sh.subs.length ? sh.subs[k] : sh.f1) - (k === 0 ? sh.f0 : sh.subs[k - 1])) / FPS

/* ---------- Stage: a real screen recording / screenshot / clip, framed by a camera ---------- */
type Cam = [number, number, number] // scale, focal x, focal y (source px)
type StageProps = {
	lt: number; d: number; c0: Cam; c1?: Cam; ease?: (x: number) => number
	img?: string; vid?: string; from?: number; t0?: number; rate?: number
	sw?: number; sh?: number; crop?: [number, number, number, number]
	bg?: string; vk?: number; tilt?: [number, number, number, number]; win?: boolean; label?: string; dark?: boolean
	children?: React.ReactNode
}
const Stage: React.FC<StageProps> = ({ lt, d, c0, c1, ease = inOut, img, vid, from = 0, t0 = 0, rate = 1, sw = 1920, sh = 1080, crop, bg = "#fff", vk, tilt, win, label, dark, children }) => {
	const { W, H, V } = useV()
	const e = ease(clamp01((lt - t0) / Math.max(0.001, d - t0)))
	const C = c1 || c0
	const s = c0[0] + (C[0] - c0[0]) * e, fx = c0[1] + (C[1] - c0[1]) * e, fy = c0[2] + (C[2] - c0[2]) * e
	const cw = crop ? crop[2] : sw, ch = crop ? crop[3] : sh
	const S = V ? (vk ?? 1.15) * (1 + Math.max(0, s - 1) * 0.5) * (s < 1 ? s : 1) : s
	let tx = W / 2 - fx * S, ty = H / 2 - fy * S
	if (S * cw >= W) tx = Math.min(0, Math.max(W - S * cw, tx))
	if (S * ch >= H) ty = Math.min(0, Math.max(H - S * ch, ty))
	else if (V) ty = (H - S * ch) / 2 + 40
	const floating = win || S * cw < W - 1 || S * ch < H - 1
	const rx = tilt ? tilt[0] + (tilt[1] - tilt[0]) * e : 0, ry = tilt ? tilt[2] + (tilt[3] - tilt[2]) * e : 0
	const media = vid ? (
		<OffthreadVideo src={staticFile(vid)} startFrom={Math.round(from * FPS)} playbackRate={rate} muted style={{ position: "absolute", left: crop ? -crop[0] : 0, top: crop ? -crop[1] : 0, width: sw, height: sh, objectFit: "cover" }} />
	) : <Img src={staticFile(img!)} style={{ position: "absolute", left: crop ? -crop[0] : 0, top: crop ? -crop[1] : 0, width: sw, height: sh, objectFit: "cover" }} />
	return (
		<AbsoluteFill style={{ background: bg, overflow: "hidden" }}>
			<AbsoluteFill style={{ transform: tilt && !V ? `perspective(2200px) rotateX(${rx}deg) rotateY(${ry}deg)` : tilt && V ? `perspective(2200px) rotateX(${rx * 0.5}deg)` : undefined }}>
				<div style={{ position: "absolute", left: tx, top: ty, width: cw, height: ch, transform: `scale(${S})`, transformOrigin: "0 0", overflow: "hidden", borderRadius: floating ? 16 / S : 0, boxShadow: floating ? (dark ? "0 40px 120px rgba(0,0,0,.6), 0 0 0 1px rgba(255,255,255,.08)" : "0 30px 90px rgba(20,30,28,.16), 0 0 0 1px rgba(0,0,0,.06)") : undefined }}>
					<Sequence from={Math.round(t0 * FPS)} layout="none">{media}</Sequence>
					{children}
				</div>
			</AbsoluteFill>
			{V && label && floating && (
				<div style={{ position: "absolute", left: 0, right: 0, top: Math.max(120, ty - 130), display: "flex", justifyContent: "center" }}>
					<div style={{ fontFamily: CJK, fontSize: 34, color: dark ? "#c9cccb" : T2, padding: "12px 28px", borderRadius: 99, border: `1px solid ${dark ? "#333" : LINE}`, background: dark ? "#1b1d1c" : "#fff" }}>{label}</div>
				</div>
			)}
		</AbsoluteFill>
	)
}

const WhiteCard: React.FC<{ children: React.ReactNode; bg?: string }> = ({ children, bg = CARD }) => <AbsoluteFill style={{ background: bg }}>{children}</AbsoluteFill>
const whip = (lt: number, d: number, len = 0.35, dir = -1) => {
	const p = clamp01((lt - (d - len)) / len), e = inQ(p)
	return { transform: `translateX(${dir * e * 700}px) scale(${1 + e * 0.5})`, filter: e > 0.01 ? `blur(${e * 36}px)` : undefined, opacity: 1 - e * 0.9 }
}
const COVERS = ["dmfiookg19kj", "dmfhpu1i2ij2", "dm8mv4vt76sm", "dmb93d6l5xgu", "dmfi3s7j5nyn", "dmi4jjkrikqy", "dl3uh1l12e65", "dm9k4hden2qv", "dmgcbnbz8gle", "dmb9ue3rfhes", "dm0yh44smljt", "dmfhwqj721xh", "dlhhtgeo1l9j", "dmc37w5crp4i", "dmi4ipvuq39y", "dm112m0v0pj5", "dmenicoj2b3s", "dmh9v3x5buue", "dmfihoigrcyj", "dm8oo483h60j"]

/* ---------- shots ---------- */
const Black: React.FC<P> = () => <AbsoluteFill style={{ background: "#000" }} />

const CoverWall: React.FC<{ lt: number; dim?: number; blur?: number }> = ({ lt, dim = 0.62, blur = 10 }) => {
	const { W, H } = useV()
	const cols = Math.ceil(W / 300) + 1
	return (
		<AbsoluteFill style={{ background: "#0d0f0e", overflow: "hidden" }}>
			<div style={{ position: "absolute", left: -60, top: -200 - lt * 30, display: "flex", gap: 16, filter: `blur(${blur}px) saturate(1.1)` }}>
				{Array.from({ length: cols }).map((_, c) => (
					<div key={c} style={{ display: "flex", flexDirection: "column", gap: 16, transform: `translateY(${(c % 2 ? -1 : 1) * lt * 22 + (c % 3) * 90}px)` }}>
						{Array.from({ length: Math.ceil(H / 300) + 3 }).map((_, r) => <Cover key={r} id={COVERS[(c * 5 + r * 3) % COVERS.length]} style={{ width: 290, height: 360, borderRadius: 14 }} />)}
					</div>
				))}
			</div>
			<AbsoluteFill style={{ background: `rgba(8,10,9,${dim})` }} />
		</AbsoluteFill>
	)
}

const Logo: React.FC<P> = ({ lt, d }) => {
	const glitch = lt < 0.35
	const wm = lerp(lt, 1.45, 1.95, 0, 1)
	const fadeOut = lerp(lt, d - 0.25, d, 1, 0, inQ), blur = lerp(lt, d - 0.25, d, 0, 18, inQ)
	const mk = lerp(lt, 0, 0.5, 0, 1)
	return (
		<AbsoluteFill style={{ background: "#000" }}>
			<AbsoluteFill style={{ opacity: lerp(lt, 0, 0.6, 0, 1) * fadeOut }}><CoverWall lt={lt} /></AbsoluteFill>
			<Center style={{ opacity: fadeOut, filter: blur > 0.2 ? `blur(${blur}px)` : undefined }}>
				<div style={{ display: "flex", alignItems: "center", transform: `scale(${lerp(lt, 0, 2.8, 0.94, 1.02, inOut)})` }}>
					<div style={{ transform: glitch ? `translateX(${Math.sin(lt * 140) * 14}px)` : undefined, opacity: glitch ? (Math.floor(lt * 40) % 3 ? 1 : 0.3) : mk }}><Mark size={120} white /></div>
					<div style={{ width: wm * 470, overflow: "hidden", marginLeft: 30 * wm }}>
						<div style={{ transform: `translateX(${(1 - wm) * -60}px)`, opacity: wm }}><Wordmark size={72} color="#fff" /></div>
					</div>
				</div>
			</Center>
			{glitch && Array.from({ length: 7 }).map((_, i) => (
				<div key={i} style={{ position: "absolute", left: 0, right: 0, top: "40%", marginTop: ((i * 97 + Math.floor(lt * 60) * 53) % 320) - 100, height: 2 + (i % 3) * 3, background: `rgba(255,255,255,${0.5 - i * 0.05})` }} />
			))}
		</AbsoluteFill>
	)
}

const Meet: React.FC<P> = ({ t }) => {
	const start = TL.typing.find((e) => e.id === "meet")!.t0
	const flash = t > start - 0.33 && t < start - 0.06
	return (
		<AbsoluteFill style={{ background: "#000" }}>
			<Center>{flash ? <div style={{ width: 110, height: 40, background: "#fff", boxShadow: "0 0 40px 10px rgba(255,255,255,.6)", borderRadius: 4 }} /> : t >= start ? <TypedLine id="meet" t={t} size={76} color="#fff" glow /> : null}</Center>
		</AbsoluteFill>
	)
}

const Cascade: React.FC<P> = ({ lt, d }) => {
	const { V, H } = useV()
	const word = "MOSS Create", FS = V ? 104 : 116, LH = FS * 1.2
	const swish = lt > 0.6 && lt < 0.86, col = lt >= 0.86
	const scroll = lerp(lt, 0.86, d, 0, 1, (x) => x)
	const rise = lerp(lt, d - 0.5, d + 0.4, 0, 1, out)
	const ws: React.CSSProperties = { fontFamily: SANS, fontWeight: 700, fontSize: FS, letterSpacing: "-0.03em", whiteSpace: "nowrap" }
	return (
		<AbsoluteFill style={{ background: "#efefef", overflow: "hidden" }}>
			{!col && <Center><div style={{ ...ws, color: INK, transform: swish ? `skewX(-14deg) translateX(${(lt - 0.6) * 300}px)` : undefined, filter: swish ? "blur(6px)" : undefined }}>{word}</div></Center>}
			{col && (
				<AbsoluteFill style={{ alignItems: "center" }}>
					<div style={{ position: "absolute", top: H / 2 - LH / 2 - scroll * LH * 5.5, display: "flex", flexDirection: "column", alignItems: "center" }}>
						{Array.from({ length: 18 }).map((_, i) => {
							const appear = clamp01((lt - 0.86 - i * 0.035) / 0.12), tint = clamp01((i - 7) / 5)
							return <div key={i} style={{ ...ws, height: LH, lineHeight: `${LH}px`, opacity: appear, color: tint > 0 ? `color-mix(in srgb, ${ACC} ${Math.round(tint * 100)}%, ${INK})` : INK, transform: `translateY(${(1 - appear) * 40}px)`, filter: tint > 0.6 ? `blur(${(tint - 0.6) * 6}px)` : undefined }}>{word}</div>
						})}
					</div>
				</AbsoluteFill>
			)}
			{rise > 0 && (
				<AbsoluteFill style={{ transform: `translateY(${(1 - rise) * 1000}px)` }}>
					<Stage lt={lt} d={d} c0={[0.78, 960, 540]} img="s/home-clean.png" bg="transparent" win tilt={[30, 26, 0, 0]} vk={0.62} />
				</AbsoluteFill>
			)}
		</AbsoluteFill>
	)
}

const MENU = { x: 586, y: 212, w: 290, h: 242 }
const UiAuto: React.FC<P> = ({ t, lt, d }) => {
	const tc = M.auto_click, tp = M.pro_click, T0 = t - lt
	const open = t >= tc
	const c = path(t, [[T0, 1150, 900], [tc - 0.12, 650, 474], [tc + 0.35, 655, 478], [tp - 0.1, 700, 300], [tp + 1, 705, 304]])
	return (
		<Stage lt={lt} d={d} c0={[0.82, 960, 540]} c1={[1.85, 770, 400]} img="s/home-clean.png" bg="#efefef" tilt={[14, 2, 0, 0]} label="灵感 · 模型选择" vk={1.6}>
			{open && (
				<div style={{ position: "absolute", left: MENU.x, top: MENU.y, width: MENU.w, height: MENU.h, transform: `scale(${lerp(t, tc, tc + 0.18, 0.94, 1)})`, opacity: lerp(t, tc, tc + 0.12, 0, 1), transformOrigin: "60px 240px" }}>
					<Img src={staticFile("s/menu.png")} style={{ width: MENU.w, height: MENU.h }} />
					{t >= tp - 0.15 && <div style={{ position: "absolute", left: 12, top: 66, width: 266, height: 50, borderRadius: 10, background: "rgba(0,0,0,.05)" }} />}
				</div>
			)}
			<Cursor x={c.x} y={c.y} down={Math.abs(t - tc) < 0.08 || Math.abs(t - tp) < 0.08} />
		</Stage>
	)
}

const TypeCard: React.FC<P & { id: string; accentFrom: number; size?: number; exit?: boolean; echo?: number }> = ({ t, lt, d, id, accentFrom, size = 84, exit, echo }) => {
	const { V } = useV()
	const ec = echo != null ? lerp(lt, echo, echo + 0.25, 0, 1) : 0
	const line = (caret: boolean) => <TypedLine id={id} t={t} accentFrom={accentFrom} size={V ? size * 0.95 : size} caret={caret && (!typed(id, t).done || Math.floor(t * 2.2) % 2 === 0)} brk={V} />
	return (
		<WhiteCard>
			<Center style={exit ? whip(lt, d) : undefined}>
				<div style={{ position: "relative" }}>
					{line(true)}
					{ec > 0 && <div style={{ position: "absolute", left: 0, right: 0, top: (V ? size * 2.5 : size * 1.15), clipPath: "inset(0 0 45% 0)", opacity: ec * 0.5 }}>{line(false)}</div>}
				</div>
			</Center>
		</WhiteCard>
	)
}

const Chip1: React.FC<P> = ({ lt, d }) => <Stage lt={lt} d={d} c0={[1.0, 960, 540]} c1={[1.7, 1010, 420]} vid="f/home_chip.mp4" from={1.2} label="灵感 · 快捷生图" vk={1.12} />
const Chip2: React.FC<P> = ({ lt, d }) => <Stage lt={lt} d={d} c0={[1.55, 1000, 400]} c1={[1.75, 1060, 400]} vid="f/home_chip.mp4" from={5.6} ease={out} label="灵感 · 快捷生图" vk={1.12} />
const MImage: React.FC<P> = ({ lt, d }) => <Stage lt={lt} d={d} c0={[1.02, 960, 540]} c1={[1.18, 960, 600]} vid="f/mossimage.mp4" from={1.0} vk={1.7} />

const SideHot: React.FC<P> = ({ t, lt, d }) => {
	const tc = M.hot_click, T0 = t - lt
	const c = path(t, [[T0, 420, 600], [tc - 0.1, 34, 338], [tc + 1, 36, 340]])
	return (
		<AbsoluteFill style={{ background: "#0d0f0e" }}>
			<Stage lt={lt} d={d} c0={[2.3, 200, 300]} c1={[2.5, 190, 320]} img="s/home-clean.png" bg="#0d0f0e" dark vk={1.6}>
				{t >= tc && <div style={{ position: "absolute", left: 8, top: 314, width: 46, height: 46, borderRadius: 10, background: "rgba(0,0,0,.06)" }} />}
				<Cursor x={c.x} y={c.y} down={Math.abs(t - tc) < 0.08} s={0.6} />
			</Stage>
		</AbsoluteFill>
	)
}
const Gallery: React.FC<P> = ({ lt, d }) => <Stage lt={lt} d={d} c0={[1.0, 960, 540]} c1={[1.08, 960, 560]} vid="f/gallery.mp4" from={0.4} vk={1.75} />
const Gallery2: React.FC<P> = ({ lt, d }) => <Stage lt={lt} d={d} c0={[1.5, 760, 520]} c1={[1.62, 800, 470]} vid="f/gallery.mp4" from={13} vk={1.9} />

const TplCard: React.FC<P> = ({ t, lt, d }) => {
	const { V, W, H } = useV()
	const tc = M.tpl_click, T0 = t - lt
	const hover = lerp(t, T0 + 0.5, T0 + 0.75, 0, 1)
	const cols = V ? 3 : 6, cw = V ? 330 : 290
	const z = lerp(lt, 0, d, 1, 1.12, inOut)
	const hx = V ? 1 : 3 // highlighted column
	const cardX = (W - (cols * cw + (cols - 1) * 16)) / 2 + hx * (cw + 16)
	const cardY = H / 2 - 260
	const c = path(t, [[T0, cardX + cw + 200, cardY + 700], [T0 + 0.5, cardX + cw * 0.6, cardY + 260], [tc - 0.1, cardX + cw * 0.55, cardY + 470], [tc + 1, cardX + cw * 0.56, cardY + 474]])
	return (
		<AbsoluteFill style={{ background: "#fff", overflow: "hidden" }}>
			<AbsoluteFill style={{ transform: `scale(${z})`, transformOrigin: `${cardX + cw / 2}px ${cardY + 260}px` }}>
				<div style={{ position: "absolute", left: (W - (cols * cw + (cols - 1) * 16)) / 2, top: 0, display: "flex", gap: 16 }}>
					{Array.from({ length: cols }).map((_, ci) => (
						<div key={ci} style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: ci === hx ? cardY : -120 + (ci * 137) % 260 }}>
							{(ci === hx ? [0, 1, 2] : [0, 1, 2, 3, 4, 5]).map((r) => {
								const id = ci === hx && r === 0 ? "dmfiookg19kj" : COVERS[(ci * 7 + r * 3 + 2) % COVERS.length]
								const hh = ci === hx && r === 0 ? 520 : 300 + ((ci + r) % 3) * 70
								return (
									<div key={r} style={{ width: cw, height: hh, borderRadius: 14, overflow: "hidden", position: "relative", opacity: ci === hx && r === 0 ? 1 : 1 - hover * 0.35 }}>
										<Cover id={id} style={{ width: cw, height: hh }} />
										{ci === hx && r === 0 && (
											<div style={{ position: "absolute", inset: 0, opacity: hover, background: "linear-gradient(180deg, rgba(0,0,0,.0) 50%, rgba(0,0,0,.45))" }}>
												<div style={{ position: "absolute", left: 14, right: 14, bottom: 16, height: 46, borderRadius: 10, background: t >= tc ? "#f0f0f0" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: CJK, fontSize: 19, color: TXT, gap: 8, transform: `scale(${Math.abs(t - tc) < 0.08 ? 0.96 : 1})` }}>
													<span style={{ fontSize: 16 }}>⧉</span>使用模板
												</div>
											</div>
										)}
									</div>
								)
							})}
						</div>
					))}
				</div>
				<Cursor x={c.x} y={c.y} down={Math.abs(t - tc) < 0.08} />
			</AbsoluteFill>
		</AbsoluteFill>
	)
}
const TplPlay: React.FC<P> = ({ lt, d }) => <Stage lt={lt} d={d} c0={[0.62, 960, 540]} c1={[0.9, 960, 540]} ease={out} vid="v/dm60f51c3hfq.mp4" from={0.5} bg="#e9ebea" win vk={1.0} label="爆款特效 · 模板预览" />
const TplPush: React.FC<P> = ({ lt, d }) => <Stage lt={lt} d={d} c0={[1.1, 960, 540]} c1={[1.32, 1010, 470]} vid="v/dm60f51c3hfq.mp4" from={3.5} vk={1.78} />

const QMore: React.FC<P> = ({ lt }) => {
	const { V } = useV()
	const k = lerp(lt, 0, 0.3, 0, 1), big = lerp(lt, 0.45, 0.75, 0, 1), green = lt > 1.05
	return (
		<WhiteCard>
			<Center>
				<div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18, fontFamily: CJK }}>
					<div style={{ fontSize: V ? 40 : 34, color: "#2a2b30", opacity: k, transform: `translateY(${(1 - k) * 12}px)` }}>不止有画面</div>
					<div style={{ fontSize: V ? 118 : 120, fontWeight: 700, color: green ? ACC : TXT, opacity: big, transform: `scale(${0.92 + big * 0.08})`, whiteSpace: "nowrap" }}>还能有声音</div>
				</div>
			</Center>
		</WhiteCard>
	)
}

const Voice: React.FC<P> = ({ t, lt, sh }) => {
	const f = Math.round(t * FPS), k = subK(sh, f), st = t - subT(sh, k), sd = subD(sh, k)
	const S: [number, Cam, Cam][] = [[0.3, [1.0, 960, 540], [1.04, 960, 540]], [3.0, [1.45, 900, 360], [1.55, 900, 340]], [9.0, [1.3, 760, 600], [1.38, 760, 560]], [15.0, [1.7, 560, 520], [1.8, 560, 500]]]
	const [from, c0, c1] = S[k]
	return <Stage key={k} lt={st} d={sd} c0={c0} c1={c1} vid="f/voice.mp4" from={from} label="音色库" vk={1.45} />
}
const Synth: React.FC<P> = ({ t, sh }) => {
	const f = Math.round(t * FPS), k = subK(sh, f), st = t - subT(sh, k), sd = subD(sh, k)
	if (k === 0) return <Stage lt={st} d={sd} c0={[1.0, 960, 540]} c1={[1.06, 800, 300]} img="s/p-synth.png" label="语音合成" vk={1.1} />
	if (k === 1) return <Stage key={k} lt={st} d={sd} c0={[2.0, 520, 160]} c1={[2.1, 520, 170]} vid="f/synth.mp4" from={1.1} label="语音合成 · 早安电台" vk={1.8} />
	return <Stage key={k} lt={st} d={sd} c0={[1.35, 780, 420]} c1={[1.5, 760, 470]} vid="f/synth.mp4" from={2.0} label="语音合成 · 早安电台" vk={1.25} />
}

const Agents: React.FC<P> = ({ t, lt, d }) => {
	const tc = M.agent_click, T0 = t - lt
	const c = path(t, [[T0, 1000, 900], [tc - 0.1, 830, 562], [tc + 1, 834, 566]])
	return (
		<Stage lt={lt} d={d} c0={[0.8, 590, 470]} c1={[1.05, 590, 500]} img="s/p-agents.png" crop={[280, 0, 1180, 1080]} bg="#141414" dark win tilt={[6, 2, -16, -4]} label="创作 · 和 Agent 一起" vk={1.4}>
			{t >= tc - 0.15 && <div style={{ position: "absolute", left: 668, top: 542, width: 340, height: 36, borderRadius: 8, boxShadow: `0 0 0 2px ${ACC}` }} />}
			<Cursor x={c.x} y={c.y} down={Math.abs(t - tc) < 0.08} />
		</Stage>
	)
}

const CardYours: React.FC<P> = ({ lt }) => {
	const word = Array.from("你说了算")
	return (
		<WhiteCard>
			<Center>
				<div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, fontFamily: CJK }}>
					<div style={{ fontSize: 34, color: "#3a3b40", opacity: lerp(lt, 0, 0.12, 0, 1) }}>想做成什么样</div>
					<div style={{ fontSize: 120, fontWeight: 700, color: ACC, display: "flex", minHeight: 170 }}>
						{word.map((c, i) => { const at = 0.15 + i * 0.2727; const p = lerp(lt, at, at + 0.12, 0, 1); return <span key={i} style={{ opacity: lt >= at ? 1 : 0, transform: `scale(${1.25 - 0.25 * p})`, display: "inline-block" }}>{c}</span> })}
					</div>
				</div>
			</Center>
		</WhiteCard>
	)
}

const Theme: React.FC<P> = ({ t, sh }) => {
	const f = Math.round(t * FPS), k = subK(sh, f), st = t - subT(sh, k), sd = subD(sh, k)
	// [src, from, cam0, cam1, bg, label]
	const S: [string, number, Cam, Cam, string, string][] = [
		["f/theme.mp4", 0.6, [1.0, 960, 540], [1.05, 960, 520], "#fff", "浅色"],
		["s/p-home-dark.png", 0, [1.0, 960, 540], [1.04, 960, 540], "#141414", "暗色"],
		["f/theme.mp4", 3.4, [1.7, 960, 400], [1.78, 960, 390], "#141414", "暗色"],
		["f/theme.mp4", 7.2, [1.6, 960, 420], [1.66, 960, 430], "#fff", "浅色"],
		["s/p-home-dark.png", 0, [2.0, 420, 300], [2.1, 420, 290], "#141414", "暗色"],
		["f/theme.mp4", 13.0, [1.62, 880, 420], [1.7, 880, 400], "#fff", "English"],
		["f/theme.mp4", 13.6, [1.95, 980, 300], [2.05, 980, 300], "#fff", "English"],
		["s/p-home-dark.png", 0, [1.15, 960, 470], [1.25, 960, 440], "#141414", "暗色"],
	]
	const [src, from, c0, c1, bg, label] = S[k]
	const isV = src.endsWith(".mp4")
	return <Stage key={k} lt={st} d={sd} c0={c0} c1={c1} vid={isV ? src : undefined} img={isV ? undefined : src} from={from} bg={bg} dark={bg !== "#fff"} label={label} vk={1.12} />
}

const TypeDel: React.FC<P> = ({ t }) => {
	const e = TL.typing.find((x) => x.id === "typedel2")!
	const id = t >= e.t0 ? "typedel2" : "typedel1"
	return <WhiteCard><Center><TypedLine id={id} t={t} size={84} caret /></Center></WhiteCard>
}

const Orbit: React.FC<P> = ({ t, lt, d }) => {
	const { W, H, V } = useV()
	const word = Array.from("都能做出来")
	const push = lerp(lt, d - 0.4, d, 0, 1, inQ)
	const N = 12, rx = V ? 400 : 740, ry = V ? 760 : 350
	return (
		<WhiteCard bg="#fff">
			<AbsoluteFill style={{ transform: `scale(${1 + push * 2.4})`, filter: push > 0.02 ? `blur(${push * 22}px)` : undefined, opacity: 1 - push * 0.6 }}>
				{Array.from({ length: N }).map((_, i) => {
					const a = (i / N) * Math.PI * 2 + lt * 0.55
					const x = W / 2 + Math.cos(a) * rx, y = H / 2 + Math.sin(a) * ry
					const zf = 0.7 + 0.3 * (Math.sin(a) + 1) / 2
					const app = lerp(lt, 0.05 + i * 0.03, 0.4 + i * 0.03, 0, 1)
					return (
						<div key={i} style={{ position: "absolute", left: x, top: y, transform: `translate(-50%,-50%) scale(${zf * app})`, opacity: app, zIndex: Math.round(zf * 10) }}>
							<div style={{ width: 190, height: 250, borderRadius: 16, overflow: "hidden", background: "#fff", boxShadow: "0 16px 40px rgba(10,20,40,.16), 0 0 0 1px #ececef" }}><Cover id={COVERS[i]} style={{ width: 190, height: 250 }} /></div>
						</div>
					)
				})}
				<Center style={{ zIndex: 20 }}>
					<div style={{ fontFamily: CJK, fontWeight: 700, fontSize: V ? 140 : 150, color: TXT, display: "flex", textShadow: "0 0 30px rgba(255,255,255,.9)" }}>
						{word.map((c, i) => { const p = lerp(lt, i * 0.05, 0.4 + i * 0.05, 0, 1); const sx = Math.sin(i * 2.3) * 260, sy = Math.cos(i * 1.7) * 160; return <span key={i} style={{ display: "inline-block", transform: `translate(${(1 - p) * sx}px, ${(1 - p) * sy}px) scale(${0.4 + 0.6 * p}) rotate(${(1 - p) * (i % 2 ? 25 : -25)}deg)`, opacity: p, filter: p < 1 ? `blur(${(1 - p) * 8}px)` : undefined }}>{c}</span> })}
					</div>
				</Center>
			</AbsoluteFill>
		</WhiteCard>
	)
}

const Clip: React.FC<{ lt: number; d: number; v: string; from?: number; z0?: number; z1?: number; fx?: number; fy?: number }> = ({ lt, d, v, from = 0.3, z0 = 1.0, z1 = 1.1, fx = 960, fy = 540 }) =>
	<Stage lt={lt} d={d} c0={[z0, 960, 540]} c1={[z1, fx, fy]} vid={v} from={from} bg="#000" vk={1.78} ease={(x) => x} />
const M1: React.FC<P> = ({ t, sh }) => {
	const f = Math.round(t * FPS), k = subK(sh, f), st = t - subT(sh, k), sd = subD(sh, k)
	return k === 0 ? <Clip lt={st} d={sd} v="v/dmfhyam6asaa.mp4" from={1} fx={960} fy={560} /> : <Clip key={1} lt={st} d={sd} v="v/dmi4iwvsp663.mp4" from={2} z0={1.1} z1={1.2} fy={460} />
}
const PORT = ["v/dm0yh6uap6a1.mp4", "v/dm8mw88cawlv.mp4", "v/dmi4k4kdu6lm.mp4"]
const M2: React.FC<P> = ({ t, sh }) => {
	const { V } = useV()
	const f = Math.round(t * FPS), k = subK(sh, f), st = t - subT(sh, k), sd = subD(sh, k)
	if (V) return <Stage key={k} lt={st} d={sd} c0={[1.0, 540, 960]} c1={[1.06, 540, 940]} vid={PORT[k]} from={0.6} sw={1080} sh={1920} vk={1.0} bg="#000" ease={(x) => x} />
	return (
		<AbsoluteFill style={{ background: "#0d0f0e" }}>
			<Center>
				<div style={{ display: "flex", gap: 40, alignItems: "center" }}>
					{PORT.map((p, i) => {
						const on = i === k
						return (
							<div key={i} style={{ width: 486, height: 864, borderRadius: 22, overflow: "hidden", position: "relative", transform: `scale(${on ? lerp(st, 0, 0.3, 0.96, 1.04) : 0.9})`, opacity: on ? 1 : 0.35, boxShadow: on ? "0 40px 100px rgba(0,0,0,.6)" : undefined }}>
								<Sequence from={on ? 0 : -999} layout="none">
									<OffthreadVideo src={staticFile(p)} startFrom={Math.round((0.6 + (on ? 0 : 1.5)) * FPS)} muted style={{ width: 486, height: 864, objectFit: "cover" }} />
								</Sequence>
							</div>
						)
					})}
				</div>
			</Center>
		</AbsoluteFill>
	)
}
const M3: React.FC<P> = ({ lt, d }) => <Clip lt={lt} d={d} v="v/dl3uh2mmi3ql.mp4" from={1.5} z0={1.05} z1={1.18} fy={420} />
const M4: React.FC<P> = ({ lt, d }) => <Clip lt={lt} d={d} v="v/dlhhthki7aqb.mp4" from={0.8} z0={1.0} z1={1.12} />
const M5: React.FC<P> = ({ lt, d }) => <Stage lt={lt} d={d} c0={[1.0, 960, 540]} c1={[1.12, 960, 560]} vid="f/home_scroll.mp4" from={15.2} vk={1.75} />

const CardCards: React.FC<P> = ({ lt }) => {
	const { W, H, V } = useV()
	const word = Array.from("想到就做")
	const pos: [string, number, number, number][] = V
		? [["dmfhpu1i2ij2", 0.27, 0.2, -4], ["dmi4jjkrikqy", 0.73, 0.22, 3], ["dmb93d6l5xgu", 0.27, 0.8, 3], ["dm8mv4vt76sm", 0.73, 0.78, -3]]
		: [["dmfhpu1i2ij2", 0.16, 0.25, -4], ["dmi4jjkrikqy", 0.84, 0.24, 3], ["dmb93d6l5xgu", 0.16, 0.76, 3], ["dm8mv4vt76sm", 0.84, 0.77, -3]]
	return (
		<WhiteCard bg="#fff">
			{pos.map(([n, x, y, r], i) => { const p = lerp(lt, 0.05 + i * 0.06, 0.45 + i * 0.06, 0, 1); return (
				<div key={n} style={{ position: "absolute", left: x * W, top: y * H + Math.sin(lt * 2 + i) * 8, width: 300, height: 380, transform: `translate(-50%,-50%) rotate(${r}deg) scale(${0.8 + 0.2 * p})`, opacity: p, borderRadius: 18, overflow: "hidden", boxShadow: "0 20px 50px rgba(10,20,40,.18)" }}>
					<Cover id={n} style={{ width: 300, height: 380 }} />
				</div>) })}
			<Center>
				<div style={{ fontFamily: CJK, fontWeight: 700, fontSize: 130, color: TXT, display: "flex" }}>
					{word.map((c, i) => { const p = lerp(lt, i * 0.06, 0.35 + i * 0.06, 0, 1); return <span key={i} style={{ display: "inline-block", opacity: p, transform: `translateY(${(1 - p) * (i % 2 ? 60 : -60)}px)`, filter: p < 1 ? `blur(${(1 - p) * 8}px)` : undefined }}>{c}</span> })}
				</div>
			</Center>
		</WhiteCard>
	)
}
const Slogan: React.FC<P> = ({ lt, d }) => {
	const { V } = useV()
	const word = Array.from("让灵感有声有色")
	const push = lerp(lt, d - 0.6, d, 0, 1, inQ)
	return (
		<WhiteCard bg="#fff">
			<Center style={{ transform: `scale(${1 + push * 2.2})`, filter: push > 0.02 ? `blur(${push * 14}px)` : undefined }}>
				<div style={{ fontFamily: CJK, fontWeight: 700, fontSize: V ? 120 : 132, color: ACC, display: "flex" }}>
					{word.map((c, i) => { const p = lerp(lt, i * 0.04, 0.45 + i * 0.04, 0, 1); const sx = Math.sin(i * 3.7) * 200, sy = Math.cos(i * 2.9) * 140; return <span key={i} style={{ display: "inline-block", opacity: p, transform: `translate(${(1 - p) * sx}px,${(1 - p) * sy}px) scale(${0.5 + 0.5 * p})`, filter: p < 1 ? `blur(${(1 - p) * 8}px)` : undefined }}>{c}</span> })}
				</div>
			</Center>
		</WhiteCard>
	)
}
const Tagline: React.FC<P> = ({ t }) => {
	const { V } = useV()
	const sel = t >= TL.events.find((e) => e.kind === "select")!.t
	const { s } = typed("tagline", t)
	return (
		<AbsoluteFill style={{ background: "#000" }}>
			<Center>
				{sel && s.length > 0 ? (
					<div style={{ fontFamily: CJK, fontWeight: 500, fontSize: 60, color: "#000", background: "#fff", padding: "0 6px", boxShadow: "0 0 50px 8px rgba(255,255,255,.45)", textAlign: "center", whiteSpace: V ? "pre" : "nowrap", lineHeight: 1.3 }}>{V ? s.replace("，", "，\n") : s}</div>
				) : <TypedLine id="tagline" t={t} size={60} weight={500} color="#fff" glow brk={V} />}
			</Center>
		</AbsoluteFill>
	)
}
const Outro: React.FC<P> = ({ t, lt, d }) => {
	const ding = M.ding - (t - lt)
	const disp = lerp(lt, ding - 0.1, ding + 0.45, 0, 1, inQ)
	const shift = lerp(lt, ding + 0.1, ding + 0.6, 0, 1, inOut)
	const spin = lerp(lt, ding + 0.15, ding + 1.25, 0, 360, inOut)
	const fade = lerp(lt, d - 0.35, d, 1, 0)
	return (
		<AbsoluteFill style={{ background: "#fcfcfc" }}>
			<Center style={{ opacity: fade }}>
				<div style={{ display: "flex", alignItems: "center", transform: `translateX(${shift * 225}px)` }}>
					<div style={{ transform: `perspective(800px) rotateY(${spin}deg)` }}><Mark size={104} /></div>
					<div style={{ marginLeft: 26, width: 420 }}><Wordmark size={62} disperse={disp} /></div>
				</div>
			</Center>
		</AbsoluteFill>
	)
}

const MAP: Record<string, React.FC<P>> = {
	black: Black, logo: Logo, meet: Meet, cascade: Cascade, ui_auto: UiAuto,
	card1: (p) => <TypeCard {...p} id="card1" accentFrom={5} exit />,
	chip1: Chip1, chip2: Chip2, mimage: MImage,
	card2: (p) => <TypeCard {...p} id="card2" accentFrom={5} exit />,
	side_hot: SideHot, gallery: Gallery, gallery2: Gallery2, tpl_card: TplCard, tpl_play: TplPlay, tpl_push: TplPush, q_more: QMore,
	q1: (p) => <TypeCard {...p} id="q1" accentFrom={3} />, voice: Voice,
	q2: (p) => <TypeCard {...p} id="q2" accentFrom={3} />, synth: Synth,
	q3: (p) => <TypeCard {...p} id="q3" accentFrom={3} echo={1.35} />, agents: Agents,
	card_yours: CardYours, theme: Theme, typedel: TypeDel, orbit: Orbit, m1: M1, m2: M2, m3: M3, card_cards: CardCards, m4: M4, m5: M5,
	slogan: Slogan, tagline: Tagline, outro: Outro, black_end: Black,
}

export const Film: React.FC = () => {
	const frame = useCurrentFrame()
	const shots = TL.shots
	let sh = shots[shots.length - 1]
	for (const s of shots) if (frame >= s.f0 && frame < s.f1) { sh = s; break }
	const t = frame / FPS, lt = (frame - sh.f0) / FPS, d = (sh.f1 - sh.f0) / FPS
	const C = MAP[sh.id]
	return (
		<AbsoluteFill style={{ background: "#000", overflow: "hidden" }}>
			<Sequence from={sh.f0} durationInFrames={sh.f1 - sh.f0} layout="none"><C t={t} lt={lt} d={d} sh={sh} /></Sequence>
		</AbsoluteFill>
	)
}
