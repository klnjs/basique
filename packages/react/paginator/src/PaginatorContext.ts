import { createContext } from '@klnjs/react-core'
import type { usePaginator } from './usePaginator'

export type UsePaginatorContext = ReturnType<typeof usePaginator>

export const [PaginatorProvider, usePaginatorContext] =
	createContext<UsePaginatorContext>({
		name: 'PaginatorContext',
		nameOfHook: 'usePaginatorContext',
		nameOfProvider: '<PaginatorProvider />'
	})
