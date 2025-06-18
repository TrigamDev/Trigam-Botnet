import { readdir } from "fs/promises"
import { join } from "path"
import { AlignmentEnum, AsciiTable3 } from "ascii-table3"

import {
	CDN,
	Client,
	Collection,
	PermissionFlagsBits,
	REST,
	Routes
} from "discord.js"
import type { ActivityType, GatewayIntentBits, Snowflake } from "discord.js"

import { validateCommand, type Command } from "@commands/command"

import { login } from "@tools/pooler"
import { Bracketeer } from "@tools/bracketeer/bracketeer"

import { devGuilds } from "@config/whitelist"
import chalk from "chalk"
import { wrapText } from "@botnet/util/text"

/* -------------------------------------------------------------------------- */

export enum Stage {
	Development = "dev",
	Alpha = "alpha",
	Beta = "beta",
	Release = "release"
}
export type BotVersion = {
	major: number
	minor: number
	patch: number
	stage: Stage
}

export type BotConfig = {
	name: string
	description: string
	botId: string
	version: BotVersion

	intents: GatewayIntentBits[]

	activity: {
		name: string
		type: ActivityType
	}

	color: number

	console: {
		prefix: string
		color: ( message: string ) => string
	}
	emoji: {
		id: string
		name: string
	}

	inDevelopment: boolean
	token: string
}

// https://github.com/eritislami/evobot/blob/master/structs/Bot.ts
export class Bot {
	public client: Client

	public commands = new Collection<string, Command>()

	public cooldowns = new Collection<string, Collection<Snowflake, number>>()

	public config: BotConfig

	public started: number = 0

	public shardId: number = -1

	public constructor ( config: BotConfig ) {
		this.client = new Client({
			intents: config.intents,
			presence: {
				status: config.inDevelopment ? "dnd" : "online",
				activities: [ config.activity ]
			}
		})
		this.config = config

		this.login()

		// Receive shard id (for niche functionality)
		process.on( "message", async ( message: any ) => {
			if ( !message.type ) return

			switch ( message.type ) {
				case "ready": {
					this.shardId = message.data.shardId
					const loginMessage = await login({ bot: this })
					await this.log( loginMessage.chosen )
					break
				}
				default:
					break
			}
		})
	}

	public async login () {
		await this.registerCommands()
		await this.registerEvents()

		await this.client.login( this.config.token )
		this.started = Date.now()
	}

	public async registerCommands () {
		const commandFolder = join( __dirname, "../commands" )
		const loadStatus = new Map<
			string,
			{ loaded: boolean; name: string; message: string }
		>()

		// Get all command files
		const commandDirs: string[] = [ "all", this.config.botId ]

		// Loop through the command files and register them
		for ( const commandDir of commandDirs ) {
			const dir = join( commandFolder, commandDir )
			const commandFiles = ( await readdir( dir ) ).filter( ( commandFile ) => {
				return commandFile.endsWith( ".ts" )
			})

			for ( const file of commandFiles ) {
				const command: Command = ( await import( `${dir}/${file}` ) )
					.default

				// Handle different settings
				if ( command.disabled ) continue
				if ( command.dev )
					command.data.defaultMemberPermissions =
						PermissionFlagsBits.Administrator

				// Register commands
				try {
					validateCommand( command )
					this.commands.set( command.data.name, command )
					loadStatus.set( file, {
						loaded: true,
						name: command.data.name,
						message: ""
					})
				} catch ( validationError: any ) {
					loadStatus.set( file, {
						loaded: false,
						name: "-",
						message: validationError.message
					})
				}
			}
		}

		// Create command loading table
		const loadMatrix = Array.from( loadStatus ).map( ( [ key, value ] ) => {
			let color = chalk.green
			let symbol = "✔"
			if ( !value.loaded ) {
				color = chalk.red
				symbol = "✘"
			}
			return [
				color( key ),
				color( value.name ),
				color( symbol ),
				color( value.message )
			]
		})

		const statusTable = new AsciiTable3(
			this.config.console.color( this.config.name )
		)
			.setHeading( "File", "Name", "Load?", "Message" )
			.addRowMatrix( loadMatrix )
			.setAlign( 3, AlignmentEnum.CENTER )
			.setStyle( "unicode-round" )
			.setWidth( 4, 25 )
			.setWrapped( 4 )

		console.log( statusTable.toString() )
	}

	public async deployCommands () {
		const rest: REST = new REST().setToken( this.config.token )
		const commands: Command[] = Array.from( this.commands.values() )
		let commandData = commands.map( ( command ) => {
			return command.data
		})

		// Set commands in whitelisted servers
		for ( const guildId of devGuilds.guilds ) {
			const isInGuild =
				typeof this.client.guilds.cache.get( guildId ) !== "undefined"
			if ( !isInGuild ) continue

			const server = await this.client.guilds.fetch( guildId )
			if ( server )
				if ( !devGuilds.enabled ) await server.commands.set( [] )
				else await server.commands.set( commandData )
		}

		// Set commands on bot
		if ( this.config.inDevelopment ) commandData = []
		await rest.put( Routes.applicationCommands( this.client.user!.id ), {
			body: commandData
		})
	}

	private async registerEvents () {
		const eventFolder = join( __dirname, "../events" )

		// Get all event files
		const eventFiles = ( await readdir( eventFolder ) ).filter( ( eventFile ) => {
			return eventFile.endsWith( ".ts" )
		})

		// Loop through the event files and register them
		for ( const eventFile of eventFiles ) {
			const event = ( await import( `@events/${eventFile}` ) ).default
			if ( event.once )
				this.client.once( event.name, ( ...args ) => {
					return event.execute( this, ...args )
				})
			else
				this.client.on( event.name, ( ...args ) => {
					return event.execute( this, ...args )
				})
		}
	}

	public async log ( message: string ) {
		const bracketeer = new Bracketeer({ bot: this }, {})
		const prefix = await bracketeer.execute( this.config.console.prefix )
		const msg = await bracketeer.execute( message )
		console.log( `${this.config.console.color( prefix )}${msg}` )
	}

	// Some basic helpers
	public getVersion (): string {
		const { major, minor, patch, stage } = this.config.version
		return `${major}.${minor}.${patch}-${stage}`
	}

	public getAvatar (): string {
		let avatarUrl = this.client.user?.avatarURL()
		if ( !avatarUrl ) avatarUrl = this.client.user?.defaultAvatarURL
		if ( !avatarUrl ) avatarUrl = new CDN().defaultAvatar( 0 )
		return avatarUrl
	}
}
