// https://www.w3.org/TR/CSP/#directives-navigation
import {
	isSourceList,
	toSourceRegex,
	type None,
	type Source
} from './directives'

const formActionSources = ["'self'", 'http://*', 'https://*'] as const

const frameAncestorsSources = [
	"'self'",
	'http://*',
	'https://*',
	'blob:',
	'data:'
] as const

export type FormActionSourceList =
	| None
	| Source<(typeof formActionSources)[number]>[]

export type FrameAncestorSourceList =
	| None
	| Source<(typeof frameAncestorsSources)[number]>[]

export const isFormActionSourceList = (
	list: string[]
): list is FormActionSourceList =>
	isSourceList(list, toSourceRegex(formActionSources))

export const isFrameAncestorsSourceList = (
	list: string[]
): list is FrameAncestorSourceList =>
	isSourceList(list, toSourceRegex(frameAncestorsSources))
