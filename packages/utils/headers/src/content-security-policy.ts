const directives = [
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

type Directive = (typeof directives)[number]

type SourceQuote<T extends string> = `'${T}'`

type SourceWildcard<T extends string> = T extends `${infer Prefix}*`
	? `${Prefix}${string}`
	: T

type SourceList<T extends string> =
	| "'none'"
	| (T extends `'${infer Inner}'`
			? SourceQuote<SourceWildcard<Inner>>
			: SourceWildcard<T>)[]

const baseUriSources = ["'self'", 'http://*', 'https://*'] as const

type BaseUriSourceList = SourceList<(typeof baseUriSources)[number]>

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

type SandboxTokenList = (typeof sandboxTokens)[number][]

const formActionSources = ["'self'", 'http://*', 'https://*'] as const

type FormActionSourceList = SourceList<(typeof formActionSources)[number]>[]

const frameAncestorsSources = [
	"'self'",
	'http://*',
	'https://*',
	'blob:',
	'data:'
] as const

type FrameAncestorSourceList = SourceList<
	(typeof frameAncestorsSources)[number]
>[]

const fetchSources = [
	"'self'",
	"'unsafe-inline'",
	"'unsafe-eval'",
	"'strict-dynamic'",
	"'unsafe-hashes'",
	"'report-sample'",
	"'unsafe-allow-redirects'",
	"'wasm-unsafe-eval'",
	"'nonce-*'",
	"'sha256-*'",
	"'sha384-*'",
	"'sha512-*'",
	'http://*',
	'https://*',
	'ws://*',
	'wss://*',
	'ws:',
	'wss:',
	'blob:',
	'data:',
	'http:',
	'https:',
	'filesystem:',
	'mediastream:'
] as const

type FetchSourceList = SourceList<(typeof fetchSources)[number]>

const getSourcesByDirective = (directive: Directive) => {
	switch (directive) {
		case 'base-uri':
			return baseUriSources
		case 'form-action':
			return formActionSources
		case 'frame-ancestors':
			return frameAncestorsSources
		case 'sandbox':
			return sandboxTokens
		default:
			return fetchSources
	}
}

const toSourcesRegex = (sources: readonly string[], none: boolean) => {
	const baseRegex = `(${sources
		.join('|')
		.replaceAll('/', '\\/')
		.replaceAll('*', '[^\\s]+')})`

	if (none) {
		return new RegExp(`^(?:'none'|${baseRegex}*(?:\\s+${baseRegex})*)$`)
	}

	return new RegExp(`^${baseRegex}*(?:\\s+${baseRegex})*$`)
}

export class ContentSecurityPolicy {
	'base-uri'?: BaseUriSourceList
	'child-src'?: FetchSourceList
	'connect-src'?: FetchSourceList
	'default-src'?: FetchSourceList
	'font-src'?: FetchSourceList
	'form-action'?: FormActionSourceList
	'frame-ancestors'?: FrameAncestorSourceList
	'frame-src'?: FetchSourceList
	'img-src'?: FetchSourceList
	'manifest-src'?: FetchSourceList
	'media-src'?: FetchSourceList
	'object-src'?: FetchSourceList
	'report-to'?: string
	sandbox?: SandboxTokenList
	'script-src-attr'?: FetchSourceList
	'script-src-elem'?: FetchSourceList
	'script-src'?: FetchSourceList
	'style-src-attr'?: FetchSourceList
	'style-src-elem'?: FetchSourceList
	'style-src'?: FetchSourceList
	'worker-src'?: FetchSourceList

	private constructor(options: ContentSecurityPolicy) {
		Object.assign(this, options)
	}

	static parse(text: string): ContentSecurityPolicy {
		return new ContentSecurityPolicy(
			text.split(';').reduce((acc, entry) => {
				const [key = '', value = ''] = entry.trim().split(/\s(.*)/, 2)

				if (!directives.includes(key as Directive)) {
					throw new SyntaxError(
						`ContentSecurityPolicy.parse: invalid directive "${key}"`
					)
				}

				const sources = getSourcesByDirective(key as Directive)
				const regex = toSourcesRegex(sources, key !== 'sandbox')

				if (value === '' || !regex.test(value)) {
					throw new SyntaxError(
						`ContentSecurityPolicy.parse: ${key} has invalid sourcelist "${value}"`
					)
				}

				return {
					...acc,
					[key]: value === 'none' ? value : value.split(' ')
				}
			}, {}) as ContentSecurityPolicy
		)
	}

	static stringify(policy: ContentSecurityPolicy): string {
		return Object.entries(policy)
			.map(([directive, sourcelist]) =>
				Array.isArray(sourcelist)
					? `${directive} ${sourcelist.join(' ')}`
					: `${directive} ${sourcelist}`
			)
			.join('; ')
	}
}
