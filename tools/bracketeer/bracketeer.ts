import type { Interaction } from "discord.js"

import type { Bot } from "@botnet/bots/bot"
import { getUserAndMember } from "@botnet/util/get"

import * as config from "@botnet/config/bracketeer"

export class Bracketeer {
	private context: Context

	/**
	 * Update the context, giving Bracketeer more information to
	 * use while executing
	 *
	 * @remarks This will ONLY provide new information, if the
	 * 			new context is missing fields, they will not
	 * 			override the existing context
	 *
	 * @param context The updated context to copy fields from
	 */
	public setContext ( context: Context ) {
		for ( const field of Object.keys( context ) )
			if ( field ) this.context[ field ] = context[ field ]
	}

	private settings: Settings

	private variables: Variables = {}

	private responses: Responses

	// #region Execution
	/**
	 * Executes a string of custom command code, substituting
	 * all blocks contained in it
	 *
	 * @param input A string of custom command code
	 * @returns The resulting string, having had all blocks
	 * 			replaced with their results
	 *
	 * @example
	 * ```
	 * const result = await bracketeer.execute( "{add|3|5}, {repeat|teto |3}" )
	 * console.log( result )
	 * // "8, teto teto teto"
	 * ```
	 */
	public async execute ( input: string ): Promise<string> {
		let previousInput = ""
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
					const blockArgs = block.slice( 1, -1 ).split( "|" )
					const substituted = await this.executeBlock( blockArgs )
					input = input.replace( block, substituted )
				}
		}

		return Bracketeer.unescape( input )
	}

	/**
	 * Executes a single block, and returns its result
	 *
	 * @param block A block, split into its components
	 * @param parent An array of "parent" keys, used to walk the "response" tree
	 * @returns The result of executing the block.
	 * 			- In the case of a successful execution, the block's actual result
	 * 			- In the case of an error, an escaped block string,
	 * 			to be unescaped at the end of the command execution
	 *
	 * @example
	 * ```
	 * const blockResult = await this.executeBlock( [ "mult", "2", "5" ], [] )
	 * console.log( blockResult )
	 * // "10"
	 * ```
	 */
	private async executeBlock (
		block: string[],
		parent?: string[]
	): Promise<string> {
		if ( block.length === 0 ) return ""
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
			const newScope = scope[ parent[ scopeIndex ] as string ] as string
			if ( typeof newScope === "object" && newScope ) scope = newScope
		}

		/*
		 * If an already-defined variable, simply return it
		 * (whether a good or bad thing, this allows overriding
		 * the default responses. I'll allow it)
		 */
		if ( this.variables[ blockName ] || this.variables[ blockName ] === "" )
			return this.variables[ blockName ]

		// Actual responses
		const invalid = Bracketeer.escape( `{${fullBlock.join( "|" )}}` )
		const response = scope[ blockName ]
		if ( response )
			switch ( typeof response ) {
				// Handle string responses
				case "string": {
					return response ?? invalid
				}
				// Handle function responses
				case "function": {
					return ( await response( ...block ) ) ?? invalid
				}
				// If an object, rescope and recurse
				case "object": {
					parent?.push( blockName )
					return this.executeBlock( block, parent )
				}
				default:
					return invalid
			}

		return invalid
	}
	// #endregion

	// #region Escaping
	/**
	 * Escapes a custom command string so that it won't be executed
	 *
	 * @param commandString The custom command string to escape
	 * @returns The command string with all characters defining
	 * 			executable blocks replaced with seperate, arbitrary characters
	 *
	 * @example
	 * ```
	 * const escaped = this.escape( "{add|9|10}" )
	 * console.log( escaped )
	 * // ❴add⏐9⏐10❵
	 * ```
	 */
	private static escape ( commandString: string ): string {
		return commandString
			.replace( /{/g, "❴" )
			.replace( /}/g, "❵" )
			.replace( /\|/g, "⏐" )
	}

	/**
	 * Unescapes a custom command string, usually after execution is
	 * completed, to prevent escaped blocks from appearing in the output
	 *
	 * @param commandString The custom command string to unescape
	 * @returns The command string with all arbitrary escape characters
	 * 			replaced back with their normal counterparts, allowing
	 * 			executable blocks to be recognized as such again
	 */
	private static unescape ( commandString: string ): string {
		return commandString
			.replace( /❴/g, "{" )
			.replace( /❵/g, "}" )
			.replace( /⏐/g, "|" )
	}
	// #endregion

	constructor ( context: Context, settings: Settings ) {
		this.context = context
		this.settings = settings

		this.variables = {
			"#": "",
			"//": "",
			"\\n": "\n"
		}

		this.responses = {
			// Bot
			bot: {
				name: this.context.bot?.config.name ?? "",
				shard: {
					id: String( this.context.bot?.shardId ?? "0" ),
					count: String( this.context.bot?.client.shard?.count ?? "0" )
				}
			},

			// User
			user: async (
				searchUser: string,
				property: string,
				args: string[]
			): Promise<string | null> => {
				if ( !this.context.interaction || !this.context.bot ) return null

				// Get the user from the block
				let [ user, member ] = await getUserAndMember(
					searchUser,
					this.context.interaction,
					this.context.bot
				)

				// console.log( `First: ${member?.user.username}` )

				// If block didn't contain a valid user, assume
				// the "searchUser" actually contains the property
				if ( !member && !user ) {
					;[ user, member ] = await getUserAndMember(
						this.context.interaction.user.id,
						this.context.interaction,
						this.context.bot
					)
					args?.unshift( property )
					property = searchUser
				}

				// console.log( user?.username )
				// console.log( property )

				// User data
				switch ( property ) {
					case "@":
					case "mention": {
						return (
							member?.user.toString() ||
							user?.toString() ||
							"<@0>"
						)
					}
					default:
						return null
				}
			}
		}
	}
}

export interface Context {
	[key: string]: any
	bot?: Bot
	interaction?: Interaction
}

interface Settings {
	maxIterations?: number
}

interface Variables {
	[varName: string]: string
}

type Response = string | null | Promise<string | null>
type ResponseExecutor = Response | ( ( ...args: any[] ) => Response ) | Responses

interface Responses {
	[key: string]: ResponseExecutor | Promise<ResponseExecutor>
}
