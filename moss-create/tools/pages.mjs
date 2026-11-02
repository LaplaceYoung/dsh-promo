import { chromium } from "playwright"
const b = await chromium.launch()
const ctx = await b.newContext({ viewport:{width:1920,height:1080}, locale:"zh-CN" })
const p = await ctx.newPage()
const closeModal = async()=>{ for (const n of ["关闭介绍","关闭"]) { const l=p.getByRole('button',{name:n}); if(await l.count()) { try{await l.first().click({timeout:1500})}catch{} } } }
for (const [n,u] of [["home","/"],["agents","/agents"],["create","/create"],["voice","/voice/library"],["assets","/assets"],["tpl","/create/tpl_9399eddf"],["synth","/voice/synthesis?voiceId=9ff70172-ab1b-4e4d-9e72-0e29dbc85e91"],["mossimage","/create?zone=moss-image"]]) {
  await p.goto("https://create.moss.cn"+u,{waitUntil:"networkidle",timeout:60000}).catch(()=>{}); await p.waitForTimeout(2500); await closeModal(); await p.waitForTimeout(800)
  await p.screenshot({path:`../site/p-${n}.png`})
  // scroll the main scrollable container
  for (let i=1;i<=3;i++){ await p.mouse.move(1000,700); await p.mouse.wheel(0,900); await p.waitForTimeout(1500); await p.screenshot({path:`../site/p-${n}-s${i}.png`}) }
  console.log(n, p.url())
}
// dark mode
await p.goto("https://create.moss.cn/",{waitUntil:"networkidle"}); await p.waitForTimeout(2000); await closeModal()
await p.getByRole('button',{name:'切换为暗色模式'}).click().catch(e=>console.log('dark',e.message.slice(0,50))); await p.waitForTimeout(1500); await p.screenshot({path:"../site/p-home-dark.png"})
await b.close()
