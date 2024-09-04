import { useMemo, type ReactNode } from 'react'
import { clamp } from '@klnjs/math'
import { usePaginatorContext } from './PaginatorContext'
import { createPaginatorItems, type PaginatorItem } from './usePaginatorItems'

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
	const { page, pageStart, pageEnd } = usePaginatorContext()

	const items = useMemo((): PaginatorItem[] => {
		const offset = boundary - 1
		const lower = pageStart + offset
		const upper = pageEnd - offset
		const min = lower + 2
		const max = upper - 2
		const span = Math.min(max - min, siblings * 2)
		const start = clamp(page - siblings, min, max - span)
		const end = clamp(page + siblings, min + span, max)

		return createPaginatorItems(
			[pageStart, lower],
			[start, end],
			[upper, pageEnd]
		)
	}, [boundary, siblings, page, pageStart, pageEnd])

	return items.map(children)
}
