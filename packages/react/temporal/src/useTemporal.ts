import { useRef, useState } from 'react'
import { Temporal } from 'temporal-polyfill'
import { useControllableState } from '@klnjs/react-core'
import { getFirstUnitFromType } from './temporal-utils'

export type TemporalType = 'PlainDate' | 'PlainDateTime' | 'PlainTime'

export type TemporalUnit =
	| 'year'
	| 'month'
	| 'day'
	| 'hour'
	| 'minute'
	| 'second'

export type TemporalValue =
	| Temporal.PlainDate
	| Temporal.PlainDateTime
	| Temporal.PlainTime

export type TemporalValueMap = {
	PlainDate: Temporal.PlainDate
	PlainDateTime: Temporal.PlainDateTime
	PlainTime: Temporal.PlainTime
}

export type UseTemporalOptions<T extends TemporalType> = {
	type: T
	autoFocus?: boolean
	min?: TemporalValueMap[T]
	max?: TemporalValueMap[T]
	locale?: string
	disabled?: boolean
	value?: TemporalValueMap[T] | null
	defaultValue?: TemporalValueMap[T] | null
	onChange?: (value: TemporalValueMap[T] | null) => void
}

export const useTemporal = <T extends TemporalType>({
	type,
	autoFocus = false,
	min,
	max,
	value: valueProp,
	locale = navigator.language,
	disabled = false,
	defaultValue = null,
	onChange
}: UseTemporalOptions<T>) => {
	const [labelId, setLabelId] = useState<string>()

	const [value, setValue] = useControllableState({
		value: valueProp,
		defaultValue,
		onChange
	})

	const [highlighted, setHighlighted] = useState<TemporalUnit>(() =>
		getFirstUnitFromType({ type, locale })
	)

	const highlightedRef = useRef<HTMLDivElement>(null)

	const focusWithinRef = useRef(autoFocus)

	return {
		type,
		min,
		max,
		locale,
		disabled,
		labelId,
		setLabelId,
		focusWithinRef,
		value,
		setValue,
		highlightedRef,
		highlighted,
		setHighlighted
	}
}
