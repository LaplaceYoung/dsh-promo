import { chromium } from "playwright"
import fs from "node:fs"
const b = await chromium.launch()
const p = await b.newPage({ viewport:{width:1920,height:1080}, locale:"zh-CN" })
for (const [n,u] of [["agents","/agents"],["synth","/voice/synthesis?voiceId=9ff70172-ab1b-4e4d-9e72-0e29dbc85e91"],["create","/create"],["voice","/voice/library"]]) {
  await p.goto("https://create.moss.cn"+u,{waitUntil:"networkidle",timeout:60000}).catch(()=>{}); await p.waitForTimeout(2000)
  const t = await p.evaluate(()=>document.body.innerText); fs.writeFileSync(`../site/text-${n}.txt`,t); console.log('=====',n); console.log(t.slice(0,1500))
}
await p.goto("https://create.moss.cn/",{waitUntil:"networkidle"})
const logo = await p.evaluate(()=>{const a=document.querySelector('a[href="/"]'); return a?a.innerHTML:null}); fs.writeFileSync('../site/logo.html',logo||'')
const ph = await p.evaluate(()=>[...document.querySelectorAll('textarea,input')].map(e=>e.placeholder))
console.log('placeholders',ph)
await b.close()
