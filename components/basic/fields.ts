import { type APITextDisplayComponent } from "discord.js"
import { TextDisplayBuilder } from "@discordjs/builders"
import { bold, unorderedList } from "@discordjs/formatters"

import { text } from "@components/basic/text"

/* -------------------------------------------------------------------------- */

export function fields (
	entries: [string, string | string[]][]
): APITextDisplayComponent {
	const typedFields = entries.map( ( [ label, value ] ) => {
		if ( Array.isArray( value ) ) return listField( label, value )
		else return textField( label, value )
	})

	return text( typedFields.map( ( field ) => field.content ).join( "\n" ) )
}
export function textField (
	label: string,
	value: string
): APITextDisplayComponent {
	return new TextDisplayBuilder({
		content: `${bold( label )}: ${value}`
	}).toJSON()
}
export function listField (
	label: string,
	items: string[]
): APITextDisplayComponent {
	return new TextDisplayBuilder({
		content: `${bold( label )}:\n${unorderedList( items )}`
	}).toJSON()
}
