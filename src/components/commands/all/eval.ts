import { ContainerBuilder, SeparatorBuilder } from "@discordjs/builders"
import { HeadingLevel, codeBlock } from "@discordjs/formatters"

import type { Bot } from "@bots/bot"

import { header, text } from "@components/basic/text"

import { errorColor } from "@config/components"

/* -------------------------------------------------------------------------- */

export default function evalResult (
	bot: Bot,
	input: string,
	output: string,
	wasError: boolean = false
) {
	return new ContainerBuilder({
		accent_color: wasError ? errorColor : bot.config.color,
		components: [
			header( "Input", HeadingLevel.Three ),
			text( codeBlock( "ts", input ?? "" ) ),

			new SeparatorBuilder({ spacing: 2, divider: true }).toJSON(),

			header( "Output", HeadingLevel.Three ),
			text( codeBlock( "ts", output ?? "" ) )
		]
	})
}
