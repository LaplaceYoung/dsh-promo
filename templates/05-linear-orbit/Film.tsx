// Template 05 — structure of "Orbit (by Linear)" (2026), MosMos content.
// Black-and-white macro of a drafting sheet: construction lines, ink strokes that draw themselves,
// shallow depth of field, then the wordmark in extreme perspective, a flat wordmark, defocus, info lines.
import React from "react"
import { AbsoluteFill } from "remotion"
import { SANS, CJK, COPY, lerp, clamp01, inOut, Wordmark, useT } from "../_engine/src/mos"
import { DOF, Grain, track } from "../_engine/src/kit"
import TL from "./timeline.json"

const C = TL.cuts, Mk = TL.marks as Record<string, number>
const PW = 2400, PH = 1600
const INK = "#1b1b1b", PENCIL = "rgba(90,90,90,.35)"
type Draw = { d: string; t0: number; t1: number; w: number; c?: string; from?: number }
const Ink: React.FC<{ t: number; items: Draw[] }> = ({ t, items }) => (
	<>{items.map((s, i) => {
		const g = (s.from ?? 0) + (1 - (s.from ?? 0)) * clamp01((t - s.t0) / (s.t1 - s.t0))
		return <path key={i} d={s.d} stroke={s.c || INK} strokeWidth={s.w} fill="none" strokeLinecap="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - inOut(g)} style={{ filter: "drop-shadow(0 2px 2px rgba(0,0,0,.25))" }} />
	})}</>
)
const arc = (cx: number, cy: number, r: number, a0: number, a1: number) => {
	const p = (a: number) => [cx + r * Math.cos((a * Math.PI) / 180), cy + r * Math.sin((a * Math.PI) / 180)]
	const [x0, y0] = p(a0), [x1, y1] = p(a1); const large = Math.abs(a1 - a0) > 180 ? 1 : 0; const sw = a1 > a0 ? 1 : 0
	return `M${x0},${y0} A${r},${r} 0 ${large} ${sw} ${x1},${y1}`
}
const Paper: React.FC<{ lines: string[]; children?: React.ReactNode; tone?: number }> = ({ lines, children, tone = 0 }) => (
	<div style={{ width: PW, height: PH, background: `radial-gradient(ellipse at 50% 45%, #ececec, #cfcfcf 75%)`, filter: tone ? `brightness(${1 - tone})` : undefined }}>
		<svg width={PW} height={PH} style={{ position: "absolute", inset: 0 }}>
			{Array.from({ length: 13 }).map((_, i) => <line key={`v${i}`} x1={i * 200} y1={0} x2={i * 200 + 60} y2={PH} stroke="rgba(120,120,120,.18)" strokeWidth={1.5} />)}
			{Array.from({ length: 9 }).map((_, i) => <line key={`h${i}`} x1={0} y1={i * 200} x2={PW} y2={i * 200 - 40} stroke="rgba(120,120,120,.16)" strokeWidth={1.5} />)}
			{lines.map((d, i) => <path key={i} d={d} stroke={PENCIL} strokeWidth={2.2} fill="none" />)}
			{children}
		</svg>
	</div>
)
const Shot: React.FC<{ tf: string; focus?: number; blur?: number; children: React.ReactNode }> = ({ tf, focus = 55, blur = 8, children }) => (
	<AbsoluteFill style={{ background: "#c9c9c9" }}>
		<DOF tf={tf} angle={180} focus={focus} band={12} blur={blur} left={960 - PW / 2} top={540 - PH / 2}>{children}</DOF>
		<Grain op={0.22} />
		<AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(0,0,0,.18))" }} />
	</AbsoluteFill>
)
const tf3 = (rx: number, rz: number, s: number, x: number, y: number) => `translate(${x}px, ${y}px) perspective(1400px) rotateX(${rx}deg) rotateZ(${rz}deg) scale(${s})`

const S1: React.FC<{ t: number }> = ({ t }) => (
	<Shot tf={tf3(50, -12, 1.35, lerp(t, 0, C[0], 160, -160, (x) => x), -120)} focus={52}>
		<Paper lines={[arc(1300, 1750, 900, 180, 360), arc(1300, 1750, 760, 180, 360), "M0,700 L2400,1100", "M300,0 L900,1600"]}>
			<Ink t={t} items={[{ d: arc(1300, 1750, 900, 196, 300), t0: -0.6, t1: 3.0, w: 9, from: 0.1 }, { d: arc(1300, 1750, 760, 200, 290), t0: 1.25, t1: 3.2, w: 9 }]} />
		</Paper>
	</Shot>
)
const S2: React.FC<{ t: number }> = ({ t }) => (
	<Shot tf={tf3(52, lerp(t, C[0], C[1], -6, 6, (x) => x), 1.25, 0, 60)} focus={50}>
		<Paper lines={[arc(1200, 800, 560, 0, 359.9), arc(1200, 800, 380, 0, 359.9), "M0,300 L2400,1300"]}>
			<path d={arc(1200, 800, 520, 0, 359.9)} stroke="rgba(60,60,60,.16)" strokeWidth={70} fill="none" />
			<Ink t={t} items={[{ d: arc(1200, 800, 470, 150, 470), t0: C[0], t1: C[1] - 0.2, w: 11, from: 0.05 }, { d: arc(1200, 800, 575, 20, 170), t0: 4.4, t1: C[1], w: 7 }]} />
		</Paper>
	</Shot>
)
const S3: React.FC<{ t: number }> = ({ t }) => (
	<Shot tf={tf3(36, -8, lerp(t, C[1], C[2], 1.55, 1.7, (x) => x), 120, 0)} focus={50} blur={6}>
		<Paper lines={["M1180,0 L1240,1600", "M0,780 L2400,760", "M0,980 L2400,960", arc(500, 900, 420, 0, 359.9)]}>
			<path d={arc(500, 900, 400, -70, 80)} stroke={INK} strokeWidth={14} fill="none" />
			<path d={arc(500, 900, 330, -60, 70)} stroke={INK} strokeWidth={10} fill="none" />
			<Ink t={t} items={[{ d: "M1210,1010 L1210,860 A80,80 0 0 1 1290,780 L1420,780 L1450,812 L1300,812 A50,50 0 0 0 1250,862 L1250,1010", t0: C[1] + 0.15, t1: C[2] - 0.15, w: 6 }]} />
		</Paper>
	</Shot>
)
const S4: React.FC<{ t: number }> = ({ t }) => (
	<Shot tf={tf3(40, 6, 1.8, lerp(t, C[2], C[3], 60, -40, (x) => x), 40)} focus={50} blur={7}>
		<Paper lines={["M1060,0 L1120,1600", "M1400,0 L1460,1600", "M0,640 L2400,610", "M0,1000 L2400,980"]}>
			<Ink t={t} items={[{ d: arc(1250, 800, 160, 200, 520), t0: C[2] + 0.2, t1: C[3] - 0.3, w: 9 }]} />
			<circle cx={1105} cy={1080} r={9} fill="#555" />
		</Paper>
	</Shot>
)
const S5: React.FC<{ t: number }> = ({ t }) => (
	<Shot tf={tf3(28, 0, 1.8, 0, lerp(t, C[3], C[4], -60, 40, (x) => x))} focus={lerp(t, C[3], C[4], 40, 60, (x) => x)} blur={7}>
		<Paper lines={["M800,760 L1700,760", "M1530,0 L1560,1600", "M1000,0 L1030,1600"]}>
			<ellipse cx={1150} cy={600} rx={190} ry={38} stroke="rgba(40,40,40,.6)" strokeWidth={9} fill="none" />
			<Ink t={t} items={[{ d: "M880,760 L1300,760", t0: C[3], t1: C[3] + 0.7, w: 5 }, { d: "M1300,770 L1300,1150", t0: C[3] + 0.7, t1: C[4] - 0.2, w: 16 }]} />
		</Paper>
	</Shot>
)
const S6: React.FC<{ t: number }> = ({ t }) => (
	<Shot tf={tf3(52, -18, 1.25, lerp(t, C[4], C[5], 420, -420, (x) => x), 60)} focus={50} blur={6}>
		<Paper lines={["M0,420 L2400,380", "M0,1240 L2400,1200"]}>
			<text x={60} y={1180} fontFamily="Geist, sans-serif" fontWeight={700} fontSize={760} letterSpacing={-30} fill="#9b9b9b" stroke={INK} strokeWidth={7}>MosMos</text>
		</Paper>
	</Shot>
)
const Flat: React.FC<{ t: number }> = ({ t }) => {
	const b = lerp(t, Mk.blur0, Mk.blur1, 0, 1, inOut)
	const info = clamp01((t - Mk.info_in) / 0.25)
	const sw = lerp(t, Mk.swap0, Mk.swap1, 0, 1, inOut)
	return (
		<AbsoluteFill style={{ background: "#e8e8e8", alignItems: "center", justifyContent: "center" }}>
			<div style={{ filter: `blur(${b * 14}px)`, opacity: 1 - b * 0.78, transform: `scale(${1 + b * 0.04})` }}><Wordmark size={170} color="#151515" /></div>
			<AbsoluteFill style={{ alignItems: "center", justifyContent: "center", fontFamily: CJK, fontSize: 46, color: "#1a1a1a" }}>
				<div style={{ position: "absolute", opacity: info * (1 - sw) }}>{COPY.platforms.join("  ·  ")}</div>
				<div style={{ position: "absolute", opacity: sw, fontFamily: SANS }}>{COPY.url}</div>
			</AbsoluteFill>
			<Grain op={0.16} />
		</AbsoluteFill>
	)
}
export const Film: React.FC = () => {
	const t = Math.min(useT(), Mk.end_freeze)
	if (t < C[0]) return <S1 t={t} />
	if (t < C[1]) return <S2 t={t} />
	if (t < C[2]) return <S3 t={t} />
	if (t < C[3]) return <S4 t={t} />
	if (t < C[4]) return <S5 t={t} />
	if (t < C[5]) return <S6 t={t} />
	return <Flat t={t} />
}
