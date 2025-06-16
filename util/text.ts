export function wrapText ( text: string, maxLength: number ): string {
	let result = ""
	let currentLength = 0

	for ( let word of text.split( /\s+/ ) ) {
		const lineLength = currentLength + word.length

		// Start new line if too long
		if ( lineLength > maxLength ) {
			result += "\n"
			currentLength = 0
		}

		// Add word to line
		if ( currentLength > 0 ) word = ` ${word}`
		result += word
		currentLength += word.length
	}

	return result
}
