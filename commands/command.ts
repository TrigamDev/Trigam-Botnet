import type { Bot } from "@botnet/bots/bot"
import type { ApplicationCommandData, Interaction } from "discord.js"

export interface Command {
	permissions?: string[]
	cooldown?: number
	data: ApplicationCommandData
	execute( bot: Bot, interaction: Interaction ): void
}
