import { Config } from "@remotion/cli/config"
import path from "path"
// Template folders live next to the engine (../NN-slug). Let their imports resolve
// to this engine's node_modules.
Config.overrideWebpackConfig((c) => ({
	...c,
	resolve: { ...c.resolve, modules: [path.resolve(process.cwd(), "node_modules"), "node_modules"] },
}))
Config.setVideoImageFormat("jpeg")
