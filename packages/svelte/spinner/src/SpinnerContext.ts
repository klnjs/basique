import { setContext, getContext } from 'svelte'
import { writable, type Writable } from 'svelte/store'
import type { Spinner } from '@klnjs/spinner'

export type SpinnerContext = Writable<Spinner>

export const createSpinnerContext = (value: Spinner) =>
	setContext<SpinnerContext>('spinner', writable<Spinner>(value))

export const getSpinnerContext = () => getContext<SpinnerContext>('spinner')
