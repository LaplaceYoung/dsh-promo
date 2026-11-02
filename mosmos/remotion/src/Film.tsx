import React from "react"
import { AbsoluteFill, useCurrentFrame } from "remotion"
import TL from "./timeline.json"
import { ACC, Bar, Caret, CARD, Center, Chip, CJK, clamp01, Cursor, FPS, INK, INK2, InkBubble, inOut, inQ, Keycap, lerp, LINE, AppIcon, MONO, out, path, Pill, RawBubble, S1, S2, SANS, SCENES, T2, T3, T4, Tex, TXT, typed, TypedLine, typeEnd, Wave, Win, Wordmark } from "./lib"

type Shot = (typeof TL.shots)[number]
type P = { t: number; lt: number; d: number; sh: Shot }
const M = TL.marks
const sub = (sh: Shot, f: number) => { let k = 0; for (const s of sh.subs) if (f >= s) k++; return k }
const subT = (sh: Shot, k: number) => (k === 0 ? sh.f0 : sh.subs[k - 1]) / FPS

/* ---------------- shared scene pieces ---------------- */
const MeshBg: React.FC<{ lt: number; dim?: number }> = ({ lt, dim = 0.35 }) => (
	<AbsoluteFill style={{ background: "#0e1a2c", overflow: "hidden" }}>
		<Tex name="mesh" style={{ width: 1920, height: 3413, left: 0, top: -1100 - lt * 40, transform: `rotate(-90deg) scale(${1.25 + lt * 0.01})`, filter: "blur(6px) saturate(.9)", transformOrigin: "960px 1706px" }} />
		<AbsoluteFill style={{ background: `rgba(6,12,24,${dim})` }} />
	</AbsoluteFill>
)

/** The site's hero demo card, recreated. */
const HeroCard: React.FC<{ t: number; pill: React.ReactNode; right?: React.ReactNode; scene?: string }> = ({ t, pill, right, scene = "飞书 / 微信" }) => (
	<div style={{ width: 1500, height: 640, borderRadius: 28, overflow: "hidden", background: "#fff", display: "flex", boxShadow: "0 50px 120px rgba(10,20,40,.22), 0 0 0 1px #e4e4e7", fontFamily: CJK }}>
		<div style={{ width: 640, height: "100%", position: "relative", background: "#ececee", overflow: "hidden" }}>
			<Tex name="ascii-dunes" style={{ width: 1100, height: 620, left: -230, top: 80, opacity: 0.95 }} />
			<div style={{ position: "absolute", left: 30, top: 28, fontSize: 14, color: T2, letterSpacing: "0.12em" }}>当前场景 · {scene}</div>
			<div style={{ position: "absolute", left: 24, bottom: 30 }}>{pill}</div>
		</div>
		<div style={{ flex: 1, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>{right}</div>
	</div>
)

const WhiteCard: React.FC<{ children: React.ReactNode; bg?: string }> = ({ children, bg = CARD }) => <AbsoluteFill style={{ background: bg }}>{children}</AbsoluteFill>

/** zoom-blur whip out over the last `len` seconds */
const whip = (lt: number, d: number, len = 0.35, dir = -1) => {
	const p = clamp01((lt - (d - len)) / len), e = inQ(p)
	return { transform: `translateX(${dir * e * 700}px) scale(${1 + e * 0.5})`, filter: e > 0.01 ? `blur(${e * 36}px)` : undefined, opacity: 1 - e * 0.9 }
}

/* ---------------- shots ---------------- */
const Black: React.FC<P> = () => <AbsoluteFill style={{ background: "#000" }} />

const Logo: React.FC<P> = ({ lt, d }) => {
	const glitch = lt < 0.35
	const wm = lerp(lt, 1.45, 1.95, 0, 1)
	const fadeOut = lerp(lt, d - 0.25, d, 1, 0, inQ)
	const blur = lerp(lt, d - 0.25, d, 0, 18, inQ)
	return (
		<AbsoluteFill style={{ background: "#000" }}>
			<AbsoluteFill style={{ opacity: lerp(lt, 0, 0.6, 0, 1) * fadeOut }}><MeshBg lt={lt} /></AbsoluteFill>
			<Center style={{ opacity: fadeOut, filter: blur > 0.2 ? `blur(${blur}px)` : undefined }}>
				<div style={{ display: "flex", alignItems: "center", transform: `scale(${lerp(lt, 0, 2.8, 0.94, 1.02, inOut)})` }}>
					<div style={{ transform: glitch ? `translateX(${Math.sin(lt * 140) * 14}px)` : undefined }}>
						<AppIcon size={104} t={lt} assemble={0.0} />
					</div>
					<div style={{ width: wm * 300, overflow: "hidden", marginLeft: 26 * wm }}>
						<div style={{ transform: `translateX(${(1 - wm) * -60}px)`, opacity: wm }}><Wordmark size={68} color="#fff" /></div>
					</div>
				</div>
			</Center>
			{glitch && Array.from({ length: 7 }).map((_, i) => (
				<div key={i} style={{ position: "absolute", left: 0, right: 0, top: 380 + ((i * 97 + Math.floor(lt * 60) * 53) % 320), height: 2 + (i % 3) * 3, background: `rgba(255,255,255,${0.5 - i * 0.05})` }} />
			))}
		</AbsoluteFill>
	)
}

const Meet: React.FC<P> = ({ t, lt }) => {
	const start = TL.typing.find((e) => e.id === "meet")!.t0
	const flash = t > start - 0.33 && t < start - 0.06
	return (
		<AbsoluteFill style={{ background: "#000" }}>
			<Center>
				{flash ? <div style={{ width: 110, height: 40, background: "#fff", boxShadow: "0 0 40px 10px rgba(255,255,255,.6)", borderRadius: 4 }} /> : t >= start ? <TypedLine id="meet" t={t} size={76} color="#fff" glow /> : null}
			</Center>
		</AbsoluteFill>
	)
}

const Cascade: React.FC<P> = ({ lt, d, t }) => {
	const word = "语音输入", FS = 112, LH = 136
	const swish = lt > 0.6 && lt < 0.86
	const col = lt >= 0.86
	const scroll = lerp(lt, 0.86, d, 0, 1, (x) => x)
	const rise = lerp(lt, d - 0.5, d + 0.4, 0, 1, out)
	return (
		<AbsoluteFill style={{ background: "#efefef", overflow: "hidden" }}>
			{!col && (
				<Center>
					<div style={{ fontFamily: CJK, fontWeight: 700, fontSize: FS, color: "#1c1e24", transform: swish ? `skewX(-14deg) translateX(${(lt - 0.6) * 300}px)` : undefined, filter: swish ? "blur(6px)" : undefined }}>{word}</div>
				</Center>
			)}
			{col && (
				<AbsoluteFill style={{ alignItems: "center" }}>
					<div style={{ position: "absolute", top: 540 - LH / 2 - scroll * LH * 5.5, display: "flex", flexDirection: "column", alignItems: "center" }}>
						{Array.from({ length: 16 }).map((_, i) => {
							const appear = clamp01((lt - 0.86 - Math.abs(i) * 0.035) / 0.12)
							const tint = clamp01((i - 7) / 5)
							return <div key={i} style={{ height: LH, fontFamily: CJK, fontWeight: 700, fontSize: FS, lineHeight: `${LH}px`, opacity: appear, color: tint > 0 ? `color-mix(in srgb, ${ACC} ${Math.round(tint * 100)}%, #1c1e24)` : "#1c1e24", transform: `translateY(${(1 - appear) * 40}px)`, filter: tint > 0.6 ? `blur(${(tint - 0.6) * 6}px)` : undefined }}>{word}</div>
						})}
					</div>
				</AbsoluteFill>
			)}
			{rise > 0 && (
				<Center style={{ transform: `translateY(${(1 - rise) * 900}px) perspective(1800px) rotateX(${18 * (1 - rise) + 14}deg) scale(.86)` }}>
					<HeroCard t={t} pill={<Pill t={t} state="语音输入" />} />
				</Center>
			)}
		</AbsoluteFill>
	)
}

const UiFn: React.FC<P> = ({ t, lt, d }) => {
	const tClick = M.ui_click, tFn = M.ui_fn
	const rx = lerp(lt, 0, d, 14, 3, out), sc = lerp(lt, 0, d, 1.0, 1.18, inOut)
	const focused = t >= tClick
	const on = t >= tFn
	const c = path(t, [[t - lt, 1500, 950], [tClick - 0.15, 1280, 470], [tClick + 0.4, 1300, 490], [tFn + 2, 1340, 520]])
	const pill = <div style={{ transform: `translateY(${on ? 0 : 0}px)`, opacity: on ? 1 : 0.0 }}><Pill t={t} state="语音输入" live /></div>
	return (
		<AbsoluteFill style={{ background: "#efefef" }}>
			<Center style={{ transform: `perspective(1800px) rotateX(${rx}deg) scale(${sc})` }}>
				<HeroCard t={t} pill={<div style={{ position: "relative" }}>
					<div style={{ opacity: on ? 0 : 1, position: "absolute", left: 0, bottom: 0, transform: `scale(${on ? 0.9 : 1})` }}><div style={{ width: 66, height: 66, borderRadius: 99, background: INK, display: "flex", alignItems: "center", justifyContent: "center" }}><Wave t={t} n={4} h={24} /></div></div>
					<div style={{ transform: `scaleX(${on ? lerp(t, tFn, tFn + 0.35, 0.2, 1) : 0.2})`, transformOrigin: "left center", opacity: on ? 1 : 0 }}>{pill}</div>
				</div>} right={
					<div style={{ width: 760, display: "flex", flexDirection: "column", gap: 18 }}>
						<div style={{ height: 70, borderRadius: 18, background: S2, border: focused ? `2px solid ${INK}` : `2px solid transparent`, display: "flex", alignItems: "center", padding: "0 26px", fontSize: 22, color: T4, fontFamily: CJK }}>
							{focused ? <Caret t={t} color={INK} /> : null}
						</div>
						<Bar w={520} h={14} /><Bar w={380} h={14} />
					</div>
				} />
			</Center>
			<Cursor x={c.x} y={c.y} down={Math.abs(t - tClick) < 0.08} />
			{t > tFn - 0.55 && (
				<div style={{ position: "absolute", right: 150, bottom: 110, opacity: lerp(t, tFn - 0.55, tFn - 0.3, 0, 1), transform: `scale(${lerp(t, tFn - 0.55, tFn - 0.3, 0.7, 1)})` }}>
					<Keycap label="Fn" t={t} press={tFn} size={150} />
				</div>
			)}
		</AbsoluteFill>
	)
}

const TypeCard: React.FC<P & { id: string; accentFrom: number; size?: number; exit?: boolean }> = ({ t, lt, d, id, accentFrom, size = 84, exit }) => (
	<WhiteCard>
		<Center style={exit ? whip(lt, d) : undefined}><TypedLine id={id} t={t} accentFrom={accentFrom} size={size} caret={!typed(id, t).done || Math.floor(t * 2.2) % 2 === 0} /></Center>
	</WhiteCard>
)

const Listen: React.FC<P> = ({ t, lt, d }) => {
	const tFn = M.listen_fn
	const { s } = typed("listen", t)
	const filler = s.slice(0, 2), rest = s.slice(2)
	const after = t >= tFn
	const collapse = lerp(lt, d - 0.55, d, 0, 1, inOut)
	const ry = lerp(lt, 0, d, -16, -4, out), sc = lerp(lt, 0, d, 1.22, 1.38, inOut)
	return (
		<AbsoluteFill style={{ background: "#efefef" }}>
			<Center style={{ transform: `perspective(1600px) rotateY(${ry}deg) rotateX(6deg) scale(${sc})` }}>
				<div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 46, opacity: 1 - collapse }}>
					<RawBubble t={t} live={!after} text={rest} filler={filler} w={1040} size={36} caret={!after} />
				</div>
				<div style={{ position: "absolute", top: 610, transform: `translateY(${-collapse * 80}px)` }}>
					<div style={{ transform: `scale(${1.7 * (1 - collapse * 0.55)})` }}>
						{collapse > 0.35 ? (
							<div style={{ width: 120, height: 66, borderRadius: 99, background: INK, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
								{[0, 1, 2].map((i) => <div key={i} style={{ width: 10, height: 10, borderRadius: 9, background: "#fff", opacity: 0.3 + 0.7 * Math.abs(Math.sin(t * 6 - i * 0.8)) }} />)}
							</div>
						) : <Pill t={t} state={after ? "润色中" : "语音输入"} live={!after} />}
					</div>
				</div>
			</Center>
			{t > tFn - 0.5 && t < tFn + 0.5 && (
				<div style={{ position: "absolute", right: 170, top: 150, opacity: lerp(t, tFn - 0.5, tFn - 0.3, 0, 1) * lerp(t, tFn + 0.3, tFn + 0.5, 1, 0) }}><Keycap label="Fn" t={t} press={tFn} size={140} /></div>
			)}
		</AbsoluteFill>
	)
}

const RAW1 = "第一版我们周三前给你，你先把品牌素材发我。", OUT1 = "第一版周三前发你，你先把品牌素材给我就行。"
const Refine: React.FC<P> = ({ t, lt, d }) => {
	const strike = lerp(lt, 0.25, 0.6, 0, 1)
	const morph = lerp(lt, 0.8, 1.9, 0, 1, inOut)
	const chars = Array.from(OUT1)
	return (
		<WhiteCard bg="#fff">
			<Center>
				<div style={{ width: 1300, fontFamily: CJK }}>
					<div style={{ opacity: lerp(lt, 0, 0.25, 0, 1) * (1 - morph * 0.35), transform: `translateY(${-morph * 20}px) scale(${1 - morph * 0.15})`, transformOrigin: "left center" }}>
						<div style={{ fontSize: 18, color: T3, letterSpacing: "0.14em", marginBottom: 14 }}>原始语音</div>
						<div style={{ fontSize: 40, color: "#3a3b40", lineHeight: 1.5 }}>
							<span style={{ color: T3, textDecoration: strike > 0 ? "line-through" : undefined, opacity: 1 - strike * 0.7 }}>呃，</span>{RAW1}
						</div>
					</div>
					<div style={{ height: 1, background: LINE, margin: "40px 0", transform: `scaleX(${lerp(lt, 0.6, 1.0, 0, 1)})`, transformOrigin: "left" }} />
					<div style={{ opacity: lerp(lt, 0.7, 0.9, 0, 1) }}>
						<div style={{ fontSize: 18, color: T3, letterSpacing: "0.14em", marginBottom: 14 }}>润色后 · 标准润色</div>
						<div style={{ fontSize: 52, fontWeight: 700, color: TXT, lineHeight: 1.45 }}>
							{chars.map((ch, i) => {
								const p = clamp01(morph * chars.length * 1.4 / chars.length - i / chars.length * 0.9)
								const q = clamp01(p * 3)
								return <span key={i} style={{ display: "inline-block", opacity: q, transform: `translateY(${(1 - q) * 18}px)`, filter: q < 1 ? `blur(${(1 - q) * 6}px)` : undefined }}>{ch}</span>
							})}
						</div>
					</div>
				</div>
			</Center>
		</WhiteCard>
	)
}

/** Generic chat app (monochrome mock; not any real brand). */
const ChatApp: React.FC<{ t: number; input: React.ReactNode; sent?: number; w?: number; h?: number }> = ({ t, input, sent = 0, w = 1560, h = 900 }) => (
	<Win w={w} h={h} title="当前场景 · 飞书 / 微信">
		<div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 330, background: S1, borderRight: `1px solid ${LINE}`, padding: 22, display: "flex", flexDirection: "column", gap: 16 }}>
			{Array.from({ length: 7 }).map((_, i) => (
				<div key={i} style={{ display: "flex", gap: 14, alignItems: "center", padding: 10, borderRadius: 12, background: i === 0 ? "#ececef" : undefined }}>
					<div style={{ width: 44, height: 44, borderRadius: 12, background: i === 0 ? INK : "#dedee2" }} />
					<div style={{ display: "flex", flexDirection: "column", gap: 8 }}><Bar w={120 + ((i * 37) % 60)} h={11} c="#d6d6da" /><Bar w={180 - ((i * 23) % 70)} h={9} /></div>
				</div>
			))}
		</div>
		<div style={{ position: "absolute", left: 330, right: 0, top: 0, bottom: 0 }}>
			<div style={{ position: "absolute", left: 50, top: 50, display: "flex", gap: 14, alignItems: "flex-start" }}>
				<div style={{ width: 44, height: 44, borderRadius: 12, background: "#dedee2" }} />
				<div style={{ background: S2, borderRadius: 16, padding: "18px 22px", display: "flex", flexDirection: "column", gap: 10 }}><Bar w={420} h={12} c="#d9d9dd" /><Bar w={300} h={12} c="#d9d9dd" /></div>
			</div>
			{sent > 0 && (
				<div style={{ position: "absolute", right: 50, top: 230 + (1 - sent) * 380, opacity: clamp01(sent * 3), transform: `scale(${0.9 + 0.1 * sent})`, transformOrigin: "right bottom" }}>
					<InkBubble w={640} size={24}>{OUT1}</InkBubble>
				</div>
			)}
			<div style={{ position: "absolute", left: 40, right: 40, bottom: 36, height: 150, borderRadius: 18, border: `1px solid ${LINE}`, background: "#fff", padding: "22px 26px", fontSize: 26, color: TXT, fontFamily: CJK }}>{input}</div>
		</div>
	</Win>
)

const Sent: React.FC<P> = ({ t, lt, d }) => {
	const paste = 0.45, send = 2.55
	const push = lerp(lt, 0.2, 2.3, 0, 1, inOut), back = lerp(lt, send - 0.1, send + 0.6, 0, 1, inOut)
	const z = 0.94 + push * 0.6 - back * 0.5
	const ox = 1125, oy = 860 - back * 360
	const sentP = lerp(lt, send, send + 0.5, 0, 1, out)
	const pasted = lt >= paste && lt < send
	const hl = lerp(lt, paste, paste + 0.5, 1, 0)
	return (
		<AbsoluteFill style={{ background: "#efefef" }}>
			<AbsoluteFill style={{ transform: `scale(${z})`, transformOrigin: `${ox}px ${oy}px` }}>
				<Center>
					<ChatApp t={t} sent={sentP} input={pasted ? <span style={{ background: `rgba(47,95,168,${hl * 0.18})` }}>{OUT1}</span> : lt < paste ? <Caret t={t} color={INK} /> : null} />
				</Center>
				<div style={{ position: "absolute", left: 925, top: 712, opacity: lerp(lt, 0, 0.2, 0, 1) }}>
					<Pill t={t} state={lt < paste ? "润色中" : "已写好"} />
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	)
}

const Tabs: React.FC<P & { from: number; to: number; click: number; style0: string; style1: string }> = ({ t, lt, d, from, to, click, style0, style1 }) => {
	const active = t >= click ? to : from
	const z = lerp(lt, 0, d, 1.0, 1.1, inOut)
	const chipX = [0, 180, 290, 400, 528]
	const c = path(t, [[t - lt, 1400, 820], [click - 0.12, 640 + chipX[to] + 40, 548], [click + 1, 640 + chipX[to] + 50, 560]])
	return (
		<AbsoluteFill>
			<MeshBg lt={lt} dim={0.15} />
			<AbsoluteFill style={{ transform: `scale(${z}) perspective(1800px) rotateY(-8deg)`, transformOrigin: "900px 540px" }}>
				<div style={{ position: "absolute", left: 560, top: 250, width: 1100, height: 560, borderRadius: 26, background: "#fff", boxShadow: "0 40px 100px rgba(0,0,0,.4)", padding: "60px 70px", fontFamily: CJK }}>
					<div style={{ fontSize: 16, color: T3, fontFamily: MONO }}>01</div>
					<div style={{ fontSize: 52, fontWeight: 500, color: TXT, lineHeight: 1.25, marginTop: 14 }}>你在哪里说，<br />决定我们怎么写。</div>
					<div style={{ fontSize: 20, color: T2, marginTop: 20 }}>MosMos 根据当前应用自动选择表达方式，也可以随时切换。</div>
					<div style={{ display: "flex", gap: 12, marginTop: 36, position: "absolute", left: 80, top: 280 }}>{SCENES.map((s, i) => <Chip key={s} label={s} active={i === active} size={20} />)}</div>
					<div style={{ position: "absolute", left: 70, bottom: 50, opacity: 0.95 }}><Pill t={t} state="语音输入" sub={t >= click ? style1 : style0} /></div>
				</div>
			</AbsoluteFill>
			<Cursor x={c.x} y={c.y} down={Math.abs(t - click) < 0.08} />
		</AbsoluteFill>
	)
}

const MailWin: React.FC<{ children?: React.ReactNode; w?: number; h?: number }> = ({ children, w = 1400, h = 860 }) => (
	<Win w={w} h={h} title="当前场景 · 邮件">
		<div style={{ padding: "26px 44px", display: "flex", flexDirection: "column", gap: 18, fontFamily: CJK }}>
			<div style={{ display: "flex", gap: 20, alignItems: "center", borderBottom: `1px solid ${LINE}`, paddingBottom: 16 }}><span style={{ color: T3, fontSize: 18 }}>收件人</span><Bar w={220} h={12} /></div>
			<div style={{ display: "flex", gap: 20, alignItems: "center", borderBottom: `1px solid ${LINE}`, paddingBottom: 16 }}><span style={{ color: T3, fontSize: 18 }}>主题</span><Bar w={340} h={12} /></div>
			<div style={{ position: "relative", minHeight: 520 }}>{children}</div>
		</div>
	</Win>
)
const MAIL_OUT = ["李经理，您好：", "", "第一版方案将在本周三前发给您。麻烦您今天将品牌素材发给我，收到后我会提前检查。", "", "谢谢！", "小林"]

const MailSpeak: React.FC<P> = ({ t, lt, d }) => {
	const { s } = typed("mail_speak", t)
	const after = t >= M.mail_fn
	const sc = lerp(lt, 0, d, 0.95, 1.08, inOut)
	return (
		<AbsoluteFill>
			<MeshBg lt={lt + 2} dim={0.2} />
			<Center style={{ transform: `scale(${sc})` }}>
				<MailWin>
					<div style={{ position: "absolute", left: 0, top: 40 }}><RawBubble t={t} live={!after} filler={s.slice(0, 3)} text={s.slice(3)} w={1300} size={30} caret={!after} /></div>
					<div style={{ position: "absolute", left: 0, top: 420, transform: "scale(1.3)", transformOrigin: "left top" }}><Pill t={t} state={after ? "润色中" : "语音输入"} sub="风格：自动 · 完整专业" live={!after} /></div>
				</MailWin>
			</Center>
			{t > M.mail_fn - 0.45 && <div style={{ position: "absolute", right: 120, bottom: 90, opacity: lerp(t, M.mail_fn - 0.45, M.mail_fn - 0.25, 0, 1) }}><Keycap label="Fn" t={t} press={M.mail_fn} size={130} /></div>}
		</AbsoluteFill>
	)
}
const MailOut: React.FC<P> = ({ t, lt, d }) => {
	const sc = lerp(lt, 0, d, 1.08, 1.22, inOut)
	return (
		<AbsoluteFill>
			<MeshBg lt={lt + 5} dim={0.2} />
			<Center style={{ transform: `scale(${sc})`, transformOrigin: "760px 520px" }}>
				<MailWin>
					<div style={{ position: "absolute", left: 0, top: 30, width: 1250, fontSize: 30, lineHeight: 1.6, color: TXT }}>
						{MAIL_OUT.map((l, i) => { const p = lerp(lt, 0.1 + i * 0.16, 0.4 + i * 0.16, 0, 1); return <div key={i} style={{ minHeight: l ? undefined : 22, opacity: p, transform: `translateY(${(1 - p) * 16}px)` }}>{l}</div> })}
					</div>
					<div style={{ position: "absolute", left: 0, top: 420, transform: "scale(1.3)", transformOrigin: "left top" }}><Pill t={t} state="已写好" sub="风格：自动 · 完整专业" /></div>
				</MailWin>
			</Center>
		</AbsoluteFill>
	)
}

const DOC_RAW = "项目复盘，目标是把首页上线提前到周五，结果是交互稿按时完成，但是品牌素材晚了一天，下一步今天确认视觉稿，明天开始开发。"
const DOC_OUT: [string, string][] = [["项目复盘", ""], ["目标：", "将首页上线时间提前至周五。"], ["结果：", "交互稿按时完成，但品牌素材晚到一天。"], ["下一步：", "今天确认视觉稿，明天开始开发。"]]
const DocWin: React.FC<{ t: number; lt: number; mode: "open" | "close" }> = ({ t, lt, mode }) => (
	<Win w={1400} h={860} title="当前场景 · 文档">
		<div style={{ position: "absolute", inset: 0, padding: "60px 120px", fontFamily: CJK }}>
			{mode === "open" ? (
				<>
					<RawBubble t={t} filler="嗯，" text={DOC_RAW} w={1160} size={28} />
					<div style={{ marginTop: 60, transform: "scale(1.3)", transformOrigin: "left top" }}><Pill t={t} state="润色中" sub="风格：自动 · 结构清晰" /></div>
				</>
			) : (
				<div style={{ display: "flex", flexDirection: "column", gap: 34 }}>
					{DOC_OUT.map(([k, v], i) => { const p = lerp(lt, 0.05 + i * 0.18, 0.35 + i * 0.18, 0, 1); return (
						<div key={i} style={{ opacity: p, transform: `translateY(${(1 - p) * 20}px)`, fontSize: i === 0 ? 56 : 34, fontWeight: i === 0 ? 700 : 400, color: TXT }}><span style={{ fontWeight: 700 }}>{k}</span>{v}</div>) })}
				</div>
			)}
		</div>
	</Win>
)
const DocOpen: React.FC<P> = ({ t, lt }) => (
	<AbsoluteFill><MeshBg lt={lt + 8} dim={0.2} /><Center style={{ transform: `scale(${lerp(lt, 0, 0.35, 0.9, 1)})`, opacity: lerp(lt, 0, 0.2, 0, 1) }}><DocWin t={t} lt={lt} mode="open" /></Center></AbsoluteFill>
)
const DocClose: React.FC<P> = ({ t, lt, d }) => (
	<AbsoluteFill style={{ background: "#fff" }}><AbsoluteFill style={{ transform: `scale(${lerp(lt, 0, d, 1.25, 1.45, inOut)})`, transformOrigin: "700px 420px" }}><Center><DocWin t={t} lt={lt} mode="close" /></Center></AbsoluteFill></AbsoluteFill>
)

const QMore: React.FC<P> = ({ lt }) => {
	const k = lerp(lt, 0, 0.3, 0, 1), big = lerp(lt, 0.45, 0.75, 0, 1), blue = lt > 1.05
	return (
		<WhiteCard>
			<Center>
				<div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18, fontFamily: CJK }}>
					<div style={{ fontSize: 34, color: "#2a2b30", opacity: k, transform: `translateY(${(1 - k) * 12}px)` }}>不只是聊天</div>
					<div style={{ fontSize: 120, fontWeight: 700, color: blue ? ACC : TXT, opacity: big, transform: `scale(${0.92 + big * 0.08})` }}>还能说给谁听？</div>
				</div>
			</Center>
		</WhiteCard>
	)
}

const AiWin: React.FC<{ children: React.ReactNode }> = ({ children }) => (
	<Win w={1500} h={880} title="当前场景 · 提示词">
		<div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 70, fontFamily: CJK }}>
			<div style={{ fontSize: 40, fontWeight: 600, color: TXT }}>有什么可以帮你？</div>
			<div style={{ marginTop: 36, width: 1180, minHeight: 300, borderRadius: 24, border: `1px solid ${LINE}`, boxShadow: "0 10px 30px rgba(0,0,0,.05)", padding: "28px 34px", position: "relative" }}>{children}</div>
		</div>
	</Win>
)
const PROMPT_OUT = ["请对比分析三款语音输入产品。", "", "重点维度：", "1. 场景识别", "2. 词库能力", "3. 会议记录", "", "输出要求：使用表格呈现差异，并给出 3 条产品改进建议。"]
const Prompt: React.FC<P> = ({ t, lt, d, sh }) => {
	const f = Math.round(t * FPS), k = sub(sh, f), st = t - subT(sh, k)
	const { s } = typed("prompt", t)
	const raw = <RawBubble t={t} live filler={s.slice(0, 5)} text={s.slice(5)} w={1100} size={28} caret />
	const outp = (
		<div style={{ fontSize: 28, lineHeight: 1.55, color: TXT }}>
			{PROMPT_OUT.map((l, i) => { const p = clamp01((t - subT(sh, 2) - i * 0.09) / 0.2); return <div key={i} style={{ minHeight: l ? undefined : 18, opacity: p, fontWeight: l.endsWith("：") ? 700 : 400 }}>{l}</div> })}
		</div>
	)
	const pillState = k < 2 ? "语音输入" : "已写好"
	const view = [
		{ s: lerp(st, 0, 0.55, 0.9, 0.98), ox: 960, oy: 540 },
		{ s: lerp(st, 0, 2.2, 1.45, 1.6), ox: 760, oy: 420 },
		{ s: lerp(st, 0, 1.6, 1.0, 1.05), ox: 960, oy: 540 },
		{ s: lerp(st, 0, 1.0, 1.5, 1.75), ox: 700, oy: 520 },
	][k]
	return (
		<AbsoluteFill style={{ background: "#efefef" }}>
			<AbsoluteFill style={{ transform: `scale(${view.s})`, transformOrigin: `${view.ox}px ${view.oy}px` }}>
				<Center>
					<AiWin>{k < 2 ? raw : outp}</AiWin>
				</Center>
				<div style={{ position: "absolute", left: 760, top: 880 }}><Pill t={t} state={pillState} sub="风格：自动 · 要求明确" live={k < 2} /></div>
			</AbsoluteFill>
		</AbsoluteFill>
	)
}

const Term: React.FC<P> = ({ t, lt, sh }) => {
	const f = Math.round(t * FPS), k = sub(sh, f), st = t - subT(sh, k)
	const raw = typed("term_raw", t).s, cmd = typed("term_cmd", t)
	const view = [{ s: lerp(st, 0, 0.6, 0.95, 1.0), ox: 960, oy: 540, ry: -10 }, { s: lerp(st, 0, 0.75, 1.45, 1.55), ox: 420, oy: 860, ry: -4 }, { s: lerp(st, 0, 1.7, 1.7, 1.85), ox: 300, oy: 330, ry: 0 }][k]
	return (
		<AbsoluteFill style={{ background: "#050506" }}>
			<AbsoluteFill style={{ transform: `perspective(1800px) rotateY(${view.ry}deg) scale(${view.s})`, transformOrigin: `${view.ox}px ${view.oy}px` }}>
				<Center>
					<Win w={1500} h={860} dark title="当前场景 · 代码与终端">
						<div style={{ position: "absolute", inset: 0, padding: "40px 50px", fontFamily: MONO, color: "#d7d8db", fontSize: 26 }}>
							<div style={{ color: "#6e7075" }}>Last login on ttys001</div>
							<div style={{ marginTop: 140, display: "flex", gap: 16, fontSize: 34 }}><span style={{ color: "#9a9ca1" }}>$</span><span>{cmd.s}</span>{t > subT(sh, 2) && <Caret t={t} solid={cmd.typing} color="#fff" />}</div>
							{cmd.done && <div style={{ marginTop: 18, fontFamily: CJK, fontSize: 20, color: "#8a8c90" }}>命令已生成 · 按 Enter 执行</div>}
							<div style={{ position: "absolute", left: 50, bottom: 50, display: "flex", flexDirection: "column", gap: 22 }}>
								{k < 2 && <div style={{ background: "#1c1d21", borderRadius: 18, padding: "18px 24px", fontFamily: CJK, fontSize: 28, color: "#e4e4e7", width: 1100, display: "flex", gap: 14 }}><Wave t={t} live n={6} h={26} color="#c8c9cc" /><span><span style={{ color: "#8a8c90" }}>{raw.slice(0, 5)}</span>{raw.slice(5)}</span></div>}
								<Pill t={t} state={k < 2 ? "语音输入" : "已写好"} sub="风格：自动 · 生成命令" live={k < 2} />
							</div>
						</div>
					</Win>
				</Center>
			</AbsoluteFill>
		</AbsoluteFill>
	)
}

const QMeet: React.FC<P> = ({ t, lt }) => {
	const echo = lerp(lt, 1.35, 1.6, 0, 1)
	return (
		<WhiteCard>
			<Center>
				<div style={{ position: "relative" }}>
					<TypedLine id="q_meet" t={t} accentFrom={3} size={84} caret={!typed("q_meet", t).done} />
					{echo > 0 && <div style={{ position: "absolute", left: 0, top: 96, clipPath: "inset(0 0 45% 0)", opacity: echo * 0.5 }}><TypedLine id="q_meet" t={t} accentFrom={3} size={84} caret={false} /></div>}
				</div>
			</Center>
		</WhiteCard>
	)
}

const SPK = [["说话人 1", "10:03", "第一版交互稿我会在周三之前完成。"], ["说话人 2", "10:05", "客户的品牌素材今天下午同步到群里。"], ["说话人 3", "10:07", "素材到位以后，周四开始做视觉方案。"]]
const MeetingCard: React.FC<{ t: number; lt: number; lines: number; done?: boolean; panel?: number; timer?: string }> = ({ t, lt, lines, done, panel = 0, timer }) => (
	<div style={{ width: 1600, height: 720, borderRadius: 30, background: "#141416", position: "relative", overflow: "hidden", boxShadow: "0 50px 120px rgba(0,0,0,.5)", fontFamily: CJK }}>
		<Tex name="ascii-bird" style={{ width: 980, height: 736, left: 330, top: -20, filter: "invert(1)", opacity: 0.38, mixBlendMode: "screen" }} />
		<div style={{ position: "absolute", left: 40, top: 32, fontSize: 16, color: "#9a9ca1", display: "flex", gap: 10, alignItems: "center", letterSpacing: "0.1em" }}><div style={{ width: 9, height: 9, borderRadius: 9, background: done ? "#9a9ca1" : "#fff", opacity: done ? 1 : 0.4 + 0.6 * Math.abs(Math.sin(t * 3)) }} />{done ? "会议记录 · 已完成" : "录制中 · 3 位发言人"}</div>
		<div style={{ position: "absolute", right: 40, top: 26, display: "flex", gap: 12, alignItems: "center", color: "#9a9ca1", fontFamily: MONO, fontSize: 18 }}><Wave t={t} live={!done} n={6} h={22} color="#c8c9cc" />{timer}</div>
		<div style={{ position: "absolute", left: 40, bottom: 44, display: "flex", flexDirection: "column", gap: 26 }}>
			{SPK.slice(0, lines).map(([n, tm, tx], i) => (
				<div key={i} style={{ borderLeft: "2px solid #3a3b40", paddingLeft: 18 }}>
					<div style={{ fontSize: 15, color: "#8a8c90", fontFamily: MONO, letterSpacing: "0.1em" }}>{n}  {tm}</div>
					<div style={{ fontSize: 26, color: "#e9e9ec", marginTop: 6 }}>{tx}</div>
				</div>
			))}
		</div>
		{panel > 0 && (
			<div style={{ position: "absolute", right: 40, top: 80, width: 560, height: 600, borderRadius: 22, background: "#fff", padding: 40, opacity: panel, transform: `translateY(${(1 - panel) * 30}px)` }}>
				<div style={{ fontSize: 15, color: T3, letterSpacing: "0.1em" }}>关键结论</div>
				<div style={{ fontSize: 24, color: TXT, marginTop: 14, lineHeight: 1.6 }}>首页交付计划保持不变，各环节将按素材、交互与视觉的顺序推进。</div>
				<div style={{ height: 1, background: LINE, margin: "28px 0" }} />
				<div style={{ fontSize: 15, color: T3, letterSpacing: "0.1em" }}>待办事项 3 项</div>
				{["今天同步品牌素材", "周三前提交交互稿", "周四启动视觉设计"].map((x) => <div key={x} style={{ display: "flex", gap: 14, alignItems: "center", fontSize: 22, color: TXT, marginTop: 18 }}><div style={{ width: 16, height: 16, borderRadius: 9, border: `1.5px solid ${T3}` }} />{x}</div>)}
			</div>
		)}
	</div>
)
const Meeting: React.FC<P> = ({ t, lt, d }) => {
	const lines = lt < 0.9 ? 0 : lt < 1.6 ? 1 : lt < 2.3 ? 2 : 3
	const secs = 12 + Math.floor(lt * 1.6)
	return (
		<AbsoluteFill style={{ background: "#07080a" }}>
			<Center style={{ transform: `perspective(1800px) rotateY(${lerp(lt, 0, d, -16, -4)}deg) rotateX(6deg) scale(${lerp(lt, 0, d, 0.9, 1.05, inOut)})` }}>
				<MeetingCard t={t} lt={lt} lines={lines} timer={`00:${String(secs).padStart(2, "0")}`} />
			</Center>
			{lt < 1.0 && <div style={{ position: "absolute", right: 140, bottom: 90, display: "flex", gap: 18, alignItems: "center", opacity: lerp(lt, 0, 0.15, 0, 1) * lerp(lt, 0.75, 1.0, 1, 0) }}><Keycap label="Fn" t={t} press={M.meet_fn} size={120} dark /><span style={{ color: "#8a8c90", fontSize: 50, fontFamily: SANS }}>+</span><Keycap label="Shift" t={t} press={M.meet_fn} size={120} wide={1.5} dark /></div>}
		</AbsoluteFill>
	)
}

const CardYours: React.FC<P> = ({ lt }) => {
	const word = Array.from("由你决定")
	return (
		<WhiteCard>
			<Center>
				<div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, fontFamily: CJK }}>
					<div style={{ fontSize: 34, color: "#3a3b40", opacity: lerp(lt, 0, 0.12, 0, 1) }}>保留多少原话</div>
					<div style={{ fontSize: 120, fontWeight: 700, color: ACC, display: "flex", minHeight: 170 }}>
						{word.map((c, i) => { const at = 0.15 + i * 0.2727; const p = lerp(lt, at, at + 0.12, 0, 1); return <span key={i} style={{ opacity: lt >= at ? 1 : 0, transform: `scale(${1.25 - 0.25 * p})`, display: "inline-block" }}>{c}</span> })}
					</div>
				</div>
			</Center>
		</WhiteCard>
	)
}

const POL = [
	{ id: "关闭", hint: "原样直出，一个字不改", label: "关闭", out: "嗯，我觉得这个方案吧，这个方案可以先，先做一个小范围的测试，然后然后看看反馈，不对，是先收集一下反馈，再决定要不要，就是要不要全部上线。" },
	{ id: "标准", hint: "改善语法与语序", label: "标准润色", out: "我觉得这个方案可以先做一个小范围测试，收集反馈后，再决定要不要全部上线。" },
	{ id: "高级", hint: "重组为简洁成稿", label: "高级润色", out: "先小范围测试并收集反馈，再决定是否全面上线。" },
]
const PolishCard: React.FC<{ lvl: number; dark?: boolean; t: number }> = ({ lvl, dark, t }) => {
	const fg = dark ? "#f0f0f2" : TXT, sub = dark ? "#8a8c90" : T3, bg = dark ? "#141416" : "#fff", ln = dark ? "#2a2b30" : LINE
	return (
		<div style={{ width: 1500, height: 760, borderRadius: 30, background: bg, boxShadow: dark ? "0 50px 120px rgba(0,0,0,.6), 0 0 0 1px #232428" : "0 50px 120px rgba(10,20,40,.16), 0 0 0 1px #e6e6e9", padding: "64px 80px", fontFamily: CJK, position: "relative" }}>
			<div style={{ fontSize: 16, color: sub, letterSpacing: "0.12em" }}>原始语音</div>
			<div style={{ fontSize: 24, color: sub, lineHeight: 1.6, marginTop: 12, width: 1300 }}>{POL[0].out}</div>
			<div style={{ marginTop: 44, display: "flex", alignItems: "center", gap: 0, width: 1300, position: "relative" }}>
				<div style={{ position: "absolute", left: 0, right: 0, top: 9, height: 3, background: ln, borderRadius: 3 }} />
				<div style={{ position: "absolute", left: 0, width: `${lvl * 50}%`, top: 9, height: 3, background: fg, borderRadius: 3 }} />
				{POL.map((p, i) => (
					<div key={p.id} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: i === 0 ? "flex-start" : i === 1 ? "center" : "flex-end", position: "relative" }}>
						<div style={{ width: 22, height: 22, borderRadius: 22, background: i <= lvl ? fg : bg, border: `3px solid ${i <= lvl ? fg : ln}` }} />
						<div style={{ fontSize: 24, fontWeight: i === lvl ? 700 : 400, color: i === lvl ? fg : sub, marginTop: 16 }}>{p.id}</div>
						<div style={{ fontSize: 16, color: sub, marginTop: 4 }}>{p.hint}</div>
					</div>
				))}
			</div>
			<div style={{ marginTop: 48, fontSize: 16, color: sub, letterSpacing: "0.12em" }}>{POL[lvl].label}</div>
			<div style={{ fontSize: lvl === 2 ? 44 : 32, fontWeight: lvl === 0 ? 400 : 600, color: fg, lineHeight: 1.5, marginTop: 10, width: 1300 }}>{POL[lvl].out}</div>
		</div>
	)
}
const HOT: [string, string, boolean][] = [["请把", "请把", false], ["飞马", "Figma", true], ["里的", "里的", false], ["尼姆布斯", "Nimbus", true], ["文件发给", "文件发给", false], ["林清和", "林清禾", true], ["。", "。", false]]
const HotCard: React.FC<{ p: number; dark?: boolean; t: number }> = ({ p, dark, t }) => {
	const fg = dark ? "#f0f0f2" : TXT
	return (
		<div style={{ width: 1500, height: 700, borderRadius: 30, background: dark ? "#141416" : "#f1f1f3", position: "relative", overflow: "hidden", fontFamily: CJK, boxShadow: "0 50px 120px rgba(0,0,0,.2)" }}>
			<Tex name="ascii-orchid" style={{ width: 620, height: 826, right: 60, top: -60, opacity: dark ? 0.25 : 0.7, filter: dark ? "invert(1)" : undefined }} />
			<div style={{ position: "absolute", left: 60, top: 44, fontSize: 18, color: dark ? "#8a8c90" : T2, letterSpacing: "0.1em" }}>我的热词 · 3 条已启用</div>
			<div style={{ position: "absolute", left: 60, top: 260, background: dark ? "#1f2024" : "#fff", borderRadius: 22, padding: "30px 40px", display: "flex", alignItems: "center", gap: 6, fontSize: 44, color: fg, boxShadow: "0 20px 50px rgba(0,0,0,.12)" }}>
				<Wave t={t} n={6} h={36} color={fg} /><span style={{ width: 16 }} />
				{HOT.map(([a, b, hw], i) => {
					if (!hw) return <span key={i}>{a}</span>
					const q = clamp01(p * 3 - (i / HOT.length) * 1.5)
					return <span key={i} style={{ position: "relative", display: "inline-block", padding: "0 6px", borderRadius: 8, background: q > 0.5 ? (dark ? "#2d3a52" : "#e3ebf7") : (dark ? "#2a2b30" : "#ebebee") }}>
						<span style={{ fontWeight: q > 0.5 ? 700 : 400, color: q > 0.5 ? (dark ? "#9fbbe6" : ACC) : (dark ? "#8a8c90" : T3) }}>{q > 0.5 ? b : a}</span>
					</span>
				})}
			</div>
		</div>
	)
}
const Polish: React.FC<P> = ({ t, lt, sh }) => {
	const f = Math.round(t * FPS), k = sub(sh, f), st = t - subT(sh, k)
	// [content, level/progress, dark, scale, origin]
	const S: [string, number, boolean, number, number, number][] = [
		["pol", 1, true, 0.95, 960, 540], ["pol", 0, false, 1.0, 960, 540], ["pol", 2, true, 1.6, 760, 820], ["pol", 2, false, 1.0, 960, 540],
		["pol", 1, true, 1.55, 960, 700], ["hot", 1, false, 1.0, 960, 540], ["hot", 1, true, 1.5, 700, 560], ["pol", 2, false, 1.05, 960, 540]]
	const [c, lvl, dark, z, ox, oy] = S[k]
	const zz = z * (1 + st * 0.03)
	const bg = dark ? "#07080a" : "#ececee"
	const hp = k === 5 ? lerp(st, 0.2, 0.9, 0, 1, (x) => x) : 1
	return (
		<AbsoluteFill style={{ background: bg }}>
			<AbsoluteFill style={{ transform: `scale(${zz})`, transformOrigin: `${ox}px ${oy}px` }}>
				<Center>{c === "pol" ? <PolishCard lvl={lvl} dark={dark} t={t} /> : <HotCard p={hp} dark={dark} t={t} />}</Center>
			</AbsoluteFill>
		</AbsoluteFill>
	)
}

const TypeDel: React.FC<P> = ({ t }) => {
	const a = typed("typedel1", t), b = typed("typedel2", t)
	const e = TL.typing.find((x) => x.id === "typedel2")!
	const id = t >= e.t0 ? "typedel2" : "typedel1"
	return <WhiteCard><Center><TypedLine id={id} t={t} size={84} caret /></Center></WhiteCard>
}

const MINI = ["飞书 / 微信", "邮件", "文档", "提示词", "代码与终端", "热词", "会议纪要", "Fn", "润色", "待办事项"]
const Orbit: React.FC<P> = ({ t, lt, d }) => {
	const word = Array.from("都能直接说")
	const push = lerp(lt, d - 0.4, d, 0, 1, inQ)
	return (
		<WhiteCard bg="#fff">
			<AbsoluteFill style={{ transform: `scale(${1 + push * 2.4})`, filter: push > 0.02 ? `blur(${push * 22}px)` : undefined, opacity: 1 - push * 0.6 }}>
				{MINI.map((m, i) => {
					const a = (i / MINI.length) * Math.PI * 2 + lt * 0.55
					const x = 960 + Math.cos(a) * 720, y = 540 + Math.sin(a) * 330
					const zf = 0.75 + 0.25 * (Math.sin(a) + 1) / 2
					const app = lerp(lt, 0.05 + i * 0.03, 0.4 + i * 0.03, 0, 1)
					return (
						<div key={m} style={{ position: "absolute", left: x, top: y, transform: `translate(-50%,-50%) scale(${zf * app})`, opacity: app }}>
							<div style={{ width: 210, borderRadius: 18, background: "#fff", boxShadow: "0 16px 40px rgba(10,20,40,.12), 0 0 0 1px #ececef", padding: 18, display: "flex", flexDirection: "column", gap: 12 }}>
								<div style={{ display: "flex", gap: 8, alignItems: "center" }}><div style={{ width: 8, height: 8, borderRadius: 8, background: i % 3 === 0 ? ACC : INK }} /><span style={{ fontFamily: CJK, fontSize: 16, color: "#3a3b40" }}>{m}</span></div>
								{i % 2 === 0 ? <Wave t={t + i} n={12} h={22} color="#c3c4c8" /> : <><Bar w={160} h={9} /><Bar w={110} h={9} /></>}
							</div>
						</div>
					)
				})}
				<Center>
					<div style={{ fontFamily: CJK, fontWeight: 700, fontSize: 150, color: TXT, display: "flex" }}>
						{word.map((c, i) => {
							const p = lerp(lt, 0.0 + i * 0.05, 0.4 + i * 0.05, 0, 1)
							const sx = Math.sin(i * 2.3) * 260, sy = Math.cos(i * 1.7) * 160
							return <span key={i} style={{ display: "inline-block", transform: `translate(${(1 - p) * sx}px, ${(1 - p) * sy}px) scale(${0.4 + 0.6 * p}) rotate(${(1 - p) * (i % 2 ? 25 : -25)}deg)`, opacity: p, filter: p < 1 ? `blur(${(1 - p) * 8}px)` : undefined }}>{c}</span>
						})}
					</div>
				</Center>
			</AbsoluteFill>
		</WhiteCard>
	)
}

const MMeet: React.FC<P> = ({ t, lt, sh }) => {
	const f = Math.round(t * FPS), k = sub(sh, f), st = t - subT(sh, k)
	return (
		<AbsoluteFill style={{ background: "#07080a" }}>
			<AbsoluteFill style={{ transform: k === 0 ? `scale(${lerp(st, 0, 1.4, 1.45, 1.6)})` : `scale(${lerp(st, 0, 1.0, 1.75, 1.85)})`, transformOrigin: k === 0 ? "300px 800px" : "1560px 480px" }}>
				<Center><MeetingCard t={t} lt={lt} lines={3} panel={k === 0 ? 0 : 1} timer="01:18" /></Center>
			</AbsoluteFill>
		</AbsoluteFill>
	)
}
const HOW: [string, string, string][] = [["01", "点击任何输入框", "任意应用"], ["02", "按一次 Fn，开始说", "Fn"], ["03", "再按一次，文字写好", "Fn"], ["04", "Fn + Shift，记整场会", "Fn + Shift"]]
const HOWW: [string, string, string][] = [["01", "点击任何输入框", "任意应用"], ["02", "按一次右 Alt，开始说", "右 Alt"], ["03", "再按一次，文字写好", "右 Alt"], ["04", "Alt + M，记整场会", "Alt + M"]]
const HowList: React.FC<{ rows: [string, string, string][]; active: number; title: string }> = ({ rows, active, title }) => (
	<div style={{ width: 1300, background: "#fff", borderRadius: 28, padding: "50px 70px", boxShadow: "0 40px 100px rgba(10,20,40,.14)", fontFamily: CJK }}>
		<div style={{ fontSize: 44, fontWeight: 500, color: TXT, marginBottom: 26 }}>{title}</div>
		{rows.map(([n, a, kk], i) => (
			<div key={n} style={{ display: "flex", alignItems: "center", gap: 30, padding: "24px 0", borderTop: `1px solid ${i === active ? INK : LINE}` }}>
				<span style={{ fontFamily: MONO, fontSize: 16, color: T3 }}>{n}</span>
				<span style={{ flex: 1, fontSize: 30, color: i === active ? TXT : T2, fontWeight: i === active ? 600 : 400 }}>{a}</span>
				<span style={{ fontFamily: MONO, fontSize: 18, padding: "8px 16px", borderRadius: 8, background: i === active ? INK : S2, color: i === active ? "#fff" : T2 }}>{kk}</span>
			</div>
		))}
	</div>
)
const MTodo: React.FC<P> = ({ t, lt, sh }) => {
	const f = Math.round(t * FPS), k = sub(sh, f), st = t - subT(sh, k)
	if (k === 0) {
		const items = ["今天同步品牌素材", "周三前提交交互稿", "周四启动视觉设计"]
		return (
			<AbsoluteFill style={{ background: "#ececee" }}>
				<Center style={{ transform: `scale(${lerp(st, 0, 0.8, 1.15, 1.25)})` }}>
					<div style={{ width: 900, background: "#fff", borderRadius: 28, padding: 56, boxShadow: "0 40px 100px rgba(10,20,40,.14)", fontFamily: CJK }}>
						<div style={{ fontSize: 18, color: T3, letterSpacing: "0.12em" }}>待办事项 3 项</div>
						{items.map((x, i) => { const ck = t >= M.todo_check[0] + i * 0.18; return <div key={x} style={{ display: "flex", gap: 22, alignItems: "center", fontSize: 38, color: ck ? T3 : TXT, marginTop: 28 }}><div style={{ width: 30, height: 30, borderRadius: 30, border: `2px solid ${ck ? INK : T4}`, background: ck ? INK : "transparent", color: "#fff", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>{ck ? "✓" : ""}</div>{x}</div> })}
					</div>
				</Center>
			</AbsoluteFill>
		)
	}
	return (
		<AbsoluteFill style={{ background: k === 1 ? "#ececee" : "#07080a" }}>
			<Center style={{ transform: `scale(${lerp(st, 0, 1.0, 1.0, 1.08)})` }}>
				<HowList rows={k === 1 ? HOW : HOWW} active={3} title={k === 1 ? "一个键，两种用法。" : "两个快捷键，两种用法。"} />
			</Center>
		</AbsoluteFill>
	)
}
const MHot: React.FC<P> = ({ t, lt, d }) => {
	const t0 = t - lt
	return (
		<AbsoluteFill style={{ background: "#07080a" }}>
			<Center style={{ transform: `scale(${lerp(lt, 0, d, 1.0, 1.1)})` }}>
				<div style={{ display: "flex", gap: 160, fontFamily: CJK }}>
					{[["Fn", "macOS 15+ · Apple 芯片", 0.3, 1], ["右 Alt", "Windows 10 / 11 · 64 位", 0.85, 1.4]].map(([k, cap, p, w]) => (
						<div key={k as string} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 36 }}>
							<Keycap label={k as string} t={t} press={t0 + (p as number)} size={200} wide={w as number} dark />
							<div style={{ color: "#8a8c90", fontSize: 24 }}>{cap}</div>
						</div>
					))}
				</div>
			</Center>
		</AbsoluteFill>
	)
}
const CardCards: React.FC<P> = ({ t, lt }) => {
	const word = Array.from("想说就说")
	const tex: [string, number, number, number][] = [["ascii-dunes", 300, 260, -4], ["ascii-school", 1620, 250, 3], ["ascii-tree", 300, 820, 3], ["ascii-orchid", 1620, 830, -3]]
	return (
		<WhiteCard bg="#fff">
			{tex.map(([n, x, y, r], i) => { const p = lerp(lt, 0.05 + i * 0.06, 0.45 + i * 0.06, 0, 1); return (
				<div key={n} style={{ position: "absolute", left: x, top: y + Math.sin(lt * 2 + i) * 8, width: 360, height: 250, transform: `translate(-50%,-50%) rotate(${r}deg) scale(${0.8 + 0.2 * p})`, opacity: p, borderRadius: 16, overflow: "hidden", background: "#f2f2f4", boxShadow: "0 20px 50px rgba(10,20,40,.14)" }}>
					<Tex name={n} style={{ width: 360, height: 250, left: 0, top: 0 }} />
				</div>) })}
			<Center>
				<div style={{ fontFamily: CJK, fontWeight: 700, fontSize: 130, color: TXT, display: "flex" }}>
					{word.map((c, i) => { const p = lerp(lt, i * 0.06, 0.35 + i * 0.06, 0, 1); return <span key={i} style={{ display: "inline-block", opacity: p, transform: `translateY(${(1 - p) * (i % 2 ? 60 : -60)}px)`, filter: p < 1 ? `blur(${(1 - p) * 8}px)` : undefined }}>{c}</span> })}
				</div>
			</Center>
		</WhiteCard>
	)
}
const MBird: React.FC<P> = ({ t, lt, d }) => (
	<AbsoluteFill style={{ background: "#07080a" }}>
		<Center style={{ transform: `perspective(1600px) rotateY(${lerp(lt, 0, d, -18, 6, inOut)}deg) scale(${lerp(lt, 0, d, 1.0, 1.12)})` }}>
			<MeetingCard t={t} lt={lt} lines={3} done panel={1} timer="32:40" />
		</Center>
	</AbsoluteFill>
)
const FILLERS = ["嗯，", "吧，", "先，", "然后然后", "不对，", "就是"]
const MAdvanced: React.FC<P> = ({ t, lt, d }) => {
	const raw = POL[0].out
	// highlight fillers progressively
	const parts: React.ReactNode[] = []
	let i = 0, idx = 0
	const re = /(嗯，|吧，|先，先|然后然后|不对，|就是要不要)/g
	let m: RegExpExecArray | null
	while ((m = re.exec(raw))) {
		parts.push(<span key={idx++}>{raw.slice(i, m.index)}</span>)
		const on = lerp(lt, 0.3 + idx * 0.18, 0.5 + idx * 0.18, 0, 1)
		parts.push(<span key={idx++} style={{ background: `linear-gradient(90deg, rgba(47,95,168,.18) ${on * 100}%, transparent ${on * 100}%)`, color: on > 0.5 ? T3 : undefined, textDecoration: on > 0.9 ? "line-through" : undefined }}>{m[0]}</span>)
		i = m.index + m[0].length
	}
	parts.push(<span key={idx++}>{raw.slice(i)}</span>)
	const res = lerp(lt, 2.1, 2.6, 0, 1)
	return (
		<AbsoluteFill style={{ background: "#ececee" }}>
			<AbsoluteFill style={{ transform: `scale(${lerp(lt, 0, d, 1.15, 1.3, inOut)}) translateY(${lerp(lt, 0, d, 40, -60, inOut)}px)`, transformOrigin: "960px 420px" }}>
				<Center>
					<div style={{ width: 1300, background: "#fff", borderRadius: 28, padding: "60px 80px", boxShadow: "0 40px 100px rgba(10,20,40,.14)", fontFamily: CJK }}>
						<div style={{ fontSize: 16, color: T3, letterSpacing: "0.12em" }}>原始语音</div>
						<div style={{ fontSize: 34, lineHeight: 1.75, color: "#2a2b30", marginTop: 14 }}>{parts}</div>
						<div style={{ height: 1, background: LINE, margin: "36px 0" }} />
						<div style={{ fontSize: 16, color: T3, letterSpacing: "0.12em", opacity: res }}>高级润色</div>
						<div style={{ fontSize: 48, fontWeight: 700, color: TXT, marginTop: 12, opacity: res, transform: `translateY(${(1 - res) * 20}px)` }}>{POL[2].out}</div>
					</div>
				</Center>
			</AbsoluteFill>
		</AbsoluteFill>
	)
}
const Slogan: React.FC<P> = ({ lt, d }) => {
	const word = Array.from("让文字，重新从声音开始")
	const push = lerp(lt, d - 0.6, d, 0, 1, inQ)
	return (
		<WhiteCard bg="#fff">
			<Center style={{ transform: `scale(${1 + push * 2.2})`, filter: push > 0.02 ? `blur(${push * 14}px)` : undefined }}>
				<div style={{ fontFamily: CJK, fontWeight: 700, fontSize: 118, color: ACC, display: "flex" }}>
					{word.map((c, i) => { const p = lerp(lt, i * 0.04, 0.45 + i * 0.04, 0, 1); const sx = Math.sin(i * 3.7) * 200, sy = Math.cos(i * 2.9) * 140; return <span key={i} style={{ display: "inline-block", opacity: p, transform: `translate(${(1 - p) * sx}px,${(1 - p) * sy}px) scale(${0.5 + 0.5 * p})`, filter: p < 1 ? `blur(${(1 - p) * 8}px)` : undefined }}>{c}</span> })}
				</div>
			</Center>
		</WhiteCard>
	)
}
const Tagline: React.FC<P> = ({ t }) => {
	const sel = t >= TL.events.find((e) => e.kind === "select")!.t
	const { s } = typed("tagline", t)
	return (
		<AbsoluteFill style={{ background: "#000" }}>
			<Center>
				{sel && s.length > 0 ? (
					<div style={{ fontFamily: CJK, fontWeight: 500, fontSize: 60, color: "#000", background: "#fff", padding: "0 6px", boxShadow: "0 0 50px 8px rgba(255,255,255,.45)" }}>{s}</div>
				) : (
					<TypedLine id="tagline" t={t} size={60} weight={500} color="#fff" glow />
				)}
			</Center>
		</AbsoluteFill>
	)
}
const Outro: React.FC<P> = ({ t, lt, d }) => {
	const ding = M.ding - (t - lt)
	const disp = lerp(lt, ding - 0.1, ding + 0.45, 0, 1, inQ)
	const shift = lerp(lt, ding + 0.1, ding + 0.6, 0, 1, inOut)
	const fade = lerp(lt, d - 0.35, d, 1, 0)
	return (
		<AbsoluteFill style={{ background: "#fcfcfc" }}>
			<Center style={{ opacity: fade }}>
				<div style={{ display: "flex", alignItems: "center", transform: `translateX(${shift * 150}px)` }}>
					<div style={{ borderRadius: 20, boxShadow: "0 0 0 1px #e4e4e7" }}><AppIcon size={88} t={lt} spin={ding + 0.15} /></div>
					<div style={{ marginLeft: 24, width: 300 }}><Wordmark size={58} disperse={disp} /></div>
				</div>
			</Center>
		</AbsoluteFill>
	)
}

const MAP: Record<string, React.FC<P>> = {
	black: Black, logo: Logo, meet: Meet, cascade: Cascade, ui_fn: UiFn,
	card_fn: (p) => <TypeCard {...p} id="card_fn" accentFrom={7} exit />,
	listen: Listen, refine: Refine, sent: Sent,
	card_done: (p) => <TypeCard {...p} id="card_done" accentFrom={5} exit />,
	tabs_mail: (p) => <Tabs {...p} from={0} to={1} click={M.mail_click} style0="风格：自动 · 简洁自然" style1="风格：自动 · 完整专业" />,
	mail_speak: MailSpeak, mail_out: MailOut,
	tabs_doc: (p) => <Tabs {...p} from={1} to={2} click={M.doc_click} style0="风格：自动 · 完整专业" style1="风格：自动 · 结构清晰" />,
	doc_open: DocOpen, doc_close: DocClose, q_more: QMore,
	q_prompt: (p) => <TypeCard {...p} id="q_prompt" accentFrom={3} />,
	prompt: Prompt,
	q_term: (p) => <TypeCard {...p} id="q_term" accentFrom={3} />,
	term: Term, q_meet: QMeet, meeting: Meeting, card_yours: CardYours, polish: Polish, typedel: TypeDel, orbit: Orbit,
	m_meet: MMeet, m_todo: MTodo, m_hot: MHot, card_cards: CardCards, m_bird: MBird, m_advanced: MAdvanced, slogan: Slogan, tagline: Tagline, outro: Outro, black_end: Black,
}

export const Film: React.FC = () => {
	const frame = useCurrentFrame()
	const shots = TL.shots
	let sh = shots[shots.length - 1]
	for (const s of shots) if (frame >= s.f0 && frame < s.f1) { sh = s; break }
	const t = frame / FPS, lt = (frame - sh.f0) / FPS, d = (sh.f1 - sh.f0) / FPS
	const C = MAP[sh.id]
	return <AbsoluteFill style={{ background: "#000", overflow: "hidden" }}><C t={t} lt={lt} d={d} sh={sh} /></AbsoluteFill>
}
