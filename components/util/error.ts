import { ContainerBuilder, SeparatorBuilder } from "@discordjs/builders"
import { HeadingLevel, inlineCode, subtext } from "@discordjs/formatters"

import type { Bot } from "@botnet/bots/bot"

import { header, text } from "@components/basic/text"
import { fields } from "@components/basic/fields"

import { base } from "@botnet/tools/pooler"

import { errorColor } from "@botnet/config/components"
import type { Error } from "@botnet/config/errors"
import errorFooters from "@pools/error.json"

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
