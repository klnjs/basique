import { isNumber, isString } from '@klnjs/assertion'

export type DataProp = `data-${string}`

export type DataValue = string | number | boolean | undefined

export const asDataProp = (value: DataValue) => {
	if (value === true) {
		return ''
	}

	if (isNumber(value) || isString(value)) {
		return value.toString()
	}

	return undefined
}

export const useDataProps = (props: Record<DataProp, DataValue>) => () =>
	Object.fromEntries(
		Object.entries(props).map(([key, value]) => [key, asDataProp(value)])
	)
