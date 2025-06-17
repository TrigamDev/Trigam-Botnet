import {
	ApplicationCommandOptionType as OptionType,
	ChatInputCommandInteraction,
	bold,
	MessageFlags
} from "discord.js"

import type { Bot } from "@botnet/bots/bot"
import type { Command } from "@commands/command"

import { safeReply } from "@botnet/util/reply"
import { clamp, mapValue } from "@botnet/util/math"
import { randomElement, randomRange } from "@botnet/util/random"
import { progressBar } from "@botnet/util/progress"

import rateOverrides, { type RateOverride } from "@config/overrides/rate"
import emojis from "@config/emojis"

/* -------------------------------------------------------------------------- */

export default {
	data: {
		name: "rate",
		description: "Responds with the bot's latency",
		options: [
			{
				type: OptionType.String,
				name: "query",
				description: "The thing to rate",
				required: true
			},
			{
				type: OptionType.Integer,
				name: "total",
				description: "The total number of starts to rate out of",
				required: false
			},
			{
				type: OptionType.Boolean,
				name: "seeded",
				description:
					"Whether the same input should result in the same rating",
				required: false
			}
		]
	},
	async execute ( _bot: Bot, interaction: ChatInputCommandInteraction ) {
		// Gather all options
		const query: string = interaction.options.getString( "query", true )
		let total: number = interaction.options.getInteger( "total" ) ?? 5
		total = clamp( total, 0, 50 )
		const seeded = interaction.options.getBoolean( "seeded" )

		// Generate the rating
		const seed = seeded ? query : interaction.id
		let rating: number = randomRange( 0, total * 2, seed ) / 2

		const numStr = rating
			.toString()
			.replace( ".5", " 1/2" )
			.replace( "0 1/2", "1/2" )
		const starMsg = `${numStr} ${rating > 1 ? "stars" : "star"}`
		let rateMsg = `I rate ${bold( query )} ${starMsg}`

		// Apply overrides
		const override: RateOverride | null = getOverride( query )
		if ( override ) {
			rating = mapValue( override.rating, [ 0, 10 ], [ 0, total * 2 ] ) / 2
			rateMsg = randomElement( override.messages, interaction.id ) as string
		}

		// Generate star string
		let thumb = emojis.halfStar
		if ( Number.isInteger( rating ) ) thumb = emojis.star
		const starBar = progressBar( rating, total, total, {
			empty: emojis.darkStar,
			full: emojis.star,
			thumb
		})

		// Reply
		await safeReply( interaction, {
			content: `${rateMsg}\n${starBar}`,
			flags: MessageFlags.Ephemeral
		})
	}
} as Command

function getOverride ( alias: string ): RateOverride | null {
	alias = alias.toLowerCase().replaceAll( " ", "" )
	for ( const override of Object.values( rateOverrides ) )
		if ( override.aliases.includes( alias ) ) return override
	return null
}
