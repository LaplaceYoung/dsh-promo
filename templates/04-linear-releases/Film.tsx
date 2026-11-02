// Template 04 — structure of Linear "Introducing Linear Releases" (2026), MosMos content.
// Black, tilted boards of thin strands converging into one point, shallow depth of field, mono labels;
// a mono text card; three panels slide in; macro dolly; type-on / delete / type-on; logo.
import React from "react"
import { AbsoluteFill } from "remotion"
import { MONO, CJK, lerp, clamp01, inOut, out, AppIcon, Wordmark, useT, typeAt } from "../_engine/src/mos"
import { rand, track } from "../_engine/src/kit"
import TL from "./timeline.json"

const C = TL.cuts, Mk = TL.marks as any
const MONOZH = "'Geist Mono', 'Noto Sans Mono CJK SC', monospace"
const LABELS = ["飞书", "微信", "邮件", "文档", "提示词", "终端", "呃，", "那个，", "嗯，", "Figma", "Nimbus", "林清禾", "API_KEY", "周三前", "品牌素材", "交互稿", "视觉稿", "待办", "说话人 1", "说话人 2", "会议纪要", "热词", "改口", "标点"]

type Strand = { x0: number; y0: number; c1x: number; c1y: number; c2x: number; c2y: number; label?: string; w: number; delay: number }
function strands(seed: number, n: number, end: [number, number], spread = 430): Strand[] {
	return Array.from({ length: n }).map((_, i) => {
		const r = (k: number) => rand(seed * 100 + i * 7 + k)
		const x0 = -260 + r(1) * 900, y0 = end[1] + (r(2) - 0.5) * 2 * spread
		return { x0, y0, c1x: x0 + 300 + r(3) * 300, c1y: y0 + (r(4) - 0.5) * 160, c2x: end[0] - 350 - r(5) * 300, c2y: end[1] + (r(6) - 0.5) * 60, label: i % 3 === 0 ? LABELS[(i / 3 + seed * 5) % LABELS.length] : undefined, w: 0.8 + r(7) * 1.6, delay: r(8) * 0.8 }
	})
}
const Board: React.FC<{ t: number; t0: number; seed: number; n?: number; w?: number; h?: number; header?: [string, string]; end?: string; bright?: number }> = ({ t, t0, seed, n = 54, w = 1800, h = 1000, header, end, bright = 1 }) => {
	const E: [number, number] = [w - 220, h * 0.52]
	const S = strands(seed, n, E)
	const grow = (s: Strand) => clamp01((t - t0 - s.delay * 0.6) / 1.4)
	return (
		<div style={{ position: "relative", width: w, height: h, background: header ? "linear-gradient(180deg,#121214,#0c0c0d)" : "transparent", borderRadius: 18, boxShadow: header ? "0 0 0 1px #232326" : undefined }}>
			{header && (
				<div style={{ position: "absolute", left: 40, top: 30, display: "flex", gap: 14, alignItems: "center", fontFamily: MONOZH, fontSize: 22, color: "#bdbdc2", letterSpacing: "0.06em" }}>
					{header[0]} <span style={{ padding: "3px 10px", borderRadius: 6, background: "#1c1d20", color: "#9a9ba0", fontSize: 18 }}><span style={{ color: "#4cc38a" }}>●</span> {header[1]}</span>
				</div>
			)}
			<svg width={w} height={h} style={{ position: "absolute", inset: 0 }}>
				{S.map((s, i) => {
					const g = grow(s), d = `M${s.x0},${s.y0} C${s.c1x},${s.c1y} ${s.c2x},${s.c2y} ${E[0]},${E[1]}`
					const pulse = (t * 0.35 + rand(i + seed)) % 1
					return (
						<g key={i}>
							<path d={d} stroke={`rgba(235,235,240,${(0.28 + 0.25 * rand(i)) * bright})`} strokeWidth={s.w} fill="none" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - g} />
							<path d={d} stroke={`rgba(255,255,255,${0.9 * bright * g})`} strokeWidth={s.w + 0.6} fill="none" pathLength={1} strokeDasharray="0.06 1" strokeDashoffset={-pulse} />
						</g>
					)
				})}
			</svg>
			{S.map((s, i) => s.label && (
				<div key={i} style={{ position: "absolute", left: s.x0 + 30, top: s.y0 - 34, fontFamily: MONOZH, fontSize: 22, color: `rgba(235,235,240,${0.85 * bright * clamp01((t - t0 - s.delay * 0.6) / 0.4)})`, whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 10 }}>
					<span style={{ width: 13, height: 13, background: "#e8e8ec", display: "inline-block" }} />{s.label}
				</div>
			))}
			{end && (
				<div style={{ position: "absolute", left: E[0] + 20, top: E[1] - 24, fontFamily: MONOZH, color: "#e8e8ec", opacity: clamp01((t - t0 - 1.6) / 0.5) }}>
					<div style={{ padding: "6px 14px", border: "1px solid #5a5a60", borderRadius: 6, fontSize: 20, background: "#101012" }}>{end}</div>
					<div style={{ fontSize: 26, marginTop: 10, marginLeft: 10 }}>✓</div>
				</div>
			)}
		</div>
	)
}
/** board in 3D with a depth-of-field band: sharp copy masked to a band, blurred copy underneath. */
const Tilt: React.FC<{ children: React.ReactNode; rx: number; ry: number; rz: number; s: number; x: number; y: number; focus?: number; blur?: number }> = ({ children, rx, ry, rz, s, x, y, focus = 50, blur = 7 }) => {
	const tf = `translate(${x}px, ${y}px) perspective(1600px) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg) scale(${s})`
	const m = `linear-gradient(90deg, transparent ${focus - 34}%, #000 ${focus - 14}%, #000 ${focus + 14}%, transparent ${focus + 34}%)`
	const box: React.CSSProperties = { position: "absolute", left: 60, top: 40, transform: tf, transformOrigin: "50% 50%" }
	return (
		<AbsoluteFill>
			<div style={{ ...box, filter: `blur(${blur}px)` }}>{children}</div>
			<div style={{ ...box, WebkitMaskImage: m, maskImage: m }}>{children}</div>
		</AbsoluteFill>
	)
}
const S1: React.FC<{ t: number }> = ({ t }) => (
	<AbsoluteFill style={{ background: "#000" }}>
		<Tilt rx={48} ry={-8} rz={-10} s={2.0} x={lerp(t, 0, C[0], 160, -140, (x) => x)} y={lerp(t, 0, C[0], -60, 20, (x) => x)} focus={lerp(t, 0, C[0], 40, 58, (x) => x)} blur={9}>
			<Board t={t} t0={-1.2} seed={1} n={30} bright={0.85} />
		</Tilt>
	</AbsoluteFill>
)
const S2: React.FC<{ t: number }> = ({ t }) => {
	const op = lerp(t, C[0], 8.0, 0.4, 1, (x) => x) * lerp(t, 8.25, C[1], 1, 0.85, (x) => x)
	return (
		<AbsoluteFill style={{ background: "#000", opacity: op }}>
			<Tilt rx={34} ry={0} rz={-4} s={lerp(t, C[0], C[1], 1.1, 1.2, (x) => x)} x={0} y={40} focus={55} blur={3}>
				<Board t={t} t0={C[0] - 0.6} seed={2} header={["飞书 / 微信", "简洁自然"]} end="已写好" />
			</Tilt>
		</AbsoluteFill>
	)
}
const S3: React.FC<{ t: number }> = ({ t }) => (
	<AbsoluteFill style={{ background: "#000", alignItems: "center", justifyContent: "center" }}>
		<div style={{ fontFamily: MONOZH, fontSize: 46, color: "#ededf0", letterSpacing: "0.12em", opacity: lerp(t, Mk.card_fade, C[2] - 0.1, 1, 0, inOut) }}>你在哪里说，决定我们怎么写</div>
	</AbsoluteFill>
)
const PANELS: [string, string, number][] = [["邮件", "完整专业", 3], ["文档", "结构清晰", 4], ["代码与终端", "生成命令", 5]]
const S4: React.FC<{ t: number }> = ({ t }) => (
	<AbsoluteFill style={{ background: "#000" }}>
		{PANELS.map(([a, b, seed], i) => {
			const p = lerp(t, Mk.panels[i], Mk.panels[i] + 1.4, 0, 1, out)
			const drift = lerp(t, C[2], C[3], 0, -80, (x) => x)
			return (
				<div key={i} style={{ position: "absolute", left: 0, top: 0, opacity: p }}>
					<Tilt rx={18} ry={-32} rz={-3} s={0.7} x={-470 + i * 480 + (1 - p) * 500 + drift} y={300 - i * 180 + (1 - p) * 420} focus={45} blur={2.5}>
						<Board t={t} t0={Mk.panels[i]} seed={seed} n={36} header={[a, b]} />
					</Tilt>
				</div>
			)
		})}
	</AbsoluteFill>
)
const S5: React.FC<{ t: number }> = ({ t }) => (
	<AbsoluteFill style={{ background: "#000" }}>
		<Tilt rx={40} ry={-14} rz={-12} s={1.55} x={lerp(t, C[3], C[4], 240, -260, (x) => x)} y={lerp(t, C[3], C[4], 120, 40, (x) => x)} focus={lerp(t, C[3], C[4], 35, 62, (x) => x)} blur={8}>
			<Board t={t} t0={C[3] - 2} seed={5} header={["代码与终端", "生成命令"]} bright={lerp(t, C[3], C[4], 1.35, 1.0, (x) => x)} />
		</Tilt>
	</AbsoluteFill>
)
const TypeOn: React.FC<{ t: number }> = ({ t }) => {
	const n1 = TL.t1.filter((x: number) => t >= x).length, n2 = TL.t2.filter((x: number) => t >= x).length
	const s = t < Mk.del_all ? Array.from(TL.w1).slice(0, n1).join("") : Array.from(TL.w2).slice(0, n2).join("")
	return (
		<AbsoluteFill style={{ background: "#000", alignItems: "center", justifyContent: "center" }}>
			<div style={{ display: "flex", alignItems: "center", gap: 14, fontFamily: MONOZH, fontSize: 50, color: "#ededf0", letterSpacing: "0.08em" }}>
				{s}<span style={{ display: "inline-block", width: 30, height: 58, background: "#ededf0" }} />
			</div>
		</AbsoluteFill>
	)
}
const Logo: React.FC<{ t: number }> = ({ t }) => (
	<AbsoluteFill style={{ background: "#000", alignItems: "center", justifyContent: "center" }}>
		<div style={{ display: "flex", alignItems: "center", gap: 22 }}><AppIcon size={74} /><Wordmark size={64} color="#fff" /></div>
	</AbsoluteFill>
)
export const Film: React.FC = () => {
	const t = useT()
	if (t < C[0]) return <S1 t={t} />
	if (t < C[1]) return <S2 t={t} />
	if (t < C[2]) return <S3 t={t} />
	if (t < C[3]) return <S4 t={t} />
	if (t < C[4]) return <S5 t={t} />
	if (t < Mk.cursor_on) return <AbsoluteFill style={{ background: "#000" }} />
	if (t < C[5]) return <TypeOn t={t} />
	if (t < C[6]) return <AbsoluteFill style={{ background: "#000" }} />
	return <Logo t={t} />
}
