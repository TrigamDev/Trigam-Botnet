import {
	MessageFlags,
	type APIEmbed,
	type ButtonInteraction,
	type CommandInteraction
} from "discord.js"

import type { Bot } from "@botnet/bots/bot"

import { base } from "@tools/pooler"
import { safeReply } from "@botnet/util/reply"

import type { Error } from "@config/errors"
import errorFooters from "@pools/error.json"

export async function sendErrorMessage (
	botError: Error,
	interaction: CommandInteraction | ButtonInteraction,
	bot: Bot
) {
	const footer = await base( errorFooters, { bot })
	await safeReply( interaction, {
		content: `## ${botError.name}\n${botError.description}\n\`${botError.id}\`\n\n-# ${footer.chosen}`,
		flags: MessageFlags.Ephemeral
	})
}

export async function sendErrorEmbed (
	botError: Error,
	interaction: CommandInteraction | ButtonInteraction,
	bot: Bot
) {
	const footer = await base( errorFooters, { bot })
	const errorEmbed: APIEmbed = {
		title: botError.name,
		description: `${botError.description}\n\`${botError.id}\``,
		footer: { text: footer.chosen },
		color: 0xef233c
	}
	await safeReply( interaction, {
		embeds: [ errorEmbed ],
		flags: MessageFlags.Ephemeral
	})
}
