import {
	ChatInputCommandInteraction,
	version as discordJsVersion,
	OAuth2Scopes
} from "discord.js"
import {
	SectionBuilder,
	ThumbnailBuilder,
	ContainerBuilder,
	SeparatorBuilder
} from "@discordjs/builders"
import {
	inlineCode,
	time,
	hyperlink,
	HeadingLevel,
	TimestampStyles
} from "@discordjs/formatters"

import type { Bot } from "@botnet/bots/bot"

import { wrapText } from "@botnet/util/text"

import { header, text } from "@components/basic/text"
import { fields } from "@components/basic/fields"
import { linkRow } from "@components/basic/button"

/* -------------------------------------------------------------------------- */

export async function botStatus (
	bot: Bot,
	interaction: ChatInputCommandInteraction
) {
	// Bot info
	const commands: string = String( bot.commands.size )

	// Perfomance
	const memoryUsage = Number(
		( process.memoryUsage().heapUsed / 1024 / 1024 ).toFixed( 2 )
	)

	// Shard
	const botShard: string = String( interaction.guild?.shardId )
	const totalShards: string = String( ( bot.client.shard?.count ?? 1 ) - 1 )

	const shardUsers: string = String( bot.client.users.cache.size )
	const totalUsers: string = String(
		await bot.client.shard?.fetchClientValues( "users.cache.size" )
	)

	const shardServers: string = String( bot.client.guilds.cache.size )
	const totalServers: string = String(
		await bot.client.shard?.fetchClientValues( "guilds.cache.size" )
	)

	const shardChannels: string = String( bot.client.channels.cache.size )
	const totalChannels: string = String(
		await bot.client.shard?.fetchClientValues( "channels.cache.size" )
	)

	// Build component
	return new ContainerBuilder({
		accent_color: bot.config.color,
		components: [
			// #region Bot info
			new SectionBuilder({
				components: [
					header( bot.config.name, HeadingLevel.One ),
					text( wrapText( bot.config.description, 55 ) ),

					// Fields
					fields( [
						[ "Bot ID", inlineCode( `${bot.config.botId}` ) ],
						[ "Version", inlineCode( `v${bot.getVersion()}` ) ],
						[
							"Running on",
							[
								`${hyperlink( "Bun", "https://bun.sh" )} ${inlineCode( `v${Bun.version}` )}`,
								`${hyperlink( "discord.js", "https://discord.js.org/" )} ${inlineCode( `v${discordJsVersion}` )}`
							]
						],
						[ "Commands", inlineCode( commands ) ]
					] )
				],
				accessory: new ThumbnailBuilder({
					media: { url: bot.getAvatar() }
				}).toJSON()
			}).toJSON(),
			// #endregion

			new SeparatorBuilder({ spacing: 2, divider: true }).toJSON(),

			// #region Performance
			header( "Performance", HeadingLevel.Three ),

			fields( [
				[
					"Started",
					time( new Date( bot.started ), TimestampStyles.RelativeTime )
				],
				[ "Memory Usage", inlineCode( `${memoryUsage}mb` ) ],
				[ "Websocket Latency", inlineCode( `${bot.client.ws.ping}ms` ) ]
			] ),
			// #endregion

			new SeparatorBuilder({ spacing: 2, divider: true }).toJSON(),

			// #region Shard
			header( "Shard", HeadingLevel.Three ),
			fields( [
				[ "Shard ID", `${inlineCode( `#${botShard}` )}` ],
				[ "Shards", inlineCode( totalShards ) ],
				[
					"Users",
					`${inlineCode( totalUsers )} (on shard: ${inlineCode( shardUsers )})`
				],
				[
					"Servers",
					`${inlineCode( totalServers )} (on shard: ${inlineCode( shardServers )})`
				],
				[
					"Channels",
					`${inlineCode( totalChannels )} (on shard: ${inlineCode( shardChannels )})`
				]
			] ),
			// #endregion

			new SeparatorBuilder({ spacing: 2, divider: true }).toJSON(),

			// #region Links
			linkRow( [
				[
					"Created by Trigam!",
					"https://trigam.dev/",
					{
						id: "1146885731139198997",
						name: "trigam_icon"
					}
				],
				[ "GitHub", "https://github.com/TrigamDev/Trigam-Botnet" ]
			] ),

			linkRow( [
				[
					"Support Server",
					"https://discord.gg/5cNRrzq9hc",
					{
						id: "1365836350582030367",
						name: "discord_white"
					}
				],
				[
					"Invite Me!",
					bot.client.generateInvite({
						permissions: [],
						scopes: [
							OAuth2Scopes.Bot,
							OAuth2Scopes.ApplicationsCommands
						]
					}),
					bot.config.emoji
				]
			] )
			// #endregion
		]
	})
}
