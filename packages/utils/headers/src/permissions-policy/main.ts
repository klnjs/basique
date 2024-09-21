const directives = [
	'accelerometer',
	'ambient-light-sensor',
	'autoplay',
	'battery',
	'camera',
	'clipboard-read',
	'clipboard-write',
	'cross-origin-isolated',
	'display-capture',
	'document-domain',
	'encrypted-media',
	'execution-while-not-rendered',
	'execution-while-out-of-viewport',
	'fullscreen',
	'geolocation',
	'gyroscope',
	'hid',
	'idle-detection',
	'interest-cohort',
	'magnetometer',
	'microphone',
	'midi',
	'navigation-override',
	'payment',
	'picture-in-picture',
	'publickey-credentials-get',
	'screen-wake-lock',
	'serial',
	'speaker',
	'sync-xhr',
	'usb',
	'web-share',
	'xr-spatial-tracking'
] as const

type Directive = (typeof directives)[number]

type AllowList =
	| '*'
	| ('src' | 'self' | `"http://${string}"` | `"https://${string}"`)[]

type Root = {
	[K in Directive]?: AllowList
}

export class PermissionsPolicy implements Root {
	accelerometer?: AllowList
	'ambient-light-sensor'?: AllowList
	autoplay?: AllowList
	battery?: AllowList
	camera?: AllowList
	'clipboard-read'?: AllowList
	'clipboard-write'?: AllowList
	'cross-origin-isolated'?: AllowList
	'display-capture'?: AllowList
	'document-domain'?: AllowList
	'encrypted-media'?: AllowList
	'execution-while-not-rendered'?: AllowList
	'execution-while-out-of-viewport'?: AllowList
	fullscreen?: AllowList
	geolocation?: AllowList
	gyroscope?: AllowList
	hid?: AllowList
	'idle-detection'?: AllowList
	'interest-cohort'?: AllowList
	magnetometer?: AllowList
	microphone?: AllowList
	midi?: AllowList
	'navigation-override'?: AllowList
	payment?: AllowList
	'picture-in-picture'?: AllowList
	'publickey-credentials-get'?: AllowList
	'screen-wake-lock'?: AllowList
	serial?: AllowList
	speaker?: AllowList
	'sync-xhr'?: AllowList
	usb?: AllowList
	'web-share'?: AllowList
	'xr-spatial-tracking'?: AllowList

	private constructor(options: PermissionsPolicy) {
		Object.assign(this, options)
	}

	private static parseDirective(text: string | undefined) {
		if (!directives.includes(text as Directive)) {
			throw new SyntaxError(
				`PermissionsPolicy.parse: invalid directive "${text}"`
			)
		}

		return text as Directive
	}

	private static parseAllowList(
		directive: Directive,
		text: string | undefined
	) {
		if (text !== undefined) {
			if (text === '*') {
				return text
			}

			if (text === '()') {
				return []
			}

			const list = text.trim().slice(1, -1).split(/\s+/)

			if (
				new Set(list).size === list.length &&
				list.every((value) =>
					/^(?:src|self|"http:\/\/.*"|"https:\/\/.*")$/.test(value)
				)
			) {
				return list as AllowList
			}
		}

		throw new SyntaxError(
			`PermissionsPolicy.parse: invalid allowlist "${text}" for directive "${directive}"`
		)
	}

	static parse(text: string): PermissionsPolicy {
		return new PermissionsPolicy(
			text.split(',').reduce((acc, entry) => {
				const [key, value] = entry.trim().split('=')
				const directive = this.parseDirective(key)
				const allowlist = this.parseAllowList(directive, value)

				return {
					...acc,
					[directive]: allowlist
				}
			}, {}) as PermissionsPolicy
		)
	}

	static stringify(policy: PermissionsPolicy): string {
		return Object.entries(policy)
			.map(([directive, allowlist]) =>
				Array.isArray(allowlist)
					? `${directive}=(${allowlist.join(' ')})`
					: `${directive}=${allowlist}`
			)
			.join(', ')
	}
}
