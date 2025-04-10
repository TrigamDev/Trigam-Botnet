import type { Bot } from '@botnet/bots/bot'
import { ping } from '@botnet/config/pools/pooler'
import {
	ChatInputCommandInteraction,
	MessageFlags,
	SlashCommandBuilder
} from 'discord.js'

export default {
	data: new SlashCommandBuilder()
		.setName( 'ping' )
		.setDescription( 'Responds with the ping of the bot' ),
	async execute ( bot: Bot, interaction: ChatInputCommandInteraction ) {
		await interaction.deferReply({ flags: MessageFlags.Ephemeral })
		const reply = await interaction.fetchReply()

		const latency = reply.createdTimestamp - interaction.createdTimestamp
		const pingResponse = ping( latency, { bot })

		interaction.editReply({
			content: `${pingResponse.chosen}\nPing: \`${latency}ms\``
		})
	}
}
