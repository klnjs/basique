const policies = [
	'no-referrer',
	'no-referrer-when-downgrade',
	'origin',
	'origin-when-cross-origin',
	'same-origin',
	'strict-origin',
	'strict-origin-when-cross-origin',
	'unsafe-url'
] as const

export type ReferrerPolicy = (typeof policies)[number]

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class PP {
	static parse(text: string): ReferrerPolicy {
		if (!policies.includes(text as ReferrerPolicy)) {
			throw new SyntaxError(
				`ReferrerPolicy.parse: invalid policy ${text}`
			)
		}

		return text as ReferrerPolicy
	}

	static stringify(policy: ReferrerPolicy): string {
		return policy
	}
}
