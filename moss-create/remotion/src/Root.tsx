import React from "react"
import { Composition } from "remotion"
import { Film } from "./Film"
import TL from "./timeline.json"
export const Root = () => (
	<>
		<Composition id="Moss" component={Film} durationInFrames={TL.frames} fps={60} width={1920} height={1080} />
		<Composition id="MossV" component={Film} durationInFrames={TL.frames} fps={60} width={1080} height={1920} />
	</>
)
