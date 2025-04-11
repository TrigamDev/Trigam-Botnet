import type { Bot } from "@botnet/bots/bot"
import type { GuildMember, Interaction, User } from "discord.js"

export async function getUser (
	searchUser: string,
	interaction: Interaction,
	bot: Bot
): Promise<User | null> {
	// Find user by ID
	let foundUser: User | null =
		( await bot.client.users.fetch( searchUser ) ) ?? null

	// Find user by username
	if ( !foundUser )
		foundUser =
			bot.client.users.cache.find( ( user ) => {
				return user.username.toLowerCase() === searchUser.toLowerCase()
			}) ?? null

	// Find user by guild member
	if ( !foundUser )
		foundUser = ( await getMember( searchUser, interaction ) )?.user ?? null

	return foundUser ?? null
}

export async function getMember (
	searchUser: string,
	interaction: Interaction
): Promise<GuildMember | null> {
	// Find member by ID
	let foundMember: GuildMember | null =
		( await interaction.guild?.members.fetch( searchUser ) ) ?? null

	// Find member by username
	if ( !foundMember )
		foundMember =
			interaction.guild?.members.cache.find( ( member ) => {
				return (
					member.user.username?.toLowerCase() ===
					searchUser.toLowerCase()
				)
			}) ?? null

	// Find member by nickname
	if ( !foundMember )
		foundMember =
			interaction.guild?.members.cache.find( ( member ) => {
				return (
					member.nickname?.toLowerCase() === searchUser.toLowerCase()
				)
			}) ?? null

	return foundMember ?? null
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
