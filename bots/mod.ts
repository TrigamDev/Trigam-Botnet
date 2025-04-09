import { Bot, Stage } from "@botnet/bots/bot"
import { ActivityType, GatewayIntentBits } from "discord.js"

export const Moderation = new Bot({
	name: "Hammer",
	description:
		"A bot focused on providing useful moderation tools, empowering you to keep your server safe",
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

	color: 0x6f1798,

	console: {
		prefix: "Hammer] ",
		color: "\x1b[35m"
	},

	inDevelopment: true,
	token: process.env["TOKEN_MOD"] as string
})
