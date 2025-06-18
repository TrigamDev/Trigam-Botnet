import { ActivityType, GatewayIntentBits } from "discord.js"
import chalk from "chalk"

import { Bot, Stage } from "@botnet/bots/bot"

/* -------------------------------------------------------------------------- */

export default new Bot({
	name: "Toolbox",
	description:
		"A bot focused around providing small utility features, making your Discord experience just a bit easier",
	botId: "util",
	version: {
		major: 0,
		minor: 1,
		patch: 0,
		stage: Stage.Development
	},

	intents: [ GatewayIntentBits.Guilds ],

	activity: {
		name: "for people to help!",
		type: ActivityType.Watching
	},

	color: 0xfc7531,

	console: {
		prefix: "{bot|name} #{bot|shard|id}] ",
		color: chalk.hex( "#FC7531" )
	},
	emoji: {
		id: "1140625715117691001",
		name: "toolbox_bot"
	},

	inDevelopment: true,
	token: process.env[ "TOKEN_UTIL" ] as string
})
