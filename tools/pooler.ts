import { randomElement } from '@botnet/util/random'

import { Bracketeer, type Context } from '@botnet/tools/bracketeer/bracketeer'

import logins from '@pools/login.json'
import pings from '@pools/ping.json'

export interface PoolElement {
	chosen: string
	pool: string[]
}
export interface KeyedPool {
	[key: string]: string[] | KeyedPool
}
export interface FunctionPool {
	[funcName: string]: ( context: Context, seed?: string ) => string
}

export async function base (
	pool: string[],
	context: Context,
	seed: string | undefined
): Promise<PoolElement> {
	const bracketeer = new Bracketeer( context, {})
	return {
		chosen: await bracketeer.execute( randomElement( pool, seed ) ?? '' ),
		pool
	}
}

export async function login (
	context: Context,
	seed?: string
): Promise<PoolElement> {
	// Randomly choose between the general pool and bot-specific pool
	const botId: string = context.bot?.config.botId ?? 'general'
	const pool = randomElement( [ logins.general, ( logins as KeyedPool )[ botId ] ] )
	return await base( pool as string[], context, seed )
}

interface PingPool extends KeyedPool {
	general: string[]
	low: string[]
	high: string[]
}
export async function ping (
	latency: number,
	context: Context,
	seed?: string
): Promise<PoolElement> {
	// Randomly choose between general pool and bot-specific pool
	const botId: string = context.bot?.config.botId ?? 'general'
	const pool: PingPool = randomElement( [
		pings.general,
		( pings as KeyedPool )[ botId ]
	] ) as PingPool

	// Choose the correct pool based on the ping latency
	let timedPool: string[] = pool.general
	if ( latency <= 100 ) timedPool = pool.low
	else if ( latency >= 500 ) timedPool = pool.high

	// Randomly choose between the normal pool and the latency-based pool
	const chosenPool: string[] = randomElement( [ pool.general, timedPool ] ) ?? []
	return await base( chosenPool, context, seed )
}
