import { chromium } from "playwright"
const b = await chromium.launch()
for (const [name,url] of [["zh","https://mosmos.io/zh.html"],["en","https://mosmos.io/"]]) {
  const p = await b.newPage({ viewport:{width:1440,height:900}, deviceScaleFactor:2 })
  await p.goto(url,{waitUntil:"networkidle"}); await p.waitForTimeout(2500)
  await p.screenshot({path:`../site/${name}-hero.png`})
  await p.screenshot({path:`../site/${name}-full.png`,fullPage:true})
  const h = await p.evaluate(()=>document.body.scrollHeight); console.log(name,h)
  if(name==="zh"){ for(let y=0,i=0;y<h;y+=800,i++){ await p.evaluate(v=>scrollTo(0,v),y); await p.waitForTimeout(900); await p.screenshot({path:`../site/zh-s${String(i).padStart(2,"0")}.png`}) } 
    const css = await p.evaluate(()=>{const g=e=>e?getComputedStyle(e):null;const h1=document.querySelector('h1');const s=g(h1);return {h1font:s.fontFamily,h1w:s.fontWeight,h1size:s.fontSize,h1color:s.color,bodybg:g(document.body).backgroundColor,bodyfont:g(document.body).fontFamily}}); console.log(JSON.stringify(css)) }
}
await b.close()
