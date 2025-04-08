import type { Bot } from "@botnet/bots/bot"
import { ping } from "@botnet/config/pools/pooler"
import { safeReply } from "@botnet/util/reply"
import {
	ChatInputCommandInteraction,
	MessageFlags,
	SlashCommandBuilder
} from "discord.js"

export default {
	data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("Responds with the ping of the bot"),
	async execute(bot: Bot, interaction: ChatInputCommandInteraction) {
		const latency = Date.now() - interaction.createdTimestamp
		const response = ping(latency, { bot })
		await safeReply(interaction, {
			content: `${response.chosen}\nPing: \`${latency}ms\``,
			flags: MessageFlags.Ephemeral
		})
	}
}
