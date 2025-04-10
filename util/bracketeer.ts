import type { Bot } from '@botnet/bots/bot'
import type {
	Channel,
	Guild,
	GuildMember,
	Interaction,
	Message,
	Role,
	User
} from 'discord.js'

import * as config from '@botnet/config/bracketeer'
import { getMember, getUser } from './get'

export interface Context {
	[key: string]: any
	bot?: Bot
	interaction?: Interaction
	user?: User
	member?: GuildMember
	message?: Message
	channel?: Channel
	server?: Guild
	role?: Role
}

interface Settings {
	maxIterations?: number
}

interface Variables {
	[varName: string]: string
}

type Response =
	| string
	| ( ( ...args: any[] ) => string | null )
	| {
			[key: string]: Response
	  }
interface Responses {
	[key: string]: Response
}

export class Bracketeer {
	private context: Context

	private variables: Variables = {}

	private settings: Settings

	private responses: Responses

	public execute ( input: string ): string {
		let previousInput = ''
		let iterations = 0
		const maxIterations =
			this.settings.maxIterations || config.maxIterations

		/*
		 * Continually substitute until there's no changes to be made
		 * (or until the iteration limit is reached)
		 */
		while ( input !== previousInput && iterations < maxIterations ) {
			previousInput = input
			iterations++

			// Get all blocks for this step and substitute them
			const blocks = input.match( /{(?<block>[^{]+?)}/g )
			if ( blocks )
				for ( const block of blocks ) {
					const blockArgs = block.slice( 1, -1 ).split( '|' )
					const substituted = this.substitute( blockArgs )
					input = input.replace( block, substituted )
				}
		}

		return Bracketeer.unescape( input )
	}

	// Subsitute a single block, such as {add|9|10}
	private substitute ( block: string[], parent?: string[] ): string {
		if ( block.length === 0 ) return ''
		const fullBlock = [ ...block ]
		const blockName: string = block.shift() as string

		if ( !parent ) parent = []

		/*
		 * Use the parents to rescope where responses are
		 * being searched for
		 * (allowing for nested responses, eg {bot|xp|level})
		 */
		let scope = this.responses
		for ( let scopeIndex = 0; scopeIndex < parent.length; scopeIndex++ ) {
			const newScope = scope[ parent[ scopeIndex ] as string ]
			if ( typeof newScope === 'object' ) scope = newScope
		}

		/*
		 * If an already-defined variable, simply return it
		 * (whether a good or bad thing, this allows overriding
		 * the default responses. I'll allow it)
		 */
		if ( this.variables[ blockName ] ) return this.variables[ blockName ]

		// Actual responses
		const invalid = Bracketeer.escape( `{${fullBlock.join( '|' )}}` )
		const response = scope[ blockName ]
		if ( response )
			switch ( typeof response ) {
				// Handle string responses
				case 'string':
					return response ?? invalid
				// Handle function responses
				case 'function':
					return response( block ) ?? invalid
				// If an object, rescope and recurse
				case 'object': {
					parent?.push( blockName )
					return this.substitute( block, parent )
				}
				default:
					return invalid
			}

		return invalid
	}

	private static escape ( block: string ): string {
		return block.replace( /{/g, '❴' ).replace( /}/g, '❵' ).replace( /\|/g, '⏐' )
	}

	private static unescape ( block: string ): string {
		return block.replace( /❴/g, '{' ).replace( /❵/g, '}' ).replace( /⏐/g, '|' )
	}

	public setContext ( context: Context ) {
		for ( const field of Object.keys( context ) )
			if ( field && context[ field ] !== this.context[ field ] )
				this.context[ field ] = context[ field ]
	}

	constructor ( context: Context, settings: Settings ) {
		this.context = context
		this.settings = settings

		this.variables = {
			'#': '',
			'//': '',
			'\\n': '\n'
		}

		this.responses = {
			// Bot
			bot: {
				name: this.context.bot?.config.name ?? '',
				shard: {
					id: String( this.context.bot?.shardId ?? '0' ),
					count: String( this.context.bot?.client.shard?.count ?? '0' )
				}
			},

			// User
			user: ( searchUser: string, property: string, ...args ) => {
				if ( !this.context.interaction || !this.context.bot ) return null

				// Get the user
				if ( !searchUser ) searchUser = this.context.interaction.user.id
				const user = getUser(
					searchUser,
					this.context.interaction,
					this.context.bot
				)
				const member = getMember( searchUser, this.context.interaction )

				if ( !user || !member ) return null

				// User data
				switch ( property ) {
					case '@':
					case 'mention': {
						return (
							member.user.toString() || user.toString() || '<@0>'
						)
					}
					default:
						return null
				}
			}
		}
	}
}
