import { Events, MessageFlags, type Interaction } from "discord.js"

import type { Bot } from "@bots/bot"

import { safeReply } from "@botnet/util/reply"

import errors from "@config/errors"
import { devs } from "@config/whitelist"

import errorMessage from "@components/util/error"

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
			await safeReply( interaction, {
				components: [ await errorMessage( errors.devOnlyCommand, bot ) ],
				flags: [ MessageFlags.IsComponentsV2, MessageFlags.Ephemeral ]
			})
			return
		}

		try {
			await command.execute( bot, interaction )
		} catch ( commandError ) {
			console.error( commandError )
			await safeReply( interaction, {
				components: [ await errorMessage( errors.couldntRunCommand, bot ) ],
				flags: [ MessageFlags.IsComponentsV2, MessageFlags.Ephemeral ]
			})
		}
	}
}
