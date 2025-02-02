import { useControllableState } from '@klnjs/react-core'

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
	const [page, setPage] = useControllableState({
		defaultValue: defaultPage,
		value: pageProp,
		onChange
	})

	return {
		min: 1,
		max: pages,
		page,
		disabled,
		setPage
	}
}
