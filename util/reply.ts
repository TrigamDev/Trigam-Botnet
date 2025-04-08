import type { ButtonInteraction, CommandInteraction } from "discord.js"

// https://github.com/eritislami/evobot/blob/master/utils/safeReply.ts
export async function safeReply(
	interaction: CommandInteraction | ButtonInteraction,
	content: string
) {
	try {
		if (interaction.deferred || interaction.replied) {
			interaction.followUp(content)
		} else {
			await interaction.reply(content)
		}
	} catch (error) {
		console.error(error)
	}
}
