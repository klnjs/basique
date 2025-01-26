// https://www.w3.org/TR/CSP3

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
	'media-src',
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

type Directive = (typeof directives)[number]

type SandboxToken = (typeof sandboxTokens)[number]

export type SchemeSource = `${string}:`

const schemeSourceRegex = /^[a-zA-Z][a-zA-Z\d+.-]*:$/

export type HostSource = `${SchemeSource}//${string}`

const hostSourceRegex = /^https?:\/\/.*$/

export type KeywordSource =
	| "'self'"
	| "'unsafe-inline'"
	| "'unsafe-eval'"
	| "'strict-dynamic'"
	| "'unsafe-hashes'"
	| "'report-sample'"
	| "'unsafe-allow-redirects'"
	| "'wasm-unsafe-eval'"
	| "'trusted-types-eval'"
	| "'report-sha256'"
	| "'report-sha384'"
	| "'report-sha512'"

const keywordSourceRegex =
	/^('self'|'unsafe-inline'|'unsafe-eval'|'strict-dynamic'|'unsafe-hashes'|'report-sample'|'unsafe-allow-redirects'|'wasm-unsafe-eval'|'trusted-types-eval'|'report-sha256'|'report-sha384'|'report-sha512')$/

export type NonceSource = `'nonce-${string}'`

const nonceSourceRegex = /^'nonce-[A-Za-z0-9+/=_-]+'$/

export type HashSource =
	| `'sha256-${string}'`
	| `'sha384-${string}'`
	| `'sha512-${string}'`

const hashSourceRegex = /^'(sha256|sha384|sha512)-[A-Za-z0-9+/=_-]+'$/

type SourceExpression =
	| SchemeSource
	| HostSource
	| KeywordSource
	| NonceSource
	| HashSource

type SourceList = '*' | "'none'" | SourceExpression[]

type SandboxTokenList = SandboxToken[]

function isDirective(value: string): value is Directive {
	return (directives as readonly string[]).includes(value)
}

function isSourceExpression(value: string): value is SourceExpression {
	return (
		schemeSourceRegex.test(value) ||
		hostSourceRegex.test(value) ||
		keywordSourceRegex.test(value) ||
		nonceSourceRegex.test(value) ||
		hashSourceRegex.test(value)
	)
}

function isSandboxToken(value: string): value is SandboxToken {
	return (sandboxTokens as readonly string[]).includes(value)
}

export type ContentSecurityPolicy = {
	[P in Directive]?: P extends 'sandbox' ? SandboxTokenList : SourceList
}

export function parse(text: string): ContentSecurityPolicy {
	return text.split(';').reduce((acc: ContentSecurityPolicy, entry) => {
		const [key, value = ''] = entry.trim().split(/\s+(.*)/, 2)

		if (key === undefined || !isDirective(key)) {
			throw new SyntaxError(
				`Encountered invalid content-security-policy directive "${key}"`
			)
		}

		if (key === 'sandbox') {
			acc[key] = parseSandboxTokenList(value)
		} else {
			acc[key] = parseSourceList(value)
		}

		return acc
	}, {})
}

function parseSourceList(value: string): SourceList {
	if (value === '*' || value === "'none'") {
		return value
	}

	return value
		.trim()
		.split(/\s+/)
		.reduce((acc: SourceExpression[], entry) => {
			if (!isSourceExpression(entry)) {
				throw new SyntaxError(
					`Encountered invalid content-security-policy source expression "${entry}"`
				)
			}

			acc.push(entry)

			return acc
		}, [])
}

function parseSandboxTokenList(value: string): SandboxTokenList {
	return value
		.trim()
		.split(/\s+/)
		.reduce((acc: SandboxToken[], entry) => {
			if (!isSandboxToken(entry)) {
				throw new SyntaxError(
					`Encountered invalid content-security-policy sandbox token "${entry}"`
				)
			}

			acc.push(entry)

			return acc
		}, [])
}

export function stringify(policy: ContentSecurityPolicy): string {
	return Object.entries(policy)
		.map(([directive, list]) =>
			Array.isArray(list)
				? `${directive} ${list.join(' ')}`
				: `${directive} ${list}`
		)
		.join('; ')
}
