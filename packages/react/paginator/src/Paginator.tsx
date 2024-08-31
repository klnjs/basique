import { poly, forwardRef, type CoreProps } from '@klnjs/react-core'
import { PaginatorProvider } from './PaginatorContext'
import { usePaginator, type UsePaginatorOptions } from './usePaginator'

export type PaginatorProps = CoreProps<'div', UsePaginatorOptions>

export const Paginator = forwardRef<'div', PaginatorProps>(
	({ defaultPage, page, pages, onChange, ...otherProps }, forwardedRef) => {
		const paginator = usePaginator({
			defaultPage,
			page,
			pages,
			onChange
		})

		return (
			<PaginatorProvider value={paginator}>
				<poly.div
					ref={forwardedRef}
					role="navigation"
					aria-label="Pagination"
					{...otherProps}
				/>
			</PaginatorProvider>
		)
	}
)
