import { poly, type CoreProps } from '@klnjs/react-core'
import { PaginatorProvider } from './PaginatorContext'
import { usePaginator, type UsePaginatorOptions } from './usePaginator'

export type PaginatorProps = CoreProps<'div', UsePaginatorOptions>

export const Paginator = ({
	defaultPage,
	page,
	pages,
	onChange,
	...otherProps
}: PaginatorProps) => {
	const paginator = usePaginator({
		defaultPage,
		page,
		pages,
		onChange
	})

	return (
		<PaginatorProvider value={paginator}>
			<poly.div
				role="navigation"
				aria-label="Pagination"
				{...otherProps}
			/>
		</PaginatorProvider>
	)
}
