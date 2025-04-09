import { Bot, Stage } from "@botnet/bots/bot"
import { ActivityType, GatewayIntentBits } from "discord.js"

export default new Bot({
	name: "Joystick",
	description:
		"A bot focused around small, text-based games that you can play right from Discord",
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

	color: 0x159f31,

	console: {
		prefix: "{bot|name} #{bot|shard|id}] ",
		color: "\x1b[32m"
	},

	inDevelopment: true,
	token: process.env["TOKEN_GAMES"] as string
})
