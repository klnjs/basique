import type { TemporalUnit, TemporalValue } from './useTemporal'
import { Intl } from 'temporal-polyfill'

export type UseTemporalSegmentOptions = {
	unit: TemporalUnit
	value: TemporalValue | null
	locale: string
}

export const useTemporalSegment = ({
	unit,
	value,
	locale
}: UseTemporalSegmentOptions) => {
	if (value === null) {
		return {
			label: '',
			value: null
		}
	}

	const formatter = new Intl.DateTimeFormat(locale, { [unit]: 'numeric' })
	const segment = formatter
		.formatToParts(value)
		.find((part) => part.type === unit)

	return {
		label: segment?.type ?? '',
		value: segment?.value ?? null
	}
}
