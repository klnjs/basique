import { useCallback, useEffect, useRef } from 'react'

/**
 * A hook that creates a stable reference to a callback function.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useCallbackRef<T extends (...args: any[]) => any>(
	callback: T | undefined
) {
	const callbackRef = useRef(callback)

	useEffect(() => {
		callbackRef.current = callback
	}, [callback])

	return useCallback(
		// eslint-disable-next-line react-compiler/react-compiler
		((...args) => {
			if (callbackRef.current) {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
				callbackRef.current(...args)
			}
		}) as T,
		[]
	)
}
