import { clamp } from '@klnjs/math'

export type Paginator = {
	min: number
	max: number
}

export type PaginatorOptions = {
	pages: number
}

export type PaginatorRange = [start: number, end: number]

export type PaginatorItem = {
	type: 'page' | 'ellipsis'
	page: number
}

export const createPaginator = ({ pages }: PaginatorOptions): Paginator => ({
	min: 1,
	max: pages
})

export type PaginatorItemsOptions = {
	boundary: number
	siblings: number
	page: number
	min: number
	max: number
}

export const createPaginatorItems = ({
	boundary,
	siblings,
	page,
	min: minStart,
	max: maxEnd
}: PaginatorItemsOptions) => {
	const offset = boundary - 1

	const minEnd = minStart + offset
	const maxStart = maxEnd - offset

	const midMin = minEnd + 2
	const midMax = maxStart - 2
	const midSpan = Math.min(midMax - midMin, siblings * 2)
	const midStart = clamp(page - siblings, midMin, midMax - midSpan)
	const midEnd = clamp(page + siblings, midMin + midSpan, midMax)

	const ranges: PaginatorRange[] = [
		[minStart, minEnd],
		[midStart, midEnd],
		[maxStart, maxEnd]
	]

	return ranges.reduce<PaginatorItem[]>((acc, range, index, items) => {
		const [start, end] = range
		const previous = items[index - 1]?.at(-1)

		if (previous !== undefined) {
			const gap = start - previous
			const next = previous + 1
			const middle = index < items.length - 1

			if (gap >= 2) {
				acc.push({
					type: gap === 2 ? 'page' : 'ellipsis',
					page: gap === 2 ? next : middle ? start - 1 : next
				})
			}
		}

		for (let i = start; i <= end; i++) {
			acc.push({ type: 'page', page: i })
		}

		return acc
	}, [])
}
