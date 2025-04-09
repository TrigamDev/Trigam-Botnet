import { Bot, Stage } from "@botnet/bots/bot"
import { ActivityType, GatewayIntentBits } from "discord.js"

export default new Bot({
	name: "Toolbox",
	description:
		"A bot focused around providing small utility features, making your Discord experience just a bit easier",
	id: "util",
	version: {
		major: 0,
		minor: 1,
		patch: 0,
		stage: Stage.Development
	},

	intents: [GatewayIntentBits.Guilds],

	activity: {
		name: "for people to help!",
		type: ActivityType.Watching
	},

	color: 0xfc7531,

	console: {
		prefix: "{bot|name} #{bot|shard|id}] ",
		color: "\x1b[33m"
	},

	inDevelopment: true,
	token: process.env["TOKEN_UTIL"] as string
})
