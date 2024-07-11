import { isAllowList, type AllowList } from './allowlist'
import { isDirective } from './directives'

export type PermissionsPolicy = {
	accelerometer?: AllowList
	ambientLightSensor?: AllowList
	autoplay?: AllowList
	battery?: AllowList
	camera?: AllowList
	clipboardRead?: AllowList
	clipboardWrite?: AllowList
	crossOriginIsolated?: AllowList
	displayCapture?: AllowList
	documentDomain?: AllowList
	encryptedMedia?: AllowList
	executionWhileNotRendered?: AllowList
	executionWhileOutOfViewport?: AllowList
	fullscreen?: AllowList
	geolocation?: AllowList
	gyroscope?: AllowList
	hid?: AllowList
	idleDetection?: AllowList
	interestCohort?: AllowList
	magnetometer?: AllowList
	microphone?: AllowList
	midi?: AllowList
	navigationOverride?: AllowList
	payment?: AllowList
	pictureInPicture?: AllowList
	publickeyCredentialsGet?: AllowList
	screenWakeLock?: AllowList
	serial?: AllowList
	speaker?: AllowList
	syncXhr?: AllowList
	usb?: AllowList
	webShare?: AllowList
	xrSpatialTracking?: AllowList
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class PP {
	static parse(text: string): PermissionsPolicy {
		return text.split(',').reduce((acc: PermissionsPolicy, definition) => {
			const [directive = '', value = ''] = definition.trim().split('=')
			const list =
				value === '*'
					? value
					: value === '()'
						? []
						: value.trim().slice(1, -1).split(/\s+/)

			if (!isDirective(directive)) {
				throw new SyntaxError(
					`PermissionsPolicy.parse: invalid directive ${directive}`
				)
			}

			if (!isAllowList(list)) {
				throw new SyntaxError(
					`PermissionsPolicy.parse: invalid allowlist ${value}`
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
