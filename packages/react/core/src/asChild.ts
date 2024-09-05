import type { ReactNode, ElementType, ComponentProps } from 'react'
import type { Prettify, Assign } from '@klnjs/types'

export type AsChildProps = {
	asChild?: boolean
	children?: ReactNode | undefined
}

export type AsChildComponentProps<E extends ElementType> = AsChildProps &
	ComponentProps<E>

export type CoreProps<
	E extends ElementType,
	P extends object = object
> = Prettify<Assign<AsChildComponentProps<E>, P>>
