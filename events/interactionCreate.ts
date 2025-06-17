import { Events, type Interaction } from "discord.js"

import type { Bot } from "@botnet/bots/bot"
import { sendErrorEmbed } from "@botnet/tools/warner"

import errors from "@config/errors"
import { devs } from "@config/whitelist"

/* -------------------------------------------------------------------------- */

export default {
	name: Events.InteractionCreate,
	once: false,
	async execute ( bot: Bot, interaction: Interaction ) {
		if ( !interaction.isChatInputCommand() ) return

		const command = bot.commands.get( interaction.commandName )
		if ( !command ) {
			console.error(
				`No command matching ${interaction.commandName} found!`
			)
			return
		}

		if ( command.dev && !devs.includes( interaction.user.id ) ) {
			await sendErrorEmbed( errors.devOnlyCommand, interaction, bot )
			return
		}

		try {
			await command.execute( bot, interaction )
		} catch ( commandError ) {
			console.error( commandError )
			await sendErrorEmbed( errors.couldntRunCommand, interaction, bot )
		}
	}
}
