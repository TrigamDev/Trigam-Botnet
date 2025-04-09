import { Bot, Stage } from "@botnet/bots/bot"
import { ActivityType, GatewayIntentBits } from "discord.js"

export default new Bot({
	name: "Radio",
	description:
		"A bot focused on playing music right into voice channels, giving some background music to whatever madness is happening in call",
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

	color: 0xef233c,

	console: {
		prefix: "{bot|name} #{bot|shard|id}] ",
		color: "\x1b[31m"
	},

	inDevelopment: true,
	token: process.env["TOKEN_MUSIC"] as string
})
