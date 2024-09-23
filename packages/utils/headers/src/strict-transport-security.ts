const directives = ['max-age', 'includeSubdomains', 'preload'] as const

type Directive = (typeof directives)[number]

export class StrictTransportSecurity {
	'max-age': number
	includeSubdomains?: boolean
	preload?: boolean

	private constructor(options: StrictTransportSecurity) {
		this['max-age'] = options['max-age']
		this.includeSubdomains = options.includeSubdomains
		this.preload = options.preload
	}

	static parse(text: string): StrictTransportSecurity {
		if (!text.includes('max-age')) {
			throw new SyntaxError(
				`StrictTransportSecurity.parse: missing required directive "max-age"`
			)
		}

		return new StrictTransportSecurity(
			text.split(';').reduce((acc, entry) => {
				const [key = '', value] = entry.trim().split('=')

				if (!directives.includes(key as Directive)) {
					throw new SyntaxError(
						`PermissionsPolicy.parse: received invalid directive "${key}"`
					)
				}

				if (key === 'max-age') {
					const maxAge = Number(value)

					if (!Number.isInteger(maxAge) || maxAge < 0) {
						throw new SyntaxError(
							`StrictTransportSecurity.parse: received invalid value "${value}" for directive "${key}"`
						)
					}
				} else if (value !== undefined) {
					throw new SyntaxError(
						`StrictTransportSecurity.parse: received invalid value "${value}" for directive "${key}"`
					)
				}

				return {
					...acc,
					[key]: value
				}
			}, {}) as StrictTransportSecurity
		)
	}

	static stringify(policy: StrictTransportSecurity): string {
		return Object.entries(policy)
			.filter(([, value]) => value !== false)
			.map(([directive, value]) =>
				value === true ? directive : `${directive}=${value}`
			)
			.join('; ')
	}
}
