/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { useMemo, type DependencyList } from 'react'
import { isFunction, isRecord, isString } from '@klnjs/assertion'
import { mergeRefs } from './useMergeRefs'

type TupleTypes<T> = { [P in keyof T]: T[P] } extends { [key: number]: infer V }
	? NullToObject<V>
	: never

type NullToObject<T> = T extends null | undefined ? NonNullable<unknown> : T

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
	k: infer I
) => void
	? I
	: never

export type Props = { [key: string]: any }

export function mergeProps<T extends Props[]>(...props: T) {
	const merged: Props = { ...props[0] }

	for (let i = 1; i < props.length; i++) {
		const cursor = props[i]

		// eslint-disable-next-line guard-for-in
		for (const key in cursor) {
			const a = merged[key]
			const b = cursor[key]

			if (key === 'style' && isRecord(a) && isRecord(b)) {
				merged[key] = { ...a, ...b }
			} else if (key === 'className' && isString(a) && isString(b)) {
				merged[key] = `${a} ${b}`
			} else if (/^on[A-Z]/.test(key) && isFunction(a) && isFunction(b)) {
				merged[key] = (...args: any[]) => {
					a(...args)
					b(...args)
				}
			} else if (key === 'ref') {
				merged[key] = mergeRefs(a, b)
			} else {
				merged[key] = b ?? a
			}
		}
	}

	// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
	return merged as UnionToIntersection<TupleTypes<T>>
}

/**
 * A hook that composes multiple props into a single props object.
 */
export const useMergeProps = (...props: Props[]) =>
	// eslint-disable-next-line react-compiler/react-compiler
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useMemo(() => mergeProps(...props), props as DependencyList)
