import { useMemo, type SetStateAction } from 'react'
import { useStateControllable } from '@klnjs/react-core'

export type UsePaginatorOptions = {
	count: number
	defaultPage?: number
	disabled?: boolean
	page?: number
	pageSize: number
	onChange?: (page: number) => void
}

export const usePaginator = ({
	count,
	defaultPage = 1,
	disabled = false,
	page: pageProp,
	pageSize,
	onChange
}: UsePaginatorOptions) => {
	const [page, setPage] = useStateControllable({
		defaultValue: defaultPage,
		value: pageProp,
		onChange: onChange as (value: SetStateAction<number>) => void
	})

	const pageMax = useMemo(
		() => Math.ceil(count / pageSize),
		[count, pageSize]
	)

	const range = useMemo(() => {
		const start = (page - 1) * pageSize

		return [
			Math.min(start + 1, count),
			Math.min(start + pageSize, count)
		] as const
	}, [count, page, pageSize])

	return {
		count,
		disabled,
		page,
		pageMax,
		pageSize,
		range,
		setPage
	}
}
