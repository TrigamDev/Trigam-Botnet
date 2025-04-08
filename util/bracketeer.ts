import type { Bot } from "@botnet/bots/bot"
import type {
	Channel,
	Guild,
	GuildMember,
	Message,
	Role,
	User
} from "discord.js"

import * as config from "@botnet/config/bracketeer"

export class Bracketeer {
	private context: Context
	private variables: Variables = {}

	private settings: Settings
	private responses: Responses

	public execute(input: string): string {
		let previousInput = ""
		let iterations = 0
		let maxIterations = this.settings.maxIterations || config.maxIterations

		// Continually substitute until there's no changes to be made
		// (or until the iteration limit is reached)
		while (input != previousInput && iterations < maxIterations) {
			previousInput = input
			iterations++

			// Get all blocks for this step and substitute them
			const blocks = input.match(/{([^{]+?)}/g)
			if (blocks) {
				blocks.forEach((block) => {
					const blockArgs = block.slice(1, -1).split("|")
					const substituted = this.substitute(blockArgs)
					input = input.replace(block, substituted)
				})
			}
		}

		return input
	}

	// Subsitute a single block, such as {add|9|10}
	private substitute(block: string[], parent?: string[]): string {
		if (block.length === 0) return ""
		let blockName: string = block.shift() as string

		if (!parent) parent = []

		// Use the parents to rescope where responses are
		// being searched for
		// (allowing for nested responses, eg {bot|xp|level})
		let scope = this.responses
		for (let i = 0; i < parent.length; i++) {
			let newScope = scope[parent[i] as string]
			if (typeof newScope === "object") scope = newScope
		}

		// If an already-defined variable, simply return it
		// (whether a good or bad thing, this allows overriding
		// the default responses. I'll allow it)
		if (this.variables[blockName]) return this.variables[blockName]

		// Actual responses
		const response = scope[blockName]
		if (response) {
			// Handle string responses
			if (typeof response === "string") {
				return response
			}

			// Handle function responses
			if (typeof response === "function") {
				return response.call(null, block)
			}

			// If response is an object, use next block
			// argument as the new name, and recurse
			if (typeof response === "object") {
				parent?.push(blockName)
				return this.substitute(block, parent)
			}
		}

		return ""
	}

	public setContext(context: Context) {
		for (const field of Object.keys(context)) {
			if (field && context[field] !== this.context[field])
				this.context[field] = context[field]
		}
	}
	constructor(context: Context, settings: Settings) {
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
				shard: () => {
					return String(this.context.bot?.client.shard) ?? "0"
				},
				xp: {
					level: "0"
				}
			}
		}
	}
}

export interface Context {
	[key: string]: any
	bot?: Bot
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

interface Responses {
	[key: string]: Response
}
type Response =
	| string
	| ((...args: any[]) => string)
	| {
			[key: string]: Response
	  }
