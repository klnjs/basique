import type { TemporalUnit, TemporalValue } from './useTemporal'

export type UseTemporalSegmentBoundsOptions = {
	unit: TemporalUnit
	value: TemporalValue | null
}

export const useTemporalSegmentBounds = ({
	unit,
	value
}: UseTemporalSegmentBoundsOptions) => {
	const min = unit === 'hour' || unit === 'minute' ? 0 : 1
	const max =
		unit === 'year'
			? 9999
			: unit === 'month'
				? value !== null && 'monthsInYear' in value
					? value.monthsInYear
					: 12
				: unit === 'day'
					? value !== null && 'daysInMonth' in value
						? value.daysInMonth
						: 31
					: unit === 'hour'
						? 23
						: 59 // minute

	return { min, max }
}
