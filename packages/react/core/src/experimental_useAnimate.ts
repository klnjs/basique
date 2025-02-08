import { useRef, useCallback, type RefObject } from 'react'
import { useCallbackRef } from './useCallbackRef'

export type UseAnimateOptions = {
	from: Keyframe
	to: Keyframe
	duration: number
	easing: string
	onStart?: () => void
	onFinish?: () => void
}

export type UseAnimateReturn = {
	play: () => void
	pause: () => void
	resume: () => void
	reverse: () => void
}

export const useAnimation = (
	ref: RefObject<HTMLElement | null>,
	{ from, to, duration, easing, onStart, onFinish }: UseAnimateOptions
): UseAnimateReturn => {
	const animation = useRef<Animation | null>(null)
	const onStartRef = useCallbackRef(onStart)
	const onFinishRef = useCallbackRef(onFinish)

	const play = useCallback(() => {
		if (ref.current !== null) {
			onStartRef()

			animation.current = ref.current.animate([from, to], {
				duration,
				easing,
				fill: 'forwards'
			})

			animation.current.onfinish = onFinishRef
		}
	}, [ref, from, to, duration, easing, onStartRef, onFinishRef])

	const pause = useCallback(() => {
		animation.current?.pause()
	}, [])

	const resume = useCallback(() => {
		animation.current?.play()
	}, [])

	const reverse = useCallback(() => {
		animation.current?.reverse()
	}, [])

	return { play, pause, resume, reverse }
}
