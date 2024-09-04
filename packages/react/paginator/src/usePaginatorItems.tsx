import { useMemo } from 'react'

export type PaginatorRange = [start: number, end: number]

export type PaginatorItem = {
	type: 'page' | 'ellipsis'
	page: number
}

export const createPaginatorItems = (...ranges: PaginatorRange[]) =>
	ranges.reduce<PaginatorItem[]>((acc, range, index, items) => {
		const [start, end] = range
		const previous = items[index - 1]?.at(-1)

		if (previous !== undefined) {
			const gap = start - previous
			const page = previous + 1
			const middle = index < items.length - 1

			if (gap === 2) {
				acc.push({ type: 'page', page })
			} else if (gap > 2) {
				acc.push({
					type: 'ellipsis',
					page: middle ? start - 1 : page
				})
			}
		}

		for (let i = start; i <= end; i++) {
			acc.push({ type: 'page', page: i })
		}

		return acc
	}, [])

export const usePaginatorItems = (...ranges: PaginatorRange[]) =>
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useMemo(() => createPaginatorItems(...ranges), ranges.flat())
