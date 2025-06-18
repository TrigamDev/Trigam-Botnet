import { type APITextDisplayComponent } from "discord.js"
import { TextDisplayBuilder } from "@discordjs/builders"
import { heading, HeadingLevel } from "@discordjs/formatters"

/* -------------------------------------------------------------------------- */

export function text ( content: string ): APITextDisplayComponent {
	return new TextDisplayBuilder({ content }).toJSON()
}

export function header (
	content: string,
	level: HeadingLevel
): APITextDisplayComponent {
	return new TextDisplayBuilder({
		content: heading( content, level as any )
	}).toJSON()
}
