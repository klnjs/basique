import type { ReactNode } from 'react'
import { poly, forwardRef, type CoreProps } from '@klnjs/react-core'
import { usePaginatorContext } from './PaginatorContext'
import type { PaginatorPageProps } from './PaginatorPage'

export type PaginatorPagesProps = CoreProps<
	'div',
	{
		children: (props: PaginatorPageProps, index: number) => ReactNode
	}
>

export const PaginatorPages = forwardRef<'div', PaginatorPagesProps>(
	({ children, ...otherProps }, forwardedRef) => {
		const { pageMax } = usePaginatorContext()
		const pages = Array.from({ length: pageMax }, (_, index) => ({
			page: index + 1
		}))

		return (
			<poly.div ref={forwardedRef} {...otherProps}>
				{pages.map(children)}
			</poly.div>
		)
	}
)
