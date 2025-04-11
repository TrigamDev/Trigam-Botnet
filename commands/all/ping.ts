import type { Bot } from "@botnet/bots/bot"
import { ping } from "@botnet/tools/pooler"
import { ChatInputCommandInteraction, MessageFlags } from "discord.js"
import type { Command } from "@commands/command"

export default {
	data: {
		name: "ping",
		description: "Responds with the bot's latency"
	},
	async execute ( bot: Bot, interaction: ChatInputCommandInteraction ) {
		await interaction.deferReply({ flags: MessageFlags.Ephemeral })
		const reply = await interaction.fetchReply()

		const latency = reply.createdTimestamp - interaction.createdTimestamp
		const pingResponse = await ping( latency, { bot })

		interaction.editReply({
			content: `${pingResponse.chosen}\nPing: \`${latency}ms\``
		})
	}
} as Command
