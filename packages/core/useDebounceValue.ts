import { useState, useEffect } from 'react'

export function useDebounceValue<T>(value: T, delay = 100) {
	const [debounced, setDebounced] = useState<T>(value)

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebounced(value)
		}, delay)

		return () => {
			clearTimeout(handler)
		}
	}, [value, delay])

	return debounced
}
