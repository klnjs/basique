import { poly, forwardRef, type CoreProps } from '@klnjs/react-core'
import { PaginatorProvider } from './PaginatorContext'
import { usePaginator, type UsePaginatorOptions } from './usePaginator'

export type PaginatorProps = CoreProps<'div', UsePaginatorOptions>

export const Paginator = forwardRef<'div', PaginatorProps>(
	(
		{ count, defaultPage, pageSize, page, onChange, ...otherProps },
		forwardedRef
	) => {
		const paginator = usePaginator({
			count,
			defaultPage,
			page,
			pageSize,
			onChange
		})

		return (
			<PaginatorProvider value={paginator}>
				<poly.nav
					ref={forwardedRef}
					role="navigation"
					aria-label="Pagination"
					{...otherProps}
				/>
			</PaginatorProvider>
		)
	}
)
