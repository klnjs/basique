import { poly, forwardRef, type CoreProps } from '@klnjs/react-core'
import { usePaginatorContext } from './PaginatorContext'

export type PaginatorCountProps = CoreProps<'span'>

export const PaginatorCount = forwardRef<'span', PaginatorCountProps>(
	(props, forwardedRef) => {
		const { count } = usePaginatorContext()

		return (
			<poly.span ref={forwardedRef} {...props}>
				{count}
			</poly.span>
		)
	}
)
