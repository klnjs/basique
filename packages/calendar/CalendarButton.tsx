import { freya, forwardRef, type AsChildComponentProps } from '../core'
import { useCalendarContext } from './CalendarContext'
import type { CalendarFocusedSegment } from './CalendarDate'

export type CalendarButtonSegment = Extract<
	CalendarFocusedSegment,
	'year' | 'month'
>

export type CalendarButtonProps = AsChildComponentProps<
	'button',
	{ action: `${CalendarButtonSegment}-1` | `${CalendarButtonSegment}+1` }
>

export const CalendarButton = forwardRef<'button', CalendarButtonProps>(
	({ action, ...otherProps }, forwardedRef) => {
		const { state, config } = useCalendarContext()
		const [segment, number] = action.split(/(?=\+|-)/) as [
			CalendarFocusedSegment,
			string
		]

		const limit = number.startsWith('+') ? config.max : config.min
		const target = number.startsWith('+')
			? 'getFirstDateOfMonth'
			: 'getLastDateOfMonth'

		const predicate = number.startsWith('+') ? 'isAfter' : 'isBefore'

		const isDisabled = state.focusedDate
			.calc({
				[segment]: Number(number)
			})
			[target]()
			[predicate](limit)

		const onClick = () =>
			state.setFocusedDate((prev) => {
				const next = prev.calc({ [segment]: Number(number) })

				return next[predicate](limit) ? limit : next
			})

		return (
			<freya.button
				ref={forwardedRef}
				type='button'
				disabled={isDisabled}
				onClick={onClick}
				{...otherProps}
			/>
		)
	}
)
