// https://www.w3.org/TR/CSP/#directives-document
import {
	isSourceList,
	toSourceRegex,
	type None,
	type Source
} from './directives'

const baseUriSources = ["'self'", 'http://*', 'https://*'] as const

const sandboxTokens = [
	'allow-downloads',
	'allow-forms',
	'allow-modals',
	'allow-orientation-lock',
	'allow-pointer-lock',
	'allow-popups',
	'allow-popups-to-escape-sandbox',
	'allow-presentation',
	'allow-same-origin',
	'allow-scripts',
	'allow-storage-access-by-user-activation',
	'allow-top-navigation',
	'allow-top-navigation-by-user-activation',
	'allow-top-navigation-to-custom-protocols'
] as const

export type BaseUriSourceList = None | Source<(typeof baseUriSources)[number]>[]

export type SandboxTokenList = Source<(typeof sandboxTokens)[number]>[]

export const isBaseUriSourceList = (list: string[]): list is SandboxTokenList =>
	isSourceList(list, toSourceRegex(baseUriSources))

export const isSandboxTokenList = (list: string[]): list is SandboxTokenList =>
	isSourceList(list, toSourceRegex(sandboxTokens))
