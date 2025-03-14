import {
	poly,
	asDataProp,
	useMergeRefs,
	type CoreProps
} from '@klnjs/react-core'
import { useTemporalContext } from './TemporalContext'
import type { TemporalUnit } from './useTemporal'
import { useTemporalSegment } from './useTemporalSegment'
import { useTemporalSegmentBounds } from './useTemporalSegmentBounds'
import { useLayoutEffect, useRef, type KeyboardEvent } from 'react'
import { isElementRTL } from '@klnjs/dom'
import { getNextUnitFromType } from './temporal-utils'

export type TemporalSegmentProps = CoreProps<
	'div',
	{
		unit: TemporalUnit
		format?: 'numeric' | '2-digit'
		disabled?: boolean
		placeholder?: string
	}
>

export const TemporalSegment = ({
	unit,
	style: styleProp,
	format = unit === 'year' ? 'numeric' : '2-digit',
	ref: refProp,
	disabled: disabledProp = false,
	placeholder = '-',
	...otherProps
}: TemporalSegmentProps) => {
	const {
		type,
		min: minContext,
		max: maxContext,
		value: valueContext,
		focusWithinRef,
		locale,
		disabled: disabledContext,
		labelId,
		setHighlighted,
		highlighted,
		highlightedRef
	} = useTemporalContext()

	const isHighlighted = unit === highlighted
	const isDisabled = disabledProp || disabledContext
	const isTabbable = !isDisabled && isHighlighted
	const isInvalid = false
	// Boolean(minContext && valueContext && isBefore(selection, min)) ||
	// Boolean(maxContext && valueContext && isAfter(selection, max))

	const ref = useRef<HTMLDivElement>(null)
	const refMerged = useMergeRefs(
		ref,
		refProp,
		isHighlighted ? highlightedRef : undefined
	)

	const { min, max } = useTemporalSegmentBounds({ unit, value: valueContext })
	const { label, value } = useTemporalSegment({
		unit,
		value: valueContext,
		locale
	})

	const now = value ? Number(value) : undefined
	const pad = format === 'numeric' ? Math.floor(Math.log10(max)) + 1 : 2
	const padWith = value ? '0' : placeholder
	const current = value ?? ''
	const content = current.padStart(pad, padWith)

	const style = {
		width: `${content.length}ch`,
		caretColor: 'transparent',
		...styleProp
	}

	const handleBlur = () => (focusWithinRef.current = false)

	const handleFocus = () => (focusWithinRef.current = true)

	const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
		if (event.code === 'ArrowRight') {
			if (ref.current !== null) {
				setHighlighted(
					getNextUnitFromType({
						type,
						unit,
						locale,
						direction: isElementRTL(ref.current) ? 'dec' : 'inc'
					})
				)
			}
		}

		if (event.code === 'ArrowLeft') {
			if (ref.current !== null) {
				setHighlighted(
					getNextUnitFromType({
						type,
						unit,
						locale,
						direction: isElementRTL(ref.current) ? 'inc' : 'dec'
					})
				)
			}
		}
	}

	useLayoutEffect(() => {
		if (isHighlighted && focusWithinRef.current && ref.current !== null) {
			ref.current.focus()
		}
	}, [isHighlighted, focusWithinRef])

	return (
		<poly.div
			ref={refMerged}
			role="spinbutton"
			inputMode="numeric"
			autoCorrect="off"
			autoCapitalize="off"
			style={style}
			spellCheck={false}
			contentEditable={!isDisabled}
			tabIndex={isTabbable ? 0 : -1}
			suppressContentEditableWarning={true}
			data-unit={asDataProp(unit)}
			data-disabled={asDataProp(isDisabled)}
			data-placeholder={asDataProp(value === null)}
			data-highlighted={asDataProp(isHighlighted)}
			aria-label={label}
			aria-labelledby={labelId}
			aria-valuenow={now}
			aria-valuemin={min}
			aria-valuemax={max}
			aria-valuetext={value ?? ''}
			aria-invalid={isInvalid}
			aria-disabled={isDisabled}
			onBlur={handleBlur}
			onFocus={handleFocus}
			onKeyDown={handleKeyDown}
			{...otherProps}
		>
			{content}
		</poly.div>
	)
}

// const typeToPlural = (type: CalendarFieldSegmentType): `${typeof type}s` =>
// 	`${type}s`
