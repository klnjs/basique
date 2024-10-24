import { createContext } from '@klnjs/react-core'
import type { UseCalendarGridOptions } from './useCalendarGrid'

export type UseCalendarGridContext = Omit<
	UseCalendarGridOptions,
	'calendar' | 'locale'
>

export const [CalendarGridProvider, useCalendarGridContext] =
	createContext<UseCalendarGridContext>({
		name: 'CalendarGridContext',
		nameOfHook: 'useCalendarGridContext',
		nameOfProvider: '<CalendarGridProvider />'
	})
