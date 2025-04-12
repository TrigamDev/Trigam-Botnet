import {
	ApplicationCommandOptionType as OptionType,
	ChatInputCommandInteraction,
	codeBlock
} from "discord.js"

import type { Bot } from "@botnet/bots/bot"
import type { Command } from "@commands/command"
import { safeReply } from "@botnet/util/reply"
import { sendErrorEmbed } from "@botnet/tools/warner"
import errors from "@botnet/config/errors"

export default {
	dev: true,
	data: {
		name: "eval",
		description: "(Dev only) Evaluate a snippet of code",
		options: [
			{
				type: OptionType.String,
				name: "code",
				description: "A snippet of code to evaluate",
				required: true
			}
		]
	},
	async execute ( bot: Bot, interaction: ChatInputCommandInteraction ) {
		const code = interaction.options.getString( "code" ) ?? ""
		try {
			// eslint-disable-next-line no-eval
			const evaluated = await eval( code )
			if ( evaluated?.token ) evaluated.token = "********"

			// Format the result and reply
			const result: string = codeBlock(
				"json",
				JSON.stringify(
					evaluated,
					( key, value ) => {
						if ( typeof value === "bigint" ) return Number( value )
						return value
					},
					4
				)
			)
			if ( result.length > 2000 )
				await sendErrorEmbed( errors.evalLongResult, interaction, bot )

			await safeReply( interaction, {
				content: result
			})
		} catch ( evalError: any ) {
			// Usually a stack call size error
			if ( evalError instanceof RangeError )
				await sendErrorEmbed( errors.evalStackSize, interaction, bot )
			else {
				const dynamicError = errors.evalError
				dynamicError.description = evalError.message
				await sendErrorEmbed( dynamicError, interaction, bot )
			}
		}
	}
} as Command
