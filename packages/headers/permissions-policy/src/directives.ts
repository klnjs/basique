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

export type Directive = (typeof directives)[number]

export const isDirective = (text: string): text is Directive =>
	directives.includes(text as Directive)
