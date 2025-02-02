import { useEffect, useRef } from 'react'
import { useCallbackRef } from './useCallbackRef'

export type UseRequestAnimationFrameOptions = {
	enabled?: boolean
	throttle?: number
}

export const useRequestAnimationFrame = (
	callback: () => void,
	{ enabled = true, throttle = 0 }: UseRequestAnimationFrameOptions = {}
) => {
	const rafId = useRef<number>(null)
	const rafCalledAt = useRef<number>(0)
	const callbackRef = useCallbackRef(callback)

	// @ts-expect-error ts(7030): Not all code paths return a value.
	useEffect(() => {
		if (enabled) {
			const handler = () => {
				const now = performance.now()

				if (now - rafCalledAt.current >= throttle) {
					callbackRef()
					rafCalledAt.current = now
				}

				rafId.current = requestAnimationFrame(handler)
			}

			rafId.current = requestAnimationFrame(handler)

			return () => {
				if (rafId.current !== null) {
					cancelAnimationFrame(rafId.current)
				}
			}
		}
	}, [enabled, throttle, callbackRef])
}
