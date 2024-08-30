import { useMemo, type ReactNode } from 'react'
import { poly, forwardRef, type CoreProps } from '@klnjs/react-core'
import { usePaginatorContext } from './PaginatorContext'
import { createSequence } from './usePaginatorSequence'

export type PaginatorPagesItem = {
	type: 'page' | 'ellipsis'
	page: number
	slot: number
}

export type PaginatorPagesProps = CoreProps<
	'div',
	{
		boundary?: number
		siblings?: number
		children: (props: PaginatorPagesItem, index: number) => ReactNode
	}
>

export const PaginatorPages = forwardRef<'div', PaginatorPagesProps>(
	(
		{ siblings = Infinity, boundary = 1, children, ...otherProps },
		forwardedRef
	) => {
		const { page, pageStart, pageEnd } = usePaginatorContext()

		const items = useMemo((): PaginatorPagesItem[] => {
			const boundaryStart = pageStart + boundary - 1
			const boundaryEnd = pageEnd - boundary + 1

			const min = boundaryStart + 2
			const max = boundaryEnd - 2
			const start = Math.max(min, page - siblings)
			const length = siblings === 0 ? 0 : siblings + 1
			const end = start + length
			const overflow = Math.max(0, end - max)
			const endAdjusted = Math.min(max, end)
			const startAdjusted = Math.max(min, start - overflow)

			return createSequence(
				[pageStart, boundaryStart],
				[startAdjusted, endAdjusted],
				[boundaryEnd, pageEnd]
			).map((number, index) => ({
				type: Number.isNaN(number) ? 'ellipsis' : 'page',
				page: number,
				slot: index
			}))
		}, [boundary, siblings, page, pageStart, pageEnd])

		return (
			<poly.div ref={forwardedRef} {...otherProps}>
				{items.map(children)}
			</poly.div>
		)
	}
)
