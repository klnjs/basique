import type { Temporal } from 'temporal-polyfill'

export const countdownUnits = [
	'years',
	'months',
	'weeks',
	'days',
	'hours',
	'minutes',
	'seconds',
	'milliseconds'
] as const

export type CountdownUnit = (typeof countdownUnits)[number]

export const getRangeOfUnits = (
	largestUnit: CountdownUnit,
	smallestUnit: CountdownUnit
) => {
	const largestIndex = countdownUnits.findIndex((u) => u === largestUnit)
	const smallestIndex = countdownUnits.findIndex((u) => u === smallestUnit)

	if (largestIndex === -1) {
		throw new Error(
			`largestUnit must be one of: ${countdownUnits.join(', ')}`
		)
	}

	if (smallestIndex === -1) {
		throw new Error(
			`smallestUnit must be one of: ${countdownUnits.join(', ')}`
		)
	}

	return countdownUnits.slice(largestIndex, smallestIndex + 1)
}

export const getLargestUnit = (duration: Temporal.Duration) => {
	const largestUnit =
		countdownUnits.find((unit) => duration[unit] !== 0) ??
		countdownUnits.at(-1)

	return largestUnit
}
