import { poly, forwardRef, type CoreProps } from '@klnjs/react-core'
import { usePaginatorContext } from './PaginatorContext'

export type PaginatorRangeProps = CoreProps<'span'>

export const PaginatorRange = forwardRef<'span', PaginatorRangeProps>(
	(props, forwardedRef) => {
		const { range } = usePaginatorContext()

		return (
			<poly.span ref={forwardedRef} {...props}>
				{range[0]} - {range[1]}
			</poly.span>
		)
	}
)
