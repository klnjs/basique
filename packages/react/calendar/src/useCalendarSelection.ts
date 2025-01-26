import { useState } from 'react'
import { useEffectOnUpdate, useStateControllable } from '@klnjs/react-core'
import { isDefined, isArray } from '@klnjs/assertion'
import { plainDate } from '@klnjs/temporal'
import type { PlainDate, PlainDateRange } from './CalendarTypes'

export type CalendarSelect = 'one' | 'many' | 'range'

export type CalendarSelectValue<S extends CalendarSelect> =
	| null
	| (S extends 'range'
			? PlainDateRange
			: S extends 'many'
				? PlainDate[]
				: PlainDate)

export type UseCalendarSelectionOptions<S extends CalendarSelect> = {
	defaultValue?: CalendarSelectValue<S>
	highlighted: PlainDate
	behaviour?: S
	value?: CalendarSelectValue<S>
	onChange?: (value: CalendarSelectValue<S>) => void
}

export type UseCalendarSelectionReturn<S extends CalendarSelect> = {
	selection: CalendarSelectValue<S>
	selectionIsTransient: S extends 'range' ? boolean : never
	selectionMode: S
	selectionVisible: CalendarSelectValue<S>
	setSelection: (date: PlainDate) => void
}

export const useCalendarSelection = <S extends CalendarSelect = 'one'>({
	defaultValue = null,
	highlighted,
	behaviour,
	value,
	onChange
}: UseCalendarSelectionOptions<S>) => {
	const [transient, setTransient] = useState<PlainDate>()

	const [selection, setSelectionRaw] = useStateControllable<
		CalendarSelectValue<CalendarSelect>
	>({
		value,
		defaultValue,
		// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
		onChange: onChange as (
			value: CalendarSelectValue<CalendarSelect>
		) => void
	})

	const [selectionMode, setSelectionMode] = useState<CalendarSelect>(
		() => behaviour ?? 'one'
	)

	const selectionIsTransient =
		selectionMode === 'range' && isDefined(transient)

	const selectionVisible = selectionIsTransient
		? [transient, highlighted].toSorted(plainDate.compare)
		: selection

	const setSelection = (date: PlainDate) => {
		if (selectionMode === 'one') {
			setSelectionRaw(date)
		}

		if (selectionMode === 'many') {
			setSelectionRaw((prev) => {
				if (isArray(prev)) {
					const filtered = prev.filter((p) => !p.equals(date))

					return filtered.length === 0
						? null
						: filtered.length < prev.length
							? filtered
							: [...prev, date]
				}

				return [date]
			})
		}

		if (selectionMode === 'range') {
			setTransient((prev) => {
				if (isDefined(prev)) {
					setSelectionRaw([prev, date].toSorted(plainDate.compare))
					return undefined
				}

				return date
			})
		}
	}

	useEffectOnUpdate(() => {
		setSelectionRaw(null)
		setSelectionMode(behaviour ?? 'one')
	}, [behaviour])

	// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
	return {
		selection,
		selectionIsTransient,
		selectionMode,
		selectionVisible,
		setSelection
	} as
		| UseCalendarSelectionReturn<'one'>
		| UseCalendarSelectionReturn<'many'>
		| UseCalendarSelectionReturn<'range'>
}
