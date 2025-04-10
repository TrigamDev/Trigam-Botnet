import seedrandom from 'seedrandom'

export function randomElement<Type> (
	array: Type[],
	seed?: string | undefined
): Type | null {
	if ( !array || array.length === 0 ) return null

	const random = seedrandom( seed )
	const randIndex = Math.floor( random() * array.length )
	return array[ randIndex ] ?? null
}

export function randomRange (
	min: number,
	max: number,
	seed?: string | undefined
): number {
	const random = seedrandom( seed )
	return Math.floor( random() * ( max - min + 1 ) + min )
}
