import {
	useRef,
	useState,
	useEffect,
	useCallback,
	type Dispatch,
	type SetStateAction
} from 'react'
import { useCallbackRef } from './useCallbackRef'

export type UseControllableStateOptions<T> = {
	value?: T
	defaultValue?: T | (() => T)
	onChange?: (value: T) => void
}

/**
 * A hook that implements controlled and uncontrolled state.
 */
export const useControllableState = <T>({
	value: controlledValue,
	defaultValue,
	onChange
}: UseControllableStateOptions<T>) => {
	const isControlled = controlledValue !== undefined
	const isControlledRef = useRef(isControlled)
	const onChangeRef = useCallbackRef(onChange)

	const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue)
	const value = isControlled ? controlledValue : uncontrolledValue

	const setValue = useCallback(
		(action: SetStateAction<T>) => {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
			const setter = action as (prev: T | undefined) => T
			const updated =
				typeof action === 'function' ? setter(value) : action

			// Prevents unnecessary updates
			if (value !== updated) {
				if (!isControlled) {
					setUncontrolledValue(updated)
				}

				onChangeRef(updated)
			}
		},
		[isControlled, value, onChangeRef]
	)

	useEffect(() => {
		if (isControlledRef.current !== isControlled) {
			isControlledRef.current = isControlled

			// eslint-disable-next-line no-console
			console.warn(
				'Warning: A component is changing from being uncontrolled to controlled or vice versa.'
			)
		}
	}, [isControlled])

	// https://github.com/facebook/react/issues/16873
	// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
	return [value, setValue] as [T, Dispatch<SetStateAction<T>>]
}
