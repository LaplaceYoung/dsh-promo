import { chromium } from "playwright"
const b = await chromium.launch()
const p = await b.newPage({ viewport:{width:1440,height:900}, deviceScaleFactor:2 })
await p.goto("https://mosmos.io/zh.html",{waitUntil:"networkidle"}); await p.waitForTimeout(1500)
await p.getByText("拒绝统计").click().catch(e=>console.log('nobanner'))
await p.waitForTimeout(800)
const h = await p.evaluate(()=>document.body.scrollHeight)
for(let y=0,i=0;y<h;y+=700,i++){ await p.evaluate(v=>scrollTo(0,v),y); await p.waitForTimeout(1500); await p.screenshot({path:`../site/zh-c${String(i).padStart(2,"0")}.png`}) }
// hero demo animation frames
await p.evaluate(()=>scrollTo(0,450)); 
for(let i=0;i<12;i++){ await p.waitForTimeout(700); await p.screenshot({path:`../site/hero-anim${String(i).padStart(2,"0")}.png`}) }
await b.close()
