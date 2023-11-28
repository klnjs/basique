import { useCallback, useEffect, useRef } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useCallbackRef<T extends (...args: any[]) => any>(
	callback: T | undefined,
	deps: React.DependencyList = []
) {
	const callbackRef = useRef(callback)

	useEffect(() => {
		callbackRef.current = callback
	})

	// eslint-disable-next-line react-hooks/exhaustive-deps, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-argument
	return useCallback(((...args) => callbackRef.current?.(...args)) as T, deps)
}
