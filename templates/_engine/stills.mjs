// node stills.mjs T03 10.2 15.5 ...  -> build/stills/T03_<t>.png (quick visual check while editing)
import { bundle } from "@remotion/bundler"
import { renderStill, selectComposition } from "@remotion/renderer"
import path from "path"; import fs from "fs"
const [comp, ...ts] = process.argv.slice(2)
const out = path.resolve("build/stills"); fs.mkdirSync(out, { recursive: true })
const serveUrl = await bundle({ entryPoint: path.resolve("src/index.ts"), webpackOverride: (c) => ({ ...c, resolve: { ...c.resolve, modules: [path.resolve("node_modules"), "node_modules"] } }) })
const composition = await selectComposition({ serveUrl, id: comp })
for (const t of ts) {
	const frame = Math.min(composition.durationInFrames - 1, Math.round(parseFloat(t) * composition.fps))
	await renderStill({ composition, serveUrl, frame, output: `${out}/${comp}_${t}.png`, chromiumOptions: { gl: "swangle" }, scale: 0.5 })
	console.log(`${out}/${comp}_${t}.png`)
}
