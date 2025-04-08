import { randomElement, randomRange } from "@botnet/util/random"

import { Bracketeer, type Context } from "@botnet/util/bracketeer"

import logins from "@pools/login.json"
import pings from "@pools/ping.json"

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
	// 50% chance to use the general pool
	const botId: string = context.bot?.config.id ?? "general"
	const pool = randomElement([logins.general, (logins as KeyedPool)[botId]])
	return base(pool as string[], context, seed)
}

interface PingPool extends KeyedPool {
	general: string[]
	low: string[]
	high: string[]
}
export function ping(
	latency: number,
	context: Context,
	seed?: string
): PoolElement {
	const botId: string = context.bot?.config.id ?? "general"
	const pool: PingPool = randomElement([
		pings.general,
		(pings as KeyedPool)[botId]
	]) as PingPool

	let timedPool = pool.general
	if (latency <= 75) timedPool = pool.low
	else if (latency >= 450) timedPool = pool.high

	const chosenPool = randomElement([pool.general, timedPool])
	return base(chosenPool as string[], context, seed)
}

export interface PoolElement {
	chosen: string
	pool: string[]
}
export interface KeyedPool {
	[key: string]: string[] | KeyedPool
}
export interface FunctionPool {
	[funcName: string]: (context: Context, seed?: string) => string
}
