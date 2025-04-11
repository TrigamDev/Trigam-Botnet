import type { Bot } from "@botnet/bots/bot"
import { Events } from "discord.js"

export default {
	name: Events.ClientReady,
	once: true,
	async execute ( bot: Bot ) {
		await bot.deployCommands()
	}
}
