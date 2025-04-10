import type { Bot } from '@botnet/bots/bot'
import { safeReply } from '@botnet/util/reply'
import { Events, MessageFlags, type Interaction } from 'discord.js'

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

		try {
			await command.execute( bot, interaction )
		} catch ( commandError ) {
			console.error( commandError )
			await safeReply( interaction, {
				content: 'There was an error while executing this command!',
				flags: MessageFlags.Ephemeral
			})
		}
	}
}
