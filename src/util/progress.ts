export function progressBar (
	value: number,
	max: number,
	size: number,
	strings: { empty: string; full: string; thumb: string }
): string {
	const filledPercent = value / max
	const progress = Math.round( filledPercent * size )
	if ( progress <= 0 ) strings.thumb = ""

	const empty = strings.empty.repeat( Math.max( size - progress, 0 ) )
	const filled = strings.full.repeat( Math.max( progress - 1, 0 ) )
	return `${filled}${strings.thumb}${empty}`
}
