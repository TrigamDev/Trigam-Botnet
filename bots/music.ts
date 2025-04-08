import { Bot, Stage } from "@botnet/bots/bot"
import { ActivityType, GatewayIntentBits } from "discord.js"

export const Music = new Bot({
	name: "Radio",
	id: "music",
	version: {
		major: 0,
		minor: 1,
		patch: 0,
		stage: Stage.Development
	},

	intents: [GatewayIntentBits.Guilds],

	activity: {
		name: "to your tunes!",
		type: ActivityType.Listening
	},

	console: {
		prefix: "Radio] ",
		color: "\x1b[31m"
	},

	inDevelopment: true,
	token: process.env["TOKEN_MUSIC"] as string
})
