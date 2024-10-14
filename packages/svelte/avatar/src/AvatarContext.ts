import { setContext, getContext } from 'svelte'
import type { AvatarStatus } from '@klnjs/avatar'

export const AVATAR_KEY = Symbol('avatar')

export type AvatarContext = {
	status: AvatarStatus
}

export const setAvatarContext = (value: AvatarContext) =>
	setContext<AvatarContext>(AVATAR_KEY, value)

export const getAvatarContext = () =>
	getContext<ReturnType<typeof setAvatarContext>>(AVATAR_KEY)
