// Registers every template composition. Each template folder (../../NN-slug) exports Film and has meta.json.
import React from "react"
import { Composition } from "remotion"
import { Film as F03 } from "../../03-claude-extended-thinking/Film"
import M03 from "../../03-claude-extended-thinking/meta.json"
import { Film as F04 } from "../../04-linear-releases/Film"
import M04 from "../../04-linear-releases/meta.json"
import { Film as F05 } from "../../05-linear-orbit/Film"
import M05 from "../../05-linear-orbit/meta.json"
import { Film as F06 } from "../../06-arc-live-folders/Film"
import M06 from "../../06-arc-live-folders/meta.json"
import { Film as F07 } from "../../07-notion-ai/Film"
import M07 from "../../07-notion-ai/meta.json"

const T = [[F03, M03], [F04, M04], [F05, M05], [F06, M06], [F07, M07]] as const
export const Root = () => (
	<>
		{T.map(([F, m]) => (
			<Composition key={m.comp} id={m.comp} component={F as React.FC} durationInFrames={Math.round(m.dur * m.fps)} fps={m.fps} width={1920} height={1080} />
		))}
	</>
)
