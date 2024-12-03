export type SeparatorType = 'decimal' | 'thousands'

export type LocaleNumberInfo = {
	decimalSeparator: string
	thousandsSeparator: string
}

export const getNumberInfo = (tag: string): LocaleNumberInfo => ({
	decimalSeparator: getSeparator(tag, 'decimal'),
	thousandsSeparator: getSeparator(tag, 'thousands')
})

export const getSeparator = (tag: string, type: SeparatorType) => {
	const subject = 1000.1
	const match = type === 'thousands' ? 'group' : type
	const found = new Intl.NumberFormat(tag)
		.formatToParts(subject)
		.find((part) => part.type === match)

	if (found === undefined) {
		throw new Error(`Could not determine '${type}' for locale '${tag}'.`)
	}

	return found.value
}

export const parseLocaleNumber = (tag: string, string: string): number => {
	// Prevent empty strings and leading/trailing whitespace
	if (string === '' || string !== string.trim()) {
		return NaN
	}

	const { decimalSeparator, thousandsSeparator } = getNumberInfo(tag)

	const normalized = string
		.split(thousandsSeparator)
		.join('')
		.split(decimalSeparator)
		.join('.')

	return Number(normalized)
}
