import type { GuildMember, Interaction, User } from "discord.js"

import type { Bot } from "@botnet/bots/bot"

export async function getUser (
	searchUser: string,
	interaction: Interaction,
	bot: Bot
): Promise<User | null> {
	const username = searchUser.toLowerCase()

	// Find user by ID
	let foundUser: User | null =
		bot.client.users.cache.find( ( user ) => user.id === username ) ?? null

	// Find user by username
	if ( !foundUser )
		foundUser =
			bot.client.users.cache.find(
				( user ) => user.username.toLowerCase() === username
			) ?? null

	// Fetch user
	if ( !foundUser && !isNaN( Number( username ) ) )
		foundUser = ( await bot.client.users.fetch( username ) ) ?? null

	// Find user by guild member
	if ( !foundUser )
		foundUser = ( await getMember( username, interaction ) )?.user ?? null

	return foundUser
}

export async function getMember (
	searchUser: string,
	interaction: Interaction
): Promise<GuildMember | null> {
	const username = searchUser.toLowerCase()

	// Find member by ID
	let foundMember: GuildMember | null =
		interaction.guild?.members.cache.find(
			( member ) => member.user.id === username
		) ?? null

	// Find member by username
	if ( !foundMember )
		foundMember =
			interaction.guild?.members.cache.find(
				( member ) => member.user.username?.toLowerCase() === username
			) ?? null

	// Find member by nickname
	if ( !foundMember )
		foundMember =
			interaction.guild?.members.cache.find(
				( member ) => member.nickname?.toLowerCase() === username
			) ?? null

	// Fetch member
	if ( !foundMember && !isNaN( Number( username ) ) )
		foundMember = ( await interaction.guild?.members.fetch( username ) ) ?? null

	return foundMember
}

export async function getUserAndMember (
	searchUser: string,
	interaction: Interaction,
	bot: Bot
): Promise<[User | null, GuildMember | null]> {
	return [
		await getUser( searchUser, interaction, bot ),
		await getMember( searchUser, interaction )
	]
}
