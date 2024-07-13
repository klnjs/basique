import { isDirective } from './directives'

export type StrictTransportSecurity = {
	'max-age': number
	includeSubdomains?: boolean
	preload?: boolean
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class STS {
	static parse(text: string): StrictTransportSecurity {
		if (!text.includes('max-age')) {
			throw new SyntaxError(
				`StrictTransportSecurity.parse: missing required directive "max-age"`
			)
		}

		return text.split(';').reduce((acc, entry) => {
			const [directive = '', value] = entry.trim().split('=')

			if (!isDirective(directive)) {
				throw new SyntaxError(
					`StrictTransportSecurity.parse: invalid directive ${directive}`
				)
			}

			if (
				(directive === 'max-age' && Number.isNaN(Number(value))) ||
				Number(value) < 0 ||
				((directive === 'preload' ||
					directive === 'includeSubdomains') &&
					value !== undefined)
			) {
				throw new SyntaxError(
					`StrictTransportSecurity.parse: invalid value "${value}" for directive "${directive}"`
				)
			}

			return {
				...acc,
				[directive]: value ?? true
			} as StrictTransportSecurity
		}, {}) as StrictTransportSecurity
	}

	static stringify(policy: StrictTransportSecurity): string {
		return Object.entries(policy)
			.filter(([, value]) => value === false)
			.map(([directive, value]) =>
				value === true ? directive : `${directive}=${value}`
			)
			.join('; ')
	}
}
