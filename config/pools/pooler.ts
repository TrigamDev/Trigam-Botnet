import { randomElement, randomRange } from "@botnet/util/random"

import { Bracketeer, type Context } from "@botnet/util/bracketeer"

import loginPool from "@pools/login.json"

export function base(
	pool: string[],
	context: Context,
	seed: string | undefined
): PoolElement {
	const bracketeer = new Bracketeer(context, {})
	return {
		chosen: bracketeer.execute(randomElement(pool, seed) ?? ""),
		pool
	}
}

export function login(context: Context, seed?: string): PoolElement {
	let pool = loginPool as MultiPool
	let rand = randomRange(0, 1, seed)
	// 50% chance to use the general pool
	const botId: string = context.bot?.config.id ?? "general"
	if (rand === 0) return base(loginPool.general, context, seed)
	else return base(pool[botId] ?? loginPool.general, context, seed)
}

export interface PoolElement {
	chosen: string
	pool: string[]
}
export interface MultiPool {
	[key: string]: string[]
}
export interface FunctionPool {
	[funcName: string]: (context: Context, seed?: string) => string
}
