import { Events } from "discord.js"

import type { Bot } from "@botnet/bots/bot"

/* -------------------------------------------------------------------------- */

export default {
	name: Events.ClientReady,
	once: true,
	async execute ( bot: Bot ) {
		await bot.deployCommands()
	}
}
