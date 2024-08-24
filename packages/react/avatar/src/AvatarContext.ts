import { createContext } from '@klnjs/react-core'
import type { useAvatar } from './useAvatar'

export type UseAvatarContext = ReturnType<typeof useAvatar>

export const [AvatarProvider, useAvatarContext] =
	createContext<UseAvatarContext>({
		name: 'AvatarContext',
		nameOfHook: 'useAvatarContext',
		nameOfProvider: '<AvatarProvider />'
	})
