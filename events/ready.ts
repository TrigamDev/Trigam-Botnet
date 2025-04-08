import type { Bot } from "@botnet/bots/bot"
import { login } from "@botnet/config/pools/pooler"
import { Events } from "discord.js"

export default {
	name: Events.ClientReady,
	once: true,
	async execute(bot: Bot) {
		bot.log(login({ bot }).chosen)

		await bot.deployCommands()
	}
}
