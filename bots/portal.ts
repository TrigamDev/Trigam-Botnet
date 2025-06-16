import { ActivityType, GatewayIntentBits } from "discord.js"

import { Bot, Stage } from "@botnet/bots/bot"

export default new Bot({
	name: "Phone",
	description:
		"A bot allowing you to connect channels from entirely different servers, bridging the gap and allowing different communities to talk with each other",
	botId: "portal",
	version: {
		major: 0,
		minor: 1,
		patch: 0,
		stage: Stage.Development
	},

	intents: [ GatewayIntentBits.Guilds ],

	activity: {
		name: "for messages for you!",
		type: ActivityType.Listening
	},

	color: 0x11cf96,

	console: {
		prefix: "{bot|name} #{bot|shard|id}] ",
		color: "\x1b[36m"
	},
	emoji: {
		id: "1149895492919107685",
		name: "phone_bot"
	},

	inDevelopment: true,
	token: process.env[ "TOKEN_PORTAL" ] as string
})
