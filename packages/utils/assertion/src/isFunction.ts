/* eslint-disable @typescript-eslint/no-explicit-any */

export const isFunction = (value: unknown): value is (...args: any[]) => any =>
	typeof value === 'function'
