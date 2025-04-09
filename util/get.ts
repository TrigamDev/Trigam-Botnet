import type { Bot } from "@botnet/bots/bot"
import type { GuildMember, Interaction, User } from "discord.js"

export function getUser(
	searchUser: string,
	interaction: Interaction,
	bot: Bot
): User | null {
	// Find user by ID
	let foundUser: User | undefined = bot.client.users.cache.find(
		(user) => user.id.toLowerCase() === searchUser.toLowerCase()
	)

	// Find user by username
	if (!foundUser)
		foundUser = bot.client.users.cache.find(
			(user) => user.username.toLowerCase() === searchUser.toLowerCase()
		)

	// Find user by guild member
	if (!foundUser) foundUser = getMember(searchUser, interaction)?.user

	return foundUser ?? null
}

export function getMember(
	searchUser: string,
	interaction: Interaction
): GuildMember | null {
	// Find member by ID
	let foundMember: GuildMember | undefined =
		interaction.guild?.members.cache.find(
			(member) => member.id.toLowerCase() == searchUser.toLowerCase()
		)

	// Find member by username
	if (!foundMember)
		foundMember = interaction.guild?.members.cache.find(
			(member) =>
				member.user.username?.toLowerCase() == searchUser.toLowerCase()
		)
	// Find member by nickname
	if (!foundMember)
		foundMember = interaction.guild?.members.cache.find(
			(member) =>
				member.nickname?.toLowerCase() == searchUser.toLowerCase()
		)

	return foundMember ?? null
}
