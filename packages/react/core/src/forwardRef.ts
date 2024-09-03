import {
	forwardRef as forwardRefFromReact,
	type ComponentRef,
	type ElementType,
	type ForwardRefExoticComponent,
	type ForwardRefRenderFunction
} from 'react'
import type { Assign, AsChildComponentProps } from './types'

export type AsChildForwardRefComponent<E extends ElementType> =
	ForwardRefExoticComponent<AsChildComponentProps<E>>

export const forwardRef = <
	E extends ElementType,
	P extends Record<never, never> = Record<never, never>
>(
	component: ForwardRefRenderFunction<
		ComponentRef<E>,
		Assign<AsChildComponentProps<E>, P>
	>
) => forwardRefFromReact(component)
