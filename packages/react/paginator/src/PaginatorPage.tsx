import { poly, type CoreProps, asDataProp } from '@klnjs/react-core'
import { usePaginatorContext } from './PaginatorContext'

export type PaginatorPageProps = CoreProps<
	'button',
	{
		page: number
	}
>

export const PaginatorPage = ({
	type,
	disabled: disabledProp = false,
	page: pageProp,
	...otherProps
}: PaginatorPageProps) => {
	const {
		disabled: disabledContext,
		page: pageContext,
		setPage
	} = usePaginatorContext()

	const isDisabled = disabledProp || disabledContext
	const isSelected = pageProp === pageContext
	const isSelectable = !isDisabled

	const label = `Page ${pageProp}${isSelected ? ', Current page' : ''}`

	const handleClick = () => {
		if (isSelectable) {
			setPage(pageProp)
		}
	}

	return (
		<poly.button
			aria-label={label}
			aria-current={isSelected}
			aria-disabled={!isSelectable}
			data-selected={asDataProp(isSelected)}
			onClick={handleClick}
			{...otherProps}
		>
			{pageProp}
		</poly.button>
	)
}
