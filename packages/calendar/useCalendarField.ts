import { useCallback, useRef, useState, type SetStateAction } from 'react'
import { useId } from '../core'
import { useCalendar, type UseCalendarOptions } from './useCalendar'
import type {
	CalendarDate,
	CalendarDateSegmentTypeEditable
} from './CalendarDate'

export type UseCalendarFieldOptions = UseCalendarOptions & {
	defaultOpen?: boolean
}

export const useCalendarField = ({
	defaultOpen = false,
	...otherOptions
}: UseCalendarFieldOptions) => {
	const labelId = useId()
	const anchorRef = useRef<HTMLDivElement>(null)

	const { locale, focusedDate, setSelectedDate, ...calendarOptions } =
		useCalendar(otherOptions)

	const [open, setOpen] = useState(defaultOpen)

	const [focusedSegment, setFocusedSegment] = useState(
		focusedDate.getSegmentByIndex(locale, 0)
			.type as CalendarDateSegmentTypeEditable
	)

	const setSelectedDateAndClose = useCallback(
		(dispatch: SetStateAction<CalendarDate | null>) => {
			setOpen(false)
			setSelectedDate(dispatch)
		},
		[setOpen, setSelectedDate]
	)

	return {
		open,
		locale,
		labelId,
		anchorRef,
		setOpen,
		setSelectedDate: setSelectedDateAndClose,
		focusedDate,
		focusedSegment,
		setFocusedSegment,
		...calendarOptions
	}
}
