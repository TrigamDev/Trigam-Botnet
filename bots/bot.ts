import { Client, Collection, REST, Routes } from 'discord.js'
import { readdir } from 'fs/promises'
import { join } from 'path'

import { login } from '@botnet/config/pools/pooler'
import { Bracketeer } from '@botnet/util/bracketeer'

import { devGuilds } from '@botnet/config/whitelist'

import type { ActivityType, GatewayIntentBits, Snowflake } from 'discord.js'
import type { Command } from '@botnet/commands/command'

export enum Stage {
	Development = 'dev',
	Alpha = 'alpha',
	Beta = 'beta',
	Release = 'release'
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
		color: string
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
			intents: config.intents
		})
		this.config = config

		this.login()

		// Receive shard id (for niche functionality)
		process.on( 'message', ( message: any ) => {
			if ( !message.type ) return

			switch ( message.type ) {
				case 'ready': {
					this.shardId = message.data.shardId
					this.log( login({ bot: this }).chosen )
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
		const commandFolder = join( __dirname, '../commands' )

		// Get all command files
		const commandDirs: string[] = [ 'all', this.config.botId ]

		// Loop through the command files and register them
		for ( const commandDir of commandDirs ) {
			const dir = join( commandFolder, commandDir )
			const commandFiles = ( await readdir( dir ) ).filter( ( commandFile ) => {
				return commandFile.endsWith( '.ts' )
			})
			for ( const commandFile of commandFiles ) {
				const command: Command = ( await import( `${dir}/${commandFile}` ) )
					.default
				this.commands.set( command.data.name, command )
			}
		}
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
				typeof this.client.guilds.cache.get( guildId ) !== 'undefined'
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
		const eventFolder = join( __dirname, '../events' )

		// Get all event files
		const eventFiles = ( await readdir( eventFolder ) ).filter( ( eventFile ) => {
			return eventFile.endsWith( '.ts' )
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

	public log ( message: string ) {
		const bracketeer = new Bracketeer({ bot: this }, {})
		const prefix = bracketeer.execute( this.config.console.prefix )
		const msg = bracketeer.execute( message )
		console.log( `${this.config.console.color}${prefix}\x1b[0m${msg}` )
	}
}
