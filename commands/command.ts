import type { ChatInputApplicationCommandData, Interaction } from "discord.js"

import type { Bot } from "@botnet/bots/bot"

/* -------------------------------------------------------------------------- */

export interface Command {
	permissions?: bigint
	cooldown?: number
	disabled?: boolean
	dev?: boolean

	data: ChatInputApplicationCommandData

	execute( bot: Bot, interaction: Interaction ): Promise<void>
}

export function validateCommand ( command: Command ): boolean {
	if ( !command?.data ) throw new Error( "Command does not have data!" )

	if ( !command.data?.name ) throw new Error( "Command does not have a name!" )
	if ( !command.data?.description )
		throw new Error(
			`Command /${command.data.name} does not have a description!`
		)

	if ( !command?.execute ) throw new Error( "Command does not have an execute method!" )

	return true
}
