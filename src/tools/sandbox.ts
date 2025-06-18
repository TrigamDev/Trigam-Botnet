import {
	BaseInteraction,
	Client,
	type ChatInputCommandInteraction
} from "discord.js"
import Sandbox from "@nyariv/sandboxjs"

import type { Bot } from "@bots/bot"

/* -------------------------------------------------------------------------- */

export default async function sandbox (
	code: string,
	globals: {
		bot?: Bot
		interaction?: ChatInputCommandInteraction
	}
) {
	// Security
	if ( globals.bot ) globals.bot.config.token = "****************"

	// Sandbox context
	const sandboxGlobals = {
		...Sandbox.SAFE_GLOBALS,
		...globals
	}

	const prototypeWhitelist = Sandbox.SAFE_PROTOTYPES
	prototypeWhitelist.set( BaseInteraction, new Set() )
	prototypeWhitelist.set( Client, new Set( [ "token" ] ) )

	// Setup sandbox
	const evalSandbox = new Sandbox({
		globals: sandboxGlobals,
		prototypeWhitelist
	})
	const exec = evalSandbox.compileAsync( code )

	// Evaluate and return
	const evaluated = await exec().run()
	return evaluated
}
