import {
	ChatInputCommandInteraction,
	EmbedBuilder,
	MessageFlags,
	time,
	TimestampStyles
} from "discord.js"

import type { Bot } from "@botnet/bots/bot"
import type { Command } from "@commands/command"

import { safeReply } from "@botnet/util/reply"

// https://github.com/GDColon/Polaris-Open/blob/main/commands/slash/botstatus.js
export default {
	data: {
		name: "status",
		description: "Displays the bot's status and info"
	},
	async execute ( bot: Bot, interaction: ChatInputCommandInteraction ) {
		// Fetch various data
		const { version } = bot.config
		const totalServers =
			await bot.client.shard?.fetchClientValues( "guilds.cache.size" )

		const infoEmbed = new EmbedBuilder({
			title: bot.config.name,
			description: bot.config.description ?? "",
			color: bot.config.color,
			timestamp: Date.now(),
			fields: [
				{
					name: "Bot Id",
					value: `\`${bot.config.botId}\``,
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
						new Date( bot.started ),
						TimestampStyles.RelativeTime
					),
					inline: true
				},
				{
					name: "Shard",
					value: `${interaction.guild?.shardId}/${( bot.client.shard?.count ?? 1 ) - 1}`,
					inline: true
				},
				{
					name: "Servers",
					value: `${bot.client.guilds.cache.size}/${totalServers}`,
					inline: true
				},
				{
					name: "Memory Usage",
					value: `${Number( ( process.memoryUsage().heapUsed / 1024 / 1024 ).toFixed( 2 ) )} MB`,
					inline: true
				}
			]
		})

		// Set embed thumbnail to bot avatar
		const botAvatar = bot.client.user?.avatarURL()
		if ( botAvatar ) infoEmbed.setThumbnail( botAvatar )

		// Reply with embed
		await safeReply( interaction, {
			embeds: [ infoEmbed ],
			flags: MessageFlags.Ephemeral
		})
	}
} as Command
