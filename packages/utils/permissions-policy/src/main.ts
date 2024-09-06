import { isAllowList, type AllowList } from './allowlist'
import { isDirective } from './directives'

export type PermissionsPolicy = {
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
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class PP {
	static parse(text: string): PermissionsPolicy {
		return text.split(',').reduce((acc: PermissionsPolicy, entry) => {
			const [directive = '', value = ''] = entry.trim().split('=')
			const list =
				value === '*'
					? value
					: value === '()'
						? []
						: value.trim().slice(1, -1).split(/\s+/)

			if (!isDirective(directive)) {
				throw new SyntaxError(
					`PermissionsPolicy.parse: invalid directive "${directive}"`
				)
			}

			if (!isAllowList(list)) {
				throw new SyntaxError(
					`PermissionsPolicy.parse: invalid allowlist "${value}" for directive "${directive}"`
				)
			}

			return { ...acc, [directive]: list }
		}, {})
	}

	static stringify(policy: PermissionsPolicy): string {
		return Object.entries(policy)
			.map(([directive, list]) =>
				Array.isArray(list)
					? `${directive}=(${list.join(' ')})`
					: `${directive}=${list}`
			)
			.join(', ')
	}
}
