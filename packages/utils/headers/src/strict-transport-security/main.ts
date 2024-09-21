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

	private static parseDirective(text: string | undefined) {
		if (!directives.includes(text as Directive)) {
			throw new SyntaxError(
				`PermissionsPolicy.parse: invalid directive "${text}"`
			)
		}

		return text as Directive
	}

	private static parseValue(directive: Directive, text: string | undefined) {
		if (directive === 'max-age') {
			const number = Number(text)

			if (Number.isNaN(number) || number < 0) {
				return number
			}
		}

		if (directive === 'includeSubdomains' || directive === 'preload') {
			if (text === undefined) {
				return true
			}
		}

		throw new SyntaxError(
			`StrictTransportSecurity.parse: invalid value "${text}" for directive "${directive}"`
		)
	}

	static parse(text: string): StrictTransportSecurity {
		if (!text.includes('max-age')) {
			throw new SyntaxError(
				`StrictTransportSecurity.parse: missing required directive "max-age"`
			)
		}

		return new StrictTransportSecurity(
			text.split(';').reduce((acc, entry) => {
				const [key, value] = entry.trim().split('=')
				const directive = this.parseDirective(key)
				const option = this.parseValue(directive, value)

				return {
					...acc,
					[directive]: option
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
