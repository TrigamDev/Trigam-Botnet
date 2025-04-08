import { Client, Collection, REST, Routes } from "discord.js"
import { readdir } from "fs/promises"
import { join } from "path"

import { devGuilds } from "@botnet/config/whitelist"

import type {
	ActivityType,
	ApplicationCommandDataResolvable,
	GatewayIntentBits,
	Snowflake
} from "discord.js"
import type { Command } from "@botnet/commands/command"

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
	}

	public async login() {
		await this.registerCommands()
		await this.registerEvents()

		await this.client.login(this.config.token)
	}

	public async registerCommands() {
		const commandFolder = join(__dirname, `../commands`)

		// Get all command files
		const commandDirs: string[] = [`all`, this.config.id]

		// Loop through the command files and register them
		for (const commandDir of commandDirs) {
			const dir = join(commandFolder, commandDir)
			const commandFiles = (await readdir(dir)).filter((commandFile) =>
				commandFile.endsWith(".ts")
			)
			for (const commandFile of commandFiles) {
				const command = await import(`${dir}/${commandFile}`)
				this.commands.set(command.default.data.name, command.default)
			}
		}
	}

	public async deployCommands() {
		const rest: REST = new REST().setToken(this.config.token)
		let commands: ApplicationCommandDataResolvable[] = Array.from(
			this.commands.values()
		).map((command) => command.data)

		// Set commands in whitelisted servers
		for (const guildId of devGuilds.guilds) {
			const isInGuild = this.client.guilds.cache.get(guildId) != undefined
			if (!isInGuild) continue

			const server = await this.client.guilds.fetch(guildId)
			if (server) {
				if (!devGuilds.enabled) await server.commands.set([])
				else await server.commands.set(commands)
			}
		}

		// Set commands on bot
		if (this.config.inDevelopment) commands = []
		await rest.put(Routes.applicationCommands(this.client.user!.id), {
			body: commands
		})
	}

	private async registerEvents() {
		const eventFolder = join(__dirname, `../events`)

		// Get all event files
		const eventFiles = (await readdir(eventFolder)).filter((eventFile) =>
			eventFile.endsWith(".ts")
		)

		// Loop through the event files and register them
		for (const eventFile of eventFiles) {
			const event = require(`@events/${eventFile}`).default
			if (event.once) {
				this.client.once(event.name, (...args) =>
					event.execute(this, ...args)
				)
			} else {
				this.client.on(event.name, (...args) =>
					event.execute(this, ...args)
				)
			}
		}
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
