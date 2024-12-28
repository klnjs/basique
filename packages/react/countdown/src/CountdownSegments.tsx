import { useMemo } from 'react'
import type { ReactNode } from 'react'
import { useCountdownContext } from './CountdownContext'
import { getRangeOfUnits, type CountdownUnit } from './useCountdownUnit'

export type CountdownSegmentsItem = {
	unit: CountdownUnit
	value: number
	label: string
}

export type CountdownSegmentsProps = {
	format?: 'short' | 'narrow' | 'long'
	display?: 'auto' | 'always'
	children: (type: CountdownSegmentsItem, index: number) => ReactNode
}

export const CountdownSegments = ({
	format = 'long',
	display = 'always',
	children
}: CountdownSegmentsProps) => {
	const { locale, largestUnit, smallestUnit, remaining } =
		useCountdownContext()

	const range = useMemo(
		() => getRangeOfUnits(largestUnit, smallestUnit),
		[largestUnit, smallestUnit]
	)

	const formatter = useMemo(
		() =>
			new Intl.DurationFormat(locale, {
				style: format,
				...range.reduce((acc, unit, index) => {
					acc[`${unit}Display`] =
						index === range.length - 1 ? 'always' : display
					return acc
				}, {})
			}),
		[locale, format, display, range]
	)

	const parts = formatter
		.formatToParts(remaining)
		.filter(({ type }) => type !== 'literal')

	const segments = Object.values(
		parts.reduce((acc, part) => {
			if (!acc[part.unit]) {
				acc[part.unit] = { unit: `${part.unit}s` }
			}

			if (part.type === 'integer') {
				acc[part.unit].value = part.value
			} else if (part.type === 'unit') {
				acc[part.unit].label = part.value
			}

			return acc
		}, {})
	)

	return segments.map(children)
}
