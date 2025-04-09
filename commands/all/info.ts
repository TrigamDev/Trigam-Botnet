import type { Bot } from "@botnet/bots/bot"
import { safeReply } from "@botnet/util/reply"
import {
	ChatInputCommandInteraction,
	EmbedBuilder,
	MessageFlags,
	SlashCommandBuilder,
	time,
	TimestampStyles
} from "discord.js"

export default {
	data: new SlashCommandBuilder()
		.setName("info")
		.setDescription("Displays some basic information about the bot"),
	async execute(bot: Bot, interaction: ChatInputCommandInteraction) {
		const version = bot.config.version
		const infoEmbed = new EmbedBuilder({
			title: bot.config.name,
			description: bot.config.description ?? "",
			color: bot.config.color,
			timestamp: Date.now(),
			fields: [
				{
					name: "Bot Id",
					value: `\`${bot.config.id}\``,
					inline: true
				},
				{
					name: "Version",
					value: `\`v${version.major}.${version.minor}.${version.patch}-${version.stage}\``,
					inline: true
				},
				{
					name: "Started",
					value: time(
						new Date(bot.started),
						TimestampStyles.RelativeTime
					),
					inline: true
				}, /*{
					name: "Shard",
					value: `${bot.client.shard}/${bot.client.shard?.count ?? 1}`,
					inline: true
				},*/ {
					name: "Servers",
					value: `\`${bot.client.guilds.cache.size}\``,
					inline: true
				}
			]
		})

		// Set embed thumbnail to bot avatar
		const botAvatar = bot.client.user?.avatarURL()
		if (botAvatar) infoEmbed.setThumbnail(botAvatar)

		// Reply with embed
		await safeReply(interaction, {
			embeds: [infoEmbed],
			flags: MessageFlags.Ephemeral
		})
	}
}
