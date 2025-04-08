import { Bot, Stage } from "@botnet/bots/bot"
import { ActivityType, GatewayIntentBits } from "discord.js"

export const Games = new Bot({
	name: "Joystick",
	id: "games",
	version: {
		major: 0,
		minor: 1,
		patch: 0,
		stage: Stage.Development
	},

	intents: [GatewayIntentBits.Guilds],

	activity: {
		name: "games with you!",
		type: ActivityType.Playing
	},

	console: {
		prefix: "Joystick] ",
		color: "\x1b[32m"
	},

	inDevelopment: true,
	token: process.env["TOKEN_GAMES"] as string
})
