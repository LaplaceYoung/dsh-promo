// Rebuilds the Open Peeps (CC0) character SVGs used by template 16 into ./out (copy them to _engine/public/).
// Setup: npm pack @opeepsfun/open-peeps, extract its build/ folder next to this file, add {"type":"module"} as
// package.json and a node_modules link to _engine/node_modules. The exact set used here:
// node peeps.mjs '[["p1","Hoodie","ShortOne","Smile",null,null],["p2","Turtleneck","LongHair","Calm",null,"Glasses"],["p3","Tee","Afro","BigSmile",null,null],["p4","Jacket","Bun","Cute",null,null],["p5","PoloSweater","ShortThree","Driven","Chin",null],["p6","StripedTee","MediumBangs","Explaining",null,"GlassesTwo"]]'
import React from "react"
import { renderToStaticMarkup } from "react-dom/server"
import fs from "fs"
const h = React.createElement
const imp = async (p) => (await import(`./build/${p}.js`)).default
const PEEPS = JSON.parse(process.argv[2])
for (const [name, body, head, face, beard, acc] of PEEPS) {
	const B = await imp(`body/effigy/${body}`), Hd = await imp(`head/${head}`), F = await imp(`face/${face}`)
	const Bd = beard ? await imp(`beard/${beard}`) : null, A = acc ? await imp(`accessory/${acc}`) : null
	const headG = h("g", null,
		h("g", { transform: "translate(342, 190)" }, h(Hd, {})),
		h("g", { transform: "translate(531, 366)" }, h(F, {})),
		Bd && h("g", { transform: "translate(495, 518)" }, h(Bd, {})),
		A && h("g", { transform: "translate(419, 421)" }, h(A, {})))
	fs.writeFileSync(`out/t16-${name}.svg`, renderToStaticMarkup(h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "184 210 940 1130" }, h("g", { transform: "translate(147, 639)" }, h(B, {})), headG)))
	fs.writeFileSync(`out/t16-${name}-head.svg`, renderToStaticMarkup(h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "300 160 720 760" }, headG)))
}
