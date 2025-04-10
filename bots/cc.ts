import { Bot, Stage } from '@botnet/bots/bot'
import { ActivityType, GatewayIntentBits } from 'discord.js'

export default new Bot({
	name: 'Cog',
	description:
		'A bot providing a powerful (and completely original) custom command engine, allowing you to create your own custom commands',
	botId: 'cc',
	version: {
		major: 0,
		minor: 1,
		patch: 0,
		stage: Stage.Development
	},

	intents: [ GatewayIntentBits.Guilds ],

	activity: {
		name: 'for custom commands!',
		type: ActivityType.Watching
	},

	color: 0x2ee8d7,

	console: {
		prefix: '{bot|name} #{bot|shard|id}] ',
		color: '\x1b[36m'
	},

	inDevelopment: true,
	token: process.env[ 'TOKEN_CC' ] as string
})
