import { createContext } from '@klnjs/react-core'
import { useTemporal } from './useTemporal'

export type UseTemporalContext = ReturnType<typeof useTemporal>

export const [TemporalProvider, useTemporalContext] =
	createContext<UseTemporalContext>({
		name: 'TemporalContext',
		nameOfHook: 'useTemporalContext',
		nameOfProvider: '<TemporalProvider />'
	})
