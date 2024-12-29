import { useMemo } from 'react'
import type { ReactNode } from 'react'
import { useCountdownContext } from './CountdownContext'
import { getRangeOfUnits, type CountdownUnit } from './useCountdownUnit'

export type CountdownSegmentItem = {
	unit: CountdownUnit
	value: number
	label: string
}

export type CountdownSegmentsProps = {
	format?: 'short' | 'narrow' | 'long'
	display?: 'auto' | 'always'
	children: (item: CountdownSegmentItem, index: number) => ReactNode
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

	/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument */
	const formatter = useMemo(
		() =>
			// @ts-expect-error - Intl.DurationFormat is not recognized yet
			new Intl.DurationFormat(locale, {
				style: format,
				...range.reduce((acc, unit, index) => {
					// @ts-expect-error - Intl.DurationFormat is not recognized yet
					acc[`${unit}Display`] =
						index === range.length - 1 ? 'always' : display
					return acc
				}, {})
			}),
		[locale, format, display, range]
	)

	const parts = formatter
		.formatToParts(remaining)
		// @ts-expect-error - Intl.DurationFormat is not recognized yet
		.filter(({ type }) => type !== 'literal')

	const segments = Object.values(
		// @ts-expect-error - Intl.DurationFormat is not recognized yet
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

	// @ts-expect-error - Intl.DurationFormat is not recognized yet
	return segments.map(children)
	/* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument */
}
