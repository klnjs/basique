import { poly, type CoreProps } from '@klnjs/react-core'

export type PaginatorEllipsisProps = CoreProps<'span'>

export const PaginatorEllipsis = (props: PaginatorEllipsisProps) => (
	<poly.span {...props}>…</poly.span>
)
