// https://www.w3.org/TR/permissions-policy

import type { HostSource, SchemeSource } from './content-security-policy'

const features = [
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

type FeatureIdentifier = (typeof features)[number]

type PermissionsSourceExpression = SchemeSource | HostSource

type AllowList = '*' | AllowListValue[]

type AllowListValue = PermissionsSourceExpression | 'self' | 'src' | 'none'

const allowListValueRegex = /(self|src|none|"https?:\/\/[^\s]+")/

function isFeature(value: string): value is FeatureIdentifier {
	return (features as readonly string[]).includes(value)
}

function isAllowListValue(value: string): value is AllowListValue {
	return allowListValueRegex.test(value)
}

export type PermissionsPolicy = {
	[P in FeatureIdentifier]?: AllowList
}

export function parse(text: string): PermissionsPolicy {
	return text.split(',').reduce((acc: PermissionsPolicy, entry) => {
		const [key, value = ''] = entry.trim().split('=')

		if (key === undefined || !isFeature(key)) {
			throw new SyntaxError(
				`Encountered invalid permission-policy feature identifier "${key}"`
			)
		}

		acc[key] = parseAllowList(value)

		return acc
	}, {})
}

export function parseAllowList(value: string): AllowList {
	if (value === '*') {
		return value
	}

	if (value === '()') {
		return []
	}

	return value
		.trim()
		.slice(1, -1)
		.split(/\s+/)
		.reduce((acc: AllowListValue[], entry) => {
			if (!isAllowListValue(entry)) {
				throw new SyntaxError(
					`Encountered invalid permission-policy allow list value "${entry}"`
				)
			}

			acc.push(entry)

			return acc
		}, [])
}

export function stringify(policy: PermissionsPolicy): string {
	return Object.entries(policy)
		.map(([directive, allowlist]) =>
			Array.isArray(allowlist)
				? `${directive}=(${allowlist.join(' ')})`
				: `${directive}=${allowlist}`
		)
		.join(', ')
}
