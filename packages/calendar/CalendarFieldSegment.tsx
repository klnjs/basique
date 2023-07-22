import { useMemo, useEffect, useCallback, type KeyboardEvent } from 'react'
import {
	freya,
	forwardRef,
	useForwardedRef,
	type AsChildComponentProps
} from '../core'
import { useCalendarFieldContext } from './CalendarFieldContext'
import { useCalendarLocalisation } from './useCalendarLocalisation'
import {
	CalendarDate,
	type CalendarDateSegmentStyle,
	type CalendarDateSegmentTypeEditable
} from './CalendarDate'

export type CalendarFieldSegmentProps = AsChildComponentProps<
	'div',
	{
		type: CalendarDateSegmentTypeEditable
		mode?: CalendarDateSegmentStyle
		disabled?: boolean
		placeholder?: string
	}
>

export const CalendarFieldSegment = forwardRef<
	'div',
	CalendarFieldSegmentProps
>(
	(
		{
			type,
			mode = '2-digit',
			style,
			disabled: disabledProp = false,
			placeholder = '-',
			...otherProps
		},
		forwardedRef
	) => {
		const {
			locale,
			disabled: disabledContext,
			labelId,
			minDate,
			maxDate,
			autoFocus,
			setAutoFocus,
			selectedDate,
			setSelectedDate,
			focusedSegmentRef,
			focusedSegment,
			setFocusedSegment
		} = useCalendarFieldContext()
		const { names } = useCalendarLocalisation(locale)

		const isDisabled = disabledProp || disabledContext
		const isFocused = focusedSegment === type
		const isInvalid =
			Boolean(maxDate && selectedDate && selectedDate.isAfter(maxDate)) ||
			Boolean(minDate && selectedDate && selectedDate.isBefore(minDate))

		const ref = useForwardedRef(
			forwardedRef,
			isFocused ? focusedSegmentRef : undefined
		)
		const value = selectedDate?.getSegment(type, mode).value ?? ''
		const valueText = selectedDate?.format({
			year: 'numeric',
			month: 'long',
			weekday: 'long',
			day: 'numeric'
		})

		const length = useMemo(
			() => new CalendarDate(locale).getSegment(type, mode).value.length,
			[locale, type, mode]
		)

		const children = useMemo(
			() => value.padStart(length, placeholder),
			[value, length, placeholder]
		)

		const changeSegment = useCallback(
			(action: (prev: CalendarDate) => CalendarDate | null) => {
				if (!isDisabled) {
					setSelectedDate((prev) =>
						action(prev ?? new CalendarDate(locale))
					)
				}
			},
			[locale, isDisabled, setSelectedDate]
		)

		const changeFocusedSegment = useCallback(
			(action: 'next' | 'previous') => {
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				const found = findSegment(ref.current!, action)

				if (found !== undefined) {
					found.focus()
				}
			},
			[ref]
		)

		const handleFocus = useCallback(() => {
			setFocusedSegment(type)
		}, [type, setFocusedSegment])

		const handleKeyDown = useCallback(
			(event: KeyboardEvent<HTMLDivElement>) => {
				if (event.code !== 'Tab') {
					event.preventDefault()
				}

				if (event.code === 'ArrowUp') {
					changeSegment((prev) => prev.add({ [type]: 1 }))
				}

				if (event.code === 'ArrowRight') {
					changeFocusedSegment('next')
				}

				if (event.code === 'ArrowDown') {
					changeSegment((prev) => prev.sub({ [type]: 1 }))
				}

				if (event.code === 'ArrowLeft') {
					changeFocusedSegment('previous')
				}

				if (event.code === 'Backspace' || event.key === 'Delete') {
					changeSegment(() => null)
				}

				if (/[0-9]/.test(event.key)) {
					const press = Number(event.key)
					const intent = Number(`${value}${press}`)
					const next = intent <= 31 ? intent : press

					changeSegment((prev) => prev.set({ [type]: next }))

					if (String(next).length === length) {
						changeFocusedSegment('next')
					}
				}
			},
			[type, value, length, changeSegment, changeFocusedSegment]
		)

		useEffect(() => {
			if (isFocused && autoFocus) {
				setAutoFocus(false)
				ref.current?.focus({
					// @ts-expect-error not yet implemented
					// https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus
					focusVisible: true
				})
			}
		}, [ref, isFocused, autoFocus, setAutoFocus])

		return (
			<freya.div
				ref={ref}
				role='spinbutton'
				inputMode='numeric'
				autoCorrect='off'
				autoCapitalize='off'
				style={{
					width: `${length}ch`,
					caretColor: 'transparent',
					...style
				}}
				spellCheck={false}
				contentEditable={!isDisabled}
				tabIndex={isDisabled ? undefined : isFocused ? 0 : -1}
				suppressContentEditableWarning={true}
				data-length={length}
				data-segment={type}
				data-focused={isFocused ? '' : undefined}
				data-disabled={isDisabled ? '' : undefined}
				data-placeholder={!value ? '' : undefined}
				aria-label={names.of(type)}
				aria-labelledby={labelId}
				// aria-valuemin={min}
				// aria-valuemax={max}
				aria-valuenow={Number(value)}
				aria-valuetext={valueText ?? 'Empty'}
				aria-invalid={isInvalid}
				aria-disabled={isDisabled}
				onFocus={handleFocus}
				onKeyDown={handleKeyDown}
				{...otherProps}
			>
				{children}
			</freya.div>
		)
	}
)

const findSegment = (element: HTMLElement, action: 'next' | 'previous') => {
	const direction = findDirection(element, action)

	// @ts-expect-error element not allowed to be null
	// eslint-disable-next-line no-cond-assign, no-param-reassign
	while ((element = element[`${direction}ElementSibling`]) !== null) {
		const data = element.dataset

		if (
			data.segment !== undefined &&
			data.segment !== 'literal' &&
			data.disabled === undefined
		) {
			return element
		}
	}
}

const findDirection = (
	element: HTMLElement,
	direction: 'next' | 'previous'
) => {
	const dir = getComputedStyle(element).direction

	if (dir === 'rtl') {
		switch (direction) {
			case 'next':
				return 'previous'
			case 'previous':
				return 'next'
			default:
				throw new Error('unsupported action')
		}
	}

	return direction
}
