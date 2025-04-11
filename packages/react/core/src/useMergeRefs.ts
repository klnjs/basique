import { useCallback, type Ref, type RefObject, type RefCallback } from 'react'

export type MergeableRef<T> = Ref<T> | undefined

export const mergeRefs =
	<T>(...refs: MergeableRef<T>[]) =>
	(value: T) => {
		for (const ref of refs) {
			if (isRefCallback(ref)) {
				ref(value)
			} else if (isRefObject(ref)) {
				ref.current = value
			}
		}
	}

/**
 * A hook that composes multiple refs into a single ref.
 */
export const useMergeRefs = <T>(...refs: MergeableRef<T>[]) =>
	// eslint-disable-next-line react-compiler/react-compiler
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useCallback(mergeRefs(...refs), [...refs])

const isRefCallback = <T>(ref: MergeableRef<T>): ref is RefCallback<T> =>
	typeof ref === 'function'

const isRefObject = <T>(ref: MergeableRef<T>): ref is RefObject<T> =>
	ref !== null && typeof ref === 'object' && 'current' in ref
