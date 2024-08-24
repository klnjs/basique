import { createContext } from '@klnjs/react-core'
import type { useIcon } from './useIcon'

export type UseIconContext = ReturnType<typeof useIcon>

export const [IconProvider, useIconContext] = createContext<UseIconContext>({
	name: 'IconContext',
	nameOfHook: 'useIconContext',
	nameOfProvider: '<IconProvider />'
})
