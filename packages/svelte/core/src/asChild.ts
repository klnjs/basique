import type { HTMLAttributes } from 'svelte/elements'
import type { Prettify, Assign } from '@klnjs/types'

export type AsChildProps = {
	asChild?: boolean
}

export type AsChildComponentProps<T extends Element> = {
	asChild?: boolean | undefined
	ref?: T | undefined
} & HTMLAttributes<T>

export type CoreProps<E extends Element, P extends object = object> = Prettify<
	Assign<AsChildComponentProps<E>, P>
>
