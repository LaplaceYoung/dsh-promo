// Motion helpers shared by templates: camera rig, keyframe tracks, confetti, seeded random.
import React from "react"
import { AbsoluteFill } from "remotion"
import { clamp01, inOut } from "./mos"

export const SERIF = "'Noto Serif CJK SC', 'IBM Plex Serif', serif"

/** Keyframe track: keys [t, v]. Ease between keys (default inOut). Holds outside range. */
export function track(t: number, keys: [number, number][], ease: (x: number) => number = inOut) {
	if (t <= keys[0][0]) return keys[0][1]
	for (let i = 0; i < keys.length - 1; i++) {
		const [ta, a] = keys[i], [tb, b] = keys[i + 1]
		if (t <= tb) return a + (b - a) * ease(clamp01((t - ta) / Math.max(1e-6, tb - ta)))
	}
	return keys[keys.length - 1][1]
}
/** Camera keyframe [t, scale, focusX, focusY] — focus point (in stage px) is placed at frame center. */
export type CamKey = [number, number, number, number]
export function camAt(t: number, keys: CamKey[], ease: (x: number) => number = inOut) {
	const s = track(t, keys.map((k) => [k[0], Math.log(k[1])] as [number, number]), ease)
	return { s: Math.exp(s), x: track(t, keys.map((k) => [k[0], k[2]]), ease), y: track(t, keys.map((k) => [k[0], k[3]]), ease) }
}
export const Camera: React.FC<{ t: number; keys: CamKey[]; w?: number; h?: number; blur?: number; children: React.ReactNode; ease?: (x: number) => number }> = ({ t, keys, w = 1920, h = 1080, blur = 0, children, ease }) => {
	const c = camAt(t, keys, ease)
	return (
		<AbsoluteFill style={{ overflow: "hidden" }}>
			<div style={{ position: "absolute", left: 0, top: 0, width: w, height: h, transformOrigin: "0 0", transform: `translate(${960 - c.x * c.s}px, ${540 - c.y * c.s}px) scale(${c.s})`, filter: blur > 0.05 ? `blur(${blur}px)` : undefined }}>{children}</div>
		</AbsoluteFill>
	)
}
export const rand = (k: number) => { const s = Math.sin(k * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s) }

export const Confetti: React.FC<{ t: number; t0: number; n?: number; w?: number; h?: number; colors?: string[] }> = ({ t, t0, n = 90, w = 1920, h = 1080, colors = ["#2f5fa8", "#f2b134", "#e4572e", "#29a36a", "#8a5cf6", "#3bb4e5"] }) => {
	if (t < t0) return null
	const dt = t - t0
	return (
		<>
			{Array.from({ length: n }).map((_, i) => {
				const x0 = rand(i) * w, vy = 160 + rand(i + 9) * 260, vx = (rand(i + 3) - 0.5) * 220
				const y = -40 + vy * dt + 120 * dt * dt - rand(i + 5) * 300, x = x0 + vx * dt + Math.sin(dt * 3 + i) * 30
				const s = 8 + rand(i + 7) * 10
				return <div key={i} style={{ position: "absolute", left: x, top: y, width: s, height: s * (rand(i + 11) > 0.5 ? 1 : 0.5), background: colors[i % colors.length], transform: `rotate(${dt * 300 * (rand(i + 2) - 0.5) + i * 40}deg)`, opacity: clamp01(1.4 - dt / 2.4), borderRadius: rand(i + 13) > 0.7 ? 99 : 2 }} />
			})}
		</>
	)
}
/** Fade helper: 0->1 over [a,a+d], 1->0 over [b-d2,b]. */
export const vis = (t: number, a: number, b: number, d = 0.25, d2 = d) => clamp01((t - a) / d) * clamp01((b - t) / d2)

/** Hand pointer (like the macOS link cursor), tip at (x, y). */
export const Hand: React.FC<{ x: number; y: number; down?: boolean; s?: number }> = ({ x, y, down, s = 1 }) => (
	<div style={{ position: "absolute", left: x - 13 * s, top: y - 2 * s, transform: `scale(${(down ? 0.88 : 1) * s})`, transformOrigin: "13px 2px", filter: "drop-shadow(0 2px 3px rgba(0,0,0,.3))", zIndex: 60 }}>
		<svg width="44" height="48" viewBox="0 0 22 24"><path d="M8 1.5c-.9 0-1.6.7-1.6 1.6v9.6l-1.5-1.6c-.7-.7-1.8-.7-2.4 0-.6.6-.6 1.5-.1 2.2l4.3 5.7c1 1.4 2.6 2.2 4.3 2.2h3.2c2.8 0 5-2.2 5-5v-5.4c0-.9-.7-1.6-1.6-1.6s-1.6.7-1.6 1.6v-.8c0-.9-.7-1.6-1.6-1.6s-1.6.7-1.6 1.6v-.6c0-.9-.7-1.6-1.6-1.6s-1.6.7-1.6 1.6V3.1c0-.9-.7-1.6-1.6-1.6z" fill="#fff" stroke="#111" strokeWidth="1.1" strokeLinejoin="round" /><path d="M11.2 13v4M14.4 13v4M17.6 13v4" stroke="#111" strokeWidth="1" strokeLinecap="round" /></svg>
	</div>
)

/** Depth of field: a blurred copy underneath and a sharp copy masked to a band (angle in deg, focus/band in %). */
export const DOF: React.FC<{ children: React.ReactNode; tf: string; angle?: number; focus?: number; band?: number; blur?: number; origin?: string; left?: number; top?: number }> = ({ children, tf, angle = 90, focus = 50, band = 14, blur = 7, origin = "50% 50%", left = 0, top = 0 }) => {
	const m = `linear-gradient(${angle}deg, transparent ${focus - band * 2.4}%, #000 ${focus - band}%, #000 ${focus + band}%, transparent ${focus + band * 2.4}%)`
	const box: React.CSSProperties = { position: "absolute", left, top, transform: tf, transformOrigin: origin }
	return (
		<AbsoluteFill>
			<div style={{ ...box, filter: `blur(${blur}px)` }}>{children}</div>
			<AbsoluteFill style={{ WebkitMaskImage: m, maskImage: m }}><div style={box}>{children}</div></AbsoluteFill>
		</AbsoluteFill>
	)
}
/** Paper grain overlay (SVG turbulence). */
export const Grain: React.FC<{ op?: number; seed?: number; freq?: number }> = ({ op = 0.18, seed = 1, freq = 0.9 }) => (
	<svg width="1920" height="1080" style={{ position: "absolute", inset: 0, opacity: op, mixBlendMode: "multiply" }}>
		<filter id={`g${seed}`}><feTurbulence type="fractalNoise" baseFrequency={freq} numOctaves={2} seed={seed} /><feColorMatrix type="saturate" values="0" /></filter>
		<rect width="1920" height="1080" filter={`url(#g${seed})`} />
	</svg>
)
