import type { ReactElement, Ref } from 'react'
import { poly, type CoreProps } from '@klnjs/react-core'
import type { CalendarSelect } from './useCalendarSelection'
import { CalendarProvider } from './CalendarContext'
import { useCalendar, type UseCalendarOptions } from './useCalendar'

export type CalendarProps<S extends CalendarSelect = 'one'> = CoreProps<
	'div',
	UseCalendarOptions<S>
>

export const Calendar = <S extends CalendarSelect = 'one'>({
	autoFocus,
	calendar: calendarProp,
	defaultValue,
	disabled,
	locale,
	max,
	min,
	pagination,
	readOnly,
	select,
	value,
	visibleDuration,
	onChange,
	...otherProps
}: CalendarProps<S> & {
	ref?: Ref<HTMLDivElement>
}): ReactElement => {
	const calendar = useCalendar({
		autoFocus,
		calendar: calendarProp,
		defaultValue,
		disabled,
		locale,
		max,
		min,
		pagination,
		readOnly,
		select,
		value,
		visibleDuration,
		onChange
	})

	return (
		<CalendarProvider value={calendar}>
			<poly.div role="application" {...otherProps} />
		</CalendarProvider>
	)
}
