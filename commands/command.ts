import type { ApplicationCommandData, Interaction } from "discord.js"

import type { Bot } from "@botnet/bots/bot"

export interface Command {
	permissions?: bigint
	cooldown?: number
	disabled?: boolean
	dev?: boolean
	data: ApplicationCommandData
	execute( bot: Bot, interaction: Interaction ): Promise<void>
}
