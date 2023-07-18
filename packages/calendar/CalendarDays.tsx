import { useMemo, type ReactNode } from 'react'
import { useCalendarContext } from './CalendarContext'
import type { CalendarDate } from './CalendarDate'

export type CalendarDaysProps = {
	children: (day: CalendarDate, index: number) => ReactNode
}

export const CalendarDays = ({ children }: CalendarDaysProps) => {
	const { locale, focusedDate } = useCalendarContext()

	const days = useMemo(() => {
		const dates: CalendarDate[] = []
		const max = focusedDate.getLastDateOfMonth().getLastDateOfWeek(locale)
		let date = focusedDate.getFirstDateOfMonth().getFirstDateOfWeek(locale)

		while (!date.isSameDay(max)) {
			dates.push(date)
			date = date.add({ day: 1 })
		}

		return dates
	}, [locale, focusedDate])

	return days.map(children)
}
