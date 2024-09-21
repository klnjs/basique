export const directives = [
	'base-uri',
	'child-src',
	'connect-src',
	'default-src',
	'font-src',
	'form-action',
	'frame-ancestors',
	'frame-src',
	'img-src',
	'manifest-src',
	'object-src',
	'report-to',
	'sandbox',
	'script-src-attr',
	'script-src-elem',
	'script-src',
	'style-src-attr',
	'style-src-elem',
	'style-src',
	'worker-src'
] as const

type SourceQuote<T extends string> = `'${T}'`

type SourceWildcard<T extends string> = T extends `${infer Prefix}*`
	? `${Prefix}${string}`
	: T

export type None = ["'none'"]

export type Source<T extends string> = T extends `'${infer Inner}'`
	? SourceQuote<SourceWildcard<Inner>>
	: SourceWildcard<T>

export const isSourceList = (list: string[], regex: RegExp) => {
	if (!Array.isArray(list) || list.length === 0) {
		return false
	}

	if (list.includes("'none'")) {
		return list.length === 1
	}

	if (new Set(list).size !== list.length) {
		return false
	}

	return list.every((source) => regex.test(source))
}

export const toSourceRegex = (list: readonly string[]) =>
	new RegExp(
		`^(?:${list.join('|').replaceAll('/', '\\/').replaceAll('*', '.*')})$`
	)

export type Directive = (typeof directives)[number]
