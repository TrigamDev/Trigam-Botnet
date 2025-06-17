import { inspect } from "bun"

import {
	ApplicationCommandOptionType as OptionType,
	ChatInputCommandInteraction,
	MessageFlags
} from "discord.js"

import type { Bot } from "@botnet/bots/bot"
import type { Command } from "@commands/command"

import sandbox from "@botnet/util/sandbox/sandbox"
import { safeReply } from "@botnet/util/reply"

import evalResult from "@components/all/eval"

/* -------------------------------------------------------------------------- */

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
			const evaluated = await sandbox( code, { bot, interaction })

			// Result
			let lengthBudget: number = 3500
			lengthBudget -= code.length

			let result: string = inspect( evaluated, {
				depth: 1
			}).slice( 0, lengthBudget )

			if ( typeof result === "undefined" ) result = "undefined"
			if ( result.length === lengthBudget ) result += " // Truncated..."

			await safeReply( interaction, {
				components: [ evalResult( bot, code, result ) ],
				flags: [ MessageFlags.IsComponentsV2 ]
			})
		} catch ( evalError: any ) {
			await safeReply( interaction, {
				components: [ evalResult( bot, code, String( evalError ), true ) ],
				flags: [ MessageFlags.IsComponentsV2 ]
			})
		}
	}
} as Command
