import { chromium } from "playwright"
const b = await chromium.launch()
const p = await b.newPage({ viewport:{width:1440,height:900}, deviceScaleFactor:1.5 })
await p.goto("https://mosmos.io/zh.html",{waitUntil:"networkidle"})
try { const btn = p.locator('button:has-text("拒绝统计")'); await btn.waitFor({timeout:8000}); await btn.click(); } catch(e){ console.log('banner',e.message.slice(0,80)) }
await p.waitForTimeout(500)
const secs = await p.$$eval('section', s=>s.map(e=>[e.id, e.getBoundingClientRect().top+scrollY, e.getBoundingClientRect().height]))
console.log(JSON.stringify(secs))
let i=0
for (const s of await p.$$('section')) { await s.scrollIntoViewIfNeeded(); await p.waitForTimeout(2500); await s.screenshot({path:`../site/sec${i++}.png`}) }
// scene tabs
for (const t of ["邮件","文档","提示词","代码与终端"]) { const el=p.getByRole('tab',{name:t}).or(p.locator(`button:has-text("${t}")`)).first(); try{await el.scrollIntoViewIfNeeded(); await el.click(); await p.waitForTimeout(3500); await p.screenshot({path:`../site/tab-${t.replace(/\W/g,'')||t}.png`})}catch(e){console.log('tab',t,e.message.slice(0,60))} }
for (const t of ["关闭","高级"]) { try{const el=p.locator(`button:has-text("${t}")`).first(); await el.scrollIntoViewIfNeeded(); await el.click(); await p.waitForTimeout(2000); await p.screenshot({path:`../site/polish-${t}.png`})}catch(e){console.log('pol',t,e.message.slice(0,60))} }
await b.close()
