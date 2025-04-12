import { ChatInputCommandInteraction, MessageFlags } from "discord.js"

import type { Bot } from "@botnet/bots/bot"
import type { Command } from "@commands/command"
import { ping } from "@tools/pooler"

export default {
	data: {
		name: "ping",
		description: "Responds with the bot's latency"
	},
	async execute ( bot: Bot, interaction: ChatInputCommandInteraction ) {
		await interaction.deferReply({ flags: MessageFlags.Ephemeral })
		const reply = await interaction.fetchReply()

		// Calculate latency and get response
		const latency = reply.createdTimestamp - interaction.createdTimestamp
		const pingResponse = await ping( latency, { bot })

		// Reply
		interaction.editReply({
			content: `${pingResponse.chosen}\nPing: \`${latency}ms\``
		})
	}
} as Command
