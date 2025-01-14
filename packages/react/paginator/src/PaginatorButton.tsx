import { poly, forwardRef, type CoreProps } from '@klnjs/react-core'
import { usePaginatorContext } from './PaginatorContext'

export type PaginatorButtonProps = CoreProps<
	'button',
	{ action: 'inc' | 'dec' }
>

export const PaginatorButton = forwardRef<'button', PaginatorButtonProps>(
	(
		{ action, disabled: disabledProp = false, children, ...otherProps },
		forwardedRef
	) => {
		const {
			page,
			min,
			max,
			disabled: disabledContext,
			setPage
		} = usePaginatorContext()

		const content = action === 'inc' ? '›' : '‹'

		const isDisabled =
			disabledProp ||
			disabledContext ||
			(action === 'inc' && page === max) ||
			(action === 'dec' && page === min)

		const handleClick = () => {
			setPage((prev) => prev + (action === 'inc' ? 1 : -1))
		}

		return (
			<poly.button
				ref={forwardedRef}
				type="button"
				disabled={isDisabled}
				aria-disabled={isDisabled}
				onClick={handleClick}
				{...otherProps}
			>
				{children ?? content}
			</poly.button>
		)
	}
)
