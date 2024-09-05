import {
	forwardRef as forwardRefFromReact,
	type ComponentRef,
	type ElementType,
	type ForwardRefExoticComponent,
	type ForwardRefRenderFunction,
	type PropsWithoutRef
} from 'react'
import type { Assign } from '@klnjs/types'
import type { AsChildComponentProps } from './asChild'

export type AsChildForwardRefComponent<E extends ElementType> =
	ForwardRefExoticComponent<AsChildComponentProps<E>>

export const forwardRef = <
	E extends ElementType,
	P extends Record<never, never> = Record<never, never>
>(
	component: ForwardRefRenderFunction<
		ComponentRef<E>,
		PropsWithoutRef<Assign<AsChildComponentProps<E>, P>>
	>
) => forwardRefFromReact(component)
