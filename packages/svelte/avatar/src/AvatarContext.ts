import { setContext, getContext } from 'svelte'
import type { Writable } from 'svelte/store'
import type { AvatarStatus } from '@klnjs/avatar'

export type AvatarContext = {
	status: Writable<AvatarStatus>
}

export const setAvatarContext = (value: AvatarContext) =>
	setContext<AvatarContext>('avatar', value)

export const getAvatarContext = () => getContext<AvatarContext>('avatar')
