import { ActivityType, GatewayIntentBits } from "discord.js"

import { Bot, Stage } from "@botnet/bots/bot"

/* -------------------------------------------------------------------------- */

export default new Bot({
	name: "Hammer",
	description:
		"A bot focused on providing useful moderation tools, empowering you to keep your server safe",
	botId: "mod",
	version: {
		major: 0,
		minor: 1,
		patch: 0,
		stage: Stage.Development
	},

	intents: [ GatewayIntentBits.Guilds ],

	activity: {
		name: "over the server!",
		type: ActivityType.Watching
	},

	color: 0x6f1798,

	console: {
		prefix: "{bot|name} #{bot|shard|id}] ",
		color: "\x1b[35m"
	},
	emoji: {
		id: "1140432477979164673",
		name: "hammer_bot"
	},

	inDevelopment: true,
	token: process.env[ "TOKEN_MOD" ] as string
})
