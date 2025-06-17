import { ActivityType, GatewayIntentBits } from "discord.js"

import { Bot, Stage } from "@botnet/bots/bot"

/* -------------------------------------------------------------------------- */

export default new Bot({
	name: "Box",
	description:
		"A bot focused around fun, silly commands to add some flavor to your server",
	botId: "fun",
	version: {
		major: 0,
		minor: 1,
		patch: 0,
		stage: Stage.Development
	},

	intents: [ GatewayIntentBits.Guilds ],

	activity: {
		name: "with you!",
		type: ActivityType.Playing
	},

	color: 0x3f48cc,

	console: {
		prefix: "{bot|name} #{bot|shard|id}] ",
		color: "\x1b[34m"
	},
	emoji: {
		id: "1140432284634321016",
		name: "box_bot"
	},

	inDevelopment: true,
	token: process.env[ "TOKEN_FUN" ] as string
})
