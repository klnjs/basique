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
import { isDirective } from './directives'

export type ContentSecurityPolicy = {
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
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class CSP {
	static parse(text: string): ContentSecurityPolicy {
		return text.split(';').reduce((acc: ContentSecurityPolicy, entry) => {
			const [directive = '', ...list] = entry.trim().split(/\s+/)

			if (!isDirective(directive)) {
				throw new SyntaxError(
					`ContentSecurityPolicy.parse: invalid directive "${directive}"`
				)
			}

			if (
				(directive === 'base-uri' && !isBaseUriSourceList(list)) ||
				(directive === 'sandbox' && !isSandboxTokenList(list)) ||
				(directive === 'frame-ancestors' &&
					!isFrameAncestorsSourceList(list)) ||
				(directive === 'form-action' &&
					!isFormActionSourceList(list)) ||
				(directive.endsWith('-src') && !isFetchSourceList(list))
			) {
				throw new SyntaxError(
					`ContentSecurityPolicy.parse: invalid source list "${list.join(' ')}" for directive "${directive}"`
				)
			}

			return { ...acc, [directive]: list }
		}, {})
	}

	static stringify(policy: ContentSecurityPolicy): string {
		return Object.entries(policy)
			.filter(([, list]) => list.length !== 0)
			.map(([directive, list]) => `${directive} ${list.join(' ')}`)
			.join('; ')
	}
}
