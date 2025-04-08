import seedrandom from "seedrandom"

export function randomElement<Type>(
	array: Type[],
	seed: string | undefined
): Type | undefined {
	if (!array || array.length == 0) return undefined

	let random = seedrandom(seed)
	let randIndex = Math.floor(random() * array.length)
	return array[randIndex]
}

export function randomNumber(
	min: number,
	max: number,
	seed: string | undefined
): number {
	let random = seedrandom(seed)
	return Math.floor(random() * (max - min + 1) + min)
}
