import { Bot, Stage } from "@botnet/bots/bot"
import { ActivityType, GatewayIntentBits } from "discord.js"

export const Util = new Bot({
	name: "Toolbox",
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

	console: {
		prefix: "Toolbox] ",
		color: "\x1b[33m"
	},

	inDevelopment: true,
	token: process.env["TOKEN_UTIL"] as string
})
