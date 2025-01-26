export const directives = ['max-age', 'includeSubdomains', 'preload'] as const

export type Directive = (typeof directives)[number]

export type StrictTransportSecurity = {
	'max-age': number
	includeSubdomains?: boolean
	preload?: boolean
}

export function isDirective(value: string): value is Directive {
	return (directives as readonly string[]).includes(value)
}

export function parse(text: string): StrictTransportSecurity {
	if (!text.includes('max-age')) {
		throw new SyntaxError(`missing required directive "max-age"`)
	}

	return text.split(';').reduce<StrictTransportSecurity>(
		(acc, entry) => {
			const [key = '', value] = entry.trim().split('=')

			if (!isDirective(key)) {
				throw new SyntaxError(`invalid directive "${key}"`)
			}

			if (key === 'max-age') {
				const maxAge = Number(value)

				if (!Number.isInteger(maxAge) || maxAge < 0) {
					throw new SyntaxError(
						`invalid value "${value}" for directive "${key}"`
					)
				}

				acc[key] = maxAge
			} else if (value !== undefined) {
				throw new SyntaxError(
					`invalid value "${value}" for directive "${key}"`
				)
			} else {
				acc[key] = true
			}

			return acc
		},
		{ 'max-age': 0 }
	)
}

export function stringify(policy: StrictTransportSecurity): string {
	return Object.entries(policy)
		.filter(([, value]) => value !== false)
		.map(([directive, value]) =>
			value === true ? directive : `${directive}=${value}`
		)
		.join('; ')
}
