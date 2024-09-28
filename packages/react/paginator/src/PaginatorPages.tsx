import type { ReactNode } from 'react'
import { usePaginatorContext } from './PaginatorContext'
import {
	createPaginatorItems,
	type PaginatorItem
} from '../../../base/paginator'

export type PaginatorPagesProps = {
	boundary?: number
	siblings?: number
	children: (props: PaginatorItem, index: number) => ReactNode
}

export const PaginatorPages = ({
	siblings = Infinity,
	boundary = 1,
	children
}: PaginatorPagesProps) => {
	const { min, max, page } = usePaginatorContext()

	const items = createPaginatorItems({ min, max, page, boundary, siblings })

	return items.map(children)
}
