import { isFetchSourceList, type FetchSourceList } from './fetch'
import {
	isFormActionSourceList,
	isFrameAncestorsSourceList,
	type FrameAncestorSourceList,
	type FormActionSourceList
} from './navigation'
import {
	isBaseUriSourceList,
	isSandboxTokenList,
	type BaseUriSourceList,
	type SandboxTokenList
} from './document'
import { directives, type Directive } from './directives'

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
	'report-to'?: string[]
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

	private static parseDirective(text: string | undefined) {
		if (!directives.includes(text as Directive)) {
			throw new SyntaxError(
				`ContentSecurityPolicy.parse: invalid directive "${text}"`
			)
		}

		return text as Directive
	}

	static parse(text: string): ContentSecurityPolicy {
		return new ContentSecurityPolicy(
			text.split(';').reduce((acc, entry) => {
				const [key, ...value] = entry.trim().split(/\s+/)
				const directive = this.parseDirective(key)

				if (
					(directive === 'base-uri' && !isBaseUriSourceList(value)) ||
					(directive === 'sandbox' && !isSandboxTokenList(value)) ||
					(directive === 'frame-ancestors' &&
						!isFrameAncestorsSourceList(value)) ||
					(directive === 'form-action' &&
						!isFormActionSourceList(value)) ||
					(directive.endsWith('-src') && !isFetchSourceList(value))
				) {
					throw new SyntaxError(
						`ContentSecurityPolicy.parse: invalid source list "${value.join(' ')}" for directive "${directive}"`
					)
				}

				return { ...acc, [directive]: value }
			}, {}) as ContentSecurityPolicy
		)
	}

	static stringify(policy: ContentSecurityPolicy): string {
		return Object.entries(policy)
			.filter(([, list]) => list.length !== 0)
			.map(([directive, list]) => `${directive} ${list.join(' ')}`)
			.join('; ')
	}
}
