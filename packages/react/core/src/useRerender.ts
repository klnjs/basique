import { useState, useCallback } from 'react'

export const useRerender = () => {
	// eslint-disable-next-line react/hook-use-state
	const [, setState] = useState(0)

	return useCallback(() => {
		setState((state) => state + 1)
	}, [])
}
