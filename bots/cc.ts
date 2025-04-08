import { Bot, Stage } from "@botnet/bots/bot"
import { ActivityType, GatewayIntentBits } from "discord.js"

export const CustomCommands = new Bot({
	name: "Cog",
	id: "cc",
	version: {
		major: 0,
		minor: 1,
		patch: 0,
		stage: Stage.Development
	},

	intents: [GatewayIntentBits.Guilds],

	activity: {
		name: "for custom commands!",
		type: ActivityType.Watching
	},

	console: {
		prefix: "Cog] ",
		color: "\x1b[36m"
	},

	inDevelopment: true,
	token: process.env["TOKEN_CC"] as string
})
