import { useCallback, useMemo } from 'react'
import { Temporal } from 'temporal-polyfill'
import { poly, forwardRef, type CoreProps } from '@klnjs/core'
import { isAfter, isBefore } from '@klnjs/temporal'
import { useCalendarContext } from './CalendarContext'
import {
	useCalendarFieldNames,
	useCalendarLocalisation
} from './useCalendarLocalisation'

export type CalendarButtonProps = CoreProps<
	'button',
	{ action: 'inc' | 'dec'; unit?: 'years' | 'months' }
>

export const CalendarButton = forwardRef<'button', CalendarButtonProps>(
	(
		{
			action,
			unit = 'months',
			disabled: disabledProp = false,
			children,
			...otherProps
		},
		forwardedRef
	) => {
		const {
			min,
			max,
			locale,
			disabled: disabledContext,
			highlighted,
			visibleDuration,
			updateVisibleRange
		} = useCalendarContext()
		const { t } = useCalendarLocalisation(locale)
		const { names: fieldNames } = useCalendarFieldNames(locale)

		const duration = useMemo(() => {
			const increment =
				unit === 'months'
					? visibleDuration.abs()
					: Temporal.Duration.from({
							years: 1
						})

			return action === 'inc' ? increment : increment.negated()
		}, [action, unit, visibleDuration])

		const label = useMemo(
			() => t(action, { unit: fieldNames.of(unit.slice(0, -1)) ?? '' }),
			[action, unit, t, fieldNames]
		)

		const content = useMemo(() => {
			switch (action) {
				case 'inc':
					return unit === 'years' ? '»' : '›'
				case 'dec':
					return unit === 'years' ? '«' : '‹'
				default:
					return '•'
			}
		}, [action, unit])

		const result = useMemo(
			() => highlighted.add(duration),
			[duration, highlighted]
		)

		const isDisabled = useMemo(
			() =>
				disabledProp ||
				disabledContext ||
				Boolean(max && isAfter(result, max)) ||
				Boolean(min && isBefore(result, min)),
			[min, max, result, disabledProp, disabledContext]
		)

		const handleClick = useCallback(() => {
			updateVisibleRange(duration)
		}, [duration, updateVisibleRange])

		return (
			<poly.button
				ref={forwardedRef}
				type="button"
				disabled={isDisabled}
				aria-label={label}
				aria-disabled={isDisabled}
				onClick={handleClick}
				{...otherProps}
			>
				{children ?? content}
			</poly.button>
		)
	}
)