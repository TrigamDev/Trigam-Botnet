export function clamp ( value: number, min: number, max: number ): number {
	return Math.min( Math.max( value, min ), max )
}

export function mapValue (
	value: number,
	fromRange: [number, number],
	toRange: [number, number]
): number {
	const fromSize = fromRange[ 1 ] - fromRange[ 0 ]
	const toSize = toRange[ 1 ] - toRange[ 0 ]

	const fromPercent = ( value - fromRange[ 0 ] ) / fromSize
	return fromPercent * toSize + toRange[ 0 ]
}
