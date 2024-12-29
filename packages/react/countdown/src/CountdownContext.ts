import { createContext } from '@klnjs/react-core'
import type { useCountdown } from './useCountdown'

export type UseCountdownContext = ReturnType<typeof useCountdown>

export const [CountdownProvider, useCountdownContext] =
	createContext<UseCountdownContext>({
		name: 'CountdownContext',
		nameOfHook: 'useCountdownContext',
		nameOfProvider: '<CountdownProvider />'
	})
