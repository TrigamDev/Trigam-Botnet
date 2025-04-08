import type { Bot } from "@botnet/bots/bot"
import { safeReply } from "@botnet/util/reply"
import { Events, MessageFlags, type Interaction } from "discord.js"

export default {
	name: Events.InteractionCreate,
	once: false,
	async execute(bot: Bot, interaction: Interaction) {
		if (!interaction.isChatInputCommand()) return

		const command = bot.commands.get(interaction.commandName)
		if (!command)
			return console.error(
				`No command matching ${interaction.commandName} found!`
			)

		try {
			await command.execute(bot, interaction)
		} catch (error) {
			console.error(error)
			await safeReply(interaction, {
				content: "There was an error while executing this command!",
				flags: MessageFlags.Ephemeral
			})
		}
	}
}
