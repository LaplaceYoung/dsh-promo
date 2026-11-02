import { chromium } from "playwright"
const b = await chromium.launch()
const p = await b.newPage({ viewport:{width:1920,height:1080}, locale:"zh-CN" })
const shot = async n => { await p.waitForTimeout(1500); await p.screenshot({path:`../site/i-${n}.png`}); console.log('shot',n) }
const closeAll = async()=>{ for (const n of ["关闭介绍","关闭"]) { const l=p.getByRole('button',{name:n,exact:true}); const c=await l.count(); for(let i=0;i<c;i++){ try{await l.nth(i).click({timeout:800})}catch{} } } }
await p.goto("https://create.moss.cn/",{waitUntil:"domcontentloaded",timeout:60000}); await p.waitForTimeout(2500); await closeAll(); await shot('home-clean')
try { await p.getByRole('button',{name:'Auto'}).first().click({timeout:3000}); await shot('auto-menu') } catch(e){console.log('auto',e.message.slice(0,80))}
await p.keyboard.press('Escape')
try { await p.getByRole('button',{name:'手写黑板菜单'}).first().click({timeout:3000}); await shot('chip-click') } catch(e){console.log('chip',e.message.slice(0,80))}
await p.goto("https://create.moss.cn/agents",{waitUntil:"domcontentloaded",timeout:60000}); await p.waitForTimeout(2000); await closeAll()
try { await p.getByText('希区柯克风格的熊猫探险电影预告片').click({timeout:3000}); await shot('agents-chip') } catch(e){console.log('ag',e.message.slice(0,80))}
await p.goto("https://create.moss.cn/create",{waitUntil:"domcontentloaded",timeout:60000}); await p.waitForTimeout(3000); await closeAll()
const card = p.getByText('品牌贝果平面设计广告').first()
try { await card.hover({timeout:3000}); await shot('card-hover'); await card.click({timeout:3000}); await shot('card-open'); console.log(p.url()) } catch(e){console.log('card',e.message.slice(0,80))}
await p.goto("https://create.moss.cn/voice/synthesis?voiceId=9ff70172-ab1b-4e4d-9e72-0e29dbc85e91",{waitUntil:"domcontentloaded",timeout:60000}); await p.waitForTimeout(2000); await closeAll()
try { await p.getByText('早安电台',{exact:true}).click({timeout:3000}); await shot('synth-chip') } catch(e){console.log('syn',e.message.slice(0,80))}
await p.goto("https://create.moss.cn/",{waitUntil:"domcontentloaded",timeout:60000}); await p.waitForTimeout(2000); await closeAll()
try { await p.getByRole('button',{name:'中文'}).first().click({timeout:3000}); await shot('lang-menu') } catch(e){console.log('lang',e.message.slice(0,80))}
await b.close()
