import { ChatInputCommandInteraction, MessageFlags } from "discord.js"

import type { Bot } from "@botnet/bots/bot"
import type { Command } from "@commands/command"

import { safeReply } from "@botnet/util/reply"

import { buildComponent } from "@components/status"

// https://github.com/GDColon/Polaris-Open/blob/main/commands/slash/botstatus.js
export default {
	data: {
		name: "status",
		description: "Displays the bot's status and info"
	},
	async execute ( bot: Bot, interaction: ChatInputCommandInteraction ) {
		const statusContainer = await buildComponent( bot, interaction )

		await safeReply( interaction, {
			components: [ statusContainer ],
			flags: [ MessageFlags.Ephemeral, MessageFlags.IsComponentsV2 ]
		})
	}
} as Command
