import type { ReactNode } from 'react'
import { usePaginatorContext } from './PaginatorContext'
import { usePaginatorPages, type PaginatorPage } from './usePaginatorPages'

export type PaginatorPagesProps = {
	boundary?: number
	siblings?: number
	children: (props: PaginatorPage, index: number) => ReactNode
}

export const PaginatorPages = ({
	siblings = Infinity,
	boundary = 1,
	children
}: PaginatorPagesProps) => {
	const { min, max, page } = usePaginatorContext()

	const pages = usePaginatorPages({ min, max, page, boundary, siblings })

	return pages.map(children)
}
