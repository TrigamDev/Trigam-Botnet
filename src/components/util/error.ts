import { ContainerBuilder, SeparatorBuilder } from "@discordjs/builders"
import { HeadingLevel, inlineCode, subtext } from "@discordjs/formatters"

import type { Bot } from "@bots/bot"

import { base } from "@tools/pooler"

import { header, text } from "@components/basic/text"
import { fields } from "@components/basic/fields"

import { errorColor } from "@config/components"
import type { Error } from "@config/errors"

import errorFooters from "@pools/error.jsonc"

/* -------------------------------------------------------------------------- */

export default async function errorMessage ( botError: Error, bot: Bot ) {
	const footer = await base( errorFooters, { bot })
	return new ContainerBuilder({
		accent_color: errorColor,
		components: [
			header( "Error", HeadingLevel.One ),
			header( botError.name, HeadingLevel.Three ),
			text( botError.description ),

			new SeparatorBuilder({ spacing: 1, divider: false }).toJSON(),

			fields( [
				[ "Error ID", inlineCode( botError.id ) ],
				[ "Error Code", inlineCode( botError.code ) ]
			] ),

			new SeparatorBuilder({ spacing: 1, divider: false }).toJSON(),

			text( subtext( footer.chosen ) )
		]
	})
}
