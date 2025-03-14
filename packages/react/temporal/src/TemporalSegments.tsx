import type { ReactNode } from 'react'
import { Intl } from 'temporal-polyfill'
import { useTemporalContext } from './TemporalContext'
import type { TemporalUnit } from './useTemporal'
import { getNowFromType } from './temporal-utils'

export type TemporalSegmentsItem<L extends boolean> = {
	unit: L extends false ? TemporalUnit : TemporalUnit | 'literal'
	value: string
}

export type TemporalSegmentsProps<L extends boolean = false> = {
	literals?: L
	children: (item: TemporalSegmentsItem<L>, index: number) => ReactNode
}

export const TemporalSegments = <L extends boolean = false>({
	literals,
	children
}: TemporalSegmentsProps<L>) => {
	const { type, locale } = useTemporalContext()

	const now = getNowFromType(type)
	const formatter = new Intl.DateTimeFormat(locale)
	const parts = formatter.formatToParts(now)

	const segments = literals
		? parts
		: parts.filter((part) => part.type !== 'literal')

	const mapped = segments.map((segment) => ({
		// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
		unit: segment.type as TemporalUnit,
		value: segment.value
	}))

	return mapped.map(children)
}
