import { Bot, Stage } from "@botnet/bots/bot"
import { ActivityType, GatewayIntentBits } from "discord.js"

export const Fun = new Bot({
	name: "Box",
	id: "fun",
	version: {
		major: 0,
		minor: 1,
		patch: 0,
		stage: Stage.Development
	},

	intents: [GatewayIntentBits.Guilds],

	activity: {
		name: "with you!",
		type: ActivityType.Playing
	},

	console: {
		prefix: "Box] ",
		color: "\x1b[34m"
	},

	inDevelopment: true,
	token: process.env["TOKEN_FUN"] as string
})
