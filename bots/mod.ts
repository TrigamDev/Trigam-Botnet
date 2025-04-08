import { Bot, Stage } from "@botnet/bots/bot"
import { ActivityType, GatewayIntentBits } from "discord.js"

export const Moderation = new Bot({
	name: "Hammer",
	id: "mod",
	version: {
		major: 0,
		minor: 1,
		patch: 0,
		stage: Stage.Development
	},

	intents: [GatewayIntentBits.Guilds],

	activity: {
		name: "over the server!",
		type: ActivityType.Watching
	},

	console: {
		prefix: "Hammer] ",
		color: "\x1b[35m"
	},

	inDevelopment: true,
	token: process.env["TOKEN_MOD"] as string
})
