import { useMemo } from 'react'

/**
 * A hook that returns if the browser supports a CSS property-value pair
 * or a specific CSS condition.
 */
export function useSupports(
	propertyOrCondition: string,
	value?: string
): boolean {
	return useMemo(() => {
		if (value !== undefined) {
			return CSS.supports(propertyOrCondition, value)
		}

		return CSS.supports(propertyOrCondition)
	}, [propertyOrCondition, value])
}
