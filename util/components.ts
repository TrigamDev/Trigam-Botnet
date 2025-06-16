import {
	ButtonStyle,
	type APIMessageComponentEmoji,
	type APITextDisplayComponent,
	type APIButtonComponent,
	type APIActionRowComponent
} from "discord.js"
import {
	TextDisplayBuilder,
	ActionRowBuilder,
	ButtonBuilder
} from "@discordjs/builders"
import {
	bold,
	heading,
	HeadingLevel,
	unorderedList
} from "@discordjs/formatters"

export function header (
	content: string,
	level: HeadingLevel
): APITextDisplayComponent {
	return new TextDisplayBuilder({
		content: heading( content, level as any )
	}).toJSON()
}

export function text ( content: string ): APITextDisplayComponent {
	return new TextDisplayBuilder({ content }).toJSON()
}

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

export function linkRow (
	links: [string, string, APIMessageComponentEmoji?][]
): APIActionRowComponent<APIButtonComponent> {
	return new ActionRowBuilder({
		components: links.map( ( [ label, url, emoji ] ) => linkButton( label, url, emoji )
		)
	}).toJSON() as APIActionRowComponent<APIButtonComponent>
}
export function linkButton (
	label: string,
	url: string,
	emoji?: APIMessageComponentEmoji
): APIButtonComponent {
	const button = new ButtonBuilder({
		style: ButtonStyle.Link,
		label,
		url
	})
	if ( emoji ) button.setEmoji( emoji )
	return button.toJSON()
}
