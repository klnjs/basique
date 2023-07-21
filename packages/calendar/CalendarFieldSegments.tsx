import { useMemo, type ReactNode } from 'react'
import { useCalendarFieldContext } from './CalendarFieldContext'
import type {
	CalendarDateSegmentType,
	CalendarDateSegmentExclude
} from './CalendarDate'

export type CalendarFieldSegmentsProps<
	T extends readonly CalendarDateSegmentType[]
> = {
	exclude?: T
	children: (
		segment: CalendarDateSegmentExclude<T[number]>,
		index: number
	) => ReactNode
}

export const CalendarFieldSegments = <
	const T extends readonly CalendarDateSegmentType[] = []
>({
	exclude,
	children
}: CalendarFieldSegmentsProps<T>) => {
	const { focusedDate } = useCalendarFieldContext()

	const segments = useMemo(
		() =>
			focusedDate
				.getSegments()
				.filter(
					(segment) =>
						exclude === undefined || !exclude.includes(segment.type)
				) as CalendarDateSegmentExclude<T[number]>[],
		[exclude, focusedDate]
	)

	return segments.map(children)
}
