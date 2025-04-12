import type { ApplicationCommandData, Interaction } from "discord.js"

import type { Bot } from "@botnet/bots/bot"

export interface Command {
	permissions?: string[]
	cooldown?: number
	data: ApplicationCommandData
	execute( bot: Bot, interaction: Interaction ): Promise<void>
}
