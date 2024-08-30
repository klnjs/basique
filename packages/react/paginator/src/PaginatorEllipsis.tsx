import { poly, forwardRef, type CoreProps } from '@klnjs/react-core'

export type PaginatorEllipsisProps = CoreProps<'span'>

export const PaginatorEllipsis = forwardRef<'span', PaginatorEllipsisProps>(
	(props, forwardedRef) => (
		<poly.span ref={forwardedRef} {...props}>
			…
		</poly.span>
	)
)
