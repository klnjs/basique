import { useCallback, type FocusEvent } from 'react'

export type UseFocusWithinOptions<E extends FocusEvent> = {
	onFocusEnter?: (event: E) => void
	onFocusLeave?: (event: E) => void
	onFocusChange?: (update: boolean) => void
}

export const useFocusWithin = <E extends FocusEvent>({
	onFocusEnter,
	onFocusLeave,
	onFocusChange
}: UseFocusWithinOptions<E> = {}) => {
	const onFocus = useCallback(
		(event: E) => {
			if (event.currentTarget.contains(event.target)) {
				onFocusEnter?.(event)
				onFocusChange?.(true)
			}
		},
		[onFocusEnter, onFocusChange]
	)

	const onBlur = useCallback(
		(event: E) => {
			if (event.currentTarget.contains(event.target)) {
				onFocusLeave?.(event)
				onFocusChange?.(true)
			}
		},
		[onFocusLeave, onFocusChange]
	)

	return { onFocus, onBlur }
}

export const isFocusWithin = (element: Element | EventTarget) =>
	(element as Element).contains(document.activeElement)
