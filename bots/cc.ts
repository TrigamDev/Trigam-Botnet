import { ActivityType, GatewayIntentBits as Intents } from "discord.js"
import chalk from "chalk"

import { Bot, Stage } from "@botnet/bots/bot"

/* -------------------------------------------------------------------------- */

export default new Bot({
	name: "Cog",
	description:
		"A bot providing a powerful (and completely original) custom command engine, allowing you to create your own custom commands",
	botId: "cc",
	version: {
		major: 0,
		minor: 1,
		patch: 0,
		stage: Stage.Development
	},

	intents: [ Intents.Guilds, Intents.GuildMembers ],

	activity: {
		name: "for custom commands!",
		type: ActivityType.Watching
	},

	color: 0x2ee8d7,

	console: {
		prefix: "{bot|name} #{bot|shard|id}] ",
		color: chalk.hex( "#2EE8D7" )
	},
	emoji: {
		id: "1149895560199950376",
		name: "cog_bot"
	},

	inDevelopment: true,
	token: process.env[ "TOKEN_CC" ] as string
})
