import { poly, type CoreProps } from '@klnjs/react-core'
import { useEffect, useState, useMemo, type CSSProperties } from 'react'
import { Temporal } from 'temporal-polyfill'
import { getLargestUnit } from './useCountdownUnit'
import { useCountdownContext } from './CountdownContext'

export type CountdownAnnouncerProps = CoreProps<'div'>

export const CountdownAnnouncer = ({
	style: styleProp,
	...otherProps
}: CountdownAnnouncerProps) => {
	const { locale, labelId, remaining } = useCountdownContext()

	const unit = getLargestUnit(remaining)

	const total = remaining
		.round({
			largestUnit: unit,
			smallestUnit: unit,
			roundingMode: 'ceil'
		})
		.total({
			unit
		})

	const [announce, setAnnounce] = useState(() =>
		remaining.with({
			milliseconds: 0
		})
	)

	const style: CSSProperties = {
		position: 'absolute',
		pointerEvents: 'none',
		opacity: 0,
		...styleProp
	}

	/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access */
	const formatter = useMemo(
		() =>
			// @ts-expect-error - Intl.DurationFormat is not recognized yet
			new Intl.DurationFormat(locale, {
				style: 'long'
			}),
		[locale]
	)

	useEffect(() => {
		if (unit !== 'seconds' && unit !== 'milliseconds') {
			setAnnounce(Temporal.Duration.from({ [unit]: total }))
		} else if (unit === 'seconds' && total % 10 === 0) {
			setAnnounce(Temporal.Duration.from({ [unit]: total }))
		} else if (unit === 'milliseconds') {
			setAnnounce(Temporal.Duration.from({ [unit]: 0 }))
		}
	}, [unit, total])

	return (
		<poly.div
			role="timer"
			style={style}
			aria-live="polite"
			aria-labelledby={labelId}
			aria-atomic
			{...otherProps}
		>
			{formatter.format(announce)}
		</poly.div>
	)
}
/* eslint-enable@typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access */
