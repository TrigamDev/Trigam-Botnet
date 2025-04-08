import { Client, Collection, REST, Routes } from "discord.js"
import { readdir } from "fs/promises"
import { join } from "path"

import type {
	ActivityType,
	ApplicationCommandDataResolvable,
	GatewayIntentBits,
	Snowflake
} from "discord.js"
import type { Command } from "@botnet/commands/command"
import { login } from "@botnet/config/pools/pooler"

// https://github.com/eritislami/evobot/blob/master/structs/Bot.ts
export class Bot {
	public client: Client
	public commands = new Collection<string, Command>()
	public cooldowns = new Collection<string, Collection<Snowflake, number>>()

	public config: BotConfig

	public constructor(config: BotConfig) {
		this.client = new Client({
			intents: config.intents
		})
		this.config = config

		this.login()
		this.client.on("ready", () => {
			this.log(login({ bot: this }).chosen)
			this.registerCommands()
		})
	}

	public async login() {
		await this.client.login(this.config.token)
	}

	private async registerCommands() {
		const rest: REST = new REST({ version: "9" }).setToken(
			this.config.token
		)

		// Get all command files
		const commandDir = await readdir(
			join(__dirname, `../commands/${this.config.id}`)
		)
		const commandFiles = commandDir.filter((commandFile) =>
			commandFile.endsWith(".ts")
		)

		let commands: ApplicationCommandDataResolvable[] = []

		// Loop through the command files, and grab all the data
		for (const commandFile of commandFiles) {
			const command = await import(
				join(__dirname, `../commands/${this.config.id}/${commandFile}`)
			)

			this.commands.set(command.default.data.name, command.default)
			commands.push(command.default.data)
		}

		// Set commands
		await rest.put(Routes.applicationCommands(this.client.user!.id), {
			body: commands
		})
	}

	public log(message: string) {
		console.log(
			`${this.config.console.color}${this.config.console.prefix}\x1b[0m${message}`
		)
	}
}

export type BotVersion = {
	major: number
	minor: number
	patch: number
	stage: Stage
}
export enum Stage {
	Development,
	Alpha,
	Beta,
	Release
}

export type BotConfig = {
	name: string
	id: string
	version: BotVersion

	intents: GatewayIntentBits[]

	activity: {
		name: string
		type: ActivityType
	}

	console: {
		prefix: string
		color: string
	}

	inDevelopment: boolean
	token: string
}
