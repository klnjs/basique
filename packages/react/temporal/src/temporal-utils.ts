import { Temporal, Intl } from 'temporal-polyfill'
import type { TemporalType, TemporalUnit } from './useTemporal'

export type TemporalPart = {
	type: TemporalUnit
	value: string
}

export const isTemporalUnit = (unit: string): unit is TemporalUnit =>
	['year', 'month', 'day', 'hour', 'minute', 'second'].includes(unit)

export const getTemporalParts = (type: TemporalType, locale: string) => {
	const now = getNowFromType(type)
	const formatter = new Intl.DateTimeFormat(locale)

	// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
	return formatter
		.formatToParts(now)
		.filter((t) => isTemporalUnit(t.type)) as TemporalPart[]
}

export const getNowFromType = (type: TemporalType) => {
	switch (type) {
		case 'PlainDate':
			return Temporal.Now.plainDateISO()
		case 'PlainDateTime':
			return Temporal.Now.plainDateTimeISO()
		case 'PlainTime':
			return Temporal.Now.plainTimeISO()
		default:
			throw new Error('Unsupported Temporal type')
	}
}

export const getNextUnitFromType = ({
	type,
	locale,
	unit,
	direction
}: {
	type: TemporalType
	unit: TemporalUnit
	locale: string
	direction: 'inc' | 'dec'
}) => {
	const parts = getTemporalParts(type, locale)
	const foundAt = parts.findIndex((part) => unit === part.type)
	const updateAt = direction === 'inc' ? foundAt + 1 : foundAt - 1

	if (foundAt === -1 || updateAt < 0 || updateAt >= parts.length) {
		return unit
	}

	return parts[updateAt]?.type ?? unit
}

export const getFirstUnitFromType = ({
	type,
	locale
}: {
	type: TemporalType
	locale: string
}) => {
	const parts = getTemporalParts(type, locale)
	const part = parts[0]

	if (part === undefined) {
		throw new Error('Could not find first unit in Temporal type')
	}

	return part.type
}
