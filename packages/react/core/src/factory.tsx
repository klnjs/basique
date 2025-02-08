/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import {
	Children,
	cloneElement,
	isValidElement,
	type ComponentProps,
	type ElementType,
	type FunctionComponent,
	type JSX,
	type ReactNode
} from 'react'
import type { Prettify, Assign } from '@klnjs/types'
import { mergeProps, type Props } from './useMergeProps'

type AsChildProps = {
	asChild?: boolean
	children?: ReactNode | undefined
}

type AsChildComponentProps<E extends ElementType> = AsChildProps &
	ComponentProps<E>

const withAsChild = (Component: ElementType) => {
	const Comp = (props: AsChildProps) => {
		const { asChild, children, ...otherProps } = props

		if (!asChild) {
			return <Component {...otherProps}>{children}</Component>
		}

		const child = Children.only(children)

		return isValidElement(child)
			? cloneElement(
					child,
					// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
					mergeProps(otherProps, child.props as Props)
				)
			: null
	}

	// @ts-expect-error - it exists
	Comp.displayName = Component.displayName || Component.name

	return Comp
}

const createAsChildProxy = () => {
	const cache = new Map()

	// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
	return new Proxy(withAsChild, {
		apply(_, __, argArray) {
			return withAsChild(argArray[0])
		},
		get(_, element) {
			if (!cache.has(element)) {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
				cache.set(element, withAsChild(element as ElementType))
			}

			return cache.get(element)
		}
	}) as unknown as {
		[E in keyof JSX.IntrinsicElements]: FunctionComponent<
			AsChildComponentProps<E>
		>
	}
}

export const poly = createAsChildProxy()

export type CoreProps<
	E extends ElementType,
	P extends object = object
> = Prettify<Assign<AsChildComponentProps<E>, P>>
