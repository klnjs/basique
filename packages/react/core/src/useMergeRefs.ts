import {
	useCallback,
	type Ref,
	type RefObject,
	type DependencyList
} from 'react'
import { isDefined, isFunction } from '@klnjs/assertion'

export type MergeableRef<T> = Ref<T> | undefined | null

export const mergeRefs =
	<T>(...refs: MergeableRef<T>[]) =>
	(value: T) => {
		// prettier-ignore
		for (const ref of refs) {
			if (isFunction(ref)) {
				ref(value)
			} else if (isDefined(ref) && 'current' in ref) {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
				(ref as RefObject<T>).current = value
			}
		}
	}

/**
 * A hook that composes multiple refs into a single ref.
 */
export const useMergeRefs = <T>(...refs: MergeableRef<T>[]) =>
	// eslint-disable-next-line react-compiler/react-compiler
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useCallback(mergeRefs(...refs), refs as DependencyList)
