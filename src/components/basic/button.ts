import {
	ButtonStyle,
	type APIMessageComponentEmoji,
	type APIButtonComponent,
	type APIActionRowComponent
} from "discord.js"
import { ActionRowBuilder, ButtonBuilder } from "@discordjs/builders"

/* -------------------------------------------------------------------------- */

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
