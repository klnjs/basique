import type { ReactNode } from 'react'
import { poly, type CoreProps } from '@klnjs/react-core'
import type { CalendarCellType } from './CalendarCell'
import { useCalendarContext } from './CalendarContext'
import { CalendarGridProvider } from './CalendarGridContext'
import { useCalendarGrid } from './useCalendarGrid'
import type { CalendarVisibleDuration, PlainDate } from './CalendarTypes'

export type CalendarGridCellItem = {
	type: CalendarCellType
	date: PlainDate
}

export type CalendarGridProps = CoreProps<
	'div',
	{
		offset?: CalendarVisibleDuration
		weekdays?: boolean
		weeks?: boolean
		overflow?: 'auto' | 'align'
		children: (item: CalendarGridCellItem, index: number) => ReactNode
	}
>

export const CalendarGrid = ({
	offset,
	weekdays,
	weeks,
	overflow,
	children,
	...otherProps
}: CalendarGridProps) => {
	const { locale, visibleRange } = useCalendarContext()

	const months = offset?.months ?? 0
	const month = visibleRange[0].add({ months }).toPlainYearMonth()
	const cells = useCalendarGrid({
		locale,
		month,
		overflow,
		weekdays,
		weeks
	})

	return (
		<CalendarGridProvider value={{ month, weeks, weekdays }}>
			<poly.div {...otherProps}>{cells.map(children)}</poly.div>
		</CalendarGridProvider>
	)
}
