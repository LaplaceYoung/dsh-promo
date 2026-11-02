// Records REAL footage of create.moss.cn (mossland.studio redirects here). Read-only: no login, no submit.
import { chromium } from "playwright"
import { execFileSync } from "node:child_process"
import fs from "node:fs"
const ROOT = new URL("..", import.meta.url).pathname
const OUT = ROOT + "footage"
fs.mkdirSync(OUT, { recursive: true }); fs.mkdirSync(ROOT + "site", { recursive: true })
const ONLY = (process.env.ONLY || "").split(",").filter(Boolean)
const BASE = "https://create.moss.cn"
const browser = await chromium.launch({ args: ["--hide-scrollbars"] })
const CURSOR = `(() => { const c=document.createElement('div'); c.id='__cursor';
 c.innerHTML='<svg width="30" height="30" viewBox="0 0 24 24"><path d="M4 2.5 L4 19.5 L8.6 15.3 L11.6 21.8 L14.6 20.5 L11.7 14.2 L18 14.2 Z" fill="#111" stroke="#fff" stroke-width="1.5" stroke-linejoin="round"/></svg>';
 c.style.cssText='position:fixed;left:0;top:0;z-index:2147483647;pointer-events:none;transform:translate(-200px,-200px);filter:drop-shadow(0 2px 4px rgba(0,0,0,.35))';
 const add=()=>(document.body||document.documentElement).appendChild(c); if(document.body) add(); else addEventListener('DOMContentLoaded',add);
 addEventListener('pointermove',e=>{c.style.transform='translate('+(e.clientX-4)+'px,'+(e.clientY-2)+'px)'},{capture:true,passive:true});
 addEventListener('pointerdown',()=>{c.firstChild.style.transform='scale(.85)'},true); addEventListener('pointerup',()=>{c.firstChild.style.transform=''},true);
 // hide promo popups (login-for-points panel, intro modal) so footage shows the product
 const hide=()=>{ document.querySelectorAll('body *').forEach(el=>{ const tx=el.innerText||''; if(tx.length<600 && /立即登录领取|全新自研生图模型|Claim now/.test(tx)){ const cs=getComputedStyle(el); if(cs.position==='fixed'){ el.style.setProperty('display','none','important') } } }) };
 setInterval(hide,300);
})()`
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 }, locale: "zh-CN" })
await ctx.addInitScript(CURSOR)
async function glide(page, x0, y0, x1, y1, ms = 700) { const n = Math.max(2, Math.round(ms / 16)); for (let i = 1; i <= n; i++) { const t = i / n, e = t < .5 ? 4*t*t*t : 1 - Math.pow(-2*t+2, 3)/2; await page.mouse.move(x0 + (x1 - x0) * e, y0 + (y1 - y0) * e); await sleep(16) } }
let mx = 1500, my = 900
async function to(page, loc, ms = 700) { const bb = await loc.boundingBox(); const x = bb.x + bb.width / 2, y = bb.y + bb.height / 2; await glide(page, mx, my, x, y, ms); mx = x; my = y }
async function tap(page, loc, ms = 700) { await to(page, loc, ms); await sleep(120); await loc.click({ timeout: 4000 }).catch(e => console.log("click fail", e.message.slice(0, 60))) }
async function smoothScroll(page, dy, ms) { const n = Math.round(ms / 16); for (let i = 0; i < n; i++) { await page.mouse.wheel(0, dy / n); await sleep(16) } }
async function record(name, url, prep, act) {
	if (ONLY.length && !ONLY.includes(name)) return
	const page = await ctx.newPage()
	await page.goto(BASE + url, { waitUntil: "domcontentloaded", timeout: 90000 })
	await sleep(7000); await page.keyboard.press("Escape").catch(() => {})
	for (const n of ["关闭介绍"]) { const l = page.getByRole("button", { name: n, exact: true }); if (await l.count()) await l.first().click({ timeout: 1000 }).catch(() => {}) }
	if (prep) await prep(page)
	await sleep(1500)
	mx = 1500; my = 900; await page.mouse.move(mx, my)
	const cdp = await ctx.newCDPSession(page)
	const dir = `/tmp/mlcap-${name}`; fs.rmSync(dir, { recursive: true, force: true }); fs.mkdirSync(dir)
	const frames = []
	cdp.on("Page.screencastFrame", async (f) => { const i = frames.length; frames.push(f.metadata.timestamp); fs.writeFileSync(`${dir}/${String(i).padStart(5, "0")}.jpg`, Buffer.from(f.data, "base64")); cdp.send("Page.screencastFrameAck", { sessionId: f.sessionId }).catch(() => {}) })
	await cdp.send("Page.startScreencast", { format: "jpeg", quality: 90, maxWidth: 1920, maxHeight: 1080, everyNthFrame: 1 })
	await sleep(300)
	await act(page)
	await sleep(400)
	await cdp.send("Page.stopScreencast"); await sleep(300)
	let list = ""
	for (let i = 0; i < frames.length; i++) { const d = i + 1 < frames.length ? frames[i + 1] - frames[i] : 1 / 60; list += `file '${dir}/${String(i).padStart(5, "0")}.jpg'\nduration ${Math.max(0.001, d).toFixed(4)}\n` }
	list += `file '${dir}/${String(frames.length - 1).padStart(5, "0")}.jpg'\n`
	fs.writeFileSync(`${dir}/list.txt`, list)
	execFileSync("ffmpeg", ["-v", "error", "-y", "-f", "concat", "-safe", "0", "-i", `${dir}/list.txt`, "-vf", "fps=60,scale=1920:1080:flags=lanczos,format=yuv420p", "-c:v", "libx264", "-crf", "16", "-preset", "fast", `${OUT}/${name}.mp4`])
	console.log(name, frames.length, "frames")
	await page.close()
}
const warm = async (page) => { for (let i = 0; i < 6; i++) { await page.mouse.move(1000, 700); await page.mouse.wheel(0, 700); await sleep(1200) } for (let i = 0; i < 6; i++) { await page.mouse.wheel(0, -700); await sleep(500) } await sleep(1500) }

// 1. home: hero, click composer, open Auto menu, pick, close
await record("home_auto", "/", null, async (p) => {
	await glide(p, mx, my, 1000, 520, 900); mx = 1000; my = 520; await sleep(300)
	await glide(p, mx, my, 644, 470, 700); mx = 644; my = 470; await sleep(150); await p.mouse.click(644, 470); await sleep(1500)
	await p.screenshot({ path: ROOT + "site/r-auto-menu.png" })
	const ex = p.getByText("专家", { exact: true }).filter({ visible: true }).first()
	if (await ex.count()) { await to(p, ex, 600); await sleep(700); await p.mouse.click(mx, my); await sleep(1500) } else console.log("no 专家")
	await p.screenshot({ path: ROOT + "site/r-auto-after.png" })
})
// 2. agents: type a real example prompt (not sent)
await record("home_type", "/", null, async (p) => {
	const ta = p.locator('[contenteditable="true"], textarea').first(); await tap(p, ta, 800); await sleep(300)
	await p.keyboard.type("希区柯克风格的熊猫探险电影预告片", { delay: 120 }); await sleep(700)
	const send = p.getByRole("button", { name: "发送" }).first(); if (await send.count()) await to(p, send, 700); await sleep(1200)
})
// 3. home quick-image chip fills a real prompt
await record("home_chip", "/", null, async (p) => {
	const chip = p.getByRole("button", { name: "复古杂志封面" }).first(); await tap(p, chip, 900); await sleep(2200)
	const chip2 = p.getByRole("button", { name: "像素游戏界面" }).first(); if (await chip2.count()) { await tap(p, chip2, 700); await sleep(2200) }
})
// 4. gallery scroll
await record("gallery", "/create", warm, async (p) => { await p.mouse.move(1000, 600); await smoothScroll(p, 1400, 6000); await sleep(400) })
// 5. category tabs
await record("tabs", "/create", warm, async (p) => {
	for (const n of ["MOSS Image", "喵喵喵", "二次元", "商务创意", "摄影"]) { const t = p.getByText(n, { exact: true }).first(); if (await t.count()) { await tap(p, t, 500); await sleep(1700) } }
})
// 6. MOSS Image zone scroll
await record("mossimage", "/create?category=mossimage", warm, async (p) => { await p.mouse.move(1000, 600); await smoothScroll(p, 1100, 5000) })
// 7. voice library
await record("voice", "/voice/library", warm, async (p) => { await p.mouse.move(900, 500); await smoothScroll(p, 900, 4500); await sleep(300) })
// 8. synthesis: scene chips fill a script
await record("synth", "/voice/synthesis?voiceId=9ff70172-ab1b-4e4d-9e72-0e29dbc85e91", null, async (p) => {
	for (const n of ["早安电台", "播客闲聊", "睡前放松"]) { const c = p.getByText(n, { exact: true }).first(); if (await c.count()) { await tap(p, c, 700); await sleep(1800) } }
})
// 9. dark mode + language
await record("theme", "/", null, async (p) => {
	const d = p.getByRole("button", { name: "切换为暗色模式" }).first(); await tap(p, d, 900); await sleep(1800)
	const l = p.getByRole("button", { name: /切换为亮色模式|亮色/ }).first(); if (await l.count()) { await tap(p, l, 300); await sleep(1500) }
	const lang = p.getByRole("button", { name: "中文" }).first(); if (await lang.count()) { await tap(p, lang, 700); await sleep(900); const en = p.getByText("English", { exact: true }).first(); if (await en.count()) { await tap(p, en, 500); await sleep(2200) } }
})
// 10. home scroll through sections
await record("home_scroll", "/", warm, async (p) => { await p.mouse.move(1000, 700); await smoothScroll(p, 2000, 7000) })
await browser.close()
