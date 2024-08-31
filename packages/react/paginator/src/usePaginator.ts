import type { SetStateAction } from 'react'
import { useStateControllable } from '@klnjs/react-core'

export type UsePaginatorOptions = {
	defaultPage?: number
	disabled?: boolean
	page?: number
	pages: number
	onChange?: (page: number) => void
}

export const usePaginator = ({
	defaultPage = 1,
	disabled = false,
	page: pageProp,
	pages,
	onChange
}: UsePaginatorOptions) => {
	const [page, setPage] = useStateControllable({
		defaultValue: defaultPage,
		value: pageProp,
		onChange: onChange as (value: SetStateAction<number>) => void
	})

	return {
		disabled,
		page,
		pages,
		pageStart: 1,
		pageEnd: pages,
		setPage
	}
}
