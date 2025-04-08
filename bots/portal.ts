import { Bot, Stage } from "@botnet/bots/bot"
import { ActivityType, GatewayIntentBits } from "discord.js"

export const Portal = new Bot({
	name: "Phone",
	id: "portal",
	version: {
		major: 0,
		minor: 1,
		patch: 0,
		stage: Stage.Development
	},

	intents: [GatewayIntentBits.Guilds],

	activity: {
		name: "for messages for you!",
		type: ActivityType.Listening
	},

	console: {
		prefix: "Phone] ",
		color: "\x1b[36m"
	},

	inDevelopment: true,
	token: process.env["TOKEN_PORTAL"] as string
})
