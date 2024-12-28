import { isNumber, isString } from '@klnjs/assertion'
import { useRequestAnimationFrame, useRerender } from '@klnjs/react-core'
import { useEffect, useMemo, useState } from 'react'
import { Temporal } from 'temporal-polyfill'
import type { CountdownUnit } from './useCountdownUnit'

export type CountdownStatus = 'active' | 'ended'

export type UseCountdownOptions = {
	locale: string
	throttle?: number
	until:
		| number
		| string
		| Date
		| Temporal.Instant
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.ZonedDateTime
	largestUnit: CountdownUnit
	smallestUnit: CountdownUnit
	onStatusChange?: (status: CountdownStatus) => void
}

export const useCountdown = ({
	locale,
	until,
	throttle = 200,
	largestUnit,
	smallestUnit,
	onStatusChange
}: UseCountdownOptions) => {
	const [labelId, setLabelId] = useState<string>()

	const rerender = useRerender()
	const initiated = useMemo(() => Temporal.Now.zonedDateTimeISO(), [])
	const target = useMemo(() => {
		if (isNumber(until)) {
			return Temporal.Instant.fromEpochMilliseconds(
				until
			).toZonedDateTimeISO(initiated.timeZoneId)
		} else if (isString(until)) {
			return Temporal.Instant.from(until).toZonedDateTimeISO(
				initiated.timeZoneId
			)
		} else if (until instanceof Date) {
			return Temporal.Instant.fromEpochMilliseconds(
				until.getTime()
			).toZonedDateTimeISO(initiated.timeZoneId)
		} else if (until instanceof Temporal.PlainDate) {
			return until.toZonedDateTime(initiated.timeZoneId)
		} else if (until instanceof Temporal.PlainDateTime) {
			return until.toZonedDateTime(initiated.timeZoneId)
		} else if (until instanceof Temporal.ZonedDateTime) {
			return until
		}

		return until.toZonedDateTimeISO(initiated.timeZoneId)
	}, [until, initiated])

	const now = Temporal.Now.zonedDateTimeISO()
	const delta = target.since(now, {
		largestUnit,
		smallestUnit
	})

	const active = delta.sign === 1
	const status = active ? 'active' : 'ended'
	const remaining = active
		? delta
		: Temporal.Duration.from({ milliseconds: 0 })

	useEffect(() => {
		if (onStatusChange) {
			onStatusChange(status)
		}
	}, [status, onStatusChange])

	useRequestAnimationFrame(rerender, {
		enabled: active,
		throttle
	})

	return {
		locale,
		labelId,
		status,
		setLabelId,
		largestUnit,
		smallestUnit,
		initiated,
		remaining
	}
}
