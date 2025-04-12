import {
	ApplicationCommandOptionType as OptionType,
	ChatInputCommandInteraction
} from "discord.js"

import type { Bot } from "@botnet/bots/bot"
import type { Command } from "@commands/command"
import { Bracketeer } from "@tools/bracketeer/bracketeer"

const commandOptions = [
	{
		type: OptionType.String,
		name: "args",
		description:
			"The arguments to execute the command with (seperated by commas)",
		required: false
	},
	{
		type: OptionType.Boolean,
		name: "debug",
		description: "Whether to show the execution steps of the command",
		required: false
	}
]

export default {
	data: {
		name: "exec",
		description: "Execute custom command code",
		options: [
			{
				type: OptionType.Subcommand,
				name: "text",
				description: "Run code from text",
				options: [
					{
						type: OptionType.String,
						name: "code",
						description: "The code to run",
						required: true
					}
				].concat( commandOptions )
			},
			{
				type: OptionType.Subcommand,
				name: "file",
				description: "Run code from a text file",
				options: [
					{
						type: OptionType.Attachment,
						name: "code",
						description: "The text file to run",
						required: true
					}
				].concat( commandOptions )
			}
		]
	},
	async execute ( bot: Bot, interaction: ChatInputCommandInteraction ) {
		let customCode = ""

		// Get the custom command code, if submitting direct text
		const submittedCode = interaction.options.getString( "code" )
		if ( submittedCode ) customCode = submittedCode

		// Get the contents of the text file, if submitted

		// Execute the command
		const bracketeer = new Bracketeer({ bot, interaction }, {})
		const response = await bracketeer.execute( customCode )

		// Reply
		await interaction.reply({ content: response.slice( 0, 2000 ) })
	}
} as Command
