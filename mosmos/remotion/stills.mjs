import { bundle } from "@remotion/bundler"
import { renderStill, selectComposition } from "@remotion/renderer"
import fs from "node:fs"
const TL = JSON.parse(fs.readFileSync("src/timeline.json"))
const serve = await bundle({ entryPoint: "src/index.ts" })
const comp = await selectComposition({ serveUrl: serve, id: "Mosmos" })
const want = process.argv[2] ? process.argv[2].split(",").map(Number) : null
let frames = want || []
if (!want) for (const s of TL.shots) { const pts = [s.f0 + Math.round((s.f1 - s.f0) * 0.6)]; for (const b of s.subs) pts.push(b + 10); frames.push(...pts) }
fs.mkdirSync("../build/stills", { recursive: true })
for (const f of frames) {
  await renderStill({ composition: comp, serveUrl: serve, frame: f, output: `../build/stills/f${String(f).padStart(5, "0")}.jpg`, imageFormat: "jpeg", jpegQuality: 85, chromiumOptions: { gl: "swangle" } })
  process.stdout.write(f + " ")
}
console.log("\nok", frames.length)
